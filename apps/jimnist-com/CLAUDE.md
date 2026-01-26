# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
# Install dependencies
bun install

# Local development server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Deployment

Deployed to Cloudflare Pages. Push to `main` branch to deploy.

**Cloudflare Pages Configuration:**
- Build command: `bun run build`
- Build output directory: `dist`
- Environment variables (set in Cloudflare dashboard):
  - `BASIC_AUTH_USER` - Username for protected areas
  - `BASIC_AUTH_PASS` - Password for protected areas

## Architecture

This is a personal website using Astro, deployed to Cloudflare Pages:

- **src/pages/** - Astro pages
  - `index.astro` - Homepage with SVG pixel art smiley face
  - `imadethis.astro` - Project showcase page
  - `2bwed/` - Wedding site (protected by basic auth)
  - `photos/` - Photo galleries (protected by basic auth)
- **src/components/** - Reusable components
  - `PixelSmiley.astro` - SVG smiley with mouse-tracking eyes
  - `PhotoGallery.astro` - Slideshow component
  - `Lightbox.astro` - Modal lightbox for images
- **src/layouts/** - Page layouts
- **src/data/** - TypeScript data files (pixel coordinates, gallery metadata)
- **public/** - Static assets (images, favicon)
- **functions/** - Cloudflare Pages Functions
  - `_middleware.ts` - Basic auth for /2bwed and /photos routes

The homepage uses pure SVG with JavaScript for mouse tracking (no external visualization libraries).

## Protected Routes

The `/2bwed/` and `/photos/` routes are protected by basic authentication via Cloudflare Pages Functions middleware. Set `BASIC_AUTH_USER` and `BASIC_AUTH_PASS` environment variables in Cloudflare.

## Legacy Site

The `docs/` directory contains the old Jekyll site for reference. It can be removed once the migration is confirmed working.
