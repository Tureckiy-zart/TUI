# Foundation Component Step Pipeline

**Status:** ACTIVE  
**Date Created:**    
**Classification:** Process Documentation  
**Authority Level:** Process (Evolvable)  
**Scope:** Foundation Component Creation & Refactor  
**Audience:** Maintainers, Contributors, Cursor AI

---

## Purpose

This document describes each step (0-13) of the Foundation component lifecycle pipeline, including purpose, allowed actions, outputs, and exit criteria. This pipeline is extracted from the canonical Button Foundation process and is reusable for all Foundation components.

**This document is PROCESS, not LAW.** It can evolve to improve ergonomics, but it cannot weaken or bypass architectural LAW (Authority Contracts, Lock documents).

---

## Pipeline Overview

The Foundation component lifecycle consists of **13 steps** organized into three phases:

1. **Architectural Validation (Steps 0-10):** Component structure, compliance, and architectural rules
2. **Quality Gates (Steps 11-12):** Storybook and Testing — BLOCKING requirements
3. **Foundation Lock (Step 13):** Formal locking after all validations and quality gates pass

**Quality Gates are BLOCKING:**
- Steps 11-12 must pass before Foundation Lock
- Foundation Lock is IMPOSSIBLE without passing both quality gates
- No exceptions — Foundation components require complete Storybook coverage and comprehensive testing

---

## Step 0: Pre-Pipeline Setup

### Purpose

Establish component context, verify prerequisites, and prepare for Foundation lifecycle.

### Allowed Actions

- Verify component exists and is in correct location
- Check component status (INCUBATION, LOCKED, etc.)
- Review component's intended role and category
- Prepare Foundation Component Report file
- Verify Authority Contracts are available

### Outputs

- Component status confirmed
- Foundation Component Report file created (empty template)
- Prerequisites verified

### Exit Criteria

- Component location and status verified
- Foundation Component Report file exists
- Ready to proceed to Step 1

---

## Step 1: Semantic Declaration

### Purpose

Formally declare the component as a Foundation component and establish its semantic identity.

### Allowed Actions

- Explicitly declare component as Foundation in documentation
- Define component's semantic role and purpose
- Establish clear boundaries between Foundation and Extension layers
- Document what component represents and what it does NOT represent

### Outputs

- Semantic declaration documented
- Component role clearly defined
- Boundaries established

### Exit Criteria

- Component is explicitly declared as Foundation in documentation
- Semantic role and purpose are clearly documented
- Boundaries between Foundation and Extension layers are established

---

## Step 2: Alternative Cleanup

### Purpose

Ensure there is only one canonical Foundation component per category.

### Allowed Actions

- Scan codebase for alternative implementations
- Remove or archive duplicate components
- Ensure no `Simple*`, `Basic*`, `Legacy*`, or `*V2` variants exist
- Verify all related components compose Foundation component internally
- Check public exports to ensure only canonical component is exported

### Outputs

- Duplicate components removed or archived
- Public exports verified
- Related components verified to compose Foundation

### Exit Criteria

- No duplicate or alternative implementations exist in codebase
- All related components compose Foundation component internally
- Only canonical component is exported in public API

---

## Step 3: State Model and Priority Verification

### Purpose

Ensure component uses only canonical states and respects state priority order.

### Allowed Actions

- Verify component uses only canonical states from State Authority Matrix: `base`, `hover`, `active`, `focus-visible`, `disabled`, `loading`
- Verify state priority order is respected: `disabled > loading > active > hover > focus-visible > base`
- Ensure no custom or forbidden states are used
- Verify disabled state blocks lower-priority states
- Document which canonical states component uses (not all components need all states)

### Outputs

- State model verification report
- State priority order verification
- Forbidden patterns detection results

### Exit Criteria

- Component uses only canonical states from State Authority Matrix
- State priority order is correctly implemented
- No custom or forbidden states are present

### Authority References

- `docs/architecture/STATE_AUTHORITY_MATRIX.md`
- `docs/architecture/STATE_AUTHORITY_CONTRACT.md`
- `docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md`

---

## Step 4: JS-Free Interaction Model

### Purpose

Ensure all interaction states are controlled by CSS and browser-native behavior, not JavaScript.

### Allowed Actions

