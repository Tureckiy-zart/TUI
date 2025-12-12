"use client";

// ============================================================================
// RESPONSIVE TYPES
// ============================================================================
// Canonical responsive typing primitives
export type { Breakpoint, Responsive } from "./types/responsive";

// ============================================================================
// DESIGN TOKENS
// ============================================================================
// All design tokens (colors, typography, spacing, shadows, radius, motion)
// Explicit exports to avoid barrel leaks

// Color tokens
export type {
  BaseColorTokens,
  ChartColors,
  ColorScale,
  ColorTokens,
  Mode,
  SemanticColors,
  SurfaceColors,
  TextColors,
} from "./tokens";
export {
  accentColors,
  baseColors,
  chartColors,
  colorCSSVariables,
  cssVariableColorTokens,
  primaryColors,
  secondaryColors,
  semanticColors,
  surfaceColors,
  tailwindThemeColors,
  textColors,
} from "./tokens";

// Component tokens
export {
  ALERT_TOKENS,
  type AlertVariant,
  BUTTON_TOKENS,
  type ButtonFontSize,
  type ButtonHeight,
  type ButtonPaddingHorizontal,
  type ButtonPaddingVertical,
  type ButtonShadow,
  CARD_TOKENS,
  type CardPadding,
  type CardRadius,
  type CardShadow,
  type CardSize,
  type CardSpacingVertical,
  CHECKBOX_TOKENS,
  type CheckboxSize,
  type CheckboxState,
  type CheckboxVariant,
  DATA_TOKENS,
  type DataListLabelWidth,
  type DataListRowPadding,
  DOMAIN_TOKENS,
  type DomainCardBadge,
  type DomainCardImage,
  type DomainCardLayout,
  type DomainCardMetadata,
  type DomainCardMotion,
  type DomainCardPriceCapacity,
  type DomainCardSkeleton,
  type DomainCardSkeletonContentWidth,
  type DomainCardSurface,
  DROPDOWN_TOKENS,
  type DropdownItemSize,
  type DropdownMenuSize,
  type DropdownTriggerSize,
  type DropdownVariant,
  type EmptyStateIconSize,
  INPUT_TOKENS,
  type InputFontSize,
  type InputHeight,
  type InputPaddingHorizontal,
  type InputPaddingVertical,
  type InputRadius,
  type InputSize,
  MENU_TOKENS,
  type MenuContentMinWidth,
  type MenuContentPadding,
  type MenuContentRadius,
  type MenuContentShadow,
  type MenuIndicatorOffset,
  type MenuIndicatorSize,
  type MenuItemGap,
  type MenuItemHeight,
  type MenuItemPadding,
  type MenuItemRadius,
  type MenuLabelPadding,
  type MenuSeparatorMargin,
  MOTION_TOKENS,
  type MotionAnimation,
  type MotionDuration,
  type MotionEasing,
  type MotionTransition,
  type MotionTransitionPreset,
  NAVIGATION_TOKENS,
  type NavigationItemPadding,
  type NavigationListGap,
  type NavigationRadius,
  type NavigationShadow,
  type NavigationSize,
  type NavigationState,
  NOTIFICATION_TOKENS,
  type NotificationPanelWidth,
  type NotificationVariant as NotificationTokenVariant,
  OVERLAY_TOKENS,
  type OverlayBackdropVariant,
  type OverlayModalSize,
  POPOVER_TOKENS,
  type PopoverArrowOffset,
  type PopoverArrowSize,
  type PopoverContentPadding,
  type PopoverContentRadius,
  type PopoverContentShadow,
  type PopoverContentWidth,
  RADIO_TOKENS,
  type RadioSize,
  type RadioState,
  type RadioVariant,
  SECTION_TOKENS,
  type SectionGap,
  type SectionPadding,
  type SkeletonAnimation,
  type SkeletonBackground,
  type SkeletonVariant,
  SURFACE_TOKENS,
  type SurfacePadding,
  type SurfaceRadius,
  type SurfaceShadow,
  type SurfaceVariant,
  SWITCH_TOKENS,
  type SwitchSize,
  type SwitchState,
  type SwitchVariant,
  type TableCellPadding,
  type TableGap,
  type TableHeaderPadding,
  type TableRowHeight,
  type TableShadow,
  TEXT_TOKENS,
  type TextFontSize,
  type TextFontWeight,
  type TextLetterSpacing,
  type TextLineHeight,
  TOAST_TOKENS,
  type ToastVariant,
  TOOLTIP_TOKENS,
  type TooltipContentRadius,
  type TooltipContentShadow,
} from "./tokens";

