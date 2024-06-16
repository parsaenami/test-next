import type { Config } from "tailwindcss";
import figmaTheme from "./services/figma/tailwind.theme.json";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...figmaTheme.colors,
    },
    fontSize: {
      ...(figmaTheme.fontSize as any),
    },
    boxShadow: {
      ...figmaTheme.boxShadow,
    },
    extend: {
      padding: {
        "4.5": "1.125rem", // 18px
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