- Verify no `useState` for interaction states (hover, active, focus)
- Verify no `onMouseEnter` / `onMouseLeave` handlers
- Verify no `onFocus` / `onBlur` handlers for visual state management
- Verify all states use CSS pseudo-classes (`:hover`, `:focus-visible`, `:disabled`)
- Verify no JavaScript-driven state management for interactions
- Verify no side-effects in Foundation component

### Outputs

- JS-free interaction verification report
- Forbidden patterns detection results
- Browser-native mechanism verification

### Exit Criteria

- No JavaScript-driven interaction states are present
- All interaction states use CSS pseudo-classes
- No side-effects exist in Foundation component

---

## Step 5: Token-Driven Model

### Purpose

Ensure all visual properties use tokens, not raw values.

### Allowed Actions

- Verify all visual styles come from component tokens (e.g., `COMPONENT_TOKENS`)
- Verify no inline Tailwind classes for visual properties
- Verify no hardcoded values (px-4, h-10, etc.)
- Verify variant and state tokens are separated
- Verify all tokens reference Foundation tokens (Spacing, Typography, Radius, Motion, Elevation, Color)
- Verify no ad-hoc styling or conditional class generation

### Outputs

- Token coverage matrix
- Forbidden patterns detection results
- Token structure verification

### Exit Criteria

- All visual properties use tokens (no raw values)
- All tokens reference Foundation token domains
- No inline Tailwind classes for visual properties

### Authority References

- `docs/architecture/TOKEN_SYSTEM.md`
- `docs/architecture/SPACING_AUTHORITY_CONTRACT.md`
- `docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md`
- `docs/architecture/RADIUS_AUTHORITY_CONTRACT.md`
- `docs/architecture/MOTION_AUTHORITY_CONTRACT.md`
- `docs/architecture/ELEVATION_AUTHORITY_CONTRACT.md`

---

## Step 6: Public API Audit

### Purpose

Verify that public API is minimal, intentional, and does not leak implementation details.

### Allowed Actions

- Audit all public exports from `src/index.ts`
- Verify component and types are exported
- Verify no internal implementation details are exported (unless explicitly needed for composition)
- Verify no CVA instances are exported unless required for Extension composition
- Verify no constant arrays are exported (types are sufficient for type-safety)
- Verify TypeScript types enforce canonical usage (closed union types)
- Verify Extension is possible only through `className` and composition, not mutation
- Document any exceptions or special cases

### Outputs

- Public API audit report
- Export surface verification
- Semantic boundary verification
- Forbidden props detection results

### Exit Criteria

- All checklist items are verified and documented
- Public API is minimal and intentional
- No implementation details are leaked

### Public API Audit Checklist (Mandatory)

- [ ] **Exports Audit:** All public exports from `src/index.ts` are audited
- [ ] **Component Export:** Component is exported (required)
- [ ] **Type Export:** Component types are exported (required)
- [ ] **No Implementation Leakage:** No internal implementation details are exported (unless explicitly needed for composition)
- [ ] **No CVA Export:** No CVA instances are exported (unless required for Extension composition)
- [ ] **No Constant Arrays:** No constant arrays are exported (types are sufficient for type-safety)
- [ ] **Type Safety:** TypeScript types enforce canonical usage (closed union types)
- [ ] **Extension Path:** Extension is possible only through `className` and composition, not mutation
- [ ] **Exceptions Documented:** Any exceptions or special cases are documented

---

## Step 7: TypeScript System Compliance

### Purpose

Ensure component's TypeScript types comply with Typing Standard and establish Public Type Surface as locked architectural contract.

### Allowed Actions

- Verify all variant/size props use explicit union types (not inferred from CVA)
- Verify no `VariantProps<typeof cvaVariants>` in public APIs
- Verify CVA variant maps use `satisfies Record<...>` constraints
- Verify public component props reference canonical union types
- Verify no `string` types for variant/size props (no string widening)
- Verify no `any` types in public APIs
- Verify types are exported explicitly
- Verify TypeScript compilation passes without errors
- Verify type narrowing and type safety are maintained
- Verify Public Type Surface is documented and locked

### Outputs

- TypeScript compliance verification report
- Public Type Surface documentation
- Forbidden patterns detection results

### Exit Criteria

- All checklist items are verified
- Component types comply with Typing Standard
- TypeScript compilation passes without errors
- Public Type Surface is documented and locked
- No forbidden patterns are present in public APIs

### TypeScript System Compliance Checklist (Mandatory)

