# 🔒 Final Foundation Lock

**Version:** 1.20  
**Date Created:** 2025-12-12  
**Last Updated:** 2025-01-27  
**Status:** ✅ **LOCKED**  
**Layer:** UI / ARCHITECTURE  
**Priority:** CRITICAL  
**Architecture Phase:** FOUNDATION — **CLOSED**

---

## Document Classification

**TYPE:** META  
**MUTABILITY:** EVOLVABLE  
**LOCK STATUS:** ✅ LOCKED  
**AUTHORITY DOMAIN:** Foundation Lock

**Purpose:** This document tracks lock status across all Foundation domains. It can be updated as new domains are locked, but cannot unlock existing locks.

---

## 📋 Purpose

This document **formally and definitively locks** the Foundation layer of `@tenerife.music/ui`. The Foundation layer is **complete**, **immutable**, and **closed for modifications**.

**This document is the authoritative source of truth** for the Foundation layer architecture. It supersedes all previous architectural decisions and establishes the final, binding contract for Foundation components.

**After this lock, the Foundation architecture phase is officially closed.** All future development must occur exclusively in the Extension layer.

---

## 📖 Authority Status Semantics

This section defines the precise semantics of status terms used throughout Foundation Authority documents. These definitions eliminate ambiguity and ensure consistent interpretation across all Authority documentation.

### Status Terms

#### ACTIVE

**Definition:** `ACTIVE` means the Authority is **in force and governs the system**.

**Semantics:**
- ✅ Authority rules are **currently enforced** and **actively applied**
- ✅ Authority is **operational** and **binding** for all components
- ✅ Authority **must be followed** by all implementations
- ❌ **ACTIVE does NOT mean editable** - ACTIVE Authorities are still immutable
- ❌ **ACTIVE does NOT mean unlocked** - ACTIVE Authorities still require unlock procedure for modifications

**Usage:** ACTIVE status indicates that the Authority is the current, authoritative source of rules for its domain. All components must comply with ACTIVE Authorities.

**Example:** `SPACING_AUTHORITY_CONTRACT.md` has status `ACTIVE` - this means spacing rules are in force and must be followed, but the Authority document itself is still immutable and requires unlock procedure to modify.

#### LOCKED

**Definition:** `LOCKED` means the Authority content **cannot be modified without explicit unlock procedure**.

**Semantics:**
- ✅ Authority document content is **protected from modification**
- ✅ Changes require **explicit unlock workflow** (justification, audit, approval)
- ✅ Authority rules are **frozen** and **cannot be altered in-place**
- ✅ LOCKED status is **stronger than ACTIVE** in terms of modification protection
- ❌ **LOCKED does NOT mean inactive** - LOCKED Authorities are still in force and must be followed

**Usage:** LOCKED status indicates that the Authority has completed formal lock process and is protected by unlock procedure requirements.

**Example:** `INTERACTION_AUTHORITY_CONTRACT.md` has status `LOCKED` - this means the document content cannot be modified without explicit unlock procedure, but the Authority rules are still in force and must be followed.

#### IMMUTABLE

**Definition:** `IMMUTABLE` means the Authority rules themselves **cannot be altered in-place**.

**Semantics:**
- ✅ Authority rules are **permanently fixed** in their current form
- ✅ Rules cannot be **modified, removed, or reinterpreted** without new Authority version
- ✅ IMMUTABLE is a **property of Authority rules**, not document status
- ✅ All Foundation Authority rules are IMMUTABLE regardless of ACTIVE/LOCKED status
- ❌ **IMMUTABLE does NOT mean unchangeable forever** - new Authority versions can be created

**Usage:** IMMUTABLE describes the nature of Authority rules - they are fixed declarations of architectural law that cannot be modified in-place.

**Example:** All Authority documents have `IMMUTABLE` mutability - this means their rules cannot be altered in-place, but new Authority versions can be created if needed.

### Status vs Mutability

**Important Distinction:**

- **Status (ACTIVE/LOCKED)** = **Operational state** and **modification protection level**
  - ACTIVE = Authority is in force (operational)
  - LOCKED = Authority content is protected (modification protection)

- **Mutability (IMMUTABLE/EVOLVABLE)** = **Rule changeability** and **document evolution capability**
  - IMMUTABLE = Rules cannot be altered in-place (applies to Authority rules)
  - EVOLVABLE = Document can evolve (applies to Enforcement/Reference/Meta documents)

### Status Combinations

**ACTIVE + IMMUTABLE:**
- Authority is **in force** (ACTIVE)
- Authority rules **cannot be altered in-place** (IMMUTABLE)
- Authority document **can be modified** only via unlock procedure
- **Example:** `SPACING_AUTHORITY_CONTRACT.md` - spacing rules are in force, but rules themselves are immutable

**LOCKED + IMMUTABLE:**
- Authority content is **protected from modification** (LOCKED)
- Authority rules **cannot be altered in-place** (IMMUTABLE)
- Authority document **requires explicit unlock** for any modifications
- **Example:** `INTERACTION_AUTHORITY_CONTRACT.md` - interaction rules are locked and immutable

**ACTIVE + EVOLVABLE:**
- Document is **operational** (ACTIVE)
- Document content **can evolve** (EVOLVABLE)
- **Example:** `scripts/verify-interaction-authority.mjs` - script is active and can be enhanced

### Key Principles

1. **ACTIVE ≠ Editable**
   - ACTIVE means "in force", not "can be edited"
   - All ACTIVE Authorities are still immutable and require unlock procedure

2. **LOCKED ≠ Inactive**
   - LOCKED means "protected from modification", not "not in use"
   - All LOCKED Authorities are still in force and must be followed

3. **IMMUTABLE = Rule Immutability**
   - IMMUTABLE applies to Authority rules themselves
   - New Authority versions can be created, but existing rules cannot be altered in-place

4. **Status and Mutability are Independent**
   - ACTIVE/LOCKED describes operational state and protection level
   - IMMUTABLE/EVOLVABLE describes rule changeability and document evolution

### Authority Evolution Path

If Authority modifications are required:

1. **For ACTIVE Authorities:** Still require unlock procedure (ACTIVE does not mean editable)
2. **For LOCKED Authorities:** Require explicit unlock procedure (LOCKED means protected)
3. **For IMMUTABLE Rules:** Create new Authority version (existing rules cannot be altered in-place)

**Rule:** All Foundation Authorities (regardless of ACTIVE/LOCKED status) are IMMUTABLE and require unlock procedure or new versioning for modifications.

### Enforcement Document Semantics

This subsection clarifies the semantics of LOCKED and EVOLVABLE statuses specifically for Enforcement documents, to eliminate false perception of Enforcement mechanisms as immutable.

#### Law vs Mechanism Distinction

**Fundamental Principle:**

- **Authority Documents** define **WHAT** the rules are (architectural law)
- **Enforcement Documents** define **HOW** rules are enforced (mechanisms and tools)

**Authority = Law (IMMUTABLE):**
- Authority documents declare architectural rules
- Rules are immutable declarations of architectural law
- Rules cannot be altered without unlock procedure or new versioning

**Enforcement = Mechanism (EVOLVABLE):**
- Enforcement documents describe enforcement mechanisms
- Mechanisms can evolve to improve detection, accuracy, and coverage
- Mechanisms can be improved without Authority unlock procedure

#### LOCKED (Enforcement) Semantics

**Definition:** `LOCKED` for Enforcement documents means **rules are binding, but mechanism is evolvable**.

**Semantics:**
- ✅ Enforcement rules are **binding** and **must be followed**
- ✅ Enforcement mechanisms **can evolve** to improve tooling
- ✅ Enforcement can be **enhanced** without Authority unlock procedure
- ✅ Enforcement can be **improved** (better detection, accuracy, coverage)
- ❌ **LOCKED (Enforcement) does NOT mean immutable** - mechanisms can change
- ❌ **LOCKED (Enforcement) does NOT require Authority unlock** - mechanisms can evolve independently

**Usage:** LOCKED status for Enforcement documents indicates that the enforcement rules are binding, but the mechanisms themselves can evolve as tooling improves.

**Example:** `INTERACTION_AUTHORITY_GUARD_LAYER.md` has status `LOCKED` and mutability `EVOLVABLE` - this means:
- The guard layer rules are binding (LOCKED)
- The enforcement mechanisms can evolve (EVOLVABLE)
- Mechanisms can be improved without unlocking Interaction Authority
- Better detection patterns can be added without Authority modification

#### EVOLVABLE (Enforcement) Semantics

**Definition:** `EVOLVABLE` for Enforcement documents means **mechanisms can evolve without Authority unlock**.

**Semantics:**
- ✅ Enforcement mechanisms **can be improved** (better tooling, detection, accuracy)
- ✅ Enforcement patterns **can evolve** (new verification methods, enhanced scripts)
- ✅ Enforcement can be **enhanced** without Authority modification
- ✅ Enforcement can be **updated** to improve coverage and accuracy
- ❌ **EVOLVABLE does NOT mean Authority rules can change** - only mechanisms evolve
- ❌ **EVOLVABLE does NOT allow Authority rule modifications** - Authority remains immutable

**Usage:** EVOLVABLE mutability for Enforcement documents indicates that enforcement mechanisms can evolve to improve how rules are checked, but the underlying Authority rules remain immutable.

**Example:** `scripts/verify-interaction-authority.mjs` has status `ACTIVE` and mutability `EVOLVABLE` - this means:
- The script is operational (ACTIVE)
- The script can be enhanced (EVOLVABLE)
- Better verification methods can be added
- Script improvements do not require Interaction Authority unlock

#### Enforcement Evolution Rules

**What Can Evolve (Without Authority Unlock):**

- ✅ Enforcement mechanisms (scripts, tools, verification methods)
- ✅ Detection patterns (better rule checking, enhanced coverage)
- ✅ Tooling improvements (faster checks, better accuracy)
- ✅ Verification methods (new testing approaches, enhanced validation)
- ✅ Enforcement documentation (better examples, clearer instructions)

**What Cannot Change (Requires Authority Unlock):**

- ❌ Authority rules themselves (require Authority unlock)
- ❌ What rules are enforced (require Authority modification)
- ❌ Rule definitions (require Authority versioning)
- ❌ Architectural law (require Authority unlock procedure)

#### Key Principles for Enforcement

1. **LOCKED (Enforcement) = Rules Binding, Mechanism Evolvable**
   - Enforcement rules are binding and must be followed
   - Enforcement mechanisms can evolve without Authority unlock

2. **Authority Defines Law, Enforcement Defines Tools**
   - Authority documents declare immutable architectural law
   - Enforcement documents describe evolvable enforcement mechanisms

3. **Enforcement Can Change Without Authority Unlock**
   - Enforcement mechanisms can be improved independently
   - Better tooling does not require Authority modification
   - Enhanced detection does not require Authority unlock

4. **Foundation Authority Remains Inviolable**
   - Authority rules are immutable regardless of Enforcement evolution
   - Enforcement changes do not affect Authority rules
   - Authority unlock is only needed for rule modifications

**Rule:** Enforcement documents are EVOLVABLE - their mechanisms can evolve to improve rule enforcement, but the underlying Authority rules remain immutable and inviolable.

### Guard Layer Intent

This subsection declares the intentional design and purpose of Guard Layer documents to prevent attempts to "optimize" or "simplify" them for human readability.

#### Machine-Oriented Design

**Fundamental Principle:**

- **Guard Layer documents are optimized for AI enforcement, not human readability**
- **Verbosity is intentional** - comprehensive coverage is prioritized over brevity
- **Machine parsing is the primary concern** - human readability is secondary

