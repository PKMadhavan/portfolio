"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce || typeof window === "undefined") return;

    let rx = 0, ry = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      rx = e.clientX;
      ry = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let cx = 0, cy = 0;

    const animate = () => {
      if (ringRef.current) {
        cx = lerp(cx, rx, 0.12);
        cy = lerp(cy, ry, 0.12);
        ringRef.current.style.left = `${cx}px`;
        ringRef.current.style.top = `${cy}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,[data-magnetic]")) setHovering(true);
    };
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,[data-magnetic]")) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [shouldReduce]);

  if (shouldReduce) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className={`cursor-ring ${hovering ? "hovering" : ""}`} aria-hidden />
    </>
  );
}
