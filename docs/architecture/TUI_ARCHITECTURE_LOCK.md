# 🔒 Tenerife UI Architecture Lock

**Version:** 1.0  
**Date Created:** 2025-12-12  
**Status:** ✅ LOCKED  
**Layer:** UI / ARCHITECTURE  
**Priority:** CRITICAL

---

## 📋 Purpose

This document **formally locks** the UI foundation architecture of `@tenerife.music/ui`. After this lock, the foundation layer is **immutable** and **closed for modifications**. All future development must occur in the **extension layer**.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

> 🔒 **Final Foundation Lock:** For the authoritative, definitive Foundation lock document, see **[FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md)**. The Final Foundation Lock document is the **single source of truth** for the locked Foundation layer and officially closes the Foundation architecture phase.

---

## 🎯 Architecture Overview

The Tenerife UI architecture is divided into two distinct layers:

### Foundation Layer (LOCKED)

The foundation layer consists of **exactly one component per category**. These components:

- Define the **canonical behavior and structure** for their category
- Are **immutable** and **backward-compatible**
- Serve as the **sole foundation** for all extensions
- Are built on **Radix UI primitives** for accessibility and behavior
- Use **token-based APIs** for visual design

### Extension Layer (OPEN)

The extension layer consists of **opinionated, feature-rich components** that:

- Compose foundation components internally
- Add domain-specific logic and UX patterns
- May be created, modified, or deleted without affecting foundation
- Live outside foundation component folders
- Use descriptive, intent-based names

---

## 🔒 Foundation Layer (LOCKED)

### Locked Foundation Components

The following components are **locked** and **immutable**:

| Component       | Category   | Base Library      | Notes                                                                         |
| --------------- | ---------- | ----------------- | ----------------------------------------------------------------------------- |
| **Modal**       | Overlays   | Radix Dialog      | Sole modal foundation. All modal-like components must use this internally.    |
| **Tabs**        | Navigation | Radix Tabs        | Sole tabs foundation. All tab-based navigation must use this internally.      |
| **Select**      | Inputs     | Radix Select      | Sole select foundation. All dropdown selection must use this internally.      |
| **ContextMenu** | Menus      | Radix ContextMenu | Sole context menu foundation. All right-click menus must use this internally. |
| **Toast**       | Overlays   | Radix Toast       | Sole toast foundation. All notification toasts must use this internally.      |

### Foundation Component Rules

**CRITICAL RULES:**

1. **ONE FOUNDATION PER CATEGORY**
   - There is **exactly ONE** foundation component per category
   - No duplicates, no alternatives, no "simple" or "basic" versions

2. **FOUNDATION COMPONENTS ARE IMMUTABLE**
   - Foundation components **cannot be deleted**
   - Foundation components **cannot be renamed**
   - Foundation APIs are **backward-compatible** (no breaking changes)
   - Bug fixes are **allowed** (with approval)

3. **FOUNDATION COMPONENTS DEFINE BEHAVIOR**
   - Foundation components define the **canonical behavior** for their category
   - All extensions must use foundation components internally
   - Extensions **cannot replace** foundation components

4. **NO NEW FOUNDATION COMPONENTS**
   - **No new foundation components may be added**
   - The foundation layer is **closed**
   - All new functionality must be built as extensions

5. **FOUNDATION EXPORTS ARE STABLE**
   - Foundation component exports are **stable** and **backward-compatible**
   - Breaking changes to foundation APIs are **forbidden**

### Foundation Component Locations

| Component   | Location                             | Export Path                                                          |
| ----------- | ------------------------------------ | -------------------------------------------------------------------- |
| Modal       | `src/components/modal/`              | `@tenerife.music/ui` → `Modal`, `ModalRoot`, `ModalContent`, etc.    |
| Tabs        | `src/components/navigation/tabs/`    | `@tenerife.music/ui` → `Tabs`, `TabsRoot`, `TabsList`, etc.          |
| Select      | `src/components/select/`             | `@tenerife.music/ui` → `Select`, `SelectRoot`, `SelectTrigger`, etc. |
| ContextMenu | `src/components/menus/context-menu/` | `@tenerife.music/ui` → `ContextMenuRoot`, `ContextMenuTrigger`, etc. |
| Toast       | `src/components/overlays/`           | `@tenerife.music/ui` → `Toast`, `ToastProvider`, `useToast`          |

---

