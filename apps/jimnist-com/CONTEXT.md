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
The easter-egg state the icon enters after a dwell: the face snaps into a
static random neon mosaic (hot pink, cyan, or purple per 2x2 block -
green is the roamers' and yellow reads as not-dancing against the face -
shaded per pixel by its original grayscale value so the face reads as a
neon relief), and the green roamers dance across it. Silent. The eye whites sit out so the
eyes stay readable; pupil cursor tracking keeps working; the signature
keeps its original color. When the dance ends the face returns exactly to
normal.

**Roamers**:
The dance's troupe: five 2x2 blocks, all electric green - the one palette
color the mosaic never uses, so they can never camouflage - that
random-walk the mosaic, each hopping to an adjacent walkable block every
half beat. The first starts on the nose-bridge block, the rest scatter;
they never cover the eyes, and pass behind the grid lines, eyes, and
signature. Their walks are seeded at build time - random-looking,
identical every trigger.
_Avoid_: cursor (that's the user's pointer), sprites (nothing moves but
their block positions)
_Avoid_: shimmy (retired - early design had rows moving; the dance is color
change only), wave (retired - an orderly radial ripple was replaced by
random confetti), rave, disco mode, animation (too generic)

**Routine**:
The fixed choreographed performance one dance plays: about 8 seconds, then the
face returns to normal on its own. Nothing interrupts a routine, and a new one
requires leaving the nose bridge and dwelling again.
_Avoid_: loop (a routine never repeats by itself)

**Calm variant**:
The dance as experienced under `prefers-reduced-motion`: the mosaic
crossfades in and out gently instead of snapping, and the roamers are
hidden.
_Avoid_: disabled mode (the egg still works; only the motion is gone)

<Grow this via /grill-with-docs + the domain-modeling skill; don't try to fill
it all in up front.>
