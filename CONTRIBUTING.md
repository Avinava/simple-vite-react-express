# Contributing

The goal is to stay **simple, clean and well documented**. Small, focused PRs are best.

## Setup

See [Getting Started](docs/getting-started.md). In short:

```bash
nvm use && npm install
cp example.env .env      # edit DATABASE_URL
npm run db:setup && npm run db:seed
npm run dev
```

## Before opening a PR

```bash
npm run lint && npm run format:check && npm run test:run && npm run build
```

## Conventions

- ESM only, no TypeScript (use JSDoc), functional components.
- Client: Pages → Hooks → Services → Axios. Never call axios from a page.
- Server: Routes → Services → Prisma.
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`.

More detail lives in [AGENTS.md](AGENTS.md).
