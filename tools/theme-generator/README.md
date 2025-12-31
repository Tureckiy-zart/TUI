# Theme Generator CLI

A build-time CLI tool for generating Theme Contract v1 compliant themes for `@tenerife.music/ui`.

---

## Executive Summary

**Theme Generator is a build-time compiler, not a runtime system.**

- **Produces CSS files** at build time only
- **UI library never generates themes** — it only consumes pre-generated CSS
- **All themes written to `src/EXTENSIONS/themes/`** — this is the only canonical location
- **Validation is mandatory** — invalid themes cannot be written (enforced, not advisory)
- **No bypass flags exist** — validation cannot be skipped

---

> **Mental Model, Canonical Path, File Naming Convention** — see [Theme System — Contract & Tooling](../theme-contract/README.md)

---

## Overview

The Theme Generator creates complete, validated CSS or TypeScript theme files from input parameters. It generates all required `--tm-*` tokens as specified in the Theme Contract v1.

**Key Features:**

- Generates complete theme token sets (all required tokens)
- Supports light and dark modes
- WCAG AA/AAA contrast compliance
- Automatic color scale generation
- Built-in validation against Theme Contract v1
- Parity checking with existing themes

## Installation

The tool is built into the monorepo. No additional installation required.

## Usage

### Basic Usage

```bash
# Generate a theme with both light and dark modes
pnpm run theme:generate -- --palette ocean --base-color "210 40% 50%" --modes light,dark
```

### Required Options

| Option         | Short | Description                                             |
| -------------- | ----- | ------------------------------------------------------- |
| `--palette`    | `-p`  | Palette name (e.g., "ocean", "brand")                   |
| `--base-color` | `-b`  | Base color in HSL format (e.g., "210 40% 50%")          |
| `--modes`      | `-m`  | Comma-separated modes: "light", "dark", or "light,dark" |

### Optional Options

| Option             | Short | Default                  | Description                        |
| ------------------ | ----- | ------------------------ | ---------------------------------- |
| `--accent-color`   | `-a`  | -                        | Accent color in HSL format         |
| `--contrast-level` | `-c`  | "AA"                     | WCAG contrast level: "AA" or "AAA" |
| `--output-format`  | `-f`  | "css"                    | Output format: "css" or "ts"       |
| `--output-dir`     | `-o`  | `src/EXTENSIONS/themes/` | Output directory                   |
| `--dry-run`        | -     | false                    | Preview without writing files      |
| `--help`           | `-h`  | -                        | Show help message                  |
| `--version`        | `-v`  | -                        | Show version                       |

## Examples

### Generate a Brand Theme

```bash
pnpm run theme:generate -- \
  --palette brand \
  --base-color "280 65% 59%" \
  --modes light,dark
```

### Generate with Custom Accent Color

```bash
pnpm run theme:generate -- \
  --palette custom \
  --base-color "200 50% 45%" \
  --accent-color "340 75% 55%" \
  --modes light,dark
```

### Generate Only Light Mode

```bash
pnpm run theme:generate -- \
  --palette minimal \
  --base-color "0 0% 50%" \
  --modes light
```

### Generate TypeScript Format

```bash
pnpm run theme:generate -- \
  --palette ocean \
  --base-color "210 40% 50%" \
  --modes light \
  --output-format ts
```

### Dry Run (Preview)

```bash
pnpm run theme:generate -- \
  --palette ocean \
  --base-color "210 40% 50%" \
  --modes light \
  --dry-run
```

### High Contrast (WCAG AAA)

```bash
pnpm run theme:generate -- \
  --palette accessible \
  --base-color "220 60% 40%" \
  --modes light,dark \
  --contrast-level AAA
```

## Output

### CSS Format (Default)

Generates files in `src/EXTENSIONS/themes/`:

```
theme.ocean-light.css
theme.ocean-dark.css
```

Example CSS content:

```css
:root[data-theme="ocean-light"] {
  --tm-contract-version: 1;
  --tm-bg: 210 4% 100%;
  --tm-bg-elev-1: 210 4% 98%;
  --tm-bg-elev-2: 210 4% 96%;
  --tm-fg: 0 0% 9%;
  --tm-primary: 210 40% 26%;
  --tm-primary-foreground: 0 0% 100%;
  /* ... all required tokens ... */
}
```

### TypeScript Format

When using `--output-format ts`, generates TypeScript files:

```typescript
export const ocean_light_theme = {
  id: "ocean-light",
  palette: "ocean",
  mode: "light",
  tokens: {
    "--tm-contract-version": "1",
    "--tm-bg": "210 4% 100%",
    // ... all tokens
  } as ThemeTokens,
} as const;
```

## Validation

