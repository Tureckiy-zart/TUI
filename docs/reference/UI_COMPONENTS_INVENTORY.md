# 📊 Tenerife UI Components Inventory

**Created:** 2025-11-25  
**Purpose:** Count and description of all UI library elements in Tenerife UI

---

## 📈 General Statistics

- **Total components:** ~158 component files (excluding tests and stories)
- **Component categories:** 18
- **Exported components:** 200+ (including subcomponents and types)

---

## 📦 Detailed Breakdown by Category

### 1. UI Primitives (CVA-based, Token-driven)

**Count:** 17 components

#### Typography (7 components)

- `Text` - basic text component
- `Body` - component for body text
- `Caption` - component for captions
- `Code` - component for code
- `Display` - component for display headings
- `Heading` - component for headings
- `Lead` - component for lead text

#### Forms (5 components)

- `Input` - input field
- `Textarea` - multiline input field
- `Select` - dropdown list
- `Label` - field label
- `Field` - form field wrapper

#### Basic Components (5 components)

- `Button` - button
- `Alert` - notification/alert
- `Card` - card
- `Dialog` - dialog window
- `Toast` - popup notification
- `Tooltip` - tooltip
- `Toaster` - toast provider

---

### 2. Layout Primitives (Token-driven)

**Count:** 8 components

- `Box` - basic container
- `Stack` - vertical stack
- `Row` - horizontal row
- `Column` - vertical column
- `Flex` - flex container
- `Grid` - grid container
- `Surface` - surface with style variants
- `Container` - container with width constraint

---

### 3. Container Components

**Count:** 3 components

- `Card` - card with Header/Body/Footer
- `Section` - content section
- `Surface` - surface with variants

**Card Subcomponents:**

- `CardHeader`
- `CardBody`
- `CardFooter`

---

### 4. Overlay System

**Count:** 8 components

- `Portal` - portal for rendering outside DOM
- `Backdrop` - background layer
- `Modal` - modal window
- `Dialog` - dialog window
- `Toast` - popup notification
- `ToastProvider` - toast provider
- `ToastViewport` - toast container
- `OverlayPortal` - overlay portal

**Modal Subcomponents:**

- `ModalHeader`
- `ModalBody`
- `ModalFooter`

**Dialog Subcomponents:**

- `DialogRoot`
- `DialogHeader`
- `DialogBody`
- `DialogFooter`
- `DialogTitle`
- `DialogDescription`

---

### 5. Menu System

**Count:** 35+ components

#### Popover (4 components)

- `PopoverRoot`
- `PopoverTrigger`
- `PopoverContent`
- `PopoverArrow`

#### ~~DropdownMenu~~ ✅ REMOVED (MIGRATION_12C, 2025-01-27)

**Status:** All Dropdown components and tokens fully removed from codebase.

See `docs_archive/migrations/MIGRATION_12C_DROPDOWN_TOKENS_REMOVAL_REPORT.md` for details (archived).

#### ContextMenu (7 components)

- `ContextMenuRoot`
- `ContextMenuTrigger`
- `ContextMenuContent`
- `ContextMenuItem`
- `ContextMenuLabel`
- `ContextMenuGroup`
- `ContextMenuSeparator`

#### HoverCard (3 components)

- `HoverCardRoot`
- `HoverCardTrigger`
- `HoverCardContent`

#### Legacy Menu (1 component)

- ~~`DropdownMenu` (legacy)~~ ✅ **REMOVED** (MIGRATION_12C)
- `NavigationMenu` (legacy)
- `Tabs` (legacy)

---

### 6. Navigation System

**Count:** 5 main components + subcomponents

#### Tabs (Compound Component)

- `Tabs` (Root)
- `TabsList`
- `TabsTrigger`
- `TabsContent`

#### SegmentedControl (Compound Component)

- `SegmentedControl` (Root)
- `SegmentedControlItem`

#### Breadcrumbs (Compound Component)

- `Breadcrumbs` (Root)
- `BreadcrumbsItem`
- `BreadcrumbsSeparator`

#### Pagination (Compound Component)

- `Pagination` (Root)
- `PaginationItem`
- `PaginationPrev`
- `PaginationNext`
- `PaginationEllipsis`

#### Stepper (Compound Component)

- `Stepper` (Root)
- `StepperItem`
- `StepperIndicator`
- `StepperLabel`
- `StepperContent`

---

### 7. Data Display Components

**Count:** 25+ components

#### Table (11 components)

- `Table` / `TableRoot`
- `TableHead`
- `TableHeader`
- `TableBody`
- `TableRow`
- `TableCell`
- `TableEmpty`
- `TableLoadingState`
- `TableExpandableContent`
- `TableSortIcon`

#### DataList (4 components)

- `DataList` / `DataListRoot`
- `DataListItem`
- `DataListLabel`
- `DataListValue`

#### EmptyState (5 components)

- `EmptyState`
- `EmptyStateTitle`
- `EmptyStateDescription`
- `EmptyStateIcon`
- `EmptyStateAction`

#### Skeleton (1 component)

- `Skeleton`

#### Legacy Data (2 components)

- `List` (legacy)
- `Timeline` (legacy)
- `Table` (legacy)

---

### 8. Notification System

**Count:** 8 components + 1 hook

- `NotificationCenter` (Compound Component)
- `NotificationCenterProvider`
- `NotificationCenterPanel`
- `NotificationCenterTrigger`
- `NotificationCenterList`
- `NotificationCenterItem`
- `NotificationCenterGroupHeader`
- `NotificationCenterDismissAll`
- `useNotificationCenter` (hook)

