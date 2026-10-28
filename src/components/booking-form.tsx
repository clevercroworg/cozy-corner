"use client";

import { useState } from "react";
import { WhatsAppIcon, whatsappHref } from "@/components/contact-bar";
import {
  eventTypes,
  formatPrice,
  pricing,
  site,
  slots,
  type SlotId,
} from "@/lib/site";

type Status =
  { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

export function BookingForm() {
  const [slot, setSlot] = useState<SlotId | null>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!slot) {
      setStatus({ state: "error", message: "Please choose a time slot." });
      return;
    }
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form)),
          slot,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      form.reset();
      setSlot(null);
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-white p-10 text-center md:p-16">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-sand text-brick">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <h2 className="mt-6 font-display text-4xl font-semibold">
          Request sent
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          We&rsquo;ll call you shortly to confirm availability and pricing.
        </p>
        <button
          type="button"
          className="btn btn-primary mt-8"
          onClick={() => setStatus({ state: "idle" })}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
      <form
        onSubmit={onSubmit}
        className="min-w-0 rounded-3xl border border-line bg-white p-5 sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Event date">
            <input name="date" type="date" required className="field" />
          </Field>
          <Field label="Event type">
            <select name="eventType" required defaultValue="" className="field">
              <option value="" disabled>
                Select
              </option>
              {eventTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>

        <fieldset className="mt-5">
          <legend className="mb-2 text-sm font-semibold">Time slot</legend>
          <div className="grid grid-cols-2 gap-2">
            {slots.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSlot(s.id)}
                aria-pressed={slot === s.id}
                className={`rounded-xl border px-2 py-3 text-center transition-colors ${
                  slot === s.id
                    ? "border-brick bg-brick/5 text-brick"
                    : "border-line hover:border-brick/50"
                }`}
              >
                <span className="block text-sm font-semibold">{s.label}</span>
                <span className="mt-0.5 block text-xs text-muted">
                  {s.time}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Guests">
            <input
              name="guests"
              type="number"
              min={1}
              max={site.capacity}
              placeholder={`Up to ${site.capacity}`}
              className="field"
            />
          </Field>
          <Field label="Name">
            <input name="name" required autoComplete="name" className="field" />
          </Field>
          <Field label="Phone">
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+91"
              className="field"
            />
          </Field>
          <Field label="Email">
            <input
              name="email"
              type="email"
              autoComplete="email"
              className="field"
            />
          </Field>
          <Field label="Message" className="sm:col-span-2">
            <textarea name="message" rows={3} className="field resize-none" />
          </Field>
          <input
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden
          />
        </div>

        {status.state === "error" && (
          <p role="alert" className="mt-4 text-sm text-brick">
            {status.message}
          </p>
        )}

        <button
          type="submit"
          disabled={status.state === "sending"}
          className="btn btn-primary mt-6 w-full"
        >
          {status.state === "sending" ? "Sending…" : "Send booking request"}
        </button>
      </form>

      <aside className="min-w-0 space-y-4 self-start">
        <div className="rounded-3xl bg-forest p-6 text-cream sm:p-8">
          <p className="eyebrow !text-gold">Quick booking</p>
          <p className="mt-3 font-display text-3xl font-semibold">
            Talk to us directly
          </p>
          <div className="mt-6 space-y-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn w-full bg-[#25D366] text-white hover:bg-[#1ebe5b]"
            >
              <WhatsAppIcon className="size-5" /> WhatsApp us
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="btn btn-ghost w-full text-cream"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-7">
          <p className="eyebrow">Pricing</p>
          <ul className="mt-4 divide-y divide-line">
            {pricing.map((tier) => (
              <li
                key={tier.guests}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <span className="text-sm text-muted">{tier.guests}</span>
                <span className="font-display text-2xl font-semibold">
                  {formatPrice(tier.price)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">
            All amenities &amp; facilities included.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line text-center">
          {slots.map((s) => (
            <div key={s.id} className="bg-white px-4 py-5">
              <dt className="eyebrow !text-muted">{s.label}</dt>
              <dd className="mt-1 font-display text-xl font-semibold">
                {s.time}
              </dd>
            </div>
          ))}
          <div className="bg-white px-4 py-5">
            <dt className="eyebrow !text-muted">Floating capacity</dt>
            <dd className="mt-1 font-display text-xl font-semibold">
              {site.capacity} guests
            </dd>
          </div>
          <div className="bg-white px-4 py-5">
            <dt className="eyebrow !text-muted">Chairs</dt>
            <dd className="mt-1 font-display text-xl font-semibold">
              {site.chairs}
            </dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}

function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}
