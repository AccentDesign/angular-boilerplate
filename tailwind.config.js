/* eslint-env node */
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/index.html", "./src/**/*.{html,scss,ts}"],
  theme: {},
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        html: {
          color: theme("colors.gray.800"),
        },
        label: {
          fontWeight: theme("fontWeight.medium"),
        },
        th: {
          fontWeight: theme("fontWeight.medium"),
        }
      });
    }),
  ],
};