## 🎨 Extension Layer

### Extension Component Rules

**EXTENSION RULES:**

1. **EXTENSIONS MUST USE FOUNDATION COMPONENTS**
   - Extensions **must** use foundation components internally
   - Extensions **cannot** bypass foundation components
   - Extensions **cannot** replace foundation components

2. **EXTENSIONS MUST NOT BE NAMED AFTER FOUNDATION**
   - Extensions **cannot** use foundation component names
   - No `SimpleModal`, `BasicTabs`, `OldSelect`, `LegacyToast`
   - Extensions use **descriptive, intent-based names**

3. **EXTENSIONS LIVE OUTSIDE FOUNDATION FOLDERS**
   - Extensions **must** live in separate folders
   - Examples: `src/components/modals/`, `src/components/patterns/`, `src/components/extensions/`
   - Foundation folders are **reserved** for foundation components only

4. **EXTENSIONS MAY ADD OPINIONATED UX**
   - Extensions may add domain-specific logic
   - Extensions may add opinionated UX patterns
   - Extensions may add feature-rich behavior

5. **EXTENSIONS MAY BE DELETED OR REPLACED**
   - Extensions can be **created, modified, or deleted** freely
   - Changes to extensions **do not affect** foundation components
   - Extensions are **not part of the stable API**

### Extension Examples

**ALLOWED Extensions:**

- `ConfirmDialog` - Uses `Modal` internally, adds confirmation logic
- `NotificationCenter` - Uses `Toast` internally, adds notification management
- `MultiSelect` - Uses `Select` internally, adds multi-selection logic
- `TabNavigation` - Uses `Tabs` internally, adds routing integration
- `ContextMenuActions` - Uses `ContextMenu` internally, adds action patterns

**FORBIDDEN Extensions:**

- ❌ `SimpleModal` - Uses foundation name
- ❌ `BasicTabs` - Uses foundation name
- ❌ `OldSelect` - Uses foundation name
- ❌ `LegacyToast` - Uses foundation name
- ❌ `ModalV2` - Duplicates foundation functionality

---

## 📝 Naming Rules

### Foundation Naming Rules

**FOUNDATION NAMES ARE RESERVED:**

1. **Foundation names are immutable**
   - `Modal`, `Tabs`, `Select`, `ContextMenu`, `Toast` are **reserved**
   - These names **cannot** be used for extensions
   - These names **cannot** be modified

2. **No prefixes allowed for foundation components**
   - ❌ `SimpleModal`, `BasicModal`, `OldSelect`, `LegacyToast` (foundation duplicates)
   - ❌ `ModalV2`, `TabsV2`, `SelectV2` (foundation duplicates)
   - ❌ `NewModal`, `NewTabs`, `NewSelect` (foundation duplicates)
   - ⚠️ **Note:** `Basic*` naming is **allowed** for internal components within a component family (e.g., `BasicButton` inside a button family), but **never** for global foundation components (Modal, Tabs, Select, ContextMenu, Toast)

3. **No suffixes allowed**
   - ❌ `ModalBasic`, `TabsSimple`, `SelectOld`
   - ❌ `ModalLegacy`, `TabsLegacy`, `SelectLegacy`

### Extension Naming Rules

**EXTENSIONS USE DESCRIPTIVE NAMES:**

1. **Intent-based naming**
   - ✅ `ConfirmDialog` - Describes intent (confirmation)
   - ✅ `NotificationCenter` - Describes intent (notification management)
   - ✅ `MultiSelect` - Describes intent (multi-selection)
   - ✅ `TabNavigation` - Describes intent (navigation with tabs)

2. **Domain-specific naming**
   - ✅ `EventModal` - Domain-specific (events)
   - ✅ `UserContextMenu` - Domain-specific (users)
   - ✅ `SearchSelect` - Domain-specific (search)

3. **Pattern-based naming**
   - ✅ `ModalWithForm` - Pattern (modal with form)
   - ✅ `TabsWithRouting` - Pattern (tabs with routing)
   - ✅ `SelectWithSearch` - Pattern (select with search)

---

## 📚 Storybook Rules

### Storybook Structure

**STORYBOOK ORGANIZATION:**

1. **Foundation Components**
   - Foundation components appear under **`UI / Foundation`**
   - Examples:
     - `UI / Foundation / Modal`
     - `UI / Foundation / Tabs`
     - `UI / Foundation / Select`
     - `UI / Foundation / ContextMenu`
     - `UI / Foundation / Toast`

