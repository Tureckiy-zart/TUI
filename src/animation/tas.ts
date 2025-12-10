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
  type Transition,
  transitions,
} from "@/tokens/motion";

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
 * Export motion tokens for direct access
 */
export { durations, easings, reducedMotion, transitions };

/**
 * Export types
 */
export type { Duration, Easing, Transition };
