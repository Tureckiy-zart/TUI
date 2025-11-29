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
  springs,
  type Transition,
  transitions,
} from "@/tokens/motion";

import type { Spring, SpringConfig } from "./types";

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
      duration = customDuration;
    } else {
      duration = durations[customDuration] || durations.normal;
    }
  } else {
    duration = durations.normal;
  }

  let easing: string;
  if (customEasing) {
    if (typeof customEasing === "string") {
      easing = customEasing;
    } else {
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
  if (springName && springs[springName]) {
    return {
      ...springs[springName],
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
  if (spring) {
    if (typeof spring === "string") {
      return createSpring(spring, undefined, reduceMotionOverride);
    }
    return createSpring(undefined, spring, reduceMotionOverride);
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
    if (typeof duration === "string") {
      // Parse CSS duration (e.g., "300ms" -> 0.3)
      const match = duration.match(/(\d+(?:\.\d+)?)(ms|s)/);
      if (match) {
        const value = parseFloat(match[1]);
        configObj.duration = match[2] === "s" ? value : value / 1000;
      } else {
        configObj.duration = duration;
      }
    } else if (typeof duration === "number") {
      configObj.duration = duration / 1000; // Convert ms to seconds
    } else {
      const durationValue = durations[duration];
      if (durationValue) {
        const match = durationValue.match(/(\d+(?:\.\d+)?)(ms|s)/);
        if (match) {
          const value = parseFloat(match[1]);
          configObj.duration = match[2] === "s" ? value : value / 1000;
        }
      }
    }
  }

  if (easing) {
    if (typeof easing === "string") {
      configObj.ease = easing;
    } else {
      const easingValue = easings[easing];
      if (easingValue) {
        configObj.ease = easingValue;
      }
    }
  }

  if (delay !== undefined) {
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
  if (match) {
    const value = parseFloat(match[1]);
    duration = match[2] === "s" ? value : value / 1000;
  }

  return {
    type: "tween" as const,
    duration,
    ease: easingPart,
  };
}

/**
 * Get keyframe animation configuration
 * Converts keyframe tokens to Framer Motion keyframes
 */
export function getKeyframeConfig(
  keyframeName: string,
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
export type { Duration, Easing, Spring, Transition };
