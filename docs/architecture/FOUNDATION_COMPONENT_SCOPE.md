# Foundation Component Scope

**Version:** 1.0  
**Date Created:**    
**Status:** ✅ **FINAL / APPLIED**  
**Layer:** ARCHITECTURE / FOUNDATION  
**Priority:** CRITICAL

---

## Purpose

This document defines **which components are considered Foundation** and therefore subject to the strict Foundation Contract. It provides explicit inclusion criteria, lists all Foundation components with rationale, and distinguishes Foundation components from Extension layer components.

**This document is the authoritative source of truth** for Foundation component scope. All components listed in this document **MUST comply with the Foundation Contract** as enforced by [FOUNDATION_CONTRACT.md](./FOUNDATION_CONTRACT.md) and [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md).

---

## Status: FINAL / APPLIED

**Foundation enforcement is FINAL and APPLIED.** All Foundation components listed in this document are subject to the Foundation Contract, which is **technically enforced** and **LOCKED**:

- ✅ **TypeScript Enforcement:** Foundation components exclude `className` and `style` from public APIs
- ✅ **ESLint Rules:** Regression guards prevent reintroduction of styling escape hatches
- ✅ **Type-Tests:** Compile-time verification ensures enforcement compliance
- ✅ **CI Integration:** All enforcement checks run automatically

**Authority:** [FOUNDATION_CONTRACT.md](./FOUNDATION_CONTRACT.md) and [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md) - Foundation Enforcement Lock Status

**Unlock Procedure:** Any violations of Foundation enforcement require explicit unlock procedure as documented in [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md).

---

## Foundation Inclusion Criteria

A component is considered **Foundation** if it meets **all** of the following criteria:

### 1. Canonical Building Block

The component serves as a **canonical, immutable building block** for its semantic category. There is exactly one Foundation component per category.

**Examples:**
- ✅ Button is the canonical action trigger primitive
- ✅ Link is the canonical navigation primitive
- ❌ Alert is not canonical (multiple feedback patterns exist)

### 2. Architectural Role

The component serves a **fundamental architectural role** in the design system:

- **Action primitives** - User-initiated actions (Button)
- **Navigation primitives** - Location changes (Link)
- **Typography primitives** - Text rendering (Text, Heading)
- **Form input primitives** - User data input (Input, Textarea, Checkbox, Radio, Label)
- **Layout primitives** - Structure and spacing (Box, Stack, Flex, Grid)

**Not Foundation:**
- Domain-specific components (Alert, Badge, NotificationCenter)
- Composition components (Card, Section)
- Pattern components (Table, DataList)
- Utility components (Icon, Skeleton, Progress)

### 3. Locked and Stable

The component is **locked** and **stable**, meaning:
- Public API does not change in breaking ways
- Component serves as reference implementation
- Component has completed Foundation lock process
- Component is documented in Foundation lock reports
- **Component MUST comply with Foundation Contract enforcement** (className/style exclusion is LOCKED and APPLIED)

### 4. Token-Driven

The component is **fully token-driven**, meaning:
- All visual properties use token unions
- No raw CSS values or arbitrary styling
- Component responds to token system changes
- Component complies with all Authority Contracts
- **Component MUST exclude `className` and `style` from public API** (enforced by Foundation Contract)

### 5. One Per Category

There is **exactly one** Foundation component per semantic category. No duplicates or alternatives exist.

**Examples:**
- ✅ Button (action trigger) - one canonical implementation
- ✅ Link (navigation) - one canonical implementation
- ❌ Multiple button variants are not separate Foundation components

---

## Initial Foundation Component List

The following components are **confirmed Foundation components** based on architectural role and lock status:

### Confirmed Foundation Components

#### 1. Button

**Status:** ✅ **FINAL LOCK** ( )  
**Location:** `src/PRIMITIVES/Button/`  
**Lock Report:** `docs/reports/BUTTON_FOUNDATION_LOCK_REPORT.md`

