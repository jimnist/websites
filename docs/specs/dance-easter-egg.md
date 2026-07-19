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

- The face is the dancer: shape stays recognizable, pixel rows shift
  side-to-side on a visual beat at ~130 BPM, neon color waves ripple across
  the pixels.
- Silent - the beat is visual only. No audio assets.
- Palette (tune hexes by eye at build time): hot pink `#ff2d95`, cyan
  `#00e5ff`, electric green `#39ff14`, purple `#b026ff`, laser yellow
  `#ffe814`.
- Only pixel fills change.
  Grid borders and page background untouched.
- The `big_jim.png` signature image sits out (no motion).
- Choreography owns the pupils during the dance (they bop on the beat);
  cursor tracking pauses and resumes when the routine ends.

## Lifecycle

- A routine is a fixed ~8s performance (4 bars at 130 BPM).
  Nothing interrupts it.
  The face returns exactly to its normal state when it ends.
- Re-trigger: unlimited, but the cursor must leave `(9,7)` and re-enter to
  start a new dwell.
  A parked or abandoned cursor never loops the dance.

## Accessibility

- `prefers-reduced-motion`: the calm variant - no positional motion, no beat
  pulsing; the neon colors crossfade slowly across the still face for the
  length of a routine.
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
