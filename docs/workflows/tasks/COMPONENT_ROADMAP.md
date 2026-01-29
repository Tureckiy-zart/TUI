# Component Development Roadmap

**Status:** Active  
**Created:** 2025-12-25  
**Last Updated:** 2026-01-02 (DX, Navigation and Surface Layers Lock — Post-Audit)  
**Purpose:** Comprehensive roadmap for developing missing components in Tenerife UI library

**Latest Progress:** DX, Navigation and Surface Layers Lock Complete (2026-01-02) — VisuallyHidden, FocusTrap, Inline, Spacer, HelperText, ErrorText, IconButton, ButtonGroup, FormGroup, Menu, Dropdown, ContextMenu, Panel, Section PROCESS LOCKED/LOCKED. Combobox CREATED (Component Creation Pipeline C0-C10 Complete, 2025-12-28), MultiSelect CREATED (Component Creation Pipeline C0-C10 Complete, 2025-12-28), Chip CREATED (Component Creation Pipeline C0-C10 Complete, 2025-12-28), NotificationCenter PROCESS LOCKED (Pipeline 18A Complete, 2025-12-27), Timeline PROCESS LOCKED (Pipeline 18A Complete, 2025-12-27), List PROCESS LOCKED (Pipeline 18A Complete, 2025-12-27), CardBase PROCESS LOCKED (Pipeline 18A Complete, 2025-12-27), Tabs PROCESS LOCKED (Pipeline 18A Third Pass Complete, 2025-12-27), ContextMenu PROCESS LOCKED (Pipeline 18A Complete, 2025-12-25), Pagination LOCKED (2025-12-26), Breadcrumbs PROCESS LOCKED (2025-12-26), Stepper PROCESS LOCKED (2025-12-26), Separator, Avatar, AspectRatio PROCESS LOCKED (2025-12-25/2025-12-26)

---

## Overview

This document provides a prioritized roadmap for developing components needed to make the Tenerife UI library production-ready. Components are organized into 3 stages based on priority and use case criticality.

**Estimation:** 13-17 weeks total (3-4 months of active development)

---

## Current Library Status

### ✅ Already Implemented

**Foundation Components (LOCKED):**
- Button, IconButton, Link, Input, Text, Select, Label, Heading, Icon, Checkbox, Radio, Switch, Textarea, FormGroup, HelperText, ErrorText

**Composition Components (PROCESS LOCKED):**
- Modal ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-25)
- Tabs ✅ **PROCESS LOCKED** (Pipeline 18A Complete, Third Pass 2025-12-27)
- Select ✅ **LOCKED** (Pipeline 18A Complete, 2025-12-25)
- ContextMenu ✅ **PROCESS LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02)
  - **Location:** `src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx`
  - **Audit Report:** `docs/reports/audit/CONTEXTMENU_BASELINE_REPORT.md`
  - **Lock Date:** 2025-12-25 (DX, Navigation and Surface Layers Lock: 2026-01-02)
  - **Key Decisions:** CVA migrated cva → tokenCVA (Decision Matrix RULE 1), tone variants (neutral/primary/destructive), size inheritance via Context, full Radix delegation
- Menu ✅ **PROCESS LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02)
  - **Location:** `src/COMPOSITION/navigation/Menu/Menu.tsx`
  - **Audit Report:** `docs/reports/audit/MENU_BASELINE_REPORT.md`
  - **Lock Date:** 2026-01-02
- Dropdown ✅ **PROCESS LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02)
  - **Location:** `src/COMPOSITION/overlays/Dropdown/Dropdown.tsx`
  - **Audit Report:** `docs/reports/audit/DROPDOWN_BASELINE_REPORT.md`
  - **Lock Date:** 2026-01-02
- Toast ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-25)

**Primitives:**
- Badge, Icon, Alert, Checkbox, Input, Radio, Textarea, Switch, Field, Progress, Skeleton, Text, Heading, Label, IconButton ✅ **LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02), FormGroup ✅ **LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02), HelperText ✅ **LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02), ErrorText ✅ **LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02)

