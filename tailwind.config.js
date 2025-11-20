/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#8c52ff',
        'brand-pink': '#d946ef',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        loaderStroke: {
          '0%': { 'stroke-dasharray': '1, 250', 'stroke-dashoffset': '0', transform: 'rotate(0deg)' },
          '50%': { 'stroke-dasharray': '100, 250', 'stroke-dashoffset': '-35px' },
          '100%': { 'stroke-dasharray': '100, 250', 'stroke-dashoffset': '-124px', transform: 'rotate(360deg)' }
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        'loader-stroke': 'loaderStroke 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};