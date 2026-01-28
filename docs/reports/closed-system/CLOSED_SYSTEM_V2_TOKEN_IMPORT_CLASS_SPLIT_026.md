# Closed System v2 — Token Import Class Split Resolution Report

**Project:** @tenerife.music/ui  
**Task ID:** TUI_CSV2_TOKEN_IMPORT_CLASS_SPLIT_026  
**Date:** 2026-01-28  
**Status:** ✅ **COMPLETED**  
**Priority:** P0  
**Scope:** architecture / enforcement / ESLint guards

---

## Executive Summary

A conflict between two ESLint rules for token imports has been resolved by introducing a clear class split between component tokens and foundation tokens. The system now distinguishes between these two token classes, each with exactly one valid import path in consumer code (DOMAIN/PATTERNS), eliminating contradictory enforcement and oscillation edge-cases.

**Key Outcome:** GRADIENT_TOKENS (a foundation token) now has exactly one valid import path: from `@/index`. Component tokens remain forbidden from `@/index` and must be imported directly from `@/FOUNDATION/tokens/components/**`.

---

## Problem Statement

### The Conflict

GRADIENT_TOKENS was caught between two mutually exclusive ESLint rules:

1. **Rule `no-token-imports-from-index`:** Blocked import from `@/index` (GRADIENT_TOKENS was incorrectly in the FORBIDDEN_TOKEN_NAMES list)
2. **Rule `no-restricted-imports`:** Blocked deep-import from `@/FOUNDATION/tokens/gradients`

**Result:** No valid import path existed for GRADIENT_TOKENS in DOMAIN/PATTERNS code.

### Evidence of Conflict

**File:** `src/DOMAIN/sections/EventCard/EventCard.variants.ts` (line 6)

**Before Resolution:**
```typescript
import { GRADIENT_TOKENS, tokenCVA } from "@/index";
```

**ESLint Errors (Before):**
1. `no-restricted-imports`: `'@/FOUNDATION/tokens/gradients' import is restricted from being used by a pattern. Deep imports are forbidden. Use public API via '@/index'...`
2. `no-token-imports-from-index`: `Token 'GRADIENT_TOKENS' must NOT be imported from '@/index'. Import directly from '@/FOUNDATION/tokens/components/**' instead...`

**Analysis:** The first error message suggested using `@/index`, but the second error explicitly forbade it. This created a contradictory enforcement situation.

---

## Root Cause Analysis

### Missing Class Distinction

The ESLint rule `no-token-imports-from-index` did not distinguish between:

- **Component Tokens:** Tokens from `@/FOUNDATION/tokens/components/**` (e.g., CARD_TOKENS, DOMAIN_TOKENS, TABLE_TOKENS)
- **Foundation Tokens:** Tokens from `@/FOUNDATION/tokens/**` outside `components/**` (e.g., GRADIENT_TOKENS, colors, spacing, typography)

### Incorrect Token Classification

GRADIENT_TOKENS was incorrectly included in the `FORBIDDEN_TOKEN_NAMES` list in `no-token-imports-from-index.ts`, even though:

1. It is located in `src/FOUNDATION/tokens/gradients.ts` (not in `components/**`)
2. It is a foundation-level token, not a component token
3. It should be imported from `@/index` (public API), not directly from `@/FOUNDATION/tokens/gradients`

### Architectural Inconsistency

The rule's purpose was to prevent runtime cycles for component tokens, but it was applied to all tokens ending with `_TOKENS`, including foundation tokens that don't have the same runtime cycle risk.

---

## Solution

### Token Import Class Split

Two distinct token classes were defined with different import requirements:

#### Class A: Component Tokens

- **Location:** `@/FOUNDATION/tokens/components/**`
- **Examples:** CARD_TOKENS, DOMAIN_TOKENS, TABLE_TOKENS, TEXT_TOKENS, BUTTON_TOKENS, INPUT_TOKENS, etc.
- **Import Rule:** **MUST** be imported directly from `@/FOUNDATION/tokens/components/**`
- **Prohibition:** **FORBIDDEN** from `@/index`
- **Rationale:** Direct imports prevent runtime cycles and order-dependent initialization failures

#### Class B: Foundation Tokens