// Icon tokens (explicit export)
export { ICON_TOKENS, type IconColor, type IconSize, type IconStroke } from "./tokens";

// CSS Variables
export {
  allCSSVariables,
  allCSSVariablesCSS,
  generateCSSVariablesCSS,
  tokenSystemSummary,
} from "./tokens";

// Motion tokens
export type {
  Animation,
  Duration,
  Easing,
  Keyframe,
  MotionV2CombinedType,
  MotionV2Duration,
  MotionV2Easing,
  MotionV2SlideDirection,
  MotionV2Transition,
  Spring,
  Transition,
} from "./tokens";
export {
  animations,
  durations,
  easings,
  keyframes,
  motionCSSVariables,
  motionV2Combined,
  motionV2CSSVariables,
  motionV2Durations,
  motionV2Easings,
  motionV2Fade,
  motionV2Scale,
  motionV2Slide,
  motionV2TailwindConfig,
  motionV2Transitions,
  reducedMotion,
  springs,
  tailwindMotionConfig,
  transitions,
} from "./tokens";

// Radius tokens
export type { BorderRadius, ComponentRadius } from "./tokens";
export { borderRadius, componentRadius, radiusCSSVariables, tailwindRadiusConfig } from "./tokens";

// Shadow tokens
export type { ColoredShadow, ElevationShadow, FocusRing, GlowEffect } from "./tokens";
export {
  accentColoredShadows,
  componentShadowMapping,
  elevationShadows,
  focusRings,
  glowEffects,
  primaryColoredShadows,
  shadowBase,
  shadowCSSVariables,
  shadowOpacity,
  tailwindShadowConfig,
} from "./tokens";

// Spacing tokens
export type {
  ComponentSpacing,
  ContainerSpacing,
  GridSpacing,
  SectionSpacing,
  SemanticSpacing,
  Spacing,
  StackSpacing,
} from "./tokens";
export {
  layoutSpacing,
  semanticSpacing,
  spacing,
  spacingCSSVariables,
  tailwindSpacingConfig,
} from "./tokens";

// Theme tokens
export { UI_COLORS } from "./tokens";

// Typography tokens
export type {
  CanonicalFontSize,
  CanonicalFontWeight,
  CanonicalLetterSpacing,
  CanonicalLineHeight,
  CanonicalTextColor,
  FontFamily,
  FontSize,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TextStyle,
} from "./tokens";
export {
  fontFamily,
  fontSize,
  fontSizeWithMd,
  fontWeight,
  letterSpacing,
  lineHeight,
  tailwindTypographyConfig,
  textStyles,
  typographyCSSVariables,
} from "./tokens";

// ============================================================================
// UI COMPONENTS
// ============================================================================
// Button component (CVA-based, token-driven)
export { Button, type ButtonProps, buttonVariants } from "./components/ui/button";

// Text component (CVA-based, token-driven)
export {
  Text,
  type TextProps,
  type TextSize,
  textVariants,
  type TextWeight,
} from "./components/ui/text";

// Alert component (CVA-based, token-driven)
export { Alert, type AlertProps, alertVariants } from "./components/ui/alert";

