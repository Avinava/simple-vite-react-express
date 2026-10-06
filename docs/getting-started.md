# Getting Started

From zero to a running app in about five minutes.

## 1. Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 22 or newer (`.nvmrc` pins 22) | `node -v` |
| npm | ships with Node | `npm -v` |
| PostgreSQL | 14 or newer | `pg_isready` |

Don't have PostgreSQL? Any of these works:

- **macOS:** `brew install postgresql@17 && brew services start postgresql@17`
- **Windows / Linux:** installers at [postgresql.org/download](https://www.postgresql.org/download/)
- **Hosted (no install):** a free database from [Neon](https://neon.tech) or [Supabase](https://supabase.com); paste its connection string as `DATABASE_URL`.

## 2. Get the code

```bash
# Option A: fresh project without git history
npx degit Avinava/simple-vite-react-express my-project

# Option B: clone
git clone https://github.com/Avinava/simple-vite-react-express.git my-project

cd my-project
nvm use        # or: mise install
npm install
```

## 3. Configure

```bash
cp example.env .env
```

Edit `.env` and set `DATABASE_URL`, for example:

```
DATABASE_URL="postgres://your-user:your-password@localhost:5432/simple-vite-db"
```

The database itself must exist (`createdb simple-vite-db`); Prisma creates the tables, not the database.

## 4. Create tables and sample data

```bash
npm run db:setup   # runs migrations + generates the Prisma client
npm run db:seed    # optional demo contacts, tasks and projects
```

## 5. Run

```bash
npm run dev
```

| Service | URL |
|---------|-----|
| React app (Vite) | http://localhost:3000 |
| API (Express) | http://localhost:8080/api/v1 |
| Health check | http://localhost:8080/api/v1/health |

You should see the home page with a green "database connected" message. If you see the
database setup guide instead, jump to [Troubleshooting](troubleshooting.md).

## Make it yours

1. Rename the project in `package.json` and `index.html`.
2. Replace `public/template-logo.png`.
3. Tweak colors in `src/client/theme/theme.js`.
4. Replace the demo models in `prisma/schema.prisma`, then `npm run db:migrate`.
5. Replace routes, services, hooks and pages (see the table in [Architecture](architecture.md#removing-the-demo)).
