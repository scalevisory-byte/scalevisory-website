/**
 * Faint city skyline behind the navy Industries band, matching the reference
 * layout. Drawn rather than photographed: it is pure decoration, it costs no
 * request, and it cannot go blurry or crop badly at any width.
 *
 * Kept very low contrast on purpose — it should read as texture, not as a
 * picture competing with the cards in front of it.
 */
export default function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1600 260"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="82%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g fill="url(#sky-fade)">
        <rect x="-10" y="142" width="26" height="118" />
        <rect x="22" y="190" width="38" height="70" />
        <rect x="62" y="164" width="44" height="96" />
        <rect x="110" y="190" width="34" height="70" />
        <rect x="152" y="190" width="22" height="70" />
        <rect x="176" y="54" width="30" height="206" />
        <rect x="190" y="38" width="2" height="16" />
        <rect x="208" y="164" width="22" height="96" />
        <rect x="238" y="190" width="30" height="70" />
        <rect x="276" y="120" width="18" height="140" />
        <rect x="302" y="54" width="18" height="206" />
        <rect x="322" y="190" width="22" height="70" />
        <rect x="352" y="142" width="44" height="118" />
        <rect x="400" y="142" width="30" height="118" />
        <rect x="438" y="96" width="18" height="164" />
        <rect x="464" y="142" width="44" height="118" />
        <rect x="510" y="120" width="34" height="140" />
        <rect x="548" y="164" width="18" height="96" />
        <rect x="574" y="120" width="18" height="140" />
        <rect x="598" y="54" width="38" height="206" />
        <rect x="616" y="38" width="2" height="16" />
        <rect x="640" y="32" width="30" height="228" />
        <rect x="654" y="16" width="2" height="16" />
        <rect x="674" y="120" width="26" height="140" />
        <rect x="703" y="120" width="38" height="140" />
        <rect x="743" y="96" width="34" height="164" />
        <rect x="785" y="74" width="30" height="186" />
        <rect x="821" y="164" width="26" height="96" />
        <rect x="849" y="54" width="34" height="206" />
        <rect x="865" y="38" width="2" height="16" />
        <rect x="886" y="74" width="44" height="186" />
        <rect x="933" y="54" width="30" height="206" />
        <rect x="947" y="38" width="2" height="16" />
        <rect x="965" y="164" width="38" height="96" />
        <rect x="1011" y="74" width="34" height="186" />
        <rect x="1049" y="74" width="38" height="186" />
        <rect x="1095" y="32" width="30" height="228" />
        <rect x="1109" y="16" width="2" height="16" />
        <rect x="1127" y="164" width="44" height="96" />
        <rect x="1175" y="164" width="30" height="96" />
        <rect x="1207" y="96" width="38" height="164" />
        <rect x="1253" y="32" width="38" height="228" />
        <rect x="1271" y="16" width="2" height="16" />
        <rect x="1295" y="54" width="38" height="206" />
        <rect x="1313" y="38" width="2" height="16" />
        <rect x="1337" y="32" width="18" height="228" />
        <rect x="1359" y="164" width="22" height="96" />
        <rect x="1387" y="120" width="18" height="140" />
        <rect x="1409" y="120" width="22" height="140" />
        <rect x="1437" y="32" width="30" height="228" />
        <rect x="1451" y="16" width="2" height="16" />
        <rect x="1469" y="32" width="22" height="228" />
        <rect x="1497" y="96" width="34" height="164" />
        <rect x="1534" y="54" width="44" height="206" />
        <rect x="1555" y="38" width="2" height="16" />
        <rect x="1586" y="54" width="26" height="206" />
        <rect x="1598" y="38" width="2" height="16" />
      </g>
    </svg>
  );
}
