import Link from "next/link";
import { monthShort, type DueDate } from "@/lib/content/compliance";

/**
 * "Compliance due" — the one genuinely live thing in the hero.
 *
 * The dates are computed from the statutory calendar at build time and the
 * site rebuilds every morning, so this is never a mock-up. That is the whole
 * point of it, and the reason it is allowed to say LIVE: the widget earns the
 * word, and would be removed rather than faked if the rebuild ever stopped.
 *
 * Two shapes from one component. On a phone it is a card, stacked under the
 * console. From lg it becomes a strip across the foot of the console — which
 * is the only arrangement that reads as a floating piece of software without
 * covering the figures it is floating over. Every corner-anchored version of
 * this card hid either the revenue tile or the filing status behind it.
 */
export default function ComplianceWidget({
  dates,
  className = "",
}: {
  dates: DueDate[];
  className?: string;
}) {
  if (!dates.length) return null;

  return (
    <Link
      href="/resources/compliance-calendar"
      className={`group block rounded-xl border border-line bg-white/95 p-4 no-underline shadow-lift backdrop-blur-md transition-colors hover:border-navy/30 lg:px-5 lg:py-3.5 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-gold-deep">
            Compliance due
          </span>
          {/* The gold is one hairline, and this is the only one on the card. */}
          <span aria-hidden="true" className="hidden h-px w-6 bg-gold lg:block" />
        </span>
        <span className="flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.12em] text-muted">
          <span className="live-dot block h-1.5 w-1.5 rounded-full bg-[#1FA463]" aria-hidden="true" />
          Live
        </span>
      </div>

      <span aria-hidden="true" className="mt-2.5 block h-px w-8 bg-gold lg:hidden" />

      <ul className="mt-3 space-y-3 lg:mt-3 lg:grid lg:grid-cols-3 lg:gap-x-4 lg:space-y-0">
        {dates.slice(0, 3).map((d, i) => (
          <li
            key={`${d.iso}-${d.title}`}
            className={`flex items-center gap-3 ${i > 0 ? "lg:border-l lg:border-line lg:pl-4" : ""}`}
          >
            <span className="grid h-10 w-10 shrink-0 place-content-center justify-items-center rounded-lg bg-navy text-white lg:h-9 lg:w-9">
              <span className="font-display text-[14px] font-bold leading-none lg:text-[13px]">{d.day}</span>
              <span className="mt-[3px] font-display text-[8px] font-bold uppercase tracking-[0.1em] text-white/75">
                {monthShort(d.month)}
              </span>
            </span>
            <span className="min-w-0">
              {/* Two lines are allowed from lg: in three columns the longer
                  filings ("IFF / quarterly GSTR-1") truncate on one. */}
              <span className="block truncate font-display text-[13px] font-semibold leading-tight text-navy lg:line-clamp-2 lg:overflow-visible lg:whitespace-normal lg:text-[12px]">
                {d.title}
              </span>
              <span className="block truncate text-[11px] leading-5 text-muted lg:text-[10.5px]">{d.category}</span>
            </span>
          </li>
        ))}
      </ul>

      <span className="mt-3.5 flex items-center gap-1.5 border-t border-line pt-3 text-[11.5px] font-semibold text-navy lg:mt-3 lg:pt-2.5">
        View compliance calendar
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}