**Rationale:**
- Canonical action trigger primitive
- One per category (actions)
- Locked and stable
- Fully token-driven
- Serves as reference implementation for token-driven CVA patterns

**Scope:**
- Public API: `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize`
- Tokens: `BUTTON_TOKENS`
- Variants: `primary`, `secondary`, `accent`, `outline`, `ghost`, `destructive`
- Sizes: `sm`, `md`, `lg`, `icon`

#### 2. Link

**Status:** ✅ **FINAL LOCK** (2025-12-18)  
**Location:** `src/PRIMITIVES/Link/`  
**Lock Report:** `docs/reports/LINK_FOUNDATION_LOCK_REPORT.md`  
**Architectural Lock:** [LINK_NO_ASCHILD_CANONICAL_ANCHOR.md](./LINK_NO_ASCHILD_CANONICAL_ANCHOR.md) — Link is a first-class semantic anchor; `asChild` pattern is FORBIDDEN

**Rationale:**
- Canonical navigation primitive
- One per category (navigation links)
- Locked and stable
- Fully token-driven
- Represents semantic navigation (location changes)
- First-class semantic anchor (always renders `<a>` directly)

**Architectural Constraints:**
- Link MUST always render a single `<a>` element directly
- `asChild` prop is FORBIDDEN
- No proxy patterns (Radix Slot) allowed
- No nested interactive elements
- See [LINK_NO_ASCHILD_CANONICAL_ANCHOR.md](./LINK_NO_ASCHILD_CANONICAL_ANCHOR.md) for complete architectural contract

**Scope:**
- Public API: `Link`, `LinkProps`, `LinkVariant`, `LinkSize`
- Tokens: `LINK_TOKENS`
- Variants: `primary`, `secondary`, `accent`, `outline`, `ghost`, `link`, `destructive`
- Sizes: `xs`, `sm`, `md`, `lg`, `xl`

### Proposed Foundation Components

The following components are **proposed** as Foundation based on architectural role, but have not yet completed the full Foundation lock process. They are included here for initial scope definition:

#### 3. Text

**Status:** ⏳ **PROPOSED** (not yet locked)  
**Location:** `src/PRIMITIVES/Text/`

**Rationale:**
- Canonical typography primitive
- Fundamental building block for text rendering
- Token-driven typography system
- Listed as locked in Extension Canonical State (2025-12-15)

**Note:** Text is listed as locked in `EXTENSION_STATE.md` but has not completed the full Foundation lock process with lock report. It is proposed here based on architectural role.

#### 4. Heading

**Status:** ⏳ **PROPOSED** (not yet locked)  
**Location:** `src/PRIMITIVES/Heading/`

**Rationale:**
- Canonical typography primitive
- Fundamental building block for heading text
- Token-driven typography system
- Listed as locked in Extension Canonical State (2025-12-15)

**Note:** Heading is listed as locked in `EXTENSION_STATE.md` but has not completed the full Foundation lock process with lock report. It is proposed here based on architectural role.

#### 5. Input

**Status:** ⏳ **PROPOSED** (not yet locked)  
**Location:** `src/PRIMITIVES/Input/`

**Rationale:**
- Canonical form input primitive
- Fundamental building block for user data input
- Token-driven form system
- Listed as locked in Extension Canonical State (2025-12-15)

**Note:** Input is listed as locked in `EXTENSION_STATE.md` but has not completed the full Foundation lock process with lock report. It is proposed here based on architectural role.

#### 6. Textarea

**Status:** ⏳ **PROPOSED** (not yet locked)  
**Location:** `src/PRIMITIVES/Textarea/`

**Rationale:**
- Canonical form input primitive
- Fundamental building block for multi-line user data input
- Token-driven form system
- Complements Input component

#### 7. Checkbox

**Status:** ⏳ **PROPOSED** (not yet locked)  
**Location:** `src/PRIMITIVES/Checkbox/`

**Rationale:**
- Canonical form selection primitive
- Fundamental building block for binary selection
- Token-driven form system
- One per category (checkbox selection)

#### 8. Radio

