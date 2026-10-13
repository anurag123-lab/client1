import type { Metadata } from "next";
import PortfolioGrid from "@/components/PortfolioGrid";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio · Mcaptures",
  description: "Wedding, bridal and event photographs by Talla Manikanta.",
};

export default function PortfolioPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-20 md:px-8 md:pt-20 md:pb-28">
      <div className="mb-10 text-center">
        <p className="label-caps fade-up text-kumkum">Portfolio</p>
        <p className="font-script fade-up mt-4 text-3xl text-gold md:text-4xl" style={{ "--delay": "100ms" } as React.CSSProperties}>
          a few favourite frames
        </p>
        <h1 className="fade-up mt-1 text-5xl md:text-7xl" style={{ "--delay": "200ms" } as React.CSSProperties}>
          Stories in <em className="text-kumkum">light</em>
        </h1>
      </div>

      <PortfolioGrid />

      <div className="mt-14 flex flex-col items-center gap-3 text-center">
        <p className="text-ink/70">Want to see more? The latest work goes up on Instagram first.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn border border-ink/30 hover:bg-ink hover:text-ivory">
            Follow {site.instagramHandle}
          </a>
          <a href="/mcaptures-portfolio.pdf" download className="btn bg-kumkum text-ivory hover:bg-ink">
            Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}
