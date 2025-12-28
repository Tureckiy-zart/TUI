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
} from "./FOUNDATION/tokens";
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
} from "./FOUNDATION/tokens";

// Component tokens
export {
  ALERT_TOKENS,
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
  type MotionDuration as ComponentMotionDuration,
  type MotionEasing as ComponentMotionEasing,
  type MotionTransition as ComponentMotionTransition,
  DATA_TOKENS,
  type DataListLabelWidth,
  type DataListRowPadding,
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
} from "./FOUNDATION/tokens";

// Icon tokens (explicit export)
export { ICON_TOKENS, type IconColor, type IconSize, type IconStroke } from "./FOUNDATION/tokens";

// CSS Variables
export {
  allCSSVariables,
  allCSSVariablesCSS,
  generateCSSVariablesCSS,
  tokenSystemSummary,
} from "./FOUNDATION/tokens";

// Motion tokens
export type {
  MotionCombinedType,
  MotionDuration,
  MotionEasing,
  MotionSlideDirection,
  MotionTransition,
} from "./FOUNDATION/tokens";
export {
  motionCombined,
  motionCSSVariables,
  motionDurations,
  motionEasings,
  motionFade,
  motionReducedMotion,
  motionScale,
  motionSlide,
  motionTailwindConfig,
  motionTransitionProperty,
  motionTransitions,
} from "./FOUNDATION/tokens";

// Radius tokens
export type { BorderRadius, ComponentRadius } from "./FOUNDATION/tokens";
export {
  borderRadius,
  componentRadius,
  radiusCSSVariables,
  tailwindRadiusConfig,
} from "./FOUNDATION/tokens";

// Shadow tokens
export type { ColoredShadow, ElevationShadow, FocusRing, GlowEffect } from "./FOUNDATION/tokens";
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
} from "./FOUNDATION/tokens";

// Spacing tokens
export type {
  ComponentSpacing,
  ContainerSpacing,
  GridSpacing,
  SectionSpacing,
  SemanticSpacing,
  Spacing,
  StackSpacing,
} from "./FOUNDATION/tokens";
export {
  layoutSpacing,
  semanticSpacing,
  spacing,
  spacingCSSVariables,
  tailwindSpacingConfig,
} from "./FOUNDATION/tokens";

// Theme tokens
export { UI_COLORS } from "./FOUNDATION/tokens";

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
} from "./FOUNDATION/tokens";
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
} from "./FOUNDATION/tokens";

// ============================================================================
// UI COMPONENTS
// ============================================================================
// Button component (CVA-based, token-driven)
export { Button, type ButtonProps } from "./PRIMITIVES/Button";

// Text component (CVA-based, token-driven)
export {
  Text,
  type TextProps,
  type TextSize,
  textVariants,
  type TextWeight,
} from "./PRIMITIVES/Text";

// Alert component (tokenCVA-based, token-driven)
export {
  Alert,
  ALERT_VARIANTS,
  type AlertProps,
  type AlertVariant,
  alertVariants,
} from "./PRIMITIVES/Alert";

// Link component (CVA-based, token-driven)
export {
  Link,
  type LinkProps,
  type LinkSize,
  type LinkVariant,
  linkVariants,
} from "./PRIMITIVES/Link";

// NavLink component (Navigation primitive built on Link)
export { NavLink, type NavLinkProps } from "./PRIMITIVES/NavLink";

// Badge component (CVA-based, token-driven)
export {
  Badge,
  BADGE_VARIANTS,
  type BadgeProps,
  type BadgeVariant,
  badgeVariants,
} from "./PRIMITIVES/Badge";

// Typography components (CVA-based, token-driven)
export { Heading, type HeadingProps, headingVariants } from "./PRIMITIVES/Heading";

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
  SelectTrigger,
  type SelectTriggerProps,
  SelectValue,
  type SelectValueProps,
  SelectViewport,
  type SelectViewportProps,
} from "./COMPOSITION/controls/Select";

// Avatar component (Radix-based, token-driven)
export {
  Avatar,
  AvatarGroup,
  type AvatarGroupProps,
  type AvatarGroupSpacing,
  type AvatarProps,
  type AvatarShape,
  type AvatarSize,
  type AvatarStatus,
} from "./COMPOSITION/controls/Avatar";

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
  type ModalSize,
  ModalTitle,
  type ModalTitleProps,
  ModalTrigger,
  type ModalTriggerProps,
} from "./COMPOSITION/overlays/Modal";
// Note: ModalPortal is internal-only and not exported

