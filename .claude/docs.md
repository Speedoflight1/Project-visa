# Docs & Audit Context
> Reference file for reports, audits, and strategic decisions
> Last updated: 2026-05-08

## Completed Audits & Reports

### evisas.in Website Audit (done via Claude in Chrome)
Full comparison vs Atlys. Report saved: `docs/evisas-audit.md`
Key findings:
- 20/31 anchor tags broken (href="#")
- Zero SEO metadata
- 4x H1 tags
- No OG tags, no favicon, no schema
- Strong differentiators: INR pricing, On-Time Guarantee, Hindi support, GST invoicing

### Changes Documentation
All website bug fixes logged in: `docs/evisas-changes-log.md`
(Originally: `evisas_changes_documentation.docx` from earlier session)

## Key Decisions Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-05-07 | Use Bedrock over direct Anthropic API when Pro limits hit | Already tested, working |
| 2026-05-07 | Google Flow replacing Firefly multishot | Firefly single-shot not working well |
| 2026-05-07 | Viggle AI as primary for motion/character swap | Better than HeyGen for reels |
| 2026-05-07 | Approval-first automation | AI never posts without Mohit's explicit approval |
| 2026-05-07 | Hindi/English meme style confirmed | Not formal English-only |
| 2026-05-08 | CLAUDE.md split into sub-files | Context management as project grows |

## Session History Summary

| Session | What Was Done |
|---------|--------------|
| "Analyze Instagram reel creation" | Researched AI video tools, pricing, first reel script |
| "Migrate website to Hostinger" | GitHub → Hostinger Git deploy + webhook setup |
| "Review website using Claude browsing" | Full evisas.in audit + competitor analysis vs Atlys |
| "Chrome browser troubleshooting" | Fixed JS syntax error in FAQ, pushed to GitHub |
| Current session | 10 country reel scripts, CLAUDE.md system, folder restructure |
