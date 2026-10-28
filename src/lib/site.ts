// Edit venue details here. Everything on the site reads from this file.
export const site = {
  name: "Cozy Corner",
  tagline: "Event Venue",
  city: "Bangalore",
  rating: "5.0",
  capacity: 150,
  chairs: 100,
  phone: "+91 80505 07700",
  whatsapp: "918050507700",
  // TODO: replace email and the full street address with the real details
  email: "hello@cozycorner.in",
  address: "Cozy Corner Event Venue, Bengaluru, Karnataka",
  mapQuery: "Cozy Corner Event Venue, Bengaluru, Karnataka",
  mapLink: "https://share.google/AACWdruSl6YNJD3bD",
  hours: "8 AM – 3 PM · 4 PM – 11 PM",
};

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