**Actions:**
- ButtonGroup ✅ **PROCESS LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02)

**DX/A11y Utilities:**
- VisuallyHidden ✅ **PROCESS LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02), FocusTrap ✅ **PROCESS LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02)

**Layout:**
- Box, Stack, Grid, Flex, Container, Row, Column, Surface, Section ✅ **LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02), Inline ✅ **PROCESS LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02), Panel ✅ **PROCESS LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02), Spacer ✅ **PROCESS LOCKED** (DX, Navigation and Surface Layers Lock, 2026-01-02)

**Overlays:**
- Dialog ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
- Popover ✅ **PROCESS LOCKED** (Pipeline 18A Second Pass Complete, 2025-12-25)
- Tooltip ✅ **PROCESS LOCKED** (Pipeline 18A Second Pass Complete, 2025-12-25)
- HoverCard ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
- Portal ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
  - **Location:** `src/COMPOSITION/overlays/Portal.tsx`
  - **Audit Report:** `docs/reports/audit/PORTAL_BASELINE_REPORT.md`
  - **Lock Date:** 2025-12-27
  - **Key Decisions:** Utility component (no visual tokens, no size/variant props), SSR-safe mounting pattern, wrapper div necessary for ref forwarding, className/style props acceptable for COMPOSITION layer, no CVA structure (Decision Matrix RULE 2)
- Backdrop

**Navigation:**
- Breadcrumbs ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)
- Pagination ✅ **LOCKED** (Pipeline 18A Complete, 2025-12-26)
  - **Location:** `src/COMPOSITION/navigation/pagination/Pagination.tsx`
  - **Audit Report:** `docs/reports/audit/PAGINATION_BASELINE_REPORT.md`
  - **Lock Date:** 2025-12-26
  - **Key Decisions:** Fixed md size (no size prop, correct), no variant prop (fixed styling), compound component pattern (Root, Item, Prev, Next, Ellipsis), NAVIGATION_TOKENS usage (shared navigation token domain), token violations fixed (h-4 w-4 → ICON_TOKENS.sizes.md), duplicate styling extracted (PaginationPrev/PaginationNext)
- Stepper ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)
  - **Location:** `src/COMPOSITION/navigation/stepper/Stepper.tsx`
  - **Audit Report:** `docs/reports/audit/STEPPER_BASELINE_REPORT.md`
  - **Lock Date:** 2025-12-26
  - **Key Decisions:** No CVA structure (correct - no size/variant props), token compliance via NAVIGATION_TOKENS/MOTION_TOKENS/ICON_TOKENS, compound API pattern, semantic process states (isActive, isCompleted, disabled), helper functions extracted to reduce duplication
- SegmentedControl ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)

**Data Display:**
- Table ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)
  - **Location:** `src/PATTERNS/tables/table/Table.tsx`
  - **Audit Report:** `docs/reports/audit/TABLE_BASELINE_REPORT.md`
  - **Lock Date:** 2025-12-26
  - **Key Decisions:** Compound component pattern, alignment classes extracted, keyboard navigation support, explicit union types, TABLE_TOKENS usage, React Context for state management
- DataList ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
  - **Location:** `src/PATTERNS/lists/DataList/DataList.tsx`
  - **Audit Report:** `docs/reports/audit/DATALIST_BASELINE_REPORT.md`
  - **Lock Date:** 2025-12-27
  - **Key Decisions:** Compound component pattern (Root, Item, Label, Value), labelWidth prop implemented via React Context, token-only styling (DATA_LIST_TOKENS), semantic HTML (`<dl>`, `<dt>`, `<dd>`)
- List ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
  - **Location:** `src/PATTERNS/lists/List/List.tsx`
  - **Audit Report:** `docs/reports/audit/LIST_BASELINE_REPORT.md`
  - **Lock Date:** 2025-12-27
  - **Key Decisions:** Simple list display pattern (no compound component), React.FC replaced with explicit function, token-only styling (LIST_TOKENS), semantic HTML (`<ul>`, `<li>` with `role="list"`), presentational component (no interactive states beyond CSS hover), no size/variant props (intentionally simple)
