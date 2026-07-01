// Build-time generator for per-page Open Graph images.
//
// Why a script (and not next/og): this site uses `output: 'export'` (static
// export). Next 14.2.5 cannot build a dynamic `opengraph-image` route under
// static export. So instead we pre-render one static 1200x630 PNG per country
// into /public/og/<slug>.png. Static export just copies those files — there is
// zero runtime, zero new route, and zero coupling to the Next build.
//
// Run manually whenever the country list or branding changes:
//   node scripts/generate-og.mjs
//
// satori + @resvg/resvg-js are devDependencies — never imported by the app.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { DESTS, TYPE_LABEL } from '../lib/data.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'og')

const arial = fs.readFileSync('C:/Windows/Fonts/arial.ttf')
const arialBold = fs.readFileSync('C:/Windows/Fonts/arialbd.ttf')

// Tiny hyperscript helper so we don't need JSX/React in a plain .mjs script.
const h = (type, props = {}, ...children) => ({
  type,
  props: { ...props, children: children.length <= 1 ? children[0] : children },
})

function card(dest) {
  const visaLabel = TYPE_LABEL[dest.type] || 'Visa'
  const stat = (label, value) =>
    h('div', { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
      h('div', { style: { fontSize: 20, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 } }, label),
      h('div', { style: { fontSize: 34, fontWeight: 700, color: '#ffffff' } }, value),
    )

  return h('div', {
    style: {
      width: 1200, height: 630, display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', padding: 64,
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial',
    },
  },
    // Header
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      h('div', { style: { fontSize: 40, fontWeight: 700, color: '#ffffff' } }, 'eVisas.in'),
      h('div', { style: { fontSize: 22, color: 'rgba(255,255,255,0.75)', letterSpacing: 2 } }, 'VISA SERVICES FROM INDIA'),
    ),
    // Middle — country + visa type
    h('div', { style: { display: 'flex', flexDirection: 'column', gap: 20 } },
      h('div', {
        style: {
          display: 'flex', alignSelf: 'flex-start', fontSize: 24, fontWeight: 700,
          color: '#ffffff', background: 'rgba(255,255,255,0.18)',
          padding: '10px 22px', borderRadius: 100,
        },
      }, `${visaLabel} · from India`),
      h('div', { style: { fontSize: 78, fontWeight: 700, color: '#ffffff', lineHeight: 1.05 } },
        `${dest.fullName} Visa`),
    ),
    // Footer — key stats
    h('div', { style: { display: 'flex', gap: 56 } },
      stat('Processing', dest.proc),
      stat('Validity', dest.val),
      stat('Our Fee', dest.price),
      stat('Success', dest.successRate),
    ),
  )
}

async function run() {
  fs.mkdirSync(outDir, { recursive: true })
  const fonts = [
    { name: 'Arial', data: arial, weight: 400, style: 'normal' },
    { name: 'Arial', data: arialBold, weight: 700, style: 'normal' },
  ]

  let count = 0
  for (const dest of DESTS) {
    const svg = await satori(card(dest), { width: 1200, height: 630, fonts })
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
    fs.writeFileSync(path.join(outDir, `${dest.urlSlug}.png`), png)
    count++
  }
  console.log(`Generated ${count} OG images into public/og/`)
}

run().catch((e) => { console.error(e); process.exit(1) })
