"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import HeroVisual, { type VisualKind } from "./HeroVisual";
import Icon, { WhatsAppIcon } from "./Icon";
import { asset } from "@/lib/basePath";
import { site, whatsappLink } from "@/lib/content/site";

const ROTATE_MS = 5500;

interface Slide {
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

const slides: Slide[] = [
  {
    eyebrow: ["Accounting", "Taxation", "Legal", "Business Consultancy"],
    title: "Balancing",
    titleSecondLine: "The",
    accent: "Unbalanced",
    body: "Reliable financial, tax and compliance solutions that help businesses stay organised, compliant and ready to grow.",
    image: "/hero/office.jpg",
    imageAlt: "",
    visual: "dashboard",
    whatsapp: "Hi Scale Visory, I'd like to book a free consultation.",
  },
  {
    eyebrow: ["Accounting"],
    title: "Complete Accounting.",
    titleSecondLine: "Clear Numbers,",
    accent: "Better Decisions.",
    body: "Daily entries, reconciled banks, ledgers that tie out and a monthly close you can read in ten minutes — in Tally, Zoho or Busy, whichever you already use.",
    visual: "reports",
    whatsapp: "Hi Scale Visory, I'd like to discuss my accounting requirements.",
  },
  {
    eyebrow: ["Taxation", "Compliance"],
    title: "Stay Compliant. Stay Focused.",
    titleSecondLine: "",
    accent: "Keep Growing.",
    body: "GST, income tax, TDS and every statutory due date tracked on one calendar, with reminders a week ahead — so nothing slips and no late fee is ever a surprise.",
    visual: "calendar",
    whatsapp: "Hi Scale Visory, I need help with GST / income tax compliance.",
  },
  {
    eyebrow: ["Business Consultancy"],
    title: "Your Business Deserves More",
    titleSecondLine: "Than Just",
    accent: "Bookkeeping.",
    body: "Find what is holding the business back, fix it with your team, and review it every month — health check, profit, cash flow and a plan with owners and deadlines.",
    visual: "advisory",
    whatsapp: "Hi Scale Visory, I'd like to know about business consultancy.",
  },
];

export default function HeroCarousel() {
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

  return (
    <section
      className="relative overflow-hidden bg-white"
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
            <img src={asset(s.image)} alt="" className="h-full w-full object-cover object-center" />
            {/* Feathers the photograph into the page rather than ending on a hard edge. */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/25 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent" />
          </div>
        ) : null
      )}

      <div className="wrap relative py-10 md:py-14 lg:min-h-[520px]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
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
                <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-gold md:text-xs">
                  {s.eyebrow.map((e, n) => (
                    <span key={e} className="flex items-center gap-x-2.5">
                      {n > 0 && <span className="text-gold/40">|</span>}
                      {e}
                    </span>
                  ))}
                </p>

                <h1 className="mt-4 text-navy">
                  {s.title}
                  {(s.titleSecondLine || s.accent) && (
                    <>
                      <br />
                      {s.titleSecondLine}
                      {s.accent && <> <span className="text-gold">{s.accent}</span></>}
                    </>
                  )}
                </h1>

                <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{s.body}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary group" tabIndex={i === index ? 0 : -1}>
                    Book a free consultation
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </Link>
                  <a
                    href={whatsappLink(s.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn border border-line bg-white text-navy hover:border-sky hover:text-sky"
                    tabIndex={i === index ? 0 : -1}
                  >
                    <WhatsAppIcon />
                    WhatsApp us
                  </a>
                </div>
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

        {/* Dots, centred under the hero. */}
        <ul className="mt-8 flex items-center justify-center gap-2.5">
          {slides.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-navy" : "w-2 bg-navy/25 hover:bg-navy/50"
                }`}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Edge arrows. Hidden on small screens, where swiping is natural. */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-line bg-white p-3 text-navy shadow-[0_6px_20px_-8px_rgba(7,53,116,0.45)] transition-colors hover:border-sky hover:text-sky md:block xl:left-6"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 4 L6 10 L12 16" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-line bg-white p-3 text-navy shadow-[0_6px_20px_-8px_rgba(7,53,116,0.45)] transition-colors hover:border-sky hover:text-sky md:block xl:right-6"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 4 L14 10 L8 16" />
        </svg>
      </button>

      <p className="sr-only" aria-live="polite">{`Slide ${index + 1} of ${slides.length}: ${active.title}`}</p>
    </section>
  );
}
