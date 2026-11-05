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

Booking and contact forms post to `/api/booking` and `/api/contact`, which email the owner through Gmail SMTP.
Set these in Vercel (Project → Settings → Environment Variables), never in the code:

- `GMAIL_USER`: the Gmail address that sends the emails
- `GMAIL_APP_PASSWORD`: a Google app password for that account
- `OWNER_EMAIL` (optional): who receives the emails; defaults to `GMAIL_USER`
