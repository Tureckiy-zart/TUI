/**
 * Tenerife Animation System (TAS) Core Engine
 *
 * Unified animation API that provides consistent motion primitives:
 * transitions, springs, keyframes, and reveal effects.
 * All animations respect user preferences for reduced motion.
 */

"use client";

import {
  type Duration,
  durations,
  type Easing,
  easings,
  reducedMotion,
  type Spring,
  springs,
  type Transition,
  transitions,
} from "@/tokens/motion";

import type { SpringConfig } from "./types";

/**
 * Check if user prefers reduced motion
 * Checks both system preference and global override
 */
export function shouldReduceMotion(override?: boolean | "auto"): boolean {
  // If explicitly set, use that value
  if (override === true) return true;
  if (override === false) return false;

  // Check system preference
  if (typeof window === "undefined") return false;

  try {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    return mediaQuery.matches;
  } catch {
    // Fallback if matchMedia is not available
    return false;
  }
}

/**
 * Get reduced motion configuration
 * Returns instant/no-op animation config when reduced motion is preferred
 */
function getReducedMotionConfig() {
  return {
    duration: 0,
    ease: "linear",
    transition: reducedMotion.transition,
  };
}

/**
 * Create CSS transition from tokens
 * Returns transition string using motion tokens
 */
export function createTransition(
  transitionName?: Transition,
  customDuration?: Duration | string,
  customEasing?: Easing | string,
  reduceMotionOverride?: boolean | "auto",
): string {
  if (shouldReduceMotion(reduceMotionOverride)) {
    return reducedMotion.transition;
  }

  // Use predefined transition if provided
  if (transitionName && transitions[transitionName]) {
    return transitions[transitionName];
  }

  // Build custom transition
  let duration: string;
  if (customDuration) {
    if (typeof customDuration === "string") {
      // Check if it's a Duration token first (e.g., "normal", "fast", "slow")
      // Duration tokens are string literals that map to CSS duration strings in the durations object
      if (customDuration in durations) {
        duration = durations[customDuration as keyof typeof durations] || durations.normal;
      } else {
        // Not a Duration token - treat as raw CSS duration string (e.g., "300ms", "0.5s")
        duration = customDuration;
      }
    } else {
      // This branch handles cases where TypeScript knows it's a Duration type (not a string)
      duration = durations[customDuration] || durations.normal;
    }
  } else {
    duration = durations.normal;
  }

  let easing: string;
  if (customEasing) {
    if (typeof customEasing === "string") {
      // Check if it's an Easing token first (e.g., "bounce", "ease-in-out")
      // Easing tokens are string literals that map to CSS easing strings in the easings object
      if (customEasing in easings) {
        easing = easings[customEasing as keyof typeof easings] || easings["ease-in-out"];
      } else {
        // Not an Easing token - treat as raw CSS easing string (e.g., "cubic-bezier(0.4, 0, 0.2, 1)")
        easing = customEasing;
      }
    } else {
      // This branch handles cases where TypeScript knows it's an Easing type (not a string)
      easing = easings[customEasing] || easings["ease-in-out"];
    }
  } else {
    easing = easings["ease-in-out"];
  }

  return `${duration} ${easing}`;
}

/**
 * Create spring configuration for Framer Motion
 * Returns spring config object using motion tokens
 */
export function createSpring(
  springName?: Spring,
  customConfig?: Partial<SpringConfig>,
  reduceMotionOverride?: boolean | "auto",
): SpringConfig {
  if (shouldReduceMotion(reduceMotionOverride)) {
    return reducedMotion.spring;
  }

  // Use predefined spring if provided
  if (springName && springName in springs) {
    return {
      ...springs[springName as keyof typeof springs],
      ...customConfig,
    };
  }

  // Use default spring with custom overrides
  return {
    ...springs.default,
    ...customConfig,
  };
}

/**
 * Convert CSS easing string to Framer Motion easing format
 * Framer Motion accepts: arrays [x1, y1, x2, y2] for cubic-bezier or predefined strings
 */
