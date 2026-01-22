/**
 * Link Component Tokens
 *
 * Component-level design tokens for Link component.
 * Maps foundation tokens (spacing, typography, radius, motion) to link-specific usage.
 *
 * @component Link
 * @see {@link ../PRIMITIVES/Link/Link.tsx} - Link component implementation
 * @see {@link ../PRIMITIVES/Link/Link.stories.tsx} - Storybook examples
 *
 * @example
 * // Basic usage
 * <Link href="/about">About</Link>
 *
 * @example
 * // With variant
 * <Link href="/login" variant="primary">Login</Link>
 *
 * @example
 * // With size
 * <Link href="/signup" size="lg">Sign Up</Link>
 *
 * @example
 * // With icons
 * <Link href="/profile" leftIcon={<UserIcon />} rightIcon={<ArrowIcon />}>
 *   Profile
 * </Link>
 *
 * @example
 * // Disabled state
 * <Link href="/disabled" disabled>Disabled Link</Link>
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * Authority Compliance:
 * - Motion Authority: Uses MOTION_TOKENS.transitionPreset.colors
 * - Radius Authority: References componentRadius for outline/ghost variants
 * - Typography Authority: References fontSize tokens
 * - Spacing Authority: References semanticSpacing tokens
 *
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

export const LINK_TOKENS = {
  /**
   * Link heights by size
   * Maps to Tailwind height utilities
   *
   * @example
   * // Small size link
   * <Link href="/link" size="sm">Small Link</Link>
   *
   * @example
   * // Medium size link (default)
   * <Link href="/link" size="md">Medium Link</Link>
   *
   * @example
   * // Large size link
   * <Link href="/link" size="lg">Large Link</Link>
   */
  height: {
    xs: "h-7", // 28px (1.75rem)
    sm: "h-8", // 32px (2rem)
    md: "h-9", // 36px (2.25rem)
    lg: "h-10", // 40px (2.5rem)
    xl: "h-11", // 44px (2.75rem)
  } as const,

  /**
   * Link padding by size
   * Horizontal and vertical padding values
   *
   * @example
   * // Padding is automatically applied based on size prop
   * <Link href="/link" size="sm">Small Link</Link> // Uses px-sm py-xs
   * <Link href="/link" size="md">Medium Link</Link> // Uses px-md py-sm
   * <Link href="/link" size="lg">Large Link</Link> // Uses px-lg py-sm
   */
  padding: {
    horizontal: {
      xs: "px-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      sm: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      md: "px-md", // 16px (1rem) - maps to semanticSpacing.md
      lg: "px-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
      xl: "px-xl", // 32px (2rem) - maps to semanticSpacing.xl
    },
    vertical: {
      xs: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      sm: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      md: "py-md", // 16px (1rem) - maps to semanticSpacing.md
    },
  } as const,

  /**
   * Layout tokens
   * Base layout utilities for link component
   */
  layout: "inline-flex items-center justify-center whitespace-nowrap", // Base layout for link container
  /**
   * Block-level layout token for variant='wrapper' (and deprecated variant='link')
   * Used when Link needs to wrap block elements (e.g., Card) in grid/flex compositions
   * Provides block display with full width for proper layout contract
   */
  layoutBlock: "block w-full", // Block-level layout for wrapper variant (and deprecated link variant)
  /**
   * Font weight token
   * References foundation typography fontWeight tokens from Typography Authority
   *
   * @rule References fontWeight.medium (500) from Typography Authority
   * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
   */
  fontWeight: "font-medium", // References fontWeight.medium (500) - Typography Authority compliant

  /**
   * Icon wrapper layout
   * Layout utilities for icon containers
   *
   * @example
   * // Icons are automatically wrapped with proper layout
   * <Link href="/profile" leftIcon={<UserIcon />} rightIcon={<ArrowIcon />}>
   *   Profile
   * </Link>
   */
  iconWrapper: "inline-flex items-center", // Layout for left/right icon wrappers

  /**
   * Font sizes by link size
   * References foundation typography fontSize tokens from Typography Authority
   *
   * @rule All fontSize values reference Typography Authority tokens
   * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
   *
   * @example
   * // Small font size (14px)
   * <Link href="/link" size="sm">Small Text</Link>
   *
   * @example
   * // Medium font size (16px, default)
   * <Link href="/link" size="md">Medium Text</Link>
   *
   * @example
   * // Large font size (18px)
   * <Link href="/link" size="lg">Large Text</Link>
   */
  fontSize: {
    /** Extra small font size (~12px) */
    xs: "text-xs", // References fontSize.xs[0] from Typography Authority (~12px)
    /** Small font size (~14px) */
    sm: "text-sm", // References fontSize.sm[0] from Typography Authority (~14px)
    /** Medium font size (~16px, default) */
    md: "text-base", // References fontSize.base[0] from Typography Authority (~16px)
    /** Large font size (~18px) */
    lg: "text-lg", // References fontSize.lg[0] from Typography Authority (~18px)
    /** Extra large font size (~20px) */
    xl: "text-xl", // References fontSize.xl[0] from Typography Authority (~20px)
  } as const,

  /**
   * Border radius for outline and ghost variants
   * References componentRadius from Radius Authority
   *
   * @rule References borderRadius.md (6px / 0.375rem) from Radius Authority
   * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
   */
  radius: "rounded-md", // References borderRadius.md (6px / 0.375rem) - Radius Authority compliant

  /**
   * Underline offset for text decoration
   * Uses spacing token (xs = 4px) which matches underline-offset-4
   */
  underlineOffset: "underline-offset-4", // 4px (0.25rem) - matches semanticSpacing.xs

  /**
   * Transition tokens
   * References Motion Authority tokens for consistent motion behavior
   *
   * @rule Uses MOTION_TOKENS.transitionPreset.colors from Motion Authority
   * @rule Motion transitions MUST use canonical motion tokens only
   * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
   */
  transition: {
    colors: MOTION_TOKENS.transitionPreset.colors, // "transition-colors duration-normal ease-out" - Motion Authority compliant
  } as const,

  /**
   * Focus state tokens
   * Focus ring for keyboard navigation
   *
   * @rule Focus MUST use focus-visible: prefix (keyboard navigation only)
   * @rule Focus MUST be blocked when disabled={true}
   *
   * @example
   * // Focus ring appears automatically on keyboard navigation (Tab key)
   * <Link href="/link">Focusable Link</Link>
   *
   * @example
   * // Focus is disabled when link is disabled
   * <Link href="/link" disabled>Disabled Link</Link>
   */
  focus: {
    ring: "focus-visible:ring-2 focus-visible:ring-ring", // Focus ring using semantic ring color
    outline: "focus-visible:outline-none", // Remove default outline (replaced by ring)
    offset: "focus-visible:ring-offset-2", // Ring offset
  } as const,

  /**
   * Disabled state tokens
   * Uses explicit disabled semantic tokens for better accessibility
   *
   * @example
   * // Disabled link with proper accessibility attributes
   * <Link href="/disabled" disabled>Disabled Link</Link>
   *
   * @example
   * // Disabled link prevents navigation and removes from tab order
   * <Link href="/action" disabled onClick={handleClick}>
   *   Cannot Click
   * </Link>
   */
  state: {
    disabled: {
      pointerEvents: "disabled:pointer-events-none", // Disable pointer events
      text: "disabled:text-[hsl(var(--tm-disabled-foreground))]", // Disabled text color using explicit disabled semantic token
    } as const,
  } as const,

  /**
   * Color tokens for link variants
   * Uses semantic color tokens that map to CSS variables
   *
   * @example
   * // Primary variant - emphasized link with primary color
   * <Link href="/cta" variant="primary">Get Started</Link>
   *
   * @example
   * // Secondary variant - muted link style
   * <Link href="/info" variant="secondary">Learn More</Link>
   *
   * @example
   * // Accent variant - accent color link
   * <Link href="/feature" variant="accent">Explore Feature</Link>
   *
   * @example
   * // Outline variant - bordered link button
   * <Link href="/action" variant="outline">Action</Link>
   *
   * @example
   * // Ghost variant - subtle background link
   * <Link href="/menu" variant="ghost">Menu Item</Link>
   *
   * @example
   * // Text variant (default) - inline text link
   * <Link href="/about" variant="text">About Us</Link>
   *
   * @example
   * // Wrapper variant - block-level wrapper for cards
   * <Link href="/article" variant="wrapper">
   *   <Card>Article Content</Card>
   * </Link>
   *
   * @example
   * // Destructive variant - danger/delete actions
   * <Link href="/delete" variant="destructive">Delete</Link>
   */
  variant: {
    /**
     * Primary variant - emphasized link with primary color
     * @example
     * <Link href="/cta" variant="primary">Get Started</Link>
     */
    primary: {
      text: "text-primary", // Primary text using CSS var
      hover: "hover:underline", // Hover effect via underline only (color unchanged per canon)
      underline: "hover:underline", // Underline on hover
    } as const,
    /**
     * Secondary variant - muted link style
     * @example
     * <Link href="/info" variant="secondary">Learn More</Link>
     */
    secondary: {
      text: "text-secondary", // Secondary text using CSS var
      hover: "hover:underline", // Underline on hover
    } as const,
    /**
     * Accent variant - accent color link
     * @example
     * <Link href="/feature" variant="accent">Explore Feature</Link>
     */
    accent: {
      text: "text-accent", // Accent text using CSS var (accent color, not accent-foreground)
      hover: "hover:underline", // Hover effect via underline only (color unchanged per canon)
      underline: "hover:underline", // Underline on hover
    } as const,
    /**
     * Outline variant - bordered link button
     * @example
     * <Link href="/action" variant="outline">Action</Link>
     */
    outline: {
      border: "border border-input", // Input border using CSS var
      background: "bg-[hsl(var(--tm-surface-base))]", // Background using CSS var
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text using CSS var
      hover: {
        background: "hover:bg-accent", // Hover background
        text: "hover:text-accent-foreground", // Hover text
      } as const,
    } as const,
    /**
     * Ghost variant - subtle background link
     * @example
     * <Link href="/menu" variant="ghost">Menu Item</Link>
     */
    ghost: {
      background: "bg-muted/10", // Light background for better contrast on dark surfaces
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text using CSS var
      hover: {
        background: "hover:bg-accent", // Hover background
        text: "hover:text-accent-foreground", // Hover text
      } as const,
    } as const,
    /**
     * Link variant (deprecated) - use 'wrapper' instead
     * @deprecated Use variant='wrapper' instead
     * @example
     * <Link href="/article" variant="link">Article</Link>
     */
    link: {
      text: "text-primary", // Primary text using CSS var
      hover: "hover:underline", // Underline on hover
    } as const,
    /**
     * Destructive variant - danger/delete actions
     * @example
     * <Link href="/delete" variant="destructive">Delete</Link>
     */
    destructive: {
      text: "text-destructive", // Destructive text using semantic foreground token
      hover: "hover:underline", // Hover effect via underline only (color unchanged per canon)
      underline: "hover:underline", // Underline on hover
    } as const,
  } as const,
} as const;

/**
 * Type exports for Link tokens
 */
export type LinkHeight = keyof typeof LINK_TOKENS.height;
export type LinkPaddingHorizontal = keyof typeof LINK_TOKENS.padding.horizontal;
export type LinkPaddingVertical = keyof typeof LINK_TOKENS.padding.vertical;
export type LinkFontSize = keyof typeof LINK_TOKENS.fontSize;
