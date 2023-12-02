/* eslint-env node */
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/index.html", "./src/**/*.{html,scss,ts}"],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Helvetica Neue', 'sans-serif']
    }
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        html: {
          color: theme("colors.gray.800"),
          height: '100%'
        },
        body: {
          height: '100%'
        }
      });
    }),
  ],
};
