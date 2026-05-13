import Link from 'next/link'
import { PLANS, FAQS } from '../../lib/data'

export const metadata = {
  title: 'Visa Service Pricing — eVisas.in | Starting ₹499',
  description: 'Transparent visa service pricing for Indians. Basic plan from ₹499 — no hidden fees, pay in ₹. Pro plan includes dummy ticket & travel insurance. On-Time Guarantee on every plan.',
  openGraph: {
    title: 'Visa Service Pricing — eVisas.in | Starting ₹499',
    description: 'No hidden fees. Pay in ₹. Expert visa assistance for 120+ countries — starting at ₹499.',
    url: 'https://evisas.in/pricing',
    siteName: 'eVisas.in',
    type: 'website',
  },
  alternates: { canonical: 'https://evisas.in/pricing' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evisas.in' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://evisas.in/pricing' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does eVisas.in charge for visa services?', acceptedAnswer: { '@type': 'Answer', text: 'eVisas.in charges a service fee starting at ₹499 per visa application. This is separate from any government visa fees. Our Pro plan at ₹1,999 includes dummy airline tickets, hotel booking, and travel insurance.' } },
    { '@type': 'Question', name: 'Are there any hidden fees?', acceptedAnswer: { '@type': 'Answer', text: 'No hidden fees. The price shown is the complete service fee. Government visa fees (where applicable) are additional and disclosed before you apply. All amounts in INR with zero forex markup.' } },
    { '@type': 'Question', name: 'What is the On-Time Guarantee?', acceptedAnswer: { '@type': 'Answer', text: 'If your visa is not delivered before your stated travel date due to any issue on our side, we refund 100% of your eVisas.in service fee automatically. No questions asked.' } },
  ],
}

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="country-page">
        <nav className="navbar" style={{ position: 'relative', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
          <div className="nav-inner">
            <Link href="/" className="nav-logo">
              <img src="/logo.jpeg" alt="eVisas.in" style={{ height: '52px', borderRadius: '8px' }} />
            </Link>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href="/" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← All Visas</Link>
              <a href="https://wa.me/918619666129?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20visa" target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ fontSize: '0.85rem', padding: '0.55rem 1.4rem' }}>Apply Now →</a>
            </div>
          </div>
        </nav>

        <div style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%)', padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '0.35rem 1rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>
            Simple Pricing
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '1rem' }}>
            Transparent Pricing.<br /><span style={{ color: '#4ade80' }}>No Hidden Fees.</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', maxWidth: 540, margin: '0 auto 1.5rem' }}>
            Secure your visa starting at just ₹499. Complete fees only charged once your visa is approved.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>
            <span>✓ Pay in ₹</span>
            <span>·</span>
            <span>✓ No forex fees</span>
            <span>·</span>
            <span>✓ On-Time Guarantee</span>
            <span>·</span>
            <span>✓ 98% success rate</span>
          </div>
        </div>

        <div className="s" style={{ paddingTop: '3.5rem' }}>
          <div className="container">
            <div className="pgrid">
              {PLANS.map((p, i) => (
                <div key={i} className={`pcard${p.featured ? ' featured' : ''}`}>
                  {p.featured && <div className="featured-ribbon">MOST POPULAR</div>}
                  <div className="plan-tag">{p.tag}</div>
                  <div className="plan-amount"><sub>₹</sub>{p.amount}<sup>{p.per}</sup></div>
                  <div className="plan-desc">{p.desc}</div>
                  <ul className="plan-list">
                    {p.feats.map((f, j) => <li key={j}><span className="li-check">✓</span>{f}</li>)}
                    {p.missing.map((m, j) => <li key={`m${j}`} className="dim"><span className="li-cross">✕</span>{m}</li>)}
                  </ul>
                  <a href={`https://wa.me/918619666129?text=Hi%20eVisas.in%21%20I%20want%20to%20apply%20-%20Plan%3A%20${encodeURIComponent(p.tag)}`} target="_blank" rel="noopener noreferrer" className={`plan-cta ${p.ctaCls}`} style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>{p.cta}</a>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem', padding: '2rem', background: 'linear-gradient(135deg,rgba(37,99,235,0.06),rgba(124,58,237,0.06))', borderRadius: 20, border: '1px solid rgba(37,99,235,0.12)' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>🛡️</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)', marginBottom: '0.5rem' }}>On-Time Guarantee — on every plan</div>
              <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', fontSize: '0.9rem' }}>
                Your visa delivered before your travel date or a 100% refund of your service fee. Automatic. No forms. No wait.
              </p>
            </div>
          </div>
        </div>

        <div className="s">
          <div className="container" style={{ maxWidth: 700 }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="s-tag" style={{ justifyContent: 'center' }}><span className="line" /> FAQ <span className="line" /></div>
              <div className="s-title">Pricing Questions</div>
            </div>
            <div className="faq-wrap">
              {FAQS.slice(4).map((f, i) => (
                <div key={i} className="faq-item" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{f.q}</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="s" id="cta" style={{ background: 'linear-gradient(135deg,#0f172a,#1e3a8a)', borderRadius: 0 }}>
          <div className="container">
            <div className="cta-inner" style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#fff' }}>Ready to apply?</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Start your application in 5 minutes. WhatsApp us or browse all 120+ destinations.</p>
              <div className="cta-btns" style={{ justifyContent: 'center' }}>
                <a href="https://wa.me/918619666129?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20visa" target="_blank" rel="noopener noreferrer" className="cta-btn-primary" style={{ textDecoration: 'none' }}>Start Application →</a>
                <Link href="/" className="cta-btn-outline" style={{ textDecoration: 'none' }}>Browse Destinations</Link>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-light)', borderTop: '1px solid var(--border)' }}>
          <Link href="/" style={{ color: 'var(--text-light)' }}>eVisas.in</Link> · <a href="https://wa.me/918619666129" style={{ color: 'var(--text-light)' }}>WhatsApp</a> · <a href="mailto:info@evisas.in" style={{ color: 'var(--text-light)' }}>info@evisas.in</a>
        </div>
      </div>
    </>
  )
}
