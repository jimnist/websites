# AGENTS.md

This is a **Bun monorepo** of three independent Astro static sites plus a shared
components package. Each app builds and deploys on its own to Cloudflare Pages.
The apps share no runtime code today.

Before making changes, read the relevant docs under `docs/agents/`.

## Agent docs

Start here:

- `docs/agents/README.md` - what lives where
- `docs/agents/systems.md` - external systems this repo talks to
- `docs/agents/skills.md` - installed skills and how to add more

For the external systems, read:

- `docs/agents/systems/cloudflare-pages.md` - where each app deploys, and the
  basic-auth middleware on jimnist-com
- `docs/agents/systems/github-actions.md` - the deploy pipeline and required
  secrets

## Build Commands

Always use `bun`, never npm/yarn.

```bash
# Install all dependencies
bun install

# Development servers (each app runs on a different port)
bun run dev:jimnist         # jimnist-com on port 4321
bun run dev:loco8           # loco8 on port 4322
bun run dev:engine-earring  # engine-earring on port 4323

# Production builds
bun run build:jimnist
bun run build:loco8
bun run build:engine-earring
bun run build:all           # Build all apps sequentially
```

## Architecture

```
apps/
  jimnist-com/      # Personal site (jimnist.com) - has protected routes
  loco8/            # loco8.org
  engine-earring/   # engine-earring.com
packages/
  components/       # Shared component library (minimal)
```

Each app is an independent Astro project with its own `astro.config.mjs`. Apps
share no runtime code currently; the `components` package exists but is
underdeveloped.

## Working rules

- Each app is independent. A change to one app must not touch another app's
  source; put anything genuinely shared in `packages/components`.
- Keep the three apps buildable at all times. If you change build config or
  dependencies, run the affected `bun run build:*` before considering it done.
- Deployment is per-app to a separate Cloudflare Pages project. Don't couple the
  apps in CI - see `docs/agents/systems/github-actions.md`.
- Basic-auth-protected routes on jimnist-com (`/2bwed/`, `/photos/`) depend on
  `functions/_middleware.ts` and Cloudflare env vars. Don't move those routes or
  the middleware without accounting for both.

## App-specific notes

### jimnist-com

- Basic auth protects `/2bwed/` and `/photos/` via Cloudflare Pages Functions
  middleware (`functions/_middleware.ts`); needs `BASIC_AUTH_USER` and
  `BASIC_AUTH_PASS` env vars in Cloudflare.
- Homepage uses pure SVG + JavaScript for pixel art with mouse-tracking eyes (no
  external visualization libraries).
- `src/pages/` - `index.astro` (homepage), `imadethis.astro` (projects),
  `2bwed/` (wedding), `photos/` (galleries).
- `src/components/` - `PixelSmiley.astro`, `PhotoGallery.astro`, `Lightbox.astro`.
- `src/data/` - TypeScript data files (pixel coordinates, gallery metadata).
- `docs/` - legacy Jekyll site (can be removed once migration confirmed).

### loco8

- Uses path alias `@/*` -> `src/*` in tsconfig.

### engine-earring

- Minimal setup, see `apps/engine-earring/README.md` for TODO items.

## Agent skills

### Issue tracker

Issues live in **Linear** (workspace `jimnist`, team `Jimnist`/`JIM`, project
`websites`), via the Linear MCP tools. PRs are not a triage surface. See
`docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles, default names, as Linear labels in the Jimnist team. See
`docs/agents/triage-labels.md`.

### Domain docs

**Multi-context**: `CONTEXT-MAP.md` at the root points to one `CONTEXT.md` per
app, plus `docs/adr/`. See `docs/agents/domain.md`.
