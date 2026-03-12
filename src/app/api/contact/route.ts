import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "rob@perllynn.com";
const FALLBACK_MESSAGE = "Something went wrong. Please try again.";

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return jsonError("Invalid request body.", 400);
  }

  const { fullName, phone, email } = body as Record<string, unknown>;
  const name = typeof fullName === "string" ? fullName.trim() : "";
  const emailStr = typeof email === "string" ? email.trim() : "";
  const phoneStr = typeof phone === "string" ? phone.trim() : "";

  if (!name || !emailStr) {
    return jsonError("Full name and email are required.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return jsonError("Email is not configured. Please try again later.", 503);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [TO_EMAIL],
      replyTo: emailStr,
      subject: `Perllynn contact: ${name}`,
      html: [
        "<h2>New contact form submission</h2>",
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(emailStr)}</p>`,
        `<p><strong>Phone:</strong> ${phoneStr ? escapeHtml(phoneStr) : "—"}</p>`,
      ].join(""),
    });

    if (error) {
      console.error("Resend error:", error);
      return jsonError("Failed to send message. Please try again.", 500);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return jsonError(FALLBACK_MESSAGE, 500);
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (c) => map[c] ?? c);
}
