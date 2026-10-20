import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/studio';
import ContactForm from '@/components/contact-form';
export const metadata: Metadata = {
  title: 'Start a project',
  description:
    'Tell ELVYN what you’re building. Share your project, budget, and goals and let’s create something worth visiting.',
  alternates: { canonical: '/contact' },
  openGraph: {
    url: '/contact',
    title: 'Start a project — ELVYN',
    description:
      'Tell ELVYN what you’re building. Share your project, budget, and goals and let’s create something worth visiting.',
    images: [
      {
        url: '/images/rift-preview.png',
        alt: 'RIFT, an ELVYN concept website preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start a project — ELVYN',
    description:
      'Tell ELVYN what you’re building. Share your project, budget, and goals and let’s create something worth visiting.',
    images: ['/images/rift-preview.png'],
  },
};
export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className="contact-page wrap">
        <div className="contact-heading">
          <div className="meta">ELVYN / YOUR NEXT CHAPTER</div>
          <h1>
            LET’S BUILD
            <br />
            SOMETHING
            <br />
            <span>WORTH VISITING.</span>
          </h1>
          <p>
            Tell us what you’re building.
            <br />
            We’ll figure out the rest.
          </p>
          <div className="contact-aside">
            <span className="meta available">AVAILABLE FOR PROJECTS</span>
            <div>
              <span className="meta">WHAT HAPPENS NEXT</span>
              <p>
                We’ll read your brief, understand what you need, and get in
                touch to discuss a clear scope and price.
              </p>
            </div>
            <Link href="/#pricing" className="underlined">
              Explore our pricing ↗
            </Link>
          </div>
        </div>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
