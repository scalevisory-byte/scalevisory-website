import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";

// Emitted once at build time — there is no server to regenerate it.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin"] }, sitemap: `${site.url}/sitemap.xml` };
}
