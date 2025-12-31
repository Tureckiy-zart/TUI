# Theme System — Contract & Tooling

This repository provides a **production-grade theme system** built around a **strict theme contract**, **CLI tooling**, and **CI enforcement**.

It is designed for **long-living UI platforms**, white-label products, and client-safe theming.

---

## Executive Summary

**Theme Tooling is a build-time compiler, not a runtime system.**

- **Theme Generator** produces CSS files at build time
- **UI library never generates themes** — it only consumes pre-generated CSS
- **All themes must live in `src/EXTENSIONS/themes/`** — this is the only canonical location
- **Validation is mandatory** — invalid themes cannot be committed (CI enforced)
- **No bypass flags exist** — validation cannot be skipped

This system enforces Theme Contract v1 compliance through CLI tooling and CI gates. The UI runtime has zero theme generation logic.

---

## Mental Model

Understanding how Theme Tooling works:

```
┌─────────────────────────────────────────────────────────────┐
│ Theme Generator (CLI)                                        │
│   Input: palette name, HSL color, modes                      │
│   Output: CSS files → src/EXTENSIONS/themes/                │
│   Behavior: Produces files, enforces contract                │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ Theme Validator (CLI)                                        │
│   Input: CSS/JSON/TS theme files                            │
│   Output: Validation report (pass/fail)                     │
│   Behavior: Enforces contract compliance                     │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ UI Runtime                                                   │
│   Input: Pre-generated CSS files                            │
│   Output: Theme switching via data-theme                    │
│   Behavior: Consumes CSS only, no generation logic          │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ CI (Final Authority)                                         │
│   Input: All theme files in repository                      │
│   Output: Pass/fail (blocks merge on failure)               │
│   Behavior: Enforces contract, prevents invalid commits     │
└─────────────────────────────────────────────────────────────┘
```

**Key Points:**

- Generator → produces files (build-time only)
- Validator → enforces contract (can run anytime)
- UI → consumes CSS only (runtime, no generation)
- CI → final authority (blocks invalid themes)

---

## Canonical Path: `src/EXTENSIONS/themes/`

**⚠️ CRITICAL:** `src/EXTENSIONS/themes/` is the **only canonical location** for theme files.

**Rules:**

- ✅ **ONLY** `src/EXTENSIONS/themes/` is allowed
- ❌ **NEVER** write themes to `src/FOUNDATION/tokens/themes/` (Foundation path is explicitly forbidden)
- ❌ **NEVER** write themes outside `src/EXTENSIONS/themes/`
- ❌ Any other path is considered an **error**

**Enforcement:**

- Default output directory is hardcoded to `src/EXTENSIONS/themes/`
- CI validates that themes exist only in canonical location
- Pre-commit hooks check canonical path
- Writing to Foundation layer violates Extension architecture

**Why This Matters:**

- Extension themes live in Extension layer (architectural requirement)
- Foundation layer is immutable (locked)
- CI gates enforce path compliance
- Any deviation breaks the architecture contract

---

## README vs Reality Guarantee

**This README describes actual behavior, not hypothetical or intended behavior.**

**Guarantee:**

- Every claim in this README is **verified** by audit artifacts (`docs/reports/theme-tooling-audit/`)
- Every behavior described is **enforced** by CI, not advisory
- Any discrepancy between README and actual behavior is a **bug** (report it)

**Evidence:**

- Audit artifacts (A1-A12) document actual CLI behavior
- CI workflow enforces all safety guarantees
- Pre-commit hooks enforce validation rules
- Parity checker enforces token registry compliance

**If you find a discrepancy:**

1. Check audit artifacts: `docs/reports/theme-tooling-audit/08_final_verdict.md`
2. Run verification: `pnpm theme:generate -- --dry-run`
3. Report as bug if README contradicts actual behavior

**This README is executable documentation aligned with audited reality.**

---

## Who is this for?

### ✅ You are in the right place if you want to:

- create new themes (light / dark)
- generate brand or client palettes
- validate custom themes
- guarantee theme correctness in CI
- safely consume themes in your UI

### ❌ This is NOT:

- a runtime theme generator
- a UI helper library
- a styling framework
- a token playground

> **Themes are generated at build time, not at runtime.**

---

## High-level overview

The system is split into **three clearly separated parts**:

1. **Theme Contract**
   A locked specification that defines:
   - required tokens
   - naming rules
   - theme ID format
   - contract versioning

2. **Theme Tooling (CLI)**
   - Theme Generator — creates themes
   - Theme Validator — validates themes
   - Parity Checker — prevents token drift

