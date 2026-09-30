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
        // DEFAULT is the rule-and-fill gold; it measures 2.95:1 on white, so
        // it must never carry text on a light ground. `deep` is the same hue
        // taken to 5.00:1, for gold that has to be read.
        gold: { DEFAULT: "#B8912F", deep: "#8A6B1F", soft: "#F3ECD8" },
      },
      fontFamily: {
        // Section headings and the hero line — the serif does the "established
        // firm" work. Everything structural (labels, buttons, card titles)
        // stays on the grotesque so it reads cleanly at small sizes.
        title: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: { wrap: "80rem", prose: "44rem" },
    },
  },
  plugins: [],
};
export default config;
