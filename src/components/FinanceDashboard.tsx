/**
 * The hero's main visual: a financial management console, drawn.
 *
 * It replaces the laptop screen inside hero/desk.jpg. That screen is the thing
 * the brief wants as the focal point, and in the photograph it is 320px wide
 * and soft — on a retina display it reads as a blur where the numbers should
 * be. Drawn, it is crisp at any pixel ratio, it costs no extra bytes, it
 * restyles with the palette, and the type in it is real type rather than a
 * JPEG of type.
 *
 * ILLUSTRATIVE FIGURES. The amounts are the owner's own from the hero mockup
 * and are a picture of an interface, not a claim about the firm or any client.
 * The whole panel is aria-hidden for that reason: a screen reader is given the
 * caption on the wrapper instead, and none of these numbers reaches the
 * accessibility tree or the page's indexable text.
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
/** Heights as a percentage of the plot. Paired bars: billed, collected. */
const BARS: [number, number][] = [
  [52, 38], [61, 47], [48, 40], [72, 58], [66, 55], [83, 69], [76, 64], [94, 80],
];

/** Cash-flow curve, as a 0-100 path across the plot. */
const CASHFLOW = "M0,62 C10,58 16,44 26,46 C36,48 40,66 50,60 C60,54 64,30 74,28 C84,26 90,16 100,10";

const NAV = [
  { label: "Dashboard", icon: "grid", active: true },
  { label: "Accounting", icon: "book" },
  { label: "GST & Tax", icon: "receipt" },
  { label: "Reconcile", icon: "sync" },
  { label: "Reports", icon: "chart" },
  { label: "Banking", icon: "bank" },
];

const KPI = [
  { label: "Revenue", value: "₹1,48,00,000", delta: "+12%", up: true },
  { label: "Expenses", value: "₹1,12,00,000", delta: "+8%", up: false },
  { label: "Net Profit", value: "₹36,00,000", delta: "+18%", up: true },
];

const STATUS = [
  { label: "GSTR-3B", note: "Filed", tone: "done" as const },
  { label: "TDS / TCS", note: "Due 7 Oct", tone: "due" as const },
  { label: "Reconciled", note: "On track", tone: "done" as const },
];

/** Thin-line marks for the rail. One weight, one style, no fills. */
function RailIcon({ name }: { name: string }) {
  const p: Record<string, React.ReactNode> = {
    grid: <><rect x="2.5" y="2.5" width="5" height="5" rx="1" /><rect x="10.5" y="2.5" width="5" height="5" rx="1" /><rect x="2.5" y="10.5" width="5" height="5" rx="1" /><rect x="10.5" y="10.5" width="5" height="5" rx="1" /></>,
    book: <><path d="M3 3.5h7a2 2 0 0 1 2 2v9a1.6 1.6 0 0 0-1.6-1.6H3z" /><path d="M15 3.5h-1.4a1.6 1.6 0 0 0-1.6 1.6v9" /></>,
    receipt: <><path d="M4 2.5h10v13l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3V2.5z" /><path d="M6.5 6h5M6.5 9h5" /></>,
    sync: <><path d="M3 9a6 6 0 0 1 10.2-4.2" /><path d="M15 9A6 6 0 0 1 4.8 13.2" /><path d="M13.5 2.2v2.8h-2.8M4.5 15.8V13H7.3" /></>,
    chart: <><path d="M3 15h12" /><path d="M5.5 15V9.5M9 15V5.5M12.5 15v-4" /></>,
    bank: <><path d="M2.5 7 9 3l6.5 4" /><path d="M4 7.5v6M8 7.5v6M12 7.5v6M14 7.5v6" /><path d="M2.5 15h13" /></>,
  };
  return (
    <svg viewBox="0 0 18 18" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      {p[name]}
    </svg>
  );
}

