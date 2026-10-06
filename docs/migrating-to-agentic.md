# Migrating to `agentic-react-express-ts`

[`agentic-react-express-ts`](https://github.com/Avinava/agentic-react-express-ts) is the successor to this
template: the same stack ported to TypeScript end-to-end with tRPC, pre-wired guardrails
(Lefthook + ESLint + Knip + Vitest + Gitleaks on every commit) and agent skill files.
Use it for new projects, or have your AI coding agent migrate this repo for you.

**Paste this to Claude Code, Codex, Cursor, Copilot, or Gemini CLI** (run it from this repo's root):

```
Fetch and follow these in order:
  1. https://raw.githubusercontent.com/Avinava/agentic-react-express-ts/main/AGENTS.md
  2. https://raw.githubusercontent.com/Avinava/agentic-react-express-ts/main/skills/onboard-an-agent/SKILL.md
  3. https://raw.githubusercontent.com/Avinava/agentic-react-express-ts/main/skills/add-resource/SKILL.md
  4. https://raw.githubusercontent.com/Avinava/agentic-react-express-ts/main/skills/remove-demo-code/SKILL.md
  5. https://raw.githubusercontent.com/Avinava/agentic-react-express-ts/main/skills/self-correcting-loop/SKILL.md
Then interview me about migrating this simple-vite-react-express project to the TypeScript + tRPC + guardrails template. Propose a step-by-step plan and confirm with me before any destructive change. Implement the migration in order: TS configs and guardrails first (eslint.config.js, lefthook.yml, knip.json, commitlint.config.ts, tsconfig*.json), then the Prisma schema and tRPC routers (replacing src/server/routes/v1 with tRPC routers in src/server/routers and Zod schemas in src/shared/schemas), then the React client (porting src/client to TSX with the tRPC + TanStack Query hooks), then verify with `npm run typecheck && npm run lint && npm run lint:unused && npm run test:run && npm run build` before committing. Never use --no-verify.
```
