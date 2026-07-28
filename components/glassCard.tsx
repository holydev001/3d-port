"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#D4A94D]/20 bg-[rgba(212,169,77,0.06)] backdrop-blur-xl transition-all duration-300",
        "hover:border-[#D4A94D]/30 hover:bg-[rgba(212,169,77,0.08)] hover:shadow-[0_0_25px_rgba(212,169,77,0.12)]",
        className
      )}
    >
      {children}
    </div>
  );
}