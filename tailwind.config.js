const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
],
  theme: {
    safelist: [
      'animate-[fade-in_1s_ease-in-out]', 
      'animate-[fade-in-down_1s_ease-in-out]',
      'animate-[slide-right_1s_ease-in-out]'
    ],
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      red: colors.red,
      lime: colors.lime,
      green: colors.green,
      purple: colors.purple,
      white: "#F8F8F8",
      gray: colors.gray,
      blue: colors.blue,
      offblack: "#222222",
      orange: "#FF8A00"
    },
    extend: {
      boxShadow: {
        'bottomblur': 'inset 0 -50px 40px -50px gray'
      }
    },
  },
  plugins: [],
}