// Typography components (CVA-based, token-driven)
export { Body, type BodyProps, bodyVariants } from "./components/ui/body";
export { Caption, type CaptionProps, captionVariants } from "./components/ui/caption";
export { Code, type CodeProps, codeVariants } from "./components/ui/code";
export { Display, type DisplayProps, displayVariants } from "./components/ui/display";
export { Heading, type HeadingProps, headingVariants } from "./components/ui/heading";
export { Lead, type LeadProps, leadVariants } from "./components/ui/lead";

// Select component (Radix-based, token-driven)
export {
  Select,
  SelectContent,
  type SelectContentProps,
  SelectGroup,
  type SelectGroupProps,
  SelectIcon,
  type SelectIconProps,
  SelectItem,
  SelectItemIndicator,
  type SelectItemIndicatorProps,
  type SelectItemProps,
  SelectItemText,
  type SelectItemTextProps,
  SelectLabel,
  type SelectLabelProps,
  SelectRoot,
  type SelectRootProps,
  SelectSeparator,
  type SelectSeparatorProps,
  type SelectSize,
  type SelectState,
  SelectTrigger,
  type SelectTriggerProps,
  SelectValue,
  type SelectValueProps,
  type SelectVariant,
  SelectViewport,
  type SelectViewportProps,
  type SelectWidth,
} from "./components/select";

// Modal component (Radix-based, token-driven)
export {
  Modal,
  ModalClose,
  type ModalCloseProps,
  ModalContent,
  type ModalContentProps,
  ModalDescription,
  type ModalDescriptionProps,
  ModalFooter,
  type ModalFooterProps,
  ModalHeader,
  type ModalHeaderProps,
  ModalOverlay,
  type ModalOverlayProps,
  ModalRoot,
  type ModalRootProps,
  ModalTitle,
  type ModalTitleProps,
  ModalTrigger,
  type ModalTriggerProps,
} from "./components/modal";
// Note: ModalPortal is internal-only and not exported

// Form components (CVA-based, token-driven)
export { Checkbox, type CheckboxProps, checkboxVariants } from "./components/checkbox";
export { Input, type InputProps, inputVariants } from "./components/input";
export {
  Radio,
  RadioGroup,
  type RadioGroupProps,
  type RadioProps,
  radioVariants,
} from "./components/radio";
export { Textarea, type TextareaProps, textareaVariants } from "./components/textarea";
export {
  Field,
  type FieldControlProps,
  type FieldDescriptionProps,
  type FieldErrorProps,
  type FieldLabelProps,
  type FieldProps,
} from "./components/ui/field";
export { Label, type LabelProps, labelVariants } from "./components/ui/label";

// ============================================================================
// LAYOUT PRIMITIVES
// ============================================================================
// Layout primitives (token-based, no raw values)
export {
  Box,
  type BoxProps,
  Column,
  type ColumnProps,
  Container,
  type ContainerProps,
  Flex,
  type FlexProps,
  Grid,
  type GridProps,
  Row,
  type RowProps,
  Stack,
  type StackProps,
  Surface,
  type SurfaceProps,
  surfaceVariants,
} from "./components/layout";

// ============================================================================
// CONTAINER COMPONENTS
// ============================================================================
// Container components (token-driven: Surface, Card, Section)
export {
  Card,
  CardBody,
  type CardBodyProps,
  CardFooter,
  type CardFooterProps,
  CardHeader,
  type CardHeaderProps,
  type CardProps,
  Surface as ContainerSurface,
  type SurfaceProps as ContainerSurfaceProps,
  surfaceVariants as containerSurfaceVariants,
  Section,
  type SectionProps,
} from "./components/containers";

