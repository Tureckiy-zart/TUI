# Closed System v2 — System Closure

**Project:** @tenerife.music/ui  
**Version:** 1.0  
**Date Created:** 2026-01-27  
**Last Updated:** 2026-01-28 (Runtime Utilities Boundary Lock - TUNG-028)  
**Status:** ✅ **CANONICAL**  
**Authority:** HIGHEST  
**Mutability:** IMMUTABLE_AFTER_MERGE  
**Task ID:** TUI_CSV2_BLOCK_10_STOP_LINE_AND_CLOSURE

---

## Purpose

This document explains why Closed System v2 is architecturally closed and what problems this closure prevents. It defines the change control policy that requires all modifications to pass through formal audit processes.

**This document does not define new rules or enforcement mechanisms. It explains the rationale behind existing Closed System v2 architecture and change control policies.**

---

## What is a Closed System

A **closed system** in the context of UI/Design System architecture is a system where:

1. **Expression Surface is Fixed**: All ways to express UI intent are explicitly defined and limited to sanctioned architectural surfaces. No hidden or implicit channels exist.

2. **Boundaries are Enforced**: The boundary between public API (what consumers can use) and internal implementation (library internals) is strictly enforced and cannot be bypassed.

3. **Change Control is Mandatory**: Any modification to the system must pass through formal audit and validation processes. Ad-hoc changes that bypass architectural constraints are forbidden.

4. **Deterministic Behavior**: Given the same inputs (props, tokens, state), the system produces the same outputs (rendering, behavior). No hidden variation channels exist.

5. **Contract Completeness**: All allowed ways to modify UI are covered by explicit contracts. Gaps in contracts are treated as architectural defects, not as "flexibility."

**Closed System v2 is not "flexible with guidelines." It is architecturally closed with explicit, enforced boundaries.**

---

## Problem Classes Prevented by Closure

Closed System v2 closure prevents three fundamental classes of architectural problems:

### 1. Bypass Problems

**Definition:** Bypass occurs when consumer code or library internals use channels that circumvent sanctioned architectural surfaces.

**Examples:**
- Deep imports (`@/PRIMITIVES/Button` instead of public API)
- Raw DOM manipulation outside DOM-boundary components
- Utility styling (`className="p-4"`) that bypasses token system
- Prop smuggling (`{...props}` spreading forbidden props like `className`/`style` into Foundation components)
- CSS targeting Foundation internals (global styles affecting component structure)

**Why Closure Prevents Bypass:**
- Public API is the single source of truth for consumer code
- Internal paths (`@/PRIMITIVES`, `@/FOUNDATION`, `@/COMPOSITION`) are not part of the contract
- Token system is the only sanctioned way to express visual properties
- Foundation components exclude `className`/`style` from public API, making bypass impossible

