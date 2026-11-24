/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Hanken Grotesk Variable"', "system-ui", "sans-serif"],
        serif: ['"Newsreader Variable"', "Georgia", "serif"],
        display: ['"Archivo Variable"', '"Hanken Grotesk Variable"', "sans-serif"],
      },
      colors: {
        brand: { DEFAULT: "#AC0C2F", dark: "#8A0A26" },
        oxblood: { DEFAULT: "#AC0C2F", deep: "#8A0A26" },
        paper: { DEFAULT: "#FFFFFF", deep: "#F3F3F1" },
        ink: { DEFAULT: "#0D0D0E", soft: "#2A2A2C", night: "#08080A" },
        stone: { 300: "#C9C9CC", 400: "#9A9A9F", 500: "#707076", 600: "#515156", 700: "#3A3A3E" },
      },
      letterSpacing: { tighter: "-0.02em", tightest: "-0.04em" },
    },
  },
  plugins: [],
};
