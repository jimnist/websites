# CONTEXT - jimnist-com

Ubiquitous language and durable domain facts for the **jimnist.com** app. This
file is the glossary and the "why". Repo-wide architectural decisions live in
`../../docs/adr/`.

## Language

**Protected route**:
A path prefix (`/2bwed`, `/photos`) gated behind HTTP basic auth by the
Cloudflare Pages Functions middleware in `functions/_middleware.ts`. The gate is
enforced only when `BASIC_AUTH_USER` and `BASIC_AUTH_PASS` are set on the Pages
project; with them unset the middleware falls through (dev convenience).
_Avoid_: private page, locked page

**Pixel smiley**:
The homepage's pure-SVG + JavaScript pixel-art face with mouse-tracking eyes,
built from coordinate data in `src/data/`, no external visualization library.
Component: `src/components/PixelSmiley.astro`.

<Grow this via /grill-with-docs + the domain-modeling skill; don't try to fill
it all in up front.>
