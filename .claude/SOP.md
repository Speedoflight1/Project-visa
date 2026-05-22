# evisas.in — Master SOP
> Source of truth for the website. Read this before touching any file. Update the changelog after every change.
> Last updated: 2026-05-13

---

## THE RULE
> **Before starting:** Read this file.
> **After finishing:** Add a dated entry to the Changelog section below.
> **No exceptions.** Both Claude Code and Cowork follow this rule.

---

## 1. Site Overview

| Item | Detail |
|------|--------|
| **Live URL** | https://evisas.in |
| **Hosting** | GitHub Pages |
| **Deploy** | Auto-deploy via GitHub Actions on every push to `master` |
| **Repo** | github.com/Speedoflight1/Project-visa |
| **Branch** | `master` (always deploy from here) |
| **Tech stack** | Next.js 14, static export (`output: 'export'`), React 18 |
| **Build** | `npm run build` → outputs to `out/` → GitHub Actions deploys |
| **Domain** | `public/CNAME` contains `evisas.in` |

---

## 2. Key Files

| File | Purpose |
|------|---------|
| `app/layout.js` | Global layout — fonts, OG tags, GA4, Meta Pixel, Clarity, GSC verification |
| `app/page.js` | Homepage — full single-page app (client component) |
| `app/globals.css` | All site CSS |
| `app/[countryVisa]/page.js` | Template for 41 country pages |
| `app/[countryVisa]/WAButton.js` | WhatsApp button with GA4 click tracking |
| `lib/data.js` | ALL data — countries (DESTS), steps, features, plans, blogs, FAQs, policies |
| `public/sitemap.xml` | Sitemap — submitted to GSC |
| `public/robots.txt` | Robots file |
| `.claude/integrations.md` | Integration statuses — update this when adding/changing any tracking |

---

## 3. Pages & Sections (current state)

### Homepage (`app/page.js`)
One long React page with these sections in order:

1. **Loader** — 1.6s animated loader with logo icon
2. **Navbar** — Destinations · How It Works · Guaranteed · Pricing · Corporates · Blog · Apply Now →
3. **Mobile menu** — hamburger, same links
4. **Hero** — search bar + animated counters: 120+ destinations, 2L+ visas, 98% success, 24hr processing, 4.8★ rating
5. **Corporate marquee** — TCS, Google, Infosys, PepsiCo, Wipro, HCL Tech, Mahindra, Anglo Eastern, Flipkart, Coursera, Bajaj Finserv, Reliance
6. **Destinations** — region tabs (All / Asia / Europe / Middle East / Americas / Africa), 41-country card grid, default shows popular countries
7. **How It Works** — 4 steps: Search & Select → Upload Documents → We Handle It → Receive & Travel
8. **Features bento** — On-Time Guarantee, AI Document Checker, Live Tracking, Pay in INR, Expert Support, Group Applications
9. **Trust stats** — 2L+ Happy Travelers, 120+ Destinations, 98% Success Rate, 4.8★ Google Rating, 24/7 Expert Support, ₹0 Hidden Fees
10. **Testimonials** — 6 cards (Priya/Dubai, Rahul/Thailand, Ananya/Singapore, Vikram/Schengen, Sunita/US, Arjun/UK)
11. **Pricing** — 2 plans (see Section 4)
12. **Blog** — Visa guides rendered from `BLOGS` in data.js
13. **FAQ** — accordion, from `FAQS` in data.js
14. **CTA** — "Apply for a Visa →" + "Talk to an Expert"
15. **Footer** — brand, destinations (UAE/USA/Singapore/France/UK/Thailand), company, support links
16. **WhatsApp float** — bottom-right sticky button, always visible

### Slide-in panels (all within homepage, no separate URLs)
- **Country detail** — requirements, what's included, apply CTA, guarantee notice
- **Blog article viewer** — full article with hero image
- **Guarantee page** — what's covered, what's not, stats
- **B2B/Corporates page** — enterprise features, contact form → WhatsApp
- **Policy pages** — Refund Policy, Privacy Policy, Terms of Service (from `POLICIES` in data.js)
- **About Us** — story, stats, TravelKart Group mention
- **Apply modal** — form (name, email, destination, travel date) → opens WhatsApp with pre-filled message

