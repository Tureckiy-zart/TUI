/**
 * Spacing System Tokens
 *
 * Complete spacing system for Tenerife UI based on 8px grid system.
 * Includes: base spacing scale (0-96), semantic spacing tokens (xs..5xl),
 * and layout spacing tokens (sections, containers, grids).
 *
 * Base unit: 8px (0.5rem)
 * All spacing values are multiples of 8px for consistent layout rhythm.
 */

/**
 * Base Spacing Scale
 * Values from 0 to 96 based on 8px grid system
 * Format: numeric keys map to rem values
 */
export const spacing = {
  // Zero spacing
  0: "0",
  px: "1px",

  // Half unit (4px)
  0.5: "0.125rem", // 4px

  // Base unit multiples (8px increments)
  1: "0.25rem", // 4px (half unit, common)
  1.5: "0.375rem", // 6px (rare, for fine adjustments)
  2: "0.5rem", // 8px (base unit)
  2.5: "0.625rem", // 10px (rare)
  3: "0.75rem", // 12px (1.5 × base)
  3.5: "0.875rem", // 14px (rare)
  4: "1rem", // 16px (2 × base)
  5: "1.25rem", // 20px (2.5 × base)
  6: "1.5rem", // 24px (3 × base)
  7: "1.75rem", // 28px (3.5 × base)
  8: "2rem", // 32px (4 × base)
  9: "2.25rem", // 36px (4.5 × base)
  10: "2.5rem", // 40px (5 × base)
  11: "2.75rem", // 44px (5.5 × base)
  12: "3rem", // 48px (6 × base)
  14: "3.5rem", // 56px (7 × base)
  16: "4rem", // 64px (8 × base)
  20: "5rem", // 80px (10 × base)
  24: "6rem", // 96px (12 × base)

  // Extended scale for larger spacing
  28: "7rem", // 112px (14 × base)
  32: "8rem", // 128px (16 × base)
  36: "9rem", // 144px (18 × base)
  40: "10rem", // 160px (20 × base)
  44: "11rem", // 176px (22 × base)
  48: "12rem", // 192px (24 × base)
  52: "13rem", // 208px (26 × base)
  56: "14rem", // 224px (28 × base)
  60: "15rem", // 240px (30 × base)
  64: "16rem", // 256px (32 × base)
  72: "18rem", // 288px (36 × base)
  80: "20rem", // 320px (40 × base)
  96: "24rem", // 384px (48 × base)
} as const;

/**
 * Semantic Spacing Tokens
 * Named tokens for common spacing use cases
 * Maps to base spacing scale
 */
export const semanticSpacing = {
  // Extra small spacing (tight, minimal)
  xs: spacing[1], // 4px (0.25rem)

  // Small spacing (compact)
  sm: spacing[2], // 8px (0.5rem)

  // Medium spacing (default)
  md: spacing[4], // 16px (1rem)

  // Large spacing (spacious)
  lg: spacing[6], // 24px (1.5rem)

  // Extra large spacing (very spacious)
  xl: spacing[8], // 32px (2rem)

  // 2XL spacing (section-level)
  "2xl": spacing[12], // 48px (3rem)

  // 3XL spacing (major sections)
  "3xl": spacing[16], // 64px (4rem)

  // 4XL spacing (page sections)
  "4xl": spacing[20], // 80px (5rem)

  // 5XL spacing (hero sections)
  "5xl": spacing[24], // 96px (6rem)

  // None (no spacing)
  none: spacing[0], // 0
} as const;

/**
 * Layout Spacing Tokens
 * Spacing for common layout patterns
 */
export const layoutSpacing = {
  // Section spacing (vertical spacing between major sections)
  section: {
    xs: spacing[6], // 24px (compact sections)
    sm: spacing[8], // 32px (small sections)
    md: spacing[12], // 48px (default sections)
    lg: spacing[16], // 64px (large sections)
    xl: spacing[20], // 80px (extra large sections)
    "2xl": spacing[24], // 96px (hero sections)
  },

  // Container spacing (padding inside containers)
  container: {
    xs: spacing[2], // 8px (tight containers)
    sm: spacing[4], // 16px (compact containers)
    md: spacing[6], // 24px (default containers)
    lg: spacing[8], // 32px (spacious containers)
    xl: spacing[12], // 48px (very spacious containers)
  },

  // Grid spacing (gap between grid items)
  grid: {
    xs: spacing[2], // 8px (tight grids)
    sm: spacing[4], // 16px (compact grids)
    md: spacing[6], // 24px (default grids)
    lg: spacing[8], // 32px (spacious grids)
    xl: spacing[12], // 48px (very spacious grids)
  },

  // Stack spacing (gap between stacked items)
  stack: {
    xs: spacing[1], // 4px (tight stacks)
    sm: spacing[2], // 8px (compact stacks)
    md: spacing[4], // 16px (default stacks)
    lg: spacing[6], // 24px (spacious stacks)
    xl: spacing[8], // 32px (very spacious stacks)
  },

  // Component internal spacing (padding inside components)
  component: {
    xs: spacing[1], // 4px (tight components)
    sm: spacing[2], // 8px (compact components)
    md: spacing[4], // 16px (default components)
    lg: spacing[6], // 24px (spacious components)
    xl: spacing[8], // 32px (extra spacious components)
  },
} as const;

