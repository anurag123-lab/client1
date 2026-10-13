"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { categories, portfolio } from "@/lib/photos";
import { CloseIcon } from "@/components/icons";
import Tilt from "@/components/Tilt";

// Filter buttons + masonry grid + full-screen lightbox.
// Filtering just changes state, so there is no page reload.
export default function PortfolioGrid() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState<number | null>(null); // index into `shown`

  const shown = filter === "All" ? portfolio : portfolio.filter((p) => p.category === filter);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback((d: number) => setActive((i) => (i === null ? i : (i + d + shown.length) % shown.length)), [shown.length]);

  // Keyboard controls for the lightbox: Esc closes, arrows move.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  const current = active !== null ? shown[active] : null;

  return (
    <>
      <div role="group" aria-label="Filter photos" className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`label-caps rounded-full border px-5 py-2.5 transition hover:-translate-y-0.5 ${
              filter === c ? "border-kumkum bg-kumkum text-ivory shadow-3d" : "border-ink/20 bg-paper/60 text-ink/70 hover:border-ink hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* CSS columns make a simple masonry layout that keeps each photo's shape */}
      <div className="columns-2 gap-4 md:columns-3 md:gap-6">
        {shown.map((p, i) => (
          <Tilt key={p.src} max={7} className="fade-up mb-4 break-inside-avoid rounded-xl shadow-3d md:mb-6">
          <button
            type="button"
            onClick={() => setActive(i)}
            className="group relative block w-full overflow-hidden rounded-xl bg-ink"
            style={{ "--delay": `${(i % 6) * 70}ms` } as React.CSSProperties}
            aria-label={`Open photo: ${p.alt}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="h-auto w-full transition duration-700 group-hover:scale-105 group-hover:opacity-85"
            />
            <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/80 to-transparent p-3 text-left text-[0.6rem] uppercase tracking-[0.25em] text-gold-soft transition group-hover:translate-y-0">
              {p.category}
            </span>
          </button>
          </Tilt>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4"
          onClick={close}
        >
          <div className="relative h-[85svh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" className="fade-up object-contain" />
          </div>
          <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-ivory/70">
            {current.alt} · {active! + 1} / {shown.length}
          </p>
          <button type="button" onClick={close} aria-label="Close" autoFocus className="absolute right-4 top-4 p-2 text-ivory hover:text-gold-soft">
            <CloseIcon className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 font-serif text-5xl text-ivory/70 hover:text-ivory md:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 font-serif text-5xl text-ivory/70 hover:text-ivory md:right-6"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