**Design Intent:**

- ✅ Guard documents are **machine-readable** specifications for AI agents
- ✅ Guard documents use **explicit, exhaustive patterns** for rule checking
- ✅ Guard documents prioritize **completeness over conciseness**
- ✅ Guard documents are **verbatim instruction sets** for automated enforcement
- ❌ Guard documents are **NOT optimized for human reading**
- ❌ Guard documents are **NOT meant to be concise or elegant**

**Usage:** Guard Layer documents serve as comprehensive, machine-oriented specifications that AI agents can parse and apply mechanically. They are intentionally verbose to ensure complete coverage of all enforcement patterns.

**Example:** `INTERACTION_AUTHORITY_GUARD_LAYER.md` is intentionally verbose with exhaustive pattern lists, explicit rule formulations, and comprehensive coverage - this verbosity ensures AI agents can mechanically check all interaction authority rules without ambiguity.

#### Intentional Verbosity

**Why Guard Documents Are Verbose:**

1. **Complete Coverage** - Verbosity ensures all edge cases and patterns are explicitly covered
2. **Machine Parsing** - Explicit formulations reduce ambiguity for AI agents
3. **Mechanical Enforcement** - Comprehensive patterns enable automated rule checking
4. **Zero Ambiguity** - Verbose specifications eliminate interpretation differences
5. **AI Optimization** - Detailed instructions work better for AI agents than concise summaries

**What Verbosity Provides:**

- ✅ **Exhaustive pattern lists** - All forbidden/allowed patterns explicitly listed
- ✅ **Explicit rule formulations** - Rules stated verbatim, not summarized
- ✅ **Comprehensive examples** - Multiple examples for each pattern type
- ✅ **Mechanical checkability** - Patterns that can be mechanically verified
- ✅ **Zero interpretation** - No room for different interpretations

**Rule:** Guard Layer verbosity is intentional and necessary for machine-oriented enforcement. Attempts to "optimize" or "simplify" Guard documents for human readability are forbidden.

#### Human Refactoring Prohibition

**Forbidden Actions:**

- ❌ **Forbidden:** "Simplifying" Guard documents for readability
- ❌ **Forbidden:** "Optimizing" Guard documents for human consumption
- ❌ **Forbidden:** "Refactoring" Guard documents to be more concise
- ❌ **Forbidden:** "Cleaning up" Guard documents for elegance
- ❌ **Forbidden:** Removing "redundant" patterns or examples
- ❌ **Forbidden:** Summarizing explicit rule formulations

**Allowed Actions:**

- ✅ **Allowed:** Adding new enforcement patterns (improving coverage)
- ✅ **Allowed:** Enhancing detection mechanisms (better tooling)
- ✅ **Allowed:** Improving verification methods (better accuracy)
- ✅ **Allowed:** Adding more examples (better coverage)
- ✅ **Allowed:** Clarifying ambiguous patterns (fixing errors)

**Rule:** Human refactoring of Guard Layer documents for readability, conciseness, or elegance is **FORBIDDEN**. Guard documents can only be modified to improve enforcement coverage, detection accuracy, or fix errors - never for human readability optimization.

#### Guard Layer vs Authority/Enforcement

**Guard Layer (Machine-Oriented):**
- Optimized for AI enforcement
- Verbose and explicit
- Comprehensive pattern coverage
- Machine-readable specifications
- Human readability is secondary

**Authority Documents (Human-Oriented):**
- Optimized for human understanding
- Clear and concise
- Conceptual rule definitions
- Human-readable declarations
- Machine parsing is secondary

**Enforcement Documents (Hybrid):**
- Balance between human and machine needs
- Can be optimized for either audience
- Tooling and mechanism descriptions
- Flexible optimization approach

**Rule:** Guard Layer documents are the only documents explicitly optimized for machine consumption. Authority documents are human-oriented, and Enforcement documents can balance both needs. Guard Layer must remain machine-optimized.

#### Key Principles for Guard Layer

1. **Machine-Oriented, Not Human-Optimized**
   - Guard documents are optimized for AI enforcement
   - Human readability is not a priority
   - Verbosity is intentional and necessary

2. **Verbosity is Intentional**
   - Complete coverage requires verbosity
   - Explicit patterns reduce ambiguity
   - Comprehensive examples enable mechanical checking

3. **Human Refactoring is Forbidden**
   - Guard documents cannot be "simplified" for readability
   - Guard documents cannot be "optimized" for human consumption
   - Guard documents can only be enhanced for better enforcement

4. **Guard Layer is Separate from Authority/Enforcement**
   - Guard Layer is machine-oriented (unlike Authority)
   - Guard Layer is machine-oriented (unlike most Enforcement)
   - Guard Layer serves a unique purpose: AI enforcement specifications

**Rule:** Guard Layer documents are machine-oriented enforcement specifications. Their verbosity is intentional, and human refactoring for readability is forbidden. Guard documents can only be modified to improve enforcement coverage, detection accuracy, or fix errors.

---

## Foundation Document Classification

This section classifies all foundation documents by layer (Authority, Enforcement, Reference) and mutability status.

### Authority Documents (Declarative Rules - IMMUTABLE)

Authority documents define **what** the rules are. They are immutable declarations of architectural law.

| Document | Domain | Status | Mutability | Unlock Required |
|----------|--------|--------|------------|-----------------|
| INTERACTION_AUTHORITY_CONTRACT.md | Interaction Authority | ✅ LOCKED | IMMUTABLE | Yes |
| STATE_AUTHORITY_CONTRACT.md | State Authority | ✅ LOCKED | IMMUTABLE | Yes |
| STATE_AUTHORITY_MATRIX.md | State Authority Matrix | ✅ LOCKED | IMMUTABLE | Yes |
| SPACING_AUTHORITY_CONTRACT.md | Spacing Authority | ✅ LOCKED | IMMUTABLE | Yes |
| RADIUS_AUTHORITY_CONTRACT.md | Radius Authority | ✅ LOCKED | IMMUTABLE | Yes |
| TYPOGRAPHY_AUTHORITY_CONTRACT.md | Typography Authority | ✅ LOCKED | IMMUTABLE | Yes |
| MOTION_AUTHORITY_CONTRACT.md | Motion Authority | ✅ LOCKED | IMMUTABLE | Yes |
| ELEVATION_AUTHORITY_CONTRACT.md | Elevation Authority | ✅ LOCKED | IMMUTABLE | Yes |
| LAYOUT_AUTHORITY_CONTRACT.md | Layout Authority | ✅ LOCKED | IMMUTABLE | Yes |
| EXTENSION_AUTHORITY_CONTRACT.md | Extension Authority | ✅ ACTIVE | IMMUTABLE | Yes |
| INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md | Interactive Size Scale Authority | ✅ LOCKED | IMMUTABLE | Yes |
| TUI_TOKEN_SYSTEM.md | Token System | ✅ LOCKED | IMMUTABLE | Yes |
| UI_ARCHITECTURE_RULES.md | Architecture Rules | ✅ ACTIVE | IMMUTABLE | Yes |

**Rule:** Authority documents define architectural law. They can only be modified via explicit unlock procedure with full audit.

### Enforcement Documents (Mechanisms - EVOLVABLE)

Enforcement documents define **how** rules are enforced. They can evolve as tooling improves.

| Document | Domain | Status | Mutability | Notes |
|----------|--------|--------|------------|-------|
| INTERACTION_AUTHORITY_GUARD_LAYER.md | Interaction Authority | ✅ LOCKED | EVOLVABLE | Enforcement patterns can improve |
| INTERACTION_AUTHORITY_HOVER_VERIFICATION.md | Interaction Authority | ✅ LOCKED | EVOLVABLE | Verification methods can improve |
| BUTTON_CVA_ENFORCEMENT.md | Button CVA | ✅ LOCKED | EVOLVABLE | Enforcement mechanisms can improve |
| scripts/verify-interaction-authority.mjs | Interaction Authority | ✅ ACTIVE | EVOLVABLE | Script can be enhanced |

**Rule:** Enforcement documents define how rules are checked. They can evolve to improve detection accuracy and coverage, but must not change the underlying rules they enforce.

### Reference Documents (Implementation Examples - EVOLVABLE)

Reference documents show **examples** of correct implementation. They can be updated as reference implementations improve.

| Document | Domain | Status | Mutability | Notes |
|----------|--------|--------|------------|-------|
| INTERACTION_AUTHORITY_AUDIT.md | Interaction Authority | ✅ COMPLETE | EVOLVABLE | Can add more component audits |
| Button component (button.tsx) | Interaction Authority | ✅ LOCKED | EVOLVABLE | Bug fixes, type improvements allowed |

**Rule:** Reference documents show correct implementation patterns. They can be updated as reference implementations improve, but must maintain compliance with Authority rules.

### Meta Documents (Lock Status - EVOLVABLE)

Meta documents track lock status and can be updated as new domains are locked.

| Document | Domain | Status | Mutability | Notes |
|----------|--------|--------|------------|-------|
| FINAL_FOUNDATION_LOCK.md | Foundation Lock | ✅ LOCKED | EVOLVABLE | Can add new domain locks |

**Rule:** Meta documents track lock status. They can be updated as new domains are locked, but cannot unlock existing locks.

---

## 🔒 Locked Foundation Components

The following components constitute the **complete and final** Foundation layer. These components are **immutable** and serve as the **sole canonical foundation** for their respective categories.

| Component       | Category   | Base Library      | Foundation Status | Lock Date |
| --------------- | ---------- | ----------------- | ----------------- | --------- |
| **Modal**       | Overlays   | Radix Dialog      | ✅ LOCKED          | 2025-12-12 |
| **Tabs**        | Navigation | Radix Tabs        | ✅ LOCKED          | 2025-12-12 |
| **Select**      | Inputs     | Radix Select      | ⏳ UNLOCKED (Pending Canonical Lock) | 2025-12-17 |
| **ContextMenu**  | Menus      | Radix ContextMenu | ✅ LOCKED          | 2025-12-12 |
| **Toast**       | Overlays   | Radix Toast       | ✅ LOCKED          | 2025-12-12 |
| **Button**      | Actions    | Native `<button>` | ✅ FINAL LOCK      |   |
| **Link**        | Navigation | Native `<a>`      | ✅ LOCKED          | 2025-12-17 |

### Foundation Component Details

#### Modal
- **Location:** `src/components/modal/`
- **Export Path:** `@tenerife.music/ui` → `Modal`, `ModalRoot`, `ModalContent`, `ModalHeader`, `ModalBody`, `ModalFooter`, `ModalTrigger`, `ModalClose`
- **Base Library:** Radix Dialog (`@radix-ui/react-dialog`)
- **Purpose:** Sole modal foundation. All modal-like components must use this internally.
- **Status:** ✅ **LOCKED** — Immutable

#### Tabs
- **Location:** `src/components/navigation/tabs/`
- **Export Path:** `@tenerife.music/ui` → `Tabs`, `TabsRoot`, `TabsList`, `TabsTrigger`, `TabsContent`
- **Base Library:** Radix Tabs (`@radix-ui/react-tabs`)
- **Purpose:** Sole tabs foundation. All tab-based navigation must use this internally.
- **Status:** ✅ **LOCKED** — Immutable

