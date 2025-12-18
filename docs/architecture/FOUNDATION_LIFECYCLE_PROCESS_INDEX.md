# Foundation Component Lifecycle — Process Index

**Status:** ACTIVE  
**Date Created:** 2025-12-17  
**Classification:** Process Navigation  
**Authority Level:** Process (Evolvable)  
**Scope:** Foundation Component Creation & Refactor  
**Audience:** Maintainers, Contributors, Cursor AI

---

## Purpose

This document provides **human-readable navigation** to the Foundation component creation and refactor lifecycle process. It links lifecycle steps to authoritative documents and provides quick reference for process navigation.

**This document is PROCESS, not LAW.** It can evolve to improve ergonomics, but it cannot weaken or bypass architectural LAW.

---

## Quick Reference

**Canonical Lifecycle:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10: Foundation Component Creation & Refactor Route — Canonical Lifecycle

**Authority Documents:**
- [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) — Foundation lock status and rules
- [INTERNAL_CANONICAL_CONTEXT.md](../INTERNAL_CANONICAL_CONTEXT.md) — Canonical architecture context
- [TYPING_STANDARD.md](../structure/TYPING_STANDARD.md) — TypeScript typing standard

---

## Lifecycle Steps Overview

The Foundation component lifecycle consists of 13 steps that must be completed in sequence. Each step has explicit exit criteria and verification requirements.

**Lifecycle Structure:**

The Foundation component lifecycle is structured in three phases:

1. **Architectural Validation (Steps 1-10):** Component structure, compliance, and architectural rules
2. **Quality Gates (Steps 11-12):** Storybook and Testing — BLOCKING requirements
3. **Foundation Lock (Step 13):** Formal locking after all validations and quality gates pass

**Quality Gates are BLOCKING:**

Steps 11-12 (Storybook and Testing Quality Gates) are **BLOCKING** requirements. Foundation Lock (Step 13) is **IMPOSSIBLE** without passing both quality gates. Failure results in:
- ❌ Component CANNOT proceed to Foundation Lock
- ❌ Component MUST remain in INCUBATION (for creation) or cannot be refactored (for refactor)
- ❌ Conditional Lock or STOP: Lifecycle is BLOCKED until quality gates pass
- ❌ No exceptions: Foundation components require complete Storybook coverage and comprehensive testing

**Rationale: Storybook and Tests are Contracts, Not Optional Hygiene**

- **Storybook is a Visual and Semantic Contract:** Storybook stories define how the component appears, behaves, and should be used. Missing stories mean missing contracts.
- **Tests are Architectural Protection Mechanisms:** Tests protect the component's public API, semantic behavior, and prevent regressions. Missing tests mean missing protection.
- **Both are Required for Foundation Lock:** Foundation Lock represents an immutable architectural contract. Without complete Storybook coverage and comprehensive testing, the contract is incomplete and unsafe.

### Step 1: Semantic Declaration
- **Purpose:** Formally declare component as Foundation
- **Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Step 1
- **Exit Criteria:** Component declared as Foundation, semantic role documented, boundaries established

### Step 2: Alternative Cleanup
- **Purpose:** Ensure one canonical component per category
- **Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Step 2
- **Exit Criteria:** No duplicates exist, all related components compose Foundation, only canonical component exported

### Step 3: State Model and Priority Verification
- **Purpose:** Ensure canonical states and priority order
- **Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Step 3
- **Authority:** [STATE_AUTHORITY_MATRIX.md](./STATE_AUTHORITY_MATRIX.md), [INTERACTION_AUTHORITY_CONTRACT.md](./INTERACTION_AUTHORITY_CONTRACT.md)
- **Exit Criteria:** Only canonical states used, priority order respected, no forbidden states

### Step 4: JS-Free Interaction Model
- **Purpose:** Ensure CSS/browser-native interactions only
- **Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Step 4
- **Exit Criteria:** No JavaScript-driven states, CSS pseudo-classes used, no side-effects

### Step 5: Token-Driven Model
- **Purpose:** Ensure all visual properties use tokens
- **Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Step 5
- **Authority:** [TUI_TOKEN_SYSTEM.md](./TUI_TOKEN_SYSTEM.md)
- **Exit Criteria:** All visual properties use tokens, tokens reference Foundation domains, no raw values

