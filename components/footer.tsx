"use client";

import Link from "next/link";
import { socialLinks } from "@/lib/data";
import { Github, Twitter, Linkedin } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "/github.png": <Github size={20} />,
  "/x.png": <Twitter size={20} />,
  "/linked-in.png": <Linkedin size={20} />,
};

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#D4A94D]/10 bg-black/70 backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white"
              style={{
                textShadow:
                  "0 0 10px rgba(212,169,77,0.15)",
              }}
            >
              David
              <span className="text-[#D4A94D]">.</span>
            </Link>

            <p className="text-sm text-white/40">
              Fullstack Developer & Digital Craftsman
            </p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.alt}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.alt}
                className="
                  group
                  relative
                  p-2.5
                  rounded-xl
                  border border-[#D4A94D]/10
                  bg-[#D4A94D]/5
                  text-white/50
                  transition-all duration-300
                  hover:border-[#D4A94D]/30
                  hover:bg-[#D4A94D]/10
                  hover:text-[#E5C15F]
                  hover:scale-105
                  hover:shadow-[0_0_15px_rgba(212,169,77,0.15)]
                "
              >
                {iconMap[link.src] || link.alt}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-white/30 text-center md:text-right">
            &copy; {new Date().getFullYear()} David Adams. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}