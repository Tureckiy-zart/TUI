/**
 * Motion System Tokens
 *
 * Unified, token-driven motion system for Tenerife UI.
 * CSS-only animations with gesture support, directional transitions,
 * compound animations, and reduced-motion accessibility.
 *
 * All values are CSS-compatible and mapped through CSS variables.
 * No framer-motion dependency - pure CSS animations.
 */

/**
 * Motion Duration Presets
 * Optimized for smooth CSS transitions
 */
export const motionDurations = {
  fast: "150ms", // Quick interactions
  normal: "250ms", // Default transitions
  slow: "350ms", // Emphasized animations
  reduced: "0ms", // For prefers-reduced-motion
} as const;

/**
 * Motion Easing Presets
 * Advanced cubic-bezier curves for natural motion
 */
export const motionEasings = {
  soft: "cubic-bezier(0.22, 1, 0.36, 1)", // Gentle, smooth
  standard: "cubic-bezier(0.4, 0, 0.2, 1)", // Material Design standard
  emphasized: "cubic-bezier(0.2, 0, 0, 1)", // Strong, decisive
} as const;

/**
 * Motion Transition Presets
 * Pre-configured transitions combining duration and easing
 */
export const motionTransitions = {
  fast: `${motionDurations.fast} ${motionEasings.standard}`,
  normal: `${motionDurations.normal} ${motionEasings.standard}`,
  slow: `${motionDurations.slow} ${motionEasings.emphasized}`,
  soft: `${motionDurations.normal} ${motionEasings.soft}`,
  reduced: `${motionDurations.reduced} linear`,
} as const;

/**
 * Motion Fade Animations
 * Opacity-based transitions
 */
export const motionFade = {
  in: {
    from: { opacity: "0" },
    to: { opacity: "1" },
  },
  out: {
    from: { opacity: "1" },
    to: { opacity: "0" },
  },
} as const;

/**
 * Motion Scale Animations
 * Transform scale-based transitions
 */
export const motionScale = {
  in: {
    from: { transform: "scale(0.95)", opacity: "0" },
    to: { transform: "scale(1)", opacity: "1" },
  },
  out: {
    from: { transform: "scale(1)", opacity: "1" },
    to: { transform: "scale(0.95)", opacity: "0" },
  },
} as const;

/**
 * Motion Slide Animations
 * Directional slide transitions
 */
export const motionSlide = {
  up: {
    in: {
      from: { transform: "translateY(100%)", opacity: "0" },
      to: { transform: "translateY(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateY(0)", opacity: "1" },
      to: { transform: "translateY(100%)", opacity: "0" },
    },
  },
  down: {
    in: {
      from: { transform: "translateY(-100%)", opacity: "0" },
      to: { transform: "translateY(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateY(0)", opacity: "1" },
      to: { transform: "translateY(-100%)", opacity: "0" },
    },
  },
  left: {
    in: {
      from: { transform: "translateX(100%)", opacity: "0" },
      to: { transform: "translateX(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateX(0)", opacity: "1" },
      to: { transform: "translateX(100%)", opacity: "0" },
    },
  },
  right: {
    in: {
      from: { transform: "translateX(-100%)", opacity: "0" },
      to: { transform: "translateX(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateX(0)", opacity: "1" },
      to: { transform: "translateX(-100%)", opacity: "0" },
    },
  },
} as const;

/**
 * Motion Compound Animations
 * Combined fade + scale, fade + slide transitions
 */
export const motionCombined = {
  fadeScale: {
    in: {
      from: { transform: "scale(0.95)", opacity: "0" },
      to: { transform: "scale(1)", opacity: "1" },
    },
    out: {
      from: { transform: "scale(1)", opacity: "1" },
      to: { transform: "scale(0.95)", opacity: "0" },
    },
  },
  fadeSlideUp: {
    in: {
      from: { transform: "translateY(100%)", opacity: "0" },
      to: { transform: "translateY(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateY(0)", opacity: "1" },
      to: { transform: "translateY(100%)", opacity: "0" },
    },
  },
  fadeSlideDown: {
    in: {
      from: { transform: "translateY(-100%)", opacity: "0" },
      to: { transform: "translateY(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateY(0)", opacity: "1" },
      to: { transform: "translateY(-100%)", opacity: "0" },
    },
  },
  fadeSlideLeft: {
    in: {
      from: { transform: "translateX(100%)", opacity: "0" },
      to: { transform: "translateX(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateX(0)", opacity: "1" },
      to: { transform: "translateX(100%)", opacity: "0" },
    },
  },
  fadeSlideRight: {
    in: {
      from: { transform: "translateX(-100%)", opacity: "0" },
      to: { transform: "translateX(0)", opacity: "1" },
    },
    out: {
      from: { transform: "translateX(0)", opacity: "1" },
      to: { transform: "translateX(-100%)", opacity: "0" },
    },
  },
} as const;

