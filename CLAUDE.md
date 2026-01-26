# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

This is a Bun monorepo. Always use `bun` instead of npm/yarn.

```bash
# Install all dependencies
bun install

# Development servers (each app runs on different port)
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

Monorepo containing three independent Astro static sites and a shared components package:

```
apps/
├── jimnist-com/      # Personal site (jimnist.com) - has protected routes
├── loco8/            # loco8.org
└── engine-earring/   # engine-earring.com
packages/
└── components/       # Shared component library (minimal)
```

Each app is an independent Astro project with its own `astro.config.mjs`. Apps share no runtime code currently; the components package exists but is underdeveloped.

## Deployment

All three apps auto-deploy to Cloudflare Pages via GitHub Actions when pushing to `main`. Each app deploys to a separate Cloudflare Pages project:
- jimnist-com → jimnist-com project
- loco8 → loco8 project
- engine-earring → engine-earring project

Required GitHub secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

## App-Specific Notes

### jimnist-com
- Has basic auth protection on `/2bwed/` and `/photos/` routes via Cloudflare Pages Functions middleware (`functions/_middleware.ts`)
- Requires `BASIC_AUTH_USER` and `BASIC_AUTH_PASS` environment variables in Cloudflare
- Homepage uses pure SVG + JavaScript for pixel art with mouse-tracking eyes (no external visualization libraries)
- `src/pages/` - Astro pages including `index.astro` (homepage), `imadethis.astro` (projects), `2bwed/` (wedding), `photos/` (galleries)
- `src/components/` - `PixelSmiley.astro`, `PhotoGallery.astro`, `Lightbox.astro`
- `src/data/` - TypeScript data files (pixel coordinates, gallery metadata)
- `docs/` - Legacy Jekyll site (can be removed once migration confirmed)

### loco8
- Uses path alias `@/*` → `src/*` in tsconfig

### engine-earring
- Minimal setup, see `apps/engine-earring/README.md` for TODO items
