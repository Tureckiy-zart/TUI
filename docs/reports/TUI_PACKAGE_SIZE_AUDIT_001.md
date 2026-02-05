# TUI_PACKAGE_SIZE_AUDIT_001 — Package Size Audit Report

**Task ID:** TUI_PACKAGE_SIZE_AUDIT_001  
**Date:** 2026-02-02  
**Package Version:** 3.0.4  
**Status:** Complete

---

## Executive Summary

This audit provides an objective analysis of the npm package `@tenerife.music/ui` unpacked size and runtime bundle impact. The goal is to understand what contributes to the reported ~3.63 MB unpacked size, separate DX weight (types, tooling) from runtime weight, and establish a data-driven basis for future optimization decisions.

**Key findings:**

- **Total unpacked size:** 3,633,892 bytes (~3.47 MB)
- **DX weight (types):** ~1.37 MB (37.6%) — `.d.ts` and `.d.cts` files; zero runtime impact
- **Runtime JS:** ~2.14 MB (58.8%) — ESM and CJS bundles; what bundlers actually use
- **CSS:** ~110 KB (3.0%) — `styles.css` (Tailwind-processed)
- **Runtime bundle impact (minimal consumer):** ~410 KB raw / ~109 KB gzip for `Button` + `Text` only
- **Sourcemaps:** Not included (0 bytes overhead)

---

## A1: NPM Tarball Inspection

### Method

- `pnpm build && pnpm pack` — local tarball
- Extracted to temporary directory
- Listed all files with `du -b`

### Files in Tarball

| File | Size (bytes) | Category |
|------|-------------|----------|
| dist/index.cjs | 704,533 | JS (CJS) |
| dist/index.mjs | 681,026 | JS (ESM) |
| dist/index.d.cts | 389,457 | Types (CJS declarations) |
| dist/index.d.ts | 389,451 | Types (ESM declarations) |
| dist/index-mSVbRT6m.d.cts | 216,811 | Types (chunk CJS) |
| dist/index-BJmxMoZt.d.ts | 216,810 | Types (chunk ESM) |
| dist/tokens/index.cjs | 187,872 | JS (tokens) |
| dist/tokens/index.mjs | 185,796 | JS (tokens) |
| dist/theme/index.cjs | 126,252 | JS (theme) |
| dist/theme/index.mjs | 125,030 | JS (theme) |
| dist/styles.css | 109,751 | CSS |
| dist/typography-DbkAGIlC.d.ts | 56,164 | Types |
| dist/typography-DbkAGIlC.d.cts | 56,164 | Types |
| dist/preset.cjs | 34,045 | JS (preset) |
| dist/preset.mjs | 33,873 | JS (preset) |
| dist/extensions/next/index.cjs | 30,660 | JS (Next extension) |
| dist/extensions/next/index.mjs | 29,715 | JS (Next extension) |
| dist/theme/index.d.ts | 10,164 | Types |
| dist/theme/index.d.cts | 10,166 | Types |
| dist/tokens/index.d.ts | 6,871 | Types |
| dist/tokens/index.d.cts | 6,873 | Types |
| dist/Link-DlH433PB.d.ts | 1,816 | Types |
| dist/Link-DlH433PB.d.cts | 1,816 | Types |
| dist/extensions/next/index.d.ts | 1,141 | Types |
| dist/extensions/next/index.d.cts | 1,142 | Types |
| dist/preset.d.ts | 496 | Types |
| dist/preset.d.cts | 496 | Types |
| dist/styles.d.ts | 13 | Types |
| dist/styles.d.cts | 13 | Types |
| dist/styles.mjs | 1 | JS (empty chunk) |
| dist/styles.cjs | 15 | JS (empty chunk) |
| package.json | 10,240 | Meta |
| README.md | 8,142 | Meta |
| LICENSE | 1,077 | Meta |

**Total:** 3,633,892 bytes

---

## A2: Unpacked Size Breakdown

### By File Extension

| Extension | Size (bytes) | % of Total |
|-----------|-------------|------------|
| .cjs | 1,083,377 | 29.8% |
| .mjs | 1,055,441 | 29.0% |
| .d.cts | 682,938 | 18.8% |
| .d.ts | 682,926 | 18.8% |
| .css | 109,751 | 3.0% |
| .json | 10,240 | 0.3% |
| .md | 8,142 | 0.2% |
| (LICENSE, no ext) | 1,077 | <0.1% |

### By Folder

| Folder | Size (bytes) | % of Total |
|--------|-------------|------------|
| dist/ (root) | 2,892,751 | 79.6% |
| dist/tokens/ | 387,412 | 10.7% |
| dist/theme/ | 271,612 | 7.5% |
| dist/extensions/next/ | 62,658 | 1.7% |
| package root | 19,459 | 0.5% |

### Top 10 Largest Files

| Rank | File | Size (bytes) |
|------|------|-------------|
| 1 | dist/index.cjs | 704,533 |
| 2 | dist/index.mjs | 681,026 |
| 3 | dist/index.d.cts | 389,457 |
| 4 | dist/index.d.ts | 389,451 |
| 5 | dist/index-mSVbRT6m.d.cts | 216,811 |
| 6 | dist/index-BJmxMoZt.d.ts | 216,810 |
| 7 | dist/tokens/index.cjs | 187,872 |
| 8 | dist/tokens/index.mjs | 185,796 |
| 9 | dist/theme/index.cjs | 126,252 |
| 10 | dist/theme/index.mjs | 125,030 |

---

