/**
 * Hero artwork.
 *
 * The project has no photography and the brand rules rule out stock office
 * shots, so each slide carries a drawn composition instead: a finance
 * dashboard, a compliance calendar, a reporting stack, an advisory review,
 * a receivables ageing, a list of openings.
 * Vector, so it stays crisp at any size and weighs almost nothing.
 *
 * Depth comes from layered cards and a single soft shadow rather than
 * gradients. Decorative only — aria-hidden, and every figure is illustrative.
 */
export type VisualKind = "dashboard" | "calendar" | "reports" | "advisory" | "recovery" | "careers";

const NAVY = "#073574";
const DEEP = "#052651";
const SKY = "#10A9E8";
const LINE = "#E3E9F1";
const SOFT = "#F4F7FB";
const GOLD = "#B8912F";
const GREEN = "#16916B";

function Defs() {
  return (
    <defs>
      <filter id="sv-lift" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#052651" floodOpacity="0.16" />
      </filter>
      <filter id="sv-lift-sm" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#052651" floodOpacity="0.13" />
      </filter>
      <linearGradient id="sv-area" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={SKY} stopOpacity="0.30" />
        <stop offset="1" stopColor={SKY} stopOpacity="0" />
      </linearGradient>
      <linearGradient id="sv-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={SKY} />
        <stop offset="1" stopColor="#0B7FB4" />
      </linearGradient>
      <linearGradient id="sv-navybar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2A5FA8" />
        <stop offset="1" stopColor={NAVY} />
      </linearGradient>
    </defs>
  );
}

const Svg = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 560 440" className="h-auto w-full" role="presentation" aria-hidden="true">
    <Defs />
    {children}
  </svg>
);

/** Small upward/downward delta chip. */
function Delta({ x, y, up = true, w = 34 }: { x: number; y: number; up?: boolean; w?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={w} height="16" rx="8" fill={up ? GREEN : GOLD} opacity="0.12" />
      <path
        d={up ? "M9 11 L12 6 L15 11" : "M9 6 L12 11 L15 6"}
        fill="none"
        stroke={up ? GREEN : GOLD}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="19" y="6" width={w - 26} height="4.5" rx="2.25" fill={up ? GREEN : GOLD} opacity="0.55" />
    </g>
  );
}

