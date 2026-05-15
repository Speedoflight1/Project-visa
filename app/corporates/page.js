import Link from 'next/link'
import Logo from '../Logo'

export const metadata = {
  title: 'Corporate Visa Management — eVisas.in for Teams & Companies',
  description: 'Bulk visa management for Indian corporates. Dedicated account manager, GST invoicing, API access, real-time employee travel tracking. Trusted by TCS, Infosys, Wipro, and more.',
  openGraph: {
    title: 'Corporate Visa Management — eVisas.in for Teams',
    description: 'Manage all your company\'s visa applications in one place. GST invoicing, dedicated account manager, bulk pricing. Trusted by leading Indian companies.',
    url: 'https://evisas.in/corporates',
    siteName: 'eVisas.in',
    type: 'website',
  },
  alternates: { canonical: 'https://evisas.in/corporates' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evisas.in' },
    { '@type': 'ListItem', position: 2, name: 'Corporates', item: 'https://evisas.in/corporates' },
  ],
}

const b2bFeats = [
  { icon: '📊', title: 'Team Dashboard', desc: 'Track all employee applications in one place. Real-time status, deadlines, and alerts — built for HR teams.' },
  { icon: '👤', title: 'Dedicated Account Manager', desc: 'A named visa expert handles all your company applications. Direct phone, email, and WhatsApp access.' },
  { icon: '🧾', title: 'GST Invoicing', desc: 'All invoices are GST-compliant with your company GSTIN. Easy reconciliation for accounts teams.' },
  { icon: '🔌', title: 'API Access', desc: 'Integrate visa status updates directly into your HRMS or travel management system via our REST API.' },
  { icon: '💰', title: 'Bulk Pricing', desc: 'Save 15–35% on service fees with volume-based pricing. Custom quotes for 10+ applications/month.' },
  { icon: '🔒', title: 'Secure Data Handling', desc: 'SOC 2 compliant data storage. All employee passport data encrypted in transit and at rest.' },
]

const clients = ['TCS', 'Google', 'Infosys', 'PepsiCo', 'Wipro', 'Anglo Eastern Group', 'HCL Tech', 'Mahindra', 'Flipkart', 'Bajaj Finserv']

export default function CorporatesPage() {
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
              <a href="https://wa.me/918619666129?text=Hi%2C%20I%20am%20interested%20in%20corporate%20visa%20plans%20for%20my%20company" target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ fontSize: '0.85rem', padding: '0.55rem 1.4rem' }}>Contact Sales →</a>
            </div>
          </div>
        </nav>

        <div style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e1e3a 100%)', padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '0.35rem 1rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>
            Corporate Plans
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '1rem' }}>
            Visa Management for<br /><span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Teams &amp; Corporates</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto 2rem' }}>
            Manage employee travel visas at scale. Dedicated account manager, GST invoicing, API access, and bulk pricing — all in one dashboard.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/918619666129?text=Hi%2C%20I%20am%20interested%20in%20corporate%20visa%20plans%20for%20my%20company" target="_blank" rel="noopener noreferrer" className="cta-btn-primary" style={{ textDecoration: 'none', background: 'linear-gradient(135deg,#2563eb,#7c3aed)', border: 'none', padding: '0.9rem 2.2rem', borderRadius: '100px', color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>Contact Sales →</a>
            <a href="https://wa.me/918619666129?text=Hi%2C%20I%20want%20to%20book%20a%20demo%20for%20corporate%20visa%20management" target="_blank" rel="noopener noreferrer" className="cta-btn-outline" style={{ textDecoration: 'none', padding: '0.9rem 2.2rem', borderRadius: '100px', fontSize: '0.95rem' }}>Book a Demo</a>
          </div>
        </div>

        <div className="s" style={{ background: 'var(--surface)' }}>
          <div className="container">
            <div className="s-tag" style={{ justifyContent: 'center', marginBottom: '1rem' }}><span className="line" /> Trusted By <span className="line" /></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
              {clients.map(name => (
                <div key={name} style={{ padding: '0.6rem 1.25rem', background: '#fff', border: '1px solid var(--border)', borderRadius: 50, fontWeight: 700, color: 'var(--text)', fontSize: '0.88rem' }}>{name}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="s">
          <div className="container">
            <div className="s-tag" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}><span className="line" /> Enterprise Features <span className="line" /></div>
            <div className="s-title" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Everything your team needs</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
              {b2bFeats.map(f => (
                <div key={f.title} style={{ padding: '2rem', background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem', fontSize: '1rem' }}>{f.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.75, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="s" style={{ background: 'var(--surface)' }}>
          <div className="container" style={{ maxWidth: 600 }}>
            <div className="s-tag" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}><span className="line" /> Get a Quote <span className="line" /></div>
            <div className="s-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Get Your <span className="grad-text">Custom Quote</span></div>
            <p className="s-sub" style={{ textAlign: 'center', margin: '0 auto 2rem' }}>Every corporate has different travel needs. Tell us your requirements and we&apos;ll craft a tailored plan.</p>

            <div style={{ background: '#fff', borderRadius: 20, padding: '2.5rem', border: '1px solid var(--border)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
                Fill the form below and we&apos;ll respond via WhatsApp within 2 hours.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Company Name *', 'Your Name & Designation *', 'Work Email *', 'Approx. visa applications per month'].map((label, i) => (
                  <div key={i}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>{label}</label>
                    <input disabled placeholder={label.replace(' *', '')} style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: '0.9rem', background: 'var(--surface)', color: 'var(--text-muted)', cursor: 'not-allowed', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <a href="https://wa.me/918619666129?text=Hi%20eVisas.in%21%20I%27m%20interested%20in%20a%20corporate%20visa%20plan.%20Please%20send%20me%20a%20custom%20quote." target="_blank" rel="noopener noreferrer" className="cta-btn-primary" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', padding: '0.9rem', fontSize: '1rem', borderRadius: 12, marginTop: '0.5rem' }}>Request Quote via WhatsApp →</a>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '-0.25rem' }}>We respond within 2 business hours. No spam, ever.</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-light)', borderTop: '1px solid var(--border)' }}>
          <Link href="/" style={{ color: 'var(--text-light)' }}>eVisas.in</Link> · <Link href="/pricing" style={{ color: 'var(--text-light)' }}>Pricing</Link> · <Link href="/contact" style={{ color: 'var(--text-light)' }}>Contact</Link>
        </div>
      </div>
    </>
  )
}
