import type { ChartPoint, MarketRow, MoverGroup, TimeRange } from '../types';

/** Persian calendar months, in chronological order (فروردین → اسفند). */
export const persianMonths = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
] as const;

/** Monthly price series. `primary` is in thousand-toman units (۱۸۴۲٫۲ → ۱٬۸۴۲٬۲۰۰ تومان). */
export const chartData: ChartPoint[] = [
  { label: 'فروردین', primary: 1620.4, secondary: 980, tertiary: 420, volume: 62 },
  { label: 'اردیبهشت', primary: 1660.8, secondary: 1010, tertiary: 440, volume: 70 },
  { label: 'خرداد', primary: 1590.1, secondary: 970, tertiary: 460, volume: 55 },
  { label: 'تیر', primary: 1545.6, secondary: 940, tertiary: 470, volume: 48 },
  { label: 'مرداد', primary: 1610.3, secondary: 960, tertiary: 455, volume: 58 },
  { label: 'شهریور', primary: 1705.9, secondary: 1000, tertiary: 445, volume: 78 },
  { label: 'مهر', primary: 1780.2, secondary: 1030, tertiary: 435, volume: 92 },
  { label: 'آبان', primary: 1730.5, secondary: 1015, tertiary: 440, volume: 84 },
  { label: 'آذر', primary: 1650.7, secondary: 985, tertiary: 450, volume: 66 },
  { label: 'دی', primary: 1605.4, secondary: 965, tertiary: 460, volume: 52 },
  { label: 'بهمن', primary: 1660.2, secondary: 995, tertiary: 448, volume: 60 },
  { label: 'اسفند', primary: 1842.2, secondary: 1040, tertiary: 430, volume: 88 },
];

export const timeRanges: { id: TimeRange; label: string }[] = [
  { id: '1D', label: 'یک روز' },
  { id: '1W', label: 'یک هفته' },
  { id: '1M', label: 'یک ماه' },
  { id: '1Y', label: 'یک سال' },
];

export const moverGroups: MoverGroup[] = [
  {
    id: 'gainers',
    title: 'بیشترین سود',
    criterion: 'سه دارایی برتر بازار در ۲۴ ساعت گذشته',
    trend: 'up',
    items: [
      { id: 'coin', label: 'سکه', amount: 4_120_000, percent: 3.08, trend: 'up' },
      { id: 'gold18', label: 'طلای ۱۸ عیار', amount: 1_260_000, percent: 3.02, trend: 'up' },
      { id: 'half-coin', label: 'نیم‌سکه', amount: 2_080_000, percent: 2.8, trend: 'up' },
    ],
  },
  {
    id: 'losers',
    title: 'بیشترین زیان',
    criterion: 'سه دارایی با بیشترین افت در ۲۴ ساعت گذشته',
    trend: 'down',
    items: [
      { id: 'bitcoin', label: 'بیت‌کوین', amount: 96_400_000, percent: 8.0, trend: 'down' },
      { id: 'ethereum', label: 'اتریوم', amount: 12_800_000, percent: 7.01, trend: 'down' },
      { id: 'solana', label: 'سولانا', amount: 3_450_000, percent: 4.08, trend: 'down' },
    ],
  },
];

export const marketRows: MarketRow[] = [
  {
    id: 'usd',
    currency: 'دلار',
    time: '16:57',
    highest: 8_812,
    lowest: 4_545,
    changeValue: 5_272,
    changePercent: 6.08,
    changeTrend: 'up',
    livePrice: 1_842_200,
  },
  {
    id: 'eur',
    currency: 'یورو',
    time: '16:57',
    highest: 9_842,
    lowest: 5_292,
    changeValue: 8_542,
    changePercent: 8.06,
    changeTrend: 'up',
    livePrice: 2_252_700,
  },
  {
    id: 'gbp',
    currency: 'پوند',
    time: '16:54',
    highest: 11_240,
    lowest: 6_110,
    changeValue: 2_140,
    changePercent: 2.14,
    changeTrend: 'down',
    livePrice: 2_610_450,
  },
  {
    id: 'aed',
    currency: 'درهم',
    time: '16:49',
    highest: 3_015,
    lowest: 1_880,
    changeValue: 640,
    changePercent: 1.32,
    changeTrend: 'up',
    livePrice: 502_300,
  },
];

export const currentPrice = {
  value: 1_842_200,
  changePercent: 6.08,
  trend: 'up' as const,
  label: 'دلار',
};

export const currentUser = {
  name: 'فرزانه افشار',
  initials: 'ف‌ا',
};
