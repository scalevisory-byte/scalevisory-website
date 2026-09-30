import Link from "next/link";
import HeroVisual, { type VisualKind } from "./HeroVisual";
import GlobalNetwork from "./GlobalNetwork";
import { WhatsAppIcon } from "./Icon";
import { whatsappLink } from "@/lib/content/site";

/**
 * Hero for a landing page that has no photograph of its own.
 *
 * The generic PageHero leaves the right half of the band empty, which is
 * finding A10 in the design audit and the first thing a visitor sees on every
 * interior page. This fills it with one of the drawn compositions instead, and
 * puts the network pattern behind so the navy is never flat.
 *
 * Gold is the eyebrow rule only — as a text colour it is under AA on navy at
 * this size, so the eyebrow itself is sky.
 */
export default function LandingHero({
  eyebrow,
  title,
  accent,
  lead,
  visual,
  ctaLabel = "Book a free consultation",
  ctaHref = "/contact",
  whatsapp,
}: {
  eyebrow: string;
  title: string;
  /** Second line, set in sky. */
  accent?: string;
  lead: string;
  visual: VisualKind;
  ctaLabel?: string;
  ctaHref?: string;
  whatsapp: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <GlobalNetwork className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.07]" />

      <div className="wrap relative py-14 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow-rule text-sky after:hidden sm:after:block">{eyebrow}</p>

            <h1 className="mt-5 !text-white">
              {title}
              {accent && (
                <>
                  <br />
                  <span className="text-sky">{accent}</span>
                </>
              )}
            </h1>

            <p className="mt-5 max-w-[38rem] text-[17px] leading-8 text-white/80">{lead}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={ctaHref} className="btn-sky group">
                {ctaLabel}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
              <a
                href={whatsappLink(whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/25 bg-white/5 text-white hover:border-white hover:bg-white/10"
              >
                <WhatsAppIcon />
                WhatsApp us
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <HeroVisual kind={visual} />
          </div>
        </div>
      </div>
    </section>
  );
}
