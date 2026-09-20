import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const OPTIONS = ['دلار', 'یورو', 'پوند', 'درهم'];

interface CurrencySelectorProps {
  value: string;
  onChange?: (label: string) => void;
}

/** Switches the currency shown in the price hero. Persian labels only. */
export default function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = OPTIONS.includes(value) ? value : OPTIONS[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="انتخاب ارز"
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-primary-900 transition-colors hover:bg-gray-100"
      >
        <span className="text-body-18">{selected}</span>
        <ChevronDown className={`size-4 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-20 mt-2 w-36 animate-fade-in overflow-hidden rounded-xl border border-gray-300 bg-white py-1 shadow-popover"
        >
          {OPTIONS.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={opt === selected}
                onClick={() => {
                  onChange?.(opt);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-body-16 text-primary-900 transition-colors hover:bg-gray-100"
              >
                <span>{opt}</span>
                {opt === selected && <Check className="size-4 text-market-positive" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
