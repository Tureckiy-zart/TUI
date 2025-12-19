# API Decision: Public Export vs Internal for Divider, Image, Link, Badge

**Decision ID:** `TUI_API_DECISION_PRIMITIVES_EXPORT`  
**Version:** 3.1  
**Date:** 2025-12-17  
**Status:** ✅ **DECIDED**  
**Authority:** This decision is canonical and binding

---

## Executive Summary

This document records the architectural decision regarding which of the following primitive components should be part of the public API of `@tenerife.music/ui`:

- **Divider**
- **Image**
- **Link**
- **Badge**

**Decision:** Only **Badge** and **Link** are approved for public export. **Divider** and **Image** remain internal-only.

---

## Decision Matrix

| Component | Exists in src | Currently Exported | Category | Public API Decision | Rationale |
|-----------|---------------|-------------------|----------|---------------------|-----------|
| **Divider** | ✅ Yes (`src/PRIMITIVES/Divider/`) | ❌ No | Internal | **KEEP INTERNAL** | Minimal value over native HTML `<hr>`; token usage is basic |
| **Image** | ✅ Yes (`src/PRIMITIVES/Image/`) | ❌ No | Internal | **KEEP INTERNAL** | Complex implementation; domain-specific concerns (skeleton, fallback); not a universal UI primitive |
| **Link** | ✅ Yes (`src/PRIMITIVES/Link/`) | ❌ No | Extension | **EXPORT PUBLICLY** | Universal UI primitive; token-driven variants; adds value over native `<a>` |
| **Badge** | ✅ Yes (`src/PRIMITIVES/Badge/`) | ❌ No | Extension | **EXPORT PUBLICLY** | Universal UI primitive; token-driven variants; common design system pattern |

---

## Detailed Component Analysis

### 1. Divider

**Location:** `src/PRIMITIVES/Divider/Divider.tsx`

**Current Implementation:**
- Simple wrapper around `<div>` with border styling
- Uses `DIVIDER_TOKENS` for width/height
- Supports `orientation` (horizontal/vertical) and `variant` (solid/dashed/dotted)
- Minimal logic beyond CSS class application

**Evaluation:**

✅ **Pros:**
- Token-driven (uses `DIVIDER_TOKENS`)
- Simple, focused API

❌ **Cons:**
- **Minimal value over native HTML:** Native `<hr>` element already provides semantic separation
- **No behavioral complexity:** Pure styling wrapper
- **Not a universal UI primitive:** Dividers are typically context-specific (card separators, list dividers)
- **Foundation Lock compliance:** Not a Foundation component (Foundation is closed)
- **Token usage is basic:** Only uses width/height tokens, no complex token-driven patterns

**Decision:** **KEEP INTERNAL**

**Rationale:**
- Divider provides minimal value over native HTML `<hr>` or simple border utilities
- The component is a pure styling wrapper without behavioral complexity
- Dividers are typically context-specific (used within cards, lists, menus) rather than standalone primitives
- TUI philosophy prioritizes components that add systemic value; Divider does not meet this threshold
- External consumers can achieve divider functionality with native HTML + token-based styling

**Documentation Action:** None (component remains internal)

---

### 2. Image

**Location:** `src/PRIMITIVES/Image/Image.tsx`

**Current Implementation:**
- Complex image component with loading states, fallback handling, skeleton support
- Supports radius, shadow, aspect ratio, fill mode
- Includes error handling, fallback image logic, loading callbacks
- Uses hardcoded Tailwind classes for radius/shadow (violates token-driven rules)

**Evaluation:**

✅ **Pros:**
- Rich feature set (loading states, fallbacks, skeleton)
- Useful for production applications

❌ **Cons:**
- **Token violations:** Uses hardcoded Tailwind classes (`rounded-sm`, `shadow-md`) instead of token unions
- **Domain-specific concerns:** Skeleton loading, fallback handling are application-specific, not universal UI primitives
- **Complexity without systemic value:** The component solves application problems, not design system problems
- **Not a universal UI primitive:** Image handling is typically domain-specific (optimization, CDN, lazy loading)
- **Foundation Lock compliance:** Not a Foundation component (Foundation is closed)
- **Architectural mismatch:** TUI is design infrastructure, not an application framework

**Decision:** **KEEP INTERNAL**

