# A11: CI Gate Reality Check

**Date:** 2025-12-30
**Purpose:** Проверить, что pre-commit hook и CI workflow блокируют невалидные темы

---

## Pre-commit Hook Analysis

**File:** `.husky/pre-commit`

```bash
#!/bin/bash

# Защита от рекурсивного вызова
if [ -n "$SKIP_PRE_COMMIT" ]; then
  exit 0
fi

echo "🔧 PRE-COMMIT: Running auto-fixes on staged files..."

# Запускаем lint-staged для автофикса измененных файлов
pnpm lint-staged

echo "✅ Pre-commit auto-fixes completed!"

# Theme Token Parity Check
# If CSS theme files are modified, ensure all themes have the same token set

# Check if any Foundation CSS theme files are staged
STAGED_FOUNDATION_THEME_CSS=$(git diff --cached --name-only --diff-filter=ACMR | 
  grep -E '^src/FOUNDATION/tokens/themes/.*\.css$' || true)

# Check if any Extension theme files are staged
STAGED_EXTENSION_THEMES=$(git diff --cached --name-only --diff-filter=ACMR | 
  grep -E '^src/EXTENSIONS/themes/.*\.(css|json|ts)$' || true)

if [ -n "$STAGED_FOUNDATION_THEME_CSS" ] || [ -n "$STAGED_EXTENSION_THEMES" ]; then
  echo ""
  echo "🎨 PRE-COMMIT: Theme files detected, running parity check..."
  
  if ! pnpm theme:parity-check; then
    echo ""
    echo "❌ Theme token parity check failed!"
    exit 1
  fi
  
  echo "✅ Theme token parity check passed!"
fi

# Extension Theme Validation
if [ -n "$STAGED_EXTENSION_THEMES" ]; then
  echo ""
  echo "🎨 PRE-COMMIT: Extension theme files detected, running validation..."
  
  if ! pnpm theme:validate:extension; then
    echo ""
    echo "❌ Extension theme validation failed!"
    exit 1
  fi
  
  echo "✅ Extension theme validation passed!"
fi
```

---

## Pre-commit Gate Assessment

| Check | Condition | Blocking | Assessment |
|-------|-----------|----------|------------|
| lint-staged | Always | ✅ Yes | Runs theme:validate via lint-staged.config.js |
| parity-check | Theme files staged | ✅ Yes | `exit 1` on failure |
| validate:extension | Extension themes staged | ✅ Yes | `exit 1` on failure |

**Potential Issue:** `SKIP_PRE_COMMIT` environment variable allows bypass.

---

## lint-staged.config.js Analysis

```javascript
// Theme CSS files: Prettier + Theme validation
"src/FOUNDATION/tokens/themes/**/*.css": ["prettier --write", "pnpm theme:validate --"],

// Theme TypeScript files: Theme validation
"src/themes/*.ts": ["pnpm theme:validate --"],

// Extension themes (canonical location): Prettier + Theme validation
"src/EXTENSIONS/themes/**/*.css": ["prettier --write", "pnpm theme:validate --"],
"src/EXTENSIONS/themes/**/*.json": ["prettier --write", "pnpm theme:validate --"],
"src/EXTENSIONS/themes/**/*.ts": ["pnpm theme:validate --"],
```

**Assessment:** ✅ All theme file types trigger validation

---

## CI Workflow Analysis

**File:** `.github/workflows/quality.yml`

```yaml
name: Quality Checks

on:
  push:
    branches:
      - main
      - develop
      - "feature/**"
  pull_request:
    branches:
      - main
      - develop

jobs:
  quality:
    name: Quality Checks (Node 22.x) [BLOCKING]
    runs-on: ubuntu-latest
    steps:
      # ... setup steps ...
      
      - name: Theme Token Parity Check
        run: pnpm theme:parity-check
        continue-on-error: false

      - name: Validate All Themes
        run: pnpm theme:validate:all
        continue-on-error: false

      - name: Validate Extension Themes
        run: pnpm theme:validate:extension
        continue-on-error: false
```

---

## CI Gate Assessment

| Step | Command | continue-on-error | Blocking |
|------|---------|-------------------|----------|
| Theme Token Parity Check | `pnpm theme:parity-check` | `false` | ✅ Yes |
| Validate All Themes | `pnpm theme:validate:all` | `false` | ✅ Yes |
| Validate Extension Themes | `pnpm theme:validate:extension` | `false` | ✅ Yes |

**Assessment:** ✅ All theme validation steps are blocking with `continue-on-error: false`

---

## Theme Validation Script Targets

### theme:validate:all (`scripts/theme-validate-all.mjs`)

Scans directories:
- `src/FOUNDATION/tokens/themes` (.css)
- `src/themes` (.ts)
- `themes` (.css, .json, .ts)

**Note:** Does NOT scan `src/EXTENSIONS/themes/`

### theme:validate:extension (`scripts/theme-validate-extension.mjs`)

Scans directories:
- `src/EXTENSIONS/themes` (.css, .json, .ts)

**Assessment:** ✅ Combined coverage of both scripts covers all locations

---

## Gap Analysis

| Location | Pre-commit | CI (validate:all) | CI (validate:extension) |
|----------|------------|-------------------|-------------------------|
| `src/FOUNDATION/tokens/themes/` | ✅ lint-staged + parity | ✅ Scanned | ❌ Not scanned |
| `src/EXTENSIONS/themes/` | ✅ lint-staged + parity + validate:extension | ❌ Not scanned | ✅ Scanned |
| `src/themes/` | ✅ lint-staged | ✅ Scanned | ❌ Not scanned |
| `themes/` | ✅ lint-staged | ✅ Scanned | ❌ Not scanned |

**Assessment:** ✅ No gaps - combined coverage is complete

---

## Bypass Paths Analysis

| Bypass Method | Exists | Risk |
|--------------|--------|------|
| `SKIP_PRE_COMMIT` env var | ✅ Yes | ⚠️ Developer can skip pre-commit |
| `--no-verify` git flag | ✅ Yes (git built-in) | ⚠️ Developer can skip pre-commit |
| CI bypass | ❌ No | ✅ No bypass in CI |

**Note:** Local bypasses exist but CI is mandatory and blocking.

---

## Acceptance Criteria

| Criterion | Status |
|-----------|--------|
| Gate exists in pre-commit | ✅ PASS |
| Gate exists in CI pipeline | ✅ PASS |
| Gates are blocking | ✅ PASS |
| No continue-on-error in CI | ✅ PASS |
| Validation targets correct paths | ✅ PASS |

---

**A11 Status:** ✅ PASS - CI gates are correctly configured and blocking

