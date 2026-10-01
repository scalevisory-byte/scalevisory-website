import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import { fmtDate } from "@/lib/format";
import { resourceCategories, categorySlug, postHref } from "@/lib/content/resources";
import { publishedPosts } from "@/lib/content/posts";
import { upcoming, monthShort } from "@/lib/content/compliance";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "GST updates, tax updates, legal updates, articles and business insights from Scale Visory, Surat — written for business owners, not for other accountants.",
  alternates: { canonical: "/resources" },
};
export default function ResourcesPage() {
  const posts = publishedPosts.slice(0, 12);
  // Computed at build time; the build runs daily, so this stays current.
  const next = upcoming(new Date(), 6);

  const counts = new Map<string, number>();
  for (const p of publishedPosts) {
    const s = categorySlug(p.category);
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }

  return (
    <Shell>
      <PageHero
        title="Resources"
        lead="Regulation changes, filing deadlines and the lessons that come out of consultancy work — explained in plain language, with what to actually do about them."
      />
      <Breadcrumbs trail={[{ href: "/resources", label: "Resources" }]} />

      {/* ── What's due next ──────────────────────────────────────────────
          The one part of this page that changes without anyone editing it. */}
      <section className="border-b border-line bg-[#F5F8FC] py-12 md:py-16">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div>
              <p className="eyebrow eyebrow-rule text-gold-deep after:hidden sm:after:block">Updated daily</p>
              <h2 className="mt-3">What&rsquo;s Due Next</h2>
            </div>
            <Link href="/resources/compliance-calendar" className="see-all group mb-1 text-navy hover:text-sky-deep">
              Full compliance calendar
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {next.map((d) => (
              <li key={`${d.iso}-${d.title}`} className="flex items-start gap-3.5 rounded-lg border border-line bg-white p-4">
                <span className="grid h-12 w-12 shrink-0 place-content-center justify-items-center rounded-lg bg-navy text-white">
                  <span className="font-display text-base font-bold leading-none">{d.day}</span>
                  <span className="mt-0.5 font-display text-[9px] font-bold uppercase tracking-wider text-white/70">
                    {monthShort(d.month)}
                  </span>
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[15px] font-bold leading-tight text-navy">{d.title}</p>
                  <p className="mt-1 text-[13px] leading-5 text-muted">{d.category}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-6 text-muted">
            Standard due dates. Which of them apply to you depends on your registrations and
            thresholds — <Link href="/contact" className="font-semibold text-navy">ask us which are yours</Link>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resourceCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/resources/${c.slug}`}
                className="rounded-lg border border-line bg-white p-6 no-underline transition-colors hover:border-sky"
              >
                <h2 className="text-xl">{c.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{c.lead}</p>
                <p className="mt-4 text-sm font-semibold text-navy">
                  {counts.get(c.slug)
                    ? `${counts.get(c.slug)} recent ${counts.get(c.slug) === 1 ? "post" : "posts"}`
                    : "Coming soon"}
                </p>
              </Link>
            ))}
          </div>

          {posts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl">Latest</h2>
              <div className="ledger mt-4">
                {posts.map((p) => (
                  <article key={p.slug} className="grid gap-2 md:grid-cols-12 md:gap-8">
                    <p className="text-sm text-muted md:col-span-3">
                      {p.category}
                      <br />
                      {fmtDate(p.date)}
                    </p>
                    <div className="md:col-span-9">
                      <h3 className="text-xl">
                        <Link href={postHref(p.category, p.slug)} className="no-underline hover:text-sky-deep">
                          {p.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-muted">{p.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 && (
            <p className="mt-12 text-muted">
              Posts are on the way. In the meantime, call or WhatsApp us with a question and we will answer it directly.
            </p>
          )}
        </div>
      </section>
    </Shell>
  );
}
