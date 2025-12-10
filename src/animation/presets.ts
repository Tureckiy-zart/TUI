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
 * Fade animation presets
 */
export const fadePresets = {
  /**
   * Fade in animation
   */
  fadeIn: (config?: PresetConfig): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-fade-in",
    };
  },

  /**
   * Fade out animation
   */
  fadeOut: (config?: PresetConfig): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-fade-out",
    };
  },

  /**
   * Fade in from top
   */
  fadeInUp: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-fade-slide-up",
    };
  },

  /**
   * Fade in from bottom
   */
  fadeInDown: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-fade-slide-down",
    };
  },

  /**
   * Fade in from left
   */
  fadeInLeft: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-fade-slide-left",
    };
  },

  /**
   * Fade in from right
   */
  fadeInRight: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-fade-slide-right",
    };
  },
};

/**
 * Slide animation presets
 */
export const slidePresets = {
  /**
   * Slide in from bottom
   */
  slideInUp: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-slide-up",
    };
  },

  /**
   * Slide in from top
   */
  slideInDown: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-slide-down",
    };
  },

  /**
   * Slide in from left
   */
  slideInLeft: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-slide-left",
    };
  },

  /**
   * Slide in from right
   */
  slideInRight: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-slide-right",
    };
  },

  /**
   * Slide out to top
   */
  slideOutUp: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-fade-slide-up-out",
    };
  },

  /**
   * Slide out to bottom
   */
  slideOutDown: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-fade-slide-down-out",
    };
  },

  /**
   * Slide out to left
   */
  slideOutLeft: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-fade-slide-left-out",
    };
  },

  /**
   * Slide out to right
   */
  slideOutRight: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-fade-slide-right-out",
    };
  },
};

/**
 * Scale animation presets
 */
export const scalePresets = {
  /**
   * Scale in animation
   */
  scaleIn: (config?: PresetConfig & { scale?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-scale-in",
    };
  },

  /**
   * Scale out animation
   */
  scaleOut: (config?: PresetConfig & { scale?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-scale-out",
    };
  },

  /**
   * Scale up on hover
   */
  scaleUp: (config?: PresetConfig & { scale?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-hover-scale",
    };
  },

  /**
   * Scale down on tap
   */
  scaleDown: (config?: PresetConfig & { scale?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-tap-scale",
    };
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
  config?: PresetConfig,
): AnimationProps {
  const reduceMotion = shouldReduceMotion(config?.reducedMotion);
  // Stagger animations require JavaScript timing, not supported in CSS-only
  // Return empty className - implement stagger via CSS nth-child selectors if needed
  return {
    className: reduceMotion ? "" : "",
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
    distance?: number;
  },
): AnimationProps {
  const { direction = "up" } = config || {};
  const reduceMotion = shouldReduceMotion(config?.reducedMotion);

  if (reduceMotion) {
    return { className: "" };
  }

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
  hoverLift: (config?: PresetConfig & { scale?: number; y?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-hover-lift",
    };
  },

  /**
   * Scale up on hover
   */
  hoverScale: (config?: PresetConfig & { scale?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-hover-scale",
    };
  },

  /**
   * Scale down on tap
   */
  tapScale: (config?: PresetConfig & { scale?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      className: reduceMotion ? "" : "tm-motion-tap-scale",
    };
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