- Timeline ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
  - **Location:** `src/PATTERNS/lists/Timeline/Timeline.tsx`
  - **Audit Report:** `docs/reports/audit/TIMELINE_BASELINE_REPORT.md`
  - **Lock Date:** 2025-12-27
  - **Key Decisions:** Presentational component (display-only, no interactive states), React.FC replaced with explicit function, token-only styling (TIMELINE_TOKENS), semantic HTML (`<ol>`, `<li>` with `role="list"`), accessibility (ARIA attributes, `aria-hidden="true"` on decorative elements), no CVA required (no size/variant props per Decision Matrix)
- CardBase ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
  - **Location:** `src/PATTERNS/cards/CardBase/CardBase.tsx`
  - **Audit Report:** `docs/reports/audit/CARDBASE_BASELINE_REPORT.md`
  - **Lock Date:** 2025-12-27
  - **Key Decisions:** CVA migrated (cva → tokenCVA), size/variant props aligned with canonical dictionaries (GlobalSize: sm/md, SurfaceVariant: default/elevated), type constraints added (satisfies Record<Type, string>), component-specific token file created, canonical Storybook stories (Matrix, SizesGallery), comprehensive tests
- EmptyState ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
  - **Location:** `src/PATTERNS/states/EmptyState/EmptyState.tsx`
  - **Audit Report:** `docs/reports/audit/EMPTYSTATE_BASELINE_REPORT.md`
  - **Lock Date:** 2025-12-27
  - **Key Decisions:** Compound component pattern (Icon, Title, Description, Action), token-only styling (EMPTY_STATE_TOKENS), semantic HTML (h3, p), stateless non-interactive display component, subcomponent attachment pattern optimized, type consistency (EmptyStateIconSize type used)

**Notifications:**
- NotificationCenter ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
  - **Location:** `src/DOMAIN/notifications/`
  - **Audit Report:** `docs/reports/audit/NOTIFICATIONCENTER_BASELINE_REPORT.md`
  - **Lock Date:** 2025-12-27
  - **Key Decisions:** Compound component pattern maintained (Provider, Panel, Trigger, List, Item, GroupHeader, DismissAll), utility functions extracted (`NotificationCenter.utils.ts`), channel method pattern extracted (reduced duplication), panel width prop restricted to overlay size scale (sm | md | lg only), no CVA structures (Decision Matrix RULE 2 applies), token compliance via NOTIFICATION_TOKENS, comprehensive tests and Storybook stories (SizesGallery, LongContent added)

---

## STAGE 1: Critical Components (Priority: HIGH)

**Timeline:** 3-4 weeks  
**Goal:** Components without which the library cannot be considered complete

### 1.1 Slider / RangeSlider
- **Why:** Numeric value control, price/range filters
- **Complexity:** Medium
- **Time Estimate:** 3-4 days
- **Radix:** `@radix-ui/react-slider`
- **Use Cases:** Price filters, volume control, date range selection
- **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-25; Re-run Complete, 2025-12-27)
- **Date Completed:** 2025-12-25
- **Lock Date:** 2025-12-27 (Re-run completion)
- **Previous Lock Date:** 2025-12-25 (Initial completion)

**Slider Component:**
- **Audit Report:** `docs/reports/audit/SLIDER_BASELINE_REPORT.md`
- **Enhanced:** 2025-12-25 (vertical orientation + marks/labels support)
- **Re-run:** 2025-12-27 (Pipeline 18A re-run complete, all steps validated, lock consistency verified)
- **PR:** `fix/slider-rangeslider-code-review-fixes`
- **Features:** Horizontal/vertical orientation, marks with optional labels, token-driven styling (SLIDER_TOKENS), tokenCVA migration
- **Tests:** 408 lines, comprehensive test coverage (behavior, edge cases, accessibility, variants, sizes, orientation, marks)
- **Stories:** 14+ Storybook stories including Matrix, States, SizesGallery, vertical orientation, and marks demonstrations

