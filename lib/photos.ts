// Every photo on the site, in one list. width/height are the real file sizes;
// next/image uses them to reserve space so the page doesn't jump while loading.
// To add a photo: drop it in /public/photos and add a line here.

export type Category = "Weddings" | "Brides" | "Events";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: Category; // photos without a category don't appear in the portfolio grid
};

const p = (name: string, alt: string, width: number, height: number, category?: Category): Photo => ({
  src: `/photos/${name}.jpg`,
  alt,
  width,
  height,
  category,
});

export const photos = {
  coupleGolden: p("couple-golden", "Bride and groom in golden silk smiling under a tree", 886, 1320, "Weddings"),
  coupleEmbrace: p("couple-embrace", "Bride laughing as the groom hugs her", 666, 964, "Weddings"),
  coupleSerenity: p("couple-serenity", "Black and white portrait of the couple, foreheads touching", 1440, 1580, "Weddings"),
  brideVeil1: p("bride-veil-1", "Bride in a gold saree and red veil under a large tree", 618, 1244, "Brides"),
  brideVeil2: p("bride-veil-2", "Bride walking in a gold saree with a red veil flowing behind", 616, 1244, "Brides"),
  bride1: p("bride-portrait-1", "Bride smiling with her mehendi hands raised", 714, 914, "Brides"),
  bride2: p("bride-portrait-2", "Bride laughing shyly, hand to her face", 450, 668, "Brides"),
  bride3: p("bride-portrait-3", "Close portrait of a bride in gold bridal jewellery", 718, 878, "Brides"),
  brideLathaSri: p("bride-lathasri", "Black and white bridal portrait of Latha Sri behind her veil", 1280, 1600, "Brides"),
  bathukamma: p("event-bathukamma", "Chandoor Bathukamma festival celebration", 640, 1136, "Events"),
  temple: p("event-temple", "Temple gopuram against a clear blue sky", 640, 1136, "Events"),
  pondy: p("travel-pondy", "Colourful fishing boat on the water at Pondicherry", 640, 1136, "Events"),
  awardStage: p("award-stage", "Talla Manikanta holding the Bharat Kala Puraskar trophy", 1280, 1600),
  awardPortrait: p("award-portrait", "Talla Manikanta with his award on a kumkum red poster", 1280, 1600),
  awardCollage: p("award-collage", "Best Candid Photographer award ceremony, Bharat Kala Puraskar 2026", 1280, 1600),
  awardPoster: p("award-poster", "Bharat Kala Puraskar 2026 award winner poster for Talla Manikanta", 540, 960),
  awardMoment: p("award-moment", "Manikanta smiling with his trophy at the photo trade show", 540, 960),
  founder1: p("founder-1", "Talla Manikanta seated with his camera", 1200, 1600),
  founder2: p("founder-2", "Black and white portrait of Talla Manikanta holding his camera", 1201, 1600),
  founder3: p("founder-3", "Talla Manikanta smiling, camera in hand", 1201, 1600),
  founder4: p("founder-4", "Talla Manikanta standing with his camera", 1201, 1600),
};

// Order used by the portfolio grid.
export const portfolio: Photo[] = [
  photos.coupleGolden,
  photos.brideVeil1,
  photos.coupleEmbrace,
  photos.bride3,
  photos.bathukamma,
  photos.coupleSerenity,
  photos.brideLathaSri,
  photos.bride1,
  photos.temple,
  photos.brideVeil2,
  photos.bride2,
  photos.pondy,
];

export const categories = ["All", "Weddings", "Brides", "Events"] as const;
