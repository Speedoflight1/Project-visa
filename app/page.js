'use client'

import { useEffect, useState, useRef } from 'react'
import {
  DESTS, TYPE_LABEL, TYPE_CLS, POPULAR_SLUGS,
  STEPS, FEATURES, TRUST, TESTIMONIALS, PLANS, BLOGS, FAQS, POLICIES,
} from '../lib/data'

/* ── helpers ── */
const WA_NUM = '918619666129'
function openWhatsApp(msg, label = 'general') {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'whatsapp_click', { event_category: 'engagement', event_label: label })
  }
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Contact')
  }
  const text = msg || 'Hi, I need help with my visa application'
  if (typeof window !== 'undefined')
    window.open('https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent(text), '_blank')
}

function openApplyFormWA(plan, country) {
  const base = 'Hi eVisas.in! I want to apply for a visa.'
  const planStr = plan ? `\nPlan: ${plan}` : ''
  const cStr = country ? `\nDestination: ${country}` : ''
  openWhatsApp(base + cStr + planStr + '\n\nPlease help me proceed.', country || plan || 'apply_form')
}

/* SVG icons */
const WaSvg = () => (
  <svg viewBox="0 0 24 24" style={{ width: 28, height: 28, fill: '#fff' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function HomePage() {
  /* ── state ── */
  const [loaderDone, setLoaderDone] = useState(false)
  const [activeRegion, setActiveRegion] = useState('all')
  const [searchQ, setSearchQ] = useState('')
  const [showingPopular, setShowingPopular] = useState(true)
  const [suggestions, setSuggestions] = useState([])
  const [showSugg, setShowSugg] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [countryDetail, setCountryDetail] = useState(null)
  const [blogDetail, setBlogDetail] = useState(null)
  const [showGuarantee, setShowGuarantee] = useState(false)
  const [showB2B, setShowB2B] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [policyType, setPolicyType] = useState(null)
  const [applyModal, setApplyModal] = useState(false)
  const [toast, setToast] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openFaqIdx, setOpenFaqIdx] = useState(null)
  const [heroVisible, setHeroVisible] = useState(false)
  const [navSolid, setNavSolid] = useState(false)
  const toastTimer = useRef(null)

  /* ── destinations list ── */
  const destList = (() => {
    if (showingPopular && activeRegion === 'all' && !searchQ)
      return POPULAR_SLUGS.map(s => DESTS.find(d => d.slug === s)).filter(Boolean)
    return DESTS.filter(d =>
      (activeRegion === 'all' || d.region === activeRegion) &&
      (d.c.toLowerCase().includes(searchQ.toLowerCase()) ||
       (d.fullName && d.fullName.toLowerCase().includes(searchQ.toLowerCase())))
    )
  })()

  /* ── scroll / loader / init ── */
  useEffect(() => {
    const timer = setTimeout(() => setLoaderDone(true), 1600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loaderDone) {
      setTimeout(() => setHeroVisible(true), 100)
      setTimeout(animCounters, 900)
      initReveal()
    }
  }, [loaderDone])

  useEffect(() => {
    const onScroll = () => {
      setNavSolid(window.scrollY > 40)
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      const bar = document.getElementById('progress-bar')
      if (bar) bar.style.transform = `scaleX(${pct})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (loaderDone) setTimeout(initReveal, 200)
  })

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (countryDetail) { closeCountry(); return }
        if (blogDetail !== null) { setBlogDetail(null); unlockScroll(); return }
        if (showGuarantee) { setShowGuarantee(false); unlockScroll(); return }
        if (showB2B) { setShowB2B(false); unlockScroll(); return }
        if (showAbout) { setShowAbout(false); unlockScroll(); return }
        if (policyType) { setPolicyType(null); unlockScroll(); return }
        if (applyModal) { setApplyModal(false); unlockScroll(); return }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  /* ── hash routing ── */
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash.startsWith('#visa/')) {
        const slug = hash.replace('#visa/', '')
        const d = DESTS.find(x => x.slug === slug)
        if (d) { setCountryDetail(d); lockScroll() }
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  /* ── helpers ── */
  function lockScroll() { document.body.style.overflow = 'hidden' }
  function unlockScroll() { document.body.style.overflow = '' }

  function showToastMsg(msg) {
    setToast(msg)
    setToastVisible(true)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastVisible(false), 3000)
  }

  function closeCountry() {
    setCountryDetail(null)
    unlockScroll()
    history.pushState('', document.title, window.location.pathname)
  }

  function openCountry(d) {
    setCountryDetail(d)
    lockScroll()
    window.location.hash = 'visa/' + d.slug
  }

  function animCounters() {
    document.querySelectorAll('[data-target]').forEach(el => {
      const target = parseFloat(el.dataset.target)
      const suf = el.dataset.suf || ''
      const isFloat = el.dataset.float === 'true'
      const dur = 2000
      const start = performance.now()
      const tick = now => {
        const p = Math.min((now - start) / dur, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        const val = isFloat ? (ease * target).toFixed(1) : Math.floor(ease * target)
        el.textContent = val + suf
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
  }

  function initReveal() {
    const els = document.querySelectorAll('.reveal-up:not(.visible)')
    if (!els.length) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => io.observe(el))
  }

  function handleSearch(v) {
    setSearchQ(v)
    if (!v.trim()) { setSuggestions([]); setShowSugg(false); setSearchActive(false); return }
    const matches = DESTS.filter(d =>
      d.c.toLowerCase().includes(v.toLowerCase()) ||
      (d.fullName && d.fullName.toLowerCase().includes(v.toLowerCase()))
    ).slice(0, 6)
    setSuggestions(matches)
    setShowSugg(true)
    setSearchActive(true)
    setShowingPopular(false)
  }

  function selectSugg(d) {
    setSearchQ(d.c)
    setShowSugg(false)
    setSearchActive(false)
    setShowingPopular(false)
    setTimeout(() => openCountry(d), 200)
  }

  function commitSearch() {
    setShowSugg(false)
    setSearchActive(false)
    setShowingPopular(false)
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
  }

  function scrollToDest() {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
  }

  function showAllCountries() {
    setShowingPopular(false)
    setActiveRegion('all')
    setSearchQ('')
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
  }

  /* ── blog content renderer ── */
  function renderBlogContent(content) {
    return content.map((s, i) => {
      if (s.type === 'section') return (
        <div className="ba-section" key={i}><h2>{s.h}</h2><p>{s.p}</p></div>
      )
      if (s.type === 'tip') return (
        <div className="tip-box" key={i}>
          <div className="tip-box-title">💡 {s.title}</div>
          <p>{s.text}</p>
        </div>
      )
      if (s.type === 'quote') return (
        <div className="quote-block" key={i}>{s.text}</div>
      )
      if (s.type === 'stats') return (
        <div className="ba-stats" key={i}>
          {s.items.map((item, j) => (
            <div className="ba-stat-box" key={j}>
              <div className="ba-stat-num">{item.num}</div>
              <div className="ba-stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      )
      if (s.type === 'checklist') return (
        <ul className="ba-checklist" key={i}>
          {s.items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      )
      return null
    })
  }

  const corps = [
    { name: 'TCS', domain: 'tcs.com' }, { name: 'Google', domain: 'google.com' },
    { name: 'Infosys', domain: 'infosys.com' }, { name: 'PepsiCo', domain: 'pepsico.com' },
    { name: 'Wipro', domain: 'wipro.com' }, { name: 'HCL Tech', domain: 'hcltech.com' },
    { name: 'Mahindra', domain: 'mahindra.com' }, { name: 'Anglo Eastern', domain: 'angloeastern.com' },
    { name: 'Flipkart', domain: 'flipkart.com' }, { name: 'Coursera', domain: 'coursera.org' },
    { name: 'Bajaj Finserv', domain: 'bajajfinserv.in' }, { name: 'Reliance', domain: 'ril.com' },
  ]
  const marqueeItems = [...corps, ...corps]

  /* ── LOADER ── */
  if (!loaderDone) {
    return (
      <div id="loader">
        <div className="loader-logo">
          <div className="loader-logo-crop">
            <img src="/logo-icon.png" alt="eVisas" />
          </div>
        </div>
        <div className="loader-bar-wrap"><div className="loader-bar" /></div>
      </div>
    )
  }

  /* ── MAIN PAGE ── */
  return (
    <>
      <div id="progress-bar" />

      {/* ── NAVBAR ── */}
      <nav id="nav" className={navSolid ? 'solid' : ''}>
        <div className="nav-logo" onClick={() => { closeCountry(); if (blogDetail !== null) { setBlogDetail(null); unlockScroll() } window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ cursor: 'pointer' }}>
          <div className="nav-logo-crop">
            <img src="/logo-icon.png" alt="eVisas" onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
          </div>
          <span style={{ display: 'none', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.5px', background: 'linear-gradient(135deg,var(--blue),var(--purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>eVisas</span>
        </div>
        <div className="nav-links">
          <a href="#destinations" onClick={e => { e.preventDefault(); scrollToDest() }}>Destinations</a>
          <a href="#how" onClick={e => { e.preventDefault(); document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }) }}>How It Works</a>
          <a href="#" onClick={e => { e.preventDefault(); setShowGuarantee(true); lockScroll() }}>Guaranteed</a>
          <a href="#pricing" onClick={e => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }}>Pricing</a>
          <a href="#" onClick={e => { e.preventDefault(); setShowB2B(true); lockScroll() }} style={{ color: 'var(--blue)' }}>Corporates</a>
          <a href="#blog" onClick={e => { e.preventDefault(); document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }) }}>Blog</a>
        </div>
        <div className="nav-actions">
          <button className="btn-pill" onClick={() => { setApplyModal(true); lockScroll() }}>Apply Now →</button>
        </div>
        <div className={`ham${mobileOpen ? ' open' : ''}`} onClick={() => { setMobileOpen(!mobileOpen); document.body.style.overflow = mobileOpen ? '' : 'hidden' }}>
          <span /><span /><span />
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <a href="#" onClick={e => { e.preventDefault(); setMobileOpen(false); unlockScroll(); setTimeout(scrollToDest, 300) }}>Destinations</a>
        <a href="#how" onClick={e => { e.preventDefault(); setMobileOpen(false); unlockScroll(); setTimeout(() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }), 300) }}>How It Works</a>
        <a href="#" onClick={e => { e.preventDefault(); setMobileOpen(false); unlockScroll(); setTimeout(() => { setShowGuarantee(true); lockScroll() }, 300) }}>Guaranteed</a>
        <a href="#" onClick={e => { e.preventDefault(); setMobileOpen(false); unlockScroll(); setTimeout(() => { setShowB2B(true); lockScroll() }, 300) }} style={{ color: 'var(--blue)' }}>Corporates</a>
        <a href="#pricing" onClick={e => { e.preventDefault(); setMobileOpen(false); unlockScroll(); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 300) }}>Pricing</a>
        <a href="#blog" onClick={e => { e.preventDefault(); setMobileOpen(false); unlockScroll(); setTimeout(() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }), 300) }}>Blog</a>
        <button className="btn-pill" style={{ fontSize: '1.1rem', padding: '0.8rem 2.5rem' }} onClick={() => { setMobileOpen(false); unlockScroll(); setTimeout(() => { setApplyModal(true); lockScroll() }, 300) }}>Apply Now →</button>
      </div>

      {/* ── HERO ── */}
      <section id="hero">
        <div className="hero-badge" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s' }}>
          <div className="badge-dot" /> Trusted by 2L+ Indian Travelers
        </div>
        <h1 className="hero-title">
          Get Your <span className="grad-text">Visa</span>,<br />
          On Time. <span style={{ color: 'var(--green)' }}>Guaranteed.</span>
        </h1>
        <p className="hero-sub" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s' }}>
          120+ countries. Expert guidance. WhatsApp updates. Pay in ₹ — no forex charges, no hidden fees.
        </p>

        <div className="search-outer">
          <div className="search-wrap" id="heroSearch" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s' }}>
            <span className="search-icon">✈️</span>
            <input
              type="text"
              autoComplete="off"
              placeholder="Search destination — Dubai, USA, Schengen, Thailand..."
              value={searchQ}
              onChange={e => handleSearch(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') commitSearch(); if (e.key === 'Escape') { setShowSugg(false); setSearchActive(false) } }}
              onFocus={() => { if (searchQ) { setShowSugg(true); setSearchActive(true) } }}
            />
            <button className="search-btn" onClick={commitSearch}>Search Visas</button>
          </div>
          {showSugg && (
            <div className="search-suggestions show">
              {suggestions.length === 0
                ? <div className="sugg-empty">No destinations found for &quot;{searchQ}&quot;</div>
                : suggestions.map(d => (
                  <div key={d.slug} className="sugg-item" onClick={() => selectSugg(d)}>
                    <span className="sugg-flag">{d.f}</span>
                    <div className="sugg-info">
                      <div className="sugg-name">{d.fullName || d.c}</div>
                      <div className="sugg-meta">{TYPE_LABEL[d.type]} · {d.proc} · {d.price}</div>
                    </div>
                    <span className="sugg-arrow">→</span>
                  </div>
                ))
              }
            </div>
          )}
        </div>

        <div className={`hero-stats${searchActive ? ' search-active' : ''}`} id="heroStats" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s' }}>
          <div className="hstat"><div className="hstat-num" data-target="120" data-suf="+">0</div><div className="hstat-label">Destinations</div></div>
          <div className="hstat"><div className="hstat-num" data-target="2" data-suf="L+ Visas">0</div><div className="hstat-label">Processed</div></div>
          <div className="hstat"><div className="hstat-num" data-target="98" data-suf="%">0</div><div className="hstat-label">Success Rate</div></div>
          <div className="hstat"><div className="hstat-num" data-target="24" data-suf="hr">0</div><div className="hstat-label">Processing</div></div>
          <div className="hstat"><div className="hstat-num" data-target="4.8" data-suf="★" data-float="true">0</div><div className="hstat-label">Google Rating</div></div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-hint-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-section">
        <div className="marquee-inner">
          <div className="marquee-label">Trusted by<br />Corporates</div>
          <div className="marquee-divider" />
          <div className="marquee-overflow">
            <div className="marquee-track">
              {marqueeItems.map((c, i) => (
                <>
                  <div key={`corp-${i}`} className="marquee-item">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=32`}
                      alt={c.name}
                      onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                    />
                    <div className="marquee-logo-fallback" style={{ display: 'none' }}>{c.name[0]}</div>
                    {c.name}
                  </div>
                  <div key={`sep-${i}`} className="marquee-sep">·</div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── DESTINATIONS ── */}
      <section className="s" id="destinations">
        <div className="container">
          <div className="dest-header reveal-up">
            <div>
              <div className="s-tag"><span className="line" /> Popular Destinations</div>
              <div className="s-title">Where are you headed?</div>
            </div>
            <button className="view-all" onClick={showAllCountries}>All Countries →</button>
          </div>
          <div className="tabs reveal-up">
            {[
              ['all', '🌍 All'], ['asia', '🌏 Asia'], ['europe', '🏰 Europe'],
              ['middle-east', '🌙 Middle East'], ['americas', '🗽 Americas'], ['africa', '🦁 Africa'], ['oceania', '🌊 Oceania'],
            ].map(([val, label]) => (
              <button
                key={val}
                className={`tab-btn${activeRegion === val ? ' on' : ''}`}
                onClick={() => { setActiveRegion(val); setShowingPopular(false) }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="dest-grid">
            {destList.map((d, i) => (
              <div
                key={d.slug}
                className="dcard reveal-up"
                style={{ transitionDelay: `${i * 50}ms` }}
                onClick={() => openCountry(d)}
              >
                <div className="dcard-img">
                  <div className="dcard-bg" style={{ backgroundImage: `url('${d.img}')` }} />
                  <div className="dcard-overlay" />
                  <div className="dcard-flag">{d.f}</div>
                  <span className={`dcard-badge ${TYPE_CLS[d.type]}`}>{TYPE_LABEL[d.type]}</span>
                </div>
                <div className="dcard-body">
                  <div className="dcard-name">{d.c} Visa</div>
                  <div className="dcard-meta">
                    <div className="dmeta">⏱ {d.proc}</div>
                    <div className="dmeta">📅 {d.val}</div>
                    <div className="dmeta">📄 {d.docs}</div>
                  </div>
                  <div className="dcard-footer">
                    <div className="dcard-price">
                      <span className="big">{d.price}</span>
                      <small>service fee</small>
                    </div>
                    <button className="apply-btn" onClick={e => { e.stopPropagation(); openCountry(d) }}>View Details →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="s" id="how">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }} className="reveal-up">
            <div className="s-tag"><span className="line" /> Simple Process <span className="line" /></div>
            <div className="s-title">Your visa in 4 easy steps</div>
            <p className="s-sub" style={{ margin: '0 auto' }}>No embassy visits. No confusing paperwork. Just a clean digital experience built for Indian travelers.</p>
          </div>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={i} className="step-card reveal-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="step-num">0{i + 1}</div>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES BENTO ── */}
      <section className="s" id="features">
        <div className="container">
          <div className="reveal-up">
            <div className="s-tag"><span className="line" /> Why eVisas.in</div>
            <div className="s-title">Built different.<br />Built for India.</div>
            <p className="s-sub">Every feature designed to solve the real problems Indian passport holders face when applying for visas abroad.</p>
          </div>
          <div className="bento">
            {FEATURES.map((f, idx) => (
              <div key={f.cls} className={`bento-card ${f.cls} reveal-up`}>
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
      </section>

      {/* ── TRUST STATS ── */}
      <section className="s" id="trust">
        <div className="container">
          <div style={{ textAlign: 'center' }} className="reveal-up">
            <div className="s-tag" style={{ color: 'rgba(255,255,255,0.6)', justifyContent: 'center' }}>
              <span className="line" style={{ background: 'rgba(255,255,255,0.4)' }} /> Our Numbers <span className="line" style={{ background: 'rgba(255,255,255,0.4)' }} />
            </div>
            <div className="s-title" style={{ color: '#fff' }}>Trusted by travelers<br />across India</div>
          </div>
          <div className="trust-grid">
            {TRUST.map((t, i) => (
              <div key={i} className="tstat reveal-up">
                <div className="tstat-num">{t.num}</div>
                <div className="tstat-label">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="s" id="testimonials">
        <div className="container">
          <div className="reveal-up">
            <div className="s-tag"><span className="line" /> Real Reviews</div>
            <div className="s-title">What travelers say</div>
            <p className="s-sub">Over 2 lakh Indians have used eVisas.in. Here&apos;s what some of them had to say.</p>
          </div>
          <div className="tgrid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="tcard reveal-up">
                <div className="stars">★★★★★</div>
                <p className="tcard-text">&quot;{t.text}&quot;</p>
                <div className="tcard-author">
                  <div className="avatar" style={{ background: t.color }}>{t.name[0]}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-meta">{t.city} · {t.flag} {t.dest}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="s" id="pricing">
        <div className="container">
          <div className="reveal-up">
            <div className="s-tag"><span className="line" /> Simple Pricing</div>
            <div className="s-title">Secure your visa starting at just <span className="grad-text">₹499</span></div>
            <p className="s-sub">No hidden fees. Complete fees are only charged once your visa is approved.</p>
          </div>
          <div className="pgrid">
            {PLANS.map((p, i) => (
              <div key={i} className={`pcard${p.featured ? ' featured' : ''} reveal-up`}>
                {p.featured && <div className="featured-ribbon">MOST POPULAR</div>}
                <div className="plan-tag">{p.tag}</div>
                <div className="plan-amount"><sub>₹</sub>{p.amount}<sup>{p.per}</sup></div>
                <div className="plan-desc">{p.desc}</div>
                <ul className="plan-list">
                  {p.feats.map((f, j) => <li key={j}><span className="li-check">✓</span>{f}</li>)}
                  {p.missing.map((m, j) => <li key={`m${j}`} className="dim"><span className="li-cross">✕</span>{m}</li>)}
                </ul>
                <button className={`plan-cta ${p.ctaCls}`} onClick={() => openApplyFormWA(p.tag)}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="s" id="blog">
        <div className="container">
          <div className="dest-header reveal-up">
            <div>
              <div className="s-tag"><span className="line" /> Visa Guides</div>
              <div className="s-title">Learn before you apply</div>
            </div>
            <button className="view-all" onClick={() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })}>All articles →</button>
          </div>
          <div className="bgrid">
            {BLOGS.map((b, i) => (
              <div key={i} className="blog-card reveal-up" style={{ transitionDelay: `${i * 60}ms` }} onClick={() => { setBlogDetail(i); lockScroll() }}>
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
                    <span className="blog-read-link">Read →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="s" id="faq">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }} className="reveal-up">
            <div className="s-tag"><span className="line" /> FAQ <span className="line" /></div>
            <div className="s-title">Questions? We&apos;ve got answers.</div>
          </div>
          <div className="faq-wrap">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item reveal-up${openFaqIdx === i ? ' open' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="faq-q" onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}>
                  <span className="faq-q-text">{f.q}</span>
                  <div className="faq-icon">+</div>
                </div>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="s" id="cta">
        <div className="container">
          <div className="cta-inner reveal-up">
            <h2>Ready to travel without visa stress?</h2>
            <p>Join 2 lakh+ Indian travelers who got their visa on time, every time. Start your application in under 5 minutes.</p>
            <div className="cta-btns">
              <button className="cta-btn-primary" onClick={() => { setApplyModal(true); lockScroll() }}>Apply for a Visa →</button>
              <button className="cta-btn-outline" onClick={() => openWhatsApp()}>Talk to an Expert</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="nav-logo">
                <div className="nav-logo-crop">
                  <img src="/logo-white.png" alt="eVisas" onError={e => { e.target.style.display = 'none' }} />
                </div>
                <span style={{ display: 'none', fontSize: '1.4rem', fontWeight: 900, color: '#fff' }}>eVisas</span>
              </div>
              <p style={{ marginTop: '0.75rem' }}>India&apos;s most trusted visa service. 120+ countries, expert support, guaranteed on-time delivery.</p>
              <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="https://www.instagram.com/evisas.in" target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}>
                  instagram.com/evisas.in
                </a>
                <a href="mailto:info@evisas.in" style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✉️ info@evisas.in</a>
                <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>📍 G9 Tower C, Bhutani Alphathum, Sector 90, Noida UP 201304</div>
                <a href="https://wa.me/918619666129" target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>💬 +91 86196 66129</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Destinations</h4>
              <ul>
                {[['uae','🇦🇪 UAE Visa'],['usa','🇺🇸 USA Visa'],['singapore','🇸🇬 Singapore'],['france','🇫🇷 Schengen'],['uk','🇬🇧 UK Visa'],['thailand','🇹🇭 Thailand']].map(([slug, label]) => (
                  <li key={slug}><a href="#" onClick={e => { e.preventDefault(); const d = DESTS.find(x => x.slug === slug); if (d) openCountry(d) }}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#" onClick={e => { e.preventDefault(); setShowAbout(true); lockScroll() }}>About Us</a></li>
                <li><a href="#how" onClick={e => { e.preventDefault(); document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }) }}>How It Works</a></li>
                <li><a href="#pricing" onClick={e => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }}>Pricing</a></li>
                <li><a href="#blog" onClick={e => { e.preventDefault(); document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }) }}>Blog</a></li>
                <li><a href="#" onClick={e => { e.preventDefault(); showToastMsg('Careers page coming soon! 💼') }}>Careers</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li><a href="#" onClick={e => { e.preventDefault(); openWhatsApp('Hi, I want to track my visa application. Please help!') }}>Track Application</a></li>
                <li><a href="#" onClick={e => { e.preventDefault(); setPolicyType('refund'); lockScroll() }}>Refund Policy</a></li>
                <li><a href="#" onClick={e => { e.preventDefault(); setPolicyType('privacy'); lockScroll() }}>Privacy Policy</a></li>
                <li><a href="#" onClick={e => { e.preventDefault(); setPolicyType('terms'); lockScroll() }}>Terms of Service</a></li>
                <li><a href="https://wa.me/918619666129" target="_blank" rel="noreferrer">WhatsApp Us</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 eVisas.in · All rights reserved · G9 Tower C, Bhutani Alphathum, Sector 90, Noida</p>
            <div className="social-row">
              <a href="https://www.instagram.com/evisas.in" target="_blank" rel="noreferrer" className="s-btn" title="Instagram">IG</a>
              <a href="https://www.linkedin.com/company/108114664/" target="_blank" rel="noreferrer" className="s-btn" title="LinkedIn">in</a>
              <a href="mailto:info@evisas.in" className="s-btn" title="Email">✉</a>
              <a href="https://wa.me/918619666129" target="_blank" rel="noreferrer" className="s-btn" title="WhatsApp">WA</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOAT ── */}
      <div className="wa-float">
        <div className="wa-tooltip-box">Chat with us on WhatsApp 💬</div>
        <a href="https://wa.me/918619666129?text=Hi%2C%20I%20need%20help%20with%20my%20visa%20application" target="_blank" rel="noreferrer" className="wa-btn">
          <div className="wa-ping" />
          <WaSvg />
        </a>
      </div>

      {/* ── TOAST ── */}
      <div className={`toast${toastVisible ? ' show' : ''}`}>{toast}</div>

      {/* ── COUNTRY DETAIL SLIDE-IN ── */}
      <div id="countryPage" className={countryDetail ? 'open' : ''}>
        {countryDetail && (
          <>
            <div className="cp-topbar">
              <button className="cp-back" onClick={closeCountry}>← Back to all destinations</button>
              <button className="btn-pill" onClick={() => openWhatsApp()}>Apply Now →</button>
            </div>
            <div className="cp-hero">
              <img src={countryDetail.img} alt={countryDetail.fullName} className="cp-hero-img" />
              <div className="cp-hero-overlay" />
              <div className="cp-hero-text">
                <div className="cp-flag">{countryDetail.f}</div>
                <div>
                  <div className="cp-country-name">{countryDetail.fullName} Visa</div>
                  <div className="cp-visa-type">{TYPE_LABEL[countryDetail.type]} · {countryDetail.proc} processing · {countryDetail.val} validity</div>
                </div>
              </div>
            </div>
            <div className="cp-body">
              <div className="cp-left">
                <div className="cp-key-facts">
                  {[['Processing Time', countryDetail.proc], ['Validity', countryDetail.val], ['Documents Needed', countryDetail.docs], ['Success Rate', countryDetail.successRate]].map(([label, val]) => (
                    <div key={label} className="cp-fact">
                      <div className="cp-fact-label">{label}</div>
                      <div className="cp-fact-value">{val}</div>
                    </div>
                  ))}
                </div>
                <div className="cp-section-title">About the Visa</div>
                <p className="cp-about">{countryDetail.about}</p>
                <div className="cp-section-title">Document Requirements</div>
                <ul className="cp-req-list">
                  {countryDetail.requirements.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
                {countryDetail.contentSections && countryDetail.contentSections.length > 0 && (
                  <div style={{ marginTop: '2rem' }}>
                    <div className="cp-section-title">Visa Guide</div>
                    {countryDetail.contentSections.map((sec, i) => (
                      <details key={i} style={{ borderBottom: '1px solid #e2e8f0', padding: '0.75rem 0' }}>
                        <summary style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1a1a2e', cursor: 'pointer', listStyleType: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                          <span>{sec.h2}</span>
                          <span style={{ fontSize: '1.2rem', color: '#667eea', flexShrink: 0 }}>＋</span>
                        </summary>
                        <p style={{ marginTop: '0.75rem', color: '#4a5568', lineHeight: 1.85, fontSize: '0.9rem', marginBottom: 0 }}>{sec.body}</p>
                      </details>
                    ))}
                  </div>
                )}
                {countryDetail.faqs && countryDetail.faqs.length > 0 && (
                  <div style={{ marginTop: '2rem' }}>
                    <div className="cp-section-title">Frequently Asked Questions</div>
                    {countryDetail.faqs.map((faq, i) => (
                      <details key={i} style={{ borderBottom: '1px solid #e2e8f0', padding: '0.75rem 0' }}>
                        <summary style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1a1a2e', cursor: 'pointer', listStyleType: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                          <span>{faq.q}</span>
                          <span style={{ fontSize: '1.2rem', color: '#667eea', flexShrink: 0 }}>＋</span>
                        </summary>
                        <p style={{ marginTop: '0.75rem', color: '#4a5568', lineHeight: 1.85, fontSize: '0.9rem', marginBottom: 0 }}>{faq.a}</p>
                      </details>
                    ))}
                  </div>
                )}
              </div>
              <div className="cp-right">
                <div className="cp-sticky-card">
                  <div className="cp-price-big">{countryDetail.price}</div>
                  <div className="cp-price-sub">eVisas.in service fee · All-inclusive</div>
                  <div className="cp-section-title" style={{ marginTop: '1rem' }}>What&apos;s Included</div>
                  <ul className="cp-includes">
                    {countryDetail.includes.map((inc, i) => <li key={i}>{inc}</li>)}
                  </ul>
                  <button className="cp-apply-btn" onClick={() => { showToastMsg('Starting ' + countryDetail.c + ' application... ✈️'); setTimeout(() => openWhatsApp(), 1000) }}>Start Application →</button>
                  <button className="cp-whatsapp-btn" onClick={() => openWhatsApp()}>💬 Ask on WhatsApp</button>
                  <div className="cp-guarantee">🛡️ On-Time Guarantee — or full refund</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── BLOG ARTICLE SLIDE-IN ── */}
      <div id="blogPage" className={`slide-page${blogDetail !== null ? ' open' : ''}`}>
        {blogDetail !== null && (() => {
          const b = BLOGS[blogDetail]
          return (
            <>
              <div className="cp-topbar">
                <button className="cp-back" onClick={() => { setBlogDetail(null); unlockScroll() }}>← Back to articles</button>
                <button className="btn-pill" onClick={() => { setApplyModal(true) }}>Apply Now →</button>
              </div>
              <div className="ba-hero">
                <img src={b.img} alt={b.title} />
                <div className="ba-hero-overlay" />
                <div className="ba-hero-content">
                  <div className="ba-tag-pill">{b.tag}</div>
                  <div className="ba-title">{b.title}</div>
                  <div className="ba-meta"><span>{b.date}</span><span>·</span><span>{b.read} read</span><span>·</span><span>By {b.author}</span></div>
                </div>
              </div>
              <div className="ba-body">
                {renderBlogContent(b.content)}
                <div className="ba-cta-box">
                  <h3>Ready to Apply?</h3>
                  <p>Get your visa processed by experts — on time, guaranteed.</p>
                  <button className="btn-pill" style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }} onClick={() => { setBlogDetail(null); unlockScroll(); scrollToDest() }}>Apply for a Visa →</button>
                </div>
              </div>
            </>
          )
        })()}
      </div>

      {/* ── GUARANTEE SLIDE-IN ── */}
      <div id="guaranteePage" className={`slide-page${showGuarantee ? ' open' : ''}`}>
        <div className="cp-topbar">
          <button className="cp-back" onClick={() => { setShowGuarantee(false); unlockScroll() }}>← Back</button>
          <div className="nav-logo"><div className="nav-logo-crop"><img src="/logo-icon.png" alt="eVisas" /></div></div>
        </div>
        <div className="gp-hero">
          <div className="gp-shield">🛡️</div>
          <h2 className="s-title" style={{ color: '#fff', fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-1.5px' }}>Get Your Visa, On Time. <span style={{ color: '#4ade80' }}>Guaranteed.</span></h2>
          <p>We guarantee your visa is delivered before your travel date — or we refund your full eVisas.in service fee. No questions asked. No conditions. Just results.</p>
        </div>
        <div className="gp-body">
          <div className="gp-promise">
            <h2>Our Promise to You</h2>
            <p>Every visa application processed through eVisas.in comes with an On-Time Guarantee. If we miss your travel date due to any delay on our side or embassy processing issues we knew about — you get a 100% refund of your service fee, automatically.</p>
          </div>
          <div className="s-tag" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}><span className="line" /> How It Works <span className="line" /></div>
          <div className="gp-grid">
            <div className="gp-card"><div className="gp-card-icon">📅</div><h3>Tell Us Your Travel Date</h3><p>When you apply, enter your exact departure date. We use this to set a hard deadline for your visa delivery and prioritise your application accordingly.</p></div>
            <div className="gp-card"><div className="gp-card-icon">⚡</div><h3>We Track Every Step</h3><p>Our team monitors your application 24/7 from submission to approval. We follow up with embassies proactively so no time is wasted.</p></div>
            <div className="gp-card"><div className="gp-card-icon">✅</div><h3>Delivered or Refunded</h3><p>Your visa arrives before your travel date — guaranteed. If it doesn&apos;t for any covered reason, your full service fee is refunded within 24 hours.</p></div>
          </div>
          <div className="gp-stats">
            <div><div className="gp-stat-num">98%</div><div className="gp-stat-label">On-Time Delivery Rate</div></div>
            <div><div className="gp-stat-num">2L+</div><div className="gp-stat-label">Visas Delivered</div></div>
            <div><div className="gp-stat-num">₹0</div><div className="gp-stat-label">Hidden Fees</div></div>
          </div>
          <div className="s-tag" style={{ justifyContent: 'center', marginBottom: '1rem' }}><span className="line" /> What&apos;s Covered <span className="line" /></div>
          <div className="gp-covered">
            <div className="gp-covered-box">
              <h3 style={{ color: 'var(--green)' }}>✓ Covered by Guarantee</h3>
              <ul>
                {['Embassy processing delays beyond estimated time','Technical issues on eVisas.in platform','Document submission errors made by our team','Appointment scheduling delays by us','Any delay caused by our operational team'].map((item, i) => (
                  <li key={i}><span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="gp-covered-box">
              <h3 style={{ color: 'var(--red)' }}>✕ Not Covered</h3>
              <ul>
                {['Applications submitted less than required processing time before travel','Rejection due to incorrect information provided by applicant','Missing documents not provided by applicant','Embassy closures on public holidays','Force majeure events (strikes, natural disasters)'].map((item, i) => (
                  <li key={i}><span style={{ color: 'var(--red)', fontWeight: 700 }}>✕</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <h2 className="s-title" style={{ marginBottom: '1rem' }}>Ready to apply with confidence?</h2>
            <button className="btn-pill" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }} onClick={() => { setShowGuarantee(false); unlockScroll(); scrollToDest() }}>Apply for a Visa →</button>
          </div>
        </div>
      </div>

      {/* ── B2B SLIDE-IN ── */}
      <div id="b2bPage" className={`slide-page${showB2B ? ' open' : ''}`}>
        <div className="cp-topbar">
          <button className="cp-back" onClick={() => { setShowB2B(false); unlockScroll() }}>← Back</button>
          <div className="nav-logo"><div className="nav-logo-crop"><img src="/logo-icon.png" alt="eVisas" /></div></div>
        </div>
        <div className="b2b-hero">
          <div className="s-tag" style={{ color: '#94a3b8', justifyContent: 'center', marginBottom: '1rem' }}><span className="line" style={{ background: '#475569' }} /> Corporate Plans <span className="line" style={{ background: '#475569' }} /></div>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '1rem' }}>Visa Management<br />for <span className="grad-text">Teams &amp; Corporates</span></h2>
          <p>Manage employee travel visas at scale. Dedicated account manager, GST invoicing, API access, and bulk pricing — all in one dashboard.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <button className="btn-pill" style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem' }} onClick={() => openWhatsApp('Hi, I am interested in corporate/B2B visa plans for my company.')}>Contact Sales →</button>
            <button className="cta-btn-outline" style={{ padding: '0.9rem 2.2rem', borderRadius: '100px', fontSize: '0.95rem' }} onClick={() => openWhatsApp()}>Book a Demo</button>
          </div>
        </div>
        <div className="b2b-body">
          <div className="s-tag" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}><span className="line" /> Trusted By <span className="line" /></div>
          <div className="b2b-clients" style={{ gap: '1.5rem' }}>
            {['TCS','Google','Infosys','PepsiCo','Wipro','Anglo Eastern Group'].map(name => (
              <div key={name} className="b2b-client-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1.25rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--text)' }}>{name}</span>
              </div>
            ))}
          </div>
          <div className="s-tag" style={{ justifyContent: 'center', margin: '2rem 0 0.5rem' }}><span className="line" /> Enterprise Features <span className="line" /></div>
          <div className="b2b-feats">
            {[['📊','Team Dashboard','Track all employee applications in one place. Real-time status, deadlines, and alerts — built for HR teams.'],['👤','Dedicated Account Manager','A named visa expert handles all your company applications. Direct phone, email, and WhatsApp access.'],['🧾','GST Invoicing','All invoices are GST-compliant with your company GSTIN. Easy reconciliation for accounts teams.'],['🔌','API Access','Integrate visa status updates directly into your HRMS or travel management system via our REST API.'],['💰','Bulk Pricing','Save 15–35% on service fees with volume-based pricing. Custom quotes for 10+ applications/month.'],['🔒','Secure Data Handling','SOC 2 compliant data storage. All employee passport data encrypted in transit and at rest.']].map(([icon, title, desc]) => (
              <div key={title} className="b2b-feat"><div className="b2b-feat-icon">{icon}</div><h3>{title}</h3><p>{desc}</p></div>
            ))}
          </div>
          <div className="b2b-pricing">
            <div className="s-tag" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}><span className="line" /> Corporate Plans <span className="line" /></div>
            <div className="s-title" style={{ marginBottom: '0.5rem' }}>Get Your <span className="grad-text">Custom Quote</span></div>
            <p className="s-sub" style={{ margin: '0 auto 2rem', textAlign: 'center' }}>Every corporate has different travel needs. Tell us your requirements and we&apos;ll craft a tailored plan.</p>
            <form onSubmit={e => { e.preventDefault(); const company = e.target.company.value; const contact = e.target.contact.value; const email = e.target.email.value; const volume = e.target.volume.value; openWhatsApp(`Hi eVisas.in! I'm interested in a corporate visa plan.\n\nCompany: ${company}\nContact: ${contact}\nEmail: ${email}${volume ? `\nMonthly Volume: ${volume}` : ''}\n\nPlease send me a custom quote.`); showToastMsg('Opening WhatsApp for your custom quote! 🏢') }} style={{ maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              <input name="company" type="text" required placeholder="Company Name *" style={{ width: '100%', padding: '0.8rem 1.1rem', border: '1.5px solid rgba(37,99,235,0.25)', borderRadius: 10, fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', background: '#fff', color: 'var(--text)' }} />
              <input name="contact" type="text" required placeholder="Your Name & Designation *" style={{ width: '100%', padding: '0.8rem 1.1rem', border: '1.5px solid rgba(37,99,235,0.25)', borderRadius: 10, fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', background: '#fff', color: 'var(--text)' }} />
              <input name="email" type="email" required placeholder="Work Email *" style={{ width: '100%', padding: '0.8rem 1.1rem', border: '1.5px solid rgba(37,99,235,0.25)', borderRadius: 10, fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', background: '#fff', color: 'var(--text)' }} />
              <input name="volume" type="text" placeholder="Approximate visa applications per month" style={{ width: '100%', padding: '0.8rem 1.1rem', border: '1.5px solid rgba(37,99,235,0.25)', borderRadius: 10, fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', background: '#fff', color: 'var(--text)' }} />
              <button type="submit" className="cta-btn-primary" style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', borderRadius: 12 }}>Get Custom Quote →</button>
            </form>
          </div>
        </div>
      </div>

      {/* ── POLICY SLIDE-IN ── */}
      <div id="policyPage" className={`slide-page${policyType ? ' open' : ''}`}>
        {policyType && (() => {
          const pol = POLICIES[policyType]
          return (
            <>
              <div className="cp-topbar">
                <button className="cp-back" onClick={() => { setPolicyType(null); unlockScroll() }}>← Back</button>
                <div className="nav-logo"><div className="nav-logo-crop"><img src="/logo-icon.png" alt="eVisas" /></div></div>
              </div>
              <div className="pol-hero">
                <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-1px' }}>{pol.title}</h2>
                <p>{pol.subtitle}</p>
              </div>
              <div className="pol-body">
                {pol.sections.map((sec, i) => (
                  <div key={i} className="pol-section">
                    <h2>{sec.h}</h2>
                    <div dangerouslySetInnerHTML={{ __html: sec.body }} />
                  </div>
                ))}
              </div>
            </>
          )
        })()}
      </div>

      {/* ── ABOUT SLIDE-IN ── */}
      <div id="aboutPage" className={`slide-page${showAbout ? ' open' : ''}`}>
        <div className="cp-topbar">
          <button className="cp-back" onClick={() => { setShowAbout(false); unlockScroll() }}>← Back</button>
          <div className="nav-logo"><div className="nav-logo-crop"><img src="/logo-icon.png" alt="eVisas" /></div></div>
        </div>
        <div className="about-hero">
          <div className="s-tag" style={{ color: '#94a3b8', justifyContent: 'center', marginBottom: '1rem' }}><span className="line" style={{ background: '#475569' }} /> About Us <span className="line" style={{ background: '#475569' }} /></div>
          <h2>India&apos;s Most Trusted<br />Visa Service</h2>
          <p>We&apos;ve been helping Indian travelers navigate visa complexities since 2019 — 5 years of expertise, 120+ countries, and 2 lakh+ happy travelers.</p>
        </div>
        <div className="about-body">
          <div className="s-tag" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}><span className="line" /> Our Numbers <span className="line" /></div>
          <div className="about-stats">
            {[['5+','Years of Experience'],['120+','Countries Covered'],['2L+','Visas Processed'],['98%','Success Rate'],['4.8★','Google Rating']].map(([num, label]) => (
              <div key={label} className="about-stat"><div className="about-stat-num">{num}</div><div className="about-stat-label">{label}</div></div>
            ))}
          </div>
          <div className="s-tag" style={{ justifyContent: 'center', margin: '2rem 0 0.5rem' }}><span className="line" /> Our Story <span className="line" /></div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.85, maxWidth: 760, margin: '1rem auto 2rem' }}>
            eVisas.in was founded in 2019 with one goal: to make visa applications stress-free for Indian passport holders. We saw how confusing, expensive, and uncertain the process was — so we built a service that combines expert human guidance with smart technology.
            <br /><br />
            Over the past 5 years, we&apos;ve grown into India&apos;s most reliable visa facilitation service. Our team of certified visa experts has processed over 2 lakh applications across 120+ countries — from quick UAE e-Visas to complex US and Schengen sticker visas.
          </p>
          <div className="s-tag" style={{ justifyContent: 'center', margin: '0 0 0.5rem' }}><span className="line" /> Our Values <span className="line" /></div>
          <div className="about-values">
            {[['🌍','Global Expertise','Our visa experts have deep knowledge of consular requirements across 120+ countries. We stay updated on every policy change so you don\'t have to.'],['🤝','Trusted Partner','We\'ve been trusted by individual travelers, families, and corporate clients alike. Over 2 lakh successful visa applications speak for our reliability.'],['⚡','Speed & Transparency','We believe in honest timelines and real-time updates. No false promises — just accurate information and fast execution.'],['🛡️','On-Time Guarantee','Every application comes with our On-Time Guarantee. If we miss your travel date for any covered reason, you get a full refund.']].map(([icon, title, desc]) => (
              <div key={title} className="about-val"><div className="about-val-icon">{icon}</div><h3>{title}</h3><p>{desc}</p></div>
            ))}
          </div>
          <div className="travelkart-box">
            <div className="s-tag" style={{ marginBottom: '0.75rem' }}><span className="line" /> Our Family</div>
            <h3>🧳 eVisas.in is part of the TravelKart Group</h3>
            <p>TravelKart is our parent group — a comprehensive travel ecosystem that also covers flight bookings, hotel reservations, holiday packages, and travel insurance.</p>
          </div>
        </div>
      </div>

      {/* ── APPLY MODAL ── */}
      {applyModal && (
        <div style={{ display: 'flex', position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(15,22,41,0.6)', backdropFilter: 'blur(8px)', alignItems: 'center', justifyContent: 'center' }} onClick={e => { if (e.target === e.currentTarget) { setApplyModal(false); unlockScroll() } }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: '2.5rem', maxWidth: 480, width: '90%', position: 'relative', boxShadow: '0 24px 80px rgba(0,0,0,0.25)' }}>
            <button onClick={() => { setApplyModal(false); unlockScroll() }} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '0.25rem', color: 'var(--text)' }}>Start Your Application</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>Fill in your details and we&apos;ll reach out on WhatsApp within minutes.</div>
            <form onSubmit={e => {
              e.preventDefault()
              const name = e.target.name.value.trim()
              const email = e.target.email.value.trim()
              const visa = e.target.visa.value
              const date = e.target.date.value
              let msg = `Hi eVisas.in! I want to apply for a visa.\n\nName: ${name}\nEmail: ${email}`
              if (visa) msg += `\nDestination: ${visa}`
              if (date) msg += `\nTravel Date: ${date}`
              msg += '\n\nPlease help me proceed.'
              try { const leads = JSON.parse(localStorage.getItem('ev_leads') || '[]'); leads.push({ name, email, visa, date, ts: new Date().toISOString() }); localStorage.setItem('ev_leads', JSON.stringify(leads)) } catch (_) {}
              setApplyModal(false); unlockScroll()
              openWhatsApp(msg)
              showToastMsg('Opening WhatsApp — we\'ll reply within minutes! ✅')
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Full Name *</label>
                <input name="name" type="text" required placeholder="Your full name" style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Email Address *</label>
                <input name="email" type="email" required placeholder="you@email.com" style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Destination Country (optional)</label>
                <select name="visa" style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', background: '#fff', cursor: 'pointer' }}>
                  <option value="">Select a destination...</option>
                  {['🇦🇪 UAE','🇹🇭 Thailand','🇸🇬 Singapore','🇲🇾 Malaysia','🇮🇩 Indonesia','🇺🇸 USA','🇬🇧 UK','🇹🇷 Turkey','🇲🇻 Maldives','🇫🇷 France (Schengen)','🇩🇪 Germany (Schengen)','🇯🇵 Japan','🇦🇺 Australia','🇨🇦 Canada','🇻🇳 Vietnam','🇱🇰 Sri Lanka','🇰🇪 Kenya','🇶🇦 Qatar','🇴🇲 Oman','🇧🇭 Bahrain','Other'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Tentative Travel Date (optional)</label>
                <input name="date" type="date" style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none' }} />
              </div>
              <button type="submit" className="btn-pill" style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', borderRadius: 12, marginTop: '0.5rem' }}>Send via WhatsApp →</button>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '-0.25rem' }}>We&apos;ll reach out on WhatsApp within minutes. No spam, ever.</p>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