### Step 6: Public API Audit
- **Purpose:** Verify minimal, intentional public API
- **Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Step 6
- **Checklist:** See Public API Audit Checklist in lifecycle document
- **Exit Criteria:** All checklist items verified, API minimal and intentional, no implementation leakage

### Step 7: TypeScript System Compliance
- **Purpose:** Ensure TypeScript types comply with Typing Standard and establish Public Type Surface as locked architectural contract
- **Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Step 7
- **Authority:** [TYPING_STANDARD.md](../structure/TYPING_STANDARD.md)
- **Key Concepts:** Public Type Surface, explicit separation of public vs internal types, forbidden patterns (any, string widening, VariantProps)
- **Checklist:** See TypeScript System Compliance Checklist in lifecycle document
- **Rollback Rules:** Public Type Surface changes require unlock procedure; violations prevent progression to Step 8
- **Exit Criteria:** All checklist items verified, types comply with standard, compilation passes, Public Type Surface documented and locked

### Step 8: CVA Canonicalization
- **Purpose:** Ensure CVA follows canonical patterns, enforces Canonical CVA Shape, and is used only as composition transport layer
- **Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Step 8
- **Key Concepts:** CVA as composition transport only, Canonical CVA Shape requirement, forbidden patterns (state variants, logic, raw classes), non-export rule
- **Checklist:** See CVA Canonicalization Checklist in lifecycle document
- **Rollback Rules:** CVA structure violations must be fixed before proceeding; forbidden patterns prevent progression to Step 9
- **Exit Criteria:** CVA follows Canonical CVA Shape, variants reference tokens only, structure matches canonical patterns (Button as reference), no forbidden patterns

### Step 9: Accessibility Hardening
- **Purpose:** Ensure WCAG compliance
- **Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Step 9
- **Exit Criteria:** ARIA attributes correct, keyboard navigation works, audit tools pass

### Step 10: Authority Alignment
- **Purpose:** Ensure compliance with semantically relevant Authority Contracts
- **Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Step 10
- **Authority:** All Authority Contracts (see [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) for complete list)
- **Note:** Only semantically relevant Authority Contracts must be verified (scope-aware verification)
- **Exit Criteria:** All semantically relevant Authority Contracts complied with, exceptions documented, no violations

### Step 11: Storybook Quality Gate
- **Purpose:** Ensure Storybook serves as complete and accurate visual and semantic contract
- **Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Step 11
- **Classification:** Quality Gate (BLOCKING — Foundation Lock is IMPOSSIBLE without passing)
- **What is Validated:** 
  - All canonical states (including disabled) are documented
  - asChild usage is demonstrated (if applicable)
  - Accessibility-focused stories are present
  - Real usage scenarios (not playground only)
  - Conceptual guidance stories where architecture matters (e.g., Link vs Button)
  - Usage scenarios, DX clarity, coverage, canonicality
- **Failure Consequences:** Component CANNOT proceed to Foundation Lock; MUST remain in INCUBATION (creation) or cannot be refactored (refactor); lifecycle is BLOCKED
- **Exit Criteria:** 
  - All canonical states (including disabled) documented
  - asChild usage demonstrated (if applicable)
  - Accessibility-focused stories present
  - Real usage scenarios documented
  - Conceptual guidance stories present (where architecture matters)
  - Canonical usage examples present and complete
  - No misleading/exploratory stories exist
  - Storybook serves as accurate visual and semantic contract

### Step 12: Testing Quality Gate
- **Purpose:** Ensure comprehensive test coverage providing semantic protection and regression safety
- **Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Step 12
- **Classification:** Quality Gate (BLOCKING — Foundation Lock is IMPOSSIBLE without passing)
- **What is Validated:**
  - Unit tests for core behavior
  - Integration tests where composition is involved
  - Accessibility tests (ARIA, roles, keyboard navigation)
  - Semantic behavior tests (disabled blocks interaction, state transitions)
  - Semantic protection, regression safety, coverage adequacy, test quality
