import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./public/**/*.{html,js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Payda: ["peyda", ...defaultTheme.fontFamily.sans],
        IRANSans: ["IRANSans", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        "8xl": "1440px",
      },
      colors: {
        primary: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
          "950": "#172554",
        },
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
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
export default config;
