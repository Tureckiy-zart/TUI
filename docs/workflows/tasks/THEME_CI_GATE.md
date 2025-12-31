# Theme CI Gate

**Status:** Active  
**Date:** 2025-12-30  
**Priority:** P0  
**Layer:** Extension

---

## Purpose

Enforce Theme Contract v1 compliance at all stages of development through mandatory validation gates that block non-compliant themes from entering the codebase.

## Overview

The Theme CI Gate ensures:

1. **Pre-commit validation** — Individual theme files are validated before commit
2. **Parity checking** — All CSS themes define exactly the same token set
3. **CI pipeline blocking** — All themes are validated in CI before merge

**Key Principle:** No bypass flags, no exceptions. Invalid themes cannot reach `main`.

---

## Canonical Theme Locations

Themes must be located in these canonical directories:

| Location | Format | Description |
|----------|--------|-------------|
| `src/FOUNDATION/tokens/themes/` | `.css` | Generated CSS themes (via theme-generator) |
| `src/themes/` | `.ts` | TypeScript theme definitions |
| `themes/` | `.css`, `.json`, `.ts` | Extension themes (if exists) |

---

## Validation Scripts

### `theme:validate`

Validates a single theme file against Theme Contract v1.

```bash
# Validate a single file
pnpm theme:validate -- path/to/theme.css

# JSON output (for CI integration)
pnpm theme:validate -- --format json theme.css
```

**Exit codes:**
- `0` — Valid and compliant
- `1` — Validation failed
- `2` — Input error (file not found, etc.)

### `theme:validate:all`

Recursively scans all canonical theme directories and validates each file.

```bash
pnpm theme:validate:all
```

**Behavior:**
- Scans all canonical directories
- Excludes utility files (`index.ts`, `types.ts`, `--help.ts`)
- Reports summary of passed/failed validations
- Exits with code 1 if any validation fails

### `theme:parity-check`

Verifies all CSS themes define exactly the same set of tokens.

```bash
pnpm theme:parity-check
```

**Checks:**
- All themes have required tokens from `required-tokens.ts`
- No missing tokens
- No extra/undocumented tokens

---

## Pre-commit Gate

### How It Works

1. **lint-staged** runs `theme:validate` on any modified theme files
2. If CSS themes in `src/FOUNDATION/tokens/themes/` are staged, **parity check** runs
3. If either validation fails, the commit is **blocked**

### Configuration

**`.husky/pre-commit`:**
```bash
# lint-staged runs theme:validate for changed themes
pnpm lint-staged

# If CSS theme files are staged, run parity check
STAGED_THEME_CSS=$(git diff --cached --name-only --diff-filter=ACMR | grep -E '^src/FOUNDATION/tokens/themes/.*\.css$' || true)
if [ -n "$STAGED_THEME_CSS" ]; then
  pnpm theme:parity-check
fi
```

**`lint-staged.config.js`:**
```js
"src/FOUNDATION/tokens/themes/**/*.css": ["prettier --write", "pnpm theme:validate --"],
"src/themes/*.ts": ["pnpm theme:validate --"],
```

---

## CI Pipeline Gate

### Quality Workflow (`.github/workflows/quality.yml`)

Runs on: `push` to main/develop/feature/**, `pull_request` to main/develop

```yaml
- name: Theme Token Parity Check
  run: pnpm theme:parity-check
  continue-on-error: false

- name: Validate All Themes
  run: pnpm theme:validate:all
  continue-on-error: false
```

### Full CI Workflow (`.github/workflows/ci.yml`)

Runs on: `push` to main, `pull_request` to main

```yaml
- name: Theme Token Parity Check
  run: pnpm theme:parity-check

- name: Validate All Themes
  run: pnpm theme:validate:all
```

---

## Anti-Bypass Measures

The following anti-bypass measures are enforced:

| Measure | Enforcement |
|---------|-------------|
| No `continue-on-error: true` | All theme validation steps are blocking |
| No `--skip` flags | Scripts have no skip/bypass options |
| Strict exit codes | Exit 0 = success, Exit 1 = failure |
| No `SKIP_*` env vars | Pre-commit respects only `SKIP_PRE_COMMIT` for recursion guard |

---

## Troubleshooting

### "Theme validation failed"

1. Run `pnpm theme:validate -- <file>` for detailed errors
2. Check that all required tokens are present
3. Verify `--tm-contract-version: 1` is defined
4. Ensure theme ID matches format: `<palette>-<light|dark>`

### "Token parity check failed"

1. Compare your theme with `src/FOUNDATION/tokens/required-tokens.ts`
2. Add any missing tokens
3. Remove any extra tokens not in the registry

### Bypassing pre-commit (Emergency Only)

**NOT RECOMMENDED.** Use only for emergencies:

```bash
SKIP_PRE_COMMIT=1 git commit -m "emergency: bypass pre-commit"
```

Note: CI will still block non-compliant themes.

---

## Related Documentation

- [Theme Extension Contract](../../theming/THEME_EXTENSION_CONTRACT.md)
- [Theme System Architecture](../../theming/THEME_SYSTEM_ARCHITECTURE.md)
- [Theme Generator README](../../../tools/theme-generator/README.md)
- [Theme Validator README](../../../tools/theme-validator/README.md)
- [Theme Contract README](../../../tools/theme-contract/README.md)

---

## Maintenance

This gate is part of the Theme Contract v1 enforcement system. Any changes to:

- Theme Contract v1 specification
- Required tokens registry
- Theme file locations

...require corresponding updates to this gate configuration.

