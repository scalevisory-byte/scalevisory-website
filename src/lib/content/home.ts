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
  icon: string;
  /** Tint of the icon tile. Gold marks the tax and legal side of the practice. */
  tone?: "sky" | "gold";
}

/** The four figures shown under the hero. All are claims the site already makes. */
export const stats: { icon: string; big: string; small: string }[] = [
  { icon: "badge", big: "12+ Years", small: "of professional experience" },
  { icon: "shieldCheck", big: "Complete Support", small: "Accounting • Tax • Compliance" },
  { icon: "briefcase", big: "End-to-End", small: "Business financial support" },
  { icon: "pin", big: "Pan India", small: "Serving businesses across India" },
];

/** Six entry points into the four core services. */
export const homeServices: HomeService[] = [
  { icon: "book", name: "Bookkeeping", tone: "sky", blurb: "Daily transactions, reconciliations and ledger management.", href: "/services/accounting#bookkeeping" },
  { icon: "calculator", name: "GST & Taxation", tone: "gold", blurb: "Registration, return filing and reconciliation.", href: "/services/taxation#gst" },
  { icon: "doc", name: "TDS & TCS", tone: "sky", blurb: "Calculation, filing and compliance.", href: "/services/taxation#tds" },
  { icon: "bars", name: "Accounts Finalization", tone: "sky", blurb: "Balance sheet, P&L and MIS reporting.", href: "/services/accounting#finalisation" },
  { icon: "people", name: "Payroll", tone: "gold", blurb: "Salary processing and compliance.", href: "/services/taxation#statutory" },
  { icon: "scales", name: "Legal & Advisory", tone: "gold", blurb: "ROC, licences, agreements and business support.", href: "/services/legal" },
];

/**
 * The four promises under the travel hero's buttons. Each one restates work
 * the travel page already describes below it — nothing new is claimed here.
 */
export const travelHeroPoints: { icon: string; title: string; body: string }[] = [
  { icon: "book", title: "Accurate Books", body: "On time, every time" },
  { icon: "shieldCheck", title: "Tax Compliance", body: "GST • TDS • TCS • ITR" },
  { icon: "bars", title: "Business Reports", body: "Clear insights" },
  { icon: "handshake", title: "Dedicated Support", body: "For travel businesses" },
];

/** What the travel specialisation actually covers. */
export const travelChecklist = [
  "TCS on overseas tours",
  "GST on service fees",
  "Supplier & agent reconciliation",
  "Multiple payment flows",
  "Accurate reports & MIS",
  "Compliance on time",
];

/** The four points a client actually gets from the working relationship. */
export const firmPoints = [
  "Regular follow-ups",
  "Clear communication",
  "Advisory support",
  "Documentation and compliance assistance",
];

export interface WhyPoint {
  title: string;
  body: string;
  /** Simple line icon, drawn inline so nothing extra has to load. */
  icon: "ledger" | "calendar" | "sector" | "clock" | "person" | "chart";
}

export const whyPoints: WhyPoint[] = [
  { icon: "ledger", title: "Complete Accounting Support", body: "Books, reconciliations, compliance and reporting." },
  { icon: "calendar", title: "Tax & Compliance Expertise", body: "GST, TDS, ROC and statutory requirements." },
  { icon: "sector", title: "Industry Understanding", body: "Solutions based on the actual business model." },
  { icon: "clock", title: "Timely Reporting", body: "Accurate reports delivered on time." },
  { icon: "person", title: "Dedicated Support", body: "A responsive team that understands the business." },
  { icon: "chart", title: "Business-Focused Advisory", body: "Practical guidance for better financial decisions." },
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
  { name: "Payment Recovery", body: "Overdue invoices pursued through a documented, escalating process.", href: "https://artharecovery.in", external: true, cta: "Visit artharecovery.in" },
  { name: "Virtual Accounting", body: "Your accounts function run off-site, inside your own Tally, Zoho or Busy file.", href: "/services/accounting#virtual-accounting", cta: "Learn more" },
  { name: "Accounting Staffing & Support", body: "Trained accounts people to fill a gap, plus review of the staff you have.", href: "/services/accounting#staffing-support", cta: "Learn more" },
  { name: "Internal Audit", body: "An independent check on books, stock, cash and controls — before a bank, an officer or a loss finds the gap.", href: "/internal-audit", cta: "See how it works" },
  { name: "Forensic Accounting", body: "Investigation where a loss is already suspected, reported with the evidence.", href: "/services/accounting#forensic-accounting", cta: "Learn more" },
  { name: "Business Advisory", body: "A monthly review with your department heads and an action plan that closes.", href: "/services/business-consultancy/monthly-business-advisory", cta: "Learn more" },
  { name: "AI & Automation", body: "Billing, follow-ups and reporting automated on the systems you already run.", href: "/services/business-consultancy/ai-automation", cta: "Learn more" },
];
