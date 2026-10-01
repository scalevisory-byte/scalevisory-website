export const site = {
  name: "Scale Visory",
  tagline: "Balancing The Unbalanced",
  description:
    "Scale Visory is a Surat-based accounting, taxation, compliance and business advisory firm with 12+ years of experience. Bookkeeping, GST, income tax, audit and a practical accounts training institute.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://scalevisory.in",
  phone: "+91 99099 93565",
  phoneRaw: "919909993565",
  email: "info@scalevisory.in",
  /** Second address, shown alongside the first wherever email is listed. */
  emailAlt: "scalevisory@gmail.com",
  address: "116, SNS Atria, Behind Prime Shoppers, Vesu, Surat – 395007, Gujarat",
  /** The parts, so the structured data stops keeping its own copy of them. */
  postal: {
    street: "116, SNS Atria, Behind Prime Shoppers, Vesu",
    locality: "Surat",
    region: "Gujarat",
    postalCode: "395007",
    country: "IN",
  },
  mapsQuery: "SNS Atria, Vesu, Surat 395007",
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 7:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  years: "12+",
  social: {
    instagram: "https://instagram.com/scalevisory",
    linkedin: "https://linkedin.com/company/scalevisory",
  },
};

/**
 * Main navigation — six items, not eight.
 *
 * Services and Industries carry their own menus, built in Header.tsx from
 * services.ts and industries.ts so there is no second list to keep in step.
 * The two partner ventures moved to `ventureNav` and the slim bar above the
 * logo: they are other people's sites, and giving them the same weight as
 * this firm's own pages was most of what made the header feel crowded.
 */
export const nav: { href: string; label: string; hasMenu?: boolean }[] = [
  { href: "/services", label: "Services", hasMenu: true },
  { href: "/industries", label: "Industries", hasMenu: true },
  { href: "/resources", label: "Resources" },
  { href: "/training", label: "Training" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** The owner's other ventures, on their own domains. */
export const ventureNav: { href: string; label: string }[] = [
  { href: "https://artharecovery.in", label: "Payment Recovery" },
  { href: "https://zyntajobs.in", label: "Careers" },
];

/** Policy pages — footer only, never in the main nav. */
export const legalNav: { href: string; label: string }[] = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(text)}`;
