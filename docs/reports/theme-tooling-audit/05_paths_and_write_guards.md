# A3: Path Contract Audit

**Date:** 2025-12-30
**Purpose:** Проверить дефолтные output paths и убедиться, что темы пишутся в EXTENSION, а не Foundation

---

## Default Output Path in Generator

**File:** `tools/theme-generator/src/generator.ts:30`

**Before:**
```typescript
const DEFAULT_OUTPUT_DIR = "src/FOUNDATION/tokens/themes";
```

**After (2025-12-31):**
```typescript
const DEFAULT_OUTPUT_DIR = "src/EXTENSIONS/themes";
```

**Assessment:** ✅ **FIXED** - генератор теперь по умолчанию пишет в EXTENSIONS/themes

---

## All Path References Found

### Generator (tools/theme-generator/)

| File | Line | Path (Before) | Path (After) | Context |
|------|------|---------------|-------------|---------|
| `src/generator.ts` | 30 | `src/FOUNDATION/tokens/themes` | ✅ `src/EXTENSIONS/themes` | DEFAULT_OUTPUT_DIR |
| `src/types.ts` | 71-72 | `src/FOUNDATION/tokens/themes/` | ✅ `src/EXTENSIONS/themes/` | JSDoc comment |
| `bin/theme-generate.ts` | 44 | `src/FOUNDATION/tokens/themes/` | ✅ `src/EXTENSIONS/themes/` | Help text |
| `bin/theme-generate.ts` | 269 | `src/FOUNDATION/tokens/themes/` | ✅ `src/EXTENSIONS/themes/` | Console output |
| `README.md` | 46 | `src/FOUNDATION/tokens/themes/` | ✅ `src/EXTENSIONS/themes/` | Documentation |
| `README.md` | 115 | `src/FOUNDATION/tokens/themes/` | ✅ `src/EXTENSIONS/themes/` | Documentation |

### Parity Check (scripts/check-theme-token-parity.mjs)

| Line | Path | Context |
|------|------|---------|
| 10-11 | `src/FOUNDATION/tokens/themes/**` | Comment - scans Foundation |
| 11 | `src/EXTENSIONS/themes/**` | Comment - scans Extension |
| 34 | `src/FOUNDATION/tokens/themes` | THEME_DIRECTORIES array |
| 35 | `src/EXTENSIONS/themes` | THEME_DIRECTORIES array |

### Extension Validator (scripts/theme-validate-extension.mjs)

| Line | Path | Context |
|------|------|---------|
| 6, 10 | `src/EXTENSIONS/themes/**` | Comment - canonical location |
| 36 | `src/EXTENSIONS/themes` | EXTENSION_THEMES_DIR constant |

### Lint-staged (lint-staged.config.js)

| Line | Path | Context |
|------|------|---------|
| 14 | `!(src/FOUNDATION/tokens/themes/**)` | Exclude Foundation from general CSS |
| 18 | `src/FOUNDATION/tokens/themes/**/*.css` | Validate Foundation themes |
| 30-32 | `src/EXTENSIONS/themes/**/*` | Validate Extension themes |

### Pre-commit (.husky/pre-commit)

| Line | Path | Context |
|------|------|---------|
| 21 | `src/FOUNDATION/tokens/themes/.*\.css` | Check staged Foundation themes |
| 24 | `src/EXTENSIONS/themes/.*` | Check staged Extension themes |

### Theme Contract README (tools/theme-contract/README.md)

| Line | Path | Context |
|------|------|---------|
| 69 | `src/EXTENSIONS/themes/` | Output location |
| 213 | `src/EXTENSIONS/themes/` | Example structure |
| 244, 250, 262, 286 | `src/EXTENSIONS/themes/` | Examples and rules |

---

## Path Inconsistency Analysis

### Critical Finding: EXTENSION vs EXTENSIONS

| Source | Path Used (Before) | Path Used (After) |
|--------|-------------------|-------------------|
| Generator default | `src/FOUNDATION/tokens/themes/` | ✅ `src/EXTENSIONS/themes/` |
| theme-contract README | `src/EXTENSIONS/themes/` | ✅ `src/EXTENSIONS/themes/` |
| theme-validate-extension.mjs | `src/EXTENSIONS/themes/` (plural) | ✅ `src/EXTENSIONS/themes/` (plural) |
| lint-staged.config.js | `src/EXTENSIONS/themes/` (plural) | ✅ `src/EXTENSIONS/themes/` (plural) |
| check-theme-token-parity.mjs | `src/EXTENSIONS/themes/` (plural) | ✅ `src/EXTENSIONS/themes/` (plural) |
| .husky/pre-commit | `src/EXTENSIONS/themes/` (plural) | ✅ `src/EXTENSIONS/themes/` (plural) |

**Assessment:** 

1. ✅ **FIXED:** Generator default now writes to EXTENSIONS/themes
2. ✅ **CONSISTENT:** All sources now use `EXTENSIONS` (plural)
3. ✅ CI/pre-commit scripts consistently use `src/EXTENSIONS/themes/`

---

## Actual Directory Structure

```bash
$ ls -la src/ | grep -E "EXTENSION|FOUNDATION"
```

| Directory | Exists (Before) | Exists (After) |
|-----------|-----------------|-----------------|
| `src/EXTENSIONS/` | ✅ YES | ✅ YES |
| `src/FOUNDATION/` | ✅ YES | ✅ YES |
| `src/FOUNDATION/tokens/themes/` | ❌ NO | ❌ NO (correct - Foundation themes not used) |
| `src/EXTENSIONS/themes/` | ❌ NO | ✅ YES (created with .gitkeep) |

---

## Acceptance Criteria

| Criterion | Status |
|-----------|--------|
| Нет дефолтного вывода в Foundation | ✅ **FIXED** - generator default changed to EXTENSIONS |
| Темы пишутся только в EXTENSIONS | ✅ **FIXED** - default path is now EXTENSIONS/themes |
| Пути согласованы между скриптами | ✅ **PASS** - All use EXTENSIONS |
| README соответствует реальности | ✅ **FIXED** - README updated to use EXTENSIONS |

---

**A3 Status:** ✅ **RESOLVED** (2025-12-31) - All path issues have been fixed

## Resolution Summary

**Date:** 2025-12-31

**Changes Made:**
1. ✅ Changed `DEFAULT_OUTPUT_DIR` from `src/FOUNDATION/tokens/themes` to `src/EXTENSIONS/themes` in all generator files
2. ✅ Updated all documentation references from `EXTENSION` (singular) to `EXTENSIONS` (plural)
3. ✅ Created `src/EXTENSIONS/themes/` directory with `.gitkeep` file

**Verification:**
- Generator now uses correct default path: `src/EXTENSIONS/themes/`
- All documentation consistently uses `EXTENSIONS` (plural)
- Directory structure matches documented paths

