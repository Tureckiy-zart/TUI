# Tenerife UI Library - Public API Reference

**Version:** 1.0.15  
**Last Updated:** 2025-12-16

This document describes the complete public API surface of `@tenerife.music/ui`. All exports are available from the main entry point unless otherwise specified.

---

## Entry Points

The library provides multiple entry points for tree-shaking and selective imports:

| Entry Point | Purpose                     | Example                                                    |
| ----------- | --------------------------- | ---------------------------------------------------------- |
| `.`         | Main entry (all components) | `import { Button } from '@tenerife.music/ui'`              |
| `./styles`  | CSS styles only             | `import '@tenerife.music/ui/styles'`                       |
| `./preset`  | Tailwind preset             | `import preset from '@tenerife.music/ui/preset'`           |
| `./tokens`  | Design tokens only          | `import { primaryColors, semanticSpacing } from '@tenerife.music/ui/tokens'`       |
| `./theme`   | Theme system only           | `import { ThemeProvider } from '@tenerife.music/ui/theme'` |

---

## Design Tokens

All design tokens are exported from the main entry point. These include:

### Color Tokens

- `primaryColors` - Primary color scale (50-950)
- `accentColors` - Accent color scale (50-950)
- `secondaryColors` - Secondary color scale (50-950)
- `baseColors` - Base color tokens
- `semanticColors` - Semantic colors (success, error, warning, info)
- `surfaceColors` - Surface colors (base, elevated1-3, overlay, glass)
- `textColors` - Text colors (primary, secondary, tertiary, muted)
- `chartColors` - Chart color palette
- `colorCSSVariables` - CSS variable mappings
- `cssVariableColorTokens` - CSS variable token definitions
- `tailwindThemeColors` - Tailwind theme color configuration

**Type Exports:** `ColorTokens`, `ColorScale`, `BaseColorTokens`, `SemanticColors`, `SurfaceColors`, `TextColors`, `ChartColors`, `Mode`

### Typography Tokens

- `fontFamily` - Font family stacks (sans, display, serif, mono)
- `fontSize` - Font size scale (xs through 6xl, fluid with `clamp()`)
- `fontWeight` - Font weights (thin through black)
- `lineHeight` - Line height scale (none, tight, snug, normal, relaxed, loose)
- `letterSpacing` - Letter spacing scale (tighter through widest)
- `textStyles` - Pre-configured text style combinations
- `typographyCSSVariables` - CSS variable mappings
- `tailwindTypographyConfig` - Tailwind typography configuration

**Type Exports:** `FontFamily`, `FontSize`, `FontWeight`, `LineHeight`, `LetterSpacing`, `TextStyle`, `CanonicalFontSize`, `CanonicalFontWeight`, etc.

### Spacing Tokens

- `spacing` - Base spacing scale (0-96, 8px grid system)
- `semanticSpacing` - Semantic spacing tokens (xs, sm, md, lg, xl, 2xl-5xl)
- `layoutSpacing` - Layout spacing (section, container, grid, stack, component)
- `spacingCSSVariables` - CSS variable mappings
- `tailwindSpacingConfig` - Tailwind spacing configuration

**Type Exports:** `Spacing`, `SemanticSpacing`, `SectionSpacing`, `ContainerSpacing`, `GridSpacing`, `StackSpacing`, `ComponentSpacing`

### Shadow Tokens

- `elevationShadows` - Elevation shadow scale (none, xs, sm, md, lg, xl, 2xl)
- `primaryColoredShadows` - Primary colored shadows (xs through 2xl)
- `accentColoredShadows` - Accent colored shadows (xs through 2xl)
- `glowEffects` - Glow effects (primary/accent, subtle/medium/strong)
- `focusRings` - Focus ring tokens (default, primary, accent)
- `shadowCSSVariables` - CSS variable mappings
- `tailwindShadowConfig` - Tailwind shadow configuration

**Type Exports:** `ElevationShadow`, `ColoredShadow`, `GlowEffect`, `FocusRing`

