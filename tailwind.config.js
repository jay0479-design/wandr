/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'monospace'],
      },
      colors: {
        obsidian:   '#0A0A0F',
        void:       '#111118',
        midnight:   '#1C1C28',
        graphite:   '#2E2E3E',
        'aurora-1': '#00D4FF',
        'aurora-2': '#7B5EA7',
        'aurora-3': '#FF6B6B',
        'aurora-4': '#FFD93D',
      },
      backgroundImage: {
        'aurora':       'linear-gradient(135deg, #00D4FF 0%, #7B5EA7 50%, #FF6B6B 100%)',
        'aurora-h':     'linear-gradient(90deg, #00D4FF, #7B5EA7)',
        'card-fade':    'linear-gradient(180deg, transparent 45%, rgba(10,10,15,0.97) 100%)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(10,10,15,0.25) 0%, transparent 38%, rgba(10,10,15,0.78) 78%, rgba(10,10,15,1) 100%)',
        'shimmer-base': 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
      },
      boxShadow: {
        'glass':    '0 8px 32px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)',
        'glass-xl': '0 16px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.10)',
        'glow':     '0 0 24px rgba(0,212,255,0.3), 0 0 48px rgba(123,94,167,0.2)',
        'glow-sm':  '0 0 12px rgba(0,212,255,0.25)',
        'coral':    '0 0 24px rgba(255,107,107,0.3)',
        'gold':     '0 0 24px rgba(255,217,61,0.3)',
      },
      animation: {
        'float':         'float 4s ease-in-out infinite',
        'pulse-aurora':  'pulse-aurora 2s ease-in-out infinite',
        'shimmer':       'shimmer 1.5s linear infinite',
        'scroll-bounce': 'scroll-bounce 2s ease-in-out infinite',
        'spin-slow':     'spin 12s linear infinite',
        'rain':          'rain 1.2s linear infinite',
        'twinkle':       'twinkle 2s ease-in-out infinite',
        'snow':          'snow 3s linear infinite',
        'fade-in-up':    'fade-in-up 0.7s ease forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        'pulse-aurora': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(0,212,255,0.6)' },
          '50%':     { boxShadow: '0 0 0 16px rgba(0,212,255,0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'scroll-bounce': {
          '0%,100%': { transform: 'translateY(0)', opacity: '1' },
          '50%':     { transform: 'translateY(8px)', opacity: '0.4' },
        },
        rain: {
          '0%':   { transform: 'translateY(-8px)', opacity: '0' },
          '40%':  { opacity: '0.9' },
          '100%': { transform: 'translateY(28px)', opacity: '0' },
        },
        twinkle: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.15', transform: 'scale(0.6)' },
        },
        snow: {
          '0%':   { transform: 'translateY(-8px) rotate(0deg)', opacity: '0' },
          '20%':  { opacity: '1' },
          '100%': { transform: 'translateY(32px) rotate(360deg)', opacity: '0' },
        },
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      screens: {
        xs: '375px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