- **Location:** `@/FOUNDATION/tokens/**` (outside `components/**`)
- **Examples:** GRADIENT_TOKENS, colors, spacing, typography, radius, shadows, motion, opacity, states, etc.
- **Import Rule:** **MUST** be imported from `@/index`
- **Prohibition:** **FORBIDDEN** as deep-imports from `@/FOUNDATION/tokens/**` (except `components/**`)
- **Rationale:** Foundation tokens are part of the public API and should be accessed through the barrel export

### ESLint Rule Fix

**File:** `eslint-rules/no-token-imports-from-index.ts`

**Changes:**
1. Removed GRADIENT_TOKENS from `FORBIDDEN_TOKEN_NAMES` list
2. Updated rule documentation to clarify it applies only to component tokens
3. Added comments explaining the class split
4. Updated error messages to be more specific about component tokens

**Key Change:**
```typescript
// Before
const FORBIDDEN_TOKEN_NAMES = new Set([
  // ...
  "GRADIENT_TOKENS",  // ❌ Incorrectly included
  // ...
]);

// After
const FORBIDDEN_TOKEN_NAMES = new Set([
  // ...
  // GRADIENT_TOKENS removed: it's a foundation token, not a component token
  // Foundation tokens are allowed from @/index
  // ...
]);
```

---

## Actions Taken

### 1. ESLint Rule Update

**File:** `eslint-rules/no-token-imports-from-index.ts`

- Removed GRADIENT_TOKENS from forbidden list
- Updated rule documentation and comments
- Clarified that rule applies only to component tokens

### 2. Documentation Updates

**Files Updated:**
- `docs/architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md` — Added "Token Import Classes" subsection
- `docs/reports/closed-system/CLOSED_SYSTEM_V2_IMPORT_OSCILLATION_RESOLUTION_025.md` — Added follow-up reference
- `docs/reports/closed-system/CLOSED_SYSTEM_V2_DEEP_RESEARCH_REPO_AUDIT_023.md` — Added STOP LINE

### 3. Validation

- Verified `pnpm typecheck` passes
- Verified conflict resolution for GRADIENT_TOKENS
- Confirmed component tokens remain properly enforced

---

## Evidence

### Before Resolution

**ESLint Output for `EventCard.variants.ts`:**
```
/home/tureckiy/Projects/TenerifeMusic/tenerife-ui/src/DOMAIN/sections/EventCard/EventCard.variants.ts
  6:1   error  '@/FOUNDATION/tokens/gradients' import is restricted from being used by a pattern. Deep imports are forbidden. Use public API via '@/index'...  no-restricted-imports
  7:10  error  Token 'GRADIENT_TOKENS' must NOT be imported from '@/index'. Import directly from '@/FOUNDATION/tokens/components/**' instead...  tenerife-ui-architecture/no-token-imports-from-index
```

**Analysis:** Two mutually exclusive errors for the same import.

### After Resolution

**ESLint Output for `EventCard.variants.ts`:**
```
/home/tureckiy/Projects/TenerifeMusic/tenerife-ui/src/DOMAIN/sections/EventCard/EventCard.variants.ts
  (no errors for GRADIENT_TOKENS import from @/index)
```

**Analysis:** Conflict resolved. GRADIENT_TOKENS can now be imported from `@/index` without errors.

### Component Token Enforcement (Still Active)

**Test:** Attempting to import CARD_TOKENS from `@/index` still triggers the rule:

```
error  Token 'CARD_TOKENS' must NOT be imported from '@/index'. Import directly from '@/FOUNDATION/tokens/components/**' instead...
```

**Analysis:** Component token enforcement remains strict and correct.

### Foundation Token Deep-Import (Still Blocked)

**Test:** Attempting to import GRADIENT_TOKENS from `@/FOUNDATION/tokens/gradients` still triggers the rule:

```
error  '@/FOUNDATION/tokens/gradients' import is restricted from being used by a pattern. Deep imports are forbidden. Use public API via '@/index'...
```

**Analysis:** Deep-import prohibition for foundation tokens remains active and correct.

---

## Acceptance Criteria Check

