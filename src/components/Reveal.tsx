"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fades a section in as it scrolls into view.
 *
 * The hidden state is added by JavaScript, never in the server HTML, so the
 * page is fully readable with JS off or before hydration. `prefers-reduced-
 * motion` is honoured in globals.css.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("reveal");
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return <div ref={ref} className={className}>{children}</div>;
}