function convertEasingToFramerMotion(easing: string): string | number[] {
  // Handle predefined Framer Motion easing strings
  const framerMotionEasings: Record<string, string> = {
    linear: "linear",
    "ease-in": "easeIn",
    "ease-out": "easeOut",
    "ease-in-out": "easeInOut",
    ease: "ease",
  };

  // Check if it's a predefined easing
  const mappedEasing = framerMotionEasings[easing];
  if (mappedEasing) {
    return mappedEasing;
  }

  // Parse cubic-bezier string: "cubic-bezier(0, 0, 0.2, 1)" -> [0, 0, 0.2, 1]
  const cubicBezierMatch = easing.match(/cubic-bezier\(([^)]+)\)/);
  if (cubicBezierMatch && cubicBezierMatch[1]) {
    const values = cubicBezierMatch[1]
      .split(",")
      .map((v) => parseFloat(v.trim()))
      .filter((v) => !isNaN(v));
    if (values.length === 4) {
      return values;
    }
  }

  // Fallback: try to map common CSS easings to Framer Motion equivalents
  // If we can't convert it, return as-is (Framer Motion might handle it)
  return easing;
}

/**
 * Parse CSS duration string to seconds
 * Returns undefined if invalid
 */
function parseDurationString(durationStr: string): number | undefined {
  const match = durationStr.match(/(\d+(?:\.\d+)?)(ms|s)/);
  if (!match || !match[1]) {
    return undefined;
  }
  const value = parseFloat(match[1]);
  if (isNaN(value) || value < 0) {
    return undefined;
  }
  return match[2] === "s" ? value : value / 1000;
}

/**
 * Get animation configuration with reduced motion support
 * Returns config object that respects user preferences
 */
export function getAnimationConfig(
  config: {
    duration?: Duration | string | number;
    easing?: Easing | string;
    delay?: number;
    spring?: Spring | Partial<SpringConfig>;
    reduceMotion?: boolean | "auto";
  } = {},
): {
  duration?: number | string;
  ease?: string | number[];
  delay?: number;
  type?: "tween" | "spring";
  [key: string]: unknown;
} {
  const { duration, easing, delay, spring, reduceMotion: reduceMotionOverride } = config;

  if (shouldReduceMotion(reduceMotionOverride)) {
    return {
      duration: 0,
      ease: "linear",
      delay: 0,
    };
  }

  // If spring is specified, return spring config
  // IMPORTANT: Springs don't use duration or ease - remove them explicitly
  if (spring) {
    const springConfig =
      typeof spring === "string"
        ? createSpring(spring, undefined, reduceMotionOverride)
        : createSpring(undefined, spring as Partial<SpringConfig>, reduceMotionOverride);

    const result: {
      duration?: number | string;
      ease?: string | number[];
      delay?: number;
      type?: "tween" | "spring";
      [key: string]: unknown;
    } = {
      ...springConfig,
    };

    // Explicitly remove duration and ease - springs don't use them
    // This prevents framer-motion from receiving invalid duration values
    delete result.duration;
    delete result.ease;

    // Add delay if valid
    if (delay !== undefined && !isNaN(delay) && delay >= 0) {
      result.delay = delay / 1000; // Convert ms to seconds
    }

    return result;
  }

  // Return tween config
  const configObj: {
    duration?: number | string;
    ease?: string | number[];
    delay?: number;
    type?: "tween";
  } = {
    type: "tween",
  };

  if (duration) {
    let parsedDuration: number | undefined;

    // Handle string duration (token or CSS value)
    if (typeof duration === "string") {
      // CRITICAL: Check if it's a Duration token FIRST (e.g., "normal", "fast", "slow")
      // Duration tokens are string literals that map to CSS duration strings
      const durationValue =
        duration in durations ? durations[duration as keyof typeof durations] : duration;
      parsedDuration = parseDurationString(durationValue);
      // Log warning if token lookup failed in development
      if (
        parsedDuration === undefined &&
        duration in durations &&
        process.env.NODE_ENV === "development"
      ) {
        console.warn(
          `[TAS] Failed to parse duration token "${duration}" value "${durationValue}". Using default timing.`,
        );
      }
    } else if (typeof duration === "number") {
      // Duration is already a number (assumed to be in milliseconds)
      if (!isNaN(duration) && duration >= 0) {
        parsedDuration = duration / 1000; // Convert ms to seconds
      }
    } else {
      // Duration is a Duration token type (TypeScript type, not string literal)
      const durationValue = durations[duration as keyof typeof durations];
      if (durationValue && typeof durationValue === "string") {
        parsedDuration = parseDurationString(durationValue);
      }
    }

    // Only set duration if it's valid (number and non-negative)
    if (parsedDuration !== undefined && parsedDuration >= 0 && !isNaN(parsedDuration)) {
      configObj.duration = parsedDuration;
    }
  }

  if (easing) {
    if (typeof easing === "string") {
      // Convert CSS easing to Framer Motion format
      configObj.ease = convertEasingToFramerMotion(easing);
    } else {
      const easingValue = easings[easing];
      if (easingValue) {
        // Convert CSS easing to Framer Motion format
        configObj.ease = convertEasingToFramerMotion(easingValue);
      }
    }
  }

  // Only add delay if it's valid (non-negative, not NaN)
  if (delay !== undefined && !isNaN(delay) && delay >= 0) {
    configObj.delay = delay / 1000; // Convert ms to seconds
  }

  return configObj;
}