## A3: TypeScript Types Weight Analysis

### Totals

| Metric | Value |
|--------|-------|
| Total .d.ts + .d.cts size | 1,365,864 bytes |
| As percentage of unpacked | 37.6% |
| Runtime impact | 0 (types are stripped at build time) |

### Largest Type Files

| File | Size (bytes) | Content |
|------|-------------|---------|
| index.d.ts / index.d.cts | ~389 KB each | Main barrel re-exports, component token types |
| index-BJmxMoZt.d.ts / index-mSVbRT6m.d.cts | ~217 KB each | Chunk declarations |
| typography-DbkAGIlC.d.ts / .d.cts | ~56 KB each | Color, typography, token unions |

### Observations

1. **Dual format:** ESM (`.d.ts`) and CJS (`.d.cts`) declarations are near-duplicates; each adds ~682 KB.
2. **Token unions:** `typography-DbkAGIlC` and main index contain extensive token union types and object literals (e.g. `FILE_UPLOAD_TOKENS`, `ColorScale`, `SurfaceColors`).
3. **Component tokens:** Inline object types for component tokens (e.g. dropzone heights, padding, radius) contribute significantly to type size.

---

## A4: Runtime Bundle Impact Test

### Setup

- **Consumer:** Minimal Vite 5 + React 18 project
- **Location:** `tools/audit-consumer/`
- **Import:** `import { Button, Text } from "@tenerife.music/ui"`
- **Build:** `vite build` (production, minified)

### Results

| Configuration | Entry JS (raw) | Entry JS (gzip) |
|---------------|----------------|-----------------|
| Baseline (React only, no TUI) | 142.73 KB | 45.81 KB |
| With Button + Text | 553.15 KB | 155.04 KB |
| **TUI runtime impact** | **~410 KB** | **~109 KB** |

### Interpretation

- Tree-shaking is active: the main `index.mjs` is ~664 KB, but only ~410 KB appears in the consumer bundle for two components.
- The remaining ~410 KB includes Button, Text, and their shared dependencies (e.g. CVA, `tailwind-merge`, `clsx`, token utilities, Radix primitives used by these components).

---

## A5: sideEffects & Entry-Points Audit

### sideEffects Configuration

```json
"sideEffects": [
  "**/*.css",
  "./dist/styles.css",
  "./dist/styles.mjs",
  "./dist/styles.cjs"
]
```

**Assessment:** Correct. CSS and style entry points are marked as side-effectful; JS is effectively side-effect-free, which supports tree-shaking.

### Entry Points

| Export | Path | Purpose |
|--------|------|---------|
| . | dist/index.{mjs,cjs,d.ts} | Main barrel (all components) |
| ./styles | dist/styles.css | Global CSS |
| ./preset | dist/preset.{mjs,cjs} | Tailwind preset |
| ./tokens | dist/tokens/index.{mjs,cjs} | Tokens only |
| ./theme | dist/theme/index.{mjs,cjs} | Theme only |
| ./extensions/next | dist/extensions/next/index.{mjs,cjs} | Next.js adapter |

**Assessment:** No subpath exports for individual components. All component imports go through the main barrel. ESM bundlers (Vite, Rollup) can tree-shake unused exports.

### styles Entry

`src/styles.ts` imports `globals.css` and `theme/global.css`. These are loaded only when consumers use `import "@tenerife.music/ui/styles"`. No implicit global CSS from the main entry.

---

## A6: Sourcemaps & Publish Artifacts Review

### Configuration

- `tsup.config.ts`: `sourcemap: false`
- Tarball: 0 `.map` files

**Assessment:** Sourcemaps are not published. No publish-only overhead from sourcemaps.

---

## Perceived Size vs Real Problem

### Perceived

- Unpacked size ~3.63 MB looks large for an npm package.

### Reality

| Factor | Contribution | Runtime Impact |
|--------|--------------|----------------|
| Type declarations (.d.ts, .d.cts) | ~1.37 MB (37.6%) | None |
| Dual format (ESM + CJS) | ~2x for JS and types | Only one format used per consumer |
| Main barrel index | ~1.39 MB JS (mjs + cjs) | Tree-shaken per consumer |
| Tokens, theme, preset | ~600 KB JS | Loaded only if imported |
| CSS | ~110 KB | Loaded only if `@tenerife.music/ui/styles` is imported |

### Runtime Impact (Measured)

- Minimal consumer (Button + Text): **~410 KB raw / ~109 KB gzip**
- Full library unpacked: ~3.47 MB, but consumers only bundle what they import.

---

## Decision-Ready Summary

### What Contributes to 3.47 MB Unpacked

1. **Types (37.6%):** DX-only; no runtime cost.
2. **Dual format:** ESM and CJS doubles JS and type size in the tarball; each consumer uses one.
3. **Token/theme system:** Substantial type and value exports for design tokens.
4. **Main barrel:** Single large entry point; tree-shaking works but depends on consumer setup.

### Confirmed

- No sourcemap overhead.
- `sideEffects` is configured correctly.
- Tree-shaking reduces runtime impact compared to unpacked size.

### Open for Future Optimization (No Recommendations Here)

- Relative importance of DX vs runtime weight.
- Feasibility of reducing dual-format output.
- Options for token/theme size (split, lazy load, etc.).
- Value of subpath exports for heavy components.

---

## Appendix: Audit Environment

- **Method:** Local `pnpm pack` after `pnpm build`
- **Consumer test:** Vite 5.4.21, React 18.3.1
- **Date:** 2026-02-02
