/**
 * Token Union Types
 *
 * Centralized token union types for Tenerife UI.
 * These types are the single source of truth for all token-based props.
 * All visual/layout props MUST use these token unions, never raw strings or numbers.
 */

import type { Responsive } from "@/types/responsive";
import type { CONTEXT_MENU_TOKENS } from "../components/context-menu";
import type { MODAL_TOKENS } from "../components/modal";
import type { SELECT_TOKENS } from "../components/select";
import type { TABS_TOKENS } from "../components/tabs";
import type { durations, easings, transitions } from "../motion";
import type { borderRadius } from "../radius";
import type {
  accentColoredShadows,
  elevationShadows,
  focusRings,
  glowEffects,
  primaryColoredShadows,
} from "../shadows";
import type { layoutSpacing, semanticSpacing, spacing } from "../spacing";
import type { fontSize, fontWeight, lineHeight } from "../typography";

// ============================================================================
// SPACING TOKENS
// ============================================================================

/**
 * Base spacing token keys (numeric keys from spacing object)
 * Note: Removed number type - only string keys are allowed
 */
export type SpaceToken = keyof typeof spacing | keyof typeof semanticSpacing;

/**
 * Layout spacing token keys
 * Format: "section-xs", "container-md", "grid-lg", "stack-sm", "component-xl"
 */
export type LayoutSpaceToken =
  | `section-${keyof typeof layoutSpacing.section}`
  | `container-${keyof typeof layoutSpacing.container}`
  | `grid-${keyof typeof layoutSpacing.grid}`
  | `stack-${keyof typeof layoutSpacing.stack}`
  | `component-${keyof typeof layoutSpacing.component}`;

/**
 * Combined spacing token (base + semantic + layout)
 */
export type SpacingToken = SpaceToken | LayoutSpaceToken;

// ============================================================================
// RADIUS TOKENS
// ============================================================================

/**
 * Border radius token keys
 */
export type RadiusToken = keyof typeof borderRadius;

// ============================================================================
// SHADOW TOKENS
// ============================================================================

/**
 * Shadow token keys
 * Includes elevation shadows, colored shadows, glow effects, and focus rings
 */
export type ShadowToken =
  | keyof typeof elevationShadows
  | keyof typeof primaryColoredShadows
  | keyof typeof accentColoredShadows
  | keyof typeof glowEffects
  | keyof typeof focusRings;

// ============================================================================
// COLOR TOKENS
// ============================================================================

/**
 * Semantic color token keys
 * Only semantic colors are allowed (no raw palette colors)
 * These map to CSS variables like --background, --primary, etc.
 * Semantic colors map to --semantic-* CSS variables
 */
export type ColorToken =
  | "background"
  | "foreground"
  | "card"
  | "card-foreground"
  | "popover"
  | "popover-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "accent"
  | "accent-foreground"
  | "muted"
  | "muted-foreground"
  | "destructive"
  | "destructive-foreground"
  | "border"
  | "input"
  | "ring"
  | "semantic-success"
  | "semantic-success-foreground"
  | "semantic-error"
  | "semantic-error-foreground"
  | "semantic-warning"
  | "semantic-warning-foreground"
  | "semantic-info"
  | "semantic-info-foreground";

/**
 * Surface variant token keys
 */
export type SurfaceToken = "flat" | "raised" | "sunken" | "outline" | "subtle";

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

/**
 * Text size token keys
 */
export type TextSizeToken = keyof typeof fontSize;

/**
 * Text weight token keys
 */
export type TextWeightToken = keyof typeof fontWeight;

/**
 * Text line height token keys
 */
export type TextLineHeightToken = keyof typeof lineHeight;

/**
 * Text letter spacing token keys
 */
export type TextLetterSpacingToken = "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";

// ============================================================================
// MOTION TOKENS
// ============================================================================

/**
 * Motion duration token keys
 */
export type MotionDurationToken = keyof typeof durations;

/**
 * Motion easing token keys
 */
export type MotionEasingToken = keyof typeof easings;

/**
 * Motion transition token keys
 */
export type MotionTransitionToken = keyof typeof transitions;

/**
 * Combined motion token (duration, easing, or transition)
 */
export type MotionToken = MotionDurationToken | MotionEasingToken | MotionTransitionToken;

// ============================================================================
// LAYOUT TOKENS
// ============================================================================

/**
 * Container max-width token keys
 */
export type ContainerMaxWidthToken =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full";

/**
 * Container padding token keys
 * Maps to container spacing tokens
 */
export type ContainerPaddingToken = keyof typeof layoutSpacing.container;

// ============================================================================
// RESPONSIVE WRAPPERS
// ============================================================================

/**
 * Responsive spacing type
 */
export type ResponsiveSpace = Responsive<SpacingToken>;

/**
 * Responsive radius type
 */
export type ResponsiveRadius = Responsive<RadiusToken>;

/**
 * Responsive shadow type
 */
export type ResponsiveShadow = Responsive<ShadowToken>;

/**
 * Responsive color type
 */
export type ResponsiveColor = Responsive<ColorToken>;

/**
 * Responsive surface type
 */
export type ResponsiveSurface = Responsive<SurfaceToken>;

/**
 * Responsive text size type
 */
export type ResponsiveTextSize = Responsive<TextSizeToken>;

/**
 * Responsive text weight type
 */
export type ResponsiveTextWeight = Responsive<TextWeightToken>;

/**
 * Responsive text line height type
 */
export type ResponsiveTextLineHeight = Responsive<TextLineHeightToken>;

/**
 * Responsive motion type
 */
export type ResponsiveMotion = Responsive<MotionToken>;

