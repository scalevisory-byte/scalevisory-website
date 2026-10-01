"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import HeroVisual, { type VisualKind } from "./HeroVisual";
import Icon, { WhatsAppIcon } from "./Icon";
import GlobalNetwork from "./GlobalNetwork";
import BrandPattern from "./BrandPattern";
import ComplianceWidget from "./ComplianceWidget";
import { asset } from "@/lib/basePath";
import { whatsappLink } from "@/lib/content/site";
import { type DueDate } from "@/lib/content/compliance";

const ROTATE_MS = 5500;

interface SlideFeature {
  icon: string;
  title: string;
  body: string;
}

interface SlideCta {
  label: string;
  href: string;
  /** Opens in a new tab — used for the partner ventures on their own domains. */
  external?: boolean;
}

interface Slide {
  /** "dark" puts the slide on navy with white type; default is the light treatment. */
  tone?: "light" | "dark";
  /** Overrides "Book a free consultation" → /contact on slides that belong elsewhere. */
  cta?: SlideCta;
  /** Rendered with pipe separators, like the printed lockup. */
  eyebrow: string[];
  title: string;
  /** Second line; `accent` is the word set in gold. */
  titleSecondLine?: string;
  accent?: string;
  body: string;
  /** Full-bleed photograph behind the whole slide, from public/hero/. */
  image?: string;
  /** Floats the live compliance card over the photograph on lg and up. */
  dueCard?: boolean;
  /** Optional promise row beneath the buttons. */
  features?: SlideFeature[];
  visual: VisualKind;
  whatsapp: string;
}

/**
 * Slide one is the light treatment the owner specified: a clean two-column
 * composition, 48/52, with one dominant visual on the right. The rest stay on
 * navy, which is what makes the first slide read as the front of the brochure
 * rather than as one of seven.
 */
const slides: Slide[] = [
  {
    tone: "light",
    eyebrow: ["Accounting", "Taxation", "Legal", "Business Consultancy"],
    features: [
      { icon: "clock", title: "Reliable Support", body: "On time, every time" },
      { icon: "bars", title: "Expert Guidance", body: "For real business needs" },
      { icon: "people", title: "Long-Term Partnership", body: "Beyond just compliance" },
    ],
    title: "Complete Accounting",
    titleSecondLine: "Solutions for",
    accent: "Growing Businesses.",
    body: "Accurate books. Timely compliance. Clear financial insights. So you can focus on what you do best — grow your business.",
    image: "/hero/desk.jpg",
    dueCard: true,
    visual: "dashboard",
    whatsapp: "Hi Scale Visory, I'd like to discuss my accounting requirements.",
  },
  {
    tone: "dark",
    eyebrow: ["Taxation", "Compliance"],
    title: "Stay Compliant. Stay Focused.",
    titleSecondLine: "",
    accent: "Keep Growing.",
    body: "GST, income tax, TDS and statutory compliance managed through one organised process, with important deadlines tracked and followed up.",
    visual: "calendar",
    whatsapp: "Hi Scale Visory, I need help with GST / income tax compliance.",
  },
  {
    tone: "dark",
    eyebrow: ["Business Consultancy"],
    title: "Your Business Deserves",
    titleSecondLine: "More Than Just",
    accent: "Bookkeeping.",
    body: "Go beyond entries and reports. Understand profitability, cash flow, financial gaps and the actions needed to improve your business.",
    visual: "advisory",
    whatsapp: "Hi Scale Visory, I'd like to know about business consultancy.",
  },
  {
    tone: "dark",
    eyebrow: ["Specialisation", "Travel"],
    title: "Specialized Accounting",
    titleSecondLine: "for",
    accent: "Travel Agents.",
    body: "Tickets, hotels, packages, agent commissions, TCS and GST — travel accounting works differently, and we handle the whole of it for you.",
    image: "/hero/travel.jpg",
    visual: "dashboard",
    cta: { label: "Explore travel accounting", href: "/travel-agency-accounting" },
    whatsapp: "Hi Scale Visory, I run a travel agency and need help with accounting and GST/TCS.",
  },
  {
    tone: "dark",
    eyebrow: ["Payment Recovery"],
    title: "Money You Have Earned",
    titleSecondLine: "But Not Yet",
    accent: "Collected.",
    body: "Overdue invoices pursued through a documented, escalating process — carried out by our partner venture Artha at artharecovery.in.",
    visual: "recovery",
    cta: { label: "Visit artharecovery.in", href: "https://artharecovery.in", external: true },
    whatsapp: "Hi Scale Visory, I'd like to discuss recovering overdue payments.",
  },
  {
    tone: "dark",
    eyebrow: ["Careers"],
    title: "Build Your Career",
    titleSecondLine: "in Accounts",
    accent: "and Tax.",
    body: "Openings at Scale Visory are listed on Zynta Jobs — the place to apply if you want to learn this work properly and grow with the firm.",
    visual: "careers",
    cta: { label: "See openings on Zynta Jobs", href: "https://zyntajobs.in", external: true },
    whatsapp: "Hi Scale Visory, I'd like to know about openings at the firm.",
  },
  {
    tone: "dark",
    eyebrow: ["Accounting", "Taxation", "Legal", "Business Consultancy"],
    title: "Balancing",
    titleSecondLine: "The",
    accent: "Unbalanced.",
    body: "Complete financial, tax, compliance and business advisory support for businesses that want organised accounts and better financial control.",
    visual: "reports",
    whatsapp: "Hi Scale Visory, I'd like to book a free consultation.",
  },
];

