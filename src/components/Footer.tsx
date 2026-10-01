import Link from "next/link";
import Logo from "./Logo";
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from "./Icon";
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
          <p className="mt-1 font-display text-sm font-semibold text-sky-bright">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-7">
            Business consultancy, compliance and advisory for businesses in Surat and across Gujarat —
            {" "}{site.years} years of it.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <a className="btn-sky !py-2" href={whatsappLink("Hi Scale Visory, I have a query.")}>WhatsApp us</a>
            <a className="btn-light !py-2" href={`tel:${site.phoneRaw}`}>{site.phone}</a>
          </div>

          {/* Both were in site.ts and rendered nowhere — they only reached the
              structured data's sameAs, where no reader ever sees them. */}
          <ul className="mt-5 flex items-center gap-3">
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Scale Visory on Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
              >
                <InstagramIcon className="h-[19px] w-[19px]" />
              </a>
            </li>
            <li>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Scale Visory on LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
              >
                <LinkedInIcon className="h-[19px] w-[19px]" />
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-3 font-display text-sm font-semibold text-white">Services</h4>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className="no-underline hover:text-sky-bright" href={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
            {/* Its own landing page rather than a service slug — the work is
                described inside two of the four services above. */}
            <li><Link className="no-underline hover:text-sky-bright" href="/internal-audit">Internal Audit</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-3 font-display text-sm font-semibold text-white">Industries</h4>
          <ul className="space-y-2 text-sm">
            {industries.slice(0, 6).map((i) => (
              <li key={i.slug}>
                <Link className="no-underline hover:text-sky-bright" href={industryHref(i)}>{i.name}</Link>
              </li>
            ))}
            <li><Link className="no-underline hover:text-sky-bright" href="/industries">All industries</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-3 font-display text-sm font-semibold text-white">Resources</h4>
          <ul className="space-y-2 text-sm">
            {resourceCategories.map((c) => (
              <li key={c.slug}>
                <Link className="no-underline hover:text-sky-bright" href={`/resources/${c.slug}`}>{c.title}</Link>
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
            <li><Link className="no-underline hover:text-sky-bright" href="/industries">Industries</Link></li>
            <li><Link className="no-underline hover:text-sky-bright" href="/resources">Resources</Link></li>
            <li><Link className="no-underline hover:text-sky-bright" href="/training">Training</Link></li>
            <li>
              <a className="no-underline hover:text-sky-bright" href="https://artharecovery.in" target="_blank" rel="noopener noreferrer">
                Payment Recovery
              </a>
            </li>
            <li>
              <a className="no-underline hover:text-sky-bright" href="https://zyntajobs.in" target="_blank" rel="noopener noreferrer">
                Careers
              </a>
            </li>
            <li><Link className="no-underline hover:text-sky-bright" href="/about">About</Link></li>
            <li><Link className="no-underline hover:text-sky-bright" href="/contact">Contact</Link></li>
          </ul>
          <h4 className="mb-3 mt-6 font-display text-sm font-semibold text-white">Contact</h4>
          <p className="text-sm leading-6">{site.address}</p>
          <p className="mt-2 text-sm">
            <a className="no-underline hover:text-sky-bright" href={`tel:${site.phoneRaw}`}>{site.phone}</a>
            <br />
            <a className="no-underline hover:text-sky-bright" href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            <a className="no-underline hover:text-sky-bright" href={`mailto:${site.emailAlt}`}>{site.emailAlt}</a>
          </p>
          {/* The WhatsApp line was the word itself, sitting under two email
              addresses and reading like a third one. The mark says what it is
              at a glance, and it opens a chat rather than a page. */}
          <a
            className="mt-3 flex w-full max-w-[13rem] items-center justify-center gap-2 rounded-md bg-[#25D366] px-3 py-2 text-center font-display text-sm font-semibold text-[#08331C] no-underline transition-colors hover:bg-[#1FBE5A]"
            href={whatsappLink("Hi Scale Visory, I have a query.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="h-[18px] w-[18px] shrink-0" />
            WhatsApp
          </a>
          <p className="mt-2 text-sm">{site.hours[0].days}<br />{site.hours[0].time}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-5 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {site.name}®. All rights reserved.</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link className="no-underline hover:text-sky-bright" href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <span>Surat, Gujarat, India</span>
        </div>
      </div>
    </footer>
  );
}
