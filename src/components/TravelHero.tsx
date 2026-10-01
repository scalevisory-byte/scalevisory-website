import Link from "next/link";
import Icon, { WhatsAppIcon } from "./Icon";
import GlobalNetwork from "./GlobalNetwork";
import { asset } from "@/lib/basePath";
import { stats, travelHeroPoints } from "@/lib/content/home";
import { whatsappLink } from "@/lib/content/site";

const EYEBROW = ["Accounting", "Taxation", "Legal", "Business Consultancy"];
const WHATSAPP = "Hi Scale Visory, I run a travel business and need help with accounting, GST and TCS.";

/**
 * Hero for the travel landing page.
 *
 * Deep navy on the left carrying the type, the photograph taking the right and
 * feathering into it, a global-network pattern behind both, and the trust panel
 * lifted over the seam at the bottom. The photograph is the owner's own — an
 * airport window, a laptop showing a travel dashboard, a passport and a
 * boarding pass — so nothing here is stock.
 *
 * Gold appears only as the rule beside the eyebrow. As a text colour it
 * measures 4.03:1 on navy, under AA for anything this small, so the eyebrow
 * itself is sky, which reaches 5.61:1 on navy-deep.
 */
export default function TravelHero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-deep text-white">
        {/* Photograph, feathered into the navy on its left and lower edges. */}
        <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block" aria-hidden="true">
          <img
            src={asset("/hero/travel.jpg")}
            alt=""
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-navy-deep/35" />
          <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-deep to-transparent" />
          {/* Soft light lifting the laptop out of the frame. */}
          <div className="absolute left-[18%] top-[30%] h-[46%] w-[58%] rounded-full bg-sky/25 blur-[90px]" />
        </div>

        <GlobalNetwork className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.07]" />

        <div className="wrap relative py-14 md:py-20 lg:min-h-[600px]">
          <div className="max-w-[36rem] lg:max-w-[33rem] xl:max-w-[36rem]">
            <p className="eyebrow eyebrow-rule text-gold-light after:hidden sm:after:block">
              <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                {EYEBROW.map((e, i) => (
                  <span key={e} className="flex items-center gap-x-2.5 whitespace-nowrap">
                    {e}
                    {i < EYEBROW.length - 1 && <span className="opacity-40">|</span>}
                  </span>
                ))}
              </span>
            </p>

            <h1 className="mt-5 !text-white">
              Accounting Built for
              <br />
              <span className="text-sky-bright">Travel Businesses.</span>
            </h1>

            <p className="mt-5 text-[17px] leading-8 text-white/80">
              From daily entries to GST, TDS/TCS, supplier reconciliation and financial reporting —
              we handle your accounting, so you can focus on growing your travel business.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-sky group">
                Book a Free Consultation
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
              <a
                href={whatsappLink(WHATSAPP)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/25 bg-white/5 text-white hover:border-white hover:bg-white/10"
              >
                <WhatsAppIcon />
                WhatsApp Us
              </a>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {travelHeroPoints.map((p) => (
                <li key={p.title} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-sky-bright">
                    <Icon name={p.icon} className="h-6 w-6" strokeWidth={1.4} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold leading-tight">{p.title}</p>
                    <p className="mt-1 text-[13px] leading-5 text-white/65">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Below lg the right-hand panel is gone, so the photograph returns as a
            band under the copy rather than the hero reading as flat navy. */}
        <div className="relative lg:hidden" aria-hidden="true">
          <img
            src={asset("/hero/travel.jpg")}
            alt=""
            className="h-52 w-full object-cover object-center sm:h-64"
          />
          <div className="absolute inset-0 bg-navy-deep/40" />
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-navy-deep to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep to-transparent" />
        </div>
      </section>

      {/* Trust panel, lifted over the seam. A sibling rather than a child of the
          hero: a child translated past the section's edge is painted over by
          whatever comes next. */}
      <section className="relative z-10 -mt-10 md:-mt-14">
        <div className="wrap">
          <div className="grid divide-y divide-line rounded-xl bg-white shadow-[0_22px_60px_-26px_rgba(0,0,0,0.55)] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {stats.map((st, i) => (
              <div
                key={st.big}
                className={`flex items-center gap-4 px-6 py-6 lg:border-l lg:border-line ${
                  i === 0 ? "lg:border-l-0" : ""
                } ${i === 1 ? "sm:border-l sm:border-line" : ""} ${
                  i >= 2 ? "sm:border-t sm:border-line lg:border-t-0" : ""
                }`}
              >
                <span className="shrink-0 text-navy">
                  <Icon name={st.icon} className="h-9 w-9" strokeWidth={1.4} />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-bold leading-tight text-navy">{st.big}</p>
                  <p className="mt-1 text-sm leading-5 text-muted">{st.small}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
