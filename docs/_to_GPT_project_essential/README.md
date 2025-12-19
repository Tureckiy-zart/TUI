# 18 Essential Files for Complete Library Understanding

**Date:** 2025-12-19  
**Purpose:** This folder contains the 18 most critical documents for understanding the Tenerife UI library architecture, rules, and current state.

---

## File Selection Rationale

These 18 files were selected to provide **maximum coverage** of the library's architecture, rules, and processes while staying within the 18-file limit. They cover:

1. **Core Architecture** - Single source of truth and project orientation
2. **Foundation Layer** - Lock status, lifecycle, and rules
3. **Extension Layer** - Boundaries, state, and creation processes
4. **Authority Contracts** - Critical locked rules (Interaction, State, Token, Spacing, Typography)
5. **AI/Cursor Rules** - Enforcement and development rules
6. **Current State** - Project progress and component status
7. **Standards** - Typing standards

---

## File List with Justification

### 1. INTERNAL_CANONICAL_CONTEXT.md
**Why:** Single source of truth (IMMUTABLE). Contains complete architectural principles, Foundation vs Extension rules, token system overview, and all critical decisions.

### 2. FINAL_FOUNDATION_LOCK.md
**Why:** Authoritative Foundation lock status. Defines all locked Foundation components, Authority Contracts status, and Foundation Enforcement (className/style exclusion).

### 3. CANONICAL_PROJECT_ORIENTATION.md
**Why:** Project orientation and current state. Explains solved problems, locked decisions, and Library Maturity Growth System implementation.

### 4. AUTHORITY_MAP.md
**Why:** Navigation map for Authority system. Provides mental model for understanding which Authority governs what, and in what order to consult them.

### 5. EXTENSION_AUTHORITY_CONTRACT.md
**Why:** Extension layer boundary contract. Defines what Extension can/cannot do, how it relates to Foundation, and all Extension rules.

### 6. TOKEN_SYSTEM.md
**Why:** Token system documentation (LOCKED). Defines token domain hierarchy, ownership rules, and semantic classifications. Critical for understanding design system.

### 7. INTERACTION_AUTHORITY_CONTRACT.md
**Why:** Interaction state rules (LOCKED). Defines when states can activate, priority order, blocking rules. Essential for understanding component behavior.

### 8. STATE_AUTHORITY_MATRIX.md
**Why:** Canonical state set (WHAT) (LOCKED). Defines which states exist (base, hover, active, focus-visible, disabled, loading) and how they relate.

### 9. STATE_AUTHORITY_CONTRACT.md
**Why:** State token model (HOW) (LOCKED). Defines how states are represented as CSS variables, naming rules, and property mapping.

### 10. SPACING_AUTHORITY_CONTRACT.md
**Why:** Spacing rules (LOCKED). Defines canonical spacing scale, component rules, and forbidden patterns. Critical for layout consistency.

### 11. TYPOGRAPHY_AUTHORITY_CONTRACT.md
**Why:** Typography rules (LOCKED). Defines canonical typography scale, semantic roles, and forbidden patterns. Critical for text consistency.

### 12. UI_ARCHITECTURE_RULES.md
**Why:** Radix UI and Token Union rules. Defines boundaries between Radix (behavior) and Tenerife UI (visual), token union requirements, and public API constraints.

### 13. TUI_CURSOR_GUARD_RULES.md
**Why:** AI/Cursor enforcement rules. Defines mandatory guard rules for AI work, architectural constraints, and refusal conditions.

### 14. FOUNDATION_LOCK_OPERATING_RULES.md
**Why:** Foundation component lifecycle. Defines 13-step process for creating/refactoring Foundation components, including quality gates and Foundation Enforcement verification.

### 15. EXTENSION_CANONICAL_STATE.md
**Why:** Extension layer canonical state. Defines which Extension components are allowed, restricted, or locked. Single source of truth for Extension components.

### 16. PROJECT_PROGRESS.md
**Why:** Current project status. Tracks completion status of all tasks, Foundation lock status, and Library Maturity Growth System implementation.

### 17. CURSOR_UI_RULES.md
**Why:** Cursor AI development rules. Defines token-driven design system approach, Token Union + Responsive<T> patterns, and self-governing architecture rules.

### 18. TYPING_STANDARD.md
**Why:** TypeScript typing standards (MANDATORY). Defines public API typing rules, explicit union type requirements, and CVA usage boundaries.

---

## Coverage Analysis

### ✅ Covered Areas

- **Architecture:** Complete (Foundation + Extension layers)
- **Authority Contracts:** Core contracts (Interaction, State, Token, Spacing, Typography)
- **Foundation Status:** Complete (lock status, lifecycle, enforcement)
- **Extension Rules:** Complete (boundaries, state, creation)
- **AI/Cursor Rules:** Complete (enforcement, development rules)
- **Current State:** Complete (progress, orientation)
- **Standards:** Complete (typing standards)

### ⚠️ Not Included (But Referenced)

- **Other Authority Contracts:** Motion, Elevation, Radius, Layout (referenced in AUTHORITY_MAP.md)
- **Component Locks:** Layout, Text locks (referenced in FINAL_FOUNDATION_LOCK.md)
- **Reference Documentation:** API references, integration guides (not critical for architecture understanding)
- **Library Maturity Details:** Component needs inventory, feedback processes (referenced in PROJECT_PROGRESS.md)

---

## Usage

These 18 files provide sufficient context for:
- Understanding complete architecture (Foundation + Extension)
- Understanding all critical Authority Contracts
- Understanding Foundation lock status and enforcement
- Understanding Extension boundaries and rules
- Understanding AI/Cursor enforcement rules
- Understanding component creation processes
- Understanding current project state
- Understanding typing standards

**For complete documentation:** See [CANONICAL_DOCUMENTATION_INVENTORY.md](../CANONICAL_DOCUMENTATION_INVENTORY.md) (44 total files).

---

**Last Updated:** 2025-12-19

