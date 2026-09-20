import { useState } from 'react';
import CurrencySelector from './CurrencySelector';
import { currentPrice } from '../data/marketData';
import { formatPersianNumber, formatPercent } from '../utils/format';

/** Large live price, percentage change (no trend icon), and the currency picker. */
export default function PriceHero() {
  const [currency, setCurrency] = useState(currentPrice.label);

  return (
    <div className="flex w-full flex-col-reverse items-center gap-4 rounded-card bg-white px-4 py-10 sm:flex-row sm:items-center sm:justify-center sm:gap-6 sm:py-8 lg:py-6">
      <div className="flex items-center gap-3">
        <span
          className={`text-heading-24 font-semibold ${
            currentPrice.trend === 'up' ? 'text-market-positive' : 'text-market-negative'
          }`}
        >
          {formatPercent(currentPrice.changePercent)}
        </span>
        <span className="h-6 w-px bg-gray-300" aria-hidden="true" />
        <CurrencySelector value={currency} onChange={setCurrency} />
      </div>

      <p className="flex flex-col items-center gap-1 sm:items-end">
        <span className="text-[40px] font-medium tracking-tight text-primary-900 sm:text-heading-40 md:text-display lg:text-[96px] lg:leading-none">
          {formatPersianNumber(currentPrice.value)}
        </span>
        <span className="text-caption text-gray-500">تومان</span>
      </p>
    </div>
  );
}
