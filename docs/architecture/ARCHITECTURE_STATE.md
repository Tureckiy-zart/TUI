# Canonical Architecture Lock

**Date:** 2025-12-17  
**Status:** ✅ **LOCKED**  
**Authority:** This document defines the FINAL, CANONICAL architecture state of TenerifeUI.  
**Purpose:** Prevent regression into legacy/duplicate structures and lock resolved architectural decisions.

---

## Executive Summary

This document **OFFICIALLY LOCKS** the current UI architecture as **CANONICAL**. All architectural decisions documented here are **FINAL** and **MUST NOT** change without explicit unlock procedure.

**Status:** ✅ **ARCHITECTURALLY STABLE** - The UI system is closed for structural drift.

---

## Canonical Layer Definitions (LOCKED)

### ✅ FOUNDATION Layer

**Status:** ✅ **LOCKED** (Immutable)  
**Purpose:** Tokens only for active components

**Canonical Rule:** FOUNDATION tokens **MUST NOT** exist without active components.

**Reference:** [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md)

### ✅ PRIMITIVES Layer

**Status:** ✅ **CANONICAL**  
**Purpose:** Atomic UI components, no orchestration

**Canonical Rule:** PRIMITIVES **MUST NOT** contain orchestration logic or overlay infrastructure.

**Location:** `src/PRIMITIVES/`

**Examples:**
- Button, Input, Textarea, Checkbox, Radio, Switch
- Badge, Alert, Heading, Text, Icon, Image
- Progress, Skeleton, Divider, Field, Label, Link

### ✅ COMPOSITION Layer

**Status:** ✅ **CANONICAL**  
**Purpose:** Layout, overlays, interaction orchestration

**Canonical Rule:** All overlays **MUST** live in COMPOSITION layer only.

**Location:** `src/COMPOSITION/`

**Sub-layers:**
- `COMPOSITION/overlays/` - All overlay components (Popover, Modal, ContextMenu, Toast, Dialog, Tooltip)
- `COMPOSITION/layout/` - Layout components (Card, Flex, Grid, Stack, Container, etc.)
- `COMPOSITION/navigation/` - Navigation components (Tabs, Breadcrumbs, Pagination, etc.)
- `COMPOSITION/controls/` - Control components (Select)

### ✅ PATTERNS Layer

**Status:** ✅ **CANONICAL**  
**Purpose:** Business/UI patterns (no overlays)

**Canonical Rule:** PATTERNS **MUST NOT** define overlay primitives or overlay infrastructure.

**Location:** `src/PATTERNS/`

**Examples:**
- Cards (CardBase, domain-specific cards)
- Filters, Forms, Lists, Tables
- Menus (HoverCard - uses COMPOSITION/overlays/Popover)
- States (EmptyState, LoadingState, ConsentBanner)

### ✅ DOMAIN Layer

**Status:** ✅ **CANONICAL**  
**Purpose:** App-specific sections

**Location:** `src/DOMAIN/`

**Examples:**
- Admin, Auth, Notifications, Sections, Section Builder

---

## Canonical Overlay Components (LOCKED)

### ✅ Popover

**Canonical Implementation:** `COMPOSITION/overlays/Popover.tsx` (Radix-based)

**Status:** ✅ **CANONICAL** - Single implementation

**Removed:**
- ❌ `PATTERNS/menus/menus/popover/` - REMOVED (MIGRATION_12D)

**Usage:**
- ✅ HoverCard uses `COMPOSITION/overlays/Popover` (Radix-based)

**Rule:** Popover **MUST** be imported from `COMPOSITION/overlays/Popover` only.

### ✅ Modal / Dialog

**Canonical Implementation:** `COMPOSITION/overlays/Modal/` (Radix-based, locked Foundation)

**Status:** ✅ **CANONICAL** - Foundation component

**Dialog Implementation:** `COMPOSITION/overlays/Dialog.tsx` - Semantic wrapper over Modal

**Rule:** Modal **MUST** be imported from `COMPOSITION/overlays/Modal` only. Dialog **MUST** compose Modal internally.

### ✅ ContextMenu

