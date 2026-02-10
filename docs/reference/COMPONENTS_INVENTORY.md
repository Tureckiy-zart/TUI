# 📊 Tenerife UI Components Inventory

**Last Updated:** 2026-02-05  
**Purpose:** Inventory of components exported from the public API.

**Source of Truth:** `src/index.ts` (main entry point).

---

## ✅ Public API Components (By Category)

Category-to-folder mapping:
`Core Primitives` → `src/PRIMITIVES`, `src/COMPOSITION/controls`, `src/COMPOSITION/actions`, `src/COMPOSITION/a11y`, `src/COMPOSITION/focus`
`Layout & Containers` → `src/COMPOSITION/layout`
`Overlays & Menus` → `src/COMPOSITION/overlays`, `src/PATTERNS/menus`
`Navigation` → `src/COMPOSITION/navigation`
`Data Display` → `src/PATTERNS`
`Notifications` → `src/COMPOSITION/overlays`, `src/DOMAIN/notifications`
`Media & Compositions` → `src/COMPOSITION/controls`

### Core Primitives

- `Button` (Foundation), `ButtonGroup` (Extension), `IconButton` (Foundation)
- `Text` (Foundation), `Heading` (Foundation), `HelperText` (Foundation), `ErrorText` (Foundation)
- `Link` (Foundation), `NavLink` (Extension), `Badge` (Extension), `Alert` (Extension), `Chip` (Extension)
- `Input` (Foundation), `Textarea` (Foundation), `Select` (Foundation) (and subcomponents)
- `Checkbox` (Foundation), `Radio` (Foundation), `RadioGroup`, `Switch` (Foundation), `Label` (Foundation), `Field` (Extension), `FormGroup` (Foundation)
- `Progress` (Extension), `Skeleton` (Extension), `Separator` (Extension), `AspectRatio` (Extension), `Spinner` (Extension)
- `Icon` (Foundation) + icon registry exports
- `VisuallyHidden` (Extension), `FocusTrap` (Extension)

### Layout & Containers

- Layout primitives: `Box` (Extension), `Container` (Extension), `Grid` (Extension), `Flex` (Extension), `Stack` (Extension), `Row` (Extension), `Column` (Extension), `Inline` (Extension), `Inset` (Extension), `Spacer` (Extension), `Divider` (Extension), `Surface` (Extension), `Panel` (Extension)
- Layout compositions: `AppHeader` (Extension), `HeaderComposition` (Extension), `Navbar` (Extension), `Footer` (Extension), `SidebarLayout` (Extension), `StickyBar` (Extension), `ModeHero` (Extension), `List` (Extension), `ListItem` (Extension), `LinkWithCustomVariant` (Extension)
- Containers: `Card` (Extension) (and `CardHeader`, `CardBody`, `CardFooter`), `Section` (Extension), `ContentShell` (Extension), `PageHeader` (Extension), `ContainerSurface` (Extension) (alias for `Surface`), `SectionState` (Extension)

### Overlays & Menus

- Overlays: `Modal` (Foundation) (and subcomponents), `Dialog` (Extension) (and subcomponents), `Drawer` (Extension) (and subcomponents), `Accordion` (Extension) (and subcomponents)
- `Portal` (Extension), `Backdrop` (Extension)
- `Popover` (Extension) (and subcomponents)
- `Tooltip` (Extension) (and subcomponents)
Tooltip Root is safe-by-default and wires a provider internally; use `TooltipProvider` only when you need a shared provider scope.
- `Dropdown` (Extension) (and subcomponents)
- `ContextMenu` (Foundation) (and subcomponents)
- `HoverCard` (Extension) (and subcomponents)
- `Combobox` (Extension) (and subcomponents)

### Navigation

- `Tabs` (Foundation)
- `SegmentedControl` (Extension)
- `Breadcrumbs` (Extension)
- `Pagination` (Extension)
- `Stepper` (Extension)
- `Menu` (Extension) (and subcomponents), `NavRoot` (Extension), `NavList` (Extension), `NavItem` (Extension), `NavText` (Extension), `NavSeparator` (Extension)
- `SearchBar` (Extension)

### Data Display

