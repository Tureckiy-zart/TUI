# 🔒 Foundation LOCK — Operating Rules

**Status:** ACTIVE  
**Date Created:** 2025-12-16  
**Last Updated:** 2025-12-17  
**Classification:** Canonical Interpretation Rules  
**Authority Level:** Secondary (Derived from INTERNAL_CANONICAL_CONTEXT.md)  
**Scope:** Tenerife UI — Foundation Layer  
**Audience:** Maintainers, Cursor AI, Contributors

---

## 1. Definition

Foundation LOCK is an architectural contract indicating that a component:

- is the **sole allowed solution** in its category
- has **no internal alternatives**
- has a **fixed public contract**
- does **not evolve functionally**
- must remain **architecturally stable**

Foundation LOCK does **not** mean:
> “The code must never be touched.”

Foundation LOCK means:
> **“The contract must not be violated.”**

---

## 2. Foundation LOCKED Components

A component is considered **Foundation LOCKED** if it is:

- listed in `INTERNAL_CANONICAL_CONTEXT.md`
- listed in `FINAL_FOUNDATION_LOCK.md`
- marked as `LOCKED — Immutable`
- classified under **Foundation Layer**

At the current state, Foundation LOCKED components include:

- Modal  
- Tabs  
- ContextMenu  
- Toast  
- Link

**Unlocked Components (Pending Canonical Lock):**
- Select (unlocked 2025-12-17, will undergo canonical Foundation lock process)  

---

## 3. Forbidden Actions (Require UNLOCK)

The following actions are **strictly forbidden** without a formal UNLOCK procedure:

### ❌ Architecture & API
- adding new public props
- adding new variants or modes
- adding new entry points
- changing controlled / uncontrolled behavior
- introducing alternative usage patterns

### ❌ Behavior
- extending capabilities
- relaxing existing constraints
- adding optional behaviors
- increasing configurability

### ❌ Semantics
- changing the role of the component
- allowing usage outside its foundation purpose
- turning a Foundation component into an Extension component

Any of the above actions is considered **UNLOCK**.

---

## 4. Allowed Actions (LOCK-Safe)

The following actions are **explicitly allowed**, provided the public contract remains intact:

### ✅ Documentation
- clarifying purpose
- clarifying usage rules
- documenting guarantees
- documenting restrictions
- improving wording clarity

### ✅ Storybook
- removing playground stories
- defining canonical usage stories
- using Storybook as a visual standard
- removing duplicate or misleading examples

### ✅ Typing
- narrowing types
- removing `any`
- removing unused generics
- improving DX **without changing API**

### ✅ Accessibility
- fixing ARIA attributes
- improving keyboard navigation
- improving screen reader behavior

### ✅ Bug Fixes
- fixing incorrect behavior
- fixing edge cases
- provided the behavior already contradicts the documented contract

### ✅ Internal Refactor
Allowed **only if**:
- public API remains unchanged
- behavior remains unchanged
- no new variants are introduced

---

## 5. What Constitutes UNLOCK

Any of the following is **automatically considered UNLOCK**:

- public API change
- new feature introduction
- behavior expansion
- constraint relaxation
- alternative usage path
- architectural model change

UNLOCK is **not permitted** without:
- explicit architectural decision
- updated authority documents
- new lock state definition

---

## 6. Correct Task Framing

Incorrect:
> “Improve Select component”

Correct:
> “Audit and document Select Foundation behavior”

Correct task types:
- Audit
- Canonicalization
- Hardening
- Documentation finalization
- A11y verification
- Typing cleanup

---

## 7. Purpose of Foundation LOCK

Foundation LOCK exists to:

- prevent infinite base component evolution
- protect the system from variant explosion
- preserve architectural invariants
- allow Extension Layer to evolve freely
- ensure long-term system stability

Foundation LOCK represents an **architectural equilibrium point**.

---

## 8. Golden Rule

> **If there is doubt — it is UNLOCK.  
> If it is UNLOCK — it is forbidden.**

---

## 9. Cursor Enforcement

Cursor AI must:

- reject tasks that violate Foundation LOCK
- propose alternatives within allowed scope
- request UNLOCK procedure when expansion is attempted
- treat Foundation LOCK as highest-priority constraint

---

## 10. Foundation Component Creation & Refactor Route — Canonical Lifecycle

This section defines the **canonical lifecycle** for creating new Foundation components or refactoring existing Foundation components. This lifecycle applies to **BOTH creation and refactor flows**.

**Important:** The order of steps matters, but step numbering is non-semantic. Steps must be completed in sequence, but the specific numbers are not part of the architectural contract.

**Lifecycle Structure:**
- **Steps 1-10:** Architectural validation and compliance verification
- **Steps 11-12:** Quality gates (Storybook and Testing) — must pass before Foundation Lock
- **Step 13:** Foundation Lock — formal locking after all validations and quality gates pass

### Document Classification: LAW vs PROCESS vs EXAMPLES

**This section defines PROCESS, not LAW:**

- **LAW (Immutable):** Authority Contracts, Lock documents, architectural rules (e.g., Token System, State Authority Matrix, Interaction Authority Contract)
- **PROCESS (Evolvable):** How components are created/refactored (this lifecycle), enforcement mechanisms, verification methods
- **EXAMPLES (Reference):** Reference implementations, usage patterns, non-binding guidance

**This lifecycle is PROCESS** — it describes how to work within the LAW. The lifecycle can evolve to improve ergonomics, but it cannot weaken or bypass architectural LAW.

