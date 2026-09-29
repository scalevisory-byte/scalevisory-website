"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import HeroVisual, { type VisualKind } from "./HeroVisual";
import { site, whatsappLink } from "@/lib/content/site";

const ROTATE_MS = 5500;

interface Slide {
  eyebrow: string;
  title: string;
  /** Rendered on its own line, so the lockup breaks where the brand breaks it. */
  titleSecondLine?: string;
  body: string;
  visual: VisualKind;
  whatsapp: string;
}

const slides: Slide[] = [
  {
    eyebrow: "Accounting · Taxation · Legal · Business Consultancy",
    title: "Balancing",
    titleSecondLine: "The Unbalanced",
    body:
      "Reliable financial, tax and compliance solutions that help businesses stay organised, compliant and ready to grow.",
    visual: "dashboard",
    whatsapp: "Hi Scale Visory, I'd like to book a free consultation.",
  },
  {
    eyebrow: "Accounting",
    title: "Complete Accounting.",
    titleSecondLine: "Clear Numbers. Better Decisions.",
    body:
      "Daily entries, reconciled banks, ledgers that tie out and a monthly close you can read in ten minutes — in Tally, Zoho or Busy, whichever you already use.",
    visual: "reports",
    whatsapp: "Hi Scale Visory, I'd like to discuss my accounting requirements.",
  },
  {
    eyebrow: "Taxation & Compliance",
    title: "Stay Compliant.",
    titleSecondLine: "Stay Focused. Keep Growing.",
    body:
      "GST, income tax, TDS and every statutory due date tracked on one calendar, with reminders a week ahead — so nothing slips and no late fee is ever a surprise.",
    visual: "calendar",
    whatsapp: "Hi Scale Visory, I need help with GST / income tax compliance.",
  },
  {
    eyebrow: "Business Consultancy",
    title: "Your Business Deserves More",
    titleSecondLine: "Than Just Bookkeeping.",
    body:
      "Find what is holding the business back, fix it with your team, and review it every month — health check, profit, cash flow and a plan with owners and deadlines.",
    visual: "advisory",
    whatsapp: "Hi Scale Visory, I'd like to know about business consultancy.",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const region = useRef<HTMLDivElement>(null);

  const go = useCallback((n: number) => setIndex((n + slides.length) % slides.length), []);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Auto-advance, unless the visitor is interacting or has asked for less motion.
  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(next, ROTATE_MS);
    return () => clearTimeout(t);
  }, [index, paused, next]);

  // Arrow keys move between slides once the carousel has focus.
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  }

  // Swipe on touch devices.
  const touchX = useRef<number | null>(null);
  function onTouchStart(e: React.TouchEvent) { touchX.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX.current = null;
  }

  const active = slides[index];

  return (
    <section
      ref={region}
      className="relative overflow-hidden bg-navy text-white"
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
      {/* Faint ledger rules — structure without decoration. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "repeating-linear-gradient(to bottom, #fff 0 1px, transparent 1px 64px)" }}
      />

      <div className="wrap relative py-12 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Slides share one grid cell and cross-fade, so height never jumps. */}
          <div className="grid lg:col-span-7">
            {slides.map((s, i) => (
              <div
                key={s.title}
                className={`slide col-start-1 row-start-1 ${i === index ? "is-active" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
                aria-hidden={i !== index}
              >
                <p className="eyebrow text-sky">{s.eyebrow}</p>
                <h1 className="mt-4 text-white">
                  {s.title}
                  {s.titleSecondLine && (<><br />{s.titleSecondLine}</>)}
                </h1>
                <div className="beam mt-6 h-[3px] w-full max-w-xl bg-sky" aria-hidden="true" />
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">{s.body}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-sky" tabIndex={i === index ? 0 : -1}>
                    Book a Free Consultation
                  </Link>
                  <a
                    href={whatsappLink(s.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-light"
                    tabIndex={i === index ? 0 : -1}
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div className="grid mx-auto w-full max-w-md lg:max-w-none">
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

        {/* Controls */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="rounded-md border border-white/25 p-2 text-white transition-colors hover:border-sky hover:text-sky"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4 L6 10 L12 16" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="rounded-md border border-white/25 p-2 text-white transition-colors hover:border-sky hover:text-sky"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 4 L14 10 L8 16" />
              </svg>
            </button>
          </div>

          <ul className="flex items-center gap-2.5">
            {slides.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-sky" : "w-3 bg-white/30 hover:bg-white/60"
                  }`}
                />
              </li>
            ))}
          </ul>

          <p className="ml-auto hidden text-sm text-white/60 sm:block">
            <a href={`tel:${site.phoneRaw}`} className="font-semibold text-white no-underline hover:text-sky">
              {site.phone}
            </a>
          </p>
        </div>
      </div>

      {/* Announce slide changes without stealing focus. */}
      <p className="sr-only" aria-live="polite">{`Slide ${index + 1} of ${slides.length}: ${active.title}`}</p>
    </section>
  );
}
