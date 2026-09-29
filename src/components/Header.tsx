"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { nav, site } from "@/lib/content/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  // Compact the bar once the reader has moved past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-paper/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-line shadow-[0_1px_16px_-6px_rgba(7,53,116,0.35)]" : "border-line"
      }`}
    >
      <div
        className={`wrap flex items-center justify-between gap-6 transition-[height] duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Logo className={`w-auto transition-[height] duration-300 ${scrolled ? "h-10 md:h-11" : "h-12 md:h-14"}`} />
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              target={n.external ? "_blank" : undefined}
              rel={n.external ? "noopener noreferrer" : undefined}
              className={`whitespace-nowrap text-sm font-medium no-underline hover:text-navy ${!n.external && path.startsWith(n.href) ? "text-navy border-b-2 border-sky pb-0.5" : "text-muted"}`}
            >
              {n.label}
            </Link>
          ))}
          <a href={`tel:${site.phoneRaw}`} className="btn-primary whitespace-nowrap !px-4 !py-2">{site.phone}</a>
        </nav>
        <button
          className="rounded-md border border-line p-2 text-navy xl:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 5h14M3 10h14M3 15h14" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="wrap flex flex-col gap-1 border-t border-line pb-4 pt-2 xl:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} target={n.external ? "_blank" : undefined} rel={n.external ? "noopener noreferrer" : undefined} onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 text-base font-medium text-navy no-underline hover:bg-navy-soft">
              {n.label}
            </Link>
          ))}
          <a href={`tel:${site.phoneRaw}`} className="btn-primary mt-2">Call {site.phone}</a>
        </nav>
      )}
    </header>
  );
}
