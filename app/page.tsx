import AfterLoading from "./components/AfterLoading";
import LoadingScreen from "./loading-screen";
import ParticleBackground from "./components/ParticleBackground";
import ContactForm from "./components/ContactForm";
import CardCarousel from "./components/CardCarousel";
import SkillsMarquees from "./components/SkillsMarquees";
import SectionHeading from "./components/SectionHeading";
import TypewriterText from "./components/TypewriterText";
import type { IconType } from "react-icons";
import {
  FaEnvelope,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import {
  contactMethods,
  experience,
  hero,
  navigation,
} from "./data/content";
import { certificates } from "./data/certificates";
import { journey } from "./data/journey";

const heroSocialLinks: {
  label: string;
  href: string;
  icon: IconType;
  external: boolean;
}[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/elvis-moyo-bb289731b/",
    icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/elvismoyo400",
    icon: SiGithub,
    external: true,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/263716144042?text=Hi%20Elvis%2C%20I%20found%20your%20portfolio.",
    icon: FaWhatsapp,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:elvismoyo400@gmail.com?subject=Portfolio%20inquiry",
    icon: FaEnvelope,
    external: false,
  },
];

function ContactIcon({
  name,
}: {
  name: (typeof contactMethods)[number]["icon"] | "github";
}) {
  if (name === "email") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3.5 6.5h17v11h-17z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4A8 8 0 1 1 20 11.7Z" />
        <path d="M9 8.5c.3-.6.7-.5 1-.5l1 2-1 1c.6 1.3 1.6 2.2 2.9 2.8l.9-1 2 1c.1.3.1.8-.4 1.1-.6.4-1.3.6-2 .4-2.7-.7-5-3-5.7-5.6-.2-.7 0-1.5.3-2.1Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.5 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.5 10.5 0 0 1 5.5 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.2-2.6 5.2-5.1 5.5.4.3.8 1 .8 2v3c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <AfterLoading>
        <ParticleBackground />
      </AfterLoading>
      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand-mark" href="#home" aria-label="Elvis Moyo, home">
            EM
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <a className="pill-link" href="#contact">
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-content">
            <div className="eyebrow hero-eyebrow">
              <span>{hero.eyebrow[0]}</span>
              <span className="eyebrow-divider" />
              <span>{hero.eyebrow[1]}</span>
            </div>
            <TypewriterText
              accentText="Moyo"
              as="h1"
              delay={0}
              id="hero-title"
              text="Elvis Moyo"
            />
            <p className="hero-tagline">{hero.tagline}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                View My Work
              </a>
              <a
                className="button button-secondary"
                href="/Elvis_Moyo.pdf"
                download
              >
                Download CV
              </a>
            </div>
            <p className="availability-line">{hero.availability}</p>
            <div className="hero-social-links" role="group" aria-label="Social links">
              {heroSocialLinks.map(({ label, href, icon: Icon, external }) => (
                <a
                  aria-label={
                    label === "Email"
                      ? "Email Elvis Moyo"
                      : `Visit Elvis Moyo on ${label}`
                  }
                  className="contact-social-link"
                  href={href}
                  key={label}
                  rel={external ? "noopener noreferrer" : undefined}
                  target={external ? "_blank" : undefined}
                  title={label}
                >
                  <Icon aria-hidden="true" focusable="false" />
                </a>
              ))}
            </div>
          </div>
          <a className="scroll-cue" href="#journey" aria-label="Scroll to journey">
            <span />
            <svg viewBox="0 0 12 8" aria-hidden="true">
              <path d="m1 1 5 5 5-5" />
            </svg>
          </a>
        </section>

        <section className="content-section journey-section" id="journey">
          <div className="section-heading">
            <p className="section-kicker">01 / The journey</p>
            <SectionHeading
              as="h2"
              delay={150}
              first="Always learning."
              second="Always building."
            />
            <p className="section-intro">
              A work in progress, shaped by curiosity, practice, and the things
              I make along the way.
            </p>
          </div>
          <div className="timeline">
           {journey.map((entry) => (
             <article className="timeline-item" key={entry.date}>
               <span className="timeline-year">{entry.date}</span>
                <div>
                 <h3>{entry.title}</h3>
                 <p>{entry.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

       <section
  className="content-section certificates-section"
  id="certificates"
  aria-labelledby="certificates-title"
>
  <div className="section-heading">
    <p className="section-kicker">02 / Certificates</p>
    <SectionHeading
      as="h2"
      delay={300}
      first="Certificates &"
      id="certificates-title"
      second="credentials."
    />
  </div>

  <div className="certificate-grid">
    {certificates.map((certificate) => (
      <article
        className={`experience-card certificate-card${
          certificate.kind === "Professional certificate"
            ? " certificate-card--professional"
            : ""
        }`}
        key={certificate.title}
      >
        <div className="certificate-meta">
          <p className="section-kicker">{certificate.kind}</p>
          <time dateTime={certificate.dateTime}>{certificate.date}</time>
        </div>

        <h3>{certificate.title}</h3>
        <p className="certificate-issuer">{certificate.issuer}</p>

        <a
          className="button button-secondary certificate-verify"
          href={certificate.verifyUrl}
          rel="noopener noreferrer"
          target="_blank"
          aria-label={`Verify ${certificate.title} certificate (opens in a new tab)`}
        >
          Verify <span aria-hidden="true">↗</span>
        </a>
      </article>
    ))}
  </div>
</section>

       <section className="content-section experience-section" id="experience">
         <div className="section-heading">
           <p className="section-kicker">03 / Experience</p>
           <SectionHeading
             as="h2"
             delay={450}
             first="Growing through"
             second="real-world practice."
           />
         </div>
 
          <article className="experience-card">
            <div className="experience-topline">
              <span>{experience.organization}</span>
              <span>{experience.period}</span>
            </div>
            <h3>{experience.title}</h3>
            <p>{experience.summary}</p>
            <ul>
              {experience.responsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          </article>
</section>

        <section
          className="content-section skills-section"
          id="skills"
          aria-labelledby="skills-title"
        >
          <div className="section-heading">
            <p className="section-kicker">04 / WHAT I WORK WITH</p>
            <SectionHeading
              as="h2"
              delay={600}
              first="Tools & technologies"
              id="skills-title"
              second="behind my work."
            />
            <p className="section-intro">
              A growing toolkit of technologies, frameworks, and creative tools
              I use to build functional, responsive, and user-focused digital
              experiences.
            </p>
          </div>
          <SkillsMarquees />
        </section>

        <section className="content-section work-section" id="work">
          <div className="section-heading work-heading">
            <p className="section-kicker">05 / PROJECTS &amp; EXPERIMENTS</p>
            <SectionHeading
              as="h2"
              delay={750}
              first="Building ideas into"
              second="real experiences."
            />
            <p className="section-intro">
              A selection of projects where I bring together development,
              problem-solving, and thoughtful design to create practical
              digital solutions.
            </p>
          </div>
          <CardCarousel />
        </section>

        <footer className="contact-section" id="contact">
          <div className="contact-inner">
            <div className="contact-page-heading">
              <p className="section-kicker">06 / Contact</p>
              <SectionHeading
                as="h2"
                delay={900}
                first="Let's"
                second="talk."
              />
            </div>
            <div className="contact-layout">
              <section
                className="contact-form-panel"
                aria-labelledby="contact-form-title"
              >
                <div className="contact-form-heading">
                  <h3 id="contact-form-title">Send me a message</h3>
                  <p>
                    Share a few details about what you&apos;re working on or
                    looking for. I&apos;ll reply by email.
                  </p>
                </div>
                <ContactForm />
              </section>
              <aside className="contact-info-panel" aria-labelledby="contact-info-title">
                <div>
                  <h3 id="contact-info-title">
                    Hi, I&apos;m Elvis.<br />
                    How can I help?
                  </h3>
                  <p className="contact-info-intro">
                    Choose a direct channel if you&apos;d rather get in touch
                    without the form.
                  </p>
                </div>
                <div className="contact-direct-links">
                  {contactMethods.map((method) => (
                    <a
                      className="contact-direct-link"
                      href={method.href}
                      key={method.label}
                      target={method.external ? "_blank" : undefined}
                      rel={method.external ? "noopener noreferrer" : undefined}
                    >
                      <span className="contact-icon">
                        <ContactIcon name={method.icon} />
                      </span>
                      <span>
                        <span className="contact-direct-label">{method.label}</span>
                        <span className="contact-direct-detail">{method.detail}</span>
                      </span>
                    </a>
                  ))}
                </div>
                <div className="contact-social">
                  <p>Connect with me</p>
                    <div className="contact-social-links" role="group" aria-label="Social links">
                      {heroSocialLinks.map(({ label, href, icon: Icon, external }) => (
                        <a
                          aria-label={
                            label === "Email"
                              ? "Email Elvis Moyo"
                              : `Visit Elvis Moyo on ${label}`
                          }
                          className="contact-social-link"
                          href={href}
                          key={label}
                          rel={external ? "noopener noreferrer" : undefined}
                          target={external ? "_blank" : undefined}
                          title={label}
                        >
                          <Icon aria-hidden="true" focusable="false" />
                        </a>
                      ))}
                    </div>
                </div>
              </aside>
            </div>
              <nav className="footer-nav" aria-label="Footer navigation">
                {navigation.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.label}
                  </a>
                ))}
              </nav>
            <div className="footer-bottom">
              <span>Elvis Moyo</span>
              <span>Lupane, Mat North Province, Zimbabwe</span>
              <a href="#home">Back to top ↑</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
