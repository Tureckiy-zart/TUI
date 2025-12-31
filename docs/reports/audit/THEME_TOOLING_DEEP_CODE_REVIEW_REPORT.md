# Theme Tooling Deep Code Review Report

**Date:** 2025-12-30
**Review ID:** TUNG_THEME_TOOLING_DEEP_CODE_REVIEW_V1
**Status:** COMPLETED → ALL FIXES APPLIED
**Reviewer:** AI Code Review System
**Fixes Applied:** 2025-12-30
**Duplication Eliminated:** 2025-12-30

---

## Executive Summary

This report presents a comprehensive architectural and code review of the Theme Generator, Standalone Validator, and their integration flow. The review evaluates Foundation safety, contract strictness, and long-term maintainability.

### Verdict: ✅ ALL FIXES APPLIED — PRODUCTION READY

**All critical blockers have been addressed. The tooling is now production-ready.**

**Original Issues (RESOLVED):**
1. ✅ **Files are written AFTER validation** - Invalid themes cannot be persisted to disk
2. ✅ **Validation is non-bypassable** - `--no-validate` flag removed
3. ✅ **Theme ID validation added** - Generator validates palette name format before generation
4. ✅ **Extra tokens treated as errors** - Aligned with standalone validator behavior

**Duplication Elimination (RESOLVED):**
5. ✅ **Token list duplication eliminated** - Created `tools/theme-contract/` as single source of truth
6. ✅ **Contract data centralized** - All tools import from theme-contract package

**Remaining Architectural Notes:**
- ~~Dual validator architecture still exists (non-blocking, documented)~~ → ADDRESSED via shared theme-contract
- ~~Token list duplication remains (non-blocking, documented)~~ → RESOLVED

---

## 1. Architecture Review Summary

