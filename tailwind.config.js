/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        redHat: ['"Red Hat Text"', "sans-serif"],
      },
      colors: {
        redFont: "#C73A0F",
        greenFont: "#1EA475",
        rose50: "#FCF9F7",
        rose100: "#F4EDEB",
        rose300: "#c9aea6",
        rose400: "#ad8985",
        rose500: "#87635a",
        rose900: "#260f08",
      },
    },
  },
  plugins: [],
};
