# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Banner, CI badge and a short successor-template callout in the README
- `docs/` (getting started, architecture, API, troubleshooting, migration guide)
- `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, `CLAUDE.md`
- GitHub Actions CI (lint, format check, test, build on Node 22 and 24), issue and PR templates

### Changed

- Dependencies bumped within current majors (Prisma 7.10, MUI 7.3.11, React 19.3, Express middleware, tooling)
- `react-router-dom` replaced by `react-router` (v7 ships the DOM bindings there)
- `npm run server` uses `node --watch` instead of nodemon
- README rewritten: correct versions, Node requirement and API routes; Quick Start now includes `db:setup`
- `example.env` documents `CORS_ORIGIN` and drops the unsupported `?schema=` suffix
- `.gitignore` trimmed to what this project uses

### Fixed

- API: CORS now honors `CORS_ORIGIN`; unknown `/api/*` paths return a JSON 404 instead of the SPA's HTML
- API: `/health` checks the database (503 when down) and is exempt from rate limiting
- API: Prisma errors map to 404 (missing record) / 409 (duplicate or still-referenced record) instead of 500
- API: contact routes validate `:id`, accept `phone`/`company`/`notes`; request body limited to 100kb
- Server closes the Prisma client and pg pool on shutdown; pool errors are logged, not fatal
- `NODE_ENV` now defaults to `production` when unset; `TRUST_PROXY` supported for rate limiting behind proxies
- `npm run db:seed` is idempotent and `prisma migrate reset` runs the seed

### Added (client)

- Dark mode: header toggle, persisted preference, defaults to the system setting
- Mobile navigation menu, active-route highlight, `aria-label`s on icon buttons
- `ErrorBoundary`, shared loading skeletons / error / empty states, `useContact` hook
- 404 page has a "Back home" button

### Fixed (client)

- Tasks, Projects and Contact detail pages no longer call axios directly; they use hooks and services
- `tasksService.create` / `projectsService.create` pointed at routes that don't exist (`/task`, `/project`)
- Deleting uses `ConfirmationDialog` instead of `window.confirm`
- Removed "to be implemented" stub buttons; legacy `<Grid item>` props (removed in MUI 7) migrated to `size`

### Tests

- 28 tests (was 7): `useTasks`, `useContact`, service URLs vs. API routes, `ErrorBoundary`, `NotFound`, `AppContext`, theme toggle, server error middleware

### Changed (server)

- Routes no longer wrap handlers in try/catch; Express 5 forwards errors to `middleware/error.js`
- Validation schemas live next to their routes (removed `middleware/validate.js`)

### Security

- `npm audit` is clean (was 18+ advisories): lockfile refreshed, `celebrate` 16 and `concurrently` 10 (majors), and `overrides` in `package.json` for transitive `deepmerge-ts`, `mysql2`, `lodash` and `shell-quote` pinned by Prisma/Formik. Drop an override once its parent ships the fix.

### Removed

- `nodemon` dependency and `nodemon.json`
- `yarn.lock` (npm is the package manager) and committed `.DS_Store` files

## [2.1.0] - 2026-02-15

### Added

- **AI Agent Configuration**
  - `GEMINI.md` for Gemini-specific project instructions
  - `AGENTS.md` for cross-platform AI agent conventions
  - `.agent/workflows/` with dev, test, and db workflows

### Changed

- Bump Node.js requirement from 20 → 22 (current LTS)
- Update React 19.2.4, Prisma 7.4.0, MUI 7.3.8, Vitest 4.0.18
- Refactor `Contacts.jsx` to use `useContacts` hook instead of raw axios
- Refactor `Home.jsx` to use `useHealthCheck` hook instead of raw axios
- Replace `strong-error-handler` with inline Express error middleware
- Update version references in `AppContext.jsx`

### Removed

- `@mui/styles` (deprecated in MUI 7, unused)
- `strong-error-handler` (unmaintained)
- `DatabaseSetupGuide_Complex.jsx` (unused duplicate)
- `overrides` block from `package.json`

## [2.0.0] - 2026-01-18

### Added

- **Client Services Layer** (`src/client/services/`)
  - Centralized API instance with interceptors for error handling
  - Service modules for contacts, tasks, projects, and health checks
  - JSDoc type annotations for better IDE support

- **Custom React Hooks** (`src/client/hooks/`)
  - `useContacts` - Contact state management with CRUD operations
  - `useTasks` - Task management with filtering by project/status
  - `useProjects` - Project and team member management
  - `useHealthCheck` - Database connection status

- **App Context** (`src/client/context/`)
  - Global state management for theme preferences
  - localStorage persistence for user settings

- **Testing Infrastructure**
  - Vitest configuration with jsdom environment
  - React Testing Library setup
  - Example component and hook tests

- **Developer Experience**
  - Interactive setup script (`npm run setup`)
  - Node.js version lock via `.nvmrc`
  - Debug script for server (`npm run server:debug`)
  - Clean script for build artifacts

- **Server Improvements**
  - Centralized configuration (`src/server/config/`)
  - Graceful shutdown handling
  - Environment-aware routing

- **Documentation**
  - "Using as a Template" section in README
  - Troubleshooting guide
  - Comprehensive inline code comments

### Changed

- **Major dependency upgrades:**
  - MUI 6 → 7.3.7 (Grid2 renamed to Grid)
  - Prisma 6 → 7.2.0 (new adapter pattern, prisma.config.ts)
  - Express 4 → 5.2.1 (wildcard route syntax changed)
  - Vite 6 → 7.3.1
  - React 19.0.0 → 19.2.3
- Updated to ESLint 9 flat config format
- Migrated test scripts to Vitest
- Improved project structure with barrel exports
- Updated license to MIT
- Bumped minimum Node.js version to 20.x

### Fixed

- CORS import bug in server (was aliased to express)
- Vite config: removed redundant terser plugin
- Vite config: fixed misplaced `optimizeDeps`

### Removed

- Unused dependencies: `mui-file-input`, `multer`, `fs-extra`, `lodash`, `terser`
- Unused Babel dependencies (Vite handles transpilation)
- Unused SCSS preprocessor configuration

## [1.0.0] - Initial Release

- Full-stack template with React, Vite, Express, and PostgreSQL
- Contact, Task, and Project management demo
- Material-UI components
- Prisma ORM with migrations and seeding
- ESLint and Prettier configuration
