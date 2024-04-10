import "dotenv/config";

/** @type {import('tailwindcss').Config} */
export default {
  important: "#root",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1600px",
    },
    extend: {
      colors: {
        primary: process.env.VITE_THEME_COLOR_PRIMARY,
      },
    },
  },
  plugins: [],
};
