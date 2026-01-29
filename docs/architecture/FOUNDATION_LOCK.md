# ? Foundation Lock Status (Finalized)

**Version:** 1.32  
**Date Created:** 2025-12-12  
**Last Updated:** 2026-01-28 (Runtime Utilities Lock - TUNG-028)  
**Status:** ? **LOCKED (Foundation Closed)**  
**Layer:** UI / ARCHITECTURE  
**Priority:** CRITICAL  
**Architecture Phase:** FOUNDATION **COMPLETE**

---

## Foundation Lock Status

**Status:** ? **LOCKED (Foundation Closed)**  
**Finalization Date:** 2026-01-02  
**Reason:** Foundation Component Lock Sweep finalized  

**Note:** Foundation layer is closed and finalized. Changes require explicit unlock procedure with audit and approval.

---

## Document Classification

**TYPE:** META  
**MUTABILITY:** EVOLVABLE  
**LOCK STATUS:** ? LOCKED (Finalized)
**AUTHORITY DOMAIN:** Foundation Lock

**Purpose:** This document tracks lock status across all Foundation domains. Foundation is **CLOSED** and finalized. Changes require explicit unlock procedure with audit and approval.

---

## 📋 Purpose

This document **tracks the Foundation layer status** of `@tenerife.music/ui`. The Foundation layer is **CLOSED** and finalized.

**This document is the authoritative source of truth** for the Foundation layer architecture. Foundation is closed and may be modified only through explicit unlock procedure.

**Foundation layer is finalized; any changes require explicit unlock procedure.**

**Typography Font Supply Note:** Font delivery is **out of Foundation scope**. Fonts are consumer-owned;
Foundation typography must remain valid with system fallbacks. Any change to this rule requires a new
Foundation contract.

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

**Example:** `SPACING_AUTHORITY.md` has status `ACTIVE` - this means spacing rules are in force and must be followed, but the Authority document itself is still immutable and requires unlock procedure to modify.

#### LOCKED

**Definition:** `LOCKED` means the Authority content **cannot be modified without explicit unlock procedure**.

**Semantics:**
- ✅ Authority document content is **protected from modification**
- ✅ Changes require **explicit unlock workflow** (justification, audit, approval)
- ✅ Authority rules are **frozen** and **cannot be altered in-place**
- ✅ LOCKED status is **stronger than ACTIVE** in terms of modification protection
- ❌ **LOCKED does NOT mean inactive** - LOCKED Authorities are still in force and must be followed

**Usage:** LOCKED status indicates that the Authority has completed formal lock process and is protected by unlock procedure requirements.

**Example:** `INTERACTION_AUTHORITY.md` has status `LOCKED` - this means the document content cannot be modified without explicit unlock procedure, but the Authority rules are still in force and must be followed.

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
- **Example:** `SPACING_AUTHORITY.md` - spacing rules are in force, but rules themselves are immutable

**LOCKED + IMMUTABLE:**
- Authority content is **protected from modification** (LOCKED)
- Authority rules **cannot be altered in-place** (IMMUTABLE)
- Authority document **requires explicit unlock** for any modifications
- **Example:** `INTERACTION_AUTHORITY.md` - interaction rules are locked and immutable

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
| INTERACTION_AUTHORITY.md | Interaction Authority | ✅ LOCKED | IMMUTABLE | Yes |
| STATE_AUTHORITY.md | State Authority | ✅ LOCKED | IMMUTABLE | Yes |
| STATE_MATRIX.md | State Authority Matrix | ✅ LOCKED | IMMUTABLE | Yes |
| SPACING_AUTHORITY.md | Spacing Authority | ✅ LOCKED | IMMUTABLE | Yes |
| RADIUS_AUTHORITY.md | Radius Authority | ✅ LOCKED | IMMUTABLE | Yes |
| TYPOGRAPHY_AUTHORITY.md | Typography Authority | ✅ LOCKED | IMMUTABLE | Yes |
| MOTION_AUTHORITY.md | Motion Authority | ✅ LOCKED | IMMUTABLE | Yes |
| ELEVATION_AUTHORITY.md | Elevation Authority | ✅ LOCKED | IMMUTABLE | Yes |
| LAYOUT_AUTHORITY.md | Layout Authority | ✅ LOCKED | IMMUTABLE | Yes |
| EXTENSION_AUTHORITY.md | Extension Authority | ✅ ACTIVE | IMMUTABLE | Yes |
| INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md | Interactive Size Scale Authority | ✅ LOCKED | IMMUTABLE | Yes |
| TOKEN_AUTHORITY.md | Token System | ✅ LOCKED | IMMUTABLE | Yes |
| ARCHITECTURE_RULES.md | Architecture Rules | ✅ ACTIVE | IMMUTABLE | Yes |

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
| FOUNDATION_LOCK.md | Foundation Lock | ✅ LOCKED | EVOLVABLE | Can add new domain locks |

**Rule:** Meta documents track lock status. They can be updated as new domains are locked, but cannot unlock existing locks.

---

## 🔒 Locked Foundation Components

The following components constitute the **complete and final** Foundation layer. These components are **immutable** and serve as the **sole canonical foundation** for their respective categories.

| Component       | Category   | Base Library         | Foundation Status | Status Date |
| --------------- | ---------- | -------------------- | ----------------- | ----------- |
| **Button**      | Actions    | Native `<button>`    | ✅ **FINAL LOCK**  | 2025-12-25 |
| **IconButton**  | Actions    | Native `<button>` (via Button) | ✅ **LOCKED** | 2026-01-02 |
| **Link**        | Navigation | Native `<a>`         | ✅ **LOCKED**      | 2025-12-25 |
| **Text**        | Typography | Native elements (span, p, label, strong, em) | ✅ **LOCKED**      | 2025-12-26 |
| **Input**       | Form Input | Native `<input>`     | ✅ **LOCKED**      | 2025-12-26 |
| **Label**       | Form Input | Radix Label          | ✅ **LOCKED**      | 2025-12-25 |
| **Heading**     | Typography | Native `<h1-h6>`     | ✅ **LOCKED**      | 2025-12-25 |
| **Icon**        | Visual Primitives | SVG Registry    | ✅ **LOCKED**      | 2025-12-25 |
| **Checkbox**    | Form Input | Native `<button role="checkbox">` | ✅ **PROCESS LOCKED** | 2025-12-25 |
| **Radio**       | Form Input | Native `<button role="radio">` | ✅ **LOCKED** | 2025-12-25 |
| **Switch**      | Form Input | Native `<button role="switch">` | ✅ **LOCKED** | 2025-12-25 |
| **Select**      | Form Input | Radix Select         | ✅ **LOCKED**      | 2025-12-26 |
| **FormGroup**   | Form Input | Native `<fieldset>` | ✅ **LOCKED**      | 2026-01-02 |
| **HelperText**  | Form Input | Native `<p>` (via Text) | ✅ **LOCKED**      | 2026-01-02 |
| **ErrorText**   | Form Input | Native `<p>` (via Text) | ✅ **LOCKED**      | 2026-01-02 |
| **Tabs**        | Navigation | Radix Tabs           | ✅ **LOCKED**      | 2025-12-25 |
| **Modal**       | Overlays   | Radix Dialog         | ✅ **PROCESS LOCKED** | 2025-12-25 |
| **ContextMenu** | Overlays   | Radix ContextMenu    | ✅ **PROCESS LOCKED** | 2025-12-25 |
| **Toast**       | Overlays   | Radix Toast          | ✅ **LOCKED**      | 2025-12-26 |

## ✅ Foundation Component Lock Sweep Finalization

**Status:** ✅ **FOUNDATION LOCK SWEEP FINALIZED**  
**Finalization Date:** 2026-01-02  
**Task ID:** TUI_FOUNDATION_LOCK_SWEEP_FINAL_01  
**Authority:** This finalization is binding and immutable without explicit unlock procedure

### Finalized Foundation Components (21)

The following 21 components constitute the **complete and finalized** Foundation layer. All components have been verified for compliance with architecture rules, Public API canon, token authority, and pipeline requirements.

1. **Button** - Actions (Native `<button>`)
2. **IconButton** - Actions (Native `<button>` via Button)
3. **Text** - Typography (Native elements)
4. **HelperText** - Form Input (Native `<p>` via Text)
5. **Alert** - Feedback (Native elements)
6. **Link** - Navigation (Native `<a>`)
7. **NavLink** - Navigation (Native `<a>` via Link)
8. **Badge** - Visual Primitives (Native elements)
9. **Heading** - Typography (Native `<h1-h6>`)
10. **Checkbox** - Form Input (Native `<button role="checkbox">`)
11. **Radio** - Form Input (Native `<button role="radio">`)
12. **Switch** - Form Input (Native `<button role="switch">`)
13. **Input** - Form Input (Native `<input>`)
14. **Textarea** - Form Input (Native `<textarea>`)
15. **Skeleton** - Visual Primitives (Native elements)
16. **Progress** - Visual Primitives (Native elements)
17. **Icon** - Visual Primitives (SVG Registry)
18. **Label** - Form Input (Radix Label)
19. **ErrorText** - Form Input (Native `<p>` via Text)
20. **Field** - Form Input (Native `<fieldset>` composition)
21. **FormGroup** - Form Input (Native `<fieldset>`)

### Verification Results

**All 21 Foundation components verified:**
- ✅ Component location (PRIMITIVES) correct
- ✅ Export from `src/index.ts` verified (single export, all types exported)
- ✅ Public API compliance (Foundation Enforcement: className/style excluded)
- ✅ Token usage compliance (all visual props use token unions, no raw values)
- ✅ CVA usage compliance (tokenCVA vs cva matches Decision Matrix)
- ✅ Storybook and test coverage verified

**Public API Compliance:**
- ✅ All 21 Foundation components exported from `src/index.ts`
- ✅ Public API Audit Report: `docs/reports/audit/TUI_PUBLIC_API_AUDIT_REPORT.md` (Status: COMPLETE, READY FOR LOCK)
- ✅ No unresolved findings in Public API audit

**Previous Sweep Reference:**
- Initial verification completed: TUI_FOUNDATION_LOCK_SWEEP_01 (2026-01-02)
- Status Report: `docs/reports/foundation/TUI_FOUNDATION_LOCK_SWEEP_01_STATUS.md`
- Violations Report: `docs/reports/foundation/TUI_FOUNDATION_LOCK_SWEEP_01_VIOLATIONS.md`

### Finalization Statement

**Foundation layer is complete, compliant, and immutable.**

All 21 Foundation components have been verified and confirmed as locked. The Foundation layer is officially finalized and closed for modifications. Any future changes to Foundation components require explicit Foundation unlock procedure with full audit and justification.

**This finalization applies to humans and AI agents equally.** Foundation components are read-only except for bug fixes, type improvements, and documentation updates.

### Related Documents

- **Public API Audit:** `docs/reports/audit/TUI_PUBLIC_API_AUDIT_REPORT.md`
- **Previous Sweep Status:** `docs/reports/foundation/TUI_FOUNDATION_LOCK_SWEEP_01_STATUS.md`
- **Previous Sweep Violations:** `docs/reports/foundation/TUI_FOUNDATION_LOCK_SWEEP_01_VIOLATIONS.md`
- **Architecture Lock:** `docs/architecture/ARCHITECTURE_LOCK.md`
- **Public API Contract:** `docs/architecture/PUBLIC_API_CONTRACT.md`

---

### Foundation Component Details

#### Button
- **Location:** `src/PRIMITIVES/Button/`
- **Export Path:** `@tenerife.music/ui` → `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize`
- **Base Library:** Native `<button>` element (semantic HTML)
- **Purpose:** Sole action trigger foundation. All user-initiated actions (submit, confirm, execute, activate) must use this component. Button represents actions, not navigation (use Link component) or toggle/state switching (use Switch/Checkbox components).
- **Status:** ✅ **FINAL LOCK**
- **Lock Date:** 2025-12-25
- **Pipeline 18A Completion Date:** 2025-12-25
- **Pipeline:** Pipeline 18A (Steps 0-12 complete)
- **Lifecycle Version:** 1.0 (Steps 0-12)
- **Quality Gates:** ✅ Step 10 (Runtime / Interaction Tests) — PASS, ✅ Step 11 (Accessibility) — PASS, ✅ Step 12 (Final Review & Lock) — PASS, ✅ Pipeline 18A Steps 0-12 — COMPLETE
- **Scope:** Public API, tokens (BUTTON_TOKENS), behavior (action trigger via `<button>`), states (base, hover, active, focus-visible, disabled), variants (primary, secondary, accent, outline, ghost, destructive), sizes (sm, md, lg), iconOnly prop (canonical pattern for icon-only buttons)
- **Implementation Report:** `docs/reports/BUTTON_FOUNDATION_LOCK_REPORT.md`
- **Audit Report:** `docs/reports/audit/BUTTON_BASELINE_REPORT.md`
- **Pipeline 18A Changes:**
  - Icon rendering deduplication (extracted ICON_WRAPPER_CLASS constant and renderIcon helper)
  - Matrix and Accessibility stories added to Storybook
  - Test coverage enhanced (asChild test fixed, type behavior documented)
  - Public API change: Added `iconOnly` prop (canonical pattern), removed `size="icon"` from ButtonSize type (GlobalSize compliance)
