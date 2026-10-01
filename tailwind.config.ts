import type { Config } from "tailwindcss";

/**
 * The palette is the owner's premium brief, with every value that carries text
 * measured rather than assumed. Where a brief colour missed WCAG AA as text,
 * the brief's colour is kept for the job it was specified for — a rule, a fill,
 * a large display word — and a measured sibling carries the small type. The two
 * are the same hue a step apart, so nothing about the look changes.
 *
 * Measured on #FFFFFF / #F5F8FC, then on #0B3A78 / #082E5F:
 *   ink        #17365D  12.19 / 11.45              body and headings
 *   muted      #61738A   4.85 /  4.56              secondary text
 *   muted.deep #52647B   6.06 /  5.69              secondary on a tinted ground
 *   navy       #0B3A78  11.11 / 10.43              dominant brand colour
 *   gold       #A67C20   3.80 /  3.57              rules and LARGE display only
 *   gold.deep  #886414   5.41 /  5.08              small gold labels on light
 *   gold.light #CDAE68     —  /   —   5.21 / 6.29  gold as text on navy
 *   sky        #10A9E8     —  /   —                fills only (2.67 on white)
 *   sky.bright #3CBCEF     —  /   —   5.09 / 6.15  sky as text on navy
 *   sky.deep   #0E6A90   6.03 /  5.66              sky as text on light
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0B3A78", deep: "#082E5F", soft: "#EAF0F8" },
        sky: { DEFAULT: "#10A9E8", bright: "#3CBCEF", deep: "#0E6A90", soft: "#E2F2FB" },
        // Champagne. An accent only — rules, small labels, one highlighted
        // word. DEFAULT is under AA as small text and must never carry any.
        gold: { DEFAULT: "#A67C20", light: "#CDAE68", deep: "#886414", soft: "#F6F1E4" },
        paper: "#F5F8FC",
        ink: "#17365D",
        muted: { DEFAULT: "#61738A", deep: "#52647B" },
        // `line` is a hairline divider. `line.strong` is for the boundary of a
        // form control, which WCAG 1.4.11 holds to 3:1 against its surround.
        line: { DEFAULT: "#DCE4EE", strong: "#8FA0B6" },
      },
      fontFamily: {
        // Two families, as the brief asks. The serif carries the headline and
        // the section headings — that is the "established firm" voice. Inter
        // does everything structural: labels, buttons, card titles, body.
        title: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: { wrap: "80rem", prose: "44rem" },
      boxShadow: {
        // Premium depth comes from very soft, very wide shadows — never from a
        // dark drop shadow and never from a stack of gradients.
        soft: "0 2px 4px -2px rgba(11,58,120,0.06), 0 12px 32px -12px rgba(11,58,120,0.14)",
        lift: "0 4px 8px -4px rgba(11,58,120,0.08), 0 24px 56px -20px rgba(11,58,120,0.22)",
        panel: "0 8px 16px -8px rgba(11,58,120,0.10), 0 40px 90px -30px rgba(11,58,120,0.32)",
      },
    },
  },
  plugins: [],
};
export default config;
