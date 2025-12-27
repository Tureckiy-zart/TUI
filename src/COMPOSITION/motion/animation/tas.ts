/**
 * Tenerife Animation System (TAS) Core Engine
 *
 * Unified animation API that provides consistent motion primitives:
 * transitions, springs, keyframes, and reveal effects.
 * All animations respect user preferences for reduced motion.
 */

"use client";

import {
  type MotionDuration,
  motionDurations,
  type MotionEasing,
  motionEasings,
  motionReducedMotion,
  type MotionTransition,
  motionTransitions,
} from "@/FOUNDATION/tokens/motion/v2";

// Re-export types with simpler names for backward compatibility
export type Duration = MotionDuration;
export type Easing = MotionEasing;
export type Transition = MotionTransition;

/**
 * Check if user prefers reduced motion
 * Checks both system preference and global override
 */
export function shouldReduceMotion(override?: boolean | "auto"): boolean {
  // #region agent log
  fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "tas.ts:shouldReduceMotion:entry",
      message: "shouldReduceMotion called",
      data: { override, typeofWindow: typeof window },
      timestamp: Date.now(),
      sessionId: "debug-session",
      runId: "run1",
      hypothesisId: "A",
    }),
  }).catch(() => {});
  // #endregion
  // If explicitly set, use that value
  if (override === true) {
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "tas.ts:shouldReduceMotion:override-true",
        message: "override is true, returning true",
        data: { override },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "run1",
        hypothesisId: "A",
      }),
    }).catch(() => {});
    // #endregion
    return true;
  }
  if (override === false) {
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "tas.ts:shouldReduceMotion:override-false",
        message: "override is false, returning false",
        data: { override },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "run1",
        hypothesisId: "A",
      }),
    }).catch(() => {});
    // #endregion
    return false;
  }

  // Check system preference
  if (typeof window === "undefined") {
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "tas.ts:shouldReduceMotion:no-window",
        message: "window is undefined (SSR), returning false",
        data: {},
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "run1",
        hypothesisId: "A",
      }),
    }).catch(() => {});
    // #endregion
    return false;
  }

  try {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const { matches } = mediaQuery;
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "tas.ts:shouldReduceMotion:media-query",
        message: "matchMedia result",
        data: { matches, mediaQueryMatches: mediaQuery.matches },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "run1",
        hypothesisId: "A",
      }),
    }).catch(() => {});
    // #endregion
    return matches;
  } catch (error) {
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "tas.ts:shouldReduceMotion:error",
        message: "matchMedia error, returning false",
        data: { error: String(error) },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "run1",
        hypothesisId: "A",
      }),
    }).catch(() => {});
    // #endregion
    // Fallback if matchMedia is not available
    return false;
  }
}

/**
 * Create CSS transition from tokens
 * Returns transition string using Motion V2 tokens
 */
export function createTransition(
  transitionName?: Transition,
  customDuration?: Duration | string,
  customEasing?: Easing | string,
  reduceMotionOverride?: boolean | "auto",
): string {
  if (shouldReduceMotion(reduceMotionOverride)) {
    return motionReducedMotion.transition;
  }

  // Use predefined transition if provided
  if (transitionName && motionTransitions[transitionName]) {
    return motionTransitions[transitionName];
  }

  // Build custom transition
  // Note: This function allows raw CSS strings as fallback for edge cases,
  // but prefer using Duration and Easing tokens when possible (Motion Authority compliance)
  let duration: string;
  if (customDuration) {
    if (typeof customDuration === "string") {
      // Check if it's a Duration token first (e.g., "normal", "fast", "slow")
      // Duration tokens are string literals that map to CSS duration strings
      if (customDuration in motionDurations) {
        duration =
          motionDurations[customDuration as keyof typeof motionDurations] || motionDurations.normal;
      } else {
        // Not a Duration token - treat as raw CSS duration string (e.g., "300ms", "0.5s")
        // WARNING: This bypasses Motion Authority. Prefer Duration tokens when possible.
        duration = customDuration;
      }
    } else {
      // This branch handles cases where TypeScript knows it's a Duration type (not a string)
      duration = motionDurations[customDuration] || motionDurations.normal;
    }
  } else {
    duration = motionDurations.normal;
  }

  let easing: string;
  if (customEasing) {
    if (typeof customEasing === "string") {
      // Check if it's an Easing token first (e.g., "soft", "standard", "emphasized")
      // Easing tokens are string literals that map to CSS easing strings
      if (customEasing in motionEasings) {
        easing =
          motionEasings[customEasing as keyof typeof motionEasings] || motionEasings.standard;
      } else {
        // Not an Easing token - treat as raw CSS easing string (e.g., "cubic-bezier(0.4, 0, 0.2, 1)")
        // WARNING: This bypasses Motion Authority. Prefer Easing tokens when possible.
        easing = customEasing;
      }
    } else {
      // This branch handles cases where TypeScript knows it's an Easing type (not a string)
      easing = motionEasings[customEasing] || motionEasings.standard;
    }
  } else {
    easing = motionEasings.standard;
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
 * Export Motion tokens for direct access
 * Aliased to shorter names for convenience
 */
export {
  motionDurations as durations,
  motionEasings as easings,
  motionReducedMotion as reducedMotion,
  motionTransitions as transitions,
};
