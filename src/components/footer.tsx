import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/brand/logo.png";
import { Toran } from "@/components/ornaments";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative bg-ink text-cream/80">
      <Toran id="footer-toran" className="opacity-90" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="inline-block rounded-2xl bg-cream px-6 py-5 shadow-lg ring-1 ring-gold/40"
          >
            <Image
              src={logo}
              alt={`${site.name} ${site.tagline}`}
              sizes="224px"
              className="h-auto w-48 md:w-56"
            />
          </Link>
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
            <Link href="/book" className="hover:text-cream">
              Book now
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
