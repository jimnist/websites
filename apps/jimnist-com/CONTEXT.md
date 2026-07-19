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
The homepage's pure-SVG + JavaScript pixel-art face with mouse-tracking eyes, no
external visualization library. Component: `src/components/PixelSmiley.astro`.
A 19x19 grid of 20px pixels (`viewBox` 380x380). Pixel data lives in
`src/data/pixels.ts`: `yellows` (face), `lefts` / `rights` (eyes), each a
`{x, y, c}` where `c` is the pixel's fill color. The left eye block sits at grid
`(4,6)` and the right at `(12,6)`, each a 3x3 block with a pupil `<rect>` that a
`mousemove` handler slides toward the cursor. The point "midway between the eyes"
is grid `(9,7)`, the nose bridge between the two eye blocks (left eye spans
columns 4-6, right eye 12-14, both rows 6-8).

**Nose bridge**:
The single grid cell `(9,7)` at the exact midpoint between the two eye blocks.
The hotspot that triggers the dance easter egg.
_Avoid_: forehead, brow, between-the-eyes area (it is one cell, not a zone)

**Dwell**:
Resting the cursor on the nose bridge for 1 second. Entering the cell starts
the clock; jitter within the cell does not reset it; leaving the cell cancels
it. The only way to start the dance.
_Avoid_: hover (a plain hover does not trigger anything)

**Dance**:
The easter-egg state the icon enters after a dwell: the face keeps its shape
and dances in place - pixel rows shift side-to-side on the beat - while neon
color waves pulse across the pixels, DDR-style. Silent; the beat is visual
only. During the dance the choreography owns the pupils (cursor tracking
pauses); the signature image sits out. When the dance ends the face returns
exactly to normal.
_Avoid_: rave, disco mode, animation (too generic)

**Routine**:
The fixed choreographed performance one dance plays: about 8 seconds, then the
face returns to normal on its own. Nothing interrupts a routine, and a new one
requires leaving the nose bridge and dwelling again.
_Avoid_: loop (a routine never repeats by itself)

**Calm variant**:
The dance as experienced under `prefers-reduced-motion`: no positional motion
and no beat pulsing - only the neon colors, crossfading slowly across the still
face for the length of a routine.
_Avoid_: disabled mode (the egg still works; only the motion is gone)

<Grow this via /grill-with-docs + the domain-modeling skill; don't try to fill
it all in up front.>
