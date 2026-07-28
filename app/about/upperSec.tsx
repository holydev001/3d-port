"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/glassCard";
import Techstack from "./techstackroll";
import { certifications } from "@/lib/data";
import { ExternalLink, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function UpperSec() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-card",
        { opacity: 0, y: 50, rotateY: -10 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative flex w-full flex-col gap-8 lg:flex-row"
    >
      {/* LEFT COLUMN */}
      <div className="relative flex w-full flex-1 flex-col gap-8">
        {/* ABOUT CARD */}
        <GlassCard className="about-card relative flex flex-1 flex-col gap-6 p-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="
                  h-[90px] w-[90px] rounded-full
                  border border-[#D4A94D]/30
                  bg-[rgba(212,169,77,0.08)]
                  flex items-center justify-center
                  text-3xl font-bold text-white
                "
              >
                DA
              </div>

              <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-400 border-2 border-black" />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-white">
                David Adams
              </h2>

              <a
                href="https://drive.google.com/file/d/10fGkRdGm-2iDLL9nR2aYa3JiUtPm4hOV/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex h-[36px] items-center gap-2
                  rounded-lg border border-[#D4A94D]/40
                  bg-[#D4A94D]/10
                  px-4 text-sm font-semibold text-white
                  transition-all duration-300
                  hover:bg-[#D4A94D]/15
                  hover:border-[#D4A94D]/60
                  hover:scale-105
                  hover:shadow-[0_0_15px_rgba(212,169,77,0.15)]
                "
              >
                <ExternalLink size={14} />
                Resume
              </a>
            </div>
          </div>

          {/* BIOGRAPHY */}
          <div className="flex flex-col gap-4">
            <div
              className="
                rounded-xl p-4
                border border-[#D4A94D]/15
                bg-[rgba(212,169,77,0.05)]
                hover:border-[#D4A94D]/30
                transition-colors duration-300
              "
            >
              <p className="text-sm leading-relaxed text-white/70">
                I&apos;m a full-stack developer with a strong focus on building
                clean, scalable, and user-friendly web applications. I enjoy
                turning complex ideas into practical digital solutions and
                continuously improving my craft through hands-on projects and
                learning.
              </p>
            </div>

            <div
              className="
                rounded-xl p-4
                border border-[#D4A94D]/15
                bg-[rgba(212,169,77,0.05)]
                hover:border-[#D4A94D]/30
                transition-colors duration-300
              "
            >
              <p className="text-sm leading-relaxed text-white/70">
                My experience spans frontend and backend development, with a
                growing interest in system design, performance optimization,
                and developer experience. I love exploring 3D web technologies
                and creating immersive digital experiences.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* TECH STACK */}
        <GlassCard className="about-card relative p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <span className="text-[#D4A94D]">◈</span> Tech Stack
          </h3>

          <Techstack />
        </GlassCard>
      </div>

      {/* RIGHT COLUMN — CERTIFICATIONS */}
      <GlassCard className="about-card flex w-full flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
          <Award size={20} className="text-[#D4A94D]" />
          Certifications
        </h3>

        <div className="flex flex-col gap-3">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="
                group rounded-xl p-4
                border border-[#D4A94D]/15
                bg-[rgba(212,169,77,0.05)]
                hover:border-[#D4A94D]/30
                hover:bg-[rgba(212,169,77,0.08)]
                transition-all duration-300
              "
            >
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between"
                >
                  <div>
                    <p className="text-[15px] font-medium group-hover:text-[#E5C15F] transition-colors">
                      {cert.title}
                    </p>

                    <span className="text-[13px] text-white/50">
                      {cert.issuer}
                    </span>
                  </div>

                  <ExternalLink
                    size={16}
                    className="text-white/30 group-hover:text-[#D4A94D] transition-colors mt-1"
                  />
                </a>
              ) : (
                <div>
                  <p className="text-[15px] font-medium text-white">
                    {cert.title}
                  </p>

                  <span className="text-[13px] text-white/50">
                    {cert.issuer}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}