**RangeSlider Component:**
- **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-25)
- **Audit Report:** `docs/reports/audit/RANGESLIDER_BASELINE_REPORT.md`
- **Lock Date:** 2025-12-25
- **Features:** Two-thumb range selection, horizontal/vertical orientation, marks with optional labels, token-driven styling (RANGESLIDER_TOKENS), tokenCVA migration
- **Key Changes:** CVA migrated (cva → tokenCVA), token file created, type constraints added, all raw values replaced with tokens
- **Tests:** 38 tests, 100% pass rate
- **Stories:** 14+ Storybook stories including Matrix, States, SizesGallery, vertical orientation, and marks demonstrations
- **Location:** `src/COMPOSITION/controls/RangeSlider/`

### 1.2 Avatar / AvatarGroup
- **Why:** User avatar display, profiles
- **Complexity:** Low
- **Time Estimate:** 2-3 days
- **Radix:** `@radix-ui/react-avatar`
- **Use Cases:** User profiles, comments, chats
- **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)
- **Date Completed:** 2025-12-26
- **Lock Date:** 2025-12-26
- **Location:** `src/COMPOSITION/controls/Avatar/`
- **Audit Report:** `docs/reports/audit/AVATAR_BASELINE_REPORT.md`

### 1.3 Separator (Divider)
- **Why:** Visual content separation
- **Complexity:** Very Low
- **Time Estimate:** 1 day
- **Radix:** `@radix-ui/react-separator`
- **Use Cases:** Section dividers, menu separators, list separators
- **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-25)
- **Date Completed:** 2025-12-25
- **Lock Date:** 2025-12-25
- **Location:** `src/COMPOSITION/controls/Separator/`
- **Audit Report:** `docs/reports/audit/SEPARATOR_BASELINE_REPORT.md`
- **Token Compliance:** ✅ 100%

### 1.4 Command / CommandPalette
- **Why:** Quick action access (like VS Code)
- **Complexity:** High
- **Time Estimate:** 5-7 days
- **Radix:** Custom implementation based on Dialog + Combobox (✅ Combobox available)
- **Use Cases:** Command search, quick navigation, global search
- **Status:** 🔴 Not Started
- **Dependencies:** Combobox ✅ (CREATED, 2025-12-28)

### 1.5 ScrollArea
- **Why:** Custom scrollbars for cross-browser consistency
- **Complexity:** Medium
- **Time Estimate:** 2-3 days
- **Radix:** `@radix-ui/react-scroll-area`
- **Use Cases:** Long lists, sidebars, menus
- **Status:** 🔴 Not Started

### 1.6 Dropdown (DropdownMenu v2)
- **Why:** Basic dropdown action list
- **Complexity:** Medium
- **Time Estimate:** 3-4 days
- **Radix:** `@radix-ui/react-dropdown-menu`
- **Use Cases:** Action menus, settings, options
- **Note:** Old DropdownMenu was removed (MIGRATION_12C), needs new implementation
- **Status:** 🔴 Not Started

**Stage 1 Total Estimate:** 16-22 days (3-4 weeks)

---

## STAGE 2: Important Components (Priority: MEDIUM)

**Timeline:** 4-5 weeks  
**Goal:** Significantly expand library functionality

### 2.1 Accordion
- **Why:** Collapsible sections for FAQ, settings
- **Complexity:** Low
- **Time Estimate:** 2-3 days
- **Radix:** `@radix-ui/react-accordion`
- **Use Cases:** FAQ, filters, settings
- **Status:** ✅ **CREATED** (Component Creation Pipeline C0-C10 Complete, 2025-12-28)
- **Date Completed:** 2025-12-28
- **Location:** `src/COMPOSITION/overlays/Accordion/Accordion.tsx`
- **Creation Report:** `docs/reports/creation/ACCORDION_CREATION_REPORT.md`
- **Bug Fix (2025-12-28):** Fixed click interaction issue - disabled tokens now use `disabled:` prefix per INTERACTION_AUTHORITY

