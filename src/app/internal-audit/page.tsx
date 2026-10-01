import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import LandingHero from "@/components/LandingHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import InquiryForm from "@/components/InquiryForm";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";
import { getService } from "@/lib/content/services";
import {
  heroPoints,
  signals,
  deliverables,
  faqs,
  financialAuditId,
  businessAuditId,
} from "@/lib/content/internalAudit";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Internal Audit Services in Surat — Stock, Cash, Controls and Process",
  description:
    "Internal audit for owner-run businesses in Surat and across Gujarat — transaction and stock audit, surprise cash counts, purchase and expense review, control and SOP gaps, with a findings report you can act on.",
  alternates: { canonical: "/internal-audit" },
};

const WHATSAPP = "Hi Scale Visory, I'd like to discuss an internal audit for my business.";

export default function InternalAuditPage() {
  // The checklists live in services.ts and are read from it, so the landing
  // page and the service pages cannot drift apart.
  const accounting = getService("accounting")!;
  const consultancy = getService("business-consultancy")!;
  const financial = accounting.sections.find((s) => s.id === financialAuditId)!;
  const business = consultancy.sections.find((s) => s.id === businessAuditId)!;

  return (
    <Shell>
      <LandingHero
        eyebrow="Internal Audit"
        title="An Independent Check,"
        accent="Before the Gap Finds You."
        lead="Books, stock, cash and controls examined by someone who does not work for you — so a bank, a tax officer or a loss is not the first to notice."
        visual="reports"
        points={heroPoints}
        whatsapp={WHATSAPP}
      />
      <Breadcrumbs trail={[{ href: "/internal-audit", label: "Internal Audit" }]} />

      <section className="section">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-2xl">Two audits, not one</h2>
            <p className="mt-3 leading-8 text-muted">
              &ldquo;Internal audit&rdquo; covers two different questions, and a business usually needs
              both eventually. The first asks whether what the books say is true. The second asks
              whether the way the business runs achieves what it was meant to. They use different
              evidence and they produce different reports, so we keep them separate rather than
              blurring them into one engagement.
            </p>

            {/* ── Financial ─────────────────────────────────────────────── */}
            <h2 className="mt-12 text-2xl" id={financialAuditId}>
              {financial.title}
            </h2>
            <p className="mt-3 leading-8 text-muted">{financial.summary}</p>
            <ul className="mt-5 space-y-3">
              {financial.items.map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky" />
                  {i}
                </li>
              ))}
            </ul>

            {/* ── Business ──────────────────────────────────────────────── */}
            <h2 className="mt-12 text-2xl" id={businessAuditId}>
              {business.title}
            </h2>
            <p className="mt-3 leading-8 text-muted">{business.summary}</p>
            <ul className="mt-5 space-y-3">
              {business.items.map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky" />
                  {i}
                </li>
              ))}
            </ul>

            {/* ── What comes back ───────────────────────────────────────── */}
            <h2 className="mt-12 text-2xl">What you get at the end</h2>
            <ul className="mt-4 space-y-3">
              {deliverables.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="mt-1 shrink-0 text-navy">
                    <Icon name="shieldCheck" className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  {d}
                </li>
              ))}
            </ul>

            {/* ── FAQ ───────────────────────────────────────────────────── */}
            <h2 className="mt-12 text-2xl">Common questions</h2>
            <div className="ledger mt-4">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-lg">{f.q}</h3>
                  <p className="mt-2 leading-7 text-muted">{f.a}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-2xl">Related</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Link
                href="/services/accounting#forensic-accounting"
                className="rounded-lg border border-line bg-white p-5 no-underline transition-colors hover:border-sky"
              >
                <h3 className="text-lg">Forensic Accounting</h3>
                <p className="mt-2 text-sm text-muted">
                  Where a loss is already suspected rather than possible — investigation reported with
                  the evidence.
                </p>
              </Link>
              <Link
                href="/services/accounting"
                className="rounded-lg border border-line bg-white p-5 no-underline transition-colors hover:border-sky"
              >
                <h3 className="text-lg">{accounting.name}</h3>
                <p className="mt-2 text-sm text-muted">{accounting.short}</p>
              </Link>
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-lg border border-line bg-white p-6 md:sticky md:top-24">
              <h3 className="text-lg">Scope an audit</h3>
              <p className="mb-5 mt-1 text-sm text-muted">
                Tell us roughly what the business does, where the stock and cash sit, and what made you
                look this up. We will come back with what to check first.
              </p>
              <InquiryForm
                kind="service"
                subject="Internal audit"
                compact
                buttonLabel="Request a callback"
              />
            </div>
          </aside>
        </div>
      </section>

      {/* ── What tends to prompt the call ──────────────────────────────── */}
      <section className="bg-navy-deep py-16 text-white md:py-20">
        <div className="wrap">
          <p className="eyebrow eyebrow-rule text-gold-light after:hidden sm:after:block">
            When businesses call us in
          </p>
          <h2 className="mt-3 !text-white">Six things owners notice first</h2>
          <p className="mt-4 max-w-2xl text-white/80">
            None of these is proof of anything on its own. Together they are the pattern that shows up
            before a real loss does.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {signals.map((s) => (
              <li key={s.title} className="rounded-lg bg-white p-5">
                <h3 className="text-base leading-snug text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Internal Audit",
          description: metadata.description,
          provider: { "@type": "AccountingService", name: site.name, url: site.url },
          areaServed: { "@type": "AdministrativeArea", name: "Gujarat, India" },
          url: `${site.url}/internal-audit`,
        }}
      />
    </Shell>
  );
}
