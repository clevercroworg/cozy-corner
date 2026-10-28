import Image from "next/image";
import type { Photo } from "@/lib/gallery";

// Decorative line-art used across sections. All purely visual (aria-hidden).

type Corner = "tl" | "tr" | "bl" | "br";

const flip: Record<Corner, string> = {
  tl: "",
  tr: "-scale-x-100",
  bl: "-scale-y-100",
  br: "rotate-180",
};

/** Gold scrollwork for the corner of a frame. Drawn for top-left and mirrored for the others. */
export function CornerFlourish({
  corner,
  className = "",
}: {
  corner: Corner;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden
      className={`pointer-events-none ${flip[corner]} ${className}`}
    >
      <path d="M4 4H78M4 4V78" />
      <path d="M78 4c7 0 11 4 11 10s-4 9-9 9-7-3-7-6.5 2.5-5 4.5-5" />
      <path d="M4 78c0 7 4 11 10 11s9-4 9-9-3-7-6.5-7-5 2.5-5 4.5" />
      <path d="M13 13H44M13 13V44" />
      <path d="M44 13c-17 0-31 14-31 31" />
      <path d="M44 13q12-10 24 0q-12 10-24 0z" />
      <path d="M13 44q-10 12 0 24q10-12 0-24z" />
      <path d="M22 22q8-1 12 4M22 22q-1 8 4 12" />
      <circle cx="22" cy="22" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="4" cy="4" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Rangoli-style mandala in thin line art. */
export function Mandala({ className = "" }: { className?: string }) {
  const n = (count: number) => Array.from({ length: count }, (_, i) => i);
  return (
    <svg
      viewBox="-100 -100 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      aria-hidden
      className={`pointer-events-none ${className}`}
    >
      <circle r="98" />
      <circle r="88" />
      {n(36).map((i) => (
        <circle
          key={`d${i}`}
          cy="-93"
          r="1.4"
          fill="currentColor"
          stroke="none"
          transform={`rotate(${i * 10})`}
        />
      ))}
      {n(16).map((i) => (
        <g key={`p${i}`} transform={`rotate(${i * 22.5})`}>
          <path d="M0 -44C14 -58 12 -74 0 -86C-12 -74 -14 -58 0 -44Z" />
          <path d="M0 -50V-78" />
        </g>
      ))}
      {n(16).map((i) => (
        <path
          key={`s${i}`}
          d="M0 -46C6 -54 6 -62 0 -68C-6 -62 -6 -54 0 -46Z"
          transform={`rotate(${i * 22.5 + 11.25})`}
        />
      ))}
      <circle r="44" />
      <circle r="38" strokeDasharray="1 3" />
      {n(8).map((i) => (
        <path
          key={`i${i}`}
          d="M0 -12C10 -20 10 -30 0 -36C-10 -30 -10 -20 0 -12Z"
          transform={`rotate(${i * 45})`}
        />
      ))}
      <circle r="12" />
      <circle r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Marigold garland (toran) with hanging strings and mango leaves. */
export function Toran({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none block h-12 w-full ${className}`}
    >
      <defs>
        <pattern id={id} width="64" height="48" patternUnits="userSpaceOnUse">
          {/* swags */}
          <path
            d="M0 4Q16 22 32 4Q48 22 64 4"
            stroke="#e8a33a"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="0 6"
            fill="none"
          />
          <path
            d="M0 4Q16 22 32 4Q48 22 64 4"
            stroke="#d4572a"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="0 12"
            strokeDashoffset="3"
            fill="none"
          />
          {/* hanging string */}
          <path
            d="M32 6V30"
            stroke="#e8a33a"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="0 6"
          />
          <path
            d="M32 6V30"
            stroke="#d4572a"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="0 12"
            strokeDashoffset="3"
          />
          <path d="M32 33q6 7 0 14q-6-7 0-14z" fill="#6f8a4a" />
          <path d="M32 34v12" stroke="#4f6a33" strokeWidth="0.8" />
        </pattern>
      </defs>
      <line x1="0" y1="4" x2="100%" y2="4" stroke="#c39a4b" strokeWidth="2" />
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Small ornamental rule: line · diamond · line. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 16"
      width="140"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
      className={className}
    >
      <path d="M0 8H52M88 8H140" />
      <circle cx="57" cy="8" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="83" cy="8" r="1.6" fill="currentColor" stroke="none" />
      <path d="M70 1L77 8L70 15L63 8Z" />
      <path d="M70 5L73 8L70 11L67 8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Centered section heading with the ornamental rule under it. */
export function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="font-display text-4xl font-semibold md:text-5xl">
        {children}
      </h2>
      <Divider className="mx-auto mt-5 text-gold" />
    </div>
  );
}

/** Photo title band used at the top of inner pages. */
export function PageHeader({
  eyebrow,
  title,
  photo,
}: {
  eyebrow: string;
  title: string;
  photo: Photo;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-cream">
      <Image
        src={photo.src}
        alt=""
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/75 via-ink/55 to-ink/80" />
      <Mandala className="absolute -right-24 -top-10 size-96 text-gold/25 md:right-0" />
      <CornerFlourish
        corner="bl"
        className="absolute bottom-6 left-3 size-14 text-gold md:bottom-8 md:left-6 md:size-20"
      />
      <CornerFlourish
        corner="br"
        className="absolute bottom-6 right-3 size-14 text-gold md:bottom-8 md:right-6 md:size-20"
      />
      <div className="container-x relative pb-24 pt-36 md:pb-28 md:pt-44">
        <p className="eyebrow !text-gold">{eyebrow}</p>
        <h1 className="mt-3 font-display text-5xl font-semibold md:text-7xl">
          {title}
        </h1>
        <Divider className="mt-6 text-gold" />
      </div>
      <div className="scallop-up" />
    </section>
  );
}
