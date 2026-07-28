"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { projects } from "@/lib/data";
import { ArrowRight, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LowerSec() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredProjects = projects.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          <span
            style={{
              color: "#D4A94D",
              textShadow:
                "0 0 10px rgba(212,169,77,0.25), 0 0 20px rgba(212,169,77,0.1)",
            }}
          >
            Projects
          </span>
        </h2>

        <Link
          href="/about/all-projects"
          className="
            flex items-center gap-1 px-4 py-2 text-sm font-medium
            text-white/70
            hover:text-[#D4A94D]
            transition-all duration-300
            hover:gap-2
          "
        >
          See all
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[100px] md:mb-[50px]">
        {featuredProjects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/about/${project.slug}`}
            className="project-card group block"
          >
            <div
              className="
                relative h-full min-h-[320px]
                overflow-hidden rounded-2xl
                border border-[#D4A94D]/15
                bg-black/40 backdrop-blur-sm
                transition-all duration-500
                hover:border-[#D4A94D]/30
                hover:shadow-[0_0_35px_rgba(212,169,77,0.12)]
              "
            >
              {/* BACKGROUND GLOW */}
              <div
                className="
                  absolute inset-0 opacity-20
                  group-hover:opacity-40
                  transition-opacity duration-500
                "
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212,169,77,0.25) 0%, transparent 60%)",
                }}
              />

              {/* CONTENT */}
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className="absolute top-4 right-4 text-white/5 text-7xl font-bold select-none">
                  0{index + 1}
                </div>

                {/* TAGS */}
                <div className="mb-auto pt-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="
                          px-2 py-1 text-[10px] rounded-md
                          border border-[#D4A94D]/20
                          text-[#D4A94D]/70
                          bg-[rgba(212,169,77,0.05)]
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* TEXT */}
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3
                    className="
                      text-2xl font-bold mb-2
                      text-white
                      group-hover:text-[#D4A94D]
                      transition-colors duration-300
                    "
                  >
                    {project.name}
                  </h3>

                  <p className="text-sm text-white/50 mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  <div
                    className="
                      flex items-center gap-2 text-sm
                      text-white/60
                      group-hover:text-[#D4A94D]
                      transition-colors duration-300
                    "
                  >
                    <span>View Project</span>
                    <ExternalLink
                      size={14}
                      className="transform group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>

              {/* HOVER LAYER */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4A94D]/10 via-transparent to-transparent" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}