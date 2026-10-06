# GEMINI.md — Project Instructions for Gemini AI

## Tech Stack

- **Frontend**: React 19, Vite 7, MUI 7, React Router 7
- **Backend**: Express 5 (ESM), Node.js 22+
- **Database**: PostgreSQL with Prisma 7 (driver adapter pattern)
- **Testing**: Vitest 4, React Testing Library
- **Linting**: ESLint 9 (flat config), Prettier

## Conventions

- **Module system**: ESM (`"type": "module"`) — use `import`/`export`, never `require`
- **No TypeScript**: Plain JavaScript with JSDoc type annotations
- **Formatting**: Prettier with single quotes, trailing commas, 100 char width
- **Components**: Functional React components with hooks, no class components
- **State management**: React Context + custom hooks pattern (no Redux)
- **API layer**: Client services (`src/client/services/`) → hooks (`src/client/hooks/`) → pages
- **Server pattern**: Express routes → service layer → Prisma client

## Project Structure

```
src/
  client/          # React frontend
    components/    # Reusable UI components
    pages/         # Route-level page components
    hooks/         # Custom React hooks (data fetching, state)
    services/      # API service modules (axios-based)
    context/       # React Context providers
    theme/         # MUI theme configuration
    __tests__/     # Vitest + RTL tests
  server/          # Express backend
    config/        # Database & server configuration
    middleware/    # Express middleware (validation, error handling)
    routes/        # API route definitions
    services/      # Business logic layer
    utils/         # Server utilities
prisma/            # Prisma schema and migrations
```

## Database

Prisma 7 uses the **driver adapter pattern** (`@prisma/adapter-pg`). Database connection is configured in `src/server/config/database.js` using a `pg.Pool` wrapped with `PrismaPg` adapter. The `prisma.config.ts` file handles CLI connection (migrations).

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start client + server concurrently |
| `npm run server` | Start Express with `node --watch` |
| `npm run client` | Start Vite dev server |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once (CI) |
| `npm run lint` | Check ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run db:setup` | Run Prisma migrations |
| `npm run db:seed` | Seed sample data |

## When Modifying Code

1. **New API endpoints**: Add route in `src/server/routes/v1/`, service in `src/server/services/`, client service in `src/client/services/`, hook in `src/client/hooks/`, then use hook in page
2. **New models**: Modify `prisma/schema.prisma`, run `npm run db:migrate`
3. **New pages**: Add component in `src/client/pages/`, add route in `src/client/index.jsx`, add nav link in `Header.jsx`
4. **Always use existing hooks/services** — never call axios directly from page components
