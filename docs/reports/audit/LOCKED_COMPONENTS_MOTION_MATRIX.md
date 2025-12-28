# LOCKED Components Motion Matrix

**Date:** 2025-12-27  
**Purpose:** Classification of motion presence in all LOCKED components

---

## Motion Type Definitions

- **NONE** - No motion or transition
- **INTERACTIVE** - Only hover/active/focus transitions (colors, opacity, transform without keyframes)
- **ENTER_EXIT** - Mount/unmount animations with keyframes (fade-in, fade-out, scale-in, slide-*)
- **COMPOSITE** - Combination of INTERACTIVE + ENTER_EXIT

---

## FOUNDATION LOCK Components

| Component | Motion Type | Motion Details | Storybook Coverage |
|-----------|-------------|----------------|-------------------|
| Button | INTERACTIVE | BUTTON_TOKENS.transition.colors (hover/active/focus) | ✅ States story |
| Link | INTERACTIVE | LINK_TOKENS.transition.colors (hover/focus) | ✅ Default story |
| Input | INTERACTIVE | MOTION_TOKENS.transition.colors (focus) | ✅ States story |
| Text | NONE | No motion (static typography) | ✅ Default story |
| Select | INTERACTIVE | MOTION_TOKENS.transition.transform (dropdown animation) | ✅ States story |
| Label | NONE | No motion (static label) | ✅ Default story |
| Heading | NONE | No motion (static typography) | ✅ Default story |
| Icon | NONE | No motion (static icon) | ✅ Default story |
| Radio | INTERACTIVE | MOTION_TOKENS.transition.all (hover/focus) | ✅ States story |
| Switch | INTERACTIVE | SWITCH_TOKENS.transition.track + transition.handle (toggle animation) | ✅ States story |
| Textarea | INTERACTIVE | MOTION_TOKENS.transition.colors (focus) | ✅ States story |

---

## PROCESS LOCKED Components

| Component | Motion Type | Motion Details | Storybook Coverage |
|-----------|-------------|----------------|-------------------|
| Checkbox | INTERACTIVE | MOTION_TOKENS.transition.all (hover/focus) | ✅ States story |
| NavLink | NONE | No motion (delegates to Link) | ✅ Default story |
| NavItem | NONE | No motion (structural component) | ✅ Default story |
| NavList | NONE | No motion (structural component) | ✅ Default story |
| NavRoot | NONE | No motion (structural component) | ✅ Default story |
| NavText | NONE | No motion (static text) | ✅ Default story |
| NavSeparator | NONE | No motion (static separator) | ✅ Default story |
| Alert | NONE | No motion (static display) | ✅ Default story |
| Badge | INTERACTIVE | BADGE_TOKENS.transition.colors (hover/focus) | ✅ Default story |
| Avatar | NONE | No motion (static display) | ✅ Default story |
| Separator | NONE | No motion (static separator) | ✅ Default story |
| RangeSlider | INTERACTIVE | transition-colors (track/thumb) | ✅ States story |
| Slider | INTERACTIVE | transition-colors (track/thumb) | ✅ States story |
| Timeline | NONE | No motion (static display) | ✅ Default story |
| HoverCard | NONE | No motion (delegates to Popover) | ✅ Default story |
| Dialog | NONE | No motion (delegates to Modal) | ✅ Default story |
| Portal | NONE | No motion (utility component) | ✅ Default story |
| Tooltip | ENTER_EXIT | tm-motion-fade-scale (enter/exit) | ✅ Default story |
| Popover | ENTER_EXIT | tm-motion-fade-scale (enter/exit) | ✅ Default story |
| Progress | INTERACTIVE | PROGRESS_TOKENS.transition (width animation) | ✅ Default story |
| AspectRatio | NONE | No motion (layout utility) | ✅ Default story |
| List | INTERACTIVE | LIST_TOKENS.item.transition (hover) | ✅ Default story |
| NotificationCenter | NONE | No motion (structural component) | ✅ Default story |
| Table | INTERACTIVE | TABLE_TOKENS.expandable.transition + TableSortIcon rotation | ✅ States story |
| SimpleTable | NONE | No motion (static display) | ✅ Default story |
| Skeleton | NONE | Pulse animation (not interactive motion) | ✅ Default story |
| EmptyState | NONE | No motion (static display) | ✅ Default story |
| DataList | NONE | No motion (static display) | ✅ Default story |
| Breadcrumbs | NONE | No motion (static navigation) | ✅ Default story |
| Stepper | INTERACTIVE | MOTION_TOKENS.transition.colors (active state) | ✅ States story |
| Pagination | INTERACTIVE | MOTION_TOKENS.transition.colors (hover/focus) | ✅ States story |
| SegmentedControl | INTERACTIVE | MOTION_TOKENS.transition.all (hover/focus) | ✅ States story |
| Tabs | INTERACTIVE | TABS_TOKENS.transition.colors + indicator.transition | ✅ States story |
| Toast | COMPOSITE | MOTION_TOKENS.transition.all + Radix animations (enter/exit) | ✅ Default story |
| ContextMenu | NONE | No motion (Radix handles animations internally) | ✅ Default story |
| Modal | COMPOSITE | Tailwind animate-in/out (fade + zoom) + transitions | ✅ Default story |
| CardBase | INTERACTIVE | DOMAIN_TOKENS.motion.hover.transition | ✅ Default story |
| FilterBar | NONE | No motion (structural component) | ✅ Default story |

---

## LOCKED Layout Components

| Component | Motion Type | Motion Details | Storybook Coverage |
|-----------|-------------|----------------|-------------------|
| Box | NONE | No motion (pure layout) | ✅ Default story |
| Stack | NONE | No motion (pure layout) | ✅ Default story |
| Row | NONE | No motion (pure layout) | ✅ Default story |
| Column | NONE | No motion (pure layout) | ✅ Default story |
| Container | NONE | No motion (pure layout) | ✅ Default story |
| Flex | NONE | No motion (pure layout) | ✅ Default story |
| Grid | NONE | No motion (pure layout) | ✅ Default story |
| Surface | NONE | No motion (pure layout) | ✅ Default story |

---

## Summary Statistics

### By Motion Type

- **NONE:** 30 components (54.5%)
- **INTERACTIVE:** 20 components (36.4%)
- **ENTER_EXIT:** 2 components (3.6%)
- **COMPOSITE:** 3 components (5.5%)

### By Lock Type

- **FOUNDATION LOCK:**
  - NONE: 4 components (36.4%)
  - INTERACTIVE: 7 components (63.6%)
  - ENTER_EXIT: 0 components (0%)
  - COMPOSITE: 0 components (0%)

- **PROCESS LOCKED:**
  - NONE: 26 components (68.4%)
  - INTERACTIVE: 9 components (23.7%)
  - ENTER_EXIT: 2 components (5.3%)
  - COMPOSITE: 1 component (2.6%)

- **LOCKED Layout:**
  - NONE: 8 components (100%)
  - INTERACTIVE: 0 components (0%)
  - ENTER_EXIT: 0 components (0%)
  - COMPOSITE: 0 components (0%)

---

## Notes

- **Overlay Components:** Modal, Popover, Tooltip have enter/exit animations (appropriate for overlays)
- **Interactive Components:** Most form controls and interactive elements have hover/focus transitions
- **Layout Components:** All layout components correctly have no motion (pure layout utilities)
- **Display Components:** Static display components (Text, Heading, Icon, Badge, Avatar) appropriately have no motion or only interactive transitions
- **Navigation Components:** Most navigation structural components have no motion (correct for structural wrappers)

