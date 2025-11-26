/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        stitch: {
          bg: "#fcf8f9", // The Stitch Light Background
          red: "#dd133b", // The Stitch Red
          black: "#1b0d10", // The Stitch Dark Text
          pink: "#f3e7ea", // The Stitch Input/Card Background
          textux: "#9a4c5b", // The Stitch Secondary Text
          gold: "#D4AF37", // Your Gold Accent
        },
      },
      fontFamily: {
        sans: ["Inter", '"Noto Sans"', "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
