"use client";

import Image from "next/image";
import { useState } from "react";
import { photos } from "@/lib/photos";

// Wide photo band with a white card overlapping its bottom edge:
// "Featured" in script | story name | ‹ 1 of 3 ›
const featured = [
  { title: "Eternity", kind: "Wedding", photo: photos.coupleEmbrace, focus: "50% 35%" },
  { title: "The Wedding Story", kind: "Wedding", photo: photos.coupleGolden, focus: "50% 20%" },
  { title: "Golden Hour", kind: "Bridal", photo: photos.brideVeil2, focus: "50% 30%" },
];

export default function FeaturedStrip() {
  const [i, setI] = useState(0);
  const f = featured[i];
  const go = (d: number) => setI((n) => (n + d + featured.length) % featured.length);

  return (
    <section aria-label="Featured story" className="relative">
      <div className="relative h-[62svh] min-h-[380px] overflow-hidden md:h-[78svh]">
        {featured.map((x, n) => (
          <Image
            key={x.photo.src}
            src={x.photo.src}
            alt={x.photo.alt}
            fill
            sizes="100vw"
            style={{ objectPosition: x.focus }}
            className={`object-cover transition-opacity duration-1000 ${n === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ivory/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-4 -mt-12 md:mx-auto md:-mt-16 md:max-w-5xl">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 bg-paper px-5 py-5 shadow-3d md:gap-8 md:px-10 md:py-7">
          <p className="font-script text-2xl text-gold md:text-4xl">Featured</p>
          <div className="border-l border-ink/15 pl-4 text-center md:pl-8">
            <p key={f.title} className="fade-up font-serif text-2xl uppercase tracking-[0.12em] md:text-4xl">
              {f.title}
            </p>
            <p className="label-caps mt-1 text-[0.6rem] text-ink/50">{f.kind}</p>
          </div>
          <div className="flex items-center gap-1 md:gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Previous story" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/25 hover:border-kumkum hover:text-kumkum">
              ‹
            </button>
            <span className="hidden font-serif text-sm italic text-ink/60 md:inline">
              {i + 1} of {featured.length}
            </span>
            <button type="button" onClick={() => go(1)} aria-label="Next story" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/25 hover:border-kumkum hover:text-kumkum">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
