# Foundation Component Reference

**Status:** ACTIVE  
**Date Created:**    
**Classification:** Reference Documentation  
**Authority Level:** Process (Evolvable)  
**Scope:** Foundation Component Architecture  
**Audience:** Maintainers, Contributors, Cursor AI

---

## Purpose

This document defines what a Foundation component is, when the Foundation pipeline applies, and what FINAL lock status means. It serves as the canonical reference for understanding Foundation components independently of any specific component implementation.

**This document is PROCESS, not LAW.** It can evolve to improve clarity, but it cannot weaken or bypass architectural LAW (Authority Contracts, Lock documents).

---

## What Is a Foundation Component?

### Definition

A **Foundation component** is a canonical, immutable primitive that serves as the architectural foundation for a component category. Foundation components:

- **Define canonical behavior** for their category
- **Are the sole allowed solution** in their category (no alternatives)
- **Have a fixed public contract** that cannot change without unlock procedure
- **Do not evolve functionally** after lock
- **Must remain architecturally stable** for long-term system consistency

### Foundation vs Extension

**Foundation Layer:**
- One canonical component per category
- Immutable after lock
- Defines architectural contracts
- Examples: Button, Link, Select, Modal, Tabs

**Extension Layer:**
- Composes Foundation components
- Can evolve and extend
- Uses Foundation components internally
- Examples: Card, Badge, Layout primitives

### Foundation Lock Philosophy

Foundation LOCK does **not** mean:
> "The code must never be touched."

Foundation LOCK means:
> **"The contract must not be violated."**

Foundation components can be:
- ✅ Bug-fixed (if behavior contradicts documented contract)
- ✅ Accessibility-improved (ARIA, keyboard navigation)
- ✅ Type-narrowed (improving DX without changing API)
- ✅ Documentation-clarified (improving wording)

Foundation components **cannot** be:
- ❌ Functionally extended (new features, new props)
- ❌ API-changed (breaking changes to public contract)
- ❌ Behavior-modified (changing how component works)
- ❌ Alternative-implemented (creating duplicates)

---

## When Does the Foundation Pipeline Apply?

### Pipeline Applicability

The Foundation pipeline applies when:

1. **Creating a new Foundation component** from scratch
   - Component is intended to be a canonical Foundation primitive
   - Component will serve as the sole solution in its category
   - Component will be locked and immutable after completion

2. **Refactoring an existing Foundation component**
   - Component is already locked but needs architectural improvements
   - Component must maintain LOCKED status throughout refactor
   - All lifecycle steps must be re-verified

3. **Canonicalizing an experimental component**
   - Component exists in INCUBATION status
   - Component needs to move from experimental to Foundation
   - Component must complete all lifecycle steps

### Pipeline Does NOT Apply When:

- Creating Extension components (use Extension Authority Contract)
- Creating domain-specific components (use PATTERNS layer)
- Making bug fixes to locked components (use Foundation Lock Operating Rules)
- Making accessibility improvements (use Foundation Lock Operating Rules)

---

## What Does FINAL Lock Status Mean?

### FINAL Status Semantics

**FINAL** is the highest lock status for Foundation components. A component with FINAL status:

- ✅ **Has completed all verification steps** (Steps 0-11)
- ✅ **Has passed all quality gates** (Storybook, Testing)
- ✅ **Has a compliant Foundation Component Report**
- ✅ **Is established as canonical reference** for its category
- ✅ **Refactor cycle is CLOSED** (no further refactor cycles without unlock)
- ✅ **Is ready for long-term archival** as architectural reference

### FINAL vs LOCKED

**LOCKED:**
- Component is protected from modification
- Public contract cannot change
- Still may be in active development or verification

**FINAL:**
- Component has completed all verification steps
- Refactor cycle is CLOSED
- Component is canonical reference
- No further refactor cycles required or permitted

### FINAL Status Requirements

Before a component can achieve FINAL status, it must:

1. **Complete all architectural validation steps** (Steps 0-10)
   - Semantic declaration
   - Alternative cleanup
   - State model verification
   - JS-free interaction model
   - Token-driven model
   - Public API audit
   - TypeScript compliance
   - CVA canonicalization
   - Accessibility hardening
   - Authority alignment

2. **Pass all quality gates** (Steps 11-12)
   - Storybook quality gate (complete visual and semantic contract)
   - Testing quality gate (comprehensive test coverage)

3. **Have compliant Foundation Component Report**
   - Report follows canonical format
   - All steps documented
   - All violations resolved (FIXED or ACCEPTED EXCEPTION)
   - Lifecycle status explicitly stated

4. **Complete Foundation Lock finalization** (Step 13)
   - Listed in FOUNDATION_LOCK.md
   - Lock status documented
   - Reference status established

### FINAL Status Implications

Once a component achieves FINAL status:

- **No further refactor cycles** are required or permitted
- **Component is canonical reference** for architectural patterns
- **Component can be archived** as long-term reference
- **Any changes require explicit unlock procedure**
- **Component serves as template** for other Foundation components

---

## Foundation Component Lifecycle Overview

### Lifecycle Phases

The Foundation component lifecycle consists of three phases:

1. **Architectural Validation (Steps 0-10)**
   - Component structure, compliance, and architectural rules
   - Authority Contract verification
   - Token system compliance
   - Type safety and API boundaries

