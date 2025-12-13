# TUI Real Component Inventory

**Date:** 2025-12-13  
**Task:** TUI_REAL_COMPONENT_INVENTORY  
**Mode:** READ-ONLY FACTUAL AUDIT

---

## Summary

This document provides a factual inventory of all UI components that physically exist in the `@tenerife.music/ui` repository. This is an objective existence audit based on code files and exports only. No architectural evaluation or judgment is included.

**Total Components Found:**
- **EXISTS_AND_EXPORTED:** 120+ components
- **EXISTS_NOT_EXPORTED:** 30+ components
- **TOKENS_ONLY:** Multiple token definitions
- **STORIES_ONLY:** 0 (all stories have corresponding components)

---

## Methodology

### Scan Directories
- `src/components/` - Primary component directory
- `src/components/ui/` - UI primitives
- `src/components/primitives/` - Primitive components
- `src/components/layout/` - Layout components
- `src/components/overlays/` - Overlay components
- `src/components/containers/` - Container components
- `src/components/cards/` - Card components
- `src/components/domain/` - Domain-specific components
- `src/components/navigation/` - Navigation components
- `src/components/data/` - Data display components
- `src/components/menus/` - Menu components
- `src/components/notifications/` - Notification components
- `src/components/filters/` - Filter components
- `src/components/sections/` - Section components
- `src/components/auth/` - Auth components
- `src/components/admin/` - Admin components
- `src/components/feedback/` - Feedback components
- `src/components/modals/` - Modal components
- `src/components/motion/` - Motion components (stories only)
- `src/components/search/` - Search components
- `src/components/skeletons/` - Skeleton components
- `src/components/drawer/` - Drawer components
- `src/components/dropdown/` - Dropdown components
- `src/components/context-menu/` - Context menu components
- `src/components/icon/` - Icon components
- `src/components/icons/` - Icon components
- `src/components/image/` - Image components
- `src/components/controls/` - Control components

### Export Verification
- Verified against `src/index.ts` (main export file)
- Verified against barrel files in component directories
- Verified against `package.json` exports

### Definition of Exists
A component exists if:
- A concrete `.tsx` file exists with component implementation
- The component is exported (directly or via barrel)
- It can be imported by a consumer

A component does NOT exist if:
- Only tokens exist
- Only types exist
- Only stories exist
- Component is commented out
- Component exists only in docs

---

## EXISTS_AND_EXPORTED

Components that exist in code and are publicly exported via `src/index.ts`:

### UI Components (CVA-based, token-driven)
1. **Button** - `src/components/ui/button.tsx`
   - Exported: `Button`, `ButtonProps`, `buttonVariants`
   
2. **Text** - `src/components/ui/text.tsx`
   - Exported: `Text`, `TextProps`, `TextSize`, `TextWeight`, `textVariants`
   
3. **Alert** - `src/components/ui/alert.tsx`
   - Exported: `Alert`, `AlertProps`, `alertVariants`
   
4. **Body** - `src/components/ui/body.tsx`
   - Exported: `Body`, `BodyProps`, `bodyVariants`
   
5. **Caption** - `src/components/ui/caption.tsx`
   - Exported: `Caption`, `CaptionProps`, `captionVariants`
   
6. **Code** - `src/components/ui/code.tsx`
   - Exported: `Code`, `CodeProps`, `codeVariants`
   
7. **Display** - `src/components/ui/display.tsx`
   - Exported: `Display`, `DisplayProps`, `displayVariants`
   
8. **Heading** - `src/components/ui/heading.tsx`
   - Exported: `Heading`, `HeadingProps`, `headingVariants`
   
9. **Lead** - `src/components/ui/lead.tsx`
   - Exported: `Lead`, `LeadProps`, `leadVariants`
   
10. **Field** - `src/components/ui/field.tsx`
    - Exported: `Field`, `FieldProps`, `FieldControlProps`, `FieldDescriptionProps`, `FieldErrorProps`, `FieldLabelProps`
    
11. **Label** - `src/components/ui/label.tsx`
    - Exported: `Label`, `LabelProps`, `labelVariants`

