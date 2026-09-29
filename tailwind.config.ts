import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#073574", deep: "#052651", soft: "#E6ECF5" },
        sky: { DEFAULT: "#10A9E8", soft: "#DDF2FC" },
        paper: "#F8FAFC",
        ink: "#1B2430",
        muted: "#5B6675",
        line: "#D9E0EA",
        // Used sparingly — rules, eyebrow marks, the odd number. Never a fill.
        gold: { DEFAULT: "#B8912F", soft: "#F3ECD8" },
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: { wrap: "80rem", prose: "44rem" },
    },
  },
  plugins: [],
};
export default config;
