"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { bookedDates, eventTypes, slots, type SlotId } from "@/lib/site";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS_AHEAD = 12;

const toKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const noop = () => () => {};

type Status =
  { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

export function BookingForm() {
  // Today's date only exists on the client; the server renders an empty calendar shell.
  const todayKey = useSyncExternalStore(
    noop,
    () => toKey(new Date()),
    () => null,
  );
  const today = useMemo(
    () => (todayKey ? new Date(`${todayKey}T00:00:00`) : null),
    [todayKey],
  );
  const [month, setMonth] = useState(0); // offset from current month
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<SlotId | null>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const view = useMemo(() => {
    if (!today) return null;
    const first = new Date(today.getFullYear(), today.getMonth() + month, 1);
    const daysInMonth = new Date(
      first.getFullYear(),
      first.getMonth() + 1,
      0,
    ).getDate();
    const cells: (Date | null)[] = Array(first.getDay()).fill(null);
    for (let d = 1; d <= daysInMonth; d++)
      cells.push(new Date(first.getFullYear(), first.getMonth(), d));
    return {
      label: first.toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      }),
      cells,
    };
  }, [today, month]);

  const prettyDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!date || !slot) {
      setStatus({
        state: "error",
        message: "Please choose a date and a time slot.",
      });
      return;
    }
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, date, slot }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      form.reset();
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
      <div className="rounded-3xl border border-line bg-white p-10 text-center md:p-16">
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
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <h2 className="mt-6 font-display text-4xl font-semibold">
          Request sent
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          We&rsquo;ve received your request for {prettyDate}. We&rsquo;ll call
          you shortly to confirm.
        </p>
        <button
          type="button"
          className="btn btn-primary mt-8"
          onClick={() => {
            setDate(null);
            setSlot(null);
            setStatus({ state: "idle" });
          }}
        >
          Book another date
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
      {/* Calendar */}
      <div className="min-w-0 self-start rounded-3xl border border-line bg-white p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <p className="font-display text-2xl font-semibold">
            {view?.label ?? " "}
          </p>
          <div className="flex gap-2">
            <MonthButton
              label="Previous month"
              disabled={month === 0}
              onClick={() => setMonth((m) => m - 1)}
              path="M15 6l-6 6 6 6"
            />
            <MonthButton
              label="Next month"
              disabled={month === MONTHS_AHEAD - 1}
              onClick={() => setMonth((m) => m + 1)}
              path="M9 6l6 6-6 6"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs font-medium uppercase tracking-wider text-muted">
          {WEEKDAYS.map((d) => (
            <span key={d} className="py-2">
              {d}
            </span>
          ))}
        </div>
        <div className="grid min-h-[17rem] grid-cols-7 gap-1">
          {view?.cells.map((d, i) => {
            if (!d) return <span key={i} />;
            const key = toKey(d);
            const past = today !== null && d < today;
            const booked = bookedDates.includes(key);
            const selected = key === date;
            return (
              <button
                key={key}
                type="button"
                disabled={past || booked}
                onClick={() => {
                  setDate(key);
                  if (status.state === "error") setStatus({ state: "idle" });
                }}
                aria-pressed={selected}
                aria-label={`${d.toDateString()}${booked ? ", booked" : ""}`}
                className={`aspect-square rounded-full text-sm transition-colors ${
                  selected
                    ? "bg-brick font-semibold text-cream"
                    : booked
                      ? "cursor-not-allowed text-muted/50 line-through"
                      : past
                        ? "cursor-not-allowed text-muted/35"
                        : "hover:bg-sand"
                }`}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-5 border-t border-line pt-5 text-xs text-muted">
          <Legend className="bg-brick" label="Selected" />
          <Legend className="border border-line bg-white" label="Available" />
          <Legend className="bg-muted/30" label="Booked" />
        </div>
      </div>

      {/* Details */}
      <form
        onSubmit={onSubmit}
        className="min-w-0 rounded-3xl border border-line bg-white p-5 sm:p-7"
      >
        <div className="rounded-2xl bg-sand px-5 py-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Selected date
          </p>
          <p className="mt-1 font-display text-2xl font-semibold">
            {prettyDate ?? "Pick a date"}
          </p>
        </div>

        <fieldset className="mt-6">
          <legend className="mb-3 text-sm font-semibold">Time slot</legend>
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
                <span className="mt-0.5 block text-[0.7rem] text-muted">
                  {s.time}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
          <Field label="Guests">
            <input
              name="guests"
              type="number"
              min={1}
              max={300}
              placeholder="e.g. 150"
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
          <Field label="Email" className="sm:col-span-2">
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
          {status.state === "sending" ? "Sending…" : "Request booking"}
        </button>
      </form>
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

function MonthButton({
  label,
  disabled,
  onClick,
  path,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  path: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:bg-sand disabled:opacity-30 disabled:hover:bg-transparent"
    >
      <svg
        width="18"
        height="18"
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

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`size-3 rounded-full ${className}`} />
      {label}
    </span>
  );
}
