# Spec: the Dance easter egg (jimnist-com)

Agreed via grilling session; glossary terms in `apps/jimnist-com/CONTEXT.md`
(Nose bridge, Dwell, Dance, Routine, Calm variant).
Component under change: `apps/jimnist-com/src/components/PixelSmiley.astro`.
Pixel data: `apps/jimnist-com/src/data/pixels.ts`.

## Trigger

- Hotspot: exactly grid cell `(9,7)` - the nose bridge.
  One 20px cell, no forgiveness zone.
- Dwell: cursor enters the cell, a 1s clock starts.
  Jitter within the cell does not reset it.
  Leaving the cell cancels a pending dwell.
- Touch: a 1s long-press on the same cell is the twin gesture.
  Suppress iOS text-callout/selection on the SVG for it.

## The dance

- **A random mosaic plus a troupe of green roamers.** When the dance
  starts, the face snaps into a random neon **mosaic** laid out in every
  palette color EXCEPT electric green: one of pink/cyan/purple/yellow per
  2x2 block (hashed from block coordinates at build time), static for the
  whole routine. The motion is the **roamers** - five 2x2 blocks, all
  electric green (`ROAMER_COLOR`), the only green anywhere - that
  random-walk across the face, each hopping to an adjacent walkable block
  every half beat (discrete `steps()` hops, no sliding; ~4.3 hops/sec
  across the troupe). Reserving green for the dancers guarantees they pop
  with zero chance of camouflage. The first walk starts on the
  nose-bridge block, the rest scatter from seeded random blocks; walks
  avoid immediate backtracks and only visit blocks whose four cells are
  all face pixels - so they never cover the eyes, and they pass behind
  the grid lines, eyes, and signature (SVG paint order). The walks are
  seeded at build time (`ROAMER_SEED`), so they are random-looking but
  identical on every trigger; change the seed to reroll them.
  The mosaic's **lightness** is per individual pixel: each square shades
  its block's color by its original grayscale value (darkest darkens
  toward black up to `MAX_DARK` 60%, lightest lifts toward white up to
  `MAX_LIFT` 45%), with a gamma curve (`SHADE_GAMMA` 2) that spreads the
  face's mostly-light pixels apart so lighter and darker pixels stay
  clearly separated - the face's shading shows through as a neon relief.
  (Revised 2026-07, six times: rows shifting side-to-side -> color change
  over fixed squares -> random beat-snapped confetti -> orderly traveling
  wave -> one white roaming block -> five white/black roamers -> this:
  the black dancers confused, the shading lacked separation, and jim
  chose green-only dancers over a green-free mosaic.)
- Silent - the beat is visual only. No audio assets.
- Palette: hot pink `#ff2d95`, cyan `#00e5ff`, electric green `#39ff14`,
  purple `#b026ff`, laser yellow `#ffe814`.
- Only pixel colors change, and only as a CSS override: the mosaic is a
  static `.dancing` fill rule (shaded hexes precomputed at build time - no
  `color-mix()` dependency) and the roamer is one generated `@keyframes`
  walk, so the `fill` attributes are never touched and removing the class
  restores every original color with no bookkeeping.
  Grid borders and page background untouched.
- The eye whites sit out entirely (no animation), so the eyes stay readable
  through the confetti; the pupils sit out too, and pupil cursor tracking
  keeps working throughout.
  (Revised 2026-07: with no positional choreography there is nothing for
  the pupils to join.)
- The `big_jim.png` signature keeps its original color throughout.
  (Revised 2026-07: an earlier iteration turned it black during the dance;
  jim preferred it unchanged.)

## Lifecycle

- A routine is a fixed ~8s performance (4 bars at 130 BPM).
  Nothing interrupts it.
  The face returns exactly to its normal state when it ends.
- Re-trigger: unlimited, but the cursor must leave `(9,7)` and re-enter to
  start a new dwell.
  A parked or abandoned cursor never loops the dance.

## Accessibility

- `prefers-reduced-motion`: the calm variant - the mosaic crossfades in
  and out gently (800ms ease) instead of snapping, and the roamer is
  hidden entirely (a teleporting block is exactly the motion those users
  opted out of). Handled entirely by CSS media queries.
- The mosaic is static and only the roamer changes per beat (~2.2 hops/s,
  affecting one block at a time) - comfortably under the WCAG
  3-flashes-per-second general-flash line.

## Verified grid facts

- 19x19 grid of 20px cells; `viewBox` 380x380.
- Left eye block spans columns 4-6, right eye 12-14, both rows 6-8.
- `(9,7)` exists in `yellows` with color `#ffdf55`.
- ~291 pixels total across `yellows` + `lefts` + `rights`.

## Out of scope

- Audio (decided against).
- Tracker tickets (skipped deliberately; this file is the spec of record).
- Any change to the other two apps or shared packages.
