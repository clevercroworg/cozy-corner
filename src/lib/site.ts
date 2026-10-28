// Edit venue details here. Everything on the site reads from this file.
export const site = {
  name: "Cozy Corner",
  tagline: "Event Venue",
  city: "Bangalore",
  rating: "5.0",
  capacity: 300,
  // TODO: replace phone, WhatsApp, email and address with the real details
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@cozycorner.in",
  address: "Cozy Corner Event Venue, Bengaluru, Karnataka",
  mapQuery: "Cozy Corner Event Venue, Bengaluru, Karnataka",
  mapLink: "https://share.google/AACWdruSl6YNJD3bD",
  hours: "8 AM – 3 PM · 4 PM – 11 PM",
};

// Dates already booked (YYYY-MM-DD). They show as unavailable on the calendar.
export const bookedDates: string[] = [];

export const slots = [
  { id: "morning", label: "Morning", time: "8 AM – 3 PM" },
  { id: "evening", label: "Evening", time: "4 PM – 11 PM" },
] as const;

export type SlotId = (typeof slots)[number]["id"];

export const eventTypes = [
  "Birthday",
  "Engagement",
  "Anniversary",
  "Baby shower / Seemantham",
  "Naming ceremony",
  "Family gathering",
  "Private celebration",
  "Other",
];
