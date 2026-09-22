-- The Round — initial schema.
-- No hard deletes anywhere: dogs are archived (archived=1), never removed,
-- so keysafe codes and history are never silently lost.

CREATE TABLE IF NOT EXISTS dogs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  size TEXT NOT NULL CHECK (size IN ('S', 'M', 'L')),
  address TEXT NOT NULL,
  postcode TEXT,
  district TEXT,
  keysafe TEXT,
  instructions TEXT,
  phone TEXT,
  group_note TEXT,
  order_num INTEGER NOT NULL,
  archived INTEGER NOT NULL DEFAULT 0,
  photo_path TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dog_id TEXT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS route_stops (
  mode TEXT NOT NULL CHECK (mode IN ('am', 'pm')),
  position INTEGER NOT NULL,
  dog_id TEXT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  PRIMARY KEY (mode, position)
);

CREATE TABLE IF NOT EXISTS route_meta (
  mode TEXT PRIMARY KEY CHECK (mode IN ('am', 'pm')),
  saved_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_notes_dog_id ON notes(dog_id);
CREATE INDEX IF NOT EXISTS idx_route_stops_dog_id ON route_stops(dog_id);
CREATE INDEX IF NOT EXISTS idx_dogs_order_num ON dogs(order_num);
