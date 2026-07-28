"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";

interface PageIntroProps {
  onComplete?: () => void;
  headerLogoRef: React.RefObject<HTMLHeadingElement | null>;
  menuBtnRef: React.RefObject<HTMLButtonElement | null>;
}

export default function PageIntro({
  onComplete,
  headerLogoRef,
  menuBtnRef,
}: PageIntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterWrapRef = useRef<HTMLDivElement>(null);

  const logoWrapRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  const holyRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const devRef = useRef<HTMLSpanElement>(null);

  const glowOrbRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const slashLeftRef = useRef<HTMLDivElement>(null);
  const slashRightRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        size: Math.random() * 2.5 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.45 + 0.12,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      })),
    [],
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerLogoRef.current, { opacity: 0 });
      gsap.set(menuBtnRef.current, {
        opacity: 0,
        scale: 0.7,
        filter: "blur(6px)",
      });

      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(gridRef.current, { opacity: 0 });
      gsap.set(scanLineRef.current, { y: "-100%", opacity: 0.9 });
      gsap.set(counterWrapRef.current, { opacity: 0, scale: 1 });
      gsap.set(logoWrapRef.current, { opacity: 0 });
      gsap.set(glowOrbRef.current, { scale: 0, opacity: 0 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 10 });
      gsap.set([topBarRef.current, bottomBarRef.current], { scaleX: 0 });
      gsap.set([slashLeftRef.current, slashRightRef.current], { opacity: 0 });

      const tl = gsap.timeline();

      tl.to(gridRef.current, {
        opacity: 0.28,
        duration: 0.45,
        ease: "power2.out",
      })

        .to(
          scanLineRef.current,
          {
            y: "100vh",
            duration: 1,
            ease: "none",
          },
          "-=0.02",
        )

        .to(
          counterWrapRef.current,
          {
            opacity: 1,
            duration: 0.15,
            ease: "none",
          },
          "-=0.75",
        )

        .to(
          counterRef.current,
          {
            innerText: 100,
            duration: 0.85,
            ease: "power1.inOut",
            snap: { innerText: 1 },
            onUpdate() {
              if (!counterRef.current) return;

              const value = Math.round(
                parseFloat(counterRef.current.textContent ?? "0"),
              );

              counterRef.current.textContent = String(value).padStart(3, "0");
            },
          },
          "<",
        )

        .to(counterWrapRef.current, {
          opacity: 0,
          scale: 0.55,
          filter: "blur(12px)",
          duration: 0.28,
          ease: "power3.in",
        })

        .to(
          glowOrbRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: "expo.out",
          },
          "-=0.04",
        )

        .to(logoWrapRef.current, {
          opacity: 1,
          duration: 0.12,
          ease: "none",
        })

        .fromTo(
          holyRef.current,
          { opacity: 0, x: -55, filter: "blur(14px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "expo.out",
          },
          "<",
        )

        .fromTo(
          dotRef.current,
          { opacity: 0, scale: 0, rotation: -270 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.42,
            ease: "back.out(3)",
          },
          "-=0.25",
        )

        .fromTo(
          devRef.current,
          { opacity: 0, x: 55, filter: "blur(14px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "expo.out",
          },
          "-=0.28",
        )

        .to(
          [topBarRef.current, bottomBarRef.current],
          {
            scaleX: 1,
            duration: 0.5,
            ease: "power3.inOut",
          },
          "-=0.16",
        )

        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.38,
            ease: "power2.out",
          },
          "-=0.1",
        )

        .to(
          [slashLeftRef.current, slashRightRef.current],
          {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            stagger: 0.08,
          },
          "-=0.14",
        )

        .to({}, { duration: 0.75 })

        .add(() => {
          const introLogo = wordmarkRef.current;
          const headerLogo = headerLogoRef.current;

          if (!introLogo || !headerLogo) {
            gsap.to(overlayRef.current, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                gsap.set(overlayRef.current, { display: "none" });
                onComplete?.();
              },
            });
            return;
          }

          const introRect = introLogo.getBoundingClientRect();
          const headerRect = headerLogo.getBoundingClientRect();

          const introCenterX = introRect.left + introRect.width / 2;
          const introCenterY = introRect.top + introRect.height / 2;

          const headerCenterX = headerRect.left + headerRect.width / 2;
          const headerCenterY = headerRect.top + headerRect.height / 2;

          const deltaX = headerCenterX - introCenterX;
          const deltaY = headerCenterY - introCenterY;
          const scale = headerRect.width / introRect.width;

          const morphTl = gsap.timeline({
            onComplete: () => {
              gsap.set(overlayRef.current, { display: "none" });
              gsap.set(wordmarkRef.current, { opacity: 0 });
              gsap.set(headerLogoRef.current, { opacity: 1, y: 0 });
              gsap.set(menuBtnRef.current, {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              });
              onComplete?.();
            },
          });
          morphTl
            .to(
              [
                topBarRef.current,
                bottomBarRef.current,
                subtitleRef.current,
                slashLeftRef.current,
                slashRightRef.current,
                gridRef.current,
                scanLineRef.current,
                glowOrbRef.current,
              ],
              {
                opacity: 0,
                duration: 0.42,
                ease: "power2.out",
              },
              0,
            )

            .to(
              wordmarkRef.current,
              {
                x: deltaX,
                y: deltaY,
                scale,
                duration: 1.25,
                ease: "expo.inOut",
                transformOrigin: "center center",
              },
              0.05,
            )

            // menu starts coming alive while intro logo is landing
            .to(
              menuBtnRef.current,
              {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.55,
                ease: "back.out(1.8)",
              },
              1.0,
            )

            // real header logo appears UNDER the intro logo
            .to(
              headerLogoRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out",
              },
              1.2,
            )

            // keep the intro wordmark there a little longer
            .to({}, { duration: 0.45 })

            // now gently dissolve intro wordmark after header has settled
            .to(
              wordmarkRef.current,
              {
                opacity: 0,
                filter: "blur(4px)",
                duration: 0.45,
                ease: "power2.out",
              },
              ">-0.05",
            )

            // fade overlay after the logo handoff, not before
            .to(
              overlayRef.current,
              {
                opacity: 0,
                duration: 0.55,
                ease: "power2.inOut",
              },
              "<",
            );
        });
    });

    return () => ctx.revert();
  }, [headerLogoRef, menuBtnRef, onComplete]);

  const BG = "rgb(10,9,8)";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 overflow-hidden"
      style={{
        zIndex: 9999,
        background: BG,
        opacity: 1,
      }}
    >
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0,
          backgroundImage: `
            linear-gradient(rgba(212,169,77,0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,169,77,0.16) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 35%, transparent 100%)",
        }}
      />

      <div
        ref={scanLineRef}
        className="pointer-events-none absolute inset-x-0"
        style={{
          height: "1.5px",
          transform: "translateY(-100%)",
          background:
            "linear-gradient(90deg, transparent, rgba(212,169,77,0.85) 20%, rgba(255,223,120,1) 50%, rgba(212,169,77,0.85) 80%, transparent)",
          boxShadow:
            "0 0 14px 5px rgba(212,169,77,0.45), 0 0 32px 10px rgba(212,169,77,0.18)",
          zIndex: 2,
        }}
      />

      <div
        ref={counterWrapRef}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
        style={{
          zIndex: 5,
          opacity: 0,
        }}
      >
        <span
          ref={counterRef}
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontSize: "clamp(3.5rem, 13vw, 9rem)",
            fontWeight: 800,
            color: "rgba(212,169,77,0.09)",
            letterSpacing: "0.02em",
            lineHeight: 1,
            WebkitTextStroke: "1px rgba(212,169,77,0.28)",
          }}
        >
          000
        </span>

        <span
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontSize: "0.8rem",
            color: "rgba(212,169,77,0.35)",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            marginTop: "6px",
          }}
        >
          initialising
        </span>
      </div>

      <div
        ref={glowOrbRef}
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: 140,
          height: 140,
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0,
          background:
            "radial-gradient(circle, rgba(212,169,77,0.24), rgba(212,169,77,0.04) 55%, transparent 72%)",
          filter: "blur(4px)",
          zIndex: 3,
        }}
      />

      <div
        ref={logoWrapRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          zIndex: 6,
          opacity: 0,
        }}
      >
        <div className="relative flex flex-col items-center gap-4">
          <div
            ref={topBarRef}
            className="origin-left"
            style={{
              transform: "scaleX(0)",
              width: "clamp(160px, 30vw, 340px)",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(212,169,77,0.65) 30%, rgba(255,223,120,0.85) 50%, rgba(212,169,77,0.65) 70%, transparent)",
            }}
          />

          <div
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1,
              textTransform: "lowercase",
            }}
          >
            <div
              ref={wordmarkRef}
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                transformOrigin: "center center",
                willChange: "transform, opacity",
              }}
            >
              <span
                ref={holyRef}
                style={{
                  color: "rgb(232,225,210)",
                  display: "inline-block",
                }}
              >
                holy
              </span>

              <span
                ref={dotRef}
                style={{
                  color: "rgb(212,169,77)",
                  display: "inline-block",
                  textShadow:
                    "0 0 20px rgba(212,169,77,0.95), 0 0 40px rgba(212,169,77,0.5)",
                }}
              >
                .
              </span>

              <span
                ref={devRef}
                style={{
                  color: "rgb(212,169,77)",
                  display: "inline-block",
                  textShadow:
                    "0 0 12px rgba(212,169,77,0.55), 0 0 26px rgba(212,169,77,0.25)",
                }}
              >
                dev
              </span>
            </div>
          </div>

          <div
            ref={bottomBarRef}
            className="origin-right"
            style={{
              transform: "scaleX(0)",
              width: "clamp(160px, 30vw, 340px)",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(212,169,77,0.65) 30%, rgba(255,223,120,0.85) 50%, rgba(212,169,77,0.65) 70%, transparent)",
            }}
          />

          <div
            ref={subtitleRef}
            className="flex items-center gap-2"
            style={{
              opacity: 0,
              transform: "translateY(10px)",
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
              fontWeight: 500,
              color: "rgba(212,169,77,0.45)",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "rgba(212,169,77,0.28)" }}>▸</span>
            <span>fullstack developer</span>
            <span style={{ color: "rgba(212,169,77,0.28)" }}>◂</span>
          </div>
        </div>
      </div>

      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          ref={side === "left" ? slashLeftRef : slashRightRef}
          className="pointer-events-none absolute select-none"
          style={{
            opacity: 0,
            fontFamily: "var(--font-barlow-condensed)",
            fontSize: "clamp(5rem, 15vw, 12rem)",
            fontWeight: 800,
            color: "rgba(212,169,77,0.03)",
            WebkitTextStroke: "1px rgba(212,169,77,0.06)",
            top: "50%",
            [side]: "-1%",
            transform: "translateY(-50%)",
            zIndex: 2,
            lineHeight: 1,
          }}
        >
          {"</>"}
        </div>
      ))}

      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 2 }}
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: `rgba(212,169,77,${particle.opacity})`,
              boxShadow: `0 0 ${particle.size * 3}px rgba(212,169,77,0.35)`,
              animation: `floatUp ${particle.duration}s ease-out ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.65;
          }

          100% {
            transform: translateY(-80px) scale(0.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
