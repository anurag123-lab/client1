import Image from "next/image";
import Link from "next/link";
import FadeSplit, { FramedButton } from "@/components/FadeSplit";
import FeaturedStrip from "@/components/FeaturedStrip";
import HeroStage from "@/components/HeroStage";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import { photos } from "@/lib/photos";
import { stories } from "@/lib/site";

const recent = [
  { photo: photos.coupleGolden, title: "The Wedding Story", tag: "Wedding" },
  { photo: photos.bride1, title: "Mehendi Smiles", tag: "Bridal" },
  { photo: photos.bathukamma, title: "Chandoor Bathukamma", tag: "Festival" },
  { photo: photos.coupleSerenity, title: "Serenity", tag: "Wedding" },
  { photo: photos.brideLathaSri, title: "Latha Sri", tag: "Bridal" },
  { photo: photos.brideVeil2, title: "Golden Hour", tag: "Bridal" },
];

export default function Home() {
  return (
    <>
      <HeroStage />

      {/* ---------- INTRO LINE ---------- */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <Reveal>
          <div className="mx-auto mb-8 h-px w-6 bg-ink/40" />
          <p className="text-[0.78rem] uppercase leading-relaxed tracking-[0.18em] text-ink/75 md:text-sm md:leading-loose">
            Mcaptures is an editorial wedding studio from Nizamabad, built on candid storytelling. No stiff poses, no
            rushed moments, just the real emotions of your day, framed to last a lifetime.
          </p>
        </Reveal>
      </section>

      <FeaturedStrip />

      {/* ---------- HI THERE ---------- */}
      <section className="relative pt-24 md:pt-36">
        <Reveal className="mx-auto max-w-6xl px-4 md:px-8">
          <p className="font-script text-center text-5xl text-ink md:ml-[42%] md:text-left md:text-6xl">Hi there, I&apos;m Manikanta!</p>
        </Reveal>
        <div className="relative mt-6 md:mt-0">
          {/* white band behind the text, the photo overlaps it */}
          <div className="absolute inset-x-0 bottom-0 top-10 bg-paper md:top-24" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 md:grid-cols-12 md:gap-0 md:px-8 md:pb-24">
            <Reveal className="md:col-span-4 md:-mt-14">
              <Tilt max={5} className="shadow-3d">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={photos.founder1.src} alt={photos.founder1.alt} fill sizes="(min-width: 768px) 360px, 92vw" className="object-cover" />
                </div>
              </Tilt>
            </Reveal>
            <Reveal delay={150} className="md:col-span-6 md:col-start-6 md:mt-24 md:border-l md:border-ink/25 md:pl-12">
              <p className="font-serif text-xl italic leading-relaxed text-ink/80">
                I&apos;m a candid wedding photographer from Nizamabad, Telangana. A Telugu wedding is a hundred small
                moments: haldi laughter, a father&apos;s quiet smile, mehendi hands holding tight. I move softly
                through the day and catch them as they happen.
              </p>
              <p className="mt-5 font-serif text-xl italic leading-relaxed text-ink/80">
                In 2026 that way of working earned the Best Candid Photographer title at the Bharat Kala Puraskar.
                The trophy is lovely. The trust of every family is the real reward.
              </p>
              <Link href="/about" className="label-caps mt-9 inline-block bg-ink px-9 py-4 text-ivory shadow-3d transition hover:-translate-y-0.5 hover:bg-kumkum">
                Read more
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- AWARD (faded editorial split) ---------- */}
      <FadeSplit
        eyebrow="Bharat Kala Puraskar 2026"
        title={
          <>
            Best Candid <em className="text-kumkum">Photographer</em>
          </>
        }
        subtitle="Honoured for storytelling, not posing"
        labels={["Award", "Candid", "Telangana", "2026"]}
        photo={photos.awardStage}
        focus="50% 20%"
        cta={<FramedButton href="/about">The journey</FramedButton>}
      >
        <p>
          Awarded at the Hyderabad Photo Trade Show, the title celebrates honest, unposed photographs that let
          families feel their day again.
        </p>
      </FadeSplit>

      {/* ---------- RECENT STORIES (3D tilt cards) ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
        <Reveal className="mb-12 text-center">
          <p className="text-[0.62rem] uppercase tracking-[0.4em] text-ink/60">From the journal</p>
          <h2 className="mt-3 text-4xl md:text-6xl">
            Recent <em className="text-kumkum">stories</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
          {recent.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 120} className={i % 3 === 1 ? "md:mt-12" : ""}>
              <Tilt max={8} className="rounded-xl shadow-3d">
                <Link href="/portfolio" className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-ink">
                  <Image
                    src={r.photo.src}
                    alt={r.photo.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-12 text-ivory md:p-6">
                    <p className="text-[0.58rem] uppercase tracking-[0.25em] text-gold-soft">{r.tag}</p>
                    <p className="font-serif text-xl md:text-2xl">{r.title}</p>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center">
          <FramedButton href="/portfolio">View the portfolio</FramedButton>
        </div>
      </section>

      {/* ---------- STORY RIBBON ---------- */}
      <section aria-label="Recent couples" className="overflow-hidden bg-kumkum py-5 text-ivory">
        {/* The list is duplicated so the loop looks seamless */}
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {[...stories, ...stories].map((s, i) => (
            <span key={i} className="flex items-center gap-10 font-serif text-2xl italic md:text-3xl" aria-hidden={i >= stories.length}>
              {s}
              <span className="text-base not-italic text-gold-soft">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ---------- CTA (faded split, photo left) ---------- */}
      <FadeSplit
        reverse
        eyebrow="Your date is set?"
        title={<span className="font-script text-5xl md:text-7xl">Let&apos;s tell your story</span>}
        subtitle="A short call is all it takes"
        labels={["Call", "Plan", "Celebrate"]}
        photo={photos.coupleSerenity}
        focus="40% 40%"
        cta={<FramedButton href="/book">Book a call</FramedButton>}
      >
        <p>Wedding season dates fill up fast. Tell us your date and venue and Manikanta will get back to you on WhatsApp.</p>
      </FadeSplit>
    </>
  );
}