### 2.2 Collapsible
- **Why:** Simple collapse/expand content
- **Complexity:** Low
- **Time Estimate:** 1-2 days
- **Radix:** `@radix-ui/react-collapsible`
- **Use Cases:** Advanced options, additional information
- **Status:** 🔴 Not Started

### 2.3 Calendar / DatePicker
- **Why:** Date/time selection
- **Complexity:** High
- **Time Estimate:** 5-7 days
- **Library:** `react-day-picker` (compatible with Radix)
- **Use Cases:** Bookings, date filters, events
- **Status:** 🔴 Not Started

### 2.4 Combobox
- **Why:** Input + select combination with autocomplete
- **Complexity:** High
- **Time Estimate:** 4-5 days (Actual: ~5.5 hours)
- **Radix:** Custom implementation based on Popover + Input
- **Use Cases:** Search with autocomplete, tags, large list selection
- **Status:** ✅ **CREATED** (Component Creation Pipeline C0-C10 Complete, 2025-12-28)
- **Date Completed:** 2025-12-28
- **Location:** `src/COMPOSITION/overlays/Combobox/`
- **Creation Report:** `docs/reports/creation/COMBOBOX_CREATION_REPORT.md`
- **Lock:** `docs/architecture/EXTENSION_STATE.md`
- **Features:** Single-select and multi-select modes, client-side and server-side filtering, keyboard navigation, tags display
- **Token Compliance:** ✅ 100% (INPUT_TOKENS, POPOVER_TOKENS, SPACING_TOKENS)

### 2.5 Toggle / ToggleGroup
- **Why:** State toggles (Switch alternative)
- **Complexity:** Low
- **Time Estimate:** 2-3 days
- **Radix:** `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`
- **Use Cases:** Text formatting (bold/italic), view selection (grid/list)
- **Status:** 🔴 Not Started

### 2.6 AspectRatio
- **Why:** Container with fixed aspect ratio
- **Complexity:** Very Low
- **Time Estimate:** 1 day
- **Radix:** `@radix-ui/react-aspect-ratio`
- **Use Cases:** Images, videos, cards
- **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-25)
- **Date Completed:** 2025-12-25
- **Lock Date:** 2025-12-25
- **Location:** `src/COMPOSITION/controls/AspectRatio/`
- **Audit Report:** `docs/reports/audit/ASPECTRATIO_BASELINE_REPORT.md`

### 2.7 NavigationMenu
- **Why:** Complex navigation menu with submenus
- **Complexity:** High
- **Time Estimate:** 4-5 days
- **Radix:** `@radix-ui/react-navigation-menu`
- **Use Cases:** Main site menu, mega-menu
- **Status:** 🔴 Not Started

### 2.8 Menubar
- **Why:** Menu bar like desktop applications
- **Complexity:** Medium
- **Time Estimate:** 3-4 days
- **Radix:** `@radix-ui/react-menubar`
- **Use Cases:** Desktop-like interface applications
- **Status:** 🔴 Not Started

**Stage 2 Total Estimate:** 22-31 days (4-5 weeks)

---

## STAGE 3: Additional Components (Priority: LOW)

**Timeline:** 6-8 weeks  
**Goal:** Nice-to-have, but not critical for basic functionality

### 3.1 Sheet (Drawer v2)
- **Why:** Sidebar (slide-over)
- **Complexity:** Medium
- **Time Estimate:** 3-4 days
- **Radix:** `@radix-ui/react-dialog` (with custom animation)
- **Use Cases:** Sidebars, mobile menus
- **Note:** Drawer already exists in RESTRICTED, needs rework
- **Status:** 🔴 Not Started

