# Component Development Roadmap

**Status:** Active  
**Created:** 2025-12-25  
**Last Updated:** 2025-12-25  
**Purpose:** Comprehensive roadmap for developing missing components in Tenerife UI library

**Latest Progress:** Avatar/AvatarGroup completed (2025-12-25) - 2/25 components (8%)

---

## Overview

This document provides a prioritized roadmap for developing components needed to make the Tenerife UI library production-ready. Components are organized into 3 stages based on priority and use case criticality.

**Estimation:** 13-17 weeks total (3-4 months of active development)

---

## Current Library Status

### ✅ Already Implemented

**Foundation Components (LOCKED):**
- Modal, Tabs, Select, ContextMenu, Toast, Button, Link

**Primitives:**
- Badge, Icon, Alert, Checkbox, Input, Radio, Textarea, Switch, Field, Progress, Skeleton, Text, Heading, Label

**Layout:**
- Box, Stack, Grid, Flex, Container, Row, Column, Surface

**Overlays:**
- Dialog, Popover, Tooltip, HoverCard, Portal, Backdrop

**Navigation:**
- Breadcrumbs, Pagination, Stepper, SegmentedControl

**Data Display:**
- Table, DataList, EmptyState

**Notifications:**
- NotificationCenter

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
- **Status:** ✅ Completed
- **Date Completed:** 2025-12-25
- **PR:** `fix/slider-rangeslider-code-review-fixes`

### 1.2 Avatar / AvatarGroup
- **Why:** User avatar display, profiles
- **Complexity:** Low
- **Time Estimate:** 2-3 days
- **Radix:** `@radix-ui/react-avatar`
- **Use Cases:** User profiles, comments, chats
- **Status:** ✅ Completed
- **Date Completed:** 2025-12-25
- **Location:** `src/COMPOSITION/controls/Avatar/`

### 1.3 Separator (Divider)
- **Why:** Visual content separation
- **Complexity:** Very Low
- **Time Estimate:** 1 day
- **Radix:** `@radix-ui/react-separator`
- **Use Cases:** Section dividers, menu separators, list separators
- **Note:** Already exists in RESTRICTED, needs unblocking and migration
- **Status:** 🔴 Not Started

### 1.4 Command / CommandPalette
- **Why:** Quick action access (like VS Code)
- **Complexity:** High
- **Time Estimate:** 5-7 days
- **Radix:** Custom implementation based on Dialog + Combobox
- **Use Cases:** Command search, quick navigation, global search
- **Status:** 🔴 Not Started

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
- **Status:** 🔴 Not Started

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
- **Time Estimate:** 4-5 days
- **Radix:** Custom implementation based on Popover + Input
- **Use Cases:** Search with autocomplete, tags, large list selection
- **Status:** 🔴 Not Started

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
- **Status:** 🔴 Not Started

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
- **Status:** 🔴 Not Started

### 3.10 FileUpload
- **Why:** File upload with drag-and-drop
- **Complexity:** Medium
- **Time Estimate:** 4-5 days
- **Radix:** Custom implementation
- **Use Cases:** Image upload, documents
- **Status:** 🔴 Not Started

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
| **Stage 1** | 6 components | 🟡 In Progress | 2/6 (33%) |
| **Stage 2** | 8 components | 🔴 Not Started | 0/8 (0%) |
| **Stage 3** | 11 components | 🔴 Not Started | 0/11 (0%) |
| **Total** | **25 components** | 🟡 In Progress | **2/25 (8%)** |

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

