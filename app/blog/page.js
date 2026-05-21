import Link from 'next/link'
import { BLOGS } from '../../lib/data'

export const metadata = {
  title: 'Visa Guides & Travel Tips — eVisas.in Blog',
  description: 'Expert visa guides for Indian travelers. Dubai visa tips, Schengen rejection fixes, US interview prep, Singapore vs Thailand comparison — all from India\'s #1 visa service.',
  openGraph: {
    title: 'Visa Guides for Indian Travelers — eVisas.in Blog',
    description: 'Expert tips on Dubai, USA, Schengen, Singapore, and 120+ other destinations. Written by visa experts who\'ve processed 2 lakh+ applications.',
    url: 'https://evisas.in/blog',
    siteName: 'eVisas.in',
    type: 'website',
  },
  alternates: { canonical: 'https://evisas.in/blog' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evisas.in' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://evisas.in/blog' },
  ],
}

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="country-page">
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '54px', padding: '0 5%',
          background: 'rgba(248,250,255,0.95)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 20px rgba(15,22,41,0.06)',
          position: 'sticky', top: 0, zIndex: 500,
        }}>
          <Link href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
            <div className="nav-logo-crop">
              <img src="/logo-icon.png" alt="eVisas.in" />
            </div>
          </Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: '0.9rem', color: '#64748b', textDecoration: 'none' }}>← Home</Link>
            <a href="https://wa.me/918619666129?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20visa" target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ fontSize: '0.85rem', padding: '0.55rem 1.4rem' }}>Apply Now →</a>
          </div>
        </nav>

        <div style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%)', padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '0.35rem 1rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>
            Visa Guides
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '1rem' }}>
            Learn Before<br /><span style={{ color: '#60a5fa' }}>You Apply</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto' }}>
            Expert visa guides written by our team of certified advisors. Dubai, USA, Schengen, and more — everything an Indian traveler needs to know.
          </p>
        </div>

        <div className="s">
          <div className="container">
            <div className="bgrid">
              {BLOGS.map((b, i) => (
                <Link key={i} href={`/blog/${b.slug}`} className="blog-card" style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}>
                  <div className="blog-img">
                    <div className="blog-bg" style={{ backgroundImage: `url('${b.img}')` }} />
                    <div className="blog-overlay" />
                    <span className="blog-emoji">{b.emoji}</span>
                    <span className="blog-tag-pill">{b.tag}</span>
                  </div>
                  <div className="blog-body">
                    <div className="blog-meta-row">
                      <span className="blog-date">{b.date}</span>
                      <span className="b-sep" />
                      <span className="blog-read-time">{b.read} read</span>
                    </div>
                    <div className="blog-title">{b.title}</div>
                    <div className="blog-excerpt">{b.excerpt}</div>
                    <div className="blog-footer-row">
                      <div className="blog-author-row">
                        <div className="blog-av" style={{ background: b.ac }}>{b.author[0]}</div>
                        <span className="blog-author-name">{b.author}</span>
                      </div>
                      <span style={{ fontSize: '0.82rem', color: 'var(--blue)', fontWeight: 600 }}>Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2.5rem', background: 'var(--surface)', borderRadius: 20, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>💬</div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)', marginBottom: '0.5rem' }}>Have a visa question?</div>
              <p style={{ color: 'var(--text-muted)', maxWidth: 440, margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
                Our visa experts answer questions on WhatsApp — usually within minutes. Ask about your specific situation.
              </p>
              <a href="https://wa.me/918619666129?text=Hi%2C%20I%20have%20a%20visa%20question" target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ textDecoration: 'none', display: 'inline-block' }}>Ask on WhatsApp →</a>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-light)', borderTop: '1px solid var(--border)' }}>
          <Link href="/" style={{ color: 'var(--text-light)' }}>eVisas.in</Link> · <Link href="/pricing" style={{ color: 'var(--text-light)' }}>Pricing</Link> · <Link href="/about" style={{ color: 'var(--text-light)' }}>About</Link>
        </div>
      </div>
    </>
  )
}
