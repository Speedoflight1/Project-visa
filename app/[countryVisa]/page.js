import Link from 'next/link'
import { DESTS, TYPE_LABEL } from '../../lib/data'
import WAButton from './WAButton'

export function generateStaticParams() {
  return DESTS.map((d) => ({
    countryVisa: `${d.urlSlug}-visa-from-india`,
  }))
}

export function generateMetadata({ params }) {
  const slug = params.countryVisa.replace('-visa-from-india', '')
  const dest = DESTS.find((d) => d.urlSlug === slug)
  if (!dest) return { title: 'Visa — eVisas.in' }

  const visaLabelMeta = TYPE_LABEL[dest.type] || 'Visa'
  const title = `${dest.fullName} ${visaLabelMeta} from India 2026 — Apply Online | eVisas.in`
  const procPhrase = /^on arrival$/i.test(dest.proc) ? '— available on arrival' : `in ${dest.proc}`
  const description = `Get your ${dest.fullName} ${visaLabelMeta} from India ${procPhrase}. ${dest.successRate} success rate · ${dest.val} validity · from ${dest.price}. Expert help on WhatsApp, pay in ₹, zero hidden fees.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://evisas.in/${dest.urlSlug}-visa-from-india`,
      siteName: 'eVisas.in',
      type: 'website',
      images: [{ url: 'https://evisas.in/logo-white.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://evisas.in/logo-white.png'],
    },
    alternates: {
      canonical: `https://evisas.in/${dest.urlSlug}-visa-from-india`,
    },
  }
}

// Converts flag emoji (e.g. 🇹🇭) to ISO code (e.g. "th") for flagcdn.com
function flagEmojiToISO(emoji) {
  try {
    return [...emoji]
      .map(c => String.fromCharCode(c.codePointAt(0) - 0x1F1E6 + 65))
      .join('')
      .toLowerCase()
  } catch { return null }
}

