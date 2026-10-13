import type { Metadata } from "next";
import FadeSplit, { FramedButton } from "@/components/FadeSplit";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Services · Mcaptures",
  description: "Candid wedding, pre-wedding and event photography in Nizamabad and across Telangana.",
};

const services = [
  {
    name: "Weddings",
    script: "The big day",
    photo: photos.coupleGolden,
    focus: "50% 20%",
    text: "Every ritual, every emotion. From the first haldi splash to the last goodbye, told as one story.",
    includes: ["Candid + traditional", "Couple portraits", "Family moments", "Edited gallery"],
  },
  {
    name: "Pre-weddings",
    script: "Just the two of you",
    photo: photos.coupleEmbrace,
    focus: "50% 30%",
    text: "A relaxed shoot before the wedding rush, at a place that means something to you.",
    includes: ["Location ideas", "Styling tips", "Cinematic portraits", "Save-the-date edits"],
  },
  {
    name: "Events",
    script: "Celebrations",
    photo: photos.bathukamma,
    focus: "50% 50%",
    text: "Engagements, birthdays, festivals and family functions, captured with the same candid eye.",
    includes: ["Engagements", "Festivals", "Family functions", "Social-ready picks"],
  },
];

const steps = [
  { title: "Say hello", text: "Book a call or message on WhatsApp with your date and venue." },
  { title: "Plan together", text: "We talk through your functions, people and the moments you care about." },
  { title: "The day", text: "I'm there quietly through it all, catching what matters." },
  { title: "Your gallery", text: "Hand-edited photos to relive and share with family." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Stories worth <em className="text-kumkum">keeping</em>
          </>
        }
        script="For every celebration"
        intro="Three ways to work together. Every booking is shaped around your day, so packages are made to fit, not pulled off a shelf."
        photo={photos.bride3}
        focus="50% 25%"
        labels={["Weddings", "Pre-weddings", "Events"]}
      />

      {services.map((s, i) => (
        <FadeSplit
          key={s.name}
          reverse={i % 2 === 0}
          eyebrow={`0${i + 1} · ${s.script}`}
          title={s.name}
          photo={s.photo}
          focus={s.focus}
          labels={s.includes}
          cta={<FramedButton href="/book">Ask for a quote</FramedButton>}
        >
          <p>{s.text}</p>
        </FadeSplit>
      ))}

      <section className="bg-sage text-ivory">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
          <Reveal className="text-center">
            <p className="font-script text-4xl text-gold-soft">simple & personal</p>
            <h2 className="mt-2 text-4xl md:text-6xl">How booking works</h2>
          </Reveal>
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 120}>
                <Tilt max={9} className="h-full rounded-2xl bg-ivory/10 shadow-2xl shadow-black/25 ring-1 ring-ivory/15 backdrop-blur">
                  <div className="h-full p-7 text-center">
                    <span className="pop mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ivory font-serif text-3xl text-sage shadow-xl">
                      {i + 1}
                    </span>
                    <h3 className="pop-sm mt-5 text-2xl">{s.title}</h3>
                    <p className="mx-auto mt-2 max-w-[16rem] text-sm text-ivory/80">{s.text}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
