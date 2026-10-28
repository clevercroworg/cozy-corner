import Image from "next/image";
import Link from "next/link";
import { GalleryGrid } from "@/components/gallery-grid";
import {
  CornerFlourish,
  Divider,
  Mandala,
  SectionTitle,
  Toran,
} from "@/components/ornaments";
import { gallery, photos } from "@/lib/gallery";
import { site } from "@/lib/site";

const occasions = [
  { title: "Birthdays", photo: photos.butterfly },
  { title: "Baby Showers", photo: photos.floral },
  { title: "Naming Ceremonies", photo: photos.leaf },
  { title: "Engagements", photo: photos.mandapSide },
];

const features = [
  {
    title: "Brick & timber interiors",
    icon: "M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6",
  },
  {
    title: "Chandelier-lit hall",
    icon: "M12 3v4M5 11h14l-2 5H7l-2-5zM9 16v3M15 16v3M12 7a4 4 0 0 1 4 4H8a4 4 0 0 1 4-4z",
  },
  {
    title: "Separate dining hall",
    icon: "M7 3v8a2 2 0 0 0 2 2v8M11 3v8M7 7h4M17 3c-1.5 2-2 4-2 7h2v11",
  },
  {
    title: "Natural daylight",
    icon: "M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[min(100dvh,60rem)] items-end overflow-hidden">
        <Image
          src={photos.hero.src}
          alt={photos.hero.alt}
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/55" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-3 bottom-3 top-20 border border-gold/45 md:inset-x-6 md:bottom-6 md:top-24"
        />
        <CornerFlourish
          corner="tl"
          className="absolute left-3 top-20 size-14 text-gold md:left-6 md:top-24 md:size-24"
        />
        <CornerFlourish
          corner="tr"
          className="absolute right-3 top-20 size-14 text-gold md:right-6 md:top-24 md:size-24"
        />
        <CornerFlourish
          corner="bl"
          className="absolute bottom-3 left-3 size-14 text-gold md:bottom-6 md:left-6 md:size-24"
        />
        <CornerFlourish
          corner="br"
          className="absolute bottom-3 right-3 size-14 text-gold md:bottom-6 md:right-6 md:size-24"
        />
        <div className="container-x pb-20 pt-44 text-cream md:pb-28">
          <p className="eyebrow !text-cream/90">
            {site.tagline} · {site.city}
          </p>
          <h1 className="mt-4 font-display text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            {site.name}
          </h1>
          <Divider className="mt-6 text-gold" />
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/availability" className="btn btn-primary">
              Check availability
            </Link>
            <Link href="#gallery" className="btn btn-ghost text-cream">
              View gallery
            </Link>
          </div>
        </div>
      </section>

      {/* The hall */}
      <section className="relative overflow-hidden">
        <Mandala className="absolute -right-32 top-10 hidden size-[28rem] text-gold/15 md:block" />
        <div className="container-x relative grid items-center gap-14 py-24 md:grid-cols-2 md:gap-16 md:py-32">
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div
              aria-hidden
              className="absolute -left-3 -top-3 bottom-3 right-3 rounded-t-full rounded-b-3xl border border-gold md:-left-5 md:-top-5 md:bottom-5 md:right-5"
            />
            <Image
              src={photos.evening.src}
              alt={photos.evening.alt}
              placeholder="blur"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="relative aspect-[4/5] w-full rounded-t-full rounded-b-3xl object-cover"
            />
            <Image
              src={photos.dining.src}
              alt={photos.dining.alt}
              placeholder="blur"
              sizes="(min-width: 768px) 25vw, 50vw"
              className="absolute -bottom-8 -right-4 hidden aspect-[4/3] w-1/2 rounded-2xl border-8 border-cream object-cover shadow-xl sm:block md:-right-10"
            />
          </div>
          <div>
            <div className="flex items-center gap-4">
              <p className="eyebrow">The hall</p>
              <span aria-hidden className="h-px w-16 bg-gold/60" />
            </div>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
              A warm space for the moments that matter
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              Exposed brick, a timber-beamed ceiling and a grand ring chandelier
              make Cozy Corner feel like home, with room to celebrate with
              everyone you love.
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6">
              {features.map((f) => (
                <li key={f.title} className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-brick">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={f.icon} />
                    </svg>
                  </span>
                  <span className="text-sm font-medium">{f.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="relative bg-sand py-24 md:py-32">
        <div className="scallop-top" />
        <div className="absolute inset-0 overflow-hidden">
          <CornerFlourish
            corner="tl"
            className="absolute left-4 top-6 size-16 text-gold/70 md:left-8 md:top-8 md:size-24"
          />
          <CornerFlourish
            corner="tr"
            className="absolute right-4 top-6 size-16 text-gold/70 md:right-8 md:top-8 md:size-24"
          />
        </div>
        <div className="container-x relative">
          <SectionTitle>Celebrations we host</SectionTitle>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {occasions.map((o) => (
              <div
                key={o.title}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <Image
                  src={o.photo.src}
                  alt={o.photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent" />
                <div
                  aria-hidden
                  className="absolute inset-2.5 rounded-xl border border-cream/40"
                />
                <p className="absolute bottom-5 left-5 right-5 font-display text-2xl font-semibold text-cream md:text-[1.7rem]">
                  {o.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="scallop-bottom" />
      </section>

      {/* Video */}
      <section className="relative overflow-hidden">
        <Mandala className="absolute -bottom-40 -left-40 size-[30rem] text-gold/15" />
        <div className="container-x relative grid items-center gap-14 py-24 md:grid-cols-[1fr_1.1fr] md:gap-16 md:py-32">
          <div className="md:order-2">
            <div className="flex items-center gap-4">
              <p className="eyebrow">Timings</p>
              <span aria-hidden className="h-px w-16 bg-gold/60" />
            </div>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              Step inside
            </h2>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                  Morning
                </dt>
                <dd className="mt-2 whitespace-nowrap font-display text-lg font-semibold sm:text-2xl">
                  8 AM – 3 PM
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                  Evening
                </dt>
                <dd className="mt-2 whitespace-nowrap font-display text-lg font-semibold sm:text-2xl">
                  4 PM – 11 PM
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                  Google
                </dt>
                <dd className="mt-2 flex items-center gap-1.5 font-display text-lg font-semibold sm:text-2xl">
                  {site.rating}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className="text-gold"
                    fill="currentColor"
                    aria-label="stars"
                  >
                    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
                  </svg>
                </dd>
              </div>
            </dl>
            <Link href="/availability" className="btn btn-primary mt-10">
              Book your date
            </Link>
          </div>
          <div className="relative mx-auto w-full max-w-xs sm:max-w-sm md:order-1">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-t-full rounded-b-[2rem] border border-gold md:-inset-4"
            />
            <div className="relative overflow-hidden rounded-t-full rounded-b-3xl bg-ink shadow-xl">
              <video
                src="/media/hall-tour.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                className="aspect-[9/16] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section
        id="gallery"
        className="relative scroll-mt-16 bg-sand py-24 md:py-32"
      >
        <div className="scallop-top" />
        <div className="absolute inset-0 overflow-hidden">
          <Mandala className="absolute -left-28 -top-28 size-80 text-gold/25" />
          <Mandala className="absolute -bottom-28 -right-28 size-80 text-gold/25" />
        </div>
        <div className="container-x relative">
          <SectionTitle>Gallery</SectionTitle>
          <div className="mt-12">
            <GalleryGrid photos={gallery} />
          </div>
        </div>
        <div className="scallop-bottom" />
      </section>

      {/* CTA */}
      <section className="container-x py-24 md:py-32">
        <div className="brick-wall relative overflow-hidden rounded-[2rem] px-6 pb-20 pt-24 text-center text-cream shadow-xl md:pb-24 md:pt-28">
          <div className="absolute inset-0 bg-gradient-to-b from-ink/10 to-ink/45" />
          <Toran id="cta-toran" className="absolute left-0 right-0 top-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-4 top-14 rounded-[1.4rem] border border-gold/50"
          />
          <CornerFlourish
            corner="bl"
            className="absolute bottom-4 left-4 size-16 text-gold md:size-20"
          />
          <CornerFlourish
            corner="br"
            className="absolute bottom-4 right-4 size-16 text-gold md:size-20"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold leading-tight md:text-6xl">
              Let&rsquo;s plan your celebration
            </h2>
            <Divider className="mx-auto mt-6 text-gold" />
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/availability"
                className="btn bg-cream text-brick hover:bg-white"
              >
                Check availability
              </Link>
              <Link href="/contact" className="btn btn-ghost text-cream">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
