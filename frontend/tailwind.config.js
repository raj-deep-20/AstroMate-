/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          dark: '#03001e',
          medium: '#12003c',
          light: '#2c006b',
          accent: '#ec38bc',
          gold: '#f1c40f',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Cinzel"', 'serif'],
      }
    },
  },
  plugins: [],
}
