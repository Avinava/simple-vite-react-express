# Troubleshooting

## The home page shows the database setup guide

1. Is PostgreSQL running? `pg_isready -h localhost -p 5432`
2. Is `DATABASE_URL` set in `.env` (not only in `example.env`)?
3. Does the database exist? `psql -l` (create it with `createdb simple-vite-db`)
4. Did you run `npm run db:setup`?

## `Environment variable not found: DATABASE_URL` from Prisma

`.env` is missing or not in the project root. Run `cp example.env .env` and edit it.

## Port already in use (3000 or 8080)

```bash
# macOS / Linux
lsof -ti:3000 | xargs kill
lsof -ti:8080 | xargs kill
```

```powershell
# Windows
netstat -ano | findstr :8080
taskkill /PID <pid> /F
```

Or change `PORT` in `.env` (and keep the Vite proxy target in `vite.config.js` in sync).

## `@prisma/client did not initialize yet`

```bash
npm run db:generate
```

## Hot reload not working (Linux)

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## Build problems

```bash
npm run clean && rm -rf node_modules && npm install && npm run build
```

## Migrating to the TypeScript successor

See [migrating-to-agentic.md](migrating-to-agentic.md).
