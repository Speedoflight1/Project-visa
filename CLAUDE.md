# CLAUDE.md — Shared Project Memory
> Read this at the start of every session (Cowork or Claude Code).
> Update this file whenever something significant is built, changed, or decided.
> Last updated: 2026-05-07

---

## 👤 About Mohit

- **Name:** Mohit Khandelwal
- **Email:** mohitkhandelwal.te@gmail.com
- **GitHub:** github.com/Speedoflight1
- **Business:** eVisas.in — visa consultancy for Indian travelers
- **Target audience:** Indians applying for USA, UK, Canada, Schengen, Dubai, Japan, Singapore, Australia, South Korea, Thailand visas
- **Content style:** Hindi/English meme-style reels, animated visa characters, high-retention short-form video

---

## 🌐 The Product — eVisas.in

### What it is
A visa consultancy platform. Helps Indian travelers get visas approved. USP: "On-Time Guarantee", INR payments, Hindi support, GST invoicing.

### Live site
- **URL:** https://evisas.in
- **Hosting:** Hostinger (hPanel)
- **Repo:** https://github.com/Speedoflight1/Project-visa
- **Branch:** `master`
- **Deploy path:** `public_html` (auto-deploys via Hostinger Git webhook on push)
- **Key file:** `evisas-website/index.html` (also mirrored at root `index.html`)

### Known issues still open
- All destination country cards have `href="#"` — dead links, need real pages
- "Apply Now" buttons have no destination — need form or WhatsApp redirect
- Missing `<meta name="description">`, Open Graph tags, favicon
- 4 × `<h1>` tags on the page — should be 1
- No JSON-LD / Schema.org structured data
- No mobile apps yet

### What's been fixed (pushed to GitHub)
- JS syntax error in FAQ answer string — was crashing the page loader
- `index_fixed.html` pushed to both `evisas-website/index.html` and root `index.html`
- Commit message: "Fix: JS syntax error in FAQ, loader now hides correctly"

---

## 🧰 Full Toolset

| Tool | Purpose | Status |
|------|---------|--------|
| evisas.in | Main website | Live ✅ — some bugs open |
| GitHub (Speedoflight1/Project-visa) | Code version control | Connected ✅ |
| Hostinger | Hosting + n8n self-hosted | Active ✅ |
| AWS Bedrock (us-east-1) | Claude Sonnet 4.6 API | Working ✅ — use when Claude Pro limit hit |
| Claude Pro / Cowork | Strategy, content, docs, browser audits | Active (monitor weekly limits) |
| Claude in Chrome | Live browser automation | Enabled ✅ |
| n8n (self-hosted on Hostinger) | Automation engine | Installed ✅ — no workflows built yet |
| ElevenLabs | AI voice / audio for reels | Discussed — not yet connected |
| Adobe Firefly | Avatar video / multishot reels | In use for content creation |
| Viggle AI | Motion transfer / character swap | Primary reel tool |
| CapCut | Reel editing, captions, cuts | In use |
| Google Flow (Veo) | Video generation (replacing Firefly multishot) | Currently testing |

---

## ☁️ AWS Bedrock Setup

- **Region:** us-east-1
- **Model:** Claude Sonnet 4.6 (`anthropic.claude-sonnet-4-6` via cross-region inference)
- **Access:** Granted via Model Catalog → Playground tested ✅
- **Billing:** Payment method added, credits active
- **Explore AWS credits:** $20 claimed (Bedrock task). Remaining tasks: Budget setup, EC2, Lambda, RDS/Aurora (~$80 left)
- **SDK:** Not yet wired to any app or n8n workflow
- **Next step:** Configure AWS CLI credentials locally + connect to n8n via HTTP Request node or custom script

### To connect Bedrock from code
```python
import boto3, json
client = boto3.client("bedrock-runtime", region_name="us-east-1")
response = client.invoke_model(
    modelId="anthropic.claude-sonnet-4-6",
    body=json.dumps({
        "messages": [{"role": "user", "content": "your prompt here"}],
        "max_tokens": 500,
        "anthropic_version": "bedrock-2023-05-31"
    })
)
```

---

## 🤖 n8n Automation — Planned Workflows (None Built Yet)

n8n is self-hosted on Hostinger. All 6 workflows below need to be built:

