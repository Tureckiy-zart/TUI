/**
 * Border Radius System Tokens
 *
 * Complete border radius system for Tenerife UI based on design system specifications.
 * Includes: radius scale (none..3xl, full), component-specific radius standards,
 * and CSS variable definitions.
 *
 * Base unit: 4px (0.25rem)
 * All radius values follow a consistent scale for visual harmony.
 */

/**
 * Border Radius Scale
 * Values: none, xs, sm, md, lg, xl, 2xl, 3xl, full
 */
export const borderRadius = {
  // No radius
  none: "0",

  // Extra small radius
  xs: "0.125rem", // 2px

  // Small radius
  sm: "0.25rem", // 4px (base unit)

  // Default radius (base)
  DEFAULT: "0.25rem", // 4px (same as sm)
  base: "0.25rem", // 4px (alias)

  // Medium radius
  md: "0.375rem", // 6px

  // Large radius
  lg: "0.5rem", // 8px (2 × base)

  // Extra large radius
  xl: "0.75rem", // 12px (3 × base)

  // 2XL radius
  "2xl": "1rem", // 16px (4 × base)

  // 3XL radius
  "3xl": "1.5rem", // 24px (6 × base)

  // Full radius (circular)
  full: "9999px",
} as const;

/**
 * Component-Specific Radius Standards
 * Defines recommended radius values for different component types
 */
export const componentRadius = {
  // Button radius standards
  button: {
    sm: borderRadius.sm, // 4px (compact buttons)
    md: borderRadius.md, // 6px (default buttons)
    lg: borderRadius.lg, // 8px (large buttons)
    pill: borderRadius.full, // Full (pill buttons)
  },

  // Card radius standards
  card: {
    sm: borderRadius.sm, // 4px (compact cards)
    md: borderRadius.md, // 6px (default cards)
    lg: borderRadius.lg, // 8px (large cards)
    xl: borderRadius.xl, // 12px (feature cards)
  },

  // Input/Form field radius standards
  input: {
    sm: borderRadius.sm, // 4px (compact inputs)
    md: borderRadius.md, // 6px (default inputs)
    lg: borderRadius.lg, // 8px (large inputs)
  },

  // Badge/Status radius standards
  badge: {
    sm: borderRadius.xs, // 2px (compact badges)
    md: borderRadius.sm, // 4px (default badges)
    lg: borderRadius.md, // 6px (large badges)
    pill: borderRadius.full, // Full (pill badges)
  },

  // Avatar radius standards
  avatar: {
    sm: borderRadius.full, // Full (small avatars)
    md: borderRadius.full, // Full (default avatars)
    lg: borderRadius.full, // Full (large avatars)
    square: borderRadius.md, // 6px (square avatars)
  },

  // Modal/Dialog radius standards
  modal: {
    sm: borderRadius.md, // 6px (small modals)
    md: borderRadius.lg, // 8px (default modals)
    lg: borderRadius.xl, // 12px (large modals)
    xl: borderRadius["2xl"], // 16px (extra large modals)
  },

  // Tooltip radius standards
  tooltip: {
    sm: borderRadius.sm, // 4px (default tooltips)
    md: borderRadius.md, // 6px (large tooltips)
  },

  // Toast/Notification radius standards
  toast: {
    sm: borderRadius.md, // 6px (compact toasts)
    md: borderRadius.lg, // 8px (default toasts)
    lg: borderRadius.xl, // 12px (large toasts)
  },

  // Chip/Tag radius standards
  chip: {
    sm: borderRadius.xs, // 2px (compact chips)
    md: borderRadius.sm, // 4px (default chips)
    lg: borderRadius.md, // 6px (large chips)
    pill: borderRadius.full, // Full (pill chips)
  },

  // Image/Media radius standards
  image: {
    none: borderRadius.none, // 0 (sharp images)
    sm: borderRadius.sm, // 4px (subtle rounding)
    md: borderRadius.md, // 6px (default)
    lg: borderRadius.lg, // 8px (rounded)
    xl: borderRadius.xl, // 12px (very rounded)
    full: borderRadius.full, // Full (circular images)
  },
} as const;

/**
 * CSS Custom Properties for Border Radius
 * These will be injected into the theme system
 */
export const radiusCSSVariables = {
  // Border radius scale
  "--radius-none": borderRadius.none,
  "--radius-xs": borderRadius.xs,
  "--radius-sm": borderRadius.sm,
  "--radius-base": borderRadius.base,
  "--radius-md": borderRadius.md,
  "--radius-lg": borderRadius.lg,
  "--radius-xl": borderRadius.xl,
  "--radius-2xl": borderRadius["2xl"],
  "--radius-3xl": borderRadius["3xl"],
  "--radius-full": borderRadius.full,

  // Default radius variable (commonly used)
  "--radius": borderRadius.md, // Default to medium (6px)

  // Component-specific radius variables
  "--radius-button": componentRadius.button.md,
  "--radius-card": componentRadius.card.md,
  "--radius-input": componentRadius.input.md,
  "--radius-badge": componentRadius.badge.md,
  "--radius-modal": componentRadius.modal.md,
  "--radius-tooltip": componentRadius.tooltip.sm,
  "--radius-toast": componentRadius.toast.md,
  "--radius-chip": componentRadius.chip.md,
  "--radius-image": componentRadius.image.md,
} as const;

/**
 * Tailwind Border Radius Config
 * Maps to Tailwind theme.extend.borderRadius
 */
export const tailwindRadiusConfig = {
  borderRadius: {
    ...borderRadius,
    // Add component-specific aliases
    button: componentRadius.button.md,
    card: componentRadius.card.md,
    input: componentRadius.input.md,
    badge: componentRadius.badge.md,
    modal: componentRadius.modal.md,
    tooltip: componentRadius.tooltip.sm,
    toast: componentRadius.toast.md,
    chip: componentRadius.chip.md,
    image: componentRadius.image.md,
  } as Record<string, string>,
} as const;

/**
 * Type Exports
 */
export type BorderRadius = keyof typeof borderRadius;
export type ComponentRadius = {
  button: keyof typeof componentRadius.button;
  card: keyof typeof componentRadius.card;
  input: keyof typeof componentRadius.input;
  badge: keyof typeof componentRadius.badge;
  avatar: keyof typeof componentRadius.avatar;
  modal: keyof typeof componentRadius.modal;
  tooltip: keyof typeof componentRadius.tooltip;
  toast: keyof typeof componentRadius.toast;
  chip: keyof typeof componentRadius.chip;
  image: keyof typeof componentRadius.image;
};
