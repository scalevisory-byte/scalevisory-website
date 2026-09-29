/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Static export: `next build` writes plain HTML/CSS/JS into `out/`, which
   * GitHub Pages serves directly. No server, so no server actions, no
   * middleware/proxy, no ISR — and no `redirects()`, since those need a server
   * to issue them. Legacy URLs are handled by real pages that redirect in the
   * browser instead (see src/components/LegacyRedirect.tsx).
   */
  output: "export",

  // next/image needs a server to optimise; the site uses plain <img> anyway.
  images: { unoptimized: true },
};
export default nextConfig;
