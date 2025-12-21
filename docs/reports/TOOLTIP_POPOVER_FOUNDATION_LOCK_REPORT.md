# Tooltip / Popover — Baseline Snapshot

**Date Created:** 2025-01-20  
**Status:** Baseline Inventory (Read-Only)  
**Purpose:** Factual documentation of all Tooltip, Popover, and HoverCard implementations without modifications or recommendations

---

## Executive Summary

This document provides a complete inventory of all Tooltip, Popover, and HoverCard related implementations in the codebase. Three distinct implementations exist:

1. **Tooltip** - Extension layer component using `@radix-ui/react-tooltip`
2. **Popover** - Extension layer component using `@radix-ui/react-popover`
3. **HoverCard** - Extension layer component that wraps Popover with hover/focus behavior

All three implementations are in the Extension layer. Tooltip and Popover are internal-only (not exported from main index), while HoverCard is part of the public API.

---

## 1. Tooltip Implementation

### File Locations

- **Implementation**: `src/COMPOSITION/overlays/Tooltip.tsx`
- **Stories**: `src/COMPOSITION/overlays/Tooltip.stories.tsx`
- **Tokens**: `src/FOUNDATION/tokens/components/tooltip.ts`
- **Test Files**: None found

### Technology Stack

- **Base Library**: `@radix-ui/react-tooltip` (v1.2.8 per `package.json`)
- **Variant System**: `class-variance-authority` (CVA)
- **Styling**: Tailwind CSS utilities (token-driven)
- **Dependencies**:
  - `@radix-ui/react-tooltip` (direct dependency)
  - `class-variance-authority` (variant system)
  - Foundation token system (`@/FOUNDATION/tokens/components/tooltip`)
  - Responsive props utilities (`@/FOUNDATION/lib/responsive-props`)

### Layer Classification

- **Layer**: Extension
- **Directory**: `src/COMPOSITION/overlays/`
- **Classification**: COMPOSITION = Extension layer (per architecture documentation)

### Exports

From `src/COMPOSITION/overlays/Tooltip.tsx`:

```typescript
// Main wrapper component
export function TooltipWrapper(props: TooltipProps)

// Radix primitives (re-exported)
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger
export const TooltipProvider = TooltipPrimitive.Provider

// Styled content component
export const TooltipContent = React.forwardRef<...>(...)

// Variant system
export const tooltipContentVariants = cva(...)

// Type exports
export interface TooltipProps
```

### Public API Exposure

**Status**: Internal only  
**Exported from `src/index.ts`**: No  
**Exported from `src/COMPOSITION/overlays/index.ts`**: No

Tooltip is not exported from any public entry point. It exists as an internal component only.

### Token System

**Token File**: `src/FOUNDATION/tokens/components/tooltip.ts`

**Exports**:

- `TOOLTIP_TOKENS` (const object)
- `TooltipContentRadius` (type)
- `TooltipContentShadow` (type)

**Public Token Exposure**: Yes  
**Exported from `src/index.ts`**: Yes (lines 141-143)  
**Exported from `src/FOUNDATION/tokens/components/index.ts`**: Yes (line 177)

### Component Structure

- **TooltipProvider**: Radix Provider wrapper (manages delay duration)
- **Tooltip**: Radix Root primitive (manages open/close state)
- **TooltipTrigger**: Radix Trigger primitive (wraps trigger element)
- **TooltipContent**: Styled content component (uses CVA variants, token-driven)
- **TooltipWrapper**: High-level wrapper that combines all primitives

### API Details

**TooltipProps Interface**:

- `children`: React.ReactNode (trigger element)
- `content`: React.ReactNode (tooltip content)
- `variant?`: "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive"
- `side?`: "top" | "right" | "bottom" | "left"
- `align?`: "start" | "center" | "end"
- `sideOffset?`: ResponsiveSideOffset (token-based)
- `alignOffset?`: ResponsiveAlignOffset (token-based)
- `delayDuration?`: ResponsiveDelay (token-based)
- `skipDelayDuration?`: ResponsiveDelay (token-based)
- `disableHoverableContent?`: boolean
- `open?`: boolean (controlled)
- `onOpenChange?`: (open: boolean) => void

---

## 2. Popover Implementation

### File Locations

- **Implementation**: `src/COMPOSITION/overlays/Popover.tsx`
- **Stories**: `src/COMPOSITION/overlays/Popover.stories.tsx`
- **Tokens**: `src/FOUNDATION/tokens/components/popover.ts`
- **Test Files**: None found

### Technology Stack