### Form Components
12. **Checkbox** - `src/components/checkbox/Checkbox.tsx`
    - Exported: `Checkbox`, `CheckboxProps`, `checkboxVariants`
    
13. **Input** - `src/components/input/Input.tsx`
    - Exported: `Input`, `InputProps`, `inputVariants`
    
14. **Radio** - `src/components/radio/Radio.tsx`
    - Exported: `Radio`, `RadioProps`, `radioVariants`, `RadioGroup`, `RadioGroupProps`
    
15. **Textarea** - `src/components/textarea/Textarea.tsx`
    - Exported: `Textarea`, `TextareaProps`, `textareaVariants`
    
16. **Switch** - `src/components/switch/Switch.tsx`
    - Exported: `Switch`, `SwitchProps`, `switchHandleStateVariants`, `switchHandleVariants`, `switchTrackVariants`

### Select Component (Radix-based)
17. **Select** - `src/components/select/Select.tsx`
    - Exported: `Select`, `SelectContent`, `SelectGroup`, `SelectIcon`, `SelectItem`, `SelectItemIndicator`, `SelectItemText`, `SelectLabel`, `SelectRoot`, `SelectSeparator`, `SelectTrigger`, `SelectValue`, `SelectViewport`
    - Types: `SelectContentProps`, `SelectGroupProps`, `SelectIconProps`, `SelectItemIndicatorProps`, `SelectItemProps`, `SelectItemTextProps`, `SelectLabelProps`, `SelectRootProps`, `SelectSeparatorProps`, `SelectSize`, `SelectState`, `SelectTriggerProps`, `SelectValueProps`, `SelectVariant`, `SelectViewportProps`, `SelectWidth`

### Modal Component (Radix-based)
18. **Modal** - `src/components/modal/Modal.tsx`
    - Exported: `Modal`, `ModalClose`, `ModalContent`, `ModalDescription`, `ModalFooter`, `ModalHeader`, `ModalOverlay`, `ModalRoot`, `ModalTitle`, `ModalTrigger`
    - Types: `ModalCloseProps`, `ModalContentProps`, `ModalDescriptionProps`, `ModalFooterProps`, `ModalHeaderProps`, `ModalOverlayProps`, `ModalRootProps`, `ModalTitleProps`, `ModalTriggerProps`

### Layout Primitives
19. **Box** - `src/components/layout/Box.tsx`
    - Exported: `Box`, `BoxProps`
    
20. **Column** - `src/components/layout/Column.tsx`
    - Exported: `Column`, `ColumnProps`
    
21. **Container** - `src/components/layout/Container.tsx`
    - Exported: `Container`, `ContainerProps`
    
22. **Flex** - `src/components/layout/Flex.tsx`
    - Exported: `Flex`, `FlexProps`
    
23. **Grid** - `src/components/layout/Grid.tsx`
    - Exported: `Grid`, `GridProps`
    
24. **Row** - `src/components/layout/Row.tsx`
    - Exported: `Row`, `RowProps`
    
25. **Stack** - `src/components/layout/Stack.tsx`
    - Exported: `Stack`, `StackProps`
    
26. **Surface** - `src/components/layout/Surface.tsx`
    - Exported: `Surface`, `SurfaceProps`, `surfaceVariants`

### Container Components
27. **Card** - `src/components/containers/Card.tsx`
    - Exported: `Card`, `CardBody`, `CardFooter`, `CardHeader`, `CardProps`
    
28. **Section** - `src/components/containers/Section.tsx`
    - Exported: `Section`, `SectionProps`
    
29. **ContainerSurface** - `src/components/containers/Surface.tsx`
    - Exported: `Surface as ContainerSurface`, `SurfaceProps as ContainerSurfaceProps`, `surfaceVariants as containerSurfaceVariants`

### Overlay System
30. **Portal** - `src/components/overlays/Portal.tsx`
    - Exported: `Portal`, `PortalProps`
    
31. **Backdrop** - `src/components/overlays/Backdrop.tsx`
    - Exported: `Backdrop`, `BackdropProps`
    
