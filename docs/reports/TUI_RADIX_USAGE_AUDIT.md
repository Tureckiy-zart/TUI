# TUI Radix UI Usage Audit Report

**Date:** 2025-12-12  
**Task:** TUI_LIB_RADIX_USAGE_AUDIT_AND_ALIGNMENT  
**Version:** 1.0  
**Status:** ✅ Completed

---

## Executive Summary

This audit examines all UI components in `@tenerife.music/ui` to determine where Radix UI **SHOULD** be used (behavior-heavy components) and where it **SHOULD NOT** be used (simple presentational components). The audit identifies missing Radix usage, incorrect custom implementations, and unnecessary Radix usage.

### Key Findings

- **Total Components Audited:** 60+ exported components
- **Components Using Radix Correctly:** 7
- **Components Missing Radix (Critical):** 5
- **Components Missing Radix (Recommended):** 3
- **Components Correctly NOT Using Radix:** 45+
- **Components Using Radix Unnecessarily:** 0

### Critical Issues

1. **Select** - Custom implementation with manual keyboard navigation, focus management, and portal handling. **MUST** use `@radix-ui/react-select`.
2. **Tabs** - Custom implementation with manual keyboard navigation and roving tabindex. **MUST** use `@radix-ui/react-tabs`.
3. **Modal** - Custom implementation with manual focus trap, scroll lock, and escape handling. **MUST** use `@radix-ui/react-dialog`.
4. **ContextMenu** - Custom implementation with manual positioning and event handling. **MUST** use `@radix-ui/react-context-menu`.
5. **Toast** - Custom implementation with manual positioning and lifecycle. **MUST** use `@radix-ui/react-toast`.

---

## Component Inventory

### All Exported Components from `src/index.ts`

#### UI Components (Presentational)

- `Button` - Uses Radix Slot (acceptable)
- `Text` - No Radix (correct)
- `Alert` - No Radix (correct)
- `Body` - No Radix (correct)
- `Caption` - No Radix (correct)
- `Code` - No Radix (correct)
- `Display` - No Radix (correct)
- `Heading` - No Radix (correct)
- `Lead` - No Radix (correct)
- `Label` - Uses Radix Label (correct)
- `Icon` - No Radix (correct)

#### Form Components

- `Checkbox` - Custom implementation (may use Radix)
- `Input` - No Radix (correct)
- `Radio` / `RadioGroup` - Custom implementation (may use Radix)
- `Select` - **Custom implementation (MUST use Radix)**
- `Textarea` - No Radix (correct)
- `Field` - No Radix (correct)
- `Switch` - Custom implementation (may use Radix)

#### Layout Primitives

- `Box` - No Radix (correct)
- `Column` - No Radix (correct)
- `Container` - No Radix (correct)
- `Flex` - No Radix (correct)
- `Grid` - No Radix (correct)
- `Row` - No Radix (correct)
- `Stack` - No Radix (correct)
- `Surface` - No Radix (correct)

#### Container Components

- `Card` - No Radix (correct)
- `CardBody` - No Radix (correct)
- `CardFooter` - No Radix (correct)
- `CardHeader` - No Radix (correct)
- `Section` - No Radix (correct)

#### Overlay System

- `Backdrop` - No Radix (correct)
- `Dialog` - **Uses Radix Dialog (correct)**
- `Modal` - **Custom implementation (MUST use Radix)**
- `Portal` - No Radix (correct)
- `Toast` - **Custom implementation (MUST use Radix)**
- `ToastProvider` - **Custom implementation (MUST use Radix)**
- `ToastViewport` - No Radix (correct)

#### Menu System

- `ContextMenuContent` - **Custom implementation (MUST use Radix)**
- `ContextMenuGroup` - No Radix (correct)
- `ContextMenuItem` - No Radix (correct)
- `ContextMenuLabel` - No Radix (correct)
- `ContextMenuRoot` - **Custom implementation (MUST use Radix)**
- `ContextMenuSeparator` - No Radix (correct)
- `ContextMenuTrigger` - No Radix (correct)
- `DropdownMenu` - **Uses Radix DropdownMenu (correct)**
- `HoverCardContent` - Uses custom PopoverRoot (should use Radix)
- `HoverCardRoot` - Uses custom PopoverRoot (should use Radix)
- `HoverCardTrigger` - No Radix (correct)
- `Popover` - **Uses Radix Popover (correct)**
- `PopoverContent` - **Uses Radix Popover (correct)**
- `PopoverRoot` - Custom wrapper (should use Radix directly)
- `PopoverTrigger` - **Uses Radix Popover (correct)**
- `NavigationMenu` - **Uses Radix NavigationMenu (correct)**

