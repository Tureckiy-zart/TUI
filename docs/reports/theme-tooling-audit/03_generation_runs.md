# A4-A7: Generation Runs

**Date:** 2025-12-30
**Purpose:** Проверить генерацию тем в различных сценариях

---

## A4: Golden Path Run (Expected Success)

### Setup

```bash
rm -rf src/EXTENSIONS/themes/__audit__ || true
mkdir -p src/EXTENSIONS/themes/__audit__
```

### Command

```bash
pnpm run theme:generate -- \
  --palette audit-theme \
  --base-color "210 40% 50%" \
  --modes light,dark \
  --output-dir src/EXTENSIONS/themes/__audit__
```

### Output

```
🎨 Theme Generator CLI v1.0.0

Palette: audit-theme
Base Color: 210 40% 50%
Modes: light, dark
Contrast Level: AA
Output Format: css
Output Dir: src/EXTENSIONS/themes/__audit__

📦 Generating themes...

✅ Generated: audit-theme-light
   File: src/EXTENSIONS/themes/__audit__/theme.audit-theme-light.css
   Tokens: 46

✅ Generated: audit-theme-dark
   File: src/EXTENSIONS/themes/__audit__/theme.audit-theme-dark.css
   Tokens: 46

🔍 Validating themes...

📋 Theme: audit-theme-light
   ✅ Validation passed
   ✅ Completeness: 45/45 tokens
   ✅ Contract: v1

📋 Theme: audit-theme-dark
   ✅ Validation passed
   ✅ Completeness: 45/45 tokens
   ✅ Contract: v1

✅ All validations passed

📝 Writing theme files...
   ✅ Written: src/EXTENSIONS/themes/__audit__/theme.audit-theme-light.css
   ✅ Written: src/EXTENSIONS/themes/__audit__/theme.audit-theme-dark.css

🔍 Running parity check...
✅ Parity check passed

🎉 Theme generation complete!
```

### Files Created

```
src/EXTENSIONS/themes/__audit__/
├── theme.audit-theme-dark.css (1805 bytes)
└── theme.audit-theme-light.css (1759 bytes)
```

### Validation Check

```bash
pnpm run theme:validate -- \
  src/EXTENSIONS/themes/__audit__/theme.audit-theme-light.css \
  src/EXTENSIONS/themes/__audit__/theme.audit-theme-dark.css
```

**Result:** ✅ Exit code 0, both themes VALID

### A4 Assessment

| Criterion | Status |
|-----------|--------|
| Созданы 2 файла (light/dark) | ✅ PASS |
| theme:validate возвращает exit 0 | ✅ PASS |
| Tokens count correct (46) | ✅ PASS |
| Contract version: v1 | ✅ PASS |

**A4 Status:** ✅ PASS

---

## A5: Dry-run Behavior (Must Not Write)

### Setup

```bash
rm -rf src/EXTENSIONS/themes/__audit_dry__ || true
mkdir -p src/EXTENSIONS/themes/__audit_dry__
```

### Command

```bash
pnpm run theme:generate -- \
  --palette audit-dry \
  --base-color "280 65% 59%" \
  --modes light \
  --dry-run \
  --output-dir src/EXTENSIONS/themes/__audit_dry__
```

### Output

```
🎨 Theme Generator CLI v1.0.0

Palette: audit-dry
Base Color: 280 65% 59%
Modes: light
Contrast Level: AA
Output Format: css
Output Dir: src/EXTENSIONS/themes/__audit_dry__
Mode: DRY RUN (no files written)

📦 Generating themes...

✅ Generated: audit-dry-light
   File: src/EXTENSIONS/themes/__audit_dry__/theme.audit-dry-light.css
   Tokens: 46

🔍 Validating themes...

📋 Theme: audit-dry-light
   ✅ Validation passed
   ✅ Completeness: 45/45 tokens
   ✅ Contract: v1

✅ All validations passed

🎉 Theme generation complete!
   (Dry run - no files were written)
```

### Exit Code

Exit code: **0**

### Directory Contents

```
src/EXTENSIONS/themes/__audit_dry__/
(empty)
```

### A5 Assessment

| Criterion | Status |
|-----------|--------|
| Каталог пуст после dry-run | ✅ PASS |
| Exit code 0 | ✅ PASS |

