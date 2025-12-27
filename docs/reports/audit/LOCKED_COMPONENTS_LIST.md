# LOCKED Components List

**Date:** 2025-12-27  
**Total Components:** 55  
**Purpose:** Canonical list of all LOCKED components for motion coverage audit

---

## FOUNDATION LOCK Components

| Component | Path | Category | Lock Date |
|-----------|------|----------|-----------|
| Button | `src/PRIMITIVES/Button/` | primitive | 2025-12-25 |
| Link | `src/PRIMITIVES/Link/` | primitive | 2025-12-25 |
| Input | `src/PRIMITIVES/Input/` | primitive | 2025-12-25 |
| Text | `src/PRIMITIVES/Text/` | primitive | 2025-12-26 |
| Select | `src/COMPOSITION/controls/Select/` | composite | 2025-12-26 |
| Label | `src/PRIMITIVES/Label/` | primitive | 2025-12-25 |
| Heading | `src/PRIMITIVES/Heading/` | primitive | 2025-12-25 |
| Icon | `src/PRIMITIVES/Icon/` | primitive | 2025-12-25 |
| Radio | `src/PRIMITIVES/Radio/` | primitive | 2025-12-25 |
| Switch | `src/PRIMITIVES/Switch/` | primitive | 2025-12-25 |
| Textarea | `src/PRIMITIVES/Textarea/` | primitive | 2025-12-25 |

**Total FOUNDATION LOCK:** 11 components

---

## PROCESS LOCKED Components

| Component | Path | Category | Lock Date |
|-----------|------|----------|-----------|
| Checkbox | `src/PRIMITIVES/Checkbox/` | primitive | 2025-12-25 |
| NavLink | `src/PRIMITIVES/NavLink/` | primitive | 2025-12-26 |
| NavItem | `src/COMPOSITION/navigation/primitives/` | primitive | 2025-12-26 |
| NavList | `src/COMPOSITION/navigation/nav-list/` | composite | 2025-12-26 |
| NavRoot | `src/COMPOSITION/navigation/NavRoot/` | composite | 2025-12-26 |
| NavText | `src/COMPOSITION/navigation/NavText/` | primitive | 2025-12-26 |
| NavSeparator | `src/COMPOSITION/navigation/NavSeparator/` | primitive | 2025-12-26 |
| Alert | `src/PRIMITIVES/Alert/` | primitive | 2025-12-26 |
| Badge | `src/PRIMITIVES/Badge/` | primitive | 2025-12-25 |
| Avatar | `src/COMPOSITION/controls/Avatar/` | composite | 2025-12-26 |
| Separator | `src/COMPOSITION/controls/Separator/` | composite | 2025-12-25 |
| RangeSlider | `src/COMPOSITION/controls/RangeSlider/` | composite | 2025-12-25 |
| Timeline | `src/PATTERNS/lists/Timeline/` | pattern | 2025-12-27 |
| HoverCard | `src/PATTERNS/menus/menus/hover-card/` | pattern | 2025-12-27 |
| Dialog | `src/COMPOSITION/overlays/Dialog.tsx` | overlay | 2025-12-27 |
| Portal | `src/COMPOSITION/overlays/Portal.tsx` | overlay | 2025-12-27 |
| Tooltip | `src/COMPOSITION/overlays/Tooltip.tsx` | overlay | 2025-12-25 |
| Popover | `src/COMPOSITION/overlays/Popover.tsx` | overlay | 2025-12-26 |
| Progress | `src/PRIMITIVES/Progress/` | primitive | 2025-12-25 |
| AspectRatio | `src/COMPOSITION/controls/AspectRatio/` | composite | 2025-12-25 |
| List | `src/PATTERNS/lists/List/` | pattern | 2025-12-27 |
| NotificationCenter | `src/PATTERNS/notifications/NotificationCenter/` | pattern | 2025-12-27 |
| Table | `src/PATTERNS/tables/table/` | pattern | 2025-12-26 |
| SimpleTable | `src/PATTERNS/tables/SimpleTable/` | pattern | 2025-12-26 |
| Skeleton | `src/PRIMITIVES/Skeleton/` | primitive | 2025-12-26 |
| EmptyState | `src/PATTERNS/states/EmptyState/` | pattern | 2025-12-27 |
| DataList | `src/PATTERNS/lists/DataList/` | pattern | 2025-12-27 |
| Slider | `src/COMPOSITION/controls/Slider/` | composite | 2025-12-27 |
| Breadcrumbs | `src/COMPOSITION/navigation/breadcrumbs/` | composite | 2025-12-26 |
| Stepper | `src/COMPOSITION/navigation/stepper/` | composite | 2025-12-26 |
| Pagination | `src/COMPOSITION/navigation/pagination/` | composite | 2025-12-26 |
| SegmentedControl | `src/COMPOSITION/navigation/segmented-control/` | composite | 2025-12-26 |
| Modal | `src/COMPOSITION/overlays/Modal/` | overlay | 2025-12-25 |
| Tabs | `src/COMPOSITION/navigation/tabs/` | composite | 2025-12-25 |
| ContextMenu | `src/COMPOSITION/overlays/ContextMenu/` | overlay | 2025-12-25 |
| Toast | `src/COMPOSITION/overlays/Toast.tsx` | overlay | 2025-12-25 |
| CardBase | `src/PATTERNS/cards/CardBase/` | pattern | 2025-12-27 |
| FilterBar | `src/PATTERNS/filters/FilterBar/` | pattern | 2025-12-27 |

**Total PROCESS LOCKED:** 38 components

---

## LOCKED Layout Components

| Component | Path | Category | Lock Date |
|-----------|------|----------|-----------|
| Box | `src/COMPOSITION/layout/Box/` | layout | 2025-12-15 |
| Stack | `src/COMPOSITION/layout/Stack/` | layout | 2025-12-15 |
| Row | `src/COMPOSITION/layout/Row/` | layout | 2025-12-15 |
| Column | `src/COMPOSITION/layout/Column/` | layout | 2025-12-15 |
| Container | `src/COMPOSITION/layout/Container/` | layout | 2025-12-15 |
| Flex | `src/COMPOSITION/layout/Flex/` | layout | 2025-12-15 |
| Grid | `src/COMPOSITION/layout/Grid/` | layout | 2025-12-15 |
| Surface | `src/COMPOSITION/layout/Surface/` | layout | 2025-12-15 |

**Total LOCKED Layout:** 8 components

---

## Summary

- **FOUNDATION LOCK:** 11 components
- **PROCESS LOCKED:** 38 components
- **LOCKED Layout:** 8 components
- **Total LOCKED Components:** 55 components

---

## Notes

- All components marked as LOCKED are immutable and cannot be modified without explicit unlock procedure
- FOUNDATION LOCK components are core primitives in Foundation layer
- PROCESS LOCKED components are Extension layer components that have completed Pipeline 18A
- LOCKED Layout components are validated layout primitives
- This list is the canonical source for motion coverage audit