- **Base Library**: `@radix-ui/react-popover` (v1.1.2 per `package.json`)
- **Variant System**: `class-variance-authority` (CVA)
- **Styling**: Tailwind CSS utilities (token-driven)
- **Dependencies**:
  - `@radix-ui/react-popover` (direct dependency)
  - `class-variance-authority` (variant system)
  - Foundation token system (`@/FOUNDATION/tokens/components/popover`)
  - Responsive props utilities (`@/FOUNDATION/lib/responsive-props`)

### Layer Classification

- **Layer**: Extension
- **Directory**: `src/COMPOSITION/overlays/`
- **Classification**: COMPOSITION = Extension layer (per architecture documentation)

### Exports

From `src/COMPOSITION/overlays/Popover.tsx`:

```typescript
// Main wrapper component
export function PopoverWrapper(props: PopoverProps)

// Radix primitives (re-exported)
export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverAnchor = PopoverPrimitive.Anchor

// Styled content component
export const PopoverContent = React.forwardRef<...>(...)

// Variant system
export const popoverContentVariants = cva(...)

// Type exports
export interface PopoverProps
```

### Public API Exposure

**Status**: Internal only  
**Exported from `src/index.ts`**: No  
**Exported from `src/COMPOSITION/overlays/index.ts`**: No

Popover is not exported from any public entry point. It exists as an internal component only.

### Token System

**Token File**: `src/FOUNDATION/tokens/components/popover.ts`

**Exports**:

- `POPOVER_TOKENS` (const object)
- `PopoverContentPadding` (type)
- `PopoverContentRadius` (type)
- `PopoverContentShadow` (type)
- `PopoverContentWidth` (type)
- `PopoverArrowSize` (type)
- `PopoverArrowOffset` (type)

**Public Token Exposure**: Yes  
**Exported from `src/index.ts`**: Yes (lines 103-109)  
**Exported from `src/FOUNDATION/tokens/components/index.ts`**: Yes (lines 163-171)

### Component Structure

- **Popover**: Radix Root primitive (manages open/close state)
- **PopoverTrigger**: Radix Trigger primitive (wraps trigger element)
- **PopoverAnchor**: Radix Anchor primitive (optional anchor point)
- **PopoverContent**: Styled content component (uses CVA variants, token-driven, wrapped in Portal)
- **PopoverWrapper**: High-level wrapper that combines all primitives

### API Details

**PopoverProps Interface**:

- `children`: React.ReactNode (trigger element)
- `content`: React.ReactNode (popover content)
- `variant?`: "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive"
- `size?`: "xs" | "sm" | "md" | "lg" | "xl"
- `side?`: "top" | "right" | "bottom" | "left"
- `align?`: "start" | "center" | "end"
- `sideOffset?`: ResponsiveSideOffset (token-based)
- `alignOffset?`: ResponsiveAlignOffset (token-based)
- `open?`: boolean (controlled)
- `onOpenChange?`: (open: boolean) => void
- `modal?`: boolean (default: true)
- `closeOnInteractOutside?`: boolean (default: true)

---

## 3. HoverCard Implementation

### File Locations

- **Root Component**: `src/PATTERNS/menus/menus/hover-card/HoverCardRoot.tsx`
- **Trigger Component**: `src/PATTERNS/menus/menus/hover-card/HoverCardTrigger.tsx`
- **Content Component**: `src/PATTERNS/menus/menus/hover-card/HoverCardContent.tsx`
- **Barrel Export**: `src/PATTERNS/menus/menus/hover-card/index.ts`
- **Test Files**: None found

### Technology Stack

- **Base Library**: Custom implementation
- **Underlying Technology**: `@radix-ui/react-popover` (via Popover from COMPOSITION/overlays)
- **Additional Dependencies**:
  - `@radix-ui/react-slot` (for asChild composition pattern)
  - Foundation token system
  - Responsive props utilities (`@/FOUNDATION/lib/responsive-props`)
- **Classification**: Custom implementation wrapping Popover

### Layer Classification

- **Layer**: Extension
- **Directory**: `src/PATTERNS/menus/menus/hover-card/`
- **Classification**: PATTERNS = Extension layer (per architecture documentation)

### Exports

From `src/PATTERNS/menus/menus/hover-card/index.ts`:

```typescript
export { HoverCardContent, type HoverCardContentProps } from "./HoverCardContent";
export { HoverCardRoot, type HoverCardRootProps, useHoverCardContext } from "./HoverCardRoot";
export { HoverCardTrigger, type HoverCardTriggerProps } from "./HoverCardTrigger";
```

### Public API Exposure