#### Select
- **Location:** `src/components/select/` (will be moved to `src/PRIMITIVES/Select/` during canonical lock process)
- **Export Path:** `@tenerife.music/ui` → `Select`, `SelectRoot`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`, `SelectGroup`, `SelectLabel`, `SelectSeparator`
- **Base Library:** Radix Select (`@radix-ui/react-select`)
- **Purpose:** Sole select foundation. All dropdown selection must use this internally.
- **Status:** ⏳ **UNLOCKED** — **PENDING CANONICAL LOCK**
- **Unlock Date:** 2025-12-17
- **Unlock Reason:** Select will undergo canonical Foundation lock process (Steps 1-11) to ensure full compliance with all Authority Contracts and canonical lifecycle requirements, similar to Link component.
- **Next Steps:** Select will proceed through canonical Foundation component lifecycle:
  1. Semantic Declaration
  2. Alternative Cleanup
  3. State Model and Priority Verification
  4. JS-Free Interaction Model
  5. Token-Driven Model
  6. Public API Audit
  7. TypeScript System Compliance
  8. CVA Canonicalization
  9. Accessibility Hardening
  10. Authority Alignment
  11. Foundation Lock
- **Temporary Status:** During unlock period, Select remains functional but is not locked. Changes are allowed to bring it into full compliance with canonical Foundation requirements.

#### ContextMenu
- **Location:** `src/components/menus/context-menu/`
- **Export Path:** `@tenerife.music/ui` → `ContextMenuRoot`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuGroup`, `ContextMenuSeparator`
- **Base Library:** Radix ContextMenu (`@radix-ui/react-context-menu`)
- **Purpose:** Sole context menu foundation. All right-click menus must use this internally.
- **Status:** ✅ **LOCKED** — Immutable

#### Toast
- **Location:** `src/components/overlays/`
- **Export Path:** `@tenerife.music/ui` → `Toast`, `ToastProvider`, `ToastViewport`, `ToastRoot`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`, `useToast`
- **Base Library:** Radix Toast (`@radix-ui/react-toast`)
- **Purpose:** Sole toast foundation. All notification toasts must use this internally.
- **Status:** ✅ **LOCKED** — Immutable

#### Button
- **Location:** `src/PRIMITIVES/Button/`
- **Export Path:** `@tenerife.music/ui` → `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize`
- **Base Library:** Native `<button>` element (semantic HTML)
- **Purpose:** Sole action trigger foundation. All user-initiated actions (submit, confirm, execute, activate) must use this component. Button represents actions, not navigation (use Link component) or toggle/state switching (use Switch/Checkbox components).
- **Status:** ✅ **FINAL LOCK** — Immutable
- **Lock Report:** `docs/reports/BUTTON_FOUNDATION_LOCK_REPORT.md`
- **Lock Date:** 2025-12-15
- **Final Lock Date:**  
- **Lifecycle Version:** 1.0 (Steps 3-13)
- **Lock Version:** 1.0
- **Quality Gates:** ✅ Step 10 (Runtime / Interaction Tests) — PASS, ✅ Step 12 (Testing Quality Gate) — PASS, ✅ Step 13 (Foundation Lock FINAL) — FINAL
- **Scope:** Public API, tokens (BUTTON_TOKENS), behavior (action trigger via `<button>`), states (base, hover, active, focus-visible, disabled), variants (primary, secondary, accent, outline, ghost, destructive), sizes (sm, md, lg, icon)
- **Allowed Changes:** Bug fixes, type improvements, documentation updates, accessibility fixes (within existing contract)
- **Forbidden Changes:** Public API changes, new variants/sizes, behavior changes, token modifications (requires unlock procedure)
- **Reference Role:** Button serves as canonical Foundation reference implementation for token-driven CVA patterns, Authority Contract compliance, and browser-native interaction mechanisms.

#### Link
- **Location:** `src/PRIMITIVES/Link/`
- **Export Path:** `@tenerife.music/ui` → `Link`, `LinkProps`, `LinkSize`, `LinkVariant`, `linkVariants`
- **Base Library:** Native `<a>` element (semantic HTML)
- **Purpose:** Sole navigation link foundation. All navigation links must use this component. Link represents semantic navigation (location changes), not actions. Actions must use Button component.
- **Status:** ✅ **FINAL LOCK** — Immutable
- **Lock Report:** `docs/reports/LINK_FOUNDATION_LOCK_REPORT.md`
- **Architectural Lock:** [LINK_NO_ASCHILD_CANONICAL_ANCHOR.md](./LINK_NO_ASCHILD_CANONICAL_ANCHOR.md) — Link is a first-class semantic anchor; `asChild` pattern is FORBIDDEN
- **Lock Date:** 2025-12-17
- **Final Lock Date:** 2025-12-18
- **Architectural Lock Date:** 2025-01-27
- **Lifecycle Version:** 1.0 (Steps 1-13)
- **Lock Version:** 1.0
- **Quality Gates:** ✅ Step 10A (Storybook & Testing) — PASS, ✅ Step 12 (Testing Quality Gate) — PASS
- **Scope:** Public API, tokens (LINK_TOKENS), behavior (navigation via `<a>`), states (base, hover, focus-visible, disabled), variants (primary, secondary, accent, outline, ghost, link, destructive), sizes (xs, sm, md, lg, xl)
- **Architectural Constraints:** Link MUST always render a single `<a>` element directly. `asChild` prop is FORBIDDEN. No proxy patterns (Radix Slot) allowed. See [LINK_NO_ASCHILD_CANONICAL_ANCHOR.md](./LINK_NO_ASCHILD_CANONICAL_ANCHOR.md) for complete architectural contract.
- **Allowed Changes:** Bug fixes, type improvements, documentation updates, accessibility fixes (within existing contract)
- **Forbidden Changes:** Public API changes, new variants/sizes, behavior changes, token modifications, `asChild` prop addition (requires unlock procedure)

---

## 🏛️ Core Architectural Rules

### Rule 1: Radix-First Behavior Delegation

**FOUNDATION COMPONENTS MUST DELEGATE ALL BEHAVIOR TO RADIX UI PRIMITIVES.**

- ✅ **ALLOWED:** Using Radix primitives for behavior (focus management, keyboard navigation, ARIA attributes, portal rendering, scroll locking)
- ❌ **FORBIDDEN:** Implementing custom behavior that Radix already provides
- ❌ **FORBIDDEN:** Reimplementing focus management, keyboard navigation, or ARIA attributes
- ❌ **FORBIDDEN:** Custom portal or scroll locking implementations

**Rationale:** Radix UI provides battle-tested, accessible behavior. Foundation components are thin wrappers that delegate behavior to Radix and provide token-driven styling.

### Rule 2: Token-Driven Styling Only

**FOUNDATION COMPONENTS MUST USE TOKEN-BASED APIS FOR ALL VISUAL PROPERTIES.**

- ✅ **ALLOWED:** Token unions for visual props (e.g., `variant: "default" | "outline" | "destructive"`)
- ✅ **ALLOWED:** Design tokens for colors, spacing, shadows, radius, typography
- ❌ **FORBIDDEN:** String or number-based visual props (e.g., `color: "blue"`, `padding: 16`)
- ❌ **FORBIDDEN:** Raw CSS values in component props
- ❌ **FORBIDDEN:** Inline styles for static styling

**Rationale:** Token-driven styling ensures consistency, theming support, and design system coherence.

### Rule 3: Foundation vs Extension Separation

**FOUNDATION AND EXTENSION LAYERS ARE STRICTLY SEPARATED.**

- ✅ **ALLOWED:** Extensions that compose Foundation components internally
- ✅ **ALLOWED:** Extensions that add domain-specific logic or UX patterns
- ❌ **FORBIDDEN:** Extensions that duplicate Foundation functionality
- ❌ **FORBIDDEN:** Extensions that bypass Foundation components
- ❌ **FORBIDDEN:** Extensions named after Foundation components (e.g., `SimpleModal`, `BasicTabs`)

**Rationale:** Clear separation ensures Foundation stability and Extension flexibility.

### Rule 4: Token System Immutability

**THE TOKEN SYSTEM IS LOCKED AND IMMUTABLE AS PART OF THE FOUNDATION ARCHITECTURE.**

- ✅ **ALLOWED:** Consumption of existing tokens by components
- ✅ **ALLOWED:** Creation of new component token domains ONLY for new components with explicit approval
- ❌ **FORBIDDEN:** Modifying token values in any domain
- ❌ **FORBIDDEN:** Adding or removing token domains
- ❌ **FORBIDDEN:** Merging or splitting existing domains
- ❌ **FORBIDDEN:** Reinterpreting token semantics
- ❌ **FORBIDDEN:** Changing domain ownership rules

**Rationale:** Token system immutability ensures design system consistency and prevents architectural drift. All token changes require explicit unlock procedure with full audit.

---

## ✅ Allowed Post-Lock Changes

The following changes to Foundation components are **explicitly allowed** after the lock:

### 1. Bug Fixes
- ✅ Fixing bugs in Foundation components
- ✅ Correcting incorrect behavior
- ✅ Fixing accessibility issues
- ✅ Fixing TypeScript errors

### 2. Type Improvements
- ✅ Improving TypeScript types
- ✅ Adding missing type definitions
- ✅ Fixing type errors
- ✅ Adding JSDoc comments

### 3. Documentation Updates
- ✅ Updating component documentation
- ✅ Adding usage examples
- ✅ Improving JSDoc comments
- ✅ Updating Storybook stories

### 4. Token Usage Improvements
- ✅ Improving token usage within components
- ✅ Fixing token violations (using existing tokens correctly)
- ⚠️ **RESTRICTED:** Adding missing token support (requires token system unlock if new tokens needed)
- ✅ Improving token consistency (within existing token domains)

### 5. Non-Breaking API Additions
- ✅ Adding new optional props (backward-compatible)
- ✅ Adding new variants (backward-compatible)
- ✅ Adding new subcomponents (backward-compatible)
- ✅ Performance optimizations (non-breaking)

**All changes must maintain backward compatibility and not break existing APIs.**

---

## 🚫 Forbidden Post-Lock Changes

The following changes to Foundation components are **explicitly forbidden** after the lock:

### 1. Breaking API Changes
- ❌ Removing props from Foundation components
- ❌ Changing prop types in breaking ways
- ❌ Removing subcomponents
- ❌ Changing component behavior in breaking ways

### 2. New Foundation Components
- ❌ Creating new Foundation components
- ❌ Adding components to the Foundation layer
- ❌ Promoting Extension components to Foundation

### 3. Duplicate Foundation Components
- ❌ Creating `SimpleModal`, `BasicTabs`, `OldSelect`, `LegacyToast`
- ❌ Creating `ModalV2`, `TabsV2`, `SelectV2`
- ❌ Creating any duplicate or alternative Foundation implementation

### 4. Foundation Component Modifications
- ❌ Renaming Foundation components
- ❌ Moving Foundation components to different locations
- ❌ Changing Foundation component exports
- ❌ Removing Foundation components

### 5. Behavior Reimplementation
- ❌ Reimplementing Radix behavior
- ❌ Custom focus management
- ❌ Custom keyboard navigation
- ❌ Custom ARIA attributes

### 6. Non-Token Styling
- ❌ Adding string or number-based visual props
- ❌ Using raw CSS values in props
- ❌ Inline styles for static styling

### 7. Token System Modifications
- ❌ Modifying token values in any domain
- ❌ Adding or removing token domains
- ❌ Merging or splitting existing domains
- ❌ Reinterpreting token semantics
- ❌ Changing domain ownership rules
- ❌ Creating new token domains without explicit unlock procedure

**Any violation of these rules is considered an architectural breach.**

---

## 🛡️ Enforcement

### Guard Prompt (AI Enforcement)

**All AI assistants (including Cursor) MUST follow the Guard Prompt rules:**

```
⚠️ UI FOUNDATION ARCHITECTURE IS LOCKED.

