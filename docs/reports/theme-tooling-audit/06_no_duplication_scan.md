# A10: No Duplication Audit

**Date:** 2025-12-30
**Purpose:** Проверить, что все константы контракта (токены, паттерны, версия) определены в одном месте и импортируются, а не дублируются

---

## Canonical Source of Truth

**File:** `src/FOUNDATION/tokens/required-tokens.ts`

This file defines `REQUIRED_THEME_TOKENS` - the authoritative list of 46 required tokens.

---

## Import Chain Analysis

```
src/FOUNDATION/tokens/required-tokens.ts
         ↓ (imports)
tools/theme-contract/src/tokens.ts
         ↓ (re-exports)
tools/theme-contract/src/index.ts
         ↓ (imports)
tools/theme-generator/src/validator.ts
tools/theme-validator/src/schema.ts → validator.ts
```

---

## File-by-File Analysis

### 1. Canonical Source: `src/FOUNDATION/tokens/required-tokens.ts`

```typescript
export const REQUIRED_THEME_TOKENS = [
  "--tm-bg",
  "--tm-bg-elev-1",
  // ... 46 tokens total
] as const;
```

**Status:** ✅ Single source of truth

---

### 2. Theme Contract: `tools/theme-contract/src/tokens.ts`

```typescript
import { REQUIRED_THEME_TOKENS as FOUNDATION_TOKENS } 
  from "../../../src/FOUNDATION/tokens/required-tokens.js";

export const REQUIRED_THEME_TOKENS = FOUNDATION_TOKENS;
export const REQUIRED_TOKENS_SET: ReadonlySet<string> = new Set(REQUIRED_THEME_TOKENS);
```

**Status:** ✅ Imports from canonical source, no duplication

---

### 3. Theme Contract: `tools/theme-contract/src/patterns.ts`

```typescript
export const THEME_ID_PATTERN = /^[a-z][a-z0-9-]*-(light|dark)$/;
export const PALETTE_NAME_PATTERN = /^[a-z][a-z0-9-]*$/;
```

**Status:** ✅ Single definition location

---

### 4. Theme Contract: `tools/theme-contract/src/version.ts`

```typescript
export const CONTRACT_VERSION = "1";
export const CONTRACT_VERSION_TOKEN = "--tm-contract-version";
export const TOKEN_PREFIX = "--tm-";
```

**Status:** ✅ Single definition location

---

### 5. Theme Generator Validator: `tools/theme-generator/src/validator.ts`

```typescript
import {
  CONTRACT_VERSION,
  CONTRACT_VERSION_TOKEN,
  getPaletteNameError,
  isValidPaletteName,
  isValidThemeId,
  REQUIRED_THEME_TOKENS,
  REQUIRED_TOKENS_SET,
} from "../../theme-contract/src/index.js";
```

**Status:** ✅ Imports from theme-contract, no local definitions

---

### 6. Theme Validator: `tools/theme-validator/src/schema.ts`

```typescript
export {
  CONTRACT_VERSION,
  CONTRACT_VERSION_TOKEN,
  // ... all re-exports from theme-contract
} from "../../theme-contract/src/index.js";
```

**Status:** ✅ Re-exports from theme-contract

---

### 7. Theme Validator: `tools/theme-validator/src/validator.ts`

```typescript
import {
  CONTRACT_VERSION_TOKEN,
  REQUIRED_THEME_TOKENS,
  // ...
} from "./schema";
```

**Status:** ✅ Imports via schema.ts from theme-contract

---

## ⚠️ Potential Issue: Hardcoded Tokens in Generator

**File:** `tools/theme-generator/src/token-mapper.ts:329-408`

The token-mapper.ts file **hardcodes all 46 token names** when generating themes:

```typescript
return {
  "--tm-contract-version": CONTRACT_VERSION,
  "--tm-bg": formatHSL(bgBase),
  "--tm-bg-elev-1": formatHSL(bgElev1),
  // ... 44 more tokens hardcoded
};
```

**Analysis:**

| Aspect | Assessment |
|--------|------------|
| Are token NAMES duplicated? | ⚠️ YES - hardcoded in token-mapper.ts |
| Can this cause drift? | ⚠️ YES - if REQUIRED_THEME_TOKENS changes |
| Is there validation against REQUIRED_THEME_TOKENS? | ✅ YES - generator runs validateTheme() before writing |

**Risk Assessment:**

The generator's `validateTheme()` function checks that all REQUIRED_THEME_TOKENS are present in the generated output. This means:
- If token-mapper.ts misses a token, validation will fail
- If token-mapper.ts adds extra tokens, validation will fail
- Drift is **caught at generation time**, not at code level

**Recommendation:** Consider generating token-mapper.ts structure from REQUIRED_THEME_TOKENS to eliminate hardcoded duplication.

---

## Summary Table

| Constant | Canonical Location | Other Locations | Status |
|----------|-------------------|-----------------|--------|
| REQUIRED_THEME_TOKENS | `src/FOUNDATION/tokens/required-tokens.ts` | Imported only | ✅ PASS |
| THEME_ID_PATTERN | `tools/theme-contract/src/patterns.ts` | Imported only | ✅ PASS |
| PALETTE_NAME_PATTERN | `tools/theme-contract/src/patterns.ts` | Imported only | ✅ PASS |
| CONTRACT_VERSION | `tools/theme-contract/src/version.ts` | Imported only | ✅ PASS |
| CONTRACT_VERSION_TOKEN | `tools/theme-contract/src/version.ts` | Imported only | ✅ PASS |
| Token names in generation | `token-mapper.ts` | Hardcoded | ⚠️ WARNING |

---

## Acceptance Criteria

| Criterion | Status |
|-----------|--------|
| Canonical definitions in theme-contract | ✅ PASS |
| Generator/Validator only import | ✅ PASS |
| No local definitions | ⚠️ WARNING - token names hardcoded in token-mapper.ts |

---

**A10 Status:** ⚠️ PASS with WARNING - Token names hardcoded in generator but validated against canonical list