| # | Workflow | Description |
|---|---------|-------------|
| 1 | Auto Blog | AI finds trending visa keywords → writes SEO blog → sends Telegram preview → on approve → publishes to WordPress |
| 2 | Lead Alerts | New form submission → WhatsApp/Telegram notification to Mohit |
| 3 | Competitor Spy | Monitor competitor Instagram/LinkedIn posts → alert when new content posted |
| 4 | LinkedIn Posts | Generate weekly LinkedIn post from visa news → send for approval → post |
| 5 | Content Pipeline | Trending topic → reel script → send for approval → log to sheet |
| 6 | WhatsApp Approval | Any workflow action → WhatsApp message with ✅ Approve / ❌ Reject buttons → execute on reply |

### Approval pattern (use this for all workflows)
AI suggests → Telegram/WhatsApp message to Mohit → Mohit replies "yes" → n8n executes → sends confirmation

---

## 🎬 Content System — Visa Reels

### Style guide
- **Format:** Vertical 9:16, 12–18 sec max
- **Language:** Hindi/English meme mix ("re", "boss", "areeee 😭")
- **Hook type:** Character falls / crashes / gets rejected dramatically in first 2 sec
- **Structure:** Hook → Pain (cancel lines in red) → Solution checklist → CTA
- **Voice:** ElevenLabs — Speed 1.05x, Stability 45–55, Style Exaggeration 20–30
- **Editing:** CapCut — auto captions, whoosh SFX, zoom cuts every 1–1.5 sec

### Production workflow
1. Script (Claude / Cowork)
2. Voice (ElevenLabs)
3. Video (Google Flow / Viggle AI for motion swap)
4. Edit (CapCut)
5. Post (Instagram Reels)

### Scripts completed
All 10 country scripts written and saved as `Viral_Visa_Reel_Scripts.docx` in outputs folder.
Countries: 🇺🇸 USA · 🇨🇦 Canada · 🇬🇧 UK · 🇪🇺 Europe/Schengen · 🇦🇪 Dubai · 🇯🇵 Japan · 🇸🇬 Singapore · 🇦🇺 Australia · 🇰🇷 South Korea · 🇹🇭 Thailand

Each script has: unique theme, opening hook (physical comedy), meme dialogue, cancel lines, solution checklist, CTA, camera notes, SFX notes.

---

## 📁 Files Created (Outputs Folder)

| File | What it is |
|------|-----------|
| `Viral_Visa_Reel_Scripts.docx` | All 10 country reel scripts, formatted |
| `generate_visa_scripts.js` | Node.js script that generated the docx |
| `CLAUDE.md` | This file — shared memory for all sessions |
| `evisas_changes_documentation.docx` | Full log of website bug fixes made in earlier session |

---

## 🔮 What to Build Next (Priority Order)

### Immediate (this week)
1. **Wire AWS CLI credentials** on Windows machine (`aws configure`)
2. **Build n8n Workflow #1** — auto blog with Telegram approval
3. **Fix dead destination links** on evisas.in (at minimum UAE, UK, USA pages)
4. **Add SEO meta tags** to index.html (30-min Claude Code task)

### Short term
5. Connect ElevenLabs API to n8n for automated voice generation
6. Build lead capture form on evisas.in → trigger n8n Workflow #2
7. Set up Viggle/Google Flow batch processing for reel production

### Longer term
8. WordPress API key → auto blog publishing
9. Windsor.ai → connect Google Ads + Meta Ads + GA4 for performance tracking
10. Instagram auto-posting workflow via n8n

---

## 📌 Key Decisions Made

- **Bedrock over direct Anthropic API** when Claude Pro limits hit — already tested and working
- **Google Flow replacing Firefly multishot** for video generation (Firefly single-shot not working well)
- **Viggle AI as primary** for motion transfer / character swap (not HeyGen — too static)
- **Approval-first automation** — AI never posts/publishes without Mohit's explicit approval
- **Hindi/English meme style** confirmed as content voice (not formal, not English-only)
- **CLAUDE.md as shared memory** — both Cowork and Claude Code should read + update this file

---

## ⚡ How to Use This File

**If you are Claude Code (terminal):**
- Read this file first before starting any task
- After completing work, update the relevant section
- Push CLAUDE.md changes to GitHub with code changes

**If you are Cowork (desktop app):**
- Read this file at session start
- After creating files or making decisions, update this file
- Save updated CLAUDE.md to the outputs folder

**Rule:** If something is built, broken, decided, or changed — update this file. That's how both tools stay in sync.
