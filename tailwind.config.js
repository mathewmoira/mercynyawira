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
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};