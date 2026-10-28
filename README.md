# Cozy Corner — Event Venue, Bangalore

Next.js site with three pages: Home (with gallery), Book (booking request form) and Contact.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

## Editing content

- Venue details, booked dates, time slots, event types: `src/lib/site.ts`
- Photos: `src/assets/gallery/`, wired up in `src/lib/gallery.ts`
- Hall tour video: `public/media/hall-tour.mp4`

## Email

Booking and contact forms post to `/api/booking` and `/api/contact`, which email the owner through Resend.

```bash
vercel link
vercel integration add resend/resend-email
vercel env add OWNER_EMAIL
vercel env pull --yes
```

Until a sending domain is verified in Resend, the default sender (`onboarding@resend.dev`) can only deliver to the email address on the Resend account.