export default function FinanceDashboard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/70 bg-white shadow-panel ring-1 ring-navy/5 ${className}`}
      aria-hidden="true"
    >
      <div className="flex">
        {/* ── Rail ─────────────────────────────────────────────────────── */}
        <div className="hidden w-[23%] shrink-0 flex-col bg-navy-deep px-3 py-4 sm:flex sm:px-3.5 sm:py-5">
          <div className="flex items-center gap-1.5 px-1">
            <span className="grid h-4 w-4 place-items-center rounded-[3px] bg-sky/90 text-[8px] font-bold text-navy-deep">S</span>
            <span className="truncate font-display text-[9.5px] font-bold tracking-[0.1em] text-white/90 sm:text-[10.5px]">CONSOLE</span>
          </div>
          <ul className="mt-4 space-y-[3px]">
            {NAV.map((n) => (
              <li key={n.label}>
                <span
                  className={`flex items-center gap-1.5 rounded-[5px] px-1.5 py-[5px] text-[9.5px] font-medium leading-none sm:gap-2 sm:px-2 sm:py-[7px] sm:text-[10.5px] ${
                    n.active ? "bg-white/[0.14] text-white" : "text-white/55"
                  }`}
                >
                  <RailIcon name={n.icon} />
                  <span className="truncate">{n.label}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-auto hidden rounded-[6px] border border-white/10 px-2 py-2 md:block">
            <p className="text-[8.5px] font-semibold uppercase tracking-[0.12em] text-sky-bright">Period</p>
            <p className="mt-0.5 text-[10px] font-semibold text-white/85">FY 2026-27</p>
          </div>
        </div>

        {/* ── Panel ────────────────────────────────────────────────────── */}
        <div className="min-w-0 flex-1 bg-paper px-3.5 py-3.5 sm:px-5 sm:py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-display text-[11.5px] font-bold leading-tight text-navy sm:text-[14.5px]">
                Your Business at a Glance
              </p>
              <p className="mt-1 text-[9px] leading-none text-muted sm:text-[10px]">Updated today · All entities</p>
            </div>
            <span className="hidden shrink-0 items-center gap-1 rounded-full border border-line bg-white px-2 py-1 text-[8.5px] font-semibold text-muted sm:flex">
              <span className="block h-1 w-1 rounded-full bg-[#1FA463]" />
              Synced
            </span>
          </div>

          {/* KPI row */}
          <div className="mt-3 grid grid-cols-3 gap-1.5 sm:mt-3.5 sm:gap-2.5">
            {KPI.map((k) => (
              <div key={k.label} className="rounded-lg border border-line bg-white px-2 py-2 sm:px-3 sm:py-2.5">
                <p className="truncate text-[8.5px] font-medium uppercase tracking-[0.08em] text-muted sm:text-[9.5px]">{k.label}</p>
                <p className="mt-1.5 truncate font-display text-[10.5px] font-bold leading-none text-navy sm:text-[13.5px]">
                  {k.value}
                </p>
                <p className={`mt-1.5 text-[8.5px] font-semibold leading-none sm:text-[9.5px] ${k.up ? "text-[#1FA463]" : "text-muted"}`}>
                  <span aria-hidden="true">{k.up ? "▲" : "▼"}</span> {k.delta}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2 grid gap-1.5 sm:mt-2.5 sm:grid-cols-5 sm:gap-2.5">
            {/* Monthly performance */}
            <div className="rounded-lg border border-line bg-white px-2.5 py-2 sm:col-span-3 sm:px-3 sm:py-2.5">
              <div className="flex items-baseline justify-between">
                <p className="text-[9px] font-semibold text-navy sm:text-[10.5px]">Monthly Performance</p>
                <span className="flex items-center gap-2 text-[7.5px] text-muted sm:text-[8.5px]">
                  <span className="flex items-center gap-1"><span className="block h-1 w-2 rounded-sm bg-navy" />Billed</span>
                  <span className="flex items-center gap-1"><span className="block h-1 w-2 rounded-sm bg-sky" />Collected</span>
                </span>
              </div>
              <div className="mt-2.5 flex h-[52px] items-end gap-[5px] sm:h-[78px] sm:gap-[7px]">
                {BARS.map(([a, b], i) => (
                  <div key={MONTHS[i]} className="flex h-full min-w-0 flex-1 items-end gap-[2px]">
                    <div className="w-1/2 rounded-t-[1.5px] bg-navy" style={{ height: `${a}%` }} />
                    <div className="w-1/2 rounded-t-[1.5px] bg-sky" style={{ height: `${b}%` }} />
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex gap-[5px] sm:gap-[7px]">
                {MONTHS.map((m) => (
                  <span key={m} className="min-w-0 flex-1 text-center text-[7px] leading-none text-muted sm:text-[8px]">{m}</span>
                ))}
              </div>
            </div>

            {/* Cash flow */}
            <div className="rounded-lg border border-line bg-white px-2.5 py-2 sm:col-span-2 sm:px-3 sm:py-2.5">
              <p className="text-[9px] font-semibold text-navy sm:text-[10.5px]">Cash Flow</p>
              <p className="mt-1 font-display text-[11px] font-bold leading-none text-navy sm:text-[13.5px]">₹24,80,000</p>
              <svg viewBox="0 0 100 70" preserveAspectRatio="none" className="mt-2 h-[46px] w-full sm:h-[72px]">
                <defs>
                  <linearGradient id="fd-cf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10A9E8" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#10A9E8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${CASHFLOW} L100,70 L0,70 Z`} fill="url(#fd-cf)" />
                <path d={CASHFLOW} fill="none" stroke="#0B3A78" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <circle cx="100" cy="10" r="2.6" fill="#0B3A78" />
              </svg>
            </div>
          </div>

          {/* Compliance strip */}
          <ul className="mt-2 grid grid-cols-3 gap-1.5 sm:mt-2.5 sm:gap-2.5">
            {STATUS.map((s) => (
              <li key={s.label} className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2 py-1.5 sm:gap-2 sm:px-3 sm:py-2.5">
                <span
                  className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full sm:h-4 sm:w-4 ${
                    s.tone === "done" ? "bg-[#E6F5EE] text-[#17794A]" : "bg-gold-soft text-gold-deep"
                  }`}
                >
                  <svg viewBox="0 0 12 12" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s.tone === "done" ? <path d="M2.5 6.2 5 8.7 9.5 3.6" /> : <><circle cx="6" cy="6" r="4.2" /><path d="M6 3.8V6l1.5 1.1" /></>}
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[8.5px] font-semibold leading-tight text-navy sm:text-[10px]">{s.label}</span>
                  <span className="block truncate text-[7.5px] leading-tight text-muted sm:text-[9px]">{s.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
