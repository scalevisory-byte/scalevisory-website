"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import HeroVisual, { type VisualKind } from "./HeroVisual";
import Icon, { WhatsAppIcon } from "./Icon";
import GlobalNetwork from "./GlobalNetwork";
import { asset } from "@/lib/basePath";
import { site, whatsappLink } from "@/lib/content/site";
import { monthShort, type DueDate } from "@/lib/content/compliance";

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
  /** Optional four-up row beneath the buttons. */
  features?: SlideFeature[];
  /** Rendered with pipe separators, like the printed lockup. */
  eyebrow: string[];
  title: string;
  /** Second line; `accent` is the word set in gold. */
  titleSecondLine?: string;
  accent?: string;
  body: string;
  /**
   * Optional photograph, placed in public/hero/. When absent the drawn
   * composition is used instead, so the site never ships a broken image.
   */
  image?: string;
  imageAlt?: string;
  visual: VisualKind;
  whatsapp: string;
}

/**
 * Every slide is dark: navy ground, white type, sky accent. The two slides
 * with a photograph run it behind the type with a scrim over it, so the
 * picture reads as atmosphere rather than as a thing competing with the words.
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
    imageAlt: "",
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
    imageAlt: "",
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
  const hasPhoto = Boolean(active.image);
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
      {dark && <GlobalNetwork className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.07]" />}

      {/* Photographic backdrop for the right-hand panel, where one is supplied.
          Hidden below lg, where the column layout stacks and the drawn
          composition reads better at narrow widths. */}
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
            {/* Feathered into the slide's ground on the left, where the type
                sits, and left far lighter on the right, where the picture is
                the only thing there. */}
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
                      "radial-gradient(78% 84% at 48% 50%, transparent 0%, rgba(7,53,116,0.22) 74%, rgba(7,53,116,0.42) 100%)",
                  }}
                />
              </>
            ) : (
              <>
                {/* Only the left of the frame is washed, where the type sits.
                    The laptop is the reason this photograph is here, so the
                    middle and right are left alone. */}
                <div className="absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-paper via-paper/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-paper to-transparent" />
              </>
            )}
          </div>
        ) : null
      )}

      {/* One concrete thing in the hero, over the photograph — what is actually
          due next. It is read from the compliance calendar at build time and
          the site rebuilds daily, so it is never a mock-up. Only on the photo
          slides, which are the only ones with a panel to sit on. */}
      {/* Docked to the content column rather than floated at a percentage of
          the viewport: its right edge now lines up with the nav above it and
          the trust panel below, so it reads as part of the layout instead of
          something dropped on the photograph. */}
      {hasPhoto && dueDates.length > 0 && (
        <div className="pointer-events-none absolute inset-0 z-10 hidden xl:block" aria-hidden="true">
          <div className="wrap relative h-full">
        <Link
          href="/resources/compliance-calendar"
          aria-hidden="false"
          className={`pointer-events-auto absolute right-5 top-1/2 w-[15rem] -translate-y-1/2 rounded-xl border p-4 no-underline backdrop-blur-md transition-colors md:right-8 lg:right-10 ${
            dark
              ? "border-white/15 bg-navy-deep/75 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] hover:border-white/35"
              : "border-line bg-white/90 shadow-[0_24px_60px_-28px_rgba(7,53,116,0.45)] hover:border-navy/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`font-display text-[10px] font-bold uppercase tracking-[0.16em] ${dark ? "text-sky" : "text-gold-deep"}`}>
              Due next
            </span>
            <span className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider ${dark ? "text-white/55" : "text-muted"}`}>
              <span className="block h-1.5 w-1.5 rounded-full bg-[#25D366]" />
              Live
            </span>
          </div>

          <ul className={`mt-3 space-y-2.5 border-t pt-3 ${dark ? "border-white/10" : "border-line"}`}>
            {dueDates.slice(0, 3).map((d) => (
              <li key={`${d.iso}-${d.title}`} className="flex items-center gap-3">
                <span className={`grid h-9 w-9 shrink-0 place-content-center justify-items-center rounded-lg ${dark ? "bg-white/10 text-white" : "bg-navy text-white"}`}>
                  <span className="font-display text-[13px] font-bold leading-none">{d.day}</span>
                  <span className="mt-px font-display text-[8px] font-bold uppercase tracking-wider text-white/70">
                    {monthShort(d.month)}
                  </span>
                </span>
                <span className="min-w-0">
                  <span className={`block truncate font-display text-[12.5px] font-bold leading-tight ${dark ? "text-white" : "text-navy"}`}>
                    {d.title}
                  </span>
                  <span className={`block text-[11px] leading-4 ${dark ? "text-white/55" : "text-muted"}`}>{d.category}</span>
                </span>
              </li>
            ))}
          </ul>

          <span className={`mt-3 block border-t pt-2.5 text-[11px] font-semibold ${dark ? "border-white/10 text-sky" : "border-line text-navy"}`}>
            Full compliance calendar →
          </span>
        </Link>
          </div>
        </div>
      )}

      {/* A fixed floor rather than a content-driven height: the photo slides
          hide the drawn column, so without it the section resizes as the
          carousel turns. 620px is the tallest slide plus a little air. */}
      <div className="wrap relative py-10 md:py-14 lg:min-h-[620px]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="grid lg:col-span-6">
            {slides.map((s, i) => (
              <div
                key={s.title}
                className={`slide col-start-1 row-start-1 flex flex-col justify-center ${i === index ? "is-active" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
                aria-hidden={i !== index}
              >
                <p className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] md:text-xs ${s.tone === "dark" ? "text-sky" : "text-gold-deep"}`}>
                  {/* The separator trails its word, so a wrap never starts a
                      line with a stray pipe. */}
                  {s.eyebrow.map((e, n) => (
                    <span key={e} className="flex items-center gap-x-2.5 whitespace-nowrap">
                      {e}
                      {n < s.eyebrow.length - 1 && <span className="opacity-40">|</span>}
                    </span>
                  ))}
                </p>

                <h1 className={`mt-5 ${s.tone === "dark" ? "!text-white" : "text-navy"}`}>
                  {s.title}
                  {s.titleSecondLine && (<><br />{s.titleSecondLine}</>)}
                  {s.accent && (
                    <>
                      <br />
                      <span className={s.tone === "dark" ? "text-sky" : "text-gold-deep"}>{s.accent}</span>
                    </>
                  )}
                </h1>

                <p className={`mt-5 max-w-[34rem] text-[17px] leading-8 ${s.tone === "dark" ? "text-white/80" : "text-muted"}`}>{s.body}</p>

                <div className="mt-8 flex flex-wrap gap-3">
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
                        : "btn border border-line bg-white text-navy hover:border-navy [&>svg]:text-[#25D366]"
                    }
                    tabIndex={i === index ? 0 : -1}
                  >
                    <WhatsAppIcon />
                    WhatsApp us
                  </a>
                </div>

                {s.features && (
                  <ul
                    className={`mt-8 grid gap-x-4 gap-y-6 sm:grid-cols-2 ${
                      s.features.length === 3 ? "lg:grid-cols-3" : "xl:grid-cols-4"
                    }`}
                  >
                    {s.features.map((f, n) => (
                      <li
                        key={f.title}
                        className={`flex items-start gap-2.5 ${
                          n > 0
                            ? s.tone === "dark"
                              ? "sm:border-l sm:border-white/15 sm:pl-3.5"
                              : "sm:border-l sm:border-line sm:pl-3.5"
                            : ""
                        }`}
                      >
                        <span className={`shrink-0 ${s.tone === "dark" ? "text-sky" : "text-navy"}`}>
                          <Icon name={f.icon} className="mt-0.5 h-6 w-6" strokeWidth={1.4} />
                        </span>
                        <div className="min-w-0">
                          <p className={`font-display text-[12px] font-bold leading-tight tracking-tight ${s.tone === "dark" ? "text-white" : "text-navy"}`}>
                            {f.title}
                          </p>
                          <p className={`mt-0.5 text-[11.5px] leading-5 ${s.tone === "dark" ? "text-white/65" : "text-muted"}`}>
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

          {/* Drawn composition. On lg the photograph takes over, so this hides. */}
          <div className={hasPhoto ? "lg:hidden" : "lg:col-span-6"}>
              <div className="grid mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
                {slides.map((s, i) => (
                  <div
                    key={s.visual}
                    className={`slide col-start-1 row-start-1 ${i === index ? "is-active" : ""}`}
                    aria-hidden="true"
                  >
                    <HeroVisual kind={s.visual} />
                  </div>
                ))}
              </div>
          </div>
        </div>

        {/* Dots. The mark stays small; the button around it is 24px square,
            which is the minimum target size WCAG 2.5.8 asks for — the old
            8x8 dot was the hardest thing on the site to hit on a phone. */}
        <ul className="mt-6 flex items-center justify-center">
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
        className={`absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border p-3 transition-colors md:block xl:left-6 ${
          dark
            ? "border-white/25 bg-white/10 text-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur hover:border-white hover:bg-white/20"
            : "border-line bg-white text-navy shadow-[0_6px_20px_-8px_rgba(7,53,116,0.45)] hover:border-sky hover:text-sky"
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
        className={`absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border p-3 transition-colors md:block xl:right-6 ${
          dark
            ? "border-white/25 bg-white/10 text-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur hover:border-white hover:bg-white/20"
            : "border-line bg-white text-navy shadow-[0_6px_20px_-8px_rgba(7,53,116,0.45)] hover:border-sky hover:text-sky"
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
