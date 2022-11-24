/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blink: {
          "50%": { borderColor: "transparent" },
        },
      },
      animation: {
        blink: "blink 0.85s infinite",
      },
    },
  },
  plugins: [],
};