/**
 * Motion CSS Variables
 * CSS custom properties for runtime theming
 */
export const motionCSSVariables = {
  // Durations
  "--motion-duration-fast": motionDurations.fast,
  "--motion-duration-normal": motionDurations.normal,
  "--motion-duration-slow": motionDurations.slow,
  "--motion-duration-reduced": motionDurations.reduced,

  // Easings
  "--motion-easing-soft": motionEasings.soft,
  "--motion-easing-standard": motionEasings.standard,
  "--motion-easing-emphasized": motionEasings.emphasized,

  // Transitions
  "--motion-transition-fast": motionTransitions.fast,
  "--motion-transition-normal": motionTransitions.normal,
  "--motion-transition-slow": motionTransitions.slow,
  "--motion-transition-soft": motionTransitions.soft,
  "--motion-transition-reduced": motionTransitions.reduced,
} as const;

/**
 * Motion Transition Properties
 * Defines which CSS properties to transition
 */
export const motionTransitionProperty = {
  DEFAULT:
    "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
  colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
  opacity: "opacity",
  shadow: "box-shadow",
  transform: "transform",
  all: "all",
  none: "none",
} as const;

/**
 * Motion Tailwind Config
 * Maps to Tailwind theme for utility classes
 */
export const motionTailwindConfig = {
  transitionDuration: {
    ...motionDurations,
  },
  transitionTimingFunction: {
    ...motionEasings,
  },
  transitionProperty: {
    ...motionTransitionProperty,
  },
  keyframes: {
    // Fade
    "fade-in": motionFade.in,
    "fade-out": motionFade.out,
    // Scale
    "scale-in": motionScale.in,
    "scale-out": motionScale.out,
    // Slide
    "slide-up-in": motionSlide.up.in,
    "slide-up-out": motionSlide.up.out,
    "slide-down-in": motionSlide.down.in,
    "slide-down-out": motionSlide.down.out,
    "slide-left-in": motionSlide.left.in,
    "slide-left-out": motionSlide.left.out,
    "slide-right-in": motionSlide.right.in,
    "slide-right-out": motionSlide.right.out,
    // Combined
    "fade-scale-in": motionCombined.fadeScale.in,
    "fade-scale-out": motionCombined.fadeScale.out,
    "fade-slide-up-in": motionCombined.fadeSlideUp.in,
    "fade-slide-up-out": motionCombined.fadeSlideUp.out,
    "fade-slide-down-in": motionCombined.fadeSlideDown.in,
    "fade-slide-down-out": motionCombined.fadeSlideDown.out,
    "fade-slide-left-in": motionCombined.fadeSlideLeft.in,
    "fade-slide-left-out": motionCombined.fadeSlideLeft.out,
    "fade-slide-right-in": motionCombined.fadeSlideRight.in,
    "fade-slide-right-out": motionCombined.fadeSlideRight.out,
  } as Record<string, Record<string, Record<string, string | number>>>,
} as const;

/**
 * Reduced Motion Support
 * Respects prefers-reduced-motion media query
 */
export const motionReducedMotion = {
  /** Reduced motion duration (instant, no animation) */
  duration: "0ms",
  /** Reduced motion easing (linear for instant) */
  easing: "linear",
  /** Reduced motion transition (instant) */
  transition: "0ms linear",
  /** CSS media query for reduced motion */
  mediaQuery: "@media (prefers-reduced-motion: reduce)",
} as const;

/**
 * Type Exports
 */
export type MotionDuration = keyof typeof motionDurations;
export type MotionEasing = keyof typeof motionEasings;
export type MotionTransition = keyof typeof motionTransitions;
export type MotionSlideDirection = keyof typeof motionSlide;
export type MotionCombinedType = keyof typeof motionCombined;