// ============================================================================
// OVERLAY SYSTEM
// ============================================================================
// Overlay components (Portal, Backdrop, Dialog, Toast)
// Note: Modal is exported from ./components/modal, not ./components/overlays
export {
  Backdrop,
  type BackdropProps,
  Dialog,
  DialogBody,
  type DialogBodyProps,
  DialogDescription,
  type DialogDescriptionProps,
  DialogFooter,
  type DialogFooterProps,
  DialogHeader,
  type DialogHeaderProps,
  type DialogProps,
  DialogRoot,
  DialogTitle,
  type DialogTitleProps,
  Portal,
  type PortalProps,
  Toast,
  type ToastAction,
  type ToastData,
  type ToastOptions,
  type ToastPosition,
  type ToastProps,
  ToastProvider,
  type ToastProviderProps,
  ToastViewport,
  type ToastViewportProps,
  useToast,
} from "./components/overlays";

// ============================================================================
// NOTIFICATION SYSTEM
// ============================================================================
// Notification Center components (Provider, Panel, Trigger, List, Item, etc.)
export {
  type GroupByFunction,
  NotificationCenter,
  NotificationCenterDismissAll,
  type NotificationCenterDismissAllProps,
  NotificationCenterGroupHeader,
  type NotificationCenterGroupHeaderProps,
  NotificationCenterItem,
  type NotificationCenterItemProps,
  NotificationCenterList,
  type NotificationCenterListProps,
  NotificationCenterPanel,
  type NotificationCenterPanelProps,
  NotificationCenterProvider,
  type NotificationCenterProviderProps,
  NotificationCenterTrigger,
  type NotificationCenterTriggerProps,
  type NotificationChannel,
  type NotificationContextType,
  type NotificationData,
  type NotificationOptions,
  type NotificationVariant,
  useNotificationCenter,
  useNotificationCenterContext,
} from "./components/notifications";

// ============================================================================
// MENU SYSTEM
// ============================================================================
// Menu components (Popover, DropdownMenu, HoverCard, ContextMenu)
export {
  ContextMenuContent,
  type ContextMenuContentProps,
  ContextMenuGroup,
  type ContextMenuGroupProps,
  ContextMenuItem,
  type ContextMenuItemProps,
  ContextMenuLabel,
  type ContextMenuLabelProps,
  // ContextMenu
  ContextMenuRoot,
  type ContextMenuRootProps,
  ContextMenuSeparator,
  type ContextMenuSeparatorProps,
  ContextMenuTrigger,
  type ContextMenuTriggerProps,
  DropdownMenuCheckItem,
  type DropdownMenuCheckItemProps,
  DropdownMenuContent,
  type DropdownMenuContentProps,
  DropdownMenuGroup,
  type DropdownMenuGroupProps,
  DropdownMenuItem,
  type DropdownMenuItemProps,
  DropdownMenuLabel,
  type DropdownMenuLabelProps,
  DropdownMenuRadioGroup,
  type DropdownMenuRadioGroupProps,
  DropdownMenuRadioItem,
  type DropdownMenuRadioItemProps,
  // DropdownMenu
  DropdownMenuRoot,
  type DropdownMenuRootProps,
  DropdownMenuSeparator,
  type DropdownMenuSeparatorProps,
  DropdownMenuSub,
  DropdownMenuSubContent,
  type DropdownMenuSubContentProps,
  type DropdownMenuSubProps,
  DropdownMenuSubTrigger,
  type DropdownMenuSubTriggerProps,
  DropdownMenuTrigger,
  type DropdownMenuTriggerProps,
  HoverCardContent,
  type HoverCardContentProps,
  // HoverCard
  HoverCardRoot,
  type HoverCardRootProps,
  HoverCardTrigger,
  type HoverCardTriggerProps,
  PopoverArrow,
  type PopoverArrowProps,
  PopoverContent,
  type PopoverContentProps,
  popoverContentVariants,
  // Popover
  PopoverRoot,
  type PopoverRootProps,
  PopoverTrigger,
  type PopoverTriggerProps,
} from "./components/menus";