**Rationale:**
- Image component contains domain-specific logic (skeleton loading, fallback handling) that belongs in application code, not a design system
- The component violates token-driven architecture (uses hardcoded Tailwind classes)
- Image optimization, lazy loading, and fallback strategies are application concerns, not design system concerns
- TUI philosophy: provide design infrastructure (tokens, primitives), not application utilities
- External consumers should implement image handling based on their specific requirements (Next.js Image, custom optimization, etc.)

**Documentation Action:** None (component remains internal)

---

### 3. Link

**Location:** `src/PRIMITIVES/Link/Link.tsx`

**Current Implementation:**
- Token-driven link component with CVA variants
- Supports multiple variants (primary, secondary, accent, outline, ghost, link, destructive)
- Supports sizes (xs, sm, md, lg, xl)
- Uses Radix Slot for composition (`asChild` prop)
- Includes icon support (leftIcon, rightIcon)
- Focus-visible ring for accessibility

**Evaluation:**

✅ **Pros:**
- **Universal UI primitive:** Links are fundamental to web applications
- **Token-driven:** Uses CVA with token-based variants
- **Adds value over native `<a>`:** Provides consistent styling, variants, and composition patterns
- **Accessibility:** Includes focus-visible ring
- **Composition support:** Radix Slot enables flexible composition
- **Extension layer appropriate:** Not a Foundation component, but a valuable Extension primitive

❌ **Cons:**
- Uses hardcoded Tailwind classes in variants (e.g., `px-md`, `py-sm`) - should use token unions
- Some variant styles use raw Tailwind (e.g., `underline-offset-4`)

**Decision:** **EXPORT PUBLICLY** (with token compliance fix required)

**Rationale:**
- Link is a universal UI primitive that appears in virtually every web application
- The component provides significant value over native `<a>` through token-driven variants and consistent styling
- Links are a core design system primitive, not domain-specific
- The component follows Extension layer patterns (token-driven, CVA variants)
- External consumers need consistent link styling across applications

**Documentation Action:** Add to public API documentation

**Follow-up Task:** Fix token violations (replace hardcoded Tailwind with token unions)

---

### 4. Badge

**Location:** `src/PRIMITIVES/Badge/Badge.tsx`

**Current Implementation:**
- Token-driven badge component with CVA variants
- Supports multiple variants (primary, secondary, accent, outline, ghost, link, destructive)
- Uses token-based styling patterns
- Simple, focused API

**Evaluation:**

✅ **Pros:**
- **Universal UI primitive:** Badges are common in design systems (status indicators, labels, tags)
- **Token-driven:** Uses CVA with token-based variants
- **Adds value over native HTML:** Provides consistent styling and semantic variants
- **Extension layer appropriate:** Not a Foundation component, but a valuable Extension primitive
- **Simple, focused:** Single responsibility, clear API

❌ **Cons:**
- Uses hardcoded Tailwind classes in variants (e.g., `px-xs`, `py-xs`) - should use token unions
- Some variant styles use raw Tailwind (e.g., `rounded-full`)

**Decision:** **EXPORT PUBLICLY** (with token compliance fix required)

**Rationale:**
- Badge is a universal UI primitive used across applications (status indicators, labels, tags, counts)
- The component provides significant value through token-driven variants and consistent styling
- Badges are a core design system primitive, not domain-specific
- The component follows Extension layer patterns (token-driven, CVA variants)
- External consumers need consistent badge styling across applications

**Documentation Action:** Add to public API documentation

**Follow-up Task:** Fix token violations (replace hardcoded Tailwind with token unions)

---

## Architectural Principles Applied

### 1. Universal UI Primitive Test

**Question:** Is this component a universal UI primitive that appears across multiple domains?

- ✅ **Link:** Yes - links appear in navigation, content, actions, everywhere
- ✅ **Badge:** Yes - badges appear in status indicators, labels, tags, counts
- ❌ **Divider:** No - dividers are context-specific (card separators, list dividers)
- ❌ **Image:** No - image handling is domain-specific (optimization, CDN, lazy loading)

### 2. Value Over Native HTML Test

**Question:** Does this component add significant value over native HTML elements?

- ✅ **Link:** Yes - token-driven variants, consistent styling, composition patterns
- ✅ **Badge:** Yes - token-driven variants, consistent styling, semantic variants
- ❌ **Divider:** No - minimal value over native `<hr>` or border utilities
- ❌ **Image:** No - native `<img>` + application-specific logic is more appropriate

### 3. Token-Driven Compliance Test

**Question:** Does this component follow token-driven architecture?