/**
 * Convert CSS transition to Framer Motion transition
 */
export function cssTransitionToMotionTransition(
  cssTransition: string,
  reduceMotionOverride?: boolean | "auto",
): {
  duration?: number;
  ease?: string | number[];
  type?: "tween";
} {
  if (shouldReduceMotion(reduceMotionOverride)) {
    return {
      duration: 0,
      ease: "linear",
    };
  }

  // Parse CSS transition string (e.g., "300ms ease-out")
  const parts = cssTransition.trim().split(/\s+/);
  const durationPart = parts[0] || durations.normal;
  const easingPart = parts[1] || easings["ease-in-out"];

  const match = durationPart.match(/(\d+(?:\.\d+)?)(ms|s)/);
  let duration: number | undefined;
  if (match && match[1]) {
    const value = parseFloat(match[1]);
    if (!isNaN(value) && value >= 0) {
      duration = match[2] === "s" ? value : value / 1000;
    }
  }

  // If duration is still undefined, use default from durations.normal
  if (duration === undefined) {
    const defaultMatch = durations.normal.match(/(\d+(?:\.\d+)?)(ms|s)/);
    if (defaultMatch && defaultMatch[1]) {
      const value = parseFloat(defaultMatch[1]);
      if (!isNaN(value) && value >= 0) {
        duration = defaultMatch[2] === "s" ? value : value / 1000;
      }
    }
  }

  // Ensure duration is always valid
  if (duration === undefined || isNaN(duration) || duration < 0) {
    duration = 0.3; // Default to 300ms (0.3 seconds)
  }

  return {
    type: "tween" as const,
    duration,
    ease: convertEasingToFramerMotion(easingPart),
  };
}

/**
 * Get keyframe animation configuration
 * Converts keyframe tokens to Framer Motion keyframes
 */
export function getKeyframeConfig(
  _keyframeName: string,
  reduceMotionOverride?: boolean | "auto",
): object | undefined {
  if (shouldReduceMotion(reduceMotionOverride)) {
    return undefined;
  }

  // Keyframes are handled by presets, this is a placeholder
  // Actual keyframe conversion happens in presets.ts
  return undefined;
}

/**
 * Check if animations should be enabled
 * Global check for animation enablement
 */
export function shouldEnableAnimations(
  globalEnable?: boolean,
  reduceMotionOverride?: boolean | "auto",
): boolean {
  // If globally disabled, return false
  if (globalEnable === false) return false;

  // Check reduced motion
  if (shouldReduceMotion(reduceMotionOverride)) return false;

  return true;
}

/**
 * Create reveal animation configuration
 * For scroll-triggered animations using Intersection Observer
 */
export function createRevealConfig(
  options: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    reduceMotion?: boolean | "auto";
  } = {},
): {
  initial: object;
  animate: object;
  transition: object;
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number;
  };
} {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    reduceMotion: reduceMotionOverride,
  } = options;

  if (shouldReduceMotion(reduceMotionOverride)) {
    return {
      initial: {},
      animate: {},
      transition: getReducedMotionConfig(),
      viewport: {
        once: triggerOnce,
        margin: rootMargin,
        amount: threshold,
      },
    };
  }

  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: createSpring("gentle"),
    viewport: {
      once: triggerOnce,
      margin: rootMargin,
      amount: threshold,
    },
  };
}

/**
 * Export motion tokens for direct access
 */
export { durations, easings, reducedMotion, springs, transitions };

/**
 * Export types
 */
export type { Duration, Easing, Transition };