2. **Extension Components**
   - Extensions appear under **`UI / Extensions`** or **`UI / Patterns`**
   - Examples:
     - `UI / Extensions / ConfirmDialog`
     - `UI / Patterns / NotificationCenter`
     - `UI / Extensions / MultiSelect`

3. **No Duplicate Names**
   - Storybook **must not** show duplicate component names
   - If an extension exists, it **cannot** share a name with a foundation component
   - Storybook structure **must** reflect the architecture lock

### Storybook Naming Convention

```
UI /
├── Foundation /
│   ├── Modal
│   ├── Tabs
│   ├── Select
│   ├── ContextMenu
│   └── Toast
├── Extensions /
│   ├── ConfirmDialog
│   ├── NotificationCenter
│   └── MultiSelect
└── Patterns /
    ├── ModalWithForm
    └── TabsWithRouting
```

---

## 🤖 Cursor / AI Rules

### AI Development Rules

**CURSOR AI MUST FOLLOW THESE RULES:**

1. **NO NEW FOUNDATION COMPONENTS**
   - Cursor **must not** create new foundation components
   - Cursor **must not** suggest new foundation components
   - Cursor **must not** duplicate foundation functionality

2. **REUSE EXISTING FOUNDATION COMPONENTS**
   - Cursor **must** reuse existing foundation components
   - Cursor **must** suggest using foundation components for new features
   - Cursor **must** compose foundation components in extensions

3. **TREAT LOCKED COMPONENTS AS READ-ONLY**
   - Cursor **must** treat locked components as read-only
   - Cursor **must not** modify foundation components (except bug fixes)
   - Cursor **must** suggest extensions for new behavior

4. **PREFER EXTENSIONS FOR NEW BEHAVIOR**
   - Cursor **must** prefer extension components for new behavior
   - Cursor **must** suggest creating extensions instead of modifying foundation
   - Cursor **must** follow extension naming rules

### AI Prompt Guidelines

When requesting new components, Cursor should:

- ✅ **Suggest extensions** that use foundation components
- ✅ **Follow naming rules** (descriptive, intent-based)
- ✅ **Place extensions** in appropriate folders
- ❌ **Never suggest** new foundation components
- ❌ **Never suggest** modifying foundation components
- ❌ **Never suggest** duplicate foundation functionality

---

## 🛡️ Guard Prompt (AI Enforcement)

### TENERIFE UI — ARCHITECTURE LOCK (GUARD PROMPT)

**You are working inside the `@tenerife.music/ui` repository.**

⚠️ **UI FOUNDATION ARCHITECTURE IS LOCKED.**

### Foundation Components (Read-Only)

The following components are canonical and **MUST NOT** be recreated, duplicated, or replaced:

- **Modal** (Radix Dialog wrapper)
- **Tabs** (Radix Tabs wrapper)
- **Select** (Radix Select wrapper)
- **ContextMenu** (Radix ContextMenu wrapper)
- **Toast** (Radix Toast wrapper)

**You MUST treat these components as immutable.**

**You may ONLY:**

- Fix bugs
- Improve typing
- Improve documentation
- Improve token usage

**You MUST NEVER:**

- Create new foundation components
- Suggest alternative implementations
- Create `Simple*`, `Basic*`, `Legacy*`, `V2*`, or duplicate variants **for foundation components** (Modal, Tabs, Select, ContextMenu, Toast)
- Reimplement behavior handled by Radix

**Note on Basic* naming:**
- ❌ **FORBIDDEN:** `BasicModal`, `BasicTabs`, `BasicSelect` (these duplicate foundation components)
- ✅ **ALLOWED:** `BasicButton`, `BasicCard`, `BasicInput` (these are internal to a component family and do not duplicate foundation)
- The key distinction: Basic* is acceptable when it's clearly internal to a single family and does not duplicate a foundation component

### Extension Rules

If new behavior or UX is required:

- Create an **EXTENSION component**
- **EXTENSION** must compose an existing foundation component
- **EXTENSION** must **NOT** be named after a foundation component
- **EXTENSION** must live outside foundation folders

**Valid examples:**

- ✅ `ConfirmDialog` (uses Modal)
- ✅ `NotificationCenter` (uses Toast)
- ✅ `MultiSelect` (uses Select)

**Invalid examples:**