export default function HeroCarousel({ dueDates = [] }: { dueDates?: DueDate[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((n: number) => setIndex((n + slides.length) % slides.length), []);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(next, ROTATE_MS);
    return () => clearTimeout(t);
  }, [index, paused, next]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  }

  const touchX = useRef<number | null>(null);
  function onTouchStart(e: React.TouchEvent) { touchX.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX.current = null;
  }

  const active = slides[index];
  const dark = active.tone === "dark";

  return (
    <section
      className={`relative isolate overflow-hidden transition-colors duration-500 ${dark ? "bg-navy" : "bg-paper"}`}
      aria-roledescription="carousel"
      aria-label="Scale Visory highlights"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {dark && (
        <GlobalNetwork className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.07]" />
      )}

      {/* Full-bleed photograph, for the dark slides that carry one. */}
      {slides.map((s, i) =>
        s.image ? (
          <div
            key={`bg-${s.title}`}
            className={`slide absolute inset-y-0 right-0 hidden w-[62%] lg:block ${i === index ? "is-active" : ""}`}
            aria-hidden="true"
          >
            <img
              src={asset(s.image)}
              alt=""
              className="h-full w-full object-cover object-center"
              /* A flat scrim over a whole photograph kills its contrast along
                 with its brightness. Lifting contrast and saturation first
                 means the scrim can darken it without flattening it. */
              style={{ filter: s.tone === "dark" ? "contrast(1.12) saturate(1.08)" : "contrast(1.08) saturate(1.06)" }}
            />
            {s.tone === "dark" ? (
              <>
                <div className="absolute inset-0 bg-navy/22" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/40 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-navy via-navy/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent" />
                {/* Vignette, so the eye lands on the middle of the frame. */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(78% 84% at 48% 50%, transparent 0%, rgba(11,58,120,0.22) 74%, rgba(11,58,120,0.42) 100%)",
                  }}
                />
              </>
            ) : (
              <>
                {/* Only the left of the frame is washed, where the type sits.
                    The laptop and the row of books are the reason this
                    photograph is here, so the middle and right are left
                    alone. The wash is paper, which is now the slide's own
                    ground, so the two meet without a seam. */}
                <div className="absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-paper via-paper/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-paper to-transparent" />
              </>
            )}
          </div>
        ) : null
      )}

      {/* The light slide's ground. The owner wanted the left read as a tinted
          panel rather than as white paper, so the wash is roughly twice what
          it was and the mark's strokes sit a little higher. The ceiling is set
          by the type, not by taste: at this depth the gold label measures 4.9
          and the lead 5.0, both over AA.

          It is painted ABOVE the photograph, not behind it. Behind, the photo
          panel's own wash ended on plain paper while the slide around it was
          tinted, and the two met as a hard vertical line down the hero. */}
      {!dark && (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(11,58,120,0.130) 0%, rgba(11,58,120,0.065) 30%, rgba(11,58,120,0) 60%)",
            }}
            aria-hidden="true"
          />
          <BrandPattern className="pointer-events-none absolute inset-y-0 left-0 h-full w-[48%] opacity-[0.05]" />
        </>
      )}

      {/* The live compliance card, docked to the content column rather than
          floated at a percentage of the viewport: its right edge lines up with
          the nav above it and the credibility bar below, so it reads as part
          of the layout instead of something dropped on the photograph. Only
          from lg, where the photograph exists; below that it sits in the
          flow under the drawn composition. */}
      {active.dueCard && dueDates.length > 0 && (
        <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block" aria-hidden="true">
          <div className="wrap relative h-full">
            <ComplianceWidget
              dates={dueDates}
              /* Docked to the content column on the right, and sat at the
                 foot of the hero rather than its middle. Centred, its right
                 edge and the next-slide arrow — which is also centred — shared
                 22px at 1280, and the card swallowed the click. */
              className="pointer-events-auto absolute bottom-10 right-5 w-[16rem] md:right-8 lg:right-10"
            />
          </div>
        </div>
      )}

      {/* A fixed floor rather than a content-driven height: the slides differ
          in how much they carry, so without it the section resizes as the
          carousel turns. */}
      <div className="wrap relative py-12 md:py-16 lg:min-h-[620px]">
        {/* An even split. The brief's 48/52 was sized for the drawn console;
            with the photograph full-bleed from 38% the right column carries
            nothing on lg, and the extra 27px is what keeps "Long-Term
            Partnership" on one line in the promise row. */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="grid">
            {slides.map((s, i) => (
              <div
                key={s.title}
                className={`slide col-start-1 row-start-1 flex flex-col justify-center ${i === index ? "is-active" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
                aria-hidden={i !== index}
              >
                <p className={`eyebrow flex flex-wrap items-center gap-x-2.5 gap-y-1 !tracking-[0.14em] ${s.tone === "dark" ? "text-gold-light" : "text-gold-deep"}`}>
                  {/* The separator trails its word, so a wrap never starts a
                      line with a stray pipe. */}
                  {s.eyebrow.map((e, n) => (
                    <span key={e} className="flex items-center gap-x-2.5 whitespace-nowrap">
                      {e}
                      {n < s.eyebrow.length - 1 && <span className="opacity-40">|</span>}
                    </span>
                  ))}
                </p>

                {/* The site's h1 is 60px; in a 48%-wide column Playfair breaks
                    "Complete Accounting" over two lines at that size, which
                    makes a five-line headline. 48px keeps it to three. */}
                <h1 className={`mt-6 lg:!text-[48px] ${s.tone === "dark" ? "!text-white" : "text-navy"}`}>
                  {s.title}
                  {s.titleSecondLine && (<><br />{s.titleSecondLine}</>)}
                  {s.accent && (
                    <>
                      <br />
                      <span className={s.tone === "dark" ? "text-gold-light" : "text-gold-deep"}>{s.accent}</span>
                    </>
                  )}
                </h1>

                <p className={`mt-6 max-w-[34rem] text-[17px] leading-8 ${s.tone === "dark" ? "text-white/80" : "text-muted-deep"}`}>
                  {s.body}
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  {s.cta?.external ? (
                    <a
                      href={s.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group ${s.tone === "dark" ? "btn-sky" : "btn-primary"}`}
                      tabIndex={i === index ? 0 : -1}
                    >
                      {s.cta.label}
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </a>
                  ) : (
                    <Link
                      href={s.cta?.href ?? "/contact"}
                      className={`group ${s.tone === "dark" ? "btn-sky" : "btn-primary"}`}
                      tabIndex={i === index ? 0 : -1}
                    >
                      {s.cta?.label ?? "Book a free consultation"}
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </Link>
                  )}
                  <a
                    href={whatsappLink(s.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      s.tone === "dark"
                        ? "btn border border-white/25 bg-white/5 text-white hover:border-white hover:bg-white/10"
                        : "btn-outline [&>svg]:text-[#128C4A]"
                    }
                    tabIndex={i === index ? 0 : -1}
                  >
                    <WhatsAppIcon />
                    WhatsApp us
                  </a>
                </div>

                {s.features && (
                  <ul className="mt-9 grid gap-x-3 gap-y-6 sm:grid-cols-3">
                    {s.features.map((f, n) => (
                      <li
                        key={f.title}
                        className={`flex items-start gap-2.5 ${
                          n > 0
                            ? s.tone === "dark"
                              ? "sm:border-l sm:border-white/15 sm:pl-3"
                              : "sm:border-l sm:border-navy/15 sm:pl-3.5"
                            : ""
                        }`}
                      >
                        <span className={`shrink-0 ${s.tone === "dark" ? "text-sky-bright" : "text-navy"}`}>
                          <Icon name={f.icon} className="mt-0.5 h-6 w-6" strokeWidth={1.4} />
                        </span>
                        <div className="min-w-0">
                          <p className={`font-display text-[12px] font-bold leading-tight tracking-tight ${s.tone === "dark" ? "text-white" : "text-navy"}`}>
                            {f.title}
                          </p>
                          <p className={`mt-0.5 text-[11.5px] leading-5 ${s.tone === "dark" ? "text-white/65" : "text-muted-deep"}`}>
                            {f.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* ── The visual column ──────────────────────────────────────────
              One dominant visual per slide. The opening slide gets the drawn
              console over a blurred office; the rest keep their drawn
              compositions. The travel slide's photograph is full-bleed behind
              everything on lg, so its column visual drops out there. */}
          <div className="grid">
            {slides.map((s, i) => (
              <div
                key={`v-${s.title}`}
                className={`slide col-start-1 row-start-1 ${i === index ? "is-active" : ""} ${s.image ? "lg:hidden" : ""}`}
                aria-hidden="true"
              >
                <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
                  <HeroVisual kind={s.visual} />
                  {s.dueCard && <ComplianceWidget dates={dueDates} className="mt-6" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots. The mark stays small; the button around it is 24px square,
            which is the minimum target size WCAG 2.5.8 asks for. */}
        <ul className="mt-10 flex items-center justify-center">
          {slides.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className="group grid h-6 w-6 place-items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? dark ? "w-6 bg-sky" : "w-6 bg-navy"
                      : dark
                        ? "w-1.5 bg-white/35 group-hover:bg-white/70"
                        : "w-1.5 bg-navy/25 group-hover:bg-navy/50"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Ambient light from the upper right — the same wash the landing heroes
          use. It sits ABOVE the photograph rather than behind it: behind, the
          panel's left edge was the one strip the light never reached, and that
          showed as a hard vertical seam down the hero. */}
      {dark && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(110% 85% at 72% 6%, rgba(16,169,232,0.16) 0%, rgba(16,169,232,0.05) 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}

      <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent ${dark ? "via-sky/40" : "via-line"}`} />

      {/* Edge arrows. Hidden on small screens, where swiping is natural. */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className={`absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border p-3 transition-colors md:block xl:left-5 ${
          dark
            ? "border-white/25 bg-white/10 text-white backdrop-blur hover:border-white hover:bg-white/20"
            : "border-line bg-white text-navy shadow-soft hover:border-navy"
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 4 L6 10 L12 16" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className={`absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border p-3 transition-colors md:block xl:right-5 ${
          dark
            ? "border-white/25 bg-white/10 text-white backdrop-blur hover:border-white hover:bg-white/20"
            : "border-line bg-white text-navy shadow-soft hover:border-navy"
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 4 L14 10 L8 16" />
        </svg>
      </button>

      <p className="sr-only" aria-live="polite">{`Slide ${index + 1} of ${slides.length}: ${active.title}`}</p>
    </section>
  );
}

