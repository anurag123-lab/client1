"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Tilt from "@/components/Tilt";
import { photos, type Photo } from "@/lib/photos";
import { site } from "@/lib/site";

/*
  Home hero, modelled on a "framed card" layout:
  - the whole section shows a blurred copy of the current photo (soft backdrop)
  - a floating card holds the sharp photo, with round thumbnails on top,
    a prev/next pill on the left, the headline bottom-left and glass stats on the right
  - the card tilts slightly with the mouse (see <Tilt>)
*/

const slides: { photo: Photo; title: string; focus?: string }[] = [
  { photo: photos.coupleEmbrace, title: "Eternity" },
  { photo: photos.brideVeil1, title: "Golden Hour", focus: "50% 30%" },
  { photo: photos.coupleGolden, title: "The Wedding Story", focus: "50% 25%" },
  { photo: photos.bride3, title: "Bridal Portraits", focus: "50% 25%" },
  { photo: photos.coupleSerenity, title: "Serenity" },
  { photo: photos.brideLathaSri, title: "Latha Sri", focus: "50% 30%" },
];

const stats = [
  { value: "2026", label: "Best Candid Photographer" },
  { value: "1.5K+", label: "Instagram family" },
  { value: "Three", label: "Weddings · Pre-weddings · Events" },
];

export default function HeroStage() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  const current = slides[index];

  return (
    <section className="relative -mt-17 overflow-hidden px-3 pt-21 pb-6 md:-mt-20 md:px-8 md:pt-26 md:pb-10">
      {/* Blurred backdrop of the current slide */}
      <div aria-hidden className="absolute inset-0">
        {slides.map((s, i) => (
          <Image
            key={s.photo.src}
            src={s.photo.src}
            alt=""
            fill
            sizes="40vw"
            quality={40}
            className={`scale-125 object-cover blur-2xl transition-opacity duration-[1500ms] ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-ivory/55" />
      </div>

      <Tilt max={2.2} className="mx-auto max-w-6xl rounded-[28px] shadow-3d">
        <div
          className="relative h-[78svh] min-h-[540px] overflow-hidden rounded-[28px] bg-ink md:h-[calc(100svh-150px)] md:max-h-[820px] md:min-h-[600px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {slides.map((s, i) => (
            <div
              key={s.photo.src}
              aria-hidden={i !== index}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
            >
              {/* Desktop: soft blurred fill + sharp portrait in the middle with faded sides */}
              <Image src={s.photo.src} alt="" fill sizes="60vw" quality={40} className="hidden scale-110 object-cover opacity-70 blur-xl md:block" />
              <div className="absolute inset-0 md:left-1/2 md:w-[46%] md:-translate-x-1/2 md:[mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]">
                <Image
                  src={s.photo.src}
                  alt={s.photo.alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 768px) 46vw, 100vw"
                  style={{ objectPosition: s.focus ?? "50% 40%" }}
                  className={`object-cover ${i === index ? "kenburns" : ""}`}
                />
              </div>
            </div>
          ))}

          {/* Shade so the white text is always readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/25" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/50 via-transparent to-transparent md:block" />

          {/* Thumbnails (top centre) */}
          <div className="pop absolute inset-x-0 top-5 flex flex-col items-center md:top-7">
            <div className="flex gap-2 md:gap-3">
              {slides.map((s, i) => (
                <button
                  key={s.photo.src}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show ${s.title}`}
                  aria-current={i === index}
                  className={`relative overflow-hidden rounded-full ring-2 transition-all duration-500 ${
                    i === index ? "h-11 w-11 ring-gold-soft md:h-14 md:w-14" : "h-8 w-8 ring-ivory/50 hover:ring-ivory md:h-10 md:w-10"
                  }`}
                >
                  <Image src={s.photo.src} alt="" fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
            <p key={current.title} className="fade-up mt-2 text-xs tracking-wide text-ivory/85">
              {current.title}
            </p>
          </div>

          {/* Prev / next pill */}
          <div className="glass absolute bottom-12 right-8 hidden items-center gap-1 rounded-full px-2 py-1.5 text-ivory md:flex lg:bottom-auto lg:right-auto lg:left-8 lg:top-8">
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous photo" className="h-9 w-9 rounded-full text-xl hover:bg-ivory/15">
              ‹
            </button>
            <span className="px-1 font-serif text-sm italic">
              {index + 1} / {slides.length}
            </span>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next photo" className="h-9 w-9 rounded-full text-xl hover:bg-ivory/15">
              ›
            </button>
          </div>

          {/* Headline (bottom left) */}
          <div className="pop absolute inset-x-0 bottom-0 p-6 text-ivory md:max-w-xl md:p-12">
            <p className="font-script fade-up text-3xl text-gold-soft md:text-4xl">Turning moments into</p>
            <h1 className="fade-up text-[3.4rem] leading-[0.92] drop-shadow-lg md:text-[6.2rem]" style={{ "--delay": "150ms" } as React.CSSProperties}>
              Timeless <em className="font-normal">Frames</em>
            </h1>
            <p className="fade-up mt-4 max-w-sm text-sm text-ivory/85 md:text-base" style={{ "--delay": "300ms" } as React.CSSProperties}>
              Candid wedding photography by {site.owner}, {site.location}.
            </p>
            <div className="fade-up mt-6 flex flex-wrap gap-3" style={{ "--delay": "450ms" } as React.CSSProperties}>
              <Link href="/book" className="btn rounded-full bg-ivory text-ink hover:bg-kumkum hover:text-ivory">
                Book a call
              </Link>
              <Link href="/portfolio" className="btn rounded-full border border-ivory/60 text-ivory hover:bg-ivory/15">
                View stories
              </Link>
            </div>
          </div>

          {/* Glass stat cards (right) */}
          <ul className="absolute right-8 top-1/2 hidden w-60 -translate-y-1/2 space-y-4 lg:block">
            {stats.map((s, i) => (
              <li
                key={s.label}
                className="fade-up rounded-2xl bg-ivory/15 px-6 py-5 text-ivory shadow-2xl shadow-black/20 ring-1 ring-ivory/30"
                style={{ "--delay": `${500 + i * 150}ms` } as React.CSSProperties}
              >
                <p className="font-serif text-5xl leading-none">{s.value}</p>
                <p className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-ivory/85">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </Tilt>

      {/* Stats under the card on phones and tablets */}
      <ul className="relative mx-auto mt-3 grid max-w-6xl grid-cols-3 gap-2 lg:hidden">
        {stats.map((s) => (
          <li key={s.label} className="rounded-2xl bg-paper/80 px-3 py-3 text-center shadow-3d backdrop-blur">
            <p className="font-serif text-2xl leading-none text-kumkum">{s.value}</p>
            <p className="mt-1 text-[0.58rem] uppercase leading-tight tracking-[0.12em] text-ink/70">{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
