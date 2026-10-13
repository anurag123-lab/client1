// Business details used across the site. Change them here once, not in every page.
// Taken from the Instagram profile @m_capturesphotography.
export const site = {
  name: "Mcaptures",
  owner: "Talla Manikanta",
  tagline: "Turning moments into timeless frames.",
  location: "Nizamabad, Telangana",
  award: "Best Candid Photographer · Bharat Kala Puraskar 2026",
  services: ["Weddings", "Pre-weddings", "Events"],
  whatsapp: "919346873022", // country code + number, no spaces, for wa.me links
  phoneDisplay: "+91 93468 73022",
  instagram: "https://www.instagram.com/m_capturesphotography",
  instagramHandle: "@m_capturesphotography",
  youtube: "https://www.youtube.com/@mcaptures_photography",
  threads: "https://www.threads.com/@m_capturesphotography",
};

// Builds a WhatsApp link that opens a chat with a pre-typed message.
export function whatsappLink(message = "Hi Manikanta, I'd like to know about your photography packages.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

// Story names from the Instagram highlights.
export const stories = [
  "Pravalika + Vijay",
  "Loukya's Wedding",
  "Bride Mounika",
  "Poojitha & Arun",
  "Sai + Sahitya",
  "Sai + Supriya",
  "Manisha + Gopi",
  "Pranitha",
];
