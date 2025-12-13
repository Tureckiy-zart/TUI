# TUI Extension Layer - Canonical State

**Date:** 2025-12-13  
**Status:** CANONICAL - SINGLE SOURCE OF TRUTH  
**Authority:** This document overrides all other sources including file existence, Storybook stories, historical usage, and documentation.

---

## Authority & Scope

This document is the **single source of truth** for what UI components are allowed, restricted, or locked in the `@tenerife.music/ui` Extension Layer.

### Authority Rules

1. **This document overrides:**
   - File existence in the repository
   - Storybook story files
   - Historical usage patterns
   - Other documentation
   - Package.json exports (if inconsistent)

2. **If a component is not listed in this document:**
   - It is **NOT ALLOWED** for use
   - It must **NOT** be imported
   - It must **NOT** be referenced in code

3. **File existence ≠ permission to use:**
   - A component file may exist in the repository
   - If it is not listed in the ALLOWED sections, it is **RESTRICTED**
   - If it is listed in RESTRICTED, it is **FORBIDDEN**

4. **Export status is necessary but NOT sufficient:**
   - Export via `src/index.ts` is a prerequisite but does NOT grant permission
   - Permission is granted ONLY by explicit listing in this document's ALLOWED sections
   - Components exported but not listed in ALLOWED sections are RESTRICTED
   - Foundation components are LOCKED regardless of export status

### Scope

This document defines the canonical state of:
- **Foundation Layer (LOCKED)**: Immutable core components
- **Extension Layer (ALLOWED)**: Components available for use
- **Extension Compositions**: Higher-level component compositions
- **Restricted Components**: Components that exist but must not be used

---

## Foundation Layer (LOCKED)

The following components are **LOCKED** and **IMMUTABLE**. They form the foundation of the UI system and must not be modified, extended, or replaced.

### Locked Components

1. **Modal** - `src/components/modal/Modal.tsx`
   - **Status:** LOCKED
   - **Rule:** DO NOT modify, extend, or create alternatives
   - **Exports:** `Modal`, `ModalClose`, `ModalContent`, `ModalDescription`, `ModalFooter`, `ModalHeader`, `ModalOverlay`, `ModalRoot`, `ModalTitle`, `ModalTrigger`

2. **Tabs** - `src/components/navigation/tabs/Tabs.tsx`
   - **Status:** LOCKED
   - **Rule:** DO NOT modify, extend, or create alternatives
   - **Exports:** `Tabs`
   - **Types:** `TabsContentProps`, `TabsListProps`, `TabsRootProps`, `TabsTriggerProps`

3. **Select** - `src/components/select/Select.tsx`
   - **Status:** LOCKED
   - **Rule:** DO NOT modify, extend, or create alternatives
   - **Exports:** `Select`, `SelectContent`, `SelectGroup`, `SelectIcon`, `SelectItem`, `SelectItemIndicator`, `SelectItemText`, `SelectLabel`, `SelectRoot`, `SelectSeparator`, `SelectTrigger`, `SelectValue`, `SelectViewport`

4. **ContextMenu** - `src/components/context-menu/ContextMenu.tsx`
   - **Status:** LOCKED
   - **Rule:** DO NOT modify, extend, or create alternatives
   - **Exports:** `ContextMenu`, `ContextMenuCheckboxItem`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuRoot`, `ContextMenuSeparator`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuTrigger`

5. **Toast** - `src/components/overlays/Toast.tsx`
   - **Status:** LOCKED
   - **Rule:** DO NOT modify, extend, or create alternatives
   - **Exports:** `Toast`, `ToastAction`, `ToastClose`, `ToastDescription`, `ToastRoot`, `ToastTitle`, `toastVariants`
   - **Provider:** `ToastProvider`, `ToastViewport`, `useToast`

### Foundation Layer Rules

- **DO NOT** modify locked components
- **DO NOT** create alternatives to locked components
- **DO NOT** extend locked components beyond their documented API
- **DO NOT** import locked components from non-canonical paths
- **DO NOT** use internal implementation details of locked components

---

## Extension Layer - Canonical Components (ALLOWED)

The following components are **ALLOWED** for use. They are exported via `src/index.ts` and form the Extension Layer.