- [ ] **Explicit Union Types:** All variant/size props use explicit union types (not inferred from CVA)
- [ ] **No CVA-Derived Types:** No `VariantProps<typeof cvaVariants>` in public APIs
- [ ] **CVA Type Constraints:** CVA variant maps use `satisfies Record<...>` constraints
- [ ] **Canonical Type References:** Public component props reference canonical union types
- [ ] **No String Types:** No `string` types for variant/size props (no string widening)
- [ ] **No Any Types:** No `any` types in public APIs
- [ ] **No Unsafe Type Assertions:** No `as any` or `as unknown as` to bypass public API typing
- [ ] **Explicit Type Exports:** Types are exported explicitly
- [ ] **TypeScript Compilation:** TypeScript compilation passes without errors
- [ ] **Type Safety:** Type narrowing and type safety are maintained
- [ ] **Public Type Surface Documented:** Public Type Surface is explicitly documented

### Forbidden Patterns (MANDATORY)

1. **CVA-Derived Public Types:** `VariantProps<typeof cvaVariants>` in public APIs
2. **String Widening:** `variant?: string` or `size?: string`
3. **Any Types:** `props?: any` or `value: any`
4. **Unsafe Type Assertions:** `as any` or `as unknown as` to bypass public API
5. **Inferred Public Types:** Inline unions in props without explicit type definitions

### Authority References

- `docs/structure/TYPING_STANDARD.md` (REQUIRED, ENFORCED architectural standard)

---

## Step 8: CVA Canonicalization

### Purpose

Ensure CVA usage follows canonical patterns, enforces Canonical CVA Shape, and is used only as composition transport layer.

### Allowed Actions

- Verify CVA uses `tokenCVA` utility (if applicable)
- Verify CVA follows Canonical CVA Shape
- Verify variant maps are properly structured with `satisfies Record<...>` constraints
- Verify CVA variants reference tokens, not raw values
- Verify no state variants in CVA (states are CSS-only)
- Verify no logic, conditionals, or computed values in CVA
- Verify compound variants are properly defined (if applicable)
- Verify CVA structure matches canonical patterns (Button as reference)
- Verify CVA is used only as variant transport layer, not styling engine
- Verify CVA is not exported unless required for Extension composition

### Outputs

- CVA canonicalization verification report
- Canonical CVA Shape verification
- Forbidden patterns detection results

### Exit Criteria

- All checklist items are verified
- CVA follows Canonical CVA Shape
- CVA variants reference tokens, not raw values
- No forbidden patterns are present
- CVA structure matches canonical patterns (Button as reference)
- CVA is used only as composition transport layer

### CVA Canonicalization Checklist (Mandatory)

- [ ] **tokenCVA Usage:** CVA uses `tokenCVA` utility (if applicable)
- [ ] **Canonical CVA Shape:** CVA follows Canonical CVA Shape structure
- [ ] **Token References Only:** All variants reference tokens, no raw classes
- [ ] **No State Variants:** No state variants in CVA (states are CSS-only)
- [ ] **No Logic:** No logic, conditionals, or computed values in CVA
- [ ] **Type Constraints:** All variant maps use `satisfies Record<...>` constraints
- [ ] **Canonical Structure:** CVA structure matches Button as reference implementation
- [ ] **Transport Layer Only:** CVA is used only as variant transport, not styling engine
- [ ] **Non-Export Rule:** CVA is not exported unless required for Extension composition

### Canonical CVA Shape Requirement

All CVA instances MUST follow the **Canonical CVA Shape**:

```typescript
const componentVariants = tokenCVA({
  base: `${COMPONENT_TOKENS.base} ...`, // Base classes from tokens
  variants: {
    variant: {
      primary: `${COMPONENT_TOKENS.variant.primary} ...`, // Token references only
      secondary: `${COMPONENT_TOKENS.variant.secondary} ...`,
      // ... all variants reference tokens
    } satisfies Record<ComponentVariant, string>,
    size: {
      xs: `${COMPONENT_TOKENS.size.xs} ...`, // Token references only
      sm: `${COMPONENT_TOKENS.size.sm} ...`,
      // ... all sizes reference tokens
    } satisfies Record<ComponentSize, string>,
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
```

### Forbidden Patterns (MANDATORY)

