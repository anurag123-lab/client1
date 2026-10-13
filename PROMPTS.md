# Building Mcaptures with Claude Code in VS Code

## Setup (once)
1. Install Node.js LTS, VS Code, and Git.
2. Install the Claude Code extension in VS Code (search "Claude Code" in Extensions) and sign in.
3. Create a folder `mcaptures-site`, open it in VS Code, and put `CLAUDE.md` in the root.
4. Create free accounts: MongoDB Atlas, Cloudinary, Vercel, GitHub.

## Prompts, one at a time
Paste each prompt into Claude Code. Run the site (`npm run dev`), check it on your phone width, then commit before the next one.

1. **Scaffold**: "Read CLAUDE.md. Create the Next.js + TypeScript + Tailwind project in this folder, set up the fonts and color tokens, and build the shared header (with mobile menu) and footer. Stop when `npm run dev` works."
2. **Home page**: "Build the home page from CLAUDE.md. Use placeholder images from `/public/photos` for now. Match an editorial wedding look: large serif headline over the hero photo, 3 frosted-glass stat cards on the right."
3. **About, Services, Portfolio**: "Build /about, /services and /portfolio. Portfolio filter should work without a page reload."
4. **Database + contact form**: "Connect MongoDB with Mongoose using MONGODB_URI from .env.local. Make the /contact form save enquiries with server-side validation and show a thank-you message."
5. **Admin login**: "Add /admin protected by ADMIN_PASSWORD with an httpOnly signed cookie. Show enquiries newest first with a status button that cycles New → In talks → Booked."
6. **Photo uploads**: "Let the admin upload portfolio photos to Cloudinary with a category. The portfolio page should read photos from MongoDB."
7. **SEO + speed**: "Add page titles, meta descriptions, Open Graph image, sitemap, and LocalBusiness JSON-LD. Run a Lighthouse-style review and fix the biggest issues."
8. **Deploy**: "Prepare this for Vercel: list the env vars I must add, and anything that breaks in production."

## After it's live
- Buy the domain in the client's name (e.g. mcaptures.in), add it in Vercel → Domains, update DNS.
- Add the site link to his Instagram bio and Google Business Profile.
- Ask him for original high-res photos and real reviews to replace the placeholders.
