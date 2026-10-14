import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rajsigdel.com.np';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Raj Sigdel — UX/UI Designer in Kathmandu, Nepal',
    template: '%s · Raj Sigdel',
  },
  description:
    'Raj Sigdel is a UX/UI designer based in Kathmandu, Nepal. Specializing in web design, mobile apps, and dashboards with a focus on clean interfaces, micro-animations, and quality-first thinking.',
  keywords: [
    'Raj Sigdel',
    'UX Designer Nepal',
    'UI Designer Kathmandu',
    'Product Designer Nepal',
    'Freelance Designer Nepal',
    'Web Designer Nepal',
    'Mobile App Designer',
    'UX Portfolio Nepal',
    'Kathmandu designer',
    'Nepal UX designer',
  ],
  authors: [{ name: 'Raj Sigdel', url: baseUrl }],
  creator: 'Raj Sigdel',
  publisher: 'Raj Sigdel',
  category: 'Design',
  applicationName: 'Raj Sigdel Portfolio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Raj Sigdel',
    title: 'Raj Sigdel — UX/UI Designer in Kathmandu, Nepal',
    description:
      'Designing extraordinary digital experiences from Kathmandu, Nepal. UX/UI, web, and mobile design.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Raj Sigdel — UX/UI Designer Portfolio',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raj Sigdel — UX/UI Designer',
    description:
      'Designing extraordinary digital experiences from Kathmandu, Nepal.',
    images: ['/og-image.jpg'],
    creator: '@raj_sigdell',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
  icon: [
    { url: '/favicon.ico', sizes: 'any' },
    { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
  ],
  apple: [
    { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
  shortcut: '/favicon.ico',
},
manifest: '/site.webmanifest',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#000000',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Bodoni+Moda:opsz,wght@6..96,700;6..96,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/sf-pro-display"
          rel="stylesheet"
        />

        {/* Structured data — Person schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Raj Sigdel',
              alternateName: 'SpaceRaj',
              jobTitle: 'UX/UI Designer',
              description:
                'UX/UI designer based in Kathmandu, Nepal. Specializing in web design, mobile apps, and dashboards.',
              url: baseUrl,
              image: `${baseUrl}/og-image.jpg`,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Kathmandu',
                addressCountry: 'Nepal',
              },
              nationality: {
                '@type': 'Country',
                name: 'Nepal',
              },
              sameAs: [
                'https://github.com/SpaceRaaz-10',
                'https://linkedin.com/in/raj-sigdel/',
                'https://x.com/raj_sigdell',
                'https://www.instagram.com/raj_sigdelll/',
              ],
              knowsAbout: [
                'UX Design',
                'UI Design',
                'Figma',
                'Webflow',
                'Product Design',
                'Design Systems',
                'Prototyping',
              ],
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'Asian School of Management and Technology',
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'Nepal',
                },
              },
            }),
          }}
        />
      </head>
      <body className="bg-white text-black antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}