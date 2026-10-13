import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import { DownloadIcon, InstagramIcon, PhoneIcon, WhatsAppIcon, YouTubeIcon } from "@/components/icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact · Mcaptures",
  description: `Contact Mcaptures on WhatsApp ${site.phoneDisplay} or Instagram ${site.instagramHandle}.`,
};

const channels = [
  { icon: WhatsAppIcon, label: "WhatsApp", value: "Fastest reply", href: whatsappLink(), external: true },
  { icon: PhoneIcon, label: "Call", value: site.phoneDisplay, href: `tel:+${site.whatsapp}`, external: false },
  { icon: InstagramIcon, label: "Instagram", value: site.instagramHandle, href: site.instagram, external: true },
  { icon: YouTubeIcon, label: "YouTube", value: "@mcaptures_photography", href: site.youtube, external: true },
];

const faqs = [
  {
    q: "How early should we book?",
    a: "As soon as your date is fixed. Wedding season weekends fill up quickly, so a quick call early helps you lock the date.",
  },
  {
    q: "Do you travel outside Nizamabad?",
    a: "Yes. Share your venue when you enquire and travel will be included in your quote.",
  },
  {
    q: "What does a package include?",
    a: "Every package is built around your functions and hours. Candid and traditional coverage, edited photos and albums can all be included.",
  },
  {
    q: "How do we confirm the booking?",
    a: "After the call you'll get a quote on WhatsApp. Once you're happy with it, Manikanta will explain how to lock in your date.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-16 text-center md:px-8 md:pt-20">
        <p className="label-caps fade-up text-kumkum">Contact</p>
        <p className="font-script fade-up mt-4 text-3xl text-gold md:text-4xl" style={{ "--delay": "100ms" } as React.CSSProperties}>
          we&apos;d love to hear from you
        </p>
        <h1 className="fade-up mt-1 text-5xl md:text-7xl" style={{ "--delay": "200ms" } as React.CSSProperties}>
          Say <em className="text-kumkum">namaste</em>
        </h1>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {channels.map((c, i) => (
            <li key={c.label} className="fade-up" style={{ "--delay": `${300 + i * 100}ms` } as React.CSSProperties}>
              <Tilt max={10} className="h-full rounded-2xl shadow-3d">
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl bg-paper p-6"
              >
                <span className="pop flex h-12 w-12 items-center justify-center rounded-full bg-ivory text-kumkum shadow-md transition group-hover:bg-kumkum group-hover:text-ivory">
                  <c.icon />
                </span>
                <span className="label-caps">{c.label}</span>
                <span className="text-sm text-ink/60">{c.value}</span>
              </a>
              </Tilt>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 md:px-8 md:pb-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="text-4xl">Send a message</h2>
          <p className="mt-2 mb-6 text-ink/60">
            Ready to plan? <Link href="/book" className="text-kumkum underline">Book a call</Link> instead.
          </p>
          <EnquiryForm mode="message" />
        </Reveal>

        <Reveal delay={150} className="lg:col-span-5">
          <h2 className="text-4xl">Good to know</h2>
          <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((f) => (
              // <details> is a built-in HTML accordion: no JavaScript needed.
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl">
                  {f.q}
                  <span className="text-2xl text-kumkum transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-ink/70">{f.a}</p>
              </details>
            ))}
          </div>

          <a href="/mcaptures-portfolio.pdf" download className="mt-8 flex items-center gap-4 rounded-2xl bg-ink p-6 text-ivory shadow-3d transition hover:-translate-y-1 hover:bg-kumkum">
            <DownloadIcon className="h-8 w-8 text-gold-soft" />
            <span>
              <span className="block font-serif text-2xl">Download the portfolio</span>
              <span className="text-sm text-ivory/70">A PDF to share with your family</span>
            </span>
          </a>
        </Reveal>
      </section>
    </>
  );
}
