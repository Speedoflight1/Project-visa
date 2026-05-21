import Link from 'next/link'
import { BLOGS } from '../../../lib/data'

export async function generateStaticParams() {
  return BLOGS.map(blog => ({ slug: blog.slug }))
}

export async function generateMetadata({ params }) {
  const blog = BLOGS.find(b => b.slug === params.slug)
  if (!blog) return {}
  const img = blog.img || 'https://evisas.in/logo-white.png'
  return {
    title: `${blog.title} — eVisas.in`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://evisas.in/blog/${blog.slug}`,
      siteName: 'eVisas.in',
      type: 'article',
      images: [{ url: img, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: { card: 'summary_large_image', title: blog.title, description: blog.excerpt, images: [img] },
    alternates: { canonical: `https://evisas.in/blog/${blog.slug}` },
  }
}

function ContentBlock({ block }) {
  switch (block.type) {
    case 'stats':
      return (
        <div style={{
          display: 'grid', gridTemplateColumns: `repeat(${block.items.length}, 1fr)`,
          gap: '1rem', margin: '2rem 0', padding: '1.5rem',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
          borderRadius: '16px',
        }}>
          {block.items.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 900, color: '#60a5fa', letterSpacing: '-1px' }}>{s.num}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )
    case 'section':
      return (
        <div style={{ margin: '2rem 0' }}>
          <h2 style={{ fontSize: 'clamp(1.15rem,2.5vw,1.4rem)', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.3px' }}>{block.h}</h2>
          {block.p && block.p.split('\n\n').map((para, i) => (
            <p key={i} style={{ color: '#374151', lineHeight: 1.75, marginBottom: '1rem', fontSize: '1rem' }}>{para}</p>
          ))}
        </div>
      )
    case 'tip':
      return (
        <div style={{
          margin: '1.5rem 0', padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderLeft: '4px solid #2563eb', borderRadius: '0 12px 12px 0',
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>💡 {block.title}</div>
          <p style={{ color: '#1e3a8a', lineHeight: 1.65, margin: 0, fontSize: '0.95rem' }}>{block.text}</p>
        </div>
      )
    case 'checklist':
      return (
        <ul style={{ margin: '1.5rem 0', paddingLeft: 0, listStyle: 'none' }}>
          {block.items.map((item, i) => (
            <li key={i} style={{
              display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
              padding: '0.6rem 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.95rem', color: '#374151',
            }}>
              <span style={{ color: '#16a34a', fontWeight: 700, flexShrink: 0, marginTop: '0.1rem' }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote style={{
          margin: '2rem 0', padding: '1.5rem 2rem',
          background: '#f8fafc', borderLeft: '4px solid #e2e8f0',
          borderRadius: '0 12px 12px 0',
        }}>
          <p style={{ color: '#475569', fontStyle: 'italic', lineHeight: 1.7, margin: 0, fontSize: '0.98rem' }}>{block.text}</p>
        </blockquote>
      )
    default:
      return null
  }
}

export default function BlogPostPage({ params }) {
  const blog = BLOGS.find(b => b.slug === params.slug)
  if (!blog) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h1>Article not found</h1>
        <Link href="/blog">← Back to Blog</Link>
      </div>
    )
  }

  const related = BLOGS.filter(b => b.slug !== blog.slug && b.tag === blog.tag).slice(0, 3)
  const fallbackRelated = BLOGS.filter(b => b.slug !== blog.slug).slice(0, 3)
  const relatedPosts = related.length >= 2 ? related : fallbackRelated

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.img || 'https://evisas.in/logo-white.png',
    datePublished: blog.date,
    dateModified: blog.date,
    author: { '@type': 'Person', name: blog.author },
    publisher: {
      '@type': 'Organization',
      name: 'eVisas.in',
      url: 'https://evisas.in',
      logo: { '@type': 'ImageObject', url: 'https://evisas.in/logo-white.png' },
    },
    url: `https://evisas.in/blog/${blog.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://evisas.in/blog/${blog.slug}` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://evisas.in' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://evisas.in/blog' },
      { '@type': 'ListItem', position: 3, name: blog.title, item: `https://evisas.in/blog/${blog.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
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
          <Link href="/blog" style={{ fontSize: '0.9rem', color: '#64748b', textDecoration: 'none' }}>← All Articles</Link>
          <a
            href="https://wa.me/918619666129?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20visa"
            target="_blank" rel="noopener noreferrer"
            className="btn-pill"
            style={{ fontSize: '0.85rem', padding: '0.55rem 1.4rem', textDecoration: 'none' }}
          >Apply Now →</a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${blog.img}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.25)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(3rem,8vw,5rem) 5% clamp(2.5rem,6vw,4rem)' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href="/blog" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Blog</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>{blog.tag}</span>
          </div>
          {/* Tag pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(96,165,250,0.2)', border: '1px solid rgba(96,165,250,0.35)', borderRadius: '100px', padding: '0.3rem 1rem', marginBottom: '1.25rem', fontSize: '0.8rem', color: '#93c5fd' }}>
            <span>{blog.emoji}</span><span>{blog.tag}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.75rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1px', lineHeight: 1.2, maxWidth: '760px', marginBottom: '1.25rem' }}>
            {blog.title}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.72)', maxWidth: '680px', lineHeight: 1.65, marginBottom: '2rem' }}>
            {blog.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: blog.ac, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>{blog.author[0]}</div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff' }}>{blog.author}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>eVisas.in Expert</div>
              </div>
            </div>
            <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)' }}>{blog.date}</span>
            <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)' }}>{blog.read} read</span>
          </div>
        </div>
      </div>

      {/* ── CONTENT ────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(2rem,5vw,3.5rem) 5%', display: 'grid', gridTemplateColumns: '1fr min(320px, 30%)', gap: '3rem', alignItems: 'start' }}>

        {/* Main article */}
        <article>
          {blog.content && blog.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}

          {/* Bottom CTA */}
          <div style={{ margin: '3rem 0 0', padding: '2rem', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>🛡️</div>
            <h3 style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>Ready to Apply?</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: 380, margin: '0 auto 1.5rem' }}>
              We handle everything — documents, appointments, follow-ups. 98% approval rate, pay in ₹, zero hidden fees.
            </p>
            <a
              href="https://wa.me/918619666129?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20visa"
              target="_blank" rel="noopener noreferrer"
              className="btn-pill"
              style={{ textDecoration: 'none', display: 'inline-block', fontSize: '1rem', padding: '0.75rem 2rem' }}
            >Start on WhatsApp →</a>
          </div>
        </article>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: '70px' }}>
          {/* Quick action */}
          <div style={{ padding: '1.5rem', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '16px', marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0369a1', marginBottom: '0.5rem' }}>💬 Have a question?</div>
            <p style={{ fontSize: '0.85rem', color: '#0c4a6e', lineHeight: 1.55, marginBottom: '1rem' }}>
              Our visa experts reply on WhatsApp within minutes — ask about your specific situation.
            </p>
            <a
              href="https://wa.me/918619666129?text=Hi%2C%20I%20have%20a%20visa%20question"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', textAlign: 'center', background: '#25d366', color: '#fff', fontWeight: 700, fontSize: '0.9rem', padding: '0.65rem 1rem', borderRadius: '100px', textDecoration: 'none' }}
            >Ask on WhatsApp</a>
          </div>
          {/* Pricing teaser */}
          <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: '1rem' }}>Our Service</div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ color: '#16a34a', fontSize: '1rem' }}>✓</span>
              <span style={{ fontSize: '0.85rem', color: '#374151' }}>Documents checklist & review</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ color: '#16a34a' }}>✓</span>
              <span style={{ fontSize: '0.85rem', color: '#374151' }}>DS-160 / application help</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ color: '#16a34a' }}>✓</span>
              <span style={{ fontSize: '0.85rem', color: '#374151' }}>On-time guarantee</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ color: '#16a34a' }}>✓</span>
              <span style={{ fontSize: '0.85rem', color: '#374151' }}>WhatsApp updates throughout</span>
            </div>
            <Link href="/" style={{ display: 'block', textAlign: 'center', background: '#2563eb', color: '#fff', fontWeight: 700, fontSize: '0.85rem', padding: '0.65rem 1rem', borderRadius: '100px', textDecoration: 'none' }}>See Pricing →</Link>
          </div>
        </aside>
      </div>

      {/* ── RELATED POSTS ──────────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: 'clamp(2rem,5vw,3rem) 5%' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a', marginBottom: '1.5rem' }}>More Visa Guides</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {relatedPosts.slice(0, 3).map((rel, i) => (
                <Link key={i} href={`/blog/${rel.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden', transition: 'box-shadow 0.2s' }}>
                  <div style={{ height: '140px', backgroundImage: `url('${rel.img}')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5))' }} />
                    <span style={{ position: 'absolute', bottom: '0.6rem', left: '0.75rem', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', padding: '0.2rem 0.6rem', fontSize: '0.7rem', color: '#fff' }}>{rel.tag}</span>
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', lineHeight: 1.4, marginBottom: '0.4rem' }}>{rel.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{rel.read} read</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.8rem', color: '#94a3b8', borderTop: '1px solid #e2e8f0' }}>
        <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>eVisas.in</Link>
        {' · '}
        <Link href="/blog" style={{ color: '#94a3b8', textDecoration: 'none' }}>Blog</Link>
        {' · '}
        <Link href="/usa-visa-from-india" style={{ color: '#94a3b8', textDecoration: 'none' }}>USA Visa</Link>
        {' · '}
        <Link href="/dubai-visa-from-india" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dubai Visa</Link>
        {' · '}
        <a href="https://wa.me/918619666129" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none' }}>WhatsApp</a>
      </div>
    </>
  )
}
