/**
 * Component Tokens
 *
 * Component-level design tokens that map foundation tokens (spacing, typography, radius, shadows)
 * to component-specific usage patterns.
 *
 * These tokens centralize component metrics (heights, padding, icon sizes, border radius)
 * and ensure consistency across the design system.
 */

// Alert tokens
export { ALERT_TOKENS, type AlertVariant } from "./alert";

// Button tokens
export {
  BUTTON_TOKENS,
  type ButtonFontSize,
  type ButtonHeight,
  type ButtonPaddingHorizontal,
  type ButtonPaddingVertical,
  type ButtonShadow,
} from "./button";

// Card tokens
export {
  CARD_TOKENS,
  type CardPadding,
  type CardRadius,
  type CardShadow,
  type CardSize,
  type CardSpacingVertical,
} from "./card";

// Domain tokens
export {
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
} from "./domain";

// Input tokens
export {
  INPUT_TOKENS,
  type InputFontSize,
  type InputHeight,
  type InputPaddingHorizontal,
  type InputPaddingVertical,
  type InputRadius,
  type InputSize,
} from "./input";

// Checkbox tokens
export {
  CHECKBOX_TOKENS,
  type CheckboxSize,
  type CheckboxState,
  type CheckboxVariant,
} from "./checkbox";

// Switch tokens
export { SWITCH_TOKENS, type SwitchSize, type SwitchState, type SwitchVariant } from "./switch";

// Radio tokens
export { RADIO_TOKENS, type RadioSize, type RadioState, type RadioVariant } from "./radio";

// Surface tokens
export {
  SURFACE_TOKENS,
  type SurfacePadding,
  type SurfaceRadius,
  type SurfaceShadow,
  type SurfaceVariant,
} from "./surface";

// Text tokens
export {
  TEXT_TOKENS,
  type TextFontSize,
  type TextFontWeight,
  type TextLetterSpacing,
  type TextLineHeight,
} from "./text";

// Section tokens
export { SECTION_TOKENS, type SectionGap, type SectionPadding } from "./section";

// Overlay tokens
export { OVERLAY_TOKENS, type OverlayBackdropVariant, type OverlayModalSize } from "./overlay";

// Toast tokens
export { TOAST_TOKENS, type ToastVariant } from "./toast";

// Notification tokens
export {
  NOTIFICATION_TOKENS,
  type NotificationPanelWidth,
  type NotificationVariant,
} from "./notifications";

// Navigation tokens
export {
  NAVIGATION_TOKENS,
  type NavigationItemPadding,
  type NavigationListGap,
  type NavigationRadius,
  type NavigationShadow,
  type NavigationSize,
  type NavigationState,
} from "./navigation";

// Menu tokens
export {
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
} from "./menu";

// Popover tokens
export {
  POPOVER_TOKENS,
  type PopoverArrowOffset,
  type PopoverArrowSize,
  type PopoverContentPadding,
  type PopoverContentRadius,
  type PopoverContentShadow,
  type PopoverContentWidth,
} from "./popover";

// Dropdown tokens
export {
  DROPDOWN_TOKENS,
  type DropdownItemSize,
  type DropdownMenuSize,
  type DropdownTriggerSize,
  type DropdownVariant,
} from "./dropdown";

// Tooltip tokens
export { TOOLTIP_TOKENS, type TooltipContentRadius, type TooltipContentShadow } from "./tooltip";

// Data tokens
export {
  DATA_TOKENS,
  type DataListLabelWidth,
  type DataListRowPadding,
  type EmptyStateIconSize,
  type SkeletonAnimation,
  type SkeletonBackground,
  type SkeletonVariant,
  type TableCellPadding,
  type TableGap,
  type TableHeaderPadding,
  type TableRowHeight,
  type TableShadow,
} from "./data";

// Icon tokens
export { ICON_TOKENS, type IconColor, type IconSize, type IconStroke } from "./icon";

// Motion tokens
export {
  MOTION_TOKENS,
  type MotionAnimation,
  type MotionDuration,
  type MotionEasing,
  type MotionTransition,
  type MotionTransitionPreset,
} from "./motion";
