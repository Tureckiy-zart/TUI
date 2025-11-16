# Publishing Guide

This guide explains how to publish the `@tenerife.music/ui` package to npm.

## Prerequisites

1. **npm account**: Make sure you have an npm account and are logged in
   ```bash
   npm login
   ```

2. **Build the package**: The `prepublishOnly` script will automatically build before publishing, but you can test it manually:
   ```bash
   npm run build
   ```

## Publishing Steps

### 1. Update Version

Update the version in `package.json` following [Semantic Versioning](https://semver.org/):
- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features (backward compatible)
- **Major** (1.0.0 → 2.0.0): Breaking changes

Or use npm version commands:
```bash
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0
```

### 2. Test the Build

Ensure everything builds correctly:
```bash
npm run clean
npm run build
npm run typecheck
```

### 3. Verify Package Contents

Check what will be included in the package:
```bash
npm pack --dry-run
```

This will show you exactly what files will be published.

### 4. Publish to npm

#### First Time Publishing
```bash
npm publish --access public
```

The `--access public` flag is required for scoped packages (packages starting with `@`).

#### Subsequent Publishes
```bash
npm publish
```

### 5. Verify Publication

Check that your package is available on npm:
- Visit: https://www.npmjs.com/package/@tenerife.music/ui
- Or check via CLI: `npm view @tenerife.music/ui`

## Package Configuration

The package is configured with:

- **Entry Points**:
  - Main: `dist/index.cjs` (CommonJS)
  - Module: `dist/index.mjs` (ES Modules)
  - Types: `dist/index.d.ts` (TypeScript definitions)
  - Styles: `dist/styles.css` (CSS file)

- **Exports**:
  - `@tenerife.music/ui` - Main package export
  - `@tenerife.music/ui/styles` - CSS styles
  - `@tenerife.music/ui/tailwind.config` - Tailwind configuration

- **Peer Dependencies**: React 18+ or 19+

- **Included Files**: Only `dist/` and `stories/` directories are published (as specified in `package.json` `files` field)

## Usage After Publishing

Users can install the package with:

```bash
npm install @tenerife.music/ui
```

Then import components:

```tsx
import { Button, Card } from '@tenerife.music/ui';
import '@tenerife.music/ui/styles';
```

## Troubleshooting

### "Package name already exists"
- Make sure you're the owner of the package
- Check if the version number needs to be incremented

### "You do not have permission"
- Verify you're logged in: `npm whoami`
- For scoped packages, ensure you have the correct permissions

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check that TypeScript compilation passes: `npm run typecheck`

## CI/CD Integration

You can automate publishing using GitHub Actions or similar CI/CD tools. The `prepublishOnly` script ensures the package is built and type-checked before publishing.

