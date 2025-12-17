/**
 * Motion System V2 Tokens
 *
 * Unified, token-driven motion system for Tenerife UI.
 * CSS-only animations with gesture support, directional transitions,
 * compound animations, and reduced-motion accessibility.
 *
 * All values are CSS-compatible and mapped through CSS variables.
 * No framer-motion dependency - pure CSS animations.
 */

/**
 * Motion V2 Duration Presets
 * Optimized for smooth CSS transitions
 */
export const motionV2Durations = {
  fast: "150ms", // Quick interactions
  normal: "250ms", // Default transitions
  slow: "350ms", // Emphasized animations
  reduced: "0ms", // For prefers-reduced-motion
} as const;

/**
 * Motion V2 Easing Presets
 * Advanced cubic-bezier curves for natural motion
 */
export const motionV2Easings = {
  soft: "cubic-bezier(0.22, 1, 0.36, 1)", // Gentle, smooth
  standard: "cubic-bezier(0.4, 0, 0.2, 1)", // Material Design standard
  emphasized: "cubic-bezier(0.2, 0, 0, 1)", // Strong, decisive
} as const;

/**
 * Motion V2 Transition Presets
 * Pre-configured transitions combining duration and easing
 */
export const motionV2Transitions = {
  fast: `${motionV2Durations.fast} ${motionV2Easings.standard}`,
  normal: `${motionV2Durations.normal} ${motionV2Easings.standard}`,
  slow: `${motionV2Durations.slow} ${motionV2Easings.emphasized}`,
  soft: `${motionV2Durations.normal} ${motionV2Easings.soft}`,
  reduced: `${motionV2Durations.reduced} linear`,
} as const;

/**
 * Motion V2 Fade Animations
 * Opacity-based transitions
 */
export const motionV2Fade = {
  in: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  out: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
} as const;

/**
 * Motion V2 Scale Animations
 * Transform scale-based transitions
 */