### Country pages (`app/[countryVisa]/page.js`)
- **41 static pages**, URL format: `https://evisas.in/{country}-visa-from-india`
- Exception: UAE slug is `dubai` → URL is `/dubai-visa-from-india`
- Each page has: navbar (with logo + WhatsApp CTA), hero with visa stats (type, processing, validity, price, success rate), Documents Required, What's Included, Country Info, CTA card, Guarantee strip, footer
- WhatsApp clicks tracked via `WAButton.js` component → GA4 `whatsapp_click` event with country name as label

---

## 4. Pricing (current)

| Plan | Price | Key includes | Featured |
|------|-------|-------------|---------|
| **Visa Secure** | ₹499 / visa | Single application, priority WA, dedicated expert | No |
| **Dummy Tickets Plan** | ₹1,999 / visa | Everything above + hotel booking, dummy airline ticket, travel insurance | Yes (most popular) |

**Business rule:** No upfront full fee — complete fees charged only after visa approval.

---

## 5. Business Decisions

| Decision | Value | Notes |
|----------|-------|-------|
| WhatsApp number | +91 86196 66129 | Used everywhere; do not change without updating all occurrences in data.js + layout |
| WA number format in links | `918619666129` | No + sign in `wa.me/` links |
| Guarantee | On-time delivery or full service fee refund | Not applicable if applicant provides wrong info or applies too late |
| Target audience | Indian passport holders | All copy assumes Indian traveler applying from India |
| Pricing currency | INR only | No forex, no hidden fees — core brand promise |
| Parent company | TravelKart Group | Mentioned in About Us section |
| Founded | 2019 | "5+ years of experience" used in copy |
| Success rate | 98% | Used in hero stats and throughout |
| Email | info@evisas.in | In footer and About page |
| Office address | G9 Tower C, Bhutani Alphathum, Sector 90, Noida UP 201304 | In footer and JSON-LD schema |
| Instagram | instagram.com/evisas.in | Only social actively promoted |
| LinkedIn | linkedin.com/company/108114664/ | In footer social row |

---

## 6. Integrations

| Integration | Status | ID / Account | Where to manage |
|-------------|--------|--------------|-----------------|
| GA4 | ✅ Live | `G-7HM8W0STLC` | analytics.google.com |
| Meta Pixel | ✅ Live | `2460365381005611` | business.facebook.com → Events Manager |
| Microsoft Clarity | ✅ Live | `wq4abhggfm` | clarity.microsoft.com |
| WhatsApp click events | ✅ Live | GA4 event: `whatsapp_click` | GA4 → Reports → Events |
| Google Search Console | ✅ Live | Verified via HTML tag | search.google.com/search-console |
| Google Ads tag | 🔜 Stubbed | Replace `AW-XXXXXXXXXX` in `app/layout.js` | ads.google.com (when account created) |

**Full integration details and pending actions:** see `.claude/integrations.md`

---

## 7. SEO Setup

| Item | Status | Location |
|------|--------|---------|
| sitemap.xml | ✅ Live | `https://evisas.in/sitemap.xml` — submitted to GSC |
| robots.txt | ✅ Live | `https://evisas.in/robots.txt` |
| OG / Twitter meta | ✅ Live | All pages via `app/layout.js` metadata |
| Canonical tags | ✅ Live | Homepage + all 41 country pages |
| JSON-LD schema | ✅ Live | Organization (homepage) + Service (each country page) |
| GSC verification | ✅ Live | `lcAKjJ5GyKKrQNEBjk9EJmxNa_O-gU262KWHBeKvxNo` in layout.js |

---

## 8. Changelog

> Format: `YYYY-MM-DD | Who | What changed | Why`

