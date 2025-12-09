/**
 * Motion System Tokens
 *
 * Complete motion system for Tenerife UI based on design system specifications.
 * Includes: durations, easing functions, transitions, keyframe animations,
 * and reduced motion support for accessibility.
 *
 * All motion respects user preferences for reduced motion (prefers-reduced-motion).
 * Base duration unit: 100ms
 */

/**
 * Animation Duration Tokens
 * Values: instant, fast, normal, slow, slower, slowest
 * Base unit: 100ms
 */
export const durations = {
  instant: "0ms",
  fast: "150ms", // 1.5 × base (quick interactions)
  normal: "300ms", // 3 × base (default)
  slow: "500ms", // 5 × base (emphasized)
  slower: "700ms", // 7 × base (very emphasized)
  slowest: "1000ms", // 10 × base (maximum emphasis)

  // Additional granular durations
  "75": "75ms", // Ultra-fast
  "100": "100ms", // Base unit
  "200": "200ms", // Fast-normal
  "250": "250ms", // Between fast and normal
  "400": "400ms", // Between normal and slow
  "600": "600ms", // Between slow and slower
  "800": "800ms", // Between slower and slowest
} as const;

/**
 * Easing Function Tokens
 * Cubic-bezier functions for natural motion
 */
export const easings = {
  // Linear (no easing)
  linear: "linear",

  // Ease-in (accelerate) - cubic-bezier
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",

  // Ease-out (decelerate) - recommended for most UI - cubic-bezier
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",

  // Ease-in-out (accelerate and decelerate)
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",

  // Standard easing functions
  ease: "ease",

  // Advanced easing functions
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  elastic: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",

  // Material Design easing
  "ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
  "ease-in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",
} as const;

/**
 * Transition Tokens
 * Pre-configured transitions combining duration and easing
 */
export const transitions = {
  // Fast transitions (quick interactions)
  fast: `${durations.fast} ${easings["ease-out"]}`,
  "fast-in": `${durations.fast} ${easings["ease-in"]}`,
  "fast-out": `${durations.fast} ${easings["ease-out"]}`,
  "fast-in-out": `${durations.fast} ${easings["ease-in-out"]}`,

  // Normal transitions (default)
  normal: `${durations.normal} ${easings["ease-in-out"]}`,
  "normal-in": `${durations.normal} ${easings["ease-in"]}`,
  "normal-out": `${durations.normal} ${easings["ease-out"]}`,
  "normal-in-out": `${durations.normal} ${easings["ease-in-out"]}`,

  // Slow transitions (emphasized)
  slow: `${durations.slow} ${easings["ease-in-out"]}`,
  "slow-in": `${durations.slow} ${easings["ease-in"]}`,
  "slow-out": `${durations.slow} ${easings["ease-out"]}`,
  "slow-in-out": `${durations.slow} ${easings["ease-in-out"]}`,

  // Special transitions
  bounce: `${durations.normal} ${easings.bounce}`,
  elastic: `${durations.slow} ${easings.elastic}`,

  // Default (normal)
  DEFAULT: `${durations.normal} ${easings["ease-in-out"]}`,
} as const;

/**
 * Keyframe Animation Tokens
 * Pre-defined animations for common UI patterns
 */
