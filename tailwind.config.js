/* eslint-env node */
/** @type {import('tailwindcss').Config} */

module.exports = {
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
  content: ['./src/index.html', './src/**/*.{html,css,ts}'],
  theme: {},
};
