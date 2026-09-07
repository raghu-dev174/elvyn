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
  metadataBase: new URL('https://elvyn-web-studio.csharp-7970.chatgpt.site'),
  title: {
    default: 'ELVYN — Premium websites. Sensible pricing.',
    template: '%s — ELVYN',
  },
  description:
    'ELVYN is an independent web studio designing and building premium websites at sensible prices. Good design. Clear pricing. No technical hassle.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
