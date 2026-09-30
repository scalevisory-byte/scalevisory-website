# Design & graphics audit

Scale Visory website — audited at commit `a1f91f5`, 30 September 2026.

Scope: the drawn graphics, the icon set, the photography, the type scale, the
colour system and the accessibility of both. Ten pages were rendered at 1440px
and 390px, plus every hero slide, and every measurement below was taken off the
built static export, not read out of the source.

Nothing here is fixed yet. Findings are ordered by how much they cost the page.

---

## Summary

The system underneath is in good shape. The whole site runs on 21 distinct
colours, 4 corner radii and 1 shadow — that discipline is unusual and worth
keeping. The drawn compositions share a real visual language, and the homepage
now reads like an established firm's.

What lets it down is unevenness rather than bad work: the same drawing used on
two slides, artwork framed differently in each slide so it jumps as the carousel
turns, three different eyebrow treatments on one page, a heading scale that
holds on the homepage and is overridden on almost every other page, and gold
used at sizes where it is legally too faint to read.

Counts: **11 graphics findings, 6 consistency findings, 6 accessibility
findings.** Six are worth fixing before the domain is cut over.

---

## A. Graphics

### A1 — The same drawing serves two slides · **high**

`src/components/HeroCarousel.tsx` — slide 1 (Accounting) and slide 4 (Travel
agents) both declare `visual: "dashboard"`.

On desktop this hides, because both slides put a photograph over the right-hand
panel. Below 1024px the photograph is dropped and the drawing takes over, so a
tablet or phone visitor sees the identical picture on two of the seven slides.

Fix: give travel its own composition — a booking with a TCS line and a supplier
ledger would say something the dashboard does not.

### A2 — Each composition is framed differently · **high**

All six drawings share a 560×440 canvas, but they sit in different parts of it:

| Composition | Occupies |
|---|---|
| `dashboard` | fills the frame, anchored top-left |
| `calendar` | shifted right and up; a dark card is cut off bottom-left |
| `advisory` | floats top-right; the bottom-left quarter is empty |
| `reports` | anchored bottom-left; the top-right quarter is empty |
| `recovery` | centred and balanced |
| `careers` | centred and balanced |

Because the slides cross-fade in place, the artwork appears to jump around the
panel as the carousel turns. `recovery` and `careers` are the ones to match.

Fix: settle on a common safe area — say a 500×380 box centred in the canvas —
and bring the other four into it.

### A3 — `dashboard`'s accent card reads as a stray block on navy · **medium**

`src/components/HeroVisual.tsx:6` — `<rect x="392" y="60" width="142" height="92"
fill={SKY} opacity="0.14" />`, commented "Accent card peeking out behind, for
depth". The main card covers it to x=498, so only a 36px sliver shows.

That worked when the hero was white. Since the hero went dark the sliver has no
card to peek out from and reads as a rendering artifact at the right edge.
`calendar` has the same problem bottom-left.

Fix: either widen the accent card so it reads as a deliberate layer, or drop it —
the drop shadow already carries the depth.

### A4 — `handshake` is not legible · **medium**

At 24–28px it reads as a zigzag or a heart, not two hands. It is the weakest
glyph in the set and it sits on a "why us" card where it has to carry meaning.

### A5 — `shield` and `shieldCheck` are the same glyph · **low**

`src/components/Icon.tsx:14` and `:26` are byte-identical. Two names, one
drawing. Harmless but confusing for whoever adds the next icon.

### A6 — Icons vary a lot in optical size · **medium**

Drawn on a 24×24 grid, but the ink does not fill it consistently:

- **Small:** `chart`, `cloud`, `sector`, `crane` — these use roughly the middle
  half of the grid.
- **Full:** `plane`, `scales`, `bag`, `rocket`, `hotel`.

Put `crane` and `hotel` next to each other — as the Infrastructure and
Hospitality cards do — and the crane looks like a mistake. Same for `chart`
against `bars`.

Fix: normalise every glyph to the same cap height and the same visual weight
inside the grid.

### A7 — `rocket` and `box` break the set's style · **low**

