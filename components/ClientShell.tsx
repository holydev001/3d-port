"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Header from "@/components/header";
import PageIntro from "@/components/PageIntro";

export const IntroContext = createContext(false);
export const useIntroComplete = () => useContext(IntroContext);

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [revealPage, setRevealPage] = useState(false);

  const headerLogoRef = useRef<HTMLHeadingElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);

    const navEntries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];

    const isReload = navEntries[0]?.type === "reload";
    const hasSeenIntro = sessionStorage.getItem("holy-dev-intro-seen");

    if (!hasSeenIntro || isReload) {
      sessionStorage.setItem("holy-dev-intro-seen", "true");
      setShowIntro(true);
      setIntroComplete(false);
      setRevealPage(false);
      return;
    }

    setShowIntro(false);
    setIntroComplete(true);
    setRevealPage(true);
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setShowIntro(false);

    requestAnimationFrame(() => {
      setRevealPage(true);
    });
  };

  if (!mounted) return null;

  return (
    <IntroContext.Provider value={introComplete}>
      <Header
        animate={introComplete || showIntro}
        logoRef={headerLogoRef}
        menuBtnRef={menuBtnRef}
      />

      <main
        style={{
          opacity: revealPage ? 1 : 0.15,
          transform: revealPage ? "translateY(0px)" : "translateY(10px)",
          filter: revealPage ? "blur(0px)" : "blur(8px)",
          transition:
            "opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease",
          pointerEvents: introComplete ? "auto" : "none",
          willChange: "opacity, transform, filter",
        }}
      >
        {children}
      </main>

      {showIntro && (
        <PageIntro
          headerLogoRef={headerLogoRef}
          menuBtnRef={menuBtnRef}
          onComplete={handleIntroComplete}
        />
      )}
    </IntroContext.Provider>
  );
}