### Component Status: INCUBATION / EXPERIMENTAL

**INCUBATION / EXPERIMENTAL** is a **process status**, not an architectural layer. Components in INCUBATION status are:

- **Allowed to exist** during Foundation component creation/refactor lifecycle
- **Isolated from production** — not exported in public API until lifecycle completion
- **Subject to experimentation** — may violate some Foundation rules temporarily during development
- **Must complete lifecycle** — cannot remain in INCUBATION indefinitely

**INCUBATION Status Rules:**

- Components in INCUBATION must be clearly marked (comments, documentation, or file naming)
- INCUBATION components must NOT be exported in `src/index.ts`
- INCUBATION components may exist in Foundation component folders during development
- INCUBATION status must be resolved by either:
  - **Completion:** Component completes all lifecycle steps and moves to LOCKED status
  - **Rollback:** Component fails lifecycle validation and is removed or returned to INCUBATION for fixes

**For Refactor:** Existing LOCKED components do not enter INCUBATION. Refactors must maintain LOCKED status throughout the process.

### Rollback / Fallback Rules

**If a lifecycle step fails validation:**

1. **Return to INCUBATION:** Component returns to INCUBATION status (for creation) or remains LOCKED (for refactor)
2. **Fix and Retry:** Address validation failures and retry the failed step
3. **Abandon:** If fixes are not feasible, abandon the component (remove from codebase)

**Rollback Rules:**

- **For Creation:** Failed components return to INCUBATION or are abandoned
- **For Refactor:** Failed refactors must restore component to previous LOCKED state (no partial locks allowed)
- **No Forced LOCK:** Components cannot be forced to LOCKED status if lifecycle steps are incomplete
- **No Forced Abandon:** Components cannot be abandoned without explicit decision after validation failure

**Fallback Behavior:**

- If a step cannot be completed, document the blocker and return to INCUBATION
- If Authority compliance cannot be achieved, the component cannot proceed to LOCK
- If Public API audit fails, the component must remain in INCUBATION until fixed

### Lifecycle Early Exit (Non-Foundation Outcome)

**Intentional Early Exit is Allowed:**

A component may intentionally exit the Foundation lifecycle before Step 13 (Foundation Lock) if it is determined that the component should be located in PATTERNS or EXTENSION layers instead of Foundation.

**Early Exit Rules:**

- **Not a Failure:** Early exit is an intentional outcome, not a lifecycle failure
- **Relocation Required:** Component must be relocated to appropriate layer (PATTERNS or EXTENSION)
- **No Foundation Lock:** Component must NOT be locked as Foundation
- **Token Cleanup:** Any provisional Foundation tokens created during development must be removed
- **Documentation:** Early exit decision and rationale must be documented

**Early Exit Process:**

1. **Decision Point:** Decision to exit can be made at any point before Step 13
2. **Relocation:** Component is moved to appropriate layer (PATTERNS or EXTENSION)
3. **Token Cleanup:** Provisional Foundation tokens are removed (if any were created)
4. **Documentation:** Early exit rationale is documented
5. **No Lock:** Component is NOT added to `FINAL_FOUNDATION_LOCK.md`

**For Refactor:** Early exit does not apply to refactor flows. Refactors of existing LOCKED components must maintain LOCKED status.

**Key Principle:** Early exit is a valid process outcome that allows components to find their correct architectural home without forcing Foundation status.

### Canonical Lifecycle Steps

The following 13 steps constitute the complete Foundation component creation/refactor process:

**Steps 1-10:** Architectural validation (semantic, structural, compliance)  
**Steps 11-12:** Quality gates (Storybook and Testing) — BLOCKING, must pass before Foundation Lock  
**Step 13:** Foundation Lock — formal locking after all validations and quality gates pass

**Quality Gates Rationale:**

**Why Storybook and Tests are Contracts, Not Optional Hygiene:**

- **Storybook is a Visual and Semantic Contract:** Storybook stories define how the component appears, behaves, and should be used. They are the authoritative contract between the component and its consumers. Missing stories mean missing contracts.

- **Tests are Architectural Protection Mechanisms:** Tests protect the component's public API, semantic behavior, and prevent regressions. Foundation components cannot afford behavioral regressions or API violations. Missing tests mean missing protection.

- **Both are Required for Foundation Lock:** Foundation Lock represents an immutable architectural contract. Without complete Storybook coverage and comprehensive testing, the contract is incomplete and unsafe. Quality gates ensure the contract is complete before lock.

- **No Exceptions for "Simple" Components:** Even simple primitives like Link require complete Storybook coverage and comprehensive testing. Foundation components serve as architectural foundations — they cannot have incomplete contracts or unprotected behavior.

#### Step 1: Semantic Declaration

**Purpose:** Formally declare the component as a Foundation component and establish its semantic identity.

**Requirements:**
- Explicitly declare the component as Foundation
- Define the component's semantic role and purpose
- Establish clear boundaries between Foundation and Extension layers
- Document what the component represents and what it does NOT represent

**For Refactor:** Verify that the existing semantic declaration is still accurate and update if necessary.

**Exit Criteria:**
- Component is explicitly declared as Foundation in documentation
- Semantic role and purpose are clearly documented
- Boundaries between Foundation and Extension layers are established

#### Step 2: Alternative Cleanup

**Purpose:** Ensure there is only one canonical Foundation component per category.

