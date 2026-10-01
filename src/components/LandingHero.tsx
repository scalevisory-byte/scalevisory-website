import Link from "next/link";
import HeroVisual, { type VisualKind } from "./HeroVisual";
import GlobalNetwork from "./GlobalNetwork";
import Icon, { WhatsAppIcon } from "./Icon";
import { whatsappLink } from "@/lib/content/site";

export interface HeroPoint {
  icon: string;
  title: string;
  body: string;
}

/**
 * Hero for a landing page that has no photograph of its own.
 *
 * The generic PageHero leaves the right half of the navy band empty, which is
 * finding A10 in the design audit and the first thing a visitor sees on every
 * interior page. This fills it instead — and has to work harder than the
 * homepage hero does, because there is no photograph to carry the depth.
 *
 * Four things do that work: an ambient wash from the top right so the navy is
 * never one flat colour, the network pattern behind everything, a lit panel
 * under the drawn composition so it sits on something rather than floating,
 * and a short promise row that gives the copy column weight below the buttons.
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
  points,
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
  /** Three short promises under the buttons. */
  points?: HeroPoint[];
  ctaLabel?: string;
  ctaHref?: string;
  whatsapp: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      {/* Ambient light from the top right, so the ground has a direction. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 8%, rgba(16,169,232,0.22) 0%, rgba(16,169,232,0.07) 38%, transparent 68%)",
        }}
        aria-hidden="true"
      />
      <GlobalNetwork className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.09]" />
      {/* Hairline at the foot, where the navy meets the page. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky/40 to-transparent" />

      <div className="wrap relative py-14 md:py-16 lg:min-h-[560px] lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow-rule text-gold-light after:hidden sm:after:block">{eyebrow}</p>

            <h1 className="mt-5 !text-white">
              {title}
              {accent && (
                <>
                  <br />
                  <span className="text-sky-bright">{accent}</span>
                </>
              )}
            </h1>

            <p className="mt-5 max-w-[36rem] text-[17px] leading-8 text-white/80">{lead}</p>

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

            {points && (
              <ul className="mt-9 grid gap-x-4 gap-y-6 sm:grid-cols-3">
                {points.map((p, i) => (
                  <li
                    key={p.title}
                    className={`flex items-start gap-2.5 ${
                      i > 0 ? "sm:border-l sm:border-white/15 sm:pl-4" : ""
                    }`}
                  >
                    <span className="mt-0.5 shrink-0 text-sky-bright">
                      <Icon name={p.icon} className="h-6 w-6" strokeWidth={1.4} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-[12px] font-bold leading-tight tracking-tight">
                        {p.title}
                      </p>
                      <p className="mt-0.5 text-[11.5px] leading-5 text-white/65">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* The composition sits on a lit panel rather than floating on navy. */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/25 blur-[80px]"
              aria-hidden="true"
            />
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)] backdrop-blur-[2px] md:p-7">
              <HeroVisual kind={visual} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
