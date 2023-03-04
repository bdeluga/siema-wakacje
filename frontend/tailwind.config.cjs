/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
      },
      animation: {
        blink: "blink 0.85s infinite",
        growDown: "growDown 0.3s ease-in-out forwards",
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