- **Reference Role:** Button serves as canonical Foundation reference implementation for token-driven CVA patterns, Authority Contract compliance, and browser-native interaction mechanisms.
- **Rule:** DO NOT modify, extend, or create alternatives. Button is FINAL LOCK and immutable.

#### Link
- **Location:** `src/PRIMITIVES/Link/`
- **Export Path:** `@tenerife.music/ui` → `Link`, `LinkProps`, `LinkSize`, `LinkVariant`, `linkVariants`
- **Base Library:** Native `<a>` element (semantic HTML)
- **Purpose:** Sole navigation link foundation. All navigation links must use this component. Link represents semantic navigation (location changes), not actions. Actions must use Button component.
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-25
- **Pipeline:** Pipeline 18A (Steps 0-12 complete)
- **Audit Report:** `docs/reports/audit/LINK_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Component is Foundation primitive)
- **Migration Complete:** Link has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Report:** `docs/reports/LINK_FOUNDATION_LOCK_REPORT.md` (legacy process, superseded by audit report)
- **Architectural Note:** [LINK_NO_ASCHILD_CANONICAL_ANCHOR.md](./LINK_NO_ASCHILD_CANONICAL_ANCHOR.md) — Link is a first-class semantic anchor; `asChild` pattern is FORBIDDEN
- **Implementation Date:** 2025-12-17
- **Lifecycle Version:** 2.0 (Pipeline 18A Steps 0-12)
- **Scope:** Public API, tokens (LINK_TOKENS), behavior (navigation via `<a>`), states (base, hover, focus-visible, disabled), variants (primary, secondary, accent, outline, ghost, link, destructive), sizes (sm, md, lg)
- **Architectural Constraints:** Link MUST always render a single `<a>` element directly. `asChild` prop is FORBIDDEN. No proxy patterns (Radix Slot) allowed. See [LINK_NO_ASCHILD_CANONICAL_ANCHOR.md](./LINK_NO_ASCHILD_CANONICAL_ANCHOR.md) for complete architectural contract.

#### Text
- **Location:** `src/PRIMITIVES/Text/`
- **Export Path:** `@tenerife.music/ui` → `Text`, `TextProps`, `TextSize`, `TextWeight`, `textVariants`
- **Base Library:** Native `<span>` element (semantic HTML)
- **Purpose:** Sole typography foundation for general-purpose text rendering. Text provides size, weight, and color (muted) variants for typography control. Text is non-interactive (no hover/active/focus states) and stateless. Text uses typography scale (xs, sm, md, lg, xl) separate from interactive scale.
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-25
- **Pipeline:** Pipeline 18A (Steps 0-11 complete)
- **Audit Report:** `docs/reports/audit/TEXT_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Component is Foundation primitive)
- **Migration Complete:** Text has completed canonical Foundation Step Pipeline (Steps 0-11) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2025-12-25
- **Lifecycle Version:** 1.0 (Pipeline 18A Steps 0-11)
- **Scope:** Public API, tokens (TEXT_TOKENS), behavior (typography rendering via `<span>`), variants (size: xs, sm, md, lg, xl; weight: normal, medium, semibold, bold; muted: boolean)
- **CVA Compliance:** Text follows canonical CVA structure with inline variants, explicit union types, and constants for defaultVariants (DEFAULT_SIZE, DEFAULT_WEIGHT, DEFAULT_MUTED)
- **Architectural Constraints:** Text MUST use typography scale (xs, sm, md, lg, xl) separate from interactive scale. Text is non-interactive and stateless. No hover/active/focus states allowed.

#### Input
- **Location:** `src/PRIMITIVES/Input/`
- **Export Path:** `@tenerife.music/ui` → `Input`, `InputProps`, `InputSize`
- **Base Library:** Native `<input>` element (semantic HTML)
- **Purpose:** Low-level form control primitive that wraps the native `<input>` element. Input is responsible only for visual styling via tokens, accessibility via native and ARIA attributes, and forwarding all native input behavior. Input does not handle labels, errors, validation, helper text, or form logic. Higher-level composition is delegated to FormField or domain-level form abstractions.
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-26
- **Pipeline:** Pipeline 18A Refactor Cycle 2 (Steps 0-12 complete)
- **Audit Report:** `docs/reports/audit/INPUT_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Component is Foundation primitive)
- **Migration Complete:** Input has completed canonical Foundation Step Pipeline (Refactor Cycle 2, Steps 0-12) and demonstrates full compliance with primitive role definition and architectural canon.
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2025-12-26
- **Lifecycle Version:** 2.0 (Pipeline 18A Refactor Cycle 2, Steps 0-12)
- **Scope:** Public API (size, invalid props), tokens (INPUT_TOKENS.size.*, INPUT_TOKENS.state.* minimal), behavior (text input via `<input>`), sizes (sm, md, lg), invalid state (via aria-invalid)
- **CVA Compliance:** Input follows canonical CVA structure with size-only variants, explicit union types (InputSize: 'sm' | 'md' | 'lg')
- **Accessibility:** Input uses native `<input>` element which provides full keyboard navigation, focus management, and screen reader support. ARIA attributes (aria-invalid) correctly implemented via invalid prop.
- **Architectural Constraints:** Input MUST use native `<input>` element. Input MUST use interactive size scale (sm, md, lg) per Interactive Size Scale Authority. Input MUST use token-driven styling only. Foundation Enforcement: className and style excluded from public API. Input is intentionally limited to a low-level form control primitive. It does not and will not handle validation, errors, labels, helper text, or form logic. All such concerns are delegated to higher-level composition components. This limitation is intentional and required for architectural stability.

#### Heading
- **Location:** `src/PRIMITIVES/Heading/`
- **Export Path:** `@tenerife.music/ui` → `Heading`, `HeadingProps`, `HeadingLevel`, `HeadingWeight`, `headingVariants`
- **Base Library:** Native heading elements (`<h1>` through `<h6>`) (semantic HTML)
- **Purpose:** Sole heading typography foundation. All heading text rendering (document structure, page titles, section headers) must use this component. Heading provides level (1-6), weight, and color (muted) variants for semantic document structure and typography control. Heading is non-interactive (no hover/active/focus states) and stateless. Heading depends on Text component for token-driven typography styling.
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-25
- **Pipeline:** Pipeline 18A (Steps 0-11 complete)
- **Audit Report:** `docs/reports/audit/HEADING_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Foundation Layer Primitive - Typography)
- **Migration Complete:** Heading has completed canonical Foundation Step Pipeline (Steps 0-11) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2025-12-25
- **Lifecycle Version:** 1.0 (Pipeline 18A Steps 0-11)
- **Scope:** Public API, tokens (TEXT_TOKENS via Text dependency), behavior (heading rendering via `<h1-h6>`), variants (level: 1-6; weight: normal, medium, semibold, bold; muted: boolean)
- **CVA Compliance:** Heading uses `cva` (COMPLIANT per CVA Decision Matrix - pure typography primitive with no token-driven styling axes). Programmatic compound variant generation (via `generateWeightVariants()`) documented as architectural exception for maintainability (36 combinations: 6 levels × 6 sizes × weight variants).
- **Accessibility:** Heading uses native semantic HTML heading elements (`<h1>` through `<h6>`) which provide document structure and screen reader navigation. ARIA attributes not required due to semantic HTML. Level prop determines semantic heading level.
- **Architectural Constraints:** Heading MUST use native semantic heading elements (`<h1-h6>`). Heading MUST use typography scale from TEXT_TOKENS. Heading is non-interactive and stateless. No hover/active/focus states allowed. Foundation Enforcement: className and style excluded from public API.
- **Storybook Coverage:** Matrix story (6 levels × 4 weights grid) + TypographyHierarchy story + WithColorVariants story + realistic examples.
- **Test Coverage:** 19 tests passing (rendering, levels 1-6, weights, polymorphism, muted prop, semantic HTML output).

#### Icon
- **Location:** `src/PRIMITIVES/Icon/`
- **Export Path:** `@tenerife.music/ui` → `Icon`, `IconProps`, `iconVariants`
- **Base Library:** SVG Registry (tree-shakeable icon registry with Radix Slot for composition)
- **Purpose:** Sole icon rendering foundation. All SVG icon rendering must use this component. Icon is a semi-interactive primitive that provides pure visual representation without interactive behavior. Icon delegates all interactivity (clicks, keyboard navigation) to parent components. Icon provides token-driven visual styling (size, color, stroke) with registry-based icon lookup.
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-25
- **Pipeline:** Pipeline 18A (Steps 0-11 complete)
- **Audit Report:** `docs/reports/audit/ICON_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Foundation Layer Primitive - Visual Primitives)
- **Migration Complete:** Icon has completed canonical Foundation Step Pipeline (Steps 0-11) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2025-12-25
- **Lifecycle Version:** 1.0 (Pipeline 18A Steps 0-11)
- **Scope:** Public API, tokens (ICON_TOKENS), behavior (icon rendering via SVG registry), variants (size: sm, md, lg, xl; color: default, muted, success, warning, danger, info; stroke: thin, normal, bold), asChild prop (composition pattern via Radix Slot)
- **CVA Compliance:** Icon migrated from `cva` to `tokenCVA` (BLOCKER-1 resolved). All variant maps have type constraints (`satisfies Record<Type, string>`). CVA type leakage removed from public API (explicit union types used).
- **Accessibility:** Icon delegates A11Y responsibility to parent components. Icon supports ARIA attribute passthrough via SVG props. Icon is non-opinionated about A11Y patterns (decorative vs semantic icons determined by parent context).
- **Architectural Constraints:** Icon MUST use visual size scale (sm, md, lg, xl) distinct from interactive scale per Foundation rule: "Semi-interactive components (Icon, Badge, Avatar) MUST NOT use size as interactive scale". Icon is non-interactive (no hover/active/focus states). Icon delegates interactivity to parent components. Icon MUST use token-driven styling only (ICON_TOKENS).
- **Storybook Coverage:** SizesGallery story (REQUIRED per VARIANTS_SIZE_CANON.md) + Default + AllSizes + AllColors + AllStrokeWidths + WithButton + WithInput + SemanticColors + FallbackIcon stories. Category: Foundation/Primitives/Icon.
- **Test Coverage:** 10 test suites (265 lines): rendering, size variants (4 sizes), color variants (6 colors), stroke variants (3 strokes), composition pattern (asChild), custom className, ref forwarding, prop combinations, edge cases, SVG props passthrough.
- **Foundation Rule Compliance:** Icon follows Foundation rule for semi-interactive components (visual size scale, not interactive scale). Icon correctly delegates A11Y to parent components. Icon correctly uses tokenCVA for token-driven axes.

#### Checkbox
- **Location:** `src/PRIMITIVES/Checkbox/`
- **Export Path:** `@tenerife.music/ui` → `Checkbox`, `CheckboxProps`, `CheckboxVariant`, `CheckboxSize`, `CheckboxState`, `checkboxVariants`
- **Base Library:** Native `<button role="checkbox">` element (semantic HTML with ARIA)
- **Purpose:** Sole checkbox selection control foundation. All binary selection controls (checked/unchecked with optional indeterminate state) must use this component. Checkbox provides full accessibility with ARIA attributes, keyboard navigation (Space key toggle), and supports both controlled and uncontrolled modes. Checkbox is an interactive primitive that represents user selection state in forms.
- **Status:** ✅ **PROCESS LOCKED**
- **Lock Date:** 2025-12-25
- **Pipeline:** Pipeline 18A (Steps 0-12 complete, Refactor Cycle 2 complete 2025-12-27)
- **Audit Report:** `docs/reports/audit/CHECKBOX_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Foundation Layer Primitive - Form Controls)
- **Migration Complete:** Checkbox has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements. Refactor Cycle 2 (2025-12-27) validated component compliance with no code changes required.
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2025-12-25
- **Lifecycle Version:** 1.0 (Pipeline 18A Steps 0-12, Refactor Cycle 2: 2025-12-27)
- **Scope:** Public API, tokens (CHECKBOX_TOKENS), behavior (checkbox toggle via `<button role="checkbox">`), states (default, checked, indeterminate, error, disabled), variants (primary, secondary, outline, ghost, destructive), sizes (sm, md, lg), custom icon support (icon, indeterminateIcon props), controlled/uncontrolled modes
- **CVA Compliance:** Checkbox migrated from `cva` to `tokenCVA` (BLOCKER-1 resolved in STEP 9). All variant maps have type constraints (`satisfies Record<Type, string>`). CVA type leakage removed from public API (explicit union types: CheckboxVariant, CheckboxSize, CheckboxState). Size scale normalized to canonical interactive scale (sm | md | lg) per FOUNDATION_LOCK.md Interactive Size Scale Authority.
- **Accessibility:** Checkbox uses ARIA checkbox pattern (`role="checkbox"`, `aria-checked="true|false|mixed"`). Space key toggles checkbox. ARIA labeling via `aria-label`, `aria-labelledby`, `aria-describedby`. Error state via `aria-invalid`. Disabled state via `disabled` attribute and `aria-disabled`. WAI-ARIA checkbox pattern fully compliant. Comprehensive A11Y tests (12 A11Y-specific tests) and Accessibility Storybook story.
- **Architectural Constraints:** Checkbox MUST use interactive size scale (sm, md, lg) per Interactive Size Scale Authority. Checkbox MUST use token-driven styling only (CHECKBOX_TOKENS). Checkbox MUST use ARIA checkbox pattern (button with role="checkbox"). Foundation Enforcement: className and style excluded from public API.
- **Storybook Coverage:** Matrix story (5 variants × 3 sizes grid, REQUIRED per VARIANTS_SIZE_CANON.md), States story (all states across variants and sizes, REQUIRED), SizesGallery story (canonical name), plus Default, Checked, Indeterminate, Disabled, DisabledChecked, WithLabel, Controlled, Uncontrolled, ErrorState, Accessibility stories. Total: 13 stories with canonical naming.
- **Test Coverage:** 42 tests passing (1 skipped): rendering, variants (5 variants), sizes (3 sizes - canonical scale), states (6 states), icons (checkmark, custom, indeterminate), accessibility (12 tests - ARIA attributes, keyboard navigation, labeling), interactions (click, Space key, disabled blocking), controlled/uncontrolled modes, snapshot test.
- **Foundation Rule Compliance:** Checkbox follows Interactive Size Scale Authority (canonical scale sm | md | lg). Checkbox correctly uses tokenCVA for token-driven axes (variant, size, state). State model deviates from STATE_MATRIX (has component-specific states: checked, indeterminate, error) but deviation is justified for checkbox semantics.
- **Pipeline 18A Changes:**
  - CVA type migration: `cva` → `tokenCVA` (Decision Matrix RULE 1 compliance)
  - Size scale normalization: Removed `xs` and `xl` sizes, canonical scale `sm | md | lg` enforced
  - Type system cleanup: Removed `VariantProps` leaking, explicit union types (CheckboxVariant, CheckboxSize, CheckboxState)
  - Code quality: Extracted toggle logic to shared helper, reduced duplication
  - Storybook normalization: Renamed stories to canonical names (Matrix, States, SizesGallery), added Matrix story
  - Token updates: CHECKBOX_TOKENS updated to reflect canonical scale
  - Tests updated: Removed `xs` and `xl` test cases, 42 tests passing