/**
 * CSS Custom Properties for Spacing
 * These will be injected into the theme system
 */
export const spacingCSSVariables = {
  // Base spacing scale
  "--spacing-0": spacing[0],
  "--spacing-px": spacing.px,
  "--spacing-0-5": spacing[0.5],
  "--spacing-1": spacing[1],
  "--spacing-1-5": spacing[1.5],
  "--spacing-2": spacing[2],
  "--spacing-2-5": spacing[2.5],
  "--spacing-3": spacing[3],
  "--spacing-3-5": spacing[3.5],
  "--spacing-4": spacing[4],
  "--spacing-5": spacing[5],
  "--spacing-6": spacing[6],
  "--spacing-7": spacing[7],
  "--spacing-8": spacing[8],
  "--spacing-9": spacing[9],
  "--spacing-10": spacing[10],
  "--spacing-11": spacing[11],
  "--spacing-12": spacing[12],
  "--spacing-14": spacing[14],
  "--spacing-16": spacing[16],
  "--spacing-20": spacing[20],
  "--spacing-24": spacing[24],

  // Semantic spacing
  "--spacing-xs": semanticSpacing.xs,
  "--spacing-sm": semanticSpacing.sm,
  "--spacing-md": semanticSpacing.md,
  "--spacing-lg": semanticSpacing.lg,
  "--spacing-xl": semanticSpacing.xl,
  "--spacing-2xl": semanticSpacing["2xl"],
  "--spacing-3xl": semanticSpacing["3xl"],
  "--spacing-4xl": semanticSpacing["4xl"],
  "--spacing-5xl": semanticSpacing["5xl"],
  "--spacing-none": semanticSpacing.none,

  // Layout spacing - sections
  "--layout-section-xs": layoutSpacing.section.xs,
  "--layout-section-sm": layoutSpacing.section.sm,
  "--layout-section-md": layoutSpacing.section.md,
  "--layout-section-lg": layoutSpacing.section.lg,
  "--layout-section-xl": layoutSpacing.section.xl,
  "--layout-section-2xl": layoutSpacing.section["2xl"],

  // Layout spacing - containers
  "--layout-container-xs": layoutSpacing.container.xs,
  "--layout-container-sm": layoutSpacing.container.sm,
  "--layout-container-md": layoutSpacing.container.md,
  "--layout-container-lg": layoutSpacing.container.lg,
  "--layout-container-xl": layoutSpacing.container.xl,

  // Layout spacing - grids
  "--layout-grid-xs": layoutSpacing.grid.xs,
  "--layout-grid-sm": layoutSpacing.grid.sm,
  "--layout-grid-md": layoutSpacing.grid.md,
  "--layout-grid-lg": layoutSpacing.grid.lg,
  "--layout-grid-xl": layoutSpacing.grid.xl,

  // Layout spacing - stacks
  "--layout-stack-xs": layoutSpacing.stack.xs,
  "--layout-stack-sm": layoutSpacing.stack.sm,
  "--layout-stack-md": layoutSpacing.stack.md,
  "--layout-stack-lg": layoutSpacing.stack.lg,
  "--layout-stack-xl": layoutSpacing.stack.xl,

  // Layout spacing - components
  "--layout-component-xs": layoutSpacing.component.xs,
  "--layout-component-sm": layoutSpacing.component.sm,
  "--layout-component-md": layoutSpacing.component.md,
  "--layout-component-lg": layoutSpacing.component.lg,
  "--layout-component-xl": layoutSpacing.component.xl,
} as const;

/**
 * Tailwind Spacing Config
 * Maps to Tailwind theme.extend.spacing
 */
export const tailwindSpacingConfig = {
  spacing: {
    ...spacing,
    // Add semantic tokens as aliases
    xs: semanticSpacing.xs,
    sm: semanticSpacing.sm,
    md: semanticSpacing.md,
    lg: semanticSpacing.lg,
    xl: semanticSpacing.xl,
    "2xl": semanticSpacing["2xl"],
    "3xl": semanticSpacing["3xl"],
    "4xl": semanticSpacing["4xl"],
    "5xl": semanticSpacing["5xl"],
    none: semanticSpacing.none,
  } as Record<string, string>,
} as const;

/**
 * Type Exports
 */
export type Spacing = keyof typeof spacing;
export type SemanticSpacing = keyof typeof semanticSpacing;
export type SectionSpacing = keyof typeof layoutSpacing.section;
export type ContainerSpacing = keyof typeof layoutSpacing.container;
export type GridSpacing = keyof typeof layoutSpacing.grid;
export type StackSpacing = keyof typeof layoutSpacing.stack;
export type ComponentSpacing = keyof typeof layoutSpacing.component;
