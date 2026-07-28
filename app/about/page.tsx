"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/header";
import Footer from "@/components/footer";
import UpperSec from "./upperSec";
import LowerSec from "./lowerSec";
import CursorGlow from "@/components/cursorGlow";
import Scene3D from "@/components/3d/scenex";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-hero",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-black">
      <CursorGlow />
      <Header />
      <Scene3D />

      <div
        ref={containerRef}
        className="relative w-full max-w-[1300px] mx-auto md:p-[50px] p-[20px] pt-24 flex flex-col gap-12"
      >
        {/* Hero */}
        <div className="about-hero text-center mb-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            About{" "}
            <span
              className="text-[#D4A94D]"
              style={{
                textShadow:
                  "0 0 10px rgba(212,169,77,0.35), 0 0 20px rgba(212,169,77,0.15)",
              }}
            >
              Me
            </span>
          </h1>

          <p className="text-white/40 max-w-lg mx-auto">
            Get to know my background, skills, and the technologies I work with.
          </p>
        </div>

        {/* Sections */}
        <UpperSec />
        <LowerSec />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}