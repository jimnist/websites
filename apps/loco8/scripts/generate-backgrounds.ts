import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const PIXEL_SIZE = 20;
const GRID_SIZE = 19;

interface ColorBase {
  r: number;
  g: number;
  b: number;
}

const MINT_BASE: ColorBase = { r: 200, g: 240, b: 216 };
const GREY_BASE: ColorBase = { r: 250, g: 250, b: 250 };
const BG_BASE: ColorBase = { r: 255, g: 252, b: 240 }; // very light yellow

function seededRandom(seed: number) {
  return function() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

function varyColor(base: ColorBase, variance: number, random: () => number): string {
  const vary = () => Math.floor((random() - 0.5) * 2 * variance);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp(base.r + vary());
  const g = clamp(base.g + vary());
  const b = clamp(base.b + vary());
  return `rgb(${r},${g},${b})`;
}

function generatePixelSvg(base: ColorBase, seed: number, variance: number = 12): string {
  const random = seededRandom(seed);
  let rects = '';

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const color = varyColor(base, variance, random);
      rects += `<rect x="${x * PIXEL_SIZE}" y="${y * PIXEL_SIZE}" width="${PIXEL_SIZE}" height="${PIXEL_SIZE}" fill="${color}"/>`;
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${GRID_SIZE * PIXEL_SIZE} ${GRID_SIZE * PIXEL_SIZE}">${rects}</svg>`;
}

// Generate backgrounds
const outDir = join(import.meta.dir, '../public/bg');
mkdirSync(outDir, { recursive: true });

// Cell backgrounds (9 cells, seeded for consistency)
const cells = [
  { name: 'cell-1-1', base: MINT_BASE, seed: 11 },
  { name: 'cell-1-2', base: GREY_BASE, seed: 12 },
  { name: 'cell-1-3', base: MINT_BASE, seed: 13 },
  { name: 'cell-2-1', base: GREY_BASE, seed: 21 },
  { name: 'cell-2-2', base: MINT_BASE, seed: 22 },
  { name: 'cell-2-3', base: GREY_BASE, seed: 23 },
  { name: 'cell-3-1', base: MINT_BASE, seed: 31 },
  { name: 'cell-3-2', base: GREY_BASE, seed: 32 },
  { name: 'cell-3-3', base: MINT_BASE, seed: 33 },
];

cells.forEach(({ name, base, seed }) => {
  const svg = generatePixelSvg(base, seed);
  writeFileSync(join(outDir, `${name}.svg`), svg);
  console.log(`Generated ${name}.svg`);
});

// Page background (tiled)
const pageBg = generatePixelSvg(BG_BASE, 999, 8);
writeFileSync(join(outDir, 'page.svg'), pageBg);
console.log('Generated page.svg');

console.log('Done!');
