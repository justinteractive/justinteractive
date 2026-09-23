const express = require("express");
const crypto = require("crypto");
const db = require("../db");

const router = express.Router();

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function deriveColor(title) {
  if (/\bam\b/i.test(title)) return "am";
  if (/\bpm\b/i.test(title)) return "pm";
  return "neutral";
}

function stopsForRun(runId) {
  return db
    .prepare(
      "SELECT dog_id FROM run_stops WHERE run_id = ? ORDER BY position ASC"
    )
    .all(runId)
    .map((r) => r.dog_id);
}

function runRowToApi(row) {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    color: deriveColor(row.title),
    dogIds: stopsForRun(row.id),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// GET /api/runs — every run, past and future (calendar keeps full history).
router.get("/", (_req, res) => {
  const rows = db
    .prepare("SELECT * FROM runs ORDER BY date ASC, created_at ASC")
    .all();
  res.json(rows.map(runRowToApi));
});

// POST /api/runs  { title, date }
router.post("/", (req, res) => {
  const { title, date } = req.body || {};
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "title is required" });
  }
  if (!date || !DATE_RE.test(date)) {
    return res.status(400).json({ error: "date must be in YYYY-MM-DD format" });
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO runs (id, title, date, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run(id, title.trim(), date, now, now);

  const row = db.prepare("SELECT * FROM runs WHERE id = ?").get(id);
  res.status(201).json(runRowToApi(row));
});

// GET /api/runs/:id
router.get("/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM runs WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Run not found" });
  res.json(runRowToApi(row));
});

// PATCH /api/runs/:id  { title?, date? }
router.patch("/:id", (req, res) => {
  const existing = db.prepare("SELECT * FROM runs WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Run not found" });

  const { title, date } = req.body || {};
  const updates = [];
  const values = { id: req.params.id, updatedAt: new Date().toISOString() };

  if (title !== undefined) {
    if (!title.trim()) return res.status(400).json({ error: "title cannot be empty" });
    updates.push("title = @title");
    values.title = title.trim();
  }
  if (date !== undefined) {
    if (!DATE_RE.test(date)) {
      return res.status(400).json({ error: "date must be in YYYY-MM-DD format" });
    }
    updates.push("date = @date");
    values.date = date;
  }
  if (updates.length === 0) {
    return res.status(400).json({ error: "No updatable fields provided" });
  }

  updates.push("updated_at = @updatedAt");
  db.prepare(`UPDATE runs SET ${updates.join(", ")} WHERE id = @id`).run(values);

  const row = db.prepare("SELECT * FROM runs WHERE id = ?").get(req.params.id);
  res.json(runRowToApi(row));
});

// PUT /api/runs/:id/stops  { dogIds: [...] }
router.put("/:id/stops", (req, res) => {
  const run = db.prepare("SELECT * FROM runs WHERE id = ?").get(req.params.id);
  if (!run) return res.status(404).json({ error: "Run not found" });

  const { dogIds } = req.body || {};
  if (!Array.isArray(dogIds)) {
    return res.status(400).json({ error: "dogIds must be an array" });
  }

  const existingDogs = db
    .prepare(
      `SELECT id FROM dogs WHERE id IN (${dogIds.map(() => "?").join(",") || "NULL"})`
    )
    .all(...dogIds);
  const existingIds = new Set(existingDogs.map((r) => r.id));
  const unknown = dogIds.filter((id) => !existingIds.has(id));
  if (unknown.length > 0) {
    return res.status(400).json({ error: `Unknown dog id(s): ${unknown.join(", ")}` });
  }

  const now = new Date().toISOString();
  const replaceStops = db.transaction((runId, ids) => {
    db.prepare("DELETE FROM run_stops WHERE run_id = ?").run(runId);
    const insert = db.prepare(
      "INSERT INTO run_stops (run_id, position, dog_id) VALUES (?, ?, ?)"
    );
    ids.forEach((dogId, position) => insert.run(runId, position, dogId));
    db.prepare("UPDATE runs SET updated_at = ? WHERE id = ?").run(now, runId);
  });
  replaceStops(req.params.id, dogIds);

  const row = db.prepare("SELECT * FROM runs WHERE id = ?").get(req.params.id);
  res.json(runRowToApi(row));
});

// DELETE /api/runs/:id — runs are ordinary calendar events (no keysafe/PII
// risk in a title+date), so unlike dogs they can be deleted outright.
router.delete("/:id", (req, res) => {
  const run = db.prepare("SELECT id FROM runs WHERE id = ?").get(req.params.id);
  if (!run) return res.status(404).json({ error: "Run not found" });

  db.prepare("DELETE FROM runs WHERE id = ?").run(req.params.id);
  res.status(204).end();
});

module.exports = router;
