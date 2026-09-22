const fs = require("fs");
const path = require("path");

const SEED_PATH = path.join(__dirname, "dogs.seed.json");

/**
 * Loads dogs.seed.json into an empty `dogs` table.
 * Guarded by a row-count check so re-running (e.g. on every boot, or after
 * a redeploy) never duplicates or wipes real data.
 */
function seedIfEmpty(db) {
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM dogs").get();
  if (count > 0) {
    return { seeded: false, count };
  }

  const dogs = JSON.parse(fs.readFileSync(SEED_PATH, "utf8"));

  const insert = db.prepare(`
    INSERT INTO dogs (
      id, name, size, address, postcode, district, keysafe,
      instructions, phone, group_note, order_num, archived,
      photo_path, created_at
    ) VALUES (
      @id, @name, @size, @address, @postcode, @district, @keysafe,
      @instructions, @phone, @group_note, @order_num, 0,
      NULL, @created_at
    )
  `);

  const insertAll = db.transaction((rows) => {
    rows.forEach((dog, index) => {
      insert.run({
        id: dog.id,
        name: dog.name,
        size: dog.size,
        address: dog.address,
        postcode: dog.postcode || null,
        district: dog.district || null,
        keysafe: dog.keysafe || null,
        instructions: dog.instructions || null,
        phone: dog.phone || null,
        group_note: dog.groupNote || null,
        order_num: index,
        created_at: new Date().toISOString(),
      });
    });
  });

  insertAll(dogs);

  return { seeded: true, count: dogs.length };
}

module.exports = { seedIfEmpty };
