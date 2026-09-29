# Scale Visory — project context for Claude Code

## What this is
Website + future business platform for Scale Visory (Surat accounting / taxation / legal / business consultancy firm). Tagline: "Balancing The Unbalanced". Owner: Dinesh Parmar.

## Current state (public site on the V1 sitemap; builds clean)
Next.js 16 App Router + TypeScript + Tailwind, exported to static HTML. No database. See README.md for setup.
- **Services** — 4 core services in `src/lib/content/services.ts`, each with `sections[]` (decision #1 fold applied).
  Old six slugs 301 in `next.config.mjs`.
- **Consultancy sub-pages** — `src/lib/content/consultancy.ts` -> `/services/business-consultancy/[sub]`:
  why-isnt-your-business-growing, ai-automation, monthly-business-advisory
- **Industries** — `src/lib/content/industries.ts` -> `/industries` + `/industries/[slug]`.
  Travel's canonical page is `/travel-agency-accounting`; `/industries/travel-agencies` 301s to it (decision #6).
  An industry with `href` set is excluded from `/industries/[slug]` via `routedIndustries`.
- **Resources** — `src/lib/content/resources.ts`, 5 categories -> `/resources`, `/resources/[category]`,
  and posts from `src/lib/content/posts.ts`. `categorySlug()` also maps the pre-V1 category names
  ("GST", "Income Tax", ...) so older posts keep resolving. The `/blog` routes are gone — the site was never
  live under them.
- **Policies** — `src/lib/content/policies.ts` -> `/privacy-policy`, `/terms`, `/disclaimer` (footer only, never main nav)
- **SEO** — per-page `alternates.canonical`; `Breadcrumbs` emits BreadcrumbList; `JsonLd` emits AccountingService (home),
  Service (service pages), FAQPage (travel), Article (posts). `sitemap.ts` covers every route.
- No admin panel and no database — see the deployment section above
- External links in nav: Careers -> https://zyntajobs.in, Payment recovery -> https://artharecovery.in (built separately — do NOT rebuild a job portal or recovery module here)

## Not built yet (V1 remainder)
Phases 1 and 5-7 of `docs/PLATFORM-PLAN.md`: migrations for the V1 tables, RBAC + roles/permissions, audit triggers,
`tenant_id` (decision #8), the multi-step consultation form and lead pipeline, admin-editable service/industry content,
FAQs/testimonials/team tables, settings, and the admin dashboard. Page content is hardcoded in `src/lib/content/*` —
those files are the seed for the admin-editable tables when Phase 1 lands.

## How this site is deployed (READ FIRST)
**Static export on GitHub Pages.** `next build` writes plain HTML/CSS/JS to `out/`; the workflow in
`.github/workflows/deploy.yml` publishes it on every push to `main`. There is **no server and no database**.

What that rules out — do not reintroduce any of these without moving off GitHub Pages first:
- server actions (`"use server"`), route handlers, `middleware`/`proxy`
- `cookies()`, `headers()`, or anything that forces dynamic rendering
- `redirects()` / `rewrites()` in `next.config.mjs` (a static host cannot issue them)
- ISR / `revalidate`; `sitemap.ts` and `robots.ts` are pinned with `export const dynamic = "force-static"`
- every dynamic route needs `generateStaticParams`, and it must return **at least one** entry or the build fails

Consequences already handled:
- **Enquiry forms** (`src/components/InquiryForm.tsx`) build a WhatsApp message on the visitor's device and open
  `wa.me`. Nothing is transmitted to or stored by the site. The privacy policy and terms say exactly this — if the
  form ever changes, update `src/lib/content/policies.ts` in the same commit.
- **Admin panel, Supabase and all server actions are gone.** Posts live in `src/lib/content/posts.ts` (currently
  empty; see the note in that file about restoring the post route with the first post).
- **Legacy URLs** are real pages that meta-refresh + canonical to the new URL (`src/components/LegacyRedirect.tsx`),
  since 301s are impossible here. `noindex` comes from each route's `generateMetadata`.

## Framework
Next 16 + React 19 (upgraded from 14.2.15, which had a critical unauthenticated RCE with no patched 14.x).
`npm audit`: 0 vulnerabilities. Things the upgrade changed that are easy to undo by accident:
- `params` is a `Promise` in every page and `generateMetadata` — `await params`. `generateStaticParams` is unchanged.
- Forms use React 19's `useActionState` (from `react`), not `useFormState`.
- `next lint` was removed in Next 16 (it exits 0 without checking), so `npm run typecheck` is the gate.
  **ESLint is not configured** and never was.

## If you ever need the server back
Forms that store leads, an admin panel and a blog editor all need a host that runs code (Vercel) plus a database
(Supabase). The content in `src/lib/content/*` is deliberately independent of any data source, so the move is
additive — nothing here has to be rewritten. The pre-static version is in git history on `main` before the
static-export commit.

## Where this is going (V1 — approved plan)
`docs/PLATFORM-PLAN.md` is the source of truth: sitemap, 4 core services (Accounting, Taxation, Legal, Business Consultancy), industries, resources (5 categories), consultation form → lead management, RBAC admin CMS, SEO, security, infra, V2 client portal, V3 AI.
Open decisions are in §17 of that doc — ask before implementing anything that depends on them.

## Domain
**`scalevisory.in`** is the live domain (owner-confirmed) — not `.com`, which earlier drafts of this file and
PLATFORM-PLAN assumed. It lives in one place: `site.url` in `src/lib/content/site.ts`, overridable with
`NEXT_PUBLIC_SITE_URL`. That single value drives canonicals, sitemap.xml, robots.txt, breadcrumbs and all JSON-LD,
so never hardcode the host anywhere else.
Contact mailbox is `info@scalevisory.in`, still pending DNS verification (decision #5).
Open: whether the firm also owns `scalevisory.com` and wants it 301'd to `.in` — ask before configuring it.

## Logo
Official artwork, owner-supplied — the placeholder SVG mark is gone. `src/components/Logo.tsx` renders
`public/logo.png` (full colour, for light grounds) or `public/logo-white.png` (all white, for navy grounds via the
`light` prop). Both are transparent PNGs, trimmed to the artwork and derived from the owner's master file; the source
had a solid near-white background, which was keyed out.
The lockup already contains the wordmark, "Accounting | Taxation | Legal" and the tagline, so **never set text beside
it** and never repeat the tagline directly under it.
`public/icon.png` (512px) and `src/app/favicon.ico` are the mark alone, cropped from the same artwork.
The lockup is ~4.8:1 and much wider than the old mark: the desktop nav is held back to `xl` because of it, so
re-check the header at 1280px before adding any nav item.

## Brand (apply exactly)
Navy #073574, sky #10A9E8, off-white #F8FAFC. Montserrat (headings) + Inter (body). Premium corporate tone, no stock-photo clichés, no cartoon icons. Office: G-59, VIP Plaza, VIP Road, Vesu, Surat – 395007. Phone/WhatsApp: +91 99099 93565. "12+ years" in messaging.

## Working rules
- Keep deliverables scoped to exactly what's asked; don't add extra tabs/modules unasked
- Never rename account/ledger/party/service names the owner gives; keep his order and numbering
- Never invent testimonials, certifications, client counts, awards or legal claims — use placeholders
- Hinglish is fine in docs/instructions for the owner; site copy stays English
- Migrations: add new SQL under `supabase/migrations/` (don't edit schema.sql in place after V1 starts)
- Service-role key is server-only (`createAdminClient` in `src/lib/supabase/server.ts`); never expose it
- Run `npx tsc --noEmit && npm run build` before saying anything is done

## Commands
npm install · npm run dev · npm run build
Env: copy `.env.example` → `.env.local`

## Decisions taken (owner-approved defaults — proceed without re-asking)
1. **Four core services only**: Accounting, Taxation, Legal, Business Consultancy. Fold the current six as follows —
   Compliance & Regulatory → statutory items into Taxation, ROC/corporate/licence docs into Legal;
   Business Advisory → Business Consultancy; Internal Audit → "Financial Internal Audit" section inside Accounting
   and "Business Internal Audit" section inside Business Consultancy. Add 301 redirects from the old six slugs.
2. **Payment recovery**: Legal §C "Legal Notices & Recovery — Recover What Is Yours" stays as a described service on the
   Legal page, but every recovery CTA links out to https://artharecovery.in. No recovery module, forms or data here.
3. **Training institute**: keep `/training` and its nav item as-is.
4. **Legal scope**: Legal pages describe advisory and documentation services only. Court/tribunal/authority representation
   is worded as "coordinated through empanelled advocates". Advocate names are `[PLACEHOLDER — owner to confirm]`.
   Legal Service Disclaimer must state this distinction.
5. **Email / logo / content**: sender `info@scalevisory.in` pending DNS verification (use as placeholder in Settings);
   logo — DONE, owner supplied the official artwork (see Logo below); testimonials, team, FAQs,
   credentials are empty-by-default and hidden until filled from admin.
6. `/travel-agency-accounting` = the canonical SEO landing; `/industries/travel-agencies` redirects (301) to it.
7. Admin "website visitors" = link to GA4, not an API integration.
8. Add `tenant_id` to leads/posts/settings now (nullable, default Scale Visory) for possible multi-venture reuse.
9. Lead PII retention: lost leads purged after 24 months (documented in privacy policy).