**Requirements:**
- Scan the codebase for alternative implementations
- Remove or archive duplicate components
- Ensure no `Simple*`, `Basic*`, `Legacy*`, or `*V2` variants exist
- Verify that all related components compose the Foundation component internally
- Check public exports to ensure only the canonical component is exported

**For Refactor:** Verify that no alternatives have been introduced and that all related components still compose the Foundation component correctly.

**Exit Criteria:**
- No duplicate or alternative implementations exist in the codebase
- All related components compose the Foundation component internally
- Only the canonical component is exported in public API

#### Step 3: State Model and Priority Verification

**Purpose:** Ensure the component uses only canonical states and respects state priority order.

**Requirements:**
- Verify component uses only canonical states from State Authority Matrix: `base`, `hover`, `active`, `focus-visible`, `disabled`, `loading`
- Verify state priority order is respected: `disabled > loading > active > hover > focus-visible > base`
- Ensure no custom or forbidden states are used
- Verify that disabled state blocks lower-priority states
- Document which canonical states the component uses (not all components need all states)

**For Refactor:** Verify that state model changes maintain compliance with State Authority Matrix and Interaction Authority Contract.

**Exit Criteria:**
- Component uses only canonical states from State Authority Matrix
- State priority order is correctly implemented
- No custom or forbidden states are present

#### Step 4: JS-Free Interaction Model

**Purpose:** Ensure all interaction states are controlled by CSS and browser-native behavior, not JavaScript.

**Requirements:**
- Verify no `useState` for interaction states (hover, active, focus)
- Verify no `onMouseEnter` / `onMouseLeave` handlers
- Verify no `onFocus` / `onBlur` handlers for visual state management
- Verify all states use CSS pseudo-classes (`:hover`, `:focus-visible`, `:disabled`)
- Verify no JavaScript-driven state management for interactions
- Verify no side-effects in Foundation component

**For Refactor:** Ensure refactoring maintains JS-free interaction model and does not introduce JavaScript-driven states.

**Exit Criteria:**
- No JavaScript-driven interaction states are present
- All interaction states use CSS pseudo-classes
- No side-effects exist in Foundation component

#### Step 5: Token-Driven Model

**Purpose:** Ensure all visual properties use tokens, not raw values.

**Requirements:**
- Verify all visual styles come from component tokens (e.g., `COMPONENT_TOKENS`)
- Verify no inline Tailwind classes for visual properties
- Verify no hardcoded values (px-4, h-10, etc.)
- Verify variant and state tokens are separated
- Verify all tokens reference Foundation tokens (Spacing, Typography, Radius, Motion, Elevation, Color)
- Verify no ad-hoc styling or conditional class generation

**For Refactor:** Ensure token usage improvements maintain token-driven architecture and do not introduce raw values.

**Exit Criteria:**
- All visual properties use tokens (no raw values)
- All tokens reference Foundation token domains
- No inline Tailwind classes for visual properties

#### Step 6: Public API Audit

**Purpose:** Verify that the public API is minimal, intentional, and does not leak implementation details.

**Requirements:**
- Audit all public exports from `src/index.ts`
- Verify component and types are exported
- Verify no internal implementation details are exported (unless explicitly needed for composition)
- Verify no CVA instances are exported unless required for Extension composition
- Verify no constant arrays are exported (types are sufficient for type-safety)
- Verify TypeScript types enforce canonical usage (closed union types)
- Verify Extension is possible only through `className` and composition, not mutation
- Document any exceptions or special cases

**For Refactor:** Verify that refactoring does not change public API in breaking ways and that all exports remain intentional.

**Public API Audit Checklist (Mandatory):**

- [ ] **Exports Audit:** All public exports from `src/index.ts` are audited
- [ ] **Component Export:** Component is exported (required)
- [ ] **Type Export:** Component types are exported (required)
- [ ] **No Implementation Leakage:** No internal implementation details are exported (unless explicitly needed for composition)
- [ ] **No CVA Export:** No CVA instances are exported (unless required for Extension composition)
- [ ] **No Constant Arrays:** No constant arrays are exported (types are sufficient for type-safety)
- [ ] **Type Safety:** TypeScript types enforce canonical usage (closed union types)
- [ ] **Extension Path:** Extension is possible only through `className` and composition, not mutation
- [ ] **Exceptions Documented:** Any exceptions or special cases are documented

**Exit Criteria:**
- All checklist items are verified and documented
- Public API is minimal and intentional
- No implementation details are leaked

#### Step 7: TypeScript System Compliance

**Purpose:** Ensure the component's TypeScript types comply with the Typing Standard and establish the Public Type Surface as a locked architectural contract.

**TypeScript as Architectural Contract:**

TypeScript types in public APIs are **architectural contracts**, not implementation details. The Public Type Surface defines what consumers can and cannot do with the component. Once established, the Public Type Surface becomes part of the component's locked contract and cannot be changed without unlock procedure.

**Public Type Surface Definition:**

The **Public Type Surface** consists of:
- All exported types from `src/index.ts`
- All public component props interfaces
- All variant/size union types
- All type exports that consumers can reference

**Explicit Separation of Public vs Internal Types:**

- **Public Types:** Must be explicit, canonical union types defined independently of implementation
- **Internal Types:** May use CVA-derived types, inference, or implementation details
- **Boundary:** Public component props MUST reference public types, never internal types

