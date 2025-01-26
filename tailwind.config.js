/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "background-1" : 'url("./src/assets/backgrond-1.jpg")',
        "logo-1" : 'url("./src/assets/astronot.jpeg")',
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

