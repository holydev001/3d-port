"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".notfound-animate",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-black"
    >
      {/* 404 */}
      <div
        className="
          notfound-animate
          text-[120px] md:text-[180px]
          font-bold leading-none
          text-transparent bg-clip-text
          select-none
        "
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(212,169,77,0.5), rgba(212,169,77,0))",
        }}
      >
        404
      </div>

      {/* Title */}
      <h1 className="notfound-animate text-2xl md:text-3xl font-bold mt-4 mb-2 text-white">
        Page Not Found
      </h1>

      {/* Description */}
      <p className="notfound-animate text-white/40 text-center max-w-md mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Actions */}
      <div className="notfound-animate flex gap-4">
        <Link
          href="/"
          className="
            flex items-center gap-2 px-6 py-3 rounded-xl
            border border-[#D4A94D]/20
            bg-[#D4A94D]/5
            text-white
            transition-all duration-300
            hover:bg-[#D4A94D]/10
            hover:border-[#D4A94D]/40
            hover:scale-105
            hover:shadow-[0_0_20px_rgba(212,169,77,0.15)]
          "
        >
          <Home size={18} />
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="
            flex items-center gap-2 px-6 py-3 rounded-xl
            border border-white/10
            text-white/80
            transition-all duration-300
            hover:border-[#D4A94D]/30
            hover:text-[#E5C15F]
            hover:scale-105
            hover:shadow-[0_0_15px_rgba(212,169,77,0.1)]
          "
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    </div>
  );
}