#### Switch
- **Location:** `src/PRIMITIVES/Switch/`
- **Export Path:** `@tenerife.music/ui` → `Switch`, `SwitchProps`, `SwitchVariant`, `SwitchSize`, `switchTrackVariants`, `switchHandleVariants`, `switchHandleStateVariants`
- **Base Library:** Native `<button role="switch">` element (semantic HTML with ARIA)
- **Purpose:** Sole binary toggle switch foundation. All on/off toggle controls (checked/unchecked state) must use this component. Switch provides full accessibility with ARIA switch pattern, keyboard navigation (Space key toggle), and supports both controlled and uncontrolled modes. Switch is an interactive primitive that represents binary toggle state for settings, preferences, and feature enablement.
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-25
- **Pipeline:** Pipeline 18A (Steps 0-12 complete)
- **Audit Report:** `docs/reports/audit/SWITCH_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Foundation Layer Primitive - Form Controls)
- **Migration Complete:** Switch has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2025-12-25
- **Lifecycle Version:** 1.0 (Pipeline 18A Steps 0-12)
- **Scope:** Public API, tokens (SWITCH_TOKENS), behavior (binary toggle via `<button role="switch">`), internal states (base, checked, disabled, disabledChecked, invalid), variants (primary, secondary, outline, ghost, destructive), sizes (xs, sm, md, lg, xl), controlled/uncontrolled modes
- **CVA Compliance:** Switch migrated from `cva` to `tokenCVA` (BLOCKER-1 resolved). All variant maps have type constraints (`satisfies Record<Type, string>`). CVA type leakage removed from public API (explicit union types used). Three CVA invocations (switchTrackVariants, switchHandleVariants, switchHandleStateVariants) follow canonical split pattern for separate visual concerns (track vs handle).
- **State Model:** Switch uses derived state model (no public `state` prop). States are derived from props: `checked` (value), `disabled` (state), `invalid` (validation state). Internal states (base, checked, disabled, disabledChecked, invalid) are computed in effectiveState and used for styling only. Public API: `checked`, `disabled`, `invalid` props.
- **Foundation Enforcement:** Switch excludes `className` and `style` props from public API per Foundation Enforcement rules. Component uses token-driven styling only (SWITCH_TOKENS).
- **Accessibility:** Switch uses ARIA switch pattern (`role="switch"`) with full keyboard support (Space key toggles). ARIA attributes: `aria-checked`, `aria-disabled`, `aria-invalid`, `aria-label`, `aria-labelledby`, `aria-describedby`. Native button provides focus management. Handle span uses `aria-hidden="true"` (decorative element). WCAG 2.1 Level AA compliant.
- **Architectural Constraints:** Switch MUST use native `<button>` element with `role="switch"`. Switch MUST use interactive size scale (xs, sm, md, lg, xl) per GlobalSize subset. Switch MUST use token-driven styling only (SWITCH_TOKENS). Switch MUST derive all states from props (no public state prop). Foundation Enforcement: className and style excluded from public API.
- **Storybook Coverage:** Matrix story (5 variants × 5 sizes = 25 combinations, REQUIRED) + SizesGallery story (all sizes with labels, REQUIRED) + States story (all states across variants/sizes, canonical name) + Invalid story + Default + Checked + Disabled + DisabledChecked + AllSizes + AllSizesChecked + AllVariants + AllVariantsUnchecked + WithLabel + Controlled + Uncontrolled + Accessibility stories. Category: Foundation Primitives/Switch.
- **Test Coverage:** 40 tests passing (8 suites): rendering (5 tests), variants (5 tests), sizes (5 tests), states (6 tests), accessibility (8 tests), interactions (6 tests), controlled/uncontrolled (3 tests), handle animation (2 tests). All tests use updated API (`invalid` prop instead of `state="error"`).
- **Pipeline 18A Changes:**
  - CVA migration: Migrated from `cva` to `tokenCVA` for all 3 CVA invocations (track, handle, handleState)
  - Type constraints: Added `satisfies Record<Type, string>` to all variant maps
  - State model refactor: Removed public `state` prop, added `invalid` prop, states now fully derived
  - State naming: Renamed "default" → "base", "error" → "invalid" for canonical consistency
  - Public API cleanup: Excluded `className` and `style` props (Foundation Enforcement)
  - Type system: Removed `VariantProps` leaking, added explicit union types (SwitchVariant, SwitchSize)
  - Storybook normalization: Added Matrix story (variants × sizes grid), added SizesGallery story (all sizes with labels), renamed AllStates → States (canonical name), renamed ErrorState → Invalid
  - Tests updated: Replaced `state="error"` with `invalid` prop, all 40 tests passing
  - No linter errors after all changes
- **Foundation Rule Compliance:** Switch follows Foundation rule for interactive components (interactive size scale xs-xl). Switch correctly implements ARIA switch pattern. Switch correctly uses tokenCVA for token-driven axes. Switch correctly excludes className/style from public API.

#### Select
- **Location:** `src/COMPOSITION/controls/Select/`
- **Export Path:** `@tenerife.music/ui` (when promoted to index exports) → `Select` (compound component with Root, Trigger, Content, Item, etc.), `SelectRootProps`, `SelectTriggerProps`, `SelectContentProps`, etc.
- **Base Library:** Radix UI Select (`@radix-ui/react-select`)
- **Canonical Role:** **Composite Control** (12 subcomponents, token-driven styling wrapper for Radix primitive). Select is NOT a primitive component and NOT a form wrapper. It is a composite component that delegates all interaction, accessibility, and state management to Radix while providing consistent visual design system integration.
- **Purpose:** Sole select/dropdown control foundation. All single-value selection from a list of options must use this component. Select provides a compound component API (Root, Trigger, Value, Icon, Content, Viewport, Item, etc.) for flexible composition while maintaining consistent token-driven styling and Radix-powered accessibility. Select delegates all interaction logic (keyboard navigation, focus management, ARIA) to Radix primitive.
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-26
- **Pipeline:** Pipeline 18A (Steps 0-12 complete - Refactor Cycle: Token Migration & API Simplification)
- **Audit Report:** `docs/reports/audit/SELECT_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Foundation Layer Control - Form Input)
- **Migration Complete:** Select has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements. Refactored to use INPUT_TOKENS per architectural canon (composite form control built on primitive tokens).
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2025-12-26
- **Lifecycle Version:** 2.0 (Pipeline 18A Steps 0-12 - Refactor Cycle)
- **Scope:** Public API (compound component with 12 subcomponents, minimal controlled API: value, defaultValue, onValueChange, disabled, invalid via aria-invalid, children), tokens (INPUT_TOKENS - consumes Input/Text tokens per architectural canon), behavior (Radix-delegated interaction, keyboard navigation, focus management), defaults (size: md, variant: outline, width: full - uses Input defaults)
- **STATE_MATRIX Binding:** Select uses canonical states from STATE_MATRIX: `base`, `hover`, `active`, `focus-visible`, `disabled` (all applied). `loading` is not applicable. Select-specific states: `open`/`closed` (Radix data-state) and `selected` (Item indicator) are necessary component-specific states for dropdown/selection components. State model is explicitly bound to STATE_MATRIX with correspondence table documented in audit report.
- **Forbidden Extensions:** Select MUST NOT implement: (1) Form validation logic (validation must be external), (2) Async data loading (options provided as children/props), (3) Search/filter logic (use separate SearchSelect component), (4) Multi-selection logic (use separate MultiSelect component), (5) Custom state management (beyond Radix-provided state), (6) Custom event handlers for interaction (only Radix handlers), (7) Form integration logic (integration must be external). Extension allowed via composition (wrapping Select in higher-level components). See audit report STEP 6 for detailed forbidden extensions documentation.
- **CVA Compliance:** Select uses `tokenCVA` (COMPLIANT per CVA Decision Matrix RULE 1 - component has token-driven visual axes). All three CVA instances (selectTriggerVariants, selectContentVariants, selectItemVariants) use INPUT_TOKENS with simplified base classes (no size/variant/width variants - uses Input defaults). CVA structure simplified per architectural canon (composite form control consumes primitive tokens).
- **Accessibility:** Select uses Radix Select primitive which provides comprehensive WCAG 2.1 Level AA compliance: ARIA roles (combobox, listbox, option), keyboard navigation (Arrow keys, Enter, Escape, Tab, type-ahead), focus management (focus trap, restoration), screen reader support (value announcement, state changes). Component integration preserves all Radix A11Y features. WCAG 2.1 Level AA compliance validated: 1.3.1, 2.1.1, 2.4.7, 4.1.2, 4.1.3.
- **Architectural Constraints:** Select MUST delegate all interaction logic to Radix (no custom keyboard/mouse handlers). Select MUST use token-driven styling (INPUT_TOKENS) for all visual properties per architectural canon (composite form control built on primitive tokens). Select is compound component with 12 subcomponents exposing Radix primitives. Uses Input defaults: size (md), variant (outline), width (full). Invalid state via aria-invalid prop only.
- **Storybook Coverage:** States story (states: default, disabled, invalid, with value) + existing stories (Default, Controlled, Uncontrolled, Invalid, Disabled, WithLabel, LongList, WithGroups, KeyboardNavigation, Accessibility).
- **Test Coverage:** Comprehensive tests passing (rendering, invalid state, mouse interaction, keyboard navigation, focus management, selection behavior, disabled state, accessibility: combobox role, aria-expanded, controlled/uncontrolled modes). Tests updated for minimal API (variant/size/width tests removed, invalid state tests added).
- **Previous Status:** UNLOCKED (Pending Canonical Lock) since 2025-12-17 - Explicitly unlocked to allow canonical Foundation lock process per user request.
- **Lock Justification:** Select has completed Pipeline 18A (Steps 0-12) with all BLOCKER issues resolved (token migration from SELECT_TOKENS to INPUT_TOKENS, API simplification to minimal controlled API, CVA normalization). Component demonstrates full compliance with architectural canon (composite form control built on primitive tokens), CVA Canonical Style, STATE_MATRIX, and all Authority Contracts. Canonical role defined (Composite Control), state model explicitly bound to STATE_MATRIX, forbidden extensions documented, interaction tests enhanced, a11y validation comprehensive. Exception declared per TUNG_LOCKED_COMPONENT_CHANGE_GUARD for LOCKED component refactor. Ready for Foundation lock.

