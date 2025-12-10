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
  tabsListVariants,
  type TabsRootProps,
  type TabsTriggerProps,
  tabsTriggerVariants,
} from "./tabs";

// SegmentedControl
export {
  SegmentedControl,
  type SegmentedControlItemProps,
  segmentedControlItemVariants,
  type SegmentedControlRootProps,
  segmentedControlRootVariants,
} from "./segmented-control";

// Breadcrumbs
export {
  type BreadcrumbItem,
  Breadcrumbs,
  type BreadcrumbsItemProps,
  type BreadcrumbsRootProps,
  type BreadcrumbsSeparatorProps,
} from "./breadcrumbs";

// Pagination
export {
  Pagination,
  type PaginationEllipsisProps,
  type PaginationItemProps,
  type PaginationNextProps,
  type PaginationPrevProps,
  type PaginationRootProps,
} from "./pagination";

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
