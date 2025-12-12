# Tenerife UI Library - Public API Reference

**Version:** 0.0.0  
**Last Updated:** 2025-11-25

This document describes the complete public API surface of `@tenerife.music/ui`. All exports are available from the main entry point unless otherwise specified.

---

## Entry Points

The library provides multiple entry points for tree-shaking and selective imports:

| Entry Point | Purpose                     | Example                                                    |
| ----------- | --------------------------- | ---------------------------------------------------------- |
| `.`         | Main entry (all components) | `import { Button } from '@tenerife.music/ui'`              |
| `./styles`  | CSS styles only             | `import '@tenerife.music/ui/styles'`                       |
| `./preset`  | Tailwind preset             | `import preset from '@tenerife.music/ui/preset'`           |
| `./tokens`  | Design tokens only          | `import { colors } from '@tenerife.music/ui/tokens'`       |
| `./theme`   | Theme system only           | `import { ThemeProvider } from '@tenerife.music/ui/theme'` |

---

## Design Tokens

All design tokens are exported from the main entry point. These include:

### Color Tokens

- `colors` - Complete color palette (primary, accent, secondary, surface, semantic colors)
- Color scales: `primary-50` through `primary-950`, `accent-*`, `secondary-*`
- Surface colors: `surface-base`, `surface-elevated1-3`, `surface-overlay`, `surface-glass`
- Semantic colors: `success`, `error`, `warning`, `info`
- Text colors: `text-primary`, `text-secondary`, `text-tertiary`, `text-muted`

### Typography Tokens

- `typography` - Font families, type scale, weights, line heights, letter spacing
- Font families: `Inter` (primary), `Satoshi` (optional), `Clash Display` (display)
- Type scale: `text-xs` through `text-6xl` (fluid with `clamp()`)
- Font weights: `thin` (100) through `black` (900)
- Line heights: `none`, `tight`, `snug`, `normal`, `relaxed`, `loose`
- Letter spacing: `tighter`, `tight`, `normal`, `wide`, `wider`, `widest`

### Spacing Tokens

- `spacing` - 8px-based spacing system
- Base scale: `space-0` through `space-96`
- Semantic spacing: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`
- Layout spacing: section padding, container widths, grid gaps, stack gaps

### Shadow Tokens

- `shadows` - Elevation shadows, colored shadows, glow effects
- Elevation levels: `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- Colored shadows: `primary-*`, `accent-*` (xs through 2xl)
- Glow effects: `primary-glow-subtle`, `primary-glow-medium`, `accent-glow-*`
- Focus rings: `focus-ring-default`, `focus-ring-primary`, `focus-ring-accent`

### Radius Tokens

- `radius` - Border radius system
- Radius scale: `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`
- Component standards: button, card, input, badge, avatar, modal, tooltip, toast, chip, image

### Motion Tokens

- `motion` - Animation durations, easing functions, transitions
- Durations: `instant`, `fast`, `normal`, `slow`, `slower`, `slowest` (plus granular 75-800ms)
- Easings: `linear`, `ease-in`, `ease-out`, `ease-in-out`, `bounce`, `elastic`, Material Design
- Transitions: Pre-configured duration+easing combinations
- Keyframes: `fade`, `slide`, `scale`, `spin`, `pulse`, `bounce`, `ping`, `shake`

**Usage:**

```typescript
import { colors, spacing, typography } from "@tenerife.music/ui";
// Or import from tokens entry point:
import { colors } from "@tenerife.music/ui/tokens";
```

---

## Type Exports

### Filter Types

- `FilterOption` - Filter option interface

  ```typescript
  interface FilterOption {
    value: string;
    label: string;
    count?: number;
  }
  ```

- `FilterState` - Filter state interface
  ```typescript
  interface FilterState {
    search: string;
    category: string;
    tags: string[];
    dateRange: { start: Date | null; end: Date | null };
    priceRange: { min: number | null; max: number | null };
    sortBy: string;
    sortOrder: "asc" | "desc";
  }
  ```

**Usage:**

```typescript
import type { FilterOption, FilterState } from "@tenerife.music/ui";
```

---

## Primitive Components

Base UI components built on shadcn/ui primitives with Tenerife branding.

### Badge

- **Component:** `Badge`
- **Types:** `BadgeProps`, `badgeVariants`
- **Variants:** `primary`, `secondary`, `accent`, `outline`, `ghost`, `link`, `destructive`
- **Sizes:** `xs`, `sm`, `md`, `lg`, `xl`

### Button

