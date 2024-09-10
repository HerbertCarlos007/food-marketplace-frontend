/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      width: {
        '85': '21rem',
      },

      colors: {
        lightGray: '#f6f6f6'
      }
    },
  },
  plugins: [],
}

