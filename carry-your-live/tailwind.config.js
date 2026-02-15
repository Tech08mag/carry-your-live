/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#2a2a2a',
          light: '#1a1a1a',
        },
        purpleCustom: {
          light: '#6a1b9a',
          DEFAULT: '#4e137d',
          dark: '#3b0a45',
        },
        gradientStart: '#3b0a45',
        gradientMid: '#4e137d',
        gradientEnd: '#6a1b9a',
      },
    },
  },
  plugins: [],
}