/**
 * Responsive container max-width type
 */
export type ResponsiveContainerMaxWidth = Responsive<ContainerMaxWidthToken | SpacingToken>;

/**
 * Responsive container padding type
 */
export type ResponsiveContainerPadding = Responsive<ContainerPaddingToken | SpacingToken>;

/**
 * Flex basis token keys
 * Includes spacing tokens and semantic CSS values (auto, 0, 100%, etc.)
 */
export type FlexBasisToken =
  | SpacingToken
  | "auto"
  | "0"
  | "100%"
  | "fit-content"
  | "max-content"
  | "min-content";

/**
 * Responsive flex basis type
 */
export type ResponsiveFlexBasis = Responsive<FlexBasisToken>;

/**
 * Aspect ratio token keys
 * Includes predefined aspect ratios (square, video, photo, wide) and semantic CSS values
 */
export type AspectRatioToken =
  | "square"
  | "video"
  | "photo"
  | "wide"
  | "auto"
  | "1/1"
  | "4/3"
  | "16/9"
  | "21/9"
  | "3/2"
  | "2/3";

/**
 * Responsive aspect ratio type
 */
export type ResponsiveAspectRatio = Responsive<AspectRatioToken>;

/**
 * Animation preset token keys
 * Predefined animation preset names for component animations
 */
export type AnimationPresetToken =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "slideInUp"
  | "slideInDown"
  | "slideInLeft"
  | "slideInRight"
  | "scaleIn";

/**
 * Responsive animation preset type
 */
export type ResponsiveAnimationPreset = Responsive<AnimationPresetToken>;

/**
 * Delay token keys
 * Uses motion duration tokens for animation delays
 */
export type DelayToken = MotionDurationToken;

/**
 * Responsive delay type
 */
export type ResponsiveDelay = Responsive<DelayToken>;

/**
 * Side offset token keys
 * Uses spacing tokens for positioning offsets
 */
export type SideOffsetToken = SpacingToken;

/**
 * Responsive side offset type
 */
export type ResponsiveSideOffset = Responsive<SideOffsetToken>;

/**
 * Align offset token keys
 * Uses spacing tokens for positioning offsets
 */
export type AlignOffsetToken = SpacingToken;

/**
 * Responsive align offset type
 */
export type ResponsiveAlignOffset = Responsive<AlignOffsetToken>;

// ============================================================================
// SELECT TOKENS
// ============================================================================

/**
 * Select size token keys
 */
export type SelectSizeToken = keyof typeof SELECT_TOKENS.size;

/**
 * Select variant token keys
 */
export type SelectVariantToken = keyof typeof SELECT_TOKENS.variant;

/**
 * Select width token keys
 */
export type SelectWidthToken = keyof typeof SELECT_TOKENS.width;

/**
 * Select state token keys
 */
export type SelectStateToken = keyof typeof SELECT_TOKENS.state;

/**
 * Responsive select size type
 */
export type ResponsiveSelectSize = Responsive<SelectSizeToken>;

/**
 * Responsive select width type
 */
export type ResponsiveSelectWidth = Responsive<SelectWidthToken>;

// ============================================================================
// TABS TOKENS
// ============================================================================

/**
 * Tabs size token keys
 */
export type TabsSizeToken = keyof typeof TABS_TOKENS.size;

/**
 * Tabs variant token keys
 */
export type TabsVariantToken = keyof typeof TABS_TOKENS.variant;

/**
 * Tabs tone token keys
 */
export type TabsToneToken = keyof typeof TABS_TOKENS.tone;

/**
 * Tabs width token keys
 */
export type TabsWidthToken = keyof typeof TABS_TOKENS.width;

/**
 * Responsive tabs size type
 */
export type ResponsiveTabsSize = Responsive<TabsSizeToken>;

/**
 * Responsive tabs width type
 */
export type ResponsiveTabsWidth = Responsive<TabsWidthToken>;

// ============================================================================
// MODAL TOKENS
// ============================================================================

/**
 * Modal size token keys
 */
export type ModalSizeToken = keyof typeof MODAL_TOKENS.size;

/**
 * Modal width token keys
 */
export type ModalWidthToken = keyof typeof MODAL_TOKENS.width;

/**
 * Modal height token keys
 */
export type ModalHeightToken = keyof typeof MODAL_TOKENS.height;

/**
 * Modal footer align token keys
 */
export type ModalFooterAlignToken = keyof typeof MODAL_TOKENS.footer.align;

/**
 * Responsive modal size type
 */
export type ResponsiveModalSize = Responsive<ModalSizeToken>;

/**
 * Responsive modal width type
 */
export type ResponsiveModalWidth = Responsive<ModalWidthToken>;

/**
 * Responsive modal height type
 */
export type ResponsiveModalHeight = Responsive<ModalHeightToken>;

// ============================================================================
// CONTEXT MENU TOKENS
// ============================================================================

/**
 * ContextMenu size token keys
 */
export type ContextMenuSizeToken = keyof typeof CONTEXT_MENU_TOKENS.size;

/**
 * ContextMenu width token keys
 */
export type ContextMenuWidthToken = keyof typeof CONTEXT_MENU_TOKENS.width;

/**
 * ContextMenu item tone token keys
 */
export type ContextMenuItemToneToken = keyof typeof CONTEXT_MENU_TOKENS.item.tone;

/**
 * Responsive context menu size type
 */
export type ResponsiveContextMenuSize = Responsive<ContextMenuSizeToken>;

/**
 * Responsive context menu width type
 */
export type ResponsiveContextMenuWidth = Responsive<ContextMenuWidthToken>;
