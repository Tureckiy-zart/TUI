# Toast Component — Foundation Refactor Audit Report

**Component:** Toast  
**Layer:** Foundation (Legacy Unlocked)  
**Date Created:** 2025-12-24  
**Operator:** System  
**Task ID:** TUI_TOAST_STEP_0  
**Pipeline:** Foundation Step Pipeline (18A) — STEP 0–11

---

## Document Status

**Current Step:** STEP 0 — Baseline Snapshot & Context Fixation  
**Status:** ✅ COMPLETE  
**Last Updated:** 2025-12-24

---

## Executive Summary

This audit report tracks the canonical Foundation refactor of the **Toast** component through the mandatory Foundation Step Pipeline (18A). The component is currently marked as **LEGACY UNLOCKED** (unlocked 2025-12-19) and requires full migration to canonical Foundation standards.

**Current State:**
- Toast is implemented using Radix UI Toast primitives
- Token-driven styling via `TOAST_TOKENS`
- CVA-based variant system (default, success, info, warning, danger)
- No test coverage detected
- Storybook stories exist but coverage is basic

**Target State:**
- Full compliance with all Authority Contracts
- Canonical CVA patterns aligned with Button/Link standards
- Complete test coverage (behavior + edge cases)
- Comprehensive Storybook coverage (matrix + states)
- Accessibility audit passed
- Foundation LOCKED status

---

## STEP 0 — Baseline Snapshot & Context Fixation

**Outcome:** ✅ Baseline established  
**Blocking:** No  
**Date Completed:** 2025-12-24

### 0.1 Component Metadata

| Property | Value |
|----------|-------|
| **Component Name** | Toast |
| **Declared Layer** | Foundation (Legacy Unlocked) |
| **Unlock Date** | 2025-12-19 |
| **Unlock Task** | TUNG_FOUNDATION_LEGACY_UNLOCK_01 |
| **Category** | Overlay / Notification |
| **External Dependencies** | `@radix-ui/react-toast`, `class-variance-authority`, `lucide-react` |
| **Foundation Tokens** | `TOAST_TOKENS`, `MOTION_TOKENS` |

### 0.2 Implementation Files

**Primary Implementation:**
```
src/COMPOSITION/overlays/Toast.tsx (342 lines)
```

**Supporting Files:**
```
src/COMPOSITION/overlays/ToastProvider.tsx (204 lines)
src/COMPOSITION/overlays/ToastViewport.tsx (73 lines)
src/COMPOSITION/overlays/Toaster/Toaster.tsx (30 lines)
src/COMPOSITION/overlays/Toast.stories.tsx (203 lines)
```

**Token Files:**
```
src/FOUNDATION/tokens/components/toast.ts (183 lines)
```

**Export Files:**
```
src/COMPOSITION/overlays/index.ts (exports Toast, ToastProvider, ToastViewport, Toaster)
```

**Test Files:**
```
None detected
```

### 0.3 Public Exports

**From `Toast.tsx`:**
```typescript
// Main Components
export { ToastRoot }           // Main toast component (Radix wrapper)
export { ToastTitle }          // Toast title (Radix wrapper)
export { ToastDescription }    // Toast description (Radix wrapper)
export { ToastAction }         // Toast action button (Radix wrapper)
export { ToastClose }          // Toast close button (Radix wrapper)

// CVA Variants
export { toastVariants }       // CVA variant definitions

// Legacy Aliases (Backward Compatibility)
export { Toast }               // Alias for ToastRoot
export type { ToastProps }     // Alias for ToastRootProps

// Types
export type { ToastRootProps }
export type { ToastData }
export type { ToastActionData }
```

**From `ToastProvider.tsx`:**
```typescript
export { ToastProvider }       // Toast context provider
export { useToast }            // Toast context hook
export type { ToastProviderProps }
export type { ToastOptions }
```

**From `ToastViewport.tsx`:**
```typescript
export { ToastViewport }       // Toast viewport (Radix wrapper)
export type { ToastViewportProps }
export type { ToastPosition }  // "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
```

**From `Toaster/Toaster.tsx`:**
```typescript
export { Toaster }             // Global toast renderer component
```

### 0.4 Public API Shape

**ToastRoot (Main Component):**
```typescript
interface ToastRootProps extends 
  Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>, "duration">,
  VariantProps<typeof toastVariants> 
{
  toast: ToastData;
}

interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "info" | "warning" | "danger";
  action?: ToastActionData;
  duration?: ResponsiveDelay;
}

interface ToastActionData {
  label: string;
  onClick: () => void;
}
```

