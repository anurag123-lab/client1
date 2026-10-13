"use client";

import { useEffect, useState } from "react";
import { isSample, reviews } from "@/lib/reviews";

// Rotates through reviews every 6s. Pauses while hovered or focused so people can read.
export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const r = reviews[index];

  return (
    <div
      className="mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <p className="font-script text-3xl text-gold-soft">Kind words</p>
      <p className="mt-1 text-gold" aria-label="5 out of 5 stars">
        ★★★★★
      </p>

      {/* aria-live announces the new quote to screen reader users when it changes */}
      <figure key={index} className="fade-up mt-6 min-h-[9rem]" aria-live="polite">
        <blockquote className="font-serif text-2xl italic leading-snug text-ivory md:text-3xl">
          &ldquo;{r.quote}&rdquo;
        </blockquote>
        <figcaption className="label-caps mt-5 text-ivory/60">
          {r.name} · {r.event}
        </figcaption>
      </figure>

      <div className="mt-6 flex justify-center gap-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show review ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-gold" : "w-3 bg-ivory/30 hover:bg-ivory/60"}`}
          />
        ))}
      </div>

      {isSample && (
        <p className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-ivory/40">
          Sample reviews for preview · real client reviews coming soon
        </p>
      )}
    </div>
  );
}