**Status:** ⏳ **PROPOSED** (not yet locked)  
**Location:** `src/PRIMITIVES/Radio/`

**Rationale:**
- Canonical form selection primitive
- Fundamental building block for single selection from group
- Token-driven form system
- One per category (radio selection)

#### 9. Label

**Status:** ⏳ **PROPOSED** (not yet locked)  
**Location:** `src/PRIMITIVES/Label/`

**Rationale:**
- Canonical form label primitive
- Fundamental building block for form field labels
- Token-driven form system
- Required for accessibility and form semantics

---

## Explicit Non-Foundation Components

The following components in the `PRIMITIVES` folder are **explicitly NOT Foundation** components:

### Extension Layer Components

These components are part of the Extension layer and are **not subject to the Foundation Contract**:

#### Alert

**Status:** Extension Layer  
**Location:** `src/PRIMITIVES/Alert/`

**Rationale:**
- Domain-specific feedback component
- Multiple feedback patterns exist (not canonical)
- Composes Foundation components internally
- Not a fundamental building block

#### Badge

**Status:** Extension Layer  
**Location:** `src/PRIMITIVES/Badge/`

**Rationale:**
- Domain-specific indicator component
- Multiple indicator patterns exist (not canonical)
- Composes Foundation components internally
- Not a fundamental building block

#### Icon

**Status:** Extension Layer  
**Location:** `src/PRIMITIVES/Icon/`

**Rationale:**
- Utility component for icon rendering
- Not a fundamental building block
- Serves as composition primitive
- Multiple icon patterns exist

#### Skeleton

**Status:** Extension Layer  
**Location:** `src/PRIMITIVES/Skeleton/`

**Rationale:**
- Utility component for loading states
- Not a fundamental building block
- Serves as composition primitive
- Multiple loading patterns exist

#### Progress

**Status:** Extension Layer  
**Location:** `src/PRIMITIVES/Progress/`

**Rationale:**
- Utility component for progress indication
- Not a fundamental building block
- Serves as composition primitive
- Multiple progress patterns exist

#### Switch

**Status:** Extension Layer  
**Location:** `src/PRIMITIVES/Switch/`

**Rationale:**
- Toggle component (not canonical form input)
- Multiple toggle patterns exist
- Composes Foundation components internally
- Not a fundamental building block

#### Field

**Status:** Extension Layer  
**Location:** `src/PRIMITIVES/Field/`

**Rationale:**
- Composition component for form fields
- Composes Input, Label, and other primitives
- Not a fundamental building block
- Serves as composition pattern

---

## Radix-Based Foundation Components

The following components are **Foundation** but are **Radix-based** and located outside the `PRIMITIVES` folder. They are documented in `FOUNDATION_LOCK.md`:

### Modal

**Status:** ✅ **LOCKED** (2025-12-12)  
**Location:** `src/components/modal/`  
**Base Library:** Radix Dialog

### Tabs

**Status:** ✅ **LOCKED** (2025-12-12)  
**Location:** `src/components/navigation/tabs/`  
**Base Library:** Radix Tabs

### Select

**Status:** ⏳ **UNLOCKED** (Pending Canonical Lock)  
**Location:** `src/components/select/`  
**Base Library:** Radix Select

### ContextMenu

**Status:** ✅ **LOCKED** (2025-12-12)  
**Location:** `src/components/menus/context-menu/`  
**Base Library:** Radix ContextMenu

### Toast

**Status:** ✅ **LOCKED** (2025-12-12)  
**Location:** `src/components/overlays/Toast.tsx`  
**Base Library:** Radix Toast

**Note:** These Radix-based Foundation components are subject to the Foundation Contract, but their lock status and details are documented in `FOUNDATION_LOCK.md`. This document focuses on PRIMITIVES-based Foundation components.

---

## Foundation vs Extension Distinction

### Foundation Components

**Characteristics:**
- Canonical, one per category
- Locked and stable
- Token-driven
- Fundamental building blocks
- **Subject to Foundation Contract (MANDATORY compliance)**
- **Foundation enforcement is LOCKED and APPLIED** - violations require unlock procedure

