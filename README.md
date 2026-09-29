# Scale Visory — Website

Next.js 16 (App Router, TypeScript, Tailwind), **exported to static HTML** and hosted free on GitHub Pages.
Koi server nahi, koi database nahi — bilkul artharecovery.in jaisa setup.

Pages: Home, About, 4 core services (Accounting, Taxation, Legal, Business Consultancy) + 3 Consultancy sub-pages,
Industries + travel-agency SEO landing, Resources (5 categories), Training Institute, Contact, policy pages.
SEO: metadata, canonicals, sitemap.xml, robots.txt, JSON-LD (business, service, FAQ, breadcrumbs).

## Local pe chalana

```
npm install
npm run dev        # http://localhost:3000
```

Build aur static output dekhna:

```
npm run typecheck  # tsc --noEmit
npm run build      # out/ folder mein plain HTML ban jayegi
npm run preview    # out/ ko waise serve karta hai jaise GitHub Pages karega
```

`.env.example` ko `.env.local` bana lo — saare env vars **optional** hain (analytics aur chat widget ke liye).

## Live kaise hota hai

`main` pe push karte hi GitHub Actions (`.github/workflows/deploy.yml`) build karke GitHub Pages pe daal deta hai.
Aur kuch karne ki zaroorat nahi.

Ek baar ka setup (owner ko karna hai):
1. Repo → **Settings → Pages → Source: GitHub Actions**
2. Repo → **Settings → Pages → Custom domain**: `scalevisory.in`, phir **Enforce HTTPS** ✅
3. Domain registrar ke DNS mein:
   - `A` records apex (`scalevisory.in`) ke liye → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` `www` ke liye → `scalevisory-byte.github.io`
4. [Google Search Console](https://search.google.com/search-console) mein `https://scalevisory.in/sitemap.xml` submit karo

## Content badalna hai?

Saara text `src/lib/content/` mein hai — code chhede bina badal sakte ho:

| Kya | Kahan |
|---|---|
| Phone, email, address, hours, socials, nav | `site.ts` |
| 4 services ka poora text | `services.ts` |
| Consultancy sub-pages | `consultancy.ts` |
| Industries | `industries.ts` |
| Resources categories | `resources.ts` |
| Blog/resource posts | `posts.ts` |
| Privacy / Terms / Disclaimer | `policies.ts` |
| Training courses | `src/app/training/page.tsx` (top pe `courses`) |
| Logo | `public/logo.png`, `public/logo-white.png` |

## Forms kaise kaam karte hain

Static site hai, to form kahin submit nahi hota. Visitor form bharta hai → uske phone pe **WhatsApp khulta hai**
details ke saath → wo send dabata hai. Kuch bhi website pe store nahi hota.

Privacy policy aur terms mein yahi likha hai. **Form badlo to wo pages bhi usi commit mein update karna.**

## Aage chal ke agar leads store karni hon

Tab GitHub Pages kaafi nahi hoga — Vercel (server) + Supabase (database) chahiye. Tab milega: inquiries ka record,
admin panel, aur khud se blog likhne ki facility. Content files waise ke waise chalenge, sirf form aur admin wapas
jodne honge.
