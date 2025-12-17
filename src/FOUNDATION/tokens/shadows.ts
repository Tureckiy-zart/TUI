/**
 * Shadow and Glow System Tokens
 *
 * Complete shadow system for Tenerife UI based on design system specifications.
 * Includes: elevation shadows, colored shadows (primary/accent), glow effects,
 * and focus ring tokens for accessibility.
 *
 * @see docs/tenerife_audit/design_system.md - shadow system section
 */

/**
 * Shadow Base Tokens
 * Base values for shadow generation
 */
export const shadowBase = {
  black: "0 0 0", // Black color for shadows (rgb format)
  overlay: "0 0 0", // Black color for overlays (rgba format)
} as const;

/**
 * Shadow Opacity Tokens
 * Opacity values for different shadow intensities
 */
export const shadowOpacity = {
  xs: "0.05",
  sm: "0.1",
  md: "0.1",
  lg: "0.1",
  xl: "0.1",
  "2xl": "0.25",
  overlay: "0.5",
  backdrop: "0.5",
} as const;

/**
 * Elevation Shadow Tokens
 * Used for component depth and elevation hierarchy
 * Values: none, xs, sm, md, lg, xl, 2xl
 */
export const elevationShadows = {
  none: "none",
  xs: `0 1px 2px 0 rgb(${shadowBase.black} / ${shadowOpacity.xs})`,
  sm: `0 1px 3px 0 rgb(${shadowBase.black} / ${shadowOpacity.sm}), 0 1px 2px -1px rgb(${shadowBase.black} / ${shadowOpacity.sm})`,
  md: `0 4px 6px -1px rgb(${shadowBase.black} / ${shadowOpacity.md}), 0 2px 4px -2px rgb(${shadowBase.black} / ${shadowOpacity.md})`,
  lg: `0 10px 15px -3px rgb(${shadowBase.black} / ${shadowOpacity.lg}), 0 4px 6px -4px rgb(${shadowBase.black} / ${shadowOpacity.lg})`,
  xl: `0 20px 25px -5px rgb(${shadowBase.black} / ${shadowOpacity.xl}), 0 8px 10px -6px rgb(${shadowBase.black} / ${shadowOpacity.xl})`,
  "2xl": `0 25px 50px -12px rgb(${shadowBase.black} / ${shadowOpacity["2xl"]})`,
} as const;

/**
 * Primary Colored Shadow Tokens
 * Used for interactive elements and brand emphasis with primary color
 */
export const primaryColoredShadows = {
  xs: "0 1px 2px 0 hsl(var(--primary-500) / 0.15)",
  sm: "0 2px 4px 0 hsl(var(--primary-500) / 0.2)",
  md: "0 4px 8px 0 hsl(var(--primary-500) / 0.3)",
  lg: "0 8px 16px 0 hsl(var(--primary-500) / 0.4)",
  xl: "0 12px 24px 0 hsl(var(--primary-500) / 0.5)",
  "2xl": "0 16px 32px 0 hsl(var(--primary-500) / 0.6)",
} as const;

/**
 * Accent Colored Shadow Tokens
 * Used for accent elements and highlights with accent color
 */
export const accentColoredShadows = {
  xs: "0 1px 2px 0 hsl(var(--accent-500) / 0.15)",
  sm: "0 2px 4px 0 hsl(var(--accent-500) / 0.2)",
  md: "0 4px 8px 0 hsl(var(--accent-500) / 0.3)",
  lg: "0 8px 16px 0 hsl(var(--accent-500) / 0.4)",
  xl: "0 12px 24px 0 hsl(var(--accent-500) / 0.5)",
  "2xl": "0 16px 32px 0 hsl(var(--accent-500) / 0.6)",
} as const;

/**
 * Glow Effect Tokens
 * Used for focus states, brand emphasis, and interactive feedback
 */
