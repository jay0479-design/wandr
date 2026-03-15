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
      // ─── Typography ───────────────────────────────────────────
      fontSize: {
        // Display scale (Hero / 섹션 헤드)
        'display-2xl': ['4.5rem',   { lineHeight: '1.05', fontWeight: '900', letterSpacing: '-0.03em' }],
        'display-xl':  ['3.75rem',  { lineHeight: '1.05', fontWeight: '900', letterSpacing: '-0.03em' }],
        'display-lg':  ['3rem',     { lineHeight: '1.1',  fontWeight: '800', letterSpacing: '-0.02em' }],
        'display-md':  ['2.25rem',  { lineHeight: '1.15', fontWeight: '800', letterSpacing: '-0.015em' }],
        'display-sm':  ['1.875rem', { lineHeight: '1.2',  fontWeight: '700' }],
        // Body scale
        'body-xl':     ['1.25rem',  { lineHeight: '1.75', fontWeight: '400' }],
        'body-lg':     ['1.125rem', { lineHeight: '1.7',  fontWeight: '400' }],
        'body-md':     ['1rem',     { lineHeight: '1.6',  fontWeight: '400' }],
        'body-sm':     ['0.875rem', { lineHeight: '1.55', fontWeight: '400' }],
        'body-xs':     ['0.8125rem',{ lineHeight: '1.5',  fontWeight: '400' }],
        // UI / Label scale
        'label-lg':    ['0.875rem', { lineHeight: '1',    fontWeight: '700', letterSpacing: '0.05em' }],
        'label-md':    ['0.75rem',  { lineHeight: '1',    fontWeight: '700', letterSpacing: '0.1em'  }],
        'label-sm':    ['0.6875rem',{ lineHeight: '1',    fontWeight: '700', letterSpacing: '0.14em' }],
        // Eyebrow
        'eyebrow':     ['0.75rem',  { lineHeight: '1',    fontWeight: '700', letterSpacing: '0.28em' }],
      },
      fontWeight: {
        thin:       '100',
        extralight: '200',
        light:      '300',
        normal:     '400',
        medium:     '500',
        semibold:   '600',
        bold:       '700',
        extrabold:  '800',
        black:      '900',
      },
      lineHeight: {
        none:       '1',
        tightest:   '1.05',
        tighter:    '1.1',
        tight:      '1.2',
        snug:       '1.375',
        normal:     '1.5',
        relaxed:    '1.6',
        loose:      '1.7',
        looser:     '1.75',
        loosest:    '2',
      },
      // ─── Spacing ──────────────────────────────────────────────
      spacing: {
        // 미세 조정 (px 단위 정밀 제어)
        '0.5':  '0.125rem',   //  2px
        '1.5':  '0.375rem',   //  6px
        '2.5':  '0.625rem',   // 10px
        '3.5':  '0.875rem',   // 14px
        // 컴포넌트 내부 패딩
        '4.5':  '1.125rem',   // 18px
        '5.5':  '1.375rem',   // 22px
        '6.5':  '1.625rem',   // 26px
        '7.5':  '1.875rem',   // 30px
        // 섹션 레벨 간격
        '13':   '3.25rem',    // 52px
        '15':   '3.75rem',    // 60px
        '18':   '4.5rem',     // 72px
        '22':   '5.5rem',     // 88px
        '26':   '6.5rem',     // 104px
        '30':   '7.5rem',     // 120px
        '34':   '8.5rem',     // 136px
        '38':   '9.5rem',     // 152px
        // 레이아웃 레벨 간격
        '42':   '10.5rem',    // 168px
        '50':   '12.5rem',    // 200px
        '60':   '15rem',      // 240px
        '72':   '18rem',      // 288px
        '80':   '20rem',      // 320px
        '96':   '24rem',      // 384px
        // 최대 너비 커스텀
        '120':  '30rem',      // 480px
        '160':  '40rem',      // 640px
        '200':  '50rem',      // 800px
      },
      // ─── Border Radius ────────────────────────────────────────
      borderRadius: {
        none:   '0',
        xs:     '0.125rem',   //  2px — 미세 sharp
        sm:     '0.25rem',    //  4px — 버튼 모서리 최소
        md:     '0.375rem',   //  6px — 뱃지, 태그
        DEFAULT:'0.5rem',     //  8px — 기본 카드
        lg:     '0.75rem',    // 12px — 인풋, 작은 카드
        xl:     '1rem',       // 16px — 카드 컴포넌트
        '2xl':  '1.25rem',    // 20px — 큰 카드
        '3xl':  '1.5rem',     // 24px — 모달, 드롭다운
        '4xl':  '2rem',       // 32px — 대형 모달
        '5xl':  '2.5rem',     // 40px — FAB, 원형에 가까운 요소
        full:   '9999px',     // 완전 원형 (pill, avatar)
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
};
