/**
 * When GitHub Pages serves this repo at github.io/<repo>/ rather than at a
 * domain root, every asset URL needs that prefix. Set BASE_PATH at build time
 * for that case and leave it unset once scalevisory.in points here.
 * @type {import('next').NextConfig}
 */
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  /**
   * Static export: `next build` writes plain HTML/CSS/JS into `out/`, which
   * GitHub Pages serves directly. No server, so no server actions, no
   * middleware/proxy, no ISR — and no `redirects()`, since those need a server
   * to issue them. Legacy URLs are handled by real pages that redirect in the
   * browser instead (see src/components/LegacyRedirect.tsx).
   */
  output: "export",

  // Next prefixes its own asset URLs and every <Link> with this. Plain <img>
  // tags do not get it automatically — use `asset()` from src/lib/basePath.ts.
  basePath,

  // next/image needs a server to optimise; the site uses plain <img> anyway.
  images: { unoptimized: true },

  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
export default nextConfig;
