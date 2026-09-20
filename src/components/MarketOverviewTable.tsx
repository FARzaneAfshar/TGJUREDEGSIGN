import { marketRows } from '../data/marketData';
import TrendBadge from './TrendBadge';
import { formatPersianNumber, formatPercent, formatTime } from '../utils/format';

const COLUMNS = ['ارز', 'قیمت زنده (تومان)', 'تغییر', 'کمترین', 'بیشترین', 'زمان'];

/** Desktop/tablet: table. Mobile: stacked cards so no column is truncated. */
export default function MarketOverviewTable() {
  return (
    <section className="rounded-sm border border-gray-300 bg-white p-4 sm:p-6 lg:p-8" aria-label="نمای کلی بازار">
      <h2 className="mb-1 text-heading-24 font-semibold text-primary-900">نمای کلی بازار</h2>
      <p className="mb-6 text-caption text-gray-500">آخرین نرخ ارزهای آزاد بر حسب تومان</p>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col} scope="col" className="px-2 pb-4">
                  <span className="inline-flex w-full items-center justify-center rounded-sm border border-gray-300 px-4 py-3 text-body-18 font-normal text-primary-900">
                    {col}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {marketRows.map((row) => (
              <tr key={row.id} className="border-t border-gray-100 transition-colors duration-150 hover:bg-gray-100">
                <td className="px-2 py-4 text-center text-body-20 text-primary-900">{row.currency}</td>
                <td className="px-2 py-4 text-center text-body-16 font-semibold text-primary-900">
                  {formatPersianNumber(row.livePrice)}
                </td>
                <td className="px-2 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 text-body-16 text-primary-900">
                    {formatPersianNumber(row.changeValue)}
                    <span className={row.changeTrend === 'up' ? 'text-market-positive' : 'text-market-negative'}>
                      {formatPercent(row.changePercent)}
                    </span>
                  </span>
                </td>
                <td className="px-2 py-4 text-center text-body-16 text-primary-900">
                  {formatPersianNumber(row.lowest)}
                </td>
                <td className="px-2 py-4 text-center text-body-16 text-primary-900">
                  {formatPersianNumber(row.highest)}
                </td>
                <td className="px-2 py-4 text-center text-body-16 text-primary-900">{formatTime(row.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-3 sm:hidden">
        {marketRows.map((row) => (
          <li key={row.id} className="rounded-sm border border-gray-300 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-body-20 font-semibold text-primary-900">{row.currency}</span>
              <span className="text-caption text-gray-500">{formatTime(row.time)}</span>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-heading-24 font-semibold text-primary-900">
                {formatPersianNumber(row.livePrice)}
              </span>
              <TrendBadge percent={row.changePercent} trend={row.changeTrend} size="sm" />
            </div>
            <div className="flex items-center justify-between text-caption text-gray-500">
              <span>
                بیشترین: <span className="text-primary-900">{formatPersianNumber(row.highest)}</span>
              </span>
              <span>
                کمترین: <span className="text-primary-900">{formatPersianNumber(row.lowest)}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
