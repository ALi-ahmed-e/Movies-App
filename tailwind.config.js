/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  
  theme: {
    screens: {'mobile': '400px','sm':'670px'},
    extend: {},
  },
  plugins: [],
}
