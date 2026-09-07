import {
  services,
  packages,
  maintenance,
  process,
  faqs,
  projects,
} from '@/lib/content';
import { SectionLabel, LinkButton, ProjectDialog } from '@/components/studio';
export default function HomeSections() {
  return (
    <>
      <section id="services" className="section wrap">
        <SectionLabel number="002">WHAT WE DO / 004</SectionLabel>
        <div className="section-heading">
          <h2>
            YOU HAVE THE BUSINESS.
            <br />
            <span>
              WE’LL HANDLE
              <br />
              THE WEBSITE.
            </span>
          </h2>
          <p>
            From a focused landing page to a custom build. Everything you need
            to show up well online.
          </p>
        </div>
        <div className="services-list">
          {services.map(([title, copy], i) => (
            <a
              className="service-row"
              href={`/contact?service=${encodeURIComponent(i === 0 ? 'Landing Page' : i === 3 ? 'Web Application' : 'New Website')}`}
              key={title}
            >
              <span className="meta">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <span className="service-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="why light-section">
        <div className="wrap">
          <SectionLabel number="003">THE ELVYN APPROACH</SectionLabel>
          <div className="section-heading">
            <h2>
              PREMIUM DOESN’T
              <br />
              HAVE TO MEAN
              <br />
              <span>EXPENSIVE.</span>
            </h2>
            <p>
              Good work comes from care and a clear process. We keep the studio
              lean, so your budget goes into your website.
            </p>
          </div>
          <div className="three-columns">
            {[
              [
                'DESIGN',
                'Looks matter.',
                'We care about how your business looks online — not just whether the website works.',
              ],
              [
                'SPEED',
                'Less waiting. More doing.',
                'AI-assisted development helps us design, build, and iterate quickly, with every detail reviewed by a human.',
              ],
              [
                'SIMPLICITY',
                'Leave the technical to us.',
                'Domains, hosting, code, deployment. You don’t need to understand any of it. Tell us what you need. We’ll handle the rest.',
              ],
            ].map(([label, title, copy], i) => (
              <article key={label}>
                <div className="meta">
                  0{i + 1} / {label}
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="work" className="section wrap">
        <SectionLabel number="004">DESIGN IN PRACTICE</SectionLabel>
        <div className="section-heading">
          <h2>
            SELECTED WORK<span className="heading-count">(02)</span>
          </h2>
          <p>
            A few possibilities. These independent concept projects show how we
            think, design, and build.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <ProjectDialog key={p.index} {...p} />
          ))}
        </div>
      </section>
      <section id="pricing" className="section pricing-section">
        <div className="wrap">
          <SectionLabel number="005">KNOW WHERE YOU STAND</SectionLabel>
          <div className="section-heading">
            <h2>
              SIMPLE PRICING.
              <br />
              <span>NO MYSTERY QUOTES.</span>
            </h2>
            <p>
              One clear price to create your website.
              <br />A separate plan to keep it in good shape.
            </p>
          </div>
          <div className="pricing-grid">
            {packages.map((p, i) => (
              <article
                key={p.name}
                className={`price-card ${i === 1 ? 'recommended' : ''}`}
              >
                <div className="price-label meta">
                  <span>
                    0{i + 1} / {p.name.toUpperCase()}
                  </span>
                  {i === 1 && (
                    <span className="recommended-badge">RECOMMENDED</span>
                  )}
                </div>
                <h3>{p.name}</h3>
                <p className="price-intro">{p.intro}</p>
                <div className="creation">
                  <span className="meta">CREATION / ONE-TIME</span>
                  <strong>{p.price}</strong>
                </div>
                <div className="maintenance-line">
                  <span className="meta">MAINTENANCE</span>
                  <span>
                    {p.maintenance}
                    {p.name !== 'Custom' && <small> / month</small>}
                  </span>
                </div>
                <LinkButton
                  href={`/contact?budget=${encodeURIComponent(p.budget)}`}
                >
                  Choose {p.name}
                </LinkButton>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>
                      <span aria-hidden="true">＋</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="package-notes">
                  <p>
                    {p.revisions}
                    <br />
                    {p.timeline}
                  </p>
                  <p>{p.hosting}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="pricing-footnote">
            <span className="meta">CLEAR FROM DAY ONE.</span>
            <p>
              *Delivery depends on project scope and timely feedback, content,
              and assets. Your exact scope and creation price are agreed before
              work begins.
            </p>
          </div>
          <div className="domain-note">
            <div className="meta">A NOTE ON DOMAINS ↗</div>
            <h3>
              Your name.
              <br />
              Your ownership.
            </h3>
            <p>
              We can help you purchase a domain, subject to availability.
              Registration is charged separately at the actual domain price. You
              retain ownership. We handle configuration and connection.
            </p>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <SectionLabel number="006">AFTER THE HANDOVER</SectionLabel>
        <div className="section-heading">
          <h2>
            LAUNCH ISN’T
            <br />
            <span>THE END.</span>
          </h2>
          <p>
            Your business keeps moving.
            <br />
            We help your website keep up.
          </p>
        </div>
        <div className="three-columns maintenance-grid">
          {maintenance.map(([name, price, copy]) => (
            <article key={name}>
              <h3>{name}</h3>
              <div className="care-price">
                {price}
                <span> / month</span>
              </div>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <p className="small-note">
          Substantial new functionality is quoted separately. The scope of
          ongoing improvements is agreed with you.
        </p>
      </section>
      <section id="process" className="light-section">
        <div className="wrap">
          <SectionLabel number="007">FROM FIRST HELLO TO LIVE</SectionLabel>
          <div className="section-heading">
            <h2>
              YOU RUN THE BUSINESS.
              <br />
              <span>WE BUILD THE WEBSITE.</span>
            </h2>
            <p>
              Five simple steps.
              <br />
              No technical to-do list for you.
            </p>
          </div>
          <div className="process-grid">
            {process.map(([title, copy], i) => (
              <article key={title}>
                <span className="process-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap direction">
        <SectionLabel number="008">
          DESIGN DIRECTION / PREMIUM + CUSTOM
        </SectionLabel>
        <div className="direction-grid">
          <div>
            <h2>
              NOT SURE WHAT
              <br />
              YOUR WEBSITE
              <br />
              SHOULD LOOK LIKE?
            </h2>
            <p className="direction-answer">That’s our job too.</p>
            <p>
              We look at your business, audience, industry, brand, and
              competitors. Then recommend a visual direction that feels right
              for you.
            </p>
            <div className="direction-path meta">
              BUSINESS → AUDIENCE → INDUSTRY → BRAND → COMPETITORS
            </div>
            <p className="small-note">
              Design Direction Consultation is included with Premium and Custom.
              Your website should represent your business.
            </p>
          </div>
          <div
            className="directions"
            aria-label="Examples of visual directions"
          >
            <div>
              <span className="meta">01</span>
              <strong>minimal.</strong>
            </div>
            <div>
              <span className="meta">02</span>
              <strong>Editorial</strong>
            </div>
            <div>
              <span className="meta">03</span>
              <strong>BOLD.</strong>
            </div>
            <div>
              <span className="meta">04</span>
              <strong>L U X U R Y</strong>
            </div>
            <p className="meta">POSSIBILITIES, NOT PRESETS.</p>
          </div>
        </div>
      </section>
      <section className="redesign wrap">
        <div>
          <div className="meta">A FRESH START / WEBSITE REDESIGN</div>
          <h2>
            ALREADY HAVE A WEBSITE?
            <br />
            <span>WE CAN MAKE IT BETTER.</span>
          </h2>
        </div>
        <div>
          <p>
            Better visuals. A stronger mobile experience. Clearer structure,
            faster performance, and more reasons for visitors to get in touch.
          </p>
          <LinkButton href="/contact?service=Website%20Redesign">
            Redesign my website
          </LinkButton>
        </div>
      </section>
      <section className="section wrap faq-section">
        <div>
          <SectionLabel number="009">A FEW GOOD QUESTIONS</SectionLabel>
          <h2>
            BEFORE
            <br />
            WE BEGIN.
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span className="faq-plus" aria-hidden="true">
                  ＋
                </span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="final-cta light-section">
        <div className="wrap">
          <div className="meta available">AVAILABLE FOR PROJECTS</div>
          <h2>
            LET’S BUILD SOMETHING
            <br />
            <span>WORTH VISITING.</span>
          </h2>
          <div className="final-cta-bottom">
            <p>
              Tell us what you need.
              <br />
              We’ll take care of the rest.
            </p>
            <LinkButton href="/contact">Start a project</LinkButton>
            <span className="big-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
