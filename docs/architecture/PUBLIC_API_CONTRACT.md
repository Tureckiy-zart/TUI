# Public API Contract

**Version:** 1.0  
**Date Created:** 2026-01-02  
**Status:** ✅ **LOCKED**  
**Layer:** ARCHITECTURE / GOVERNANCE  
**Priority:** CRITICAL

---

## Purpose

This document defines the **canonical Public API contract** for Tenerife UI (`@tenerife.music/ui`). It establishes `src/index.ts` as the sole public entry point, defines export rules for each architectural layer, and locks the Public API to prevent accidental or unauthorized changes.

**This contract is binding for:**
- All library consumers
- All library maintainers
- All AI assistants
- All automated tooling

**Violation of this contract is considered an architectural breach.**

---

## Public Entry Point

### Single Source of Truth

**Public Entry Point:** `src/index.ts`

**Rule:** `src/index.ts` is the **ONLY** public entry point for the library.

**Forbidden:**
- ❌ Deep imports from internal paths (e.g., `@tenerife.music/ui/PRIMITIVES/Button`)
- ❌ Direct imports from barrel files (e.g., `@tenerife.music/ui/COMPOSITION/layout`)
- ❌ Package subpath exports (unless explicitly documented)

**Allowed:**
- ✅ Import from main entry point: `import { Button } from "@tenerife.music/ui"`
- ✅ Tree-shaking supported (all exports are ES modules)

---

## Export Categories

### 1. Responsive Types

**Source:** `src/types/responsive`

**Exports:**
- `Breakpoint` (type)
- `Responsive<T>` (type)

**Rule:** All responsive typing primitives are exported.

---

### 2. Design Tokens

**Source:** `src/FOUNDATION/tokens`

**Categories:**
- Color tokens (types + values)
- Component tokens (constants + types)
- Icon tokens (constants + types)
- CSS Variables (utilities)
- Motion tokens (types + values)
- Radius tokens (types + values)
- Shadow tokens (types + values)
- Spacing tokens (types + values)
- Theme tokens (constants)
- Typography tokens (types + values)

**Rule:** All design tokens are exported to enable theme customization and token-driven styling.

**Total:** ~180+ exports

---

### 3. Foundation Components (PRIMITIVES)

**Source:** `src/PRIMITIVES/`

**Components (20):**
- Button, IconButton, Text, HelperText, Alert, Link, NavLink, Badge, Heading, Checkbox, ErrorText, Field, FormGroup, Input, Label, Radio, Textarea, Skeleton, Progress, Icon

**Rule:** **ALL Foundation components MUST be exported.**

**Exports per Component:**
- Component (e.g., `Button`)
- Component Props type (e.g., `ButtonProps`)
- Variant types (e.g., `ButtonVariant`, `ButtonSize`)
- CVA variants (e.g., `buttonVariants`) - **ONLY if required for Extension composition**

**Foundation Lock Compliance:**
- All Foundation components listed in `FOUNDATION_LOCK.md` MUST be exported
- No Foundation component duplicates allowed
- No alternative Foundation implementations allowed

---

### 4. Extension Components (COMPOSITION)

**Source:** `src/COMPOSITION/`

**Categories:**
- Actions (ButtonGroup)
- Controls (Chip, Select, MultiSelect, Avatar, RangeSlider, Slider, Separator, AspectRatio)
- Layout (Box, Column, Container, Divider, Flex, Grid, Inline, Inset, List, ListItem, Navbar, Panel, Row, SidebarLayout, Stack, StickyBar, Surface)
- Container (Card, ContainerSurface, ContentShell, PageHeader, Section)
- Overlays (Accordion, Backdrop, Dialog, Portal, Spinner, Toast, Combobox, Popover, Dropdown, Tooltip, ContextMenu, Modal, FileUpload)
- Navigation (Breadcrumbs, Menu, NavItem, NavList, NavRoot, NavSeparator, NavText, Pagination, SegmentedControl, Stepper, Tabs)
- A11y (VisuallyHidden)
- Focus (FocusTrap)

**Rule:** Extension components **MAY be exported** if they are listed as ALLOWED in `EXTENSION_STATE.md`.

**Forbidden:**
- ❌ Export of RESTRICTED components
- ❌ Export of internal-only components
- ❌ Export of components not listed in `EXTENSION_STATE.md`

**Extension State Compliance:**
- All exported Extension components MUST be listed as ALLOWED in `EXTENSION_STATE.md`
- No RESTRICTED components may be exported

---

### 5. Domain Components (DOMAIN)

**Source:** `src/DOMAIN/`

**Current Exports:**
- NotificationCenter (notification system)

**Rule:** Domain components **MAY be exported** if they provide reusable domain-specific functionality.

**Guidelines:**
- Domain components should be domain-agnostic where possible
- Domain-specific logic should be minimal
- Prefer Extension layer for reusable components

---

### 6. Pattern Components (PATTERNS)

**Source:** `src/PATTERNS/`

**Current Exports:**
- HoverCard (menu system)
- DataList, EmptyState, Table (data display)

**Rule:** Pattern components **MAY be exported** if they represent reusable UI/UX patterns.

**Guidelines:**
- Patterns should be domain-agnostic
- Patterns should compose Foundation and Extension components
- Patterns should not duplicate Foundation functionality

---

## Export Rules

### What MAY Be Exported

✅ **Foundation Components:**
- All Foundation components (REQUIRED)
- Foundation component types
- Foundation variant types
- Foundation CVA variants (ONLY if required for Extension composition)

✅ **Extension Components:**
- Extension components listed as ALLOWED in `EXTENSION_STATE.md`
- Extension component types
- Extension variant types

✅ **Design Tokens:**
- All token constants
- All token types
- Token utility functions

