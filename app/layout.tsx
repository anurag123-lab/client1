import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactDock from "@/components/ContactDock";
import "./globals.css";

// next/font downloads the fonts at build time and serves them from our own
// domain, so there is no layout shift and no request to Google from the browser.
// Each `variable` becomes a CSS variable that globals.css plugs into @theme.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
});

export const metadata: Metadata = {
  title: "Mcaptures · Candid Wedding Photography by Talla Manikanta",
  description:
    "Turning moments into timeless frames. Candid wedding, pre-wedding and event photography in Nizamabad by Talla Manikanta, Best Candid Photographer at Bharat Kala Puraskar 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${pinyon.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ContactDock />
      </body>
    </html>
  );
}