3. **UI Runtime**
   - consumes generated CSS
   - switches themes via `data-theme`
   - contains **no generation logic**

---

## TL;DR — How themes are created

```text
Theme Generator (CLI)
        ↓
In-memory theme generation
        ↓
Theme Contract validation (mandatory)
        ↓
Token parity check
        ↓
Files written to src/EXTENSIONS/themes/
        ↓
UI imports CSS and switches via data-theme
```

If validation fails → **no files are written**.

---

## Creating a new theme (step by step)

> **Quick Reference:** See [External User Flow](#external-user-flow) for complete end-to-end guide.

### 1. Go to project root

```bash
cd /path/to/your/project
pnpm install
```

---

### 2. Choose a base color (HSL)

Format: `"H S% L%"`

Examples:

- Blue: `"210 40% 50%"`
- Purple: `"280 65% 59%"`
- Green: `"142 60% 45%"`
- Red: `"0 80% 50%"`

Helpful tools:

- [https://hslpicker.com/](https://hslpicker.com/)
- any RGB → HSL converter

---

### 3. Choose a palette name

Rules:

- lowercase only
- letters, numbers, hyphens
- must start with a letter

Valid:

```text
ocean
brand
my-theme
theme-2024
```

Invalid:

```text
Ocean
my_theme
2theme
```

---

### 4. (Recommended) Preview with dry-run

```bash
pnpm run theme:generate -- \
  --palette my-theme \
  --base-color "210 40% 50%" \
  --modes light,dark \
  --dry-run
```

What happens:

- full theme is generated in memory
- contract validation runs
- parity check runs
- **no files are written**

---

### 5. Generate the theme

Light + dark:

```bash
pnpm run theme:generate -- \
  --palette my-theme \
  --base-color "210 40% 50%" \
  --modes light,dark
```

Light only:

```bash
pnpm run theme:generate -- \
  --palette my-theme \
  --base-color "210 40% 50%" \
  --modes light
```

With accent color:

```bash
pnpm run theme:generate -- \
  --palette my-theme \
  --base-color "210 40% 50%" \
  --accent-color "340 75% 55%" \
  --modes light,dark
```

High-contrast (WCAG AAA):

```bash
pnpm run theme:generate -- \
  --palette accessible \
  --base-color "220 60% 40%" \
  --contrast-level AAA \
  --modes light,dark
```

---

### 6. What happens internally

1. Colors are derived from the base HSL
2. **All required tokens are generated**
3. Theme Contract v1 validation runs:
   - completeness
   - no extra `--tm-*` tokens
   - theme ID format
   - contract version

4. Token parity check runs
5. **Only if everything passes → files are written**

---

### 7. Resulting files

```text
src/EXTENSIONS/themes/
├── my-theme-light.css
└── my-theme-dark.css
```

Example content:

```css
:root[data-theme="my-theme-light"] {
  --tm-contract-version: 1;

  --tm-background: 210 4% 100%;
  --tm-background-elevated-1: 210 4% 98%;
  --tm-background-elevated-2: 210 4% 96%;

  --tm-foreground: 0 0% 9%;

  --tm-primary: 210 40% 26%;
  --tm-primary-foreground: 0 0% 100%;

  /* ... all required tokens ... */
}
```

---

### 8. Validate themes manually (optional)

Single file:

```bash
pnpm run theme:validate -- src/EXTENSIONS/themes/my-theme-light.css
```

All themes:

```bash
pnpm run theme:validate -- src/EXTENSIONS/themes/*.css
```

> CI and pre-commit hooks already enforce this automatically.

---

## Using a theme in your UI

### Import the CSS

```ts
import "@/EXTENSIONS/themes/my-theme-light.css";
```

### Activate via `data-theme`

```html
<html data-theme="my-theme-light"></html>
```

or dynamically:

```ts
document.documentElement.setAttribute("data-theme", "my-theme-dark");
```

---

## Important rules (read this)

### 🚫 Do NOT:

- import theme contract packages in app code
- generate themes at runtime
- override `--tm-*` tokens manually
- define themes outside `src/EXTENSIONS/themes/`

### ✅ Always:

- use the CLI generator
- rely on validation
- treat themes as **immutable artifacts**
- switch only via `data-theme`

---

## Common Mistakes & Anti-Patterns

### ❌ Trying to Generate Themes at Runtime

**Wrong:**

```ts
// ❌ DO NOT DO THIS
import { generateTheme } from "@tenerife.music/ui/theme-generator";
const theme = generateTheme({ palette: "custom", baseColor: "210 40% 50%" });
```

**Why:** Theme Tooling is build-time only. UI library has zero generation logic.

**Correct:** Generate themes at build time, import CSS at runtime.

### ❌ Writing Themes into Foundation Layer

**Wrong:**

```bash
# ❌ DO NOT DO THIS
pnpm theme:generate -- --output-dir src/FOUNDATION/tokens/themes/
```

**Why:** Foundation layer is immutable and locked. Extension themes must live in Extension layer.

**Correct:** Use default path `src/EXTENSIONS/themes/` (or omit `--output-dir`).

### ❌ Overriding `--tm-*` Tokens Manually

**Wrong:**

```css
/* ❌ DO NOT DO THIS */
:root[data-theme="custom-light"] {
  --tm-primary: 255 0 0; /* Overriding core token */
}
```

**Why:** Core `--tm-*` tokens are part of Theme Contract v1. Overriding breaks contract compliance.

**Correct:** Use extension namespace (`--tmx-*`) for custom tokens, or generate a new theme.

### ❌ Skipping Validation

**Wrong:**

```bash
# ❌ DO NOT DO THIS (this flag doesn't exist, but if it did...)
pnpm theme:generate -- --no-validate
```

**Why:** Validation is mandatory and cannot be skipped. No bypass flags exist.

**Correct:** Fix validation errors. Invalid themes cannot be committed (CI enforced).

### ❌ Using Theme Contract Packages in App Code

**Wrong:**

```ts
// ❌ DO NOT DO THIS
import { REQUIRED_THEME_TOKENS } from "@tenerife.music/ui/theme-contract";
```

**Why:** Theme Contract is build-time only. App code should consume CSS, not contract packages.

**Correct:** Import generated CSS files, use `data-theme` attribute for switching.

### ❌ Defining Themes Outside Canonical Path

**Wrong:**

```bash
# ❌ DO NOT DO THIS
pnpm theme:generate -- --output-dir ./custom/themes/
```

**Why:** Only `src/EXTENSIONS/themes/` is canonical. Other paths violate architecture.

**Correct:** Use default path `src/EXTENSIONS/themes/`.

---

## External User Flow

Complete step-by-step guide for external users:

### Step 1: Install Dependencies

```bash
cd /path/to/your/project
pnpm install
```

**What this does:** Installs Theme Tooling CLI commands (`theme:generate`, `theme:validate`).

### Step 2: Generate Theme

```bash
pnpm run theme:generate -- \
  --palette my-brand \
  --base-color "210 40% 50%" \
  --modes light,dark
```

**What this does:**

1. Generates theme in memory
2. Runs Theme Contract v1 validation
3. Runs token parity check
4. **Only if all checks pass** → writes files to `src/EXTENSIONS/themes/`

**Output:**

```
src/EXTENSIONS/themes/
├── theme.my-brand-light.css
└── theme.my-brand-dark.css
```

### Step 3: Validate Output (Optional)

```bash
pnpm run theme:validate -- src/EXTENSIONS/themes/theme.my-brand-light.css
```

**What this does:** Validates theme file against Theme Contract v1 (redundant if generator passed, but useful for manual verification).

### Step 4: Commit → CI

```bash
git add src/EXTENSIONS/themes/
git commit -m "Add my-brand theme"
git push
```

**What CI does:**

1. Runs `theme:validate` on all theme files
2. Runs `theme:parity-check` to ensure token consistency
3. **Blocks merge if validation fails**

**Result:** Invalid themes cannot be merged (CI enforced).

### Step 5: Use via `data-theme`

**Import CSS:**

```ts
import "@/EXTENSIONS/themes/theme.my-brand-light.css";
```

**Activate theme:**

```html
<html data-theme="my-brand-light"></html>
```

or dynamically:

```ts
document.documentElement.setAttribute("data-theme", "my-brand-dark");
```

**What this does:** UI runtime consumes pre-generated CSS. No generation logic runs at runtime.

---

## CI & Safety guarantees

- invalid themes **cannot be committed**
- CI fails on any contract violation
- token drift is impossible
- Foundation layer remains immutable

---

## Known Limitations / Technical Debt

### Token Names in Generator (F1) — Accepted Technical Debt

**Location:** `tools/theme-generator/src/token-mapper.ts:329-408`

**Issue:** All 46 token names are hardcoded in the `generateThemeTokens()` function rather than being dynamically derived from `REQUIRED_THEME_TOKENS`.

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

## Summary

What you get:

- 🔒 strict contract
- 🧱 immutable foundation
- 🧪 enforced validation
- 🧠 simple runtime
- 🚀 scalable theming

This system is built to **scale safely**, not to experiment dangerously.
