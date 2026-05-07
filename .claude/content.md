# Content Context — Reels, Scripts, Blog, Voice
> For Cowork or Claude Code: read this when working on content creation
> Last updated: 2026-05-08

## Content Strategy
- **Platform:** Instagram Reels (primary), LinkedIn (secondary)
- **Style:** Hindi/English meme mix — "re", "boss", "areeee 😭💀"
- **Character:** Animated visa card with eyes/arms — Pixar-style 3D
- **Tone:** Funny, emotional, high-energy, meme-style — NOT formal
- **Duration:** 12–18 seconds max per reel
- **Hook type:** Character falls/crashes/gets rejected dramatically in first 2 sec

## Reel Script Structure (use every time)
```
1. Hook (0-2 sec)   → Physical comedy + dramatic fall/crash
2. Pain (2-8 sec)   → Cancel lines (things that got ruined) — RED in docs
3. Insight (8-12 sec) → Why it happened — authority line
4. Solution (12-15 sec) → 3-point checklist — GREEN in docs
5. CTA (15-18 sec)  → "Message kar re 📩" — BLUE in docs
```

## Production Workflow
```
1. Script   → Claude / Cowork (done for 10 countries)
2. Voice    → ElevenLabs (Speed: 1.05x, Stability: 45-55, Style: 20-30)
3. Video    → Google Flow (Veo) — currently testing for character generation
4. Motion   → Viggle AI — for motion transfer / character swap
5. Edit     → CapCut (auto captions, whoosh SFX, zoom cuts every 1-1.5 sec)
6. Post     → Instagram Reels
```

## AI Tools for Video Production
| Tool | Use | Cost |
|------|-----|------|
| Google Flow (Veo) | Text/image → video, replacing Firefly multishot | Testing |
| Viggle AI | Motion transfer, character swap — BEST for reels | ~$8-64/mo |
| Adobe Firefly | Avatar video (backup) | Subscription |
| ElevenLabs | Voice generation | ~$5/mo |
| CapCut | Editing, captions, SFX | Free/Pro |

## Completed Scripts
All 10 country scripts are DONE. File: `content/reel-scripts/Viral_Visa_Reel_Scripts.docx`

| Country | Theme | Status |
|---------|-------|--------|
| 🇺🇸 USA | Interview Freeze — laptop crash in embassy | ✅ Done |
| 🇨🇦 Canada | Bank Balance Crash — insufficient funds alarm | ✅ Done |
| 🇪🇺 Schengen/Europe | Fake Itinerary Red Alert | ✅ Done |
| 🇬🇧 UK | Accent Fantasy Destroyed — practicing British accent | ✅ Done |
| 🇦🇪 Dubai | Rich Guy Delusion — fake millionaire acting | ✅ Done |
| 🇯🇵 Japan | Anime Main Character — misses bullet train | ✅ Done |
| 🇸🇬 Singapore | Passport Damage — pages fall apart | ✅ Done |
| 🇦🇺 Australia | Work Intention Suspicion — tourist hat → construction helmet | ✅ Done |
| 🇰🇷 South Korea | K-Drama Boyfriend Era Destroyed | ✅ Done |
| 🇹🇭 Thailand | Broke Friends Trip Disaster — wallet catches fire | ✅ Done |

## ElevenLabs Voice Settings (save these)
- Speed: 1.05x
- Stability: 45–55
- Clarity/Similarity: 70–80
- Style Exaggeration: 20–30
- Voice: Confident Indian male, energetic
- SSML: Keep ON for natural pauses

## Blog Content Plan (for SEO — not started yet)
Target keywords:
- "USA visa rejection reasons India"
- "Canada visa bank statement requirements"
- "Schengen visa itinerary tips"
- "Dubai visa documents checklist India"
- "Japan visa application guide India"

Blog format: 800–1200 words, H2 subheadings, FAQ section at bottom
Auto-posting: via n8n Workflow 1 (not built yet)

## Next Steps
1. Record voices for all 10 scripts in ElevenLabs
2. Generate video clips in Google Flow
3. Add motion via Viggle AI
4. Edit in CapCut and post
5. Build n8n Workflow 5 (content pipeline) to automate future scripts
