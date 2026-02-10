# Tenerife UI Library - Public API Reference

**Version:** 3.1.0 
**Last Updated:** 2026-02-09  
**Canonical Sync Date:** 2026-02-09

This document describes the public API surface of `@tenerife.music/ui`.

---

## Canonical Context

**Source of Truth:** `src/index.ts` (main entry point), `src/EXTENSIONS/next/index.ts` (Next.js entry point), `src/FOUNDATION/tokens/index.ts` (tokens), `src/FOUNDATION/theme/index.ts` (theme entry point).

---

## Entry Points

| Entry Point | Purpose | Example |
| --- | --- | --- |
| `.` | Main entry (components + tokens + utilities) | `import { Button } from "@tenerife.music/ui"` |
| `./styles` | CSS styles only | `import "@tenerife.music/ui/styles"` |
| `./preset` | Tailwind preset | `import preset from "@tenerife.music/ui/preset"` |
| `./tokens` | Design tokens only | `import { primaryColors } from "@tenerife.music/ui/tokens"` |
| `./theme` | Theme system only | `import { ThemeProvider } from "@tenerife.music/ui/theme"` |
| `./extensions/next` | Next.js adapters | `import { NextLinkAdapter } from "@tenerife.music/ui/extensions/next"` |

---

## Design Tokens

Tokens are exported from the main entry point and from `@tenerife.music/ui/tokens`.

### Color Tokens

- `primaryColors`, `accentColors`, `secondaryColors`, `baseColors`, `semanticColors`
- `surfaceColors`, `textColors`, `chartColors`
- `colorCSSVariables`, `cssVariableColorTokens`, `tailwindThemeColors`

**Type Exports:** `ColorTokens`, `ColorScale`, `BaseColorTokens`, `SemanticColors`, `SurfaceColors`, `TextColors`, `ChartColors`, `Mode`

### Typography Tokens

- `fontFamily`, `fontSize`, `fontSizeWithMd`, `fontWeight`, `lineHeight`, `letterSpacing`, `textStyles`
- `typographyCSSVariables`, `tailwindTypographyConfig`

**Type Exports:** `FontFamily`, `FontSize`, `FontWeight`, `LineHeight`, `LetterSpacing`, `TextStyle`, `CanonicalFontSize`, `CanonicalFontWeight`, `CanonicalLineHeight`, `CanonicalLetterSpacing`, `CanonicalTextColor`

### Spacing Tokens

- `spacing`, `semanticSpacing`, `layoutSpacing`
- `spacingCSSVariables`, `tailwindSpacingConfig`

**Type Exports:** `Spacing`, `SemanticSpacing`, `SectionSpacing`, `ContainerSpacing`, `GridSpacing`, `StackSpacing`, `ComponentSpacing`

### Shadow Tokens

- `elevationShadows`, `primaryColoredShadows`, `accentColoredShadows`, `glowEffects`, `focusRings`
- `shadowCSSVariables`, `tailwindShadowConfig`

**Type Exports:** `ElevationShadow`, `ColoredShadow`, `GlowEffect`, `FocusRing`

### Radius Tokens

- `borderRadius`, `componentRadius`, `radiusCSSVariables`, `tailwindRadiusConfig`

**Type Exports:** `BorderRadius`, `ComponentRadius`

### Motion Tokens

- `motionDurations`, `motionEasings`, `motionTransitions`, `motionTailwindConfig`
- `motionReducedMotion`, `motionTransitionProperty`, `motionFade`, `motionScale`, `motionSlide`, `motionCombined`
- `motionCSSVariables`

**Type Exports:** `MotionDuration`, `MotionEasing`, `MotionTransition`, `MotionSlideDirection`, `MotionCombinedType`

### Component Tokens

- `ALERT_TOKENS`, `BUTTON_TOKENS`, `CARD_TOKENS`, `CHECKBOX_TOKENS`, `DATA_TOKENS`
- `INPUT_TOKENS`, `MENU_TOKENS`, `MOTION_TOKENS`, `NAVIGATION_TOKENS`, `NOTIFICATION_TOKENS`
- `OVERLAY_TOKENS`, `PANEL_TOKENS`, `POPOVER_TOKENS`, `RADIO_TOKENS`, `SECTION_TOKENS`
- `SURFACE_TOKENS`, `SWITCH_TOKENS`, `TEXT_TOKENS`, `TOAST_TOKENS`, `TOOLTIP_TOKENS`, `ICON_TOKENS`

Additional component tokens exported from the main entry point:

- `ARTIST_TOKENS`, `DATA_LIST_TOKENS`, `DOMAIN_TOKENS`, `EMPTY_STATE_TOKENS`, `FILE_UPLOAD_TOKENS`
- `SIMPLETABLE_TOKENS`, `SPINNER_TOKENS`, `TABLE_TOKENS`, `TIMELINE_TOKENS`, `GRADIENT_TOKENS`

### Token Utilities

- `allCSSVariables`, `allCSSVariablesCSS`, `generateCSSVariablesCSS`, `tokenSystemSummary`
- `UI_COLORS`

---

## Theme System (`@tenerife.music/ui/theme`)

- `ThemeProvider`, `useTheme`
- `getInitialMode`, `getInitialTheme`, `getInitialBrand`
- `persistMode`, `persistTheme`, `persistBrand`
- `loadTheme`, `loadThemeSafe`, `preloadThemes`, `canLoadTheme`, `getAvailableThemeIds`
- `registerTheme`, `themeExists`, `getAllThemes`, `getThemeMetadata`, `getThemesByCategory`, `themeRegistry`
- `validateThemeSchema`, `isThemeSchema`, `createMinimalThemeSchema`

