/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: { brand: { DEFAULT: "#AC0C2F", dark: "#890925" } },
      letterSpacing: { tighter: "-0.02em", tightest: "-0.04em" },
    },
  },
  plugins: [],
};
