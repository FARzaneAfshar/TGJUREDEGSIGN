import { moverGroups } from '../data/marketData';
import type { MoverGroup } from '../types';
import { formatPersianNumber, formatPercent } from '../utils/format';

function MoverCard({ group }: { group: MoverGroup }) {
  const isUp = group.trend === 'up';
  const accent = isUp ? 'text-market-positive' : 'text-market-negative';

  return (
    <section
      className="flex h-full flex-col gap-3 rounded-sm bg-white p-4 shadow-card transition-shadow duration-200 hover:shadow-popover"
      aria-label={group.title}
    >
      {/* Hierarchy: title → criterion → items → value/percentage */}
      <header className="flex flex-col gap-0.5 border-b border-gray-100 pb-2">
        <h3 className={`text-body-16 font-semibold ${accent}`}>{group.title}</h3>
        <p className="text-[11px] leading-snug text-gray-500">{group.criterion}</p>
      </header>

      <ol className="flex flex-1 flex-col justify-between gap-3">
        {group.items.map((item, i) => (
          <li key={item.id} className="flex items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-2">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[11px] font-semibold text-gray-500">
                {formatPersianNumber(i + 1)}
              </span>
              <span className="truncate text-body-16 text-primary-900">{item.label}</span>
            </span>
            <span className="flex shrink-0 flex-col items-start leading-tight">
              <span className={`text-caption font-semibold ${accent}`}>{formatPercent(item.percent)}</span>
              <span className="text-[11px] text-gray-500">
                {isUp ? '+' : '−'}
                {formatPersianNumber(item.amount)} تومان
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Top gainers / top losers, side-by-side on mobile and stacked beside the chart on desktop. */
export default function MoversPanel() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:h-full lg:grid-cols-1 lg:grid-rows-2 lg:gap-4">
      {moverGroups.map((group) => (
        <MoverCard key={group.id} group={group} />
      ))}
    </div>
  );
}
