"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CursorGlow from "@/components/cursorGlow";
import { projects } from "@/lib/data";
import { ArrowLeft, ExternalLink, Github, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AllProjects() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-grid-item",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-black">
      <CursorGlow />
      <Header />

      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-16 flex-1">
        {/* BACK */}
        <Link
          href="/about"
          className="
            inline-flex items-center gap-2 mb-8
            text-white/50
            hover:text-[#D4A94D]
            transition-colors duration-300
          "
        >
          <ArrowLeft size={18} />
          Back to About
        </Link>

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            All{" "}
            <span
              style={{
                color: "#D4A94D",
                textShadow:
                  "0 0 10px rgba(212,169,77,0.25), 0 0 20px rgba(212,169,77,0.1)",
              }}
            >
              Projects
            </span>
          </h1>

          <p className="text-white/40 max-w-lg">
            A complete collection of my work across various technologies and
            domains.
          </p>
        </div>

        {/* GRID */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/about/${project.slug}`}
              className="project-grid-item group"
            >
              <div
                className="
                  relative h-full min-h-[280px]
                  overflow-hidden rounded-2xl
                  border border-[#D4A94D]/15
                  bg-black/40 backdrop-blur-sm
                  hover:border-[#D4A94D]/30
                  transition-all duration-500
                  hover:shadow-[0_0_30px_rgba(212,169,77,0.12)]
                  p-6 flex flex-col
                "
              >
                {/* HEADER ROW */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        p-2 rounded-lg
                        bg-[rgba(212,169,77,0.08)]
                        border border-[#D4A94D]/20
                      "
                    >
                      <Layers size={18} className="text-[#D4A94D]" />
                    </div>

                    <span className="text-white/20 text-sm font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <ExternalLink
                    size={16}
                    className="
                      text-white/20
                      group-hover:text-[#D4A94D]
                      transition-colors
                    "
                  />
                </div>

                {/* TITLE */}
                <h3
                  className="
                    text-xl font-bold mb-2
                    text-white
                    group-hover:text-[#D4A94D]
                    transition-colors
                  "
                >
                  {project.name}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm text-white/40 mb-4 flex-1">
                  {project.shortDescription}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        px-2 py-1 text-[11px] rounded-md
                        border border-[#D4A94D]/15
                        text-[#D4A94D]/60
                        bg-[rgba(212,169,77,0.05)]
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* LINKS */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                  {project.githubUrl && (
                    <span
                      className="
                        flex items-center gap-1 text-xs
                        text-white/30
                        hover:text-[#D4A94D]
                        transition-colors
                      "
                    >
                      <Github size={12} /> Code
                    </span>
                  )}

                  {project.liveUrl && (
                    <span
                      className="
                        flex items-center gap-1 text-xs
                        text-white/30
                        hover:text-[#D4A94D]
                        transition-colors
                      "
                    >
                      <ExternalLink size={12} /> Live
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}