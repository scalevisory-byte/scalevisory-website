/** Thin line icons, drawn inline so nothing extra loads. Decorative only. */
const paths: Record<string, React.ReactNode> = {
  ledger: (<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>),
  calendar: (<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" /></>),
  sector: (<><path d="M3 20h18" /><rect x="5" y="12" width="4" height="8" /><rect x="11" y="8" width="4" height="12" /><rect x="17" y="4" width="4" height="16" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  person: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></>),
  chart: (<><path d="M3 20h18" /><path d="M5 16l4-5 4 3 6-8" /><circle cx="9" cy="11" r="1.3" /><circle cx="13" cy="14" r="1.3" /></>),
};

export default function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.ledger}
    </svg>
  );
}