#### FormGroup
- **Location:** `src/PRIMITIVES/FormGroup/`
- **Export Path:** `@tenerife.music/ui` → `FormGroup`, `FormGroupProps`
- **Base Library:** Native `<fieldset>` element (semantic HTML)
- **Canonical Role:** **FOUNDATION_PRIMITIVE_FORM_GROUPING** - Semantic wrapper for grouping related form fields using native HTML fieldset/legend. Provides optional description and error slots with automatic ID generation for accessibility. FormGroup is layout-transparent for children - it does not manage layout inside children. It only guarantees vertical flow for its own semantic elements (description, error).
- **Purpose:** Sole form field grouping foundation. All semantic grouping of related form fields must use this component. FormGroup uses native `<fieldset>` and conditional `<legend>` for accessibility and semantic grouping. Provides automatic ID generation for description/error (aria-describedby). Layout-transparent for user-provided children.
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2026-01-02
- **Pipeline:** Pipeline 18A (Steps 0-12 complete)
- **Audit Report:** `docs/reports/audit/FORMGROUP_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Foundation Layer Primitive - Form Input)
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2026-01-02
- **Scope:** Public API (legend, description, error, disabled, required, children), behavior (native fieldset disabled propagation, aria-required, automatic ID generation), defaults (all optional props default to undefined/false)
- **STATE_MATRIX Binding:** FormGroup uses canonical states from STATE_MATRIX: `base`, `disabled` (via native fieldset disabled attribute). No hover/active/focus states (semantic wrapper, not interactive). State model is explicitly bound to STATE_MATRIX.
- **Forbidden Extensions:** FormGroup MUST NOT implement: (1) Layout management for children (layout-transparent), (2) Validation logic (validation must be external), (3) Form state management (state management must be external), (4) Input registration (registration must be external), (5) Visual framing/card styling (use Card/Surface components), (6) Custom layout control inside children (user controls layout).
- **CVA Compliance:** FormGroup does not use CVA (COMPLIANT per CVA Decision Matrix - component is semantic wrapper without token-driven visual axes). Uses Stack component with token spacing for description/error vertical flow only.
- **Accessibility:** FormGroup uses native HTML `<fieldset>`/`<legend>` for semantic grouping. Provides automatic ID generation for description/error (aria-describedby). Disabled state propagates to all form controls via fieldset disabled attribute. Required state reflected via aria-required on fieldset. WCAG 2.1 Level AA compliance validated: 1.3.1, 2.4.7, 4.1.2.
- **Architectural Constraints:** FormGroup MUST remain layout-transparent for children (no wrappers around children). FormGroup MUST use native HTML fieldset/legend for semantic grouping. FormGroup MUST use token-based spacing only (via Stack component). FormGroup MUST NOT manage layout inside children (user controls layout).

#### HelperText
- **Location:** `src/PRIMITIVES/HelperText/`
- **Export Path:** `@tenerife.music/ui` → `HelperText`, `HelperTextProps`
- **Base Library:** Native `<p>` element (via Text component wrapper)
- **Canonical Role:** **FOUNDATION_PRIMITIVE_FORM_DESCRIPTION** - Presentational DX helper for form descriptions. Provides a thin wrapper around Text component with sensible defaults for helper text use cases. HelperText is standalone (not tied to Field composition) and purely presentational.
- **Purpose:** Sole form description helper foundation. All standalone form descriptions (outside Field composition) must use this component. HelperText provides sensible defaults (size="sm", tone="muted", as="p") for helper text use cases. HelperText is accessible via aria-describedby.
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2026-01-02
- **Pipeline:** Pipeline 18A (Steps 0-12 complete)
- **Audit Report:** `docs/reports/audit/HELPERTEXT_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Foundation Layer Primitive - Form Input)
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2026-01-02
- **Scope:** Public API (size, tone, as props with defaults), behavior (thin wrapper over Text component), defaults (size="sm", tone="muted", as="p")
- **STATE_MATRIX Binding:** HelperText is non-interactive (presentational only). No states required (stateless component).
- **Forbidden Extensions:** HelperText MUST NOT implement: (1) Validation logic (validation must be external), (2) Error handling (error handling must be external), (3) Required/optional semantics (semantics must be external), (4) Form state awareness (state management must be external), (5) Business logic (pure presentational), (6) Coupling to Field internals (standalone component), (7) New token domains (uses TEXT_TOKENS via Text component), (8) Hardcoded colors or spacing (token-only via Text component).
- **CVA Compliance:** HelperText does not use CVA directly (COMPLIANT per CVA Decision Matrix - component wraps Text component, does not use CVA). Text component uses `cva`, but HelperText does not interact with CVA.
- **Accessibility:** HelperText uses native HTML `<p>` element by default (semantic HTML). Supports aria-describedby, aria-label, aria-labelledby via Text props. No redundant ARIA needed (uses native HTML semantics).
- **Architectural Constraints:** HelperText MUST remain a thin wrapper over Text component. HelperText MUST provide sensible defaults (size="sm", tone="muted", as="p"). HelperText MUST be standalone (not tied to Field composition). HelperText MUST use token-only styling (via Text component). Foundation Enforcement: className and style excluded from public API.

#### ErrorText
- **Location:** `src/PRIMITIVES/ErrorText/`
- **Export Path:** `@tenerife.music/ui` → `ErrorText`, `ErrorTextProps`
- **Base Library:** Native `<p>` element (via Text component wrapper)
- **Canonical Role:** **FOUNDATION_PRIMITIVE_FORM_ERROR_MESSAGE** - Presentational error message primitive for form validation feedback. Provides accessible error messaging with role="alert" and aria-live="polite" for screen reader announcements. ErrorText is standalone (not tied to Field composition) and purely presentational.
- **Purpose:** Sole error message foundation. All standalone error messages (outside Field composition) must use this component. ErrorText provides destructive color styling and ARIA attributes (role="alert", aria-live="polite") for screen reader announcements. ErrorText is accessible via aria-describedby linking from form controls.
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2026-01-02
- **Pipeline:** Pipeline 18A (Steps 0-12 complete)
- **Audit Report:** `docs/reports/audit/ERRORTEXT_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Foundation Layer Primitive - Form Input)
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2026-01-02
- **Scope:** Public API (children, id, asChild props), behavior (thin wrapper over Text component with destructive styling and ARIA attributes), ARIA attributes (role="alert", aria-live="polite")
- **STATE_MATRIX Binding:** ErrorText is non-interactive (presentational only). No states required (stateless component).
- **Forbidden Extensions:** ErrorText MUST NOT implement: (1) Validation logic (validation must be external), (2) Error handling (error handling must be external), (3) Form state management (state management must be external), (4) Business logic (pure presentational), (5) Coupling to Field internals (standalone component), (6) New token domains (uses TEXT_TOKENS via Text component, uses text-destructive semantic color token), (7) Hardcoded colors or spacing (token-only via Text component and semantic color tokens).
- **CVA Compliance:** ErrorText does not use CVA directly (COMPLIANT per CVA Decision Matrix - component wraps Text component, does not use CVA). Text component uses `cva`, but ErrorText does not interact with CVA.
- **Accessibility:** ErrorText uses native HTML `<p>` element (semantic HTML). Applies role="alert" and aria-live="polite" for screen reader announcements. Supports aria-describedby linking via id prop. WCAG 2.1 Level AA compliance validated: 1.3.1, 2.4.7, 4.1.2, 4.1.3.
- **Architectural Constraints:** ErrorText MUST remain a thin wrapper over Text component. ErrorText MUST provide destructive color styling (text-destructive token). ErrorText MUST apply ARIA attributes (role="alert", aria-live="polite"). ErrorText MUST be standalone (not tied to Field composition). ErrorText MUST use token-only styling (via Text component and semantic color tokens). Foundation Enforcement: className and style excluded from public API.

#### Tabs
- **Location:** `src/COMPOSITION/navigation/tabs/`
- **Export Path:** `@tenerife.music/ui` (when promoted to index exports) → `Tabs` (compound component with Root, List, Trigger, Content), `TabsRootProps`, `TabsListProps`, `TabsTriggerProps`, `TabsContentProps`, etc.
- **Base Library:** Radix UI Tabs (`@radix-ui/react-tabs`)
- **Purpose:** Sole tab-based navigation foundation. All tab-based content organization must use this component. Tabs provides a compound component API (Root, List, Trigger, Content) for flexible composition while maintaining consistent token-driven styling and Radix-powered accessibility. Tabs delegates all interaction logic (keyboard navigation, focus management, ARIA, activation mode) to Radix primitive.
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-25 (First Pass), 2025-12-25 (Second Pass), 2025-12-27 (Third Pass)
- **Pipeline:** Pipeline 18A (Steps 0-12 complete, Third Pass 2025-12-27)
- **Audit Report:** `docs/reports/audit/TABS_BASELINE_REPORT.md`
- **Lock Type:** PROCESS LOCK (COMPOSITION Layer - Navigation)
- **Migration Complete:** Tabs has completed canonical Foundation Step Pipeline (Steps 0-12) three times and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements. Third pass completed 2025-12-27 with all compliance verified, no issues found.
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2025-12-25
- **Lifecycle Version:** 1.0 (Pipeline 18A Steps 0-12)
- **Scope:** Public API (compound component with 4 subcomponents: Root, List, Trigger, Content), tokens (TABS_TOKENS), behavior (Radix-delegated interaction, keyboard navigation, focus management, activation mode: automatic/manual), variants (size: sm, md, lg; variant: default, outline, underline; tone: neutral, primary, success, warning, danger; orientation: horizontal, vertical)
- **CVA Compliance:** Tabs uses `tokenCVA` (COMPLIANT per CVA Decision Matrix RULE 1 - component has token-driven visual axes: variant, size, tone, state). All three CVA instances (tabsListVariants, tabsTriggerVariants, tabsContentVariants) migrated from `cva` to `tokenCVA` during Pipeline 18A STEP 9 with `satisfies Record<Type, string>` type constraints.
- **Accessibility:** Tabs uses Radix Tabs primitive which provides comprehensive WCAG 2.1 Level AA compliance: ARIA roles (tablist, tab, tabpanel), keyboard navigation (Arrow keys, Home, End, Tab), focus management (roving tabindex, focus restoration), screen reader support (selected state announcement, panel association). Component integration preserves all Radix A11Y features. Activation mode (automatic/manual) supported via Radix `activationMode` prop.
- **Architectural Constraints:** Tabs MUST delegate all interaction logic to Radix (no custom keyboard/mouse handlers). Tabs MUST use token-driven styling (TABS_TOKENS) for all visual properties. Tabs is compound component with 4 subcomponents exposing Radix primitives. Size scale: sm, md, lg (standard interactive scale). Variant scale: default, outline, underline (visual style). Tone scale: neutral, primary, success, warning, danger (semantic color). Orientation: horizontal, vertical (layout direction).
- **Storybook Coverage:** Existing stories (Default, Sizes, Variants, Tones, DisabledTab, Controlled, Vertical, LongLabels, ManualActivation, WithIcons, VariantSizeMatrix, ControlledVsUncontrolled). Note: Canonical story names (Matrix, States, SizesGallery) deferred per STEP 10 audit.
- **Test Coverage:** 10 tests passing (rendering, default values, ref forwarding, keyboard navigation, accessibility: tablist role, aria-selected, controlled mode).
- **Previous Status:** LEGACY UNLOCKED (Pending Canonical Lock) - Explicitly unlocked to allow canonical Foundation lock process per user request.
- **Lock Justification:** Tabs has completed Pipeline 18A (Steps 0-12) with all BLOCKER issues resolved (CVA migration from `cva` to `tokenCVA` in STEP 9). Component demonstrates full compliance with CVA Canonical Style, and all Authority Contracts. A11Y validated via Radix integration. Ready for Foundation lock.

#### Label
- **Location:** `src/PRIMITIVES/Label/`
- **Export Path:** `@tenerife.music/ui` → `Label`, `LabelProps`
- **Base Library:** Radix UI Label (`@radix-ui/react-label`)
- **Purpose:** Sole form label foundation primitive. Provides semantic association between label text and form control via native `<label>` element. Label supports required asterisk indicator and peer-disabled styling pattern for visual feedback when associated input is disabled. Label is a non-interactive primitive that renders semantic HTML label element with token-driven typography styling.
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-25
- **Pipeline:** Pipeline 18A (Steps 0-12 complete)
- **Audit Report:** `docs/reports/audit/LABEL_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Foundation Layer Primitive - Form Input)
- **Migration Complete:** Label has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2025-12-25
- **Lifecycle Version:** 1.0 (Pipeline 18A Steps 0-12)
- **Scope:** Public API (`required?: boolean` prop, all Radix Label props except className/style), tokens (TEXT_TOKENS for typography, FORM_TOKENS for required mark, semantic spacing for margin), behavior (label-input association via htmlFor, peer-disabled visual feedback), no size/variant props (fixed typography appropriate for form labels)
- **CVA Compliance:** Label does NOT use CVA (plain className string). Rationale: Label has no variant/size/state axes, fixed styling only. CVA wrapper removed in STEP 9 (simplified from empty CVA to plain string). Decision Matrix: N/A (no CVA needed for presentational component with fixed styling).
- **State Model:** Label is non-interactive (no states). peer-disabled pattern is CSS-only visual feedback based on sibling input's disabled state, not a component state. No JavaScript state management required.
- **Foundation Enforcement:** Label excludes `className` and `style` props from public API per Foundation Enforcement rules. Component uses token-driven styling only (TEXT_TOKENS, FORM_TOKENS, semantic spacing).
- **Accessibility:** Label uses native `<label>` element (implicit label role) via Radix Label primitive. Proper label-input association via `htmlFor` prop. Required asterisk is visible text content (screen readers announce asterisk). WCAG 2.1 Level AA compliant (1.3.1, 2.4.6, 3.3.2, 4.1.2). Note: Semantic "required" indication should be on input element (`aria-required` or `required` attribute), Label provides visual indication only.
- **Architectural Constraints:** Label MUST use native `<label>` element (via Radix Label primitive). Label MUST use fixed typography (no size prop - form labels should be consistent). Label MUST use token-driven styling only (TEXT_TOKENS, FORM_TOKENS). Label MUST NOT expose size/variant props (form semantics require fixed styling). Foundation Enforcement: className and style excluded from public API.
- **Storybook Coverage:** 7 stories: Default (basic usage), Required (with asterisk), WithInput (peer-disabled demonstration), LongContent (text wrapping), ComplexChildren (nested elements), FormLayout (realistic form usage), Accessibility (A11Y patterns). Note: Matrix/States/SizesGallery stories NOT REQUIRED per VARIANTS_SIZE_CANON.md (Label has no size/variant props, non-interactive).
- **Test Coverage:** 31 tests passing (9 suites): rendering (4 tests), required mark (5 tests), HTML attributes (4 tests), Foundation Enforcement (3 tests), peer-disabled styling (2 tests), accessibility (5 tests), edge cases (5 tests), type safety (1 test), Radix integration (2 tests). Comprehensive coverage of all public behavior, edge cases, and accessibility.
- **Pipeline 18A Changes:**
  - CVA simplification: Removed CVA wrapper (empty CVA with no variants), converted to plain className string
  - Type system: Removed `VariantProps<typeof labelVariants>` from LabelProps interface (CVA removed)
  - Exports cleanup: Removed `labelVariants` export (internal implementation detail removed)
  - Code quality: Simplified code structure (removed unnecessary abstraction)