### 3.2 AlertDialog
- **Why:** Modal for critical actions (delete, confirmation)
- **Complexity:** Low
- **Time Estimate:** 2-3 days
- **Radix:** `@radix-ui/react-alert-dialog`
- **Use Cases:** Delete confirmation, warnings
- **Status:** 🔴 Not Started

### 3.3 Carousel
- **Why:** Image slider/carousel
- **Complexity:** High
- **Time Estimate:** 5-7 days
- **Library:** `embla-carousel-react` or custom implementation
- **Use Cases:** Galleries, promo banners, products
- **Status:** 🔴 Not Started

### 3.4 Timeline
- **Why:** Event timeline
- **Complexity:** Medium
- **Time Estimate:** 3-4 days
- **Radix:** Custom implementation
- **Use Cases:** Order history, user activity
- **Status:** 🔴 Not Started

### 3.5 Tree / TreeView
- **Why:** Tree data display
- **Complexity:** High
- **Time Estimate:** 6-8 days
- **Radix:** Custom implementation based on Collapsible
- **Use Cases:** File systems, hierarchies, menus
- **Status:** 🔴 Not Started

### 3.6 Resizable
- **Why:** Resizable panels (split view)
- **Complexity:** High
- **Time Estimate:** 5-7 days
- **Radix:** Custom implementation
- **Use Cases:** IDE-like interfaces, dashboards
- **Status:** 🔴 Not Started

### 3.7 Form (Complex)
- **Why:** Full-featured form system with validation
- **Complexity:** Very High
- **Time Estimate:** 10-14 days
- **Library:** Integration with `react-hook-form` + `zod`
- **Use Cases:** Registration, settings, entity creation
- **Status:** 🔴 Not Started

### 3.8 Sonner (Toast v2)
- **Why:** Modern Toast alternative (2024-2025 trend)
- **Complexity:** Medium
- **Time Estimate:** 3-4 days
- **Library:** `sonner` (can wrap in token-driven API)
- **Use Cases:** Notifications, alerts, confirmations
- **Status:** 🔴 Not Started

### 3.9 Chip / Tag
- **Why:** Tags, chips, filters
- **Complexity:** Low
- **Time Estimate:** 2-3 days
- **Radix:** Custom implementation (possibly based on Badge)
- **Use Cases:** Article tags, selected filters, categories
- **Status:** ✅ **CREATED** (Component Creation Pipeline C0-C10 Complete, 2025-12-28)
- **Location:** `src/COMPOSITION/overlays/Chip/Chip.tsx`
- **Creation Report:** `docs/reports/creation/CHIP_CREATION_REPORT.md`
- **Features:** Multiple interaction modes (display/clickable/removable/selectable), variant support (primary/secondary/accent/outline/ghost/destructive), radius variants (sm/md/lg/pill), keyboard navigation (Enter/Space, Delete/Backspace), accessibility (ARIA attributes, semantic roles)
- **Token Compliance:** ✅ 100% (CHIP_TOKENS)
- **Exports:** `Chip`, `ChipProps`, `ChipVariant`, `ChipRadius`, `CHIP_VARIANTS`, `CHIP_RADIUS_VALUES`, `chipVariants`

### 3.10 FileUpload
- **Why:** File upload with drag-and-drop
- **Complexity:** Medium
- **Time Estimate:** 4-5 days
- **Radix:** Custom implementation
- **Use Cases:** Image upload, documents
- **Status:** ✅ **COMPLETE** (2025-12-28)
- **Location:** `src/COMPOSITION/overlays/FileUpload/FileUpload.tsx`
- **Pipeline:** Component Creation Pipeline (C0-C10 complete)
- **Creation Report:** `docs/reports/creation/FileUpload_CREATION_REPORT.md`
- **Features:** Drag-and-drop file selection, file preview with thumbnails, file validation (size/type/count), controlled/uncontrolled modes, size variants (sm/md/lg), visual variants (outline/filled), multiple file selection, error handling, disabled/loading states, motion animations, full A11Y compliance, keyboard navigation
- **Token Compliance:** ✅ 100% (spacing, radius, color, typography, shadow, motion tokens)
- **Exports:** `FileUpload`, `FileUploadError`, `FileUploadProps`, `FileUploadSize`, `FileUploadVariant`

