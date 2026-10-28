import { clean, isEmail, isPhone, sendOwnerEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body)
    return Response.json({ error: "Invalid request." }, { status: 400 });

  if (clean(body.company)) return Response.json({ ok: true });

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 20);
  const email = clean(body.email, 120);
  const message = clean(body.message, 2000);

  if (!name) return bad("Please enter your name.");
  if (!isPhone(phone)) return bad("Please enter a valid phone number.");
  if (email && !isEmail(email)) return bad("Please enter a valid email.");
  if (!message) return bad("Please write a message.");

  try {
    await sendOwnerEmail({
      subject: `New enquiry from ${name}`,
      heading: "New enquiry",
      replyTo: email || undefined,
      rows: [
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
          "We couldn't send your message right now. Please call us instead.",
      },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}

function bad(error: string) {
  return Response.json({ error }, { status: 400 });
}