- ❌ `SimpleModal` (duplicates foundation Modal)
- ❌ `BasicModal` (duplicates foundation Modal)
- ❌ `CustomTabs` (duplicates foundation Tabs)
- ❌ `AdvancedSelect` (duplicates foundation Select)
- ❌ `ModalV2` (duplicates foundation Modal)

**Note:** `Basic*` naming is acceptable for internal components within a component family (e.g., `BasicButton` as an internal variant), but never for global foundation components.

### Radix Rule

All behavior-heavy components **MUST** delegate behavior to Radix.

**You MUST NOT implement:**

- Custom focus management
- Custom keyboard navigation
- Custom ARIA attributes
- Custom portal or scroll locking

### Token Rule

All visual props **MUST** use token unions.

**String or number-based visual props are forbidden.**

### Storybook Rule

Storybook **MUST** reflect architecture truth:

- One foundation component per category
- Extensions must be clearly labeled

### Enforcement

**If a request would violate these rules:**

**YOU MUST REFUSE and explain why.**

**This is non-negotiable.**

---

## 🚫 What Is Forbidden

### Forbidden Actions

**THE FOLLOWING ACTIONS ARE FORBIDDEN:**

1. **Creating New Foundation Components**
   - ❌ Creating `Drawer` as a foundation component
   - ❌ Creating `Popover` as a foundation component
   - ❌ Creating any new foundation component

2. **Duplicating Foundation Components**
   - ❌ Creating `SimpleModal`, `BasicTabs`, `OldSelect`
   - ❌ Creating `ModalV2`, `TabsV2`, `SelectV2`
   - ❌ Creating any duplicate foundation component

3. **Modifying Foundation Components (Breaking Changes)**
   - ❌ Removing props from foundation components
   - ❌ Changing foundation component APIs
   - ❌ Breaking backward compatibility

4. **Using Foundation Names for Extensions**
   - ❌ Naming extensions after foundation components
   - ❌ Using prefixes like `Simple*`, `Basic*`, `Old*`, `Legacy*`
   - ❌ Using suffixes like `*Basic`, `*Simple`, `*Old`, `*Legacy`

5. **Bypassing Foundation Components**
   - ❌ Creating modal-like components without using `Modal`
   - ❌ Creating tab-like components without using `Tabs`
   - ❌ Creating select-like components without using `Select`

6. **Placing Extensions in Foundation Folders**
   - ❌ Placing extensions in `src/components/modal/`
   - ❌ Placing extensions in `src/components/navigation/tabs/`
   - ❌ Placing extensions in foundation component folders

### Forbidden Patterns

```typescript
// ❌ FORBIDDEN - New foundation component
export const Drawer = () => { ... }; // Foundation layer is closed

// ❌ FORBIDDEN - Duplicate foundation component
export const SimpleModal = () => { ... }; // Uses foundation name

// ❌ FORBIDDEN - Extension in foundation folder
// src/components/modal/ConfirmDialog.tsx - Wrong location

// ❌ FORBIDDEN - Bypassing foundation component
export const CustomModal = () => {
  // Direct implementation without using Modal foundation
};

// ❌ FORBIDDEN - Breaking foundation API
export interface ModalProps {
  // Removing existing props
}
```

---

## ✅ What Is Allowed

### Allowed Actions

**THE FOLLOWING ACTIONS ARE ALLOWED:**

1. **Creating Extension Components**
   - ✅ Creating `ConfirmDialog` that uses `Modal` internally
   - ✅ Creating `NotificationCenter` that uses `Toast` internally
   - ✅ Creating `MultiSelect` that uses `Select` internally

2. **Modifying Foundation Components (Bug Fixes)**
   - ✅ Fixing bugs in foundation components
   - ✅ Improving accessibility in foundation components
   - ✅ Performance optimizations (non-breaking)

3. **Adding Non-Breaking Features to Foundation**
   - ✅ Adding new optional props (backward-compatible)
   - ✅ Adding new variants (backward-compatible)
   - ✅ Adding new subcomponents (backward-compatible)

4. **Creating Domain-Specific Extensions**
   - ✅ Creating `EventModal` for event management
   - ✅ Creating `UserContextMenu` for user actions
   - ✅ Creating `SearchSelect` for search functionality

5. **Creating Pattern-Based Extensions**
   - ✅ Creating `ModalWithForm` pattern
   - ✅ Creating `TabsWithRouting` pattern
   - ✅ Creating `SelectWithSearch` pattern

