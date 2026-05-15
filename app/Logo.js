export default function Logo({ variant = 'full', className, style, wordmarkColor = '#0F172A', accentColor = '#22D3A8' }) {
  if (variant === 'icon') {
    return (
      <svg viewBox="0 0 56 56" className={className} style={style} role="img" aria-label="eVisas.in" xmlns="http://www.w3.org/2000/svg">
        <title>eVisas.in</title>
        <g transform="translate(4 6)">
          <path d="M22 6 L40 6 L40 24" fill="none" stroke={accentColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M40 24 L40 40" fill="none" stroke={accentColor} strokeWidth="6" strokeLinecap="round"/>
          <path d="M10 36 L24 30 L20 26 L22 24 L30 26 L34 22 L38 24 L34 28 L36 36 L34 38 L30 30 L24 34 L24 38 L22 39 L21 36 L18 38 L17 36 Z" fill={accentColor}/>
        </g>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 200 56" className={className} style={style} role="img" aria-label="eVisas.in" xmlns="http://www.w3.org/2000/svg">
      <title>eVisas.in</title>
      <g transform="translate(4 6)">
        <path d="M22 6 L40 6 L40 24" fill="none" stroke={accentColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40 24 L40 40" fill="none" stroke={accentColor} strokeWidth="6" strokeLinecap="round"/>
        <path d="M10 36 L24 30 L20 26 L22 24 L30 26 L34 22 L38 24 L34 28 L36 36 L34 38 L30 30 L24 34 L24 38 L22 39 L21 36 L18 38 L17 36 Z" fill={accentColor}/>
      </g>
      <text
        x="56" y="34"
        fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontWeight={700} fontSize={24}
        fill={wordmarkColor}
        letterSpacing="-0.5"
      >
        eVisas<tspan fill={accentColor}>.</tspan><tspan fill={wordmarkColor}>in</tspan>
      </text>
    </svg>
  )
}