export const glowEffects = {
  // Primary glow effects
  "glow-primary":
    "0 0 20px 0 hsl(var(--primary-500) / 0.5), 0 0 40px 0 hsl(var(--primary-500) / 0.3)",
  "glow-primary-subtle": "0 0 8px 0 hsl(var(--primary-500) / 0.3)",
  "glow-primary-medium": "0 0 16px 0 hsl(var(--primary-500) / 0.5)",
  "glow-primary-strong": "0 0 24px 0 hsl(var(--primary-500) / 0.6)",

  // Accent glow effects
  "glow-accent": "0 0 20px 0 hsl(var(--accent-500) / 0.5), 0 0 40px 0 hsl(var(--accent-500) / 0.3)",
  "glow-accent-subtle": "0 0 8px 0 hsl(var(--accent-500) / 0.3)",
  "glow-accent-medium": "0 0 16px 0 hsl(var(--accent-500) / 0.5)",
  "glow-accent-strong": "0 0 24px 0 hsl(var(--accent-500) / 0.6)",
} as const;

/**
 * Focus Ring Tokens
 * Used for keyboard focus indicators (accessibility)
 */
export const focusRings = {
  default: "0 0 0 3px hsl(var(--ring) / 0.5)",
  primary: "0 0 0 3px hsl(var(--primary-500) / 0.3)",
  accent: "0 0 0 3px hsl(var(--accent-500) / 0.3)",
  "focus-primary": "0 0 0 3px hsl(var(--primary-500) / 0.3)",
  "focus-accent": "0 0 0 3px hsl(var(--accent-500) / 0.3)",
} as const;

/**
 * CSS Custom Properties for Shadows
 * These will be injected into the theme system
 */
export const shadowCSSVariables = {
  // Elevation shadows
  "--shadow-none": elevationShadows.none,
  "--shadow-xs": elevationShadows.xs,
  "--shadow-sm": elevationShadows.sm,
  "--shadow-md": elevationShadows.md,
  "--shadow-lg": elevationShadows.lg,
  "--shadow-xl": elevationShadows.xl,
  "--shadow-2xl": elevationShadows["2xl"],

  // Primary colored shadows
  "--shadow-primary-xs": primaryColoredShadows.xs,
  "--shadow-primary-sm": primaryColoredShadows.sm,
  "--shadow-primary-md": primaryColoredShadows.md,
  "--shadow-primary-lg": primaryColoredShadows.lg,
  "--shadow-primary-xl": primaryColoredShadows.xl,
  "--shadow-primary-2xl": primaryColoredShadows["2xl"],

  // Accent colored shadows
  "--shadow-accent-xs": accentColoredShadows.xs,
  "--shadow-accent-sm": accentColoredShadows.sm,
  "--shadow-accent-md": accentColoredShadows.md,
  "--shadow-accent-lg": accentColoredShadows.lg,
  "--shadow-accent-xl": accentColoredShadows.xl,
  "--shadow-accent-2xl": accentColoredShadows["2xl"],

  // Glow effects
  "--glow-primary": glowEffects["glow-primary"],
  "--glow-primary-subtle": glowEffects["glow-primary-subtle"],
  "--glow-primary-medium": glowEffects["glow-primary-medium"],
  "--glow-primary-strong": glowEffects["glow-primary-strong"],
  "--glow-accent": glowEffects["glow-accent"],
  "--glow-accent-subtle": glowEffects["glow-accent-subtle"],
  "--glow-accent-medium": glowEffects["glow-accent-medium"],
  "--glow-accent-strong": glowEffects["glow-accent-strong"],

  // Focus rings
  "--focus-ring-default": focusRings.default,
  "--focus-ring-primary": focusRings.primary,
  "--focus-ring-accent": focusRings.accent,
  "--focus-primary": focusRings["focus-primary"],
  "--focus-accent": focusRings["focus-accent"],
} as const;

/**
 * Component Shadow Mapping
 * Defines which shadow level to use for different component states
 */
