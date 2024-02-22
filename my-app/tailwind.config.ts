import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      dropShadow: {
      },
      boxShadow: {
        'btn': '0px 0px 7px rgba(100, 100, 100, 1)',
        'msg': '0px 0px 10px rgba(0, 0, 0, 0.2)',
        'light': '0px 0px 7px rgba(255, 255, 255, 0.9)',
        'inside': 'inset 0px 0px 10px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