**Canonical Implementation:** `COMPOSITION/overlays/ContextMenu/` (Radix-based, locked Foundation)

**Status:** ✅ **CANONICAL** - Single implementation

**Removed:**
- ❌ `PATTERNS/menus/menus/context-menu/` - REMOVED

**Rule:** ContextMenu **MUST** be imported from `COMPOSITION/overlays/ContextMenu` only.

### ✅ Toast

**Canonical Implementation:** `COMPOSITION/overlays/Toast.tsx` (Radix-based, locked Foundation)

**Status:** ✅ **CANONICAL** - Foundation component

**Rule:** Toast **MUST** be imported from `COMPOSITION/overlays/Toast` only.

### ❌ Dropdown

**Status:** ❌ **REMOVED** (MIGRATION_12C)

**Removed Components:**
- ❌ `COMPOSITION/overlays/Dropdown/` - REMOVED
- ❌ `PATTERNS/menus/menus/dropdown/` - REMOVED

**Removed Tokens:**
- ❌ `DROPDOWN_TOKENS` - REMOVED from FOUNDATION
- ❌ `DropdownItemSize`, `DropdownMenuSize`, `DropdownTriggerSize`, `DropdownVariant` - REMOVED

**Rule:** Dropdown components and tokens **MUST NOT** be reintroduced. Use Select or ContextMenu instead.

---

## Canonical Card Components (LOCKED)

### ✅ Card (Canonical)

**Canonical Implementation:** `COMPOSITION/layout/Card/Card.tsx` (Token-driven)

**Status:** ✅ **CANONICAL** - Single canonical implementation

**Removed:**
- ❌ `PRIMITIVES/Card/` - REMOVED (MIGRATION_12A)

**Pattern Layer:**
- ✅ `PATTERNS/cards/cards/CardBase/CardBase.tsx` - Domain-specific card pattern (valid)

**Rule:** Card primitive **MUST** be imported from `COMPOSITION/layout/Card` only. Legacy PRIMITIVES/Card **MUST NOT** be reintroduced.

---

## Canonical Toast Hooks (LOCKED)

### ✅ useLocalToast

**Canonical Implementation:** `hooks/useLocalToast.ts`

**Status:** ✅ **CANONICAL** - Component-scoped toast management

**Rule:** Use `useLocalToast` for component-scoped toast management.

### ✅ useGlobalToast

**Canonical Implementation:** `hooks/useGlobalToast.ts`

**Status:** ✅ **CANONICAL** - App-wide toast management

**Rule:** Use `useGlobalToast` for app-wide toast management.

### ⚠️ Legacy Exports (Deprecated)

**Status:** ⚠️ **DEPRECATED** - Backward compatibility only

**Exports:**
- `hooks/useToast.ts` - Exports `useLocalToast` (deprecated)
- `hooks/use-toast.ts` - Exports `useGlobalToast` (deprecated)

**Rule:** Legacy `useToast` exports **MUST NOT** be used in new code. New usage **MUST** use canonical hooks (`useLocalToast`, `useGlobalToast`).

---

## Canonical Token Rules (LOCKED)

### Rule 1: Tokens MUST NOT Exist Without Active Components

**MANDATORY:** FOUNDATION tokens **MUST NOT** exist without active components.

**Removed Tokens:**
- ❌ `DROPDOWN_TOKENS` - REMOVED (no active Dropdown component)

**Active Tokens:**
- ✅ `POPOVER_TOKENS` - Active (used by COMPOSITION/overlays/Popover)
- ✅ `CONTEXT_MENU_TOKENS` - Active (used by COMPOSITION/overlays/ContextMenu)
- ✅ `CARD_TOKENS` - Active (used by COMPOSITION/layout/Card)
- ✅ `TOAST_TOKENS` - Active (used by COMPOSITION/overlays/Toast)

**Rule:** Creating tokens for removed components **MUST NOT** be allowed.

---

## Forbidden Regressions (LOCKED)

The following are **EXPLICITLY FORBIDDEN** and **MUST NOT** be reintroduced:

### ❌ Dropdown Components and Tokens

