# CLAUDE.md — Master Index
> This is the navigation file. Keep it SHORT. Deep context lives in `.claude/` sub-files.
> Read the relevant sub-file for the area you are working on.
> Last updated: 2026-05-13

---

## 👤 Owner
- **Name:** Mohit Khandelwal | **Email:** mohitkhandelwal.te@gmail.com
- **GitHub:** github.com/Speedoflight1 | **Repo:** Speedoflight1/Project-visa

---

## ⚠️ MANDATORY CHECKS BEFORE ANY WORK
Both Claude Code and Cowork must do this before touching any file:

**Claude Code (terminal) — run these 3 lines first:**
```bash
pwd                   # must show: C:\Users\mohit\Documents\claude-project
git branch            # must show: master (or confirm correct branch)
git pull              # always pull latest before starting
```
If `pwd` shows anything else — stop, run `cd C:\Users\mohit\Documents\claude-project` first.

**Cowork (desktop) — before creating any file:**
- Important files → push to GitHub immediately after creating
- If I say "saved to outputs" without pushing — ask: "did you push to GitHub?"
- Never assume outputs folder = permanent storage

**Both tools — before editing a shared file:**
- Pull latest first (`git pull`)
- Whoever pushes second will get a conflict — communicate before editing same file

---

## 🗺️ Where Everything Lives

| Area | Sub-memory file | Folders in repo |
|------|----------------|-----------------|
| Website (evisas.in) | `.claude/SOP.md` ← **READ THIS** | `app/`, `lib/`, `public/` |
| Content & Reels | `.claude/content.md` | `content/reel-scripts/`, `content/blog-drafts/` |
| Automation & APIs | `.claude/automation.md` | `automation/n8n-workflows/`, `automation/bedrock/` |
| Audit reports & docs | `.claude/docs.md` | `docs/` |

---

## ⚡ Current Priority (as of 2026-05-13)
1. Website is live with all SEO + tracking done → see `.claude/SOP.md` for full state
2. Build n8n auto-blog workflow with Telegram approval → see `.claude/automation.md`
3. Start reel production (voice + video) → see `.claude/content.md`

---

## 📌 Rule
If you build something, break something, or decide something — update the relevant `.claude/*.md` file AND bump "Last updated" here.
