import type { Metadata } from "next";
import Image from "next/image";
import FadeSplit, { FramedButton } from "@/components/FadeSplit";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About · Mcaptures",
  description: `Meet ${site.owner}, the candid wedding photographer behind Mcaptures and winner of Best Candid Photographer at the Bharat Kala Puraskar 2026.`,
};

const values = [
  { title: "Candid first", text: "No stiff poses. I watch, wait and catch the moment as it really happens." },
  { title: "Family, not a crowd", text: "Grandparents, cousins, the friend who dances hardest. Everyone is part of the story." },
  { title: "Finished with care", text: "Colour, skin tones and that golden saree glow are edited one photo at a time." },
];

const timeline = [
  { when: "The beginning", title: "A camera and a curiosity", text: "Friends, festivals and temples around Telangana became the first stories." },
  { when: "Weddings", title: "Finding the candid voice", text: "Bridal portraits, couple stories and Bathukamma celebrations shaped a soft, natural style." },
  { when: "2026", title: "Best Candid Photographer", text: "Honoured at the Bharat Kala Puraskar 2026, awarded at the Hyderabad Photo Trade Show." },
  { when: "Next", title: "Your story", text: "The next frame we're excited about is yours." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Mcaptures"
        title={
          <>
            Talla <em className="text-kumkum">Manikanta</em>
          </>
        }
        script="The eye behind the lens"
        intro="A wedding photographer from Nizamabad who believes the best photos are the ones nobody planned: a stolen glance, a burst of laughter, a quiet moment between rituals."
        photo={photos.founder3}
        focus="50% 25%"
        labels={["Founder", "Candid", "Nizamabad"]}
      />

      {/* Story, Osaka-style: overlapping photos + text with a vertical rule */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-x-0 top-32 bottom-0 bg-paper" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-12 md:px-8">
          <Reveal className="relative md:col-span-5">
            <Tilt max={5} className="w-4/5 shadow-3d">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={photos.founder2.src} alt={photos.founder2.alt} fill sizes="(min-width: 768px) 360px, 75vw" className="object-cover" />
              </div>
            </Tilt>
            <Tilt max={6} className="absolute -bottom-10 right-0 w-1/2 border-[6px] border-paper shadow-3d">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={photos.awardMoment.src} alt={photos.awardMoment.alt} fill sizes="(min-width: 768px) 220px, 45vw" className="object-cover" />
              </div>
            </Tilt>
          </Reveal>
          <Reveal delay={150} className="mt-10 md:col-span-6 md:col-start-7 md:mt-36 md:border-l md:border-ink/25 md:pl-12">
            <p className="font-script text-5xl">My story</p>
            <p className="mt-6 font-serif text-xl italic leading-relaxed text-ink/80">
              Mcaptures began with a simple wish: to give families photos that feel alive years later. Not just who was
              there, but how it felt.
            </p>
            <p className="mt-5 font-serif text-xl italic leading-relaxed text-ink/80">
              From the haldi to the vidaai, I stay close but quiet. Many couples tell me they forgot I was there.
              That&apos;s when the real photos happen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values as lifted 3D cards */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
        <Reveal className="text-center">
          <p className="text-[0.62rem] uppercase tracking-[0.4em] text-ink/60">How I work</p>
          <h2 className="mt-3 text-4xl md:text-6xl">What you can expect</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 120}>
              <Tilt max={8} className="h-full rounded-2xl bg-paper shadow-3d">
                <div className="h-full p-8 text-center">
                  <p className="pop font-serif text-6xl text-gold/70">0{i + 1}</p>
                  <h3 className="pop-sm mt-4 text-2xl">{v.title}</h3>
                  <div className="mx-auto my-4 h-px w-10 bg-ink/25" />
                  <p className="text-ink/70">{v.text}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-ink text-ivory">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <Reveal className="md:col-span-5">
            <p className="text-[0.62rem] uppercase tracking-[0.4em] text-gold">The journey</p>
            <h2 className="mt-4 text-4xl md:text-6xl">
              From first frames to <em className="text-gold-soft">award stage</em>
            </h2>
            <Tilt max={5} className="mt-10 max-w-sm rounded-xl shadow-2xl shadow-black/50">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image src={photos.awardPortrait.src} alt={photos.awardPortrait.alt} fill sizes="(min-width: 768px) 380px, 90vw" className="object-cover" />
              </div>
            </Tilt>
          </Reveal>
          <ol className="relative border-l border-gold/40 md:col-span-6 md:col-start-7 md:self-center">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 120} className="relative pb-12 pl-8 last:pb-0">
                <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold bg-ink" />
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold">{t.when}</p>
                <h3 className="mt-2 text-3xl">{t.title}</h3>
                <p className="mt-2 text-ivory/70">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <FadeSplit
        reverse
        eyebrow="Let's meet"
        title={<span className="font-script text-5xl md:text-7xl">Tell me about your day</span>}
        subtitle="Coffee, a call, or a WhatsApp hello"
        labels={["Meet", "Plan", "Create"]}
        photo={photos.coupleSerenity}
        focus="40% 40%"
        cta={<FramedButton href="/book">Book a call</FramedButton>}
      />
    </>
  );
}