### Radius Tokens

- `borderRadius` - Border radius scale (none, xs, sm, md, lg, xl, 2xl, 3xl, full)
- `componentRadius` - Component-specific radius standards
- `radiusCSSVariables` - CSS variable mappings
- `tailwindRadiusConfig` - Tailwind radius configuration

**Type Exports:** `BorderRadius`, `ComponentRadius`

### Motion Tokens

- `durations` - Animation durations (instant, fast, normal, slow, slower, slowest, plus granular)
- `easings` - Easing functions (linear, ease-in, ease-out, ease-in-out, bounce, elastic, Material Design)
- `transitions` - Pre-configured transition combinations
- `animations` - Animation presets
- `keyframes` - Keyframe definitions (fade, slide, scale, spin, pulse, bounce, ping, shake)
- `springs` - Spring animation configurations
- `motionCSSVariables` - CSS variable mappings
- `tailwindMotionConfig` - Tailwind motion configuration
- `motionV2Durations`, `motionV2Easings`, `motionV2Transitions` - Motion V2 system
- `motionV2Fade`, `motionV2Scale`, `motionV2Slide` - Motion V2 presets

**Type Exports:** `Duration`, `Easing`, `Transition`, `Animation`, `Keyframe`, `Spring`, `MotionV2Duration`, `MotionV2Easing`, `MotionV2Transition`, etc.

### Component Tokens

Component-specific token mappings for consistent component styling:

- `BUTTON_TOKENS` - Button component tokens
- `INPUT_TOKENS` - Input component tokens
- `SELECT_TOKENS` - Select component tokens
- `CARD_TOKENS` - Card component tokens
- `ALERT_TOKENS` - Alert component tokens
- `CHECKBOX_TOKENS` - Checkbox component tokens
- `RADIO_TOKENS` - Radio component tokens
- `TEXT_TOKENS` - Text component tokens
- `ICON_TOKENS` - Icon component tokens
- `MENU_TOKENS` - Menu component tokens
- `DROPDOWN_TOKENS` - Dropdown menu tokens
- `POPOVER_TOKENS` - Popover component tokens
- `TOOLTIP_TOKENS` - Tooltip component tokens
- `TOAST_TOKENS` - Toast component tokens
- `OVERLAY_TOKENS` - Overlay component tokens
- `NOTIFICATION_TOKENS` - Notification component tokens
- `NAVIGATION_TOKENS` - Navigation component tokens
- `SURFACE_TOKENS` - Surface component tokens
- `SECTION_TOKENS` - Section component tokens
- `MOTION_TOKENS` - Motion component tokens
- `DATA_TOKENS` - Data display component tokens
- `DOMAIN_TOKENS` - Domain card component tokens
- `ARTIST_TOKENS` - Artist card tokens

**Type Exports:** Many component-specific types (e.g., `ButtonHeight`, `InputSize`, `SelectVariant`, `CardSize`, etc.)

**Usage:**

```typescript
import { primaryColors, semanticSpacing, elevationShadows, fontFamily, fontSize, BUTTON_TOKENS } from "@tenerife.music/ui";
// Or import from tokens entry point:
import { primaryColors, semanticSpacing, BUTTON_TOKENS } from "@tenerife.music/ui/tokens";
```

---

## Type Exports

### Responsive Types

- `Breakpoint` - Breakpoint type for responsive design
- `Responsive<T>` - Responsive value type wrapper

**Usage:**

```typescript
import type { Breakpoint, Responsive } from "@tenerife.music/ui";
```

---

## UI Components

Foundation UI components built on shadcn/ui primitives with Tenerife branding and token-driven styling.

### Button

- **Component:** `Button`
- **Types:** `ButtonProps`, `buttonVariants`
- **Variants:** `primary`, `secondary`, `accent`, `outline`, `ghost`, `link`, `destructive`
- **Sizes:** `xs`, `sm`, `md`, `lg`, `xl`, `icon`
- **Features:** Loading state, icon slots (leftIcon, rightIcon), asChild support

