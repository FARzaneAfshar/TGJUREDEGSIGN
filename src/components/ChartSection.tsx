import ChartCanvas from './ChartCanvas';
import TimeRangeTabs from './TimeRangeTabs';
import MoversPanel from './MoversPanel';

/** Main chart panel with the gainers/losers sidebar alongside it. */
export default function ChartSection() {
  return (
    // In this RTL layout the first child renders at the right, matching the
    // sidebar's position in the design. items-stretch keeps both columns'
    // bottom edges aligned.
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-4">
      <div className="order-2 lg:order-1 lg:w-[230px] lg:shrink-0">
        <MoversPanel />
      </div>

      <div className="order-1 flex flex-1 flex-col rounded-sm bg-white p-4 shadow-card sm:p-6 lg:order-2">
        <div className="mb-3 flex items-center justify-between gap-3">
          <TimeRangeTabs />
          <div className="flex flex-col">
            <h2 className="text-body-18 font-semibold text-primary-900">روند قیمت دلار</h2>
            <p className="text-[11px] text-gray-500">قیمت بر حسب میلیون تومان، به تفکیک ماه</p>
          </div>
        </div>
        <ChartCanvas />
      </div>
    </div>
  );
}
