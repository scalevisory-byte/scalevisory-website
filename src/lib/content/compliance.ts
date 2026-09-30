/**
 * Compliance calendar.
 *
 * This is the part of "latest updates" that genuinely updates itself. The site
 * is a static export with no server, so nothing can change after the build —
 * but the build runs on a schedule (see .github/workflows/deploy.yml), and
 * these dates are computed from the build date. So the calendar rolls over on
 * its own, every day, without anyone editing a file.
 *
 * These are the STANDARD statutory due dates. Extensions get notified from
 * time to time and the site says so plainly rather than pretending otherwise.
 * Nothing here is a filing you can rely on without checking your own facts —
 * the page carries that line too.
 *
 * Owner: worth a read-through. Anything wrong here is wrong on every page that
 * shows the calendar.
 */

export type ComplianceCategory = "GST" | "TDS / TCS" | "Income Tax" | "Payroll" | "ROC";

export interface DueRule {
  /** Day of the month the filing or payment falls due. */
  day: number;
  /**
   * Months it applies to, 1–12. Omit for every month.
   * For quarterly items these are the months the return is actually filed in.
   */
  months?: number[];
  title: string;
  /** One line: who it applies to and what period it covers. */
  detail: string;
  category: ComplianceCategory;
}

export const dueRules: DueRule[] = [
  // ── Every month ──────────────────────────────────────────────────────────
  {
    day: 7,
    title: "TDS / TCS payment",
    detail: "Tax deducted or collected in the previous month, deposited by challan.",
    category: "TDS / TCS",
  },
  {
    day: 11,
    title: "GSTR-1",
    detail: "Outward supplies for the previous month — monthly filers.",
    category: "GST",
  },
  {
    day: 13,
    title: "IFF / quarterly GSTR-1",
    detail: "QRMP filers: invoice furnishing for the previous month, or the quarterly return in the month after a quarter ends.",
    category: "GST",
  },
  {
    day: 15,
    title: "PF and ESI",
    detail: "Provident fund and ESI contributions for the previous month.",
    category: "Payroll",
  },
  {
    day: 20,
    title: "GSTR-3B",
    detail: "Summary return and tax payment for the previous month — monthly filers.",
    category: "GST",
  },
  {
    day: 25,
    title: "PMT-06",
    detail: "QRMP filers: tax payment for the first two months of the quarter.",
    category: "GST",
  },

  // ── Quarterly ────────────────────────────────────────────────────────────
  {
    day: 15,
    months: [1, 5, 7, 10],
    title: "TCS return — 27EQ",
    detail: "Quarterly statement of tax collected at source for the quarter just ended.",
    category: "TDS / TCS",
  },
  {
    day: 31,
    months: [1, 7, 10],
    title: "TDS returns — 24Q / 26Q / 27Q",
    detail: "Quarterly statements of tax deducted for the quarter just ended.",
    category: "TDS / TCS",
  },
  {
    day: 31,
    months: [5],
    title: "TDS returns — 24Q / 26Q / 27Q",
    detail: "Quarterly statements for the January–March quarter.",
    category: "TDS / TCS",
  },

  // ── Advance tax ──────────────────────────────────────────────────────────
  {
    day: 15,
    months: [6],
    title: "Advance tax — first instalment",
    detail: "15% of the estimated tax liability for the year.",
    category: "Income Tax",
  },
  {
    day: 15,
    months: [9],
    title: "Advance tax — second instalment",
    detail: "45% of the estimated liability, cumulative.",
    category: "Income Tax",
  },
  {
    day: 15,
    months: [12],
    title: "Advance tax — third instalment",
    detail: "75% of the estimated liability, cumulative.",
    category: "Income Tax",
  },
  {
    day: 15,
    months: [3],
    title: "Advance tax — final instalment",
    detail: "100% of the estimated liability for the year.",
    category: "Income Tax",
  },

  // ── Annual ───────────────────────────────────────────────────────────────
  {
    day: 31,
    months: [7],
    title: "Income tax return — non-audit cases",
    detail: "Individuals, HUFs and firms whose accounts are not subject to audit.",
    category: "Income Tax",
  },
  {
    day: 30,
    months: [9],
    title: "Tax audit report — Form 3CA/3CB and 3CD",
    detail: "Where turnover crosses the audit threshold.",
    category: "Income Tax",
  },
  {
    day: 30,
    months: [9],
    title: "DIR-3 KYC",
    detail: "Annual KYC for every person holding a DIN.",
    category: "ROC",
  },
  {
    day: 31,
    months: [10],
    title: "Income tax return — audit cases",
    detail: "Companies and others whose accounts are subject to audit.",
    category: "Income Tax",
  },
  {
    day: 30,
    months: [10],
    title: "AOC-4",
    detail: "Filing of financial statements, within 30 days of the AGM.",
    category: "ROC",
  },
  {
    day: 29,
    months: [11],
    title: "MGT-7 / MGT-7A",
    detail: "Annual return, within 60 days of the AGM.",
    category: "ROC",
  },
  {
    day: 31,
    months: [12],
    title: "GSTR-9 and GSTR-9C",
    detail: "Annual return and reconciliation statement for the previous financial year.",
    category: "GST",
  },
  {
    day: 30,
    months: [6],
    title: "DPT-3",
    detail: "Return of deposits and outstanding money not treated as deposits.",
    category: "ROC",
  },
];

export interface DueDate {
  date: Date;
  iso: string;
  day: number;
  /** 1-12. The hub shows dates from two different months in one row. */
  month: number;
  title: string;
  detail: string;
  category: ComplianceCategory;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const monthName = (m: number) => MONTHS[m - 1];
/** Three-letter form, for the day chips where the month has to fit. */
export const monthShort = (m: number) => MONTHS[m - 1].slice(0, 3);

/** Clamps to the last day of the month, so a 31st rule works in February. */
function clampedDate(year: number, month: number, day: number) {
  const last = new Date(year, month, 0).getDate();
  return new Date(year, month - 1, Math.min(day, last));
}

/** Every due date falling in the given month, earliest first. */
export function dueInMonth(year: number, month: number): DueDate[] {
  return dueRules
    .filter((r) => !r.months || r.months.includes(month))
    .map((r) => {
      const date = clampedDate(year, month, r.day);
      return {
        date,
        iso: `${year}-${String(month).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
        day: date.getDate(),
        month,
        title: r.title,
        detail: r.detail,
        category: r.category,
      };
    })
    .sort((a, b) => a.day - b.day || a.title.localeCompare(b.title));
}

/**
 * The next `count` due dates from `from` onwards, walking forward a month at a
 * time. Used for the short list on the Resources hub.
 */
export function upcoming(from: Date, count = 6): DueDate[] {
  const out: DueDate[] = [];
  let year = from.getFullYear();
  let month = from.getMonth() + 1;
  const startOfDay = new Date(from.getFullYear(), from.getMonth(), from.getDate());

  for (let i = 0; i < 6 && out.length < count; i++) {
    for (const d of dueInMonth(year, month)) {
      if (d.date >= startOfDay) out.push(d);
    }
    month += 1;
    if (month > 12) { month = 1; year += 1; }
  }
  return out.slice(0, count);
}

/** The three months the calendar page shows: this one and the next two. */
export function calendarMonths(from: Date): { year: number; month: number; items: DueDate[] }[] {
  const out = [];
  let year = from.getFullYear();
  let month = from.getMonth() + 1;
  for (let i = 0; i < 3; i++) {
    out.push({ year, month, items: dueInMonth(year, month) });
    month += 1;
    if (month > 12) { month = 1; year += 1; }
  }
  return out;
}