- **Foundation Rule Compliance:** Label follows Foundation rule for form primitives (fixed typography, no size/variant props). Label correctly uses Radix Label primitive for cross-framework compatibility. Label correctly excludes className/style from public API. Label correctly uses token-driven styling only.

#### Modal
- **Location:** `src/COMPOSITION/overlays/Modal/`
- **Export Path:** `@tenerife.music/ui` → `Modal` (compound component with Root, Trigger, Overlay, Content, Header, Title, Description, Footer, Close), `ModalRootProps`, `ModalTriggerProps`, `ModalOverlayProps`, `ModalContentProps`, `ModalHeaderProps`, `ModalTitleProps`, `ModalDescriptionProps`, `ModalFooterProps`, `ModalCloseProps`, `ModalSize`
- **Base Library:** Radix UI Dialog (`@radix-ui/react-dialog`)
- **Purpose:** Sole modal dialog foundation. All modal dialogs (overlays that require user interaction) must use this component. Modal provides a compound component API (Root, Trigger, Overlay, Content, Header, Title, Description, Footer, Close) for flexible composition while maintaining consistent token-driven styling and Radix-powered accessibility. Modal delegates all interaction logic (keyboard navigation, focus management, ARIA, scroll locking) to Radix primitive.
- **Status:** ✅ **PROCESS LOCKED**
- **Lock Date:** 2025-12-25
- **Pipeline:** Pipeline 18A (Steps 0-12 complete)
- **Audit Report:** `docs/reports/audit/MODAL_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Foundation Layer Overlay - Modal Dialog)
- **Migration Complete:** Modal has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2025-12-25
- **Lifecycle Version:** 1.0 (Pipeline 18A Steps 0-12)
- **Scope:** Public API (compound component with 9 subcomponents), tokens (MODAL_TOKENS), behavior (Radix-delegated interaction, keyboard navigation, focus management, scroll locking), variants (size: sm, md, lg, xl; width, height, padding, radius, surface via responsive props)
- **CVA Compliance:** Modal uses `tokenCVA` (COMPLIANT per CVA Decision Matrix RULE 1 - component has token-driven visual axes). All CVA instances migrated from `cva` to `tokenCVA` during Pipeline 18A STEP 9.
- **Accessibility:** Modal uses Radix Dialog primitive which provides comprehensive WCAG 2.1 Level AA compliance: ARIA roles (dialog), keyboard navigation (Escape key, Tab, focus trap), focus management (focus restoration, focus trap), screen reader support (title/description announcement). Component integration preserves all Radix A11Y features.
- **Architectural Constraints:** Modal MUST delegate all interaction logic to Radix (no custom keyboard/mouse handlers). Modal MUST use token-driven styling (MODAL_TOKENS) for all visual properties. Modal is compound component with 9 subcomponents exposing Radix primitives. Size scale: sm, md, lg, xl (overlay size scale).

#### ContextMenu
- **Location:** `src/COMPOSITION/overlays/ContextMenu/`
- **Export Path:** `@tenerife.music/ui` → `ContextMenu` (compound component with Root, Trigger, Content, Item, CheckboxItem, RadioGroup, RadioItem, Separator, Label, Sub, SubTrigger, SubContent), `ContextMenuRootProps`, `ContextMenuTriggerProps`, `ContextMenuContentProps`, `ContextMenuItemProps`, etc.
- **Base Library:** Radix UI ContextMenu (`@radix-ui/react-context-menu`)
- **Purpose:** Sole context menu foundation. All right-click context menus must use this component. ContextMenu provides a compound component API (Root, Trigger, Content, Item, CheckboxItem, RadioGroup, RadioItem, Separator, Label, Sub, SubTrigger, SubContent) for flexible composition while maintaining consistent token-driven styling and Radix-powered accessibility. ContextMenu delegates all interaction logic (right-click detection, keyboard navigation, focus management, ARIA) to Radix primitive.
- **Status:** ✅ **PROCESS LOCKED**
- **Lock Date:** 2025-12-25
- **Pipeline:** Pipeline 18A (Steps 0-12 complete)
- **Audit Report:** `docs/reports/audit/CONTEXTMENU_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Foundation Layer Overlay - Context Menu)
- **Migration Complete:** ContextMenu has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2025-12-25
- **Lifecycle Version:** 1.0 (Pipeline 18A Steps 0-12)
- **Scope:** Public API (compound component with 12 subcomponents), tokens (CONTEXT_MENU_TOKENS), behavior (Radix-delegated interaction, keyboard navigation, focus management), variants (size: sm, md, lg; width: auto, sm, md, lg, xl; tone: neutral, primary, destructive; padding, radius, surface via responsive props)
- **CVA Compliance:** ContextMenu uses `tokenCVA` (COMPLIANT per CVA Decision Matrix RULE 1 - component has token-driven visual axes). All CVA instances migrated from `cva` to `tokenCVA` during Pipeline 18A STEP 9.
- **Accessibility:** ContextMenu uses Radix ContextMenu primitive which provides comprehensive WCAG 2.1 Level AA compliance: ARIA roles (menu, menuitem, menuitemcheckbox, menuitemradio), keyboard navigation (Arrow keys, Home, End, Enter, Escape), focus management (focus trap, restoration), screen reader support (state announcement, menu association). Component integration preserves all Radix A11Y features.
- **Architectural Constraints:** ContextMenu MUST delegate all interaction logic to Radix (no custom keyboard/mouse handlers). ContextMenu MUST use token-driven styling (CONTEXT_MENU_TOKENS) for all visual properties. ContextMenu is compound component with 12 subcomponents exposing Radix primitives. Size scale: sm, md, lg (overlay size scale).

#### Toast
- **Location:** `src/COMPOSITION/overlays/Toast.tsx`
- **Export Path:** `@tenerife.music/ui` → `Toast` (compound component with Root, Title, Description, Action, Close), `ToastRoot`, `ToastProvider`, `ToastViewport`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`, `ToastRootProps`, `ToastProviderProps`, `ToastViewportProps`, `ToastTitleProps`, `ToastDescriptionProps`, `ToastActionProps`, `ToastCloseProps`
- **Base Library:** Radix UI Toast (`@radix-ui/react-toast`)
- **Purpose:** Sole toast notification foundation. All toast notifications (temporary, non-blocking messages) must use this component. Toast provides a compound component API (Root, Title, Description, Action, Close) and provider/viewport pattern for flexible composition while maintaining consistent token-driven styling and Radix-powered accessibility. Toast delegates all interaction logic (keyboard navigation, focus management, ARIA, swipe gestures) to Radix primitive.
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-26
- **Pipeline:** Pipeline 18A (Steps 0-12 complete)
- **Audit Report:** `docs/reports/audit/TOAST_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK (Foundation Layer Overlay - Toast Notification)
- **Migration Complete:** Toast has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
- **Rule:** Future structural modifications require re-entry into Pipeline 18A
- **Implementation Date:** 2025-12-26
- **Lifecycle Version:** 1.0 (Pipeline 18A Steps 0-12)
- **Scope:** Public API (compound component with 5 subcomponents, Provider, Viewport), tokens (TOAST_TOKENS), behavior (Radix-delegated interaction, keyboard navigation, focus management, swipe gestures), variants (variant: default, success, warning, danger, info)
- **CVA Compliance:** Toast uses `tokenCVA` (COMPLIANT per CVA Decision Matrix RULE 1 - component has token-driven visual axes). All CVA instances use `tokenCVA` with token-driven variants.
- **Accessibility:** Toast uses Radix Toast primitive which provides comprehensive WCAG 2.1 Level AA compliance: ARIA roles (region, status), keyboard navigation (Escape key), focus management (focus restoration), screen reader support (announcement, live region). Component integration preserves all Radix A11Y features.
- **Architectural Constraints:** Toast MUST delegate all interaction logic to Radix (no custom keyboard/mouse handlers). Toast MUST use token-driven styling (TOAST_TOKENS) for all visual properties. Toast is compound component with 5 subcomponents exposing Radix primitives. ToastProvider provides imperative API (useToast hook) for Extension layer composition.

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

Foundation Components:
- Button (Native button element) - ✅ **FINAL LOCK** (2025-12-25)
- Link (Native anchor element) - ✅ **LOCKED** (2025-12-25)
- Text (Polymorphic typographic primitive) - ✅ **LOCKED** (2025-12-26)  
  - Text is a strict typographic primitive responsible only for rendering styled text using design tokens. It does not perform content processing, truncation, or rich formatting. Supports polymorphic `as` prop (span, p, label, strong, em) and `tone` prop (default, muted).

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

Foundation components (Button, Link) follow canonical architectural patterns. Token system, Interaction Authority, Foundation Enforcement, and Interactive Size Scale Authority define architectural contracts.

**FOUNDATION COMPONENTS (Button, Link, Text, Input):**
These components follow Foundation patterns:
- Token-driven APIs
- Canonical CVA patterns
- Authority Contract compliance
- Foundation Enforcement (className/style excluded)

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
- Reference: docs/architecture/TOKEN_AUTHORITY.md
- Reference: docs_archive/reports/archive/archive/reports/other/TUI_TOKEN_DOMAINS_FINAL_REPORT.md (Note: File location may vary, check docs_archive)

If Interaction Authority modifications are needed:
- Interaction Authority modifications require explicit UNLOCK + AUDIT workflow
- Reference: docs/architecture/INTERACTION_AUTHORITY.md
- Reference: docs/architecture/INTERACTION_AUTHORITY_AUDIT.md
- Reference: docs/architecture/INTERACTION_AUTHORITY_GUARD_LAYER.md
- Reference: docs/architecture/INTERACTION_AUTHORITY_HOVER_VERIFICATION.md

