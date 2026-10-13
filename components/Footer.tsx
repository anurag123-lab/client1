import Link from "next/link";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import { navLinks, site, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      {/* Reviews */}
      <section aria-label="Client reviews" className="border-b border-ivory/10 px-4 py-20 md:py-24">
        <ReviewsCarousel />
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        <div className="sm:col-span-2 md:col-span-1">
          <p className="font-serif text-2xl tracking-[0.3em]">MCAPTURES</p>
          <p className="font-script mt-2 text-xl text-gold-soft">by {site.owner}</p>
          <p className="mt-4 max-w-xs text-sm text-ivory/70">{site.tagline}</p>
          <p className="mt-2 text-sm text-ivory/50">{site.location}</p>
        </div>

        <nav aria-label="Footer">
          <p className="label-caps mb-4 text-gold">Explore</p>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ivory/75 hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="text-ivory/75 hover:text-ivory">
                Book a call
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="label-caps mb-4 text-gold">Follow</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-ivory/75 hover:text-ivory">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="text-ivory/75 hover:text-ivory">
                YouTube
              </a>
            </li>
            <li>
              <a href={site.threads} target="_blank" rel="noopener noreferrer" className="text-ivory/75 hover:text-ivory">
                Threads
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="label-caps mb-4 text-gold">Say hello</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-ivory/75 hover:text-ivory">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:+${site.whatsapp}`} className="text-ivory/75 hover:text-ivory">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href="/mcaptures-portfolio.pdf" download className="text-ivory/75 hover:text-ivory">
                Download portfolio (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-ivory/50 md:px-8">
          © {new Date().getFullYear()} Mcaptures · {site.award}
        </p>
      </div>
    </footer>
  );
}
