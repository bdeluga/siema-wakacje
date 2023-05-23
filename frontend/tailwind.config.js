/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        blink: {
          "50%": { borderColor: "transparent" },
        },
        growDown: {
          "0%": {
            transform: "scaleY(0)",
          },
          "80%": {
            transform: "scaleY(1.1)",
          },
          "100%": {
            transform: "scaleY(1)",
          },
        },
        fadeOut: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "10%": { transform: "scale(1)", opacity: 1 },
          "80%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        blink: "blink 0.85s infinite",
        growDown: "growDown 0.3s ease-in-out forwards",
        "toast-pop": "fadeOut 3s ease-in-out forwards",
      },
      backgroundImage: {
        view: "url('/background.svg')",
        "view-dark": "url('/background-dark.png')",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["corporate", "business"],
  },
};
