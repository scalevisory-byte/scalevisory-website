/**
 * The mark's own slanting strokes, blown up and laid very faintly across a
 * light ground so the left of the hero is not a flat sheet of white.
 *
 * Same geometry as the logo — three parallels leaning right, the middle one
 * lighter — which is why it reads as the brand rather than as decoration.
 * It runs at a few percent opacity and bleeds off the top and bottom, so it
 * never reads as a shape with edges.
 */

/** [x of the top-left corner, width]. The slant is applied by the skew. */
const STROKES: [number, number, string][] = [
  [-60, 54, "navy"],
  [26, 54, "navy"],
  [112, 54, "sky"],
  [198, 54, "navy"],
  [352, 36, "navy"],
  [424, 36, "sky"],
];

export default function BrandPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 560 620"
      preserveAspectRatio="xMinYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bp-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#073574" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#073574" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#073574" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bp-fade-sky" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10A9E8" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#10A9E8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#10A9E8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* The strokes lean the way the mark's do. -120/740 takes them well past
          the frame top and bottom so no end is ever visible. */}
      <g transform="skewX(-14)">
        {STROKES.map(([x, w, tone], i) => (
          <rect
            key={i}
            x={x}
            y={-120}
            width={w}
            height={860}
            fill={tone === "sky" ? "url(#bp-fade-sky)" : "url(#bp-fade)"}
          />
        ))}
      </g>
    </svg>
  );
}
