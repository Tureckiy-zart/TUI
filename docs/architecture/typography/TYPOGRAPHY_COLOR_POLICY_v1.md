# Typography Color Policy v1

**Status:** ✅ CANON  
**Priority:** P0  
**Date Created:** 2026-01-21  
**Version:** 1.0  
**Task:** TUI_FOUNDATION_TYPOGRAPHY_COLOR_POLICY_V1_020

---

## Document Classification

**TYPE:** POLICY  
**MUTABILITY:** EVOLVABLE  
**STATUS:** ✅ CANON  
**RELATIONSHIP:** Complements `TYPOGRAPHY_AUTHORITY.md` (LOCKED) and `TYPOGRAPHY_CONTRACT.md` (ACTIVE)  
**AUTHORITY DOMAIN:** Typography Color Policy

**Purpose:** This document defines the canonical Typography Color Policy v1 for Tenerife UI, establishing allowed text-token combinations for each typography role, eliminating architecturally impossible combinations, and replacing the current typography model with a contract-based approach.

---

## Overview

This document establishes the Typography Color Policy v1, which:

1. **Defines canonical text tokens** - Primary, secondary, tertiary, muted, inverse, disabled, status
2. **Maps roles to allowed text tokens** - Each typography role explicitly declares which text tokens it may use
3. **Eliminates impossible combinations** - Architecturally forbidden role × text-token combinations are impossible by design
4. **Enforces A11Y compliance** - All combinations must meet WCAG 2.1 Level AA contrast requirements

**Key Principle:** Typography roles must explicitly declare allowed text tokens. Forbidden combinations are architecturally impossible, not just discouraged.

---

## Relationship to Other Documents

**TYPOGRAPHY_AUTHORITY.md** (LOCKED) defines:
- Canonical typography token scale (font-size, line-height, font-weight, letter-spacing, font-family)
- Component rules and forbidden patterns
- Token system integration

**TYPOGRAPHY_CONTRACT.md** (ACTIVE) defines:
- Contrast requirements for semantic text roles
- Vertical rhythm specifications (baseline unit alignment)
- A11Y compliance requirements

**TYPOGRAPHY_COLOR_POLICY_v1.md** (this document) defines:
- Allowed text-token combinations for each typography role
- Global prohibitions for role × text-token combinations
- Policy enforcement mechanisms

All three documents work together to ensure complete typography governance.

---

## Canonical Text Tokens

### Text Token Definitions

**Primary Text Token:**
- `primary` - Main text color for readable content
- Day mode: Almost black (`0 0% 9%`)
- Night mode: Light gray (`0 0% 89.8%`)
- **Usage:** Primary content, headings, body text, labels, captions

**Secondary Text Token:**
- `secondary` - Secondary text color for less prominent content
- Day mode: Medium gray (`0 0% 45%`)
- Night mode: Medium gray (`240 5% 64.9%`)
- **Usage:** Secondary content, headings, body text, labels

**Tertiary Text Token:**
- `tertiary` - Lowest emphasis text token for meta-only usage
- Day mode: Light gray (`0 0% 65%`)
- Night mode: Darker gray (`240 5% 50%`)
- **Usage:** Meta text only (helper, placeholder, metadata)

**Muted Text Token:**
- `muted` - Muted text color for subtle content
- Day mode: Muted gray (`0 0% 42%`)
- Night mode: Muted gray (`240 5% 64.9%`)
- **Usage:** Meta text only (helper, placeholder, metadata)

**Inverse Text Token:**
- `inverse` - Inverse text color for contrasting backgrounds
- Day mode: White (`0 0% 100%`) - for dark backgrounds
- Night mode: Almost black (`0 0% 9%`) - for light backgrounds
- **Usage:** Display text on dark surfaces, headings on dark surfaces
- **Restriction:** Must NOT be used on light surfaces (day mode base/elevated surfaces)

**Disabled Text Token:**
- `disabled` - Disabled text color for non-interactive content
- Source: `disabledColors.disabledForeground`
- Day mode: Medium gray (`0 0% 60%`)
- Night mode: Medium gray (`240 5% 50%`)
- **Usage:** Disabled text only
- **Contrast:** Inherits from A11Y disabled policy

**Status Text Tokens:**
- `success`, `warning`, `error`, `info` - Status text colors for explicit status messaging
- Source: `--tm-status-*` tokens
- **Usage:** Status labels, alerts, toasts, validation messages
- **Restriction:** Must NOT be used as general body/label text colors

**Rule:** All text tokens must come from the canonical text token system. Components cannot introduce arbitrary text colors.

---

## Typography Roles and Allowed Text Tokens

