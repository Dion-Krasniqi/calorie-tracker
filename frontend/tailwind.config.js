/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#0D121A',
        secondary: '#151312',
        light: {
          100: '#D6C6FF',
          200: '#A8B5DB',
          300: '#9CA4AB'

        },
        dark: {
          100: '#221f3d',
          200: '#111823',
        },
        blue: {
          100: '#8EE3EF',
          200: '#0A151F',
        },
        accent: '#AB8BFF'
      },
    },
  },
  plugins: [],
}

