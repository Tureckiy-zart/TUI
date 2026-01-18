/**
 * Spinner Component Tokens
 *
 * Component-level design tokens for Spinner component.
 * Maps foundation tokens (spacing, colors, motion) to spinner-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * Authority Compliance:
 * - Motion Authority: Uses MOTION_TOKENS.animation.spin for rotation animation
 * - Color Authority: References semantic color tokens (primary, muted, subtle)
 * - Spacing Authority: References semanticSpacing tokens for size dimensions
 * - Typography Authority: References fontSize tokens for label text
 */

import { GRADIENT_TOKENS } from "../gradients";
import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Spinner Component Tokens
 *
 * Defines all sizing, color, and motion tokens for Spinner component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const SPINNER_TOKENS = {
  /**
   * Spinner size tokens (width and height)
   * Maps to GlobalSize scale: xs, sm, md, lg, xl, 2xl, 3xl
   * Uses Tailwind width/height utilities that map to spacing tokens
   */
  size: {
    xs: "w-3 h-3", // Extra small: 12px (0.75rem) - maps to spacing[3]
    sm: "w-4 h-4", // Small: 16px (1rem) - maps to spacing[4]
    md: "w-5 h-5", // Medium: 20px (1.25rem) - maps to spacing[5] - DEFAULT
    lg: "w-6 h-6", // Large: 24px (1.5rem) - maps to spacing[6]
    xl: "w-8 h-8", // Extra large: 32px (2rem) - maps to spacing[8]
    "2xl": "w-12 h-12", // 2X large: 48px (3rem) - maps to spacing[12]
    "3xl": "w-16 h-16", // 3X large: 64px (4rem) - maps to spacing[16]
  } as const,

  /**
   * Spinner tone tokens (color variants)
   * Maps to semantic color tokens via CSS variables
   */
  tone: {
    primary: "text-[hsl(var(--tm-primary))]", // Primary color - default tone
    muted: "text-[hsl(var(--tm-text-muted))]", // Muted color - subtle tone
    subtle: "text-[hsl(var(--tm-muted))]", // Subtle color - very subtle tone
  } as const,

  /**
   * Motion token for spin animation
   * Uses MOTION_TOKENS.animation.spin (animate-spin Tailwind utility)
   * Respects prefers-reduced-motion via CSS variables
   */
  animation: MOTION_TOKENS.animation.spin, // "animate-spin" - spin animation

  /**
   * Gap token between spinner and label
   * Uses semantic spacing tokens
   */
  labelGap: {
    xs: "gap-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
    sm: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    md: "gap-md", // 16px (1rem) - maps to semanticSpacing.md
    lg: "gap-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
    xl: "gap-xl", // 32px (2rem) - maps to semanticSpacing.xl
    "2xl": "gap-2xl", // 48px (3rem) - maps to semanticSpacing.2xl
    "3xl": "gap-3xl", // 64px (4rem) - maps to semanticSpacing.3xl
  } as const,

  /**
   * Border width token for spinner circle
   * Consistent border width across all sizes
   */
  borderWidth: "border-2", // 2px border width - standard Tailwind utility

  /**
   * Border style token
   * Solid border style for spinner circle
   */
  borderStyle: "border-solid", // Solid border style - standard Tailwind utility

  /**
   * Border color token (transparent for spinner effect)
   * Spinner uses border color for the visible arc, background is transparent
   */
  borderColor: {
    primary: "border-[hsl(var(--tm-primary))]", // Primary border color
    muted: "border-[hsl(var(--tm-text-muted))]", // Muted border color
    subtle: "border-[hsl(var(--tm-muted))]", // Subtle border color
  } as const,

  /**
   * Background color token (transparent)
   * Spinner circle background is transparent to show only the arc
   */
  background: "bg-transparent", // Transparent background - standard Tailwind utility

  /**
   * Border radius token (full circle)
   * Spinner is always circular
   */
  radius: "rounded-full", // Full circle - standard Tailwind utility

  /**
   * Dot size tokens for dots and bounce variants
   * Maps to GlobalSize scale: xs, sm, md, lg, xl, 2xl, 3xl
   * Uses Tailwind width/height utilities for individual dots
   */
  dotSize: {
    xs: "w-1 h-1", // Extra small: 4px (0.25rem)
    sm: "w-1.5 h-1.5", // Small: 6px (0.375rem)
    md: "w-2 h-2", // Medium: 8px (0.5rem) - DEFAULT
    lg: "w-2.5 h-2.5", // Large: 10px (0.625rem)
    xl: "w-3 h-3", // Extra large: 12px (0.75rem)
    "2xl": "w-4 h-4", // 2X large: 16px (1rem)
    "3xl": "w-5 h-5", // 3X large: 20px (1.25rem)
  } as const,

  /**
   * Dot gap tokens for dots and bounce variants
   * Spacing between dots based on spinner size
   */
  dotGap: {
    xs: "gap-1", // 4px (0.25rem)
    sm: "gap-1.5", // 6px (0.375rem)
    md: "gap-2", // 8px (0.5rem) - DEFAULT
    lg: "gap-2.5", // 10px (0.625rem)
    xl: "gap-3", // 12px (0.75rem)
    "2xl": "gap-4", // 16px (1rem)
    "3xl": "gap-5", // 20px (1.25rem)
  } as const,

  /**
   * Linear track height tokens
   * Height of the linear spinner track based on size
   */
  linearTrackHeight: {
    xs: "h-0.5", // 2px (0.125rem)
    sm: "h-1", // 4px (0.25rem)
    md: "h-1.5", // 6px (0.375rem) - DEFAULT
    lg: "h-2", // 8px (0.5rem)
    xl: "h-2.5", // 10px (0.625rem)
    "2xl": "h-3", // 12px (0.75rem)
    "3xl": "h-4", // 16px (1rem)
  } as const,

  /**
   * Linear bar height tokens
   * Height of the moving bar in linear spinner (matches track height)
   */
  linearBarHeight: {
    xs: "h-0.5", // 2px (0.125rem)
    sm: "h-1", // 4px (0.25rem)
    md: "h-1.5", // 6px (0.375rem) - DEFAULT
    lg: "h-2", // 8px (0.5rem)
    xl: "h-2.5", // 10px (0.625rem)
    "2xl": "h-3", // 12px (0.75rem)
    "3xl": "h-4", // 16px (1rem)
  } as const,

  /**
   * Linear track width tokens
   * Width of the linear spinner track based on size
   */
  linearTrackWidth: {
    xs: "w-12", // 48px (3rem)
    sm: "w-16", // 64px (4rem)
    md: "w-20", // 80px (5rem) - DEFAULT
    lg: "w-24", // 96px (6rem)
    xl: "w-32", // 128px (8rem)
    "2xl": "w-40", // 160px (10rem)
    "3xl": "w-48", // 192px (12rem)
  } as const,

  /**
   * Linear track background color token
   * Background color for the linear spinner track
   */
  linearTrackBackground: "bg-[hsl(var(--tm-muted))]", // Muted background color for linear track

  /**
   * Ring gradient tokens
   * Conic gradient for ring variant spinner
   * References GRADIENT_TOKENS.ring for consistency
   */
  ringGradient: {
    primary: GRADIENT_TOKENS.ring.primary,
    muted: GRADIENT_TOKENS.ring.muted,
    subtle: GRADIENT_TOKENS.ring.subtle,
  } as const,

  /**
   * Bars (vertical bars) tokens
   * Width and height of individual bars, gap between bars
   */
  barsBarWidth: {
    xs: "w-0.5", // 2px (0.125rem)
    sm: "w-1", // 4px (0.25rem)
    md: "w-1", // 4px (0.25rem) - DEFAULT
    lg: "w-1.5", // 6px (0.375rem)
    xl: "w-2", // 8px (0.5rem)
    "2xl": "w-2.5", // 10px (0.625rem)
    "3xl": "w-3", // 12px (0.75rem)
  } as const,

  barsBarHeight: {
    xs: "h-3", // 12px (0.75rem)
    sm: "h-4", // 16px (1rem)
    md: "h-5", // 20px (1.25rem) - DEFAULT
    lg: "h-6", // 24px (1.5rem)
    xl: "h-8", // 32px (2rem)
    "2xl": "h-12", // 48px (3rem)
    "3xl": "h-16", // 64px (4rem)
  } as const,

  barsGap: {
    xs: "gap-0.5", // 2px (0.125rem)
    sm: "gap-1", // 4px (0.25rem)
    md: "gap-1", // 4px (0.25rem) - DEFAULT
    lg: "gap-1.5", // 6px (0.375rem)
    xl: "gap-2", // 8px (0.5rem)
    "2xl": "gap-2.5", // 10px (0.625rem)
    "3xl": "gap-3", // 12px (0.75rem)
  } as const,

  /**
   * Bars horizontal tokens
   * Height and width of individual bars, gap between bars
   */
  barsHorizontalBarHeight: {
    xs: "h-0.5", // 2px (0.125rem)
    sm: "h-1", // 4px (0.25rem)
    md: "h-1", // 4px (0.25rem) - DEFAULT
    lg: "h-1.5", // 6px (0.375rem)
    xl: "h-2", // 8px (0.5rem)
    "2xl": "h-2.5", // 10px (0.625rem)
    "3xl": "h-3", // 12px (0.75rem)
  } as const,

  barsHorizontalBarWidth: {
    xs: "w-3", // 12px (0.75rem)
    sm: "w-4", // 16px (1rem)
    md: "w-5", // 20px (1.25rem) - DEFAULT
    lg: "w-6", // 24px (1.5rem)
    xl: "w-8", // 32px (2rem)
    "2xl": "w-12", // 48px (3rem)
    "3xl": "w-16", // 64px (4rem)
  } as const,

  barsHorizontalGap: {
    xs: "gap-0.5", // 2px (0.125rem)
    sm: "gap-1", // 4px (0.25rem)
    md: "gap-1", // 4px (0.25rem) - DEFAULT
    lg: "gap-1.5", // 6px (0.375rem)
    xl: "gap-2", // 8px (0.5rem)
    "2xl": "gap-2.5", // 10px (0.625rem)
    "3xl": "gap-3", // 12px (0.75rem)
  } as const,

  /**
   * Wave tokens
   * Size of wave dots and gap between them
   */
  waveDotSize: {
    xs: "w-1 h-1", // 4px (0.25rem)
    sm: "w-1.5 h-1.5", // 6px (0.375rem)
    md: "w-2 h-2", // 8px (0.5rem) - DEFAULT
    lg: "w-2.5 h-2.5", // 10px (0.625rem)
    xl: "w-3 h-3", // 12px (0.75rem)
    "2xl": "w-4 h-4", // 16px (1rem)
    "3xl": "w-5 h-5", // 20px (1.25rem)
  } as const,

  waveGap: {
    xs: "gap-1", // 4px (0.25rem)
    sm: "gap-1.5", // 6px (0.375rem)
    md: "gap-2", // 8px (0.5rem) - DEFAULT
    lg: "gap-2.5", // 10px (0.625rem)
    xl: "gap-3", // 12px (0.75rem)
    "2xl": "gap-4", // 16px (1rem)
    "3xl": "gap-5", // 20px (1.25rem)
  } as const,

  /**
   * Orbit tokens
   * Radius of orbit circle and size of orbiting dots
   */
  orbitRadius: {
    xs: "w-3 h-3", // 12px (0.75rem) - container size
    sm: "w-4 h-4", // 16px (1rem)
    md: "w-5 h-5", // 20px (1.25rem) - DEFAULT
    lg: "w-6 h-6", // 24px (1.5rem)
    xl: "w-8 h-8", // 32px (2rem)
    "2xl": "w-12 h-12", // 48px (3rem)
    "3xl": "w-16 h-16", // 64px (4rem)
  } as const,

  orbitDotSize: {
    xs: "w-1 h-1", // 4px (0.25rem)
    sm: "w-1.5 h-1.5", // 6px (0.375rem)
    md: "w-2 h-2", // 8px (0.5rem) - DEFAULT
    lg: "w-2.5 h-2.5", // 10px (0.625rem)
    xl: "w-3 h-3", // 12px (0.75rem)
    "2xl": "w-4 h-4", // 16px (1rem)
    "3xl": "w-5 h-5", // 20px (1.25rem)
  } as const,

  /**
   * Ripple tokens
   * Size of ripple circles
   */
  rippleSize: {
    xs: "w-3 h-3", // 12px (0.75rem)
    sm: "w-4 h-4", // 16px (1rem)
    md: "w-5 h-5", // 20px (1.25rem) - DEFAULT
    lg: "w-6 h-6", // 24px (1.5rem)
    xl: "w-8 h-8", // 32px (2rem)
    "2xl": "w-12 h-12", // 48px (3rem)
    "3xl": "w-16 h-16", // 64px (4rem)
  } as const,

  /**
   * Animation tokens for different variants
   */
  animationVariants: {
    spin: MOTION_TOKENS.animation.spin, // "animate-spin" - for circle, ring, and orbit
    pulse: MOTION_TOKENS.animation.pulse, // "animate-pulse" - for dots and pulse variant
    bounce: MOTION_TOKENS.animation.bounce, // "animate-bounce" - for bounce variant
    linear: "animate-spinner-linear", // Custom animation for linear variant
    bars: "animate-spinner-bars", // Custom animation for bars variant
    wave: "animate-spinner-wave", // Custom animation for wave variant
    ripple: "animate-spinner-ripple", // Custom animation for ripple variant
  } as const,

  /**
   * Easing tokens for animation timing functions
   * Controls how animation speed changes over time
   */
  easing: {
    linear: "linear", // Constant speed
    "ease-in": "ease-in", // Accelerates to end
    "ease-out": "ease-out", // Decelerates to end
    "ease-in-out": "ease-in-out", // Accelerates in beginning, decelerates at end
  } as const,
} as const;

