/**
 * Token System Exports
 *
 * Central export point for all design tokens.
 * All exports are explicit to avoid barrel leaks.
 */

// ============================================================================
// COLORS
// ============================================================================
export type {
  BaseColorTokens,
  ChartColors,
  ColorScale,
  ColorTokens,
  Mode,
  SemanticColors,
  SurfaceColors,
  TextColors,
} from "./colors";

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
} from "./colors";

// ============================================================================
// COMPONENTS
// ============================================================================
// Component tokens (already has explicit exports)
export {
  ALERT_TOKENS,
  ARTIST_TOKENS,
  BUTTON_TOKENS,
  CARD_TOKENS,
  CHECKBOX_TOKENS,
  DATA_TOKENS,
  DOMAIN_TOKENS,
  DROPDOWN_TOKENS,
  ICON_TOKENS,
  INPUT_TOKENS,
  MENU_TOKENS,
  MOTION_TOKENS,
  NAVIGATION_TOKENS,
  NOTIFICATION_TOKENS,
  OVERLAY_TOKENS,
  POPOVER_TOKENS,
  RADIO_TOKENS,
  SECTION_TOKENS,
  SELECT_TOKENS,
  SURFACE_TOKENS,
  SWITCH_TOKENS,
  TEXT_TOKENS,
  TOAST_TOKENS,
  TOOLTIP_TOKENS,
  type AlertVariant,
  type ArtistCardFooterBorder,
  type ArtistCardImageContainer,
  type ArtistCardImagePlaceholder,
  type ArtistCardImageSizing,
  type ButtonFontSize,
  type ButtonHeight,
  type ButtonPaddingHorizontal,
  type ButtonPaddingVertical,
  type ButtonShadow,
  type CardPadding,
  type CardRadius,
  type CardShadow,
  type CardSize,
  type CardSpacingVertical,
  type CheckboxSize,
  type CheckboxState,
  type CheckboxVariant,
  type DataListLabelWidth,
  type DataListRowPadding,
  type DomainCardBadge,
  type DomainCardImage,
  type DomainCardLayout,
  type DomainCardMetadata,
  type DomainCardMotion,
  type DomainCardPriceCapacity,
  type DomainCardSkeleton,
  type DomainCardSkeletonContentWidth,
  type DomainCardSurface,
  type DropdownItemSize,
  type DropdownMenuSize,
  type DropdownTriggerSize,
  type DropdownVariant,
  type EmptyStateIconSize,
  type IconColor,
  type IconSize,
  type IconStroke,
  type InputFontSize,
  type InputHeight,
  type InputPaddingHorizontal,
  type InputPaddingVertical,
  type InputRadius,
  type InputSize,
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
  type MotionAnimation,
  type MotionDuration,
  type MotionEasing,
  type MotionTransition,
  type MotionTransitionPreset,
  type NavigationItemPadding,
  type NavigationListGap,
  type NavigationRadius,
  type NavigationShadow,
  type NavigationSize,
  type NavigationState,
  type NotificationPanelWidth,
  type NotificationVariant,
  type OverlayBackdropVariant,
  type OverlayModalSize,
  type PopoverArrowOffset,
  type PopoverArrowSize,
  type PopoverContentPadding,
  type PopoverContentRadius,
  type PopoverContentShadow,
  type PopoverContentWidth,
  type RadioSize,
  type RadioState,
  type RadioVariant,
  type SectionGap,
  type SectionPadding,
  type SelectContentPadding,
  type SelectContentRadius,
  type SelectItemFontSize,
  type SelectItemPaddingHorizontal,
  type SelectItemPaddingVertical,
  type SelectItemRadius,
  type SelectLabelFontSize,
  type SelectLabelPaddingHorizontal,
  type SelectLabelPaddingVertical,
  type SelectSeparatorMarginHorizontal,
  type SelectSeparatorMarginVertical,
  type SelectTriggerFontSize,
  type SelectTriggerHeight,
  type SelectTriggerPaddingHorizontal,
  type SelectTriggerPaddingVertical,
  type SelectTriggerRadius,
  type SkeletonAnimation,
  type SkeletonBackground,
  type SkeletonVariant,
  type SurfacePadding,
  type SurfaceRadius,
  type SurfaceShadow,
  type SurfaceVariant,
  type SwitchSize,
  type SwitchState,
  type SwitchVariant,
  type TableCellPadding,
  type TableGap,
  type TableHeaderPadding,
  type TableRowHeight,
  type TableShadow,
  type TextFontSize,
  type TextFontWeight,
  type TextLetterSpacing,
  type TextLineHeight,
  type ToastVariant,
  type TooltipContentRadius,
  type TooltipContentShadow,
} from "./components";

