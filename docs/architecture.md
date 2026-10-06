# Architecture

```
Browser ──► React 19 + MUI 7 ──► Express 5 ──► Prisma 7 ──► PostgreSQL
            (Vite dev: :3000)    (:8080)
```

Both sides use the same layered idea: each layer talks only to the one below it.

| Side | Flow |
|------|------|
| Client | Pages → Hooks → Services → Axios → API |
| Server | Routes → Services → Prisma → PostgreSQL |

## Folder map

```
src/
├── client/
│   ├── components/   Reusable UI (Header, ConfirmationDialog, ...)
│   ├── context/      App-wide state (theme mode)
│   ├── hooks/        Data hooks: useContacts, useTasks, useProjects, useHealthCheck
│   ├── pages/        One component per route
│   ├── services/     API calls; api.js is the shared axios instance
│   ├── theme/        MUI theme
│   └── __tests__/    Vitest + React Testing Library
└── server/
    ├── config/       Env parsing, one source of truth
    ├── middleware/   Security (helmet, rate limit), validation (celebrate/Joi)
    ├── routes/v1/    HTTP layer, one file per resource
    ├── services/     Business logic + Prisma queries
    └── utils/        Response envelope helpers
prisma/               schema.prisma, migrations, seed.js
scripts/              setup.js
```

## Key rules

- **Pages never call axios.** They use a hook; the hook uses a service.
- **Routes stay thin.** Validate, call a service, send the response envelope.
- **One config module.** Read `process.env` only in `src/server/config/index.js`.
- **JSDoc, not TypeScript.** Keep the project approachable.

## Dev vs production

- **Dev:** Vite serves the client on `:3000` and proxies `/api` to Express on `:8080`.
- **Prod:** `npm run build` writes `dist/`; `npm start` runs Express, which serves `dist/` and the API from one port.

## Removing the demo

| Part | Location | Action |
|------|----------|--------|
| Schema | `prisma/schema.prisma` | Replace with your models |
| Routes | `src/server/routes/v1/` | Replace with your routes |
| Services | `src/server/services/` | Replace with your logic |
| Pages | `src/client/pages/` | Replace with your pages |
| Hooks | `src/client/hooks/` | Replace with your data hooks |
| Services | `src/client/services/` | Replace with your API calls |
