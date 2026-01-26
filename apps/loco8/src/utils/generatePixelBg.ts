// Utility to generate pixel background SVGs

const PIXEL_SIZE = 20;
const GRID_SIZE = 19;

export interface ColorBase {
  r: number;
  g: number;
  b: number;
}

export const MINT_BASE: ColorBase = { r: 200, g: 240, b: 216 }; // #c8f0d8
export const GREY_BASE: ColorBase = { r: 240, g: 240, b: 240 }; // #f0f0f0
export const BG_BASE: ColorBase = { r: 222, g: 222, b: 222 }; // #dedede

// Seeded random for reproducible builds
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

export function generatePixelSvg(base: ColorBase, seed: number, variance: number = 12): string {
  const random = seededRandom(seed);
  let rects = '';

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const color = varyColor(base, variance, random);
      rects += `<rect x="${x * PIXEL_SIZE}" y="${y * PIXEL_SIZE}" width="${PIXEL_SIZE}" height="${PIXEL_SIZE}" fill="${color}"/>`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${GRID_SIZE * PIXEL_SIZE} ${GRID_SIZE * PIXEL_SIZE}">${rects}</svg>`;
}

export function svgToDataUri(svg: string): string {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