// ============================================================================
// DATA DISPLAY COMPONENTS
// ============================================================================
// Data components (Table, DataList, Skeleton, EmptyState)
export {
  DataList,
  DataListItem,
  type DataListItemProps,
  DataListLabel,
  type DataListLabelProps,
  DataListRoot,
  type DataListRootProps,
  DataListValue,
  type DataListValueProps,
  EmptyState,
  EmptyStateAction,
  type EmptyStateActionProps,
  EmptyStateDescription,
  type EmptyStateDescriptionProps,
  EmptyStateIcon,
  type EmptyStateIconProps,
  type EmptyStateProps,
  EmptyStateTitle,
  type EmptyStateTitleProps,
  Skeleton,
  type SkeletonProps,
  skeletonVariants,
  type SortDirection,
  type SortState,
  Table,
  TableBody,
  type TableBodyProps,
  TableCell,
  type TableCellProps,
  type TableColumn,
  type TableContextValue,
  TableEmpty,
  type TableEmptyProps,
  TableExpandableContent,
  type TableExpandableContentProps,
  TableHead,
  TableHeader,
  type TableHeaderProps,
  type TableHeadProps,
  TableLoadingState,
  type TableLoadingStateProps,
  TableRoot,
  type TableRootProps,
  TableRow,
  type TableRowProps,
  TableSortIcon,
  type TableSortIconProps,
  useTableContext,
} from "./components/data";

// ============================================================================
// NAVIGATION SYSTEM
// ============================================================================
// Navigation components (Tabs, SegmentedControl, Breadcrumbs, Pagination, Stepper)
export {
  type BreadcrumbItem,
  Breadcrumbs,
  type BreadcrumbsItemProps,
  type BreadcrumbsRootProps,
  type BreadcrumbsSeparatorProps,
  Pagination,
  type PaginationEllipsisProps,
  type PaginationItemProps,
  type PaginationNextProps,
  type PaginationPrevProps,
  type PaginationRootProps,
  SegmentedControl,
  type SegmentedControlItemProps,
  segmentedControlItemVariants,
  type SegmentedControlRootProps,
  segmentedControlRootVariants,
  Stepper,
  type StepperContentProps,
  type StepperIndicatorProps,
  type StepperItemProps,
  type StepperLabelProps,
  type StepperRootProps,
  type StepperStep,
  Tabs,
  type TabsContentProps,
  type TabsListProps,
  type TabsRootProps,
  type TabsTriggerProps,
} from "./components/navigation";

// ============================================================================
// ICON SYSTEM
// ============================================================================
// Icon component and icon registry
export { Icon, type IconProps, iconVariants } from "./components/icon";

// Icon registry exports (tree-shakeable)
export {
  IconArrowRight,
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconClose,
  type IconProps as IconComponentProps,
  IconError,
  IconInfo,
  IconLocation,
  IconMenu,
  type IconName,
  ICONS_MAP,
  IconSearch,
  IconSuccess,
  IconWarning,
} from "./icons";

// ============================================================================
// DOMAIN COMPONENTS
// ============================================================================
// Domain-specific card components (EventCard, VenueCard, TicketCard, etc.)
export type { ArtistCardProps } from "./components/cards/ArtistCard";
export { ArtistCard } from "./components/cards/ArtistCard";
export type {
  ArtistCardSize,
  ArtistCardVariant,
} from "./components/cards/ArtistCard/ArtistCard.types";
export type { EventCardProps } from "./components/cards/EventCard";
export { EventCard } from "./components/cards/EventCard";
export type { EventCardSize, EventCardVariant } from "./components/cards/EventCard/EventCard.types";
export type { PromoCardProps } from "./components/cards/PromoCard";
export { PromoCard } from "./components/cards/PromoCard";
export type { PromoCardSize, PromoCardVariant } from "./components/cards/PromoCard/PromoCard.types";
export type { TicketCardProps } from "./components/cards/TicketCard";
export { TicketCard } from "./components/cards/TicketCard";
export type {
  TicketAvailability,
  TicketCardSize,
  TicketCardVariant,
} from "./components/cards/TicketCard/TicketCard.types";
