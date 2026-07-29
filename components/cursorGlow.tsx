"use client";

import { useEffect, useRef } from "react";

export default function SpaceCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px,${targetY}px,0)`;
      document.documentElement.dataset.cursorVisible = "true";
    };

    const hover = (event: PointerEvent) => {
      const interactive = (event.target as Element | null)?.closest(
        "a, button, input, textarea, [data-cursor]",
      );
      ring.classList.toggle("is-active", Boolean(interactive));
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;
      frame = requestAnimationFrame(tick);
    };

    document.documentElement.classList.add("has-space-cursor");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", hover, { passive: true });
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", hover);
      document.documentElement.classList.remove("has-space-cursor");
      delete document.documentElement.dataset.cursorVisible;
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
