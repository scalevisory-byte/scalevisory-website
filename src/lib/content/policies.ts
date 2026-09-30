/**
 * Policy pages (PLATFORM-PLAN §1, §10 and decision #9 — lost-lead PII purged
 * after 24 months). These describe how this website handles data and the limits
 * of what the firm publishes. Anything that would need a lawyer's sign-off, or a
 * fact we do not have, is marked as a placeholder rather than invented.
 */

export interface Policy {
  slug: string;
  title: string;
  lead: string;
  description: string;
  sections: { heading: string; paragraphs: string[]; items?: string[] }[];
}

const CONTACT_LINE =
  "Questions about this page, or a request relating to your own data, go to info@scalevisory.in, scalevisory@gmail.com or +91 99099 93565.";

export const policies: Policy[] = [
  {
    slug: "privacy-policy",
    title: "Privacy policy",
    lead: "What this website collects, why, how long it is kept and how to have it removed.",
    description:
      "How Scale Visory collects, uses, stores and deletes personal information submitted through scalevisory.in.",
    sections: [
      {
        heading: "This website does not collect your details",
        paragraphs: [
          "This is a static website. It has no database, no accounts and no sign-up, and its enquiry forms do not send anything to us.",
          "When you fill an enquiry form, your browser assembles the details into a WhatsApp message on your own device and opens WhatsApp. Nothing leaves your device until you press send, and if you close it instead, nothing has been recorded anywhere.",
        ],
      },
      {
        heading: "What the website does use",
        paragraphs: ["Only the third-party tools below, and only where they are switched on:"],
        items: [
          "Analytics: anonymised usage data through Google Analytics 4, where you have not blocked it",
          "Chat: if you use the chat widget, the conversation is handled by our chat provider under their terms",
          "Hosting: the site is served as static files by GitHub Pages, which keeps its own standard server logs",
        ],
      },
      {
        heading: "What happens once you contact us",
        paragraphs: [
          "When you message us on WhatsApp, call, or email, we hold what you send us so we can reply and, if you engage us, provide the service. That information sits in our own business systems, not in this website.",
          "We do not sell personal information, and we do not share it with third parties for their own marketing.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "Enquiries that do not become engagements are deleted 24 months after last contact.",
          "Records relating to an actual engagement are kept for as long as the applicable tax, company and professional record-keeping rules require, and are then deleted.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You can ask us what we hold about you, ask for it to be corrected, or ask for it to be deleted where we are not required to retain it.",
          CONTACT_LINE,
        ],
      },
      {
        heading: "Cookies and analytics",
        paragraphs: [
          "This site uses cookies set by Google Analytics to understand which pages are read, and by the chat widget if you interact with it. Blocking them in your browser does not affect any part of the site's functionality.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "If this policy changes materially, the revised version is published on this page. [PLACEHOLDER — owner to confirm effective date before launch.]",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of use",
    lead: "The terms on which this website is provided.",
    description: "Terms of use for scalevisory.in — scope, accuracy, third-party links and applicable law.",
    sections: [
      {
        heading: "About this site",
        paragraphs: [
          "This website is published by Scale Visory, an accounting, taxation, legal and business consultancy practice based at 116, SNS Atria, Behind Prime Shoppers, Vesu, Surat – 395007, Gujarat.",
        ],
      },
      {
        heading: "No engagement by browsing",
        paragraphs: [
          "Reading this site, or sending an enquiry through it, does not create a professional engagement. An engagement begins only when scope and fees are agreed in writing.",
        ],
      },
      {
        heading: "Accuracy",
        paragraphs: [
          "Tax, GST and corporate law in India change frequently. Content here is written as at the date of publication and is not updated retrospectively. Do not rely on any page as current without checking the position for your own facts.",
        ],
      },
      {
        heading: "Forms on this site",
        paragraphs: [
          "The enquiry forms here do not submit to a server. They open WhatsApp with your details filled in, and you choose whether to send. Sending a message does not create a professional engagement — see above.",
        ],
      },
      {
        heading: "Third-party links",
        paragraphs: [
          "This site links to other ventures and to external services. We are not responsible for the content, terms or data practices of any site we link to.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The text, structure and design of this site belong to Scale Visory. You are welcome to quote a page with attribution and a link; please do not republish pages in full.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of India, with jurisdiction at Surat, Gujarat. [PLACEHOLDER — owner to have this page reviewed by the firm's legal team before launch.]",
        ],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    lead: "The limits of what is on this website, and what our legal services do and do not include.",
    description:
      "Disclaimer for scalevisory.in — general information only, no professional advice, and the scope of legal services offered.",
    sections: [
      {
        heading: "General information only",
        paragraphs: [
          "Everything published on this website is general information. It is not accounting, taxation, legal or investment advice for your situation, and it does not take account of your facts.",
          "Decisions taken on the basis of a page here, without engaging us or another qualified professional, are taken at your own risk.",
        ],
      },
      {
        heading: "Legal service disclaimer",
        paragraphs: [
          "Scale Visory provides legal advisory and documentation services — incorporation, ROC and corporate filings, agreements, licences, notices and related work.",
          "Representation before courts, tribunals and statutory authorities is not provided directly by the firm. Where a matter requires representation, it is coordinated through empanelled advocates. [PLACEHOLDER — owner to confirm empanelled advocate names and registration details.]",
        ],
      },
      {
        heading: "Payment recovery",
        paragraphs: [
          "Recovery engagements described on the Legal page are carried out by our partner venture Artha at artharecovery.in. Recovery work, its terms and its outcomes are that venture's responsibility.",
        ],
      },
      {
        heading: "No guaranteed outcome",
        paragraphs: [
          "We do not guarantee any particular refund, assessment result, recovery amount, approval or business outcome. Where a page describes what a service does, it describes the work performed, not a promised result.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [CONTACT_LINE],
      },
    ],
  },
];

export const getPolicy = (slug: string) => policies.find((p) => p.slug === slug);
