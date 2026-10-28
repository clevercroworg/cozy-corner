import { clean, isEmail, isPhone, sendOwnerEmail } from "@/lib/email";
import { bookedDates, eventTypes, slots } from "@/lib/site";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body)
    return Response.json({ error: "Invalid request." }, { status: 400 });

  // Honeypot: bots fill hidden fields.
  if (clean(body.company)) return Response.json({ ok: true });

  const date = clean(body.date, 10);
  const slot = slots.find((s) => s.id === body.slot);
  const name = clean(body.name, 100);
  const phone = clean(body.phone, 20);
  const email = clean(body.email, 120);
  const eventType = clean(body.eventType, 60);
  const guests = clean(body.guests, 6);
  const message = clean(body.message, 1500);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return bad("Please choose a date.");
  if (bookedDates.includes(date))
    return bad("Sorry, that date is already booked.");
  if (!slot) return bad("Please choose a time slot.");
  if (!name) return bad("Please enter your name.");
  if (!isPhone(phone)) return bad("Please enter a valid phone number.");
  if (email && !isEmail(email)) return bad("Please enter a valid email.");
  if (!eventTypes.includes(eventType))
    return bad("Please choose an event type.");

  const prettyDate = new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  try {
    await sendOwnerEmail({
      subject: `New booking request · ${prettyDate} · ${slot.label}`,
      heading: "New booking request",
      replyTo: email || undefined,
      rows: [
        ["Date", prettyDate],
        ["Slot", `${slot.label} (${slot.time})`],
        ["Event", eventType],
        ["Guests", guests],
        ["Name", name],
        ["Phone", phone],
        ["Email", email],
        ["Message", message],
      ],
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      {
        error:
          "We couldn't send your request right now. Please call us instead.",
      },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}

function bad(error: string) {
  return Response.json({ error }, { status: 400 });
}