### 3.11 Rating
- **Why:** Star/point rating
- **Complexity:** Low
- **Time Estimate:** 2-3 days
- **Radix:** Custom implementation
- **Use Cases:** Reviews, ratings
- **Status:** 🔴 Not Started

**Stage 3 Total Estimate:** 47-65 days (6-8 weeks)

---

## Development Methodology

For each component, follow the **Component Creation Checklist** (`docs/workflows/tasks/COMPONENT_CREATION_CHECKLIST.md`):

1. ✅ **Pre-Creation Verification**
   - Authority & Lock Check
   - Component Classification
   - Naming Verification

2. ✅ **Scaffold Generation**
   - `pnpm run component:generate -- <ComponentName> --category <category>`

3. ✅ **Token Mapping (MANDATORY)**
   - All visual properties → token unions
   - No raw values (colors, spacing, sizes)

4. ✅ **Radix Delegation**
   - Delegate behavior to Radix UI (where applicable)

5. ✅ **Responsive Support**
   - Use `Responsive<T>` for sizes/spacing

6. ✅ **Storybook Stories**
   - Matrix (variants × sizes)
   - States (default, hover, active, disabled)
   - Realistic usage examples

7. ✅ **Tests**
   - Behavior tests
   - Edge cases
   - Accessibility tests

8. ✅ **A11y Verification**
   - STEP 10 from Pipeline 18A
   - ARIA attributes
   - Keyboard navigation
   - Screen reader support

9. ✅ **Export**
   - Add to `src/index.ts` (if public)

---

## Recommended Implementation Order

### Week 1-2: Basic Primitives
1. Separator (unblock from RESTRICTED)
2. Avatar / AvatarGroup
3. Slider / RangeSlider
4. AspectRatio

### Week 3-4: Important Interactive Components
5. ScrollArea
6. Accordion
7. Collapsible
8. Toggle / ToggleGroup

### Week 5-6: Advanced Components
9. DropdownMenu (v2, based on Radix)
10. Command / CommandPalette
11. Combobox

### Week 7-8: Calendar and Navigation
12. Calendar / DatePicker
13. NavigationMenu
14. Menubar

### Week 9+: Additional Components
15. AlertDialog
16. Sheet (Drawer v2)
17. Carousel
18. Timeline
19. Tree / TreeView
20. Rest as needed

---

## Resources

- **Component Generator:** `scripts/generate-extension-component.ts`
- **Creation Checklist:** `docs/workflows/tasks/COMPONENT_CREATION_CHECKLIST.md`
- **Examples:** `docs/reference/COMPONENT_EXAMPLES.md`
- **Authority Contracts:** `docs/architecture/AUTHORITY_NAVIGATION.md`
- **Extension Authority:** `docs/architecture/EXTENSION_AUTHORITY.md`
- **Radix UI Docs:** https://www.radix-ui.com/primitives/docs/overview/introduction

---

## Progress Tracking

| Stage | Components | Status | Progress |
|-------|-----------|--------|----------|
| **Stage 1** | 6 components | 🟡 In Progress | 3/6 (50%) |
| **Stage 2** | 8 components | 🟡 In Progress | 2/8 (25%) |
| **Stage 3** | 11 components | 🔴 Not Started | 0/11 (0%) |
| **Total** | **25 components** | 🟡 In Progress | **5/25 (20%)** |

---

## Notes

- All components MUST use token unions for visual properties
- All components MUST delegate behavior to Radix UI (where applicable)
- All components MUST pass accessibility verification
- All components MUST follow Extension Authority Contract
- Foundation components are LOCKED and cannot be modified

---

**Next Steps:**
1. Review and approve this roadmap
2. Proceed to Stage 1 detailed planning: `COMPONENT_ROADMAP_STAGE_1.md`
3. Start implementation with Separator (simplest component)

