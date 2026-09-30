/**
 * Resource posts.
 *
 * The site is a static export on GitHub Pages — there is no database and no
 * admin editor, so posts live here in code. To publish one, add an entry to
 * `posts` below and push; the build generates its page, adds it to the sitemap
 * and the RSS feed, and lists it under its category.
 *
 * `category` must be one of the `name` values in `resources.ts`.
 * `content` uses the same mini-markdown the site has always used:
 *   blank line = new paragraph · `## ` heading · `### ` sub-heading
 *   `- ` bullet · `**bold**`
 * Dates are ISO (YYYY-MM-DD).
 *
 * A NOTE ON WHAT BELONGS HERE. These three were written from pages the owner
 * has already approved — the travel landing page, the accounting service page
 * and the compliance calendar — restated for a reader arriving from search.
 * They deliberately carry no rate, threshold or due date that is not already
 * elsewhere on the site, because a rate published wrongly on an accounting
 * firm's website is worse than no post at all. Anything with a number in it
 * should be written or checked by someone at the firm.
 */

export interface Post {
  slug: string;
  title: string;
  category: string;
  /** Shown in listings and as the meta description. Keep it under ~160 chars. */
  excerpt: string;
  date: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "why-travel-accounting-is-different",
    title: "Why travel accounting is different from every other business",
    category: "Articles",
    excerpt:
      "Money moves through a travel business that is not its revenue. Get that one distinction wrong and the profit, the tax position and the supplier ledger all go wrong together.",
    date: "2026-09-18",
    content: `Most businesses have one question to answer at the end of a month: what did we sell, and what did it cost us. A travel business has three, and they do not line up.

## The money passing through is not yours

A customer pays for a package. Part of that is the airline's. Part is the hotel's. A part is yours. Treat the whole receipt as revenue and the books show a business several times larger and far less profitable than it is — and the tax position follows the books.

This is the distinction everything else rests on. Pass-through money and income have to be separated at the point the booking is recorded, not reconstructed at year end.

## Tax applies to a margin you have to compute

Depending on whether you are selling a package as a principal or earning a commission as an agent, the treatment differs — and it differs again for air ticketing. The right answer is not one answer. It is a treatment set per booking type, decided once and applied consistently, so entries are booked correctly rather than corrected at return-filing time.

Overseas packages bring their own collection and reporting obligation on top of that, with its own deposit schedule and its own return.

## Every booking touches three ledgers

Your customer. Your supplier. And in most agencies, a consolidator sitting between you and the airline. A single amendment or cancellation hits all three at different times, and credit notes tend to arrive after the period has closed.

That is why supplier ledgers in travel businesses drift. Not carelessness — timing. The fix is a monthly reconciliation cycle where balances are confirmed from the other side rather than assumed.

## Advances are not revenue

Customers pay months before they travel. That money sits with you, and it is tempting to read a healthy bank balance as a good quarter. It is not revenue until the service is delivered. Recording it as an advance and recognising it on departure does two things: it stops profit being overstated, and it makes the real cash position visible — which matters, because a lot of that balance is already owed to somebody.

## What we do about it

- Booking-level accounting that separates pass-through money from income
- Tax treatment set per booking type at the start of the engagement
- Supplier, airline and consolidator reconciliation on a monthly cycle
- Margin reporting by product — domestic, outbound, ticketing, visa

If you run a travel business and any of this sounds like your last year-end, that is the conversation to have.`,
  },
  {
    slug: "what-a-monthly-close-should-give-you",
    title: "What a monthly close should actually give you",
    category: "Business Insights",
    excerpt:
      "If the monthly accounts arrive late and tell you nothing you can act on, the close is happening for the auditor rather than for you. Here is what to expect instead.",
    date: "2026-09-25",
    content: `Plenty of businesses get their books done. Fewer get anything out of them. The difference is not the software and it is not the size of the firm — it is whether the month is closed to a standard or simply recorded.

## A close has a date

If the previous month's numbers turn up somewhere in the middle of the next one, every decision they might have informed has already been taken. A close is a deadline, not an activity. Entries during the month, reconciliation at the end of it, statements out while they still matter.

## The bank agrees. So does the portal. So does the party.

Three reconciliations decide whether the numbers are real:

- **Bank, card and payment gateway** — the cash is what the books say it is
- **Input credit against the portal** — what you claimed matches what your suppliers filed
- **Party balances** — confirmed from the other side, not assumed from your own ledger

Skip these and everything downstream is an estimate wearing the costume of a fact.

## You can read it in ten minutes

A monthly pack that needs an accountant to interpret it has failed. What an owner needs is short: what came in, what went out, what is owed to you, what you owe, and what changed since last month. The detail should exist and be available — it should not be the thing you are handed.

## It points at a decision

The useful question is never "what were the numbers". It is "what do they mean I should do". Receivables stretching means a collection problem or a pricing one. Margin slipping on one product line and not the others is a sourcing question. A month that closes without raising anything has usually not been looked at.

## The test

Ask for last month's accounts. If they exist, agree with the bank, and you can read them without help — the close is working. If any of the three fails, that is where to start.`,
  },
  {
    slug: "how-to-use-a-compliance-calendar",
    title: "A compliance calendar is only useful if it is yours",
    category: "Articles",
    excerpt:
      "Generic due-date lists are everywhere, and most of them do not apply to you. Two businesses on the same street can have entirely different calendars.",
    date: "2026-09-29",
    content: `We publish a compliance calendar and it updates itself every day. It is genuinely useful — and it is also the wrong calendar for most people who read it.

## The same date means different things

Two businesses in the same market, on the same turnover, can sit on completely different filing schedules. One files a summary return every month. The other, on the quarterly scheme, pays in two of the three months and files once. Same tax, same portal, different calendar.

Add a payroll obligation to one and not the other, an audit threshold crossed by one and not the other, a company structure on one side and a proprietorship on the other, and the two lists stop resembling each other at all.

## What a general list is for

It is a prompt. It tells you roughly when the month gets busy and which authority is about to want something. That is worth having on a wall.

What it cannot tell you is which lines are yours, which thresholds you have crossed since last year, or whether a date has been extended — and extensions do get notified, often late, and a general list will not know.

## Turning it into yours

Three questions do most of the work:

- **Which returns am I actually registered for?** Not which ones exist — which ones name me.
- **What changed this year?** Turnover past a threshold, a first employee, a new registration, a new state. Each one adds lines.
- **Who is watching the extensions?** Somebody has to be, and it should not be you at 11pm on a due date.

## The honest version

Most owners do not want a calendar. They want to not think about the calendar. That is a reasonable thing to want, and it is most of what we actually do — dates tracked on a calendar we keep, filings prepared ahead of them, and a reminder from a person rather than a portal notification.

If you want to know which of those dates are yours, that is a short conversation.`,
  },
];

export const publishedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
