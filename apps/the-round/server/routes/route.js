const express = require("express");
const db = require("../db");

const router = express.Router();

function isValidMode(mode) {
  return mode === "am" || mode === "pm";
}

// GET /api/routes/:mode
router.get("/:mode", (req, res) => {
  const { mode } = req.params;
  if (!isValidMode(mode)) {
    return res.status(400).json({ error: "mode must be am or pm" });
  }

  const stops = db
    .prepare(
      "SELECT dog_id FROM route_stops WHERE mode = ? ORDER BY position ASC"
    )
    .all(mode);
  const meta = db
    .prepare("SELECT saved_at FROM route_meta WHERE mode = ?")
    .get(mode);

  res.json({
    dogIds: stops.map((s) => s.dog_id),
    savedAt: meta ? meta.saved_at : null,
  });
});

// PUT /api/routes/:mode  { dogIds: [...] }
router.put("/:mode", (req, res) => {
  const { mode } = req.params;
  if (!isValidMode(mode)) {
    return res.status(400).json({ error: "mode must be am or pm" });
  }

  const { dogIds } = req.body || {};
  if (!Array.isArray(dogIds)) {
    return res.status(400).json({ error: "dogIds must be an array" });
  }

  // Validate every dog id exists so we never save a dangling reference.
  const existing = db
    .prepare(
      `SELECT id FROM dogs WHERE id IN (${dogIds.map(() => "?").join(",") || "NULL"})`
    )
    .all(...dogIds);
  const existingIds = new Set(existing.map((r) => r.id));
  const unknown = dogIds.filter((id) => !existingIds.has(id));
  if (unknown.length > 0) {
    return res
      .status(400)
      .json({ error: `Unknown dog id(s): ${unknown.join(", ")}` });
  }

  const now = new Date().toISOString();

  const replaceRoute = db.transaction((mode, ids, savedAt) => {
    db.prepare("DELETE FROM route_stops WHERE mode = ?").run(mode);
    const insert = db.prepare(
      "INSERT INTO route_stops (mode, position, dog_id) VALUES (?, ?, ?)"
    );
    ids.forEach((dogId, position) => {
      insert.run(mode, position, dogId);
    });
    db.prepare(
      `INSERT INTO route_meta (mode, saved_at) VALUES (?, ?)
       ON CONFLICT(mode) DO UPDATE SET saved_at = excluded.saved_at`
    ).run(mode, savedAt);
  });

  replaceRoute(mode, dogIds, now);

  res.json({ dogIds, savedAt: now });
});

module.exports = router;
