# Migration Plan: Jekyll to Astro with Cloudflare Pages

## Overview
Migrate jimnist.com from Jekyll to Astro, replace Protovis with SVG+CSS, deploy to Cloudflare Pages.

## New Project Structure
```
/
├── astro.config.mjs
├── package.json
├── functions/
│   └── _middleware.ts          # Basic auth for protected routes
├── public/
│   ├── favicon.ico
│   ├── img/                    # From docs/img/
│   ├── 2bwed/images/           # From docs/2bwed/images/
│   └── photos/                 # From docs/photos/*/
├── src/
│   ├── components/
│   │   ├── PixelSmiley.astro   # SVG smiley with mouse tracking
│   │   ├── PhotoGallery.astro  # Slideshow component
│   │   └── Lightbox.astro      # Modern lightbox for wedding photos
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── WeddingLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── imadethis.astro
│   │   ├── 2bwed/
│   │   │   ├── index.astro
│   │   │   └── pages/
│   │   │       ├── happyhome.astro
│   │   │       ├── honeymoon.astro
│   │   │       ├── registry.astro
│   │   │       ├── souvenirs.astro
│   │   │       └── wedding.astro
│   │   └── photos/
│   │       ├── index.astro
│   │       └── [gallery]/index.astro
│   ├── data/
│   │   ├── pixels.ts           # Converted from docs/js/pixels.js
│   │   └── galleries.ts        # Photo gallery metadata
│   └── styles/
│       ├── global.css
│       └── 2bwed.css
└── docs/                       # Keep temporarily for reference
```

## Implementation Steps

### Step 1: Initialize Astro Project
- Run `npm create astro@latest` with minimal template
- Configure `astro.config.mjs` for static output
- Set up TypeScript config

### Step 2: Create Homepage with SVG Smiley
**Files to create:**
- `src/data/pixels.ts` - Convert pixel arrays from `docs/js/pixels.js`
- `src/components/PixelSmiley.astro` - SVG component with:
  - 400x400 viewBox, 20x20 pixel grid
  - Face pixels as `<rect>` elements from `yellows` array (274 pixels)
  - Left/right eye whites from `lefts`/`rights` arrays (9 pixels each)
  - Pupil `<rect>` elements with mouse tracking JS
  - Constrained movement: pupils stay within 20px of eye center
  - Left pupil: #551f00, Right pupil: #7f1f00
- `src/pages/index.astro` - Homepage using PixelSmiley component
- `src/layouts/BaseLayout.astro` - Base HTML template

### Step 3: Migrate Static Pages
- `src/pages/imadethis.astro` - From `docs/imadethis.html`
- Copy images to `public/img/`

### Step 4: Migrate Photo Galleries
**Files to create:**
- `src/data/galleries.ts` - Extract image lists and captions from each `pics.html`
- `src/components/PhotoGallery.astro` - Slideshow with:
  - Prev/next navigation
  - Keyboard support (arrow keys)
  - Image preloading
  - Caption display
- `src/pages/photos/index.astro` - Gallery index
- `src/pages/photos/[gallery]/index.astro` - Dynamic route for 9 galleries
- Copy all gallery images to `public/photos/`

### Step 5: Migrate Wedding Subsite
**Files to create:**
- `src/layouts/WeddingLayout.astro` - Based on `docs/2bwed/stylesheets/2bwed.css`:
  - 800px centered content
  - Top banner with background image
  - Tab navigation with hover states
  - Two-column layout
- `src/components/Lightbox.astro` - Modern lightbox using `<dialog>`
- `src/styles/2bwed.css` - Styles from original
- All 6 wedding pages in `src/pages/2bwed/`
- Copy images to `public/2bwed/images/`

### Step 6: Basic Auth for Protected Routes
Protect `/2bwed/` and `/photos/` with basic authentication using Cloudflare Pages Functions.

**Create `functions/_middleware.ts`:**
```typescript
const PROTECTED_PATHS = ['/2bwed', '/photos'];

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  // Check if path needs protection
  const needsAuth = PROTECTED_PATHS.some(path => url.pathname.startsWith(path));
  if (!needsAuth) {
    return context.next();
  }

  // Check for basic auth header
  const auth = context.request.headers.get('Authorization');
  if (!auth || !auth.startsWith('Basic ')) {
    return new Response('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Protected Area"' }
    });
  }

  // Verify credentials
  const [user, pass] = atob(auth.slice(6)).split(':');
  const validUser = context.env.BASIC_AUTH_USER;
  const validPass = context.env.BASIC_AUTH_PASS;

  if (user !== validUser || pass !== validPass) {
    return new Response('Invalid credentials', { status: 401 });
  }

  return context.next();
};
```

**Cloudflare environment variables to set:**
- `BASIC_AUTH_USER` - Username for protected areas
- `BASIC_AUTH_PASS` - Password for protected areas

**Note:** The middleware also protects static assets under `/2bwed/` and `/photos/` paths since Cloudflare Pages Functions run before serving static files.

### Step 7: Cloudflare Pages Setup
- Update `.gitignore` (add `node_modules/`, `dist/`, `.astro/`)
- Create `public/_redirects` if needed for URL compatibility
- Connect repo to Cloudflare Pages:
  - Build command: `npm run build`
  - Output directory: `dist`
- Set environment variables for basic auth (Settings > Environment variables)
- Configure custom domain: jimnist.com
- Update DNS from GitHub Pages to Cloudflare

### Step 8: Cleanup
- Remove `docs/` directory after confirming migration works
- Delete `CLAUDE.md` created earlier (or update for Astro)
- Update `README.md` with new dev instructions

## Key Files to Reference During Implementation
- `docs/js/pixels.js` - Pixel coordinate data for SVG
- `docs/index.html` - Mouse tracking algorithm (lines 74-114)
- `docs/2bwed/stylesheets/2bwed.css` - Wedding layout styles
- `docs/photos/picpage.js` - Slideshow navigation logic
- `docs/photos/0401hawaii/pics.html` - Example gallery data structure

## Verification
1. Run `npm run dev` and verify:
   - Homepage smiley renders with correct colors
   - Eyes follow mouse cursor smoothly
   - All pages accessible at expected URLs
2. Test photo galleries: prev/next, keyboard navigation
3. Test wedding lightbox galleries
4. Run `npm run build` and preview with `npm run preview`
5. Deploy to Cloudflare Pages and verify production site
6. Check all URLs match original site structure
7. Verify basic auth:
   - `/2bwed/` prompts for credentials
   - `/photos/` prompts for credentials
   - Homepage (`/`) is publicly accessible
   - Invalid credentials are rejected
