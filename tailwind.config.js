/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      secondary: ["Martian Mono Variable", "monospace"],
      primary: ["Inter Variable", "sans-serif"],
    },
    colors: {
      black: "#000000",
      blue: {
        50: "#f9fcfe",
        200: "#d0e7fb",
        300: "#aad4f8",
        400: "#83c0f5",
        700: "#316e9f",
        800: "#214d72",
        900: "#123048",
      },
      red: { 400: "#f2a4a2" },
      amber: { 400: "#e4b073" },
      teal: { 400: "#86caa0" },
      mauve: { 50: "#fdfafe" },
      cyan: { 200: "#ccebe3", 800: "#0d5449" },
      purple: { 200: "#e7e0fc", 800: "#514173" },
    },
    extend: { fontSize: { xxs: "10px" } },
  },
};
