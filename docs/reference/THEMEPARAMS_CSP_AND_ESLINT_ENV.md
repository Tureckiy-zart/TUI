# ThemeParams CSP Nonce and ESLint Rules Env

## Document Classification

Type: Tooling / Infrastructure  
Scope: Runtime theming (FOUC prevention) and ESLint execution context  
Non-goal: This document does NOT define UI styling rules or relax any UI enforcement policies.

## Purpose

This document explains two runtime integration points:

- `ThemeParams` CSP nonce support for inline `<style>` and `<script>`
- `TUI_UI_SOURCE_ROOTS` environment variable for ESLint rule context detection

---

## ThemeParams CSP Nonce

`ThemeParams` renders inline `<style>` and `<script>` to prevent FOUC on the initial request. If your application enforces a CSP that disallows inline scripts/styles without a nonce, you must pass a nonce to `ThemeParams`.

These inline `<style>` tags are generated exclusively by `ThemeParams` at the document level and are NOT related to JSX `style` props on UI components.

### API

```tsx
ThemeParams({ nonce?: string })
```

### Example

```tsx
import { ThemeParams } from "@/EXTENSIONS/next/ThemeParams";

export default function RootLayout() {
  const nonce = /* read from CSP middleware/headers */;
  return (
    <html>
      <head>
        <ThemeParams nonce={nonce} />
      </head>
      <body>...</body>
    </html>
  );
}
```

If CSP does not require a nonce, you can omit the prop.

---

## TUI_UI_SOURCE_ROOTS

Some custom ESLint rules need to distinguish **library source** from **consumer code**. This is done by checking whether a file is inside the repository root and inside one of the configured source roots.

### Default Roots

If no environment variable is provided:

- `src`
- `packages/ui`

### Override via Env

Set `TUI_UI_SOURCE_ROOTS` as a comma-separated list of paths, relative to the repository root:

```
TUI_UI_SOURCE_ROOTS="src,packages/ui,packages/tui"
```

### Notes

- The check uses `process.cwd()` as the repository root.
- Only files within the repo root are treated as library sources.
- Keep paths relative and avoid trailing slashes.
