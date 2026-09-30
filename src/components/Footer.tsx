import Link from "next/link";
import Logo from "./Logo";
import { legalNav, site, whatsappLink } from "@/lib/content/site";
import { services } from "@/lib/content/services";
import { industries, industryHref } from "@/lib/content/industries";
import { resourceCategories } from "@/lib/content/resources";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo light className="h-14" />
          <p className="mt-4 text-sm font-semibold tracking-wide text-white/90">
            Accounting | Taxation | Legal
          </p>
          <p className="mt-1 font-display text-sm font-semibold text-sky">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-7">
            Business consultancy, compliance and advisory for businesses in Surat and across Gujarat —
            {" "}{site.years} years of it.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <a className="btn-sky !py-2" href={whatsappLink("Hi Scale Visory, I have a query.")}>WhatsApp us</a>
            <a className="btn-light !py-2" href={`tel:${site.phoneRaw}`}>{site.phone}</a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-3 font-display text-sm font-semibold text-white">Services</h4>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className="no-underline hover:text-sky" href={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
            {/* Its own landing page rather than a service slug — the work is
                described inside two of the four services above. */}
            <li><Link className="no-underline hover:text-sky" href="/internal-audit">Internal Audit</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-3 font-display text-sm font-semibold text-white">Industries</h4>
          <ul className="space-y-2 text-sm">
            {industries.slice(0, 6).map((i) => (
              <li key={i.slug}>
                <Link className="no-underline hover:text-sky" href={industryHref(i)}>{i.name}</Link>
              </li>
            ))}
            <li><Link className="no-underline hover:text-sky" href="/industries">All industries</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-3 font-display text-sm font-semibold text-white">Resources</h4>
          <ul className="space-y-2 text-sm">
            {resourceCategories.map((c) => (
              <li key={c.slug}>
                <Link className="no-underline hover:text-sky" href={`/resources/${c.slug}`}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* min-w-0 lets the grid column shrink below its longest word; without
            it the email address pushes the page 4px wide at the md breakpoint.
            break-words then wraps the address itself rather than clipping. */}
        <div className="min-w-0 break-words md:col-span-2">
          <h4 className="mb-3 font-display text-sm font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="no-underline hover:text-sky" href="/industries">Industries</Link></li>
            <li><Link className="no-underline hover:text-sky" href="/resources">Resources</Link></li>
            <li><Link className="no-underline hover:text-sky" href="/training">Training</Link></li>
            <li>
              <a className="no-underline hover:text-sky" href="https://artharecovery.in" target="_blank" rel="noopener noreferrer">
                Payment Recovery
              </a>
            </li>
            <li>
              <a className="no-underline hover:text-sky" href="https://zyntajobs.in" target="_blank" rel="noopener noreferrer">
                Careers
              </a>
            </li>
            <li><Link className="no-underline hover:text-sky" href="/about">About</Link></li>
            <li><Link className="no-underline hover:text-sky" href="/contact">Contact</Link></li>
          </ul>
          <h4 className="mb-3 mt-6 font-display text-sm font-semibold text-white">Contact</h4>
          <p className="text-sm leading-6">{site.address}</p>
          <p className="mt-2 text-sm">
            <a className="no-underline hover:text-sky" href={`tel:${site.phoneRaw}`}>{site.phone}</a>
            <br />
            <a className="no-underline hover:text-sky" href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            <a
              className="no-underline hover:text-sky"
              href={whatsappLink("Hi Scale Visory, I have a query.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </p>
          <p className="mt-2 text-sm">{site.hours[0].days}<br />{site.hours[0].time}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-5 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {site.name}®. All rights reserved.</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link className="no-underline hover:text-sky" href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <span>Surat, Gujarat, India</span>
        </div>
      </div>
    </footer>
  );
}