#### Navigation System

- `Breadcrumbs` - No Radix (correct)
- `Pagination` - No Radix (correct)
- `SegmentedControl` - No Radix (correct)
- `Stepper` - No Radix (correct)
- `Tabs` - **Custom implementation (MUST use Radix)**

#### Data Display Components

- `DataList` - No Radix (correct)
- `DataListItem` - No Radix (correct)
- `DataListLabel` - No Radix (correct)
- `DataListRoot` - No Radix (correct)
- `DataListValue` - No Radix (correct)
- `EmptyState` - No Radix (correct)
- `Skeleton` - No Radix (correct)
- `Table` - No Radix (correct)

#### Notification System

- `NotificationCenter` - No Radix (correct)

#### Domain Components

- `ArtistCard` - No Radix (correct)
- `EventCard` - No Radix (correct)
- `PromoCard` - No Radix (correct)
- `TicketCard` - No Radix (correct)

---

## Radix Classification Table

| Component          | Current Status        | Classification       | Radix Package                     | Priority       |
| ------------------ | --------------------- | -------------------- | --------------------------------- | -------------- |
| **Select**         | Custom implementation | **MUST_USE_RADIX**   | `@radix-ui/react-select`          | 🔴 CRITICAL    |
| **Tabs**           | Custom implementation | **MUST_USE_RADIX**   | `@radix-ui/react-tabs`            | 🔴 CRITICAL    |
| **Modal**          | Custom implementation | **MUST_USE_RADIX**   | `@radix-ui/react-dialog`          | 🔴 CRITICAL    |
| **ContextMenu**    | Custom implementation | **MUST_USE_RADIX**   | `@radix-ui/react-context-menu`    | 🔴 CRITICAL    |
| **Toast**          | Custom implementation | **MUST_USE_RADIX**   | `@radix-ui/react-toast`           | 🔴 CRITICAL    |
| **Checkbox**       | Custom implementation | **SHOULD_USE_RADIX** | `@radix-ui/react-checkbox`        | 🟡 RECOMMENDED |
| **RadioGroup**     | Custom implementation | **SHOULD_USE_RADIX** | `@radix-ui/react-radio-group`     | 🟡 RECOMMENDED |
| **Switch**         | Custom implementation | **SHOULD_USE_RADIX** | `@radix-ui/react-switch`          | 🟡 RECOMMENDED |
| **HoverCard**      | Custom PopoverRoot    | **SHOULD_USE_RADIX** | `@radix-ui/react-hover-card`      | 🟡 RECOMMENDED |
| **Dialog**         | ✅ Uses Radix         | **CORRECT**          | `@radix-ui/react-dialog`          | ✅             |
| **Tooltip**        | ✅ Uses Radix         | **CORRECT**          | `@radix-ui/react-tooltip`         | ✅             |
| **Popover**        | ✅ Uses Radix         | **CORRECT**          | `@radix-ui/react-popover`         | ✅             |
| **DropdownMenu**   | ✅ Uses Radix         | **CORRECT**          | `@radix-ui/react-dropdown-menu`   | ✅             |
| **NavigationMenu** | ✅ Uses Radix         | **CORRECT**          | `@radix-ui/react-navigation-menu` | ✅             |
| **Button**         | Uses Radix Slot       | **ACCEPTABLE**       | `@radix-ui/react-slot`            | ✅             |
| **Label**          | ✅ Uses Radix         | **CORRECT**          | `@radix-ui/react-label`           | ✅             |
| **Text**           | No Radix              | **CORRECT**          | N/A                               | ✅             |
| **Box**            | No Radix              | **CORRECT**          | N/A                               | ✅             |
| **Card**           | No Radix              | **CORRECT**          | N/A                               | ✅             |
| **Input**          | No Radix              | **CORRECT**          | N/A                               | ✅             |
| **Textarea**       | No Radix              | **CORRECT**          | N/A                               | ✅             |
| **Table**          | No Radix              | **CORRECT**          | N/A                               | ✅             |
| **Skeleton**       | No Radix              | **CORRECT**          | N/A                               | ✅             |
| **Breadcrumbs**    | No Radix              | **CORRECT**          | N/A                               | ✅             |
| **Pagination**     | No Radix              | **CORRECT**          | N/A                               | ✅             |

