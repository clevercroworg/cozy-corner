import Link from "next/link";
import { LogoMark, Toran } from "@/components/ornaments";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative bg-ink text-cream/80">
      <Toran id="footer-toran" className="opacity-90" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex items-start gap-4">
          <LogoMark className="h-14 w-11 shrink-0 text-gold" />
          <div>
            <p className="font-display text-3xl font-semibold text-cream">
              {site.name}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-gold">
              {site.tagline} · {site.city}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p className="eyebrow !text-gold">Visit</p>
          <p>
            <a
              href={site.mapLink}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cream"
            >
              {site.address}
            </a>
          </p>
          <p>Slots · {site.hours}</p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="eyebrow !text-gold">Reach us</p>
          <p>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="hover:text-cream"
            >
              {site.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${site.email}`} className="hover:text-cream">
              {site.email}
            </a>
          </p>
          <p className="flex gap-4 pt-2">
            <Link href="/availability" className="hover:text-cream">
              Availability
            </Link>
            <Link href="/contact" className="hover:text-cream">
              Contact
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className="container-x py-5 text-xs text-cream/50">
          © 2026 {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