### Input

- **Component:** `Input`
- **Types:** `InputProps`, `inputVariants`
- **Variants:** `default`, `filled`, `outline`
- **Sizes:** `sm`, `md`, `lg`
- **States:** `success`, `error`, `warning`, `disabled`

### Textarea

- **Component:** `Textarea`
- **Types:** `TextareaProps`, `textareaVariants`
- **Features:** Auto-resizing, validation states

### Checkbox

- **Component:** `Checkbox`
- **Types:** `CheckboxProps`, `checkboxVariants`
- **Features:** Controlled/uncontrolled, label support

### Radio

- **Component:** `Radio`, `RadioGroup`
- **Types:** `RadioProps`, `RadioGroupProps`, `radioVariants`
- **Features:** Radio button group, controlled/uncontrolled

### Label

- **Component:** `Label`
- **Types:** `LabelProps`, `labelVariants`
- **Features:** Required indicator, helper text

### Field

- **Component:** `Field`
- **Types:** `FieldProps`, `FieldLabelProps`, `FieldDescriptionProps`, `FieldErrorProps`, `FieldControlProps`
- **Features:** Form field wrapper with label, description, and error handling

### Typography Components

- **Text** - Base text component
  - Types: `TextProps`, `textVariants`
  - Sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`
  - Weights: `normal`, `medium`, `semibold`, `bold`

- **Body** - Body text component
  - Types: `BodyProps`, `bodyVariants`

- **Caption** - Caption text component
  - Types: `CaptionProps`, `captionVariants`

- **Code** - Inline code component
  - Types: `CodeProps`, `codeVariants`

- **Display** - Display text component
  - Types: `DisplayProps`, `displayVariants`

- **Heading** - Heading component
  - Types: `HeadingProps`, `headingVariants`
  - Levels: `1`, `2`, `3`, `4`, `5`, `6`

- **Lead** - Lead paragraph component
  - Types: `LeadProps`, `leadVariants`

### Alert

- **Component:** `Alert`
- **Types:** `AlertProps`, `alertVariants`
- **Variants:** `primary`, `secondary`, `accent`, `outline`, `ghost`, `link`, `destructive`

**Usage:**

```typescript
import { Button, Input, Text, Heading, Alert, Checkbox, Radio, Textarea, Field, Label } from "@tenerife.music/ui";
```

---

## Container Components

Token-driven container components for content organization.

### Card

- **Component:** `Card`, `CardHeader`, `CardBody`, `CardFooter`
- **Types:** `CardProps`, `CardHeaderProps`, `CardBodyProps`, `CardFooterProps`
- **Variants:** `default`, `elevated`, `glass`, `outline`

### Section

- **Component:** `Section`
- **Types:** `SectionProps`
- **Features:** Responsive padding, background variants

### ContainerSurface

- **Component:** `ContainerSurface` (alias for `Surface`)
- **Types:** `ContainerSurfaceProps`
- **Variants:** `containerSurfaceVariants`

**Usage:**

```typescript
import { Card, CardHeader, CardBody, Section, ContainerSurface } from "@tenerife.music/ui";
```

---

## Theme System

### Theme Provider

- `ThemeProvider` - React context provider for theme management
- `useTheme` - Hook to access theme context
- **Types:** `ThemeProviderProps`

### Theme Utilities (from `./theme` entry point)

- `getInitialMode`, `getInitialTheme`, `getInitialBrand` - Get initial theme state
- `persistMode`, `persistTheme`, `persistBrand` - Persist theme state
- `loadTheme`, `loadThemeSafe` - Load theme by ID
- `registerTheme`, `themeExists` - Theme registry management
- `getAllThemes`, `getThemeMetadata`, `getThemesByCategory` - Theme discovery
- `preloadThemes`, `canLoadTheme`, `getAvailableThemeIds` - Theme loading utilities
- `validateThemeSchema`, `isThemeSchema`, `createMinimalThemeSchema` - Theme validation

**Type Exports:** `ThemeProviderProps`, `Mode`, `ThemeSchema`, `ThemeMetadata`, `ThemeRegistryEntry`, `ThemeLoaderOptions`, `ThemeLoaderResult`, `ThemeValidationResult`

**Usage:**

```typescript
import { ThemeProvider, useTheme } from "@tenerife.music/ui";
// Or from theme entry point:
import { ThemeProvider, loadTheme, registerTheme } from "@tenerife.music/ui/theme";
```

---

## Layout Primitives

Token-based layout primitives for consistent structure and flow.

### Box

- **Component:** `Box`
- **Types:** `BoxProps`
- **Features:** Base layout container

### Container

- **Component:** `Container`
- **Types:** `ContainerProps`
- **Features:** Max-width constraints, responsive padding

### Flex

- **Component:** `Flex`
- **Types:** `FlexProps`
- **Features:** Flexbox layout, gap, direction, align, justify

### Grid

- **Component:** `Grid`
- **Types:** `GridProps`
- **Features:** Responsive grid, auto-fit/auto-fill, gap tokens

### Stack

- **Component:** `Stack`
- **Types:** `StackProps`
- **Features:** Vertical/horizontal stacking, gap tokens

### Row

- **Component:** `Row`
- **Types:** `RowProps`
- **Features:** Horizontal row layout

### Column

- **Component:** `Column`
- **Types:** `ColumnProps`
- **Features:** Vertical column layout

### Surface

- **Component:** `Surface`
- **Types:** `SurfaceProps`, `surfaceVariants`
- **Features:** Surface container with variants

**Usage:**

```typescript
import { Container, Flex, Grid, Stack, Box, Row, Column, Surface } from "@tenerife.music/ui";
```

---

## Modal & Overlay Components

Radix-based modal and overlay components with token-driven styling.

### Modal Components

- `Modal` - Foundation modal component (Radix Dialog wrapper)
- `ModalRoot` - Modal root container
- `ModalTrigger` - Modal trigger button
- `ModalContent` - Modal content container
- `ModalHeader` - Modal header section
- `ModalTitle` - Modal title
- `ModalDescription` - Modal description
- `ModalFooter` - Modal footer section
- `ModalClose` - Modal close button
- `ModalOverlay` - Modal backdrop overlay

**Types:** `ModalRootProps`, `ModalTriggerProps`, `ModalContentProps`, `ModalHeaderProps`, `ModalTitleProps`, `ModalDescriptionProps`, `ModalFooterProps`, `ModalCloseProps`, `ModalOverlayProps`

**Note:** `ModalPortal` is internal-only and not exported.

### Dialog Components

- `Dialog` - Dialog component
- `DialogRoot` - Dialog root container
- `DialogBody` - Dialog body content
- `DialogHeader` - Dialog header section
- `DialogTitle` - Dialog title
- `DialogDescription` - Dialog description
- `DialogFooter` - Dialog footer section

**Types:** `DialogProps`, `DialogRootProps`, `DialogBodyProps`, `DialogHeaderProps`, `DialogTitleProps`, `DialogDescriptionProps`, `DialogFooterProps`

### Overlay Components

- `Backdrop` - Backdrop overlay component
- `Portal` - Portal component for rendering outside DOM hierarchy
- `Popover` - Popover component (see Menu Components section)
- `Tooltip` - Tooltip component (see Menu Components section)

**Types:** `BackdropProps`, `PortalProps`

**Usage:**

```typescript
import { Modal, ModalRoot, ModalTrigger, ModalContent, Dialog, Backdrop, Portal } from "@tenerife.music/ui";
```

---

## Menu Components

Radix-based menu and navigation components with token-driven styling.

### DropdownMenu

- `DropdownMenuRoot` - Dropdown menu root
- `DropdownMenuTrigger` - Dropdown menu trigger
- `DropdownMenuContent` - Dropdown menu content
- `DropdownMenuItem` - Dropdown menu item
- `DropdownMenuCheckItem` - Dropdown menu checkbox item
- `DropdownMenuRadioGroup` - Dropdown menu radio group
- `DropdownMenuRadioItem` - Dropdown menu radio item
- `DropdownMenuLabel` - Dropdown menu label
- `DropdownMenuGroup` - Dropdown menu group
- `DropdownMenuSeparator` - Dropdown menu separator
- `DropdownMenuSub` - Dropdown menu submenu
- `DropdownMenuSubTrigger` - Dropdown menu submenu trigger
- `DropdownMenuSubContent` - Dropdown menu submenu content

**Types:** `DropdownMenuRootProps`, `DropdownMenuTriggerProps`, `DropdownMenuContentProps`, `DropdownMenuItemProps`, `DropdownMenuCheckItemProps`, `DropdownMenuRadioGroupProps`, `DropdownMenuRadioItemProps`, `DropdownMenuLabelProps`, `DropdownMenuGroupProps`, `DropdownMenuSeparatorProps`, `DropdownMenuSubProps`, `DropdownMenuSubTriggerProps`, `DropdownMenuSubContentProps`

### ContextMenu

- `ContextMenuRoot` - Context menu root
- `ContextMenuTrigger` - Context menu trigger
- `ContextMenuContent` - Context menu content
- `ContextMenuItem` - Context menu item
- `ContextMenuCheckboxItem` - Context menu checkbox item
- `ContextMenuRadioGroup` - Context menu radio group
- `ContextMenuRadioItem` - Context menu radio item
- `ContextMenuLabel` - Context menu label
- `ContextMenuSeparator` - Context menu separator
- `ContextMenuSub` - Context menu submenu
- `ContextMenuSubTrigger` - Context menu submenu trigger
- `ContextMenuSubContent` - Context menu submenu content

**Types:** `ContextMenuRootProps`, `ContextMenuTriggerProps`, `ContextMenuContentProps`, `ContextMenuItemProps`, `ContextMenuCheckboxItemProps`, `ContextMenuRadioGroupProps`, `ContextMenuRadioItemProps`, `ContextMenuLabelProps`, `ContextMenuSeparatorProps`, `ContextMenuSubProps`, `ContextMenuSubTriggerProps`, `ContextMenuSubContentProps`

### Popover

- `PopoverRoot` - Popover root
- `PopoverTrigger` - Popover trigger
- `PopoverContent` - Popover content
- `PopoverArrow` - Popover arrow indicator

**Types:** `PopoverRootProps`, `PopoverTriggerProps`, `PopoverContentProps`, `PopoverArrowProps`, `popoverContentVariants`

### HoverCard

- `HoverCardRoot` - Hover card root
- `HoverCardTrigger` - Hover card trigger
- `HoverCardContent` - Hover card content

**Types:** `HoverCardRootProps`, `HoverCardTriggerProps`, `HoverCardContentProps`

**Usage:**

```typescript
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, ContextMenuRoot, PopoverRoot, HoverCardRoot } from "@tenerife.music/ui";
```

---


---

## Select Component

Radix-based select component with token-driven styling.

### Select

- `SelectRoot` - Select root container
- `SelectTrigger` - Select trigger button
- `SelectValue` - Select value display
- `SelectIcon` - Select dropdown icon
- `SelectContent` - Select dropdown content
- `SelectViewport` - Select viewport container
- `SelectItem` - Select item option
- `SelectItemText` - Select item text
- `SelectItemIndicator` - Select item check indicator
- `SelectLabel` - Select label
- `SelectGroup` - Select option group
- `SelectSeparator` - Select separator

**Types:** `SelectRootProps`, `SelectTriggerProps`, `SelectValueProps`, `SelectIconProps`, `SelectContentProps`, `SelectViewportProps`, `SelectItemProps`, `SelectItemTextProps`, `SelectItemIndicatorProps`, `SelectLabelProps`, `SelectGroupProps`, `SelectSeparatorProps`, `SelectSize`, `SelectState`, `SelectVariant`, `SelectWidth`

**Usage:**

```typescript
import { SelectRoot, SelectTrigger, SelectContent, SelectItem } from "@tenerife.music/ui";
```

---

## Feedback Components

### Skeleton

- **Component:** `Skeleton`
- **Types:** `SkeletonProps`, `skeletonVariants`
- **Features:** Loading skeleton, shimmer animation

**Usage:**

```typescript
import { Skeleton } from "@tenerife.music/ui";
```

---

## Toast Components

Radix-based toast notification system with token-driven styling.

### Toast

- `Toast` - Toast component
- `ToastProvider` - Toast context provider
- `ToastViewport` - Toast viewport container
- `useToast` - Hook for toast management

**Types:** `ToastProps`, `ToastProviderProps`, `ToastViewportProps`, `ToastData`, `ToastOptions`, `ToastAction`, `ToastPosition`

**Usage:**

```typescript
import { Toast, ToastProvider, ToastViewport, useToast } from "@tenerife.music/ui";
```

---

## Navigation Components

Token-driven navigation components with accessibility support.

### Breadcrumbs

- `Breadcrumbs` - Breadcrumb navigation component
- **Types:** `BreadcrumbsRootProps`, `BreadcrumbsItemProps`, `BreadcrumbsSeparatorProps`, `BreadcrumbItem`
- **Features:** Breadcrumb navigation, separator customization

### Pagination

- `Pagination` - Pagination component
- **Types:** `PaginationRootProps`, `PaginationItemProps`, `PaginationPrevProps`, `PaginationNextProps`, `PaginationEllipsisProps`
- **Features:** Page navigation, page size selection

### Tabs

- `Tabs` - Tabs component object with sub-components
  - `Tabs.Root` - Tabs root container
  - `Tabs.List` - Tabs list container
  - `Tabs.Trigger` - Tabs trigger button
  - `Tabs.Content` - Tabs content panel
- **Types:** `TabsRootProps`, `TabsListProps`, `TabsTriggerProps`, `TabsContentProps`
- **Features:** Accessible tabs, keyboard navigation

### SegmentedControl

- `SegmentedControl` - Segmented control component
- **Types:** `SegmentedControlRootProps`, `SegmentedControlItemProps`, `segmentedControlRootVariants`, `segmentedControlItemVariants`
- **Features:** Segmented button group

### Stepper

- `Stepper` - Stepper component
- **Types:** `StepperRootProps`, `StepperItemProps`, `StepperIndicatorProps`, `StepperLabelProps`, `StepperContentProps`, `StepperStep`
- **Features:** Multi-step navigation

**Usage:**

```typescript
import { Breadcrumbs, Pagination, Tabs, SegmentedControl, Stepper } from "@tenerife.music/ui";

