import LoadingScreen from "./loading-screen";
import ParticleBackground from "./components/ParticleBackground";
import ContactForm from "./components/ContactForm";
import CardCarousel from "./components/CardCarousel";
import type { IconType } from "react-icons";
import {
  FaDatabase,
  FaEnvelope,
  FaLinkedinIn,
  FaMagnifyingGlass,
  FaMobileScreenButton,
  FaObjectGroup,
  FaPalette,
  FaPenRuler,
  FaWhatsapp,
} from "react-icons/fa6";
import {
  SiCss,
  SiDjango,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Journey", href: "#journey" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const milestones = [
  {
    year: "2026",
    title: "Building strong foundations",
    description:
      "Learning programming fundamentals and sharpening problem-solving through regular practice.",
  },
  {
    year: "2026",
    title: "Exploring the web",
    description:
      "Turning ideas into responsive interfaces with HTML, CSS, JavaScript, and modern web tools.",
  },
  {
    year: "NOW",
    title: "Learning by building",
    description:
      "Growing through hands-on projects, collaboration, and a steady focus on creating useful technology.",
  },
];

const skills: { name: string; icon: IconType; percentage: number }[] = [
  { name: "UI/UX Design", icon: FaPenRuler, percentage: 96 },
  { name: "Figma", icon: SiFigma, percentage: 95 },
  { name: "Canva", icon: FaPalette, percentage: 94 },
  { name: "User Research", icon: FaMagnifyingGlass, percentage: 92 },
  { name: "Web Design", icon: FaObjectGroup, percentage: 95 },
  { name: "HTML", icon: SiHtml5, percentage: 98 },
  { name: "CSS", icon: SiCss, percentage: 97 },
  { name: "JavaScript", icon: SiJavascript, percentage: 94 },
  { name: "TypeScript", icon: SiTypescript, percentage: 92 },
  { name: "React.js", icon: SiReact, percentage: 95 },
  { name: "Next.js", icon: SiNextdotjs, percentage: 93 },
  { name: "Responsive Design", icon: FaMobileScreenButton, percentage: 96 },
  { name: "Python", icon: SiPython, percentage: 94 },
  { name: "Django", icon: SiDjango, percentage: 91 },
  { name: "SQL", icon: FaDatabase, percentage: 92 },
  { name: "Git", icon: SiGit, percentage: 93 },
  { name: "GitHub", icon: SiGithub, percentage: 95 },
];

const contactMethods = [
  {
    label: "Email",
    detail: "elvismoyo400@gmail.com",
    href: "mailto:elvismoyo400@gmail.com?subject=Portfolio%20inquiry",
    icon: "email",
    external: false,
  },
  {
    label: "WhatsApp",
    detail: "+263 716 144 042",
    href: "https://wa.me/263716144042?text=Hi%20Elvis%2C%20I%20found%20your%20portfolio.",
    icon: "whatsapp",
    external: true,
  },
] as const;

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
      <ParticleBackground />
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
              <span>Full-stack engineer</span>
              <span className="eyebrow-divider" />
              <span>Lupane, Mat North Province, Zimbabwe</span>
            </div>
            <h1 id="hero-title">
              <span className="hero-word">Elvis</span>{" "}
              <span className="hero-word accent">Moyo</span>{" "}
            </h1>
            <p className="hero-tagline">
              I build systems that think, scale, and endure.
              Built in Zimbabwe. Ready for the world.
            </p>
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
            <h2>Always learning.<br />Always building.</h2>
            <p className="section-intro">
              A work in progress, shaped by curiosity, practice, and the things
              I make along the way.
            </p>
          </div>
          <div className="timeline">
            {milestones.map((milestone) => (
              <article className="timeline-item" key={milestone.title}>
                <span className="timeline-year">{milestone.year}</span>
                <div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

       <section className="content-section experience-section" id="experience">
  <div className="section-heading">
    <p className="section-kicker">02 / Experience</p>
    <h2>Growing through<br />real-world practice.</h2>
  </div>
 
<article className="experience-card">
  <div className="experience-topline">
    <span>Independent Development &amp; Projects</span>
    <span>2026 — Present</span>
  </div>

  <h3>Junior Software Developer</h3>

  <p>
    Building practical software development experience through
    hands-on projects, collaborative development, and continuous
    learning. Focused on creating responsive web applications,
    developing functional interfaces, and applying modern
    technologies to solve real-world problems.
  </p>

  <ul>
    <li>
      Developing responsive web applications using React,
      Next.js, JavaScript, and TypeScript.
    </li>
    <li>
      Building reusable components and interactive user
      interfaces with JSX and Tailwind CSS.
    </li>
    <li>
      Working with Python and Django to understand backend
      development and application architecture.
    </li>
    <li>
      Applying Git and GitHub for version control,
      collaboration, and project management.
    </li>
    <li>
      Exploring UI/UX principles and translating designs
      into functional interfaces using Figma.
    </li>
    <li>
      Integrating AI-powered tools into development workflows
      to improve productivity and problem-solving.
    </li>
  </ul>
</article>
</section>

        <section
          className="content-section skills-section"
          id="skills"
          aria-labelledby="skills-title"
        >
          <div className="section-heading">
  <p className="section-kicker">03 / WHAT I WORK WITH</p>

  <h2 id="skills-title">
    Tools &amp; technologies
    <span> behind my work.</span>
  </h2>

  <p className="section-intro">
    A growing toolkit of technologies, frameworks, and creative tools
    I use to build functional, responsive, and user-focused digital
    experiences.
  </p>
</div>
          <div
            className="skill-marquee"
            role="region"
            aria-label="Skills and proficiency levels"
          >
            <div className="skill-track">
              {[skills, skills].map((skillList, listIndex) => (
                <ul
                  className="skill-list"
                  key={listIndex}
                  aria-hidden={listIndex === 1}
                >
                  {skillList.map((skill) => {
                    const Icon = skill.icon;

                    return (
                      <li className="skill-card" key={skill.name}>
                        <span className="skill-card-icon" aria-hidden="true">
                          <Icon focusable="false" />
                        </span>
                        <h4>{skill.name}</h4>
                        <div
                          className="skill-progress"
                          role="progressbar"
                          aria-label={`${skill.name} proficiency`}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={skill.percentage}
                          aria-valuetext={`${skill.percentage}%`}
                        >
                          <span
                            className="skill-progress-fill"
                            style={{ width: `${skill.percentage}%` }}
                          >
                            <span>{skill.percentage}%</span>
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section work-section" id="work">
          <div className="section-heading work-heading">
  <p className="section-kicker">04 / PROJECTS & EXPERIMENTS</p>

  <h2>
    Building ideas into
    <span> real experiences.</span>
  </h2>

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
              <p className="section-kicker">05 / Contact</p>
              <h2>Let&apos;s <span>talk.</span></h2>
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