`rocket`'s fins read as detached from the body, and it resembles a bulb more
than a rocket. `box` is drawn isometrically and is the only dimensional glyph in
an otherwise flat, single-plane line set.

### A8 — The drawings use a green that is not a design token · **low**

`src/components/HeroVisual.tsx:21` — `const GREEN = "#16916B"`, used for the
positive delta chips and the status pills. It is not in `tailwind.config.ts`, so
nothing else on the site can match it and nobody editing the palette would know
it exists.

Fix: add it as `positive` in the Tailwind theme, or reuse sky for "good".

### A9 — `/industries` shows no icons · **medium**

Every industry now carries an `icon` (added for the homepage cards), but
`src/app/industries/page.tsx` renders the list as plain text rows. The homepage
gives each sector an icon and the page it links to does not, so the two do not
look like the same site.

### A10 — Every interior page header has an empty right half · **high**

`/services`, `/industries`, `/travel-agency-accounting`, `/training`, `/about`,
`/contact` and the detail pages all open with a navy band carrying a title and a
short paragraph in the left 50%. The right 50% is blank navy on every one.

On the homepage that space holds a photograph or a drawing. On the interior
pages it reads as unfinished — and it is the first thing a visitor sees on each.

Fix: reuse the existing compositions per section (`calendar` on taxation,
`advisory` on consultancy, `reports` on accounting), or put a quiet geometric
mark there. Anything beats empty.

### A11 — Photography is thin and unoptimised · **medium**

Two photographs in the whole project:

| File | Pixels | Shown at | Weight |
|---|---|---|---|
| `public/hero/office.jpg` | 1480×1020 | 893×619 CSS | 150 KB |
| `public/hero/travel.jpg` | 1492×1184 | 893×619 CSS | 169 KB |

Three problems:

1. **Slightly under-resolution on retina.** 893 CSS px needs 1786px at 2× DPR;
   both files are around 1480. The hero is therefore a touch soft on a modern
   laptop — the same defect the logo had before it was recut.
2. **No modern format.** Both are JPEG. WebP at the same visual quality would
   save roughly 40%. `next/image` cannot help (static export sets
   `images.unoptimized`), so this needs a `<picture>` with a WebP source.
3. **Everything loads eagerly.** No `loading="lazy"` anywhere, so `travel.jpg`
   (169 KB, on an inactive slide) and `logo-white.png` (footer) are fetched
   before anything needs them. `office.jpg` is the LCP element and carries no
   `fetchpriority="high"` or preload, which is the opposite of what it needs.

The homepage still only weighs 459 KB over 13 requests, which is light. This is
headroom being wasted, not a crisis.

---

## B. Consistency

### B1 — Three eyebrow treatments on the homepage · **high**

| Label | Treatment |
|---|---|
| Our services, Industries | gold + short gold rule |
| Specialization, Why us, Process, Also from Scale Visory | sky, no rule |
| The practice | muted grey, no rule |

Same element, three looks, one scroll. The gold-plus-rule version is the one the
reference layout established.

### B2 — The heading scale does not hold across pages · **high**

`globals.css` sets `h2` to 40px Playfair. **29 of 39 `<h2>` uses override it to
`text-2xl` (24px)**, one to `text-xl`.

So homepage section heads are 40px serif and almost every interior page's are
24px. That is why `/about` and `/services` read flat next to the homepage — the
type is doing none of the work there.

Fix: decide what a section head is, set it once, and delete the overrides. If
interior pages genuinely need a smaller head, that is a third level (`h3`), not
an override on `h2`.

### B3 — Card CTAs do not bottom-align · **medium**

On the homepage services row and the `/services` cards, the "Learn more →" and
"Full details" links sit directly under text of varying length, so they land at
different heights across a row while the cards themselves are equal height. The
ragged line of links is visible at a glance.

Specialized Solutions does this correctly (`flex-1` on the body pushes the link
down) — the same treatment is what the others need.

### B4 — Section numbering differs between pages · **low**

Homepage "How We Work" numbers the steps 01–04 in 30px gold. `/services` numbers
the four services 01–04 in 14px sky. Same device, two designs.

### B5 — Three dark bands run together on the homepage · **medium**