function Dashboard() {
  const bars = [34, 50, 42, 66, 58, 82];
  return (
    <Svg>
      {/* Accent card peeking out behind, for depth */}
      <rect x="392" y="60" width="142" height="92" rx="12" fill={SKY} opacity="0.14" />

      <g filter="url(#sv-lift)">
        <rect x="28" y="36" width="470" height="352" rx="16" fill="#FFFFFF" />
        {/* Window chrome */}
        <path d="M28 52a16 16 0 0 1 16-16h438a16 16 0 0 1 16 16v26H28z" fill={NAVY} />
        <circle cx="52" cy="57" r="4" fill={SKY} />
        <circle cx="68" cy="57" r="4" fill="#FFFFFF" opacity=".4" />
        <circle cx="84" cy="57" r="4" fill="#FFFFFF" opacity=".22" />
        <rect x="108" y="53" width="86" height="8" rx="4" fill="#FFFFFF" opacity=".55" />
        <rect x="404" y="50" width="70" height="14" rx="7" fill={SKY} opacity=".85" />

        {/* KPI tiles */}
        {[
          { label: 62, value: 84, up: true },
          { label: 48, value: 70, up: true },
          { label: 56, value: 62, up: false },
        ].map((k, i) => (
          <g key={i} transform={`translate(${50 + i * 148}, 96)`}>
            <rect width="132" height="82" rx="10" fill={SOFT} stroke={LINE} />
            <rect x="16" y="16" width={k.label} height="6" rx="3" fill={NAVY} opacity=".3" />
            <rect x="16" y="32" width={k.value} height="14" rx="4" fill={NAVY} />
            <Delta x={16} y={56} up={k.up} />
            {/* sparkline */}
            <path
              d={`M64 68 L74 62 L84 65 L94 56 L104 59 L116 ${k.up ? 50 : 62}`}
              fill="none"
              stroke={k.up ? GREEN : GOLD}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity=".85"
            />
          </g>
        ))}

        {/* Combo chart */}
        <g transform="translate(50, 194)">
          <rect width="280" height="174" rx="10" fill="#FFFFFF" stroke={LINE} />
          <rect x="18" y="18" width="92" height="7" rx="3.5" fill={NAVY} opacity=".35" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="18" y1={54 + i * 26} x2="262" y2={54 + i * 26} stroke={LINE} />
          ))}
          <path
            d="M34 132 L74 116 L114 122 L154 96 L194 104 L238 74 L238 158 L34 158 Z"
            fill="url(#sv-area)"
          />
          {bars.map((h, i) => (
            <rect
              key={i}
              x={26 + i * 36}
              y={158 - h}
              width="17"
              height={h}
              rx="4"
              fill={i === bars.length - 1 ? "url(#sv-bar)" : "url(#sv-navybar)"}
              opacity={i === bars.length - 1 ? 1 : 0.22 + i * 0.13}
            />
          ))}
          <path
            d="M34 132 L74 116 L114 122 L154 96 L194 104 L238 74"
            fill="none"
            stroke={GOLD}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[[74, 116], [154, 96], [238, 74]].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r="3.6" fill="#FFFFFF" stroke={GOLD} strokeWidth="2" />
          ))}
        </g>

        {/* Donut + legend */}
        <g transform="translate(346, 194)">
          <rect width="152" height="174" rx="10" fill="#FFFFFF" stroke={LINE} />
          <rect x="18" y="18" width="64" height="7" rx="3.5" fill={NAVY} opacity=".35" />
          <g transform="translate(76, 84)">
            <circle r="38" fill="none" stroke={SOFT} strokeWidth="15" />
            <circle r="38" fill="none" stroke={NAVY} strokeWidth="15" strokeDasharray="128 239" strokeLinecap="round" transform="rotate(-90)" />
            <circle r="38" fill="none" stroke={SKY} strokeWidth="15" strokeDasharray="68 239" strokeLinecap="round" transform="rotate(103)" />
            <circle r="38" fill="none" stroke={GOLD} strokeWidth="15" strokeDasharray="26 239" strokeLinecap="round" transform="rotate(207)" />
          </g>
          {[NAVY, SKY, GOLD].map((c, i) => (
            <g key={c} transform={`translate(22, ${138 + i * 13})`}>
              <circle cx="4" cy="4" r="4" fill={c} />
              <rect x="14" y="1.5" width={78 - i * 16} height="5" rx="2.5" fill={NAVY} opacity=".2" />
            </g>
          ))}
        </g>
      </g>

      {/* Floating status chip */}
      <g filter="url(#sv-lift-sm)" transform="translate(372, 336)">
        <rect width="166" height="56" rx="12" fill="#FFFFFF" />
        <circle cx="30" cy="28" r="14" fill={GREEN} opacity=".12" />
        <path d="M24 28 l4 4 l8 -9" fill="none" stroke={GREEN} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="54" y="17" width="88" height="7" rx="3.5" fill={NAVY} opacity=".7" />
        <rect x="54" y="31" width="58" height="6" rx="3" fill={NAVY} opacity=".22" />
      </g>
    </Svg>
  );
}