/**
 * Type exports for Spinner tokens
 */
export type SpinnerSizeToken = keyof typeof SPINNER_TOKENS.size;
export type SpinnerToneToken = keyof typeof SPINNER_TOKENS.tone;
export type SpinnerLabelGapToken = keyof typeof SPINNER_TOKENS.labelGap;
export type SpinnerDotSizeToken = keyof typeof SPINNER_TOKENS.dotSize;
export type SpinnerDotGapToken = keyof typeof SPINNER_TOKENS.dotGap;
export type SpinnerLinearTrackHeightToken = keyof typeof SPINNER_TOKENS.linearTrackHeight;
export type SpinnerLinearBarHeightToken = keyof typeof SPINNER_TOKENS.linearBarHeight;
export type SpinnerLinearTrackWidthToken = keyof typeof SPINNER_TOKENS.linearTrackWidth;
export type SpinnerRingGradientToken = keyof typeof SPINNER_TOKENS.ringGradient;
export type SpinnerBarsBarWidthToken = keyof typeof SPINNER_TOKENS.barsBarWidth;
export type SpinnerBarsBarHeightToken = keyof typeof SPINNER_TOKENS.barsBarHeight;
export type SpinnerBarsGapToken = keyof typeof SPINNER_TOKENS.barsGap;
export type SpinnerBarsHorizontalBarHeightToken =
  keyof typeof SPINNER_TOKENS.barsHorizontalBarHeight;
export type SpinnerBarsHorizontalBarWidthToken = keyof typeof SPINNER_TOKENS.barsHorizontalBarWidth;
export type SpinnerBarsHorizontalGapToken = keyof typeof SPINNER_TOKENS.barsHorizontalGap;
export type SpinnerWaveDotSizeToken = keyof typeof SPINNER_TOKENS.waveDotSize;
export type SpinnerWaveGapToken = keyof typeof SPINNER_TOKENS.waveGap;
export type SpinnerOrbitRadiusToken = keyof typeof SPINNER_TOKENS.orbitRadius;
export type SpinnerOrbitDotSizeToken = keyof typeof SPINNER_TOKENS.orbitDotSize;
export type SpinnerRippleSizeToken = keyof typeof SPINNER_TOKENS.rippleSize;
export type SpinnerEasingToken = keyof typeof SPINNER_TOKENS.easing;
