# Token System Reality Audit - Canon & Locks Binding

**Task ID:** TUI_TOKEN_SYSTEM_REALITY_AUDIT_027  
**Phase:** P0 - Canon & Locks Binding  
**Date Created:** 2026-01-28  
**Status:** ✅ Complete

---

## Purpose

This document extracts and records the canonical rules and lock status for the token system from authority documents. It defines what token changes are allowed vs locked, which token families are considered "closed" and which are extendable, and rules for consumer usage.

---

## Locked Token Families (Cannot Be Modified)

### Foundation Token Domains (LOCKED)

**Status:** 🔒 **LOCKED** - Part of Foundation CLOSED  
**Source:** [TOKEN_AUTHORITY.md](../../architecture/TOKEN_AUTHORITY.md), [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md)

The following Foundation token domains are **FROZEN** and **IMMUTABLE**:

1. **Token Domain Structure** - No token domains may be added, removed, merged, or split
2. **Domain Ownership Rules** - Component → token domain mappings are immutable
3. **Shared vs Component-Specific Separation** - The distinction between shared and component-specific domains is fixed
4. **Token Naming Conventions** - All naming patterns and conventions are locked
5. **Duplication Rules** - The semantic over DRY principle is immutable

**Locked Foundation Token Files:**
- `src/FOUNDATION/tokens/spacing.ts` - Spacing utilities (LOCKED via Spacing Authority)
- `src/FOUNDATION/tokens/typography.ts` - Typography tokens (LOCKED via Typography Authority)
- `src/FOUNDATION/tokens/colors.ts` - Color system (LOCKED via Foundation)
- `src/FOUNDATION/tokens/radius.ts` - Border radius (LOCKED via Radius Authority)
- `src/FOUNDATION/tokens/shadows.ts` - Elevation shadows (LOCKED via Elevation Authority)
- `src/FOUNDATION/tokens/motion.ts` - Animation tokens (LOCKED via Motion Authority)
- `src/FOUNDATION/tokens/gradients.ts` - Gradient patterns (LOCKED)
- `src/FOUNDATION/tokens/opacity.ts` - Opacity utilities (LOCKED)

**What Is Forbidden:**
- ❌ Modifying token values
- ❌ Adding or removing token domains
- ❌ Merging or splitting existing domains
- ❌ Reinterpreting token semantics
- ❌ Cross-domain token dependencies
- ❌ Changes to shared vs component-specific classification

### Component Token Domains (LOCKED)

**Status:** 🔒 **LOCKED** - Part of Foundation CLOSED  
**Source:** [TOKEN_AUTHORITY.md](../../architecture/TOKEN_AUTHORITY.md)

The following component token domains are **LOCKED**:

1. **TEXT_TOKENS** - ✅ LOCKED (2025-12-15) via Text / Typography component lock
2. **CODE_TOKENS** - ✅ LOCKED (2025-12-15) via Text / Typography component lock

**All component token domains** follow the same ownership rules:
- One component, one token domain
- No cross-domain dependencies
- Token domain encapsulation

**What Is Forbidden:**
- ❌ Modifying existing component token values
- ❌ Cross-domain token imports
- ❌ Token domain leakage (one component's tokens in another's domain)

---

## Extendable Token Families (Can Be Extended)

### Extension Layer Token Usage

**Status:** ✅ **ALLOWED** - Extension can use existing tokens  
**Source:** [EXTENSION_AUTHORITY.md](../../architecture/EXTENSION_AUTHORITY.md)

Extension components **MAY**:

1. **Use Existing Tokens** - Extension can use tokens from all Foundation Token Authorities:
   - ✅ Spacing Authority tokens (spacing, padding, margin, gap)
   - ✅ Radius Authority tokens (border radius)
   - ✅ Typography Authority tokens (font sizes, weights, line heights)
   - ✅ Motion Authority tokens (durations, easings, transitions)
   - ✅ Elevation Authority tokens (shadows, z-index)
   - ✅ Color tokens (from Token System)
   - ✅ State tokens (from State Authority Contract)

2. **Create New Extension Components** - Extension components may be created without restrictions (subject to naming and composition rules)

**What Is Allowed:**
- ✅ Consumption of existing tokens
- ✅ Creation of new component token domains (ONLY if component is new and explicitly approved)
- ✅ Documentation updates (clarifications, no semantic changes)

**What Is Forbidden:**
- ❌ Modifying token values
- ❌ Creating new token domains without unlock procedure
- ❌ Using raw values instead of tokens
- ❌ Violating Token Authority rules

### New Component Token Domains

**Status:** ✅ **ALLOWED** (with restrictions)  
**Source:** [TOKEN_AUTHORITY.md](../../architecture/TOKEN_AUTHORITY.md)

New component token domains **MAY** be created **ONLY if**:
- The component is new (not existing)
- The creation is explicitly approved via proper workflow
- No existing domains are modified

**Rule:** New token domains must follow the same ownership rules:
- One component, one token domain
- No cross-domain dependencies
- Token domain encapsulation

---

## Consumer Usage Rules

### Import Surface Rules

**Status:** 🔒 **LOCKED** - Part of Closed System v2  
**Source:** [CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md)

**Rule:** Inside the library (PATTERNS, COMPOSITION, PRIMITIVES, DOMAIN), Foundation component tokens **MUST** be imported directly from `@/FOUNDATION/tokens/components/**`, **NOT** from the public barrel (`@/index`).

**Reason:** Direct token imports prevent runtime cycles and order-dependent initialization failures.

