import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        "cool-name": "50px",
      },
      colors: {
        "cool-blue": "#2196f3",
        "cool-red": "#f44336",
        "cool-green": "#4caf50",
        "cool-yellow": "#ffeb3b",
        "cool-pink": "#e91e63",
        "cool-purple": "#9c27b0",
        "cool-orange": "#ff9800",
        "cool-brown": "#795548",
        "cool-grey": "#9e9e9e",
        "cool-blue-grey": "#607d8b",
      },
    },
  },
  plugins: [],
};
export default config;
