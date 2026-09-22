const express = require("express");
const crypto = require("crypto");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const db = require("../db");

const router = express.Router();

const UPLOADS_DIR = path.resolve(
  __dirname,
  "..",
  "..",
  process.env.UPLOADS_DIR || "./uploads"
);

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname || "").toLowerCase() || ".jpg";
      cb(null, `${req.params.id}-${Date.now()}${ext}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed"));
    }
    cb(null, true);
  },
});

function dogRowToApi(row, notes) {
  return {
    id: row.id,
    name: row.name,
    size: row.size,
    address: row.address,
    postcode: row.postcode || "",
    district: row.district || "",
    keysafe: row.keysafe || "",
    instructions: row.instructions || "",
    phone: row.phone || "",
    groupNote: row.group_note || "",
    orderNum: row.order_num,
    archived: !!row.archived,
    photoPath: row.photo_path || null,
    createdAt: row.created_at,
    notes: (notes || []).map((n) => ({
      id: n.id,
      text: n.text,
      createdAt: n.created_at,
    })),
  };
}

const notesForDogStmt = db.prepare(
  "SELECT id, text, created_at FROM notes WHERE dog_id = ? ORDER BY created_at DESC, id DESC"
);

// GET /api/dogs?includeArchived=false
router.get("/", (req, res) => {
  const includeArchived = req.query.includeArchived === "true";
  const rows = includeArchived
    ? db.prepare("SELECT * FROM dogs ORDER BY order_num ASC").all()
    : db
        .prepare(
          "SELECT * FROM dogs WHERE archived = 0 ORDER BY order_num ASC"
        )
        .all();

  const dogs = rows.map((row) =>
    dogRowToApi(row, notesForDogStmt.all(row.id))
  );
  res.json(dogs);
});

// POST /api/dogs
router.post("/", (req, res) => {
  const { name, size, address, postcode, keysafe, instructions, phone, groupNote } =
    req.body || {};

  if (!name || !size || !address) {
    return res
      .status(400)
      .json({ error: "name, size and address are required" });
  }
  if (!["S", "M", "L"].includes(size)) {
    return res.status(400).json({ error: "size must be one of S, M, L" });
  }

  const { max } = db
    .prepare("SELECT MAX(order_num) AS max FROM dogs")
    .get();
  const nextOrder = (max ?? -1) + 1;

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO dogs (
      id, name, size, address, postcode, district, keysafe,
      instructions, phone, group_note, order_num, archived,
      photo_path, created_at
    ) VALUES (
      @id, @name, @size, @address, @postcode, NULL, @keysafe,
      @instructions, @phone, @groupNote, @orderNum, 0,
      NULL, @createdAt
    )`
  ).run({
    id,
    name,
    size,
    address,
    postcode: postcode || null,
    keysafe: keysafe || null,
    instructions: instructions || null,
    phone: phone || null,
    groupNote: groupNote || null,
    orderNum: nextOrder,
    createdAt: now,
  });

  const row = db.prepare("SELECT * FROM dogs WHERE id = ?").get(id);
  res.status(201).json(dogRowToApi(row, []));
});

// PATCH /api/dogs/:id
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const existing = db.prepare("SELECT * FROM dogs WHERE id = ?").get(id);
  if (!existing) {
    return res.status(404).json({ error: "Dog not found" });
  }

  const fieldMap = {
    name: "name",
    size: "size",
    address: "address",
    postcode: "postcode",
    district: "district",
    keysafe: "keysafe",
    instructions: "instructions",
    phone: "phone",
    groupNote: "group_note",
    archived: "archived",
  };

  const updates = [];
  const values = {};

  for (const [apiKey, column] of Object.entries(fieldMap)) {
    if (Object.prototype.hasOwnProperty.call(req.body || {}, apiKey)) {
      let value = req.body[apiKey];
      if (apiKey === "size" && !["S", "M", "L"].includes(value)) {
        return res.status(400).json({ error: "size must be one of S, M, L" });
      }
      if (apiKey === "archived") value = value ? 1 : 0;
      updates.push(`${column} = @${column}`);
      values[column] = value;
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "No updatable fields provided" });
  }

  values.id = id;
  db.prepare(`UPDATE dogs SET ${updates.join(", ")} WHERE id = @id`).run(
    values
  );

  const row = db.prepare("SELECT * FROM dogs WHERE id = ?").get(id);
  res.json(dogRowToApi(row, notesForDogStmt.all(id)));
});

// POST /api/dogs/:id/notes
router.post("/:id/notes", (req, res) => {
  const { id } = req.params;
  const { text } = req.body || {};

  const dog = db.prepare("SELECT id FROM dogs WHERE id = ?").get(id);
  if (!dog) {
    return res.status(404).json({ error: "Dog not found" });
  }
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "text is required" });
  }

  const now = new Date().toISOString();
  const result = db
    .prepare("INSERT INTO notes (dog_id, text, created_at) VALUES (?, ?, ?)")
    .run(id, text.trim(), now);

  res.status(201).json({
    id: result.lastInsertRowid,
    text: text.trim(),
    createdAt: now,
  });
});

// POST /api/dogs/:id/photo (multipart/form-data, field "photo")
router.post("/:id/photo", upload.single("photo"), (req, res) => {
  const { id } = req.params;
  const dog = db.prepare("SELECT id FROM dogs WHERE id = ?").get(id);
  if (!dog) {
    if (req.file) fs.unlink(req.file.path, () => {});
    return res.status(404).json({ error: "Dog not found" });
  }
  if (!req.file) {
    return res.status(400).json({ error: "photo file is required" });
  }

  const photoPath = `uploads/${req.file.filename}`;
  db.prepare("UPDATE dogs SET photo_path = ? WHERE id = ?").run(
    photoPath,
    id
  );

  res.status(201).json({ photoPath });
});

// Multer error handler (e.g. wrong file type, too large) for this router.
router.use((err, _req, res, next) => {
  if (err instanceof multer.MulterError || /image uploads/i.test(err.message)) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

module.exports = router;
