# Perllynn

Business strategy and financial management consulting one-pager. Built with Next.js and Material UI.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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

Vercel runs this automatically on each deploy. The site is statically generated and requires no environment variables for the initial deploy.