- ✅ **Link:** Mostly - uses CVA variants, but has hardcoded Tailwind classes (fixable)
- ✅ **Badge:** Mostly - uses CVA variants, but has hardcoded Tailwind classes (fixable)
- ✅ **Divider:** Yes - uses `DIVIDER_TOKENS`, but minimal token usage
- ❌ **Image:** No - uses hardcoded Tailwind classes for radius/shadow (violation)

### 4. Foundation Lock Compliance Test

**Question:** Does this component violate Foundation Lock rules?

- ✅ **All components:** No - none are Foundation components, all are Extension/Internal

### 5. Design Infrastructure vs Application Utility Test

**Question:** Is this component design infrastructure or an application utility?

- ✅ **Link:** Design infrastructure - provides consistent link styling
- ✅ **Badge:** Design infrastructure - provides consistent badge styling
- ❌ **Divider:** Borderline - minimal infrastructure value
- ❌ **Image:** Application utility - contains domain-specific logic (skeleton, fallback)

---

## Follow-Up Tasks

### Task 1: Export Link and Badge to Public API

**Priority:** High  
**Type:** Implementation

**Actions:**
1. Add `Link` and `Badge` exports to `src/index.ts`
2. Export types: `LinkProps`, `BadgeProps`, `linkVariants`, `badgeVariants`
3. Update public API documentation (`docs/reference/public-api.md`)
4. Add Storybook stories if missing
5. Update `EXTENSION_STATE.md` to list Link and Badge as ALLOWED

**Acceptance Criteria:**
- [ ] Link and Badge are exported from `src/index.ts`
- [ ] Types are exported
- [ ] Public API documentation is updated
- [ ] Canonical state document is updated

---

### Task 2: Fix Token Violations in Link and Badge

**Priority:** High  
**Type:** Refactor

**Actions:**
1. Replace hardcoded Tailwind classes in `linkVariants` with token unions
2. Replace hardcoded Tailwind classes in `badgeVariants` with token unions
3. Ensure all spacing, radius, and typography values use token unions
4. Verify token compliance via linting/verification scripts

**Acceptance Criteria:**
- [ ] No hardcoded Tailwind classes in Link variants
- [ ] No hardcoded Tailwind classes in Badge variants
- [ ] All visual props use token unions
- [ ] Token compliance verification passes

---

### Task 3: Document Internal Components (Divider, Image)

**Priority:** Low  
**Type:** Documentation

**Actions:**
1. Ensure Divider and Image are listed in `EXTENSION_STATE.md` as RESTRICTED
2. Document that these components are internal-only
3. Add notes explaining why they are not public API

**Acceptance Criteria:**
- [ ] Divider and Image are marked as RESTRICTED in canonical state
- [ ] Rationale is documented

---

## Documentation Alignment Plan

### Public API Documentation (`docs/reference/public-api.md`)

**Add:**
- Link component section with API reference
- Badge component section with API reference

**Update:**
- Component exports list
- Type exports list

### Canonical State Document (`docs/architecture/EXTENSION_STATE.md`)

**Add to ALLOWED:**
- Link (Extension Layer - Visual Components)
- Badge (Extension Layer - Visual Components)

**Add to RESTRICTED:**
- Divider (if not already listed)
- Image (if not already listed)

---

## Decision Rationale Summary

### Why Link and Badge?

1. **Universal UI Primitives:** Both are fundamental components that appear across all web applications
2. **Token-Driven Value:** Both provide token-driven variants that add value over native HTML
3. **Design System Core:** Both are core design system primitives, not domain-specific utilities
4. **Extension Layer Appropriate:** Both fit the Extension layer pattern (token-driven, CVA variants)

### Why Not Divider and Image?

1. **Divider:** Minimal value over native HTML; context-specific rather than universal
2. **Image:** Domain-specific concerns (optimization, fallback, skeleton) belong in application code, not design system

---

## Compliance Verification

This decision complies with:

- ✅ **Foundation Lock:** No Foundation components are affected
- ✅ **Extension Authority Contract:** Link and Badge are Extension components
- ✅ **Token System:** Both approved components use token-driven patterns (with fixes required)
- ✅ **TUI Philosophy:** Decision prioritizes design infrastructure over application utilities
- ✅ **Public API Rules:** Only universal UI primitives are exported

---

## Version History

- **v3.1** (2025-12-17): Final decision document
  - Complete component analysis
  - Decision matrix with rationale
  - Follow-up tasks defined
  - Documentation alignment plan

---

**Status:** ✅ **DECIDED**  
**Next Steps:** Execute follow-up tasks (export Link/Badge, fix token violations, update documentation)

---

**End of Decision Document**

