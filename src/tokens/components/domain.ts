/**
 * Domain Component Tokens
 *
 * Domain-specific design tokens for card components (EventCard, VenueCard, ArtistCard,
 * TicketCard, PromoCard, CategoryCard). These tokens provide a consistent foundation
 * for card surface styles, layout, images, metadata, badges, price/capacity displays,
 * hover/motion states, and skeleton loading states.
 *
 * All values reference foundation tokens or other component tokens.
 * Based on audit requirements from L3_CARD_AUDIT.md.
 *
 * Foundation tokens referenced:
 * - SPACING_TOKENS: semanticSpacing (xs, sm, md, lg, xl, 2xl, 3xl) from src/tokens/spacing.ts
 * - RADIUS_TOKENS: borderRadius (xs, sm, md, lg, xl, 2xl, full) from src/tokens/radius.ts
 * - TEXT_TOKENS: fontSize, fontWeight from src/tokens/components/text.ts
 * - ICON_TOKENS: sizes, colors from src/tokens/components/icon.ts
 * - SHADOW_TOKENS: elevationShadows (xs, sm, md, lg, xl, 2xl) from src/tokens/shadows.ts
 * - MOTION_TOKENS: transition, transitionPreset from src/tokens/components/motion.ts
 * - DATA_TOKENS: skeleton patterns from src/tokens/components/data.ts
 */

import { semanticSpacing } from "@/tokens/spacing";
import { DATA_TOKENS } from "./data";
import { ICON_TOKENS } from "./icon";
import { MOTION_TOKENS } from "./motion";

/**
 * Domain Card Component Tokens
 *
 * Defines all tokens for domain-specific card components.
 * Values reference foundation tokens or other component tokens.
 */
