export type Trend = 'up' | 'down';

export interface MoverItem {
  id: string;
  label: string;
  /** Absolute change in toman. */
  amount: number;
  /** Percentage change (unsigned magnitude). */
  percent: number;
  trend: Trend;
}

export interface MoverGroup {
  id: string;
  title: string;
  /** Short line explaining the selection criterion. */
  criterion: string;
  trend: Trend;
  items: MoverItem[];
}

export interface ChartPoint {
  label: string;
  primary: number;
  secondary: number;
  tertiary: number;
  volume: number;
}

export interface MarketRow {
  id: string;
  currency: string;
  time: string;
  highest: number;
  lowest: number;
  changeValue: number;
  changePercent: number;
  changeTrend: Trend;
  livePrice: number;
}

export type TimeRange = '1D' | '1W' | '1M' | '1Y';
