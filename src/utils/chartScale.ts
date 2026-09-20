/** Total months on the time axis. */
export const MONTH_COUNT = 12;

/**
 * Single source of truth for the chart's horizontal scale.
 *
 * Returns the position of month `i` as a percentage of the plot width,
 * measured from the LEFT edge. The axis is right-to-left: فروردین (i = 0)
 * sits at 100% (the right edge) and اسفند (i = 11) at 0% (the left edge),
 * so the series reads in the same direction as Persian text.
 *
 * Both the SVG series and the month labels derive their x position from
 * this function, which makes a direction mismatch between them impossible.
 */
export function monthLeftPercent(i: number, count = MONTH_COUNT): number {
  return 100 - (i / (count - 1)) * 100;
}
