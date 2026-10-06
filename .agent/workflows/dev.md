---
description: Start development servers and add new features
---

Rules and patterns are in `AGENTS.md`; this file is the step list.

## Start Development

// turbo
1. Start client and server together:
```bash
npm run dev
```

Client: http://localhost:3000, API: http://localhost:8080/api/v1 (health: `/api/v1/health`).
If 8080 is busy, set `PORT` in `.env`.

## Start Servers Separately

// turbo
2. Express with `node --watch`:
```bash
npm run server
```

// turbo
3. Vite:
```bash
npm run client
```

## Add a New Feature (Full Stack)

4. **Model**: edit `prisma/schema.prisma`, then `npm run db:migrate` (see `db.md`)
5. **Server service**: `src/server/services/<resource>.service.js`
6. **Server route**: `src/server/routes/v1/<resource>.route.js`: Joi schemas at the top, thin handlers, no try/catch, `throw httpError(404, ...)` for not-found
7. **Register route**: mount in `src/server/routes/v1/index.js`
8. **Client service**: `src/client/services/<resource>.js` (URLs must match the routes), export from `services/index.js`
9. **Client hook**: `src/client/hooks/use<Resource>.js`, export from `hooks/index.js`
10. **Client page**: `src/client/pages/<Resource>.jsx` using the hook, `PageState` components and `ConfirmationDialog`
11. **Route and nav**: `src/client/index.jsx` and `NAV_ITEMS` in `src/client/components/Header.jsx`
12. **Docs and tests**: add to `docs/api.md`, `CHANGELOG.md` and write a hook test (see `test.md`)

// turbo
13. Check everything:
```bash
npm run lint && npm run format:check && npm run test:run && npm run build
```