### Visual Components

1. **Button** - `src/components/ui/button.tsx`
   - Exports: `Button`, `ButtonProps`, `buttonVariants`

2. **Alert** - `src/components/ui/alert.tsx`
   - Exports: `Alert`, `AlertProps`, `alertVariants`

3. **Icon** - `src/components/icon/Icon.tsx`
   - Exports: `Icon`, `IconProps`, `iconVariants`

4. **Icon Components** - `src/icons/`
   - Exports: `IconArrowRight`, `IconCalendar`, `IconCheck`, `IconChevronDown`, `IconChevronRight`, `IconClose`, `IconError`, `IconInfo`, `IconLocation`, `IconMenu`, `IconSearch`, `IconSuccess`, `IconWarning`
   - Registry: `ICONS_MAP`

### Typography Components

5. **Text** - `src/components/ui/text.tsx`
   - Exports: `Text`, `TextProps`, `TextSize`, `TextWeight`, `textVariants`

6. **Body** - `src/components/ui/body.tsx`
   - Exports: `Body`, `BodyProps`, `bodyVariants`

7. **Caption** - `src/components/ui/caption.tsx`
   - Exports: `Caption`, `CaptionProps`, `captionVariants`

8. **Code** - `src/components/ui/code.tsx`
   - Exports: `Code`, `CodeProps`, `codeVariants`

9. **Display** - `src/components/ui/display.tsx`
   - Exports: `Display`, `DisplayProps`, `displayVariants`

10. **Heading** - `src/components/ui/heading.tsx`
    - Exports: `Heading`, `HeadingProps`, `headingVariants`

11. **Lead** - `src/components/ui/lead.tsx`
    - Exports: `Lead`, `LeadProps`, `leadVariants`

12. **Label** - `src/components/ui/label.tsx`
    - Exports: `Label`, `LabelProps`, `labelVariants`

### Form Components

13. **Checkbox** - `src/components/checkbox/Checkbox.tsx`
    - Exports: `Checkbox`, `CheckboxProps`, `checkboxVariants`

14. **Input** - `src/components/input/Input.tsx`
    - Exports: `Input`, `InputProps`, `inputVariants`

15. **Radio** - `src/components/radio/Radio.tsx`
    - Exports: `Radio`, `RadioProps`, `radioVariants`, `RadioGroup`, `RadioGroupProps`

16. **Textarea** - `src/components/textarea/Textarea.tsx`
    - Exports: `Textarea`, `TextareaProps`, `textareaVariants`

17. **Switch** - `src/components/switch/Switch.tsx`
    - Exports: `Switch`, `SwitchProps`, `switchHandleStateVariants`, `switchHandleVariants`, `switchTrackVariants`

18. **Field** - `src/components/ui/field.tsx`
    - Exports: `Field`, `FieldProps`, `FieldControlProps`, `FieldDescriptionProps`, `FieldErrorProps`, `FieldLabelProps`

### Layout Components

19. **Box** - `src/components/layout/Box.tsx`
    - Exports: `Box`, `BoxProps`

20. **Column** - `src/components/layout/Column.tsx`
    - Exports: `Column`, `ColumnProps`

21. **Container** - `src/components/layout/Container.tsx`
    - Exports: `Container`, `ContainerProps`

22. **Flex** - `src/components/layout/Flex.tsx`
    - Exports: `Flex`, `FlexProps`

23. **Grid** - `src/components/layout/Grid.tsx`
    - Exports: `Grid`, `GridProps`

24. **Row** - `src/components/layout/Row.tsx`
    - Exports: `Row`, `RowProps`

25. **Stack** - `src/components/layout/Stack.tsx`
    - Exports: `Stack`, `StackProps`

26. **Surface** - `src/components/layout/Surface.tsx`
    - Exports: `Surface`, `SurfaceProps`, `surfaceVariants`

### Container Components

27. **Card** - `src/components/containers/Card.tsx`
    - Exports: `Card`, `CardBody`, `CardFooter`, `CardHeader`, `CardProps`

28. **Section** - `src/components/containers/Section.tsx`
    - Exports: `Section`, `SectionProps`