export const keyframes = {
  // Fade animations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },

  // Slide animations
  slideInUp: {
    from: { transform: "translateY(100%)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
  slideInDown: {
    from: { transform: "translateY(-100%)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
  slideInLeft: {
    from: { transform: "translateX(-100%)", opacity: 0 },
    to: { transform: "translateX(0)", opacity: 1 },
  },
  slideInRight: {
    from: { transform: "translateX(100%)", opacity: 0 },
    to: { transform: "translateX(0)", opacity: 1 },
  },
  slideOutUp: {
    from: { transform: "translateY(0)", opacity: 1 },
    to: { transform: "translateY(-100%)", opacity: 0 },
  },
  slideOutDown: {
    from: { transform: "translateY(0)", opacity: 1 },
    to: { transform: "translateY(100%)", opacity: 0 },
  },
  slideOutLeft: {
    from: { transform: "translateX(0)", opacity: 1 },
    to: { transform: "translateX(-100%)", opacity: 0 },
  },
  slideOutRight: {
    from: { transform: "translateX(0)", opacity: 1 },
    to: { transform: "translateX(100%)", opacity: 0 },
  },

  // Scale animations
  scaleIn: {
    from: { transform: "scale(0.95)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
  },
  scaleOut: {
    from: { transform: "scale(1)", opacity: 1 },
    to: { transform: "scale(0.95)", opacity: 0 },
  },
  scaleUp: {
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.05)" },
  },
  scaleDown: {
    from: { transform: "scale(1.05)" },
    to: { transform: "scale(1)" },
  },

  // Rotation animations
  spin: {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
  spinReverse: {
    from: { transform: "rotate(360deg)" },
    to: { transform: "rotate(0deg)" },
  },

  // Pulse and bounce
  pulse: {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0.5 },
  },
  bounce: {
    "0%, 100%": {
      transform: "translateY(-25%)",
      animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
    },
    "50%": {
      transform: "translateY(0)",
      animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    },
  },

  // Shake animation
  shake: {
    "0%, 100%": { transform: "translateX(0)" },
    "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
    "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
  },

  // Ping animation
  ping: {
    "75%, 100%": {
      transform: "scale(2)",
      opacity: 0,
    },
  },

  // Accordion animations (for Radix UI)
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
} as const;

/**
 * Animation Tokens
 * Pre-configured animations combining keyframes, duration, and easing
 */
export const animations = {
  // Fade animations
  fadeIn: `fadeIn ${durations.normal} ${easings["ease-out"]}`,
  fadeOut: `fadeOut ${durations.fast} ${easings["ease-in"]}`,

  // Slide animations
  slideInUp: `slideInUp ${durations.normal} ${easings["ease-out"]}`,
  slideInDown: `slideInDown ${durations.normal} ${easings["ease-out"]}`,
  slideInLeft: `slideInLeft ${durations.normal} ${easings["ease-out"]}`,
  slideInRight: `slideInRight ${durations.normal} ${easings["ease-out"]}`,
  slideOutUp: `slideOutUp ${durations.fast} ${easings["ease-in"]}`,
  slideOutDown: `slideOutDown ${durations.fast} ${easings["ease-in"]}`,
  slideOutLeft: `slideOutLeft ${durations.fast} ${easings["ease-in"]}`,
  slideOutRight: `slideOutRight ${durations.fast} ${easings["ease-in"]}`,

  // Scale animations
  scaleIn: `scaleIn ${durations.normal} ${easings["ease-out"]}`,
  scaleOut: `scaleOut ${durations.fast} ${easings["ease-in"]}`,

  // Continuous animations
  spin: `spin 1s ${easings.linear} infinite`,
  pulse: `pulse 2s ${easings["ease-in-out"]} infinite`,
  bounce: `bounce 1s ${easings.linear} infinite`,
  ping: `ping 1s ${easings["ease-out"]} cubic-bezier(0, 0, 0.2, 1) infinite`,
  shake: `shake 0.5s ${easings["ease-in-out"]}`,

  // Accordion animations
  "accordion-down": `accordion-down ${durations.normal} ${easings["ease-out"]}`,
  "accordion-up": `accordion-up ${durations.normal} ${easings["ease-out"]}`,
} as const;

/**
 * Spring Configuration Tokens
 * For Framer Motion spring animations
 * Based on Material Design motion principles
 */
export const springs = {
  // Gentle spring (subtle, smooth)
  gentle: {
    type: "spring" as const,
    stiffness: 120,
    damping: 14,
    mass: 1,
  },

  // Default spring (balanced)
  default: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 1,
  },

  // Wobbly spring (bouncy, playful)
  wobbly: {
    type: "spring" as const,
    stiffness: 180,
    damping: 12,
    mass: 1,
  },

  // Stiff spring (quick, precise)
  stiff: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 1,
  },

  // Slow spring (smooth, deliberate)
  slow: {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
    mass: 1,
  },

  // Bouncy spring (energetic, fun)
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 10,
    mass: 1,
  },

  // No bounce (damped, controlled)
  noBounce: {
    type: "spring" as const,
    stiffness: 300,
    damping: 35,
    mass: 1,
  },
} as const;

/**
 * Reduced Motion Support
 * Respects prefers-reduced-motion media query
 */
export const reducedMotion = {
  // Reduced motion duration (instant or minimal)
  duration: "0ms",

  // Reduced motion easing (linear for instant)
  easing: "linear",

  // Reduced motion transition (instant)
  transition: "0ms linear",

  // CSS media query for reduced motion
  mediaQuery: "@media (prefers-reduced-motion: reduce)",

  // Utility class to disable animations
  disableAnimations: "animation: none !important; transition: none !important;",

  // Reduced motion spring (instant, no animation)
  spring: {
    type: "spring" as const,
    stiffness: 1000,
    damping: 100,
    mass: 1,
  },
} as const;

/**
 * CSS Custom Properties for Motion
 * These will be injected into the theme system
 */
export const motionCSSVariables = {
  // Durations
  "--duration-instant": durations.instant,
  "--duration-fast": durations.fast,
  "--duration-normal": durations.normal,
  "--duration-slow": durations.slow,
  "--duration-slower": durations.slower,
  "--duration-slowest": durations.slowest,

  // Additional granular durations
  "--duration-75": durations["75"],
  "--duration-100": durations["100"],
  "--duration-200": durations["200"],
  "--duration-250": durations["250"],
  "--duration-400": durations["400"],
  "--duration-600": durations["600"],
  "--duration-800": durations["800"],

  // Easings
  "--ease-linear": easings.linear,
  "--ease-in": easings["ease-in"],
  "--ease-out": easings["ease-out"],
  "--ease-in-out": easings["ease-in-out"],
  "--ease-bounce": easings.bounce,
  "--ease-elastic": easings.elastic,
  "--ease-out-cubic": easings["ease-out-cubic"],
  "--ease-in-cubic": easings["ease-in-cubic"],
  "--ease-in-out-cubic": easings["ease-in-out-cubic"],

  // Transitions
  "--transition-fast": transitions.fast,
  "--transition-normal": transitions.normal,
  "--transition-slow": transitions.slow,
  "--transition-default": transitions.DEFAULT,
  "--transition-fast-in": transitions["fast-in"],
  "--transition-fast-out": transitions["fast-out"],
  "--transition-fast-in-out": transitions["fast-in-out"],
  "--transition-normal-in": transitions["normal-in"],
  "--transition-normal-out": transitions["normal-out"],
  "--transition-normal-in-out": transitions["normal-in-out"],
  "--transition-slow-in": transitions["slow-in"],
  "--transition-slow-out": transitions["slow-out"],
  "--transition-slow-in-out": transitions["slow-in-out"],
  "--transition-bounce": transitions.bounce,
  "--transition-elastic": transitions.elastic,
} as const;

/**
 * Tailwind Motion Config
 * Maps to Tailwind theme.extend for durations, transitions, keyframes, animations
 */
export const tailwindMotionConfig = {
  transitionDuration: {
    ...durations,
  },

  transitionTimingFunction: {
    ...easings,
  },

  transitionProperty: {
    DEFAULT:
      "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
    colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform",
    all: "all",
    none: "none",
  },

  keyframes: {
    ...keyframes,
  } as Record<string, Record<string, Record<string, string | number>>>,

  animation: {
    ...animations,
    // Additional animation utilities
    none: "none",
    spin: animations.spin,
    pulse: animations.pulse,
    bounce: animations.bounce,
    ping: animations.ping,
    shake: animations.shake,
  },
} as const;

/**
 * Type Exports
 */
export type Duration = keyof typeof durations;
export type Easing = keyof typeof easings;
export type Transition = keyof typeof transitions;
export type Keyframe = keyof typeof keyframes;
export type Animation = keyof typeof animations;
export type Spring = keyof typeof springs;

/**
 * Motion V2 Exports
 * CSS-only motion system with gesture support
 */
export * from "./motion/v2";