- `Table` (Extension) (and subcomponents), `useTableContext` (Extension)
- `DataList` (Extension) (and subcomponents)
- `EmptyState` (Extension) (and subcomponents)

### Notifications

- `Toast` (Foundation)
- `ToastProvider` (Extension), `ToastViewport` (Extension), `Toaster` (Extension)
- `useLocalToast` (Extension), `useGlobalToast` (Extension)
- `NotificationCenter` (Extension) (and subcomponents)

### Media & Compositions

- `Avatar` (Extension), `AvatarGroup` (Extension)

### Extensions (main API)

Category-to-folder mapping:
`Layout` → `src/COMPOSITION/layout`, `src/COMPOSITION/responsive`, `src/COMPOSITION/surface-elevation`, `src/COMPOSITION/inverse-typography`, `src/COMPOSITION/overlay`
`Overlays` → `src/COMPOSITION/overlays`
`Forms` → `src/COMPOSITION/controls`
`Media` → `src/COMPOSITION/hero`, `src/COMPOSITION/carousel`

**Layout**
- `ResponsiveVisibility` (Extension)
- `SurfaceElevation` (Extension)
- `InverseTypography` (Extension)
- `OverlaySlot` (Extension)

**Overlays**
- `FileUpload` (Extension)
- `Chip` (Extension)

**Forms**
- `Slider`, `RangeSlider` (Extension)
- `MultiSelect` (Extension)
- `LanguageSelector` (Extension)

**Media**
- `HeroMedia` (Extension)
- `Carousel` (Extension)

---

## Notes

- This inventory reflects **public exports only**. Internal-only and restricted components are not listed here.
- For exact export names and types, see `src/index.ts`.

---

## Next.js Extension (`@tenerife.music/ui/extensions/next`)

- `NextLinkAdapter`

---

## Full Public Exports (Non-token, Non-type)

Derived from `src/index.ts`. Includes components, hooks, variant maps, and constants.