Validation is **mandatory** and cannot be skipped. Theme files are written to disk **only after** all validations pass.

**Validation Flow:**

1. Generate themes in-memory
2. Run all validations
3. If validation fails → exit with error (no files written)
4. If validation passes → write files to disk
5. Run parity check on written files

**Validation Checks:**

1. **Completeness**: All required tokens from `required-tokens.ts` are present
2. **Contract Version**: Theme includes `--tm-contract-version: 1`
3. **No Extra Tokens**: No unknown `--tm-*` tokens (violation causes failure)
4. **Token Parity**: Matches the canonical token registry

**Theme ID Format:**

The palette name must be lowercase alphanumeric with hyphens, starting with a letter:

- ✅ Valid: `ocean`, `my-brand`, `theme2`
- ❌ Invalid: `Ocean`, `my_brand`, `2theme`, `MY-BRAND`

**Why Validation Cannot Be Skipped:**

This is a deliberate architectural decision to ensure:

- Invalid themes can never be released
- Theme Contract v1 compliance is enforced at build time
- Token registry is the single source of truth

## Color Generation Algorithm

### Base Color Input

The `--base-color` parameter accepts HSL format: `"H S% L%"`

- **H (Hue)**: 0-360 degrees
- **S (Saturation)**: 0-100%
- **L (Lightness)**: 0-100%

### Color Scale Generation

From the base color, the generator creates a full color scale (50-950):

| Step | Lightness | Usage                |
| ---- | --------- | -------------------- |
| 50   | 98%       | Lightest backgrounds |
| 100  | 96%       | Light backgrounds    |
| 200  | 90%       | Subtle backgrounds   |
| 300  | 80%       | Borders, disabled    |
| 400  | 65%       | Secondary elements   |
| 500  | 50%       | Default              |
| 600  | 44%       | Primary (light mode) |
| 700  | 35%       | Hover states         |
| 800  | 26%       | Active states        |
| 900  | 18%       | Dark text            |
| 950  | 10%       | Darkest              |

### Mode-Specific Mapping

**Light Mode:**

- Backgrounds use light end of scale (50-200)
- Text/foreground uses dark end (900-950)
- Primary color uses 800 level

**Dark Mode:**

- Backgrounds are dark (3-10% lightness)
- Text/foreground is light (90%+)
- Primary color uses 600 level

### Contrast Calculation

The generator calculates WCAG contrast ratios:

- **AA Level**: Minimum 4.5:1 for normal text
- **AAA Level**: Minimum 7:1 for normal text

Foreground colors are automatically selected (black or white) based on contrast requirements.

## Generated Token Categories

| Category     | Tokens | Description                                                                 |
| ------------ | ------ | --------------------------------------------------------------------------- |
| Background   | 5      | `--tm-bg`, `--tm-bg-elev-*`, `--tm-overlay`, `--tm-scrim`                   |
| Foreground   | 3      | `--tm-fg`, `--tm-fg-muted`, `--tm-fg-subtle`                                |
| Border       | 3      | `--tm-border`, `--tm-border-strong`, `--tm-separator`                       |
| Focus/Shadow | 5      | `--tm-ring`, `--tm-shadow-*`, `--tm-ring-offset`                            |
| Primary      | 3      | `--tm-primary`, `--tm-primary-foreground`, `--tm-primary-hover`             |
| Secondary    | 3      | `--tm-secondary`, `--tm-secondary-foreground`, `--tm-secondary-hover`       |
| Accent       | 3      | `--tm-accent`, `--tm-accent-foreground`, `--tm-accent-hover`                |
| Destructive  | 3      | `--tm-destructive`, `--tm-destructive-foreground`, `--tm-destructive-hover` |
| Success      | 3      | `--tm-success`, `--tm-success-foreground`, `--tm-success-hover`             |
| Warning      | 3      | `--tm-warning`, `--tm-warning-foreground`, `--tm-warning-hover`             |
| Info         | 3      | `--tm-info`, `--tm-info-foreground`, `--tm-info-hover`                      |
| Muted        | 2      | `--tm-muted`, `--tm-muted-foreground`                                       |
| Disabled     | 2      | `--tm-disabled`, `--tm-disabled-foreground`                                 |
| Link         | 2      | `--tm-link`, `--tm-link-hover`                                              |
| Selection    | 2      | `--tm-selection-bg`, `--tm-selection-foreground`                            |

---

