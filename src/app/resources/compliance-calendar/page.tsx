import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import Icon from "@/components/Icon";
import { fmtDate } from "@/lib/format";
import { calendarMonths, monthName, type ComplianceCategory } from "@/lib/content/compliance";
import { whatsappLink } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Compliance Calendar — GST, TDS, Income Tax and ROC Due Dates",
  description:
    "The statutory due dates coming up for Indian businesses — GST returns, TDS and TCS, advance tax, payroll and ROC filings. Updated daily by Scale Visory, Surat.",
  alternates: { canonical: "/resources/compliance-calendar" },
};

const TINT: Record<ComplianceCategory, string> = {
  GST: "bg-sky-soft text-navy",
  "TDS / TCS": "bg-navy-soft text-navy",
  "Income Tax": "bg-gold-soft text-gold-deep",
  Payroll: "bg-sky-soft text-navy",
  ROC: "bg-navy-soft text-navy",
};

export default function ComplianceCalendarPage() {
  // Computed at build time. The site rebuilds on a schedule, so this page is
  // never more than a day behind — see the note in compliance.ts.
  const today = new Date();
  const months = calendarMonths(today);

  return (
    <Shell>
      <PageHero
        title="Compliance Calendar"
        lead="What is due over the next three months — GST, TDS and TCS, income tax, payroll and ROC. The page refreshes itself daily, so the month you are looking at is always the month you are in."
      />
      <Breadcrumbs
        trail={[
          { href: "/resources", label: "Resources" },
          { href: "/resources/compliance-calendar", label: "Compliance Calendar" },
        ]}
      />

      <section className="section">
        <div className="wrap">
          <p className="rounded-lg border border-line bg-white p-5 text-sm leading-7 text-muted">
            <span className="font-semibold text-navy">These are the standard due dates.</span> Extensions
            are notified from time to time, and thresholds decide which of them apply to you at all — a
            QRMP filer and a monthly filer do not share a calendar. Treat this as a prompt to check, not
            as advice for your business.{" "}
            <a
              href={whatsappLink("Hi Scale Visory, which of these due dates apply to my business?")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-navy"
            >
              Ask us which ones are yours
            </a>
            .
          </p>

          <p className="mt-4 text-sm text-muted">Last updated {fmtDate(today.toISOString())}.</p>

          <div className="mt-10 space-y-12">
            {months.map(({ year, month, items }) => (
              <div key={`${year}-${month}`}>
                <h2 className="text-2xl">
                  {monthName(month)} {year}
                </h2>
                <ul className="mt-5 grid gap-3 lg:grid-cols-2">
                  {items.map((d) => (
                    <li
                      key={`${d.iso}-${d.title}`}
                      className="flex items-start gap-4 rounded-lg border border-line bg-white p-4"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-navy text-white">
                        <span className="font-display text-lg font-bold leading-none">{d.day}</span>
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <h3 className="text-base leading-tight">{d.title}</h3>
                          <span
                            className={`rounded px-1.5 py-0.5 font-display text-[11px] font-bold uppercase tracking-wide ${TINT[d.category]}`}
                          >
                            {d.category}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-muted">{d.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-lg border border-line bg-white p-6 md:p-8">
            <h2 className="text-2xl">Would rather not watch a calendar?</h2>
            <p className="mt-3 leading-8 text-muted">
              That is most of what we do. Deadlines tracked on a calendar we keep, filings prepared
              ahead of them, and a reminder from a person rather than a portal.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Book a free consultation</Link>
              <Link href="/services/taxation" className="btn-ghost">
                <Icon name="calendar" className="h-4 w-4" strokeWidth={1.8} />
                How we handle compliance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
