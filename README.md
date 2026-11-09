# Ecommerce App

A React 19 dashboard built with TypeScript and Vite. The interface includes Overview, Orders, Products, Customers, Analytics, Marketing, Help Center, and Settings pages.

## Requirements

- Node.js `20.19+` or `22.12+`
- npm

## Run locally

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Verify before deployment

```bash
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`. `npm run preview` serves that build locally so it can be checked before publishing.

## Deploy to Vercel

### Git integration

1. Push the project to a Git provider supported by Vercel.
2. In Vercel, choose **Add New Project** and import the repository.
3. Keep the detected Vite settings, or set:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm ci`
4. Deploy. Vercel will build and publish the site; future pushes can trigger redeployments.

### Vercel CLI

```bash
npm ci
npm run build
npx vercel --prod
```

Follow the CLI prompts to link or create the Vercel project. If asked for the output directory, use `dist`.

## Deploy to Netlify

### Git integration

1. Push the project to a Git provider supported by Netlify.
2. In Netlify, choose **Add new site** and import the repository.
3. Set the build command to `npm run build` and the publish directory to `dist`.
4. Deploy the site.

### Netlify CLI

```bash
npm ci
npm run build
npx netlify deploy --prod --dir=dist
```

Follow the CLI prompts to log in and link the site.

## Data and persistence

This project currently uses in-memory sample data for products and campaigns. Changes made to that data are lost when the page is refreshed or the app is reopened. The selected color theme is saved in browser local storage. No Firebase project, authentication, or backend database is configured; connect and secure a database before using this dashboard for persistent or real store data.

## Notes

- The current sidebar navigation changes pages inside the React app; it does not use URL-based routes.
- No environment variables are required for the current static build.
- Do not put private credentials in client-side environment variables. Any `VITE_*` value is included in the browser bundle.
