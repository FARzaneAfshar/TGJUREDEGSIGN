const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** Converts any Latin digits in a string to Persian digits. */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

/** Groups a number with Persian thousands separator (٬) and Persian digits. */
export function formatPersianNumber(value: number, fractionDigits = 0): string {
  const grouped = value.toLocaleString('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  return toPersianDigits(grouped).replace(/,/g, '٬').replace(/\./g, '٫');
}

/** Formats a thousand-toman value (e.g. 1842.2) as a grouped Persian price. */
export function formatPrice(thousandToman: number): string {
  return formatPersianNumber(Math.round(thousandToman * 1000));
}

/** Formats a percentage as «(۱۲٪)» — Persian digits, symbol inside parentheses. */
export function formatPercent(value: number | string, fractionDigits = 2): string {
  const num = typeof value === 'string' ? Number(value) : value;
  const abs = Math.abs(num);
  return `(${formatPersianNumber(abs, fractionDigits)}٪)`;
}

/** Formats a percentage without parentheses, e.g. «۱۲٪». */
export function formatPercentBare(value: number | string, fractionDigits = 2): string {
  const num = typeof value === 'string' ? Number(value) : value;
  return `${formatPersianNumber(Math.abs(num), fractionDigits)}٪`;
}

/** Normalises a time string to hours:minutes (drops seconds) in Persian digits. */
export function formatTime(time: string): string {
  const [h = '00', m = '00'] = time.split(':');
  return toPersianDigits(`${h}:${m}`);
}