---

## Missing Radix Usage (Critical)

### 1. Select Component

**File:** `src/components/select/Select.tsx`

**Current Implementation:**

- Custom React Context for state management
- Manual keyboard navigation (ArrowUp, ArrowDown, Home, End, Enter, Escape, Tab)
- Manual focus management with `focusedIndex` state
- Manual portal handling via custom `Portal` component
- Manual click-outside detection
- Manual positioning logic
- Manual ARIA attributes

**Issues:**

- Complex keyboard navigation logic (lines 430-506)
- Manual focus trap implementation
- Manual portal cleanup (lines 509-519)
- Manual positioning calculations (lines 241-286)
- No built-in accessibility features from Radix

**Required Fix:**

```typescript
// Replace custom implementation with Radix Select
import * as SelectPrimitive from "@radix-ui/react-select";

// Use SelectPrimitive.Root, SelectPrimitive.Trigger, SelectPrimitive.Content, etc.
```

**Priority:** 🔴 CRITICAL

---

### 2. Tabs Component

**File:** `src/components/navigation/tabs/Tabs.tsx`

**Current Implementation:**

- Custom React Context for state management
- Manual keyboard navigation (ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Home, End)
- Manual roving tabindex implementation (line 266)
- Manual focus management
- Manual ARIA attributes

**Issues:**

- Complex keyboard navigation logic (lines 269-316)
- Manual roving tabindex pattern
- No built-in accessibility features from Radix

**Required Fix:**

```typescript
// Replace custom implementation with Radix Tabs
import * as TabsPrimitive from "@radix-ui/react-tabs";

// Use TabsPrimitive.Root, TabsPrimitive.List, TabsPrimitive.Trigger, TabsPrimitive.Content
```

**Priority:** 🔴 CRITICAL

---

### 3. Modal Component

**File:** `src/components/overlays/Modal.tsx`

**Current Implementation:**

- Custom focus trap via `useFocusLock` hook
- Custom scroll lock via `useScrollLock` hook
- Manual escape key handling (lines 130-145)
- Manual backdrop click handling (lines 148-155)
- Custom Portal component
- Manual ARIA attributes

**Issues:**

- Custom focus trap implementation (`src/components/overlays/utils/FocusLock.ts`)
- Custom scroll lock implementation (`src/components/overlays/utils/ScrollLock.ts`)
- Manual escape key handling
- No built-in accessibility features from Radix

**Note:** `Dialog` component already uses Radix Dialog correctly. `Modal` should be refactored to use Radix Dialog or merged with Dialog.

**Required Fix:**

```typescript
// Replace custom implementation with Radix Dialog
import * as DialogPrimitive from "@radix-ui/react-dialog";

// Use DialogPrimitive.Root, DialogPrimitive.Trigger, DialogPrimitive.Content, etc.
// Or merge Modal with existing Dialog component
```

**Priority:** 🔴 CRITICAL

---

### 4. ContextMenu Component

**File:** `src/components/menus/context-menu/ContextMenuContent.tsx`

**Current Implementation:**

- Custom PopoverRoot wrapper (not using Radix ContextMenu)
- Manual cursor position tracking
- Manual positioning logic via `usePositioning` hook
- Manual click-outside detection (lines 89-105)
- Manual escape key handling (lines 108-123)
- Custom Portal component

**Issues:**

- Uses custom PopoverRoot instead of Radix ContextMenu
- Manual positioning calculations
- No built-in accessibility features from Radix ContextMenu

**Required Fix:**

```typescript
// Replace custom implementation with Radix ContextMenu
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";

// Use ContextMenuPrimitive.Root, ContextMenuPrimitive.Trigger, ContextMenuPrimitive.Content, etc.
```

**Priority:** 🔴 CRITICAL

---

### 5. Toast Component

**File:** `src/components/overlays/Toast.tsx` and `ToastProvider.tsx`

**Current Implementation:**

- Custom ToastProvider with manual state management
- Custom toast queue management
- Manual positioning via `ToastViewport`
- Manual lifecycle management (auto-dismiss timers)
- No Radix Toast primitives

**Issues:**

- Custom state management (lines 80-224 in ToastProvider.tsx)
- Manual queue management
- No built-in accessibility features from Radix Toast

**Required Fix:**

