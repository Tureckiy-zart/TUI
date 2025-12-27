# TUI Extension Layer - Canonical State

**Date:** 2025-12-16  
**Status:** CANONICAL - SINGLE SOURCE OF TRUTH  
**Authority:** This document overrides all other sources including file existence, Storybook stories, historical usage, and documentation.

**Related Authority:** [Extension Authority Contract](./EXTENSION_AUTHORITY.md) - Defines Extension layer boundaries and rules

---

## Authority & Scope

This document is the **single source of truth** for what UI components are allowed, restricted, or locked in the `@tenerife.music/ui` Extension Layer.

**Important:** Extension components **MUST** comply with the [Extension Authority Contract](./EXTENSION_AUTHORITY.md). Extension **CANNOT** modify, override, bypass, or duplicate Foundation functionality. Foundation Authorities are **CLOSED** and **IMMUTABLE**.

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

**Status:** ✅ **FOUNDATION CLOSED**  
**Lock Date:** 2025-12-12  
**Source of Truth:** [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md)

The following components are **LOCKED** and **IMMUTABLE**. They form the foundation of the UI system and must not be modified, extended, or replaced.

**Foundation Authorities are CLOSED:** All Foundation Authority Contracts (Interaction, State, Layout, Token, Spacing, Radius, Typography, Motion, Elevation) are **LOCKED** and **IMMUTABLE**. **Foundation Enforcement** (className/style exclusion) is **LOCKED / APPLIED**. Extension components **MUST** comply with all Foundation Authority rules and **CANNOT** modify or override Foundation functionality.

### Locked Components

1. **Modal** - `src/COMPOSITION/overlays/Modal/Modal.tsx`
   - **Status:** ⏳ **LEGACY UNLOCKED** (Pending Canonical Migration)
   - **Unlock Date:** 2025-12-19
   - **Task:** TUNG_FOUNDATION_LEGACY_UNLOCK_01
   - **Unlock Reason:** Modal was declared as LOCKED but was implemented using legacy patterns and never passed the canonical Foundation Step Pipeline (0–13). The current lock is declarative only and blocks required migration.
   - **Migration Path:** Modal will undergo canonical Foundation lock process (Steps 0–13) to ensure full compliance with all Authority Contracts and canonical lifecycle requirements, similar to Button/Link standards.
   - **Constraints During Unlock:**
     - ❌ No public API expansion
     - ❌ No new variants or sizes
     - ❌ No behavior changes outside canonicalization
     - ❌ No bypass of Authority Contracts
   - **Exit Criteria:** Component must complete Steps 0–13, Foundation lock report must exist, Public Type Surface must be locked, Component must be re-marked as FOUNDATION · LOCKED
   - **Exports:** `Modal`, `ModalClose`, `ModalContent`, `ModalDescription`, `ModalFooter`, `ModalHeader`, `ModalOverlay`, `ModalRoot`, `ModalTitle`, `ModalTrigger`

2. **Tabs** - `src/COMPOSITION/navigation/tabs/Tabs.tsx`
   - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, Third Pass Complete)
   - **Lock Date:** 2025-12-25 (First Pass), 2025-12-25 (Second Pass), 2025-12-27 (Third Pass)
   - **Pipeline:** Pipeline 18A (Steps 0-12 complete, Third Pass 2025-12-27)
   - **Audit Report:** `docs/reports/audit/TABS_BASELINE_REPORT.md`
   - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
   - **Migration Complete:** Tabs has completed canonical Foundation Step Pipeline (Steps 0–12) three times and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements. Third pass completed 2025-12-27 with all compliance verified, no issues found.
   - **Rule:** Future structural modifications require re-entry into Pipeline 18A
   - **Exports:** `Tabs`, `TabsRoot`, `TabsList`, `TabsTrigger`, `TabsContent`
   - **Types:** `TabsContentProps`, `TabsListProps`, `TabsRootProps`, `TabsTriggerProps`

3. **Select** - `src/components/select/Select.tsx`
   - **Status:** FOUNDATION · LOCKED (FINALIZED)
   - **Comment:** Implementation hardened, a11y verified (S1 + H1–H4 complete)
   - **UNLOCK:** Any functional, behavioral, accessibility-semantic, or public API change requires formal **UNLOCK** (see `FOUNDATION_LOCK.md`, `FOUNDATION_LOCK_OPERATING_RULES.md`)
   - **Rule:** DO NOT modify, extend, or create alternatives beyond LOCK-safe changes permitted by `FOUNDATION_LOCK_OPERATING_RULES.md`
   - **Finalization Rule:** No extensions/variants/refactors of `Select` as standalone work. Only LOCK-safe bug/a11y fixes are permitted.
   - **Exports:** `Select`, `SelectContent`, `SelectGroup`, `SelectIcon`, `SelectItem`, `SelectItemIndicator`, `SelectItemText`, `SelectLabel`, `SelectRoot`, `SelectSeparator`, `SelectTrigger`, `SelectValue`, `SelectViewport`

