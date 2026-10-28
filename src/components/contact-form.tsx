"use client";

import { useState } from "react";

type Status =
  { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
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

  return (
    <form
      onSubmit={onSubmit}
      className="min-w-0 rounded-3xl border border-line bg-white p-5 sm:p-8"
    >
      <p className="font-display text-3xl font-semibold">Send a message</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Name</span>
          <input name="name" required autoComplete="name" className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Phone</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91"
            className="field"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="field"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold">Message</span>
          <textarea
            name="message"
            required
            rows={5}
            className="field resize-none"
          />
        </label>
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
      {status.state === "sent" && (
        <p role="status" className="mt-4 text-sm font-medium text-green-700">
          Thank you! We&rsquo;ll get back to you soon.
        </p>
      )}

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="btn btn-primary mt-6 w-full sm:w-auto"
      >
        {status.state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
