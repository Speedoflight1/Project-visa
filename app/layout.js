import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'eVisas.in — Get Your Visa, On Time. Guaranteed.',
  description: 'eVisas.in — India\'s most trusted visa service. Get your visa for 120+ countries online. Expert guidance, WhatsApp updates, 98% success rate. Pay in ₹, no hidden fees.',
  openGraph: {
    title: 'eVisas.in — Get Your Visa, On Time. Guaranteed.',
    description: '120+ countries. Expert guidance. WhatsApp updates. Pay in ₹ — no forex charges, no hidden fees.',
    url: 'https://evisas.in',
    siteName: 'eVisas.in',
    images: [{ url: 'https://evisas.in/logo-white.png.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eVisas.in — Get Your Visa, On Time. Guaranteed.',
    description: '120+ countries. Expert guidance. WhatsApp updates.',
    images: ['https://evisas.in/logo-white.png.png'],
  },
  icons: {
    icon: '/logo-icon.png.png',
  },
  alternates: {
    canonical: 'https://evisas.in',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'eVisas.in',
  url: 'https://evisas.in',
  logo: 'https://evisas.in/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-86196-66129',
    contactType: 'customer service',
    availableLanguage: ['Hindi', 'English'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'G9 Tower C, Bhutani Alphathum, Sector 90',
    addressLocality: 'Noida',
    addressRegion: 'UP',
    postalCode: '201304',
    addressCountry: 'IN',
  },
  sameAs: ['https://www.instagram.com/evisas.in'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','2460365381005611');fbq('track','PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2460365381005611&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* Microsoft Clarity — replace wq4abhggfm with your project ID from clarity.microsoft.com */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wq4abhggfm");`,
          }}
        />
      </head>
      <body>
        {/* GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7HM8W0STLC"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-7HM8W0STLC');`}
        </Script>
        {children}
      </body>
    </html>
  )
}
