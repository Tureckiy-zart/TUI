/**
 * Navigation Components Exports
 *
 * Barrel export for all navigation components.
 */

// Tabs
export {
  Tabs,
  type TabsContentProps,
  type TabsListProps,
  type TabsRootProps,
  type TabsTriggerProps,
} from "./tabs";

// SegmentedControl
export {
  SegmentedControl,
  type SegmentedControlItemProps,
  segmentedControlItemVariants,
  type SegmentedControlOrientation,
  type SegmentedControlRootProps,
  segmentedControlRootVariants,
  type SegmentedControlSize,
} from "./segmented-control";

// Breadcrumbs
export {
  type BreadcrumbItem,
  Breadcrumbs,
  type BreadcrumbsItemProps,
  type BreadcrumbsRootProps,
  type BreadcrumbsSeparatorProps,
} from "./breadcrumbs/index";

// Pagination
export {
  Pagination,
  type PaginationEllipsisProps,
  type PaginationItemProps,
  type PaginationNextProps,
  type PaginationPrevProps,
  type PaginationRootProps,
} from "./pagination/index";

// Stepper
export {
  Stepper,
  type StepperContentProps,
  type StepperIndicatorProps,
  type StepperItemProps,
  type StepperLabelProps,
  type StepperRootProps,
  type StepperStep,
} from "./stepper";

// SearchBar
export { SearchBar, type SearchBarProps } from "./SearchBar";

// Navigation Primitives
export { NavItem, type NavItemProps, NavRoot, type NavRootProps } from "./primitives";

// NavList (standalone component)
export { NavList, type NavListProps } from "./nav-list";

// NavText (standalone component)
export { NavText, type NavTextProps } from "./NavText/NavText";

// NavSeparator (standalone component)
export { NavSeparator, type NavSeparatorProps } from "./NavSeparator/NavSeparator";

// Menu
export {
  Menu,
  MenuContent,
  type MenuContentProps,
  MenuGroup,
  type MenuGroupProps,
  MenuItem,
  type MenuItemProps,
  MenuLabel,
  type MenuLabelProps,
  MenuRoot,
  type MenuRootProps,
  MenuSeparator,
  type MenuSeparatorProps,
  MenuTrigger,
  type MenuTriggerProps,
} from "./Menu/Menu.index";