If State Authority Matrix modifications are needed:
- State Authority Matrix modifications require explicit UNLOCK + AUDIT workflow
- Reference: docs/architecture/STATE_MATRIX.md
- Reference: docs/architecture/STATE_AUTHORITY.md
- Reference: docs/architecture/INTERACTION_AUTHORITY.md

If State Authority Contract modifications are needed:
- State Authority Contract modifications require explicit UNLOCK + AUDIT workflow
- Reference: docs/architecture/STATE_AUTHORITY.md
- Reference: docs/architecture/STATE_MATRIX.md
- Reference: docs/architecture/INTERACTION_AUTHORITY.md

If Foundation Enforcement modifications are needed:
- Foundation Enforcement modifications require explicit UNLOCK + AUDIT workflow
- Reference: docs/architecture/FOUNDATION_CONTRACT.md
- Reference: docs/architecture/FOUNDATION_COMPONENT_SCOPE.md
- Reference: docs/architecture/FOUNDATION_LOCK.md (Foundation Enforcement Lock Status section)
- Reference: docs/reports/TUI_PHASE_3_FOUNDATION_LOCK_ENFORCEMENT_REPORT.md
- Reference: docs/reports/TUI_PHASE_4_FOUNDATION_REGRESSION_GUARDS_REPORT.md

If Interactive Size Scale Authority modifications are needed:
- Interactive Size Scale Authority modifications require explicit UNLOCK + AUDIT workflow
- Reference: docs/architecture/INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md
- Reference: docs/architecture/FOUNDATION_LOCK.md (Interactive Size Scale Authority Lock Status section)
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

**Status:** ? **LOCKED (Foundation Closed)**  
**Finalization Date:** 2026-01-02  
**Architecture Phase:** FOUNDATION **COMPLETE**
**Next Review:** After all primitives reach canonical form

**Note:** Foundation layer is closed and finalized. Changes require explicit unlock procedure with audit and approval.

### Component Lock Status

| Component       | Status    | Implementation Date | Notes |
| --------------- | --------- | -------------------- | ----- |
| Button          | ✅ **FINAL LOCK** | 2025-12-25 | Pipeline 18A Complete |
| Link            | ✅ **LOCKED** | 2025-12-25 | Pipeline 18A Complete |
| Text            | ✅ **LOCKED** | 2025-12-26 | Pipeline 18A Refactor Complete (polymorphic as prop, tone union type) |
| Input           | ✅ **LOCKED** | 2025-12-26 | Pipeline 18A Refactor Cycle 2 Complete |
| Heading         | ✅ **LOCKED** | 2025-12-25 | Pipeline 18A Complete |
| Select          | ✅ **LOCKED** | 2025-12-26 | Pipeline 18A Refactor Complete (Token Migration & API Simplification) |
| Label           | ✅ **LOCKED** | 2025-12-25 | Pipeline 18A Complete |
| Icon            | ✅ **LOCKED** | 2025-12-25 | Pipeline 18A Complete |
| Radio           | ✅ **LOCKED** | 2025-12-25 | Pipeline 18A Re-run Complete |
| Switch          | ✅ **LOCKED** | 2025-12-25 | Pipeline 18A Re-run Complete |
| Textarea        | ✅ **LOCKED** | 2025-12-26 | Pipeline 18A Complete, Strict Primitive Refactor |
| IconButton      | ✅ **LOCKED** | 2026-01-02 | Pipeline 18A Complete |
| FormGroup       | ✅ **LOCKED** | 2026-01-02 | Pipeline 18A Complete |
| HelperText      | ✅ **LOCKED** | 2026-01-02 | Pipeline 18A Complete |
| ErrorText       | ✅ **LOCKED** | 2026-01-02 | Pipeline 18A Complete |
| Tabs            | ✅ **LOCKED** | 2025-12-25 | Pipeline 18A Complete |
| Modal           | ✅ **PROCESS LOCKED** | 2025-12-25 | Pipeline 18A Complete |
| ContextMenu     | ✅ **PROCESS LOCKED** | 2025-12-25 | Pipeline 18A Complete |
| Toast           | ✅ **LOCKED** | 2025-12-26 | Pipeline 18A Complete |

### Extension Layer Status

**Status:** ✅ **OPEN** (Extension development is allowed)  
**Authority Contract:** [Extension Authority Contract](./EXTENSION_AUTHORITY.md)

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

### Historical Foundation Unlock Declaration (Superseded)

**This unlock declaration is historical and superseded by finalization on 2026-01-02.**

- Historical record only. Foundation is **CLOSED** (Finalized)
- ⚠️ Foundation architecture phase is **IN PROGRESS**
- ✅ Missing primitives can be added (Text, Input, Textarea, Link, Toast renderer, Modal)
- ✅ Existing Foundation primitives can be refactored to reach canonical form
- ✅ APIs can be adjusted to remove architectural mistakes
- ✅ Missing contracts required by higher layers can be added
- ❌ Business logic addition is **FORBIDDEN**
- ❌ Framework-specific dependencies addition is **FORBIDDEN**
- ❌ Convenience APIs addition is **FORBIDDEN**
- ❌ Domain or navigation patterns addition is **FORBIDDEN**
- ❌ Composition-level components addition is **FORBIDDEN**
- ✅ This document is the **authoritative source of truth** for Foundation architecture

**Foundation layer is finalized; any changes require explicit unlock procedure.**

---

## 🔒 LOCK CHECKLIST (Mandatory)

**This checklist MUST be completed before any Foundation Authority domain can be locked. Locking is BLOCKED if any item fails.**

- [ ] All Authority documents are declarative only (no tests, storybook steps, or implementation details)
- [ ] Enforcement content exists outside Authority docs (Authority docs only reference enforcement docs)
- [ ] All token authorities (Spacing, Typography, Radius, Motion, Elevation) have Canonical Scale Tables
- [ ] All token authorities have Allowed Usage Patterns sections (3-6 bullet points)
- [ ] All token authorities have Forbidden Patterns sections (minimum 5 examples each)
- [ ] STATE_AUTHORITY.md has State Taxonomy section (Interaction vs Semantic/UI states)
- [ ] STATE_AUTHORITY.md has State Legality Matrix (component vs state compatibility)
- [ ] STATE_AUTHORITY.md has explicit State Precedence Rules (ordering and suppression)
- [ ] INTERACTION_AUTHORITY.md has Separation Law section (Interaction vs State Authority boundaries)
- [ ] No raw Tailwind examples in Allowed Patterns (raw Tailwind only appears in Forbidden Patterns)
- [ ] All boundary and precedence rules are explicit and unambiguous
- [ ] All Authority documents reference enforcement docs (do not include enforcement content)

**Rule:** If any checklist item is not satisfied, the Foundation Authority domain cannot be locked. All items must be verified and checked before proceeding with lock.

**Note:** This checklist is for locking **Foundation Authority domains** (Interaction, State, Spacing, Radius, Typography, Motion, Elevation, Layout). For creating or refactoring **Foundation components** (Modal, Tabs, Select, ContextMenu, Toast), see the canonical lifecycle defined in [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) (Section 10: Foundation Component Creation & Refactor Route — Canonical Lifecycle). For human-readable navigation to the lifecycle process, see [FOUNDATION_LIFECYCLE_PROCESS_INDEX.md](./FOUNDATION_LIFECYCLE_PROCESS_INDEX.md).

---

## 🔒 Token System Lock Status

**Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-13  
**Reference:** [Token System Documentation](./TOKEN_AUTHORITY.md)  
**Final Audit:** [Token Domains Final Report](../../../docs_archive/reports/archive/archive/reports/other/TUI_TOKEN_DOMAINS_FINAL_REPORT.md) - **FINAL VERDICT: OK** (Note: File may be in docs_archive)

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

## 🔒 TM-Only Runtime Lock

**Status:** ✅ **LOCKED**  
**Scope:** Runtime CSS variable model, theme injection, token runtime contract  
**Authority:** REQUIRED_THEME_TOKENS (`src/FOUNDATION/tokens/required-tokens.ts`)

**Verification:** `docs/reports/TM_ONLY_RUNTIME_VERIFICATION_003.md`  
**Runtime Evidence:**  
- `docs/reports/runtime-css-vars.snapshot.txt` (Day)  
- `docs/reports/runtime-css-vars.night.snapshot.txt` (Night)  
- `docs/reports/runtime-css-vars.check.txt` (legacy/missing/empty verification)  
- `docs/reports/runtime-css-vars.diff.txt` (Day ↔ Night diff)  
- `docs/reports/a11y-contrast.output.txt` (A11Y contrast stdout+stderr)

**Accepted A11Y Exception:** `night:button.destructive.disabled` (contrast 4.39:1, see `docs/architecture/locks/A11Y_LOCK.md`)

**Enforcement:** ESLint rule `tm/no-legacy-css-vars` (P0, error, **ENFORCED_STRICT**)
**Detection Contract:** только реальные `var(--x)` usage для цветов; unknown prefix suffix → error without autofix
**Scope Clarification:** strict tm-only enforcement применяется **только к color vars**. Non-color vars (spacing/radius/layout/radix/implementation) временно разрешены и не являются каноничными.

### Rules (Binding)

1. **Единственный допустимый runtime contract:** `--tm-*`
2. **REQUIRED_THEME_TOKENS = runtime truth** (полный и единственный список обязательных color/runtime токенов)
3. **Запрещены legacy vars** (`--background`, `--muted`, `--destructive`, `--surface-*`, `--text-*`, `--border`, `--input`, `--ring`, и аналоги)
4. **Запрещены alias bridge и fallback mapping** (любые параллельные token-каналы)
5. **Изменения runtime tokens** допускаются только через новый TUNG + verification + lock update

### Locked Subjects

- Runtime CSS variable model
- Theme injection (`applyMode.ts`)
- `colors.ts` adapter contract (tm-only)
- Global CSS token usage (tm-only)

### Color Token Re-lock (Calibration)

**Status:** ✅ **LOCKED (RE-LOCKED)**  
**Scope:** colors / a11y  
**Reason:** WCAG 2.1 AA alignment after secondary + disabled calibration  
**TUNG:** TUI_TOKENS_COLOR_021, TUI_TOKENS_COLOR_022, TUI_TOKENS_COLOR_023, TUI_TOKENS_A11Y_024  
**Lock task:** TUI_TOKENS_LOCK_025  
**Statement:** Color token calibration completed. All A11Y contrast checks pass without exceptions.

---

## 🔒 LOCK: Runtime Utilities Are Private (TUNG-028)

**Status:** ✅ **LOCKED**  
**Scope:** Runtime utilities (`tokenCVA`, `cn`) import boundaries  
**Task:** TUNG-028

**Invariant**  
Runtime utilities (`tokenCVA`, `cn`) are **private Foundation implementation details**.

**Rules**
- MUST NOT be imported from `@/index`
- MUST NOT be exported via `@/index`
- MUST be imported directly from:
  - `@/FOUNDATION/lib/token-cva`
  - `@/FOUNDATION/lib/utils`

**Rationale**
- Prevent SSR / test runtime cycles
- Keep `@/index` as public API only
- Avoid import oscillation and auto-rewrites

**Enforcement**
- ESLint rule: `no-runtime-utils-from-index`
- Scope: `DOMAIN/**`, `PATTERNS/**`

**Status**: LOCKED  
**Introduced by**: TUNG-028

---

## 🔒 TYPOGRAPHY (FULL LOCK)

**Status:** ✅ **LOCKED (ENFORCED)**

**Scope:**
- Typography tokens: `src/FOUNDATION/tokens/typography.ts` (fontSizes, lineHeights, letterSpacings, fontFamilies, textStyles)
- Text color roles (TYPOGRAPHY_COLOR_POLICY_v1)
- Line-height and rhythm (TYPOGRAPHY_RHYTHM_POLICY_v1)
- Paragraph spacing (container-applied, not on text components)
- Components (API locked): Text, Heading, and any future text-primitive

**Authority:**
- `docs/architecture/typography/TYPOGRAPHY_COLOR_POLICY_v1.md`
- `docs/architecture/typography/TYPOGRAPHY_RHYTHM_POLICY_v1.md`

**Tasks (TUNG):**
- TUI_FOUNDATION_TYPOGRAPHY_COLOR_POLICY_V1_020
- TUI_FOUNDATION_TYPOGRAPHY_RHYTHM_POLICY_V1_001, TUI_FOUNDATION_TYPOGRAPHY_RHYTHM_POLICY_V1_002
- TUI_FOUNDATION_TYPOGRAPHY_RHYTHM_ENFORCEMENT_V1_003
  - 003A: line-height enforcement
  - 003B: leading-* enforcement
  - 003C: paragraph margin enforcement

**Rules (Binding) — Color:**
1. Text colors must use canonical roles (`primary`, `secondary`, `tertiary`, `muted`, `inverse`, `disabled`, `status`)
2. Status colors are restricted to explicit status messaging only
3. Readable roles forbid muted/tertiary (use `secondary` or `meta`)
4. No arbitrary text colors (no custom CSS vars or raw colors)
5. Text and Heading do not accept arbitrary colors; only semantic color roles; inline `style.color` is forbidden

