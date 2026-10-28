import { site } from "@/lib/site";

export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  `Hi ${site.name}, I'd like to know about booking the venue.`,
)}`;
const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

/** Call + WhatsApp: a sticky bottom bar on phones, floating buttons on larger screens. */
export function ContactBar() {
  return (
    <>
      {/* Phones */}
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-line bg-cream/95 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgb(42_28_21/0.3)] backdrop-blur-md md:hidden">
        <a
          href={telHref}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-brick text-sm font-semibold text-cream active:bg-brick-dark"
        >
          <PhoneIcon className="size-5" />
          Call now
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-white active:bg-[#1ebe5b]"
        >
          <WhatsAppIcon className="size-5" />
          WhatsApp
        </a>
      </div>

      {/* Tablets & desktop */}
      <div className="fixed bottom-6 right-6 z-30 hidden flex-col items-end gap-3 md:flex">
        <a
          href={telHref}
          aria-label={`Call ${site.phone}`}
          className="group flex items-center gap-3"
        >
          <span className="rounded-full bg-ink/85 px-3 py-1.5 text-xs font-medium text-cream opacity-0 shadow transition-opacity group-hover:opacity-100">
            {site.phone}
          </span>
          <span className="grid size-14 place-items-center rounded-full bg-brick text-cream shadow-lg ring-4 ring-cream transition-transform group-hover:scale-105">
            <PhoneIcon className="size-6" />
          </span>
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="group flex items-center gap-3"
        >
          <span className="rounded-full bg-ink/85 px-3 py-1.5 text-xs font-medium text-cream opacity-0 shadow transition-opacity group-hover:opacity-100">
            Chat on WhatsApp
          </span>
          <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-cream transition-transform group-hover:scale-105">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 [animation-duration:2.5s]"
            />
            <WhatsAppIcon className="relative size-7" />
          </span>
        </a>
      </div>
    </>
  );
}
