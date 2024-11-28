/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#7970e9', 
          DEFAULT: '#7970e9', 
          dark: '#3182ce',
        },
        secondary: {
          light: '#7970e9', 
          DEFAULT: '#7970e9', 
          dark: '#ed8936',
        },
        background: '#d0c2fc',
      },
      fontFamily: {
        sans: ['Parkinsans', 'sans-serif'],
        serif: ['Space Grotesk', 'serif']
      }
    },
  },
  plugins: [],
}