**Rules (Binding) — Rhythm:**
1. Line-height must use canonical tokens (`none`, `tight`, `snug`, `normal`, `relaxed`, `loose`)
2. Each typography role has a canonical line-height (defined in rhythm policy)
3. Raw line-height values are forbidden (no numeric values, rem/px values, or inline styles)
4. No per-component line-height decisions (line-height comes from role policy)
5. Rhythm is token-defined only (no theme overrides, no component overrides)
6. No inline or Tailwind rhythm overrides on text components
7. Paragraph rhythm is container-applied via role context (e.g. Box, Stack), not directly on text components
8. Text and Heading do not accept `margin`, `gap`, `leading`, or custom `lineHeight` props; TextProps and HeadingProps do not expose `lineHeight`, `leading`, or `margin`

**Rationale:**
- Typography color and rhythm are part of visual hierarchy, vertical rhythm, and accessibility
- Color and line-height selection must be a consequence of role, not an ad-hoc decision
- Consistent vertical rhythm requires role-based line-height and container-applied paragraph spacing

**Enforcement:**
- ESLint: `typography-color-policy`, `typography-rhythm-policy`, `no-raw-line-height`, `no-raw-line-height-scale`, `no-leading-tailwind`, `no-text-margin-spacing`
- Type system: `typographyRhythmPolicy` in `src/FOUNDATION/tokens/typography.ts`; Text and Heading derive line-height from `textStyles` (role-based)
- Component API: Text and Heading restrictions (no `lineHeight`, `leading`, `margin`, `style.color`, `style.lineHeight`)

**Forbidden (no exceptions):**
- Any changes to: fontSizes, lineHeights, letterSpacings; allowed color roles; Text/Heading behavior; ESLint rule permissions
- `style={{ color }}`, `style={{ lineHeight }}`
- Tailwind `leading-*` on typography
- margin-top / margin-bottom on text components
- Any "exceptions for a specific case"

**Allowed (only via Foundation TUNG):**
- New text size, new line-height, new color role — only via new TUNG, with policy + enforcement update; no hotfixes

**Change Control:** Any modification requires a new Foundation TUNG.

---

## 🔒 Interaction Authority Lock Status

**Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-16  
**Version:** 1.1  
**Reference:** [Interaction Authority Contract](./INTERACTION_AUTHORITY.md)  
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

- `docs/architecture/INTERACTION_AUTHORITY.md` - Canonical contract definition
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
**Reference:** Button CVA Enforcement (document archived)  
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
**Reference:** [State Authority Matrix](./STATE_MATRIX.md)  
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

- `docs/architecture/STATE_MATRIX.md` - Canonical state matrix definition (WHAT states exist)
- `docs/architecture/STATE_AUTHORITY.md` - State token model (HOW states are represented)
- `docs/architecture/INTERACTION_AUTHORITY.md` - State activation rules (WHEN states activate)
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
**Reference:** [State Authority Contract](./STATE_AUTHORITY.md)

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

- `docs/architecture/STATE_AUTHORITY.md` - Canonical state token model (HOW layer)
- `docs/architecture/STATE_MATRIX.md` - Canonical state set (WHAT layer, complementary)
- `docs/architecture/INTERACTION_AUTHORITY.md` - State activation rules (WHEN layer, complementary)

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
**Reference:** [Spacing Authority Contract](./SPACING_AUTHORITY.md)

The **Spacing Authority** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All spacing token rules, canonical scales, and component requirements are frozen.

### What Is Locked in Spacing Authority

1. **Canonical Token Scale** - Base spacing scale (8px grid), semantic spacing, layout spacing are immutable
2. **Component Rules** - Token-only spacing, grid system compliance, semantic preference rules are immutable
3. **Forbidden Patterns** - Arbitrary spacing values, component-specific scales, grid violations are immutable
4. **Semantic Mapping** - Layout pattern mapping rules are immutable

### Spacing Authority Contract Documents

The following documents are part of the locked Spacing Authority:

- `docs/architecture/SPACING_AUTHORITY.md` - Canonical spacing contract definition

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
**Reference:** [Radius Authority Contract](./RADIUS_AUTHORITY.md)

The **Radius Authority** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All border radius token rules, canonical scales, and component standards are frozen.

### What Is Locked in Radius Authority

1. **Canonical Token Scale** - Base radius scale (none, xs, sm, md, lg, xl, 2xl, 3xl, full) is immutable
2. **Component Standards** - Component-specific radius standards (button, card, input, badge, etc.) are immutable
3. **Component Rules** - Token-only radius, scale system compliance, component standard preference rules are immutable
4. **Forbidden Patterns** - Arbitrary radius values, inline border-radius, component-specific scales are immutable

### Radius Authority Contract Documents

The following documents are part of the locked Radius Authority:

- `docs/architecture/RADIUS_AUTHORITY.md` - Canonical radius contract definition

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
**Reference:** [Typography Authority Contract](./TYPOGRAPHY_AUTHORITY.md)

The **Typography Authority** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All typography token rules, canonical scales, and semantic roles are frozen.

### What Is Locked in Typography Authority

1. **Canonical Token Scale** - Font families, font sizes (fluid), font weights, line heights, letter spacing are immutable
2. **Predefined Text Styles** - Display, heading (h1-h6), body, label, caption styles are immutable
3. **Component Rules** - Token-only typography, semantic role preference, typography hierarchy rules are immutable
4. **Forbidden Patterns** - Arbitrary typography values, component-specific scales, hierarchy violations are immutable

### Typography Authority Contract Documents

The following documents are part of the locked Typography Authority:

- `docs/architecture/TYPOGRAPHY_AUTHORITY.md` - Canonical typography contract definition

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
**Reference:** [Motion Authority Contract](./MOTION_AUTHORITY.md)

The **Motion Authority** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All motion token rules, canonical durations, easings, transitions, and animations are frozen.

### What Is Locked in Motion Authority

1. **Canonical Token Scale** - Durations (100ms base unit), easings, transitions, keyframes, animations are immutable
2. **Reduced Motion Support** - Reduced motion tokens and accessibility compliance rules are immutable
3. **Component Rules** - Token-only motion, transition preference, reduced motion compliance rules are immutable
4. **Forbidden Patterns** - Arbitrary motion values, component-specific scales, reduced motion violations are immutable

### Motion Authority Contract Documents

The following documents are part of the locked Motion Authority:

- `docs/architecture/MOTION_AUTHORITY.md` - Canonical motion contract definition

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
**Reference:** [Elevation Authority Contract](./ELEVATION_AUTHORITY.md)

The **Elevation Authority** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All elevation token rules, canonical shadows, z-index scale, and stacking order are frozen.

### What Is Locked in Elevation Authority

1. **Canonical Token Scale** - Elevation shadows, colored shadows, glow effects, focus rings are immutable
2. **Z-Index Scale** - Canonical z-index layers (base, content, dropdown, sticky, overlay, modal, notification, tooltip, maximum) are immutable
3. **Component Rules** - Token-only elevation, shadow preference, z-index layer assignment, stacking order compliance rules are immutable
4. **Forbidden Patterns** - Arbitrary elevation values, component-specific scales, z-index stacking violations are immutable

### Elevation Authority Contract Documents

The following documents are part of the locked Elevation Authority:

- `docs/architecture/ELEVATION_AUTHORITY.md` - Canonical elevation contract definition

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
**Reference:** [Layout Authority Contract](./LAYOUT_AUTHORITY.md)

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

- `docs/architecture/LAYOUT_AUTHORITY.md` - Canonical layout contract definition

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
- Input
- Text
- Checkbox
- Radio (Locked: 2025-12-25, Pipeline 18A Complete)
- Heading
- Textarea (Locked: 2025-12-26, Pipeline 18A Complete, Strict Primitive Refactor - TUNG_TEXTAREA_PRIMITIVE_REFACTOR_FINAL)
- Label

**Proposed Foundation (Subject to Enforcement):**

**Radix-Based Foundation (Subject to Enforcement):**
- Modal
- Tabs
- Select (when locked)
- ContextMenu

**Radix-Based Foundation (LOCKED):**
- Toast (Locked: 2025-12-26, Pipeline 18A Complete, Stateless Refactor - TUNG_TOAST_STATELESS_RENDERER_FINAL)

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

## Foundation Lock Statement (Finalized)

**Date:** 2026-01-02  
**Status:** ? **LOCKED (Foundation Closed)**  
**Phase:** Foundation **COMPLETE (Finalized)**

### Official Unlock Declaration

**This unlock declaration is historical and superseded by finalization on 2026-01-02.**

Foundation layer is finalized; any changes require explicit unlock procedure. Foundation Authorities remain LOCKED and IMMUTABLE, but Foundation layer components can be added, refactored, or adjusted to reach canonical form.

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

### Phase Status

**Foundation Phase:** ? **COMPLETE (Finalized)**  
**Enforcement Phase:** ✅ **OPEN** (Enforcement mechanisms can evolve)  
**Extension Phase:** ✅ **OPEN** (Extension development is allowed)

The Foundation layer is **CLOSED** and finalized. Development must occur in:

- **Foundation Layer** - Completing missing primitives (Text, Input, Textarea, Link, Toast renderer, Modal)
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

### Foundation Change Rules

- ? Changes require explicit unlock approval and audit
- ? Documentation updates are allowed when they do not alter behavior
- ? Type safety improvements are allowed only with unlock approval
- ? New Foundation components without unlock
- ? Breaking API changes without unlock

---

## 📚 Related Documents

- **[Foundation Contract](./FOUNDATION_CONTRACT.md)** — 🔒 **FINAL/APPLIED** Foundation component contract (Foundation Enforcement is LOCKED)
- **[Foundation Component Scope](./FOUNDATION_COMPONENT_SCOPE.md)** — 🔒 **FINAL/APPLIED** Foundation component scope and inclusion criteria
- **[Foundation Lock Operating Rules](./FOUNDATION_LOCK_OPERATING_RULES.md)** — 13-step lifecycle includes mandatory enforcement verification (Steps 7.5 and 7.6)
- **[Architecture Lock](./ARCHITECTURE_LOCK.md)** — Detailed architecture rules and guidelines
- **[Closed System v2 Canon Documentation Lock](./closed-system/CLOSED_SYSTEM_V2_CANON_DOCS_LOCK.md)** — Canon documentation lock declaration (canonical documentation is LOCKED and IMMUTABLE)
- **[Token System](./TOKEN_AUTHORITY.md)** — 🔒 **LOCKED** Token system documentation
- **[UI Architecture Rules](./ARCHITECTURE_RULES.md)** — Radix UI and Token Union rules
- **Component Guidelines** — Component development guidelines (archived; file no longer available)
- **[Cursor UI Rules](./ASSISTANT_DEVELOPMENT_RULES.md)** — Cursor AI development rules
- **Token Domains Final Report** — Final token domain verification (FINAL VERDICT: OK) (archived; file no longer available)
- **[Button CVA Enforcement](../../docs_archive/deprecated/BUTTON_CVA_ENFORCEMENT.md)** — 🔒 **LOCKED** Button CVA enforcement rules (archived)
- **[State Authority Matrix](./STATE_MATRIX.md)** — 🔒 **LOCKED** Universal state model for all interactive components
- **[State Authority Contract](./STATE_AUTHORITY.md)** — 🔒 **LOCKED** State token model (HOW layer) for representing UI component states
- **[Focus Authority](./FOCUS_AUTHORITY.md)** — 🔒 **LOCKED** Focus navigation mechanics (trap, restore, tab order, focus-visible indication)
- **[Focus Lock](./locks/FOCUS_LOCK.v1.1.md)** — 🔒 **LOCKED** Focus system lock status and enforcement
- **[A11Y Authority](./A11Y_AUTHORITY.md)** — 🔒 **LOCKED** Accessibility requirements (semantic roles, aria-* as API, keyboard-only operability, accessible names)
- **[A11Y Lock](./locks/A11Y_LOCK.md)** — 🔒 **LOCKED** A11Y system lock status and enforcement
- **[Input Authority](./INPUT_AUTHORITY.md)** — 🔒 **LOCKED** Input component contract (form controls, validation, keyboard parity)
- **[Input Lock](./locks/INPUT_LOCK.md)** — 🔒 **LOCKED** Input system lock status and enforcement
- **[Extension Authority Contract](./EXTENSION_AUTHORITY.md)** — ✅ **ACTIVE** Extension layer boundary contract
- **[Foundation Lifecycle Process Index](./FOUNDATION_LIFECYCLE_PROCESS_INDEX.md)** — Human-readable navigation to Foundation component creation/refactor lifecycle process
- **[ESLint Setup & Governance](./ESLINT_SETUP.md)** — ESLint as architectural enforcement (governance rules, autofix policy, scope boundaries)
- **[ESLint Rules Scope Matrix](./eslint_rules_scope_matrix.md)** — Canonical scope authority for ESLint rules
- **[Link No AsChild Canonical Anchor](./LINK_NO_ASCHILD_CANONICAL_ANCHOR.md)** — 🔒 **LOCKED** Architectural lock: Link is a first-class semantic anchor; `asChild` pattern is FORBIDDEN

