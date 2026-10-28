// Edit venue details here. Everything on the site reads from this file.
export const site = {
  name: "Cozy Corner",
  tagline: "Event Venue",
  city: "Bangalore",
  area: "Banashankari 6th Stage",
  rating: "4.7",
  reviews: 47,
  capacity: 150,
  chairs: 100,
  phone: "+91 80505 07700",
  whatsapp: "918050507700",
  // TODO: replace with the real email
  email: "hello@cozycorner.in",
  address:
    "1st & 2nd Floor, No. 89, 80 Feet Road, opposite Karishma Hills, Banashankari 6th Stage 1st Block, Subramanyapura, Bengaluru, Karnataka 560061",
  mapQuery:
    "Cozy Corner Event Venue - Party Hall, 80 Feet Road, Subramanyapura, Bengaluru 560061",
  mapLink: "https://share.google/AACWdruSl6YNJD3bD",
  hours: "8 AM – 3 PM · 4 PM – 11 PM",
};

// Venue price by number of guests (₹).
export const pricing = [
  { guests: "Up to 50 guests", price: 20000 },
  { guests: "50 – 100 guests", price: 25000 },
  { guests: "100 – 150 guests", price: 32000 },
];

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

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
