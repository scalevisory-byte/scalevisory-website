# Putting the site on scalevisory.in

The repo side is ready. The only step that cannot be done from here is changing
the DNS records, because that needs the GoDaddy login.

**Where things stand**, read off the live DNS on 30 September 2026:

| | |
|---|---|
| Nameservers | `ns59.domaincontrol.com`, `ns60.domaincontrol.com` — **GoDaddy** |
| A records on `scalevisory.in` | `15.197.225.128`, `3.33.251.168` (TTL 3600) |
| `www` | CNAME → `scalevisory.in` |
| MX records | **none** |
| TXT records | **none** |

Two things follow from that.

**The DNS is managed at GoDaddy**, so that is where the records change — not
wherever the domain was bought, if those differ.

**Those A records are GoDaddy's Domain Forwarding**, not a website. That pair
of addresses is what GoDaddy points a domain at when forwarding is switched on.
This matters for one reason: **forwarding has to be turned off first.** While it
is on, GoDaddy keeps rewriting the A records back to those two addresses, so
adding GitHub's and leaving forwarding on means the change silently undoes
itself. That is the single most common way this goes wrong.

There are **no MX and no TXT records**, so no email and no verification records
run on this domain today — there is nothing to break. (If any get added later,
leave them alone; the records below only affect the website.)

---

## Step 1 — turn off Domain Forwarding

GoDaddy → **My Products** → next to `scalevisory.in`, **DNS** → **Domain
Forwarding** (it may sit under a "Forwarding" tab or at the bottom of the DNS
page). Delete the forwarding rule.

Do this before Step 2, not after.

## Step 2 — add the DNS records

GoDaddy → **DNS** → **Manage Zones** / **DNS Records** for `scalevisory.in`.

First **delete** the two existing A records on `@` (`15.197.225.128` and
`3.33.251.168`) and the `www` CNAME that points at `scalevisory.in`. Then add:

**Four A records on the apex** (host `@`, or blank, or `scalevisory.in`
depending on the panel):

| Type | Host | Value | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | default |
| A | @ | 185.199.109.153 | default |
| A | @ | 185.199.110.153 | default |
| A | @ | 185.199.111.153 | default |

All four. GitHub serves from all of them and having only one is fragile.

**One CNAME for www:**

| Type | Host | Value | TTL |
|---|---|---|---|
| CNAME | www | scalevisory-byte.github.io | default |

Note the trailing dot some panels want: `scalevisory-byte.github.io.`

**Optional, IPv6.** Only if the panel supports AAAA records:
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`,
`2606:50c0:8003::153`, all on `@`.

## Step 3 — wait for it to take

The current records have a one-hour TTL, so reckon on up to an hour. GoDaddy
may still say 24 hours in its own warning; the TTL is the number that matters.
It has worked when this returns the four 185.199.x addresses:

```
dig +short scalevisory.in
```

or, without `dig`:

```
getent hosts scalevisory.in
```

## Step 4 — flip the switch (one commit)

Adding the file `public/CNAME` containing `scalevisory.in` is the whole cutover.
The deploy workflow reads it:

- **file present** → the site is built for the root of a custom domain, with no
  path prefix, and the same file tells GitHub Pages which domain to answer on;
- **file absent** → the site is built for `github.io/scalevisory-website/`, the
  way it is now.

So there is nothing to hand-edit and nothing to get out of step. Ask Claude to
"add the CNAME file", or:

```
echo 'scalevisory.in' > public/CNAME
git add public/CNAME && git commit -m "Point the site at scalevisory.in" && git push
```

Rolling back is deleting the same file.

## Step 5 — turn on HTTPS

Once the deploy is green, open **Settings → Pages** on the repo. The custom
domain should already read `scalevisory.in`. GitHub will spend a few minutes
issuing a certificate; when **Enforce HTTPS** stops being greyed out, tick it.

Until that tick, the site answers on `http://` only, and the padlock is missing.

## Step 6 — afterwards

- Visit `https://scalevisory.in`, `https://www.scalevisory.in` and a couple of
  deep pages such as `/services/accounting` and `/travel-agency-accounting`.
  The old `github.io/scalevisory-website/` URL will redirect to the new domain
  on its own.
- Add the property in **Google Search Console** and submit
  `https://scalevisory.in/sitemap.xml`.

---

## What is already done

- Every page's canonical URL and the sitemap already name `https://scalevisory.in`,
  so the github.io preview never competes with the real domain in search. The
  homepage, About, Contact and Training were missing a canonical tag and now
  have one.
- The deploy workflow derives the base path from `public/CNAME`, as above.
- The root-path build has been checked end to end: 32 internal pages crawled,
  no broken pages, no broken images, stylesheets loading, no console errors.

## Still outstanding before launch

Unrelated to DNS, but worth clearing at the same time:

- `[PLACEHOLDER]` markers in `src/lib/content/policies.ts` — the empanelled
  advocate names, and the privacy policy's effective date.
- The terms and disclaimer have not had a legal read.
- The six items at the top of `DESIGN-AUDIT.md`, the first of which is the
  contact form's missing focus ring.
