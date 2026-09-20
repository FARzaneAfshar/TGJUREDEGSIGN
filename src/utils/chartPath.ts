export interface Point {
  x: number;
  y: number;
}

/**
 * Converts a series of points into a smooth cubic-bezier SVG path string
 * using a Catmull-Rom → Bezier conversion. Produces the gently rounded
 * trend lines seen in the Figma chart (no sharp joints between samples).
 */
export function smoothPath(points: Point[]): string {
  if (points.length < 2) return '';
  const d: string[] = [`M ${points[0].x} ${points[0].y}`];

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`);
  }

  return d.join(' ');
}

/** Builds a closed area path (line + baseline) for gradient fills. */
export function smoothAreaPath(points: Point[], baseline: number): string {
  const line = smoothPath(points);
  if (!line) return '';
  const first = points[0];
  const last = points[points.length - 1];
  return `${line} L ${last.x} ${baseline} L ${first.x} ${baseline} Z`;
}

/** Maps a value range [min, max] onto a pixel range [pxMax, pxMin] (inverted for SVG y-axis). */
export function scaleToRange(value: number, min: number, max: number, pxMin: number, pxMax: number): number {
  if (max === min) return (pxMin + pxMax) / 2;
  const ratio = (value - min) / (max - min);
  return pxMax - ratio * (pxMax - pxMin);
}