**A5 Status:** ✅ PASS

---

## A6: Failure Semantics - Invalid Palette Name

### Setup

```bash
rm -rf src/EXTENSIONS/themes/__audit_fail_palette__ || true
mkdir -p src/EXTENSIONS/themes/__audit_fail_palette__
```

### Command

```bash
pnpm run theme:generate -- \
  --palette "MyTheme" \
  --base-color "210 40% 50%" \
  --modes light \
  --output-dir src/EXTENSIONS/themes/__audit_fail_palette__
```

### Output

```
🎨 Theme Generator CLI v1.0.0

Palette: MyTheme
Base Color: 210 40% 50%
Modes: light
Contrast Level: AA
Output Format: css
Output Dir: src/EXTENSIONS/themes/__audit_fail_palette__

📦 Generating themes...

❌ Generation failed: Invalid palette name: "MyTheme". Must be lowercase 
   alphanumeric with hyphens, starting with a letter (e.g., "ocean", "my-brand")
```

### Exit Code

Exit code: **1**

### Directory Contents

```
src/EXTENSIONS/themes/__audit_fail_palette__/
(empty)
```

### A6 Assessment

| Criterion | Status |
|-----------|--------|
| Non-zero exit code | ✅ PASS (exit 1) |
| Никаких файлов не записано | ✅ PASS |
| Clear error message | ✅ PASS |

**A6 Status:** ✅ PASS

---

## A7: Failure Semantics - Invalid themeId Format

### Setup

```bash
rm -rf src/EXTENSIONS/themes/__audit_fail_id__ || true
mkdir -p src/EXTENSIONS/themes/__audit_fail_id__
```

### Command

```bash
pnpm run theme:generate -- \
  --palette "audit--bad" \
  --base-color "210 40% 50%" \
  --modes light \
  --output-dir src/EXTENSIONS/themes/__audit_fail_id__
```

### Output

```
🎨 Theme Generator CLI v1.0.0

Palette: audit--bad
Base Color: 210 40% 50%
Modes: light
Contrast Level: AA
Output Format: css
Output Dir: src/EXTENSIONS/themes/__audit_fail_id__

📦 Generating themes...

✅ Generated: audit--bad-light
   File: src/EXTENSIONS/themes/__audit_fail_id__/theme.audit--bad-light.css
   Tokens: 46

🔍 Validating themes...

📋 Theme: audit--bad-light
   ✅ Validation passed
   ✅ Completeness: 45/45 tokens
   ✅ Contract: v1

✅ All validations passed

📝 Writing theme files...
   ✅ Written: src/EXTENSIONS/themes/__audit_fail_id__/theme.audit--bad-light.css

🔍 Running parity check...
✅ Parity check passed

🎉 Theme generation complete!
```

### Exit Code

Exit code: **0** ⚠️

### Directory Contents

```
src/EXTENSIONS/themes/__audit_fail_id__/
└── theme.audit--bad-light.css (1757 bytes)
```

### A7 Assessment

| Criterion | Expected | Actual | Status |
|-----------|----------|--------|--------|
| Non-zero exit code | Exit 1 | Exit 0 | ❌ **FAIL** |
| No files written | Empty dir | 1 file | ❌ **FAIL** |

### Root Cause Analysis

**Pattern (Before):** `PALETTE_NAME_PATTERN = /^[a-z][a-z0-9-]*$/`

This pattern allowed consecutive hyphens (`--`). 

**Pattern (After - Fixed 2025-12-31):** `/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/` - enforces single hyphens only

**File:** `tools/theme-contract/src/patterns.ts:22`

**A7 Status:** ✅ **FIXED** (2025-12-31) - Pattern now correctly rejects invalid theme IDs with double hyphens

---

## Summary Table

| Test | Scenario | Expected | Actual | Status |
|------|----------|----------|--------|--------|
| A4 | Golden path | Success | Success | ✅ PASS |
| A5 | Dry-run | No files | No files | ✅ PASS |
| A6 | Invalid palette name | Fail, no files | Fail, no files | ✅ PASS |
| A7 | Double hyphen | Fail, no files | ✅ Fail, no files (after fix) | ✅ **FIXED** (2025-12-31) |