29. **ContainerSurface** - `src/components/containers/Surface.tsx`
    - Exports: `Surface as ContainerSurface`, `SurfaceProps as ContainerSurfaceProps`, `surfaceVariants as containerSurfaceVariants`

### Overlay Components

30. **Portal** - `src/components/overlays/Portal.tsx`
    - Exports: `Portal`, `PortalProps`

31. **Backdrop** - `src/components/overlays/Backdrop.tsx`
    - Exports: `Backdrop`, `BackdropProps`

32. **Dialog** - `src/components/overlays/Dialog.tsx`
    - **Status:** ALLOWED
    - **Type:** Extension Composition over Modal
    - **Rule:** Dialog MUST internally use Modal (Foundation Layer). Reimplementation of modal behavior is FORBIDDEN.
    - Exports: `Dialog`, `DialogBody`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogRoot`, `DialogTitle`
    - Types: `DialogBodyProps`, `DialogDescriptionProps`, `DialogFooterProps`, `DialogHeaderProps`, `DialogProps`, `DialogTitleProps`

### Menu Components

33. **Popover** - `src/components/menus/popover/`
    - Exports: `PopoverArrow`, `PopoverContent`, `PopoverRoot`, `PopoverTrigger`
    - Types: `PopoverArrowProps`, `PopoverContentProps`, `PopoverRootProps`, `PopoverTriggerProps`
    - Variants: `popoverContentVariants`

34. **DropdownMenu** - `src/components/menus/dropdown/`
    - Exports: `DropdownMenuCheckItem`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuRoot`, `DropdownMenuSeparator`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuTrigger`
    - Types: `DropdownMenuCheckItemProps`, `DropdownMenuContentProps`, `DropdownMenuGroupProps`, `DropdownMenuItemProps`, `DropdownMenuLabelProps`, `DropdownMenuRadioGroupProps`, `DropdownMenuRadioItemProps`, `DropdownMenuRootProps`, `DropdownMenuSeparatorProps`, `DropdownMenuSubContentProps`, `DropdownMenuSubProps`, `DropdownMenuSubTriggerProps`, `DropdownMenuTriggerProps`

35. **HoverCard** - `src/components/menus/hover-card/`
    - Exports: `HoverCardContent`, `HoverCardRoot`, `HoverCardTrigger`
    - Types: `HoverCardContentProps`, `HoverCardRootProps`, `HoverCardTriggerProps`

### Data Display Components

36. **Skeleton** - `src/components/data/skeleton/Skeleton.tsx`
    - Exports: `Skeleton`, `SkeletonProps`, `skeletonVariants`

37. **EmptyState** - `src/components/data/empty-state/EmptyState.tsx`
    - Exports: `EmptyState`, `EmptyStateAction`, `EmptyStateDescription`, `EmptyStateIcon`, `EmptyStateTitle`
    - Types: `EmptyStateActionProps`, `EmptyStateDescriptionProps`, `EmptyStateIconProps`, `EmptyStateProps`, `EmptyStateTitleProps`

38. **DataList** - `src/components/data/data-list/DataList.tsx`
    - Exports: `DataList`, `DataListItem`, `DataListLabel`, `DataListRoot`, `DataListValue`
    - Types: `DataListItemProps`, `DataListLabelProps`, `DataListRootProps`, `DataListValueProps`

39. **Table** - `src/components/data/table/Table.tsx`
    - Exports: `Table`, `TableBody`, `TableCell`, `TableEmpty`, `TableExpandableContent`, `TableHead`, `TableHeader`, `TableLoadingState`, `TableRoot`, `TableRow`, `TableSortIcon`, `useTableContext`
    - Types: `SortDirection`, `SortState`, `TableBodyProps`, `TableCellProps`, `TableColumn`, `TableContextValue`, `TableEmptyProps`, `TableExpandableContentProps`, `TableHeadProps`, `TableHeaderProps`, `TableLoadingStateProps`, `TableRootProps`, `TableRowProps`, `TableSortIconProps`

### Navigation Components

40. **SegmentedControl** - `src/components/navigation/segmented-control/SegmentedControl.tsx`
    - Exports: `SegmentedControl`
    - Types: `SegmentedControlItemProps`, `SegmentedControlRootProps`
    - Variants: `segmentedControlItemVariants`, `segmentedControlRootVariants`

41. **Breadcrumbs** - `src/components/navigation/breadcrumbs/Breadcrumbs.tsx`
    - Exports: `Breadcrumbs`
    - Types: `BreadcrumbItem`, `BreadcrumbsItemProps`, `BreadcrumbsRootProps`, `BreadcrumbsSeparatorProps`

42. **Pagination** - `src/components/navigation/pagination/Pagination.tsx`
    - Exports: `Pagination`
    - Types: `PaginationEllipsisProps`, `PaginationItemProps`, `PaginationNextProps`, `PaginationPrevProps`, `PaginationRootProps`

43. **Stepper** - `src/components/navigation/stepper/Stepper.tsx`
    - Exports: `Stepper`
    - Types: `StepperContentProps`, `StepperIndicatorProps`, `StepperItemProps`, `StepperLabelProps`, `StepperRootProps`, `StepperStep`

### Data Display Primitives

44. **CardBase** - `src/components/cards/CardBase/CardBase.tsx`
    - **Status:** ALLOWED
    - **Type:** Canonical Primitive
    - **Rule:** This is the ONLY canonical card primitive. Use CardBase to build custom card components. Product/domain-specific cards (EventCard, VenueCard, etc.) are RESTRICTED.
    - Exports: `CardBase`, `CardBaseContentWrapper`, `CardBaseFooterWrapper`, `CardBaseImageWrapper`
    - Types: `CardBaseContentWrapperProps`, `CardBaseFooterWrapperProps`, `CardBaseImageWrapperProps`, `CardBaseProps`, `CardBaseSize`, `CardBaseVariant`

---

## Extension Compositions (ALLOWED)

Higher-level component compositions that combine multiple Extension Layer components. These are **ALLOWED** for use.

### Notification System

1. **NotificationCenter** - `src/components/notifications/NotificationCenter.tsx`
   - **Status:** ALLOWED
   - **Type:** Extension Composition
   - **Exports:** `NotificationCenter`, `NotificationCenterDismissAll`, `NotificationCenterGroupHeader`, `NotificationCenterItem`, `NotificationCenterList`, `NotificationCenterPanel`, `NotificationCenterProvider`, `NotificationCenterTrigger`
   - **Hooks:** `useNotificationCenter`, `useNotificationCenterContext`
   - **Types:** `GroupByFunction`, `NotificationChannel`, `NotificationContextType`, `NotificationData`, `NotificationOptions`, `NotificationVariant`, `NotificationCenterDismissAllProps`, `NotificationCenterGroupHeaderProps`, `NotificationCenterItemProps`, `NotificationCenterListProps`, `NotificationCenterPanelProps`, `NotificationCenterProviderProps`, `NotificationCenterTriggerProps`

**Note:** Dialog is also an Extension Composition (see Overlay Components section) but is listed there for organizational purposes.

---

## Existing but Restricted Components

The following components exist in the codebase but are **RESTRICTED** and **MUST NOT BE USED**. They are not exported via `src/index.ts` and are not part of the public API.

### DO NOT USE - Layout Components

1. **Footer** - `src/components/layout/Footer.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE

2. **Navbar** - `src/components/layout/Navbar.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE

3. **ModeHero** - `src/components/layout/ModeHero.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE

### DO NOT USE - UI Components (Non-Canonical Variants)

4. **Card** (shadcn variant) - `src/components/ui/card.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE - Use `Card` from `src/components/containers/Card.tsx` instead

5. **Tooltip** (shadcn variant) - `src/components/ui/tooltip.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE

6. **Toast** (shadcn variant) - `src/components/ui/toast.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE - Use `Toast` from `src/components/overlays/Toast.tsx` instead

7. **Toaster** - `src/components/ui/toaster.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE

### DO NOT USE - Primitives

8. **Button** (primitive) - `src/components/primitives/Button.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE - Use `Button` from `src/components/ui/button.tsx` instead

9. **Link** - `src/components/primitives/Link.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE

10. **Badge** - `src/components/primitives/Badge.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

11. **Divider** - `src/components/primitives/Divider.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

12. **Input** (primitive) - `src/components/primitives/Input.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Input` from `src/components/input/Input.tsx` instead

13. **Label** (primitive) - `src/components/primitives/Label.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Label` from `src/components/ui/label.tsx` instead

14. **Card** (primitive) - `src/components/primitives/Card.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Card` from `src/components/containers/Card.tsx` instead