**For Refactor:** Ensure type improvements maintain Typing Standard compliance and do not introduce CVA-derived public types. Changes to Public Type Surface require unlock procedure.

**Requirements:**
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

**Forbidden Patterns (MANDATORY):**

The following patterns are **FORBIDDEN** in public APIs:

1. **CVA-Derived Public Types:**
   ```ts
   // ❌ FORBIDDEN
   export type ButtonProps = VariantProps<typeof buttonVariants>
   export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"]
   ```

2. **String Widening:**
   ```ts
   // ❌ FORBIDDEN
   variant?: string
   size?: string
   ```

3. **Any Types:**
   ```ts
   // ❌ FORBIDDEN
   props?: any
   value: any
   ```

4. **Unsafe Type Assertions (`as any`, `as unknown as`):**
   ```ts
   // ❌ FORBIDDEN - using as any to bypass public API
   <Component {...({ disabled: true } as any)} />
   
   // ❌ FORBIDDEN - unsafe type assertions
   const props = componentProps as any;
   const value = data as unknown as TargetType;
   
   // ✅ REQUIRED - request architectural approval to add prop to public API
   // If prop is needed, it must be added to the component's public API first
   ```

5. **Inferred Public Types:**
   ```ts
   // ❌ FORBIDDEN - inline unions in props
   variant?: "primary" | "secondary" | "accent"
   ```

**TypeScript System Compliance Checklist (Mandatory):**

Aligned with `docs/structure/TYPING_STANDARD.md`:

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

**Reference:** `docs/structure/TYPING_STANDARD.md` is the **REQUIRED, ENFORCED architectural standard** for public API typing.

**Unsafe Type Assertions Prohibition (MANDATORY):**

Unsafe type assertions (`as any`, `as unknown as`) that bypass the public API type system are **FORBIDDEN** in all contexts:
- Component implementation
- Tests
- Storybook stories
- Examples and documentation
- Internal utilities

**Prohibition Rule:**

- ❌ **FORBIDDEN:** Using `as any` or `as unknown as` to pass props that are not part of the component's public API
- ❌ **FORBIDDEN:** Using `as any` to bypass TypeScript errors instead of fixing the actual type issue
- ❌ **FORBIDDEN:** Using `as any` in tests or Storybook to simulate props that don't exist in the public API

**Approval Requirement:**

If a prop or feature is needed but does not exist in the public API:
1. **MUST request architectural approval** to add the prop to the public API
2. **MUST NOT** use `as any` to bypass the type system
3. **MUST wait** for approval and implementation before using in tests/Storybook

**Exception Process:**

Exceptions are allowed **ONLY** after explicit architectural approval and documentation:
- Exception must be documented with rationale
- Exception must be temporary (with plan to fix)
- Exception must be approved through architectural decision process

**Violation Severity:**

- **Silent use of `as any`** = **BLOCKING PROCESS VIOLATION**
- Violations prevent progression past Step 7 (TypeScript System Compliance)
- Violations in tests/Storybook prevent progression past Steps 11-12 (Quality Gates)

**Canonical Precedent: Link `disabled` Decision:**

The Link component's `disabled` prop decision serves as a canonical precedent:
- **Initial State:** `disabled` was not part of Link's public API
- **Violation:** Tests/Storybook used `as any` to simulate `disabled` prop
- **Resolution:** Architectural decision was made to add `disabled` to Link's public API
- **Outcome:** `disabled` is now part of Link's public API (see `LinkProps`)

**Lesson:** If a prop is needed for tests/Storybook/examples, it MUST be added to the public API through proper architectural approval, not bypassed with `as any`.

**Rollback Rules:**

If Step 7 validation fails:
- **For Creation:** Component returns to INCUBATION status
- **For Refactor:** Component remains LOCKED, but type changes are rolled back
- **Public Type Surface Changes:** Any change to Public Type Surface after Step 7 completion requires unlock procedure
- **Violation Types:** If forbidden patterns are detected, component cannot proceed to Step 8

**Exit Criteria:**
- All checklist items are verified
- Component types comply with Typing Standard
- TypeScript compilation passes without errors
- Public Type Surface is documented and locked
- No forbidden patterns are present in public APIs

#### Step 8: CVA Canonicalization

**Purpose:** Ensure CVA usage follows canonical patterns, enforces Canonical CVA Shape, and is used only as a composition transport layer.

**CVA as Composition Transport Only:**

CVA (`class-variance-authority` / `tokenCVA`) is **NOT a styling engine**. CVA is a **composition transport layer** that:
- Transports token-based variant classes to components
- Provides variant composition mechanism
- Does NOT contain styling logic, state management, or business rules

**Canonical CVA Shape Requirement:**

All CVA instances MUST follow the **Canonical CVA Shape**:

