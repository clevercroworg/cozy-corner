import type { StaticImageData } from "next/image";

import butterflyBirthday from "@/assets/gallery/butterfly-birthday.jpg";
import butterflyCeiling from "@/assets/gallery/butterfly-ceiling.jpg";
import diningHall from "@/assets/gallery/dining-hall.jpg";
import diningHallWide from "@/assets/gallery/dining-hall-wide.jpg";
import eveningAnniversary from "@/assets/gallery/evening-anniversary.jpg";
import fairytaleBirthday from "@/assets/gallery/fairytale-birthday.jpg";
import floralArchCeiling from "@/assets/gallery/floral-arch-ceiling.jpg";
import floralArchHall from "@/assets/gallery/floral-arch-hall.jpg";
import floralArchWide from "@/assets/gallery/floral-arch-wide.jpg";
import leafStage from "@/assets/gallery/leaf-stage.jpg";
import leafStageSeating from "@/assets/gallery/leaf-stage-seating.jpg";
import mandapSide from "@/assets/gallery/mandap-side.jpg";
import mandapWide from "@/assets/gallery/mandap-wide.jpg";
import mirrorStage from "@/assets/gallery/mirror-stage.jpg";
import pinkBowBirthday from "@/assets/gallery/pink-bow-birthday.jpg";
import teddyBirthday from "@/assets/gallery/teddy-birthday.jpg";
import whiteArchThrone from "@/assets/gallery/white-arch-throne.jpg";

export type Photo = { src: StaticImageData; alt: string };

export const photos = {
  hero: {
    src: mandapWide,
    alt: "Cozy Corner hall with a floral mandap under the chandelier",
  },
  evening: {
    src: eveningAnniversary,
    alt: "Evening celebration lit by the chandelier",
  },
  dining: {
    src: diningHallWide,
    alt: "Dining hall with dressed tables and chairs",
  },
  diningTall: { src: diningHall, alt: "Dining hall with round tables" },
  butterfly: {
    src: butterflyBirthday,
    alt: "First birthday setup with butterfly backdrop",
  },
  floral: {
    src: floralArchHall,
    alt: "Baby shower stage with white floral arch",
  },
  mandapSide: {
    src: mandapSide,
    alt: "Engagement stage with marigold strings",
  },
  leaf: { src: leafStage, alt: "Naming ceremony stage with leaf backdrop" },
  whiteArch: {
    src: whiteArchThrone,
    alt: "Jasmine arches with a white throne",
  },
  hallFloral: {
    src: floralArchCeiling,
    alt: "The hall under its timber ceiling and ring chandelier",
  },
  mirror: { src: mirrorStage, alt: "Floral stage with gold mirror frame" },
  pinkBow: { src: pinkBowBirthday, alt: "Pink bow celebration backdrop" },
  hallArches: {
    src: floralArchWide,
    alt: "The hall with arched windows and timber ceiling",
  },
  hallCeiling: {
    src: butterflyCeiling,
    alt: "Timber ceiling and ring chandelier",
  },
} satisfies Record<string, Photo>;

export const gallery: Photo[] = [
  { src: mandapWide, alt: "Floral mandap under the chandelier" },
  { src: fairytaleBirthday, alt: "Fairytale castle birthday backdrop" },
  { src: floralArchWide, alt: "White floral arch with traditional platters" },
  { src: leafStageSeating, alt: "Leaf backdrop stage with guest seating" },
  { src: teddyBirthday, alt: "Teddy bear first birthday backdrop" },
  { src: eveningAnniversary, alt: "Evening anniversary setup" },
  { src: whiteArchThrone, alt: "Jasmine arches with a white throne" },
  { src: butterflyCeiling, alt: "Butterfly birthday under the timber ceiling" },
  { src: mirrorStage, alt: "Floral stage with gold mirror frame" },
  { src: diningHall, alt: "Dining hall with round tables" },
  { src: pinkBowBirthday, alt: "Pink bow birthday backdrop" },
  { src: mandapSide, alt: "Marigold mandap with red chairs" },
];