function Calendar() {
  const due = { 4: "gst", 9: "tds", 15: "roc", 18: "gst", 24: "tds", 27: "roc" } as Record<number, string>;
  const tone: Record<string, string> = { gst: NAVY, tds: SKY, roc: GOLD };
  return (
    <Svg>
      <rect x="58" y="252" width="150" height="150" rx="14" fill={SKY} opacity="0.12" />

      <g filter="url(#sv-lift)">
        <rect x="62" y="34" width="400" height="336" rx="16" fill="#FFFFFF" />
        <path d="M62 50a16 16 0 0 1 16-16h368a16 16 0 0 1 16 16v44H62z" fill={NAVY} />
        <rect x="88" y="55" width="104" height="10" rx="5" fill="#FFFFFF" opacity=".9" />
        <rect x="88" y="72" width="62" height="6" rx="3" fill={SKY} />
        <g transform="translate(392, 54)">
          <rect width="44" height="26" rx="8" fill="#FFFFFF" opacity=".14" />
          <path d="M16 13 h12 M23 8 l5 5 l-5 5" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* weekday rail */}
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={i} x={92 + i * 48} y={112} width="20" height="5" rx="2.5" fill={NAVY} opacity=".25" />
        ))}

        {Array.from({ length: 28 }).map((_, i) => {
          const col = i % 7;
          const row = Math.floor(i / 7);
          const kind = due[i];
          const c = kind ? tone[kind] : null;
          return (
            <g key={i} transform={`translate(${88 + col * 48}, ${130 + row * 50})`}>
              <rect width="36" height="38" rx="9" fill={c ? c : SOFT} stroke={c ? c : LINE} />
              <rect x="10" y="12" width="16" height="5" rx="2.5" fill={c ? "#FFFFFF" : NAVY} opacity={c ? 0.95 : 0.3} />
              {c && <rect x="10" y="24" width="16" height="4" rx="2" fill="#FFFFFF" opacity=".55" />}
            </g>
          );
        })}

        {/* legend */}
        <g transform="translate(88, 336)">
          {["gst", "tds", "roc"].map((k, i) => (
            <g key={k} transform={`translate(${i * 92}, 0)`}>
              <rect width="10" height="10" rx="3" fill={tone[k]} />
              <rect x="18" y="2.5" width={52 - i * 6} height="5.5" rx="2.75" fill={NAVY} opacity=".25" />
            </g>
          ))}
        </g>
      </g>

      {/* Reminder toast */}
      <g filter="url(#sv-lift-sm)" transform="translate(304, 322)">
        <rect width="206" height="64" rx="13" fill="#FFFFFF" />
        <circle cx="34" cy="32" r="16" fill={SKY} opacity=".12" />
        <path d="M34 23 v9 l6 4" stroke={SKY} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="32" r="11" fill="none" stroke={SKY} strokeWidth="2" />
        <rect x="62" y="19" width="118" height="8" rx="4" fill={NAVY} opacity=".7" />
        <rect x="62" y="34" width="76" height="6" rx="3" fill={NAVY} opacity=".22" />
        <rect x="146" y="33" width="34" height="8" rx="4" fill={GREEN} opacity=".5" />
      </g>
    </Svg>
  );
}