---

### 9. Form Components (Legacy)

**Count:** 3 components

- `FormInput` (removed, replaced with `Input`)
- `FormSelect` (removed, replaced with `Select`)
- `FormTextarea` (removed, replaced with `Textarea`)

---

### 10. Filter Components

**Count:** 6 components

- `SearchInput` - search field
- `FilterBar` - filter bar
- `FilterSelect` - filter select
- `DateRangePicker` - date range picker
- `PriceRangeSlider` - price range slider
- `SearchFilters` - search filters component

---

### 11. Feedback Components

**Count:** 3 components

- `Alert` - notification
- `Progress` - progress indicator
- `Skeleton` - loading skeleton
- `ConsentBanner` - consent banner

---

### 12. Card Components (Domain-specific)

**Count:** 2 components

- `EventCard` - event card
- `VenueCard` - venue card

---

### 13. Section Components

**Count:** 5 components

- `HeroSection` - hero section
- `FeatureSection` - feature section
- `CTASection` - call-to-action section
- `ArticlesSection` - articles section
- `TrendingSection` - trending section
- `SectionBuilder` - section builder

---

### 14. Modal Components

**Count:** 4 components

- `Modal` - base modal component (Foundation - Radix Dialog wrapper)
- `Dialog` - dialog extension (uses Modal internally)
- `ConfirmDialog` - confirmation dialog (uses Modal internally)
- `ModalProvider` - modal provider

**Note:** `CustomDialog` was removed as a legacy component. Use `Modal` (foundation) or `Dialog`/`ConfirmDialog` (extensions).

---

### 15. Toast Components (Legacy)

**Count:** 2 components

- `Toast` - toast
- `ToastProvider` - toast provider

---

### 16. Auth Components

**Count:** 3 components

- `LoginForm` - login form
- `RegisterForm` - registration form
- `ProfileCard` - profile card

---

### 17. Admin Components

**Count:** 2 components

- `Dashboard` - admin dashboard
- `UserManagement` - user management

---

### 18. Primitives (Legacy)

**Count:** 8 components

- `Button` (legacy)
- `Input` (legacy)
- `Label` (legacy)
- `Badge` - badge
- `Card` (legacy)
- `Divider` - divider
- `Link` - link
- `ThemeSwitch` - theme switcher

---

### 19. Layout Components (Legacy)

**Count:** 4 components

- `Navbar` - navigation bar
- `Footer` - footer
- `ModeHero` - hero with mode
- `Section` (legacy)

---

### 20. Icon System

**Count:** 1 component + icons

- `Icon` - universal icon component
- `TrendingIcon` - trending icon

**Icons in registry:**

- `IconCheck`
- `IconChevronDown`
- `IconChevronRight`
- `IconClose`
- `IconError`
- `IconInfo`
- `IconMenu`
- `IconSearch`
- `IconSuccess`
- `IconWarning`

---

### 21. Additional Components

**Count:** 5 components

- `Image` - image component
- `LanguageSelector` - language selector
- `SearchBar` - search bar
- `EventCardSkeleton` - event card skeleton
- `VenueCardSkeleton` - venue card skeleton

---

## 🎨 Design Tokens

### Token Categories (7 modules)

1. **Colors** - color system
2. **Typography** - typography
3. **Spacing** - spacing
4. **Shadows** - shadows
5. **Radius** - border radius
6. **Motion** - animations
7. **Components** - component tokens
8. **CSS Variables** - CSS variables
9. **Theme** - themes (day/night)

---

## 📊 Final Statistics

### By Component Type:

| Category              | Component Count         |
| --------------------- | ----------------------- |
| UI Primitives (CVA)   | 17                      |
| Layout Primitives     | 8                       |
| Container             | 3                       |
| Overlay System        | 8                       |
| Menu System           | 35+                     |
| Navigation            | 5 main + subcomponents  |
| Data Display          | 25+                     |
| Notification          | 8 + 1 hook              |
| Filter                | 6                       |
| Feedback              | 3                       |
| Section               | 5                       |
| Card (Domain)         | 2                       |
| Auth                  | 3                       |
| Admin                 | 2                       |
| Icon                  | 1 + 10 icons            |
| Additional            | 5                       |
| Legacy Primitives     | 8                       |
| Legacy Layout         | 4                       |
| Legacy Modal          | 5                       |
| Legacy Toast          | 2                       |
| **TOTAL**             | **~158 component files** |

### By Status:

- ✅ **Active (Token-driven, CVA-based):** ~80 components
- ⚠️ **Legacy (require migration):** ~40 components
- 🎯 **Domain-specific:** ~10 components
- 🔧 **Utilities/Hooks:** ~5 components

---

## 🎯 Key Features

### Modern Architecture (v3):

- ✅ Token-driven components (use only tokens)
- ✅ CVA-based styling (class-variance-authority)
- ✅ SSR-safe components
- ✅ Full TypeScript support
- ✅ Accessibility (a11y) out of the box
- ✅ Compound Components pattern

### Legacy Components:

- ⚠️ Some components require migration to new architecture
- ⚠️ Some components use old patterns

---

## 📝 Notes

1. **Component counting:** Only `.tsx` files are counted, excluding tests and stories
2. **Compound Components:** Counted as one component with subcomponents
3. **Legacy components:** Marked for future migration
4. **Domain-specific:** Components specific to Tenerife Music domain

---

**Last Updated:** 2025-11-25
