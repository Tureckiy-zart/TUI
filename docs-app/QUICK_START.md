# Quick Start Guide

Get the Tenerife UI documentation up and running in minutes.

## Prerequisites

- Node.js 20 or higher
- npm, pnpm, or yarn

## Installation

1. Navigate to the docs directory:

   ```bash
   cd docs-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Generate API documentation (optional, but recommended):
   ```bash
   npm run docs:generate-api
   ```

## Development

Start the development server:

```bash
npm run docs:dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run docs:dev` - Start development server
- `npm run docs:build` - Build for production
- `npm run docs:start` - Start production server
- `npm run docs:generate-api` - Generate API documentation
- `npm run docs:validate` - Validate documentation files

## Project Structure

- `app/` - Next.js pages and routes
- `components/` - React components
- `lib/` - Utilities and helpers
- `scripts/` - Build and generation scripts

## Common Tasks

### Adding a New Page

1. Create a new file in `app/`:

   ```bash
   touch app/my-page/page.tsx
   ```

2. Add navigation link in `components/layout/Sidebar.tsx`

### Documenting a Component

1. Ensure component exists in `src/components/`
2. Run `npm run docs:generate-api`
3. Documentation will be auto-generated

### Customizing Tokens

Token data is imported from `src/tokens/`. To update:

1. Modify token files in `src/tokens/`
2. Rebuild the library
3. Refresh documentation

## Troubleshooting

### Build Errors

- Ensure all dependencies are installed
- Check Node.js version (20+)
- Verify TypeScript configuration

### Styles Not Loading

- Check `app/globals.css` imports `@tenerife.music/ui/styles`
- Verify Tailwind configuration
- Rebuild the library if needed

### Components Not Found

- Run `npm run docs:generate-api`
- Check component paths in `src/components/`
- Verify exports in `src/index.ts`

## Getting Help

- Check `README.md` for detailed information
- See `CONTRIBUTING.md` for contribution guidelines
- Review `DEPLOYMENT.md` for deployment instructions
