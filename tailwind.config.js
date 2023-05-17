/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        primary: '#E64472',
        secondary: '#002835',
      },
    },
  },
  plugins: [],
};