**Impact if Not Prevented:**
- Tight coupling between consumer code and internal structure
- Refactoring becomes risky (internal changes break consumer code)
- Design system consistency breaks (bypasses allow arbitrary styling)
- Theme support fails (bypassed styling doesn't respect tokens)

### 2. Drift Problems

**Definition:** Drift occurs when the system gradually accumulates inconsistencies, contradictions, or multiple ways to express the same intent, leading to architectural ambiguity.

**Examples:**
- Multiple ways to achieve the same visual result (token props vs utility classes vs inline styles)
- Inconsistent component APIs (some components accept `className`, others don't)
- Documentation that contradicts implementation
- Examples that demonstrate bypass patterns instead of sanctioned patterns

**Why Closure Prevents Drift:**
- Single Expression Surface principle: one intent = one sanctioned path
- Canonical documentation is the authoritative source (no ambiguity allowed)
- Enforcement mechanisms detect and prevent drift at CI level
- Change control requires audit before any modification

**Impact if Not Prevented:**
- Agent confusion (humans and AI interpret rules incorrectly)
- Inconsistent UI (same intent produces different results)
- Maintenance burden (multiple patterns to support and document)
- Loss of architectural clarity (unclear what is allowed vs forbidden)

### 3. Coupling Problems

**Definition:** Coupling occurs when consumer code depends on library internals, making the system fragile to internal changes.

**Examples:**
- Consumer code imports from internal paths (`@/FOUNDATION/tokens/components/button`)
- Consumer code depends on internal component structure (DOM selectors, CSS classes)
- Consumer code relies on implementation details (Radix primitives, internal state management)

**Why Closure Prevents Coupling:**
- Public API (`src/index.ts`) is the only sanctioned import surface
- Internal structure is not part of the contract (can be refactored without breaking consumers)
- DOM-boundary components are explicitly listed (no arbitrary DOM access)
- Foundation components hide implementation details (Radix, internal structure)

**Impact if Not Prevented:**
- Refactoring becomes impossible (internal changes break consumers)
- Library evolution is blocked (cannot improve internals without breaking changes)
- Consumer code becomes brittle (depends on unstable internals)
- Testing becomes difficult (must mock internal implementation details)

---

## Why Certain Patterns Are Forbidden

### Deep Imports Are Forbidden

**Pattern:** `import { Button } from "@/PRIMITIVES/Button"`

**Why Forbidden:**
- Internal paths (`@/PRIMITIVES`, `@/FOUNDATION`, `@/COMPOSITION`) are implementation details
- Public API (`src/index.ts`) is the contract boundary
- Deep imports create tight coupling (consumer code depends on internal structure)
- Internal structure can change without breaking public API contract

**Sanctioned Alternative:**
- `import { Button } from "@tenerife.music/ui"` or `import { Button } from "@/index"`

### Raw DOM Access Is Forbidden (Outside DOM-Boundary Components)

**Pattern:** Direct `div`, `span`, `button` usage where Foundation components exist

**Why Forbidden:**
- Foundation components provide token-driven, accessible, consistent implementations
- Raw DOM bypasses token system, accessibility, and design consistency
- DOM-boundary components (Field, SearchInput, Combobox, Dialog, NextLinkAdapter, NavLink, HelperText) are the only sanctioned exceptions

**Sanctioned Alternative:**
- Use Foundation components: `Text`, `Button`, `Input`, `Heading`, `Link`
- For DOM-boundary cases, use explicitly listed DOM-boundary components

### Utility Styling Is Forbidden

**Pattern:** `className="p-4 bg-red-500"` or Tailwind utilities for visual properties

**Why Forbidden:**
- Token system is the single source of truth for visual properties
- Utility classes bypass token system (no theme support, no design consistency)
- Utility classes allow arbitrary values that don't align with design system
- Token changes won't affect utility-styled components

**Sanctioned Alternative:**
- Use token props: `padding="md"`, `bg="primary"`
- Use Foundation layout components: `Stack`, `Box`, `Container` with token props

### Prop Smuggling Is Forbidden

**Pattern:** `{...props}` spreading into Foundation components without explicit typing

**Why Forbidden:**
- Untyped spreads can inject forbidden props (`className`, `style`)
- Foundation components exclude `className`/`style` from public API
- Prop smuggling bypasses Foundation Enforcement (type-level and runtime-level)

**Sanctioned Alternative:**
- Explicitly type props: `const buttonProps: ButtonProps = { variant: "primary" }`
- Use direct props: `<Button variant="primary">` instead of spreads

---

## Closed System v2 vs Component Library

Closed System v2 is **not** "just a component library." It is an **architecturally closed design system** with enforced boundaries.

### Component Library (Open System)

**Characteristics:**
- Components can be used in any way
- Internal structure is accessible (deep imports allowed)
- Styling is flexible (utility classes, inline styles, custom CSS)
- Changes are ad-hoc (no formal audit required)
- Documentation is advisory (guidelines, not rules)

**Problems:**
- Drift accumulates over time (multiple ways to do the same thing)
- Coupling grows (consumers depend on internals)
- Consistency breaks (bypasses allow arbitrary styling)
- Refactoring becomes risky (internal changes break consumers)

### Closed System v2 (Closed System)

**Characteristics:**
- Components can be used only through sanctioned APIs
- Internal structure is hidden (public API is the only import surface)
- Styling is token-driven (no utility classes, no raw values)
- Changes require formal audit (no ad-hoc modifications)
- Documentation is authoritative (canonical, not advisory)

**Benefits:**
- Drift is prevented (single expression surface)
- Coupling is minimized (consumers depend only on public API)
- Consistency is enforced (token system is the only styling channel)
- Refactoring is safe (internal changes don't break public API contract)

---

## Change Control Policy

### Why Changes Require Audit

**Principle:** Any modification to Closed System v2 must pass through formal audit to ensure it does not violate architectural closure.

**Rationale:**
1. **Prevent Bypass:** Audit verifies that changes don't introduce new bypass channels
2. **Prevent Drift:** Audit ensures changes align with canonical architecture
3. **Prevent Coupling:** Audit verifies that changes don't expose internal structure
4. **Maintain Determinism:** Audit ensures changes preserve deterministic behavior
5. **Maintain Contract Completeness:** Audit verifies that changes don't create contract gaps

### What Requires Audit

**All modifications to Closed System v2 require audit:**
- Changes to Foundation components (API, behavior, structure)
- Changes to COMPOSITION components (if they affect public API)
- Changes to token system (values, domains, ownership)
- Changes to enforcement mechanisms (ESLint rules, audit scripts)
- Changes to canonical documentation (architecture documents, contracts)

**Exception:** Bug fixes that preserve public API and don't introduce new patterns may be exempt from full audit, but must still pass validation checks.

### Audit Process

**Audit must verify:**
1. **No Bypass Introduced:** Changes don't create new ways to circumvent sanctioned surfaces
2. **No Drift Introduced:** Changes align with canonical architecture and don't contradict existing rules
3. **No Coupling Introduced:** Changes don't expose internal structure or create new dependencies
4. **Determinism Preserved:** Changes maintain deterministic behavior (same inputs = same outputs)
5. **Contract Completeness Preserved:** Changes don't create gaps in contracts or documentation

**Audit artifacts:**
- Audit report documenting findings and verification
- Evidence that all violation classes (V1-V5, S1-S6) remain at zero
- Verification that boundary model is preserved
- Confirmation that canonical documentation is updated

### What Happens Without Audit

**Ad-hoc changes that bypass audit:**
- Risk introducing bypass channels (deep imports, raw DOM, utility styling)
- Risk introducing drift (inconsistent patterns, ambiguous documentation)
- Risk introducing coupling (exposed internals, tight dependencies)
- Risk breaking determinism (hidden variation channels)
- Risk creating contract gaps (undocumented behavior)

**Result:** System closure is violated, architectural integrity degrades, and the system becomes an "open system" with all associated problems.

---

## Runtime Hygiene Rules

### Foundation Token Import Hygiene

**Rule:** Inside the library (PATTERNS, COMPOSITION, PRIMITIVES, DOMAIN), Foundation component tokens MUST be imported directly from `@/FOUNDATION/tokens/components/**`, NOT from the public barrel (`@/index`).

**Reason:** Direct token imports prevent runtime cycles and order-dependent initialization failures (e.g., `SIMPLETABLE_TOKENS.padding === undefined`). Importing tokens through the public barrel can create circular dependencies that cause partial initialization.

**Scope:** This is a hygiene rule that applies to internal library code (DOMAIN, PATTERNS, COMPOSITION, PRIMITIVES). External consumer code should continue using the public API (`@/index` or `@tenerife.music/ui`).

**Enforcement:** This rule is enforced via ESLint rule `no-token-imports-from-index` in the `consumer-import-guard` configuration block (`eslint.config.mjs`). The rule explicitly forbids importing Foundation component tokens (CARD_TOKENS, DOMAIN_TOKENS, TABLE_TOKENS, etc.) from `@/index` in DOMAIN/PATTERNS files and provides clear error messages directing developers to use the direct import path.

**Token Import Classes:** The system distinguishes between two classes of tokens with different import requirements:

- **Component Tokens (Class A):** Tokens located in `@/FOUNDATION/tokens/components/**` (e.g., CARD_TOKENS, DOMAIN_TOKENS, TABLE_TOKENS, TEXT_TOKENS, BUTTON_TOKENS, INPUT_TOKENS). These tokens MUST be imported directly from `@/FOUNDATION/tokens/components/**` and MUST NOT be imported from `@/index` to prevent runtime cycles.

- **Foundation Tokens (Class B):** Tokens located in `@/FOUNDATION/tokens/**` outside the `components/**` directory (e.g., GRADIENT_TOKENS, colors, spacing, typography, radius, shadows, motion, opacity, states). These tokens MUST be imported from `@/index` and MUST NOT be deep-imported from `@/FOUNDATION/tokens/**` (except `components/**`).

This class split ensures that each token class has exactly one valid import path in consumer code (DOMAIN/PATTERNS), preventing contradictory enforcement and eliminating edge-case oscillation for non-component tokens.

**Task Reference:** TUI_CSV2_TOKEN_IMPORT_CLASS_SPLIT_026 (token import class split resolution)

**Anti-Oscillation Protection:** The ESLint configuration includes explicit comments and rule enforcement to prevent Cursor and other auto-fix tools from rewriting correct token imports back to `@/index`. This prevents import oscillation where tools repeatedly change imports between `@/index` and `@/FOUNDATION/tokens/components/**`.

**Task References:**
- TUI_CSV2_FOUNDATION_TOKEN_IMPORT_HYGIENE_2 (original hygiene rule)
- TUI_CSV2_IMPORT_OSCILLATION_ROOT_CAUSE_001 (enforcement and anti-oscillation fix)
- TUI_CSV2_TOKEN_IMPORT_CLASS_SPLIT_026 (token import class split resolution)

### Foundation Runtime Utilities

**Definition:** Foundation Runtime Utilities are runtime helper functions used by both Foundation components and consumer code. Examples include `tokenCVA` (token-based class variance authority utility) and `cn` (class name utility).

**Why utilities bypass @/index:**

- `@/index` is public-only and must NOT export runtime utilities
- Runtime utilities must be imported directly from `@/FOUNDATION/lib/*` to avoid runtime cycles
- This maintains clear separation between public API and internal runtime utilities
- Direct imports prevent import oscillation and order-dependent initialization failures

**Relation to import oscillation:**

- Import oscillation was caused by mutually exclusive ESLint rules allowing no valid import path for runtime utilities
- Runtime utilities were exported from `@/index` while `no-restricted-imports` blocked imports from `@/FOUNDATION/lib/**`
- This created a contradiction where no valid import path existed
- TUNG-028 resolves this by removing runtime utilities from `@/index` and allowing direct imports from `@/FOUNDATION/lib/*`

**Import rule:**

- **Consumer code (DOMAIN/PATTERNS):** MUST import Foundation Runtime Utilities directly from `@/FOUNDATION/lib/*` (e.g., `@/FOUNDATION/lib/token-cva`, `@/FOUNDATION/lib/utils`). Imports from `@/index` are forbidden.
- **Foundation internal code (PRIMITIVES/COMPOSITION):** Can import utilities from `@/FOUNDATION/lib/**` directly (same as consumer code).
- **ESLint enforcement:** The `no-runtime-utils-from-index` rule in the `consumer-import-guard` configuration block explicitly forbids runtime utility imports from `@/index` in DOMAIN/PATTERNS files.

**Enforcement:**

This rule is enforced via ESLint `no-runtime-utils-from-index` in the `consumer-import-guard` configuration block (`eslint.config.mjs`). The rule explicitly forbids importing Foundation Runtime Utilities from `@/index` in DOMAIN/PATTERNS files and provides clear error messages directing developers to use the direct import path from `@/FOUNDATION/lib/*`.

**Anti-Oscillation Protection:**

The ESLint configuration includes explicit comments and rule enforcement to prevent Cursor and other auto-fix tools from rewriting correct utility imports back to `@/index`. This prevents import oscillation where tools repeatedly change imports between `@/index` and `@/FOUNDATION/lib/**`.

**Task Reference:** TUNG-028 (Lock Index Is Public-Only - Import Invariant v2)

### Clarification: Allowed Imports from `@/index`

The `@/index` entrypoint is the **public UI API** of the system.

The following imports from `@/index` are explicitly **ALLOWED** inside `src/DOMAIN/**` and `src/PATTERNS/**`:

- UI components (e.g. `Box`, `Button`, `Text`, `Skeleton`)
- Layout and composition components
- Public types that do not create runtime dependencies

The following imports from `@/index` are **FORBIDDEN**:

- Runtime utilities (`tokenCVA`, `cn`, animation helpers)
- Foundation internals
- Any value that participates in runtime evaluation or token resolution

This clarification exists to prevent **automated refactors** from incorrectly replacing valid UI imports and causing architectural drift.

### Runtime Utilities Boundary (LOCKED)

Runtime utilities are private Foundation details and are excluded
from the public index.

Enforced by:
- ESLint: `no-runtime-utils-from-index`
- Foundation Lock: Runtime Utilities Are Private (TUNG-028)

**Reference:** See [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md) — Runtime Utilities Are Private (TUNG-028)

**Distinction from Foundation Tokens:**

Foundation Runtime Utilities are distinct from Foundation Tokens:
- **Runtime Utilities:** Must be imported from `@/FOUNDATION/lib/*` in consumer code (forbidden from `@/index`)
- **Component Tokens:** Must be imported from `@/FOUNDATION/tokens/components/**` in consumer code (forbidden from `@/index`)
- **Foundation Tokens:** Must be imported from `@/index` in consumer code (forbidden from `@/FOUNDATION/tokens/**` except `components/**`)

This distinction ensures each class has exactly one valid import path in consumer code, preventing contradictory enforcement and eliminating oscillation.

### Import Oscillation Prevention

**Status:** ✅ **RESOLVED_AND_LOCKED**

Import oscillation between `@/index` and `@/FOUNDATION/tokens/components/**` has been eliminated through explicit ESLint rule enforcement. The system is now protected against automatic rewriting of correct token imports by Cursor and other auto-fix tools.

**Rationale:** This protection is fixed as a system invariant to prevent regression and ensure runtime stability. Without explicit enforcement, auto-fix tools would repeatedly rewrite imports between the two paths, causing uncertainty and potential runtime failures.

**Enforcement Mechanism:** Custom ESLint rule `no-token-imports-from-index` explicitly forbids Foundation component token imports from `@/index` in DOMAIN/PATTERNS files, with clear error messages directing developers to use the correct import path. The rule is not auto-fixable, preventing tools from automatically "correcting" the intentional direct import pattern.

**Resolution Report:** See [CLOSED_SYSTEM_V2_IMPORT_OSCILLATION_RESOLUTION_025.md](../../reports/closed-system/CLOSED_SYSTEM_V2_IMPORT_OSCILLATION_RESOLUTION_025.md) for complete analysis, root cause investigation, and resolution details.

---

## Related Documents

### Canonical Architecture Documents

- [CLOSED_SYSTEM_V2_CANON_INDEX.md](./CLOSED_SYSTEM_V2_CANON_INDEX.md) — Canonical documentation index
- [CLOSED_SYSTEM_V2_CANONICAL_PROBLEM_DEFINITION.md](./CLOSED_SYSTEM_V2_CANONICAL_PROBLEM_DEFINITION.md) — Problem classes (bypass, drift, coupling, ambiguity, agent-confusion)
- [CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md](./CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md) — Architecture principles and boundary model
- [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](./CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md) — ESLint guard rules that enforce closure

**Note:** ESLint import guard (`no-restricted-imports` for consumer code) is a post-closure safety net, not part of canonical enforcement. It prevents regression of boundary model after S2-001 fix but does not define new Closed System v2 rules.

### Audit Reports

- [CLOSED_SYSTEM_V2_DEEP_RESEARCH_REPO_AUDIT_023.md](../../reports/closed-system/CLOSED_SYSTEM_V2_DEEP_RESEARCH_REPO_AUDIT_023.md) — Deep research audit with STOP LINE
- [CLOSED_SYSTEM_V2_DETACHED_STRUCTURAL_AUDIT_024.md](../../reports/closed-system/CLOSED_SYSTEM_V2_DETACHED_STRUCTURAL_AUDIT_024.md) — Structural audit (S1-S6 vectors)

### Boundary Definitions

- [DOM_BOUNDARY_COMPONENTS.md](./DOM_BOUNDARY_COMPONENTS.md) — Fixed list of DOM-boundary components

---

## Final Statement

**Closed System v2 is architecturally closed to prevent bypass, drift, and coupling problems.**

**System closure means:**
- ✅ Expression surface is fixed (public API is the only sanctioned channel)
- ✅ Boundaries are enforced (internal structure is hidden, deep imports forbidden)
- ✅ Change control is mandatory (all modifications require formal audit)
- ✅ Deterministic behavior is preserved (same inputs = same outputs)
- ✅ Contract completeness is maintained (all allowed patterns are documented)

**System closure does not mean:**
- ❌ System is "inflexible" (Extensions can evolve, new components can be added)
- ❌ System is "locked forever" (changes are allowed through audit process)
- ❌ System is "perfect" (closure prevents problems, but doesn't guarantee perfection)

**The purpose of closure is architectural integrity, not rigidity. Closure ensures that the system remains predictable, maintainable, and consistent over time.**

---

**Last Updated:** 2026-01-28 (Runtime Utilities Boundary Lock - TUNG-028)  
**Canonical Status:** ✅ **LOCKED**  
**Task ID:** TUI_CSV2_BLOCK_10_STOP_LINE_AND_CLOSURE