function Reports() {
  return (
    <Svg>
      {/* stacked sheets behind */}
      <g filter="url(#sv-lift-sm)">
        <rect x="70" y="86" width="286" height="312" rx="12" fill="#FFFFFF" opacity=".55" transform="rotate(-5 213 242)" />
      </g>
      <g filter="url(#sv-lift-sm)">
        <rect x="92" y="70" width="286" height="312" rx="12" fill="#FFFFFF" opacity=".8" transform="rotate(-2 235 226)" />
      </g>

      <g filter="url(#sv-lift)">
        <rect x="116" y="46" width="300" height="330" rx="14" fill="#FFFFFF" />
        <rect x="146" y="80" width="126" height="13" rx="6.5" fill={NAVY} />
        <rect x="146" y="104" width="74" height="7" rx="3.5" fill={SKY} />
        <rect x="336" y="78" width="52" height="24" rx="8" fill={GREEN} opacity=".12" />
        <path d="M350 90 l4 4 l8 -9" fill="none" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

        <line x1="146" y1="132" x2="388" y2="132" stroke={LINE} />
        {/* statement rows */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(146, ${150 + i * 32})`}>
            <rect width={i === 5 ? 96 : 118 - (i % 3) * 18} height="7" rx="3.5" fill={NAVY} opacity={i === 5 ? 0.85 : 0.18} />
            <rect x="176" width="66" height="7" rx="3.5" fill={i === 5 ? NAVY : NAVY} opacity={i === 5 ? 0.85 : 0.3} />
            {i < 5 && <line x1="0" y1="20" x2="242" y2="20" stroke={LINE} />}
          </g>
        ))}
        <line x1="146" y1="336" x2="388" y2="336" stroke={NAVY} strokeWidth="1.5" />
        <rect x="146" y="348" width="82" height="9" rx="4.5" fill={NAVY} />
        <rect x="318" y="348" width="70" height="9" rx="4.5" fill={GOLD} />
      </g>

      {/* calculator */}
      <g filter="url(#sv-lift-sm)" transform="translate(396, 252)">
        <rect width="106" height="132" rx="13" fill={DEEP} />
        <rect x="16" y="18" width="74" height="28" rx="6" fill="#FFFFFF" opacity=".92" />
        <rect x="58" y="28" width="26" height="8" rx="4" fill={NAVY} opacity=".5" />
        {Array.from({ length: 9 }).map((_, i) => (
          <rect
            key={i}
            x={16 + (i % 3) * 27}
            y={58 + Math.floor(i / 3) * 24}
            width="21"
            height="17"
            rx="4"
            fill={i === 8 ? SKY : "#FFFFFF"}
            opacity={i === 8 ? 1 : 0.24}
          />
        ))}
      </g>
    </Svg>
  );
}

function Advisory() {
  return (
    <Svg>
      <rect x="40" y="70" width="150" height="120" rx="14" fill={SKY} opacity="0.12" />

      <g filter="url(#sv-lift)">
        <rect x="44" y="52" width="316" height="316" rx="16" fill="#FFFFFF" />
        <rect x="74" y="84" width="112" height="12" rx="6" fill={NAVY} />
        <rect x="74" y="106" width="66" height="7" rx="3.5" fill={SKY} />
        <Delta x={296} y={84} up w={38} />

        {/* growth chart with area */}
        <g transform="translate(0, 10)">
          <path d="M74 300 L132 256 L190 270 L248 210 L306 166 L330 152 L330 312 L74 312 Z" fill="url(#sv-area)" />
          <path
            d="M74 300 L132 256 L190 270 L248 210 L306 166 L330 152"
            fill="none"
            stroke={NAVY}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[[132, 256], [190, 270], [248, 210]].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r="4.5" fill="#FFFFFF" stroke={NAVY} strokeWidth="2.5" />
          ))}
          <circle cx="330" cy="152" r="7" fill={SKY} stroke="#FFFFFF" strokeWidth="3" />
          <line x1="74" y1="312" x2="330" y2="312" stroke={LINE} />
        </g>

        {[0, 1].map((i) => (
          <g key={i} transform={`translate(74, ${136 + i * 24})`}>
            <rect width="9" height="9" rx="2.5" fill={i === 0 ? NAVY : SKY} />
            <rect x="18" y="1.5" width={124 - i * 30} height="6" rx="3" fill={NAVY} opacity=".18" />
          </g>
        ))}
      </g>

      {/* action plan panel */}
      <g filter="url(#sv-lift)" transform="translate(324, 130)">
        <rect width="196" height="232" rx="16" fill={DEEP} />
        <rect x="26" y="30" width="94" height="10" rx="5" fill="#FFFFFF" opacity=".9" />
        <rect x="26" y="48" width="58" height="6" rx="3" fill={SKY} />
        <line x1="26" y1="72" x2="170" y2="72" stroke="#FFFFFF" strokeOpacity=".12" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(26, ${88 + i * 34})`}>
            {i < 2 ? (
              <>
                <circle cx="8" cy="8" r="8" fill={SKY} />
                <path d="M4.5 8 l2.5 2.5 l4.5 -5" fill="none" stroke={DEEP} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </>
            ) : (
              <circle cx="8" cy="8" r="7.2" fill="none" stroke="#FFFFFF" strokeOpacity=".3" strokeWidth="1.6" />
            )}
            <rect x="24" y="3" width={122 - i * 16} height="7" rx="3.5" fill="#FFFFFF" opacity={i < 2 ? 0.42 : 0.2} />
            <rect x="24" y="15" width={62 - i * 8} height="5" rx="2.5" fill="#FFFFFF" opacity=".14" />
          </g>
        ))}
      </g>
    </Svg>
  );
}

