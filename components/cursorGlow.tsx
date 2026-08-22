"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function SpaceCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = innerWidth / 2;
    let mouseY = innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let frame = 0;

    const move = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.classList.add("is-visible");
    };
    const leave = () => cursor.classList.remove("is-visible");
    const tick = () => {
      cursorX += (mouseX - cursorX) * 0.22;
      cursorY += (mouseY - cursorY) * 0.22;
      cursor.style.transform = `translate3d(${cursorX}px,${cursorY}px,0) translate(-50%,-50%)`;
      const interactive = document.querySelector(
        "a:hover,button:hover,input:hover,textarea:hover,[data-cursor]:hover",
      );
      cursor.classList.toggle("is-hovering", Boolean(interactive));
      frame = requestAnimationFrame(tick);
    };

    document.documentElement.classList.add("space-cursor-active");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    tick();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("space-cursor-active");
    };
  }, [mounted]);

  if (!mounted) return null;
  return createPortal(
    <div ref={cursorRef} className="space-cursor" aria-hidden="true">
      <span className="space-cursor__halo" />
      <span className="space-cursor__orbit"><i /></span>
      <span className="space-cursor__reticle" />
      <span className="space-cursor__core" />
      <span className="space-cursor__line space-cursor__line--top" />
      <span className="space-cursor__line space-cursor__line--right" />
      <span className="space-cursor__line space-cursor__line--bottom" />
      <span className="space-cursor__line space-cursor__line--left" />
      <span className="space-cursor__label">LOCK</span>
    </div>,
    document.body,
  );
}