### Role Policy Matrix

| Role | Allowed Text Tokens | Min Contrast | Category | Notes |
|------|---------------------|--------------|----------|-------|
| `display` | `primary`, `inverse` | 3.0 | Display | `inverse` only on dark surfaces |
| `h1` | `primary`, `secondary` | 3.0 | Heading | Large text (≥18pt) |
| `h2` | `primary`, `secondary` | 3.0 | Heading | Large text (≥18pt) |
| `h3` | `primary`, `secondary` | 3.0 | Heading | Large text (≥18pt) |
| `h4` | `primary`, `secondary` | 3.0 | Heading | Large text (≥18pt) |
| `h5` | `primary`, `secondary` | 3.0 | Heading | Large text (≥18pt) |
| `h6` | `primary`, `secondary` | 3.0 | Heading | Large text (≥18pt) |
| `body` | `primary`, `secondary` | 4.5 | Body | Normal text |
| `body-sm` | `primary`, `secondary` | 4.5 | Body | Normal text |
| `body-xs` | `primary`, `secondary` | 4.5 | Body | Normal text |
| `label` | `primary`, `secondary` | 4.5 | Label | Normal text |
| `label-sm` | `primary`, `secondary` | 4.5 | Label | Normal text |
| `caption` | `primary` | 4.5 | Caption | Normal text, only primary |
| `meta` | `muted`, `tertiary` | 4.5 | Meta | Helper/placeholder/meta text only |
| `status` | `success`, `warning`, `error`, `info` | 4.5 | Status | Explicit status text only |
| `disabled` | `disabled` | inherits | Disabled | Follows A11Y disabled policy |

### Role Definitions

#### Display Role

**Role:** `display`  
**Allowed Text Tokens:** `primary`, `inverse`  
**Min Contrast:** 3.0 (large text)  
**Restrictions:**
- `inverse` may only be used on dark surfaces (night mode base/elevated surfaces)
- `inverse` must NOT be used on light surfaces (day mode base/elevated surfaces)

**Usage:** Hero sections, prominent display text

#### Heading Roles (h1-h6)

**Roles:** `h1`, `h2`, `h3`, `h4`, `h5`, `h6`  
**Allowed Text Tokens:** `primary`, `secondary`  
**Min Contrast:** 3.0 (large text)  
**Category:** `heading`  
**Policy:** All heading roles follow the same color policy

**Usage:** Structural headings, section titles

**Note:** While h1-h6 are separate roles in `textStyles`, they all follow the same Typography Color Policy (primary, secondary, minContrast 3.0).

#### Body Text Roles

**Roles:** `body`, `body-sm`, `body-xs`  
**Allowed Text Tokens:** `primary`, `secondary`  
**Min Contrast:** 4.5 (normal text)  
**Category:** `body`

**Usage:** Main content, paragraphs, readable text

**Prohibited:** `tertiary`, `muted` (use `secondary` or `meta` role instead)

#### Label Roles

**Roles:** `label`, `label-sm`  
**Allowed Text Tokens:** `primary`, `secondary`  
**Min Contrast:** 4.5 (normal text)  
**Category:** `label`

**Usage:** Form labels, metadata labels

**Prohibited:** `tertiary`, `muted` (use `secondary` or `meta` role instead)

#### Caption Role

**Role:** `caption`  
**Allowed Text Tokens:** `primary`  
**Min Contrast:** 4.5 (normal text)  
**Category:** `caption`

**Usage:** Supporting text, captions, annotations

**Restriction:** Only `primary` text token allowed (most restrictive policy)

**Prohibited:** `secondary`, `tertiary`, `muted`, `inverse`

#### Meta Role

**Role:** `meta`  
**Allowed Text Tokens:** `muted`, `tertiary`  
**Min Contrast:** 4.5 (normal text)  
**Category:** `meta`

**Usage:** Helper text, placeholder text, metadata, subtle annotations

**Restriction:** Only `muted` or `tertiary` text tokens allowed

**Prohibited:** `primary`, `secondary`, `inverse`

#### Status Role

**Role:** `status`  
**Allowed Text Tokens:** `success`, `warning`, `error`, `info`  
**Min Contrast:** 4.5 (normal text)  
**Category:** `status`  
**Usage:** Explicit status messaging only  
**Restriction:** Must NOT be used for regular body/label text

#### Disabled Role

**Role:** `disabled`  
**Allowed Text Tokens:** `disabled`  
**Min Contrast:** inherits (follows A11Y disabled policy)  
**Category:** `disabled`

**Usage:** Disabled text content

**Source:** Uses `disabledColors.disabledForeground` as text token

---