**FORBIDDEN:**
- ❌ Creating Dropdown components in any layer
- ❌ Creating Dropdown tokens in FOUNDATION
- ❌ Exporting Dropdown from public API
- ❌ Using Dropdown in new code

**Rationale:** Dropdown was removed (MIGRATION_12C). Use Select or ContextMenu instead.

### ❌ Legacy Card in PRIMITIVES

**FORBIDDEN:**
- ❌ Creating Card component in PRIMITIVES layer
- ❌ Reintroducing legacy PRIMITIVES/Card

**Rationale:** Legacy PRIMITIVES/Card was removed (MIGRATION_12A). Use COMPOSITION/layout/Card instead.

### ❌ Overlay Infrastructure in PATTERNS

**FORBIDDEN:**
- ❌ Adding overlay primitives to PATTERNS layer
- ❌ Creating Popover, Modal, ContextMenu, or Toast in PATTERNS
- ❌ Adding overlay infrastructure to PATTERNS

**Rationale:** Overlays **MUST** live in COMPOSITION layer only. PATTERNS is for business/UI patterns, not overlay primitives.

### ❌ Legacy useToast Exports in New Code

**FORBIDDEN:**
- ❌ Using `useToast` from `hooks/useToast.ts` in new code
- ❌ Using `useToast` from `hooks/use-toast.ts` in new code

**Rationale:** Legacy exports are deprecated. New code **MUST** use canonical hooks (`useLocalToast`, `useGlobalToast`).

### ❌ Tokens Without Components

**FORBIDDEN:**
- ❌ Creating tokens in FOUNDATION without active components
- ❌ Creating orphaned tokens

**Rationale:** Tokens **MUST** correspond to active components. Orphaned tokens create maintenance burden.

---

## Allowed Actions (LOCKED)

The following actions are **EXPLICITLY ALLOWED**:

### ✅ Extend Within Layer

**ALLOWED:**
- ✅ Add new components within existing layers (PRIMITIVES, COMPOSITION, PATTERNS, DOMAIN)
- ✅ Extend existing components within their layer
- ✅ Add new patterns in PATTERNS layer

**Rule:** Extensions **MUST** respect layer boundaries and canonical rules.

### ✅ Add New Component with Layer Justification

**ALLOWED:**
- ✅ Create new components with explicit layer justification
- ✅ Verify component belongs to correct layer before creation

**Rule:** New components **MUST** be placed in the correct layer based on their purpose and behavior.

### ✅ Compose Canonical Components

**ALLOWED:**
- ✅ Compose canonical components (e.g., HoverCard uses COMPOSITION/overlays/Popover)
- ✅ Create domain-specific patterns using canonical primitives

**Rule:** Compositions **MUST** use canonical components from their canonical locations.

---

## Unlock Protocol

If architectural changes are required that violate this lock:

### Step 1: Explicit Unlock Request

**REQUIRED:**
- Create explicit task with justification
- Document why the change is necessary
- Identify all affected components and layers

### Step 2: Full Audit

**REQUIRED:**
- Complete audit of all affected components
- Document impact of proposed changes
- Identify migration path if applicable

### Step 3: Approval

**REQUIRED:**
- Receive explicit approval for unlock
- Receive explicit approval for changes
- Document approval decision

### Step 4: Implementation

**REQUIRED:**
- Implement changes following canonical rules
- Update all affected documentation
- Verify no regressions introduced

### Step 5: Re-lock

**REQUIRED:**
- Update this document with new canonical state
- Re-apply lock with updated documentation
- Verify architecture stability

**Rule:** Unlock **MUST** be explicit and documented. No silent unlocks allowed.

**Note:** This unlock protocol is for unlocking **canonical architecture locks** (Authority Contracts, Token System, etc.). If the unlock involves creating or refactoring **Foundation components** (Modal, Tabs, Select, ContextMenu, Toast), the canonical lifecycle defined in [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) (Section 10: Foundation Component Creation & Refactor Route — Canonical Lifecycle) **MUST** be followed as part of the implementation phase (Step 4). For human-readable navigation to the lifecycle process, see [FOUNDATION_LIFECYCLE_PROCESS_INDEX.md](./FOUNDATION_LIFECYCLE_PROCESS_INDEX.md).

