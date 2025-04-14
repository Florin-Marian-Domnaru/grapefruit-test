/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#4318FF",
        secondary: "#2B3674",
        "secondary-gray-300": "#F4F7FE",
        "secondary-gray-600": "#A3AED0",
        "secondary-gray-700": "#707EAE",
      },
      fontSize: {
        primary: ["34px", { lineHeight: "42px", letterSpacing: "-0.02em" }],
        "card-primary": ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "card-secondary": ["14px", { lineHeight: "24px", letterSpacing: "-0.02em" }],
      },
    },
  },
  plugins: [],
};
