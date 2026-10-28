import type { Metadata } from "next";
import { PageHeader } from "@/components/ornaments";
import { photos } from "@/lib/gallery";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

const icons = {
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  chat: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  pin: "M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
};

export default function ContactPage() {
  const details = [
    {
      label: "Call",
      value: site.phone,
      href: `tel:${site.phone.replace(/\s/g, "")}`,
      icon: icons.phone,
    },
    {
      label: "WhatsApp",
      value: "Chat with us",
      href: `https://wa.me/${site.whatsapp}`,
      icon: icons.chat,
    },
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      icon: icons.mail,
    },
    {
      label: "Visit",
      value: site.address,
      href: site.mapLink,
      icon: icons.pin,
    },
  ];

  return (
    <>
      <PageHeader
        photo={photos.hallCeiling}
        eyebrow="Get in touch"
        title="Contact"
      />
      <section className="container-x py-16 md:py-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
          <div className="grid min-w-0 grid-cols-1 content-start gap-3">
            {details.map((d) => (
              <a
                key={d.label}
                href={d.href}
                target={d.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-brick/40"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sand text-brick">
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
                    <path d={d.icon} />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.18em] text-muted">
                    {d.label}
                  </span>
                  <span className="mt-0.5 block break-words font-medium">
                    {d.value}
                  </span>
                </span>
              </a>
            ))}
            <p className="px-1 pt-2 text-sm text-muted">Slots · {site.hours}</p>
          </div>

          <ContactForm />
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-line">
          <iframe
            title="Map to Cozy Corner"
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
            className="h-80 w-full md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