1. **State Variants:** States belong in CSS, not CVA
2. **Logic or Conditionals:** No logic in CVA
3. **Raw Classes (Non-Token):** Must reference tokens
4. **Computed or Dynamic Values:** No computed values

---

## Step 9: Accessibility Hardening

### Purpose

Ensure component meets WCAG accessibility standards.

### Allowed Actions

- Verify ARIA attributes are correct and complete
- Verify keyboard navigation works correctly
- Verify screen reader announcements are appropriate
- Verify focus management is correct (if applicable)
- Verify color contrast meets WCAG standards
- Verify interactive elements are keyboard accessible
- Run accessibility audit tools and fix violations

### Outputs

- Accessibility verification report
- ARIA attributes audit
- Keyboard navigation verification
- Accessibility audit tool results

### Exit Criteria

- ARIA attributes are correct and complete
- Keyboard navigation works correctly
- Accessibility audit tools pass without violations

---

## Step 10: Authority Alignment

### Purpose

Ensure component complies with all relevant Authority Contracts.

### Allowed Actions

- Verify compliance with Interaction Authority Contract (if component is interactive)
- Verify compliance with State Authority Matrix (if component has states)
- Verify compliance with State Authority Contract (if component uses state tokens)
- Verify compliance with Spacing Authority Contract (if component uses spacing)
- Verify compliance with Radius Authority Contract (if component uses border radius)
- Verify compliance with Typography Authority Contract (if component uses typography)
- Verify compliance with Motion Authority Contract (if component uses motion/animation)
- Verify compliance with Elevation Authority Contract (if component uses elevation/shadows)
- Verify compliance with Layout Authority Contract (if component defines layout)
- Document any exceptions or special cases

### Outputs

- Authority Contract compliance verification report
- Scope-aware verification results
- Exception documentation (if any)

### Exit Criteria

- Component complies with all semantically relevant Authority Contracts
- Any exceptions or special cases are documented
- No Authority rules are violated

### Scope-Aware Verification

**Important:** Not all Authority Contracts apply to every component. Only semantically relevant Authority Contracts must be verified. For example:
- A non-interactive component does not need Interaction Authority verification
- A component without typography does not need Typography Authority verification
- A component without motion does not need Motion Authority verification

### Authority References

- See `docs/architecture/AUTHORITY_MAP.md` for complete Authority Contract list

---

## Step 11: Storybook Quality Gate

### Purpose

Ensure Storybook serves as a complete and accurate visual and semantic contract for Foundation components.

### Classification

**Quality Gate (BLOCKING — Foundation Lock is IMPOSSIBLE without passing this step)**

### Allowed Actions

- Verify canonical usage examples are present in Storybook
- Verify all stories represent intended, canonical usage patterns
- Verify no misleading or non-canonical usage examples exist
- Verify no exploratory or experimental stories remain
- Verify Storybook stories document all public API variations
- Verify Storybook stories demonstrate proper component composition
- Verify accessibility addon (if applicable) shows no violations in stories
- Verify visual regression testing (if applicable) passes for all stories
- **MUST document ALL canonical states** (including disabled, loading, interactive states)
- **MUST demonstrate asChild usage** (if component supports `asChild` prop)
- **MUST include accessibility-focused stories** (keyboard navigation, ARIA attributes, screen reader support)
- **MUST include real usage scenarios** (not playground-only examples)
- **MUST include conceptual guidance stories** where architecture matters

### Outputs

- Storybook quality gate verification report
- Story inventory and coverage analysis
- Forbidden patterns detection results

### Exit Criteria

- All checklist items are verified and documented
- Canonical usage examples are present and complete
- All canonical states (including disabled) are documented
- asChild usage is demonstrated (if applicable)
- Accessibility-focused stories are present
- Real usage scenarios are documented
- Conceptual guidance stories are present (where architecture matters)
- No misleading or exploratory stories exist
- Storybook serves as accurate visual and semantic contract for component
- Storybook quality gate status is explicitly documented in Foundation Component Report

### Storybook Quality Checklist (Mandatory)

