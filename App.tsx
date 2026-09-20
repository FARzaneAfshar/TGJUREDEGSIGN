import TopToolbar from './components/TopToolbar';
import AppBar from './components/AppBar';
import PriceHero from './components/PriceHero';
import ChartSection from './components/ChartSection';
import MarketOverviewTable from './components/MarketOverviewTable';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopToolbar />

      <main className="mx-auto flex max-w-[1440px] flex-col gap-4 px-3 py-4 sm:px-6 sm:py-6 lg:px-9 lg:py-6">
        <AppBar />
        <PriceHero />
        <ChartSection />
        <MarketOverviewTable />
      </main>

      <footer className="mx-auto max-w-[1440px] px-3 pb-8 pt-2 text-center text-caption text-gray-500 sm:px-6 lg:px-9">
        <p>بازطراحی داشبورد بازار — نمونه‌کار طراحی و پیاده‌سازی رابط کاربری</p>
      </footer>
    </div>
  );
}
