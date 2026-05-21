/**
 * Generates static HTML redirect files for old URLs that Google has indexed
 * from before the Next.js migration. These are placed in public/ so they get
 * copied to out/ during build and served by GitHub Pages.
 *
 * Meta-refresh + canonical + JS replace is the best approach for static hosts.
 * Not a true HTTP 301 but eliminates 404s and passes link equity to new URLs.
 */

const fs = require('fs')
const path = require('path')

const PUBLIC_DIR = path.join(__dirname, '..', 'public')

// [old-slug, new-path, page-title]
// old-slug becomes public/old-slug/index.html
const REDIRECTS = [
  // UAE / Dubai
  ['dubai-visa',          '/dubai-visa-from-india',        'Dubai Visa from India'],
  ['uae-visa',            '/dubai-visa-from-india',        'UAE Visa from India'],

  // France / Schengen
  ['france-visa',         '/schengen-visa-from-india',     'France Visa from India'],
  ['schengen-visa',       '/schengen-visa-from-india',     'Schengen Visa from India'],

  // Americas
  ['usa-visa',            '/usa-visa-from-india',          'USA Visa from India'],
  ['us-visa',             '/usa-visa-from-india',          'US Visa from India'],
  ['canada-visa',         '/canada-visa-from-india',       'Canada Visa from India'],

  // UK
  ['uk-visa',             '/uk-visa-from-india',           'UK Visa from India'],

  // Asia
  ['thailand-visa',       '/thailand-visa-from-india',     'Thailand Visa from India'],
  ['singapore-visa',      '/singapore-visa-from-india',    'Singapore Visa from India'],
  ['malaysia-visa',       '/malaysia-visa-from-india',     'Malaysia Visa from India'],
  ['japan-visa',          '/japan-visa-from-india',        'Japan Visa from India'],
  ['south-korea-visa',    '/south-korea-visa-from-india',  'South Korea Visa from India'],
  ['cambodia-visa',       '/cambodia-visa-from-india',     'Cambodia Visa from India'],
  ['vietnam-visa',        '/vietnam-visa-from-india',      'Vietnam Visa from India'],
  ['indonesia-visa',      '/bali-visa-from-india',         'Indonesia Visa from India'],
  ['bali-visa',           '/bali-visa-from-india',         'Bali Visa from India'],
  ['sri-lanka-visa',      '/sri-lanka-visa-from-india',    'Sri Lanka Visa from India'],
  ['maldives-visa',       '/maldives-visa-from-india',     'Maldives Visa from India'],

  // Australia / NZ
  ['australia-visa',      '/australia-visa-from-india',    'Australia Visa from India'],
  ['new-zealand-visa',    '/new-zealand-visa-from-india',  'New Zealand Visa from India'],

  // Europe
  ['germany-visa',        '/germany-visa-from-india',      'Germany Visa from India'],
  ['italy-visa',          '/italy-visa-from-india',        'Italy Visa from India'],
  ['greece-visa',         '/greece-visa-from-india',       'Greece Visa from India'],
  ['switzerland-visa',    '/switzerland-visa-from-india',  'Switzerland Visa from India'],
  ['austria-visa',        '/austria-visa-from-india',      'Austria Visa from India'],
  ['portugal-visa',       '/portugal-visa-from-india',     'Portugal Visa from India'],
  ['netherlands-visa',    '/netherlands-visa-from-india',  'Netherlands Visa from India'],

  // Middle East
  ['saudi-arabia-visa',   '/saudi-arabia-visa-from-india', 'Saudi Arabia Visa from India'],
  ['oman-visa',           '/oman-visa-from-india',         'Oman Visa from India'],
  ['kuwait-visa',         '/kuwait-visa-from-india',       'Kuwait Visa from India'],
  ['bahrain-visa',        '/bahrain-visa-from-india',      'Bahrain Visa from India'],
  ['jordan-visa',         '/jordan-visa-from-india',       'Jordan Visa from India'],
  ['egypt-visa',          '/egypt-visa-from-india',        'Egypt Visa from India'],

  // Africa
  ['kenya-visa',          '/kenya-visa-from-india',        'Kenya Visa from India'],
  ['tanzania-visa',       '/tanzania-visa-from-india',     'Tanzania Visa from India'],
  ['south-africa-visa',   '/south-africa-visa-from-india', 'South Africa Visa from India'],

  // No direct equivalent — redirect to homepage
  ['nigeria-visa',        '/',                             'eVisas.in'],
  ['moldova-visa',        '/',                             'eVisas.in'],
  ['passport',            '/',                             'eVisas.in'],
  ['visa-on-arrival-for-indians', '/',                    'eVisas.in'],

  // Old site structure pages
  ['about-us',            '/about',                        'About eVisas.in'],
  ['contact-us',          '/contact',                      'Contact eVisas.in'],
]

function makeHtml(newPath, title) {
  const canonical = `https://evisas.in${newPath}`
  const linkText = title
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=${newPath}">
  <link rel="canonical" href="${canonical}">
  <script>window.location.replace('${newPath}');</script>
  <title>${title} — Redirecting</title>
</head>
<body>
  <p>Redirecting to <a href="${newPath}">${linkText}</a>...</p>
</body>
</html>
`
}

let created = 0
let skipped = 0

for (const [oldSlug, newPath, title] of REDIRECTS) {
  const dir = path.join(PUBLIC_DIR, oldSlug)
  const file = path.join(dir, 'index.html')

  if (fs.existsSync(file)) {
    console.log(`SKIP  (exists): ${oldSlug}/`)
    skipped++
    continue
  }

  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(file, makeHtml(newPath, title))
  console.log(`OK    ${oldSlug}/ → ${newPath}`)
  created++
}

console.log(`\nDone. Created: ${created}, Skipped (already exist): ${skipped}`)