> **README vs Reality Guarantee** — see [Theme System — Contract & Tooling](../theme-contract/README.md#readme-vs-reality-guarantee)

---

## Common Mistakes & Anti-Patterns

### ❌ Writing Themes into Foundation Layer

**Wrong:**

```bash
# ❌ DO NOT DO THIS
pnpm theme:generate -- --output-dir src/FOUNDATION/tokens/themes/
```

**Why:** Foundation layer is immutable and locked. Extension themes must live in Extension layer.

**Correct:** Use default path `src/EXTENSIONS/themes/` (or omit `--output-dir`).

### ❌ Trying to Skip Validation

**Wrong:**

```bash
# ❌ DO NOT DO THIS (this flag doesn't exist, but if it did...)
pnpm theme:generate -- --no-validate
```

**Why:** Validation is mandatory and cannot be skipped. No bypass flags exist.

**Correct:** Fix validation errors. Invalid themes cannot be written.

### ❌ Using Generator at Runtime

**Wrong:**

```ts
// ❌ DO NOT DO THIS
import { generateTheme } from "@tenerife.music/ui/theme-generator";
const theme = generateTheme({ palette: "custom", baseColor: "210 40% 50%" });
```

**Why:** Theme Generator is build-time only. UI library has zero generation logic.

**Correct:** Generate themes at build time, import CSS at runtime.

### ❌ Defining Themes Outside Canonical Path

**Wrong:**

```bash
# ❌ DO NOT DO THIS
pnpm theme:generate -- --output-dir ./custom/themes/
```

**Why:** Only `src/EXTENSIONS/themes/` is canonical. Other paths violate architecture.

**Correct:** Use default path `src/EXTENSIONS/themes/`.

---

## Troubleshooting

### Invalid HSL Format

```
Error: Invalid HSL format: "210,40%,50%"
```

**Solution:** Use spaces, not commas: `"210 40% 50%"`

### Missing Tokens

```
Error: Missing 3 required token(s): --tm-link, --tm-link-hover, --tm-selection-bg
```

**Solution:** This is a bug in the generator. Please report it.

### Parity Check Failed

```
Error: Parity check failed
```

**Solution:** The generated theme has tokens that don't match the canonical registry. Check for extra or modified tokens.

### Permission Denied

```
Error: EACCES: permission denied
```

**Solution:** Check write permissions for the output directory.

---

> **External User Flow** — see [Theme System — Contract & Tooling](../theme-contract/README.md#external-user-flow)

---

## Known Limitations / Technical Debt

### Token Names in Generator (F1) — Accepted Technical Debt

**Location:** `src/token-mapper.ts:329-408`

**Issue:** Token names are hardcoded in the `generateThemeTokens()` function rather than being dynamically derived from `REQUIRED_THEME_TOKENS`.

**Why This Is Acceptable:**

1. **Validation Prevents Drift:** The generator runs `validateTheme()` before writing any files, which checks against `REQUIRED_THEME_TOKENS`. Token drift is caught at generation time, not at runtime.

2. **CI Parity Check Provides Second Layer:** CI runs `theme:parity-check` which compares generated themes against the canonical token registry. Any mismatch causes CI failure.

3. **Drift Is Impossible in Practice:** The combination of validation + CI gates makes token drift impossible. If `REQUIRED_THEME_TOKENS` changes, `token-mapper.ts` must be updated, but validation will catch any mistakes before themes are written.

**Why This Is Not a Blocker:**

- Safety is enforced at generation time (validation)
- Safety is enforced at CI time (parity check)
- No runtime risk exists (themes are pre-generated)
- Manual synchronization is acceptable for build-time tooling

**Status:** ✅ **Accepted as technical debt** — The validation + CI gates make drift impossible in practice.

**Future Improvement:** Consider generating the token structure dynamically from `REQUIRED_THEME_TOKENS` to eliminate manual synchronization. This is a code quality improvement, not a safety requirement.

**Reference:** See `docs/reports/theme-tooling-audit/06_no_duplication_scan.md` for detailed analysis.

---

## Architecture

```
tools/theme-generator/
├── bin/
│   └── theme-generate.ts     # CLI entrypoint
├── src/
│   ├── types.ts              # TypeScript types
│   ├── token-mapper.ts       # Color → Token mapping
│   ├── generator.ts          # CSS/TS generation
│   ├── validator.ts          # Validation logic
│   └── index.ts              # Module exports
└── README.md                 # This file
```

## Related Documentation

- [Theme System — Contract & Tooling](../theme-contract/README.md) - **Main README** (start here)
- [Theme System Architecture](../../docs/theming/THEME_SYSTEM_ARCHITECTURE.md)
- [Theme Extension Contract](../../docs/theming/THEME_EXTENSION_CONTRACT.md)
- [Token Naming Decision](../../docs/theming/TOKEN_NAMING_DECISION.md)
- [Required Tokens Registry](../../src/FOUNDATION/tokens/required-tokens.ts)

## License

MIT License - See repository LICENSE file.
