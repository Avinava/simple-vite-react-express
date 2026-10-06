# AGENTS.md — AI Agent Instructions

Single source of truth for AI coding agents. `CLAUDE.md` and `GEMINI.md` import this file; don't duplicate rules there. Task recipes live in `.agent/workflows/`.

## Overview

**simple-vite-react-express** is a full-stack starter: a small CRM (contacts, tasks, projects) with real CRUD, relationships and forms.

**Goal:** stay simple, clean and well documented. Prefer small readable code over clever abstractions or feature breadth. No auth, Docker, or TypeScript on purpose. A TypeScript successor exists (`agentic-react-express-ts`); don't port features from it.

```
Client (React 19 + MUI 7) → API (Express 5) → Prisma 7 (pg adapter) → PostgreSQL
```

- **Client:** Pages → Hooks → Services → Axios → API
- **Server:** Routes → Services → Prisma

## Setup

```bash
nvm use                  # Node 22+ (see .nvmrc)
npm install
cp example.env .env      # set DATABASE_URL; the database must already exist
npm run db:setup         # migrations + Prisma client (required before first run)
npm run db:seed          # optional, idempotent sample data
npm run dev              # client :3000, API :8080 (Vite proxies /api)
```

If port 8080 is taken, set `PORT` in `.env` (the Vite proxy reads it).

## Verify before finishing

```bash
npm run lint && npm run format:check && npm run test:run && npm run build
```

CI runs the same on Node 22 and 24. Lint must have 0 errors. Run `npm run format` to fix style.

## Coding conventions

- **ESM only**, no `require()`. **No TypeScript**: JSDoc for types.
- **Functional components** only (the one exception is `ErrorBoundary`, which React requires to be a class).
- **Never call axios from pages or components.** Use a hook; hooks call `src/client/services/`.
- **MUI** for UI, `sx` prop for styling (no inline `style`), Grid v2 `size={{ xs: 12, md: 6 }}` (not `<Grid item>`).
- **Dark mode:** colors come from the theme (`getTheme(mode)` in `src/client/theme/theme.js`); don't hardcode hex colors in components.
- **Prettier:** single quotes, 100 columns. Match the surrounding comment density.
- **Commits:** conventional (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`). No co-author or "generated with" lines.

## Server patterns

- **Routes are thin:** validate with `celebrate`/Joi (schemas at the top of the route file), call a service, reply with `successResponse(...)` from `src/server/utils/response.js`.
- **No try/catch in handlers.** Express 5 forwards async errors to `src/server/middleware/error.js`, which maps Prisma `P2025`→404, `P2002`/`P2003`→409 and hides 5xx details outside development. For expected failures `throw httpError(404, 'Thing not found')`.
- **Response envelope:** `{ success, data, message, timestamp }`, for errors too.
- **Config:** read `process.env` only in `src/server/config/index.js`.
- **Database:** use the singleton `db.prisma` from `src/server/services/database.js`.
- Unknown `/api/*` paths return a JSON 404; everything else falls through to the SPA.

## Client patterns

- Services return `response.data` unwrapped by the axios interceptor in `services/api.js`, which also toasts errors. Hooks should not toast the same error again.
- List pages show `CardGridSkeleton` while loading, `ErrorState` on failure and `EmptyState` when empty (`components/PageState.jsx`).
- Destructive actions use `ConfirmationDialog`, never `window.confirm`.
- Theme mode lives in `AppContext` (`useAppContext`), mounted in `src/client/index.jsx`.

## Adding a resource (checklist)

1. `prisma/schema.prisma` → `npm run db:migrate`; add seed data in `prisma/seed.js`
2. `src/server/services/<name>.service.js`, `src/server/routes/v1/<name>.route.js`, mount in `routes/v1/index.js`
3. `src/client/services/<name>.js` (URLs must match the routes; see `docs/api.md`), export from `services/index.js`
4. `src/client/hooks/use<Name>.js`, export from `hooks/index.js`
5. Page in `src/client/pages/`, route in `src/client/index.jsx`, nav item in `components/Header.jsx`
6. Tests for the hook and any new server logic; update `docs/api.md` and `CHANGELOG.md`

## Testing

`npm test` (watch), `npm run test:run` (CI), `npm run test:coverage`. Vitest 4 + React Testing Library, jsdom.

- Client tests: `src/client/__tests__/`; server tests: `src/server/__tests__/` (JS, no DB needed; mock services).
- Setup file `src/client/__tests__/setup.js` mocks `localStorage` and `matchMedia`; assert on the mock (`localStorage.setItem` calls), not stored values.
- Components using the theme toggle need `AppProvider`; links need a router.
- Mock hooks' dependencies with `vi.mock('../../services', ...)` as in `hooks/useTasks.test.js`.

## Gotchas

- Create endpoints are `POST /task/create` and `POST /project/create`, but `POST /contact`.
- `npm run db:setup` runs `prisma migrate dev` and may prompt for a migration name.
- `.env` is gitignored and may hold real credentials: never print, commit or copy its values.
- Don't switch package managers or commit another lockfile (npm only, `package-lock.json`).
- `package.json` `overrides` pin patched transitive deps (audit fixes); keep them until the parent package updates.

## Key files

| File | Purpose |
|------|---------|
| `src/server/index.js` | Express entry: middleware order, CORS, SPA fallback, shutdown |
| `src/server/middleware/error.js` | Central error handler, `httpError`, API 404 |
| `src/server/routes/v1/` | Resource routes + `/health` |
| `src/client/index.jsx` | React entry: providers, theme, routes |
| `src/client/context/AppContext.jsx` | Dark mode state |
| `prisma/schema.prisma`, `prisma.config.ts` | Schema; CLI connection and seed hook |
| `docs/` | Human docs: getting started, architecture, API, troubleshooting |
