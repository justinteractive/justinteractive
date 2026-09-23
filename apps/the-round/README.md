# The Round

A mobile-first dog-run scheduler. Fully self-contained Express + SQLite app —
its own process, port, and database — living as a sibling app inside the
portfolio repo at `apps/the-round/`. It shares nothing with the portfolio
(Next.js) app: no shared dependencies, no shared build step, no shared port.

## Stack

- Node.js + Express (CommonJS, no build step)
- SQLite via `better-sqlite3`
- `multer` for photo uploads
- Vanilla HTML/CSS/JS frontend (`public/`) — no framework, no bundler

## Local development

```bash
cd apps/the-round
npm install
cp .env.example .env   # then edit BASIC_AUTH_USER / BASIC_AUTH_PASS
npm start
```

The server prints the port it's listening on (default `4100`). On first boot
it creates `data/theround.sqlite`, runs the migration in
`server/migrations/001_init.sql`, and seeds all 53 dogs from
`server/seed/dogs.seed.json`. This seed step is guarded by a row-count check,
so it's safe to restart the app — it will never duplicate or wipe real data
once dogs exist.

Because the whole app (including `/`, `/api/*`, and `/uploads/*`) sits behind
app-level HTTP Basic Auth, your browser will prompt for the
`BASIC_AUTH_USER` / `BASIC_AUTH_PASS` credentials from `.env` the first time
you open it.

### Why credentials-agnostic asset paths matter

`index.html`, `styles.css`, `app.js`, and every `fetch()` call in `app.js`
use **relative** paths (`api/dogs`, `styles.css`, `uploads/xyz.jpg` — never a
leading `/`). This means the exact same build works unmodified whether it's
opened at the domain root (`http://localhost:4100/`, local dev) or mounted
under a subpath in production (`https://justinteractive.co.uk/the-round/`,
via Apache). No `BASE_PATH` env var or build step is needed — don't add
absolute (`/api/...`) paths to the frontend, or it will break under the
subpath in production.

## Data model

- `dogs` — one row per dog. **No hard deletes.** Retiring a dog is a
  `PATCH /api/dogs/:id { "archived": true }`, never a `DELETE`, so keysafe
  codes, addresses, and note history are never silently lost.
- `notes` — free-text note log per dog, newest first.
- `runs` — a calendar-scheduled walk: freeform `title` (e.g.
  "Justin + Nigel AM") + `date` (`YYYY-MM-DD`). Any number of runs can exist
  on the same day. Unlike dogs, runs **can** be deleted outright — they're
  ordinary calendar events with no keysafe/PII risk in a title+date.
- `run_stops` — ordered list of dog IDs per run.

The frontend's landing page is a week-by-week calendar/agenda view (full
history kept, scrollable back indefinitely). Each run renders as a coloured
pill, auto-coloured by scanning its title for the standalone word "AM" or
"PM" (case-insensitive) — no separate time field to keep run creation to
just a title + date.

## API

| Method | Path | Notes |
| --- | --- | --- |
| `GET /api/dogs?includeArchived=true` | List dogs (with embedded notes) |
| `POST /api/dogs` | Create a dog — `name`, `size` (`S`/`M`/`L`), `address` required |
| `PATCH /api/dogs/:id` | Partial update, any subset of fields incl. `archived` |
| `POST /api/dogs/:id/notes` | Append a note — `{ "text": "..." }` |
| `POST /api/dogs/:id/photo` | `multipart/form-data`, field name `photo` |
| `GET /api/runs` | List every run (past + future), each with derived `color` and `dogIds` |
| `POST /api/runs` | Create a run — `{ "title": "...", "date": "YYYY-MM-DD" }` |
| `GET /api/runs/:id` | Single run detail |
| `PATCH /api/runs/:id` | Rename and/or move a run — `{ "title"?, "date"? }` |
| `PUT /api/runs/:id/stops` | `{ dogIds: [...] }` — replaces the ordered stop list |
| `DELETE /api/runs/:id` | Delete a run outright (cascades its stops) |

Request bodies (addresses, keysafe codes, notes) are **never written to
logs** — only `method path status duration` is logged per request.

## Deploying to the VDS

These steps run **on the server**, after this repo (or just
`apps/the-round/`) has been pulled/copied there. This agent has no SSH/VDS
access — everything below is for you to run manually.

### 1. Install & start with PM2

```bash
cd /path/to/justinteractive/apps/the-round
npm install --production
cp .env.example .env
# edit .env: set PORT, and STRONG BASIC_AUTH_USER / BASIC_AUTH_PASS values
pm2 start server/index.js --name the-round --env production
pm2 save
pm2 startup   # follow the printed instructions to enable boot-time startup
```

> **`better-sqlite3` native build:** this package ships prebuilt binaries for
> most common Node versions/platforms, so `npm install` alone usually just
> works. If install fails while compiling from source, install build tools
> first (Debian/Ubuntu: `sudo apt-get install -y build-essential python3`)
> and re-run `npm install`.

### 2. Apache reverse proxy (`justinteractive.co.uk/the-round/`)

Enable the required modules once:

```bash
sudo a2enmod proxy proxy_http headers
```

Add this to the relevant `<VirtualHost>` block (same vhost that serves the
portfolio's static `out/` files at the domain root):

```apache
# --- The Round (proxied to the local Node process) ---
ProxyPreserveHost On
ProxyPass /the-round/ http://127.0.0.1:4100/
ProxyPassReverse /the-round/ http://127.0.0.1:4100/

<Location /the-round/>
    AuthType Basic
    AuthName "The Round"
    AuthUserFile /etc/apache2/.htpasswd-the-round
    Require valid-user
</Location>

<Location /the-round/uploads/>
    Options -Indexes
</Location>
```

Note the **trailing slashes** on both sides of `ProxyPass`/`ProxyPassReverse`
— this strips the `/the-round/` prefix before the request reaches Express,
which is exactly why the frontend's relative asset/fetch paths work
unmodified in both environments (see above).

Create the Apache-level Basic Auth file (this is a **second, independent**
layer of auth in front of the app's own — defense in depth, since this data
includes home addresses and physical access codes):

```bash
sudo htpasswd -c /etc/apache2/.htpasswd-the-round yourusername
sudo systemctl reload apache2
```

### 3. Verify

```bash
curl -u yourusername:yourpassword https://justinteractive.co.uk/the-round/api/dogs
```

You should be prompted twice in a browser in the worst case (Apache's
Basic Auth, then the app's own) — using the same credentials for both keeps
this to a single prompt in practice if you set them identically.

## Security notes

- Change `BASIC_AUTH_USER`/`BASIC_AUTH_PASS` in `.env` before deploying —
  the app logs a warning on boot if it detects the placeholder defaults
  while `NODE_ENV=production`.
- `data/`, `uploads/`, and `.env` are gitignored (see root `.gitignore`) —
  never commit real dog data, photos, or credentials.
- No hard deletes anywhere in the API — archiving is the only way to retire
  a dog, so mistakes are always recoverable.

## Repo layout

```
apps/the-round/
├── package.json
├── .env.example
├── README.md
├── server/
│   ├── index.js          # Express entry: auth, static, routers, seed-on-boot
│   ├── db.js              # opens/creates SQLite, runs migrations
│   ├── migrations/001_init.sql
│   ├── seed/
│   │   ├── dogs.seed.json
│   │   └── seed.js
│   └── routes/
│       ├── dogs.js
│       └── route.js
├── public/                # served as-is, no build step
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── data/                  # gitignored — created at runtime (SQLite file)
└── uploads/                # gitignored — created at runtime (dog photos)
```