✅ **Responsive Types:**
- All responsive typing primitives

✅ **Domain Components:**
- Domain components that provide reusable functionality

✅ **Pattern Components:**
- Pattern components that represent reusable UI/UX patterns

### What MUST NOT Be Exported

❌ **Radix Primitives:**
- Direct Radix UI primitive exports
- Radix UI types
- Radix component internals

❌ **Internal Implementation Details:**
- Internal helper functions
- Internal context (unless explicitly needed)
- Internal utilities
- Internal types (unless part of public API)

❌ **Legacy Components:**
- Components in `legacy/` folders
- Deprecated component variants
- Old component APIs

❌ **Duplicate Foundation Components:**
- Alternative Foundation implementations
- "Simple" or "Basic" versions of Foundation components

❌ **RESTRICTED Components:**
- Components listed as RESTRICTED in `EXTENSION_STATE.md`

---

## Type Export Rules

### Explicit Union Types Required

**Rule:** All variant/size props MUST use explicit union types.

**Forbidden:**
```typescript
// ❌ FORBIDDEN - CVA-derived type
export type ButtonProps = VariantProps<typeof buttonVariants>

// ❌ FORBIDDEN - String widening
variant?: string
size?: string

// ❌ FORBIDDEN - Any type
props?: any
```

**Required:**
```typescript
// ✅ REQUIRED - Explicit union type
export type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive"
export type ButtonSize = "sm" | "md" | "lg"

// ✅ REQUIRED - Explicit props interface
export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
}
```

### CVA Variants Export

**Rule:** CVA variants MAY be exported ONLY if required for Extension composition.

**Guidelines:**
- Export CVA variants only when Extension components need to compose Foundation variants
- Do not export CVA variants for convenience
- Prefer explicit union types over CVA variants in public API

**Current Exported Variants:**
- `textVariants`, `alertVariants`, `linkVariants`, `badgeVariants`, `headingVariants`
- `checkboxVariants`, `inputVariants`, `radioVariants`, `textareaVariants`
- `skeletonVariants`, `iconVariants`, `separatorVariants`, `dividerVariants`
- `listItemVariants`, `stickyBarVariants`, `surfaceVariants`
- `popoverContentVariants`, `tooltipContentVariants`
- `segmentedControlItemVariants`, `segmentedControlRootVariants`

**Review Required:** Each exported variant should be verified for Extension composition needs.

---

## Barrel Export Policy

### Explicit Exports Only

**Rule:** `export *` is **FORBIDDEN** in public entry point.

**Required:**
```typescript
// ✅ REQUIRED - Explicit exports
export { Button, type ButtonProps } from "./PRIMITIVES/Button";
export type { Breakpoint, Responsive } from "./types/responsive";
```

**Forbidden:**
```typescript
// ❌ FORBIDDEN - Wildcard export
export * from "./PRIMITIVES/Button";
```

**Rationale:** Explicit exports prevent accidental type leaks and ensure stable public API.

---

## Unlock Procedure

### Changing Public API

**Rule:** Any change to `src/index.ts` requires explicit unlock procedure.

### Unlock Steps

1. **Create Unlock Task**
   - Task ID: `TUI_PUBLIC_API_UNLOCK_XX`
   - Justification: Why is the change needed?
   - Impact: What consumers will be affected?
   - Breaking: Is this a breaking change?

2. **Perform Full API Audit**
   - Inventory all exports
   - Verify layer classification
   - Check compliance with all rules
   - Document violations (if any)

3. **Approve Change**
   - Review unlock task
   - Verify justification
   - Approve change scope

4. **Apply Change**
   - Update `src/index.ts`
   - Update `PUBLIC_API_CONTRACT.md` if rules change
   - Update audit report

5. **Re-lock**
   - Update `ARCHITECTURE_LOCK.md`
   - Record in `PROJECT_PROGRESS.md`
   - Mark unlock task as complete

### Breaking Changes

**Rule:** Breaking API changes require major version procedure.

**Process:**
1. Create unlock task with breaking change justification
2. Perform full API audit
3. Document breaking changes
4. Update version number (major version bump)
5. Create migration guide
6. Apply changes
7. Re-lock Public API

---

## Enforcement

### Automated Checks

**Required Checks:**
- ✅ No `export *` in `src/index.ts`
- ✅ All Foundation components exported
- ✅ No RESTRICTED components exported
- ✅ No Radix primitives exported
- ✅ No legacy components exported
- ✅ Explicit union types (no CVA-derived types in public API)
- ✅ No `any` types in public API

### Manual Reviews

**Required Reviews:**
- New export requests
- Export removal requests
- CVA variant export requests
- Breaking API changes

---

## Related Documents

- **Audit Report:** `docs/reports/audit/TUI_PUBLIC_API_AUDIT_REPORT.md`
- **Foundation Lock:** `docs/architecture/FOUNDATION_LOCK.md`
- **Extension State:** `docs/architecture/EXTENSION_STATE.md`
- **Architecture Lock:** `docs/architecture/ARCHITECTURE_LOCK.md`
- **Barrel Policy:** `docs/workflows/policies/BARREL_POLICY.md`
- **Legacy Policy:** `docs/workflows/policies/LEGACY_COMPONENT_POLICY.md`
- **Architecture Context:** `docs/ARCHITECTURE_CONTEXT.md` (Section 8)

---

## Lock Status

**Status:** ✅ **LOCKED**  
**Lock Date:** 2026-01-02  
**Lock Authority:** Architecture Lock

**This contract is IMMUTABLE without explicit unlock procedure.**

---

**Version:** 1.0  
**Last Updated:** 2026-01-02  
**Status:** ✅ **LOCKED**