// Form components (CVA-based, token-driven)
export {
  RangeSlider,
  type RangeSliderProps,
  type RangeSliderSize,
  type RangeSliderVariant,
} from "./COMPOSITION/controls/RangeSlider";
export {
  Slider,
  type SliderProps,
  type SliderSize,
  type SliderVariant,
} from "./COMPOSITION/controls/Slider";
export { Checkbox, type CheckboxProps, checkboxVariants } from "./PRIMITIVES/Checkbox";
export {
  Field,
  type FieldControlProps,
  type FieldDescriptionProps,
  type FieldErrorProps,
  type FieldLabelProps,
  type FieldProps,
} from "./PRIMITIVES/Field";
export { Input, type InputProps, inputVariants } from "./PRIMITIVES/Input";
export { Label, type LabelProps } from "./PRIMITIVES/Label";
export {
  Radio,
  RadioGroup,
  type RadioGroupProps,
  type RadioProps,
  radioVariants,
} from "./PRIMITIVES/Radio";
export { Textarea, type TextareaProps, textareaVariants } from "./PRIMITIVES/Textarea";

// Skeleton component (token-driven)
export {
  Skeleton,
  type SkeletonProps,
  type SkeletonVariant,
  skeletonVariants,
} from "./PRIMITIVES/Skeleton";

// Progress component (token-driven)
export { Progress, type ProgressProps, type ProgressSize } from "./PRIMITIVES/Progress";

// Separator component (Radix-based, token-driven)
export {
  Separator,
  type SeparatorProps,
  separatorVariants,
} from "./COMPOSITION/controls/Separator";

// AspectRatio component (Radix-based, layout utility)
export {
  ASPECT_RATIO_PRESETS,
  AspectRatio,
  type AspectRatioPreset,
  type AspectRatioProps,
} from "./COMPOSITION/controls/AspectRatio";

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
} from "./COMPOSITION/layout";

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
} from "./COMPOSITION/layout";

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
  Toaster,
  type ToastOptions,
  type ToastPosition,
  type ToastProps,
  ToastProvider,
  type ToastProviderProps,
  ToastViewport,
  type ToastViewportProps,
  useToast,
} from "./COMPOSITION/overlays";

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
} from "./DOMAIN/notifications/notifications";

// ============================================================================
// MENU SYSTEM
// ============================================================================
// Menu components (HoverCard)
export {
  HoverCardContent,
  type HoverCardContentProps,
  // HoverCard
  HoverCardRoot,
  type HoverCardRootProps,
  HoverCardTrigger,
  type HoverCardTriggerProps,
} from "./PATTERNS/menus/menus";

// ContextMenu components
export {
  ContextMenu,
  ContextMenuCheckboxItem,
  type ContextMenuCheckboxItemProps,
  ContextMenuContent,
  type ContextMenuContentProps,
  ContextMenuItem,
  type ContextMenuItemProps,
  ContextMenuLabel,
  type ContextMenuLabelProps,
  ContextMenuRadioGroup,
  type ContextMenuRadioGroupProps,
  ContextMenuRadioItem,
  type ContextMenuRadioItemProps,
  ContextMenuRoot,
  type ContextMenuRootProps,
  ContextMenuSeparator,
  type ContextMenuSeparatorProps,
  ContextMenuSub,
  ContextMenuSubContent,
  type ContextMenuSubContentProps,
  type ContextMenuSubProps,
  ContextMenuSubTrigger,
  type ContextMenuSubTriggerProps,
  ContextMenuTrigger,
  type ContextMenuTriggerProps,
} from "./COMPOSITION/overlays";

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
  type SortDirection,
  type SortState,
  TableRoot as Table,
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
} from "./PATTERNS";

// ============================================================================
// NAVIGATION SYSTEM
// ============================================================================
// Navigation components (Tabs, SegmentedControl, Breadcrumbs, Pagination, Stepper, NavRoot)
export {
  type BreadcrumbItem,
  Breadcrumbs,
  type BreadcrumbsItemProps,
  type BreadcrumbsRootProps,
  type BreadcrumbsSeparatorProps,
  NavItem,
  type NavItemProps,
  NavList,
  type NavListProps,
  NavRoot,
  type NavRootProps,
  NavSeparator,
  type NavSeparatorProps,
  NavText,
  type NavTextProps,
  Pagination,
  type PaginationEllipsisProps,
  type PaginationItemProps,
  type PaginationNextProps,
  type PaginationPrevProps,
  type PaginationRootProps,
  SegmentedControl,
  type SegmentedControlItemProps,
  segmentedControlItemVariants,
  type SegmentedControlOrientation,
  type SegmentedControlRootProps,
  segmentedControlRootVariants,
  type SegmentedControlSize,
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
} from "./COMPOSITION/navigation";

// ============================================================================
// ICON SYSTEM
// ============================================================================
// Icon component and icon registry
export { Icon, type IconProps, iconVariants } from "./PRIMITIVES/Icon";

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
