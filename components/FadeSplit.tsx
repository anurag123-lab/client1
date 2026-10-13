import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Photo } from "@/lib/photos";

/*
  Editorial split section: centred text with a thin vertical rule and small
  side labels on one side, and a photo that fades softly into the page on the other.
  On phones the photo sits on top and fades downward into the text.
*/
export default function FadeSplit({
  eyebrow,
  title,
  subtitle,
  children,
  cta,
  photo,
  focus = "50% 30%",
  labels = [],
  reverse = false,
  as: Heading = "h2",
  priority = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  cta?: React.ReactNode;
  photo: Photo;
  focus?: string;
  labels?: string[]; // tiny words down the left rule, e.g. ["Since", "Candid", "2026"]
  reverse?: boolean; // photo on the left instead of the right
  as?: "h1" | "h2";
  priority?: boolean;
}) {
  return (
    <section className="relative overflow-hidden">
      {/* Photo: full-width on phones, right/left 58% on desktop */}
      <div
        className={`relative h-[52svh] min-h-[320px] fade-bottom md:absolute md:inset-y-0 md:h-auto md:w-[58%] ${
          reverse ? "md:left-0 md:fade-right" : "md:right-0 md:fade-left"
        }`}
      >
        <Image src={photo.src} alt={photo.alt} fill priority={priority} sizes="(min-width: 768px) 58vw, 100vw" style={{ objectPosition: focus }} className="object-cover" />
      </div>

      <div className={`relative mx-auto flex max-w-6xl px-4 md:min-h-[640px] md:px-8 ${reverse ? "md:justify-end" : ""}`}>
        <Reveal className="-mt-16 flex w-full gap-5 py-8 md:mt-0 md:w-[52%] md:items-center md:py-24">
          {labels.length > 0 && (
            <div className="hidden shrink-0 flex-col justify-between border-r border-ink/20 py-2 pr-4 text-right md:flex">
              {labels.map((l) => (
                <span key={l} className="text-[0.58rem] uppercase tracking-[0.3em] text-ink/55">
                  {l}
                </span>
              ))}
            </div>
          )}
          <div className="flex-1 text-center">
            {eyebrow && <p className="text-[0.62rem] uppercase tracking-[0.4em] text-ink/60">{eyebrow}</p>}
            <Heading className="mt-4 text-4xl leading-tight md:text-[3.4rem]">{title}</Heading>
            <div className="mx-auto my-7 h-px w-28 bg-ink/30" />
            {subtitle && <p className="font-serif text-lg uppercase tracking-[0.14em] text-ink/80 md:text-xl">{subtitle}</p>}
            {children && <div className="mx-auto mt-5 max-w-md text-ink/70">{children}</div>}
            {cta && <div className="mt-9">{cta}</div>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// The double-bordered button from the references.
export function FramedButton({ href, children, download }: { href: string; children: React.ReactNode; download?: boolean }) {
  const outer = "inline-block border border-ink/70 p-[3px] transition hover:-translate-y-0.5 hover:shadow-3d";
  const inner = (
    <span className="label-caps block border border-ink/70 px-7 py-3 text-ink transition hover:bg-ink hover:text-ivory">{children}</span>
  );
  return download ? (
    <a href={href} download className={outer}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={outer}>
      {inner}
    </Link>
  );
}
