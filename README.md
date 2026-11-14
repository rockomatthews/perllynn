# Perllynn

A one-page Next.js site for Perllynn’s independent advisory network in Chicago. Black and white, restrained gold, Chicago photography, and a scroll-driven Theatre.js introduction.

The supplied logo is preserved byte-for-byte and stays static. No rotated image is presented as a 3D model. The opening transitions from **Independent minds. Clearer decisions.** to **Your interests. Our only agenda.** as you scroll; scrolling back reverses the sequence. Reduced-motion visitors receive a static, fully accessible opening.

![Perllynn desktop preview](docs/preview.png)

## Run locally

```sh
npm ci
cp .env.example .env.local
npm run dev
```

## Deploy to Vercel

Import `rockomatthews/perllynn`. The project root is the repository root; Vercel detects Next.js. Keep the default build and output settings. The committed `vercel.json` also specifies the framework and build command.

Set the following **server-side** environment variables in Vercel, then redeploy:

| Variable             | Value                                                                           |
| -------------------- | ------------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | An API key from your Resend account                                             |
| `CONTACT_FROM_EMAIL` | A sender on your verified domain, for example `Perllynn <contact@perllynn.com>` |
| `CONTACT_TO_EMAIL`   | Your inquiry inbox; defaults to the existing `rob@perllynn.com` recipient       |

Optionally set `SITE_URL` to your final custom domain (including `https://`) for social-preview URLs. Vercel’s production hostname is used automatically otherwise.

Verify your sending domain in Resend before using the production form. The visitor’s address is set as `replyTo`; it is never used as the sender. No keys belong in `NEXT_PUBLIC_` variables or committed files.

The form collects name, email, optional company/phone, and a message. It includes server validation, payload limits, same-origin browser checks, a honeypot, idempotent sends, accessible status messages, and retry-friendly form state. Requests without email configuration return an honest unavailable error. Provider errors never display a success message.

After configuring Vercel, submit one inquiry and verify receipt in your inbox. Automated tests mock the provider; they do not send real email or establish live delivery. This repository does not claim a verified Vercel deployment.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Browser tests use installed Google Chrome (`channel: chrome`) and start the production server on port 3107. They cover desktop/mobile layouts, scroll progression and reversal, reduced motion, anchor navigation, and contact success/error states. Screenshots are saved locally in the ignored `artifacts/` directory.

## Editing

- `src/app/page.tsx` — business content and page sections.
- `src/app/globals.css` — responsive layout and brand styling.
- `src/animation/intro.theatre.json` — authored Theatre.js sequence.
- `src/components/Hero.tsx` — scroll-to-timeline binding; no background animation loop.
- `src/app/api/contact/route.ts` — Resend endpoint.
- `public/brand/CREDITS.md` — original logo fingerprint and photography source/license.

The former `/about` and `/services` URLs redirect into the one-page experience. Existing repository history is preserved.
