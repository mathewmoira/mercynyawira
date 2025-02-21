/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
          light: '#1a1a1a',
        },
        gold: {
          deep: '#C6A355',
          DEFAULT: '#D4AF37',
          light: '#FFD700',
        },
        offwhite: '#FFFFFF',
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