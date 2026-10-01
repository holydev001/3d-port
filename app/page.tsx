"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { experiences, projects, techStack } from "@/lib/data";

const Scene3D = dynamic(() => import("@/components/3d/scene"), { ssr: false });

const navItems = [
  ["Index", "#top"],
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Work", "#work"],
  ["Contact", "#contact"],
];

const socials = [
  ["GitHub", "https://github.com/holydev001", Github],
  ["X / Twitter", "https://x.com/holydev0001", Twitter],
  ["LinkedIn", "https://www.linkedin.com/in/david-adams-b0228835b/", Linkedin],
] as const;

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), 1650);
    return () => window.clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".dive-section");
      sections.forEach((section) => {
        const content = section.querySelector(".dive-content");
        if (!content) return;
        const items = section.querySelectorAll<HTMLElement>(
          ".hero-kicker, .hero-title, .hero-lower, .hero-index, .section-label, .eyebrow, h2, .about-grid > *, .experience-row, .project-row, .stack-cloud > *, .contact-stars, .contact-link",
        );

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.42,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(
            content,
            { z: 760, scale: 1.38, opacity: 0, rotateX: 13 },
            {
              z: 0,
              scale: 1,
              opacity: 1,
              rotateX: 0,
              duration: 0.28,
              ease: "power2.out",
            },
          )
          .fromTo(
            items,
            {
              y: 90,
              z: 300,
              opacity: 0,
              rotateX: 18,
              scale: 1.08,
            },
            {
              y: 0,
              z: 0,
              opacity: 1,
              rotateX: 0,
              scale: 1,
              stagger: 0.018,
              duration: 0.22,
              ease: "power3.out",
            },
            0.1,
          )
          .to({}, { duration: 0.32 })
          .to(
            items,
            {
              y: -55,
              z: -280,
              opacity: 0,
              rotateX: -10,
              scale: 0.92,
              stagger: 0.01,
              duration: 0.15,
              ease: "power2.in",
            },
            0.76,
          )
          .to(
            content,
            {
              z: -880,
              scale: 0.56,
              opacity: 0,
              rotateX: -14,
              duration: 0.24,
              ease: "power2.in",
            },
            0.76,
          );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const navigateTo = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };

  return (
    <div ref={pageRef} className="site-shell" id="top">
      <div className={`entry-screen ${intro ? "" : "is-gone"}`} aria-hidden="true">
        <div className="entry-stars">
          {Array.from({ length: 18 }, (_, index) => (
            <i key={index} style={{ "--star": index } as React.CSSProperties} />
          ))}
        </div>
        <div className="entry-corner entry-corner--tl">06.5244° N</div>
        <div className="entry-corner entry-corner--tr">SYS / HOLY.DEV</div>
        <div className="entry-corner entry-corner--bl">DEPTH 000 → 043</div>
        <div className="entry-corner entry-corner--br">SIGNAL LOCKED</div>

        <div className="entry-gate">
          <span className="entry-gate__ring entry-gate__ring--outer" />
          <span className="entry-gate__ring entry-gate__ring--middle" />
          <span className="entry-gate__ring entry-gate__ring--inner" />
          <span className="entry-gate__cross entry-gate__cross--x" />
          <span className="entry-gate__cross entry-gate__cross--y" />
          <span className="entry-gate__core">H</span>
        </div>

        <div className="entry-copy">
          <span>FLIGHT SEQUENCE / 001</span>
          <strong>Prepare for descent.</strong>
          <small>Calibrating spatial interface</small>
        </div>
        <div className="entry-progress"><i /></div>
      </div>

      <Scene3D />
      <div className="cosmic-grain" aria-hidden="true" />
      <div className="orbital-line orbital-line-one" aria-hidden="true" />
      <div className="orbital-line orbital-line-two" aria-hidden="true" />

      <header className="site-nav">
        <a
          className="brand-mark"
          href="#top"
          aria-label="Back to top"
          onClick={(event) => navigateTo(event, "#top")}
        >
          <div>
            <strong><span>holy</span>dev</strong>
            <small>Creative orbit / 2026</small>
          </div>
        </a>

        <button
          className={`menu-trigger ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav-panel ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <div className="nav-panel-meta">Coordinates / 06.5244° N, 3.3792° E</div>
          {navItems.map(([label, href], index) => (
            <a key={href} href={href} onClick={(event) => navigateTo(event, href)}>
              <small>0{index + 1}</small>
              <span>{label}</span>
              <ArrowDownRight size={20} />
            </a>
          ))}
        </nav>
      </header>

      <nav className="orbit-nav" aria-label="Section navigation">
        <span className="orbit-nav__axis" aria-hidden="true" />
        {navItems.map(([label, href], index) => (
          <a
            key={href}
            href={href}
            onClick={(event) => navigateTo(event, href)}
            aria-label={`Go to ${label}`}
          >
            <span className="orbit-nav__label">{label}</span>
            <span className="orbit-nav__node"><i />{String(index + 1).padStart(2, "0")}</span>
          </a>
        ))}
      </nav>

      <main>
        <section className="hero-section dive-section" aria-labelledby="hero-title">
          <div className="dive-content hero-dive-content">
          <div className="hero-kicker reveal">
            <span>David Adams / holydev001</span>
            <span>Full-stack developer · Nigeria</span>
          </div>

          <h1 id="hero-title" className="hero-title">
            <span className="hero-line line-one">Building digital</span>
            <span className="hero-line line-two">things with <em>intent.</em></span>
          </h1>

          <div className="hero-lower">
            <p>
              Full-stack developer with 3+ years building modern, scalable web
              applications end to end—currently shaping analytics and data
              visualization tools at Emerj LLC.
            </p>
            <a
              href="#work"
              className="orbit-cta"
              onClick={(event) => navigateTo(event, "#work")}
            >
              <span>Explore selected work</span>
              <ArrowDownRight size={22} />
            </a>
          </div>

          <div className="hero-index" aria-hidden="true">
            <span>CREATIVE PORTFOLIO</span>
            <b>001</b>
          </div>
          </div>
        </section>

        <section className="manifesto-section dive-section" id="about">
          <div className="dive-content section-dive-grid">
          <div className="section-label">
            <span>01</span>
            <p>Approach / About</p>
          </div>
          <div className="manifesto-copy">
            <p className="eyebrow">Clean architecture. Useful interfaces.</p>
            <h2>
              Built for people, with the systems
              <span> to scale behind them.</span>
            </h2>
            <div className="about-grid">
              <p>
                I’m David Adams, a full-stack developer based in Nigeria. I
                build with JavaScript, TypeScript, React, Next.js, and Node.js,
                with a focus on clean architecture and predictable APIs.
              </p>
              <p>
                I care about performant, user-friendly applications—from
                thoughtful interfaces and data-rich products to the backend
                systems that make them reliable.
              </p>
            </div>
          </div>
          </div>
        </section>

        <section className="experience-section dive-section" id="experience">
          <div className="dive-content">
            <div className="section-heading experience-heading">
              <div className="section-label">
                <span>02</span>
                <p>Flight record / Experience</p>
              </div>
              <div>
                <p className="eyebrow">3+ years in production</p>
                <h2>Making products move.</h2>
              </div>
            </div>

            <div className="experience-list">
              {experiences.map((experience, index) => (
                <article className="experience-row" key={experience.company}>
                  <span className="experience-number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="experience-title">
                    <p>{experience.period} <i>·</i> {experience.location}</p>
                    <h3>{experience.company}</h3>
                    <strong>{experience.role}</strong>
                  </div>
                  <div className="experience-detail">
                    <p>{experience.summary}</p>
                    <ul>
                      {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                    <div className="experience-stack">
                      {experience.stack.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="work-section dive-section" id="work">
          <div className="dive-content">
          <div className="section-heading">
            <div className="section-label">
              <span>03</span>
              <p>Selected transmissions</p>
            </div>
            <h2>Work in orbit.</h2>
          </div>

          <div className="project-list">
            {projects.slice(0, 4).map((project, index) => (
              <a
                className="project-row"
                href={`/about/${project.slug}`}
                key={project.slug}
                data-cursor
              >
                <span className="project-number">0{index + 1}</span>
                <div className="project-title">
                  <small>{project.tags.slice(0, 3).join(" / ")}</small>
                  <h3>{project.name}</h3>
                </div>
                <p>{project.shortDescription}</p>
                <span className="project-arrow"><ArrowUpRight /></span>
              </a>
            ))}
          </div>
          </div>
        </section>

        <section className="capabilities-section dive-section">
          <div className="dive-content section-dive-grid">
          <div className="section-label">
            <span>04</span>
            <p>Capabilities / Stack</p>
          </div>
          <div className="capabilities-layout">
            <h2>Built across the whole stack.</h2>
            <div className="stack-cloud">
              {techStack.map((tech, index) => (
                <span key={tech.name} style={{ "--delay": `${index * -0.7}s` } as React.CSSProperties}>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
          </div>
        </section>

        <section className="contact-section dive-section" id="contact">
          <div className="dive-content contact-dive-content">
          <div className="contact-stars" aria-hidden="true">✦ &nbsp; · &nbsp; ✦</div>
          <p>Have an idea with gravity?</p>
          <h2>Let’s make it <em>real.</em></h2>
          <a href="mailto:davebenaaa@gmail.com" className="contact-link">
            Start a conversation
            <Mail size={22} />
          </a>
          </div>
        </section>
      </main>

      <footer className="galaxy-footer">
        <div className="footer-brand">
          <span className="footer-orbit" />
          <div>
            <strong>DAVID ADAMS</strong>
            <p>Full-stack developer / Nigeria · WAT (UTC+1)</p>
          </div>
        </div>
        <div className="footer-links">
          {socials.map(([label, href, Icon]) => (
            <a href={href} target="_blank" rel="noreferrer" key={label}>
              <Icon size={16} />
              {label}
            </a>
          ))}
        </div>
        <div className="footer-end">
          <span>© {new Date().getFullYear()}</span>
          <a href="#top" onClick={(event) => navigateTo(event, "#top")}>
            Return to orbit ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
