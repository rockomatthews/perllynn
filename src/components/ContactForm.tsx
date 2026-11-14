"use client";
import { useRef, useState, type FormEvent } from "react";
export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const requestId = useRef<string | null>(null);
  const busy = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setStatus("sending");
    setMessage("");
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    requestId.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, requestId: requestId.current }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "We couldn’t send your message. Please try again.",
        );
      setStatus("success");
      setMessage(
        "Thank you for reaching out. Your message is with Perllynn, and we’ll be in touch.",
      );
      form.current?.reset();
      requestId.current = null;
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "The connection timed out. Please try again.",
      );
    } finally {
      busy.current = false;
    }
  }
  return (
    <form
      ref={form}
      className="contact-form"
      onSubmit={submit}
      onChange={() => {
        if (!busy.current) requestId.current = null;
      }}
    >
      <div className="form-row">
        <label>
          Your name <span aria-hidden="true">*</span>
          <input
            name="fullName"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Full name"
          />
        </label>
        <label>
          Email address <span aria-hidden="true">*</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Company <span className="optional">(optional)</span>
          <input
            name="company"
            autoComplete="organization"
            maxLength={150}
            placeholder="Company name"
          />
        </label>
        <label>
          Phone <span className="optional">(optional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            placeholder="Phone number"
          />
        </label>
      </div>
      <label>
        What would you like to discuss? <span aria-hidden="true">*</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          placeholder="A little context goes a long way."
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="form-privacy">
        Your details will only be used to respond to your inquiry.
      </p>
      <button
        className="button button-dark"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send your message"}
        <span aria-hidden="true">+</span>
      </button>
      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
