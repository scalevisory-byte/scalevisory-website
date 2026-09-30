# Putting the site on scalevisory.in

The repo side is ready. The only step that cannot be done from here is adding
the DNS records, because that needs the login for wherever the domain is
registered.

**Where things stand:** `scalevisory.in` currently resolves to `15.197.225.128`
and `3.33.251.168`. Those are not GitHub's — the domain is still pointing at
whatever it was set to before (a registrar parking or forwarding service).
`artharecovery.in`, for comparison, already resolves to the four GitHub Pages
addresses, so that one is set up the way this one needs to be.

---

## Step 1 — check nothing is live on the domain first

Open `https://scalevisory.in` in a browser. If a real website answers, changing
these records takes it down. Do not go further until you are sure that either
nothing is there, or what is there is meant to be replaced by this site.

Also note any **email** on the domain (MX records, Google Workspace, Zoho).
The records below only change where the *website* points. Leave every MX and
TXT record exactly as it is — deleting those is what breaks email.

## Step 2 — add the DNS records

At the registrar's DNS panel for `scalevisory.in`:

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

**Remove** any existing A, AAAA or CNAME record on `@` or `www` that points
somewhere else — otherwise the old destination keeps answering half the time.

**Optional, IPv6.** Only if the panel supports AAAA records:
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`,
`2606:50c0:8003::153`, all on `@`.

## Step 3 — wait for it to take

Usually ten minutes to an hour; the registrar may say up to 24 hours. It has
worked when this returns the 185.199.x addresses:

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
