/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'edu-nsw-act-hand': ['"Edu NSW ACT Hand Pre"', 'cursive'],
      },
    },
  },
  plugins: [],
};