import { test } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../src/app/api/contact/route";

const valid = {
  fullName: "Alex Example",
  email: "alex@example.com",
  company: "Example",
  phone: "",
  message: "I would like to discuss an independent perspective.",
  website: "",
  requestId: "f3e7148d-3db9-4b5b-9c42-623c58cc3686",
};
const request = (body: unknown, origin = "https://perllynn.example") =>
  new Request("https://perllynn.example/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: JSON.stringify(body),
  });

test("contact endpoint validates requests and reports actual provider acceptance", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.CONTACT_FROM_EMAIL;
  const originalTo = process.env.CONTACT_TO_EMAIL;
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_FROM_EMAIL;
  try {
    await t.test("rejects foreign origins", async () =>
      assert.equal(
        (await POST(request(valid, "https://other.example"))).status,
        403,
      ),
    );
    await t.test("rejects invalid email and short message", async () => {
      assert.equal(
        (await POST(request({ ...valid, email: "invalid" }))).status,
        400,
      );
      assert.equal(
        (await POST(request({ ...valid, message: "short" }))).status,
        400,
      );
      assert.equal(
        (await POST(request({ ...valid, fullName: "Alex\r\nInjected" })))
          .status,
        400,
      );
    });
    await t.test("rejects bots and oversized requests", async () => {
      assert.equal(
        (await POST(request({ ...valid, website: "spam" }))).status,
        400,
      );
      assert.equal(
        (await POST(request({ ...valid, message: "a".repeat(17000) }))).status,
        413,
      );
    });
    await t.test("never claims success without email configuration", async () =>
      assert.equal((await POST(request(valid))).status, 503),
    );
    process.env.RESEND_API_KEY = "re_test_only";
    process.env.CONTACT_FROM_EMAIL = "Perllynn <contact@perllynn.example>";
    process.env.CONTACT_TO_EMAIL = "inquiries@perllynn.example";
    const keys: string[] = [];
    globalThis.fetch = async (_input, init) => {
      const payload = JSON.parse(String(init?.body));
      assert.equal(payload.from, process.env.CONTACT_FROM_EMAIL);
      assert.deepEqual(payload.to, ["inquiries@perllynn.example"]);
      assert.equal(payload.reply_to, valid.email);
      assert.ok(payload.text.includes(valid.message));
      keys.push(new Headers(init?.headers).get("idempotency-key")!);
      return new Response(JSON.stringify({ id: "provider-message-id" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    };
    await t.test(
      "sets reply-to and reuses the idempotency key on retries",
      async () => {
        assert.equal((await POST(request(valid))).status, 200);
        assert.equal((await POST(request(valid))).status, 200);
        assert.equal(keys[0], keys[1]);
        assert.ok(keys[0].startsWith("perllynn-"));
      },
    );
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          name: "validation_error",
          message: "sender rejected",
          statusCode: 403,
        }),
        { status: 403, headers: { "content-type": "application/json" } },
      );
    await t.test("provider rejection is an error, never a success", async () =>
      assert.equal((await POST(request(valid))).status, 502),
    );
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      RESEND_API_KEY: originalKey,
      CONTACT_FROM_EMAIL: originalFrom,
      CONTACT_TO_EMAIL: originalTo,
    })) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