- [ ] **Canonical Examples:** Canonical usage examples are present in Storybook
- [ ] **API Coverage:** All public API variations are demonstrated in stories (variants, sizes, all props)
- [ ] **State Coverage:** ALL canonical states are documented (base, hover, active, focus-visible, disabled, loading — as applicable)
- [ ] **Disabled State:** Disabled state is explicitly demonstrated with all variants (if component supports disabled)
- [ ] **asChild Usage:** asChild composition pattern is demonstrated (if component supports `asChild`)
- [ ] **Accessibility Stories:** Accessibility-focused stories demonstrate keyboard navigation, ARIA attributes, and screen reader support
- [ ] **Real Usage Scenarios:** Real-world usage scenarios are documented (not just playground examples)
- [ ] **Conceptual Guidance:** Conceptual guidance stories explain architectural distinctions (e.g., when to use Link vs Button, component semantic boundaries)
- [ ] **No Misleading Stories:** Misleading or non-canonical usage examples are removed
- [ ] **No Exploratory Stories:** Exploratory or experimental stories are removed
- [ ] **Visual Contract:** Storybook stories represent the intended, canonical usage of the component
- [ ] **Composition Examples:** Proper component composition patterns are demonstrated
- [ ] **Accessibility Verified:** Accessibility addon shows no violations (if applicable)
- [ ] **Visual Regression:** Visual regression tests pass (if applicable)
- [ ] **No Unsafe Type Assertions:** Storybook stories do NOT use `as any` or `as unknown as` to bypass public API typing

### Failure Consequences

- ❌ **BLOCKING:** Component CANNOT proceed to Foundation Lock
- ❌ **BLOCKING:** Component MUST remain in INCUBATION (for creation) or cannot be refactored (for refactor)
- ❌ **BLOCKING:** Foundation Component Report MUST document Storybook quality gate failure

---

## Step 12: Testing Quality Gate

### Purpose

Ensure comprehensive test coverage that provides semantic protection and regression safety for Foundation components.

### Classification

**Quality Gate (BLOCKING — Foundation Lock is IMPOSSIBLE without passing this step)**

### Allowed Actions

- Verify component has test coverage for core behavior
- Verify tests cover all public API variations (variants, sizes, states)
- Verify tests validate semantic contracts (accessibility, interaction patterns)
- Verify tests protect against regressions in critical functionality
- Verify tests use appropriate testing patterns (unit, integration, accessibility testing as applicable)
- Verify tests pass without errors or warnings
- Verify tests follow project testing standards and patterns
- **MUST include unit tests** for core behavior and API variations
- **MUST include integration tests** where composition is involved (e.g., asChild patterns)
- **MUST include accessibility tests** (ARIA attributes, roles, keyboard navigation)
- **MUST include semantic behavior tests** (disabled blocks interaction, state transitions, interaction patterns)

### Outputs

- Testing quality gate verification report
- Test coverage analysis
- Test execution results

### Exit Criteria

- All checklist items are verified and documented
- Component has adequate test coverage for critical functionality
- Unit tests exist for core behavior
- Integration tests exist where composition is involved
- Accessibility tests validate ARIA, roles, and keyboard navigation
- Semantic behavior tests validate component behavior matches contracts
- All tests pass without errors or warnings
- Tests provide semantic protection and regression safety
- Testing quality gate status is explicitly documented in Foundation Component Report

### Testing Quality Checklist (Mandatory)

- [ ] **Core Behavior:** Component has test coverage for core behavior (unit tests)
- [ ] **API Variations:** Tests cover all public API variations (variants, sizes, all props)
- [ ] **State Coverage:** Tests validate all component states (disabled, loading, interactive states)
- [ ] **Semantic Behavior:** Tests validate semantic behavior (disabled blocks interaction, state transitions work correctly)
- [ ] **Accessibility Tests:** Accessibility tests validate ARIA attributes, roles, and keyboard navigation
- [ ] **Integration Tests:** Integration tests validate composition patterns (asChild, component composition where applicable)
- [ ] **Semantic Protection:** Tests validate semantic contracts (accessibility, interaction patterns)
- [ ] **Regression Safety:** Tests protect against regressions in critical functionality
- [ ] **Testing Patterns:** Tests follow project testing standards and patterns
- [ ] **Test Execution:** All tests pass without errors or warnings
- [ ] **No Unsafe Type Assertions:** Tests do NOT use `as any` or `as unknown as` to bypass public API typing

### Failure Consequences

- ❌ **BLOCKING:** Component CANNOT proceed to Foundation Lock
- ❌ **BLOCKING:** Component MUST remain in INCUBATION (for creation) or cannot be refactored (for refactor)
- ❌ **BLOCKING:** Foundation Component Report MUST document Testing quality gate failure
- ❌ **BLOCKING:** No Foundation component is allowed without adequate test coverage

