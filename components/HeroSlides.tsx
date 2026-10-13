"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Photo } from "@/lib/photos";

// A stack of photos that cross-fade every few seconds with a slow zoom.
// `offset` lets several columns start at different photos and times.
export default function HeroSlides({
  slides,
  offset = 0,
  interval = 5200,
  priority = false,
  sizes,
}: {
  slides: Photo[];
  offset?: number;
  interval?: number;
  priority?: boolean;
  sizes: string;
}) {
  const [index, setIndex] = useState(offset % slides.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Stagger the start so the columns don't all change at once.
    let timer: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    }, offset * 900);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [slides.length, interval, offset]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes={sizes}
            priority={priority && i === index}
            // Restarting the key restarts the zoom animation each time a slide shows.
            key={i === index ? `on-${index}` : "off"}
            className={`object-cover ${i === index ? "kenburns" : ""}`}
          />
        </div>
      ))}
    </div>
  );
}