15. **ThemeSwitch** - `src/components/primitives/ThemeSwitch.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Overlay Components (Non-Canonical Variants)

16. **Popover** (overlays variant) - `src/components/overlays/Popover.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Popover` from `src/components/menus/popover/` instead

17. **Tooltip** (overlays variant) - `src/components/overlays/Tooltip.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

18. **OverlayPortal** - `src/components/overlays/OverlayPortal.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Menu Components (Non-Canonical Variants)

19. **DropdownMenu** (menus variant) - `src/components/menus/DropdownMenu.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `DropdownMenu` from `src/components/menus/dropdown/` instead

20. **NavigationMenu** - `src/components/menus/NavigationMenu.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Dropdown Component

21. **Dropdown** - `src/components/dropdown/Dropdown.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Drawer Component

22. **Drawer** - `src/components/drawer/Drawer.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Section Components

23. **SectionBuilder** - `src/components/SectionBuilder.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

24. **HeroSection** - `src/components/sections/HeroSection.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

25. **CTASection** - `src/components/sections/CTASection.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

26. **TrendingSection** - `src/components/sections/TrendingSection.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

27. **FeatureSection** - `src/components/sections/FeatureSection.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

28. **ArticlesSection** - `src/components/sections/ArticlesSection.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Filter Components

29. **FilterBar** - `src/components/filters/FilterBar.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

30. **SearchInput** - `src/components/filters/SearchInput.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

31. **FilterSelect** - `src/components/filters/FilterSelect.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

32. **DateRangePicker** - `src/components/filters/DateRangePicker.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

33. **PriceRangeSlider** - `src/components/filters/PriceRangeSlider.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

34. **SearchFilters** - `src/components/filters/SearchFilters.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Search Components

35. **SearchBar** - `src/components/search/SearchBar.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Image Components

36. **Image** - `src/components/image/Image.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Auth Components

37. **LoginForm** - `src/components/auth/LoginForm.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

38. **RegisterForm** - `src/components/auth/RegisterForm.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

39. **ProfileCard** - `src/components/auth/ProfileCard.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Admin Components

40. **Dashboard** - `src/components/admin/Dashboard.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

41. **UserManagement** - `src/components/admin/UserManagement.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Feedback Components

42. **ConsentBanner** - `src/components/feedback/ConsentBanner.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

43. **Progress** - `src/components/feedback/Progress.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

44. **Skeleton** (feedback variant) - `src/components/feedback/Skeleton.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Skeleton` from `src/components/data/skeleton/Skeleton.tsx` instead

### DO NOT USE - Modal Components

45. **ConfirmDialog** - `src/components/modals/ConfirmDialog.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

46. **ModalProvider** - `src/components/modals/ModalProvider.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Control Components

47. **LanguageSelector** - `src/components/controls/LanguageSelector.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Skeleton Components

48. **EventCardSkeleton** - `src/components/skeletons/EventCardSkeleton.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

49. **VenueCardSkeleton** - `src/components/skeletons/VenueCardSkeleton.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Icon Components

50. **TrendingIcon** - `src/components/icons/TrendingIcon.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Motion Stories (No Component)

51. **Motion.stories.tsx** - `src/components/motion/Motion.stories.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - No corresponding component exists

52. **Gestures.stories.tsx** - `src/components/motion/Gestures.stories.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - No corresponding component exists

### DO NOT USE - Legacy Components

53. **Select** (legacy) - `src/components/select/legacy/select.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Select` from `src/components/select/Select.tsx` instead

54. **Textarea** (legacy) - `src/components/textarea/legacy/textarea.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Textarea` from `src/components/textarea/Textarea.tsx` instead

### DO NOT USE - Product / Domain Components

