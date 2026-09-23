-- The Round — calendar redesign.
-- Replaces the old singleton "am"/"pm" route concept with freeform, titled
-- "runs" placed on a calendar date (e.g. "Justin + Nigel AM"). Any number
-- of runs can exist per day. Runs are ordinary calendar events — unlike
-- dogs, they can be deleted outright (no keysafe/PII risk in a title+date).

DROP TABLE IF EXISTS route_stops;
DROP TABLE IF EXISTS route_meta;

CREATE TABLE IF NOT EXISTS runs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL, -- ISO date, e.g. 2026-09-23
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS run_stops (
  run_id TEXT NOT NULL REFERENCES runs(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  dog_id TEXT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  PRIMARY KEY (run_id, position)
);

CREATE INDEX IF NOT EXISTS idx_runs_date ON runs(date);
CREATE INDEX IF NOT EXISTS idx_run_stops_run_id ON run_stops(run_id);
CREATE INDEX IF NOT EXISTS idx_run_stops_dog_id ON run_stops(dog_id);