Foundation Components (Read-Only):
- Modal (Radix Dialog wrapper)
- Tabs (Radix Tabs wrapper)
- Select (Radix Select wrapper)
- ContextMenu (Radix ContextMenu wrapper)
- Toast (Radix Toast wrapper)
- Button (Native button element - FINAL LOCK)
- Link (Native anchor element)

Token System (Locked):
- All token domains are LOCKED and IMMUTABLE
- Domain ownership rules are immutable
- Shared vs component-specific separation is fixed
- Token naming conventions are locked

Interaction Authority (Locked):
- State priority order is FIXED: disabled > loading > active > hover > focus-visible > base
- Activation conditions are immutable
- Blocking rules are immutable
- Required CSS patterns (prefixes, selectors) are immutable
- Forbidden patterns (JS-driven states, raw pointer-events-none) are immutable
- Verification requirements (iframe-only, DevTools invalidation) are immutable
- Button component is the reference implementation

State Authority Matrix (Locked):
- Canonical state set is FIXED: base, hover, active, focus-visible, disabled, loading (6 states only)
- No component may define additional states beyond canonical set
- State semantics are immutable
- State priority order is immutable
- Suppression rules are immutable
- Button component is the reference implementation

State Authority Contract (Locked):
- State token model is FIXED: Component → Variant → State → Property → Value structure
- CSS variable naming pattern is FIXED: --{component}-{variant}-{state}-{property}
- Property suffix mapping is FIXED: background → bg, text → text, border → border, outline → outline, shadow → shadow
- Value format is FIXED: HSL color string format required
- Component obligations are immutable
- No local state definitions allowed in components

Foundation Enforcement (Locked/Applied):
- className and style props are FORBIDDEN in Foundation component public APIs
- Foundation components MUST use Omit<React.*HTMLAttributes, "className" | "style"> pattern
- TypeScript enforces exclusion at compile time
- ESLint rules prevent regression (no-foundation-classname-style, no-foundation-open-htmlattributes)
- Type-tests verify enforcement for all Foundation components
- CI integration ensures violations fail the pipeline
- All Foundation components are visually closed by design

Interactive Size Scale Authority (Locked):
- size is an INTERACTIVE SCALE representing hit-area, vertical rhythm, focus/keyboard accessibility, user interaction affordance
- Canonical interactive size scale is FIXED: "sm" | "md" | "lg" (defined by Button)
- Button component is the canonical owner of the interactive size scale
- xs and xl are FORBIDDEN for interactive components
- Interactive components (Button, Link, Input, Select, Checkbox, Radio, Switch) MUST use canonical scale
- Semi-interactive components (Icon, Badge, Avatar) MUST NOT use size as interactive scale
- Non-interactive components (Card, Stack, Grid) MUST NOT use size at all
- Typography scale (xs, xl, etc.) is SEPARATE and belongs only to Text, Heading, Label
- Interactive size maps to height, padding, font-size, and gap tokens

You MUST treat Foundation components, Token system, Interaction Authority, Foundation Enforcement, AND Interactive Size Scale Authority as immutable.

You may ONLY:
- Fix bugs
- Improve typing
- Improve documentation
- Improve token usage (within existing tokens)

You MUST NEVER:
- Create new foundation components
- Suggest alternative implementations
- Create Simple*, Basic*, Legacy*, V2* variants for foundation components
- Reimplement behavior handled by Radix
- Modify token values or domains
- Add or remove token domains
- Change token ownership rules
- Modify Interaction Authority rules (priority order, activation conditions, blocking rules)
- Modify State Authority Matrix (canonical state set, state semantics, priority order, suppression rules)
- Modify State Authority Contract (state token model, naming rules, property mapping, value format)
- Define component-specific states beyond canonical set (base, hover, active, focus-visible, disabled, loading)
- Define local state mechanisms in components (all states must use state tokens)
- Use JavaScript-driven interaction states (useState for hover/active/focus)
- Use raw pointer-events-none in base state (only via disabled:/loading: prefixes)
- Use focus: instead of focus-visible: for focus states
- Add className or style props to Foundation component public APIs
- Extend React.*HTMLAttributes directly without Omit<..., "className" | "style">
- Bypass Foundation Enforcement (enforcement is LOCKED and APPLIED)
- Add new interactive sizes (xs, xl, or custom sizes) to interactive components
- Reintroduce xs/xl to Button or Link
- Use size for typography or layout (use typography scale or spacing tokens instead)
- Expand Button scale to fit other components (other components align with Button, not vice versa)
- Use size prop for non-interactive components (use padding, gap, density, or variant instead)

If new behavior or UX is required:
- Create an EXTENSION component
- EXTENSION must compose an existing foundation component
- EXTENSION must NOT be named after a foundation component
- EXTENSION must live outside foundation folders

If token modifications are needed:
- Token system modifications require explicit UNLOCK + AUDIT workflow
- Reference: docs/architecture/TUI_TOKEN_SYSTEM.md
- Reference: docs_archive/reports/archive/archive/reports/other/TUI_TOKEN_DOMAINS_FINAL_REPORT.md (Note: File location may vary, check docs_archive)

If Interaction Authority modifications are needed:
- Interaction Authority modifications require explicit UNLOCK + AUDIT workflow
- Reference: docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md
- Reference: docs/architecture/INTERACTION_AUTHORITY_AUDIT.md
- Reference: docs/architecture/INTERACTION_AUTHORITY_GUARD_LAYER.md
- Reference: docs/architecture/INTERACTION_AUTHORITY_HOVER_VERIFICATION.md

If State Authority Matrix modifications are needed:
- State Authority Matrix modifications require explicit UNLOCK + AUDIT workflow
- Reference: docs/architecture/STATE_AUTHORITY_MATRIX.md
- Reference: docs/architecture/STATE_AUTHORITY_CONTRACT.md
- Reference: docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md

If State Authority Contract modifications are needed:
- State Authority Contract modifications require explicit UNLOCK + AUDIT workflow
- Reference: docs/architecture/STATE_AUTHORITY_CONTRACT.md
- Reference: docs/architecture/STATE_AUTHORITY_MATRIX.md
- Reference: docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md

If Foundation Enforcement modifications are needed:
- Foundation Enforcement modifications require explicit UNLOCK + AUDIT workflow
- Reference: docs/architecture/FOUNDATION_CONTRACT.md
- Reference: docs/architecture/FOUNDATION_COMPONENT_SCOPE.md
- Reference: docs/architecture/FINAL_FOUNDATION_LOCK.md (Foundation Enforcement Lock Status section)
- Reference: docs/reports/TUI_PHASE_3_FOUNDATION_LOCK_ENFORCEMENT_REPORT.md
- Reference: docs/reports/TUI_PHASE_4_FOUNDATION_REGRESSION_GUARDS_REPORT.md