| Criterion | Status | Evidence |
|-----------|--------|----------|
| GRADIENT_TOKENS has exactly one valid import path in DOMAIN/PATTERNS: from `@/index` | ✅ PASS | ESLint no longer reports errors for GRADIENT_TOKENS import from `@/index` |
| Component tokens remain forbidden from `@/index` and allowed only from `@/FOUNDATION/tokens/components/**` | ✅ PASS | CARD_TOKENS, DOMAIN_TOKENS, etc. still trigger errors when imported from `@/index` |
| Deep-imports for non-component tokens remain forbidden in consumer code | ✅ PASS | Attempting to import GRADIENT_TOKENS from `@/FOUNDATION/tokens/gradients` still triggers `no-restricted-imports` |
| `pnpm lint` passes for GRADIENT_TOKENS conflict | ✅ PASS | No errors for GRADIENT_TOKENS import from `@/index` in EventCard.variants.ts |
| `pnpm typecheck` passes | ✅ PASS | Typecheck completed successfully |
| Canon updated with token import class split | ✅ PASS | CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md updated with "Token Import Classes" subsection |
| Report 026 created | ✅ PASS | This report exists and documents the resolution |

**All acceptance criteria:** ✅ **PASSED**

---

## Decisions Made

1. **Token Import Class Split is Canonical**
   - Component tokens and foundation tokens have distinct import requirements
   - This split is now documented in canonical architecture documents
   - ESLint rules enforce this split deterministically

2. **GRADIENT_TOKENS is a Foundation Token**
   - Located in `@/FOUNDATION/tokens/gradients.ts` (not in `components/**`)
   - Must be imported from `@/index` (public API)
   - Must NOT be deep-imported from `@/FOUNDATION/tokens/gradients`

3. **Component Token Enforcement Remains Strict**
   - Component tokens (CARD_TOKENS, DOMAIN_TOKENS, etc.) remain forbidden from `@/index`
   - Direct imports from `@/FOUNDATION/tokens/components/**` are required
   - This prevents runtime cycles and order-dependent initialization failures

---

## Canonical References

- [CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md) — Foundation Token Import Hygiene section (updated with Token Import Classes)
- [CLOSED_SYSTEM_V2_IMPORT_OSCILLATION_RESOLUTION_025.md](./CLOSED_SYSTEM_V2_IMPORT_OSCILLATION_RESOLUTION_025.md) — Original import oscillation resolution
- [CLOSED_SYSTEM_V2_DEEP_RESEARCH_REPO_AUDIT_023.md](./CLOSED_SYSTEM_V2_DEEP_RESEARCH_REPO_AUDIT_023.md) — Deep research audit with STOP LINE

---

## Files Modified

1. **`eslint-rules/no-token-imports-from-index.ts`**
   - Removed GRADIENT_TOKENS from FORBIDDEN_TOKEN_NAMES
   - Updated rule documentation and comments
   - Clarified component token vs foundation token distinction

2. **`docs/architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md`**
   - Added "Token Import Classes" subsection
   - Documented class split and import requirements
   - Added task reference

3. **`docs/reports/closed-system/CLOSED_SYSTEM_V2_IMPORT_OSCILLATION_RESOLUTION_025.md`**
   - Added follow-up section referencing task 026
   - Documented conflict resolution

4. **`docs/reports/closed-system/CLOSED_SYSTEM_V2_DEEP_RESEARCH_REPO_AUDIT_023.md`**
   - Added STOP LINE section
   - Documented token import class split resolution

5. **`docs/reports/closed-system/CLOSED_SYSTEM_V2_TOKEN_IMPORT_CLASS_SPLIT_026.md`**
   - Created this resolution report

---

## Final Verdict

**Status:** ✅ **RESOLVED_AND_LOCKED**

The token import class split has been successfully implemented, resolving the contradictory ESLint enforcement for GRADIENT_TOKENS. The system now clearly distinguishes between component tokens and foundation tokens, each with exactly one valid import path in consumer code.

**Key Achievements:**
- GRADIENT_TOKENS conflict resolved (can be imported from `@/index`)
- Component token enforcement remains strict (forbidden from `@/index`)
- Foundation token deep-import prohibition remains active
- Canonical documentation updated with class split
- ESLint rules enforce the split deterministically

**System Protection:**
- No contradictory enforcement for token imports
- Clear, single valid import path per token class
- Oscillation edge-cases eliminated for non-component tokens
- Runtime cycle prevention maintained for component tokens

This resolution is **LOCKED** and should not be modified without explicit architectural review and task creation.

---

**Report Completed:** 2026-01-28  
**Next Steps:** None - Resolution is complete and locked