export default function CountryVisaPage({ params }) {
  const slug = params.countryVisa.replace('-visa-from-india', '')
  const dest = DESTS.find((d) => d.urlSlug === slug)

  if (!dest) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h1>Country not found</h1>
        <Link href="/">← Back to eVisas.in</Link>
      </div>
    )
  }

  const visaLabel = TYPE_LABEL[dest.type] || 'Visa'
  const pageUrl = `https://evisas.in/${dest.urlSlug}-visa-from-india`
  const priceNum = dest.price.replace(/[₹,]/g, '')

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${dest.fullName} ${visaLabel} from India`,
    description: `Apply for ${dest.fullName} ${visaLabel} from India with eVisas.in. ${dest.about}`,
    url: pageUrl,
    provider: {
      '@type': 'Organization',
      name: 'eVisas.in',
      url: 'https://evisas.in',
      logo: 'https://evisas.in/logo.jpeg',
    },
    areaServed: 'IN',
    serviceType: `${dest.fullName} Visa Application`,
    offers: {
      '@type': 'Offer',
      price: priceNum,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'eVisas.in' },
    },
    datePublished: '2024-01-01',
    dateModified: '2026-05-21',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evisas.in' },
      { '@type': 'ListItem', position: 2, name: `${dest.fullName} Visa`, item: pageUrl },
    ],
  }

  // Related destinations: same region first, then popular
  const popularSlugs = ['dubai', 'thailand', 'singapore', 'usa', 'uk', 'schengen', 'australia', 'canada', 'malaysia', 'japan']
  const sameRegion = DESTS.filter(d => d.urlSlug !== dest.urlSlug && d.region === dest.region)
  const popular = DESTS.filter(d => d.urlSlug !== dest.urlSlug && popularSlugs.includes(d.urlSlug) && d.region !== dest.region)
  const relatedDests = [...sameRegion, ...popular].slice(0, 6)

  const genericFaqs = [
    { q: `How long does ${dest.fullName} visa processing take from India?`, a: `${dest.fullName} ${visaLabel} from India takes ${dest.proc} through eVisas.in. We handle the entire application process — documents, submission, and tracking.` },
    { q: `What documents are required for ${dest.fullName} visa for Indian citizens?`, a: `${dest.fullName} visa from India requires: ${dest.requirements.slice(0, 4).join(', ')}.` },
    { q: `What is the eVisas.in service fee for ${dest.fullName} visa?`, a: `eVisas.in charges ${dest.price} as a service fee for ${dest.fullName} ${visaLabel} applications. This includes ${dest.includes.slice(0, 3).join(', ')}.` },
    { q: `How long can I stay in ${dest.fullName} on this visa?`, a: `The ${dest.fullName} ${visaLabel} has a validity of ${dest.val}. Contact our team on WhatsApp for details on extensions or multiple-entry options.` },
  ]
  const activeFaqs = dest.faqs && dest.faqs.length > 0 ? dest.faqs : genericFaqs

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: activeFaqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="country-page">
        {/* Navbar */}
        <nav className="navbar" style={{ position: 'relative', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
          <div className="nav-inner">
            <Link href="/" className="nav-logo">
              <img src="/logo.jpeg" alt="eVisas.in" style={{ height: '52px', borderRadius: '8px' }} />
            </Link>
            <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Link href="/" style={{ color: '#2d3748', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
              <WAButton
                href={`https://wa.me/918619666129?text=Hi%2C%20I%20want%20to%20apply%20for%20${encodeURIComponent(dest.fullName)}%20visa%20from%20India`}
                label={dest.fullName}
                className="btn-primary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
              >
                Apply on WhatsApp
              </WAButton>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="country-hero" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '4rem 1.5rem',
          textAlign: 'center',
          color: '#fff',
        }}>
          <img
            src={`https://flagcdn.com/w80/${flagEmojiToISO(dest.f)}.png`}
            alt={`${dest.fullName} flag`}
            width="80"
            height="53"
            style={{ borderRadius: '6px', marginBottom: '0.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}
          />
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '0.75rem', color: '#fff' }}>
            {dest.fullName} Visa from India
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '560px', margin: '0 auto 2rem' }}>
            {dest.about}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '1rem 1.5rem', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Visa Type</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{visaLabel}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '1rem 1.5rem', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Processing</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{dest.proc}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '1rem 1.5rem', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Validity</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{dest.val}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '1rem 1.5rem', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Our Fee</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{dest.price}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '1rem 1.5rem', backdropFilter: 'blur(8px)' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Success Rate</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{dest.successRate}</div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Requirements */}
          <div style={{ background: '#f8faff', borderRadius: '16px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', color: '#1a1a2e' }}>
              📋 Documents Required
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {dest.requirements.map((req, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.95rem', color: '#4a5568' }}>
                  <span style={{ color: '#667eea', marginTop: '2px', flexShrink: 0 }}>✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* What's Included */}
          <div style={{ background: '#f0fdf4', borderRadius: '16px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', color: '#1a1a2e' }}>
              ✅ What&apos;s Included
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {dest.includes.map((inc, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.95rem', color: '#4a5568' }}>
                  <span style={{ color: '#22c55e', marginTop: '2px', flexShrink: 0 }}>★</span>
                  {inc}
                </li>
              ))}
            </ul>
          </div>

          {/* Country Info */}
          <div style={{ background: '#fffbeb', borderRadius: '16px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', color: '#1a1a2e' }}>
              🌍 Country Info
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                ['Capital', dest.capital],
                ['Currency', dest.currency],
                ['Language', dest.language],
                ['Region', dest.region.replace('-', ' ')],
                ['Documents Needed', dest.docs],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #fde68a', paddingBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 500, color: '#78350f' }}>{label}</span>
                  <span style={{ color: '#4a5568', textTransform: 'capitalize' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '16px', padding: '2rem', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>💬</div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff' }}>Ready to Apply?</h2>
            <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
              Chat with our visa experts on WhatsApp. We&apos;ll guide you step by step.
            </p>
            <WAButton
              href={`https://wa.me/918619666129?text=Hi%2C%20I%20want%20to%20apply%20for%20${encodeURIComponent(dest.fullName)}%20visa%20from%20India`}
              label={dest.fullName}
              style={{
                background: '#25d366',
                color: '#fff',
                padding: '0.875rem 2rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Apply on WhatsApp
            </WAButton>
            <p style={{ fontSize: '0.8rem', opacity: 0.75 }}>Our fee: {dest.price} · {dest.docs}</p>
          </div>
        </section>

        {/* Long-form SEO Content */}
        {dest.contentSections && dest.contentSections.length > 0 && (
          <section style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem 3rem' }}>
            {dest.contentSections.map((sec, i) => (
              <div key={i} style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.75rem', borderLeft: '4px solid #667eea', paddingLeft: '1rem' }}>
                  {sec.h2}
                </h2>
                <p style={{ color: '#4a5568', lineHeight: 1.85, fontSize: '0.975rem', margin: 0 }}>{sec.body}</p>
              </div>
            ))}
            <div style={{ marginTop: '3rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1.5rem', textAlign: 'center' }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeFaqs.map((faq, i) => (
                  <div key={i} style={{ background: '#f8faff', borderRadius: '12px', padding: '1.25rem 1.5rem', borderLeft: '4px solid #667eea' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem', margin: '0 0 0.5rem' }}>{faq.q}</h3>
                    <p style={{ fontSize: '0.925rem', color: '#4a5568', lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Destinations — internal linking for SEO */}
        {relatedDests.length > 0 && (
          <section style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem 3rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1.25rem', textAlign: 'center' }}>
              More Visa Services from India
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.875rem' }}>
              {relatedDests.map(r => (
                <Link
                  key={r.urlSlug}
                  href={`/${r.urlSlug}-visa-from-india`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: '#f8faff',
                    borderRadius: '12px',
                    padding: '0.875rem 1.125rem',
                    textDecoration: 'none',
                    border: '1px solid #e2e8f0',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{r.f}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a2e' }}>{r.c} Visa</div>
                    <div style={{ fontSize: '0.78rem', color: '#718096' }}>{r.proc} · {r.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Guarantee Strip */}
        <section style={{ background: '#f8faff', borderTop: '1px solid #e2e8f0', padding: '2rem 1.5rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e', marginBottom: '0.5rem' }}>
              🛡️ eVisas.in Guarantee
            </p>
            <p style={{ color: '#718096', fontSize: '0.95rem' }}>
              98% success rate · WhatsApp updates at every step · Pay in ₹ with no hidden fees · Re-apply free if rejected (Pro plan)
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: '#1a1a2e', color: '#a0aec0', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <img src="/logo.jpeg" alt="eVisas.in" style={{ height: '40px', borderRadius: '6px', opacity: 0.9 }} />
            </Link>
            <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
              G9 Tower C, Bhutani Alphathum, Sector 90, Noida 201304
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <Link href="/dubai-visa-from-india" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dubai Visa</Link>
              <Link href="/thailand-visa-from-india" style={{ color: '#a0aec0', textDecoration: 'none' }}>Thailand Visa</Link>
              <Link href="/singapore-visa-from-india" style={{ color: '#a0aec0', textDecoration: 'none' }}>Singapore Visa</Link>
              <Link href="/schengen-visa-from-india" style={{ color: '#a0aec0', textDecoration: 'none' }}>Schengen Visa</Link>
              <Link href="/usa-visa-from-india" style={{ color: '#a0aec0', textDecoration: 'none' }}>USA Visa</Link>
              <Link href="/uk-visa-from-india" style={{ color: '#a0aec0', textDecoration: 'none' }}>UK Visa</Link>
              <Link href="/australia-visa-from-india" style={{ color: '#a0aec0', textDecoration: 'none' }}>Australia Visa</Link>
              <Link href="/canada-visa-from-india" style={{ color: '#a0aec0', textDecoration: 'none' }}>Canada Visa</Link>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <Link href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</Link>
              <a href="https://wa.me/918619666129" target="_blank" rel="noopener noreferrer" style={{ color: '#a0aec0', textDecoration: 'none' }}>WhatsApp</a>
              <a href="https://www.instagram.com/evisas.in" target="_blank" rel="noopener noreferrer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Instagram</a>
            </div>
            <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>
              © {new Date().getFullYear()} eVisas.in — All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
