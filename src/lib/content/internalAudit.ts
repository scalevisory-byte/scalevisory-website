/**
 * Internal audit landing page.
 *
 * The work itself is already described in services.ts, in two places —
 * "Financial Internal Audit" under Accounting and "Business Internal Audit"
 * under Business Consultancy. Those stay the source of truth: the checklists
 * on this page are pulled from them at build time rather than copied, so the
 * two can never drift apart.
 *
 * What lives here is only the framing a landing page needs and the service
 * pages do not — why the two audits are different, what tends to prompt the
 * call, what comes back at the end, and the questions owners actually ask.
 *
 * Nothing here claims a finding, a client or a recovered amount. An audit page
 * is the easiest place on a firm's site to imply results it cannot evidence.
 */

export const financialAuditId = "financial-internal-audit";
export const businessAuditId = "business-internal-audit";

/** The three promises in the hero. Each restates a line from `deliverables`. */
export const heroPoints: { icon: string; title: string; body: string }[] = [
  { icon: "search", title: "Evidence, Not Opinion", body: "Every finding backed" },
  { icon: "shieldCheck", title: "Risk-Rated", body: "So the order is obvious" },
  { icon: "handshake", title: "Follow-Up Review", body: "Findings actually closed" },
];

/** What usually prompts the call. Each one restates a check the audit performs. */
export const signals: { title: string; body: string }[] = [
  {
    title: "Stock never ties to the register",
    body: "Physical count and book stock differ every time, and the difference is written off rather than explained.",
  },
  {
    title: "Cash is counted once a year",
    body: "If the only count is the year-end one, a shortage has had twelve months to become normal.",
  },
  {
    title: "Nobody compares the rate",
    body: "The same vendor, the same item, year after year, with no one checking what it costs elsewhere.",
  },
  {
    title: "Party balances are assumed",
    body: "Your ledger says one thing, theirs says another, and neither side has asked.",
  },
  {
    title: "The statutory audit turns into a scramble",
    body: "Queries arrive in bulk at year end because nothing was reviewed while it was still fresh.",
  },
  {
    title: "A process exists but nobody follows it",
    body: "The SOP is written down. What actually happens is whatever the person on the desk has always done.",
  },
];

/** What comes back at the end of the engagement. */
export const deliverables: string[] = [
  "A findings report with the evidence behind each item, not a list of opinions",
  "A risk rating per finding, so the order to fix them in is obvious",
  "Recommendations written as actions with an owner and a date against each",
  "A follow-up review, because a report nobody actions is an expense, not an audit",
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "How is an internal audit different from the statutory audit?",
    a: "The statutory audit is an obligation, done once a year, to give an opinion on the financial statements to people outside the business. An internal audit is for you, runs on whatever cycle suits the business, and is free to look wherever the risk is — stock, cash, a branch, a process — rather than only at what the statute requires.",
  },
  {
    q: "We are not a company. Do we need one?",
    a: "Need, in the statutory sense, no — internal audit is mandatory only for certain companies. But the businesses that get the most out of it are usually the ones under no obligation at all: owner-run, growing faster than their controls, with cash and stock moving through more hands than the owner can watch.",
  },
  {
    q: "What is the difference between the financial and the business audit?",
    a: "The financial one checks whether what the books say is true — vouching, stock, cash, party balances, purchase rates. The business one checks whether the processes achieve what they were designed to achieve — branch and department performance, control gaps, whether the SOP and the practice match. Most engagements start with the financial side, because it is where evidence is easiest to establish.",
  },
  {
    q: "Will this disrupt the team?",
    a: "Some of it is deliberately unannounced — a cash count booked in advance is not a cash count. The rest is planned around your month so it does not collide with billing or filing. We work on your existing system rather than asking anyone to maintain a second set of records for us.",
  },
  {
    q: "What if the audit finds something serious?",
    a: "Then it is reported with the evidence, to you, before it is anyone else's problem. Where a loss is already suspected rather than merely possible, that is forensic work and is scoped separately — the two are related but they are not the same engagement.",
  },
  {
    q: "How often should it run?",
    a: "It depends on what moves. A business with stock across branches and daily cash usually wants a quarterly cycle with surprise elements in between. One with few transactions and tight controls may need an annual review before the statutory audit. We scope it after seeing the business, not before.",
  },
];