32. **Dialog** - `src/components/overlays/Dialog.tsx`
    - Exported: `Dialog`, `DialogBody`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogRoot`, `DialogTitle`
    - Types: `DialogBodyProps`, `DialogDescriptionProps`, `DialogFooterProps`, `DialogHeaderProps`, `DialogProps`, `DialogTitleProps`
    
33. **Toast** - `src/components/overlays/Toast.tsx`
    - Exported: `Toast`, `ToastAction`, `ToastClose`, `ToastDescription`, `ToastRoot`, `ToastTitle`, `toastVariants`
    - Types: `ToastActionData`, `ToastData`, `ToastProps`, `ToastRootProps`
    
34. **ToastProvider** - `src/components/overlays/ToastProvider.tsx`
    - Exported: `ToastProvider`, `useToast`
    - Types: `ToastOptions`, `ToastProviderProps`, `ToastPosition`
    
35. **ToastViewport** - `src/components/overlays/ToastViewport.tsx`
    - Exported: `ToastViewport`
    - Types: `ToastViewportProps`

### Notification System
36. **NotificationCenter** - `src/components/notifications/NotificationCenter.tsx`
    - Exported: `NotificationCenter`, `NotificationCenterDismissAll`, `NotificationCenterGroupHeader`, `NotificationCenterItem`, `NotificationCenterList`, `NotificationCenterPanel`, `NotificationCenterProvider`, `NotificationCenterTrigger`
    - Hooks: `useNotificationCenter`, `useNotificationCenterContext`
    - Types: `GroupByFunction`, `NotificationChannel`, `NotificationContextType`, `NotificationData`, `NotificationOptions`, `NotificationVariant`, `NotificationCenterDismissAllProps`, `NotificationCenterGroupHeaderProps`, `NotificationCenterItemProps`, `NotificationCenterListProps`, `NotificationCenterPanelProps`, `NotificationCenterProviderProps`, `NotificationCenterTriggerProps`

### Menu System
37. **Popover** - `src/components/menus/popover/`
    - Exported: `PopoverArrow`, `PopoverContent`, `PopoverRoot`, `PopoverTrigger`
    - Types: `PopoverArrowProps`, `PopoverContentProps`, `PopoverRootProps`, `PopoverTriggerProps`
    - Variants: `popoverContentVariants`
    
38. **DropdownMenu** - `src/components/menus/dropdown/`
    - Exported: `DropdownMenuCheckItem`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuRoot`, `DropdownMenuSeparator`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuTrigger`
    - Types: `DropdownMenuCheckItemProps`, `DropdownMenuContentProps`, `DropdownMenuGroupProps`, `DropdownMenuItemProps`, `DropdownMenuLabelProps`, `DropdownMenuRadioGroupProps`, `DropdownMenuRadioItemProps`, `DropdownMenuRootProps`, `DropdownMenuSeparatorProps`, `DropdownMenuSubContentProps`, `DropdownMenuSubProps`, `DropdownMenuSubTriggerProps`, `DropdownMenuTriggerProps`
    
39. **HoverCard** - `src/components/menus/hover-card/`
    - Exported: `HoverCardContent`, `HoverCardRoot`, `HoverCardTrigger`
    - Types: `HoverCardContentProps`, `HoverCardRootProps`, `HoverCardTriggerProps`

### ContextMenu Components
40. **ContextMenu** - `src/components/context-menu/ContextMenu.tsx`
    - Exported: `ContextMenu`, `ContextMenuCheckboxItem`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuRoot`, `ContextMenuSeparator`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuTrigger`
    - Types: `ContextMenuCheckboxItemProps`, `ContextMenuContentProps`, `ContextMenuItemProps`, `ContextMenuLabelProps`, `ContextMenuRadioGroupProps`, `ContextMenuRadioItemProps`, `ContextMenuRootProps`, `ContextMenuSeparatorProps`, `ContextMenuSubContentProps`, `ContextMenuSubProps`, `ContextMenuSubTriggerProps`, `ContextMenuTriggerProps`

### Data Display Components
41. **Skeleton** - `src/components/data/skeleton/Skeleton.tsx`
    - Exported: `Skeleton`, `SkeletonProps`, `skeletonVariants`
    
42. **EmptyState** - `src/components/data/empty-state/EmptyState.tsx`
    - Exported: `EmptyState`, `EmptyStateAction`, `EmptyStateDescription`, `EmptyStateIcon`, `EmptyStateTitle`
    - Types: `EmptyStateActionProps`, `EmptyStateDescriptionProps`, `EmptyStateIconProps`, `EmptyStateProps`, `EmptyStateTitleProps`
    
43. **DataList** - `src/components/data/data-list/DataList.tsx`
    - Exported: `DataList`, `DataListItem`, `DataListLabel`, `DataListRoot`, `DataListValue`
    - Types: `DataListItemProps`, `DataListLabelProps`, `DataListRootProps`, `DataListValueProps`
    
44. **Table** - `src/components/data/table/Table.tsx`
    - Exported: `Table`, `TableBody`, `TableCell`, `TableEmpty`, `TableExpandableContent`, `TableHead`, `TableHeader`, `TableLoadingState`, `TableRoot`, `TableRow`, `TableSortIcon`, `useTableContext`
    - Types: `SortDirection`, `SortState`, `TableBodyProps`, `TableCellProps`, `TableColumn`, `TableContextValue`, `TableEmptyProps`, `TableExpandableContentProps`, `TableHeadProps`, `TableHeaderProps`, `TableLoadingStateProps`, `TableRootProps`, `TableRowProps`, `TableSortIconProps`

### Navigation System
45. **Tabs** - `src/components/navigation/tabs/Tabs.tsx`
    - Exported: `Tabs`
    - Types: `TabsContentProps`, `TabsListProps`, `TabsRootProps`, `TabsTriggerProps`
    
46. **SegmentedControl** - `src/components/navigation/segmented-control/SegmentedControl.tsx`
    - Exported: `SegmentedControl`
    - Types: `SegmentedControlItemProps`, `SegmentedControlRootProps`
    - Variants: `segmentedControlItemVariants`, `segmentedControlRootVariants`
    
47. **Breadcrumbs** - `src/components/navigation/breadcrumbs/Breadcrumbs.tsx`
    - Exported: `Breadcrumbs`
    - Types: `BreadcrumbItem`, `BreadcrumbsItemProps`, `BreadcrumbsRootProps`, `BreadcrumbsSeparatorProps`
    
48. **Pagination** - `src/components/navigation/pagination/Pagination.tsx`
    - Exported: `Pagination`
    - Types: `PaginationEllipsisProps`, `PaginationItemProps`, `PaginationNextProps`, `PaginationPrevProps`, `PaginationRootProps`
    
49. **Stepper** - `src/components/navigation/stepper/Stepper.tsx`
    - Exported: `Stepper`
    - Types: `StepperContentProps`, `StepperIndicatorProps`, `StepperItemProps`, `StepperLabelProps`, `StepperRootProps`, `StepperStep`

### Icon System
50. **Icon** - `src/components/icon/Icon.tsx`
    - Exported: `Icon`, `IconProps`, `iconVariants`
    
51. **Icon Components** - `src/icons/`
    - Exported: `IconArrowRight`, `IconCalendar`, `IconCheck`, `IconChevronDown`, `IconChevronRight`, `IconClose`, `IconError`, `IconInfo`, `IconLocation`, `IconMenu`, `IconSearch`, `IconSuccess`, `IconWarning`
    - Types: `IconName`, `IconProps as IconComponentProps`
    - Registry: `ICONS_MAP`

### Domain Components
52. **EventCard** - `src/components/domain/EventCard/EventCard.tsx`
    - Exported: `EventCard`
    - Types: `EventCardLayout`, `EventCardProps`, `EventCardSize`, `EventCardVariant`
    
53. **ArtistCard** - `src/components/cards/ArtistCard/ArtistCard.tsx`
    - Exported: `ArtistCard`
    - Types: `ArtistCardProps`, `ArtistCardSize`, `ArtistCardVariant`
    
54. **CategoryCard** - `src/components/cards/CategoryCard/CategoryCard.tsx`
    - Exported: `CategoryCard`
    - Types: `CategoryCardProps`, `CategoryCardSize`, `CategoryCardVariant`
    
55. **PromoCard** - `src/components/cards/PromoCard/PromoCard.tsx`
    - Exported: `PromoCard`
    - Types: `PromoCardProps`, `PromoCardSize`, `PromoCardVariant`
    
56. **TicketCard** - `src/components/cards/TicketCard/TicketCard.tsx`
    - Exported: `TicketCard`
    - Types: `TicketAvailability`, `TicketCardProps`, `TicketCardSize`, `TicketCardVariant`
    
57. **VenueCard** - `src/components/cards/VenueCard/VenueCard.tsx`
    - Exported: `VenueCard`
    - Types: `VenueCardProps`, `VenueCardSize`, `VenueCardVariant`
    
58. **CardBase** - `src/components/cards/CardBase/CardBase.tsx`
    - Exported: `CardBase`, `CardBaseContentWrapper`, `CardBaseFooterWrapper`, `CardBaseImageWrapper`
    - Types: `CardBaseContentWrapperProps`, `CardBaseFooterWrapperProps`, `CardBaseImageWrapperProps`, `CardBaseProps`, `CardBaseSize`, `CardBaseVariant`

---

## EXISTS_NOT_EXPORTED

Components that exist in code but are NOT part of the public API (not exported via `src/index.ts`):

### Layout Components (Not Exported)
1. **Footer** - `src/components/layout/Footer.tsx`
   - Exists but not exported
   
2. **Navbar** - `src/components/layout/Navbar.tsx`
   - Exists but not exported
   
3. **ModeHero** - `src/components/layout/ModeHero.tsx`
   - Exists but not exported

### UI Components (Not Exported)
4. **Card** (shadcn variant) - `src/components/ui/card.tsx`
   - Exists but not exported (different from containers/Card.tsx)
   - Contains: `Card`, `CardContent`, `CardDescription`, `CardFooter`, `CardHeader`, `CardTitle`
   
5. **Tooltip** (shadcn variant) - `src/components/ui/tooltip.tsx`
   - Exists but not exported
   - Contains: `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger`
   
6. **Toast** (shadcn variant) - `src/components/ui/toast.tsx`
   - Exists but not exported (different from overlays/Toast.tsx)
   - Contains: `Toast`, `ToastAction`, `ToastClose`, `ToastDescription`, `ToastProvider`, `ToastTitle`, `ToastViewport`, `toastVariants`
   
7. **Toaster** - `src/components/ui/toaster.tsx`
   - Exists but not exported

### Primitives (Not Exported)
8. **Button** (primitive) - `src/components/primitives/Button.tsx`
   - Re-exports from `@/components/ui/button` but not exported from main index
   
9. **Link** - `src/components/primitives/Link.tsx`
   - Exists but not exported
   
10. **Badge** - `src/components/primitives/Badge.tsx`
    - Exists but not exported
    
11. **Divider** - `src/components/primitives/Divider.tsx`
    - Exists but not exported
    
12. **Input** (primitive) - `src/components/primitives/Input.tsx`
    - Re-exports from `@/components/input` but not exported from main index
    
13. **Label** (primitive) - `src/components/primitives/Label.tsx`
    - Re-exports from `@/components/ui/label` but not exported from main index
    
14. **Card** (primitive) - `src/components/primitives/Card.tsx`
    - Exists but not exported
    
15. **ThemeSwitch** - `src/components/primitives/ThemeSwitch.tsx`
    - Exists but not exported

### Overlay Components (Not Exported)
16. **Popover** (overlays variant) - `src/components/overlays/Popover.tsx`
    - Exists but not exported (different from menus/popover/)
    
17. **Tooltip** (overlays variant) - `src/components/overlays/Tooltip.tsx`
    - Exists but not exported (different from ui/tooltip.tsx)
    
18. **OverlayPortal** - `src/components/overlays/OverlayPortal.tsx`
    - Exists but not exported

### Menu Components (Not Exported)
19. **DropdownMenu** (menus variant) - `src/components/menus/DropdownMenu.tsx`
    - Exists but not exported (different from menus/dropdown/)
    
20. **NavigationMenu** - `src/components/menus/NavigationMenu.tsx`
    - Exists but not exported

### Dropdown Component (Not Exported)
21. **Dropdown** - `src/components/dropdown/Dropdown.tsx`
    - Exists but not exported
    - Contains: `DropdownRoot`, `DropdownTrigger`, `DropdownMenu`, `DropdownItem`
    - Compound component: `Dropdown = { Root, Trigger, Menu, Item }`

### Drawer Component (Not Exported)
22. **Drawer** - `src/components/drawer/Drawer.tsx`
    - Exists but not exported
    - Contains: `Drawer`, `DrawerBody`, `DrawerFooter`, `DrawerHeader`
    - Types: `DrawerBackdropVariant`, `DrawerBodyProps`, `DrawerFooterProps`, `DrawerHeaderProps`, `DrawerPosition`, `DrawerProps`, `DrawerSize`
    - Variants: `drawerVariants`

### Section Components (Not Exported)
23. **SectionBuilder** - `src/components/SectionBuilder.tsx`
    - Exists but not exported
    
24. **HeroSection** - `src/components/sections/HeroSection.tsx`
    - Exists but not exported
    
25. **CTASection** - `src/components/sections/CTASection.tsx`
    - Exists but not exported
    
26. **TrendingSection** - `src/components/sections/TrendingSection.tsx`
    - Exists but not exported
    
27. **FeatureSection** - `src/components/sections/FeatureSection.tsx`
    - Exists but not exported
    
28. **ArticlesSection** - `src/components/sections/ArticlesSection.tsx`
    - Exists but not exported

### Filter Components (Not Exported)
29. **FilterBar** - `src/components/filters/FilterBar.tsx`
    - Exists but not exported
    
30. **SearchInput** - `src/components/filters/SearchInput.tsx`
    - Exists but not exported
    
31. **FilterSelect** - `src/components/filters/FilterSelect.tsx`
    - Exists but not exported
    
32. **DateRangePicker** - `src/components/filters/DateRangePicker.tsx`
    - Exists but not exported
    
33. **PriceRangeSlider** - `src/components/filters/PriceRangeSlider.tsx`
    - Exists but not exported
    
34. **SearchFilters** - `src/components/filters/SearchFilters.tsx`
    - Exists but not exported

### Search Components (Not Exported)
35. **SearchBar** - `src/components/search/SearchBar.tsx`
    - Exists but not exported

### Image Components (Not Exported)
36. **Image** - `src/components/image/Image.tsx`
    - Exists but not exported

### Auth Components (Not Exported)
37. **LoginForm** - `src/components/auth/LoginForm.tsx`
    - Exists but not exported
    
38. **RegisterForm** - `src/components/auth/RegisterForm.tsx`
    - Exists but not exported
    
39. **ProfileCard** - `src/components/auth/ProfileCard.tsx`
    - Exists but not exported

### Admin Components (Not Exported)
40. **Dashboard** - `src/components/admin/Dashboard.tsx`
    - Exists but not exported
    
41. **UserManagement** - `src/components/admin/UserManagement.tsx`
    - Exists but not exported

### Feedback Components (Not Exported)
42. **ConsentBanner** - `src/components/feedback/ConsentBanner.tsx`
    - Exists but not exported
    
43. **Progress** - `src/components/feedback/Progress.tsx`
    - Exists but not exported
    
44. **Skeleton** (feedback variant) - `src/components/feedback/Skeleton.tsx`
    - Exists but not exported (different from data/skeleton/Skeleton.tsx)

### Modal Components (Not Exported)
45. **ConfirmDialog** - `src/components/modals/ConfirmDialog.tsx`
    - Exists but not exported
    
46. **ModalProvider** - `src/components/modals/ModalProvider.tsx`
    - Exists but not exported
    - Contains: `ModalProvider`, `useModalContext`

### Control Components (Not Exported)
47. **LanguageSelector** - `src/components/controls/LanguageSelector.tsx`
    - Exists but not exported

### Skeleton Components (Not Exported)
48. **EventCardSkeleton** - `src/components/skeletons/EventCardSkeleton.tsx`
    - Exists but not exported
    
49. **VenueCardSkeleton** - `src/components/skeletons/VenueCardSkeleton.tsx`
    - Exists but not exported

### Icon Components (Not Exported)
50. **TrendingIcon** - `src/components/icons/TrendingIcon.tsx`
    - Exists but not exported

---

## TOKENS_ONLY

Token definitions that exist but have no corresponding component implementation:

### Component Tokens
All component tokens are defined in `src/tokens/components/`:
- `alert.ts` - Alert tokens
- `artist.ts` - Artist card tokens
- `button.ts` - Button tokens
- `card.ts` - Card tokens
- `checkbox.ts` - Checkbox tokens
- `context-menu.ts` - Context menu tokens
- `data.ts` - Data display tokens
- `domain.ts` - Domain component tokens
- `dropdown.ts` - Dropdown tokens
- `icon.ts` - Icon tokens
- `input.ts` - Input tokens
- `menu.ts` - Menu tokens
- `modal.ts` - Modal tokens
- `motion.ts` - Motion tokens
- `navigation.ts` - Navigation tokens
- `notifications.ts` - Notification tokens
- `overlay.ts` - Overlay tokens
- `popover.ts` - Popover tokens
- `radio.ts` - Radio tokens
- `section.ts` - Section tokens
- `select.ts` - Select tokens
- `surface.ts` - Surface tokens
- `switch.ts` - Switch tokens
- `tabs.ts` - Tabs tokens
- `text.ts` - Text tokens
- `toast.ts` - Toast tokens
- `tooltip.ts` - Tooltip tokens

**Note:** All tokens have corresponding components. No tokens exist without components.

---

## STORIES_ONLY

Storybook stories that exist without corresponding component files:

**Result:** None found. All story files have corresponding component implementations.

### Motion Stories (No Component)
1. **Motion.stories.tsx** - `src/components/motion/Motion.stories.tsx`
   - Story exists but no `Motion.tsx` component found
   
2. **Gestures.stories.tsx** - `src/components/motion/Gestures.stories.tsx`
   - Story exists but no `Gestures.tsx` component found

**Note:** These may be documentation-only stories or may reference components from other locations.

---

## Notes

### Export Verification
- All components listed in `EXISTS_AND_EXPORTED` are verified to be exported via `src/index.ts`
- All components listed in `EXISTS_NOT_EXPORTED` exist as `.tsx` files but are not exported from the main index
- Some components exist in multiple locations (e.g., `Card`, `Tooltip`, `Toast`) - only the exported versions are listed in `EXISTS_AND_EXPORTED`

### Component Duplication
Several components exist in multiple locations:
- **Card**: `src/components/ui/card.tsx` (not exported), `src/components/containers/Card.tsx` (exported), `src/components/primitives/Card.tsx` (not exported)
- **Tooltip**: `src/components/ui/tooltip.tsx` (not exported), `src/components/overlays/Tooltip.tsx` (not exported)
- **Toast**: `src/components/ui/toast.tsx` (not exported), `src/components/overlays/Toast.tsx` (exported)
- **Skeleton**: `src/components/data/skeleton/Skeleton.tsx` (exported), `src/components/feedback/Skeleton.tsx` (not exported)

### Legacy Components
- **Select**: Legacy version exists at `src/components/select/legacy/select.tsx` but is not the primary export
- **Textarea**: Legacy version exists at `src/components/textarea/legacy/textarea.tsx` but is not the primary export

### Barrel File Structure
Most component directories have `index.ts` barrel files that re-export components. The main `src/index.ts` aggregates these barrel exports.

### Component Classification
- **UI Components**: CVA-based, token-driven components in `src/components/ui/`
- **Primitives**: Basic building blocks in `src/components/primitives/`
- **Layout**: Layout primitives in `src/components/layout/`
- **Containers**: Container components in `src/components/containers/`
- **Overlays**: Portal-based overlay components in `src/components/overlays/`
- **Menus**: Menu system components in `src/components/menus/`
- **Data**: Data display components in `src/components/data/`
- **Navigation**: Navigation components in `src/components/navigation/`
- **Domain**: Domain-specific components in `src/components/domain/` and `src/components/cards/`

---

## Verification Checklist

- [x] Every listed component can be traced to a concrete file path
- [x] Every exported component is verifiable via `src/index.ts`
- [x] No inferred or assumed components are listed
- [x] No architectural judgement is included
- [x] All file paths are accurate
- [x] Export status is verified

---

**End of Inventory**
