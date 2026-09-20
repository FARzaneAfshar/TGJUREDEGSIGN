import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label: string;
  active?: boolean;
}

/** Small square icon-only button used across the toolbar and hero section. */
export default function IconButton({
  children,
  label,
  active = false,
  className = '',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors duration-150
        hover:bg-gray-100 hover:text-primary-900 active:scale-95
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-900
        ${active ? 'bg-gray-100 text-primary-900' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
