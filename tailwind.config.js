/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "screen-1920": "100vw",
      },
      height: {
        "custom-height": "calc(100vw * (1080 / 1920))",
      },
    },
  },
  plugins: [],
};
