"use client";

import { useRef } from "react";

/*
  3D tilt: the card leans toward the mouse. We only update CSS variables
  (--rx, --ry) and let the .tilt class in globals.css do the transform,
  so React doesn't re-render on every mouse move.
  Touch screens and "reduce motion" users get a flat card.
*/
export default function Tilt({
  children,
  max = 6,
  glare = true,
  className = "",
}: {
  children: React.ReactNode;
  max?: number; // maximum tilt in degrees
  glare?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; // 0 → 1 across the card
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
    el.style.setProperty("--go", "1");
  }

  function onLeave() {
    const el = ref.current!;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--go", "0");
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt relative ${className}`}>
      {children}
      {glare && <div aria-hidden className="tilt-glare pointer-events-none absolute inset-0 rounded-[inherit]" />}
    </div>
  );
}
