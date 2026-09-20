import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { currentUser } from '../data/marketData';

/** Search + user identity bar sitting above the price hero. */
export default function AppBar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    // Note on order: in this RTL layout the first DOM child renders on the
    // *right* edge. The Figma frame places the profile at the right and the
    // search control at the left, so the profile link comes first here.
    <div className="flex h-[90px] w-full items-center justify-between rounded-card bg-white px-4 sm:px-6 lg:px-9">
      <a
        href="#profile"
        className="group flex items-center gap-3 rounded-lg px-1 py-1 transition-colors hover:bg-gray-100"
      >
        <span className="hidden text-body-18 text-primary-900 sm:inline">{currentUser.name}</span>
        <span
          className="flex size-[42px] shrink-0 items-center justify-center rounded-[10px] bg-primary-900 text-body-16 font-semibold text-white ring-1 ring-gray-300 transition-transform group-hover:scale-105"
          aria-hidden="true"
        >
          {currentUser.initials}
        </span>
      </a>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setSearchOpen((v) => !v)}
          aria-expanded={searchOpen}
          aria-label="جستجوی دارایی"
          className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-[10px] border border-gray-500 text-primary-900 transition-colors duration-150 hover:border-primary-900 hover:bg-gray-100 active:scale-95"
        >
          {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
        </button>

        <div
          className={`overflow-hidden transition-all duration-200 ease-out ${
            searchOpen ? 'w-40 opacity-100 sm:w-64' : 'w-0 opacity-0'
          }`}
        >
          <input
            type="text"
            placeholder="جستجوی دلار، طلا، سکه…"
            className="h-9 w-full rounded-lg border border-gray-300 bg-white px-3 text-body-16 text-primary-900 placeholder:text-gray-500 focus-visible:outline-2 focus-visible:outline-primary-900"
          />
        </div>
      </div>
    </div>
  );
}
