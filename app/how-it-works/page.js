import Link from 'next/link'
import Logo from '../Logo'
import { STEPS, FEATURES, FAQS } from '../../lib/data'

export const metadata = {
  title: 'How It Works — eVisas.in | 4 Steps to Your Visa',
  description: 'How eVisas.in works: Fill form → Upload docs → We file your application → Receive visa. No embassy visits for most e-Visas. Expert guidance, WhatsApp updates, On-Time Guarantee.',
  openGraph: {
    title: 'How eVisas.in Works — Visa in 4 Easy Steps',
    description: 'No embassy visits for most e-Visas. Expert guidance + WhatsApp updates throughout. On-Time Guarantee on every application.',
    url: 'https://evisas.in/how-it-works',
    siteName: 'eVisas.in',
    type: 'website',
  },
  alternates: { canonical: 'https://evisas.in/how-it-works' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evisas.in' },
    { '@type': 'ListItem', position: 2, name: 'How It Works', item: 'https://evisas.in/how-it-works' },
  ],
}

export default function HowItWorksPage() {
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
              <a href="https://wa.me/918619666129?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20visa" target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ fontSize: '0.85rem', padding: '0.55rem 1.4rem' }}>Apply Now →</a>
            </div>
          </div>
        </nav>

        <div style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%)', padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '0.35rem 1rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>
            Simple Process
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '1rem' }}>
            Your Visa in <span style={{ color: '#60a5fa' }}>4 Easy Steps</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto' }}>
            No embassy visits for most e-Visas. No confusing paperwork. A clean digital experience built for Indian travelers.
          </p>
        </div>

        <div className="s">
          <div className="container">
            <div className="steps-grid">
              {STEPS.map((s, i) => (
                <div key={i} className="step-card" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="step-num">0{i + 1}</div>
                  <div className="step-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="s" style={{ background: 'var(--surface)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div className="s-tag" style={{ justifyContent: 'center' }}><span className="line" /> Why eVisas.in</div>
              <div className="s-title">Built different.<br />Built for India.</div>
              <p className="s-sub" style={{ maxWidth: 560, margin: '0.75rem auto 0' }}>Every feature designed to solve the real problems Indian passport holders face when applying for visas abroad.</p>
            </div>
            <div className="bento">
              {FEATURES.map((f, idx) => (
                <div key={f.cls} className={`bento-card ${f.cls}`}>
                  <div className="bento-icon" style={{ background: f.iconBg }}>{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  {f.extra === 'visual' ? (
                    <div className="bento-visual">
                      <div className="bv-row"><span>Application submitted</span><span style={{ color: 'var(--green)' }}>✓</span></div>
                      <div className="bv-bar"><div className="bv-fill" style={{ width: '100%' }} /></div>
                      <div className="bv-row"><span>Documents verified</span><span style={{ color: 'var(--green)' }}>✓</span></div>
                      <div className="bv-bar"><div className="bv-fill" style={{ width: '100%' }} /></div>
                      <div className="bv-row"><span>Embassy processing</span><span style={{ color: 'var(--gold)' }}>⏳</span></div>
                      <div className="bv-bar"><div className="bv-fill" style={{ width: '70%' }} /></div>
                      <div className="bv-row"><span>Visa delivery</span><span style={{ color: 'var(--text-light)' }}>—</span></div>
                      <div className="bv-bar"><div className="bv-fill" style={{ width: '0%' }} /></div>
                    </div>
                  ) : (
                    <div className="bento-bg-num">0{idx + 1}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="s">
          <div className="container" style={{ maxWidth: 700 }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="s-tag" style={{ justifyContent: 'center' }}><span className="line" /> FAQ <span className="line" /></div>
              <div className="s-title">Common Questions</div>
            </div>
            <div className="faq-wrap">
              {FAQS.slice(0, 5).map((f, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{f.q}</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="s" style={{ background: 'linear-gradient(135deg,#0f172a,#1e3a8a)' }}>
          <div className="container">
            <div className="cta-inner" style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#fff' }}>Ready to start your application?</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>120+ destinations. Starts at ₹499. On-Time Guarantee.</p>
              <div className="cta-btns" style={{ justifyContent: 'center' }}>
                <a href="https://wa.me/918619666129?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20visa" target="_blank" rel="noopener noreferrer" className="cta-btn-primary" style={{ textDecoration: 'none' }}>Apply for a Visa →</a>
                <Link href="/pricing" className="cta-btn-outline" style={{ textDecoration: 'none' }}>View Pricing</Link>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-light)', borderTop: '1px solid var(--border)' }}>
          <Link href="/" style={{ color: 'var(--text-light)' }}>eVisas.in</Link> · <Link href="/pricing" style={{ color: 'var(--text-light)' }}>Pricing</Link> · <a href="mailto:info@evisas.in" style={{ color: 'var(--text-light)' }}>info@evisas.in</a>
        </div>
      </div>
    </>
  )
}