## Global Prohibitions

### Architecturally Forbidden Combinations

The following combinations are **architecturally impossible** and must be prevented by design:

1. **❌ `inverse` on light surfaces (day mode)**
   - `inverse` text on `surface.base`, `surface.elevated1`, `surface.elevated2`, `surface.elevated3` in day mode
   - Rationale: `inverse` is white text for dark backgrounds; using it on light backgrounds creates no contrast

2. **❌ `muted` for body/caption/label roles**
   - `muted` text with `body`, `body-sm`, `body-xs`, `caption`, `label`, `label-sm` roles
   - Rationale: `muted` is reserved for `meta` role only; use `secondary` for less prominent readable text

3. **❌ `tertiary` as readable text**
   - `tertiary` text with `body`, `caption`, `label` roles
   - Rationale: `tertiary` does not meet WCAG AA contrast requirements for readable text; use `secondary` or `meta` role instead

4. **❌ Arbitrary text color overrides**
   - Custom text colors not from the canonical text token system
   - Rationale: Breaks typography hierarchy and A11Y compliance

### Enforcement

**Design-Time Prevention:**
- Typography roles explicitly declare `allowedText` metadata
- Type system prevents invalid combinations
- ESLint rules (future) enforce policy compliance

**Runtime Validation:**
- Typography contrast checker validates only allowed combinations
- Forbidden combinations are not tested (architecturally impossible)

---

## Policy Enforcement

### Type System Enforcement

**Typography Role Policy:**
- Location: `src/FOUNDATION/tokens/typography.ts`
- Export: `typographyRolePolicy` object
- Type: `TypographyRolePolicy` with `allowedText` arrays

**Usage:**
```typescript
import { typographyRolePolicy } from "@/FOUNDATION/tokens/typography";

// Check if text token is allowed for role
const isAllowed = typographyRolePolicy.body.allowedText.includes("primary");
```

### Contrast Validation

**Contrast Checker:**
- Location: `scripts/typography-contrast-check.js`
- Validates: Only allowed role × text-token combinations
- Excludes: Architecturally forbidden combinations (not tested)

**Expected Result:**
- Dramatic reduction in false-positive failures
- Report shows only real A11Y violations

### ESLint Enforcement

**Active Rule:**
- `typography-color-policy` - Enforces allowed role × text-token combinations and forbids muted/tertiary for readable roles

---

## Migration Notes

### Breaking Changes

**Minimal Breaking Changes:**
- Most changes are restrictions on usage, not removal of functionality
- Existing code using `primary`/`secondary` continues to work
- Code using `tertiary`/`muted` in readable contexts requires migration

### Migration Path

1. **Replace `tertiary` in readable contexts:**
   - `body` + `tertiary` → `body` + `secondary` or `meta` + `muted`
   - `caption` + `tertiary` → `caption` + `primary` or `meta` + `muted`
   - `label` + `tertiary` → `label` + `secondary` or `meta` + `muted`

2. **Replace `muted` in readable contexts:**
   - `body` + `muted` → `body` + `secondary` or `meta` + `muted`
   - `caption` + `muted` → `caption` + `primary` or `meta` + `muted`
   - `label` + `muted` → `label` + `secondary` or `meta` + `muted`

3. **Replace `inverse` on light surfaces:**
   - Day mode `inverse` on light backgrounds → `primary`

4. **Add `meta` role for helper/placeholder text:**
   - Helper text, placeholders, metadata → use `meta` role with `muted` color

---

## Related Documents

- `docs/architecture/TYPOGRAPHY_AUTHORITY.md` - LOCKED Typography Authority (complementary)
- `docs/architecture/TYPOGRAPHY_CONTRACT.md` - Typography Foundation Contract (complementary)
- `docs/architecture/closed-system/CLOSED_SYSTEM_V2_TYPOGRAPHY_SEMANTICS_CANON.md` - Typography Semantics Canon (semantic vs presentational usage rules)
- `docs/architecture/A11Y_AUTHORITY.md` - A11Y Authority (disabled policy source)
- `src/FOUNDATION/tokens/typography.ts` - Typography token definitions with role policy
- `src/FOUNDATION/tokens/colors.ts` - Color token definitions (textColors, disabledColors)
- `scripts/typography-contrast-check.js` - Contrast verification script
- `docs/reports/typography-contrast-audit.md` - Contrast audit report

---

**Status:** ✅ **CANON**  
**Version:** 1.0  
**Date Created:** 2026-01-21  
**Last Updated:** 2026-01-21  
**Priority:** P0  
**Task:** TUI_TYPOGRAPHY_COLOR_POLICY_CANON_008
