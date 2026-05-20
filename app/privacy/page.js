import Link from 'next/link'
import { POLICIES } from '../../lib/data'

export const metadata = {
  title: 'Privacy Policy — eVisas.in | How We Protect Your Data',
  description: 'eVisas.in privacy policy. 256-bit SSL encryption, ISO 27001 certified servers. Passport scans deleted within 90 days. We never sell your data. Read how we protect your information.',
  alternates: { canonical: 'https://evisas.in/privacy' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evisas.in' },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://evisas.in/privacy' },
  ],
}

export default function PrivacyPage() {
  const pol = POLICIES.privacy
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="country-page">
        <nav className="navbar" style={{ position: 'relative', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
          <div className="nav-inner">
            <Link href="/" className="nav-logo">
              <img src="/logo.jpeg" alt="eVisas.in" style={{ height: '52px', borderRadius: '8px' }} />
            </Link>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href="/" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← Home</Link>
            </div>
          </div>
        </nav>

        <div style={{ padding: '4rem 1.5rem 2.5rem', maxWidth: 760, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-1px', marginBottom: '0.5rem' }}>{pol.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{pol.subtitle}</p>
        </div>

        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
          {pol.sections.map((sec, i) => (
            <div key={i} className="pol-section" style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border)' }}>{sec.h}</h2>
              <div dangerouslySetInnerHTML={{ __html: sec.body }} />
            </div>
          ))}

          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>Privacy questions? We respond within 24 hours.</p>
            <a href="mailto:info@evisas.in" className="btn-pill" style={{ textDecoration: 'none', display: 'inline-block' }}>Email info@evisas.in →</a>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-light)', borderTop: '1px solid var(--border)' }}>
          <Link href="/" style={{ color: 'var(--text-light)' }}>eVisas.in</Link> · <Link href="/refund-policy" style={{ color: 'var(--text-light)' }}>Refund Policy</Link> · <Link href="/terms" style={{ color: 'var(--text-light)' }}>Terms</Link> · <Link href="/contact" style={{ color: 'var(--text-light)' }}>Contact</Link>
        </div>
      </div>
    </>
  )
}