// Tabs usage
<Tabs.Root>
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs.Root>
```

---

## Data Display Components

Token-driven data display components for structured information.

### Table

- `Table` - Table component
- `TableRoot` - Table root container
- `TableHead` - Table head section
- `TableHeader` - Table header cell
- `TableBody` - Table body section
- `TableRow` - Table row
- `TableCell` - Table cell
- `TableEmpty` - Empty state for table
- `TableLoadingState` - Loading state for table
- `TableExpandableContent` - Expandable row content
- `TableSortIcon` - Sort indicator icon
- `useTableContext` - Hook for table context

**Types:** `TableRootProps`, `TableHeadProps`, `TableHeaderProps`, `TableBodyProps`, `TableRowProps`, `TableCellProps`, `TableEmptyProps`, `TableLoadingStateProps`, `TableExpandableContentProps`, `TableSortIconProps`, `TableColumn`, `TableContextValue`, `SortState`, `SortDirection`

### DataList

- `DataListRoot` - Data list root container
- `DataListItem` - Data list item
- `DataListLabel` - Data list label
- `DataListValue` - Data list value

**Types:** `DataListRootProps`, `DataListItemProps`, `DataListLabelProps`, `DataListValueProps`

### EmptyState

- `EmptyState` - Empty state component
- `EmptyStateIcon` - Empty state icon
- `EmptyStateTitle` - Empty state title
- `EmptyStateDescription` - Empty state description
- `EmptyStateAction` - Empty state action button

**Types:** `EmptyStateProps`, `EmptyStateIconProps`, `EmptyStateTitleProps`, `EmptyStateDescriptionProps`, `EmptyStateActionProps`

**Usage:**

```typescript
import { Table, TableRoot, TableHeader, TableRow, TableCell, DataListRoot, DataListItem, EmptyState } from "@tenerife.music/ui";
```

---

## Domain Card Components

Domain-specific card components for event and venue display.

### EventCard

- **Component:** `EventCard`
- **Types:** `EventCardProps`, `EventCardSize`, `EventCardVariant`, `EventCardLayout`
- **Features:** Event display, featured variant, metadata icons, multiple layouts


### ArtistCard

- **Component:** `ArtistCard`
- **Types:** `ArtistCardProps`, `ArtistCardSize`, `ArtistCardVariant`
- **Features:** Artist display card

### CategoryCard

- **Component:** `CategoryCard`
- **Types:** `CategoryCardProps`, `CategoryCardSize`, `CategoryCardVariant`
- **Features:** Category display card

### PromoCard

- **Component:** `PromoCard`
- **Types:** `PromoCardProps`, `PromoCardSize`, `PromoCardVariant`
- **Features:** Promotional content card

### TicketCard

- **Component:** `TicketCard`
- **Types:** `TicketCardProps`, `TicketCardSize`, `TicketCardVariant`, `TicketAvailability`
- **Features:** Ticket display card with availability status

**Usage:**

```typescript
import { EventCard, ArtistCard, CategoryCard, PromoCard, TicketCard } from "@tenerife.music/ui";
```

---


---



---


---

## Icon System

Icon component and icon registry for consistent iconography.

### Icon Component

- `Icon` - Icon component
- **Types:** `IconProps`, `iconVariants`
- **Features:** Token-driven icon sizing and styling

### Icon Registry

Pre-built icon components (tree-shakeable):

- `IconArrowRight` - Arrow right icon
- `IconCalendar` - Calendar icon
- `IconCheck` - Check icon
- `IconChevronDown` - Chevron down icon
- `IconChevronRight` - Chevron right icon
- `IconClose` - Close icon
- `IconError` - Error icon
- `IconInfo` - Info icon
- `IconLocation` - Location icon
- `IconMenu` - Menu icon
- `IconSearch` - Search icon
- `IconSuccess` - Success icon
- `IconWarning` - Warning icon

**Types:** `IconProps` (as `IconComponentProps`), `IconName`

**Registry:** `ICONS_MAP` - Icon registry map

**Usage:**

```typescript
import { Icon, IconArrowRight, IconCalendar, IconCheck } from "@tenerife.music/ui";
```

---


---


---

## Notification System

Multi-channel notification system with provider and panel components.

### NotificationCenter

- `NotificationCenter` - Notification center component
- `NotificationCenterProvider` - Notification context provider
- `NotificationCenterPanel` - Notification panel container
- `NotificationCenterTrigger` - Notification trigger button
- `NotificationCenterList` - Notification list container
- `NotificationCenterItem` - Notification item component
- `NotificationCenterGroupHeader` - Notification group header
- `NotificationCenterDismissAll` - Dismiss all button
- `useNotificationCenter` - Hook for notification API
- `useNotificationCenterContext` - Hook for notification context

**Types:** `NotificationCenterProviderProps`, `NotificationCenterPanelProps`, `NotificationCenterTriggerProps`, `NotificationCenterListProps`, `NotificationCenterItemProps`, `NotificationCenterGroupHeaderProps`, `NotificationCenterDismissAllProps`, `NotificationContextType`, `NotificationData`, `NotificationOptions`, `NotificationVariant`, `NotificationChannel`, `GroupByFunction`

**Usage:**

```typescript
import { NotificationCenter, NotificationCenterProvider, useNotificationCenter } from "@tenerife.music/ui";
```

---


---


---

## Tree-Shaking Recommendations

For optimal bundle size, use named imports:

```typescript
// ✅ Good - Tree-shakeable
import { Button, Input, Card } from "@tenerife.music/ui";

