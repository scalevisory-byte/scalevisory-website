/**
 * Homepage section content.
 *
 * Every card here points at a section that actually exists in services.ts —
 * nothing on this page advertises work the firm has not described elsewhere.
 * Virtual Accounting, Accounting Staffing & Support and Forensic Accounting
 * were confirmed by the owner and now have their own sections under Accounting.
 */

export interface HomeService {
  name: string;
  blurb: string;
  href: string;
}

/** Ten entry points into the four core services. */
export const homeServices: HomeService[] = [
  { name: "Bookkeeping", blurb: "Daily entries, vouchers and masters kept current in Tally, Zoho or Busy.", href: "/services/accounting#bookkeeping" },
  { name: "GST & Taxation", blurb: "Registration, GSTR-1/3B/9, e-invoicing and input credit reconciled to 2B.", href: "/services/taxation#gst" },
  { name: "TDS & TCS", blurb: "24Q, 26Q and 27EQ returns, Form 16/16A and default resolution on TRACES.", href: "/services/taxation#tds" },
  { name: "Accounts Finalisation", blurb: "Year-end schedules, annexures and coordination with your statutory auditor.", href: "/services/accounting#finalisation" },
  { name: "Reconciliation", blurb: "Bank, gateway, party and inter-branch balances that agree before you are asked.", href: "/services/accounting#reconciliation" },
  { name: "Payroll Compliance", blurb: "PF, ESIC and professional tax registration and monthly returns.", href: "/services/taxation#statutory" },
  { name: "Legal & Advisory", blurb: "Incorporation, agreements, licences and demand notices, documented properly.", href: "/services/legal" },
  { name: "Audit Support", blurb: "Internal audit of ledgers, stock, cash and controls before anyone else looks.", href: "/services/accounting#financial-internal-audit" },
  { name: "Compliance Management", blurb: "ROC filings, registers and licence renewals tracked on one calendar.", href: "/services/legal#roc" },
  { name: "Virtual Accounting", blurb: "Your whole accounts function run off-site by our team, on your own system.", href: "/services/accounting#virtual-accounting" },
  { name: "Business Consultancy", blurb: "Health check, profit, cash flow and a monthly review with your department heads.", href: "/services/business-consultancy" },
];

export interface WhyPoint {
  title: string;
  body: string;
  /** Simple line icon, drawn inline so nothing extra has to load. */
  icon: "ledger" | "calendar" | "sector" | "clock" | "person" | "chart";
}

export const whyPoints: WhyPoint[] = [
  { icon: "ledger", title: "Complete Accounting Support", body: "Entries, reconciliation, receivables, MIS and year-end finalisation — one team across the whole cycle, not pieces of it.", },
  { icon: "calendar", title: "Tax & Compliance Expertise", body: "GST, income tax, TDS and every statutory date on a single calendar, with reminders a week ahead rather than a penalty after.", },
  { icon: "sector", title: "Industry Understanding", body: "Travel, trading, retail, services and professional practices each break differently. We work to where your sector actually leaks.", },
  { icon: "clock", title: "Timely Reporting", body: "A monthly close you can read in ten minutes: P&L, balance sheet, cash-flow and a short note on what moved and why.", },
  { icon: "person", title: "Dedicated Support", body: "You speak to the person who signs off your books, not a call centre — on WhatsApp, on the number at the top of this page.", },
  { icon: "chart", title: "Business-Focused Advisory", body: "Beyond compliance: margin, cash cycle, pricing and the few changes that move the number most, reviewed every month.", },
];

export const processSteps = [
  { n: "01", title: "Understand Your Business", body: "How you trade, what you run it on, and what is actually going wrong — before anything is proposed." },
  { n: "02", title: "Organise Your Accounts", body: "Books brought current and reconciled in your existing system. No forced migration to justify a fee." },
  { n: "03", title: "Manage Compliance", body: "GST, income tax, TDS, ROC and licences tracked and filed on a calendar we keep, not one you chase." },
  { n: "04", title: "Give You Clear Financial Insights", body: "Monthly reporting in plain language, with the decisions it points to spelled out." },
];

export interface Specialisation {
  name: string;
  body: string;
  href: string;
  external?: boolean;
  cta: string;
}

/** Capabilities that sit alongside the four core services. */
export const specialisations: Specialisation[] = [
  {
    name: "Payment Recovery",
    body: "Overdue invoices pursued through a documented, escalating process — ledger audit, demand notice, negotiation, then formal escalation. Run by our partner venture Artha.",
    href: "https://artharecovery.in",
    external: true,
    cta: "Visit artharecovery.in",
  },
  {
    name: "Virtual Accounting",
    body: "Your accounts function run off-site by our team, working inside your own Tally, Zoho or Busy file — the work done properly without carrying a full-time department.",
    href: "/services/accounting#virtual-accounting",
    cta: "See Virtual Accounting",
  },
  {
    name: "Accounting Staffing & Support",
    body: "Trained accounts people to fill a gap — a resignation, a busy season, or a role you are still hiring for — plus supervision and review of the staff you already have.",
    href: "/services/accounting#staffing-support",
    cta: "See Staffing & Support",
  },
  {
    name: "Forensic Accounting",
    body: "Investigation where something is already suspected: transactions traced, stock and cash reconstructed, and a written report with the quantum, the evidence and the control that failed.",
    href: "/services/accounting#forensic-accounting",
    cta: "See Forensic Accounting",
  },
  {
    name: "Business Advisory",
    body: "A monthly review with you and your department heads: numbers against target, an issue log ranked by money at risk, and an action plan carried forward until it closes.",
    href: "/services/business-consultancy/monthly-business-advisory",
    cta: "See Monthly Advisory",
  },
  {
    name: "AI & Automation",
    body: "Billing, follow-ups, recurring reports and data flowing between Tally, Zoho, billing and CRM — the repetitive work measured first, then removed.",
    href: "/services/business-consultancy/ai-automation",
    cta: "See AI & Automation",
  },
];
