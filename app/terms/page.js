import Link from 'next/link'
import Logo from '../Logo'
import { POLICIES } from '../../lib/data'

export const metadata = {
  title: 'Terms of Service — eVisas.in',
  description: 'eVisas.in terms of service. INR payments, service fee charged only on approval, On-Time Guarantee, and applicant responsibilities. Governed by Indian law.',
  alternates: { canonical: 'https://evisas.in/terms' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evisas.in' },
    { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://evisas.in/terms' },
  ],
}

export default function TermsPage() {
  const pol = POLICIES.terms
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="country-page">
        <nav className="navbar" style={{ position: 'relative', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
          <div className="nav-inner">
            <Link href="/" className="nav-logo">
              <Logo style={{ height: '52px', width: 'auto' }} />
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
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>Questions about our terms? We&apos;re happy to clarify.</p>
            <a href="mailto:info@evisas.in" className="btn-pill" style={{ textDecoration: 'none', display: 'inline-block' }}>Email info@evisas.in →</a>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-light)', borderTop: '1px solid var(--border)' }}>
          <Link href="/" style={{ color: 'var(--text-light)' }}>eVisas.in</Link> · <Link href="/refund-policy" style={{ color: 'var(--text-light)' }}>Refund Policy</Link> · <Link href="/privacy" style={{ color: 'var(--text-light)' }}>Privacy</Link> · <Link href="/contact" style={{ color: 'var(--text-light)' }}>Contact</Link>
        </div>
      </div>
    </>
  )
}