- **Component:** `Button`
- **Types:** `ButtonProps`, `buttonVariants`
- **Variants:** `primary`, `secondary`, `accent`, `outline`, `ghost`, `link`, `destructive`
- **Sizes:** `xs`, `sm`, `md`, `lg`, `xl`
- **Features:** Loading state, icon slots (leftIcon, rightIcon)

### Card

- **Component:** `Card`
- **Types:** `CardProps`
- **Variants:** `default`, `elevated`, `glass`, `outline`

### Divider

- **Component:** `Divider`
- **Types:** `DividerProps`
- **Orientations:** `horizontal`, `vertical`

### Input

- **Component:** `Input`
- **Types:** `InputProps`
- **Variants:** `default`, `filled`, `outline`
- **Sizes:** `sm`, `md`, `lg`
- **States:** `success`, `error`, `warning`, `disabled`

### Label

- **Component:** `Label`
- **Types:** `LabelProps`
- **Features:** Required indicator, helper text

### Link

- **Component:** `Link`
- **Types:** `LinkProps`, `linkVariants`
- **Variants:** `primary`, `secondary`, `accent`, `outline`, `ghost`, `link`, `destructive`
- **Sizes:** `xs`, `sm`, `md`, `lg`, `xl`
- **Features:** Icon slots (leftIcon, rightIcon)

### ThemeSwitch

- **Component:** `ThemeSwitch`
- **Types:** `ThemeSwitchProps`
- **Features:** Theme toggle (day/night), multi-theme support

### Typography

- **Components:** `Text`, `Heading`
- **Types:** `TextProps`, `HeadingProps`
- **Variants:** `primary`, `secondary`, `accent`, `outline`, `ghost`, `link`, `destructive`
- **Sizes:** `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`

**Usage:**

```typescript
import { Button, Input, Card, Badge } from "@tenerife.music/ui";
```

---

## Theme System

### Theme Utilities

- `applyMode` - Function to apply theme mode (day/night)
- `ThemeProvider` - React context provider for theme management
- `useTheme` - Hook to access theme context

**Usage:**

```typescript
import { ThemeProvider, useTheme } from "@tenerife.music/ui";
// Or from theme entry point:
import { ThemeProvider } from "@tenerife.music/ui/theme";
```

---

## Layout Components

### Container

- **Component:** `Container`
- **Types:** `ContainerProps`
- **Features:** Max-width constraints, responsive padding

### Flex

- **Component:** `Flex`
- **Types:** `FlexProps`
- **Features:** Flexbox layout, gap, direction, align, justify

### Footer

- **Component:** `Footer`
- **Types:** `FooterProps`

### Grid

- **Component:** `Grid`
- **Types:** `GridProps`
- **Features:** Responsive grid, auto-fit/auto-fill, gap tokens

### ModeHero

- **Component:** `ModeHero`
- **Types:** `ModeHeroProps`
- **Features:** Hero section with gradient overlay

### Navbar

- **Component:** `Navbar`
- **Types:** `NavbarProps`
- **Features:** Sticky navigation, glass effect

### Section

- **Component:** `Section`
- **Types:** `SectionProps`
- **Features:** Responsive padding, background variants

### Stack

- **Component:** `Stack`
- **Types:** `StackProps`
- **Features:** Vertical/horizontal stacking, gap tokens

**Usage:**

```typescript
import { Container, Flex, Grid, Stack, Section } from "@tenerife.music/ui";
```

---

## Modal & Overlay Components

### Modal Components

- `Modal` - Main modal component
- `CustomDialog` - Customizable dialog
- `ConfirmDialog` - Confirmation dialog
- `ModalProvider` - Modal context provider

### Overlay Components

- `OverlayPortal` - Portal for overlays
- `Popover` - Popover component
- `Tooltip` - Tooltip component

**Types:** `ModalProps`, `PopoverProps`, `TooltipProps`

**Usage:**

```typescript
import { Modal, Tooltip, Popover } from "@tenerife.music/ui";
```

---

## Menu Components

### DropdownMenu

- **Component:** `DropdownMenu`
- **Types:** `DropdownMenuProps`
- **Features:** Keyboard navigation, ARIA support

### NavigationMenu

- **Component:** `NavigationMenu`
- **Types:** `NavigationMenuProps`

### Tabs

- **Component:** `Tabs`
- **Types:** `TabsProps`
- **Features:** Accessible tabs, keyboard navigation

**Usage:**

```typescript
import { DropdownMenu, NavigationMenu, Tabs } from "@tenerife.music/ui";
```

---

## Filter Components

### DateRangePicker

- **Component:** `DateRangePicker`
- **Types:** `DateRangePickerProps`, `DateRange`
- **Features:** Date range selection, i18n support

### FilterBar

