"use client";

import SpaceCursor from "@/components/cursorGlow";

// Kept for legacy route components that still compile in this branch.
export const useIntroComplete = () => true;

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SpaceCursor />
      {children}
    </>
  );
}