export const motionV2Scale = {
  in: {
    from: { transform: "scale(0.95)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
  },
  out: {
    from: { transform: "scale(1)", opacity: 1 },
    to: { transform: "scale(0.95)", opacity: 0 },
  },
} as const;

/**
 * Motion V2 Slide Animations
 * Directional slide transitions
 */
export const motionV2Slide = {
  up: {
    in: {
      from: { transform: "translateY(100%)", opacity: 0 },
      to: { transform: "translateY(0)", opacity: 1 },
    },
    out: {
      from: { transform: "translateY(0)", opacity: 1 },
      to: { transform: "translateY(100%)", opacity: 0 },
    },
  },
  down: {
    in: {
      from: { transform: "translateY(-100%)", opacity: 0 },
      to: { transform: "translateY(0)", opacity: 1 },
    },
    out: {
      from: { transform: "translateY(0)", opacity: 1 },
      to: { transform: "translateY(-100%)", opacity: 0 },
    },
  },
  left: {
    in: {
      from: { transform: "translateX(100%)", opacity: 0 },
      to: { transform: "translateX(0)", opacity: 1 },
    },
    out: {
      from: { transform: "translateX(0)", opacity: 1 },
      to: { transform: "translateX(100%)", opacity: 0 },
    },
  },
  right: {
    in: {
      from: { transform: "translateX(-100%)", opacity: 0 },
      to: { transform: "translateX(0)", opacity: 1 },
    },
    out: {
      from: { transform: "translateX(0)", opacity: 1 },
      to: { transform: "translateX(-100%)", opacity: 0 },
    },
  },
} as const;

/**
 * Motion V2 Compound Animations
 * Combined fade + scale, fade + slide transitions
 */
export const motionV2Combined = {
  fadeScale: {
    in: {
      from: { transform: "scale(0.95)", opacity: 0 },
      to: { transform: "scale(1)", opacity: 1 },
    },
    out: {
      from: { transform: "scale(1)", opacity: 1 },
      to: { transform: "scale(0.95)", opacity: 0 },
    },
  },
  fadeSlideUp: {
    in: {
      from: { transform: "translateY(100%)", opacity: 0 },
      to: { transform: "translateY(0)", opacity: 1 },
    },
    out: {
      from: { transform: "translateY(0)", opacity: 1 },
      to: { transform: "translateY(100%)", opacity: 0 },
    },
  },
  fadeSlideDown: {
    in: {
      from: { transform: "translateY(-100%)", opacity: 0 },
      to: { transform: "translateY(0)", opacity: 1 },
    },
    out: {
      from: { transform: "translateY(0)", opacity: 1 },
      to: { transform: "translateY(-100%)", opacity: 0 },
    },
  },
  fadeSlideLeft: {
    in: {
      from: { transform: "translateX(100%)", opacity: 0 },
      to: { transform: "translateX(0)", opacity: 1 },
    },
    out: {
      from: { transform: "translateX(0)", opacity: 1 },
      to: { transform: "translateX(100%)", opacity: 0 },
    },
  },
  fadeSlideRight: {
    in: {
      from: { transform: "translateX(-100%)", opacity: 0 },
      to: { transform: "translateX(0)", opacity: 1 },
    },
    out: {
      from: { transform: "translateX(0)", opacity: 1 },
      to: { transform: "translateX(-100%)", opacity: 0 },
    },
  },
} as const;

/**
 * Motion V2 CSS Variables
 * CSS custom properties for runtime theming
 */
export const motionV2CSSVariables = {
  // Durations
  "--motion-duration-fast": motionV2Durations.fast,
  "--motion-duration-normal": motionV2Durations.normal,
  "--motion-duration-slow": motionV2Durations.slow,
  "--motion-duration-reduced": motionV2Durations.reduced,

  // Easings
  "--motion-easing-soft": motionV2Easings.soft,
  "--motion-easing-standard": motionV2Easings.standard,
  "--motion-easing-emphasized": motionV2Easings.emphasized,

  // Transitions
  "--motion-transition-fast": motionV2Transitions.fast,
  "--motion-transition-normal": motionV2Transitions.normal,
  "--motion-transition-slow": motionV2Transitions.slow,
  "--motion-transition-soft": motionV2Transitions.soft,
  "--motion-transition-reduced": motionV2Transitions.reduced,
} as const;

/**
 * Motion V2 Tailwind Config
 * Maps to Tailwind theme for utility classes
 */
export const motionV2TailwindConfig = {
  transitionDuration: {
    ...motionV2Durations,
  },
  transitionTimingFunction: {
    ...motionV2Easings,
  },
  keyframes: {
    // Fade
    "fade-in": motionV2Fade.in,
    "fade-out": motionV2Fade.out,
    // Scale
    "scale-in": motionV2Scale.in,
    "scale-out": motionV2Scale.out,
    // Slide
    "slide-up-in": motionV2Slide.up.in,
    "slide-up-out": motionV2Slide.up.out,
    "slide-down-in": motionV2Slide.down.in,
    "slide-down-out": motionV2Slide.down.out,
    "slide-left-in": motionV2Slide.left.in,
    "slide-left-out": motionV2Slide.left.out,
    "slide-right-in": motionV2Slide.right.in,
    "slide-right-out": motionV2Slide.right.out,
    // Combined
    "fade-scale-in": motionV2Combined.fadeScale.in,
    "fade-scale-out": motionV2Combined.fadeScale.out,
    "fade-slide-up-in": motionV2Combined.fadeSlideUp.in,
    "fade-slide-up-out": motionV2Combined.fadeSlideUp.out,
    "fade-slide-down-in": motionV2Combined.fadeSlideDown.in,
    "fade-slide-down-out": motionV2Combined.fadeSlideDown.out,
    "fade-slide-left-in": motionV2Combined.fadeSlideLeft.in,
    "fade-slide-left-out": motionV2Combined.fadeSlideLeft.out,
    "fade-slide-right-in": motionV2Combined.fadeSlideRight.in,
    "fade-slide-right-out": motionV2Combined.fadeSlideRight.out,
  } as Record<string, Record<string, Record<string, string | number>>>,
} as const;

/**
 * Type Exports
 */
export type MotionV2Duration = keyof typeof motionV2Durations;
export type MotionV2Easing = keyof typeof motionV2Easings;
export type MotionV2Transition = keyof typeof motionV2Transitions;
export type MotionV2SlideDirection = keyof typeof motionV2Slide;
export type MotionV2CombinedType = keyof typeof motionV2Combined;