---

## Verification

### Architecture Verification

**Status:** ✅ **VERIFIED** (2025-12-17)

**Verification Results:**
- ✅ No duplicate UI implementations
- ✅ All known legacy layers removed
- ✅ Canonical implementations established
- ✅ FOUNDATION tokens only exist for active components
- ✅ Overlays live only in COMPOSITION layer
- ✅ PATTERNS do not define overlay primitives

**Reference:** [CANONICAL_STATE_FINAL.md](./CANONICAL_STATE_FINAL.md)



---

## ESLint Governance & Scope Authority

Foundation enforcement is protected not only by TypeScript and CI guards,
but also by **scoped ESLint governance rules**.

The exact applicability and boundaries of all ESLint rules related to
Foundation, Extension, and Product layers are defined in:

→ [eslint_rules_scope_matrix.md](./eslint_rules_scope_matrix.md)

This document is **canonical and binding**.

Any ESLint rule behavior that contradicts the scope matrix
MUST be treated as a misconfiguration, not as a violation of architecture.

Foundation FINAL LOCK assumes:
- ESLint rules respect architectural layer boundaries
- No rule may apply outside its declared scope
- Autofix is explicitly forbidden where it may alter internal implementation

**ESLint Setup & Governance:** For complete ESLint governance rules, autofix policy, and architectural enforcement principles, see [ESLINT_SETUP.md](./ESLINT_SETUP.md).

**Foundation Enforcement Contract:** For details on Foundation Enforcement (exclusion of `className` and `style` props from Foundation component public APIs), see [FOUNDATION_CONTRACT.md](./FOUNDATION_CONTRACT.md) (FINAL / APPLIED).

Violating this governance requires an explicit unlock procedure.

---

## Related Documents

- [UI_ARCHITECTURE_LOCK.md](./UI_ARCHITECTURE_LOCK.md) - **PRIMARY CANONICAL SOURCE** - Architecture lock with all canonical rules and implementations (supersedes CANONICAL_STATE_FINAL.md)
- [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) - Foundation layer lock
- [LINK_NO_ASCHILD_CANONICAL_ANCHOR.md](./LINK_NO_ASCHILD_CANONICAL_ANCHOR.md) - 🔒 **LOCKED** Link architectural lock: first-class semantic anchor, `asChild` FORBIDDEN
- [FOUNDATION_CONTRACT.md](./FOUNDATION_CONTRACT.md) - Foundation Enforcement Contract (FINAL / APPLIED)
- [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) - 13-step Foundation component lifecycle
- [FOUNDATION_LIFECYCLE_PROCESS_INDEX.md](./FOUNDATION_LIFECYCLE_PROCESS_INDEX.md) - Human-readable navigation to Foundation lifecycle
- [UI_ARCHITECTURE_LOCK.md](./UI_ARCHITECTURE_LOCK.md) - Architecture lock details
- [INTERNAL_CANONICAL_CONTEXT.md](../INTERNAL_CANONICAL_CONTEXT.md) - Internal canonical context
- [TUI_CURSOR_GUARD_RULES.md](./TUI_CURSOR_GUARD_RULES.md) - Cursor/AI guard rules
- [eslint_rules_scope_matrix.md](./eslint_rules_scope_matrix.md) - ESLint rules scope authority
- [ESLINT_SETUP.md](./ESLINT_SETUP.md) - ESLint setup and governance (architectural enforcement)

---

## Document Status

**Status:** ✅ **LOCKED**  
**Version:** 1.1  
**Date Created:** 2025-12-17  
**Last Updated:** 2025-12-18  
**Authority:** This document is the authoritative source for canonical architecture state.

**This document MUST NOT be modified without explicit unlock procedure.**

---

## Final Statement

This document represents the **FINAL, CANONICAL** architecture state of TenerifeUI. All architectural decisions documented here are **LOCKED** and **MUST NOT** change without explicit unlock procedure.

**The UI system is ARCHITECTURALLY STABLE and closed for structural drift.**

Any future change must be intentional, explicit, and reviewable.






---

**End of Canonical Lock Document**

