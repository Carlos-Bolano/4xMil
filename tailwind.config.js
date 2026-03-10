/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2e69ff",
        "background-light": "#f5f6f8",
        "background-dark": "#0f1523",
        "glass-bg": "rgba(255, 255, 255, 0.7)",
        "glass-border": "rgba(255, 255, 255, 0.3)",
      },
      fontFamily: {
        display: ["Inter"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "24px",
        full: "9999px",
      },
      boxShadow: {
        "glass": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