### 1.1 Separation of Concerns (UPDATED)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Theme Tooling Stack (UPDATED)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────┐   ┌─────────────────────────────┐           │
│  │   Theme Generator           │   │   Standalone Validator      │           │
│  │   tools/theme-generator/    │   │   tools/theme-validator/    │           │
│  │                             │   │                             │           │
│  │  ┌─────────────────────┐    │   │  ┌─────────────────────┐    │           │
│  │  │ token-mapper.ts     │    │   │  │ schema.ts           │    │           │
│  │  │ (color algorithm)   │    │   │  │ (re-exports only)   │    │           │
│  │  └─────────────────────┘    │   │  └─────────────────────┘    │           │
│  │           ↓                 │   │           ↓                 │           │
│  │  ┌─────────────────────┐    │   │  ┌─────────────────────┐    │           │
│  │  │ generator.ts        │    │   │  │ parsers/*.ts        │    │           │
│  │  │ (CSS/TS generation) │    │   │  │ (CSS/JSON/TS parse) │    │           │
│  │  └─────────────────────┘    │   │  └─────────────────────┘    │           │
│  │           ↓                 │   │           ↓                 │           │
│  │  ┌─────────────────────┐    │   │  ┌─────────────────────┐    │           │
│  │  │ validator.ts        │    │   │  │ validator.ts        │    │           │
│  │  │ (imports contract)  │    │   │  │ (imports contract)  │    │           │
│  │  └──────────┬──────────┘    │   │  └──────────┬──────────┘    │           │
│  └─────────────┼───────────────┘   └─────────────┼───────────────┘           │
│                │                                 │                           │
│                └─────────────────┬───────────────┘                           │
│                                  ↓                                           │
│  ┌───────────────────────────────────────────────────────────────────────┐   │
│  │                    Theme Contract (NEW)                                │   │
│  │                    tools/theme-contract/                               │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐   │   │
│  │  │ tokens.ts   │ │ version.ts  │ │ patterns.ts │ │ validation.ts   │   │   │
│  │  │ (imports    │ │ CONTRACT_   │ │ THEME_ID_   │ │ isValidThemeId  │   │   │
│  │  │  Foundation)│ │ VERSION     │ │ PATTERN     │ │ parseThemeId    │   │   │
│  │  └──────┬──────┘ └─────────────┘ └─────────────┘ └─────────────────┘   │   │
│  └─────────┼─────────────────────────────────────────────────────────────┘   │
│            ↓                                                                  │
│  ┌───────────────────────────────────────────────────────────────────────┐   │
│  │              Canonical Token Registry                                  │   │
│  │         src/FOUNDATION/tokens/required-tokens.ts                       │   │
│  │                    (SINGLE SOURCE OF TRUTH)                            │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Assessment:**

| Criterion | Status | Notes |
|-----------|--------|-------|
| Generator/Validator separation | ✅ PASS | Separate packages, no cross-imports |
| No UI package dependencies | ✅ PASS | Only Node.js built-ins used |
| Foundation read-only mode | ✅ PASS | Only outputs to Foundation directory |
| No hidden coupling | ✅ **PASS** | Shared theme-contract, no duplication |
| Single source of truth | ✅ **PASS** | All tools import from theme-contract |

### 1.2 Token Registry Synchronization (RESOLVED)

**Finding: Duplication ELIMINATED via theme-contract package**

| Location | Role | Status |
|----------|------|--------|
| `src/FOUNDATION/tokens/required-tokens.ts` | **CANONICAL SOURCE** | ✅ Single source |
| `tools/theme-contract/src/tokens.ts` | Imports from Foundation | ✅ Re-exports only |
| `tools/theme-generator/src/validator.ts` | Imports from theme-contract | ✅ No local copy |
| `tools/theme-validator/src/schema.ts` | Re-exports from theme-contract | ✅ No local copy |

**Resolution:** Created `tools/theme-contract/` package that:
- Imports `REQUIRED_THEME_TOKENS` from Foundation
- Provides centralized `CONTRACT_VERSION`, `THEME_ID_PATTERN`, `PALETTE_NAME_PATTERN`
- Provides shared validation functions (`isValidThemeId`, `parseThemeId`, etc.)
- Generator and Validator both import from theme-contract

**Risk:** ~~Manual synchronization required~~ → **ELIMINATED**

**Note:** The `scripts/check-theme-token-parity.mjs` correctly imports from canonical source.

### 1.3 Integration Flow Analysis

**BEFORE FIXES (Original Flow):**
```
┌─────────────────────────────────────────────────────────────────────┐
│                  Original Generation Flow (BROKEN)                  │
├─────────────────────────────────────────────────────────────────────┤
│   CLI Input → generate() → Write files → validate() → Exit         │
│                    ⚠️ FILES WRITTEN BEFORE VALIDATION              │
└─────────────────────────────────────────────────────────────────────┘
```

**AFTER FIXES (Current Flow):**
```
┌─────────────────────────────────────────────────────────────────────┐
│                    Fixed Generation Flow (CORRECT)                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   CLI Input                                                         │
│      ↓                                                              │
│   ┌──────────────────────────────────────┐                          │
│   │ generate()                           │                          │
│   │   - Validate palette name format    │  ← ✅ ADDED             │
│   │   - Validate input parameters        │                          │
│   │   - Generate theme tokens (in-memory)│                          │
│   │   - Return themes (NO FILE WRITING)  │  ← ✅ FIXED             │
│   └──────────────────────────────────────┘                          │
│      ↓                                                              │
│   ┌──────────────────────────────────────┐                          │
│   │ validateThemes() [INTERNAL]          │                          │
│   │   - Check completeness               │                          │
│   │   - Check contract version           │                          │
│   │   - Check extra tokens (ERROR)       │  ← ✅ FIXED             │
│   └──────────────────────────────────────┘                          │
│      ↓                                                              │
│   ┌──────────────────────────────────────┐                          │
│   │ If validation fails → Exit (no files)│  ← ✅ ENFORCED          │
│   │ If validation passes → writeThemeFiles()│  ← ✅ FIXED          │
│   └──────────────────────────────────────┘                          │
│      ↓                                                              │
│   ┌──────────────────────────────────────┐                          │
│   │ runParityCheck()                     │                          │
│   └──────────────────────────────────────┘                          │
│      ↓                                                              │
│   Exit with code                                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Status:** ✅ **FIXED** - Files are written ONLY after validation passes.

---

## 2. Critical Issues (BLOCKERS)

### 2.1 CRITICAL: File Writing Before Validation ✅ FIXED

**Original Location:** `tools/theme-generator/src/generator.ts:243-249`

**Original Issue:**
```typescript
// Line 243-249: Files written BEFORE validation
for (const mode of input.modes) {
  const theme = generateTheme(input, mode);
  themes.push(theme);
  
  // Write file ← ⚠️ HAPPENS HERE
  writeThemeFile(theme);
}
// Validation happens AFTER this loop, in CLI
```

**Fix Applied:**
- ✅ Removed `writeThemeFile()` call from inside `generate()` loop
- ✅ Added `writeThemeFiles()` function for batch writing
- ✅ CLI now calls `writeThemeFiles()` ONLY after validation passes
- ✅ On validation failure: no files written, exit with error code 1

**Current Implementation:**
```typescript
// tools/theme-generator/src/generator.ts
export function generate(input: ThemeGeneratorInput): GenerationResult {
  // Generate themes in-memory only (no file writing)
  const themes: GeneratedTheme[] = [];
  for (const mode of input.modes) {
    const theme = generateTheme(input, mode);
    themes.push(theme);
  }
  return { success: true, themes };
}

// tools/theme-generator/bin/theme-generate.ts
const result = generate(input);
const validationResults = validateThemes(result.themes);
if (!allValid) {
  console.error(`❌ Validation failed - no files written`);
  process.exit(1);
}
writeThemeFiles(result.themes); // ← Only called after validation passes
```

**Status:** ✅ **RESOLVED** - Invalid themes cannot be persisted to disk.

---

### 2.2 CRITICAL: Validation Bypass via --no-validate ✅ FIXED

**Original Location:** `tools/theme-generator/bin/theme-generate.ts:194-198`

**Original Issue:**
```typescript
case "--no-validate":
  result.skipValidate = true;
  result.input.validate = false;
  i++;
  break;
```

**Fix Applied:**
- ✅ Removed `--no-validate` flag from CLI `parseArgs()`
- ✅ Removed `skipValidate` from result object
- ✅ Removed `validate` field from `ThemeGeneratorInput` type
- ✅ Removed `--no-validate` from help text and README
- ✅ Validation now always runs (cannot be skipped)

**Current Implementation:**
```typescript
// Validation always runs - no bypass possible
console.log(`\n🔍 Validating themes...`);
const validationResults = validateThemes(result.themes);
if (!allValid) {
  console.error(`\n❌ Validation failed - no files written`);
  process.exit(1);
}
```

**Status:** ✅ **RESOLVED** - Validation is enforced and non-bypassable.

---

### 2.3 HIGH: Dual Validator Architecture ✅ RESOLVED

**Location:**
- Generator: `tools/theme-generator/src/validator.ts`
- Standalone: `tools/theme-validator/src/validator.ts`
- **NEW:** Contract: `tools/theme-contract/src/` (shared source)

**Feature Comparison (Updated):**

| Feature | Generator Validator | Standalone Validator |
|---------|:-------------------:|:--------------------:|
| Token completeness | ✅ | ✅ |
| Contract version check | ✅ | ✅ |
| Theme ID validation | ✅ (shared) | ✅ (shared) |
| Extra tokens handling | ✅ Error | ✅ Error |
| Deprecated tokens | ✅ (via contract) | ✅ (via contract) |
| Duplicate detection | ❌ (not needed) | ✅ |
| Structured error codes | ❌ | ✅ |
| JSON output | ❌ | ✅ |

**Fixes Applied:**
- ✅ Created `tools/theme-contract/` package as shared source
- ✅ All validation functions imported from theme-contract
- ✅ Token lists, patterns, and version constants centralized
- ✅ No local copies of contract data in generator or validator

**Resolution:**
- Validators use different output formats (simple vs structured) but share contract data
- Generator validator simpler (sufficient for generation-time checks)
- Standalone validator comprehensive (for CI/CD and external themes)
- **All contract data comes from single source**

**Status:** ✅ **RESOLVED** - Contract data centralized, no duplication.

---

### 2.4 MEDIUM: Token List Duplication ✅ RESOLVED

**Original Risk Level:** MEDIUM

**Resolution Applied:**

Created `tools/theme-contract/` package:

```
tools/theme-contract/
├── src/
│   ├── index.ts        # Public API exports
│   ├── types.ts        # ThemeMode, ParsedThemeId
│   ├── version.ts      # CONTRACT_VERSION, CONTRACT_VERSION_TOKEN
│   ├── patterns.ts     # THEME_ID_PATTERN, PALETTE_NAME_PATTERN
│   ├── tokens.ts       # Imports REQUIRED_THEME_TOKENS from Foundation
│   └── validation.ts   # isValidThemeId, parseThemeId, etc.
├── tsconfig.json
└── README.md
```

**Eliminated Duplication:**
- ✅ `REQUIRED_THEME_TOKENS` - now imported from Foundation, re-exported by theme-contract
- ✅ `CONTRACT_VERSION` - defined once in theme-contract/src/version.ts
- ✅ `THEME_ID_PATTERN` - defined once in theme-contract/src/patterns.ts
- ✅ `PALETTE_NAME_PATTERN` - defined once in theme-contract/src/patterns.ts
- ✅ Validation functions - defined once in theme-contract/src/validation.ts

**Verification (grep results):**
```
# Only one definition of each constant:
REQUIRED_THEME_TOKENS = FOUNDATION_TOKENS  → tools/theme-contract/src/tokens.ts
CONTRACT_VERSION = "1"                      → tools/theme-contract/src/version.ts
THEME_ID_PATTERN = /^.../                   → tools/theme-contract/src/patterns.ts
PALETTE_NAME_PATTERN = /^.../               → tools/theme-contract/src/patterns.ts
```

**Status:** ✅ **RESOLVED** - Duplication architecturally eliminated.

---

## 3. High-Risk Design Decisions

### 3.1 Extra Tokens: Warning vs Error ✅ FIXED

**Original Generator behavior:** Treated extra `--tm-*` tokens as WARNING

**Fix Applied:**
- ✅ Changed `warnings.push()` to `errors.push()` in generator validator
- ✅ Extra tokens now cause validation failure (non-zero exit code)
- ✅ Behavior aligned with standalone validator

**Current Implementation:**
```typescript
// tools/theme-generator/src/validator.ts
// Check for extra tokens (error - unknown tokens violate Theme Contract v1)
const extraCheck = checkNoExtraTokens(theme.tokens);
if (!extraCheck.passed) {
  errors.push(  // ← Now ERROR, not warning
    `Found ${extraCheck.extra.length} unknown --tm-* token(s) not in registry: ${extraCheck.extra.join(", ")}`
  );
}
```

**Status:** ✅ **RESOLVED** - Consistent error handling across both validators.

---

### 3.2 Parity Check Skipped for Dry Run

**Location:** `tools/theme-generator/bin/theme-generate.ts:325-337`

```typescript
// Run parity check (only if files were written)
if (!dryRun) {
  console.log(`\n🔍 Running parity check...`);
  const parityResult = await runParityCheck();
  // ...
}
```

**Risk:** Dry run mode doesn't catch parity issues.

**Recommendation:** Run parity check in dry-run mode against generated (in-memory) tokens.

---

### 3.3 Magic Luminance Threshold

**Location:** `tools/theme-generator/src/token-mapper.ts:151`

```typescript
export function isLightColor(hsl: HSLComponents): boolean {
  return getRelativeLuminance(hsl) > 0.179;  // ← Magic number
}
```

**Risk:** Unclear origin of constant.

**Recommendation:** Add named constant with WCAG reference:
```typescript
/** WCAG 2.0 relative luminance threshold for light/dark distinction */
const WCAG_LUMINANCE_THRESHOLD = 0.179;
```

---

## 4. Non-Blocking Improvements

### 4.1 Code Quality Improvements

| Item | Location | Suggestion |
|------|----------|------------|
| Magic number | `token-mapper.ts:151` | Add named constant `WCAG_LUMINANCE_THRESHOLD` |
| Duplicated validation logic | `generator.ts:267-292` | Extract shared input validation function |
| Type assertion | `token-mapper.ts:205` | Use type guard instead of `as const` |

### 4.2 DX Enhancements

| Item | Suggestion |
|------|------------|
| Add `--validate-only` flag | Run validation without generation |
| Add `--strict` flag | Treat warnings as errors |
| Improve error messages | Include line numbers for CSS tokens |

### 4.3 Documentation Updates

| Item | Current | Should Be |
|------|---------|-----------|
| Generator README token count | "50+ tokens" | "46 tokens (45 + contract version)" |
| Validator README token count | "48+ required tokens" | "45 required tokens" |
| Missing dry-run parity note | Not mentioned | Document that parity check is skipped |

---

## 5. Acceptance Criteria Evaluation (UPDATED)

| Criterion | Status | Evidence |
|-----------|--------|----------|
| No Foundation policy violations | ✅ PASS | Foundation used read-only |
| Impossible to release invalid theme | ✅ **PASS** | `--no-validate` removed, files written after validation |
| Generator and Validator logically independent | ✅ **PASS** | Both import from shared theme-contract |
| Flow is enforced and non-bypassable | ✅ **PASS** | Validation always runs, no bypass paths |
| Single source of truth for contract data | ✅ **PASS** | All tools use theme-contract package |
| No token/schema duplication | ✅ **PASS** | Verified via grep - no local copies |
| Review provides clear verdict | ✅ PASS | See below |

---

## 6. Verdict

### ✅ ALL FIXES APPLIED — PRODUCTION READY

The Theme Tooling stack is **NOW READY FOR PRODUCTION USE**. All critical blockers have been addressed. **Duplication has been architecturally eliminated.**

#### Mandatory Fixes (COMPLETED)

1. ✅ **Move file writing AFTER validation** in `generator.ts`
   - **Status:** FIXED
   - **Implementation:** `generate()` returns themes in-memory, CLI writes after validation
   - **Files:** `tools/theme-generator/src/generator.ts`, `tools/theme-generator/bin/theme-generate.ts`

2. ✅ **Remove `--no-validate` flag**
   - **Status:** FIXED
   - **Implementation:** Flag removed from CLI, help text, types, and README
   - **Files:** `tools/theme-generator/bin/theme-generate.ts`, `tools/theme-generator/src/types.ts`, `tools/theme-generator/README.md`

3. ✅ **Generator validates theme ID format**
   - **Status:** FIXED
   - **Implementation:** Added `isValidPaletteName()` and `getPaletteNameError()` functions
   - **Files:** `tools/theme-generator/src/validator.ts`, `tools/theme-generator/src/generator.ts`

4. ✅ **Align extra tokens handling (warning → error)**
   - **Status:** FIXED
   - **Implementation:** Changed `warnings.push()` to `errors.push()` in generator validator
   - **Files:** `tools/theme-generator/src/validator.ts`

#### Additional Fixes (COMPLETED)

5. ✅ **Create theme-contract package for shared contract data**
   - **Status:** COMPLETED
   - **Implementation:** Created `tools/theme-contract/` with centralized contract data
   - **Files:** `tools/theme-contract/src/*.ts`

6. ✅ **Eliminate token list duplication**
   - **Status:** COMPLETED
   - **Implementation:** All tools now import from theme-contract, which imports from Foundation
   - **Files:** Updated `tools/theme-generator/src/validator.ts`, `tools/theme-validator/src/schema.ts`

7. ✅ **Centralize validation functions**
   - **Status:** COMPLETED
   - **Implementation:** `isValidThemeId`, `parseThemeId`, `isValidPaletteName`, etc. defined in theme-contract
   - **Files:** `tools/theme-contract/src/validation.ts`

---

## 7. Fixes Summary

### Files Modified (Original Fixes)

| File | Changes |
|------|---------|
| `tools/theme-generator/bin/theme-generate.ts` | Removed `--no-validate`, restructured write timing |
| `tools/theme-generator/src/generator.ts` | Removed inline write, added theme ID validation |
| `tools/theme-generator/src/validator.ts` | Extra tokens = error, added theme ID validation functions |
| `tools/theme-generator/src/types.ts` | Removed `validate` field |
| `tools/theme-generator/README.md` | Removed `--no-validate` references, documented correct behavior |

### Files Created (Duplication Elimination)

| File | Purpose |
|------|---------|
| `tools/theme-contract/src/index.ts` | Public API exports |
| `tools/theme-contract/src/types.ts` | `ThemeMode`, `ParsedThemeId` types |
| `tools/theme-contract/src/version.ts` | `CONTRACT_VERSION`, `CONTRACT_VERSION_TOKEN`, `TOKEN_PREFIX` |
| `tools/theme-contract/src/patterns.ts` | `THEME_ID_PATTERN`, `PALETTE_NAME_PATTERN`, `VALID_MODES` |
| `tools/theme-contract/src/tokens.ts` | Imports `REQUIRED_THEME_TOKENS` from Foundation |
| `tools/theme-contract/src/validation.ts` | All validation functions (`isValidThemeId`, etc.) |
| `tools/theme-contract/tsconfig.json` | TypeScript configuration |
| `tools/theme-contract/README.md` | Package documentation |

### Files Updated (Duplication Elimination)

| File | Changes |
|------|---------|
| `tools/theme-generator/src/validator.ts` | Removed local token list, imports from theme-contract |
| `tools/theme-generator/src/token-mapper.ts` | Uses `CONTRACT_VERSION` from theme-contract |
| `tools/theme-generator/tsconfig.json` | Added path mapping for theme-contract |
| `tools/theme-validator/src/schema.ts` | Replaced with re-exports from theme-contract |
| `tools/theme-validator/src/validator.ts` | Imports from schema (which re-exports from contract) |
| `tools/theme-validator/bin/theme-validate.ts` | Uses `CONTRACT_VERSION` via schema |
| `tools/theme-validator/tsconfig.json` | Added path mapping for theme-contract |
| `tools/theme-validator/src/parsers/ts.ts` | Renamed local pattern to avoid confusion |

### Verification Results

- ✅ `pnpm run theme:generate -- --help` does NOT show `--no-validate`
- ✅ Generation with invalid palette name fails before file creation
- ✅ Validation failure leaves no files on disk
- ✅ Unknown tokens cause non-zero exit code
- ✅ TypeScript compilation passes without errors

### Duplication Elimination Verification

```bash
# Only one definition of REQUIRED_THEME_TOKENS:
$ grep -r "REQUIRED_THEME_TOKENS\s*=\s*\[" tools/
# (no matches - list imported from Foundation via theme-contract)

# Only one definition of CONTRACT_VERSION:
$ grep -r 'CONTRACT_VERSION\s*=\s*"1"' tools/
tools/theme-contract/src/version.ts:export const CONTRACT_VERSION = "1";

# Only one validation THEME_ID_PATTERN:
$ grep -r "THEME_ID_PATTERN\s*=\s*/\\^" tools/
tools/theme-contract/src/patterns.ts:export const THEME_ID_PATTERN = /^[a-z][a-z0-9-]*-(light|dark)$/;

