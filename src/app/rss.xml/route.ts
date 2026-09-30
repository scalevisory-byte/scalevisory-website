import { site } from "@/lib/content/site";
import { publishedPosts } from "@/lib/content/posts";
import { postHref } from "@/lib/content/resources";
import { renderContent } from "@/lib/format";

/** Written once at build time — there is no server to regenerate it. */
export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = publishedPosts
    .map((p) => {
      const url = `${site.url}${postHref(p.category, p.slug)}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <category>${esc(p.category)}</category>
      <pubDate>${new Date(`${p.date}T09:00:00+05:30`).toUTCString()}</pubDate>
      <description>${esc(p.excerpt)}</description>
      <content:encoded><![CDATA[${renderContent(p.content)}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${esc(site.name)} — Resources</title>
    <link>${site.url}/resources</link>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>GST updates, tax updates, legal updates, articles and business insights from ${esc(site.name)}, Surat.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
