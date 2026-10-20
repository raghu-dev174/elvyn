import type { Metadata } from 'next';
import { Manrope, Inter_Tight } from 'next/font/google';
import './globals.css';
const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});
const inter = Inter_Tight({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL('https://elvyn-tau.vercel.app'),
  title: {
    default: 'ELVYN — Premium websites. Sensible pricing.',
    template: '%s — ELVYN',
  },
  description:
    'ELVYN is an independent web studio designing and building premium websites at sensible prices. Good design. Clear pricing. No technical hassle.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: 'ELVYN',
    images: [
      {
        url: '/images/rift-preview.png',
        alt: 'RIFT, an ELVYN concept website preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/rift-preview.png'],
  },
};

const structuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://elvyn-tau.vercel.app/#organization',
      name: 'ELVYN',
      url: 'https://elvyn-tau.vercel.app/',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://elvyn-tau.vercel.app/#website',
      name: 'ELVYN',
      url: 'https://elvyn-tau.vercel.app/',
      publisher: { '@id': 'https://elvyn-tau.vercel.app/#organization' },
    },
  ],
}).replace(/</g, '\\u003c');
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