- **Component:** `FilterBar`
- **Types:** `FilterBarProps`
- **Features:** Multi-filter interface, active filters display

### FilterSelect

- **Component:** `FilterSelect`
- **Types:** `FilterSelectProps`
- **Features:** Searchable select, FilterOption support

### PriceRangeSlider

- **Component:** `PriceRangeSlider`
- **Types:** `PriceRangeSliderProps`, `PriceRange`
- **Features:** Range slider, min/max values

### SearchFilters

- **Component:** `SearchFilters`
- **Types:** `SearchFiltersProps`
- **Features:** Combined search and filters

### SearchInput

- **Component:** `SearchInput`
- **Types:** `SearchInputProps`
- **Features:** Search input with clear button

**Usage:**

```typescript
import { FilterBar, FilterSelect, DateRangePicker, PriceRangeSlider } from "@tenerife.music/ui";
import type { FilterOption, FilterState } from "@tenerife.music/ui";
```

---

## Form Components

### FormInput

- **Component:** `FormInput`
- **Types:** `FormInputProps`
- **Features:** Floating label, validation states, helper text

### FormSelect

- **Component:** `FormSelect`
- **Types:** `FormSelectProps`
- **Features:** Form-integrated select

### FormTextarea

- **Component:** `FormTextarea`
- **Types:** `FormTextareaProps`
- **Features:** Auto-resizing, validation states

**Usage:**

```typescript
import { FormInput, FormSelect, FormTextarea } from "@tenerife.music/ui";
```

---

## Feedback Components

### Alert

- **Component:** `Alert`
- **Types:** `AlertProps`
- **Variants:** `primary`, `secondary`, `accent`, `outline`, `ghost`, `link`, `destructive`

### Progress

- **Component:** `Progress`
- **Types:** `ProgressProps`
- **Features:** Progress bar, percentage display

### Skeleton

- **Component:** `Skeleton`
- **Types:** `SkeletonProps`
- **Features:** Loading skeleton, shimmer animation

**Usage:**

```typescript
import { Alert, Progress, Skeleton } from "@tenerife.music/ui";
```

---

## Toast Components

### Toast

- **Component:** `Toast`
- **Types:** `ToastProps`
- **Variants:** `primary`, `secondary`, `accent`, `outline`, `ghost`, `link`, `destructive`

### ToastProvider

- **Component:** `ToastProvider`
- **Types:** `ToastProviderProps`
- **Features:** Toast context, toast management

**Usage:**

```typescript
import { Toast, ToastProvider } from "@tenerife.music/ui";
```

---

## Navigation Components

### Breadcrumbs

- **Component:** `Breadcrumbs`
- **Types:** `BreadcrumbsProps`
- **Features:** Breadcrumb navigation, separator customization

### Pagination

- **Component:** `Pagination`
- **Types:** `PaginationProps`
- **Features:** Page navigation, page size selection

**Usage:**

```typescript
import { Breadcrumbs, Pagination } from "@tenerife.music/ui";
```

---

## Data Display Components

### List

- **Component:** `List`
- **Types:** `ListProps`
- **Features:** Ordered/unordered lists, custom markers

### Table

- **Component:** `Table`
- **Types:** `TableProps`
- **Features:** Sortable columns, responsive design

### Timeline

- **Component:** `Timeline`
- **Types:** `TimelineProps`
- **Features:** Vertical timeline, event display

**Usage:**

```typescript
import { List, Table, Timeline } from "@tenerife.music/ui";
```

---

## Card Components

### EventCard

- **Component:** `EventCard`
- **Types:** `EventCardProps`
- **Features:** Event display, featured variant, metadata icons

### VenueCard

- **Component:** `VenueCard`
- **Types:** `VenueCardProps`
- **Features:** Venue display, rating, capacity

**Usage:**

```typescript
import { EventCard, VenueCard } from "@tenerife.music/ui";
```

---

## Section Components

### ArticlesSection

- **Component:** `ArticlesSection`
- **Types:** `ArticlesSectionProps`
- **Features:** Article grid, pagination

### CTASection

- **Component:** `CTASection`
- **Types:** `CTASectionProps`
- **Features:** Call-to-action section, button groups

### FeatureSection

- **Component:** `FeatureSection`
- **Types:** `FeatureSectionProps`
- **Features:** Feature grid, icon support

### HeroSection

- **Component:** `HeroSection`
- **Types:** `HeroSectionProps`
- **Features:** Hero section, full-width/split variants, fluid typography

### TrendingSection

- **Component:** `TrendingSection`
- **Types:** `TrendingSectionProps`
- **Features:** Trending items display

**Usage:**

```typescript
import { HeroSection, FeatureSection, CTASection } from "@tenerife.music/ui";
```