- **Failure Consequences:** Component CANNOT proceed to Foundation Lock; MUST remain in INCUBATION (creation) or cannot be refactored (refactor); lifecycle is BLOCKED; No Foundation component allowed without adequate test coverage
- **Exit Criteria:**
  - Unit tests exist for core behavior
  - Integration tests exist where composition is involved
  - Accessibility tests validate ARIA, roles, and keyboard navigation
  - Semantic behavior tests validate component behavior matches contracts
  - Adequate test coverage for critical functionality
  - All tests pass without errors or warnings
  - Tests provide semantic protection and regression safety

### Step 13: Foundation Lock
- **Purpose:** Formally lock component as Foundation
- **Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Step 13
- **Note:** Includes Foundation Component Report verification (report must exist and be compliant with [FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md](./FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md))
- **Note:** Requires all quality gates (Steps 11-12) to be complete before lock
- **Exit Criteria:** Component listed in FINAL_FOUNDATION_LOCK.md, all steps (1-12) complete, documentation updated, Foundation Component Report compliant

---

## Component Status: INCUBATION / EXPERIMENTAL

**INCUBATION** is a **process status**, not an architectural layer.

- Components in INCUBATION are allowed during lifecycle
- INCUBATION components must NOT be exported in public API
- INCUBATION status must be resolved by completion or rollback

**Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Component Status: INCUBATION / EXPERIMENTAL

---

## Rollback / Fallback Rules

**If a lifecycle step fails:**

1. Return to INCUBATION (for creation) or remain LOCKED (for refactor)
2. Fix and retry the failed step
3. Abandon if fixes are not feasible

**Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Rollback / Fallback Rules

---

## Lifecycle Early Exit (Non-Foundation Outcome)

**Intentional early exit is allowed** before Step 13 (Foundation Lock) if component should be in PATTERNS or EXTENSION layers instead.

- Early exit is not a failure — it's an intentional outcome
- Component must be relocated to appropriate layer
- Provisional Foundation tokens must be removed
- Component must NOT be locked as Foundation

**Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Lifecycle Early Exit (Non-Foundation Outcome)

---

## Process vs Law Distinction

**This document is PROCESS, not LAW:**

- **LAW (Immutable):** Authority Contracts, Lock documents, architectural rules
- **PROCESS (Evolvable):** This lifecycle, enforcement mechanisms, verification methods
- **EXAMPLES (Reference):** Reference implementations, usage patterns, non-binding guidance

**Reference:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10, Process vs Law Distinction

---

## Related Documents

**Canonical Lifecycle:**
- [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10 (authoritative lifecycle definition)

**Report Format (Mandatory):**
- [FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md](./FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md) — Mandatory canonical report format
- [LINK_FOUNDATION_LOCK_REPORT.md](../reports/LINK_FOUNDATION_LOCK_REPORT.md) — Canonical example (Link component)

**Authority Documents:**
- [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) — Foundation lock status
- [INTERNAL_CANONICAL_CONTEXT.md](../INTERNAL_CANONICAL_CONTEXT.md) — Canonical architecture context
- [TYPING_STANDARD.md](../structure/TYPING_STANDARD.md) — TypeScript typing standard

**Authority Contracts:**
- [STATE_AUTHORITY_MATRIX.md](./STATE_AUTHORITY_MATRIX.md) — State model
- [INTERACTION_AUTHORITY_CONTRACT.md](./INTERACTION_AUTHORITY_CONTRACT.md) — Interaction rules
- [TUI_TOKEN_SYSTEM.md](./TUI_TOKEN_SYSTEM.md) — Token system
- See [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) for complete Authority Contract list

---

## Document Status

**Status:** ✅ ACTIVE  
**Version:** 1.0  
**Date Created:** 2025-12-17  
**Last Updated:** 2025-12-17  
**Classification:** Process Navigation (Evolvable)

**This document provides navigation only. The authoritative lifecycle definition is in [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10.**

---

## Lifecycle Expansion Note (2025-12-17)

The Foundation lifecycle was expanded to include explicit quality gates:
- **Previous lifecycle:** 11 steps
- **Current lifecycle:** 13 steps (added Storybook and Testing as separate quality gate steps)

See [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) for details on the lifecycle expansion and backward compatibility.

