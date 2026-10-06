---
description: Database migrations, seeding, and schema changes
---

## Setup Database (First Time)

1. Make sure PostgreSQL is running, the database exists (`createdb simple-vite-db`) and `DATABASE_URL` is set in `.env`. Never print `.env` values.

// turbo
2. Run migrations and generate the Prisma client (may prompt for a migration name):
```bash
npm run db:setup
```

// turbo
3. Seed sample data (idempotent: skips if contacts already exist):
```bash
npm run db:seed
```

## Create a New Migration

// turbo
4. After editing `prisma/schema.prisma`:
```bash
npm run db:migrate
```

## Reset Database

5. Destructive: drops all data, re-applies migrations and runs the seed. Confirm with the user first.
```bash
npm run db:reset
```

## Generate Prisma Client

// turbo
6. After schema changes or a fresh `npm install`:
```bash
npm run db:generate
```

## Add a New Model

7. Edit `prisma/schema.prisma`; add `@@index` on foreign keys you filter by
8. `npm run db:migrate`
9. Add seed data in `prisma/seed.js`
10. Continue with the full-stack checklist in `dev.md`