2. **Quality Gates (Steps 11-12)**
   - Storybook quality gate (BLOCKING)
   - Testing quality gate (BLOCKING)
   - Both must pass before Foundation Lock

3. **Foundation Lock (Step 13)**
   - Formal locking after all validations pass
   - FINAL status declaration
   - Refactor cycle CLOSED

### Quality Gates Are BLOCKING

Steps 11-12 (Storybook and Testing Quality Gates) are **BLOCKING** requirements:

- ❌ **Foundation Lock is IMPOSSIBLE** without passing both quality gates
- ❌ **Component MUST remain in INCUBATION** (for creation) or cannot be refactored (for refactor)
- ❌ **Lifecycle is BLOCKED** until quality gates pass
- ❌ **No exceptions** - Foundation components require complete Storybook coverage and comprehensive testing

**Rationale:**
- **Storybook is a Visual and Semantic Contract** - Stories define how component appears, behaves, and should be used
- **Tests are Architectural Protection Mechanisms** - Tests protect public API, semantic behavior, and prevent regressions
- **Both are Required for Foundation Lock** - Foundation Lock represents an immutable architectural contract that must be complete

---

## Foundation Component Report

### Mandatory Report Requirement

**All Foundation components MUST have a compliant report before Foundation Lock (Step 13).**

Foundation Component Reports are **mandatory process artifacts** that serve as:

- **Single Source of Truth:** Authoritative record of lifecycle state
- **Process Enforcement:** Structural constraint ensuring complete lifecycle verification
- **Decision Authority:** Lifecycle progression decisions are ONLY valid when derived from compliant reports
- **AI/Human Contract:** Both AI agents and humans must treat reports as authoritative artifacts

### Report Naming Convention

All Foundation Component Reports **MUST** use the canonical filename format:

```
<COMPONENT>_FOUNDATION_LOCK_REPORT.md
```

**Rules:**
- Component name MUST be in UPPERCASE
- Component name MUST be singular (e.g., `BUTTON`, not `BUTTONS`)
- Component name MUST match canonical component name exactly
- All refactor steps append to the same report file (single file per component)

**Examples:**
- ✅ `BUTTON_FOUNDATION_LOCK_REPORT.md`
- ✅ `LINK_FOUNDATION_LOCK_REPORT.md`
- ✅ `SELECT_FOUNDATION_LOCK_REPORT.md`

### Report Format

Foundation Component Reports must follow the canonical format defined in:
- `docs/architecture/FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md`

**Key Requirements:**
- All 13 lifecycle steps must appear exactly once in canonical order
- All violations must be consolidated in VIOLATION SUMMARY & RESOLUTION section
- Lifecycle progression status must be explicitly stated
- Blocking violations automatically halt progression
- Reports must pass validation checklist before Step 13

---

## Foundation Component Statuses

### INCUBATION / EXPERIMENTAL

**INCUBATION** is a **process status**, not an architectural layer. Components in INCUBATION:

- **Allowed to exist** during Foundation component creation/refactor lifecycle
- **Isolated from production** - not exported in public API until lifecycle completion
- **Subject to experimentation** - may violate some Foundation rules temporarily during development
- **Must complete lifecycle** - cannot remain in INCUBATION indefinitely

**INCUBATION Status Rules:**
- Components in INCUBATION must be clearly marked
- INCUBATION components must NOT be exported in `src/index.ts`
- INCUBATION status must be resolved by either:
  - **Completion:** Component completes all lifecycle steps and moves to LOCKED status
  - **Rollback:** Component fails lifecycle validation and is removed or returned to INCUBATION for fixes

### LOCKED

**LOCKED** status means:
- Component is protected from modification
- Public contract cannot change without unlock procedure
- Component may still be in active development or verification

### FINAL

**FINAL** status means:
- Component has completed all verification steps
- Refactor cycle is CLOSED
- Component is canonical reference
- No further refactor cycles required or permitted

---

## Related Documents

**Canonical Lifecycle:**
- `docs/architecture/FOUNDATION_LOCK_OPERATING_RULES.md` - Section 10 (authoritative lifecycle definition)
- `docs/architecture/FOUNDATION_LIFECYCLE_PROCESS_INDEX.md` - Process navigation

**Report Format:**
- `docs/architecture/FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md` - Mandatory canonical report format
- `docs/reports/BUTTON_FOUNDATION_LOCK_REPORT.md` - Canonical example (Button component)
- `docs/reports/LINK_FOUNDATION_LOCK_REPORT.md` - Canonical example (Link component)

**Authority Documents:**
- `docs/architecture/FOUNDATION_LOCK.md` - Foundation lock status
- `docs/ARCHITECTURE_CONTEXT.md` - Canonical architecture context

**Authority Contracts:**
- See `docs/architecture/AUTHORITY_NAVIGATION.md` for complete Authority Contract list

---

## Document Status

**Status:** ✅ ACTIVE  
**Version:** 1.0  
**Date Created:**    
**Last Updated:**    
**Classification:** Reference Documentation (Evolvable)

**This document provides reference only. The authoritative lifecycle definition is in `docs/architecture/FOUNDATION_LOCK_OPERATING_RULES.md` — Section 10.**

