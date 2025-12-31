# Theme Validator CLI

A standalone build-time CLI tool for validating themes against Theme Contract v1 for `@tenerife.music/ui`.

---

## Executive Summary

**Theme Validator enforces Theme Contract v1 compliance.**

- **Validates theme files** (CSS, JSON, TypeScript formats)
- **Enforces contract compliance** — invalid themes fail validation
- **CI-friendly exit codes** — blocks merge on failure
- **Standalone tool** — no UI library dependency required

---

> **Mental Model, Canonical Path, File Naming Convention, README vs Reality Guarantee** — see [Theme System — Contract & Tooling](../theme-contract/README.md)

---

## Overview

The Theme Validator checks theme files for compliance with Theme Contract v1. It validates completeness, token parity, theme ID format, and contract version without requiring the full UI library.

**Key Features:**

- Standalone (no UI library dependency)
- Supports CSS, JSON, and TypeScript theme formats
- Validates all required `--tm-*` tokens
- Checks theme ID format (`<palette>-<light|dark>`)
- Verifies contract version marker
- Human-readable and JSON output formats
- CI-friendly exit codes

## Installation

The tool is built into the monorepo. No additional installation required.

## Usage

### Basic Usage

```bash
# Validate a single CSS theme file
pnpm run theme:validate -- path/to/theme.css

# Validate multiple files
pnpm run theme:validate -- theme.ocean-light.css theme.ocean-dark.css

# Validate a JSON theme
pnpm run theme:validate -- theme.json

# Validate a TypeScript theme
pnpm run theme:validate -- theme.ts
```

### Options

| Option      | Short | Default | Description                      |
| ----------- | ----- | ------- | -------------------------------- |
| `--format`  | `-f`  | `human` | Output format: `human` or `json` |
| `--verbose` | `-v`  | `false` | Show detailed output             |
| `--help`    | `-h`  | -       | Show help message                |
| `--version` | -     | -       | Show version                     |

### Examples

#### Validate with Verbose Output

```bash
pnpm run theme:validate -- --verbose theme.css
```

Output:

```
Theme Validator - Theme Contract v1
────────────────────────────────────────

✓ theme.css VALID
   Theme: ocean-light (ocean-light)
   Contract: v1
   Tokens: complete

────────────────────────────────────────
✓ Summary: 1 passed, 0 failed, 1 total

All themes are valid and compliant with Theme Contract v1
```

#### JSON Output for CI

```bash
pnpm run theme:validate -- --format json theme.css
```

Output:

```json
{
  "success": true,
  "summary": {
    "total": 1,
    "passed": 1,
    "failed": 0
  },
  "results": [
    {
      "valid": true,
      "filePath": "/path/to/theme.css",
      "format": "css",
      "themeId": {
        "valid": true,
        "themeId": "ocean-light",
        "palette": "ocean",
        "mode": "light"
      },
      "contractVersion": {
        "valid": true,
        "version": "1",
        "expected": "1"
      },
      "tokens": {
        "complete": true,
        "requiredCount": "<N>",
        "foundCount": "<N>",
        "missing": [],
        "extra": [],
        "duplicates": []
      },
      "errors": [],
      "warnings": []
    }
  ]
}
```

#### Validation Failure

```bash
pnpm run theme:validate -- incomplete-theme.css
```

Output:

```
Theme Validator - Theme Contract v1
────────────────────────────────────────

✗ incomplete-theme.css INVALID
   Theme: custom-light (custom-light)
   Tokens: incomplete

   Errors:
   • Missing required token(s): --tm-link, --tm-link-hover, ...

────────────────────────────────────────
✗ Summary: 0 passed, 1 failed, 1 total

Theme validation failed. Fix the errors above.
```

## Exit Codes

| Code | Meaning                                                   |
| ---- | --------------------------------------------------------- |
| 0    | All themes are valid and compliant with Theme Contract v1 |
| 1    | Validation failed (missing tokens, invalid format, etc.)  |
| 2    | Input error (file not found, unsupported format)          |

## Supported Formats

### CSS Format

```css
:root[data-theme="ocean-light"] {
  --tm-contract-version: 1;
  --tm-bg: 210 4% 100%;
  --tm-fg: 0 0% 9%;
  --tm-primary: 210 40% 26%;
  --tm-primary-foreground: 0 0% 100%;
  /* ... all required tokens ... */
}
```

### JSON Format

```json
{
  "id": "ocean-light",
  "tokens": {
    "--tm-contract-version": "1",
    "--tm-bg": "210 4% 100%",
    "--tm-fg": "0 0% 9%",
    "--tm-primary": "210 40% 26%"
  }
}
```

Or flat format:

```json
{
  "--tm-contract-version": "1",
  "--tm-bg": "210 4% 100%",
  "--tm-fg": "0 0% 9%"
}
```

### TypeScript Format

```typescript
export const ocean_light_theme = {
  id: "ocean-light",
  tokens: {
    "--tm-contract-version": "1",
    "--tm-bg": "210 4% 100%",
    "--tm-fg": "0 0% 9%",
  },
} as const;
```

## Validation Rules

### Theme ID Format

Theme IDs must follow the pattern: `<palette>-<mode>`