**Type Exports:** `ThemeProviderProps`, `ThemeSchema`, `ThemeMetadata`, `ThemeRegistryEntry`, `ThemeLoaderOptions`, `ThemeLoaderResult`, `ThemeValidationResult`, `Mode`

---

## Components (Public API)

All components listed below are exported from `src/index.ts` and are part of the public API.
Component-level types and variant constants are also exported; see `src/index.ts` for the full list.

### Core Primitives

- `Button`, `ButtonGroup`, `IconButton`
- `Text`, `Heading`, `HelperText`, `ErrorText`
- `Link`, `NavLink`, `Badge`, `Alert`, `Chip`
- `Input`, `Textarea`, `Select` (plus Select subcomponents), `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Label`, `Field`, `FormGroup`
- `Progress`, `Skeleton`, `Separator`, `AspectRatio`, `Spinner`
- `Image`
- `Icon` and icon registry exports
- `VisuallyHidden`, `FocusTrap`

### Layout & Containers

- Layout primitives: `Box`, `Container`, `Grid`, `Flex`, `Stack`, `Row`, `Column`, `Inline`, `Inset`, `Spacer`, `Divider`, `Surface`, `Panel`
- Layout compositions: `AppHeader`, `HeaderComposition`, `Navbar`, `Footer`, `SidebarLayout`, `StickyBar`, `ModeHero`, `List`, `ListItem`, `LinkWithCustomVariant`
- Containers: `Card` (and `CardHeader`, `CardBody`, `CardFooter`), `Section`, `ContentShell`, `PageHeader`, `ContainerSurface` (alias for `Surface`), `SectionState`

### Overlays & Menus

- Overlays: `Modal` (and subcomponents), `Dialog` (and subcomponents), `Drawer` (and subcomponents), `Accordion` (and subcomponents)
- Modal utilities: `ModalContext`, `ModalProvider`, `useModalContext`, `withModal`
- Portals & backdrops: `Portal`, `Backdrop`
- Popovers & tooltips: `Popover` (and subcomponents), `Tooltip` (and subcomponents)
Tooltip Root is safe-by-default and wires a provider internally; use `TooltipProvider` only when you need a shared provider scope.
- Dropdowns: `Dropdown` (and subcomponents)
- Menus: `ContextMenu` (and subcomponents), `HoverCard` (and subcomponents)
- Combobox: `Combobox` (and subcomponents)

### Navigation

- `Tabs`
- `SegmentedControl`
- `Breadcrumbs`
- `Pagination`
- `Stepper`
- `Menu` (and subcomponents), `NavRoot`, `NavList`, `NavItem`, `NavText`, `NavSeparator`
- `SearchBar`

### Data Display

- `Table` (and subcomponents), `useTableContext`
- `DataList` (and subcomponents)
- `EmptyState` (and subcomponents)

### Notifications

- `Toast`, `ToastProvider`, `ToastViewport`, `Toaster`
- `useLocalToast`, `useGlobalToast`
- `NotificationCenter` (and subcomponents), `useNotificationCenter`, `useNotificationCenterContext`

### Media & Compositions

- `Avatar`, `AvatarGroup`
- `Carousel` (compound component)
- `HeroMedia`
- `OverlaySlot`
- `ResponsiveVisibility`
- `InverseTypography`
- `SurfaceElevation`
- `FileUpload`
- `LanguageSelector`
- `RangeSlider`, `Slider`

---

## Usage Notes

- **Badge / Chip inline by default:** `Badge` and `Chip` are `inline-flex` by default. If they appear full-width, it is caused by the parent layout (e.g., `CardHeader` uses `Stack` with `align="stretch"`). Use `Row` or set `align="start"` on the parent to keep badges sized to content.
- **Badge contract:** Badge is inline-level and must never be treated as a full-width block. See `docs/reference/components/BADGE.md`.
- **Carousel indicators centering:** `Carousel.Indicators` are centered by default when rendered as a sibling to `Carousel.Track` (or via the simple API). Avoid placing indicators inside a shrinking `Row` with Prev/Next; instead, render indicators as their own sibling to Track so the container spans the carousel width.
- **Carousel card-mode:** The current Carousel is a single-viewport slider (one slide visible at a time). Multi-card “rail” layouts are not supported by the current API and should be treated as a separate pattern.

### Image

- **Inline by default:** `Image` does not stretch to full width unless its parent or `fill` behavior defines it. Use layout primitives (`Row`, `Column`, `Container`, `Grid`) to control sizing.
- **Center / constrain:** Wrap in `Container` (set `maxWidth`) and/or use `Row` with `justify="center"` to center images without forcing full-width.
- **AspectRatio composition:** Use `<AspectRatio><Image ... fill /></AspectRatio>` for stable media sizing. Do NOT place text/content inside `AspectRatio`; place text outside using `Surface`, `Section`, or `Column`.
- **No invented Stack:** If you need vertical layout in examples, use `Column` or other existing layout primitives.

## Utilities

- `debounce`, `throttle`, `generateId`
- `formatDate`, `formatDateTime`, `formatTime`
- Responsive helpers: `getBaseValue`, `getDelayMs`, `getDurationMs`, `getRadiusCSSVar`
- Overlay focus utility: `useFocusLock`
- Motion gesture utility: `useSwipe`
- Animation resolver: `resolveComponentAnimations`

---

## Next.js Extension (`@tenerife.music/ui/extensions/next`)

- `NextLinkAdapter`

---

## Import Restrictions

**Deep imports are not supported.** Use only the public entry points listed above.

```ts
// ✅ Good
import { Button } from "@tenerife.music/ui";

// ❌ Bad
import { Button } from "@tenerife.music/ui/components/primitives/Button";
```

---

## Support

Repository: `https://github.com/Tureckiy-zart/TUI`  
Issues: `https://github.com/Tureckiy-zart/TUI/issues`
