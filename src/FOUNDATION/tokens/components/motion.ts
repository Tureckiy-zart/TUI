/**
 * Motion Component Tokens
 *
 * Component-level design tokens for Motion/Animation utilities.
 * Maps foundation motion tokens (durations, easings, transitions) to Tailwind utility classes.
 *
 * All values use Tailwind utility classes that map to foundation motion tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Motion Component Tokens
 *
 * Defines transition, duration, and easing tokens for component usage.
 * Values are mapped to Tailwind utility classes for direct use in components.
 */
export const MOTION_TOKENS = {
  /**
   * Transition property tokens
   * Maps to Tailwind transition utilities
   */
  transition: {
    all: "transition-all", // All properties
    colors: "transition-colors", // Color properties only
    opacity: "transition-opacity", // Opacity only
    transform: "transition-transform", // Transform only
    shadow: "transition-shadow", // Box shadow only
    none: "transition-none", // No transition
  } as const,

  /**
   * Duration tokens
   * Maps to foundation motion duration tokens via Tailwind
   */
  duration: {
    instant: "duration-0", // 0ms
    fast: "duration-fast", // 150ms - maps to motion.durations.fast
    normal: "duration-normal", // 300ms - maps to motion.durations.normal
    slow: "duration-slow", // 500ms - maps to motion.durations.slow
    slower: "duration-slower", // 700ms - maps to motion.durations.slower
    slowest: "duration-slowest", // 1000ms - maps to motion.durations.slowest
    // Granular durations
    "75": "duration-75", // 75ms
    "100": "duration-100", // 100ms
    "200": "duration-200", // 200ms
    "250": "duration-250", // 250ms
    "300": "duration-300", // 300ms
    "400": "duration-400", // 400ms
    "500": "duration-500", // 500ms
    "600": "duration-600", // 600ms
    "700": "duration-700", // 700ms
    "800": "duration-800", // 800ms
    "1000": "duration-1000", // 1000ms
  } as const,

  /**
   * Easing tokens
   * Maps to foundation motion easing tokens via Tailwind
   */
  easing: {
    linear: "ease-linear", // Linear easing
    in: "ease-in", // Ease in
    out: "ease-out", // Ease out (recommended for most UI)
    "in-out": "ease-in-out", // Ease in-out
    bounce: "ease-bounce", // Bounce easing
    elastic: "ease-elastic", // Elastic easing
  } as const,

  /**
   * Pre-configured transition tokens
   * Combines duration and easing for common use cases
   */
  transitionPreset: {
    fast: "transition-all duration-fast ease-out", // Fast transition
    normal: "transition-all duration-normal ease-in-out", // Normal transition (default)
    slow: "transition-all duration-slow ease-in-out", // Slow transition
    colors: "transition-colors duration-normal ease-out", // Color transitions (common)
    transform: "transition-transform duration-normal ease-out", // Transform transitions
    opacity: "transition-opacity duration-fast ease-out", // Opacity transitions
  } as const,

  /**
   * Animation tokens
   * Maps to foundation motion animation tokens via Tailwind
   */
  animation: {
    none: "animate-none", // No animation
    spin: "animate-spin", // Spin animation
    pulse: "animate-pulse", // Pulse animation
    bounce: "animate-bounce", // Bounce animation
    ping: "animate-ping", // Ping animation
    shake: "animate-shake", // Shake animation
    fadeIn: "animate-fadeIn", // Fade in
    fadeOut: "animate-fadeOut", // Fade out
    slideInUp: "animate-slideInUp", // Slide in from bottom
    slideInDown: "animate-slideInDown", // Slide in from top
    slideInLeft: "animate-slideInLeft", // Slide in from right
    slideInRight: "animate-slideInRight", // Slide in from left
    scaleIn: "animate-scaleIn", // Scale in
    scaleOut: "animate-scaleOut", // Scale out
  } as const,
} as const;

/**
 * Type exports for Motion tokens
 */
export type MotionTransition = keyof typeof MOTION_TOKENS.transition;
export type MotionDuration = keyof typeof MOTION_TOKENS.duration;
export type MotionEasing = keyof typeof MOTION_TOKENS.easing;
export type MotionTransitionPreset = keyof typeof MOTION_TOKENS.transitionPreset;
export type MotionAnimation = keyof typeof MOTION_TOKENS.animation;
