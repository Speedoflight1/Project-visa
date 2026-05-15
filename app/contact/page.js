import Link from 'next/link'

export const metadata = {
  title: 'Contact eVisas.in — WhatsApp, Email & Office Address',
  description: 'Contact eVisas.in for visa help. WhatsApp: +91 86196 66129. Email: info@evisas.in. Office: Noida UP. Response within minutes on WhatsApp.',
  openGraph: {
    title: 'Contact eVisas.in — Visa Help on WhatsApp',
    description: 'Get in touch with our visa experts. WhatsApp response within minutes. Office in Noida, Uttar Pradesh.',
    url: 'https://evisas.in/contact',
    siteName: 'eVisas.in',
    type: 'website',
  },
  alternates: { canonical: 'https://evisas.in/contact' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evisas.in' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://evisas.in/contact' },
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'eVisas.in',
  url: 'https://evisas.in',
  telephone: '+91-86196-66129',
  email: 'info@evisas.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'G9 Tower C, Bhutani Alphathum, Sector 90',
    addressLocality: 'Noida',
    addressRegion: 'UP',
    postalCode: '201304',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Su 09:00-21:00',
  priceRange: '₹₹',
}

const channels = [
  { icon: '💬', title: 'WhatsApp (Fastest)', desc: 'Get a response from our visa experts within minutes. Best for urgent queries and application updates.', cta: 'Chat on WhatsApp →', href: 'https://wa.me/918619666129?text=Hi%2C%20I%20need%20help%20with%20my%20visa%20application', badge: 'Avg. response: 5 min' },
  { icon: '✉️', title: 'Email', desc: 'For detailed queries, document review requests, or corporate inquiries. We respond within 4 hours.', cta: 'Send Email →', href: 'mailto:info@evisas.in', badge: 'Response: 4 hrs' },
  { icon: '📸', title: 'Instagram', desc: 'Follow us for visa tips, travel inspiration, and updates on new destinations. DM us for queries.', cta: 'Instagram →', href: 'https://www.instagram.com/evisas.in', badge: '@evisas.in' },
]

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <div className="country-page">
        <nav className="navbar" style={{ position: 'relative', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
          <div className="nav-inner">
            <Link href="/" className="nav-logo">
              <img src="/logo.jpeg" alt="eVisas.in" style={{ height: '52px', borderRadius: '8px' }} />
            </Link>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href="/" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← Home</Link>
              <a href="https://wa.me/918619666129?text=Hi%2C%20I%20need%20help%20with%20my%20visa%20application" target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ fontSize: '0.85rem', padding: '0.55rem 1.4rem' }}>WhatsApp Us →</a>
            </div>
          </div>
        </nav>

        <div style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%)', padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '0.35rem 1rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>
            Contact Us
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '1rem' }}>
            We&apos;re Here to Help.<br /><span style={{ color: '#4ade80' }}>Always.</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto' }}>
            Reach our visa experts on WhatsApp — fastest way to get answers. Average response time: 5 minutes.
          </p>
        </div>

        <div className="s">
          <div className="container" style={{ maxWidth: 860 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
              {channels.map(ch => (
                <div key={ch.title} style={{ padding: '2rem', background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{ch.icon}</div>
                  <div style={{ display: 'inline-block', background: 'rgba(37,99,235,0.08)', color: 'var(--blue)', borderRadius: 50, padding: '0.2rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>{ch.badge}</div>
                  <h3 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem', fontSize: '1rem' }}>{ch.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{ch.desc}</p>
                  <a href={ch.href} target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '0.85rem' }}>{ch.cta}</a>
                </div>
              ))}
            </div>

            <div style={{ padding: '2.5rem', background: 'var(--surface)', borderRadius: 20, border: '1px solid var(--border)' }}>
              <div className="s-tag" style={{ marginBottom: '1rem' }}><span className="line" /> Office Address</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem', fontSize: '1rem' }}>📍 Head Office</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                    G9 Tower C, Bhutani Alphathum<br />
                    Sector 90, Noida<br />
                    Uttar Pradesh — 201304<br />
                    India
                  </p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem', fontSize: '1rem' }}>🕐 Support Hours</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                    Monday – Sunday<br />
                    9:00 AM – 9:00 PM IST<br />
                    WhatsApp available 24/7<br />
                    for urgent queries
                  </p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem', fontSize: '1rem' }}>📞 Direct Contact</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <a href="https://wa.me/918619666129" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.88rem', color: 'var(--blue)', textDecoration: 'none' }}>💬 +91 86196 66129</a>
                    <a href="mailto:info@evisas.in" style={{ fontSize: '0.88rem', color: 'var(--blue)', textDecoration: 'none' }}>✉️ info@evisas.in</a>
                    <a href="https://www.instagram.com/evisas.in" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.88rem', color: 'var(--blue)', textDecoration: 'none' }}>📸 @evisas.in</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-light)', borderTop: '1px solid var(--border)' }}>
          <Link href="/" style={{ color: 'var(--text-light)' }}>eVisas.in</Link> · <Link href="/about" style={{ color: 'var(--text-light)' }}>About</Link> · <Link href="/privacy" style={{ color: 'var(--text-light)' }}>Privacy</Link>
        </div>
      </div>
    </>
  )
}
