"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Photo } from "@/lib/gallery";

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((i) =>
        i === null ? i : (i + dir + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {photos.map((photo, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl"
            aria-label={`View photo: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4"
          onClick={close}
        >
          <Image
            src={photos[index].src}
            alt={photos[index].alt}
            sizes="100vw"
            className="max-h-[85vh] w-auto rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <LightboxButton
            label="Close"
            className="right-4 top-4"
            onClick={close}
            path="M6 6l12 12M18 6L6 18"
          />
          <LightboxButton
            label="Previous"
            className="left-3 top-1/2 -translate-y-1/2"
            onClick={() => step(-1)}
            path="M15 6l-6 6 6 6"
          />
          <LightboxButton
            label="Next"
            className="right-3 top-1/2 -translate-y-1/2"
            onClick={() => step(1)}
            path="M9 6l6 6-6 6"
          />
          <p className="absolute bottom-5 left-0 right-0 text-center text-sm text-cream/70">
            {index + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}

function LightboxButton({
  label,
  className,
  onClick,
  path,
}: {
  label: string;
  className: string;
  onClick: () => void;
  path: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute grid size-11 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20 ${className}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={path} />
      </svg>
    </button>
  );
}