- `ALERT_VARIANTS`
- `ASPECT_RATIO_PRESETS`
- `Accordion`
- `Alert`
- `AppHeader`
- `AspectRatio`
- `Avatar`
- `AvatarGroup`
- `BADGE_VARIANTS`
- `Backdrop`
- `Badge`
- `Box`
- `Breadcrumbs`
- `Button`
- `ButtonGroup`
- `CHIP_RADIUS_VALUES`
- `CHIP_VARIANTS`
- `Card`
- `CardBody`
- `CardFooter`
- `CardHeader`
- `Carousel`
- `Checkbox`
- `Chip`
- `Column`
- `Combobox`
- `ComboboxInput`
- `ComboboxList`
- `ComboboxRoot`
- `Container`
- `ContentShell`
- `ContextMenu`
- `ContextMenuCheckboxItem`
- `ContextMenuContent`
- `ContextMenuItem`
- `ContextMenuLabel`
- `ContextMenuRadioGroup`
- `ContextMenuRadioItem`
- `ContextMenuRoot`
- `ContextMenuSeparator`
- `ContextMenuSub`
- `ContextMenuSubContent`
- `ContextMenuSubTrigger`
- `ContextMenuTrigger`
- `DROPDOWN_TOKENS`
- `DataList`
- `DataListItem`
- `DataListLabel`
- `DataListRoot`
- `DataListValue`
- `Dialog`
- `DialogBody`
- `DialogDescription`
- `DialogFooter`
- `DialogHeader`
- `DialogRoot`
- `DialogTitle`
- `Divider`
- `Drawer`
- `DrawerBody`
- `DrawerFooter`
- `DrawerHeader`
- `Dropdown`
- `DropdownContent`
- `DropdownItem`
- `DropdownRoot`
- `DropdownSeparator`
- `DropdownTrigger`
- `EmptyState`
- `EmptyStateAction`
- `EmptyStateDescription`
- `EmptyStateIcon`
- `EmptyStateTitle`
- `ErrorText`
- `Field`
- `FileUpload`
- `Flex`
- `FocusTrap`
- `Footer`
- `FormGroup`
- `Grid`
- `HeaderComposition`
- `Heading`
- `HelperText`
- `HeroMedia`
- `HoverCardContent`
- `HoverCardTrigger`
- `ICONS_MAP`
- `Icon`
- `IconArrowRight`
- `IconButton`
- `IconCalendar`
- `IconCheck`
- `IconChevronDown`
- `IconChevronRight`
- `IconClose`
- `IconError`
- `IconInfo`
- `IconLocation`
- `IconMenu`
- `IconSearch`
- `IconSuccess`
- `IconWarning`
- `Inline`
- `Input`
- `Inset`
- `InverseTypography`
- `Label`
- `LanguageSelector`
- `Link`
- `LinkWithCustomVariant`
- `List`
- `ListItem`
- `Menu`
- `MenuContent`
- `MenuGroup`
- `MenuItem`
- `MenuLabel`
- `MenuRoot`
- `MenuSeparator`
- `MenuTrigger`
- `Modal`
- `ModalClose`
- `ModalContent`
- `ModalContext`
- `ModalDescription`
- `ModalFooter`
- `ModalHeader`
- `ModalOverlay`
- `ModalProvider`
- `ModalRoot`
- `ModalTitle`
- `ModalTrigger`
- `ModeHero`
- `MultiSelect`
- `NavItem`
- `NavLink`
- `NavList`
- `NavRoot`
- `NavSeparator`
- `NavText`
- `Navbar`
- `NotificationCenter`
- `NotificationCenterDismissAll`
- `NotificationCenterGroupHeader`
- `NotificationCenterItem`
- `NotificationCenterList`
- `NotificationCenterPanel`
- `NotificationCenterProvider`
- `NotificationCenterTrigger`
- `OverlaySlot`
- `PageHeader`
- `Pagination`
- `Panel`
- `Popover`
- `PopoverAnchor`
- `PopoverContent`
- `PopoverTrigger`
- `PopoverWrapper`
- `Portal`
- `Progress`
- `Radio`
- `RadioGroup`
- `RangeSlider`
- `ResponsiveVisibility`
- `Row`
- `SearchBar`
- `Section`
- `SectionState`
- `SegmentedControl`
- `Select`
- `SelectContent`
- `SelectGroup`
- `SelectIcon`
- `SelectItem`
- `SelectItemIndicator`
- `SelectItemText`
- `SelectLabel`
- `SelectRoot`
- `SelectSeparator`
- `SelectTrigger`
- `SelectValue`
- `SelectViewport`
- `Separator`
- `SidebarLayout`
- `Skeleton`
- `Slider`
- `Spacer`
- `Spinner`
- `Stack`
- `Stepper`
- `StickyBar`
- `Surface`
- `SurfaceElevation`
- `SurfaceElevationCompositionReference`
- `Switch`
- `TableBody`
- `TableCell`
- `TableEmpty`
- `TableExpandableContent`
- `TableHead`
- `TableHeader`
- `TableLoadingState`
- `TableRoot`
- `TableRow`
- `TableSortIcon`
- `Tabs`
- `Text`
- `Textarea`
- `Toast`
- `ToastProvider`
- `ToastViewport`
- `Toaster`
- `Tooltip`
- `TooltipContent`
- `TooltipProvider`
- `TooltipTrigger`
- `TooltipWrapper`
- `VisuallyHidden`
- `alertVariants`
- `badgeVariants`
- `checkboxVariants`
- `chipVariants`
- `dividerVariants`
- `drawerVariants`
- `headingVariants`
- `iconVariants`
- `inputVariants`
- `linkVariants`
- `listItemVariants`
- `popoverContentVariants`
- `radioVariants`
- `resolveComponentAnimations`
- `segmentedControlItemVariants`
- `segmentedControlRootVariants`
- `separatorVariants`
- `skeletonVariants`
- `stickyBarVariants`
- `surfaceVariants`
- `textVariants`
- `textareaVariants`
- `tooltipContentVariants`
- `useButtonGroupContext`
- `useFocusLock`
- `useGlobalToast`
- `useLocalToast`
- `useModalContext`
- `useNotificationCenter`
- `useNotificationCenterContext`
- `useSurfaceElevation`
- `useTableContext`
- `withModal`