4. **ContextMenu** - `src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx`
   - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
   - **Lock Date:** 2025-12-25
   - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
   - **Audit Report:** `docs/reports/audit/CONTEXTMENU_BASELINE_REPORT.md`
   - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
   - **Migration Complete:** ContextMenu has completed canonical Foundation Step Pipeline (Steps 0–12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
   - **Key Decisions:**
     - CVA migrated from `cva` to `tokenCVA` (Decision Matrix RULE 1)
     - Tone variants: neutral, primary, destructive (overlay-specific semantics)
     - Size scale: sm, md, lg (overlay restriction compliant)
     - Size inheritance pattern via Context (DX improvement)
     - Radix delegation for all behavior (right-click, keyboard, focus, a11y)
   - **Rule:** Future structural modifications require re-entry into Pipeline 18A
   - **Exports:** `ContextMenu`, `ContextMenuCheckboxItem`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuRoot`, `ContextMenuSeparator`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuTrigger`
   - **Types:** `ContextMenuCheckboxItemProps`, `ContextMenuContentProps`, `ContextMenuItemProps`, `ContextMenuLabelProps`, `ContextMenuRadioGroupProps`, `ContextMenuRadioItemProps`, `ContextMenuRootProps`, `ContextMenuSeparatorProps`, `ContextMenuSubContentProps`, `ContextMenuSubProps`, `ContextMenuSubTriggerProps`, `ContextMenuTriggerProps`

5. **Toast** - `src/COMPOSITION/overlays/Toast.tsx`
   - **Status:** ⏳ **LEGACY UNLOCKED** (Pending Canonical Migration)
   - **Unlock Date:** 2025-12-19
   - **Task:** TUNG_FOUNDATION_LEGACY_UNLOCK_01
   - **Unlock Reason:** Toast was declared as LOCKED but was implemented using legacy patterns and never passed the canonical Foundation Step Pipeline (0–13). The current lock is declarative only and blocks required migration.
   - **Migration Path:** Toast will undergo canonical Foundation lock process (Steps 0–13) to ensure full compliance with all Authority Contracts and canonical lifecycle requirements, similar to Button/Link standards.
   - **Constraints During Unlock:**
     - ❌ No public API expansion
     - ❌ No new variants or sizes
     - ❌ No behavior changes outside canonicalization
     - ❌ No bypass of Authority Contracts
   - **Exit Criteria:** Component must complete Steps 0–13, Foundation lock report must exist, Public Type Surface must be locked, Component must be re-marked as FOUNDATION · LOCKED
   - **Exports:** `Toast`, `ToastAction`, `ToastClose`, `ToastDescription`, `ToastRoot`, `ToastTitle`, `toastVariants`
   - **Provider:** `ToastProvider`, `ToastViewport`, `useToast`

6. **Button** - `src/PRIMITIVES/Button/Button.tsx`
   - **Status:** ✅ **FINAL LOCK** ( )
   - **Rule:** DO NOT modify, extend, or create alternatives
   - **Lock Report:** `docs/reports/BUTTON_FOUNDATION_LOCK_REPORT.md`
   - **Purpose:** Sole action trigger foundation. All user-initiated actions (submit, confirm, execute, activate) must use this component. Button represents actions, not navigation (use Link component) or toggle/state switching (use Switch/Checkbox components).
   - **Reference Role:** Button serves as canonical Foundation reference implementation for token-driven CVA patterns, Authority Contract compliance, and browser-native interaction mechanisms.
   - **Exports:** `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize`
   - **Scope:** Public API, tokens (BUTTON_TOKENS), behavior (action trigger via `<button>`), states (base, hover, active, focus-visible, disabled), variants (primary, secondary, accent, outline, ghost, destructive), sizes (sm, md, lg, icon)
   - **Allowed Changes:** Bug fixes, type improvements, documentation updates, accessibility fixes (within existing contract)
   - **Forbidden Changes:** Public API changes, new variants/sizes, behavior changes, token modifications (requires unlock procedure)

7. **Link** - `src/PRIMITIVES/Link/Link.tsx`
   - **Status:** ✅ **FINAL LOCK** (2025-12-18)
   - **Rule:** DO NOT modify, extend, or create alternatives
   - **Lock Report:** `docs/reports/LINK_FOUNDATION_LOCK_REPORT.md`
   - **Exports:** `Link`, `LinkProps`, `LinkSize`, `LinkVariant`, `linkVariants`

### Foundation Layer Rules

- **DO NOT** modify locked components
- **DO NOT** create alternatives to locked components
- **DO NOT** extend locked components beyond their documented API
- **DO NOT** import locked components from non-canonical paths
- **DO NOT** use internal implementation details of locked components
- **DO NOT** modify Foundation Authority rules (Foundation Authorities are CLOSED and IMMUTABLE)
- **DO NOT** override, bypass, or duplicate Foundation functionality
- **MUST** comply with all Foundation Authority Contracts (Interaction, State, Layout, Token, Spacing, Radius, Typography, Motion, Elevation)

---

## Extension Layer - Canonical Components (ALLOWED)

The following components are **ALLOWED** for use. They are exported via `src/index.ts` and form the Extension Layer.

**Note:** Some Extension components may be **LOCKED** after completing their audit and locking procedures. Locked Extension components are immutable and cannot be modified without explicit unlock approval.

### Visual Components

1. **Alert** - `src/components/ui/alert.tsx`
   - Exports: `Alert`, `AlertProps`, `alertVariants`

3. **Link** - `src/PRIMITIVES/Link/Link.tsx`
   - Exports: `Link`, `LinkProps`, `linkVariants`

4. **Badge** - `src/PRIMITIVES/Badge/Badge.tsx`
   - Exports: `Badge`, `BadgeProps`, `badgeVariants`

5. **Icon** - `src/components/icon/Icon.tsx`
   - Exports: `Icon`, `IconProps`, `iconVariants`

6. **Icon Components** - `src/icons/`
   - Exports: `IconArrowRight`, `IconCalendar`, `IconCheck`, `IconChevronDown`, `IconChevronRight`, `IconClose`, `IconError`, `IconInfo`, `IconLocation`, `IconMenu`, `IconSearch`, `IconSuccess`, `IconWarning`
   - Registry: `ICONS_MAP`

### Typography Components

7. **Text** - `src/components/ui/text.tsx`
   - **Status:** ✅ **LOCKED** (2025-12-15)
   - **Rule:** DO NOT modify, extend, or create alternatives
   - Exports: `Text`, `TextProps`, `TextSize`, `TextWeight`, `textVariants`

8. **Body** - `src/components/ui/body.tsx`
   - **Status:** ✅ **LOCKED** (2025-12-15)
   - **Rule:** DO NOT modify, extend, or create alternatives
   - Exports: `Body`, `BodyProps`, `bodyVariants`

9. **Caption** - `src/components/ui/caption.tsx`
   - **Status:** ✅ **LOCKED** (2025-12-15)
   - **Rule:** DO NOT modify, extend, or create alternatives
   - Exports: `Caption`, `CaptionProps`, `captionVariants`

10. **Code** - `src/components/ui/code.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Rule:** DO NOT modify, extend, or create alternatives
    - Exports: `Code`, `CodeProps`, `codeVariants`

11. **Display** - `src/components/ui/display.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Rule:** DO NOT modify, extend, or create alternatives
    - Exports: `Display`, `DisplayProps`, `displayVariants`

12. **Heading** - `src/components/ui/heading.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Rule:** DO NOT modify, extend, or create alternatives
    - Exports: `Heading`, `HeadingProps`, `headingVariants`

13. **Lead** - `src/components/ui/lead.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Rule:** DO NOT modify, extend, or create alternatives
    - Exports: `Lead`, `LeadProps`, `leadVariants`

14. **Label** - `src/components/ui/label.tsx`
    - Exports: `Label`, `LabelProps`, `labelVariants`

### Form Components

15. **Checkbox** - `src/components/checkbox/Checkbox.tsx`
    - Exports: `Checkbox`, `CheckboxProps`, `checkboxVariants`

16. **Input** - `src/components/input/Input.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Rule:** DO NOT modify, extend, or create alternatives
    - Exports: `Input`, `InputProps`, `InputSize`, `InputVariant`, `inputVariants`

17. **Radio** - `src/components/radio/Radio.tsx`
    - Exports: `Radio`, `RadioProps`, `radioVariants`, `RadioGroup`, `RadioGroupProps`

18. **Textarea** - `src/components/textarea/Textarea.tsx`
    - Exports: `Textarea`, `TextareaProps`, `textareaVariants`

19. **Switch** - `src/components/switch/Switch.tsx`
    - Exports: `Switch`, `SwitchProps`, `switchHandleStateVariants`, `switchHandleVariants`, `switchTrackVariants`

20. **Field** - `src/components/ui/field.tsx`
    - Exports: `Field`, `FieldProps`, `FieldControlProps`, `FieldDescriptionProps`, `FieldErrorProps`, `FieldLabelProps`

### Layout Components

**Status:** ✅ **LOCKED** (2025-12-15)  
**Reference:** [Layout Lock](./locks/LAYOUT_LOCK.md)

**Layout Hierarchy:**
- **Box** → Lowest-level primitive (spacing, visual properties only)
- **Stack** → Primary layout composition primitive (vertical/horizontal flows)
  - **Column** → Semantic alias for Stack (vertical)
  - **Row** → Semantic alias for Stack (horizontal)
- **Container** → Width constraint specialization
- **Flex** → Advanced flexbox extension of Box
- **Grid** → CSS Grid extension of Box
- **Surface** → Surface elevation variant extension of Box

19. **Box** - `src/components/layout/Box.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Role:** Lowest-level layout primitive - pure, generic container
    - **Responsibility:** Spacing (padding/margin), visual properties (radius, shadow, background), element rendering (via `as` prop)
    - **Does NOT provide:** Layout composition semantics (display, flexDirection, gap, alignment)
    - **Use for:** Base container with styling only
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Box`, `BoxProps`

20. **Column** - `src/components/layout/Column.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Role:** Semantic alias for Stack with vertical direction
    - **Responsibility:** Provides explicit vertical layout API
    - **Implementation:** Alias for `Stack` (shares implementation)
    - **Use for:** Semantic clarity when vertical layout intent is important
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Column`, `ColumnProps`

21. **Container** - `src/components/layout/Container.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Role:** Specialized primitive for width constraint and horizontal padding
    - **Responsibility:** Width constraint (maxWidth), horizontal padding, centering
    - **Does NOT provide:** Layout composition behaviors (flex, grid, alignment)
    - **Use for:** Constraining content width and providing horizontal padding
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Container`, `ContainerProps`

22. **Flex** - `src/components/layout/Flex.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Role:** Advanced flexbox container extension of Box
    - **Responsibility:** Full control over flexbox properties (direction, wrap, grow, shrink, basis, alignment, spacing)
    - **Uses:** Box internally as base container
    - **Use for:** Advanced flexbox control beyond Stack capabilities
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Flex`, `FlexProps`

23. **Grid** - `src/components/layout/Grid.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Role:** CSS Grid container extension of Box
    - **Responsibility:** Full control over grid layout properties (columns, rows, gap, flow, alignment)
    - **Uses:** Box internally as base container
    - **Use for:** Two-dimensional layouts requiring precise row/column control
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Grid`, `GridProps`

24. **Row** - `src/components/layout/Row.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Role:** Semantic alias for Stack with horizontal direction
    - **Responsibility:** Provides explicit horizontal layout API
    - **Implementation:** Alias for `Stack(direction="horizontal")` (shares implementation)
    - **Use for:** Semantic clarity when horizontal layout intent is important
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Row`, `RowProps`

25. **Stack** - `src/components/layout/Stack.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Role:** Primary layout composition primitive for vertical and horizontal flows
    - **Responsibility:** Layout composition with semantic spacing (`spacing` prop), direction control, alignment
    - **Uses:** Box internally as base container
    - **API:** `spacing` is canonical prop (preferred), `gap` is deprecated alias for backward compatibility
    - **Use for:** One-dimensional layouts (vertical or horizontal) with spacing between items
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Stack`, `StackProps`

26. **Surface** - `src/components/layout/Surface.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Role:** Surface elevation variant component extension of Box
    - **Responsibility:** Provides surface elevation variants (flat, raised, sunken) with token-based styling
    - **Uses:** Box internally as base container, CVA for variant management
    - **Use for:** Semantic elevation variants
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Surface`, `SurfaceProps`, `surfaceVariants`

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

34. ~~**DropdownMenu**~~ ✅ **REMOVED** (MIGRATION_12C,  )
    - All Dropdown components and tokens fully removed
    - See `docs_archive/migrations/MIGRATION_12C_DROPDOWN_TOKENS_REMOVAL_REPORT.md` (archived)

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
   - **Rule:** DO NOT USE - Use `Button` from `src/PRIMITIVES/Button/Button.tsx` (FOUNDATION LOCKED) instead

9. **Link** (legacy path) - `src/components/primitives/Link.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE - Use `Link` from `src/PRIMITIVES/Link/Link.tsx` (exported) instead

10. **Badge** (legacy path) - `src/components/primitives/Badge.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Badge` from `src/PRIMITIVES/Badge/Badge.tsx` (exported) instead

11. **Divider** - `src/PRIMITIVES/Divider/Divider.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - RESTRICTED per API decision (TUI_API_DECISION_PRIMITIVES_EXPORT)
    - **Rationale:** Minimal value over native HTML `<hr>`; token usage is basic; context-specific rather than universal UI primitive

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

19. ~~**DropdownMenu** (menus variant)~~ - ❌ **REMOVED** (MIGRATION_12C)
    - **Status:** REMOVED
    - **Rule:** Fully removed from codebase

20. **NavigationMenu** - `src/components/menus/NavigationMenu.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Dropdown Component

21. ~~**Dropdown**~~ - ❌ **REMOVED** (MIGRATION_12C)
    - **Status:** REMOVED
    - **Rule:** Fully removed from codebase

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

36. **Image** - `src/PRIMITIVES/Image/Image.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - RESTRICTED per API decision (TUI_API_DECISION_PRIMITIVES_EXPORT)
    - **Rationale:** Domain-specific concerns (skeleton loading, fallback handling) belong in application code, not design system; violates token-driven architecture; image optimization is application-specific

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

3. **Foundation components status**
   - Modal is ✅ **LOCKED** (2025-12-20), Tabs is ✅ **PROCESS LOCKED** (Pipeline 18A Complete, Third Pass 2025-12-27), ContextMenu is ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-25), Toast is ⏳ **LEGACY UNLOCKED** (Pending Canonical Migration) - unlocked for canonical migration only
   - Select is ⏳ **UNLOCKED** (Pending Canonical Lock)
   - Button, Link are ✅ **FINAL LOCK** - DO NOT modify, extend, or create alternatives
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

11. **Extension cannot modify Foundation Authorities**
    - Foundation Authorities are CLOSED and IMMUTABLE
    - Extension MUST comply with all Foundation Authority rules
    - Extension CANNOT override, bypass, or duplicate Foundation functionality
    - Extension CANNOT modify Foundation Authority Contracts
    - Reference: [Extension Authority Contract](./EXTENSION_AUTHORITY.md)

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
**Version:** 1.2  
**Last Updated:**  

This document is **FINAL**. Any changes to this canonical state require explicit architectural review and approval. This document serves as the definitive law for UI component usage in the Extension Layer.

**Related Documents:**
- [Extension Authority Contract](./EXTENSION_AUTHORITY.md) - Extension layer boundary contract
- [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md) - Foundation lock status (source of truth)

---

## Version History

- **v1.3** (2025-12-19): Legacy Foundation Components Unlock for Canonical Migration
  - Updated Modal, Tabs, ContextMenu, and Toast status from LOCKED to LEGACY UNLOCKED
  - **UPDATE (2025-12-25):** ContextMenu completed Pipeline 18A and is now ✅ PROCESS LOCKED
  - Updated component paths to reflect actual locations (src/COMPOSITION/)
  - Added unlock rationale, migration path, constraints, and exit criteria for each component
  - Updated Foundation Layer Rules section to reflect legacy unlock status
  - Completed per TUNG_FOUNDATION_LEGACY_UNLOCK_01 task

- **v1.2** ( ): Button Foundation Lock (FINAL)
  - Updated Button status to FINAL LOCK ( )
  - Changed Button layer from Extension to FOUNDATION (Primitive)
  - Updated Button path to `src/PRIMITIVES/Button/Button.tsx`
  - Added Button lock report reference
  - Added reference to FOUNDATION_LOCK.md
  - Updated RESTRICTED section Button reference to correct path
  - Completed formal lock process per TUI_BUTTON_STEP_13_FOUNDATION_LOCK_FINAL task

- **v1.1** (2025-12-16): Foundation Authority Alignment
  - Added reference to Extension Authority Contract
  - Updated Foundation Layer section with Foundation CLOSED status
  - Added Foundation Authority compliance rules
  - Clarified that Extension cannot modify Foundation Authorities
  - Added explicit rules about Foundation Authority immutability

- **v1.0** (2025-12-15): Initial canonical state document

---

**End of Canonical State Document**
