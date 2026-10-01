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
 * It floats over the hero photograph on lg and up, and stacks under the drawn
 * composition below that.
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
      className={`group block rounded-xl border border-line bg-white/95 p-4 no-underline shadow-lift backdrop-blur-md transition-colors hover:border-navy/30 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-gold-deep">
            Compliance due
          </span>
        </span>
        <span className="flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.12em] text-muted">
          <span className="live-dot block h-1.5 w-1.5 rounded-full bg-[#1FA463]" aria-hidden="true" />
          Live
        </span>
      </div>

      {/* The gold is one hairline, and this is the only one on the card. */}
      <span aria-hidden="true" className="mt-2.5 block h-px w-8 bg-gold" />

      <ul className="mt-3 space-y-3">
        {dates.slice(0, 3).map((d) => (
          <li
            key={`${d.iso}-${d.title}`}
            className="flex items-center gap-3"
          >
            <span className="grid h-10 w-10 shrink-0 place-content-center justify-items-center rounded-lg bg-navy text-white">
              <span className="font-display text-[14px] font-bold leading-none">{d.day}</span>
              <span className="mt-[3px] font-display text-[8px] font-bold uppercase tracking-[0.1em] text-white/75">
                {monthShort(d.month)}
              </span>
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-[13px] font-semibold leading-tight text-navy">
                {d.title}
              </span>
              <span className="block truncate text-[11px] leading-5 text-muted">{d.category}</span>
            </span>
          </li>
        ))}
      </ul>

      <span className="mt-3.5 flex items-center gap-1.5 border-t border-line pt-3 text-[11.5px] font-semibold text-navy">
        View compliance calendar
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}
