import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import HeroCarousel from "@/components/HeroCarousel";
import Reveal from "@/components/Reveal";
import Skyline from "@/components/Skyline";
import Icon from "@/components/Icon";
import InquiryForm from "@/components/InquiryForm";
import JsonLd from "@/components/JsonLd";
import { services } from "@/lib/content/services";
import { industryHref, getIndustry } from "@/lib/content/industries";
import { postHref } from "@/lib/content/resources";
import { publishedPosts } from "@/lib/content/posts";
import { homeServices, whyPoints, processSteps, specialisations, stats, travelChecklist, firmPoints } from "@/lib/content/home";
import { asset } from "@/lib/basePath";
import { upcoming } from "@/lib/content/compliance";
import { site, whatsappLink } from "@/lib/content/site";

/**
 * The homepage is the one page whose canonical is not derived from a slug, so
 * it is set explicitly. Without it the github.io preview of "/" can be indexed
 * alongside the real domain.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const posts = publishedPosts.slice(0, 3);
  const travel = getIndustry("travel-agencies")!;
  /* Eight on the homepage; "View all industries" carries the full list. */
  const homeIndustries = ["travel-agencies", "retail", "trading", "infrastructure",
    "hospitality", "services", "startups", "smes"].map((slug) => getIndustry(slug)!);

  return (
    <Shell>
      <HeroCarousel dueDates={upcoming(new Date(), 3)} />

      {/* ── Stats ───────────────────────────────────────────────────────────
          A card lifted over the seam between the hero and the section below,
          rather than a full-bleed band — it is what ties the two together. */}
      <section className="relative z-10 -mt-8 md:-mt-10">
        <div className="wrap">
          <div className="grid divide-y divide-line rounded-xl border border-line bg-white shadow-[0_18px_50px_-24px_rgba(7,53,116,0.45)] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {stats.map((st, i) => (
              <div
                key={st.big}
                className={`flex items-center gap-4 px-6 py-6 sm:border-t-0 lg:border-l lg:border-line ${i === 0 ? "lg:border-l-0" : ""} ${i === 2 ? "sm:border-t sm:border-line lg:border-t-0" : ""} ${i === 3 ? "sm:border-t sm:border-line lg:border-t-0" : ""} ${i === 1 ? "sm:border-l sm:border-line" : ""}`}
              >
                <span className="shrink-0 text-navy"><Icon name={st.icon} className="h-9 w-9" strokeWidth={1.4} /></span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-bold leading-tight text-navy">{st.big}</p>
                  <p className="mt-1 text-sm leading-5 text-muted">{st.small}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F8FC] pb-16 pt-16 md:pb-24 md:pt-20" id="services">
        <div className="wrap">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div>
                <p className="eyebrow eyebrow-rule text-gold">Our services</p>
                <h2 className="mt-3">Complete Accounting Solutions</h2>
              </div>
              <Link href="/services" className="see-all group mb-1 text-navy hover:text-sky">
                View all services
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {homeServices.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 60}>
                <Link href={s.href} className="card group block h-full p-5 no-underline">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${
                      s.tone === "gold" ? "bg-gold-soft text-gold" : "bg-sky-soft text-navy"
                    }`}
                  >
                    <Icon name={s.icon} className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-4 text-base leading-snug text-navy group-hover:text-sky">{s.name}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{s.blurb}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-navy group-hover:text-sky">
                    Learn more →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20" id="industries">
        <Skyline className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full opacity-[0.06]" />
        <div className="wrap relative">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div>
                <p className="eyebrow eyebrow-rule text-gold">Industries</p>
                <h2 className="mt-3 !text-white">Industries We Understand</h2>
              </div>
              <Link
                href="/industries"
                className="see-all group mb-1 rounded-md border border-white/25 px-4 py-2.5 text-white hover:border-white hover:bg-white/10"
              >
                View all industries
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {homeIndustries.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 4) * 60}>
                <Link
                  href={industryHref(ind)}
                  className="group flex h-full items-center gap-3.5 rounded-lg bg-white p-4 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-16px_rgba(0,0,0,0.5)]"
                >
                  <span className="shrink-0 text-navy transition-colors group-hover:text-sky">
                    <Icon name={ind.icon} className="h-7 w-7" strokeWidth={1.4} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[15px] font-bold leading-tight text-navy group-hover:text-sky">
                      {ind.cardName ?? ind.name}
                    </span>
                    <span className="mt-1 block text-[13px] leading-5 text-muted">{ind.covers}</span>
                  </span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy text-[13px] text-white transition-colors group-hover:bg-sky group-hover:text-navy-deep">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Travel specialisation ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy py-16 text-white md:py-24">
        <div
          className="absolute inset-y-0 right-0 hidden w-1/2 lg:block"
          aria-hidden="true"
        >
          <img src={asset("/hero/travel.jpg")} alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/45 to-navy/10" />
        </div>

        <div className="wrap relative grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">Specialization</p>
            <h2 className="mt-3 text-white">Accounting Built for Travel Businesses</h2>
            <p className="mt-5 max-w-xl leading-8 text-white/75">
              Travel accounting is different. We handle tickets, hotels, packages, commissions, TCS, GST, supplier
              reconciliation and complex payment flows — so travel businesses can focus on growth.
            </p>

            <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {travelChecklist.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm leading-6 text-white/85">
                  <span className="mt-0.5 shrink-0 text-sky" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 10.5 L8 14.5 L16 5.5" />
                    </svg>
                  </span>
                  {c}
                </li>
              ))}
            </ul>

            <Link href="/travel-agency-accounting" className="btn-sky mt-9">Explore Travel Accounting →</Link>
          </Reveal>
        </div>
      </section>

      {/* ── Why Scale Visory ────────────────────────────────────────────── */}
      <section className="bg-navy py-16 text-white md:py-24">
        <div className="wrap">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">Why us</p>
              <h2 className="mt-3 text-white">Why Businesses Choose Scale Visory</h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 70}>
                <div className="border-t border-white/15 pt-5">
                  <span className="text-sky"><Icon name={p.icon} /></span>
                  <h3 className="mt-3 text-lg text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we work ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">Process</p>
              <h2 className="mt-3">How We Work</h2>
            </div>
          </Reveal>

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <li className="border-t-2 border-navy pt-4">
                  <span className="font-display text-3xl font-bold text-gold">{s.n}</span>
                  <h3 className="mt-2 text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Specialized solutions ───────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="wrap">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">Also from Scale Visory</p>
              <h2 className="mt-3">Specialized Solutions</h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {specialisations.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 70}>
                <div className="card flex h-full flex-col">
                  <h3 className="text-lg">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-muted">{s.body}</p>
                  {s.external ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="mt-5 text-sm font-semibold text-navy hover:text-sky">
                      {s.cta} →
                    </a>
                  ) : (
                    <Link href={s.href} className="mt-5 text-sm font-semibold text-navy no-underline hover:text-sky">
                      {s.cta} →
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── A firm, not a portal ────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-muted">The practice</p>
            <h2 className="mt-3">A Firm, Not a Portal</h2>
            <p className="mt-5 text-lg leading-8 text-ink">
              Real people. Real conversations. Real accountability.
            </p>
            <p className="mt-4 leading-8 text-muted">
              We work with the systems you already use — Tally, Zoho and Busy — rather than moving you onto ours. You
              speak to the person who signs off your books, and the work is documented as it goes.
            </p>
            <p className="mt-6 text-sm text-muted">{site.address}</p>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={100}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {firmPoints.map((f) => (
                <li key={f} className="rounded-lg border border-line bg-white p-5">
                  <span className="text-sky" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 10.5 L8 14.5 L16 5.5" />
                    </svg>
                  </span>
                  <p className="mt-3 font-display text-sm font-bold text-navy">{f}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Resources (only when posts exist) ───────────────────────────── */}
      {posts.length > 0 && (
        <section className="border-t border-line bg-white py-16">
          <div className="wrap">
            <h2 className="text-2xl">Latest from Resources</h2>
            <ul className="ledger mt-4">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={postHref(p.category, p.slug)} className="font-semibold text-navy no-underline hover:text-sky">
                    {p.title}
                  </Link>
                  <p className="text-sm text-muted">{p.category}</p>
                </li>
              ))}
            </ul>
            <Link href="/resources" className="mt-4 inline-block text-sm font-semibold text-navy">All resources</Link>
          </div>
        </section>
      )}

      {/* ── Final CTA ───────────────────────────────────────────────────── */}
      <section className="bg-navy-deep py-16 text-white md:py-20">
        <div className="wrap grid gap-8 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-7">
            <h2 className="text-white">Let&apos;s Bring Balance<br className="hidden sm:block" /> to Your Business.</h2>
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              Accounting, taxation, compliance and business advisory support built around your business.
            </p>
          </Reveal>
          <Reveal className="md:col-span-5" delay={100}>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/contact" className="btn-sky">Book a free consultation →</Link>
              <a
                href={whatsappLink("Hi Scale Visory, I'd like to discuss my requirements.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-light"
              >
                WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Enquiry ─────────────────────────────────────────────────────── */}
      <section className="section" id="inquiry">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2>Tell us where the books stand.</h2>
            <p className="mt-3 text-muted">
              A 20-minute call, no charge. We&apos;ll tell you what&apos;s pending, what it costs to fix, and whether
              we&apos;re the right fit.
            </p>
            <p className="mt-6 text-sm text-muted">{site.address}</p>
            <p className="mt-2 text-sm">
              <a href={`tel:${site.phoneRaw}`} className="font-semibold text-navy">{site.phone}</a>
            </p>
          </Reveal>
          <div className="md:col-span-7">
            <InquiryForm kind="service" subjectOptions={[...services.map((s) => s.name), "Training", "Something else"]} />
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AccountingService",
          name: site.name,
          description: site.description,
          url: site.url,
          telephone: site.phone,
          email: [site.email, site.emailAlt],
          slogan: site.tagline,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.postal.street,
            addressLocality: site.postal.locality,
            addressRegion: site.postal.region,
            postalCode: site.postal.postalCode,
            addressCountry: site.postal.country,
          },
          areaServed: { "@type": "AdministrativeArea", name: "Gujarat, India" },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "10:00",
              closes: "19:00",
            },
          ],
          sameAs: [site.social.instagram, site.social.linkedin],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/services/${s.slug}` },
            })),
          },
        }}
      />
    </Shell>
  );
}
