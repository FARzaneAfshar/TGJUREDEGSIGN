import { useMemo, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { chartData } from '../data/marketData';
import { useContainerWidth } from '../hooks/useContainerWidth';
import { smoothPath, scaleToRange, type Point } from '../utils/chartPath';
import { monthLeftPercent } from '../utils/chartScale';
import { formatPrice, formatPersianNumber } from '../utils/format';
import TrendBadge from './TrendBadge';
import ChartMonthAxis from './ChartMonthAxis';

const VIEW_W = 1000;
const VIEW_H = 260;
const PAD_TOP = 26;
const PAD_BOTTOM = 30;
const BAR_COUNT = 48;
const DEFAULT_INDEX = 6; // مهر

/** Deterministic pseudo-volume bars for background texture. */
function useBarHeights() {
  return useMemo(() => {
    const bars: number[] = [];
    for (let i = 0; i < BAR_COUNT; i++) {
      const wave = Math.sin(i * 0.42) * 0.5 + Math.sin(i * 0.13) * 0.3;
      bars.push(0.35 + Math.max(0, Math.min(1, (wave + 1) / 2)) * 0.6);
    }
    return bars;
  }, []);
}

export default function ChartCanvas() {
  const { ref, width: containerWidth } = useContainerWidth<HTMLDivElement>();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const barHeights = useBarHeights();

  const n = chartData.length;
  const activeIndex = hoverIndex ?? DEFAULT_INDEX;

  /**
   * RTL time axis derived from the shared scale, so the series and the month
   * labels beneath it can never point in opposite directions:
   * فروردین (i = 0) at the right edge → اسفند (i = n-1) at the left edge.
   */
  const xForIndex = (i: number) => (monthLeftPercent(i, n) / 100) * VIEW_W;

  const primaryMin = Math.min(...chartData.map((d) => d.primary));
  const primaryMax = Math.max(...chartData.map((d) => d.primary));
  const secondaryMin = Math.min(...chartData.map((d) => d.secondary));
  const secondaryMax = Math.max(...chartData.map((d) => d.secondary));
  const tertiaryMin = Math.min(...chartData.map((d) => d.tertiary));
  const tertiaryMax = Math.max(...chartData.map((d) => d.tertiary));

  const primaryPoints: Point[] = chartData.map((d, i) => ({
    x: xForIndex(i),
    y: scaleToRange(d.primary, primaryMin, primaryMax, PAD_TOP + 10, VIEW_H - PAD_BOTTOM - 70),
  }));
  const secondaryPoints: Point[] = chartData.map((d, i) => ({
    x: xForIndex(i),
    y: scaleToRange(d.secondary, secondaryMin, secondaryMax, VIEW_H - PAD_BOTTOM - 65, VIEW_H - PAD_BOTTOM - 25),
  }));
  const tertiaryPoints: Point[] = chartData.map((d, i) => ({
    x: xForIndex(i),
    y: scaleToRange(d.tertiary, tertiaryMin, tertiaryMax, VIEW_H - PAD_BOTTOM - 22, VIEW_H - PAD_BOTTOM),
  }));

  const primaryLine = smoothPath(primaryPoints);
  const secondaryLine = smoothPath(secondaryPoints);
  const tertiaryLine = smoothPath(tertiaryPoints);

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!containerWidth) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const viewX = (relX / rect.width) * VIEW_W;
    let closest = 0;
    let closestDist = Infinity;
    for (let i = 0; i < n; i++) {
      const dist = Math.abs(xForIndex(i) - viewX);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    }
    setHoverIndex(closest);
  }

  const activePoint = primaryPoints[activeIndex];
  const activeData = chartData[activeIndex];
  const activePriceNum = activeData.primary;
  const prevPriceNum = chartData[Math.max(0, activeIndex - 1)].primary;
  const pctChange = ((activePriceNum - prevPriceNum) / prevPriceNum) * 100;
  const trend = activePriceNum >= prevPriceNum ? 'up' : 'down';

  const tooltipLeftPct = (activePoint.x / VIEW_W) * 100;
  const tooltipAboveTop = activePoint.y < 90;

  // Y-axis ticks, in thousand-toman units → displayed as millions of toman.
  const yTicks = [primaryMax, (primaryMax + primaryMin) / 2, primaryMin].map((v) => ({
    value: v,
    y: scaleToRange(v, primaryMin, primaryMax, PAD_TOP + 10, VIEW_H - PAD_BOTTOM - 70),
  }));

  return (
    <div className="flex w-full items-start gap-2">
      {/* Y axis: label + ticks. Sits at the right edge in RTL flow. */}
      <div className="flex shrink-0 items-center gap-1">
        <span className="whitespace-nowrap text-[11px] text-gray-500 [writing-mode:vertical-rl]">
          قیمت (میلیون تومان)
        </span>
        <div className="relative h-[180px] w-10 sm:h-[210px] lg:h-[230px]">
          {yTicks.map((tick) => (
            <span
              key={tick.value}
              className="absolute end-0 -translate-y-1/2 text-[11px] text-gray-500"
              style={{ top: `${(tick.y / VIEW_H) * 100}%` }}
            >
              {formatPersianNumber(tick.value / 1000, 1)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
      <div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverIndex(null)}
        className="relative h-[180px] w-full select-none sm:h-[210px] lg:h-[230px]"
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          role="img"
          aria-label="نمودار تغییرات قیمت دلار بر حسب ماه"
        >
          {/* Horizontal gridlines at each Y tick */}
          {yTicks.map((tick) => (
            <line
              key={tick.value}
              x1={0}
              y1={tick.y}
              x2={VIEW_W}
              y2={tick.y}
              stroke="#CBD5E1"
              strokeWidth={1}
              opacity={0.5}
            />
          ))}

          {/* Background volume bars */}
          {barHeights.map((h, i) => {
            const barW = VIEW_W / BAR_COUNT;
            const x = i * barW;
            const barH = h * (VIEW_H - PAD_BOTTOM - PAD_TOP);
            const y = VIEW_H - PAD_BOTTOM - barH;
            return (
              <rect
                key={i}
                x={x + barW * 0.18}
                y={y}
                width={barW * 0.64}
                height={barH}
                rx={2}
                className="fill-gray-300"
                opacity={0.45}
              />
            );
          })}

          <path d={tertiaryLine} fill="none" stroke="#CBD5E1" strokeWidth={2} strokeLinecap="round" />
          <path d={secondaryLine} fill="none" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" />
          <path d={primaryLine} fill="none" stroke="#334155" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

          <line
            x1={activePoint.x}
            y1={PAD_TOP}
            x2={activePoint.x}
            y2={VIEW_H - PAD_BOTTOM}
            stroke="#0F172A"
            strokeWidth={1}
            strokeDasharray="4 4"
            opacity={0.25}
          />
          <circle cx={activePoint.x} cy={activePoint.y} r={5} className="fill-primary-900" />
          <circle cx={activePoint.x} cy={activePoint.y} r={9} className="fill-primary-900" opacity={0.15} />
        </svg>

        {/* Floating tooltip */}
        <div
          className="pointer-events-none absolute z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-sm bg-[rgba(234,238,242,0.85)] px-3 py-2 shadow-card backdrop-blur-md transition-[left,top] duration-150 ease-out sm:px-4 sm:py-2.5"
          style={{
            left: `${tooltipLeftPct}%`,
            top: `${(activePoint.y / VIEW_H) * 100}%`,
            transform: `translate(-50%, ${tooltipAboveTop ? '14px' : '-115%'})`,
          }}
        >
          <span className="text-body-16 font-semibold text-primary-900 sm:text-heading-24">
            {formatPrice(activePriceNum)}
          </span>
          <TrendBadge percent={pctChange} trend={trend} size="sm" />
        </div>
      </div>

        {/* X axis lives inside the plot column so its labels share the
            series' exact horizontal extent. */}
        <ChartMonthAxis />
      </div>
    </div>
  );
}
