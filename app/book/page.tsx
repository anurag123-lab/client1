import type { Metadata } from "next";
import Image from "next/image";
import EnquiryForm from "@/components/EnquiryForm";
import Tilt from "@/components/Tilt";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Call · Mcaptures",
  description: "Book a free call with Talla Manikanta to talk about your wedding, pre-wedding or event photography.",
};

export default function BookPage() {
  return (
    <section className="relative mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-20 md:px-8 md:pt-20 md:pb-28 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-4">
        <p className="label-caps fade-up text-kumkum">Book a call</p>
        <p className="font-script fade-up mt-4 text-3xl text-gold md:text-4xl" style={{ "--delay": "100ms" } as React.CSSProperties}>
          let&apos;s work together
        </p>
        <h1 className="fade-up mt-1 text-5xl md:text-6xl" style={{ "--delay": "200ms" } as React.CSSProperties}>
          A short, free chat
        </h1>
        <p className="fade-up mt-5 text-ink/70" style={{ "--delay": "300ms" } as React.CSSProperties}>
          Tell us your date and a good time to call. Manikanta will confirm on WhatsApp and talk you through
          coverage and packages. No pressure, no obligation.
        </p>

        <ul className="fade-up mt-8 space-y-4 text-sm" style={{ "--delay": "400ms" } as React.CSSProperties}>
          {["15-minute call", "Check his availability for your date", "Get a quote made for your day"].map((t) => (
            <li key={t} className="flex gap-3">
              <span className="text-kumkum">✦</span>
              {t}
            </li>
          ))}
        </ul>

        <Tilt max={6} className="mt-10 hidden rounded-2xl shadow-3d lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image src={photos.coupleSerenity.src} alt={photos.coupleSerenity.alt} fill sizes="380px" className="object-cover" />
          </div>
        </Tilt>
        <p className="mt-6 text-sm text-ink/60">
          Prefer to call? <a href={`tel:+${site.whatsapp}`} className="text-kumkum underline">{site.phoneDisplay}</a>
        </p>
      </div>

      <div className="fade-up lg:col-span-8" style={{ "--delay": "300ms" } as React.CSSProperties}>
        <EnquiryForm mode="book" />
      </div>
    </section>
  );
}
