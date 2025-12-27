/**
 * Tenerife Animation System Presets
 *
 * Reusable animation presets for common UI patterns.
 * All presets use CSS Motion Tokens V2 and respect reduced motion preferences.
 */
"use client";
import { shouldReduceMotion } from "./tas";
import type { AnimationProps, PresetConfig } from "./types";

/**
 * Create animation preset with reduced motion support
 * Helper function to reduce duplication across all presets
 */
function createPreset(className: string, config?: PresetConfig): AnimationProps {
  // #region agent log
  fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "presets.ts:createPreset:entry",
      message: "createPreset called",
      data: {
        inputClassName: className,
        hasConfig: !!config,
        reducedMotionConfig: config?.reducedMotion,
      },
      timestamp: Date.now(),
      sessionId: "debug-session",
      runId: "run1",
      hypothesisId: "A,B",
    }),
  }).catch(() => {});
  // #endregion
  const reduceMotion = shouldReduceMotion(config?.reducedMotion);
  // #region agent log
  fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "presets.ts:createPreset:after-shouldReduceMotion",
      message: "shouldReduceMotion result",
      data: { reduceMotion, willReturnEmpty: reduceMotion, inputClassName: className },
      timestamp: Date.now(),
      sessionId: "debug-session",
      runId: "run1",
      hypothesisId: "A",
    }),
  }).catch(() => {});
  // #endregion
  const result = {
    className: reduceMotion ? "" : className,
  };
  // #region agent log
  fetch("http://127.0.0.1:7243/ingest/ff5d1e20-0815-4ca0-af82-fcbd3cfa35b1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "presets.ts:createPreset:return",
      message: "createPreset returning",
      data: { resultClassName: result.className, wasEmpty: !result.className },
      timestamp: Date.now(),
      sessionId: "debug-session",
      runId: "run1",
      hypothesisId: "A,B",
    }),
  }).catch(() => {});
  // #endregion
  return result;
}

/**
 * Fade animation presets
 */
export const fadePresets = {
  /**
   * Fade in animation
   */
  fadeIn: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-fade-in", config);
  },

  /**
   * Fade out animation
   */
  fadeOut: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-fade-out", config);
  },

  /**
   * Fade in from top
   */
  fadeInUp: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-fade-slide-up", config);
  },

  /**
   * Fade in from bottom
   */
  fadeInDown: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-fade-slide-down", config);
  },

  /**
   * Fade in from left
   */
  fadeInLeft: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-fade-slide-left", config);
  },

  /**
   * Fade in from right
   */
  fadeInRight: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-fade-slide-right", config);
  },
};

/**
 * Slide animation presets
 */
export const slidePresets = {
  /**
   * Slide in from bottom
   */
  slideInUp: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-slide-up", config);
  },

  /**
   * Slide in from top
   */
  slideInDown: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-slide-down", config);
  },

  /**
   * Slide in from left
   */
  slideInLeft: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-slide-left", config);
  },

  /**
   * Slide in from right
   */
  slideInRight: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-slide-right", config);
  },

  /**
   * Slide out to top
   */
  slideOutUp: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-fade-slide-up-out", config);
  },

  /**
   * Slide out to bottom
   */
  slideOutDown: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-fade-slide-down-out", config);
  },

  /**
   * Slide out to left
   */
  slideOutLeft: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-fade-slide-left-out", config);
  },

  /**
   * Slide out to right
   */
  slideOutRight: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-fade-slide-right-out", config);
  },
};

/**
 * Scale animation presets
 */
export const scalePresets = {
  /**
   * Scale in animation
   */
  scaleIn: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-scale-in", config);
  },

  /**
   * Scale out animation
   */
  scaleOut: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-scale-out", config);
  },

  /**
   * Scale up on hover
   */
  scaleUp: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-hover-scale", config);
  },

  /**
   * Scale down on tap
   */
  scaleDown: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-tap-scale", config);
  },
};

/**
 * Stagger animation helper
 * Note: Stagger animations are not directly supported in CSS-only approach.
 * This function is kept for API compatibility but returns empty className.
 * For stagger effects, apply animation classes to child elements with CSS delays.
 */
export function createStagger(
  _staggerChildren: number = 0.1,
  _delayChildren: number = 0,
  _config?: PresetConfig,
): AnimationProps {
  // Stagger animations require JavaScript timing, not supported in CSS-only
  // Return empty className - implement stagger via CSS nth-child selectors if needed
  return {
    className: "",
  };
}

/**
 * Reveal on scroll preset
 * Uses Intersection Observer for scroll-triggered animations
 * Returns CSS class that should be applied when element is in view
 */
export function revealOnScroll(
  config?: PresetConfig & {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    direction?: "up" | "down" | "left" | "right" | "fade";
  },
): AnimationProps {
  const { direction = "up" } = config || {};

  // Map direction to CSS class
  if (direction === "up") {
    return fadePresets.fadeInUp(config);
  }
  if (direction === "down") {
    return fadePresets.fadeInDown(config);
  }
  if (direction === "left") {
    return fadePresets.fadeInLeft(config);
  }
  if (direction === "right") {
    return fadePresets.fadeInRight(config);
  }

  // Default to fade
  return fadePresets.fadeIn(config);
}

/**
 * Hover animation presets
 */
export const hoverPresets = {
  /**
   * Lift up on hover (combines scale and y translation)
   */
  hoverLift: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-hover-lift", config);
  },

  /**
   * Scale up on hover
   */
  hoverScale: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-hover-scale", config);
  },

  /**
   * Scale down on tap
   */
  tapScale: (config?: PresetConfig): AnimationProps => {
    return createPreset("tm-motion-tap-scale", config);
  },
};

/**
 * Export all presets
 */
export const presets = {
  fade: fadePresets,
  slide: slidePresets,
  scale: scalePresets,
  hover: hoverPresets,
  stagger: createStagger,
  reveal: revealOnScroll,
};
