# Tooling Decisions

This document records intentional tooling-level decisions made for the Tenerife UI library project.

---

## Storybook Sourcemaps Disabled

**Decision Date:** 2025-12-12  
**Status:** Active  
**Affected Files:** `.storybook/main.ts`, `tsconfig.storybook.json`

### Decision

Sourcemaps are explicitly disabled in the Storybook Vite build pipeline to eliminate excessive console warnings ("Can't resolve original location of error").

### Rationale

1. **Console Noise Reduction**: Storybook's dev server generates numerous sourcemap-related warnings that clutter the console and make debugging harder.
2. **Development Experience**: Sourcemaps are not needed for Storybook's development workflow - developers can use browser DevTools for debugging.
3. **Build Performance**: Disabling sourcemaps slightly improves Storybook build performance.
4. **Scope Isolation**: This decision only affects Storybook's build configuration and does NOT impact the library build sourcemaps (configured in `tsup.config.ts`).

### Implementation

Sourcemaps are disabled in multiple places:

1. **Vite Configuration** (`.storybook/main.ts`):
   - `config.build.sourcemap = false` - Disables Vite build sourcemaps
   - `config.esbuild.sourcemap = false` - Disables esbuild sourcemaps
   - `config.optimizeDeps.esbuildOptions.sourcemap = false` - Disables sourcemaps in dependency optimization
   - Defensive overrides ensure environment variables (e.g., `VITE_SOURCEMAP`) cannot re-enable sourcemaps

2. **TypeScript Configuration** (`tsconfig.storybook.json`):
   - `"sourceMap": false` - Disables TypeScript sourcemap generation for Storybook
   - `"declarationMap": false` - Disables declaration map generation

### Impact

- ✅ Clean Storybook console without sourcemap warnings
- ✅ No impact on library build sourcemaps
- ✅ No impact on component functionality
- ✅ No impact on Storybook stories or documentation

### Known Limitations

Some sourcemap-related warnings may still appear during the build process if TypeScript attempts to use sourcemaps for error reporting. These warnings are informational and do not affect functionality. The warnings are significantly reduced compared to the previous configuration.

### Reversal

If sourcemaps are needed for Storybook in the future:

1. Remove the `sourcemap: false` settings from `.storybook/main.ts` `viteFinal` hook
2. Set `"sourceMap": true` in `tsconfig.storybook.json`

---

