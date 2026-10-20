import type { Metadata } from 'next';
import { Header, Footer, LinkButton, Showcase } from '@/components/studio';
import HomeSections from '@/components/home-sections';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'ELVYN — Premium websites. Sensible pricing.',
    description:
      'ELVYN is an independent web studio designing and building premium websites at sensible prices. Good design. Clear pricing. No technical hassle.',
    images: [
      {
        url: '/images/rift-preview.png',
        alt: 'RIFT, an ELVYN concept website preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ELVYN — Premium websites. Sensible pricing.',
    description:
      'ELVYN is an independent web studio designing and building premium websites at sensible prices. Good design. Clear pricing. No technical hassle.',
    images: ['/images/rift-preview.png'],
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero wrap">
          <div className="hero-meta meta">
            <span>INDEPENDENT WEB STUDIO</span>
            <span className="available">AVAILABLE FOR PROJECTS</span>
          </div>
          <h1>
            WEBSITES THAT
            <br />
            LOOK <span className="expensive">EXPENSIVE.</span>
          </h1>
          <div className="hero-bottom">
            <h2>
              WITHOUT THE EXPENSIVE
              <br />
              AGENCY PRICE.
            </h2>
            <div>
              <p>
                We design and build modern websites for businesses — quickly,
                affordably, and without the technical hassle. We work with
                startups, entrepreneurs, and local businesses, whether they
                need a new website or a thoughtful redesign.
              </p>
              <div className="actions">
                <LinkButton href="/contact">Start a project</LinkButton>
                <LinkButton href="#work" light>
                  View our work
                </LinkButton>
              </div>
            </div>
          </div>
          <Showcase large />
          <div className="showcase-caption meta">
            <span>ELVYN / 001 — DESIGN MEETS DEVELOPMENT</span>
            <span>GOOD DESIGN. CLEAR PRICING. NO TECHNICAL HASSLE.</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </section>
        <HomeSections />
      </main>
      <Footer />
    </>
  );
}
