"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CursorGlow from "@/components/cursorGlow";
import { projects } from "@/lib/data";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle,
  Layers,
  Tag,
} from "lucide-react";

interface ProjectDetailProps {
  params: { slug: string };
}

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const project = projects.find((p) => p.slug === params.slug);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".detail-animate",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-black">
      <CursorGlow />
      <Header />

      <div
        ref={contentRef}
        className="relative w-full max-w-[1000px] mx-auto px-6 md:px-12 pt-28 pb-16 flex-1"
      >
        {/* BACK */}
        <Link
          href="/about"
          className="
            detail-animate inline-flex items-center gap-2 mb-8
            text-white/50
            hover:text-[#D4A94D]
            transition-colors duration-300
          "
        >
          <ArrowLeft size={18} />
          Back to Projects
        </Link>

        {/* HERO */}
        <div className="detail-animate mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="
                p-2 rounded-lg
                border border-[#D4A94D]/20
                bg-[rgba(212,169,77,0.08)]
              "
            >
              <Layers size={20} className="text-[#D4A94D]" />
            </div>

            <span className="text-sm text-white/40 font-mono">
              Project Details
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {project.name}
          </h1>

          <p className="text-lg text-white/50 leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* TAGS */}
        <div className="detail-animate flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
                flex items-center gap-1 px-3 py-1.5 rounded-full
                border border-[#D4A94D]/15
                text-[#D4A94D]/70
                bg-[rgba(212,169,77,0.05)]
                text-sm
              "
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>

        {/* LINKS */}
        <div className="detail-animate flex flex-wrap gap-4 mb-12">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2 px-6 py-3 rounded-xl
                border border-[#D4A94D]/20
                bg-[rgba(212,169,77,0.05)]
                text-white
                transition-all duration-300
                hover:bg-[rgba(212,169,77,0.12)]
                hover:border-[#D4A94D]/40
                hover:scale-105
                hover:shadow-[0_0_20px_rgba(212,169,77,0.12)]
              "
            >
              <Github size={18} />
              <span className="font-medium">View Code</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2 px-6 py-3 rounded-xl
                border border-[#D4A94D]/20
                bg-[rgba(212,169,77,0.05)]
                text-white
                transition-all duration-300
                hover:bg-[rgba(212,169,77,0.12)]
                hover:border-[#D4A94D]/40
                hover:scale-105
                hover:shadow-[0_0_20px_rgba(212,169,77,0.12)]
              "
            >
              <ExternalLink size={18} />
              <span className="font-medium">Live Demo</span>
            </a>
          )}
        </div>

        {/* FEATURES */}
        <div className="detail-animate">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
            <CheckCircle size={22} className="text-[#D4A94D]" />
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, i) => (
              <div
                key={i}
                className="
                  flex items-start gap-3 p-4 rounded-xl
                  border border-[#D4A94D]/10
                  bg-[rgba(212,169,77,0.04)]
                  hover:border-[#D4A94D]/25
                  transition-all duration-300
                "
              >
                <div className="mt-0.5 min-w-[20px]">
                  <div
                    className="
                      h-5 w-5 rounded-full
                      bg-[rgba(212,169,77,0.15)]
                      border border-[#D4A94D]/30
                      flex items-center justify-center
                    "
                  >
                    <span className="text-[10px] text-[#D4A94D] font-bold">
                      {i + 1}
                    </span>
                  </div>
                </div>

                <span className="text-white/70">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="detail-animate mt-16 pt-8 border-t border-white/10">
          <div className="flex justify-between items-center">
            <Link
              href="/about/all-projects"
              className="text-white/40 hover:text-[#D4A94D] transition-colors text-sm"
            >
              View All Projects
            </Link>

            <Link
              href="/contact"
              className="
                flex items-center gap-2 text-white/60
                hover:text-[#D4A94D]
                transition-colors text-sm
              "
            >
              Get in Touch
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}