**ToastProvider:**
```typescript
interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  swipeDirection?: "up" | "down" | "left" | "right";
  duration?: number;  // Raw number (Radix API requirement)
}

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "success" | "info" | "warning" | "danger";
  action?: ToastActionData;
  duration?: ResponsiveDelay;
}
```

**ToastViewport:**
```typescript
interface ToastViewportProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> {
  position?: ToastPosition;
}

type ToastPosition = 
  | "top-left" 
  | "top-center" 
  | "top-right" 
  | "bottom-left" 
  | "bottom-center" 
  | "bottom-right";
```

### 0.5 CVA Variant System

**Current Variants:**
```typescript
const toastVariants = cva(
  // Base classes (all toasts)
  "group pointer-events-auto relative flex items-center justify-between overflow-hidden border w-full gap-sm transition-all ...",
  {
    variants: {
      variant: {
        default: "bg-background border border-border text-foreground rounded-lg shadow-lg p-md",
        success: "bg-success/10 border-success/20 text-success-foreground rounded-lg shadow-lg p-md",
        info: "bg-info/10 border-info/20 text-info-foreground rounded-lg shadow-lg p-md",
        warning: "bg-warning/10 border-warning/20 text-warning-foreground rounded-lg shadow-lg p-md",
        danger: "bg-destructive/10 border-destructive/20 text-destructive-foreground rounded-lg shadow-lg p-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
```

**Observations:**
- Single variant dimension: `variant`
- No size variants (toasts are fixed size)
- All styling is token-driven via `TOAST_TOKENS`
- Radix data attributes handle animation states

### 0.6 External Dependencies

**Radix UI Toast:**
```typescript
import * as ToastPrimitives from "@radix-ui/react-toast";

// Used primitives:
- ToastPrimitives.Provider
- ToastPrimitives.Root
- ToastPrimitives.Title
- ToastPrimitives.Description
- ToastPrimitives.Action
- ToastPrimitives.Close
- ToastPrimitives.Viewport
```

**Other Dependencies:**
```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";  // Close icon
import { getDelayMs } from "@/FOUNDATION/lib/responsive-props";
import { cn } from "@/FOUNDATION/lib/utils";
```

**Token Dependencies:**
```typescript
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import { TOAST_TOKENS } from "@/FOUNDATION/tokens/components/toast";
import type { ResponsiveDelay } from "@/FOUNDATION/tokens/types";
```

### 0.7 Current Behavior Summary

**Toast Component:**
- Wraps Radix Toast.Root with token-driven styling
- Accepts `ToastData` object with title, description, variant, action, duration
- Converts `ResponsiveDelay` to milliseconds for Radix
- Renders title, description, action button (optional), and close button
- All behavior (swipe, auto-dismiss, focus, keyboard, a11y) delegated to Radix

**ToastProvider:**
- Wraps Radix Toast.Provider
- Provides `toast()`, `dismiss()`, `dismissAll()` functions via context
- Manages toast queue state (array of `ToastData`)
- Manages open/closed states per toast
- Uses setTimeout for cleanup after Radix animations (300ms delay)

**ToastViewport:**
- Wraps Radix Toast.Viewport
- Provides 6 position options (top/bottom × left/center/right)
- Token-driven positioning via `TOAST_TOKENS.position`

**Toaster:**
- Global toast renderer component
- Uses `useGlobalToast` hook (external dependency)
- Renders toasts from global state

### 0.8 Storybook Coverage

**Current Stories (Toast.stories.tsx):**
- `Default` — Demo with all 5 variant buttons
- `Success` — Single success variant button
- `WithAction` — Toast with action button (undo example)
- `MultipleToasts` — Shows 4 toasts simultaneously
- `AllVariants` — Grid of all 5 variants

**Coverage Assessment:**
- ✅ All variants demonstrated
- ❌ No matrix coverage (variants × states)
- ❌ No state demonstrations (open, closed, swiping)
- ❌ No edge cases (long text, no description, no title)
- ❌ No accessibility stories
- ❌ No responsive behavior stories

### 0.9 Test Coverage

**Current Test Files:**
```
None detected
```

