import { persianMonths } from '../data/marketData';
import { monthLeftPercent } from '../utils/chartScale';

/**
 * X-axis. Each label is absolutely positioned using the very same scale the
 * SVG series uses (`monthLeftPercent`), so label and data point always share
 * an x coordinate — فروردین at the right edge through اسفند at the left.
 */
export default function ChartMonthAxis() {
  return (
    <div className="mt-2 flex flex-col gap-1">
      <div className="relative h-5">
        {persianMonths.map((month, i) => (
          <span
            key={month}
            className={`absolute top-0 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold text-primary-900 sm:text-caption ${
              i % 2 === 1 ? 'hidden sm:inline' : ''
            }`}
            style={{ left: `${monthLeftPercent(i)}%` }}
          >
            {month}
          </span>
        ))}
      </div>
      <span className="text-center text-[11px] text-gray-500">ماه</span>
    </div>
  );
}