function Recovery() {
  /* Receivables ageing: the older the bucket, the longer and warmer the bar. */
  const ageing = [
    { days: "0–30", w: 78, fill: SKY, op: 0.55 },
    { days: "31–60", w: 112, fill: SKY, op: 0.9 },
    { days: "61–90", w: 142, fill: GOLD, op: 0.75 },
    { days: "90+", w: 166, fill: GOLD, op: 1 },
  ];
  return (
    <Svg>
      <rect x="44" y="64" width="150" height="120" rx="14" fill={GOLD} opacity="0.1" />

      {/* ageing of what is outstanding */}
      <g filter="url(#sv-lift)">
        <rect x="48" y="48" width="330" height="268" rx="16" fill="#FFFFFF" />
        <rect x="78" y="80" width="130" height="12" rx="6" fill={NAVY} />
        <rect x="78" y="102" width="72" height="7" rx="3.5" fill={GOLD} />
        <line x1="78" y1="126" x2="348" y2="126" stroke={LINE} />
        {ageing.map((r, i) => (
          <g key={r.days} transform={`translate(78, ${152 + i * 30})`}>
            <rect width="42" height="7" rx="3.5" fill={NAVY} opacity=".3" />
            <rect x="56" y="-3" width={r.w} height="13" rx="6.5" fill={r.fill} opacity={r.op} />
          </g>
        ))}
        <line x1="78" y1="258" x2="348" y2="258" stroke={LINE} />
        <rect x="78" y="272" width="96" height="10" rx="5" fill={NAVY} />
        <rect x="256" y="272" width="92" height="10" rx="5" fill={GOLD} />
      </g>

      {/* the escalation ladder — reminder, notice, next step */}
      <g filter="url(#sv-lift)" transform="translate(316, 148)">
        <rect width="218" height="236" rx="16" fill={DEEP} />
        <rect x="28" y="30" width="104" height="10" rx="5" fill="#FFFFFF" opacity=".9" />
        <rect x="28" y="48" width="62" height="6" rx="3" fill={SKY} />
        <line x1="28" y1="72" x2="190" y2="72" stroke="#FFFFFF" strokeOpacity=".12" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(28, ${90 + i * 36})`}>
            {i < 2 ? (
              <>
                <circle cx="9" cy="9" r="9" fill={SKY} />
                <path d="M5 9 l3 3 l5 -5.5" fill="none" stroke={DEEP} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </>
            ) : (
              <circle cx="9" cy="9" r="8" fill="none" stroke="#FFFFFF" strokeOpacity=".3" strokeWidth="1.7" />
            )}
            <rect x="28" y="4" width={130 - i * 18} height="7" rx="3.5" fill="#FFFFFF" opacity={i < 2 ? 0.45 : 0.2} />
            <rect x="28" y="16" width={70 - i * 10} height="5" rx="2.5" fill="#FFFFFF" opacity=".14" />
          </g>
        ))}
      </g>
    </Svg>
  );
}

function Careers() {
  return (
    <Svg>
      <rect x="52" y="76" width="150" height="116" rx="14" fill={SKY} opacity="0.12" />

      {/* openings list */}
      <g filter="url(#sv-lift)">
        <rect x="56" y="58" width="306" height="300" rx="16" fill="#FFFFFF" />
        <rect x="86" y="90" width="118" height="12" rx="6" fill={NAVY} />
        <rect x="86" y="112" width="68" height="7" rx="3.5" fill={SKY} />
        <line x1="86" y1="138" x2="332" y2="138" stroke={LINE} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(86, ${156 + i * 50})`}>
            <rect width="34" height="34" rx="9" fill={i === 0 ? SKY : NAVY} opacity={i === 0 ? 0.16 : 0.08} />
            <rect x="9" y="12" width="16" height="11" rx="2.5" fill="none" stroke={i === 0 ? SKY : NAVY} strokeWidth="1.8" />
            <path d="M13 12 v-2.5 a1.5 1.5 0 0 1 1.5 -1.5 h5 a1.5 1.5 0 0 1 1.5 1.5 V12" fill="none" stroke={i === 0 ? SKY : NAVY} strokeWidth="1.8" />
            <rect x="48" y="4" width={132 - i * 20} height="8" rx="4" fill={NAVY} opacity=".75" />
            <rect x="48" y="19" width={92 - i * 12} height="6" rx="3" fill={NAVY} opacity=".22" />
            <rect x="196" y="9" width="38" height="16" rx="8" fill={GREEN} opacity=".16" />
          </g>
        ))}
      </g>

      {/* apply card */}
      <g filter="url(#sv-lift)" transform="translate(338, 192)">
        <rect width="198" height="206" rx="16" fill={DEEP} />
        <circle cx="46" cy="60" r="22" fill={SKY} opacity=".22" />
        <circle cx="46" cy="53" r="9" fill="#FFFFFF" opacity=".85" />
        <path d="M30 76 a16 16 0 0 1 32 0" fill="#FFFFFF" opacity=".85" />
        <rect x="82" y="44" width="80" height="9" rx="4.5" fill="#FFFFFF" opacity=".85" />
        <rect x="82" y="60" width="52" height="6" rx="3" fill={SKY} />
        <line x1="28" y1="104" x2="170" y2="104" stroke="#FFFFFF" strokeOpacity=".12" />
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(28, ${122 + i * 22})`}>
            <rect width={i === 0 ? 142 : 104} height="7" rx="3.5" fill="#FFFFFF" opacity=".2" />
          </g>
        ))}
        <rect x="28" y="168" width="142" height="26" rx="8" fill={SKY} />
      </g>
    </Svg>
  );
}

export default function HeroVisual({ kind }: { kind: VisualKind }) {
  if (kind === "calendar") return <Calendar />;
  if (kind === "reports") return <Reports />;
  if (kind === "advisory") return <Advisory />;
  if (kind === "recovery") return <Recovery />;
  if (kind === "careers") return <Careers />;
  return <Dashboard />;
}
