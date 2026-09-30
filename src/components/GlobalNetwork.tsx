/**
 * Faint global-network pattern for the travel hero: a globe's graticule with a
 * few route arcs across it. Drawn rather than photographed so it costs no
 * request and stays crisp at any width.
 *
 * It sits at around 6% opacity — texture behind the type, never a picture
 * competing with it. Everything is proportional to the 1200x760 viewBox, so it
 * crops from the centre as the hero changes shape.
 */

/** Route arcs, as [x1, y1, x2, y2, curvature]. Curvature bows the arc upward. */
const ROUTES: [number, number, number, number, number][] = [
  [180, 470, 520, 300, 120],
  [520, 300, 880, 250, 90],
  [300, 250, 700, 430, -130],
  [640, 520, 1010, 360, 110],
  [120, 330, 430, 210, 80],
  [760, 180, 1060, 300, -70],
];

/** Network nodes, as [cx, cy, r]. */
const NODES: [number, number, number][] = [
  [180, 470, 5], [520, 300, 7], [880, 250, 5], [300, 250, 4],
  [700, 430, 6], [640, 520, 4], [1010, 360, 5], [120, 330, 4],
  [430, 210, 4], [760, 180, 5], [1060, 300, 4], [420, 560, 4],
];

export default function GlobalNetwork({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="gn-fade" cx="50%" cy="50%" r="62%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <mask id="gn-mask">
          <rect width="1200" height="760" fill="url(#gn-fade)" />
        </mask>
      </defs>

      <g mask="url(#gn-mask)" stroke="#ffffff" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {/* Graticule — meridians as nested ellipses, parallels as straight lines. */}
        <circle cx="600" cy="380" r="330" strokeOpacity="0.5" />
        {[60, 140, 220, 300].map((rx) => (
          <ellipse key={rx} cx="600" cy="380" rx={rx} ry="330" strokeOpacity="0.28" />
        ))}
        {[-260, -170, -85, 0, 85, 170, 260].map((dy) => {
          const half = Math.sqrt(Math.max(0, 330 * 330 - dy * dy));
          return (
            <line
              key={dy}
              x1={600 - half}
              y1={380 + dy}
              x2={600 + half}
              y2={380 + dy}
              strokeOpacity={dy === 0 ? 0.45 : 0.22}
            />
          );
        })}

        {/* Routes over the top of it. */}
        {ROUTES.map(([x1, y1, x2, y2, bow], i) => (
          <path
            key={i}
            d={`M${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - bow} ${x2} ${y2}`}
            strokeOpacity="0.55"
            strokeDasharray="5 7"
            strokeLinecap="round"
          />
        ))}
      </g>

      <g mask="url(#gn-mask)" fill="#ffffff">
        {NODES.map(([cx, cy, r], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r * 2.6} fillOpacity="0.1" />
            <circle cx={cx} cy={cy} r={r} fillOpacity="0.7" />
          </g>
        ))}
      </g>
    </svg>
  );
}
