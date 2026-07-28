"use client";

import Footer from "@/components/footer";
import TypingLoop from "@/components/typingLoop";
import Scene3D from "@/components/3d/scenex";
import CursorGlow from "@/components/cursorGlow";
import { socialLinks } from "@/lib/data";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { useIntroComplete } from "@/components/ClientShell";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  "/github.png": <Github size={22} />,
  "/x.png": <Twitter size={22} />,
  "/linked-in.png": <Linkedin size={22} />,
};

const projects = [
  {
    name: "E-Commerce Platform",
    desc: "Full-stack shopping with real-time inventory",
    tags: ["Next.js", "Stripe", "Prisma"],
  },
  {
    name: "Task Manager Pro",
    desc: "Collaborative project management tool",
    tags: ["React", "Node.js", "Socket.io"],
  },
  {
    name: "AI Assistant",
    desc: "Intelligent chatbot with NLP capabilities",
    tags: ["OpenAI", "TypeScript", "Redis"],
  },
];

export default function hero() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLElement>(null);
  const workContentRef = useRef<HTMLDivElement>(null);

  const introComplete = useIntroComplete();

  useEffect(() => {
    if (!introComplete) return;

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      introTl
        .fromTo(
          ".hero-title-line",
          {
            opacity: 0,
            y: 55,
            z: -260,
            rotateX: 28,
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.05,
            stagger: 0.1,
          }
        )
        .fromTo(
          ".hero-typing",
          { opacity: 0, y: 25, z: -120, filter: "blur(8px)" },
          { opacity: 1, y: 0, z: 0, filter: "blur(0px)", duration: 0.8 },
          "-=0.35"
        )
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 25, z: -120, filter: "blur(8px)" },
          { opacity: 1, y: 0, z: 0, filter: "blur(0px)", duration: 0.8 },
          "-=0.45"
        )
        .fromTo(
          ".hero-social-link",
          { opacity: 0, y: 20, z: -90, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            z: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "back.out(1.8)",
          },
          "-=0.3"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        );

      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(heroContentRef.current, {
        z: -700,
        y: -140,
        scale: 0.58,
        opacity: 0,
        rotateX: -18,
        filter: "blur(18px)",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.fromTo(
        workContentRef.current,
        {
          z: 520,
          y: 120,
          scale: 1.25,
          opacity: 0,
          rotateX: 14,
          filter: "blur(18px)",
        },
        {
          z: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: workSectionRef.current,
            start: "top bottom",
            end: "top 25%",
            scrub: 1.4,
          },
        }
      );

      gsap.fromTo(
        ".project-card",
        {
          opacity: 0,
          y: 90,
          z: 260,
          scale: 1.12,
          rotateX: 18,
          filter: "blur(14px)",
        },
        {
          opacity: 1,
          y: 0,
          z: 0,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.95,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 78%",
          },
        }
      );

      gsap.fromTo(
        ".work-cta",
        { opacity: 0, y: 24, z: 160, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          z: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work-cta",
            start: "top 88%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [introComplete]);

  return (
    <div
      ref={pageRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        fontFamily: "var(--font-barlow-condensed)",
      }}
    >
      <CursorGlow />
      <Scene3D />

      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.04)_42%,rgba(0,0,0,0.42)_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.02),rgba(0,0,0,0.32))]" />

      <section
        ref={heroRef}
        className="relative z-10 flex min-h-screen flex-1 flex-col items-center justify-center px-6 pt-24"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          ref={heroContentRef}
          className="relative mx-auto max-w-4xl text-center"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform, opacity, filter",
          }}
        >
          <h1 className="relative text-[45px] font-bold leading-[0.68] tracking-[0.02em] md:text-[70px]">
            <span
              className="hero-title-line block text-[#D4A94D] mr-7"
              style={{
                textShadow:
                  "0 0 14px rgba(212,169,77,0.95), 0 0 34px rgba(212,169,77,0.55), 0 0 72px rgba(212,169,77,0.28)",
              }}
            >
              Fullstack
            </span>

            <span className="hero-title-line -mt-3 block text-white md:-mt-3 ml-7 "  style={{
                textShadow:
                  "0 0 14px rgba(212,169,77,0.95), 0 0 34px rgba(212,169,77,0.55), 0 0 72px rgba(212,169,77,0.28)",
              }} >
              Developer
            </span>
          </h1>

          <div className="hero-typing mt-8">
            <TypingLoop
              words={[
                "Frontend Developer",
                "Backend Developer",
                "React Developer",
                "Node.js Developer",
                "Next.js Developer",
                "Three.js Enthusiast",
              ]}
              typingSpeed={80}
              eraseSpeed={40}
              delayBetween={1500}
              className="text-lg font-medium tracking-[0.08em] text-[#DDB24E]/80 md:text-xl"
            />
          </div>

          <p className="hero-desc mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed tracking-[0.03em] text-white/50 md:text-lg">
            Hi, I&apos;m{" "}
            <span className="font-semibold text-[#E5C15F]">David</span>.
            Bringing your digital ideas to life with innovative design and
            seamless development. I specialize in creating responsive,
            user-friendly websites that not only look great but perform
            flawlessly.
          </p>

          <div className="hero-socials mt-10 flex items-center justify-center gap-6">
            {socialLinks.map((icon) => (
              <a
                key={icon.alt}
                href={icon.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon.alt}
                className="
                  hero-social-link group relative rounded-xl
                  border border-[#D4A94D]/20
                  bg-[#D4A94D]/5 p-3
                  transition-all duration-300
                  hover:scale-110 hover:border-[#D4A94D]/50
                  hover:bg-[#D4A94D]/10
                  hover:shadow-[0_0_25px_rgba(212,169,77,0.28)]
                "
              >
                <span className="text-white/70 transition-colors group-hover:text-[#E5C15F]">
                  {iconMap[icon.src]}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs uppercase tracking-[0.45em]">Scroll</span>
          <ArrowDown size={20} />
        </div>
      </section>

      <section
        ref={workSectionRef}
        className="relative z-10 min-h-screen flex justify-center items-center px-6 py-24"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          ref={workContentRef}
          className="mx-auto max-w-[1400px]"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform, opacity, filter",
          }}
        >
          <div className="work-heading mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Featured{" "}
              <span
                className="text-[#D4A94D]"
                style={{
                  textShadow:
                    "0 0 10px rgba(212,169,77,0.35), 0 0 20px rgba(212,169,77,0.15)",
                }}
              >
                Work
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-white/40">
              A selection of projects that showcase my expertise in modern web
              development.
            </p>
          </div>

          <div className="projects-grid grid grid-cols-1 gap-6 md:grid-cols-3">
            {projects.map((project, i) => (
              <div
                key={project.name}
                className="
                  project-card group relative overflow-hidden rounded-2xl
                  border border-[#D4A94D]/10
                  bg-gradient-to-br from-[#D4A94D]/5 to-transparent
                  p-6 backdrop-blur-sm
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:border-[#D4A94D]/30
                  hover:shadow-[0_0_30px_rgba(212,169,77,0.12)]
                "
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity, filter",
                }}
              >
                <div className="absolute right-4 top-4 select-none text-6xl font-bold text-white/10">
                  0{i + 1}
                </div>

                <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-[#E5C15F]">
                  {project.name}
                </h3>

                <p className="mb-4 text-sm text-white/40">{project.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        rounded-full border border-[#D4A94D]/20
                        bg-[#D4A94D]/5 px-3 py-1
                        text-xs text-[#DDB24E]/80
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="work-cta mt-12 text-center">
            <Link
              href="/about"
              className="
                inline-flex items-center gap-2 rounded-full
                border border-[#D4A94D]/30 px-8 py-3
                text-[#D4A94D]
                transition-all duration-300
                hover:bg-[#D4A94D]/10
                hover:shadow-[0_0_20px_rgba(212,169,77,0.2)]
              "
            >
              View All Projects
              <ArrowDown size={16} className="rotate-[-90deg]" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}