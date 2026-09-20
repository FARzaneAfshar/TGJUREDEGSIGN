import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { timeRanges } from '../data/marketData';
import type { TimeRange } from '../types';

interface TimeRangeTabsProps {
  onChange?: (range: TimeRange) => void;
}

/** Selects the chart's time range. */
export default function TimeRangeTabs({ onChange }: TimeRangeTabsProps) {
  const [active, setActive] = useState<TimeRange>('1Y');
  const [open, setOpen] = useState(false);
  const activeLabel = timeRanges.find((r) => r.id === active)?.label;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-body-16 font-semibold text-primary-900 transition-colors hover:bg-gray-100"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="بازه زمانی نمودار"
      >
        {activeLabel}
        <ChevronDown className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-20 mt-2 w-32 animate-fade-in overflow-hidden rounded-xl border border-gray-300 bg-white py-1 shadow-popover"
        >
          {timeRanges.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                role="option"
                aria-selected={r.id === active}
                onClick={() => {
                  setActive(r.id);
                  onChange?.(r.id);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-1.5 text-end text-body-16 transition-colors hover:bg-gray-100 ${
                  r.id === active ? 'font-semibold text-primary-900' : 'text-gray-500'
                }`}
              >
                {r.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