export const DOMAIN_TOKENS = {
  /**
   * Surface tokens for card containers
   * Defines background, border, radius, and shadow for card surfaces
   */
  surface: {
    /**
     * Background colors
     * Maps to semantic color tokens
     */
    bg: {
      default: "bg-card", // Default card background - maps to semantic color tokens
      hover: "hover:bg-card/95", // Hover state background with 95% opacity
    } as const,

    /**
     * Border styles
     * Maps to semantic border tokens
     */
    border: {
      default: "border border-border", // Default border - maps to semantic border tokens
      hover: "hover:border-primary/20", // Hover state border with primary color at 20% opacity
    } as const,

    /**
     * Border radius
     * References borderRadius.xl (0.75rem / 12px)
     * Using Tailwind class "rounded-xl" which maps to borderRadius.xl
     */
    radius: {
      default: "rounded-xl", // References borderRadius.xl (0.75rem / 12px) via Tailwind
    } as const,

    /**
     * Shadow (elevation) tokens
     * References elevationShadows.md
     * Using Tailwind class "shadow-md" which maps to elevationShadows.md
     */
    shadow: {
      default: "shadow-md", // References elevationShadows.md via Tailwind
    } as const,

    /**
     * Elevation change on hover
     * References elevationShadows.xl
     * Using Tailwind class "hover:shadow-xl" which maps to elevationShadows.xl
     */
    elevation: {
      hover: "hover:shadow-xl", // References elevationShadows.xl via Tailwind
    } as const,
  } as const,

  /**
   * Spacing tokens for card component spacing
   * References semanticSpacing tokens
   * Note: Tailwind classes are used for component className application
   */
  spacing: {
    /**
     * Section spacing - vertical spacing between card sections
     */
    section: {
      titleToSubtitle: "mb-xs", // Spacing between title and subtitle/description - references semanticSpacing.xs (4px) via Tailwind
      subtitleToMetadata: "mb-sm", // Spacing between description and metadata - references semanticSpacing.sm (8px) via Tailwind
    } as const,
    /**
     * Badge spacing offsets
     */
    badges: {
      offsetX: semanticSpacing.md, // Horizontal offset for badges (16px)
      offsetY: semanticSpacing.md, // Vertical offset for badges (16px)
    } as const,
    /**
     * Image spacing
     */
    image: {
      bottomMargin: semanticSpacing.none, // Margin below image (0px)
    } as const,
    /**
     * Card vertical gap
     */
    card: {
      verticalGap: semanticSpacing.md, // Vertical gap in card content (16px)
    } as const,
    /**
     * Metadata item gap
     */
    metadata: {
      itemGap: semanticSpacing.xs, // Gap between metadata items (4px)
    } as const,
    /**
     * Footer spacing
     */
    footer: {
      paddingTopDefault: "pt-sm", // Footer padding top default - references semanticSpacing.sm (8px) via Tailwind
      paddingTopCompact: "pt-xs", // Footer padding top compact - references semanticSpacing.xs (4px) via Tailwind
    } as const,
    /**
     * Button spacing
     */
    button: {
      paddingDefault: "px-md py-xs", // Button padding default - references semanticSpacing.md (16px) horizontal, xs (4px) vertical via Tailwind
      paddingCompact: "px-sm py-xs", // Button padding compact - references semanticSpacing.sm (8px) horizontal, xs (4px) vertical via Tailwind
      iconMarginLeft: "ml-xs", // Icon margin left - references semanticSpacing.xs (4px) via Tailwind
    } as const,
  } as const,

  /**
   * Layout tokens for card spacing and gaps
   * References semanticSpacing tokens
   * Note: Tailwind utilities are used for component className application
   */
  layout: {
    /**
     * Padding tokens
     * References semanticSpacing (md = 16px, sm = 8px)
     * Note: "p-md" and "p-sm" are Tailwind utilities that apply semanticSpacing values
     */
    padding: {
      default: "p-md", // Default padding - references semanticSpacing.md (16px)
      compact: "p-sm", // Compact variant padding - references semanticSpacing.sm (8px)
    } as const,

    /**
     * Gap tokens for spacing between card elements
     * References semanticSpacing (md = 16px, xs = 4px)
     * Note: "gap-md" and "gap-xs" are Tailwind utilities that apply semanticSpacing values
     */
    gap: {
      default: "gap-md", // Default gap - references semanticSpacing.md (16px)
      compact: "gap-xs", // Compact variant gap - references semanticSpacing.xs (4px)
    } as const,
  } as const,

  /**
   * Image tokens for card media
   * Defines aspect ratio, radius, and overlay styles
   */
  image: {
    /**
     * Aspect ratio for card images
     * Standard 16:9 aspect ratio for card images
     */
    aspectRatio: "aspect-video", // 16:9 aspect ratio - standard for card images

    /**
     * Border radius for images
     * References borderRadius.xl (0.75rem / 12px) for top corners only
     * Using Tailwind class "rounded-t-xl" which maps to borderRadius.xl
     */
    radius: "rounded-t-xl", // References borderRadius.xl (0.75rem / 12px) via Tailwind

    /**
     * Overlay gradient tokens for image overlays
     * Used for hover states and text readability
     */
    overlay: {
      gradient: "bg-gradient-to-t from-black/60 via-transparent to-transparent", // Gradient overlay for image hover states
    } as const,
  } as const,

  /**
   * Metadata tokens for card information displays
   * Used for date/time, location, and other metadata patterns
   * Maps to TEXT_TOKENS, ICON_TOKENS, and semanticSpacing
   */
  metadata: {
    /**
     * Text color tokens
     * Maps to semantic text color tokens
     */
    text: {
      primary: "text-foreground", // Primary metadata text - maps to semantic text color
      secondary: "text-muted-foreground", // Secondary metadata text - maps to semantic muted text color
    } as const,

    /**
     * Icon tokens
     * Maps to ICON_TOKENS for sizes and colors
     */
    icon: {
      default: "text-muted-foreground", // Default icon color - maps to ICON_TOKENS.colors.muted
      sizeSm: ICON_TOKENS.sizes.md, // Small icon size - references ICON_TOKENS.sizes.md (16px)
    } as const,

    /**
     * Spacing tokens for metadata layouts
     * References semanticSpacing (xs = 4px, sm = 8px)
     * Using Tailwind classes which map to semanticSpacing values
     */
    spacing: {
      vertical: "gap-xs", // References semanticSpacing.xs (4px) via Tailwind
      horizontal: "gap-sm", // References semanticSpacing.sm (8px) via Tailwind
    } as const,
  } as const,

  /**
   * Badge tokens for featured/popular badges
   * References semanticSpacing, borderRadius, and elevationShadows
   */
  badges: {
    /**
     * Badge size tokens (padding)
     * References semanticSpacing for padding values
     * Using Tailwind classes which map to semanticSpacing values
     */
    size: {
      sm: "px-xs py-xs", // References semanticSpacing.xs (4px) for both horizontal and vertical via Tailwind
      md: "px-sm py-xs", // References semanticSpacing.sm (8px) horizontal, semanticSpacing.xs (4px) vertical via Tailwind
    } as const,

    /**
     * Badge positioning tokens
     * References semanticSpacing for absolute positioning
     * Using Tailwind classes which map to semanticSpacing values
     */
    position: {
      default: "right-md top-md", // References semanticSpacing.md (16px) for both right and top via Tailwind
      compact: "right-sm top-sm", // References semanticSpacing.sm (8px) for both right and top via Tailwind
    } as const,

    /**
     * Additional vertical positioning tokens for multi-badge scenarios
     * References semanticSpacing for top positioning
     * Using Tailwind classes which map to semanticSpacing values
     */
    positionY: {
      xl: "top-xl", // References semanticSpacing.xl (32px) via Tailwind
      "2xl": "top-2xl", // References semanticSpacing["2xl"] (48px) via Tailwind
      "3xl": "top-3xl", // References semanticSpacing["3xl"] (64px) via Tailwind
    } as const,

    /**
     * Badge surface (background) tokens
     * Maps to semantic color tokens
     */
    surface: {
      default: "bg-primary", // Default badge background - maps to semantic primary color
      featured: "bg-gradient-to-r from-accent-500 to-primary-600", // Featured badge gradient
    } as const,

    /**
     * Badge text color
     * White for contrast on colored backgrounds
     */
    text: {
      color: "text-white", // Badge text color - white for contrast on colored backgrounds
    } as const,

    /**
     * Badge border radius
     * References borderRadius.full (pill shape)
     * Using Tailwind class "rounded-full" which maps to borderRadius.full
     */
    radius: "rounded-full", // References borderRadius.full via Tailwind

    /**
     * Badge shadow
     * References elevationShadows.lg
     * Using Tailwind class "shadow-lg" which maps to elevationShadows.lg
     */
    shadow: "shadow-lg", // References elevationShadows.lg via Tailwind
  } as const,

  /**
   * Price/Capacity tokens for displaying price and capacity information
   * Maps to semantic text color tokens and semanticSpacing
   */
  priceCapacity: {
    /**
     * Text color tokens
     * Maps to semantic text color tokens
     */
    text: {
      primary: "text-foreground", // Primary price/capacity text - maps to semantic text color
      secondary: "text-muted-foreground", // Secondary price/capacity text - maps to semantic muted text color
    } as const,

    /**
     * Spacing between price and capacity elements
     * References semanticSpacing.sm (8px)
     * Using Tailwind class "gap-sm" which maps to semanticSpacing.sm
     */
    spacing: "gap-sm", // References semanticSpacing.sm (8px) via Tailwind
  } as const,

  /**
   * Motion tokens for hover and interaction states
   * References MOTION_TOKENS for transitions and animations
   */
  motion: {
    /**
     * Hover state tokens
     * References MOTION_TOKENS and elevationShadows
     */
    hover: {
      transition: MOTION_TOKENS.transitionPreset.normal, // References MOTION_TOKENS.transitionPreset.normal
      scale: "hover:scale-110", // Hover scale transform (110% scale) - domain-specific value
      elevation: "hover:shadow-xl", // References elevationShadows.xl via Tailwind
    } as const,
  } as const,

  /**
   * Skeleton tokens for loading states
   * References DATA_TOKENS.skeleton for skeleton patterns and semanticSpacing for dimensions
   */
  skeleton: {
    /**
     * Base skeleton wrapper tokens
     * Default styling for skeleton wrapper components
     */
    base: {
      /**
       * Default border radius for skeleton wrapper
       * References DATA_TOKENS.skeleton.radius.text
       */
      radius: DATA_TOKENS.skeleton.radius.text,
      /**
       * Default animation for skeleton wrapper
       * References DATA_TOKENS.skeleton.animation.pulse
       */
      animation: DATA_TOKENS.skeleton.animation.pulse,
      /**
       * Default background for skeleton wrapper
       * References DATA_TOKENS.skeleton.background.default
       */
      background: DATA_TOKENS.skeleton.background.default,
    } as const,

    /**
     * Image skeleton height
     * Domain-specific: card images need 192px (spacing[48] = 12rem)
     * Note: DATA_TOKENS.skeleton.height.card is 128px, but card images need 192px
     * Using Tailwind class "h-48" which maps to spacing[48] (12rem / 192px)
     */
    image: {
      height: "h-48", // References spacing[48] (12rem / 192px) via Tailwind
    } as const,

    /**
     * Content gap for skeleton elements
     * References semanticSpacing.md (16px)
     * Using Tailwind class "gap-md" which maps to semanticSpacing.md
     */
    content: {
      gap: "gap-md", // References semanticSpacing.md (16px) via Tailwind
      /**
       * Content width tokens for skeleton elements
       * References DATA_TOKENS where available, uses Tailwind fraction classes for domain-specific values
       */
      width: {
        full: DATA_TOKENS.skeleton.width.full, // References DATA_TOKENS.skeleton.width.full
        threeQuarters: "w-3/4", // Three quarters width (75%) - domain-specific, using Tailwind fraction
        half: "w-1/2", // Half width (50%) - domain-specific, using Tailwind fraction
      } as const,
    } as const,

    /**
     * Badge skeleton dimensions
     * Domain-specific values for badge skeleton sizing
     * References spacing values via Tailwind classes
     */
    badge: {
      width: "w-20", // References spacing[20] (5rem / 80px) via Tailwind
      height: "h-6", // References spacing[6] (1.5rem / 24px) via Tailwind
    } as const,
  } as const,
} as const;

/**
 * Type exports for Domain Card tokens
 */
export type DomainCardSurface = typeof DOMAIN_TOKENS.surface;
export type DomainCardLayout = typeof DOMAIN_TOKENS.layout;
export type DomainCardImage = typeof DOMAIN_TOKENS.image;
export type DomainCardMetadata = typeof DOMAIN_TOKENS.metadata;
export type DomainCardBadge = typeof DOMAIN_TOKENS.badges;
export type DomainCardPriceCapacity = typeof DOMAIN_TOKENS.priceCapacity;
export type DomainCardMotion = typeof DOMAIN_TOKENS.motion;
export type DomainCardSkeleton = typeof DOMAIN_TOKENS.skeleton;
export type DomainCardSkeletonContentWidth = typeof DOMAIN_TOKENS.skeleton.content.width;
