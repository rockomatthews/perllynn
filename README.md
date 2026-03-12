# Perllynn

Business strategy and financial management consulting one-pager. Built with Next.js and Material UI.

## Local development

```bash
npm install
cp .env.example .env.local
# Edit .env.local and add your Resend API key (see Contact form below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Contact form (email to rob@perllynn.com)

The footer contact form sends emails via [Resend](https://resend.com). To enable it:

1. Sign up at [resend.com](https://resend.com) and create an API key.
2. **Local:** Add `RESEND_API_KEY=re_xxxx...` to `.env.local`.
3. **Vercel:** In your project → Settings → Environment Variables, add `RESEND_API_KEY` with the same value.

Resend’s free tier allows 100 emails/day. Until the key is set, the form will show an error when submitted.

## Deploy on Vercel

The app is ready to deploy on [Vercel](https://vercel.com).

### Option 1: Connect a Git repository

1. Push this project to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the repository. Vercel will detect Next.js and use the default build settings.
4. Click **Deploy**. No extra configuration needed.

### Option 2: Deploy with the Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts (link to an existing project or create a new one). Use the default build command and output directory.

### Build

The production build runs:

```bash
npm run build
```

Vercel runs this automatically on each deploy. For the contact form to send email, add the `RESEND_API_KEY` environment variable in your Vercel project settings.