---

## Step 13: Foundation Lock

### Purpose

Formally lock component as Foundation component.

### Allowed Actions

- Update `FINAL_FOUNDATION_LOCK.md` to include component
- Update `INTERNAL_CANONICAL_CONTEXT.md` if necessary
- Document component's lock status and date
- Verify all previous steps (0-12) are complete
- Create or update component documentation
- Ensure component is listed in Foundation components list
- **Verify Foundation Component Report:** Ensure compliant report following `FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md` exists

### Outputs

- Component listed in FINAL_FOUNDATION_LOCK.md
- Component documentation updated
- Foundation Component Report validated
- Lock status documented

### Exit Criteria

- Component is listed in `FINAL_FOUNDATION_LOCK.md`
- Component is listed in `INTERNAL_CANONICAL_CONTEXT.md` (if necessary)
- Component's lock status and date are documented
- All previous lifecycle steps (0-12) are complete and verified
- Component documentation is created or updated
- Foundation Component Report is compliant and validates all steps (0-13)

### Pre-Lock Verification (MANDATORY)

Foundation Lock is **IMPOSSIBLE** without passing all quality gates. Before proceeding to Foundation Lock, verify that all quality gates have passed:

- ✅ **Step 11 (Storybook Quality Gate) is COMPLETE** — Storybook serves as visual and semantic contract
- ✅ **Step 12 (Testing Quality Gate) is COMPLETE** — Tests provide semantic protection and regression safety
- ✅ **All architectural validation steps (0-10) are COMPLETE** — Component complies with all architectural rules
- ✅ **Foundation Component Report is COMPLIANT** — Report documents all steps and validates completion

### Foundation Component Report Verification (Mandatory)

Foundation Component Reports are **mandatory artifacts** for Foundation Lock. Before Foundation Lock:

- [ ] **Report Exists:** Foundation Component Report exists in `docs/reports/` directory
- [ ] **Format Compliant:** Report follows `FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md` format
- [ ] **All Steps Documented:** All lifecycle steps (0-13) are documented in report
- [ ] **Violations Consolidated:** All violations are consolidated in VIOLATION SUMMARY & RESOLUTION section
- [ ] **Lifecycle Status Clear:** LIFECYCLE PROGRESSION STATUS section explicitly states current status
- [ ] **No Blocking Violations:** No blocking violations remain (all must be FIXED or ACCEPTED EXCEPTION)
- [ ] **Report Validated:** Report passes validation checklist from template

### Failure Consequences

If any quality gate (Step 11 or Step 12) fails:
- ❌ **Component CANNOT proceed to Foundation Lock (Step 13)**
- ❌ **Component MUST remain in INCUBATION** (for creation) or **cannot be refactored** (for refactor)
- ❌ **Foundation Component Report MUST document failure** with explicit blocking status
- ❌ **Conditional Lock or STOP:** Component lifecycle is BLOCKED until quality gates pass

**No Exceptions:** There are no exceptions to quality gate requirements. Foundation components require complete Storybook coverage and comprehensive testing before lock.

---

## Process vs Law Distinction

**This pipeline is PROCESS, not LAW:**

- **LAW (Immutable):** Authority Contracts define architectural rules that cannot be changed without unlock procedure
- **PROCESS (Evolvable):** This pipeline describes how to work within the LAW; the process can evolve to improve ergonomics
- **EXAMPLES (Reference):** Reference implementations and usage patterns provide non-binding guidance

**Key Principle:** This pipeline process can be improved, but it cannot weaken or bypass architectural LAW. All pipeline steps must respect Authority Contracts and Lock documents.

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
- `docs/architecture/FINAL_FOUNDATION_LOCK.md` - Foundation lock status
- `docs/INTERNAL_CANONICAL_CONTEXT.md` - Canonical architecture context

**Authority Contracts:**
- See `docs/architecture/AUTHORITY_MAP.md` for complete Authority Contract list

---

## Document Status

**Status:** ✅ ACTIVE  
**Version:** 1.0  
**Date Created:**    
**Last Updated:**    
**Classification:** Process Documentation (Evolvable)

**This document provides process reference only. The authoritative lifecycle definition is in `docs/architecture/FOUNDATION_LOCK_OPERATING_RULES.md` — Section 10.**

