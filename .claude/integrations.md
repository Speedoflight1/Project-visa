# eVisas.in — Integrations Dashboard
> Last updated: 2026-05-13

---

## Analytics & Tracking

| Integration | Status | ID / Account | Where to Check |
|-------------|--------|--------------|----------------|
| **GA4** | ✅ Live | `G-7HM8W0STLC` | analytics.google.com |
| **Meta Pixel** | ✅ Live | `2460365381005611` | business.facebook.com → Events Manager |
| **Microsoft Clarity** | ✅ Live | `wq4abhggfm` | clarity.microsoft.com |
| **WhatsApp Click Events** | ✅ Live | GA4 event: `whatsapp_click` | GA4 → Reports → Events |
| **Google Search Console** | ⏳ Pending | Need verification code | search.google.com/search-console |
| **Google Ads Tag** | 🔜 Ready (disabled) | Replace `AW-XXXXXXXXXX` when account created | ads.google.com |

---

## SEO

| Item | Status | Notes |
|------|--------|-------|
| Sitemap | ✅ Live | `https://evisas.in/sitemap.xml` |
| robots.txt | ✅ Live | `https://evisas.in/robots.txt` |
| OG / Twitter meta | ✅ Live | All pages |
| Canonical tags | ✅ Live | Homepage + all 41 country pages |
| JSON-LD schema | ✅ Live | Organization (homepage) + Service (country pages) |
| GSC sitemap submission | ⏳ Pending | Do after GSC verification |

---

## Reporting Tools

| Tool | Status | Purpose |
|------|--------|---------|
| GA4 | ✅ Live | Traffic, users, WhatsApp clicks |
| Meta Ads Manager | ✅ Ready | Ad performance + pixel events |
| Microsoft Clarity | ✅ Live | Heatmaps + session recordings |
| Google Looker Studio | 🔜 Set up after GSC | Free unified dashboard |
| Windsor.ai | ❌ Skip | Paid — Looker Studio is free equivalent |
| Motion Creative Analytics | ❌ Skip | Paid — Meta Ads Manager covers this |

---

## Pending Actions (in order)

1. **GSC Verification** — see steps below → share verification code → I add it to layout.js
2. **GSC Sitemap** — after verification: submit `https://evisas.in/sitemap.xml`
3. **Looker Studio** — after GSC: connect GA4 + GSC for one free dashboard
4. **Google Ads Tag** — when starting ads: get `AW-XXXXXXXXXX` → uncomment tag in `app/layout.js`

---

## How to activate Google Ads tag (when ready)
In `app/layout.js`, find the commented block near the GA4 scripts and:
1. Uncomment the two `<Script>` blocks
2. Replace `AW-XXXXXXXXXX` with your real Google Ads conversion ID
3. Commit and push