**Status**: Public API  
**Exported from `src/index.ts`**: Yes (lines 499-505)  
**Exported from `src/PATTERNS/menus/menus/index.ts`**: Yes (lines 9-17)

HoverCard is part of the public API and is exported from the main library index.

### Component Structure

- **HoverCardRoot**: Root component that manages hover/focus behavior and open/close state with delays
  - Wraps `Popover` from `@/COMPOSITION/overlays/Popover`
  - Provides context via `HoverCardContext`
  - Handles controlled/uncontrolled state
  - Implements open/close delays (token-based)
- **HoverCardTrigger**: Trigger element that opens HoverCard on hover/focus
  - Uses `@radix-ui/react-slot` for composition
  - Handles mouse and keyboard events
  - Integrates with HoverCardContext
- **HoverCardContent**: Content wrapper that extends PopoverContent
  - Wraps `PopoverContent` from `@/COMPOSITION/overlays/Popover`
  - Adds hover-specific behavior (keeps open when hovering content)
  - Sets `role="tooltip"` for accessibility

### API Details

**HoverCardRootProps Interface**:

- `openDelay?`: ResponsiveDelay (token-based, default: 0)
- `closeDelay?`: ResponsiveDelay (token-based, default: 300)
- `open?`: boolean (controlled mode)
- `onOpenChange?`: (open: boolean) => void
- `defaultOpen?`: boolean (uncontrolled mode, default: false)
- `modal?`: boolean (default: false)
- `children`: React.ReactNode

**HoverCardTriggerProps Interface**:

- `asChild?`: boolean (composition pattern)
- Extends `React.HTMLAttributes<HTMLElement>`

**HoverCardContentProps Interface**:

- Extends `PopoverContent` props (omits `onMouseEnter` | `onMouseLeave`)
- `onMouseEnter?`: React.MouseEventHandler<HTMLDivElement>
- `onMouseLeave?`: React.MouseEventHandler<HTMLDivElement>

### Implementation Notes

- HoverCard is a **composition** of Popover, not a direct Radix wrapper
- Uses React Context (`HoverCardContext`) to coordinate trigger and content behavior
- Implements custom hover/focus logic with configurable delays
- Supports both controlled and uncontrolled modes
- Content stays open when hovering over it (prevents premature closing)

---

## 4. Supporting Utilities

### Positioning Utility

**File Location**: `src/COMPOSITION/overlays/utils/positioning.ts`

**Technology**: `@floating-ui/react-dom` (v2.1.0 per `package.json` devDependencies)

**Purpose**: SSR-safe positioning helper for popovers, menus, and tooltips with collision detection

**Exports**:

- `usePositioning` (hook)
- `UsePositioningOptions` (interface)
- `PositionState` (interface)
- `Placement` (type from @floating-ui/react-dom)

**Features**:

- SSR-safe (all DOM operations in useEffect/useLayoutEffect)
- Token-based offset support (ResponsiveAlignOffset)
- Collision detection (flip, shift)
- Auto-update positioning on scroll/resize