### Allowed Patterns

```typescript
// ✅ ALLOWED - Extension using foundation component
// src/components/modals/ConfirmDialog.tsx
import { Modal, ModalRoot, ModalContent } from "@tenerife.music/ui";

export const ConfirmDialog = ({ onConfirm, onCancel }) => {
  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        {/* Confirmation logic */}
      </ModalContent>
    </ModalRoot>
  );
};

// ✅ ALLOWED - Bug fix in foundation component
// src/components/modal/Modal.tsx
export const Modal = () => {
  // Fix: Improved focus trap behavior
};

// ✅ ALLOWED - Non-breaking feature addition
export interface ModalProps {
  existingProp?: string; // Existing prop
  newOptionalProp?: string; // ✅ New optional prop (backward-compatible)
}
```

---

## 🔍 Verification Checklist

Before considering the architecture lock complete, verify:

- [ ] All foundation components exist and are properly exported
- [ ] No duplicate foundation components exist
- [ ] Foundation components are in correct locations
- [ ] Storybook structure matches rules (Foundation vs Extensions)
- [ ] No extensions use foundation component names
- [ ] No extensions are in foundation folders
- [ ] All extensions use foundation components internally
- [ ] README.md references Architecture Lock document
- [ ] Architecture Lock document is complete and explicit

---

## 📊 Architecture Lock Status

| Component   | Status    | Locked Date | Notes                                                    |
| ----------- | --------- | ----------- | -------------------------------------------------------- |
| Modal       | ✅ LOCKED | 2025-12-12  | Radix Dialog wrapper. Sole modal foundation.             |
| Tabs        | ✅ LOCKED | 2025-12-12  | Radix Tabs wrapper. Sole tabs foundation.                |
| Select      | ✅ LOCKED | 2025-12-12  | Radix Select wrapper. Sole select foundation.            |
| ContextMenu | ✅ LOCKED | 2025-12-12  | Radix ContextMenu wrapper. Sole context menu foundation. |
| Toast       | ✅ LOCKED | 2025-12-12  | Radix Toast wrapper. Sole toast foundation.              |

**Foundation Layer Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-12  
**Next Review:** Never (foundation is immutable)

---

## 🎯 Success Criteria

The architecture lock is successful when:

- ✅ Architecture Lock document exists and is explicit
- ✅ Foundation components are listed and immutable
- ✅ Rules are clear enough to prevent future ambiguity
- ✅ Architecture phase is formally closed
- ✅ README.md references Architecture Lock document
- ✅ Storybook structure reflects architecture lock
- ✅ No duplicate foundation components exist
- ✅ All extensions follow naming and location rules

---

## 🚨 Failure Conditions

The architecture lock fails if:

- ❌ Ambiguous rules that allow interpretation
- ❌ Missing foundation components in documentation
- ❌ Room for interpretation on duplicates
- ❌ Architecture not explicitly marked as locked
- ❌ Foundation components not properly documented
- ❌ Extension rules not clearly defined

---

## 📖 Related Documents

- **[Final Foundation Lock](./FINAL_FOUNDATION_LOCK.md)** - 🔒 **Authoritative Foundation lock document** (single source of truth)
- **[UI Architecture Rules](./UI_ARCHITECTURE_RULES.md)** - Radix UI and Token Union rules
- **[Component Guidelines](../structure/COMPONENT_GUIDELINES.md)** - Component development guidelines
- **[Cursor UI Rules](./CURSOR_UI_RULES.md)** - Cursor AI development rules

---

## 🔄 Version History

- **v1.0** (2025-12-12): Initial Architecture Lock
  - Locked foundation components (Modal, Tabs, Select, ContextMenu, Toast)
  - Defined extension layer rules
  - Established naming conventions
  - Created Storybook structure rules
  - Defined Cursor AI rules

---

## 📝 Final Note

**After this lock, the UI foundation architecture is considered complete and immutable.**

All future work must occur in the **extension layer**. Foundation components are **read-only** except for bug fixes. New functionality must be built as **extensions** that compose foundation components.

**This is a binding architectural contract. Violations are considered architectural breaches.**

---

**Status:** ✅ **LOCKED**  
**Version:** 1.0  
**Date Created:** 2025-12-12  
**Priority:** CRITICAL  
**Next Review:** Never (foundation is immutable)
