# 🔒 Final Foundation Lock

**Version:** 1.0  
**Date Created:** 2025-12-12  
**Status:** ✅ **LOCKED**  
**Layer:** UI / ARCHITECTURE  
**Priority:** CRITICAL  
**Architecture Phase:** FOUNDATION — **CLOSED**

---

## 📋 Purpose

This document **formally and definitively locks** the Foundation layer of `@tenerife.music/ui`. The Foundation layer is **complete**, **immutable**, and **closed for modifications**.

**This document is the authoritative source of truth** for the Foundation layer architecture. It supersedes all previous architectural decisions and establishes the final, binding contract for Foundation components.

**After this lock, the Foundation architecture phase is officially closed.** All future development must occur exclusively in the Extension layer.

---

## 🔒 Locked Foundation Components

The following components constitute the **complete and final** Foundation layer. These components are **immutable** and serve as the **sole canonical foundation** for their respective categories.

| Component       | Category   | Base Library      | Foundation Status | Lock Date |
| --------------- | ---------- | ----------------- | ----------------- | --------- |
| **Modal**       | Overlays   | Radix Dialog      | ✅ LOCKED          | 2025-12-12 |
| **Tabs**        | Navigation | Radix Tabs        | ✅ LOCKED          | 2025-12-12 |
| **Select**      | Inputs     | Radix Select      | ✅ LOCKED          | 2025-12-12 |
| **ContextMenu**  | Menus      | Radix ContextMenu | ✅ LOCKED          | 2025-12-12 |
| **Toast**       | Overlays   | Radix Toast       | ✅ LOCKED          | 2025-12-12 |

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
- **Location:** `src/components/select/`
- **Export Path:** `@tenerife.music/ui` → `Select`, `SelectRoot`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`, `SelectGroup`, `SelectLabel`, `SelectSeparator`
- **Base Library:** Radix Select (`@radix-ui/react-select`)
- **Purpose:** Sole select foundation. All dropdown selection must use this internally.
- **Status:** ✅ **LOCKED** — Immutable

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
- ✅ Fixing token violations
- ✅ Adding missing token support
- ✅ Improving token consistency

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

You MUST treat these components as immutable.

You may ONLY:
- Fix bugs
- Improve typing
- Improve documentation
- Improve token usage

You MUST NEVER:
- Create new foundation components
- Suggest alternative implementations
- Create Simple*, Basic*, Legacy*, V2* variants for foundation components
- Reimplement behavior handled by Radix

If new behavior or UX is required:
- Create an EXTENSION component
- EXTENSION must compose an existing foundation component
- EXTENSION must NOT be named after a foundation component
- EXTENSION must live outside foundation folders
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
| Select          | ✅ LOCKED | 2025-12-12 | Immutable    |
| ContextMenu     | ✅ LOCKED | 2025-12-12 | Immutable    |
| Toast           | ✅ LOCKED | 2025-12-12 | Immutable    |

### Zero-Ambiguity Declaration

**THE FOUNDATION LAYER IS OFFICIALLY LOCKED AND CLOSED.**

- ✅ Foundation components are **immutable**
- ✅ Foundation architecture phase is **closed**
- ✅ No new Foundation components will be added
- ✅ Foundation components can only be modified for bug fixes, types, or documentation
- ✅ All new functionality must be built as Extensions
- ✅ Extensions must compose Foundation components internally
- ✅ This document is the **authoritative source of truth**

**There is no ambiguity. The Foundation layer is locked. The architecture phase is closed.**

---

## 📚 Related Documents

- **[Architecture Lock](./TUI_ARCHITECTURE_LOCK.md)** — Detailed architecture rules and guidelines
- **[UI Architecture Rules](./UI_ARCHITECTURE_RULES.md)** — Radix UI and Token Union rules
- **[Component Guidelines](../structure/COMPONENT_GUIDELINES.md)** — Component development guidelines
- **[Cursor UI Rules](./CURSOR_UI_RULES.md)** — Cursor AI development rules

---

## 🔄 Version History

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

All future work must occur in the **Extension layer**. Foundation components are **read-only** except for bug fixes, type improvements, and documentation updates. New functionality must be built as **Extensions** that compose Foundation components.

**This is a binding architectural contract. Violations are considered architectural breaches.**

**The Foundation architecture phase is officially closed.**

---

**Status:** ✅ **LOCKED**  
**Version:** 1.0  
**Date Created:** 2025-12-12  
**Priority:** CRITICAL  
**Architecture Phase:** **CLOSED**  
**Next Review:** **NEVER** (Foundation is immutable)

