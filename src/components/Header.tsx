"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { nav, ventureNav, site } from "@/lib/content/site";
import { services } from "@/lib/content/services";
import { industries, industryHref } from "@/lib/content/industries";

/**
 * The menus are built from the same lists the pages are built from, so a new
 * service or industry appears here without anyone editing a second list.
 */
const MENUS: Record<string, { href: string; label: string }[]> = {
  Services: [
    ...services.map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
    { href: "/internal-audit", label: "Internal Audit" },
  ],
  Industries: [
    ...industries.slice(0, 6).map((i) => ({ href: industryHref(i), label: i.cardName ?? i.name })),
    { href: "/industries", label: "All industries" },
  ],
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Compact the bar once the reader has moved past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes an open menu; so does a click anywhere outside the nav.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [menu]);

  // A route change should never leave a menu hanging open.
  useEffect(() => {
    setMenu(null);
    setOpen(false);
    setMobileMenu(null);
  }, [path]);

  const isCurrent = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-paper/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-line shadow-[0_1px_16px_-6px_rgba(7,53,116,0.35)]" : "border-line"
      }`}
    >
      {/* The partner ventures and the office line, in their own register above
          the nav. They are other firms' sites; giving them the same weight as
          this one's pages was most of what made the header feel crowded. It
          collapses on scroll so the sticky bar stays slim. */}
      <div
        className={`hidden overflow-hidden bg-white transition-[height] duration-300 lg:block ${
          scrolled ? "h-0" : "h-9 border-b border-line"
        }`}
      >
        <div className="wrap flex h-9 items-center justify-between text-xs text-muted">
          <p className="truncate">{site.address}</p>
          <ul className="flex shrink-0 items-center gap-5 pl-6">
            {ventureNav.map((v) => (
              <li key={v.href}>
                <a
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium no-underline hover:text-navy"
                >
                  {v.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.emailAlt}`} className="no-underline hover:text-navy">
                {site.emailAlt}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`wrap flex items-center justify-between gap-6 transition-[height] duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Logo className={`w-auto transition-[height] duration-300 ${scrolled ? "h-10 md:h-11" : "h-12 md:h-14"}`} />

        <nav ref={navRef} className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {nav.map((n) =>
            n.hasMenu ? (
              <div
                key={n.href}
                className="relative"
                onMouseEnter={() => setMenu(n.label)}
                onMouseLeave={() => setMenu(null)}
              >
                <button
                  type="button"
                  aria-expanded={menu === n.label}
                  aria-haspopup="true"
                  onClick={() => setMenu(menu === n.label ? null : n.label)}
                  className={`flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors hover:text-navy ${
                    isCurrent(n.href) ? "text-navy" : "text-muted"
                  }`}
                >
                  {n.label}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className={`transition-transform duration-200 ${menu === n.label ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isCurrent(n.href) && (
                  <span aria-hidden="true" className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-sky" />
                )}

                {menu === n.label && (
                  /* The padding is on the wrapper, so the gap between the
                     button and the panel does not break the hover. */
                  <div className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3">
                    <ul className="overflow-hidden rounded-lg border border-line bg-white py-1.5 shadow-[0_18px_40px_-16px_rgba(7,53,116,0.35)]">
                      <li>
                        <Link
                          href={n.href}
                          className="block px-4 py-2.5 text-sm font-semibold text-navy no-underline hover:bg-navy-soft"
                        >
                          All {n.label.toLowerCase()}
                        </Link>
                      </li>
                      <li aria-hidden="true" className="my-1.5 border-t border-line" />
                      {MENUS[n.label].map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="block px-4 py-2.5 text-sm text-muted no-underline hover:bg-navy-soft hover:text-navy"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={n.href}
                href={n.href}
                className={`relative whitespace-nowrap text-sm font-medium no-underline transition-colors hover:text-navy ${
                  isCurrent(n.href) ? "text-navy" : "text-muted"
                }`}
              >
                {n.label}
                {isCurrent(n.href) && (
                  <span aria-hidden="true" className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-sky" />
                )}
              </Link>
            )
          )}
          <a href={`tel:${site.phoneRaw}`} className="btn-primary whitespace-nowrap !px-4 !py-2">
            {site.phone}
          </a>
        </nav>

        <button
          className="rounded-md border border-line p-2 text-navy lg:hidden"
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
        <nav className="wrap flex flex-col gap-1 border-t border-line pb-4 pt-2 lg:hidden" aria-label="Mobile">
          {nav.map((n) =>
            n.hasMenu ? (
              <div key={n.href}>
                <div className="flex items-center">
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-md px-2 py-2.5 text-base font-medium text-navy no-underline hover:bg-navy-soft"
                  >
                    {n.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={mobileMenu === n.label}
                    aria-label={`${mobileMenu === n.label ? "Hide" : "Show"} ${n.label} menu`}
                    onClick={() => setMobileMenu(mobileMenu === n.label ? null : n.label)}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-md text-navy hover:bg-navy-soft"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className={`transition-transform duration-200 ${mobileMenu === n.label ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    >
                      <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                {mobileMenu === n.label && (
                  <ul className="mb-1 ml-2 border-l border-line pl-3">
                    {MENUS[n.label].map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-md px-2 py-3 text-sm text-muted no-underline hover:bg-navy-soft hover:text-navy"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-base font-medium text-navy no-underline hover:bg-navy-soft"
              >
                {n.label}
              </Link>
            )
          )}

          <ul className="mt-2 border-t border-line pt-2">
            {ventureNav.map((v) => (
              <li key={v.href}>
                <a
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md px-2 py-2.5 text-base font-medium text-muted no-underline hover:bg-navy-soft hover:text-navy"
                >
                  {v.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>

          <a href={`tel:${site.phoneRaw}`} className="btn-primary mt-2">
            Call {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
