import Link from "next/link";
import JsonLd from "./JsonLd";
import { site } from "@/lib/content/site";

export interface Crumb {
  href: string;
  label: string;
}

/** Visible trail plus the matching BreadcrumbList structured data. */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all: Crumb[] = [{ href: "/", label: "Home" }, ...trail];
  return (
    <>
      {/* z-20: the travel hero's trust panel is pulled up with a negative
          margin and its shadow spilled 60px down over this bar, taking the
          crumb links from 4.9:1 to 3.5:1. Raising the bar clips the spill. */}
      <nav aria-label="Breadcrumb" className="relative z-20 border-b border-line bg-white">
        <ol className="wrap flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-sm text-muted-deep">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink">{c.label}</span>
                ) : (
                  <Link href={c.href} className="no-underline hover:text-navy">{c.label}</Link>
                )}
                {!last && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${site.url}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </>
  );
}
