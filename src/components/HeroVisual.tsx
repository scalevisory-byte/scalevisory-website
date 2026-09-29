/**
 * The hero artwork.
 *
 * The project has no photography and none could be sourced, so rather than drop
 * in a stock office photo — which the brand rules rule out — each slide gets a
 * drawn composition: a finance dashboard, a compliance calendar, a reporting
 * stack. Vector, so it stays crisp at any size and costs almost nothing to load.
 *
 * Decorative only: aria-hidden, and every figure is illustrative rather than a
 * claim about the firm's numbers.
 */
export type VisualKind = "dashboard" | "calendar" | "reports" | "advisory";

const NAVY = "#073574";
const DEEP = "#052651";
const SKY = "#10A9E8";
const LINE = "#D9E0EA";
const GOLD = "#B8912F";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 520 420" className="h-auto w-full" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="sv-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F2F6FB" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

function Dashboard() {
  const bars = [38, 56, 44, 72, 64, 88];
  return (
    <Frame>
      <rect x="24" y="28" width="472" height="330" rx="14" fill="url(#sv-panel)" stroke={LINE} />
      <rect x="24" y="28" width="472" height="44" rx="14" fill={NAVY} />
      <rect x="24" y="58" width="472" height="14" fill={NAVY} />
      <circle cx="48" cy="50" r="4" fill={SKY} />
      <circle cx="64" cy="50" r="4" fill="#ffffff" opacity=".45" />
      <circle cx="80" cy="50" r="4" fill="#ffffff" opacity=".25" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${48 + i * 142}, 96)`}>
          <rect width="126" height="70" rx="9" fill="#FFFFFF" stroke={LINE} />
          <rect x="14" y="16" width="52" height="7" rx="3.5" fill={LINE} />
          <rect x="14" y="33" width="74" height="13" rx="4" fill={NAVY} />
          <rect x="14" y="54" width="34" height="6" rx="3" fill={SKY} opacity=".6" />
        </g>
      ))}
      <rect x="48" y="188" width="268" height="150" rx="9" fill="#FFFFFF" stroke={LINE} />
      {bars.map((h, i) => (
        <rect key={i} x={70 + i * 40} y={318 - h} width="20" height={h} rx="4" fill={i === bars.length - 1 ? SKY : NAVY} opacity={i === bars.length - 1 ? 1 : 0.24 + i * 0.1} />
      ))}
      <path d="M70 268 L110 250 L150 258 L190 226 L230 234 L270 200" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="334" y="188" width="138" height="150" rx="9" fill="#FFFFFF" stroke={LINE} />
      <circle cx="403" cy="247" r="38" fill="none" stroke={LINE} strokeWidth="14" />
      <circle cx="403" cy="247" r="38" fill="none" stroke={NAVY} strokeWidth="14" strokeDasharray="175 240" strokeLinecap="round" transform="rotate(-90 403 247)" />
      <circle cx="403" cy="247" r="38" fill="none" stroke={SKY} strokeWidth="14" strokeDasharray="60 240" strokeLinecap="round" transform="rotate(62 403 247)" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(360, ${300 + i * 13})`}>
          <rect width="7" height="7" rx="2" fill={i === 0 ? NAVY : i === 1 ? SKY : LINE} />
          <rect x="14" y="1.5" width="56" height="5" rx="2.5" fill={LINE} />
        </g>
      ))}
      <rect x="150" y="372" width="220" height="12" rx="6" fill={NAVY} opacity=".07" />
    </Frame>
  );
}

function Calendar() {
  const marks = [3, 7, 12, 15, 21, 26];
  return (
    <Frame>
      <rect x="52" y="34" width="416" height="318" rx="14" fill="url(#sv-panel)" stroke={LINE} />
      <rect x="52" y="34" width="416" height="52" rx="14" fill={NAVY} />
      <rect x="52" y="72" width="416" height="14" fill={NAVY} />
      <rect x="78" y="54" width="92" height="10" rx="5" fill="#ffffff" opacity=".85" />
      <rect x="384" y="54" width="58" height="10" rx="5" fill={SKY} />
      {Array.from({ length: 28 }).map((_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const on = marks.includes(i);
        return (
          <g key={i} transform={`translate(${80 + col * 52}, ${112 + row * 52})`}>
            <rect width="38" height="38" rx="7" fill={on ? NAVY : "#FFFFFF"} stroke={on ? NAVY : LINE} />
            <rect x="10" y="16" width="18" height="5" rx="2.5" fill={on ? "#FFFFFF" : LINE} opacity={on ? 0.9 : 1} />
            {on && <circle cx="31" cy="7" r="3.5" fill={SKY} />}
          </g>
        );
      })}
      <g transform="translate(300, 300)">
        <rect width="150" height="42" rx="9" fill="#FFFFFF" stroke={SKY} />
        <circle cx="26" cy="21" r="9" fill={SKY} opacity=".18" />
        <path d="M22 21 l3 3 l6 -7" fill="none" stroke={SKY} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="46" y="12" width="84" height="6" rx="3" fill={NAVY} opacity=".7" />
        <rect x="46" y="25" width="56" height="5" rx="2.5" fill={LINE} />
      </g>
    </Frame>
  );
}