# theme-contract does NOT import from generator or validator (no circular deps):
$ grep -r "from.*theme-generator\|from.*theme-validator" tools/theme-contract/src/
# (no matches)
```

---

## 8. Appendix

### A. Token Count Verification

```
Canonical Registry: 45 tokens
├── Background: 5 (bg, bg-elev-1, bg-elev-2, overlay, scrim)
├── Foreground: 3 (fg, fg-muted, fg-subtle)
├── Border: 3 (border, border-strong, separator)
├── Focus/Shadow: 5 (ring, shadow-color, ring-offset, shadow-1, shadow-2)
├── Primary: 3 (primary, primary-foreground, primary-hover)
├── Secondary: 3 (secondary, secondary-foreground, secondary-hover)
├── Accent: 3 (accent, accent-foreground, accent-hover)
├── Destructive: 3 (destructive, destructive-foreground, destructive-hover)
├── Success: 3 (success, success-foreground, success-hover)
├── Warning: 3 (warning, warning-foreground, warning-hover)
├── Info: 3 (info, info-foreground, info-hover)
├── Muted: 2 (muted, muted-foreground)
├── Disabled: 2 (disabled, disabled-foreground)
├── Link: 2 (link, link-hover)
└── Selection: 2 (selection-bg, selection-foreground)