Industries (navy-deep) → Travel (navy) → Why Us (navy) is a long unbroken dark
stretch, roughly 1,400px of scroll. The tonal shift between deep and regular
navy is too small to break it up.

Fix: lift Why Us onto paper, or move it above Industries.

### B6 — The footer repeats what the logo already says · **low**

`src/components/Footer.tsx` prints "Accounting | Taxation | Legal" and
"Balancing The Unbalanced" as text immediately under a logo that contains both
lines. It reads as a mistake.

---

## C. Accessibility

Measured against WCAG 2.2 AA. Ratios computed from the rendered pixels.

### C1 — Gold fails contrast everywhere it is used on light · **high**

| Use | Ratio | Needs |
|---|---|---|
| "Our services" / "Industries" eyebrow, 12px bold on `#F5F8FC` | **2.77** | 4.5 |
| "01–04" step numbers, 30px bold on `#F8FAFC` | **2.82** | 3.0 |
| gold on white | **2.95** | 4.5 |

`#B8912F` is simply too light for small text on a near-white ground. On navy it
reaches 4.03, which passes for large text only.

Fix: darken the gold for text use — around `#8A6B1F` clears 4.5:1 on paper —
and keep `#B8912F` for rules, borders and fills, where contrast rules do not
apply. That keeps the accent looking the same while making the words readable.

### C2 — Sky fails contrast as small text on white · **high**

The sky eyebrows ("Process", "Also from Scale Visory") measure **2.67:1** on
white against a 4.5 requirement. On navy sky reaches 4.44 — still 0.06 short.
On navy-deep it is fine at 5.61.

Fix: navy or the darkened gold for eyebrows on light grounds. Sky stays for
links, fills and accents on dark.

### C3 — Carousel dots are 8×8px · **high**

Seven dots at 8×8 (the active one 28×8) with 10px gaps. WCAG 2.5.8 asks for a
24×24 target. These are among the hardest things on the site to hit on a phone,
and they are the only way to reach slide 6 without waiting 30 seconds.

Fix: keep the dot the size it is and wrap it in a transparent 24×24 button.

### C4 — Form fields remove the focus ring · **medium**

`globals.css:37` — `.field` applies `focus:outline-none` and replaces the global
2px sky outline with a sky border. Sky on white is **2.67:1**, under the 3:1
that WCAG 2.2 requires of a focus indicator, and the field already has a border
so the only change is hue.

This is the one finding with a legal edge to it: it is the contact form, and
keyboard and low-vision users cannot see where they are in it.

Fix: drop `focus:outline-none` and let the global `:focus-visible` rule apply,
or give the field a 2px navy ring.

### C5 — Three labels sit below the 12px floor · **low**

The hero promise row ("On time, every time", "For real business needs", "Beyond
just compliance") is set at 11.5px. Everything else on the site holds at 12px or
above. They were shrunk to stop "Long-Term Partnership" wrapping; the right fix
is a wider column, not smaller type.

### C6 — Header nav links have 20px hit boxes · **low**

The `<a>` elements are 20px tall inside an 80px header, so the clickable area is
a thin strip rather than the space it appears to occupy. Padding on the link
rather than the container would fix it.

---

## What to do first

Six things, in order, would close most of the gap:

1. **C4** — restore the focus ring on form fields. Smallest fix, biggest duty.
2. **C1 + C2** — darken gold for text, move light-ground eyebrows off sky.
3. **B2** — settle the heading scale and delete the `text-2xl` overrides.
4. **A10** — put something in the right half of the interior page headers.
5. **B1** — one eyebrow treatment.
6. **A1 + A2** — a travel composition of its own, and a common safe area so the
   artwork stops moving between slides.

**A6** (icon optical sizing) and **A11** (WebP, lazy loading, bigger photos) are
the next tier. **A5**, **A8**, **B4** and **B6** are tidying.

---

*Method: static export served locally and rendered in Chromium. Contrast ratios
computed per element from the resolved foreground — blended with its background
where the colour carried alpha — against the nearest opaque ancestor background.
Screenshots taken at 1440px and 390px across the homepage, services, accounting,
industries, travel, training, about, contact, resources and terms, plus each of
the seven hero slides and all 26 icons on a reference grid.*