If Interactive Size Scale Authority modifications are needed:
- Interactive Size Scale Authority modifications require explicit UNLOCK + AUDIT workflow
- Reference: docs/architecture/INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md
- Reference: docs/architecture/FINAL_FOUNDATION_LOCK.md (Interactive Size Scale Authority Lock Status section)
- Reference: src/PRIMITIVES/Button/Button.tsx (Reference implementation)
```

**If a request would violate these rules, AI assistants MUST REFUSE and explain why.**

### Tests and Stories as Usage Contracts

**Tests and Storybook stories serve as usage contracts for Foundation components:**

- ✅ Tests define expected behavior
- ✅ Stories document component usage
- ✅ Breaking changes must update tests and stories
- ✅ Tests and stories are part of the Foundation contract

**Violations of test contracts are architectural defects.**

### Architectural Defect Classification

**Any violation of Foundation lock rules is classified as an architectural defect:**

- ❌ Breaking API changes
- ❌ Creating duplicate Foundation components
- ❌ Modifying Foundation components in forbidden ways
- ❌ Bypassing Foundation components in Extensions

**Architectural defects must be fixed immediately and are not acceptable in production code.**

---

## 📊 Final Status

### Foundation Layer Status

**Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-12  
**Architecture Phase:** **CLOSED**  
**Next Review:** **NEVER** (Foundation is immutable)

### Component Lock Status

| Component       | Status    | Lock Date | Immutability |
| --------------- | --------- | --------- | ------------ |
| Modal           | ✅ LOCKED | 2025-12-12 | Immutable    |
| Tabs            | ✅ LOCKED | 2025-12-12 | Immutable    |
| Select          | ⏳ UNLOCKED (Pending Canonical Lock) | 2025-12-17 | Immutable    |
| ContextMenu     | ✅ LOCKED | 2025-12-12 | Immutable    |
| Toast           | ✅ LOCKED | 2025-12-12 | Immutable    |
| Button          | ✅ FINAL LOCK |   | Immutable    |
| Link            | ✅ FINAL LOCK | 2025-12-18 | Immutable    |

### Extension Layer Status

**Status:** ✅ **OPEN** (Extension development is allowed)  
**Authority Contract:** [Extension Authority Contract](./EXTENSION_AUTHORITY_CONTRACT.md)

The Extension layer is **OPEN** for development. All Extension components must:

- ✅ Compose Foundation components internally
- ✅ Comply with Extension Authority Contract
- ✅ Follow all Foundation Authority rules
- ✅ Not duplicate or bypass Foundation functionality
- ✅ Not use Foundation component names
- ✅ Use tokens according to Token Authority rules
- ✅ Use canonical states according to State Authority
- ✅ Use layout primitives according to Layout Authority

**Rule:** Extension Authority Contract defines the boundary between Foundation and Extension layers. Extension must respect all Foundation Authority rules and cannot override, bypass, or duplicate Foundation functionality.

### Zero-Ambiguity Declaration

**THE FOUNDATION LAYER IS OFFICIALLY LOCKED AND CLOSED.**

- ✅ Foundation components are **immutable**
- ✅ Token system is **locked** and **immutable**
- ✅ Foundation architecture phase is **closed**
- ✅ No new Foundation components will be added
- ✅ Foundation components can only be modified for bug fixes, types, or documentation
- ✅ Token system can only be modified via explicit unlock procedure
- ✅ All new functionality must be built as Extensions
- ✅ Extensions must compose Foundation components internally
- ✅ This document is the **authoritative source of truth** for Foundation architecture

**There is no ambiguity. The Foundation layer is locked. The Token system is locked. The architecture phase is closed.**

---

## 🔒 LOCK CHECKLIST (Mandatory)

**This checklist MUST be completed before any Foundation Authority domain can be locked. Locking is BLOCKED if any item fails.**

- [ ] All Authority documents are declarative only (no tests, storybook steps, or implementation details)
- [ ] Enforcement content exists outside Authority docs (Authority docs only reference enforcement docs)
- [ ] All token authorities (Spacing, Typography, Radius, Motion, Elevation) have Canonical Scale Tables
- [ ] All token authorities have Allowed Usage Patterns sections (3-6 bullet points)
- [ ] All token authorities have Forbidden Patterns sections (minimum 5 examples each)
- [ ] STATE_AUTHORITY_CONTRACT.md has State Taxonomy section (Interaction vs Semantic/UI states)
- [ ] STATE_AUTHORITY_CONTRACT.md has State Legality Matrix (component vs state compatibility)
- [ ] STATE_AUTHORITY_CONTRACT.md has explicit State Precedence Rules (ordering and suppression)
- [ ] INTERACTION_AUTHORITY_CONTRACT.md has Separation Law section (Interaction vs State Authority boundaries)
- [ ] No raw Tailwind examples in Allowed Patterns (raw Tailwind only appears in Forbidden Patterns)
- [ ] All boundary and precedence rules are explicit and unambiguous
- [ ] All Authority documents reference enforcement docs (do not include enforcement content)

**Rule:** If any checklist item is not satisfied, the Foundation Authority domain cannot be locked. All items must be verified and checked before proceeding with lock.

**Note:** This checklist is for locking **Foundation Authority domains** (Interaction, State, Spacing, Radius, Typography, Motion, Elevation, Layout). For creating or refactoring **Foundation components** (Modal, Tabs, Select, ContextMenu, Toast), see the canonical lifecycle defined in [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) (Section 10: Foundation Component Creation & Refactor Route — Canonical Lifecycle). For human-readable navigation to the lifecycle process, see [FOUNDATION_LIFECYCLE_PROCESS_INDEX.md](./FOUNDATION_LIFECYCLE_PROCESS_INDEX.md).

---

## 🔒 Token System Lock Status

**Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-13  
**Reference:** [Token System Documentation](./TUI_TOKEN_SYSTEM.md)  
**Final Audit:** [Token Domains Final Report](../../docs_archive/reports/archive/archive/reports/other/TUI_TOKEN_DOMAINS_FINAL_REPORT.md) - **FINAL VERDICT: OK** (Note: File may be in docs_archive)

The **Token System** is also **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All token domains, ownership rules, and semantic classifications are frozen.

### What Is Locked in Token System

1. **All Token Domains** - No token domains may be added, removed, merged, or split
2. **Domain Ownership Rules** - Component → token domain mappings are immutable
3. **Shared vs Component-Specific Separation** - The distinction is fixed
4. **Token Naming Conventions** - All naming patterns are locked
5. **Duplication Rules** - Semantic over DRY principle is immutable

### Token System Unlock Procedure

Any token system modifications require:
1. Explicit unlock task with justification
2. Full audit of all token domains
3. Explicit approval for changes
4. Re-verification after changes
5. Re-lock with updated documentation

**Note:** Token system lock applies to **BOTH humans and AI agents**. Any request to modify locked token aspects **MUST** be refused with reference to the token lock.

---

## 🔒 Interaction Authority Lock Status

**Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-16  
**Version:** 1.1  
**Reference:** [Interaction Authority Contract](./INTERACTION_AUTHORITY_CONTRACT.md)  
**Reference Component:** Button (`src/components/ui/button.tsx`)

The **Interaction Authority** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All interaction state rules, priority order, and enforcement mechanisms are frozen.

### What Is Locked in Interaction Authority

1. **State Priority Order** - Fixed: `disabled > loading > active > hover > focus-visible > base`
2. **Activation Conditions** - Rules for when each state can activate are immutable
3. **Blocking Rules** - Rules for what states block other states are immutable
4. **Required Attributes** - Required props/attributes (`disabled`, `aria-busy`) are immutable
5. **Required CSS Patterns** - CSS implementation patterns (prefixes, selectors) are immutable
6. **Forbidden Patterns** - JavaScript-driven states, raw pointer-events-none patterns are immutable
7. **Verification Requirements** - Iframe-only verification, DevTools invalidation rules are immutable

### Interaction Authority Contract Documents

The following documents are part of the locked Interaction Authority:

- `docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md` - Canonical contract definition
- `docs/architecture/INTERACTION_AUTHORITY_AUDIT.md` - Button component audit (reference implementation)
- `docs/architecture/INTERACTION_AUTHORITY_GUARD_LAYER.md` - Mechanically checkable guard rules
- `docs/architecture/INTERACTION_AUTHORITY_HOVER_VERIFICATION.md` - Iframe-only verification protocol

### Automated Enforcement

Interaction Authority is enforced via:

- **Automated Script:** `scripts/verify-interaction-authority.mjs`
  - Command: `pnpm verify:interaction-authority`
  - Output: `artifacts/interaction-authority-report.md`
  - Exit code: 0 (pass) or 1 (violations found)
- **Code Review:** Guard layer rules in code review checklist
- **Linting:** Future ESLint rules based on guard layer patterns

### Interaction Authority Unlock Procedure

Any Interaction Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all interactive components
3. Explicit approval for changes
4. Re-verification after changes (including manual browser testing)
5. Re-lock with updated documentation

**Note:** Interaction Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked interaction authority aspects **MUST** be refused with reference to the Interaction Authority lock.

**Do not re-open Interaction Authority without explicit 'Unlock Interaction Authority' task approval.**

---

## 🔒 Button CVA Enforcement Lock Status

**Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-16  
**Task:** C0_BUTTON_CVA_ENFORCEMENT  
**Reference:** [Button CVA Enforcement](./BUTTON_CVA_ENFORCEMENT.md)  
**Reference Component:** Button (`src/components/ui/button.tsx`)

The **Button CVA Enforcement** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. Button serves as the **canonical reference implementation** for token-driven CVA patterns across the design system.

### What Is Locked in Button CVA Enforcement

1. **CVA Enforcement Rules** - All CVA enforcement rules are immutable
2. **Token-Only Variants** - CVA variants may only reference token-derived classes
3. **No Raw Tailwind Colors** - Raw Tailwind color utilities are forbidden
4. **State Matrix Authority** - All state classes must use State Matrix CSS variables
5. **Interaction Authority Compliance** - All Interaction Authority rules must be respected
6. **Reference Implementation** - Button is the canonical example for tokenCVA patterns

### Button CVA Enforcement Contract Documents

The following documents are part of the locked Button CVA Enforcement:

- `docs/architecture/BUTTON_CVA_ENFORCEMENT.md` - Canonical CVA enforcement rules
- `src/components/ui/button.tsx` - Reference implementation
- `src/lib/token-cva.ts` - tokenCVA utility with validation

### Automated Enforcement

Button CVA Enforcement is enforced via:

- **tokenCVA Validation:** Development mode validation of token usage
- **Type Safety:** TypeScript enforces valid variant/size values
- **Runtime Warnings:** Forbidden patterns trigger console warnings
- **Code Review:** CVA enforcement rules in code review checklist

### Button CVA Enforcement Unlock Procedure

Any Button CVA Enforcement modifications require:

1. Explicit unlock task with justification
2. Full audit of Button CVA usage
3. Explicit approval for changes
4. Re-verification after changes
5. Re-lock with updated documentation

**Note:** Button CVA Enforcement lock applies to **BOTH humans and AI agents**. Any request to modify locked Button CVA enforcement aspects **MUST** be refused with reference to the Button CVA Enforcement lock.

**Do not modify Button CVA without explicit 'Unlock Button CVA Enforcement' task approval.**

---

## 🔒 State Authority Matrix Lock Status

**Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-16  
**Version:** 1.0  
**Reference:** [State Authority Matrix](./STATE_AUTHORITY_MATRIX.md)  
**Reference Component:** Button (`src/components/ui/button.tsx`)

The **State Authority Matrix** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. It establishes the universal state model that governs all interactive UI component states across the system.

### What Is Locked in State Authority Matrix

1. **Canonical State Set** - Exactly six states: `base`, `hover`, `active`, `focus-visible`, `disabled`, `loading`
2. **State Semantics** - Definitions of what each state represents and when it applies
3. **Priority Order** - Fixed priority: `disabled > loading > active > hover > focus-visible > base`
4. **Suppression Rules** - Rules for which states block which other states
5. **Component State Requirements** - All interactive components must use only canonical states
6. **Reference Implementation** - Button component is the canonical example

### State Authority Matrix Contract Documents

The following documents are part of the locked State Authority Matrix:

- `docs/architecture/STATE_AUTHORITY_MATRIX.md` - Canonical state matrix definition (WHAT states exist)
- `docs/architecture/STATE_AUTHORITY_CONTRACT.md` - State token model (HOW states are represented)
- `docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md` - State activation rules (WHEN states activate)
- `src/components/ui/button.tsx` - Reference implementation
- `src/tokens/state-matrix.ts` - Technical State Matrix implementation

### Relationship to Other Authorities

The State Authority Matrix works in conjunction with:

- **Interaction Authority Contract** - Defines WHEN states can activate (this Matrix defines WHAT states exist)
- **State Authority Contract** - Defines HOW states are implemented (this Matrix defines HOW states relate)

### State Authority Matrix Unlock Procedure

Any State Authority Matrix modifications require:

1. Explicit unlock task with justification
2. Full audit of all interactive components
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** State Authority Matrix lock applies to **BOTH humans and AI agents**. Any request to modify locked State Authority Matrix aspects **MUST** be refused with reference to the State Authority Matrix lock.

**Do not modify State Authority Matrix without explicit 'Unlock State Authority Matrix' task approval.**

---

## 🔒 State Authority Contract Lock Status

**Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-16  
**Version:** 1.0  
**Reference:** [State Authority Contract](./STATE_AUTHORITY_CONTRACT.md)

The **State Authority Contract** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. It establishes the canonical HOW layer for state tokens: the format, structure, and naming rules for representing UI component states.

### What Is Locked in State Authority Contract

1. **State Token Model** - Canonical structure: Component → Variant → State → Property → Value
2. **State Token Naming Rules** - CSS variable naming pattern: `--{component}-{variant}-{state}-{property}`
3. **Property Suffix Mapping** - Fixed mapping: background → bg, text → text, border → border, outline → outline, shadow → shadow
4. **State Priority Rules** - Reference-level priority order: `disabled > loading > active > hover > focus-visible > base`
5. **Component Obligations** - Rules for how components must use state tokens
6. **Value Format** - HSL color string format requirement

### State Authority Contract Documents

The following documents are part of the locked State Authority Contract:

- `docs/architecture/STATE_AUTHORITY_CONTRACT.md` - Canonical state token model (HOW layer)
- `docs/architecture/STATE_AUTHORITY_MATRIX.md` - Canonical state set (WHAT layer, complementary)
- `docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md` - State activation rules (WHEN layer, complementary)

### Relationship to Other Authorities

The State Authority Contract works in conjunction with:

- **State Authority Matrix** - Defines WHAT states exist (this Contract defines HOW they are represented)
- **Interaction Authority Contract** - Defines WHEN states activate (this Contract defines HOW they are represented)

**Authority Hierarchy:**
1. **State Authority Matrix** (WHAT) - Defines which states exist
2. **Interaction Authority Contract** (WHEN) - Defines when states activate
3. **State Authority Contract** (HOW) - This document - Defines how states are represented

### State Authority Contract Unlock Procedure

Any State Authority Contract modifications require:

1. Explicit unlock task with justification
2. Full audit of all interactive components
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** State Authority Contract lock applies to **BOTH humans and AI agents**. Any request to modify locked State Authority Contract aspects **MUST** be refused with reference to the State Authority Contract lock.

**Do not modify State Authority Contract without explicit 'Unlock State Authority Contract' task approval.**

---

## 🔒 Spacing Authority Lock Status

**Status:** ✅ LOCKED  
**Lock Date:** 2025-12-16  
**Version:** 1.1  
**Reference:** [Spacing Authority Contract](./SPACING_AUTHORITY_CONTRACT.md)

The **Spacing Authority** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All spacing token rules, canonical scales, and component requirements are frozen.

### What Is Locked in Spacing Authority

1. **Canonical Token Scale** - Base spacing scale (8px grid), semantic spacing, layout spacing are immutable
2. **Component Rules** - Token-only spacing, grid system compliance, semantic preference rules are immutable
3. **Forbidden Patterns** - Arbitrary spacing values, component-specific scales, grid violations are immutable
4. **Semantic Mapping** - Layout pattern mapping rules are immutable

### Spacing Authority Contract Documents

The following documents are part of the locked Spacing Authority:

- `docs/architecture/SPACING_AUTHORITY_CONTRACT.md` - Canonical spacing contract definition

### Spacing Authority Unlock Procedure

Any Spacing Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all component spacing usage
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Spacing Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked spacing authority aspects **MUST** be refused with reference to the Spacing Authority lock.

**Do not modify Spacing Authority without explicit 'Unlock Spacing Authority' task approval.**

---

## 🔒 Radius Authority Lock Status

**Status:** ✅ LOCKED  
**Lock Date:** 2025-12-16  
**Version:** 1.1  
**Reference:** [Radius Authority Contract](./RADIUS_AUTHORITY_CONTRACT.md)

The **Radius Authority** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All border radius token rules, canonical scales, and component standards are frozen.

### What Is Locked in Radius Authority

1. **Canonical Token Scale** - Base radius scale (none, xs, sm, md, lg, xl, 2xl, 3xl, full) is immutable
2. **Component Standards** - Component-specific radius standards (button, card, input, badge, etc.) are immutable
3. **Component Rules** - Token-only radius, scale system compliance, component standard preference rules are immutable
4. **Forbidden Patterns** - Arbitrary radius values, inline border-radius, component-specific scales are immutable

### Radius Authority Contract Documents

The following documents are part of the locked Radius Authority:

- `docs/architecture/RADIUS_AUTHORITY_CONTRACT.md` - Canonical radius contract definition

### Radius Authority Unlock Procedure

Any Radius Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all component radius usage
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Radius Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked radius authority aspects **MUST** be refused with reference to the Radius Authority lock.

**Do not modify Radius Authority without explicit 'Unlock Radius Authority' task approval.**

---

## 🔒 Typography Authority Lock Status

**Status:** ✅ LOCKED  
**Lock Date:** 2025-12-16  
**Version:** 1.1  
**Reference:** [Typography Authority Contract](./TYPOGRAPHY_AUTHORITY_CONTRACT.md)

The **Typography Authority** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All typography token rules, canonical scales, and semantic roles are frozen.

### What Is Locked in Typography Authority

1. **Canonical Token Scale** - Font families, font sizes (fluid), font weights, line heights, letter spacing are immutable
2. **Predefined Text Styles** - Display, heading (h1-h6), body, label, caption styles are immutable
3. **Component Rules** - Token-only typography, semantic role preference, typography hierarchy rules are immutable
4. **Forbidden Patterns** - Arbitrary typography values, component-specific scales, hierarchy violations are immutable

### Typography Authority Contract Documents

The following documents are part of the locked Typography Authority:

- `docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md` - Canonical typography contract definition

### Typography Authority Unlock Procedure

Any Typography Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all component typography usage
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Typography Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked typography authority aspects **MUST** be refused with reference to the Typography Authority lock.

**Do not modify Typography Authority without explicit 'Unlock Typography Authority' task approval.**

---

## 🔒 Motion Authority Lock Status

**Status:** ✅ LOCKED  
**Lock Date:** 2025-12-16  
**Version:** 1.1  
**Reference:** [Motion Authority Contract](./MOTION_AUTHORITY_CONTRACT.md)

The **Motion Authority** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All motion token rules, canonical durations, easings, transitions, and animations are frozen.

### What Is Locked in Motion Authority

1. **Canonical Token Scale** - Durations (100ms base unit), easings, transitions, keyframes, animations are immutable
2. **Reduced Motion Support** - Reduced motion tokens and accessibility compliance rules are immutable
3. **Component Rules** - Token-only motion, transition preference, reduced motion compliance rules are immutable
4. **Forbidden Patterns** - Arbitrary motion values, component-specific scales, reduced motion violations are immutable

### Motion Authority Contract Documents

The following documents are part of the locked Motion Authority:

- `docs/architecture/MOTION_AUTHORITY_CONTRACT.md` - Canonical motion contract definition

### Motion Authority Unlock Procedure

Any Motion Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all component motion usage
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Motion Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked motion authority aspects **MUST** be refused with reference to the Motion Authority lock.

**Do not modify Motion Authority without explicit 'Unlock Motion Authority' task approval.**

---

## 🔒 Elevation Authority Lock Status

**Status:** ✅ LOCKED  
**Lock Date:** 2025-12-16  
**Version:** 1.1  
**Reference:** [Elevation Authority Contract](./ELEVATION_AUTHORITY_CONTRACT.md)

The **Elevation Authority** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All elevation token rules, canonical shadows, z-index scale, and stacking order are frozen.

### What Is Locked in Elevation Authority

1. **Canonical Token Scale** - Elevation shadows, colored shadows, glow effects, focus rings are immutable
2. **Z-Index Scale** - Canonical z-index layers (base, content, dropdown, sticky, overlay, modal, notification, tooltip, maximum) are immutable
3. **Component Rules** - Token-only elevation, shadow preference, z-index layer assignment, stacking order compliance rules are immutable
4. **Forbidden Patterns** - Arbitrary elevation values, component-specific scales, z-index stacking violations are immutable

### Elevation Authority Contract Documents

The following documents are part of the locked Elevation Authority:

- `docs/architecture/ELEVATION_AUTHORITY_CONTRACT.md` - Canonical elevation contract definition

### Elevation Authority Unlock Procedure

Any Elevation Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all component elevation usage
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Elevation Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked elevation authority aspects **MUST** be refused with reference to the Elevation Authority lock.

**Do not modify Elevation Authority without explicit 'Unlock Elevation Authority' task approval.**

---

## 🔒 Layout Authority Lock Status

**Status:** ✅ LOCKED  
**Lock Date:** 2025-12-16  
**Version:** 1.1  
**Reference:** [Layout Authority Contract](./LAYOUT_AUTHORITY_CONTRACT.md)

The **Layout Authority** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All layout rules, canonical layout primitives, separation laws, and component contract rules are frozen.

### What Is Locked in Layout Authority

1. **Canonical Layout Primitives** - Stack, Inline, Grid, Container, Overlay primitives are immutable
2. **Layout Taxonomy** - Canonical taxonomy of layout primitives is immutable
3. **Separation Laws** - Layout vs Spacing, State, Interaction, Positioning separation rules are immutable
4. **Component Contract Rules** - Components cannot define layout context rules are immutable
5. **Precedence Rules** - Layout container over component structure precedence is immutable
6. **Hard Rules** - Layout cannot be defined through spacing tokens, components cannot define external layout, flex/grid forbidden without abstraction, absolute positioning forbidden without contract, layout cannot depend on interaction or state - all immutable
7. **Forbidden Patterns** - Inline flex/grid in components, absolute positioning without contract, layout through margin, layout context in UI components, direct display properties - all immutable

### Layout Authority Contract Documents

The following documents are part of the locked Layout Authority:

- `docs/architecture/LAYOUT_AUTHORITY_CONTRACT.md` - Canonical layout contract definition

### Layout Authority Unlock Procedure

Any Layout Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all component layout usage
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Layout Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked layout authority aspects **MUST** be refused with reference to the Layout Authority lock.

**Do not modify Layout Authority without explicit 'Unlock Layout Authority' task approval.**

---

## 🔒 Foundation Enforcement Lock Status

**Status:** ✅ **LOCKED / APPLIED**  
**Lock Date:** 2025-12-18  
**Version:** 1.0  
**Reference:** [Foundation Contract](./FOUNDATION_CONTRACT.md)  
**Reference:** [Foundation Component Scope](./FOUNDATION_COMPONENT_SCOPE.md)

The **Foundation Enforcement** is **LOCKED** and **APPLIED** as part of the Foundation architecture. Foundation components are **visually closed by design** and exclude `className` and `style` props from their public APIs. This enforcement is **technically enforced** and **irreversible** without explicit unlock procedure.

### What Is Locked in Foundation Enforcement

1. **className Exclusion** - Foundation components MUST NOT accept `className` prop in public API
2. **style Exclusion** - Foundation components MUST NOT accept `style` prop in public API
3. **Omit Pattern Requirement** - Foundation components MUST use `Omit<React.*HTMLAttributes, "className" | "style">` pattern
4. **TypeScript Enforcement** - All Foundation components exclude styling props at compile time
5. **ESLint Rules** - Regression guards prevent reintroduction of styling escape hatches
6. **Type-Tests** - Compile-time verification ensures enforcement compliance for all Foundation components

### Foundation Enforcement Contract Documents

The following documents are part of the locked Foundation Enforcement:

- `docs/architecture/FOUNDATION_CONTRACT.md` - Canonical Foundation contract definition (FINAL/APPLIED)
- `docs/architecture/FOUNDATION_COMPONENT_SCOPE.md` - Foundation component scope and inclusion criteria
- `docs/reports/TUI_PHASE_3_FOUNDATION_LOCK_ENFORCEMENT_REPORT.md` - Phase 3 TypeScript enforcement implementation
- `docs/reports/TUI_PHASE_4_FOUNDATION_REGRESSION_GUARDS_REPORT.md` - Phase 4 regression guards implementation

### Enforcement Mechanisms

Foundation Enforcement is enforced via:

- **TypeScript:** All Foundation components use `Omit<HTMLAttributes<...>, "className" | "style">` to exclude styling props
- **ESLint Rules:**
  - `no-foundation-classname-style`: Blocks `className` and `style` props in Foundation component interfaces
  - `no-foundation-open-htmlattributes`: Requires `Omit<React.*HTMLAttributes, "className" | "style">` instead of direct extension
- **Type-Tests:** All 9 Foundation components have type-level tests that verify `className` and `style` are excluded
- **CI Integration:** All enforcement checks run automatically in CI pipeline (`typecheck` and `lint:ci` scripts)

**ESLint Governance:** For complete ESLint governance rules, autofix policy, and architectural enforcement principles, see [ESLINT_SETUP.md](./ESLINT_SETUP.md).

### Foundation Components Subject to Enforcement

All Foundation components listed in [FOUNDATION_COMPONENT_SCOPE.md](./FOUNDATION_COMPONENT_SCOPE.md) are subject to Foundation Enforcement:

**Confirmed Foundation (Locked):**
- Button
- Link

**Proposed Foundation (Subject to Enforcement):**
- Text
- Heading
- Input
- Textarea
- Checkbox
- Radio
- Label

**Radix-Based Foundation (Subject to Enforcement):**
- Modal
- Tabs
- Select (when locked)
- ContextMenu
- Toast

### Foundation Enforcement Unlock Procedure

Any Foundation Enforcement modifications require:

1. Explicit unlock task with justification
2. Full audit of all Foundation components
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Foundation Enforcement lock applies to **BOTH humans and AI agents**. Any request to modify locked Foundation Enforcement aspects **MUST** be refused with reference to the Foundation Enforcement lock.

**Do not modify Foundation Enforcement without explicit 'Unlock Foundation Enforcement' task approval.**

### Integration with Component Lifecycle

Foundation Enforcement verification is a **mandatory step** in the Foundation component lifecycle:

- **Step 7.5: Internal Styling Integrity & className Isolation Verification** (see [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md))
- **Step 7.6: Internal Styling Integrity & ESLint Scope Verification** (see [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md))
- All Foundation components MUST pass enforcement verification (Steps 7.5 and 7.6) before Foundation Lock (Step 13)
- Enforcement compliance is verified via ESLint rules, type-tests, CI integration, and ESLint scope governance

---

## 🔒 Interactive Size Scale Authority Lock Status

**Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-18  
**Version:** 1.0  
**Reference:** [Interactive Size Scale Authority Contract](./INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md)  
**Reference Component:** Button (`src/PRIMITIVES/Button/Button.tsx`)

The **Interactive Size Scale Authority** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. The canonical meaning, scope, and allowed usage of `size` across interactive components is frozen.

### What Is Locked in Interactive Size Scale Authority

1. **Canonical Definition** - `size` is an INTERACTIVE SCALE representing hit-area, vertical rhythm, focus/keyboard accessibility, and user interaction affordance
2. **Canonical Scale** - The ONLY allowed interactive size scale is `"sm" | "md" | "lg"` (defined by Button)
3. **Component Classification** - Interactive components (Button, Link, Input, Select, etc.) MUST use canonical scale; Semi-interactive components MUST NOT use `size` as interactive scale; Non-interactive components MUST NOT use `size` at all
4. **Scale Ownership** - Button component is the canonical owner of the interactive size scale
5. **Forbidden Sizes** - `xs` and `xl` are FORBIDDEN for interactive components
6. **Token Relationship** - Interactive `size` maps to height, padding, font-size, and gap tokens; Typography scale (`xs`, `xl`, etc.) is SEPARATE and belongs only to Text, Heading, Label
7. **Reference Implementation** - Button component is the reference implementation

### Interactive Size Scale Authority Contract Documents

The following documents are part of the locked Interactive Size Scale Authority:

- `docs/architecture/INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md` - Canonical interactive size scale contract definition
- `src/PRIMITIVES/Button/Button.tsx` - Reference implementation (canonical owner of interactive size scale)
- `src/PRIMITIVES/Link/Link.tsx` - Interactive component example (aligns with Button size scale)

### Interactive Size Scale Authority Unlock Procedure

Any Interactive Size Scale Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all interactive components
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Interactive Size Scale Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked Interactive Size Scale Authority aspects **MUST** be refused with reference to the Interactive Size Scale Authority lock.

**Do not modify Interactive Size Scale Authority without explicit 'Unlock Interactive Size Scale Authority' task approval.**

---

## 🏁 Foundation Closure Statement

**Date:** 2025-12-16  
**Status:** ✅ **FOUNDATION CLOSED**  
**Phase Transition:** Foundation → Enforcement/Extension

### Official Closure Declaration

**THE FOUNDATION AUTHORITIES ARE COMPLETE, IMMUTABLE, AND CLOSED.**

This statement formally and definitively closes the Foundation architecture phase of `@tenerife.music/ui`. All Foundation Authorities have been established, locked, and are now immutable.

### Foundation Authorities Status

All Foundation Authorities are **COMPLETE**, **IMMUTABLE**, and **CLOSED**:

- ✅ **Interaction Authority** - LOCKED (State priority order, activation conditions, blocking rules)
- ✅ **State Authority Matrix** - LOCKED (Canonical state set, state semantics, priority order)
- ✅ **State Authority Contract** - LOCKED (State token model, naming rules, property mapping)
- ✅ **Token System** - LOCKED (All token domains, ownership rules, semantic classifications)
- ✅ **Spacing Authority** - LOCKED (Canonical spacing scale, component rules, forbidden patterns)
- ✅ **Radius Authority** - LOCKED (Canonical radius scale, component standards, forbidden patterns)
- ✅ **Typography Authority** - LOCKED (Canonical typography scale, semantic roles, forbidden patterns)
- ✅ **Motion Authority** - LOCKED (Canonical motion tokens, durations, easings, forbidden patterns)
- ✅ **Elevation Authority** - LOCKED (Canonical elevation tokens, z-index scale, forbidden patterns)
- ✅ **Layout Authority** - LOCKED (Canonical layout primitives, separation laws, forbidden patterns)
- ✅ **Interactive Size Scale Authority** - LOCKED (Canonical interactive size scale, component classification, forbidden sizes)
- ✅ **Extension Authority Contract** - ACTIVE (Extension layer boundary contract)

### Immutability Declaration

**Foundation Authorities are IMMUTABLE:**

- ❌ **NO** modifications to existing Authority rules
- ❌ **NO** changes to Authority contracts
- ❌ **NO** additions to Foundation Authority set
- ❌ **NO** breaking changes to Authority structure

**Future changes to Foundation Authorities are ONLY possible through:**

1. **Explicit Authority Versioning** - New Authority versions (e.g., `INTERACTION_AUTHORITY_CONTRACT_v2.md`)
2. **Explicit Unlock Procedure** - Full audit, justification, approval, and re-lock workflow
3. **Explicit User Approval** - No Authority modifications without explicit user request and approval

### Phase Transition

**Foundation Phase:** ✅ **CLOSED**  
**Enforcement Phase:** ✅ **OPEN** (Enforcement mechanisms can evolve)  
**Extension Phase:** ✅ **OPEN** (Extension development is allowed)

The Foundation architecture phase is **OFFICIALLY CLOSED**. All future development must occur in:

- **Enforcement Layer** - Improving enforcement mechanisms (tooling, scripts, verification)
- **Extension Layer** - Building new components that compose Foundation components

### Authority Evolution Path

If Authority modifications are required in the future:

1. **Create new Authority version** (e.g., `INTERACTION_AUTHORITY_CONTRACT_v2.md`)
2. **Maintain backward compatibility** with existing Authority
3. **Document migration path** from old to new Authority
4. **Update all references** to new Authority version
5. **Deprecate old Authority** (but keep for reference)

**Rule:** Foundation Authorities are closed. New Authority versions are the only path for Authority evolution.

### Zero-Ambiguity Closure

**THERE IS NO AMBIGUITY:**

- ✅ Foundation Authorities are **COMPLETE**
- ✅ Foundation Authorities are **IMMUTABLE**
- ✅ Foundation Authorities are **CLOSED**
- ✅ Foundation phase is **OFFICIALLY CLOSED**
- ✅ Transition to Enforcement/Extension phase is **AUTHORIZED**

**This closure statement is binding and final. Foundation Authorities cannot be modified without explicit Authority versioning or unlock procedure.**

---

## 📚 Related Documents

- **[Foundation Contract](./FOUNDATION_CONTRACT.md)** — 🔒 **FINAL/APPLIED** Foundation component contract (Foundation Enforcement is LOCKED)
- **[Foundation Component Scope](./FOUNDATION_COMPONENT_SCOPE.md)** — 🔒 **FINAL/APPLIED** Foundation component scope and inclusion criteria
- **[Foundation Lock Operating Rules](./FOUNDATION_LOCK_OPERATING_RULES.md)** — 13-step lifecycle includes mandatory enforcement verification (Steps 7.5 and 7.6)
- **[Architecture Lock](./TUI_ARCHITECTURE_LOCK.md)** — Detailed architecture rules and guidelines
- **[Token System](./TUI_TOKEN_SYSTEM.md)** — 🔒 **LOCKED** Token system documentation
- **[UI Architecture Rules](./UI_ARCHITECTURE_RULES.md)** — Radix UI and Token Union rules
- **[Component Guidelines](../../docs_archive/legacy/guides/guides/COMPONENT_GUIDELINES.md)** — Component development guidelines (Note: File may be in docs_archive)
- **[Cursor UI Rules](./CURSOR_UI_RULES.md)** — Cursor AI development rules
- **[Token Domains Final Report](../../docs_archive/reports/archive/archive/reports/other/TUI_TOKEN_DOMAINS_FINAL_REPORT.md)** — Final token domain verification (FINAL VERDICT: OK) (Note: File may be in docs_archive)
- **[Button CVA Enforcement](../../docs_archive/deprecated/BUTTON_CVA_ENFORCEMENT.md)** — 🔒 **LOCKED** Button CVA enforcement rules (archived)
- **[State Authority Matrix](./STATE_AUTHORITY_MATRIX.md)** — 🔒 **LOCKED** Universal state model for all interactive components
- **[State Authority Contract](./STATE_AUTHORITY_CONTRACT.md)** — 🔒 **LOCKED** State token model (HOW layer) for representing UI component states
- **[Extension Authority Contract](./EXTENSION_AUTHORITY_CONTRACT.md)** — ✅ **ACTIVE** Extension layer boundary contract
- **[Foundation Lifecycle Process Index](./FOUNDATION_LIFECYCLE_PROCESS_INDEX.md)** — Human-readable navigation to Foundation component creation/refactor lifecycle process
- **[ESLint Setup & Governance](./ESLINT_SETUP.md)** — ESLint as architectural enforcement (governance rules, autofix policy, scope boundaries)
- **[ESLint Rules Scope Matrix](./eslint_rules_scope_matrix.md)** — Canonical scope authority for ESLint rules
- **[Link No AsChild Canonical Anchor](./LINK_NO_ASCHILD_CANONICAL_ANCHOR.md)** — 🔒 **LOCKED** Architectural lock: Link is a first-class semantic anchor; `asChild` pattern is FORBIDDEN

---

## 🔄 Version History

- **v1.20** (2025-01-27): Link No AsChild Canonical Anchor Architectural Lock
  - Added Link architectural lock: [LINK_NO_ASCHILD_CANONICAL_ANCHOR.md](./LINK_NO_ASCHILD_CANONICAL_ANCHOR.md)
  - Link is formally locked as a first-class semantic anchor
  - `asChild` pattern is FORBIDDEN for Link component
  - Link MUST always render a single `<a>` element directly
  - No proxy patterns (Radix Slot) allowed
  - Updated Link component details section with architectural constraints
  - Added Link architectural lock reference to Related Documents
  - ESLint rule `no-link-aschild` added for enforcement
  - Completed formal lock process per TUNG_ARCH_LOCK: LINK_NO_ASCHILD_CANONICAL_ANCHOR task

- **v1.19** (2025-12-18): Interactive Size Scale Authority Lock Completion
  - Added Interactive Size Scale Authority Contract to Authority Documents table
  - Added Interactive Size Scale Authority Lock Status section
  - Documented canonical interactive size scale (`sm | md | lg` defined by Button)
  - Documented component classification (Interactive, Semi-interactive, Non-interactive)
  - Documented forbidden sizes (`xs` and `xl` for interactive components)
  - Documented token relationship (interactive size maps to height, padding, font-size, gap tokens)
  - Documented separation from typography scale
  - Added Interactive Size Scale Authority rules to Guard Prompt
  - Referenced Button as canonical owner of interactive size scale
  - Added Interactive Size Scale Authority unlock procedure documentation
  - Updated Foundation Authorities Status to include Interactive Size Scale Authority
  - Updated Final Note to include Interactive Size Scale Authority
  - Completed formal lock process per TUNG_ARCH_LOCK: INTERACTIVE_SIZE_SCALE_CANONICALIZATION task

- **v1.18** ( ): Button Component Foundation Lock (FINAL)
  - Added Button component to Locked Foundation Components table
  - Added Button component details section
  - Documented Button as sole action trigger foundation
  - Button officially locked as Foundation primitive (STEP 3-13 complete)
  - Final Lock date:  
  - Lock report: `docs/reports/BUTTON_FOUNDATION_LOCK_REPORT.md`
  - Button serves as canonical Foundation reference implementation
  - Completed formal lock process per TUI_BUTTON_STEP_13_FOUNDATION_LOCK_FINAL task
  - Updated Guard Prompt to include Button in Foundation Components list
  - Updated Component Lock Status table

- **v1.17** (2025-12-17): Select Component Unlock
  - Unlocked Select component to allow canonical Foundation lock process
  - Changed Select status from LOCKED (FINALIZED) to UNLOCKED (Pending Canonical Lock)
  - Select will undergo full canonical lifecycle (Steps 1-11) similar to Link
  - Unlock date: 2025-12-17
  - Unlock reason: Ensure full compliance with all Authority Contracts and canonical lifecycle requirements
  - Completed unlock process per user request to prepare Select for canonical lock

- **v1.16** (2025-12-17): Link Component Foundation Lock
  - Added Link component to Locked Foundation Components table
  - Added Link component details section
  - Documented Link as sole navigation link foundation
  - Link officially locked as Foundation primitive (STEP 1-11 complete)
  - Lock date: 2025-12-17
  - Lock report: `docs/reports/LINK_FOUNDATION_LOCK_REPORT.md`
  - Completed formal lock process per TUI_LINK_STEP_11_FOUNDATION_LOCK task

- **v1.15** (2025-12-16): Visual Token Authorities Lock Completion
  - Locked Spacing Authority (changed from ACTIVE to LOCKED)
  - Locked Radius Authority (changed from ACTIVE to LOCKED)
  - Locked Typography Authority (changed from ACTIVE to LOCKED)
  - Locked Motion Authority (changed from ACTIVE to LOCKED)
  - Locked Elevation Authority (changed from ACTIVE to LOCKED)
  - Locked Layout Authority (changed from ACTIVE to LOCKED)
  - Updated Authority Documents table to reflect LOCKED status
  - Updated Foundation Closure Statement to reflect complete Foundation lock
  - Completed symmetric closure of Foundation layer
  - All visual Token Authorities are now LOCKED and require unlock procedure or versioning for modifications

- **v1.14** (2025-12-16): Guard Layer Intent Declaration
  - Added Guard Layer Intent subsection to Enforcement Document Semantics
  - Declared Guard documents as machine-oriented, not human-readable
  - Established that verbosity is intentional for AI enforcement
  - Prohibited human refactoring of Guard documents for readability
  - Documented distinction between Guard Layer (machine-oriented) and Authority/Enforcement (human-oriented)
  - Clarified that Guard documents are optimized for AI parsing, not human consumption
  - Established key principles: machine-oriented design, intentional verbosity, forbidden human refactoring
  - Completed intent declaration per TUNG_GUARD_LAYER_INTENT_DECLARATION task

- **v1.13** (2025-12-16): Enforcement Lock Semantics Clarification
  - Added Enforcement Document Semantics subsection to Authority Status Semantics
  - Clarified distinction between Law (Authority) and Mechanism (Enforcement)
  - Defined LOCKED (Enforcement) semantics: rules binding, mechanism evolvable
  - Defined EVOLVABLE (Enforcement) semantics: mechanisms can evolve without Authority unlock
  - Documented what can evolve in Enforcement (mechanisms, tooling, detection patterns)
  - Documented what cannot change in Enforcement (Authority rules require unlock)
  - Established key principles: Authority defines law, Enforcement defines tools
  - Eliminated false perception of Enforcement as immutable
  - Completed semantics clarification per TUNG_ENFORCEMENT_LOCK_SEMANTICS task

- **v1.12** (2025-12-16): Authority Status Semantics Unification
  - Added Authority Status Semantics section
  - Defined precise semantics for ACTIVE, LOCKED, and IMMUTABLE terms
  - Explicitly stated that ACTIVE ≠ editable
  - Clarified distinction between Status (operational state) and Mutability (rule changeability)
  - Documented status combinations and key principles
  - Eliminated terminological ambiguity between ACTIVE, LOCKED, and MUTABILITY
  - Completed terminology unification per TUNG_AUTHORITY_STATUS_SEMANTICS_UNIFICATION task

- **v1.11** (2025-12-16): Foundation Closure Statement
  - Added Foundation Closure Statement section
  - Formally declared Foundation Authorities as COMPLETE, IMMUTABLE, and CLOSED
  - Documented Authority evolution path (new Authority versions only)
  - Explicitly authorized transition to Enforcement/Extension phase
  - Completed formal closure statement per TUNG_FINAL_FOUNDATION_CLOSURE_STATEMENT task

- **v1.10** (2025-12-16): Extension Authority Contract Integration
  - Added Extension Authority Contract to Authority Documents table
  - Added Extension Layer Status section
  - Added Extension Authority Contract reference to Related Documents
  - Updated Final Note to mention Extension Authority Contract
  - Documented Extension layer as OPEN with Authority Contract compliance requirements
  - Completed formal integration per TUNG_EXTENSION_AUTHORITY_CONTRACT task

- **v1.9** (2025-12-16): Layout Authority Contract Lock Completion
  - Added Layout Authority Contract to Authority Documents table
  - Added Layout Authority Lock Status section
  - Documented canonical layout primitives (Stack, Inline, Grid, Container, Overlay)
  - Documented separation laws (Layout vs Spacing, State, Interaction, Positioning)
  - Documented component contract rules (components cannot define layout context)
  - Documented precedence rules (layout container over component structure)
  - Documented hard rules (immutable layout rules)
  - Updated Final Note to include Layout Authority
  - Completed formal lock process per TUNG_LAYOUT_AUTHORITY_CONTRACT_FOUNDATION task

- **v1.8** (2025-12-16): State Authority Contract Lock Completion
  - Added State Authority Contract Lock Status section
  - Documented state token model (HOW layer) as canonical format and structure
  - Added State Authority Contract rules to Guard Prompt
  - Clarified separation between WHAT (State Authority Matrix), WHEN (Interaction Authority Contract), and HOW (State Authority Contract) layers
  - Added State Authority Contract unlock procedure documentation
  - Completed formal lock process per TUNG_LOCK_STATE_AUTHORITY_CONTRACT task

- **v1.7** (2025-12-16): Token Authority Expansion - New Token Authorities
  - Added Spacing Authority Contract to Authority Documents table
  - Added Radius Authority Contract to Authority Documents table
  - Added Typography Authority Contract to Authority Documents table
  - Added Motion Authority Contract to Authority Documents table
  - Added Elevation Authority Contract to Authority Documents table
  - Added Lock Status sections for all new token authorities
  - Updated Final Note to include new token authorities
  - Completed formal expansion process per TUNG_TOKEN_AUTHORITY_EXPANSION_PLAN task

- **v1.6** (2025-12-16): Semantic Hardening - Authority Layer Clarifications
  - Added explicit clarification that Button is semantic reference only (not visual/token authority)
  - Added authority flow section describing WHAT/WHEN/HOW separation between authority layers
  - Clarified focus-visible vs hover interaction for accessibility edge cases
  - Explicitly stated that styling is subordinate to semantic authority layers
  - **No rule changes** - documentation-only clarifications to eliminate ambiguity
  - Completed per FND_SEMANTIC_HARDENING_01 task

- **v1.5** (2025-12-16): State Authority Matrix Lock Completion
  - Added State Authority Matrix to Authority Documents table
  - Added State Authority Matrix Lock Status section
  - Documented canonical state set (6 states) and priority order
  - Added State Authority Matrix rules to Guard Prompt
  - Referenced Button as canonical reference implementation
  - Added State Authority Matrix unlock procedure documentation
  - Completed formal lock process per FND_LOCK_STATE_AUTHORITY_MATRIX task

- **v1.4** (2025-12-16): Button CVA Enforcement Lock Completion
  - Added Button CVA Enforcement Lock Status section
  - Documented Button as canonical reference implementation for tokenCVA patterns
  - Added Button CVA Enforcement unlock procedure documentation
  - Referenced Button CVA Enforcement documentation
  - Completed formal lock process per C0_BUTTON_CVA_ENFORCEMENT task

- **v1.3** (2025-12-16): Interaction Authority Formal Lock Completion
  - Enhanced Guard Prompt to include Interaction Authority enforcement rules
  - Added Interaction Authority to Final Note section
  - Explicitly documented Interaction Authority forbidden patterns in Guard Prompt
  - Formally declared Interaction Authority as locked and immutable
  - Completed formal lock process per FND_LOCK_INTERACTION_AUTHORITY task

- **v1.2** (2025-12-16): Interaction Authority Lock Integration
  - Added Interaction Authority Lock Status section
  - Documented Interaction Authority immutability as part of Foundation architecture
  - Added Interaction Authority unlock procedure documentation
  - Referenced automated enforcement script and guard layer rules

- **v1.1** (2025-12-13): Token System Lock Integration
  - Added Token System Lock Status section
  - Documented token system immutability as part of Foundation architecture
  - Added Rule 4: Token System Immutability
  - Updated Guard Prompt to include token system lock enforcement
  - Added token system unlock procedure documentation
  - Updated related documents section with token system references

- **v1.0** (2025-12-12): Final Foundation Lock
  - Officially locked Foundation layer
  - Documented all locked Foundation components
  - Established immutable architectural rules
  - Defined allowed and forbidden post-lock changes
  - Created enforcement mechanisms
  - Closed Foundation architecture phase

---

## 📝 Final Note

**After this lock, the UI Foundation architecture is considered complete and immutable.**

All future work must occur in the **Extension layer**. Foundation components are **read-only** except for bug fixes, type improvements, and documentation updates. The **Token system is locked** and immutable - all token modifications require explicit unlock procedure with full audit. The **Interaction Authority is locked** and immutable - all interaction behavior rules, priority order, and enforcement mechanisms are frozen. The **State Authority Matrix is locked** and immutable - the canonical state set, state semantics, priority order, and suppression rules are frozen. The **State Authority Contract is locked** and immutable - the state token model, naming rules, property mapping, and component obligations are frozen. The **Spacing Authority is locked** and immutable - all spacing token rules, canonical scales, and component requirements are frozen. The **Radius Authority is locked** and immutable - all border radius token rules, canonical scales, and component standards are frozen. The **Typography Authority is locked** and immutable - all typography token rules, canonical scales, and semantic roles are frozen. The **Motion Authority is locked** and immutable - all motion token rules, canonical durations, easings, transitions, and animations are frozen. The **Elevation Authority is locked** and immutable - all elevation token rules, canonical shadows, z-index scale, and stacking order are frozen. The **Layout Authority is locked** and immutable - all layout rules, canonical layout primitives, separation laws, and component contract rules are frozen. The **Interactive Size Scale Authority is locked** and immutable - the canonical interactive size scale (`sm | md | lg`), component classification, and forbidden sizes are frozen. The **Foundation Enforcement is locked and applied** - Foundation components exclude `className` and `style` from public APIs, and this enforcement is technically enforced via TypeScript, ESLint rules, type-tests, and CI integration. Any changes to state model, interaction behavior, token system, token authorities, layout authority, interactive size scale authority, or Foundation Enforcement require explicit unlock procedure with full audit.

New functionality must be built as **Extensions** that compose Foundation components and use existing locked tokens. All Extension components must comply with the **Extension Authority Contract**, which defines the boundary between Foundation and Extension layers and establishes that Extension cannot override, bypass, or duplicate Foundation functionality.

**This is a binding architectural contract. Violations are considered architectural breaches.**

**The Foundation architecture phase is officially closed. The Token system is locked. The Interaction Authority is locked. The State Authority Matrix is locked. The State Authority Contract is locked. The Spacing Authority is locked. The Radius Authority is locked. The Typography Authority is locked. The Motion Authority is locked. The Elevation Authority is locked. The Layout Authority is locked. The Interactive Size Scale Authority is locked. The Foundation Enforcement is locked and applied. The Extension Authority Contract is active and defines Extension layer boundaries.**

---

**Status:** ✅ **LOCKED**  
**Version:** 1.18  
**Date Created:** 2025-12-12  
**Last Updated:**    
**Priority:** CRITICAL  
**Architecture Phase:** **CLOSED**  
**Next Review:** **NEVER** (Foundation is immutable)