export const componentShadowMapping = {
  card: {
    default: elevationShadows.sm,
    hover: elevationShadows.md,
    active: elevationShadows.xs,
    selected: primaryColoredShadows.sm,
  },
  button: {
    default: elevationShadows.xs,
    hover: elevationShadows.sm,
    active: elevationShadows.none,
    focus: focusRings.primary,
  },
  "button-accent": {
    default: accentColoredShadows.xs,
    hover: accentColoredShadows.sm,
    active: elevationShadows.none,
    focus: focusRings.accent,
  },
  modal: {
    default: elevationShadows.xl,
    backdrop: `rgba(${shadowBase.overlay}, ${shadowOpacity.backdrop})`,
  },
  dropdown: {
    default: elevationShadows.md,
    hover: elevationShadows.lg,
  },
  tooltip: {
    default: elevationShadows.sm,
  },
  toast: {
    default: elevationShadows.lg,
    success: "0 10px 15px -3px hsl(var(--semantic-success) / 0.3)",
    error: "0 10px 15px -3px hsl(var(--semantic-error) / 0.3)",
  },
} as const;

/**
 * Tailwind Shadow Config
 * Maps to Tailwind theme.extend.boxShadow
 */
export const tailwindShadowConfig = {
  boxShadow: {
    // Elevation shadows
    none: elevationShadows.none,
    xs: elevationShadows.xs,
    sm: elevationShadows.sm,
    md: elevationShadows.md,
    lg: elevationShadows.lg,
    xl: elevationShadows.xl,
    "2xl": elevationShadows["2xl"],

    // Primary colored shadows
    "primary-xs": primaryColoredShadows.xs,
    "primary-sm": primaryColoredShadows.sm,
    "primary-md": primaryColoredShadows.md,
    "primary-lg": primaryColoredShadows.lg,
    "primary-xl": primaryColoredShadows.xl,
    "primary-2xl": primaryColoredShadows["2xl"],

    // Accent colored shadows
    "accent-xs": accentColoredShadows.xs,
    "accent-sm": accentColoredShadows.sm,
    "accent-md": accentColoredShadows.md,
    "accent-lg": accentColoredShadows.lg,
    "accent-xl": accentColoredShadows.xl,
    "accent-2xl": accentColoredShadows["2xl"],

    // Glow effects
    "glow-primary": glowEffects["glow-primary"],
    "glow-primary-subtle": glowEffects["glow-primary-subtle"],
    "glow-primary-medium": glowEffects["glow-primary-medium"],
    "glow-primary-strong": glowEffects["glow-primary-strong"],
    "glow-accent": glowEffects["glow-accent"],
    "glow-accent-subtle": glowEffects["glow-accent-subtle"],
    "glow-accent-medium": glowEffects["glow-accent-medium"],
    "glow-accent-strong": glowEffects["glow-accent-strong"],

    // Focus rings (using box-shadow for focus states)
    "focus-ring": focusRings.default,
    "focus-primary": focusRings["focus-primary"],
    "focus-accent": focusRings["focus-accent"],
  },

  // Ring width (for focus rings using ring utilities)
  ringWidth: {
    DEFAULT: "3px",
    sm: "2px",
    md: "3px",
    lg: "4px",
  },

  // Ring color (for focus rings)
  ringColor: {
    DEFAULT: "hsl(var(--ring) / 0.5)",
    primary: "hsl(var(--primary-500) / 0.3)",
    accent: "hsl(var(--accent-500) / 0.3)",
    "focus-primary": "hsl(var(--primary-500) / 0.3)",
    "focus-accent": "hsl(var(--accent-500) / 0.3)",
  },
} as const;

/**
 * Type Exports
 */
export type ElevationShadow = keyof typeof elevationShadows;
export type ColoredShadow = keyof typeof primaryColoredShadows | keyof typeof accentColoredShadows;
export type GlowEffect = keyof typeof glowEffects;
export type FocusRing = keyof typeof focusRings;
