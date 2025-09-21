/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#239BA7',
        secondary: '#7ADAA5',
        accent1: '#ECECBB',
        accent2: '#E1AA36',
        dark: '#16202b',
        light: '#f6f8f9'
      },
    },
    animation: {
      marquee: 'marquee 25s linear infinite',
    },
    keyframes: {
      marquee: {
        '0%': { transform: 'translateX(0%)' },
        '100%': { transform: 'translateX(-100%)' },
      },
    },
  },
  plugins: [],
}
