/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Design system — Section 2: Color Palette
        primary: {
          900: '#0F172A', // Primary 900
          700: '#334155', // Primary 700
        },
        gray: {
          500: '#64748B',
          300: '#CBD5E1',
          100: '#F1F5F9',
        },
        market: {
          positive: '#16A34A',
          negative: '#DC2626',
        },
        surface: {
          searchbar: '#EAEEF2',
        },
      },
      fontFamily: {
        // Section 3: Typography
        display: ['Vazirmatn', 'Inter', 'sans-serif'],
        sans: ['Vazirmatn', 'Inter', 'sans-serif'],
        num: ['Inter', 'Vazirmatn', 'sans-serif'],
      },
      fontSize: {
        display: ['56px', { lineHeight: '1.15', letterSpacing: '0.01em' }],
        'heading-40': ['40px', { lineHeight: '1.2' }],
        'heading-32': ['32px', { lineHeight: '1.25' }],
        'heading-28': ['28px', { lineHeight: '1.3' }],
        'heading-24': ['24px', { lineHeight: '1.35' }],
        'body-20': ['20px', { lineHeight: '1.4' }],
        'body-18': ['18px', { lineHeight: '1.4' }],
        'body-16': ['16px', { lineHeight: '1.4' }],
        caption: ['14px', { lineHeight: '1.4' }],
      },
      spacing: {
        18: '4.5rem',
      },
      boxShadow: {
        card: '0px 20px 50px 0px rgba(15, 23, 42, 0.06)',
        popover: '0px 12px 32px 0px rgba(15, 23, 42, 0.12)',
      },
      borderRadius: {
        card: '10px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '2000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'draw-line': 'draw-line 1.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