**Required Test Coverage:**
- Component rendering (all variants)
- Toast lifecycle (show, auto-dismiss, manual dismiss)
- Action button behavior
- Close button behavior
- Multiple toasts (queue management)
- Accessibility (ARIA attributes, keyboard navigation)
- Edge cases (missing props, long text, etc.)

### 0.10 Token Usage Analysis

**Token Compliance:**
- ✅ All spacing via `TOAST_TOKENS.spacing` (gap, padding)
- ✅ All radius via `TOAST_TOKENS.radius`
- ✅ All shadows via `TOAST_TOKENS.shadow`
- ✅ All surface colors via `TOAST_TOKENS.surface`
- ✅ All animations via `TOAST_TOKENS.animation` + Radix data attributes
- ✅ All typography via `TOAST_TOKENS.title` and `TOAST_TOKENS.description`
- ✅ Motion transitions via `MOTION_TOKENS.transition`

**Observations:**
- No raw values detected in component code
- All visual properties map to tokens
- `duration` prop uses `ResponsiveDelay` type (token-driven)
- ToastProvider accepts raw `duration` number (Radix API requirement, documented exception)

### 0.11 Foundation Enforcement Compliance

**className/style Props:**
- ✅ ToastRoot: Accepts `className` (extends Radix props)
- ✅ ToastTitle: Accepts `className` (extends Radix props)
- ✅ ToastDescription: Accepts `className` (extends Radix props)
- ✅ ToastAction: Accepts `className` (extends Radix props)
- ✅ ToastClose: Accepts `className` (extends Radix props)
- ✅ ToastViewport: Accepts `className` (extends Radix props)

**Note:** All Toast components accept `className` because they wrap Radix primitives. This is intentional for composition flexibility. Foundation Enforcement rules may need clarification for Radix-based components.

### 0.12 Architecture Alignment

**Current Alignment:**
- ✅ Token-driven styling (all visual props via tokens)
- ✅ CVA-based variant system
- ✅ Radix primitive delegation (no reimplemented behavior)
- ✅ Explicit type exports
- ✅ No wildcard exports
- ❌ No test coverage
- ❌ Limited Storybook coverage
- ❌ No accessibility audit
- ⚠️ Legacy alias exports (`Toast`, `ToastProps`) for backward compatibility

**Deviations:**
- Legacy alias exports exist for backward compatibility
- ToastProvider accepts raw `duration` number (Radix API requirement)
- All components accept `className` (Radix wrapper pattern)

### 0.13 Known Issues & Observations

**Issues:**
1. No test files exist
2. Storybook coverage is basic (no matrix, no states, no edge cases)
3. No accessibility audit performed
4. Legacy alias exports (`Toast`, `ToastProps`) exist
5. Foundation Enforcement compliance unclear for Radix wrappers

**Observations:**
1. Component is well-documented with inline comments
2. All behavior correctly delegated to Radix
3. Token usage is exemplary (no raw values)
4. CVA structure is clean and consistent
5. Unlock rationale clearly documented in header

---

## FIX Backlog

### STEP 1 — Structural & Code Quality Review
**Status:** Pending  
**Blockers:** None  
**Notes:** To be executed in next step

### STEP 2 — Semantic Role & Responsibility Validation
**Status:** Pending  
**Blockers:** None  
**Notes:** To be executed in next step

### STEP 3 — Duplication & Internal Pattern Alignment
**Status:** Pending  
**Blockers:** None  
**Notes:** To be executed in next step

### STEP 4 — State & Interaction Model Review
**Status:** Pending  
**Blockers:** None  
**Notes:** To be executed in next step

### STEP 5 — Token, Size & Variant Consistency
**Status:** Pending  
**Blockers:** None  
**Notes:** To be executed in next step

### STEP 6 — Public API & DX Review
**Status:** Pending  
**Blockers:** None  
**Notes:** To be executed in next step

### STEP 7 — Type System Alignment
**Status:** Pending  
**Blockers:** None  
**Notes:** To be executed in next step

### STEP 8 — Intentional Refactor Pass
**Status:** Pending  
**Blockers:** None  
**Notes:** To be executed in next step (MANDATORY CHECKPOINT)

### STEP 9 — Validation via Tests & Storybook
**Status:** Pending  
**Blockers:** None  
**Notes:** To be executed in next step (MANDATORY CHECKPOINT)

### STEP 10 — Accessibility Audit & Fixes
**Status:** Pending  
**Blockers:** None  
**Notes:** To be executed in next step (MANDATORY CHECKPOINT)

