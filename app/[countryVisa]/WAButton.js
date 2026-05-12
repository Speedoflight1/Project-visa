'use client'

export default function WAButton({ href, label, style, className, children }) {
  function handleClick() {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'whatsapp_click', { event_category: 'engagement', event_label: label || 'country_page' })
    }
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
