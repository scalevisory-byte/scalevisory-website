import { WhatsAppIcon } from "./Icon";
import { whatsappLink } from "@/lib/content/site";

/**
 * Floating WhatsApp button.
 *
 * Every site the owner put next to this one carries one — Artha, Zynta Jobs
 * and Accounting Baba all do — and this site had none: the chat widget only
 * renders when a Tawk property id is set, and none is.
 *
 * It is a link, not a widget: nothing loads, nothing tracks, and it works with
 * JavaScript off. On phones it sits clear of the thumb rest and of iOS's home
 * indicator via env(safe-area-inset-bottom).
 */
export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hi Scale Visory, I have a query.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Scale Visory on WhatsApp"
      className="group fixed right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-[#08331C] shadow-[0_10px_30px_-6px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:scale-105 focus-visible:scale-105 md:right-6 md:h-[60px] md:w-[60px]"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-navy-deep px-3 py-2 font-display text-sm font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 md:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