| Date | Who | What | Why |
|------|-----|------|-----|
| 2026-05-13 | Claude Code | Created this SOP file | Needed source of truth across sessions |
| 2026-05-13 | Claude Code | Added GSC verification code to `app/layout.js` | GSC ownership verification |
| 2026-05-13 | Claude Code | Submitted sitemap to GSC | SEO indexing |
| 2026-05-13 | Claude Code | Added Microsoft Clarity (`wq4abhggfm`) to `app/layout.js` | Heatmaps + session recordings |
| 2026-05-13 | Claude Code | Added Google Ads stub (commented) to `app/layout.js` | Ready for when ads account is created |
| 2026-05-13 | Claude Code | Created `.claude/integrations.md` | Track all integration statuses in one place |
| 2026-05-13 | Claude Code | WhatsApp click tracking via GA4 `whatsapp_click` event | Measure engagement without paid tools |
| Earlier | Claude Code | Migrated site from pure HTML to Next.js 14 | Better SEO, static pages, OG tags, schema |
| Earlier | Claude Code | Added 41 country static pages | SEO — each country gets its own indexed URL |
| Earlier | Claude Code | Added Meta Pixel `2460365381005611` | Future Meta ad tracking |
| Earlier | Claude Code | Added GA4 `G-7HM8W0STLC` | Website analytics |
| 2026-05-19 | Claude Code | Fixed nav logo, nav links centering, loader logo — all using precise CSS crop | SVG approach failed (fonts not loaded); PNG crop is reliable |
| 2026-05-19 | Claude Code | Added Tailwind CSS v3 + shadcn/ui/Magic UI/Aceternity foundation | Enable modern animated UI components; preflight disabled to protect existing CSS |
| 2026-05-19 | Claude Code | Hero section: dot grid overlay, shimmer headline, gradient stat numbers, badge sweep, search pulse | Visual upgrade using CSS animations only — no JS changes, all tracking intact |
| 2026-05-21 | Claude Code | SEO: country page meta titles add "2026 — Apply Online", improved descriptions include price, dateModified in schema, Related Destinations section (6 internal links per page), 8 footer destination links — creates full internal link graph across all 37 country pages | Fix "Crawled not indexed" — pages looked isolated to Google |
| 2026-05-21 | Claude Code | Added 43 static HTML redirect pages in `public/` for old pre-migration URLs (e.g. `/france-visa/` → `/schengen-visa-from-india`). Eliminates 404s on Google-indexed old URLs. GitHub Pages limitation means no true HTTP 301 — meta-refresh + canonical + JS replace used instead. Script at `scripts/generate-redirects.js`. | SEO — old 404s were actively suppressing new country page rankings |
| 2026-05-21 | Claude Code | Fixed 6 dead-click/tracking bugs: (1) removed 1s setTimeout before WhatsApp open on country page CTA — was silently blocked on iOS/Android; (2) fixed duplicate z-index in .search-suggestions (200 was overriding 10000); (3) added GA4+Pixel tracking to float WA button; (4) added cursor:default to bento/step cards that looked clickable but weren't; (5) fixed All Articles button scrolling to itself; (6) added iOS safe-area-inset to WA float | Clarity data showed 26% dead clicks — these were the root causes |
| 2026-05-22 | Claude Code | Fixed Thailand meta description "in On arrival" grammar bug; added og:image to all 41 country pages; replaced flag emojis with flagcdn.com images (Windows fix); fixed country page navbar (className="navbar" had no CSS — switched to inline flex matching #nav); fixed footer logo size using footer-brand CSS; fixed homepage logo — converted div to Next.js Link | SEO + UI fixes from session audit |
| 2026-05-22 | Claude Code | Blog architecture upgrade: created app/blog/[slug]/page.js with Article schema, BreadcrumbList schema, sticky navbar, hero, content renderer, sidebar, related posts; added slugs to 6 existing BLOGS; wrote 5 new USA conference blog posts (AWS re:Invent, Dreamforce, Microsoft Ignite, Google I/O, B1 Visa Pillar guide); fixed blog listing navbar + made cards clickable; added 12 new URLs to sitemap.xml | SEO — blog posts now have individual indexed URLs; conference content targets high-intent Indians needing B1/B2 for US tech events |
| 2026-05-22 | Claude Code | Wrote 5 new travel guide blog posts: "12 Countries Easy Visa from India 2026" (pillar), Dubai honest travel cost guide, Europe/Schengen first-trip guide, Canada TRV guide (rejection reasons + fix), December 2026 seasonal travel guide; added 5 URLs to sitemap.xml | Broadening content from visa-only to full travel planning — captures higher-funnel searches like "best countries for Indians", "Dubai travel cost", "Europe trip from India" |
