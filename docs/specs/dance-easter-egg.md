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

- **Nothing moves - but the colors travel.** The dance is a beat-locked
  traveling wave: every 2x2 block runs the same palette cycle (~130 BPM,
  hard `steps()` cuts, no blending), phase-offset by its Manhattan distance
  from the nose bridge, so each block takes the color its inner neighbor
  just had. Diamond color fronts visibly march outward from the trigger
  point, block to adjacent block, one ring per half beat. The delays are
  positive, so the dance ignites at the nose bridge and pours outward
  across the resting face. The **hue** travels at 2x2-block resolution,
  while the **lightness** is per individual pixel:
  each square shades its panel's color by its original grayscale value,
  with the pure palette color sitting mid-range - the darkest pixels
  darken it toward black (up to `MAX_DARK`, 50%) and the lightest lift it
  toward white (up to `MAX_LIFT`, 70%). The face's original shading shows
  through the strobe as a full-contrast neon relief. Chaos in space,
  unity in time.
  (Revised 2026-07, three times: the original spec had pixel rows shifting
  side-to-side; jim clarified the "shimmy" was always meant as color change
  over fixed squares. A random beat-snapped confetti version followed, then
  jim chose neighbor-to-neighbor color travel over randomness - the motion
  of the colors is the choreography.)
- Silent - the beat is visual only. No audio assets.
- Palette: hot pink `#ff2d95`, cyan `#00e5ff`, electric green `#39ff14`,
  purple `#b026ff`, laser yellow `#ffe814`.
- Only pixel colors change, and only as a CSS override: the animation is
  pure CSS (`.dancing` class + per-pixel random beat phase hashed from grid
  coordinates at build time), so the `fill` attributes are never touched
  and removing the class restores every original color with no bookkeeping.
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

- `prefers-reduced-motion`: the calm variant - the same color wave at half
  speed with gentle easing (a slow crossfade, no beat snap).
  Handled entirely by a CSS media query.
- Color pulses are traveling waves, never full-face strobes.
  Stay comfortably under the WCAG 3-flashes-per-second line
  (130 BPM = ~2.2 pulses/s).

## Verified grid facts

- 19x19 grid of 20px cells; `viewBox` 380x380.
- Left eye block spans columns 4-6, right eye 12-14, both rows 6-8.
- `(9,7)` exists in `yellows` with color `#ffdf55`.
- ~291 pixels total across `yellows` + `lefts` + `rights`.

## Out of scope

- Audio (decided against).
- Tracker tickets (skipped deliberately; this file is the spec of record).
- Any change to the other two apps or shared packages.