### STEP 11 — Final Review & Outcome Fixation + Architectural Lock
**Status:** Pending  
**Blockers:** None  
**Notes:** To be executed in next step (MANDATORY CHECKPOINT)

---

## STEP 1–12 Run Plan

### STEP 1 — Structural & Code Quality Review
**Allowed Changes:**
- Readability refactors
- Extract helper functions
- Map duplicates
- Improve code organization

**Forbidden:**
- Behavior changes
- API changes
- Token changes

**Deliverables:**
- Updated audit report (STEP 1 section)
- Code refactors (if needed)

---

### STEP 2 — Semantic Role & Responsibility Validation
**Allowed Changes:**
- Define 1-2 sentence role definition
- Identify out-of-scope logic
- Document responsibility boundaries

**Forbidden:**
- Code changes
- API changes

**Deliverables:**
- Updated audit report (STEP 2 section)
- Role definition documented

---

### STEP 3 — Duplication & Internal Pattern Alignment
**Allowed Changes:**
- Align with canonical patterns (Button/Link)
- Remove duplication
- Standardize internal structure

**Forbidden:**
- Inventing new patterns
- Breaking existing behavior

**Deliverables:**
- Updated audit report (STEP 3 section)
- Pattern alignment refactors (if needed)

---

### STEP 4 — State & Interaction Model Review
**Allowed Changes:**
- Derived state via data-attributes/CSS
- Minimize JS state
- Optimize interaction model

**Forbidden:**
- Reimplementing Radix behavior
- Breaking existing interactions

**Deliverables:**
- Updated audit report (STEP 4 section)
- State model refactors (if needed)

---

### STEP 5 — Token, Size & Variant Consistency
**Allowed Changes:**
- Ensure all styling is token-only
- Align size usage with shared size scale
- Validate variant consistency

**Forbidden:**
- Introducing raw values
- Creating new tokens
- Breaking existing variants

**Deliverables:**
- Updated audit report (STEP 5 section)
- Token alignment refactors (if needed)

**References:**
- `docs/architecture/VARIANTS_SIZE_CANON.md`
- `docs/architecture/SIZE_MAPPING_SPEC.md`

---

### STEP 6 — Public API & DX Review
**Allowed Changes:**
- Remove confusing props
- Enforce safe defaults
- Improve DX

**Forbidden:**
- Breaking changes without migration path
- Expanding API surface

**Deliverables:**
- Updated audit report (STEP 6 section)
- API refactors (if needed)

---

### STEP 7 — Type System Alignment
**Allowed Changes:**
- Explicit unions instead of wide types
- Remove leaking internal machinery
- Improve type safety

**Forbidden:**
- Breaking existing type contracts
- Introducing `any` or overly permissive types

**Deliverables:**
- Updated audit report (STEP 7 section)
- Type system refactors (if needed)

---

### STEP 8 — Intentional Refactor Pass
**Allowed Changes:**
- Explicit decision: `Refactor required` OR `Refactor not required`
- Record consciously NOT made changes

**Forbidden:**
- Using vocabulary: `final`, `optimal`, `exemplary`, `canonical`, `locked`

**Deliverables:**
- Updated audit report (STEP 8 section)
- **MANDATORY:** Share audit report before proceeding

---

### STEP 9 — Validation via Tests & Storybook
**Allowed Changes:**
- Add comprehensive test coverage
- Add comprehensive Storybook coverage (matrix + states)

**Forbidden:**
- Placeholder tests or stories
- Skipping edge cases

**Deliverables:**
- Updated audit report (STEP 9 section)
- Test files (behavior + edge cases)
- Storybook stories (matrix + states + realistic usage)
- **MANDATORY:** Share audit report before proceeding

**References:**
- `docs/architecture/VARIANTS_SIZE_CANON.md` (Matrix/States rules)

---

### STEP 10 — Accessibility Audit & Fixes
**Allowed Changes:**
- ARIA roles and attributes
- Keyboard navigation and focus management
- Screen reader announcement behavior
- Accessibility-specific tests and Storybook stories

**Forbidden:**
- Skipping accessibility requirements
- Breaking existing a11y behavior

**Deliverables:**
- Updated audit report (STEP 10 section)
- Accessibility fixes (if needed)
- Accessibility tests
- Accessibility Storybook stories
- **MANDATORY:** Share audit report before proceeding

