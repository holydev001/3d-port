"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { techStack } from "@/lib/data";

export default function Techstack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-item",
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full py-4">
      <div className="flex flex-wrap gap-3 justify-center">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="tech-item group flex items-center gap-2 px-4 py-2 rounded-xl
                       border border-neon-blue/15 bg-neon-blue/5
                       hover:border-neon-blue/40 hover:bg-neon-blue/10
                       transition-all duration-300 hover:scale-105
                       hover:shadow-[0_0_15px_rgba(3,150,255,0.15)]"
          >
            <span className="text-lg">{tech.icon}</span>
            <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
