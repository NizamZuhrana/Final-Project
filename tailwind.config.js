/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "background-1" : 'url("./src/assets/backgrond-1.jpg")'
      }
    },
  },
  plugins: [],
}

