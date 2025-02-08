/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "background-1": 'url("/backgrond-1.jpg")',
        "logo-1": 'url("./src/assets/astronot.jpeg")',
        "background-2": 'url("/football3.jpg")',
        "background-3": 'url("/poster-4.jpeg")',
      },
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"],
        "roboto-slab": ["Roboto Slab", "serif"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
