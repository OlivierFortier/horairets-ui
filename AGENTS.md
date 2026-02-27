# AGENTS.md

## Cursor Cloud specific instructions

### Overview

HorairÉTS is a React/TypeScript single-page app (Vite, Material UI, Jotai, React Query) that generates schedule combinations for ÉTS university students. The backend API is a separate repository; this repo is the frontend only.

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Vite Dev Server | `yarn dev` (or `npx vite --host 0.0.0.0`) | 5173 | Use `--host 0.0.0.0` for cloud environments |
| Firebase Emulators | `yarn firebase:start` | 9098-9100 | Optional; only needed for auth/profile features |

### Key dev commands

See `README.md` and `package.json` scripts for the full list. Summary:

- **Dev server**: `yarn dev` (opens browser) or `npx vite --host 0.0.0.0 --port 5173` (headless)
- **Lint**: `yarn lint`
- **Build**: `yarn build`
- **Tests**: `yarn test` (vitest; note: no test files currently exist in the repo)
- **Format**: `yarn format`

### Non-obvious caveats

- **Node version**: Must use Node 20 (see `.nvmrc`). Run `nvm use 20` if needed.
- **API URL in dev mode**: `.env.production` provides `VITE_BASE_API_URL` for production builds, but Vite does not load it in dev mode. You must create `.env.development.local` (gitignored) with `VITE_BASE_API_URL="https://api.horairets.emmanuelcoulombe.dev/"` for the app to reach the backend API during development.
- **`jsdom` missing from devDependencies**: `vitest` needs `jsdom` (configured in `vite.config.js` as the test environment) but it is not listed in `package.json`. Run `yarn add --dev jsdom` if you need to run tests.
- **No test files**: The test infrastructure (vitest + testing-library) is configured, but no test files exist yet. `yarn test` exits with code 1 ("No test files found") — this is expected.
- **Firebase emulators are optional**: The app's core schedule generation works without Firebase emulators. The "Running in emulator mode" banner at the bottom is expected in dev mode.
- **`use client` warnings during build**: These warnings from `@tanstack/react-query`, `jotai`, and `@mui` are harmless and expected with Vite 4.
