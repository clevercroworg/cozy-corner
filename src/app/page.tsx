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
import { amenities } from "@/lib/amenities";
import { gallery, photos } from "@/lib/gallery";
import { formatPrice, pricing, site } from "@/lib/site";

const occasions = [
  { title: "Birthdays", photo: photos.butterfly },
  { title: "Engagements", photo: photos.mandapSide },
  { title: "Anniversaries", photo: photos.evening },
  { title: "Baby Showers", photo: photos.whiteArch },
  { title: "Family Gatherings", photo: photos.mirror },
  { title: "Private Celebrations", photo: photos.pinkBow },
];

const stats: { value: string; label: string; star?: boolean }[] = [
  { value: String(site.capacity), label: "Floating capacity" },
  { value: "2", label: "Floors with lift" },
  { value: String(site.chairs), label: "Cushioned chairs" },
  { value: site.rating, label: `Google · ${site.reviews} reviews`, star: true },
];

const features = [
  {
    title: "Rooftop party hall · 2nd floor",
    icon: "M12 3v4M5 11h14l-2 5H7l-2-5zM9 16v3M15 16v3M12 7a4 4 0 0 1 4 4H8a4 4 0 0 1 4-4z",
  },
  {
    title: "Dining area · 1st floor",
    icon: "M7 3v8a2 2 0 0 0 2 2v8M11 3v8M7 7h4M17 3c-1.5 2-2 4-2 7h2v11",
  },
  {
    title: "Welcome drink & snack area",
    icon: "M6 3h12l-1.5 7a4.5 4.5 0 0 1-9 0zM12 14.5V21M8 21h8",
  },
  {
    title: "Common area with washrooms",
    icon: "M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[34rem] items-end overflow-hidden md:min-h-[38rem]">
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
        <div className="container-x pb-24 pt-36 text-cream md:pb-28 md:pt-40">
          <p className="eyebrow !text-cream/90">
            {site.area} · {site.city}
          </p>
          <h1 className="mt-3 font-display text-5xl font-medium uppercase leading-none tracking-[0.06em] sm:text-6xl md:text-7xl">
            {site.name}
          </h1>
          <p className="mt-4 flex items-center gap-3 font-label text-sm uppercase tracking-[0.35em] text-gold">
            <span aria-hidden className="h-px w-10 bg-current" />
            {site.tagline}
            <span aria-hidden className="h-px w-10 bg-current" />
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="btn btn-primary">
              Book the venue
            </Link>
            <Link href="#gallery" className="btn btn-ghost text-cream">
              View gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Key numbers */}
      <section className="container-x relative z-10 -mt-12">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-[0_20px_50px_-20px_rgb(42_28_21/0.35)] md:grid-cols-4">
          {stats.map((st) => (
            <div
              key={st.label}
              className="flex flex-col-reverse bg-white px-5 py-6 text-center md:py-7"
            >
              <dt className="mt-1 text-[0.65rem] uppercase tracking-[0.12em] text-muted sm:text-xs sm:tracking-[0.18em]">
                {st.label}
              </dt>
              <dd className="flex items-center justify-center gap-1.5 font-display text-4xl font-semibold text-brick md:text-5xl">
                {st.value}
                {st.star && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="size-6 text-gold md:size-7"
                  >
                    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
                  </svg>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* The hall */}
      <section className="relative overflow-hidden">
        <Mandala className="absolute -right-32 top-10 hidden size-[28rem] text-gold/15 md:block" />
        <div className="container-x relative grid items-center gap-14 pb-24 pt-20 md:grid-cols-2 md:gap-16 md:pb-32 md:pt-28">
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div
              aria-hidden
              className="absolute -left-3 -top-3 bottom-3 right-3 rounded-t-full rounded-b-3xl border border-gold md:-left-5 md:-top-5 md:bottom-5 md:right-5"
            />
            <Image
              src={photos.hallFloral.src}
              alt={photos.hallFloral.alt}
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
              Exposed brick, a timber-beamed ceiling and a grand ring
              chandelier, across two floors with lift access. Perfect for
              birthdays, engagements, anniversaries, baby showers, family
              gatherings and private celebrations of up to {site.capacity}{" "}
              guests.
            </p>
            <ul className="mt-10 grid gap-x-6 gap-y-5 sm:grid-cols-2">
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

      {/* Pricing */}
      <section id="pricing" className="relative scroll-mt-16 overflow-hidden">
        <Mandala className="absolute -right-40 top-10 size-[28rem] text-gold/15" />
        <div className="container-x relative pb-24 pt-8 md:pb-32 md:pt-12">
          <SectionTitle>Pricing</SectionTitle>
          <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
            {pricing.map((tier, i) => {
              const featured = i === 1;
              return (
                <div
                  key={tier.guests}
                  className={`relative flex flex-col rounded-3xl p-7 text-center md:p-8 ${
                    featured
                      ? "bg-forest text-cream shadow-xl md:-my-4 md:py-12"
                      : "border border-line bg-white"
                  }`}
                >
                  <span
                    className={`mx-auto grid size-14 place-items-center rounded-full ${
                      featured
                        ? "border border-gold/50 text-gold"
                        : "bg-sand text-brick"
                    }`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1M16 3.5a4 4 0 0 1 0 7M22 21v-1a6 6 0 0 0-4-5.6" />
                    </svg>
                  </span>
                  <p className={`eyebrow mt-5 ${featured ? "!text-gold" : ""}`}>
                    {tier.guests}
                  </p>
                  <p className="mt-3 font-display text-5xl font-semibold md:text-6xl">
                    {formatPrice(tier.price)}
                  </p>
                  <Divider className="mx-auto mt-5 text-gold" />
                  <ul
                    className={`mt-6 space-y-2.5 text-sm ${featured ? "text-cream/80" : "text-muted"}`}
                  >
                    <li>All amenities &amp; facilities included</li>
                    <li>Rooftop party hall + dining area</li>
                    <li>Red carpet entry &amp; sound setup</li>
                  </ul>
                  <Link
                    href="/book"
                    className={`btn mt-8 ${featured ? "bg-cream text-forest hover:bg-white" : "btn-primary"}`}
                  >
                    Book now
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="relative z-10 bg-sand py-24 md:py-32">
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
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
            {occasions.map((o) => (
              <div
                key={o.title}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl md:aspect-[4/3]"
              >
                <Image
                  src={o.photo.src}
                  alt={o.photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 33vw, 50vw"
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

      {/* Amenities */}
      <section
        id="amenities"
        className="relative isolate scroll-mt-16 overflow-hidden bg-forest py-24 text-cream md:py-32"
      >
        <Mandala className="absolute -left-40 -top-40 -z-10 size-[30rem] text-gold/15" />
        <Mandala className="absolute -bottom-40 -right-40 -z-10 size-[30rem] text-gold/15" />
        <CornerFlourish
          corner="bl"
          className="absolute bottom-8 left-4 size-16 text-gold/80 md:left-8 md:size-24"
        />
        <CornerFlourish
          corner="br"
          className="absolute bottom-8 right-4 size-16 text-gold/80 md:right-8 md:size-24"
        />
        <div className="container-x">
          <div className="text-center">
            <p className="eyebrow !text-gold">Included with every booking</p>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              Amenities &amp; Facilities
            </h2>
            <Divider className="mx-auto mt-5 text-gold" />
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-gold/25 bg-cream/[0.04] p-6 transition-colors hover:border-gold/50 md:p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full border border-gold/50 text-gold">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d={a.icon} />
                    </svg>
                  </span>
                  <h3 className="font-display text-2xl font-semibold">
                    {a.title}
                  </h3>
                </div>
                <ul className="mt-5 space-y-2.5 text-sm text-cream/80">
                  {a.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 bg-gold"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="scallop-up" />
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
            <dl className="mt-10 grid max-w-sm grid-cols-2 gap-4 border-t border-line pt-8">
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
            </dl>
            <Link href="/book" className="btn btn-primary mt-10">
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
                href="/book"
                className="btn bg-cream text-brick hover:bg-white"
              >
                Book the venue
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
