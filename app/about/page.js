import Link from 'next/link'
import Logo from '../Logo'

export const metadata = {
  title: 'About eVisas.in — India\'s Most Trusted Visa Service',
  description: 'eVisas.in has helped 2 lakh+ Indian travelers get their visas since 2019. Expert team, 120+ countries, 98% success rate. Part of the TravelKart Group. Based in Noida, India.',
  openGraph: {
    title: 'About eVisas.in — India\'s Most Trusted Visa Service Since 2019',
    description: '5 years, 120+ countries, 2 lakh+ visas processed. Expert team based in Noida. On-Time Guarantee on every application.',
    url: 'https://evisas.in/about',
    siteName: 'eVisas.in',
    type: 'website',
  },
  alternates: { canonical: 'https://evisas.in/about' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evisas.in' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://evisas.in/about' },
  ],
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'eVisas.in',
  url: 'https://evisas.in',
  logo: 'https://evisas.in/logo.jpeg',
  foundingDate: '2019',
  description: 'India\'s most trusted visa facilitation service. Expert guidance for 120+ countries, WhatsApp updates, On-Time Guarantee.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'G9 Tower C, Bhutani Alphathum, Sector 90',
    addressLocality: 'Noida',
    addressRegion: 'UP',
    postalCode: '201304',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-86196-66129',
    contactType: 'customer service',
    availableLanguage: ['Hindi', 'English'],
  },
  sameAs: ['https://www.instagram.com/evisas.in'],
}

const values = [
  { icon: '🌍', title: 'Global Expertise', desc: 'Our visa experts have deep knowledge of consular requirements across 120+ countries. We stay updated on every policy change so you don\'t have to.' },
  { icon: '🤝', title: 'Trusted Partner', desc: 'Trusted by individual travelers, families, and corporate clients. Over 2 lakh successful visa applications speak for our reliability.' },
  { icon: '⚡', title: 'Speed & Transparency', desc: 'Honest timelines and real-time WhatsApp updates. No false promises — just accurate information and fast execution.' },
  { icon: '🛡️', title: 'On-Time Guarantee', desc: 'Every application comes with our On-Time Guarantee. If we miss your travel date for any covered reason, you get a full refund.' },
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
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
            About Us
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '1rem' }}>
            India&apos;s Most Trusted<br /><span style={{ color: '#60a5fa' }}>Visa Service</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto' }}>
            We&apos;ve been helping Indian travelers navigate visa complexities since 2019 — 5+ years of expertise, 120+ countries, and 2 lakh+ happy travelers.
          </p>
        </div>

        <div className="s">
          <div className="container">
            <div className="about-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
              {[['5+','Years of Experience'],['120+','Countries Covered'],['2L+','Visas Processed'],['98%','Success Rate'],['4.8★','Google Rating']].map(([num, label]) => (
                <div key={label} style={{ textAlign: 'center', padding: '2rem 1rem', background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, background: 'linear-gradient(135deg,var(--blue),var(--purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.4rem' }}>{num}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ maxWidth: 760, margin: '0 auto 3.5rem' }}>
              <div className="s-tag" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}><span className="line" /> Our Story</div>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.9 }}>
                eVisas.in was founded in 2019 with one goal: to make visa applications stress-free for Indian passport holders. We saw how confusing, expensive, and uncertain the process was — so we built a service that combines expert human guidance with smart technology.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.9, marginTop: '1rem' }}>
                Over the past 5+ years, we&apos;ve grown into India&apos;s most reliable visa facilitation service. Our team of certified visa experts has processed over 2 lakh applications across 120+ countries — from quick UAE e-Visas to complex US and Schengen sticker visas.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.9, marginTop: '1rem' }}>
                We&apos;re headquartered in Noida, Uttar Pradesh, and proudly serve customers across every state in India — from tier-1 metros to smaller cities where access to visa expertise has historically been limited.
              </p>
            </div>

            <div style={{ marginBottom: '3.5rem' }}>
              <div className="s-tag" style={{ justifyContent: 'center', marginBottom: '2rem' }}><span className="line" /> Our Values</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.5rem' }}>
                {values.map(v => (
                  <div key={v.title} style={{ padding: '2rem', background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{v.icon}</div>
                    <h3 style={{ fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem', fontSize: '1rem' }}>{v.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.75, margin: 0 }}>{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '2.5rem', background: 'linear-gradient(135deg,rgba(37,99,235,0.06),rgba(124,58,237,0.06))', borderRadius: 20, border: '1px solid rgba(37,99,235,0.12)', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>🧳 Part of the TravelKart Group</div>
              <p style={{ color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
                eVisas.in is part of TravelKart — a comprehensive travel ecosystem covering flight bookings, hotel reservations, holiday packages, and travel insurance.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>📍 G9 Tower C, Bhutani Alphathum, Sector 90, Noida UP 201304</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <a href="mailto:info@evisas.in" style={{ fontSize: '0.85rem', color: 'var(--blue)', textDecoration: 'none' }}>✉️ info@evisas.in</a>
                <a href="https://wa.me/918619666129" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--blue)', textDecoration: 'none' }}>💬 +91 86196 66129</a>
                <a href="https://www.instagram.com/evisas.in" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--blue)', textDecoration: 'none' }}>📸 instagram.com/evisas.in</a>
              </div>
            </div>
          </div>
        </div>

        <div className="s" style={{ background: 'linear-gradient(135deg,#0f172a,#1e3a8a)' }}>
          <div className="container">
            <div className="cta-inner" style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#fff' }}>Ready to get your visa?</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Join 2 lakh+ Indian travelers who got their visa on time, every time.</p>
              <div className="cta-btns" style={{ justifyContent: 'center' }}>
                <Link href="/" className="cta-btn-primary" style={{ textDecoration: 'none' }}>Browse Destinations →</Link>
                <a href="https://wa.me/918619666129?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20visa" target="_blank" rel="noopener noreferrer" className="cta-btn-outline" style={{ textDecoration: 'none' }}>Talk to an Expert</a>
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
