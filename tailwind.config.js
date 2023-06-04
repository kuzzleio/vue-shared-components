/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        primary: '#E64472',
        secondary: '#002835',
        tertiary: '#DAEDF6',
        grey: {
          light: '#F9FAFD',
          bright: '#D0DDE1',
          DEFAULT: '#43565B',
        },
      },
    },
  },
  plugins: [],
};