// ❌ Avoid - Imports entire library
import * as UI from "@tenerife.music/ui";
```

For design tokens, use the tokens entry point:

```typescript
// ✅ Good - Only imports tokens
import { primaryColors, semanticSpacing, elevationShadows } from "@tenerife.music/ui/tokens";

// ❌ Avoid - Imports entire library
import { primaryColors, semanticSpacing } from "@tenerife.music/ui";
```

---

## Import Restrictions

**Deep imports are not supported.** Only use the public API:

```typescript
// ✅ Good - Public API
import { Button } from "@tenerife.music/ui";

// ❌ Bad - Deep import (not supported)
import { Button } from "@tenerife.music/ui/components/primitives/Button";
```

---

## Breaking Changes

### Removed Exports (v1.0.0+)

The following components are no longer exported (may be internal-only or removed):

- `Badge`, `Divider`, `Link`, `ThemeSwitch` - Not exported from main entry
- `Footer`, `ModeHero`, `Navbar` - Not exported from main entry
- `DateRangePicker`, `FilterBar`, `FilterSelect`, `PriceRangeSlider`, `SearchFilters`, `SearchInput` - Not exported
- `FormInput`, `FormSelect`, `FormTextarea` - Not exported
- `Progress`, `List`, `Timeline` - Not exported
- `ArticlesSection`, `CTASection`, `FeatureSection`, `HeroSection`, `TrendingSection` - Not exported
- `EventCardSkeleton`, `VenueCardSkeleton` - Not exported
- `SearchBar`, `Image`, `TrendingIcon` - Not exported
- `LanguageSelector` - Not exported
- `LoginForm`, `ProfileCard`, `RegisterForm` - Not exported
- `Dashboard`, `UserManagement` - Not exported
- `useModal` - Not exported
- `FilterOption`, `FilterState` - Types not exported

---

## API Stability

### Stable APIs (Safe to Use)

- All primitive components (Button, Input, Card, etc.)
- All layout components
- All modal/overlay components
- All feedback components
- Theme system
- Design tokens

### Unstable APIs (May Change)

- `EventCard` - Will be refactored in D2 (Domain Decoupling)
- Domain card components (ArtistCard, CategoryCard, PromoCard, TicketCard) - May be refactored in D2

---

## Examples

### Basic Component Usage

```typescript
import { Button, Input, Card } from '@tenerife.music/ui';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### Using Design Tokens

