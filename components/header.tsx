"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface HeaderProps {
  animate?: boolean;
  logoRef?: React.RefObject<HTMLHeadingElement | null>;
  menuBtnRef?: React.RefObject<HTMLButtonElement | null>;
}

const NAV_LINKS = [
  { label: "Home", href: "/", icon: HomeIcon, code: "01" },
  { label: "About", href: "/about", icon: UserIcon, code: "02" },
  { label: "Contact", href: "/contactPage", icon: MailIcon, code: "03" },
];

function HomeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

export default function Header({
  animate = false,
  logoRef,
  menuBtnRef,
}: HeaderProps) {
  const pathname = usePathname();

  const internalLogoRef = useRef<HTMLHeadingElement>(null);
  const internalMenuBtnRef = useRef<HTMLButtonElement>(null);

  const finalLogoRef = logoRef ?? internalLogoRef;
  const finalMenuBtnRef = menuBtnRef ?? internalMenuBtnRef;

  const headerRef = useRef<HTMLElement>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const topBarRef = useRef<HTMLSpanElement>(null);
  const midBarRef = useRef<HTMLSpanElement>(null);
  const bottomBarRef = useRef<HTMLSpanElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);

  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

  const morphMenu = useCallback((open: boolean) => {
    gsap.to(topBarRef.current, {
      y: open ? 6 : 0,
      rotate: open ? 45 : 0,
      width: open ? 20 : 16,
      duration: 0.32,
      ease: "power3.out",
      transformOrigin: "50% 50%",
      overwrite: true,
    });

    gsap.to(midBarRef.current, {
      opacity: open ? 0 : 1,
      scaleX: open ? 0 : 1,
      duration: 0.18,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(bottomBarRef.current, {
      y: open ? -6 : 0,
      rotate: open ? -45 : 0,
      width: open ? 20 : 12,
      duration: 0.32,
      ease: "power3.out",
      transformOrigin: "50% 50%",
      overwrite: true,
    });

    gsap.to(chipRef.current, {
      rotate: open ? 0 : 45,
      scale: open ? 1.08 : 1,
      duration: 0.32,
      ease: "power3.out",
      overwrite: true,
    });
  }, []);

  const closeNav = useCallback(() => {
    setIsOpen(false);
    morphMenu(false);

    gsap.to(navRef.current, {
      opacity: 0,
      y: -16,
      scale: 0.97,
      duration: 0.24,
      ease: "power3.in",
      pointerEvents: "none",
      overwrite: true,
    });

    gsap.to(navItemRefs.current, {
      opacity: 0,
      y: 10,
      duration: 0.15,
      stagger: 0.02,
      ease: "power2.in",
      overwrite: true,
    });
  }, [morphMenu]);

  const openNav = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);

    setIsOpen(true);
    morphMenu(true);

    gsap.to(navRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.34,
      ease: "power3.out",
      pointerEvents: "auto",
      overwrite: true,
    });

    gsap.fromTo(
      navItemRefs.current,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.055,
        ease: "power3.out",
        overwrite: true,
      },
    );
  }, [morphMenu]);

  const handleDesktopEnter = () => {
    if (isDesktop()) openNav();
  };

  const handleDesktopLeave = () => {
    if (!isDesktop()) return;

    closeTimer.current = setTimeout(() => {
      closeNav();
    }, 120);
  };

  const handleMenuClick = () => {
    if (isDesktop()) return;
    isOpen ? closeNav() : openNav();
  };

  useEffect(() => {
    if (!animate) return;

    gsap.set(headerRef.current, { opacity: 1, y: 0 });
    gsap.set(finalMenuBtnRef.current, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    });

    if (window.scrollY <= 20) {
      gsap.set(finalLogoRef.current, { opacity: 1, y: 0 });
    }
  }, [animate, finalLogoRef, finalMenuBtnRef]);

  useEffect(() => {
    if (!animate) return;

    const handleScroll = () => {
      const hideLogo = window.scrollY > 24;

      gsap.to(finalLogoRef.current, {
        opacity: hideLogo ? 0 : 1,
        y: hideLogo ? -10 : 0,
        duration: 0.28,
        ease: "power2.out",
        overwrite: true,
      });

      if (hideLogo && isOpen) closeNav();
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [animate, closeNav, finalLogoRef, isOpen]);

  useEffect(() => {
    closeNav();
  }, [pathname, closeNav]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        isOpen &&
        !navWrapRef.current?.contains(target) &&
        !finalMenuBtnRef.current?.contains(target)
      ) {
        closeNav();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNav();
    };

    document.addEventListener("click", handleOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleOutside);
      document.removeEventListener("keydown", handleEscape);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [closeNav, finalMenuBtnRef, isOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 top-0 z-40 flex w-full justify-center"
      style={{
        opacity: animate ? 1 : 0,
        transform: "translateY(0px)",
      }}
    >
      <div className="z-40 flex w-full max-w-[1300px] items-center justify-between p-[20px] md:px-[70px] md:py-[30px]">
        <h1
          ref={finalLogoRef}
          className="select-none"
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontSize: "25px",
            fontWeight: 700,
            letterSpacing: "0.02em",
            lineHeight: 1,
            color: "rgb(212,169,77)",
            textShadow:
              "0 0 10px rgba(212,169,77,0.45), 0 0 20px rgba(212,169,77,0.25)",
            opacity: animate ? 1 : 0,
          }}
        >
          holy.dev
        </h1>

        <div
          ref={navWrapRef}
          className="relative"
          onMouseEnter={handleDesktopEnter}
          onMouseLeave={handleDesktopLeave}
        >
          <button
            ref={finalMenuBtnRef}
            type="button"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            onClick={handleMenuClick}
            className="
              group relative flex h-11 w-11 items-center justify-center overflow-hidden
              border border-[#d4a94d]/35 bg-[#d4a94d]/[0.07] p-0 backdrop-blur-md
              transition hover:border-[#f5d98a]/70 hover:bg-[#d4a94d]/[0.12]
            "
            style={{
              opacity: animate ? 1 : 0,
              cursor: "pointer",
              borderRadius: 0,
              boxShadow:
                "0 0 18px rgba(212,169,77,0.12), inset 0 0 14px rgba(212,169,77,0.06)",
            }}
          >
            <span
              ref={chipRef}
              className="absolute h-7 w-7 border border-[#d4a94d]/30 bg-[#d4a94d]/[0.035]"
              style={{ transform: "rotate(45deg)" }}
            />

            <span className="absolute left-1 top-1 h-1.5 w-1.5 border-l border-t border-[#d4a94d]/60" />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 border-r border-t border-[#d4a94d]/60" />
            <span className="absolute bottom-1 left-1 h-1.5 w-1.5 border-b border-l border-[#d4a94d]/60" />
            <span className="absolute bottom-1 right-1 h-1.5 w-1.5 border-b border-r border-[#d4a94d]/60" />

            <span className="absolute inset-0 bg-[radial-gradient(circle,rgba(245,217,138,0.2),transparent_65%)] opacity-0 transition group-hover:opacity-100" />

            <span className="relative h-[18px] w-[22px]">
              <span
                ref={topBarRef}
                className="absolute left-1/2 top-[3px] h-[1.5px] w-4 -translate-x-1/2 bg-[#d4a94d] shadow-[0_0_10px_rgba(212,169,77,0.8)]"
              />
              <span
                ref={midBarRef}
                className="absolute left-1/2 top-[8.5px] h-[1.5px] w-5 -translate-x-1/2 bg-[#f5d98a] shadow-[0_0_12px_rgba(245,217,138,0.8)]"
              />
              <span
                ref={bottomBarRef}
                className="absolute left-1/2 top-[14px] h-[1.5px] w-3 -translate-x-1/2 bg-[#d4a94d] shadow-[0_0_10px_rgba(212,169,77,0.8)]"
              />
            </span>
          </button>

          <nav
            ref={navRef}
            aria-label="Site navigation"
            className="
              absolute right-0 top-[58px] w-[calc(100vw-40px)] max-w-[360px]
              border border-[#d4a94d]/25 bg-[#07060d]/90 p-3 opacity-0
              backdrop-blur-2xl md:w-[520px] md:max-w-none md:p-4
            "
            style={{
              borderRadius: 0,
              transform: "scale(0.97) translateY(-16px)",
              transformOrigin: "top right",
              pointerEvents: "none",
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.75), inset 0 0 0 1px rgba(255,220,140,0.05)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(212,169,77,0.14),transparent_32%),radial-gradient(circle_at_85%_0%,rgba(212,169,77,0.18),transparent_45%)]" />

            <div className="relative mb-3 flex items-center justify-between border-b border-[#d4a94d]/15 px-1 pb-3 md:px-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d4a94d]/60">
                  Command Panel
                </p>
                <p className="mt-1 hidden text-[11px] tracking-[0.18em] text-white/25 md:block">
                  HOVER ROUTE SELECTOR
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#d4a94d] shadow-[0_0_12px_rgba(212,169,77,0.9)]" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#d4a94d]/45">
                  Online
                </span>
              </div>
            </div>

            <div className="relative grid gap-2 md:grid-cols-3">
              {NAV_LINKS.map(({ label, href, icon: Icon, code }, i) => {
                const active =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    ref={(el) => {
                      navItemRefs.current[i] = el;
                    }}
                    onClick={closeNav}
                    className={[
                      "group/item relative flex items-center gap-3 overflow-hidden border px-3 py-3 no-underline transition duration-300 md:min-h-[128px] md:flex-col md:items-start md:justify-between md:p-4",
                      active
                        ? "border-[#d4a94d]/45 bg-[#d4a94d]/15 text-[#ffe29d]"
                        : "border-white/[0.05] bg-white/[0.025] text-[#d4a94d]/80 hover:border-[#d4a94d]/40 hover:bg-[#d4a94d]/10 hover:text-[#ffe29d]",
                    ].join(" ")}
                    style={{
                      borderRadius: 0,
                      opacity: 0,
                      transform: "translateY(14px)",
                    }}
                  >
                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4a94d]/50 to-transparent opacity-0 transition group-hover/item:opacity-100" />
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d4a94d] shadow-[0_0_14px_rgba(212,169,77,0.9)] transition-all duration-300 group-hover/item:w-full" />

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#d4a94d]/20 bg-[#d4a94d]/10 text-[#d4a94d] transition group-hover/item:bg-[#d4a94d]/15 md:h-10 md:w-10">
                      <Icon />
                    </span>

                    <span className="flex flex-1 flex-col md:w-full md:flex-none">
                      <span className="text-[15px] font-medium tracking-[0.04em] md:text-[16px]">
                        {label}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.22em] text-[#d4a94d]/40">
                        Sector {code}
                      </span>
                    </span>

                    <span className="ml-auto text-[10px] text-[#d4a94d]/40 transition group-hover/item:translate-x-1 group-hover/item:text-[#ffe29d] md:ml-0 md:self-end">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
