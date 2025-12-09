"use client";

// ============================================================================
// DESIGN TOKENS
// ============================================================================
// All design tokens (colors, typography, spacing, shadows, radius, motion)
export * from "./tokens";

// Icon tokens
export {
  ICON_TOKENS,
  type IconColor,
  type IconSize,
  type IconStroke,
} from "./tokens/components/icon";

// ============================================================================
// UI COMPONENTS
// ============================================================================
// Button component (CVA-based, token-driven)
export { Button, buttonVariants, type ButtonProps } from "./components/ui/button";

// Text component (CVA-based, token-driven)
export {
  Text,
  textVariants,
  type TextProps,
  type TextSize,
  type TextWeight,
} from "./components/ui/text";

// Alert component (CVA-based, token-driven)
export { Alert, alertVariants, type AlertProps } from "./components/ui/alert";

// Typography components (CVA-based, token-driven)
export { Body, bodyVariants, type BodyProps } from "./components/ui/body";
export { Caption, captionVariants, type CaptionProps } from "./components/ui/caption";
export { Code, codeVariants, type CodeProps } from "./components/ui/code";
export { Display, displayVariants, type DisplayProps } from "./components/ui/display";
export { Heading, headingVariants, type HeadingProps } from "./components/ui/heading";
export { Lead, leadVariants, type LeadProps } from "./components/ui/lead";

// Form components (CVA-based, token-driven)
export { Checkbox, checkboxVariants, type CheckboxProps } from "./components/checkbox";
export { Input, inputVariants, type InputProps } from "./components/input";
export {
  Radio,
  RadioGroup,
  radioVariants,
  type RadioGroupProps,
  type RadioProps,
} from "./components/radio";
export {
  Select,
  SelectListbox,
  selectListboxVariants,
  SelectOption,
  selectOptionVariants,
  SelectRoot,
  SelectTrigger,
  selectTriggerVariants,
  type SelectListboxProps,
  type SelectOptionProps,
  type SelectRootProps,
  type SelectSize,
  type SelectTriggerProps,
  type SelectVariant,
} from "./components/select";
export { Textarea, textareaVariants, type TextareaProps } from "./components/textarea";
export {
  Field,
  type FieldControlProps,
  type FieldDescriptionProps,
  type FieldErrorProps,
  type FieldLabelProps,
  type FieldProps,
} from "./components/ui/field";
export { Label, labelVariants, type LabelProps } from "./components/ui/label";

// ============================================================================
// LAYOUT PRIMITIVES
// ============================================================================
// Layout primitives (token-based, no raw values)
export {
  Box,
  Column,
  Flex,
  Grid,
  Row,
  Stack,
  Surface,
  surfaceVariants,
  type BoxProps,
  type ColumnProps,
  type FlexProps,
  type GridProps,
  type RowProps,
  type StackProps,
  type SurfaceProps,
} from "./components/layout";

// ============================================================================
// CONTAINER COMPONENTS
// ============================================================================
// Container components (token-driven: Surface, Card, Section)
export {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Surface as ContainerSurface,
  surfaceVariants as containerSurfaceVariants,
  Section,
  type CardBodyProps,
  type CardFooterProps,
  type CardHeaderProps,
  type CardProps,
  type SurfaceProps as ContainerSurfaceProps,
  type SectionProps,
} from "./components/containers";

// ============================================================================
// OVERLAY SYSTEM
// ============================================================================
// Overlay components (Portal, Backdrop, Modal, Dialog, Toast)
export {
  Backdrop,
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  modalVariants,
  Portal,
  Toast,
  ToastProvider,
  ToastViewport,
  useToast,
  type BackdropProps,
  type DialogBodyProps,
  type DialogDescriptionProps,
  type DialogFooterProps,
  type DialogHeaderProps,
  type DialogProps,
  type DialogTitleProps,
  type ModalBodyProps,
  type ModalFooterProps,
  type ModalHeaderProps,
  type ModalProps,
  type PortalProps,
  type ToastAction,
  type ToastData,
  type ToastOptions,
  type ToastPosition,
  type ToastProps,
  type ToastProviderProps,
  type ToastViewportProps,
} from "./components/overlays";

// ============================================================================
// NOTIFICATION SYSTEM
// ============================================================================
// Notification Center components (Provider, Panel, Trigger, List, Item, etc.)
export {
  NotificationCenter,
  NotificationCenterDismissAll,
  NotificationCenterGroupHeader,
  NotificationCenterItem,
  NotificationCenterList,
  NotificationCenterPanel,
  NotificationCenterProvider,
  NotificationCenterTrigger,
  useNotificationCenter,
  useNotificationCenterContext,
  type GroupByFunction,
  type NotificationCenterDismissAllProps,
  type NotificationCenterGroupHeaderProps,
  type NotificationCenterItemProps,
  type NotificationCenterListProps,
  type NotificationCenterPanelProps,
  type NotificationCenterProviderProps,
  type NotificationCenterTriggerProps,
  type NotificationChannel,
  type NotificationContextType,
  type NotificationData,
  type NotificationOptions,
  type NotificationVariant,
} from "./components/notifications";