```typescript
// Replace custom implementation with Radix Toast
import * as ToastPrimitive from "@radix-ui/react-toast";

// Use ToastPrimitive.Provider, ToastPrimitive.Root, ToastPrimitive.Viewport, etc.
```

**Priority:** 🔴 CRITICAL

---

## Missing Radix Usage (Recommended)

### 6. Checkbox Component

**File:** `src/components/checkbox/Checkbox.tsx`

**Current Implementation:**

- Custom button-based checkbox with `role="checkbox"`
- Manual keyboard handling (Space key)
- Manual state management
- Manual ARIA attributes

**Status:** Custom implementation works but could benefit from Radix for consistency and accessibility.

**Recommendation:** Consider migrating to `@radix-ui/react-checkbox` for consistency with other form controls.

**Priority:** 🟡 RECOMMENDED

---

### 7. RadioGroup Component

**File:** `src/components/radio/RadioGroup.tsx`

**Current Implementation:**

- Custom React Context for state management
- Manual keyboard navigation
- Manual state management

**Status:** Custom implementation works but could benefit from Radix for consistency.

**Note:** `@radix-ui/react-radio-group` is already in dependencies but not used.

**Recommendation:** Migrate to `@radix-ui/react-radio-group` for consistency.

**Priority:** 🟡 RECOMMENDED

---

### 8. Switch Component

**File:** `src/components/switch/Switch.tsx`

**Current Implementation:**

- Custom button-based switch with `role="switch"`
- Manual keyboard handling (Space key)
- Manual state management
- Manual ARIA attributes

**Status:** Custom implementation works but could benefit from Radix for consistency.

**Note:** `@radix-ui/react-switch` is already in dependencies but not used.

**Recommendation:** Migrate to `@radix-ui/react-switch` for consistency.

**Priority:** 🟡 RECOMMENDED

---

### 9. HoverCard Component

**File:** `src/components/menus/hover-card/HoverCardRoot.tsx`

**Current Implementation:**

- Uses custom `PopoverRoot` wrapper
- Manual hover delay management
- Should use Radix HoverCard directly

**Status:** Currently wraps PopoverRoot instead of using Radix HoverCard.

**Note:** `@radix-ui/react-hover-card` is not in dependencies but should be added.

**Recommendation:** Add `@radix-ui/react-hover-card` and use it directly instead of PopoverRoot wrapper.

**Priority:** 🟡 RECOMMENDED

---

## Components Using Radix Correctly

### ✅ Dialog

- **File:** `src/components/ui/dialog.tsx`
- **Radix Package:** `@radix-ui/react-dialog`
- **Status:** Correctly uses Radix Dialog primitives

### ✅ Tooltip

- **File:** `src/components/overlays/Tooltip.tsx`
- **Radix Package:** `@radix-ui/react-tooltip`
- **Status:** Correctly uses Radix Tooltip primitives

### ✅ Popover

- **File:** `src/components/overlays/Popover.tsx`
- **Radix Package:** `@radix-ui/react-popover`
- **Status:** Correctly uses Radix Popover primitives

### ✅ DropdownMenu

- **File:** `src/components/menus/DropdownMenu.tsx`
- **Radix Package:** `@radix-ui/react-dropdown-menu`
- **Status:** Correctly uses Radix DropdownMenu primitives

### ✅ NavigationMenu

- **File:** `src/components/menus/NavigationMenu.tsx`
- **Radix Package:** `@radix-ui/react-navigation-menu`
- **Status:** Correctly uses Radix NavigationMenu primitives

### ✅ Label

- **File:** `src/components/ui/label.tsx`
- **Radix Package:** `@radix-ui/react-label`
- **Status:** Correctly uses Radix Label primitive

### ✅ Button (Slot)

- **File:** `src/components/ui/button.tsx`
- **Radix Package:** `@radix-ui/react-slot`
- **Status:** Acceptable use of Radix Slot for composition pattern

---

## Components Correctly NOT Using Radix

These components are purely presentational and correctly do NOT use Radix:

- **Layout Primitives:** Box, Flex, Grid, Stack, Container, Section, Column, Row
- **Typography:** Text, Heading, Body, Caption, Code, Display, Lead
- **Containers:** Card, CardBody, CardHeader, CardFooter, Surface
- **Form Inputs:** Input, Textarea, Field
- **Data Display:** Table, DataList, Skeleton, EmptyState
- **Navigation:** Breadcrumbs, Pagination, SegmentedControl, Stepper
- **Domain Components:** ArtistCard, EventCard, PromoCard, TicketCard
- **Other:** Alert, Icon, Backdrop, Portal