---

## Skeleton Components

### EventCardSkeleton

- **Component:** `EventCardSkeleton`
- **Types:** `EventCardSkeletonProps`
- **Features:** Event card loading skeleton

### VenueCardSkeleton

- **Component:** `VenueCardSkeleton`
- **Types:** `VenueCardSkeletonProps`
- **Features:** Venue card loading skeleton

**Usage:**

```typescript
import { EventCardSkeleton, VenueCardSkeleton } from "@tenerife.music/ui";
```

---

## Search Components

### SearchBar

- **Component:** `SearchBar`
- **Types:** `SearchBarProps`
- **Features:** Glass-morphism effect, pill shape, keyboard shortcut (Cmd+K)

**Usage:**

```typescript
import { SearchBar } from "@tenerife.music/ui";
```

---

## Image Components

### Image

- **Component:** `Image`
- **Types:** `ImageProps`
- **Features:** Optimized image loading, lazy loading, aspect ratio

**Usage:**

```typescript
import { Image } from "@tenerife.music/ui";
```

---

## Icon Components

### TrendingIcon

- **Component:** `TrendingIcon`
- **Types:** `TrendingIconProps`

**Usage:**

```typescript
import { TrendingIcon } from "@tenerife.music/ui";
```

---

## Control Components

### LanguageSelector

- **Component:** `LanguageSelector`
- **Types:** `LanguageSelectorProps`
- **Features:** Language selection dropdown

**Usage:**

```typescript
import { LanguageSelector } from "@tenerife.music/ui";
```

---

## Auth Components

### LoginForm

- **Component:** `LoginForm`
- **Types:** `LoginFormProps`
- **Features:** Login form with validation

### ProfileCard

- **Component:** `ProfileCard`
- **Types:** `ProfileCardProps`
- **Features:** User profile display

### RegisterForm

- **Component:** `RegisterForm`
- **Types:** `RegisterFormProps`
- **Features:** Registration form with validation

**Usage:**

```typescript
import { LoginForm, RegisterForm, ProfileCard } from "@tenerife.music/ui";
```

---

## Admin Components

### Dashboard

- **Component:** `Dashboard`
- **Types:** `DashboardProps`
- **Features:** Admin dashboard layout

### UserManagement

- **Component:** `UserManagement`
- **Types:** `UserManagementProps`
- **Features:** User management interface

**Usage:**

```typescript
import { Dashboard, UserManagement } from "@tenerife.music/ui";
```

---

## Hooks

### useModal

- **Hook:** `useModal`
- **Types:** `UseModalReturn`
- **Features:** Modal state management, open/close handlers

**Usage:**

```typescript
import { useModal } from "@tenerife.music/ui";
```

---

## Utilities

### Utils

- **Functions:** `cn` (className merge), `clsx`, `tailwind-merge`
- **Features:** Utility functions for class name handling

**Usage:**

```typescript
import { cn } from "@tenerife.music/ui";
```

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
import { colors, spacing } from "@tenerife.music/ui/tokens";

// ❌ Avoid - Imports entire library
import { colors, spacing } from "@tenerife.music/ui";
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

### Removed Exports (v0.0.0)

The following duplicate exports have been removed:

- `EventCardSkeletonUI` - Use `EventCardSkeleton` instead
- `VenueCardSkeletonUI` - Use `VenueCardSkeleton` instead

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
- `VenueCard` - Will be refactored in D2 (Domain Decoupling)
- `ArticlesSection` - May be refactored in D2
- `TrendingSection` - May be refactored in D2

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
import { colors, spacing } from "@tenerife.music/ui/tokens";

const styles = {
  backgroundColor: `var(${colors.primary[500]})`,
  padding: `var(${spacing.md})`,
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

### Using Filter Types

```typescript
import { FilterBar } from '@tenerife.music/ui';
import type { FilterOption, FilterState } from '@tenerife.music/ui';

const categories: FilterOption[] = [
  { value: 'music', label: 'Music', count: 42 },
  { value: 'art', label: 'Art', count: 15 },
];

function FilterComponent() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    tags: [],
    dateRange: { start: null, end: null },
    priceRange: { min: null, max: null },
    sortBy: 'date',
    sortOrder: 'desc',
  });

  return <FilterBar categories={categories} onFiltersChange={setFilters} />;
}
```

---

## Support

For issues, questions, or contributions, please visit:

- **Repository:** https://github.com/Tureckiy-zart/tenerife-ui
- **Issues:** https://github.com/Tureckiy-zart/tenerife-ui/issues

---

**Last Updated:** 2025-11-25  
**API Version:** 0.0.0