// ============================================================================
// MENU SYSTEM
// ============================================================================
// Menu components (Popover, DropdownMenu, HoverCard, ContextMenu)
export {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  // ContextMenu
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuTrigger,
  DropdownMenuCheckItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  // DropdownMenu
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  HoverCardContent,
  // HoverCard
  HoverCardRoot,
  HoverCardTrigger,
  PopoverArrow,
  PopoverContent,
  popoverContentVariants,
  // Popover
  PopoverRoot,
  PopoverTrigger,
  type ContextMenuContentProps,
  type ContextMenuGroupProps,
  type ContextMenuItemProps,
  type ContextMenuLabelProps,
  type ContextMenuRootProps,
  type ContextMenuSeparatorProps,
  type ContextMenuTriggerProps,
  type DropdownMenuCheckItemProps,
  type DropdownMenuContentProps,
  type DropdownMenuGroupProps,
  type DropdownMenuItemProps,
  type DropdownMenuLabelProps,
  type DropdownMenuRadioGroupProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuRootProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuSubContentProps,
  type DropdownMenuSubProps,
  type DropdownMenuSubTriggerProps,
  type DropdownMenuTriggerProps,
  type HoverCardContentProps,
  type HoverCardRootProps,
  type HoverCardTriggerProps,
  type PopoverArrowProps,
  type PopoverContentProps,
  type PopoverRootProps,
  type PopoverTriggerProps,
} from "./components/menus";

// ============================================================================
// DATA DISPLAY COMPONENTS
// ============================================================================
// Data components (Table, DataList, Skeleton, EmptyState)
export {
  DataList,
  DataListItem,
  DataListLabel,
  DataListRoot,
  DataListValue,
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
  Skeleton,
  skeletonVariants,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableExpandableContent,
  TableHead,
  TableHeader,
  TableLoadingState,
  TableRoot,
  TableRow,
  TableSortIcon,
  useTableContext,
  type DataListItemProps,
  type DataListLabelProps,
  type DataListRootProps,
  type DataListValueProps,
  type EmptyStateActionProps,
  type EmptyStateDescriptionProps,
  type EmptyStateIconProps,
  type EmptyStateProps,
  type EmptyStateTitleProps,
  type SkeletonProps,
  type SortDirection,
  type SortState,
  type TableBodyProps,
  type TableCellProps,
  type TableColumn,
  type TableContextValue,
  type TableEmptyProps,
  type TableExpandableContentProps,
  type TableHeaderProps,
  type TableHeadProps,
  type TableLoadingStateProps,
  type TableRootProps,
  type TableRowProps,
  type TableSortIconProps,
} from "./components/data";

// ============================================================================
// NAVIGATION SYSTEM
// ============================================================================
// Navigation components (Tabs, SegmentedControl, Breadcrumbs, Pagination, Stepper)
export {
  Breadcrumbs,
  Pagination,
  SegmentedControl,
  segmentedControlItemVariants,
  segmentedControlRootVariants,
  Stepper,
  Tabs,
  tabsListVariants,
  tabsTriggerVariants,
  type BreadcrumbItem,
  type BreadcrumbsItemProps,
  type BreadcrumbsRootProps,
  type BreadcrumbsSeparatorProps,
  type PaginationEllipsisProps,
  type PaginationItemProps,
  type PaginationNextProps,
  type PaginationPrevProps,
  type PaginationRootProps,
  type SegmentedControlItemProps,
  type SegmentedControlRootProps,
  type StepperContentProps,
  type StepperIndicatorProps,
  type StepperItemProps,
  type StepperLabelProps,
  type StepperRootProps,
  type StepperStep,
  type TabsContentProps,
  type TabsListProps,
  type TabsRootProps,
  type TabsTriggerProps,
} from "./components/navigation";

// ============================================================================
// ICON SYSTEM
// ============================================================================
// Icon component and icon registry
export { Icon, iconVariants, type IconProps } from "./components/icon";

// Icon registry exports (tree-shakeable)
export {
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconClose,
  IconError,
  IconInfo,
  IconMenu,
  ICONS_MAP,
  IconSearch,
  IconSuccess,
  IconWarning,
  type IconProps as IconComponentProps,
  type IconName,
} from "./icons";
