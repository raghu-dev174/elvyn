'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
export const nav = [
  ['Work', '/#work'],
  ['Services', '/#services'],
  ['Pricing', '/#pricing'],
  ['Process', '/#process'],
];
export function LinkButton({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link className={`link-button ${light ? 'text-button' : ''}`} href={href}>
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <Link href="/" className="wordmark" aria-label="ELVYN home">
        ELVYN<span>WEB STUDIO</span>
      </Link>
      <nav aria-label="Main navigation" className="desktop-nav">
        {nav.map(([t, h]) => (
          <Link key={t} href={h}>
            {t}
          </Link>
        ))}
      </nav>
      <Link className="header-cta" href="/contact">
        Start a project <span aria-hidden="true">↗</span>
      </Link>
      <div className="mobile-menu">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="menu-trigger">
            Menu <span aria-hidden="true">＋</span>
          </DialogTrigger>
          <DialogContent className="menu-panel">
            <DialogTitle>ELVYN</DialogTitle>
            <DialogDescription>Independent web studio</DialogDescription>
            <nav aria-label="Mobile navigation">
              {[...nav, ['Start a project', '/contact']].map(([t, h]) => (
                <Link key={t} href={h} onClick={() => setOpen(false)}>
                  {t}
                  <span>↗</span>
                </Link>
              ))}
            </nav>
            <span className="meta available">AVAILABLE FOR PROJECTS</span>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
export function Showcase({
  kind = 'hotel',
  large = false,
}: {
  kind?: 'hotel' | 'car';
  large?: boolean;
}) {
  return (
    <div className={`showcase ${kind} ${large ? 'large' : ''}`}>
      <div className="mock-site">
        <div className="mock-nav">
          <b>{kind === 'hotel' ? 'SŌL / STAY' : 'VELOCE®'}</b>
          <span>
            {kind === 'hotel'
              ? 'A SLOWER WAY TO STAY'
              : 'ENGINEERED FOR THE EXTRAORDINARY'}
          </span>
          <span>EXPLORE ↗</span>
        </div>
        <div className="mock-image">
          <img
            src={`/images/${kind}.webp`}
            width="1536"
            height="1024"
            alt={
              kind === 'hotel'
                ? 'Sculptural concrete hotel overlooking a quiet sea'
                : 'Black performance car in a concrete studio'
            }
            loading={large ? 'eager' : 'lazy'}
          />
          <div className="mock-headline">
            {kind === 'hotel' ? (
              <>
                Somewhere
                <br />
                <em>to slow down.</em>
              </>
            ) : (
              <>
                DRIVEN BY
                <br />
                INSTINCT.
              </>
            )}
          </div>
          <div className="mock-bottom">
            <span>
              {kind === 'hotel'
                ? 'A PRIVATE COASTAL RETREAT'
                : 'THE PURSUIT OF SOMETHING RARE'}
            </span>
            <span>DISCOVER THE COLLECTION ↗</span>
          </div>
        </div>
      </div>
      <span className="showcase-tag meta">
        {kind === 'hotel' ? 'HOSPITALITY' : 'AUTOMOTIVE'} / CONCEPT / 2026
      </span>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <Link href="/" className="wordmark">
          ELVYN<span>WEB STUDIO</span>
        </Link>
        <p>
          Premium websites.
          <br />
          Sensible pricing.
        </p>
        <nav aria-label="Footer navigation">
          {[...nav, ['Contact', '/contact']].map(([t, h]) => (
            <Link key={t} href={h}>
              {t}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom meta">
        <span>© 2026 ELVYN</span>
        <span>INDEPENDENT BY DESIGN.</span>
        <Link href="#main">BACK TO TOP ↑</Link>
      </div>
    </footer>
  );
}
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label meta">
      <span>ELVYN / {number}</span>
      <span>{children}</span>
    </div>
  );
}
export function ProjectDialog({
  name,
  category,
  description,
  kind,
  index,
}: {
  name: string;
  category: string;
  description: string;
  kind: 'hotel' | 'car';
  index: string;
}) {
  return (
    <Dialog>
      <DialogTrigger className="project-card">
        <Showcase kind={kind} />
        <div className="project-info">
          <span className="meta">
            PROJECT / {index} · {category}
          </span>
          <span className="meta concept">CONCEPT PROJECT</span>
          <h3>{name}</h3>
          <span className="project-arrow" aria-hidden="true">
            ↗
          </span>
          <p>{description}</p>
          <span className="meta project-link">VIEW PROJECT ↗</span>
        </div>
      </DialogTrigger>
      <DialogContent className="project-dialog">
        <div className="meta">CONCEPT PROJECT / {category} / 2026</div>
        <DialogTitle className="project-title">{name}</DialogTitle>
        <DialogDescription>
          {description} An independent design exploration by ELVYN, created to
          demonstrate our approach. This is not commissioned client work.
        </DialogDescription>
        <Showcase kind={kind} large />
        <div className="project-description">
          <div>
            <h4>The direction</h4>
            <p>
              {kind === 'hotel'
                ? 'A quiet editorial experience that gives architecture room to breathe. Expansive imagery, considered type, and a clear path from discovery to enquiry.'
                : 'A confident automotive experience built around the product. Dramatic imagery and precise typography turn a collection into a destination.'}
            </p>
          </div>
          <div>
            <h4>The scope</h4>
            <p>
              Visual direction · Responsive web design · Frontend development
            </p>
            <LinkButton href="/contact">Build something like this</LinkButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
