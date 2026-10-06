# AGENTS.md — AI Agent Instructions

## Overview

**simple-vite-react-express** is a production-ready full-stack starter template. It demonstrates best practices for building React + Express applications with PostgreSQL.

**Goal**: Keep this project simple, clean, and well-documented as a learning/starter template.

## Architecture

```
Client (React 19 + MUI 7) → API Layer (Express 5) → Database (PostgreSQL via Prisma 7)
```

The codebase follows a layered pattern on both sides:

- **Client**: Pages → Hooks → Services → Axios → Server API
- **Server**: Routes → Services → Prisma → PostgreSQL

## Setup

```bash
nvm use                   # Node 22
npm install               # Install dependencies
cp example.env .env       # Create env file, then edit DATABASE_URL
npm run setup             # Interactive setup wizard
npm run db:setup          # Run Prisma migrations
npm run db:seed           # Optional: seed sample data
npm run dev               # Start dev servers
```

## Coding Conventions

- **ESM only** — `import`/`export`, no `require()`
- **No TypeScript** — use JSDoc for type hints
- **Functional components** — no class components
- **Custom hooks for data** — never call axios directly from pages
- **Service layer** — all API calls go through `src/client/services/`
- **MUI for UI** — use `@mui/material` components, `sx` prop for styling
- **Express 5** — async route handlers, no callback pattern

## Testing

```bash
npm test              # Watch mode
npm run test:run      # Single run (CI)
npm run test:coverage # With coverage report
```

- Framework: Vitest 4 + React Testing Library
- Test files: `src/client/__tests__/` and `src/server/__tests__/`
- Setup file: `src/client/__tests__/setup.js`

## Linting & Formatting

```bash
npm run lint          # Check
npm run lint:fix      # Auto-fix
npm run format        # Prettier
```

- ESLint 9 flat config (`eslint.config.js`)
- Prettier config (`.prettierrc`)

## Commit Style

Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`

## Key Files

| File | Purpose |
|------|---------|
| `src/server/index.js` | Express server entry point |
| `src/client/index.jsx` | React app entry with routing |
| `prisma/schema.prisma` | Database schema |
| `prisma.config.ts` | Prisma CLI configuration |
| `vite.config.js` | Vite build configuration |
| `vitest.config.js` | Test configuration |
| `eslint.config.js` | Linting rules |