**Scope:** This is a hygiene rule that applies to internal library code (DOMAIN, PATTERNS, COMPOSITION, PRIMITIVES). External consumer code should continue using the public API (`@/index` or `@tenerife.music/ui`).

**Enforcement:** ESLint rule `no-token-imports-from-index` explicitly forbids Foundation component token imports from `@/index` in DOMAIN/PATTERNS files.

**What Is Allowed:**
- ✅ Direct imports: `import { TABLE_TOKENS } from "@/FOUNDATION/tokens/components/table"`
- ✅ Public API imports (for external consumers): `import { Button } from "@tenerife.music/ui"`

**What Is Forbidden:**
- ❌ Token imports from `@/index` in DOMAIN/PATTERNS files
- ❌ Deep imports from internal paths in consumer code

### Token Usage Rules

**Status:** 🔒 **LOCKED** - Part of Closed System v2  
**Source:** [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md)

**Rule:** All visual properties **MUST** use token unions, never raw strings or numbers.

**What Is Allowed:**
- ✅ Token props: `padding="md"`, `bg="primary"`
- ✅ Foundation layout components: `Stack`, `Box`, `Container` with token props
- ✅ Token unions: `SpacingToken`, `RadiusToken`, `ColorToken`, etc.

**What Is Forbidden:**
- ❌ Raw values: `padding="16px"`, `bg="red"`
- ❌ Utility classes: `className="p-4 bg-red-500"`
- ❌ Inline styles: `style={{ padding: "16px" }}`
- ❌ Arbitrary CSS values instead of tokens

### Foundation Component Token Usage

**Status:** 🔒 **LOCKED** - Foundation Enforcement  
**Source:** [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md), [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md)

**Rule:** Foundation components exclude `className` and `style` props from public API. Foundation Enforcement is **FINAL/APPLIED** and **LOCKED**.

**What Is Forbidden:**
- ❌ Passing `className` to Foundation components
- ❌ Passing `style` to Foundation components
- ❌ Prop smuggling (`{...props}` spreading forbidden props)

**What Is Allowed:**
- ✅ Using component props for styling: `<Button variant="primary" size="lg">`
- ✅ Using Foundation layout components for spacing/layout: `<Stack gap="md">`

---

## Token Authority Contracts

### Authority Contract Status

**Source:** [TOKEN_AUTHORITY.md](../../architecture/TOKEN_AUTHORITY.md)

All Token Authority Contracts are **LOCKED**:

1. **Spacing Authority Contract** - ✅ LOCKED
2. **Radius Authority Contract** - ✅ LOCKED
3. **Typography Authority Contract** - ✅ LOCKED
4. **Motion Authority Contract** - ✅ LOCKED
5. **Elevation Authority Contract** - ✅ LOCKED

**Rule:** Extension must use tokens according to their respective Authority rules. Extension cannot modify token values or create new token domains without unlock procedure.

---

## Unlock Procedure

**Status:** 🔒 **REQUIRED** for any locked token modifications  
**Source:** [TOKEN_AUTHORITY.md](../../architecture/TOKEN_AUTHORITY.md), [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md)

If token system modifications are required, the following procedure **MUST** be followed:

1. **Create Unlock Task** - Define explicit requirements and justification
2. **Perform Full Audit** - Complete audit of all token domains and component usage
3. **Get Approval** - Receive explicit approval for unlock and modifications
4. **Apply Changes** - Make approved changes with full verification
5. **Re-verify** - Complete verification to ensure no violations introduced
6. **Re-lock** - Re-apply lock with updated documentation

**⚠️ CRITICAL**: This lock applies to **BOTH humans and AI agents**. Any request to modify locked aspects of the token system **MUST** be refused with reference to this lock and the required unlock procedure.

---

## Summary

### Locked (Cannot Modify)

- ✅ All Foundation token domains (spacing, typography, colors, radius, shadows, motion, gradients, opacity)
- ✅ Token domain structure and ownership rules
- ✅ Shared vs component-specific separation
- ✅ Token naming conventions
- ✅ Duplication rules (semantic over DRY)
- ✅ TEXT_TOKENS and CODE_TOKENS (component-specific locks)
- ✅ Import surface rules (direct imports for internal code)
- ✅ Token usage rules (token unions only, no raw values)
- ✅ Foundation component token usage (no className/style props)

### Extendable (Can Use/Extend)

- ✅ Extension layer can use existing tokens from all Token Authorities
- ✅ New component token domains (if component is new and approved)
- ✅ Documentation updates (clarifications only)
- ✅ Consumer code can use public API (`@/index` or `@tenerife.music/ui`)

### Gap Classification Rules

For gap analysis (P3), each gap must be classified as:

- **ALLOWED** - Can be added without unlock (e.g., new Extension component tokens for new components)
- **LOCKED** - Requires unlock procedure (e.g., modifying existing Foundation token values, changing token domain structure)

---

## Related Documents

- [TOKEN_AUTHORITY.md](../../architecture/TOKEN_AUTHORITY.md) - Token system documentation (LOCKED)
- [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Foundation layer lock status
- [EXTENSION_AUTHORITY.md](../../architecture/EXTENSION_AUTHORITY.md) - Extension layer boundaries
- [CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md) - System closure rationale
- [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md) - Enforcement guard rules
- [CLOSED_SYSTEM_V2_PHASE_D_LOCK.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_D_LOCK.md) - Phase D lock declaration

---

**Last Updated:** 2026-01-28  
**Status:** ✅ Complete (P0)