**Usage**: Currently available but not directly used by Tooltip or Popover (they use Radix's built-in positioning). May be used by other overlay components.

---

## 5. Token Files

### Tooltip Tokens

**File**: `src/FOUNDATION/tokens/components/tooltip.ts`

**Layer**: Foundation (FOUNDATION/tokens = Foundation layer)

**Exports**:

- `TOOLTIP_TOKENS` (const object)
- `TooltipContentRadius` (type: "sm" | "md")
- `TooltipContentShadow` (type: "sm" | "md")

**Token Structure**:

```typescript
TOOLTIP_TOKENS = {
  content: {
    border: { default, color },
    background: { default },
    text: { default },
    padding: { horizontal, vertical },
    radius: { sm, md },
    shadow: { sm, md },
    fontSize: { sm }
  }
}
```

**Public Exposure**: Yes (exported from main index.ts)

### Popover Tokens

**File**: `src/FOUNDATION/tokens/components/popover.ts`

**Layer**: Foundation (FOUNDATION/tokens = Foundation layer)

**Exports**:

- `POPOVER_TOKENS` (const object)
- `PopoverContentPadding` (type: "sm" | "md" | "lg")
- `PopoverContentRadius` (type: "sm" | "md")
- `PopoverContentShadow` (type: "sm" | "md")
- `PopoverContentWidth` (type: "xs" | "sm" | "md" | "lg" | "xl")
- `PopoverArrowSize` (type: "sm" | "md")
- `PopoverArrowOffset` (type: "sm" | "md")

**Token Structure**:

```typescript
POPOVER_TOKENS = {
  content: {
    border: { default, color },
    background: { default },
    text: { default },
    padding: { sm, md, lg },
    radius: { sm, md },
    shadow: { sm, md },
    width: { xs, sm, md, lg, xl }
  },
  arrow: {
    size: { sm, md },
    offset: { sm, md }
  },
  animation: {
    enter, exit
  }
}
```

**Public Exposure**: Yes (exported from main index.ts)

---

## 6. Layer Classification Summary

| Component           | Layer      | Directory                              | Classification                |
| ------------------- | ---------- | -------------------------------------- | ----------------------------- |
| Tooltip             | Extension  | `src/COMPOSITION/overlays/`            | COMPOSITION = Extension layer |
| Popover             | Extension  | `src/COMPOSITION/overlays/`            | COMPOSITION = Extension layer |
| HoverCard           | Extension  | `src/PATTERNS/menus/menus/hover-card/` | PATTERNS = Extension layer    |
| Tooltip Tokens      | Foundation | `src/FOUNDATION/tokens/components/`    | FOUNDATION = Foundation layer |
| Popover Tokens      | Foundation | `src/FOUNDATION/tokens/components/`    | FOUNDATION = Foundation layer |
| Positioning Utility | Extension  | `src/COMPOSITION/overlays/utils/`      | COMPOSITION = Extension layer |

**Note**: All component implementations are in the Extension layer. Only the token definitions are in the Foundation layer.

---

## 7. Coexistence Status

### Multiple Implementations

**Status**: Yes, three distinct implementations exist:

1. **Tooltip** - Standalone component using `@radix-ui/react-tooltip`
2. **Popover** - Standalone component using `@radix-ui/react-popover`
3. **HoverCard** - Composite component that wraps Popover

### Naming Conflicts

**Status**: None observed

- Tooltip, Popover, and HoverCard have distinct names
- No naming overlaps or conflicts detected
- Each component has a clear, unique purpose

### Technology Overlap

**Status**: Partial overlap

- **Tooltip**: Uses `@radix-ui/react-tooltip` (direct)
- **Popover**: Uses `@radix-ui/react-popover` (direct)
- **HoverCard**: Uses `@radix-ui/react-popover` (indirect, via Popover component)
- **HoverCard**: Uses `@radix-ui/react-slot` (direct, for composition)

All implementations use Radix UI primitives, but through different paths:

- Tooltip: Direct Radix dependency
- Popover: Direct Radix dependency
- HoverCard: Indirect Radix dependency (via Popover wrapper)

---

## 8. Export Status

### Public API Exports

**HoverCard** (exported from `src/index.ts`, lines 499-505):

- `HoverCardContent`
- `HoverCardContentProps`
- `HoverCardRoot`
- `HoverCardRootProps`
- `HoverCardTrigger`
- `HoverCardTriggerProps`
- `useHoverCardContext`

**Tooltip Tokens** (exported from `src/index.ts`, lines 141-143):

- `TOOLTIP_TOKENS`
- `TooltipContentRadius`
- `TooltipContentShadow`

**Popover Tokens** (exported from `src/index.ts`, lines 103-109):

- `POPOVER_TOKENS`
- `PopoverArrowOffset`
- `PopoverArrowSize`
- `PopoverContentPadding`
- `PopoverContentRadius`
- `PopoverContentShadow`
- `PopoverContentWidth`

### Internal-Only Components

**Tooltip**: Not exported from `src/index.ts` or `src/COMPOSITION/overlays/index.ts`

**Popover**: Not exported from `src/index.ts` or `src/COMPOSITION/overlays/index.ts`

**Note**: Tooltip and Popover are internal components that can be used by other Extension layer components but are not part of the public API.

---

## 9. Test Coverage

### Test Files

**Tooltip**: No test files found  
**Popover**: No test files found  
**HoverCard**: No test files found

### Storybook Coverage

**Tooltip**: Yes (`src/COMPOSITION/overlays/Tooltip.stories.tsx`)

- Multiple stories covering variants, positions, form elements, badges, custom delays

**Popover**: Yes (`src/COMPOSITION/overlays/Popover.stories.tsx`)

- Multiple stories covering variants, sizes, positions, forms, cards, notifications menu

**HoverCard**: No Storybook files found

---

## 10. Dependency Tree

### Tooltip Dependencies

```
Tooltip
├── @radix-ui/react-tooltip (v1.2.8)
├── class-variance-authority
├── Foundation Token System
│   └── TOOLTIP_TOKENS
└── Responsive Props Utilities
```

### Popover Dependencies

```
Popover
├── @radix-ui/react-popover (v1.1.2)
├── class-variance-authority
├── Foundation Token System
│   └── POPOVER_TOKENS
└── Responsive Props Utilities
```

### HoverCard Dependencies

```
HoverCard
├── @radix-ui/react-slot
├── Popover (from COMPOSITION/overlays)
│   ├── @radix-ui/react-popover (v1.1.2)
│   ├── class-variance-authority
│   ├── Foundation Token System
│   │   └── POPOVER_TOKENS
│   └── Responsive Props Utilities
├── Foundation Token System
└── Responsive Props Utilities
```

---

## 11. File Inventory

### Implementation Files

- `src/COMPOSITION/overlays/Tooltip.tsx` (153 lines)
- `src/COMPOSITION/overlays/Popover.tsx` (141 lines)
- `src/PATTERNS/menus/menus/hover-card/HoverCardRoot.tsx` (175 lines)
- `src/PATTERNS/menus/menus/hover-card/HoverCardTrigger.tsx` (80 lines)
- `src/PATTERNS/menus/menus/hover-card/HoverCardContent.tsx` (62 lines)

### Storybook Files

- `src/COMPOSITION/overlays/Tooltip.stories.tsx` (165 lines)
- `src/COMPOSITION/overlays/Popover.stories.tsx` (308 lines)

### Token Files

- `src/FOUNDATION/tokens/components/tooltip.ts` (58 lines)
- `src/FOUNDATION/tokens/components/popover.ts` (92 lines)

### Utility Files

- `src/COMPOSITION/overlays/utils/positioning.ts` (201 lines)

### Barrel Export Files

- `src/PATTERNS/menus/menus/hover-card/index.ts` (10 lines)
- `src/PATTERNS/menus/menus/index.ts` (18 lines)

### Test Files

- None found

---

## 12. Architecture Notes

### Component Relationships

- **HoverCard composes Popover**: HoverCardRoot wraps Popover, HoverCardContent wraps PopoverContent
- **Tooltip and Popover are independent**: No direct relationship between Tooltip and Popover
- **All use Radix UI**: All implementations delegate behavior to Radix UI primitives
- **All use Foundation tokens**: All implementations use token-driven styling from Foundation layer

### Design Patterns

- **Wrapper Pattern**: TooltipWrapper and PopoverWrapper provide high-level APIs
- **Composition Pattern**: HoverCard uses composition to extend Popover behavior
- **Context Pattern**: HoverCard uses React Context to coordinate trigger and content
- **Variant Pattern**: All components use CVA (class-variance-authority) for styling variants

### Token-Driven Architecture

- All visual properties use token unions (no raw values)
- Responsive props use token-based types (ResponsiveSideOffset, ResponsiveAlignOffset, ResponsiveDelay)
- Foundation tokens are the single source of truth for styling
- Component tokens map Foundation tokens to component-specific usage

---

## 13. Assumptions and Uncertainties

### Layer Classification

**Assumption**: COMPOSITION and PATTERNS directories are Extension layer

- **Rationale**: Architecture documentation indicates Foundation components are in specific locations (e.g., `src/components/modal/`), while Extension components are in `src/COMPOSITION/` and `src/PATTERNS/`
- **Confidence**: High (based on architecture documentation review)

### Public API Status

**Tooltip and Popover are internal-only**:

- **Observation**: Not exported from `src/index.ts` or `src/COMPOSITION/overlays/index.ts`
- **Confidence**: High (verified through file inspection)

**HoverCard is public API**:

- **Observation**: Exported from `src/index.ts` (lines 499-505)
- **Confidence**: High (verified through file inspection)

### Technology Classification

**HoverCard is custom implementation**:

- **Observation**: Wraps Popover component, adds custom hover/focus behavior
- **Classification**: Custom implementation (not direct Radix wrapper)
- **Confidence**: High (verified through code inspection)

---

## 14. Summary Statistics

- **Total Implementations**: 3 (Tooltip, Popover, HoverCard)
- **Public API Components**: 1 (HoverCard)
- **Internal-Only Components**: 2 (Tooltip, Popover)
- **Foundation Token Files**: 2 (tooltip.ts, popover.ts)
- **Storybook Files**: 2 (Tooltip, Popover)
- **Test Files**: 0
- **Radix Dependencies**: 2 direct (`react-tooltip`, `react-popover`), 1 indirect (HoverCard via Popover)
- **Total Files**: 12 (5 implementation, 2 stories, 2 tokens, 1 utility, 2 barrel exports)

---

## Document Status

This baseline snapshot is **read-only** and contains **factual observations only**. No recommendations, improvements, or refactoring suggestions are included.

**Next Steps**: This document serves as the foundation for subsequent analysis phases (structural review, code quality assessment, etc.).