---

## 🔄 Version History

- **v1.28** (2025-12-25): Icon Component Foundation Lock Complete
  - Icon officially locked as Foundation primitive after Pipeline 18A Steps 0-11 completion
  - Lock date: 2025-12-25
  - Audit report: `docs/reports/audit/ICON_BASELINE_REPORT.md`
  - Icon serves as canonical visual primitive for SVG icon rendering
  - Completed formal lock process per Pipeline 18A
  - CVA compliance: Migrated from `cva` to `tokenCVA` (BLOCKER-1 resolved)
  - Type system: Removed CVA type leakage, added type constraints (BLOCKER-2, BLOCKER-3 resolved)
  - Code quality: Improved props destructuring pattern (NON-BLOCKER-1 resolved)
  - Documentation: Added size scale rationale (NON-BLOCKER-2 resolved)
  - Tests: Created Icon.test.tsx with full coverage (265 lines, 10 test suites)
  - Storybook: Added SizesGallery story (REQUIRED), fixed category to Foundation/Primitives/Icon
  - A11Y: Validated A11Y delegation model (Icon delegates A11Y to parent components)
  - Foundation rule compliance: Icon uses visual size scale (sm, md, lg, xl) distinct from interactive scale
  - Added Icon to Locked Foundation Components table
  - Added Icon component details section
  - Updated Version History

- **v1.30** (2025-12-27): Label Component Foundation Lock Documentation Complete
  - Added Label to Locked Foundation Components table (main table)
  - Added Label component details section with full documentation
  - Complete lock propagation verified (FOUNDATION_LOCK.md, PROJECT_PROGRESS.md, audit report)

- **v1.27** (2025-12-25): Label Component Foundation Lock Complete
  - Label officially locked as Foundation primitive after Pipeline 18A Steps 0-12 completion
  - Lock date: 2025-12-25
  - Status: ✅ **LOCKED**
  - Pipeline: Pipeline 18A (Steps 0-12 complete)
  - Audit report: `docs/reports/audit/LABEL_BASELINE_REPORT.md`
  - Label is form label primitive (Radix-based) with required mark support
  - CVA simplification: Removed CVA wrapper (no variants needed), uses plain className string
  - Full compliance with all Authority Contracts verified
  - Tests: 31 tests covering all public behavior, edge cases, and accessibility
  - Storybook: 7 stories demonstrating usage patterns (Default, Required, WithInput, LongContent, ComplexChildren, FormLayout, Accessibility)
  - Accessibility compliance verified (WCAG 2.1 Level AA compliant)
  - Completed formal lock process per Pipeline 18A (Component Review & Improvement Pipeline)
  - Updated Component Lock Status table with LOCKED status
  - Updated all lock documents (FOUNDATION_LOCK.md, ARCHITECTURE_LOCK.md, PROJECT_PROGRESS.md)

- **v1.26** (2025-12-25): Heading Component Foundation Lock Complete
  - Heading officially locked as Foundation primitive after Pipeline 18A Steps 0-11 completion
  - Lock date: 2025-12-25
  - Status: ✅ **LOCKED**
  - Pipeline: Pipeline 18A (Steps 0-11 complete)
  - Audit report: `docs/reports/audit/HEADING_BASELINE_REPORT.md`
  - Heading uses native semantic HTML heading elements (`<h1-h6>`) with token-driven typography styling via TEXT_TOKENS
  - CVA structure validated: `cva` usage is COMPLIANT per CVA Decision Matrix (pure typography primitive)
  - Programmatic compound variant generation documented as architectural exception for maintainability
  - Full compliance with all Authority Contracts verified
  - Matrix story (6 levels × 4 weights grid) and TypographyHierarchy story added to Storybook
  - Accessibility compliance verified (semantic HTML provides document structure and screen reader navigation)
  - Completed formal lock process per Pipeline 18A (Component Review & Improvement Pipeline)
  - Updated Component Lock Status table with LOCKED status
  - Updated all lock documents (FOUNDATION_LOCK.md, ARCHITECTURE_LOCK.md, PROJECT_PROGRESS.md, EXTENSION_STATE.md)

- **v1.28** (2025-12-26): Input Component Primitive Refactor Complete
  - Input refactored to strict low-level form control primitive per architectural canon
  - Lock date: 2025-12-26
  - Status: ✅ **LOCKED**
  - Pipeline: Pipeline 18A Refactor Cycle 2 (Steps 0-12 complete)
  - Audit report: `docs/reports/audit/INPUT_BASELINE_REPORT.md`
  - API simplified: variant, state, iconLeft, iconRight, fullWidth props removed
  - New API: size, invalid props only (native HTML attributes + size + invalid)
  - Input uses native `<input>` element with token-driven styling (size-only CVA)
  - Intentional limitation documented: Input does not handle validation, errors, labels, helper text, or form logic
  - Higher-level composition delegated to FormField or domain-level form abstractions
  - Completed formal lock process per Pipeline 18A (Component Review & Improvement Pipeline)
  - Exception declared per TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md
  - Updated Component Lock Status table with LOCKED status
  - Updated all lock documents (FOUNDATION_LOCK.md, ARCHITECTURE_LOCK.md, PROJECT_PROGRESS.md)

- **v1.25** (2025-12-25): Input Component Foundation Lock Complete
  - Input officially locked as Foundation primitive after Pipeline 18A Steps 0-11 completion
  - Lock date: 2025-12-25
  - Status: ✅ **LOCKED** (superseded by v1.28 refactor)
  - Pipeline: Pipeline 18A (Steps 0-11 complete)
  - Audit report: `docs/reports/audit/INPUT_BASELINE_REPORT.md`
  - Input uses native `<input>` element with token-driven styling
  - Full compliance with all Authority Contracts verified
  - Matrix and SizesGallery stories added to Storybook
  - Accessibility compliance verified (native input provides full accessibility)
  - Completed formal lock process per Pipeline 18A (Component Review & Improvement Pipeline)
  - Updated Component Lock Status table with LOCKED status
  - Updated all lock documents (FOUNDATION_LOCK.md, ARCHITECTURE_LOCK.md, PROJECT_PROGRESS.md, EXTENSION_STATE.md)

- **v1.22** (2025-12-23): Tabs Pipeline 18A Complete
  - Tabs has completed canonical Foundation Step Pipeline (Steps 0–12)
  - Tabs status changed to ✅ Implemented
  - Implementation Date: 2025-12-23
  - Component is in COMPOSITION layer
  - Audit Report: `docs/reports/audit/TABS_BASELINE_REPORT.md`
  - Component demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
  - Future structural modifications require re-entry into Pipeline 18A

- **v1.21** (2025-12-20): Modal Foundation Lock Complete
  - Modal has completed canonical Foundation Step Pipeline (Steps 0–13)
  - Modal status changed to ✅ Implemented
  - Implementation Date: 2025-12-20
  - Implementation Report: `docs/reports/MODAL_FOUNDATION_LOCK_REPORT.md`

- **v1.20** (2025-12-19): Legacy Foundation Components Unlock for Canonical Migration
  - Unlocked Modal, Tabs, ContextMenu, and Toast for canonical migration
  - Changed status to Implemented
  - These components were declared as LOCKED but never passed canonical Foundation Step Pipeline (0–13)
  - Unlock allows refactor strictly via Foundation Step Pipeline
  - Constraints: No public API expansion, no new variants/sizes, no behavior changes outside canonicalization
  - Exit criteria: Complete Steps 0–13, Foundation lock report, Public Type Surface locked, re-marked as FOUNDATION · LOCKED
  - Updated component locations to reflect actual paths (src/COMPOSITION/)
  - Added Legacy Foundation Components section explaining unlock rationale and constraints
  - Updated Guard Prompt to reflect legacy unlock status
  - Annotated component source files with LEGACY FOUNDATION comments
  - Completed formal unlock process per TUNG_FOUNDATION_LEGACY_UNLOCK_01 task

- **v1.20** (2025-12-19): Link No AsChild Canonical Anchor Architectural Lock
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

- **v1.23** (2025-12-25): Button Component Final Lock (Pipeline 18A Complete)
  - Button officially locked as Foundation primitive after Pipeline 18A Steps 0-12 completion
  - Final Lock date: 2025-12-25
  - Status: ✅ **FINAL LOCK**
  - Pipeline: Pipeline 18A (Steps 0-12 complete)
  - Lock report: `docs/reports/BUTTON_FOUNDATION_LOCK_REPORT.md`
  - Audit report: `docs/reports/audit/BUTTON_BASELINE_REPORT.md`
  - Button serves as reference implementation for token-driven CVA patterns, Authority Contract compliance, and browser-native interaction mechanisms
  - Completed formal lock process per Pipeline 18A (Component Review & Improvement Pipeline)
  - Updated Component Lock Status table with FINAL LOCK status
  - Updated all lock documents (FOUNDATION_LOCK.md, ARCHITECTURE_LOCK.md, PROJECT_PROGRESS.md)
- **v1.22** (2025-12-22): Button Lock Date Fixation (TUI_TUNG_FOUNDATION_LOCK_002)
  - Fixed Button Lock Date consistency: Updated Lock Date in Button details section from 2025-12-15 to 2025-12-21 (matches table and ARCHITECTURE_LOCK.md)
  - Removed redundant "Final Lock Date" field (Lock Date is the authoritative date)
  - Verified status consistency: All Button references use "✅ FINAL LOCK" uniformly
  - Updated Last Updated date to 2025-12-22
- **v1.22** (2025-12-21): Button Component Foundation Lock (FINAL)
  - Button officially locked as Foundation primitive after Pipeline 18A Steps 0-11 completion
  - Final Lock date: 2025-12-21
  - Lock report: `docs/reports/BUTTON_FOUNDATION_LOCK_REPORT.md`
  - Audit report: `docs/reports/audit/BUTTON_BASELINE_REPORT.md`
  - Button serves as reference implementation for token-driven CVA patterns, Authority Contract compliance, and browser-native interaction mechanisms
  - Completed formal lock process per Pipeline 18A (Component Review & Improvement Pipeline)
  - Updated Component Lock Status table with final lock date

- **v1.18** (2025-12-21): Button Component Foundation Lock (FINAL) - Initial entry
  - Added Button component to Locked Foundation Components table
  - Added Button component details section
  - Documented Button as sole action trigger foundation
  - Button officially locked as Foundation primitive (STEP 3-13 complete)
  - Lock report: `docs/reports/BUTTON_FOUNDATION_LOCK_REPORT.md`
  - Button serves as canonical Foundation reference implementation
  - Completed formal lock process per TUI_BUTTON_STEP_13_FOUNDATION_LOCK_FINAL task
  - Updated Guard Prompt to include Button in Foundation Components list
  - Updated Component Lock Status table

- **v1.18** (2025-12-25): Select Component Foundation Lock
  - Added Select component to Locked Foundation Components table
  - Added Select component details section
  - Documented Select as sole select/dropdown control foundation (Radix-based compound component)
  - Select officially locked as Foundation control (Pipeline 18A Steps 0-12 complete)
  - Lock date: 2025-12-25
  - Audit report: `docs/reports/audit/SELECT_BASELINE_REPORT.md`
  - Completed formal lock process per Pipeline 18A
  - CVA compliance: Migrated from `cva` to `tokenCVA` (BLOCKER-1 resolved)
  - Storybook: Added canonical stories Matrix, States, SizesGallery (BLOCKER-2 resolved)
  - Code quality: Extracted default size resolution helper (DRY improvement)
  - A11Y: Validated Radix integration (WCAG 2.1 Level AA compliant)

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

- **v1.31** (2025-12-28): Gradient Tokens Fixes
  - Fixed `GRADIENT_TOKENS.ring.subtle` token: replaced `--muted` (background color) with `--muted-foreground` (text color) for proper visibility
  - Updated Storybook demo for `glass.light` and `glass.dark`: added dark background for better visibility in Storybook gallery
  - Token fix ensures `ring.subtle` gradient is visible on light backgrounds
  - Storybook demo improvements ensure glass gradients are properly demonstrated

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
**Version:** 1.21  
**Date Created:** 2025-12-12  
**Last Updated:** 2026-01-17 (Canon alignment with Foundation finalization)  
**Priority:** CRITICAL  
**Architecture Phase:** FOUNDATION **COMPLETE**
**Next Review:** **NEVER** (Foundation is immutable)
