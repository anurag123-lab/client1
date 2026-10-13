"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { ChatIcon, CloseIcon, DownloadIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from "@/components/icons";

/*
  Floating contact buttons (bottom-right) plus a small "Mcaptures Assistant".
  The assistant is NOT AI: it matches keywords in the question to a fixed list
  of answers below. No data is sent anywhere or stored.
*/

type Answer = { keys: string[]; text: string; link?: { href: string; label: string } };

const answers: Answer[] = [
  {
    keys: ["service", "offer", "provide", "cover", "what do"],
    text: "Manikanta photographs weddings, pre-wedding shoots and events, all in a candid, natural style.",
    link: { href: "/services", label: "See services" },
  },
  {
    keys: ["price", "pricing", "cost", "package", "rate", "charge", "budget", "quote"],
    text: "Packages depend on the event, the hours and what you need (photos, video, album). Share your date and venue and he'll send a quote.",
    link: { href: "/book", label: "Get a quote" },
  },
  {
    keys: ["book", "call", "consult", "meet", "available", "availability", "date", "free"],
    text: "Pick a time for a short call and tell us your date. Manikanta will confirm on WhatsApp.",
    link: { href: "/book", label: "Book a call" },
  },
  {
    keys: ["contact", "phone", "number", "whatsapp", "reach", "call you", "talk"],
    text: `WhatsApp or call ${site.phoneDisplay}, or send a DM on Instagram ${site.instagramHandle}.`,
    link: { href: "/contact", label: "Contact page" },
  },
  {
    keys: ["where", "location", "travel", "city", "outstation", "based"],
    text: `Mcaptures is based in ${site.location} and travels for weddings and events. Mention your venue when you enquire.`,
  },
  {
    keys: ["award", "puraskar", "best"],
    text: "Manikanta was named Best Candid Photographer at the Bharat Kala Puraskar 2026.",
    link: { href: "/about", label: "Read his story" },
  },
  {
    keys: ["portfolio", "work", "photos", "gallery", "sample", "see"],
    text: "You can browse the portfolio here, or download a PDF to share with family.",
    link: { href: "/portfolio", label: "Open portfolio" },
  },
];

const chips = ["Services", "Pricing", "Book a call", "Contact", "Where are you based?"];

type Msg = { from: "bot" | "you"; text: string; link?: Answer["link"] };

function reply(question: string): Msg {
  const q = question.toLowerCase();
  const hit = answers.find((a) => a.keys.some((k) => q.includes(k)));
  if (hit) return { from: "bot", text: hit.text, link: hit.link };
  return {
    from: "bot",
    text: "Good question! Manikanta can answer that best. Tap below to message him on WhatsApp.",
    link: { href: whatsappLink(`Hi Manikanta, ${question}`), label: "Ask on WhatsApp" },
  };
}

export default function ContactDock() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Namaste! 🙏 I'm the Mcaptures assistant. Ask about services, pricing or booking." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs]);

  const ask = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "you", text }, reply(text)]);
    setInput("");
  };

  const dockBtn =
    "flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink shadow-lg shadow-ink/20 ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:text-kumkum";

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {open && (
        <div
          role="dialog"
          aria-label="Mcaptures assistant"
          className="fade-up flex h-[28rem] max-h-[70svh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-lg bg-paper shadow-2xl shadow-ink/30 ring-1 ring-ink/10"
        >
          <div className="flex items-center justify-between bg-ink px-4 py-3 text-ivory">
            <div>
              <p className="font-serif text-lg leading-none">Mcaptures Assistant</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-ivory/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="p-1 hover:text-gold-soft">
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                    m.from === "you" ? "rounded-br-sm bg-kumkum text-ivory" : "rounded-bl-sm bg-ivory text-ink"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.link &&
                    (m.link.href.startsWith("http") ? (
                      <a href={m.link.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-medium text-kumkum underline">
                        {m.link.label} →
                      </a>
                    ) : (
                      <Link href={m.link.href} onClick={() => setOpen(false)} className="mt-2 inline-block font-medium text-kumkum underline">
                        {m.link.label} →
                      </Link>
                    ))}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="flex gap-2 overflow-x-auto px-4 pb-2">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => ask(c)}
                className="shrink-0 rounded-full border border-ink/15 px-3 py-1 text-xs hover:border-kumkum hover:text-kumkum"
              >
                {c}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex border-t border-ink/10"
          >
            <label htmlFor="assistant-input" className="sr-only">
              Your question
            </label>
            <input
              id="assistant-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write a message…"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
              maxLength={300}
            />
            <button type="submit" className="label-caps px-4 text-kumkum hover:text-ink">
              Send
            </button>
          </form>
        </div>
      )}

      <div className="flex items-center gap-2">
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit Instagram" className={`${dockBtn} hidden sm:flex`}>
          <InstagramIcon />
        </a>
        <a href={site.youtube} target="_blank" rel="noopener noreferrer" aria-label="Visit YouTube" className={`${dockBtn} hidden sm:flex`}>
          <YouTubeIcon />
        </a>
        <a href="/mcaptures-portfolio.pdf" download aria-label="Download portfolio PDF" className={`${dockBtn} hidden sm:flex`}>
          <DownloadIcon />
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f8f4e] text-white shadow-lg shadow-ink/25 transition hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close assistant" : "Open assistant"}
          aria-expanded={open}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-kumkum text-ivory shadow-lg shadow-ink/25 transition hover:-translate-y-0.5 hover:bg-ink"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
