import Link from "next/link";
import Shell from "@/components/Shell";
import HeroCarousel from "@/components/HeroCarousel";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import InquiryForm from "@/components/InquiryForm";
import JsonLd from "@/components/JsonLd";
import { services } from "@/lib/content/services";
import { industries, industryHref, getIndustry } from "@/lib/content/industries";
import { postHref } from "@/lib/content/resources";
import { publishedPosts } from "@/lib/content/posts";
import { homeServices, whyPoints, processSteps, specialisations, stats, travelChecklist, firmPoints } from "@/lib/content/home";
import { asset } from "@/lib/basePath";
import { site, whatsappLink } from "@/lib/content/site";

export default function HomePage() {
  const posts = publishedPosts.slice(0, 3);
  const travel = getIndustry("travel-agencies")!;

  return (
    <Shell>
      <HeroCarousel />

      {/* ── Stats strip ─────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-white">
        <div className="wrap grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {stats.map((st, i) => (
            <div
              key={st.big}
              className={`flex items-center gap-4 py-7 sm:px-6 lg:border-l lg:border-line ${i === 0 ? "lg:border-l-0 lg:pl-0" : ""}`}
            >
              <span className="shrink-0 text-navy"><Icon name={st.icon} className="h-9 w-9" strokeWidth={1.4} /></span>
              <div>
                <p className="font-display text-lg font-bold text-navy md:text-xl">{st.big}</p>
                <p className="mt-0.5 text-sm text-muted">{st.small}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F8FC] py-16 md:py-24" id="services">
        <div className="wrap">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="eyebrow text-muted">Our services</p>
                <h2 className="mt-3">Complete Accounting Solutions</h2>
                <p className="mt-4 text-lg text-muted">
                  End-to-end financial, tax and compliance support across four core services — so the books, the
                  filings and the decisions all sit with one team.
                </p>
              </div>
              <Link href="/services" className="btn-ghost shrink-0">View all services →</Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
            {homeServices.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 60}>
                <Link href={s.href} className="card group block h-full no-underline">
                  <span className="text-navy transition-colors group-hover:text-sky">
                    <Icon name={s.icon} className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-4 text-base text-navy group-hover:text-sky">{s.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{s.blurb}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-navy group-hover:text-sky">
                    Learn more →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10">
              <Link href="/services" className="btn-ghost">View All Services →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Industries ──────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24" id="industries">
        <div className="wrap">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow text-muted">Industries</p>
              <h2 className="mt-3">Industries We Understand</h2>
              <p className="mt-4 text-lg text-muted">
                The services are the same; what differs is where the mistakes get made. These are the sectors we work
                in most.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 4) * 60}>
                <Link href={industryHref(ind)} className="card group flex h-full flex-col no-underline">
                  <h3 className="text-base text-navy group-hover:text-sky">{ind.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{ind.short}</p>
                  <span className="mt-4 text-sm font-semibold text-navy group-hover:text-sky">Read more →</span>
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
          email: site.email,
          slogan: site.tagline,
          address: {
            "@type": "PostalAddress",
            streetAddress: "G-59, VIP Plaza, VIP Road, Vesu",
            addressLocality: "Surat",
            addressRegion: "Gujarat",
            postalCode: "395007",
            addressCountry: "IN",
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
