# Deployment Guide

This guide explains how to deploy Tenerife UI Documentation to Vercel.

## Prerequisites

- Vercel account
- GitHub repository with the code
- Node.js 20+ installed locally (for testing)

## Local Testing

Before deploying, test the build locally:

```bash
cd docs-app
npm install
npm run docs:build
npm run docs:start
```

Visit `http://localhost:3000` to verify everything works.

## Vercel Deployment

### Option 1: Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `docs-app`
   - **Build Command**: `npm install && npm run docs:build`
   - **Output Directory**: `.next`
5. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd docs-app
vercel

# Follow the prompts
```

## Environment Variables

No environment variables are required for basic deployment.

## Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Continuous Deployment

The documentation automatically deploys when you push to the `main` branch (if configured in Vercel).

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Verify Node.js version (should be 20+)
- Check build logs in Vercel dashboard

### Styles Not Loading

- Ensure `@tenerife.music/ui/styles` is imported in `app/globals.css`
- Verify Tailwind configuration

### Components Not Found

- Run `npm run docs:generate-api` to generate component documentation
- Check that component files exist in `src/components/`

## GitHub Pages (Alternative)

If you prefer GitHub Pages:

1. Build the documentation:

   ```bash
   cd docs-app
   npm run docs:build
   ```

2. Export static files:

   ```bash
   npm run docs:export  # Add this script if needed
   ```

3. Configure GitHub Pages to serve from `docs-app/out` directory
