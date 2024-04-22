/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3C54F5",
        black: {
          DEFAULT: "#000000",
          50: "#B8B8B8",
          100: "#ADADAD",
          200: "#999999",
          300: "#858585",
          400: "#707070",
          500: "#5C5C5C",
          600: "#282828",
          700: "#181818",
          800: "#0F0F0F",
          900: "#0A0A0A",
          950: "#000000",
        },
      },
      gridTemplateColumns: {
        'two': 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
        'four': 'repeat(auto-fit, minmax(min(230px, 100%), 1fr))',
      },
    },
  },
  plugins: [],
};


// old cip primary #703CF5
// new pro cip primary #3C54F5
