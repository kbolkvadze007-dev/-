/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 50: "#eef8f7", 100: "#d8efed", 500: "#2b9c91", 600: "#218579", 700: "#1b6b63" },
        ink: "#172b3a"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(24, 53, 75, .08)"
      }
    }
  },
  plugins: []
};