---

### STEP 11 — Final Review & Outcome Fixation + Architectural Lock
**Allowed Changes:**
- Verify all previous steps complete
- Lock propagation to:
  - `docs/architecture/FOUNDATION_LOCK.md`
  - `docs/architecture/ARCHITECTURE_LOCK.md`
  - `docs/PROJECT_PROGRESS.md`

**Forbidden:**
- Code changes
- Skipping verification

**Deliverables:**
- Updated audit report (STEP 11 section)
- Lock document updates
- **MANDATORY:** Share audit report before proceeding

---

## Risk Register (Anti-Drift)

### Risk 1: Scope Creep
**Description:** Refactor expands beyond Toast component  
**Mitigation:** Strict scope enforcement (one component only)  
**Status:** Monitored

### Risk 2: Radix Behavior Reimplementation
**Description:** Accidentally reimplementing Radix behavior  
**Mitigation:** All behavior changes must reference Radix primitives  
**Status:** Monitored

### Risk 3: Breaking Changes
**Description:** Public API changes break existing usage  
**Mitigation:** Backward compatibility maintained via legacy aliases  
**Status:** Monitored

### Risk 4: Foundation Enforcement Violation
**Description:** Adding `className`/`style` props violates Foundation rules  
**Mitigation:** Clarify Foundation Enforcement rules for Radix wrappers  
**Status:** Requires clarification

### Risk 5: Token Drift
**Description:** Raw values introduced during refactor  
**Mitigation:** Token validation in STEP 5  
**Status:** Monitored

---

## Definition of Done (DoD)

**STEP 0 Complete When:**
- ✅ Audit report exists at canonical path
- ✅ STEP 0 section is present and complete
- ✅ Baseline inventory lists exact file paths and exports
- ✅ FIX backlog sections exist but are empty
- ✅ No code files were modified

**Overall Refactor Complete When:**
- ✅ All STEP 0-11 sections filled in audit report
- ✅ All mandatory checkpoints passed (STEP 0, 8, 9, 10, 11)
- ✅ All 4-phase process completed for each step (Observe → Decide → Change → Record)
- ✅ Storybook coverage is not placeholder (matrix + states demonstrated)
- ✅ Tests cover behavior and edge cases
- ✅ A11Y step executed (STEP 10)
- ✅ Lock propagation completed (STEP 11)
- ✅ No vocabulary violations (no `final`/`optimal`/`canonical` before STEP 11)

---

## Appendix A: File Paths Reference

**Implementation Files:**
```
src/COMPOSITION/overlays/Toast.tsx
src/COMPOSITION/overlays/ToastProvider.tsx
src/COMPOSITION/overlays/ToastViewport.tsx
src/COMPOSITION/overlays/Toaster/Toaster.tsx
src/COMPOSITION/overlays/Toaster/index.ts
```

**Storybook Files:**
```
src/COMPOSITION/overlays/Toast.stories.tsx
```

**Test Files:**
```
(None exist)
```

**Token Files:**
```
src/FOUNDATION/tokens/components/toast.ts
```

**Export Files:**
```
src/COMPOSITION/overlays/index.ts
```

---

## Appendix B: External References

**Authority Contracts:**
- `docs/architecture/SPACING_AUTHORITY.md`
- `docs/architecture/RADIUS_AUTHORITY.md`
- `docs/architecture/ELEVATION_AUTHORITY.md`
- `docs/architecture/MOTION_AUTHORITY.md`
- `docs/architecture/STATE_AUTHORITY.md`
- `docs/architecture/TYPOGRAPHY_AUTHORITY.md`

**Lock Documents:**
- `docs/architecture/FOUNDATION_LOCK.md`
- `docs/architecture/ARCHITECTURE_LOCK.md`

**Workflow Documents:**
- `docs/workflows/foundation/FOUNDATION_STEP_PIPELINE.md`
- `.cursor/rules/COMPONENT_CREATION_AND_REFACTOR_CHECKLIST.mdc`

**Variant & Size Standards:**
- `docs/architecture/VARIANTS_SIZE_CANON.md`
- `docs/architecture/SIZE_MAPPING_SPEC.md`

---

## Change Log

| Date | Step | Operator | Summary |
|------|------|----------|---------|
| 2025-12-24 | STEP 0 | System | Baseline snapshot created |

---

**End of STEP 0 Report**