- `<palette>`: lowercase alphanumeric, starting with letter
- `<mode>`: must be `light` or `dark`

Valid examples: `ocean-light`, `brand-dark`, `default-light`
Invalid examples: `Ocean-Light`, `theme`, `my_theme-light`

### Contract Version

Every theme must include:

```css
--tm-contract-version: 1;
```

### Required Tokens

All themes must define all required `--tm-*` tokens (see [Required Tokens Registry](../../src/FOUNDATION/tokens/required-tokens.ts)):

| Category     | Count | Examples                                                        |
| ------------ | ----- | --------------------------------------------------------------- |
| Background   | 5     | `--tm-bg`, `--tm-bg-elev-1`, `--tm-overlay`                     |
| Foreground   | 3     | `--tm-fg`, `--tm-fg-muted`, `--tm-fg-subtle`                    |
| Border       | 3     | `--tm-border`, `--tm-border-strong`, `--tm-separator`           |
| Focus/Shadow | 5     | `--tm-ring`, `--tm-shadow-1`, `--tm-shadow-2`                   |
| Primary      | 3     | `--tm-primary`, `--tm-primary-foreground`, `--tm-primary-hover` |
| Secondary    | 3     | `--tm-secondary`, `--tm-secondary-foreground`                   |
| Accent       | 3     | `--tm-accent`, `--tm-accent-foreground`                         |
| Destructive  | 3     | `--tm-destructive`, `--tm-destructive-foreground`               |
| Success      | 3     | `--tm-success`, `--tm-success-foreground`                       |
| Warning      | 3     | `--tm-warning`, `--tm-warning-foreground`                       |
| Info         | 3     | `--tm-info`, `--tm-info-foreground`                             |
| Muted        | 2     | `--tm-muted`, `--tm-muted-foreground`                           |
| Disabled     | 2     | `--tm-disabled`, `--tm-disabled-foreground`                     |
| Link         | 2     | `--tm-link`, `--tm-link-hover`                                  |
| Selection    | 2     | `--tm-selection-bg`, `--tm-selection-foreground`                |

### No Unknown Tokens

The validator will report errors for any `--tm-*` tokens that are not in the official registry.

### No Partial Themes

Partial themes are forbidden. All required tokens must be present.

## Common Mistakes & Anti-Patterns

### ❌ Validating Themes in Foundation Layer

**Wrong:**

```bash
# ❌ DO NOT DO THIS
pnpm theme:validate -- src/FOUNDATION/tokens/themes/theme.css
```

**Why:** Foundation layer is immutable and locked. Extension themes must live in Extension layer.

**Correct:** Validate themes in `src/EXTENSIONS/themes/`.

### ❌ Ignoring Validation Failures

**Wrong:**

```bash
# ❌ DO NOT DO THIS
pnpm theme:validate -- theme.css || true  # Ignoring failure
```

**Why:** Validation failures indicate contract violations. CI will block merge anyway.

**Correct:** Fix validation errors. Invalid themes cannot be committed (CI enforced).

### ❌ Using Validator at Runtime

**Wrong:**

```ts
// ❌ DO NOT DO THIS
import { validateTheme } from "@tenerife.music/ui/theme-validator";
const isValid = validateTheme(theme);
```

**Why:** Theme Validator is build-time only. UI library has zero validation logic.

**Correct:** Validate themes at build time or in CI. UI runtime consumes pre-validated CSS.

---

---

> **External User Flow** — see [Theme System — Contract & Tooling](../theme-contract/README.md#external-user-flow)

---

## CI Integration

Add to your CI pipeline:

```yaml
- name: Validate Themes
  run: pnpm run theme:validate -- --format json themes/*.css
```

Or check exit code:

```bash
pnpm run theme:validate -- theme.css || echo "Validation failed"
```

**CI Enforcement:**

- Exit code 0 → validation passed → merge allowed
- Exit code 1 → validation failed → merge blocked
- Exit code 2 → input error → merge blocked

## Architecture

```
tools/theme-validator/
├── bin/
│   └── theme-validate.ts     # CLI entrypoint
├── src/
│   ├── index.ts              # Module exports
│   ├── types.ts              # TypeScript types
│   ├── schema.ts             # Theme Contract v1 schema
│   ├── validator.ts          # Core validation logic
│   ├── errors.ts             # Error formatting
│   └── parsers/
│       ├── index.ts          # Parser exports
│       ├── css.ts            # CSS parser
│       ├── json.ts           # JSON parser
│       └── ts.ts             # TypeScript parser
├── tsconfig.json
└── README.md
```

## Related Documentation

- [Theme System — Contract & Tooling](../theme-contract/README.md) - **Main README** (start here)
- [Theme Generator](../theme-generator/README.md)
- [Theme System Architecture](../../docs/theming/THEME_SYSTEM_ARCHITECTURE.md)
- [Theme Extension Contract](../../docs/theming/THEME_EXTENSION_CONTRACT.md)
- [Token Naming Decision](../../docs/theming/TOKEN_NAMING_DECISION.md)
- [Required Tokens Registry](../../src/FOUNDATION/tokens/required-tokens.ts)

## License

MIT License - See repository LICENSE file.
