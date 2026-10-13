"use client";
// "use client" is needed because the header reacts to scrolling and the mobile menu uses state.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";

/*
  Floating glass navigation bar: it sits a little below the top edge with a
  layered shadow, so it looks lifted off the page. It shrinks slightly once you scroll.
*/
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Stop the page behind the open menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Split links so the logo sits in the middle on desktop.
  const left = navLinks.slice(0, 3);
  const right = navLinks.slice(3);

  const linkClass = (href: string) =>
    `relative py-1 text-[0.68rem] uppercase tracking-[0.22em] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-kumkum after:transition-transform ${
      pathname === href ? "text-kumkum after:scale-x-100" : "text-ink/75 after:scale-x-0 hover:text-ink hover:after:scale-x-100"
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 px-3 pt-3 md:px-6">
        <div
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-4 md:h-17 ring-1 ring-ink/5 backdrop-blur-xl transition-all duration-500 md:px-7 ${
            scrolled ? "bg-paper/90 shadow-3d" : "bg-paper/70 shadow-lg shadow-ink/5"
          }`}
        >
          <nav aria-label="Primary" className="hidden flex-1 gap-7 lg:flex">
            {left.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="flex flex-col items-center leading-none text-ink" aria-label="Mcaptures home">
            <span className="font-serif text-[1.35rem] tracking-[0.32em] md:text-2xl">MCAPTURES</span>
            <span className="font-script -mt-0.5 text-sm text-gold">by Talla Manikanta</span>
          </Link>

          <nav aria-label="Primary continued" className="hidden flex-1 items-center justify-end gap-7 lg:flex">
            {right.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="rounded-md border border-ink/70 px-3.5 py-2 text-[0.66rem] uppercase tracking-[0.22em] text-ink transition hover:-translate-y-0.5 hover:bg-ink hover:text-ivory hover:shadow-3d"
            >
              Book a call
            </Link>
          </nav>

          <button
            type="button"
            className="relative h-10 w-10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {/* Two lines that rotate into an X when open */}
            <span className={`absolute left-2 right-2 h-px bg-ink transition-transform duration-300 ${open ? "top-1/2 rotate-45" : "top-[40%]"}`} />
            <span className={`absolute left-2 right-2 h-px bg-ink transition-transform duration-300 ${open ? "top-1/2 -rotate-45" : "top-[60%]"}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu: a floating card under the bar.
          It lives outside <header> because backdrop-blur there would make
          "fixed" position relative to the header instead of the screen. */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-3 top-19 z-30 rounded-2xl bg-paper shadow-3d transition-all duration-300 lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col items-center gap-5 py-10">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={`font-serif text-3xl ${pathname === l.href ? "text-kumkum" : "text-ink"}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/book" className="btn mt-3 rounded-full bg-kumkum text-ivory">
            Book a call
          </Link>
        </nav>
      </div>
    </>
  );
}