function Reports() {
  return (
    <Frame>
      <g transform="translate(58, 72) rotate(-4)">
        <rect width="290" height="300" rx="10" fill="#FFFFFF" stroke={LINE} opacity=".65" />
      </g>
      <g transform="translate(86, 56) rotate(2)">
        <rect width="290" height="300" rx="10" fill="#FFFFFF" stroke={LINE} opacity=".85" />
      </g>
      <g transform="translate(118, 42)">
        <rect width="300" height="312" rx="12" fill="url(#sv-panel)" stroke={LINE} />
        <rect x="28" y="30" width="118" height="12" rx="6" fill={NAVY} />
        <rect x="28" y="52" width="70" height="7" rx="3.5" fill={SKY} />
        <rect x="28" y="80" width="244" height="1" fill={LINE} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(28, ${98 + i * 34})`}>
            <rect width="150" height="7" rx="3.5" fill={LINE} />
            <rect x="196" width="48" height="7" rx="3.5" fill={i === 4 ? NAVY : LINE} opacity={i === 4 ? 1 : 0.85} />
          </g>
        ))}
        <rect x="28" y="268" width="244" height="1" fill={LINE} />
        <rect x="28" y="280" width="92" height="9" rx="4.5" fill={NAVY} />
        <rect x="204" y="280" width="68" height="9" rx="4.5" fill={GOLD} />
      </g>
      <g transform="translate(372, 250)">
        <rect width="92" height="110" rx="10" fill={DEEP} />
        <rect x="14" y="16" width="64" height="24" rx="5" fill="#ffffff" opacity=".9" />
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={14 + (i % 3) * 23} y={52 + Math.floor(i / 3) * 19} width="17" height="13" rx="3" fill={i === 8 ? SKY : "#ffffff"} opacity={i === 8 ? 1 : 0.28} />
        ))}
      </g>
    </Frame>
  );
}

function Advisory() {
  return (
    <Frame>
      <rect x="40" y="44" width="300" height="300" rx="14" fill="url(#sv-panel)" stroke={LINE} />
      <rect x="68" y="76" width="104" height="11" rx="5.5" fill={NAVY} />
      <rect x="68" y="97" width="62" height="7" rx="3.5" fill={SKY} />
      <path d="M68 300 L124 258 L180 272 L236 214 L292 176" fill="none" stroke={NAVY} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M68 300 L124 258 L180 272 L236 214 L292 176 L292 312 L68 312 Z" fill={SKY} opacity=".1" />
      {[[124, 258], [180, 272], [236, 214]].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="4.5" fill="#FFFFFF" stroke={NAVY} strokeWidth="2.5" />
      ))}
      <circle cx="292" cy="176" r="6.5" fill={SKY} stroke="#FFFFFF" strokeWidth="3" />
      <rect x="68" y="130" width="224" height="1" fill={LINE} />
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(68, ${146 + i * 26})`}>
          <rect width="9" height="9" rx="2" fill={i === 0 ? NAVY : SKY} />
          <rect x="18" y="1.5" width="120" height="6" rx="3" fill={LINE} />
        </g>
      ))}
      <g transform="translate(300, 150)">
        <rect width="180" height="196" rx="12" fill={DEEP} />
        <rect x="24" y="28" width="86" height="9" rx="4.5" fill="#ffffff" opacity=".9" />
        <rect x="24" y="46" width="52" height="6" rx="3" fill={SKY} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(24, ${74 + i * 30})`}>
            <circle cx="6" cy="6" r="6" fill={i < 2 ? SKY : "#ffffff"} opacity={i < 2 ? 1 : 0.22} />
            <rect x="20" y="2" width={112 - i * 14} height="7" rx="3.5" fill="#ffffff" opacity=".35" />
          </g>
        ))}
      </g>
    </Frame>
  );
}

export default function HeroVisual({ kind }: { kind: VisualKind }) {
  if (kind === "calendar") return <Calendar />;
  if (kind === "reports") return <Reports />;
  if (kind === "advisory") return <Advisory />;
  return <Dashboard />;
}