```typescript
import { primaryColors, semanticSpacing, elevationShadows } from "@tenerife.music/ui/tokens";

const styles = {
  backgroundColor: primaryColors[500],
  padding: semanticSpacing.md,
  boxShadow: elevationShadows.md,
};
```

### Using Theme System

```typescript
import { ThemeProvider, useTheme } from '@tenerife.music/ui';

function App() {
  return (
    <ThemeProvider>
      <MyComponent />
    </ThemeProvider>
  );
}
```

### Using Typography Components

```typescript
import { Text, Heading, Body, Caption, Code, Display, Lead } from '@tenerife.music/ui';

function TypographyExample() {
  return (
    <>
      <Display>Display Text</Display>
      <Heading level={1}>Main Heading</Heading>
      <Lead>Lead paragraph text</Lead>
      <Body>Body text content</Body>
      <Text size="sm">Small text</Text>
      <Caption>Caption text</Caption>
      <Code>inline code</Code>
    </>
  );
}
```

---

## Support

For issues, questions, or contributions, please visit:

- **Repository:** https://github.com/Tureckiy-zart/tenerife-ui
- **Issues:** https://github.com/Tureckiy-zart/tenerife-ui/issues

---

**Last Updated:** 2025-12-16  
**API Version:** 1.0.15
