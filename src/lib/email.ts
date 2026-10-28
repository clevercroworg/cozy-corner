import "server-only";

type Row = [label: string, value: string];

const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

/** Sends an email to the hall owner through Resend. */
export async function sendOwnerEmail({
  subject,
  heading,
  rows,
  replyTo,
}: {
  subject: string;
  heading: string;
  rows: Row[];
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_EMAIL;
  if (!apiKey || !to) {
    throw new Error(
      "Email is not configured. Set RESEND_API_KEY and OWNER_EMAIL.",
    );
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#2a1c15">
      <h2 style="color:#a3452a;margin:0 0 16px">${escape(heading)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .filter(([, v]) => v)
          .map(
            ([k, v]) => `<tr>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#7a6558;white-space:nowrap;vertical-align:top">${escape(k)}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${escape(v)}</td>
            </tr>`,
          )
          .join("")}
      </table>
    </div>`;
  const text = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "Cozy Corner <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: replyTo,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend error ${res.status}: ${await res.text()}`);
  }
}

export function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
export const isPhone = (s: string) => s.replace(/[^\d]/g, "").length >= 10;