**Examples:**
- Button (action trigger)
- Link (navigation)
- Text (typography)
- Input (form input)

### Extension Components

**Characteristics:**
- Domain-specific or composable
- May evolve or be replaced
- Token-driven (but not locked)
- Composes Foundation components
- NOT subject to Foundation Contract

**Examples:**
- Alert (feedback)
- Badge (indicator)
- Card (container)
- Table (data display)

---

## Notes on Future Expansion

### Adding Components to Foundation Scope

Adding a new component to Foundation scope requires:

1. **Architectural Justification**
   - Component must meet all Foundation Inclusion Criteria
   - Component must serve as canonical building block
   - Component must be one per category

2. **Foundation Lock Process**
   - Complete Foundation component lifecycle (Steps 1-13, including Steps 7.5 and 7.6: Internal Styling Integrity & className Isolation Verification, Internal Styling Integrity & ESLint Scope Verification)
   - Verify Foundation Contract compliance (enforcement is MANDATORY)
   - Create Foundation lock report
   - Update `FOUNDATION_LOCK.md`
   - Update this document

3. **Explicit Approval**
   - Foundation scope expansion requires explicit approval
   - Cannot be done through normal component creation
   - Must follow Foundation unlock procedure if modifying existing component

### Removing Components from Foundation Scope

**Foundation components cannot be removed from scope** without:
1. Explicit Foundation unlock procedure
2. Full impact analysis
3. Migration documentation
4. Approval process

**Rationale:** Foundation components are locked and stable. Removing them from scope would be a breaking architectural change.

### Proposing New Foundation Components

To propose a new Foundation component:

1. Verify it meets all Foundation Inclusion Criteria
2. Ensure no existing Foundation component serves the same role
3. Complete Foundation component lifecycle
4. Create Foundation lock report
5. Update this document and `FOUNDATION_LOCK.md`

---

## Relationship to Other Documents

This document works in conjunction with:

- **[FOUNDATION_CONTRACT.md](./FOUNDATION_CONTRACT.md)** - Defines the contract that applies to Foundation components (enforcement is FINAL/APPLIED)
- **[FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md)** - Documents lock status of all Foundation components and **Foundation Enforcement Lock Status**
- **[FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md)** - 13-step lifecycle includes mandatory enforcement verification (Steps 7.5 and 7.6)
- **[EXTENSION_STATE.md](./EXTENSION_STATE.md)** - Lists Extension layer components
- **[ARCHITECTURE_CONTEXT.md](../ARCHITECTURE_CONTEXT.md)** - Provides architectural context

---

## Summary

**Foundation Component Scope:**

**Confirmed Foundation (Locked):**
- ✅ Button (action trigger)
- ✅ Link (navigation)

**Proposed Foundation (Not Yet Locked):**
- ⏳ Text (typography)
- ⏳ Heading (typography)
- ⏳ Input (form input)
- ⏳ Textarea (form input)
- ⏳ Checkbox (form selection)
- ⏳ Radio (form selection)
- ⏳ Label (form label)

**Radix-Based Foundation:**
- ✅ Modal, Tabs, ContextMenu, Toast (documented in FOUNDATION_LOCK.md)
- ⏳ Select (pending canonical lock)

**Explicitly NOT Foundation:**
- ❌ Alert, Badge, Icon, Skeleton, Progress, Switch, Field (Extension layer)

**Foundation Contract enforcement is APPLIED to all components listed in the Confirmed Foundation and Proposed Foundation sections above.** All Foundation components MUST comply with the Foundation Contract, which is technically enforced and LOCKED.

---

**Status:** ✅ **FINAL / APPLIED**  
**Version:** 1.0  
**Date Created:**    
**Last Updated:** 2025-12-18  
**Priority:** CRITICAL  
**Enforcement:** ✅ LOCKED (Foundation Contract enforcement is APPLIED)  
**Next Review:** NEVER (Foundation enforcement is immutable unless unlock procedure is executed)

