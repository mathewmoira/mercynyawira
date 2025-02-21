/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        'primary-light': '#1e293b',
        gold: '#fbbf24',
        'gold-light': '#fcd34d',
        'gold-deep': '#f59e0b',
        offwhite: '#f8fafc'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C6A355 0%, #D4AF37 50%, #FFD700 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #B69245 0%, #C39E27 50%, #EEC600 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in forwards',
        'fade-out': 'fadeOut 0.3s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};