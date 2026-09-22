require("dotenv").config();

const path = require("path");
const crypto = require("crypto");
const express = require("express");

const db = require("./db");
const { seedIfEmpty } = require("./seed/seed");
const dogsRouter = require("./routes/dogs");
const routeRouter = require("./routes/route");

const PORT = process.env.PORT || 4100;
const UPLOADS_DIR = path.resolve(
  __dirname,
  "..",
  process.env.UPLOADS_DIR || "./uploads"
);
const PUBLIC_DIR = path.join(__dirname, "..", "public");

// Seed on boot — guarded by a row-count check inside seedIfEmpty, so
// redeploying/restarting never duplicates or wipes real data.
const seedResult = seedIfEmpty(db);
if (seedResult.seeded) {
  console.log(`[the-round] Seeded ${seedResult.count} dogs.`);
} else {
  console.log(`[the-round] dogs table already has ${seedResult.count} row(s), skipping seed.`);
}

const app = express();
app.disable("x-powered-by");

// ---------------------------------------------------------------------------
// Basic Auth — enforced at the app level (in addition to Apache's own
// Basic Auth once deployed). This data includes home addresses and physical
// keysafe/door codes, so every route (static assets, API, uploads) must be
// behind auth with no exceptions.
// ---------------------------------------------------------------------------
const AUTH_USER = process.env.BASIC_AUTH_USER || "changeme";
const AUTH_PASS = process.env.BASIC_AUTH_PASS || "changeme";

if (process.env.NODE_ENV === "production" && (AUTH_USER === "changeme" || AUTH_PASS === "changeme")) {
  console.warn(
    "[the-round] WARNING: running in production with default Basic Auth credentials. " +
      "Set BASIC_AUTH_USER / BASIC_AUTH_PASS in .env before exposing this publicly."
  );
}

function timingSafeStringEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) {
    // Still run a comparison of equal-length buffers to avoid leaking
    // length information via timing.
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

function basicAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, encoded] = header.split(" ");

  if (scheme === "Basic" && encoded) {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex !== -1) {
      const user = decoded.slice(0, separatorIndex);
      const pass = decoded.slice(separatorIndex + 1);
      if (
        timingSafeStringEqual(user, AUTH_USER) &&
        timingSafeStringEqual(pass, AUTH_PASS)
      ) {
        return next();
      }
    }
  }

  res.set("WWW-Authenticate", 'Basic realm="The Round"');
  return res.status(401).send("Authentication required.");
}

app.use(basicAuth);

// ---------------------------------------------------------------------------
// Logging — never log keysafe codes, addresses or notes. Method/path/status
// only; request bodies are never logged.
// ---------------------------------------------------------------------------
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(
      `[the-round] ${req.method} ${req.path} ${res.statusCode} ${Date.now() - start}ms`
    );
  });
  next();
});

app.use(express.json());

// Static assets — served relative so the app works unchanged whether it's
// mounted at the root (local dev) or behind Apache's ProxyPass /the-round/
// (production): index.html/app.js/styles.css use relative (no leading "/")
// references, and app.js's fetch() calls use relative "api/..." paths.
app.use(express.static(PUBLIC_DIR));
app.use("/uploads", express.static(UPLOADS_DIR));

app.use("/api/dogs", dogsRouter);
app.use("/api/routes", routeRouter);

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("[the-round] Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`[the-round] Listening on http://localhost:${PORT}`);
});
