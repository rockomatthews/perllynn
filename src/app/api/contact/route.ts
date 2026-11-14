import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createHash } from "node:crypto";

export const runtime = "nodejs";
const jsonError = (error: string, status: number) =>
  NextResponse.json({ error }, { status });
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // Reject cross-origin browser posts; the server always controls sender and recipient.
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return jsonError("Please send your message from this website.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return jsonError("Invalid request format.", 415);
  if (Number(request.headers.get("content-length")) > 16000)
    return jsonError("Your message is too long.", 413);
  let body: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 16000)
      return jsonError("Your message is too long.", 413);
    body = JSON.parse(raw);
  } catch {
    return jsonError("Invalid request body.", 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body))
    return jsonError("Invalid request body.", 400);
  const fields = body as Record<string, unknown>;
  const field = (key: string) =>
    typeof fields[key] === "string" ? (fields[key] as string).trim() : "";
  if (field("website")) return jsonError("Unable to submit this inquiry.", 400);
  const name = field("fullName"),
    email = field("email"),
    company = field("company"),
    phone = field("phone"),
    message = field("message"),
    requestId = field("requestId");
  if (!name || name.length > 100 || /[\r\n]/.test(name))
    return jsonError("Please enter your name (up to 100 characters).", 400);
  if (email.length > 254 || !emailPattern.test(email))
    return jsonError("Please enter a valid email address.", 400);
  if (message.length < 10 || message.length > 5000)
    return jsonError(
      "Please enter a message between 10 and 5,000 characters.",
      400,
    );
  if (company.length > 150 || phone.length > 40)
    return jsonError("Company or phone is too long.", 400);
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      requestId,
    )
  )
    return jsonError("Please refresh the page and try again.", 400);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "rob@perllynn.com";
  if (!apiKey || !from)
    return jsonError(
      "Our contact form is temporarily unavailable. Please try again later.",
      503,
    );
  const text = `New Perllynn inquiry\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\nPhone: ${phone || "Not provided"}\n\n${message}`;
  // Include content in the key so a changed inquiry cannot collide with an earlier send.
  const digest = createHash("sha256")
    .update(JSON.stringify({ name, email, company, phone, message }))
    .digest("hex")
    .slice(0, 24);
  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send(
      {
        from,
        to: [to],
        replyTo: email,
        subject: `Perllynn inquiry: ${name}`,
        text,
      },
      { idempotencyKey: `perllynn-${requestId}-${digest}` },
    );
    if (error || !data?.id) {
      console.error("Contact delivery rejected", { name: error?.name });
      return jsonError(
        "We couldn’t send your message. Please try again in a moment.",
        502,
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    console.error("Contact delivery connection failed");
    return jsonError("We couldn’t connect. Please try again in a moment.", 502);
  }
}
