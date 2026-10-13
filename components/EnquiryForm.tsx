"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons";

/*
  Booking / message form. Nothing is saved on a server: when the form is valid
  we build a neat message and open WhatsApp with it, so it lands straight in
  Manikanta's chat. Validation runs here in the browser before that happens.
*/

type Mode = "book" | "message";

const eventTypes = ["Wedding", "Pre-wedding", "Engagement", "Haldi / Mehendi", "Event / Function", "Other"];
const budgets = ["Not sure yet", "Under ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹2,00,000", "Above ₹2,00,000"];
const callSlots = ["Morning (10am – 12pm)", "Afternoon (12pm – 4pm)", "Evening (4pm – 8pm)"];

type Errors = Partial<Record<string, string>>;

function validate(data: Record<string, string>, mode: Mode): Errors {
  const e: Errors = {};
  if (data.name.trim().length < 2) e.name = "Please enter your name.";
  // Indian mobile: 10 digits starting 6-9, optional +91 / 0 prefix and spaces.
  if (!/^(\+?91|0)?[6-9]\d{9}$/.test(data.phone.replace(/[\s-]/g, ""))) e.phone = "Please enter a valid 10-digit mobile number.";
  if (mode === "book") {
    if (!data.eventType) e.eventType = "Choose an event type.";
    if (data.eventDate) {
      const today = new Date().toISOString().slice(0, 10);
      if (data.eventDate < today) e.eventDate = "That date has already passed.";
    }
    if (!data.callSlot) e.callSlot = "Pick a time that suits you.";
  } else if (data.message.trim().length < 5) {
    e.message = "Please write a short message.";
  }
  return e;
}

function buildMessage(d: Record<string, string>, mode: Mode) {
  const lines =
    mode === "book"
      ? [
          "Hi Manikanta! I'd like to book a call. 📸",
          "",
          `Name: ${d.name}`,
          `Phone: ${d.phone}`,
          `Event: ${d.eventType}`,
          d.eventDate && `Date: ${new Date(d.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`,
          d.venue && `Venue / city: ${d.venue}`,
          d.budget && `Budget: ${d.budget}`,
          `Best time to call: ${d.callSlot}`,
          d.message && `\n${d.message}`,
        ]
      : ["Hi Manikanta!", "", d.message, "", `– ${d.name}, ${d.phone}`];
  return lines.filter(Boolean).join("\n");
}

const field =
  "mt-2 w-full border-0 border-b border-ink/25 bg-transparent px-0 py-2.5 text-base text-ink placeholder:text-ink/35 focus:border-kumkum focus:outline-none focus:ring-0";

export default function EnquiryForm({ mode = "book" }: { mode?: Mode }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sentLink, setSentLink] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      ["name", "phone", "eventType", "eventDate", "venue", "budget", "callSlot", "message"].map((k) => [k, String(form.get(k) ?? "")])
    );
    const errs = validate(data, mode);
    setErrors(errs);
    if (Object.keys(errs).length) {
      // Move focus to the first problem so keyboard and screen reader users find it.
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    const link = whatsappLink(buildMessage(data, mode));
    window.open(link, "_blank", "noopener,noreferrer");
    setSentLink(link);
  }

  if (sentLink) {
    return (
      <div className="fade-up rounded-2xl bg-paper p-8 text-center shadow-3d md:p-12" role="status">
        <p className="font-script text-4xl text-gold">Thank you!</p>
        <h2 className="mt-2 text-4xl">We&apos;ll be in touch</h2>
        <p className="mx-auto mt-4 max-w-sm text-ink/70">
          Your details are ready in WhatsApp. Just press send and Manikanta will reply there.
        </p>
        <a href={sentLink} target="_blank" rel="noopener noreferrer" className="btn mt-8 bg-[#1f8f4e] text-white hover:bg-ink">
          <WhatsAppIcon /> Open WhatsApp again
        </a>
        <button type="button" onClick={() => setSentLink(null)} className="label-caps mt-6 block w-full text-ink/50 hover:text-kumkum">
          Edit details
        </button>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] && (
      <p id={`${k}-error`} className="mt-1.5 text-sm text-kumkum">
        {errors[k]}
      </p>
    );
  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-7 rounded-2xl bg-paper p-6 shadow-3d sm:grid-cols-2 md:p-10">
      <label className="block">
        <span className="label-caps text-ink/60">Your name *</span>
        <input name="name" autoComplete="name" placeholder="Full name" maxLength={60} className={field} {...aria("name")} />
        {err("name")}
      </label>
      <label className="block">
        <span className="label-caps text-ink/60">Mobile / WhatsApp *</span>
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" maxLength={16} className={field} {...aria("phone")} />
        {err("phone")}
      </label>

      {mode === "book" && (
        <>
          <label className="block">
            <span className="label-caps text-ink/60">Event type *</span>
            <select name="eventType" defaultValue="" className={field} {...aria("eventType")}>
              <option value="" disabled>
                Select event
              </option>
              {eventTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            {err("eventType")}
          </label>
          <label className="block">
            <span className="label-caps text-ink/60">Event date</span>
            <input name="eventDate" type="date" className={field} {...aria("eventDate")} />
            {err("eventDate")}
          </label>
          <label className="block">
            <span className="label-caps text-ink/60">Venue / city</span>
            <input name="venue" placeholder="e.g. Nizamabad" maxLength={80} className={field} />
          </label>
          <label className="block">
            <span className="label-caps text-ink/60">Budget</span>
            <select name="budget" defaultValue="" className={field}>
              <option value="">Select budget range</option>
              {budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <fieldset className="sm:col-span-2" {...aria("callSlot")}>
            <legend className="label-caps text-ink/60">Best time for a call *</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {callSlots.map((s) => (
                <label key={s} className="cursor-pointer">
                  <input type="radio" name="callSlot" value={s} className="peer sr-only" />
                  <span className="inline-block rounded-full border border-ink/20 px-4 py-2 text-sm transition peer-checked:border-kumkum peer-checked:bg-kumkum peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-gold">
                    {s}
                  </span>
                </label>
              ))}
            </div>
            {err("callSlot")}
          </fieldset>
        </>
      )}

      <label className="block sm:col-span-2">
        <span className="label-caps text-ink/60">{mode === "book" ? "Tell us about your day" : "Message *"}</span>
        <textarea
          name="message"
          rows={4}
          maxLength={800}
          placeholder={mode === "book" ? "Functions, number of days, anything special you'd love captured…" : "How can we help?"}
          className={`${field} resize-none`}
          {...aria("message")}
        />
        {err("message")}
      </label>

      <div className="flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/50">Opens WhatsApp with your details filled in. Nothing is stored on this site.</p>
        <button type="submit" className="btn rounded-full bg-kumkum text-ivory shadow-3d hover:-translate-y-0.5 hover:bg-ink">
          {mode === "book" ? "Request a call" : "Send message"} →
        </button>
      </div>
    </form>
  );
}
