# ⚠️ DEPRECATED — DO NOT USE
> This file describes the old pure HTML/CSS site and is no longer accurate.
> **Read `.claude/SOP.md` instead** — it reflects the current Next.js site.
> Kept for historical audit reference only. Last updated: 2026-05-08

---

# Website Context — evisas.in (ARCHIVED)
> Superseded by `.claude/SOP.md` on 2026-05-13

## Live Site
- **URL:** https://evisas.in
- **Hosting:** Hostinger (hPanel) — auto-deploys via Git webhook on push to master
- **Key file:** `evisas-website/index.html` (also mirrored at root `index.html`)
- **Deploy workflow:** `.github/workflows/deploy.yml`

## Tech Stack
- Pure HTML/CSS/JS — no framework
- Single page (index.html) — no build step needed
- Logos: `logo.jpeg`, `logo-icon.png.png`, `logo-white.png.png`

## Brand & USP
- "On-Time Guarantee" — visa delivered on time or refund
- INR payments, Hindi support, GST invoicing
- Target: Indian travelers applying for international visas

## ✅ Fixed (done, pushed to master)
- JS syntax error in FAQ answer string — was crashing the page loader
- Both `evisas-website/index.html` and root `index.html` in sync
- Commit: "Fix: JS syntax error in FAQ, loader now hides correctly"

## ❌ Open Issues (not fixed yet)
| Issue | Priority | Notes |
|-------|----------|-------|
| All destination country cards have `href="#"` | HIGH | UAE, UK, USA pages needed first |
| "Apply Now" buttons go nowhere | HIGH | Need form or WhatsApp redirect |
| Missing `<meta name="description">` | HIGH | 1-line fix, big SEO impact |
| Missing Open Graph tags (og:title, og:image etc) | HIGH | Needed for WhatsApp/social sharing previews |
| Missing favicon | MEDIUM | |
| 4x `<h1>` tags on page (should be 1) | MEDIUM | |
| No JSON-LD / Schema.org structured data | MEDIUM | Atlys has this |
| No canonical URL tag | LOW | |
| Search input not in `<form>` tag | LOW | Enter key does nothing |
| No `<header>` or `<main>` semantic landmarks | LOW | Accessibility |

## Competitor Reference
- **Atlys** (atlys.com) is the main competitor — has per-destination delivery times, multi-filter search, mobile apps, free tools (visa photo creator, appointment checker)
- Full audit doc: `docs/evisas-audit.md`

## Next Steps for Claude Code
1. Add SEO meta tags + OG tags to index.html (30 min task)
2. Fix Apply Now → WhatsApp redirect (`https://wa.me/91XXXXXXXXXX`)
3. Create destination pages: `evisas-website/destinations/uae.html`, `uk.html`, `usa.html`
4. Fix H1 count — keep only the hero H1
