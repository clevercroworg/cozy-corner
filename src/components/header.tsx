"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import logoMark from "@/assets/brand/logo-mark.png";
import { Mandala } from "@/components/ornaments";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/#amenities", label: "Amenities" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const sectionIds = ["amenities", "gallery"];

const tel = `tel:${site.phone.replace(/\s/g, "")}`;

// Scroll position as an external store so the header can react without effects.
function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}
const useScrolled = () =>
  useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 24,
    () => false,
  );

/** The home-page section currently in the middle of the screen, if any. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
          else setActive((cur) => (cur === entry.target.id ? null : cur));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);
  return enabled ? active : null;
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const section = useActiveSection(pathname === "/");
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return section === href.slice(2);
    if (href === "/") return pathname === "/" && section === null;
    return pathname === href;
  };

  // While the menu is open: lock page scroll, close on Escape or when the screen widens.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const wide = window.matchMedia("(min-width: 768px)");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", close);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", close);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
          solid
            ? "bg-cream/95 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
            : "bg-gradient-to-b from-ink/90 via-ink/60 to-transparent text-cream [text-shadow:0_1px_8px_rgb(0_0_0/0.45)]"
        }`}
      >
        <div className="container-x flex h-18 items-center justify-between gap-6 md:h-20">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <span className="grid h-12 w-[4.5rem] shrink-0 place-items-center rounded-xl bg-cream px-1.5 shadow-md ring-1 ring-gold/50 md:h-14 md:w-20">
              <Image
                src={logoMark}
                alt=""
                sizes="80px"
                preload
                className="h-auto w-full"
              />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[1.35rem] font-medium uppercase tracking-[0.08em] md:text-2xl">
                {site.name}
              </span>
              <span
                className={`mt-1.5 flex items-center gap-2 font-label text-[0.6rem] uppercase tracking-[0.3em] ${solid ? "text-muted" : "text-cream/85"}`}
              >
                <span aria-hidden className="h-px w-4 bg-current opacity-60" />
                {site.tagline}
                <span aria-hidden className="h-px w-4 bg-current opacity-60" />
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? solid
                        ? "text-brick"
                        : "text-gold"
                      : solid
                        ? "text-ink/75 hover:text-ink"
                        : "text-cream/85 hover:text-cream"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-4 -bottom-0.5 h-px origin-center bg-current transition-transform duration-300 ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={tel}
              aria-label={`Call ${site.phone}`}
              className={`grid size-11 place-items-center rounded-full border transition-colors ${
                solid
                  ? "border-line text-brick hover:bg-sand"
                  : "border-cream/40 text-cream hover:bg-cream/10"
              }`}
            >
              <PhoneIcon />
            </a>
            <Link href="/book" className="btn btn-primary !px-5 !py-3">
              Book now
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative grid size-11 place-items-center rounded-full md:hidden"
          >
            <span
              className={`absolute h-0.5 w-6 rounded bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[7px]"}`}
            />
            <span
              className={`absolute h-0.5 w-6 rounded bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute h-0.5 w-6 rounded bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[7px]"}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-18 z-40 overflow-y-auto bg-cream md:hidden"
      >
        <Mandala className="absolute -bottom-24 -right-24 size-80 text-gold/20" />
        <nav
          aria-label="Mobile"
          className="container-x relative flex min-h-full flex-col pb-10 pt-6"
        >
          <ul className="divide-y divide-line border-y border-line">
            {links.map((link, i) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline gap-4 py-5"
                  >
                    <span className="w-6 text-xs font-semibold text-gold">
                      0{i + 1}
                    </span>
                    <span
                      className={`font-display text-4xl font-semibold ${active ? "text-brick" : "text-ink"}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto space-y-3 pt-10">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full"
            >
              Book now
            </Link>
            <a href={tel} className="btn w-full border border-line text-ink">
              <PhoneIcon /> {site.phone}
            </a>
            <p className="pt-2 text-center text-xs text-muted">
              Slots · {site.hours}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}