55. **EventCard** - `src/components/domain/EventCard/EventCard.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Product/domain-specific components are not canonical UI primitives
    - **Note:** Use `CardBase` for building custom card components

56. **ArtistCard** - `src/components/cards/ArtistCard/ArtistCard.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Product/domain-specific components are not canonical UI primitives
    - **Note:** Use `CardBase` for building custom card components

57. **CategoryCard** - `src/components/cards/CategoryCard/CategoryCard.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Product/domain-specific components are not canonical UI primitives
    - **Note:** Use `CardBase` for building custom card components

58. **PromoCard** - `src/components/cards/PromoCard/PromoCard.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Product/domain-specific components are not canonical UI primitives
    - **Note:** Use `CardBase` for building custom card components

59. **TicketCard** - `src/components/cards/TicketCard/TicketCard.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Product/domain-specific components are not canonical UI primitives
    - **Note:** Use `CardBase` for building custom card components

60. **VenueCard** - `src/components/cards/VenueCard/VenueCard.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Product/domain-specific components are not canonical UI primitives
    - **Note:** Use `CardBase` for building custom card components

---

## Explicit Rules

### Non-Negotiable Rules

1. **File existence ≠ permission to use**
   - A component file may exist in the repository
   - If it is not listed in ALLOWED sections, it is RESTRICTED
   - If it is listed in RESTRICTED, it is FORBIDDEN

2. **If not listed, it is not allowed**
   - Only components explicitly listed in ALLOWED sections may be used
   - Components not listed anywhere are FORBIDDEN
   - Assumptions about component availability are FORBIDDEN

3. **Foundation components are immutable**
   - Modal, Tabs, Select, ContextMenu, Toast are LOCKED
   - DO NOT modify, extend, or create alternatives
   - DO NOT import from non-canonical paths

4. **Export status is necessary but NOT sufficient**
   - Export via `src/index.ts` is a prerequisite but does NOT grant permission
   - Permission is granted ONLY by explicit listing in this document's ALLOWED sections
   - Components exported but not listed in ALLOWED sections are RESTRICTED
   - Foundation components are LOCKED regardless of export status

5. **No component duplication**
   - If multiple variants exist, only the exported variant is ALLOWED
   - Non-exported variants are RESTRICTED
   - Use canonical paths only

6. **No speculative usage**
   - DO NOT use components based on file existence
   - DO NOT use components based on Storybook stories
   - DO NOT use components based on historical usage
   - ONLY use components listed in ALLOWED sections

7. **Canonical paths only**
   - Import components from `@tenerife.music/ui` package exports
   - DO NOT import from internal file paths
   - DO NOT import from non-exported locations

8. **This document is law**
   - This document overrides all other sources
   - This document is the single source of truth
   - This document must be consulted before using any component

9. **Product/domain components are not canonical**
   - Product-specific components (EventCard, VenueCard, ArtistCard, etc.) are RESTRICTED
   - Use canonical primitives (CardBase) to build product-specific components
   - DO NOT import or use product/domain components from the UI library

10. **Composition components must use Foundation Layer**
    - Extension compositions (Dialog, NotificationCenter) MUST use Foundation Layer components internally
    - Reimplementation of Foundation Layer behavior is FORBIDDEN
    - Composition components are ALLOWED but must respect Foundation Layer immutability

---

## Verification

- [x] All listed components traceable to inventory document
- [x] No new components introduced
- [x] Clear separation between LOCKED / ALLOWED / RESTRICTED
- [x] All Foundation components marked as LOCKED
- [x] All Extension components marked as ALLOWED
- [x] All restricted components marked as DO NOT USE
- [x] Domain components removed from canonical sections
- [x] CardBase remains sole canonical card primitive
- [x] Dialog composition rule is explicit
- [x] Export status rule is non-authoritative
- [x] Explicit rules defined
- [x] No speculative language
- [x] No roadmap or future plans
- [x] Document is normative and declarative

---

## Document Status

**Status:** FINAL  
**Version:** 1.0  
**Last Updated:** 2025-12-13

This document is **FINAL**. Any changes to this canonical state require explicit architectural review and approval. This document serves as the definitive law for UI component usage in the Extension Layer.

---

**End of Canonical State Document**
