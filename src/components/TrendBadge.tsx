import { ChevronUp, ChevronDown } from 'lucide-react';
import type { Trend } from '../types';
import { formatPercent } from '../utils/format';

interface TrendBadgeProps {
  percent: number | string;
  trend: Trend;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const sizeStyles: Record<NonNullable<TrendBadgeProps['size']>, string> = {
  sm: 'text-caption gap-0.5',
  md: 'text-body-16 gap-1',
  lg: 'text-heading-24 gap-1',
};

/**
 * Shows a percentage change as «(۱۲٪)» in Persian digits.
 * Positive → market.positive, negative → market.negative.
 * The directional chevron is opt-in via `showIcon`.
 */
export default function TrendBadge({
  percent,
  trend,
  size = 'md',
  showIcon = false,
  className = '',
}: TrendBadgeProps) {
  const isUp = trend === 'up';
  return (
    <span
      className={`inline-flex items-center font-semibold ${
        isUp ? 'text-market-positive' : 'text-market-negative'
      } ${sizeStyles[size]} ${className}`}
    >
      {showIcon &&
        (isUp ? (
          <ChevronUp className="size-[1em]" strokeWidth={3} aria-hidden="true" />
        ) : (
          <ChevronDown className="size-[1em]" strokeWidth={3} aria-hidden="true" />
        ))}
      {formatPercent(percent)}
    </span>
  );
}