```ts
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

**Canonical CVA Shape Rules:**
- `base` contains only token references
- `variants` contain only token references (no raw classes)
- All variant maps use `satisfies Record<...>` constraints
- No logic, conditionals, or computed values in CVA
- No state variants (states are handled via CSS pseudo-classes, not CVA)
- Structure matches Button as canonical reference implementation

**Forbidden CVA Patterns (MANDATORY):**

The following patterns are **FORBIDDEN** in CVA:

1. **State Variants:**
   ```ts
   // ❌ FORBIDDEN - states belong in CSS, not CVA
   variants: {
    disabled: { ... },
    loading: { ... },
    hover: { ... },
   }
   ```

2. **Logic or Conditionals:**
   ```ts
   // ❌ FORBIDDEN - no logic in CVA
   variants: {
    variant: {
      primary: condition ? "class1" : "class2", // ❌
    }
   }
   ```

3. **Raw Classes (Non-Token):**
   ```ts
   // ❌ FORBIDDEN - must reference tokens
   variants: {
    variant: {
      primary: "bg-blue-500 text-white", // ❌ raw classes
    }
   }
   // ✅ REQUIRED - token references
   variants: {
    variant: {
      primary: `${COMPONENT_TOKENS.variant.primary}`, // ✅
    }
   }
   ```

4. **Computed or Dynamic Values:**
   ```ts
   // ❌ FORBIDDEN - no computed values
   variants: {
    size: {
      xs: `${getSizeClass("xs")}`, // ❌
    }
   }
   ```

**CVA Non-Export Rule:**

CVA instances MUST NOT be exported in public API unless explicitly required for Extension composition. Even when exported, CVA is for composition only, not mutation.

**Requirements:**
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

**For Refactor:** Ensure CVA refactoring maintains canonical patterns and does not introduce non-token styles, state variants, or logic.

**CVA Canonicalization Checklist (Mandatory):**

- [ ] **tokenCVA Usage:** CVA uses `tokenCVA` utility (if applicable)
- [ ] **Canonical CVA Shape:** CVA follows Canonical CVA Shape structure
- [ ] **Token References Only:** All variants reference tokens, no raw classes
- [ ] **No State Variants:** No state variants in CVA (states are CSS-only)
- [ ] **No Logic:** No logic, conditionals, or computed values in CVA
- [ ] **Type Constraints:** All variant maps use `satisfies Record<...>` constraints
- [ ] **Canonical Structure:** CVA structure matches Button as reference implementation
- [ ] **Transport Layer Only:** CVA is used only as variant transport, not styling engine
- [ ] **Non-Export Rule:** CVA is not exported unless required for Extension composition

**Rollback Rules:**

If Step 8 validation fails:
- **For Creation:** Component returns to INCUBATION status
- **For Refactor:** Component remains LOCKED, but CVA changes are rolled back
- **Forbidden Patterns:** If forbidden patterns are detected, component cannot proceed to Step 9
- **CVA Structure Violations:** If Canonical CVA Shape is violated, component must be refactored before proceeding

**Exit Criteria:**
- All checklist items are verified
- CVA follows Canonical CVA Shape
- CVA variants reference tokens, not raw values
- No forbidden patterns are present
- CVA structure matches canonical patterns (Button as reference)
- CVA is used only as composition transport layer

#### Step 9: Accessibility Hardening

**Purpose:** Ensure the component meets WCAG accessibility standards.

**Requirements:**
- Verify ARIA attributes are correct and complete
- Verify keyboard navigation works correctly
- Verify screen reader announcements are appropriate
- Verify focus management is correct (if applicable)
- Verify color contrast meets WCAG standards
- Verify interactive elements are keyboard accessible
- Run accessibility audit tools and fix violations

**For Refactor:** Ensure accessibility improvements maintain or enhance accessibility compliance.

**Exit Criteria:**
- ARIA attributes are correct and complete
- Keyboard navigation works correctly
- Accessibility audit tools pass without violations

#### Step 10: Authority Alignment

**Purpose:** Ensure the component complies with all relevant Authority Contracts.

**Requirements:**
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

**Scope-Aware Verification:**

**Important:** Not all Authority Contracts apply to every component. Only semantically relevant Authority Contracts must be verified. For example:
- A non-interactive component does not need Interaction Authority verification
- A component without typography does not need Typography Authority verification
- A component without motion does not need Motion Authority verification

**For Refactor:** Ensure refactoring maintains Authority compliance and does not violate any Authority rules.

**Exit Criteria:**
- Component complies with all semantically relevant Authority Contracts
- Any exceptions or special cases are documented
- No Authority rules are violated

#### Step 11: Storybook Quality Gate

**Purpose:** Ensure Storybook serves as a complete and accurate visual and semantic contract for Foundation components.

**Classification:** Quality Gate (BLOCKING — Foundation Lock is IMPOSSIBLE without passing this step)

**Why Storybook is a Contract, Not Documentation:**

Storybook is not optional documentation or a convenience tool. For Foundation components, Storybook stories are **architectural contracts** that define:
- **Visual contract:** How the component appears in all states
- **Semantic contract:** How the component should be used and when
- **Usage contract:** Canonical patterns that consumers must follow
- **Behavior contract:** Expected interactions and accessibility patterns

Storybook quality gates ensure that Foundation components have clear, canonical usage examples that serve as the authoritative visual and semantic contract for consumers. This step validates that Storybook stories are production-ready, remove ambiguity, provide developer experience clarity, and document all critical usage scenarios.

**Requirements:**
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
- **MUST include conceptual guidance stories** where architecture matters (e.g., Link vs Button semantic distinction)

**Storybook Quality Checklist (Mandatory):**

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
- [ ] **No Unsafe Type Assertions:** Storybook stories do NOT use `as any` or `as unknown as` to bypass public API typing (see Step 7: Unsafe Type Assertions Prohibition)

**What is Validated:**

- **Usage Scenarios:** All canonical usage patterns are documented
- **State Coverage:** All component states (including disabled) are visually documented
- **Composition Patterns:** asChild and other composition patterns are demonstrated
- **Accessibility:** Accessibility patterns are explicitly shown and validated
- **Real-World Usage:** Stories reflect actual production usage scenarios
- **Semantic Clarity:** Conceptual guidance clarifies architectural boundaries
- **DX Clarity:** Stories provide clear, unambiguous examples of component usage
- **Coverage:** All public API variations have corresponding stories
- **Canonicality:** Only intended, production-ready usage patterns are shown

**Failure Consequences:**

- ❌ **BLOCKING:** Component CANNOT proceed to Foundation Lock
- ❌ **BLOCKING:** Component MUST remain in INCUBATION (for creation) or cannot be refactored (for refactor)
- ❌ **BLOCKING:** Foundation Component Report MUST document Storybook quality gate failure

**For Refactor:** Ensure Storybook stories remain canonical after refactor and accurately reflect any behavior changes. Update stories to reflect refactored component state. All quality gate requirements must be re-verified.

**Exit Criteria:**
- All checklist items are verified and documented
- Canonical usage examples are present and complete
- All canonical states (including disabled) are documented
- asChild usage is demonstrated (if applicable)
- Accessibility-focused stories are present
- Real usage scenarios are documented
- Conceptual guidance stories are present (where architecture matters)
- No misleading or exploratory stories exist
- Storybook serves as accurate visual and semantic contract for the component
- Storybook quality gate status is explicitly documented in Foundation Component Report

#### Step 12: Testing Quality Gate

**Purpose:** Ensure comprehensive test coverage that provides semantic protection and regression safety for Foundation components.

**Classification:** Quality Gate (BLOCKING — Foundation Lock is IMPOSSIBLE without passing this step)

**Why Tests are Required Even for 'Simple' Primitives:**

Tests are not optional hygiene or "nice-to-have" documentation. For Foundation components, tests are **architectural protection mechanisms** that:
- **Protect public API:** Ensure component behavior matches declared contracts
- **Prevent regressions:** Catch breaking changes before they reach consumers
- **Validate semantics:** Ensure component behavior matches semantic contracts (e.g., disabled blocks interaction, keyboard navigation works)
- **Document behavior:** Serve as executable specifications of component behavior
- **Enable safe refactoring:** Allow internal implementation changes without breaking contracts

Even "simple" primitives like Link require comprehensive testing because:
- Foundation components are architectural contracts that cannot break
- Behavioral regressions violate Foundation Lock guarantees
- Semantic behavior (e.g., disabled state, accessibility) must be protected
- Public API changes must be caught before lock

Testing quality gates ensure that Foundation components have adequate test coverage that protects against behavioral regressions and validates semantic contracts. This step validates that tests provide meaningful protection and cover critical usage scenarios.

**Requirements:**
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

**Testing Quality Checklist (Mandatory):**

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
- [ ] **No Unsafe Type Assertions:** Tests do NOT use `as any` or `as unknown as` to bypass public API typing (see Step 7: Unsafe Type Assertions Prohibition)

**What is Validated:**

- **Semantic Protection:** Tests validate that component behavior matches semantic contracts
- **Regression Safety:** Tests prevent regressions in critical functionality
- **Coverage Adequacy:** Tests cover all important usage scenarios and API variations
- **Behavioral Protection:** Semantic behavior (disabled state, interactions) is protected
- **Accessibility Protection:** Accessibility patterns (ARIA, keyboard, roles) are protected
- **Composition Protection:** Composition patterns (asChild) are protected where applicable
- **Test Quality:** Tests follow project standards and provide meaningful validation

**Failure Consequences:**

- ❌ **BLOCKING:** Component CANNOT proceed to Foundation Lock
- ❌ **BLOCKING:** Component MUST remain in INCUBATION (for creation) or cannot be refactored (for refactor)
- ❌ **BLOCKING:** Foundation Component Report MUST document Testing quality gate failure
- ❌ **BLOCKING:** No Foundation component is allowed without adequate test coverage

**For Refactor:** Ensure tests remain valid after refactor and update tests to reflect any behavior changes. Verify tests continue to provide adequate protection. All quality gate requirements must be re-verified.

**Exit Criteria:**
- All checklist items are verified and documented
- Component has adequate test coverage for critical functionality
- Unit tests exist for core behavior
- Integration tests exist where composition is involved
- Accessibility tests validate ARIA, roles, and keyboard navigation
- Semantic behavior tests validate component behavior matches contracts
- All tests pass without errors or warnings
- Tests provide semantic protection and regression safety
- Testing quality gate status is explicitly documented in Foundation Component Report

#### Step 13: Foundation Lock

**Purpose:** Formally lock the component as a Foundation component.

**Requirements:**
- Update `FINAL_FOUNDATION_LOCK.md` to include the component
- Update `INTERNAL_CANONICAL_CONTEXT.md` if necessary
- Document the component's lock status and date
- Verify all previous steps (1-12) are complete
- Create or update component documentation
- Ensure component is listed in Foundation components list
- **Verify Foundation Component Report:** Ensure compliant report following [FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md](./FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md) exists

**Pre-Lock Verification (MANDATORY):**

Foundation Lock is **IMPOSSIBLE** without passing all quality gates. Before proceeding to Foundation Lock, verify that all quality gates have passed:

- ✅ **Step 11 (Storybook Quality Gate) is COMPLETE** — Storybook serves as visual and semantic contract
- ✅ **Step 12 (Testing Quality Gate) is COMPLETE** — Tests provide semantic protection and regression safety
- ✅ **All architectural validation steps (1-10) are COMPLETE** — Component complies with all architectural rules
- ✅ **Foundation Component Report is COMPLIANT** — Report documents all steps and validates completion

**Failure Consequences:**

If any quality gate (Step 11 or Step 12) fails:
- ❌ **Component CANNOT proceed to Foundation Lock (Step 13)**
- ❌ **Component MUST remain in INCUBATION** (for creation) or **cannot be refactored** (for refactor)
- ❌ **Foundation Component Report MUST document failure** with explicit blocking status
- ❌ **Conditional Lock or STOP:** Component lifecycle is BLOCKED until quality gates pass

**No Exceptions:** There are no exceptions to quality gate requirements. Foundation components require complete Storybook coverage and comprehensive testing before lock.

**Foundation Component Report Verification (Mandatory):**

Foundation Component Reports are **mandatory artifacts** for Foundation Lock. Before Foundation Lock:

- [ ] **Report Exists:** Foundation Component Report exists in `docs/reports/` directory
- [ ] **Format Compliant:** Report follows [FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md](./FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md) format
- [ ] **All Steps Documented:** All lifecycle steps (1-13) are documented in report
- [ ] **Violations Consolidated:** All violations are consolidated in VIOLATION SUMMARY & RESOLUTION section
- [ ] **Lifecycle Status Clear:** LIFECYCLE PROGRESSION STATUS section explicitly states current status
- [ ] **No Blocking Violations:** No blocking violations remain (all must be FIXED or ACCEPTED EXCEPTION)
- [ ] **Report Validated:** Report passes validation checklist from template

**For Refactor:** Verify that refactoring does not require unlock and that component remains locked. Ensure all quality gates (Storybook, Testing) remain valid after refactor. Ensure report is updated to reflect refactor state.

**Exit Criteria:**
- Component is listed in `FINAL_FOUNDATION_LOCK.md`
- Component is listed in `INTERNAL_CANONICAL_CONTEXT.md` (if necessary)
- Component's lock status and date are documented
- All previous lifecycle steps (1-12) are complete and verified
- Component documentation is created or updated
- Foundation Component Report is compliant and validates all steps (1-13)

### Lifecycle Application

**For Creation:**
- Component starts in INCUBATION status
- All steps must be completed in order
- Each step must be verified before proceeding to the next
- Documentation should be created for each step
- Component moves from INCUBATION to LOCKED upon completion

**For Refactor:**
- Component remains in LOCKED status throughout (does not enter INCUBATION)
- All steps must be re-verified
- Steps that are already compliant may be marked as verified
- Steps that need updates must be completed
- Refactoring must not violate any Authority rules
- Component remains LOCKED after refactor completion

### Step Numbering

**Important:** Step numbering is **non-semantic**. The order of steps matters, but the specific numbers (1, 2, 3, etc.) are not part of the architectural contract. Steps may be renumbered or reorganized as long as the logical sequence is maintained.

### Verification

Before proceeding to Foundation Lock (Step 13), verify:
- ✅ All architectural validation steps (1-10) are complete
- ✅ All exit criteria for each step are met
- ✅ All semantically relevant Authority Contracts are complied with
- ✅ Public API Audit checklist is complete (Step 6)
- ✅ TypeScript System Compliance checklist is complete (Step 7)
- ✅ CVA Canonicalization checklist is complete (Step 8)
- ✅ Component is token-driven and JS-free
- ✅ Accessibility standards are met (Step 9)
- ✅ No alternatives or duplicates exist
- ✅ Storybook quality gate is complete (Step 11)
- ✅ Testing quality gate is complete (Step 12)
- ✅ Foundation Component Report is compliant and validates all steps (1-13)
- ✅ Component is ready to move from INCUBATION to LOCKED (for creation) or remains LOCKED (for refactor)

### Process vs Law Distinction

**This lifecycle is PROCESS, not LAW:**

- **LAW (Immutable):** Authority Contracts define architectural rules that cannot be changed without unlock procedure
- **PROCESS (Evolvable):** This lifecycle describes how to work within the LAW; the process can evolve to improve ergonomics
- **EXAMPLES (Reference):** Reference implementations and usage patterns provide non-binding guidance

**Key Principle:** This lifecycle process can be improved, but it cannot weaken or bypass architectural LAW. All lifecycle steps must respect Authority Contracts and Lock documents.

---

## 10.1. Canonical Foundation Component Report Format

**Status:** MANDATORY  
**Version:** 1.0  
**Date Created:** 2025-12-17  
**Reference:** [FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md](./FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md)

### Mandatory Report Requirement

**All Foundation components MUST have a compliant report before Foundation Lock (Step 13).**

Foundation Component Reports are **mandatory process artifacts** that serve as:

- **Single Source of Truth:** Authoritative record of lifecycle state
- **Process Enforcement:** Structural constraint ensuring complete lifecycle verification
- **Decision Authority:** Lifecycle progression decisions are ONLY valid when derived from compliant reports
- **AI/Human Contract:** Both AI agents and humans must treat reports as authoritative artifacts

### Canonical Report Naming Rule

**Status:** MANDATORY  
**Version:** 1.0.0  
**Enforcement:** All Foundation refactor steps MUST use this naming convention

**Required Format:**

All Foundation Component Reports **MUST** use the following canonical filename format:

```
<COMPONENT>_FOUNDATION_LOCK_REPORT.md
```

**Component Name Rules:**
- **Uppercase:** Component name MUST be in UPPERCASE
- **Singular:** Component name MUST be singular (e.g., `BUTTON`, not `BUTTONS`)
- **Canonical Match:** Component name MUST match the canonical component name exactly

**Examples:**
- ✅ `BUTTON_FOUNDATION_LOCK_REPORT.md`
- ✅ `LINK_FOUNDATION_LOCK_REPORT.md`
- ✅ `SELECT_FOUNDATION_LOCK_REPORT.md`

**Forbidden Patterns:**
- ❌ **STEP-based filenames:** `BUTTON_STEP_3_REPORT.md`, `BUTTON_STEP_03_REPORT.md`
- ❌ **AUDIT-based filenames:** `BUTTON_FOUNDATION_AUDIT.md`, `BUTTON_AUDIT_REPORT.md`
- ❌ **Versioned filenames:** `BUTTON_FOUNDATION_LOCK_REPORT_v1.md`
- ❌ **Multiple report files per component:** Each component MUST have exactly ONE report file

**Report File Behavior:**
- ✅ **Single File Per Component:** All refactor steps (Step 1, Step 2, Step 3, etc.) append their results as new sections inside the same report file
- ✅ **Step Identifiers in Content:** Step identifiers (STEP 1, STEP 2, etc.) MUST exist as headings inside the document, NOT in the filename
- ✅ **Cumulative Audit Trail:** The report file represents the canonical audit trail toward Foundation LOCK
- ✅ **Append, Don't Replace:** Each step adds content to the existing report, creating a complete lifecycle record

**Process Violation:**
- ❌ **FORBIDDEN:** Creating step-specific report files
- ❌ **FORBIDDEN:** Creating audit-specific report files
- ❌ **FORBIDDEN:** Using versioned filenames for reports
- ❌ **FORBIDDEN:** Creating multiple report files for a single component

**Consequence:** Report files that violate naming convention are non-compliant. Component cannot proceed to Foundation Lock until report filename is corrected.

### Report Format Standard

**Foundation Component Report v1.0** is the mandatory canonical format defined in [FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md](./FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md).

**Key Requirements:**
- All 13 lifecycle steps must appear exactly once in canonical order
- All violations must be consolidated in VIOLATION SUMMARY & RESOLUTION section
- Lifecycle progression status must be explicitly stated in LIFECYCLE PROGRESSION STATUS section
- Blocking violations automatically halt progression regardless of narrative text
- Reports must pass validation checklist before Step 13
- Report filename MUST follow canonical naming rule: `<COMPONENT>_FOUNDATION_LOCK_REPORT.md`

### Process Violation

**Deviation from report format is a PROCESS VIOLATION:**

- ❌ **FORBIDDEN:** Missing report
- ❌ **FORBIDDEN:** Non-compliant report structure
- ❌ **FORBIDDEN:** Duplicate or missing STEP sections
- ❌ **FORBIDDEN:** Violations not consolidated
- ❌ **FORBIDDEN:** Ambiguous lifecycle status
- ❌ **FORBIDDEN:** Proceeding to Step 13 without compliant report

**Consequence:** Component cannot proceed to Foundation Lock until report is compliant.

### Canonical Example

**Reference Implementation:** [LINK_FOUNDATION_LOCK_REPORT.md](../reports/LINK_FOUNDATION_LOCK_REPORT.md)

The Link component report is the **first canonical example** of a compliant Foundation Component Report following v1.0 format.

### Enforcement

**AI agents and humans MUST:**
- Treat reports as authoritative artifacts for lifecycle state
- Derive lifecycle decisions from reports, not code inspection
- Refuse to proceed to Step 13 if report is non-compliant
- Validate report structure before accepting lifecycle progression

**Lifecycle progression is INVALID if:**
- Report does not exist
- Report is non-compliant with format
- Report contains blocking violations that are not FIXED or ACCEPTED EXCEPTION
- Lifecycle status contradicts blocking violations

---

## 10.2. Lifecycle Expansion Note (2025-12-17)

**Lifecycle Structure Update:**

The Foundation component lifecycle was expanded to explicitly include quality gates as mandatory steps:

- **Previous lifecycle:** 11 steps (Foundation Lock was Step 11, Storybook verification was part of Foundation Lock)
- **Current lifecycle:** 13 steps
  - Steps 1-10: Architectural validation (unchanged)
  - Step 11: Storybook Quality Gate (NEW - separated from Foundation Lock)
  - Step 12: Testing Quality Gate (NEW - explicit quality gate)
  - Step 13: Foundation Lock (previously Step 11)

**Backward Compatibility:**
- Components already locked remain valid
- Reports created before this expansion may reference the old structure
- All new lifecycle processes must follow the 13-step structure
- Quality gates (Steps 11-12) are now BLOCKING requirements before Foundation Lock

**Rationale:**
Quality gates are separated from Foundation Lock to:
- Clearly distinguish architectural validation (Steps 1-10) from quality validation (Steps 11-12)
- Make Storybook and Testing mandatory, explicit steps rather than implicit verification
- Ensure quality gates cannot be bypassed before Foundation Lock
- Improve process clarity and enforceability

---

## 11. Document Status

This document:

- does not override authority contracts
- does not change lock states
- does not permit unlock
- defines **how to operate within existing locks**
- defines **canonical lifecycle for Foundation component creation/refactor**
- exists to prevent accidental architectural violations
