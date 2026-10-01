import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import { fmtDate } from "@/lib/format";
import {
  resourceCategories,
  getCategoryBySlug,
  storedNamesForSlug,
  postHref,
} from "@/lib/content/resources";
import { publishedPosts } from "@/lib/content/posts";

export function generateStaticParams() {
  return resourceCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = getCategoryBySlug(category);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/resources/${c.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = getCategoryBySlug(category);
  if (!c) notFound();

  const names = storedNamesForSlug(c.slug);
  const posts = publishedPosts.filter((p) => names.includes(p.category));

  return (
    <Shell>
      <PageHero title={c.title} lead={c.lead} />
      <Breadcrumbs
        trail={[
          { href: "/resources", label: "Resources" },
          { href: `/resources/${c.slug}`, label: c.title },
        ]}
      />

      <section className="section">
        <div className="wrap">
          {posts.length === 0 ? (
            <div className="rounded-lg border border-line bg-white p-8">
              <p className="text-muted">
                Nothing published under {c.title} yet. Browse the{" "}
                <Link href="/resources" className="font-semibold text-navy">other categories</Link>, or ask us the
                question directly — we answer on WhatsApp during working hours.
              </p>
            </div>
          ) : (
            <div className="ledger">
              {posts.map((p) => (
                <article key={p.slug} className="grid gap-2 md:grid-cols-12 md:gap-8">
                  <p className="text-sm text-muted md:col-span-3">{fmtDate(p.date)}</p>
                  <div className="md:col-span-9">
                    <h2 className="text-2xl">
                      <Link href={postHref(p.category, p.slug)} className="no-underline hover:text-sky-deep">
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-muted">{p.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          <nav aria-label="Other categories" className="mt-16 border-t border-line pt-8">
            <p className="font-display text-sm font-semibold text-navy">Other categories</p>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {resourceCategories
                .filter((o) => o.slug !== c.slug)
                .map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/resources/${o.slug}`}
                      className="inline-block rounded-md border border-line bg-white px-3.5 py-2 text-sm text-navy no-underline hover:border-sky"
                    >
                      {o.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </section>
    </Shell>
  );
}
