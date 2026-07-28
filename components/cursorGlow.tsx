"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function SpaceCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let frameId: number;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateHoverState = () => {
      const hovered = document.querySelector(
        "a:hover, button:hover, input:hover, textarea:hover, select:hover, [data-cursor]:hover"
      );

      cursor.classList.toggle("is-hovering", !!hovered);
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

      updateHoverState();
      frameId = requestAnimationFrame(animate);
    };

    document.documentElement.classList.add("space-cursor-active");
    window.addEventListener("mousemove", move);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("space-cursor-active");
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={cursorRef}
      className="space-cursor pointer-events-none fixed left-0 top-0 hidden md:block"
      style={{
        zIndex: 2147483647,
      }}
    >
      <span className="space-cursor__square" />
      <span className="space-cursor__core" />
      <span className="space-cursor__line space-cursor__line--top" />
      <span className="space-cursor__line space-cursor__line--right" />
      <span className="space-cursor__line space-cursor__line--bottom" />
      <span className="space-cursor__line space-cursor__line--left" />
    </div>,
    document.body
  );
}