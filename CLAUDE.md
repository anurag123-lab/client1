# Mcaptures website

Client site for **Mcaptures**, a wedding photographer run by **Talla Manikanta**.
Instagram: @m_capturesphotography · YouTube: @mcaptures_photography · WhatsApp: 9346873022
Services: Weddings, Pre-weddings, Events. Award: Best Candid Photographer, Bharat Kala Puraskar 2026.

I'm Debbie, a student freelancer learning MERN. Explain non-obvious code briefly so I can maintain it.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- No database for now: booking/contact forms open a pre-filled WhatsApp message, nothing is stored
- Photos live in `public/photos` and are listed in `lib/photos.ts`
- Deploy on Vercel (no env vars needed)
- Later, if the client wants it: MongoDB + Cloudinary + admin login (see PROMPTS.md steps 4–6)

## Pages
- `/` Home: photo hero with headline "Timeless Frames", 3 floating stat cards, featured story strip, intro, recent stories grid, testimonial
- `/about` Founder story, award timeline
- `/services` Weddings / Pre-weddings / Events cards + 4-step booking process
- `/portfolio` Filterable grid (All, Weddings, Brides, Events) with lightbox
- `/book` Book-a-call form (event, date, venue, budget, call time) → WhatsApp
- `/contact` Contact channels, message form → WhatsApp, FAQ, portfolio PDF download

## Design rules
- Fonts: Cormorant Garamond (headings), Pinyon Script (small script accents only), Jost (body, nav)
- Colors: ivory #f7f2ec background, paper #fffdf9 cards, ink #231a17 text, kumkum red #8e1b22 accent, gold #b48a3c focus, sage #55685d sections
- Style: floating framed hero, photos fading into the page (fade-left/right utilities), subtle 3D tilt cards (`<Tilt>`), layered `shadow-3d`
- Reviews in `lib/reviews.ts` are samples and labelled as such until real ones are supplied
- Nav: small uppercase links with wide letter-spacing, centered "MCAPTURES" logo
- Mobile first. Test at 375px width. Images use next/image with proper sizes.
- No lorem ipsum. Keep copy short and warm.

## Rules for Claude
- Build one feature at a time and stop so I can test it.
- Never commit `.env*` files. Keep secrets in `.env.local`.
- Validate form input on the server too, not only in the browser.
- Use server actions or API routes in `app/api/*`; keep DB code in `lib/db.ts`.
