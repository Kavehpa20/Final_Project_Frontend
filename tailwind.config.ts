import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: "#CBBAAE",
          100: "#E6D3B3",
          200: "#D1B48C",
          300: "#987555",
          400: "#7C3F00",
          500: "#633200",
          600: "#562B00",
          700: "#492201",
          800: "#3E1C00",
          900: "#33171d",
        },
      },
    },
  },
  plugins: [],
};
export default config;
