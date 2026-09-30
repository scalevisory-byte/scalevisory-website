import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { fmtDate, renderContent } from "@/lib/format";
import { site } from "@/lib/content/site";
import { getCategoryBySlug, categorySlug, postHref } from "@/lib/content/resources";
import { posts, publishedPosts, getPost } from "@/lib/content/posts";

/**
 * One post. A static export has no server, so there is no redirect available
 * when the category in the path is not the post's own — instead only the
 * canonical pairing is generated, and any other pairing 404s.
 */
export function generateStaticParams() {
  return posts.map((p) => ({ category: categorySlug(p.category), slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: postHref(p.category, p.slug) },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      publishedTime: p.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const category = getCategoryBySlug(categorySlug(p.category))!;
  const more = publishedPosts.filter((o) => o.slug !== p.slug).slice(0, 3);

  return (
    <Shell>
      <Breadcrumbs
        trail={[
          { href: "/resources", label: "Resources" },
          { href: `/resources/${category.slug}`, label: category.title },
          { href: postHref(p.category, p.slug), label: p.title },
        ]}
      />

      <article className="section">
        <div className="wrap max-w-prose">
          <p className="text-sm text-muted">
            <Link href={`/resources/${category.slug}`} className="no-underline hover:text-navy">
              {category.title}
            </Link>{" "}
            · {fmtDate(p.date)}
          </p>
          <h1 className="mt-3 text-4xl">{p.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{p.excerpt}</p>

          <div
            className="prose-sv mt-10 border-t border-line pt-10"
            dangerouslySetInnerHTML={{ __html: renderContent(p.content) }}
          />

          <div className="mt-12 rounded-lg border border-line bg-white p-6">
            <h2 className="text-xl">Something here apply to you?</h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              Every business reads its own situation into a general piece, and usually gets one detail
              wrong. Tell us yours and we will tell you what actually applies.
            </p>
            <Link href="/contact" className="btn-primary mt-5">Book a free consultation</Link>
          </div>

          {more.length > 0 && (
            <nav aria-label="More from Resources" className="mt-16 border-t border-line pt-8">
              <p className="font-display text-sm font-semibold text-navy">More from Resources</p>
              <ul className="mt-4 space-y-4">
                {more.map((o) => (
                  <li key={o.slug}>
                    <Link href={postHref(o.category, o.slug)} className="no-underline">
                      <span className="block font-display font-semibold text-navy hover:text-sky">
                        {o.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted">
                        {o.category} · {fmtDate(o.date)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </article>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.excerpt,
          datePublished: p.date,
          dateModified: p.date,
          mainEntityOfPage: `${site.url}${postHref(p.category, p.slug)}`,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
    </Shell>
  );
}