// ============================================================================
// CSS VARIABLES
// ============================================================================
export {
  allCSSVariables,
  allCSSVariablesCSS,
  generateCSSVariablesCSS,
  tokenSystemSummary,
} from "./css-variables";

// ============================================================================
// MOTION
// ============================================================================
export type { Animation, Duration, Easing, Keyframe, Spring, Transition } from "./motion";

export {
  animations,
  durations,
  easings,
  keyframes,
  motionCSSVariables,
  reducedMotion,
  springs,
  tailwindMotionConfig,
  transitions,
} from "./motion";

// Motion V2 exports (explicit exports from motion/v2)
export type {
  MotionV2CombinedType,
  MotionV2Duration,
  MotionV2Easing,
  MotionV2SlideDirection,
  MotionV2Transition,
} from "./motion/v2";

export {
  motionV2CSSVariables,
  motionV2Combined,
  motionV2Durations,
  motionV2Easings,
  motionV2Fade,
  motionV2Scale,
  motionV2Slide,
  motionV2TailwindConfig,
  motionV2Transitions,
} from "./motion/v2";

// ============================================================================
// RADIUS
// ============================================================================
export type { BorderRadius, ComponentRadius } from "./radius";

export { borderRadius, componentRadius, radiusCSSVariables, tailwindRadiusConfig } from "./radius";

// ============================================================================
// SHADOWS
// ============================================================================
export type { ColoredShadow, ElevationShadow, FocusRing, GlowEffect } from "./shadows";

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
} from "./shadows";

// ============================================================================
// SPACING
// ============================================================================
export type {
  ComponentSpacing,
  ContainerSpacing,
  GridSpacing,
  SectionSpacing,
  SemanticSpacing,
  Spacing,
  StackSpacing,
} from "./spacing";

export {
  layoutSpacing,
  semanticSpacing,
  spacing,
  spacingCSSVariables,
  tailwindSpacingConfig,
} from "./spacing";

// ============================================================================
// THEME
// ============================================================================
export { UI_COLORS } from "./theme";

// ============================================================================
// TYPOGRAPHY
// ============================================================================
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
} from "./typography";

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
} from "./typography";

// ============================================================================
// TOKEN UNION TYPES
// ============================================================================
// Centralized token union types for component props
export type {
  AlignOffsetToken,
  AnimationPresetToken,
  AspectRatioToken,
  ColorToken,
  ContainerMaxWidthToken,
  ContainerPaddingToken,
  DelayToken,
  FlexBasisToken,
  LayoutSpaceToken,
  ModalFooterAlignToken,
  ModalHeightToken,
  ModalSizeToken,
  ModalWidthToken,
  MotionDurationToken,
  MotionEasingToken,
  MotionToken,
  MotionTransitionToken,
  RadiusToken,
  ResponsiveAlignOffset,
  ResponsiveAnimationPreset,
  ResponsiveAspectRatio,
  ResponsiveColor,
  ResponsiveContainerMaxWidth,
  ResponsiveContainerPadding,
  ResponsiveDelay,
  ResponsiveFlexBasis,
  ResponsiveModalHeight,
  ResponsiveModalSize,
  ResponsiveModalWidth,
  ResponsiveMotion,
  ResponsiveRadius,
  ResponsiveSelectSize,
  ResponsiveSelectWidth,
  ResponsiveShadow,
  ResponsiveSideOffset,
  ResponsiveSpace,
  ResponsiveSurface,
  ResponsiveTextLineHeight,
  ResponsiveTextSize,
  ResponsiveTextWeight,
  SelectSizeToken,
  SelectStateToken,
  SelectVariantToken,
  SelectWidthToken,
  ShadowToken,
  SideOffsetToken,
  SpaceToken,
  SpacingToken,
  SurfaceToken,
  TextLetterSpacingToken,
  TextLineHeightToken,
  TextSizeToken,
  TextWeightToken,
} from "./types";
