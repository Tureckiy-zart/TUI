/**
 * Animation Testing Utilities
 *
 * Helper functions for testing animations in components
 */

import type React from "react";

import { shouldReduceMotion } from "@/animation/tas";
import type { AnimationProps } from "@/animation/types";

/**
 * Mock prefers-reduced-motion media query
 * Use this in tests to simulate reduced motion preference
 * Works with both Jest and Vitest
 */
export function mockReducedMotion(enabled: boolean): () => void {
  const originalMatchMedia = window.matchMedia;

  // Use vi.fn() for Vitest or jest.fn() for Jest
  // Check for vi in globalThis (Vitest) or use jest (Jest)
  const global = globalThis as unknown as Record<string, unknown>;
  const hasVi =
    "vi" in global && typeof global.vi === "object" && global.vi !== null && "fn" in global.vi;
  const mockFnFactory = hasVi ? (global.vi as { fn: () => () => void }).fn : jest.fn;

  window.matchMedia = mockFnFactory()((query: string) => {
    if (query === "(prefers-reduced-motion: reduce)") {
      const createMockFn = () => mockFnFactory();
      return {
        matches: enabled,
        media: query,
        onchange: null,
        addListener: createMockFn(),
        removeListener: createMockFn(),
        addEventListener: createMockFn(),
        removeEventListener: createMockFn(),
        dispatchEvent: createMockFn(),
      } as MediaQueryList;
    }
    return originalMatchMedia(query);
  });

  // Return cleanup function
  return () => {
    window.matchMedia = originalMatchMedia;
  };
}

/**
 * Check if animation props respect reduced motion
 * Returns true if animations are disabled when reduced motion is enabled
 */
export function checkReducedMotionSupport(
  animationProps: AnimationProps,
  reducedMotionEnabled: boolean = true,
): boolean {
  if (!reducedMotionEnabled) {
    // If reduced motion is disabled, animations should be present
    return true;
  }

  // When reduced motion is enabled, animations should be disabled
  // Check if initial/animate/whileHover/etc are empty objects or undefined
  const hasAnimations =
    (animationProps.initial && Object.keys(animationProps.initial).length > 0) ||
    (animationProps.animate && Object.keys(animationProps.animate).length > 0) ||
    (animationProps.whileHover && Object.keys(animationProps.whileHover).length > 0) ||
    (animationProps.whileTap && Object.keys(animationProps.whileTap).length > 0);

  // If reduced motion is enabled, there should be no animations
  return !hasAnimations;
}

/**
 * Verify that animation props use motion tokens
 * Checks that duration/easing values come from tokens, not hardcoded
 */
export function verifyTokenUsage(animationProps: AnimationProps): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check transition for hardcoded values
  if (animationProps.transition) {
    if (typeof animationProps.transition === "object") {
      const transition = animationProps.transition as Record<string, unknown>;

      // Check for hardcoded duration values (common hardcoded values)
      if (transition.duration && typeof transition.duration === "number") {
        const hardcodedDurations = [0.2, 0.3, 0.5, 200, 300, 500];
        if (hardcodedDurations.includes(transition.duration)) {
          issues.push(
            `Hardcoded duration detected: ${transition.duration}. Use motion tokens instead.`,
          );
        }
      }

      // Check for hardcoded easing values
      if (transition.ease && typeof transition.ease === "string") {
        const hardcodedEasings = [
          "cubic-bezier(0.4, 0, 1, 1)",
          "cubic-bezier(0, 0, 0.2, 1)",
          "cubic-bezier(0.4, 0, 0.2, 1)",
        ];
        if (hardcodedEasings.includes(transition.ease)) {
          issues.push(`Hardcoded easing detected: ${transition.ease}. Use motion tokens instead.`);
        }
      }
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Test that animation preset returns correct AnimationProps
 */
export function testAnimationPreset(
  presetFn: (config?: unknown) => AnimationProps,
  config?: unknown,
): {
  hasInitial: boolean;
  hasAnimate: boolean;
  hasTransition: boolean;
  respectsReducedMotion: boolean;
} {
  const props = presetFn(config);

  // Mock reduced motion enabled
  const cleanup = mockReducedMotion(true);
  const respectsReducedMotion = checkReducedMotionSupport(props, true);
  cleanup();

  return {
    hasInitial: !!props.initial,
    hasAnimate: !!props.animate,
    hasTransition: !!props.transition,
    respectsReducedMotion,
  };
}

/**
 * Verify that component animation props are properly resolved
 */
export function verifyComponentAnimationProps(
  resolvedProps: AnimationProps,
  expectedAnimation?: string,
  expectedHoverAnimation?: string,
): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check if expected animations are present
  if (expectedAnimation) {
    // Verify that initial/animate props are set for entrance animation
    if (!resolvedProps.initial && !resolvedProps.animate) {
      issues.push(`Expected animation "${expectedAnimation}" but no animation props found`);
    }
  }

  if (expectedHoverAnimation) {
    // Verify that hover animation is present
    if (!resolvedProps.whileHover) {
      issues.push(`Expected hover animation "${expectedHoverAnimation}" but whileHover is not set`);
    }
  }

  // Verify reduced motion support
  const cleanup = mockReducedMotion(true);
  const respectsReducedMotion = checkReducedMotionSupport(resolvedProps, true);
  cleanup();

  if (!respectsReducedMotion) {
    issues.push("Animation does not respect reduced motion preference");
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Wait for animation to complete
 * Useful for testing animation end states
 */
export async function waitForAnimation(
  element: HTMLElement,
  timeout: number = 1000,
): Promise<void> {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const checkAnimation = () => {
      const computedStyle = window.getComputedStyle(element);
      const isAnimating =
        computedStyle.animationName !== "none" || computedStyle.transitionProperty !== "none";

      if (!isAnimating || Date.now() - startTime > timeout) {
        resolve();
        return;
      }

      requestAnimationFrame(checkAnimation);
    };

    checkAnimation();
  });
}

/**
 * Get animation duration from element
 * Extracts duration from computed styles
 */
export function getAnimationDuration(element: HTMLElement): number {
  const computedStyle = window.getComputedStyle(element);
  const duration = computedStyle.animationDuration || computedStyle.transitionDuration;

  if (!duration || duration === "0s") {
    return 0;
  }

  // Parse duration (e.g., "300ms" -> 300)
  const match = duration.match(/(\d+(?:\.\d+)?)(ms|s)/);
  if (match && match[1]) {
    const value = parseFloat(match[1]);
    return match[2] === "s" ? value * 1000 : value;
  }

  return 0;
}

/**
 * Check if element has animation applied
 */
export function hasAnimation(element: HTMLElement): boolean {
  const computedStyle = window.getComputedStyle(element);
  return computedStyle.animationName !== "none" || computedStyle.transitionProperty !== "none";
}

/**
 * Test helper for checking animation behavior with reduced motion
 */
export async function testAnimationWithReducedMotion(
  _renderFn: (reducedMotion: boolean) => React.ReactElement,
): Promise<{
  withReducedMotion: boolean;
  withoutReducedMotion: boolean;
}> {
  // Test with reduced motion enabled
  const cleanup1 = mockReducedMotion(true);
  const withReducedMotion = shouldReduceMotion();
  cleanup1();

  // Test with reduced motion disabled
  const cleanup2 = mockReducedMotion(false);
  const withoutReducedMotion = shouldReduceMotion();
  cleanup2();

  return {
    withReducedMotion,
    withoutReducedMotion,
  };
}

// Re-export types for convenience
export type { AnimationProps } from "@/animation/types";
