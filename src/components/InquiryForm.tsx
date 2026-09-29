"use client";

import { useState } from "react";
import { site } from "@/lib/content/site";
import type { InquiryKind } from "@/lib/types";

/**
 * The site is a static export, so there is no server to post to and nowhere to
 * store an enquiry. The form collects the same fields as before and hands them
 * to WhatsApp as a pre-filled message, which is how most of the firm's clients
 * get in touch anyway.
 *
 * Nothing is transmitted to or stored by this site — the visitor sends the
 * message themselves from their own WhatsApp. The privacy policy says so.
 */
export default function InquiryForm({
  kind = "general",
  subject,
  subjectOptions,
  buttonLabel = "Send on WhatsApp",
  askCompany = true,
  compact = false,
}: {
  kind?: InquiryKind;
  subject?: string;
  subjectOptions?: string[];
  buttonLabel?: string;
  askCompany?: boolean;
  compact?: boolean;
}) {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const name = get("name");
    const phone = get("phone");
    const email = get("email");
    const company = get("company");
    const topic = get("subject") || subject || "";
    const message = get("message");

    if (name.length < 2) return setError("Enter your name.");
    if (!/^[0-9+\s-]{10,15}$/.test(phone)) return setError("Enter a valid 10-digit mobile number.");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    setError(null);

    const lines = [
      "Hi Scale Visory, I'd like to enquire.",
      "",
      `Name: ${name}`,
      `Mobile: ${phone}`,
      email && `Email: ${email}`,
      company && `Business: ${company}`,
      topic && `About: ${topic}`,
      message && `\n${message}`,
    ].filter(Boolean);

    window.open(
      `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
      {subject && !subjectOptions && <input type="hidden" name="subject" value={subject} />}
      <div>
        <label className="label" htmlFor={`${kind}-name`}>Your name</label>
        <input id={`${kind}-name`} name="name" required className="field" />
      </div>
      <div>
        <label className="label" htmlFor={`${kind}-phone`}>Mobile number</label>
        <input id={`${kind}-phone`} name="phone" required inputMode="tel" placeholder="10-digit number" className="field" />
      </div>
      <div>
        <label className="label" htmlFor={`${kind}-email`}>Email <span className="text-muted">(optional)</span></label>
        <input id={`${kind}-email`} name="email" type="email" className="field" />
      </div>
      {askCompany && (
        <div>
          <label className="label" htmlFor={`${kind}-company`}>Business name <span className="text-muted">(optional)</span></label>
          <input id={`${kind}-company`} name="company" className="field" />
        </div>
      )}
      {subjectOptions && (
        <div className={compact ? "" : "sm:col-span-2"}>
          <label className="label" htmlFor={`${kind}-subject`}>What do you need help with?</label>
          <select id={`${kind}-subject`} name="subject" className="field" defaultValue={subject ?? subjectOptions[0]}>
            {subjectOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      )}
      <div className={compact ? "" : "sm:col-span-2"}>
        <label className="label" htmlFor={`${kind}-message`}>Message</label>
        <textarea id={`${kind}-message`} name="message" rows={4} className="field" placeholder="Tell us briefly about your business and what you need." />
      </div>
      {error && <p className="text-sm text-red-700 sm:col-span-2">{error}</p>}
      <div className={compact ? "" : "sm:col-span-2"}>
        <button className="btn-primary w-full sm:w-auto">{buttonLabel}</button>
        <p className="mt-2.5 text-xs leading-5 text-muted">
          This opens WhatsApp with your details filled in — you press send. Prefer to talk?{" "}
          <a href={`tel:${site.phoneRaw}`} className="font-semibold text-navy">Call {site.phone}</a>.
        </p>
      </div>
    </form>
  );
}
