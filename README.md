# TGJU Dashboard — Redesign Implementation

A pixel-faithful, responsive implementation of the Figma redesign for the TGJU
financial dashboard homepage, built with **React 18 + TypeScript + Tailwind
CSS + Vite**.

Figma source: `RedesignTGJU` — frame **"Financial Dashboard1"**.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

Requires Node 18+.

## What's implemented

- **Top toolbar** — the slim browser-chrome-style bar from the Figma
  "Header" frame (grid/notifications/settings/shield, back/forward nav,
  address bar, refresh/upload/copy/add). Non-essential icon clusters collapse
  progressively on smaller breakpoints so the bar stays usable on mobile.
- **App bar** — search trigger (expands into a text input) + user identity,
  from the "Hero Section" frame.
- **Price hero** — the large live price, percentage-change badge and a
  working currency dropdown (USD/EUR/GBP/AED), from "Frame 47".
- **Chart section** — a fully custom, dependency-free SVG chart (smooth
  Catmull-Rom trend lines + background volume bars) with:
  - a live time-range selector (۱ روز / ۱ هفته / ۱ ماه / ۱ سال),
  - pointer-driven hover: move over the chart to scrub through the 12
    Persian months and see the floating price/percentage tooltip update and
    reposition, matching the frosted-glass "Details" tooltip in the design,
  - the "highest / lowest" mover cards (coin, gold, half-coin / bitcoin,
    ethereum, solana) alongside the chart on desktop, and as a 2-column
    grid beneath it on mobile.
- **Market overview table** — the pill-header comparison table
  (زمان / بیشترین / کمترین / تغییر / قیمت زنده / ارز آزاد). Renders as a
  real `<table>` on tablet/desktop and collapses into stacked cards on
  mobile so no column gets truncated.
- **RTL & typography** — `dir="rtl"`/`lang="fa"` on `<html>`, Vazirmatn for
  Persian copy, Inter for all numerals (`.num` utility, tabular figures,
  forced LTR digit runs so numbers never reverse inside RTL flow).

## Design tokens

Pulled directly from the Figma "Design System" page and encoded in
`tailwind.config.js`:

| Token | Value |
|---|---|
| `primary-900` | `#0F172A` |
| `primary-700` | `#334155` |
| `gray-500` / `gray-300` / `gray-100` | `#64748B` / `#CBD5E1` / `#F1F5F9` |
| `market-positive` / `market-negative` | `#16A34A` / `#DC2626` |
| Type scale | Display 56, Heading 40/32/28/24, Body 20/18/16, Caption 14 |
| Spacing scale | 8 / 16 / 24 / 32 / 48 / 64 / 96 (maps 1:1 onto Tailwind's default scale) |
| Fonts | Vazirmatn (display/body), Inter (numerals/Latin) |

## Responsive behavior (not just scaled-down desktop)

- **Desktop (≥1024px)**: full toolbar, chart + sidebar side-by-side, table
  view.
- **Tablet (640–1023px)**: toolbar icon clusters thin out, mover cards move
  to a 2-column row under the chart, table remains a real table with
  horizontal scroll safety.
- **Mobile (<640px)**: toolbar hidden (the address-bar chrome doesn't carry
  its meaning at that size), price scales down, chart height shrinks,
  month labels thin to every other month, and the market table becomes
  stacked cards.

## Project structure

```
src/
  components/     Reusable, single-purpose UI pieces
  data/           Mock market data (swap for a real API/service layer)
  hooks/          useContainerWidth (ResizeObserver for the responsive chart)
  types/          Shared TypeScript types
  utils/          Chart path math + number formatting
```

## Notes / substitutions

- The chart is hand-built in SVG (Catmull-Rom smoothing) rather than a
  charting library, to keep the bundle dependency-free and match the
  exact hand-drawn curve style from the Figma vectors.
- Icons use `lucide-react` rather than re-hosting the individual Figma icon
  exports, since Figma's asset URLs are short-lived — this keeps the build
  self-contained and swappable.
- All figures (prices, percentages, table data) are representative sample
  data matching what's shown in the Figma frame; wire up a real market-data
  source in `src/data/marketData.ts` before shipping to production.
