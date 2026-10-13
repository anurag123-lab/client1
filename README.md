# Mcaptures

Website for **Mcaptures**, candid wedding photography by Talla Manikanta (Nizamabad, Telangana).

Built with Next.js (App Router), TypeScript and Tailwind CSS. No database: the booking and contact forms open WhatsApp with the details already filled in.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Production check:

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Go to https://vercel.com/new and import this GitHub repo.
2. Keep the defaults (Framework: Next.js, Build: `npm run build`).
3. Click **Deploy**. No environment variables are needed.

Every push to `main` redeploys automatically.

## Where to edit things

| What | File |
| --- | --- |
| Phone, links, location, story names | `lib/site.ts` |
| Photos and portfolio order | `lib/photos.ts` + `public/photos/` |
| Reviews (currently samples) | `lib/reviews.ts`, set `isSample = false` once they're real |
| Colours and fonts | `app/globals.css`, `app/layout.tsx` |
| Assistant answers | `components/ContactDock.tsx` |

## Before launch

- Replace the sample reviews with real client reviews.
- Swap the Instagram-sized photos for original high-res files.
- Confirm the About page wording with the client.