Total: 45 tokens
+ Contract version token: 1
= 46 tokens in generated themes
```

### B. Exit Code Specification

| Code | Meaning | When |
|------|---------|------|
| 0 | Success | All themes valid |
| 1 | Validation failed | Missing tokens, invalid format, etc. |
| 2 | Input error | File not found, parse error |

### C. Files Reviewed

**Theme Contract (NEW):**
- `tools/theme-contract/src/index.ts` (51 lines)
- `tools/theme-contract/src/types.ts` (21 lines)
- `tools/theme-contract/src/version.ts` (21 lines)
- `tools/theme-contract/src/patterns.ts` (26 lines)
- `tools/theme-contract/src/tokens.ts` (45 lines)
- `tools/theme-contract/src/validation.ts` (113 lines)
- `tools/theme-contract/README.md` (documentation)

**Generator:**
- `tools/theme-generator/src/generator.ts` (314 lines)
- `tools/theme-generator/src/validator.ts` (257 lines) - now imports from theme-contract
- `tools/theme-generator/src/token-mapper.ts` (468 lines) - uses CONTRACT_VERSION from contract
- `tools/theme-generator/src/types.ts` (262 lines)
- `tools/theme-generator/bin/theme-generate.ts` (356 lines)

**Validator:**
- `tools/theme-validator/src/validator.ts` (349 lines)
- `tools/theme-validator/src/schema.ts` (39 lines) - now re-exports from theme-contract
- `tools/theme-validator/src/errors.ts` (213 lines)
- `tools/theme-validator/src/types.ts` (218 lines)
- `tools/theme-validator/src/parsers/*.ts` (4 files)
- `tools/theme-validator/bin/theme-validate.ts` (270 lines)

**Registry:**
- `src/FOUNDATION/tokens/required-tokens.ts` (121 lines) - remains canonical source

---

### D. Theme Contract Package Structure

```
tools/theme-contract/
├── src/
│   ├── index.ts        # Public exports
│   ├── types.ts        # ThemeMode, ParsedThemeId
│   ├── version.ts      # CONTRACT_VERSION = "1"
│   │                   # CONTRACT_VERSION_TOKEN = "--tm-contract-version"
│   │                   # TOKEN_PREFIX = "--tm-"
│   ├── patterns.ts     # THEME_ID_PATTERN, PALETTE_NAME_PATTERN
│   ├── tokens.ts       # REQUIRED_THEME_TOKENS (from Foundation)
│   │                   # REQUIRED_TOKENS_SET, DEPRECATED_TOKENS
│   └── validation.ts   # isValidThemeId(), parseThemeId()
│                       # isValidPaletteName(), getPaletteNameError()
│                       # isRequiredToken(), isCoreToken()
│                       # isDeprecatedToken(), getForegroundToken()
├── tsconfig.json
└── README.md
```

**Principle:** Any contract artifact (token list, schema, validation rules) exists in exactly one place and is only imported by consumers.

---

**End of Report**