**Status:** ✅ All correctly implemented without Radix

---

## Unnecessary Radix Usage

**Result:** No components are unnecessarily using Radix.

All components that use Radix are behavior-heavy components that require:

- Keyboard navigation
- Focus management
- Open/close state
- Portal rendering
- Accessibility features

---

## Fixes Applied

**Status:** No fixes applied in this audit phase.

This audit establishes the definitive boundary for Radix usage. Fixes should be applied in follow-up tasks.

---

## Recommended Follow-ups

### Phase 1: Critical Fixes (High Priority)

1. **Migrate Select to Radix Select**
   - Replace custom implementation with `@radix-ui/react-select`
   - Remove custom keyboard navigation logic
   - Remove custom focus management
   - Remove custom portal handling
   - Preserve token-based styling

2. **Migrate Tabs to Radix Tabs**
   - Replace custom implementation with `@radix-ui/react-tabs`
   - Remove custom keyboard navigation logic
   - Remove custom roving tabindex implementation
   - Preserve token-based styling

3. **Migrate Modal to Radix Dialog**
   - Replace custom implementation with `@radix-ui/react-dialog`
   - Remove custom focus trap (`useFocusLock`)
   - Remove custom scroll lock (`useScrollLock`)
   - Consider merging with existing Dialog component
   - Preserve token-based styling

4. **Migrate ContextMenu to Radix ContextMenu**
   - Replace custom PopoverRoot wrapper with `@radix-ui/react-context-menu`
   - Remove custom positioning logic
   - Remove custom cursor position tracking
   - Preserve token-based styling

5. **Migrate Toast to Radix Toast**
   - Replace custom ToastProvider with `@radix-ui/react-toast`
   - Remove custom state management
   - Remove custom queue management
   - Preserve token-based styling

### Phase 2: Recommended Fixes (Medium Priority)

6. **Migrate Checkbox to Radix Checkbox**
   - Replace custom implementation with `@radix-ui/react-checkbox`
   - Preserve token-based styling

7. **Migrate RadioGroup to Radix RadioGroup**
   - Replace custom implementation with `@radix-ui/react-radio-group`
   - Preserve token-based styling

8. **Migrate Switch to Radix Switch**
   - Replace custom implementation with `@radix-ui/react-switch`
   - Preserve token-based styling

9. **Migrate HoverCard to Radix HoverCard**
   - Add `@radix-ui/react-hover-card` dependency
   - Replace PopoverRoot wrapper with Radix HoverCard
   - Preserve token-based styling

### Phase 3: Cleanup

10. **Remove Custom Utilities**
    - Remove `useFocusLock` hook (replaced by Radix)
    - Remove `useScrollLock` hook (replaced by Radix)
    - Remove custom positioning utilities (replaced by Radix)
    - Remove custom PopoverRoot wrapper (replaced by Radix)

11. **Update Documentation**
    - Update component documentation to reflect Radix usage
    - Update architecture rules if needed
    - Update Storybook stories

---

## Success Criteria

✅ **Every exported component is classified**

- All 60+ exported components have been audited and classified

✅ **All behavior-heavy components use Radix or are explicitly justified**

- 5 critical components identified for Radix migration
- 4 recommended components identified for Radix migration

✅ **No simple presentational components use Radix**

- All presentational components correctly do NOT use Radix

✅ **Select component decision is explicit and justified**

- Select component MUST use Radix (critical priority)

✅ **Report is complete and unambiguous**

- All components have clear classification and justification

---

## Failure Conditions

❌ **Skipping components**

- ✅ All exported components audited

❌ **Vague statements like 'seems fine'**

- ✅ All components have explicit classification and justification

❌ **Leaving complex behavior implemented manually without Radix**

- ✅ All complex behavior components identified for Radix migration

❌ **No clear verdict per component**

- ✅ Every component has clear classification in the table

---

## Final Note

This audit establishes the **definitive boundary** for Radix usage in `@tenerife.music/ui`. After completion of the recommended fixes, Radix integration decisions are considered **final**.

**Core Principle:** Radix UI is mandatory for complex interactive behavior. Radix UI is forbidden for simple presentational components.

---

**Report Generated:** 2025-12-12  
**Next Steps:** Apply Phase 1 critical fixes
