"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { notFound, useParams } from "next/navigation";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ExternalLink,
  Github,
  Orbit,
  Sparkles,
} from "lucide-react";
import CursorGlow from "@/components/cursorGlow";
import { projects } from "@/lib/data";

const Scene3D = dynamic(() => import("@/components/3d/scene"), { ssr: false });

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === params.slug);
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!project) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".project-reveal",
        { opacity: 0, y: 36, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.09, ease: "power3.out", delay: 0.08 },
      );
    }, pageRef);

    return () => context.revert();
  }, [project]);

  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(index - 1 + projects.length) % projects.length];
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <div className="project-page">
      <CursorGlow />
      <Scene3D />
      <div className="cosmic-grain" aria-hidden="true" />

      <header className="project-nav">
        <Link className="project-nav__back" href="/#work" data-cursor>
          <ArrowLeft size={16} />
          <span>Selected work</span>
        </Link>
        <Link className="project-nav__brand" href="/" aria-label="Return to holydev home" data-cursor>
          <span>holy</span>dev
        </Link>
        <span className="project-nav__index">Signal {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
      </header>

      <main ref={pageRef} className="project-content">
        <section className="project-hero" aria-labelledby="project-title">
          <div className="project-hero__meta project-reveal">
            <span><Orbit size={15} /> {project.category}</span>
            <span>{project.year}</span>
          </div>

          <div className="project-hero__grid">
            <div>
              <p className="project-kicker project-reveal">Transmission / {String(index + 1).padStart(2, "0")}</p>
              <h1 id="project-title" className="project-title project-reveal">{project.name}</h1>
            </div>
            <div className="project-hero__summary project-reveal">
              <p>{project.fullDescription}</p>
              <div className="project-actions">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-action project-action--primary" data-cursor>
                    {project.slug === "kairo" ? "Download release" : "Launch project"}
                    <ArrowUpRight size={17} />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-action" data-cursor>
                    <Github size={17} />
                    Source
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="project-orbit project-reveal" aria-hidden="true">
            <span className="project-orbit__ring project-orbit__ring--one" />
            <span className="project-orbit__ring project-orbit__ring--two" />
            <span className="project-orbit__core"><Sparkles size={20} /></span>
            <span className="project-orbit__caption">Mission payload</span>
          </div>
        </section>

        <section className="project-specs" aria-label="Project specifications">
          <div className="project-section-label project-reveal">
            <span>01</span>
            <p>System profile</p>
          </div>
          <div className="project-stack project-reveal">
            <p>Built with</p>
            <div>
              {project.tags.map((tag, tagIndex) => (
                <span key={tag}><b>{String(tagIndex + 1).padStart(2, "0")}</b>{tag}</span>
              ))}
            </div>
          </div>
          <div className="project-stats project-reveal">
            <div><small>Category</small><strong>{project.category}</strong></div>
            <div><small>Release</small><strong>{project.year}</strong></div>
            <div><small>Modules</small><strong>{String(project.features.length).padStart(2, "0")}</strong></div>
          </div>
        </section>

        <section className="project-features" aria-labelledby="features-title">
          <div className="project-features__head">
            <div className="project-section-label project-reveal">
              <span>02</span>
              <p>Mission modules</p>
            </div>
            <h2 id="features-title" className="project-reveal">What it was <em>built</em> to do.</h2>
          </div>
          <div className="feature-grid">
            {project.features.map((feature, featureIndex) => (
              <article className="feature-card project-reveal" key={feature}>
                <span className="feature-card__number">{String(featureIndex + 1).padStart(2, "0")}</span>
                <Check size={18} />
                <p>{feature}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="project-outro project-reveal">
          <div>
            <p>Want to build something with gravity?</p>
            <a href="mailto:davebenaaa@gmail.com" data-cursor>
              Start a conversation <ExternalLink size={18} />
            </a>
          </div>
          <Link href="/#work" className="project-outro__return" data-cursor>
            Back to transmissions <ArrowUpRight size={18} />
          </Link>
        </section>
      </main>

      <footer className="project-footer">
        <Link href={`/about/${previousProject.slug}`} className="project-switcher" data-cursor>
          <ArrowLeft size={18} />
          <span><small>Previous signal</small>{previousProject.name}</span>
        </Link>
        <Link href={`/about/${nextProject.slug}`} className="project-switcher project-switcher--next" data-cursor>
          <span><small>Next signal</small>{nextProject.name}</span>
          <ArrowRight size={18} />
        </Link>
      </footer>
    </div>
  );
}
