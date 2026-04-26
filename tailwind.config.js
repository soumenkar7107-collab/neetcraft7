/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0d0f14',
          card: '#13161e',
          card2: '#181c26',
          elevated: '#1e2130',
        },
        border: {
          DEFAULT: '#1e2130',
          subtle: '#252836',
          strong: '#2a2d3a',
        },
        accent: {
          purple: '#8b7cf8',
          'purple-dim': 'rgba(139,124,248,0.12)',
          'purple-border': 'rgba(139,124,248,0.25)',
          orange: '#f97316',
          'orange-dim': 'rgba(249,115,22,0.12)',
          green: '#22c55e',
          'green-dim': 'rgba(34,197,94,0.12)',
          red: '#ef4444',
          'red-dim': 'rgba(239,68,68,0.1)',
          amber: '#f59e0b',
          'amber-dim': 'rgba(245,158,11,0.1)',
          blue: '#3b82f6',
          teal: '#14b8a6',
        },
        text: {
          primary: '#e2e8f0',
          secondary: '#8892a4',
          tertiary: '#4a5568',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.3s ease forwards',
        'slide-in': 'slideIn 0.3s ease forwards',
        'slide-out': 'slideOut 0.3s ease forwards',
        'flame': 'flame 1.6s ease-in-out infinite',
        'xp-float': 'xpFloat 1.4s forwards',
        'check-bounce': 'checkBounce 0.3s ease forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'level-up': 'levelUp 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateX(60px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideOut: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(60px)' },
        },
        flame: {
          '0%, 100%': { transform: 'scaleY(1) rotate(-2deg)' },
          '50%': { transform: 'scaleY(1.12) rotate(2deg)' },
        },
        xpFloat: {
          '0%': { opacity: 0, transform: 'translateY(4px) scale(0.85)' },
          '20%': { opacity: 1, transform: 'translateY(-16px) scale(1)' },
          '80%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateY(-44px)' },
        },
        checkBounce: {
          '0%': { transform: 'scale(0)' },
          '60%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        levelUp: {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
