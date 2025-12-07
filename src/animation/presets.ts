/**
 * Tenerife Animation System Presets
 *
 * Reusable animation presets for common UI patterns.
 * All presets use motion tokens and respect reduced motion preferences.
 */
"use client";
import { createRevealConfig, createSpring, getAnimationConfig, shouldReduceMotion } from "./tas";
import type { AnimationProps, PresetConfig, Spring, SpringConfig } from "./types";

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
      initial: reduceMotion ? {} : { opacity: 0 },
      animate: { opacity: 1 },
      transition: getAnimationConfig({
        duration: config?.duration || "normal",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Fade out animation
   */
  fadeOut: (config?: PresetConfig): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    return {
      initial: reduceMotion ? {} : { opacity: 1 },
      animate: { opacity: 0 },
      transition: getAnimationConfig({
        duration: config?.duration || "fast",
        easing: typeof config?.ease === "string" ? config.ease : "ease-in",
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Fade in from top
   */
  fadeInUp: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const distance = config?.distance || 20;
    return {
      initial: reduceMotion ? {} : { opacity: 0, y: distance },
      animate: { opacity: 1, y: 0 },
      transition: getAnimationConfig({
        duration: config?.duration || "normal",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        spring: config?.spring,
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Fade in from bottom
   */
  fadeInDown: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const distance = config?.distance || 20;
    return {
      initial: reduceMotion ? {} : { opacity: 0, y: -distance },
      animate: { opacity: 1, y: 0 },
      transition: getAnimationConfig({
        duration: config?.duration || "normal",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        spring: config?.spring,
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Fade in from left
   */
  fadeInLeft: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const distance = config?.distance || 20;
    return {
      initial: reduceMotion ? {} : { opacity: 0, x: -distance },
      animate: { opacity: 1, x: 0 },
      transition: getAnimationConfig({
        duration: config?.duration || "normal",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        spring: config?.spring,
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Fade in from right
   */
  fadeInRight: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const distance = config?.distance || 20;
    return {
      initial: reduceMotion ? {} : { opacity: 0, x: distance },
      animate: { opacity: 1, x: 0 },
      transition: getAnimationConfig({
        duration: config?.duration || "normal",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        spring: config?.spring,
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
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
    const distance = config?.distance || 100;
    return {
      initial: reduceMotion ? {} : { y: distance, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: getAnimationConfig({
        duration: config?.duration || "normal",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        spring: config?.spring || "gentle",
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Slide in from top
   */
  slideInDown: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const distance = config?.distance || 100;
    return {
      initial: reduceMotion ? {} : { y: -distance, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: getAnimationConfig({
        duration: config?.duration || "normal",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        spring: config?.spring || "gentle",
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Slide in from left
   */
  slideInLeft: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const distance = config?.distance || 100;
    return {
      initial: reduceMotion ? {} : { x: -distance, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: getAnimationConfig({
        duration: config?.duration || "normal",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        spring: config?.spring || "gentle",
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Slide in from right
   */
  slideInRight: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const distance = config?.distance || 100;
    return {
      initial: reduceMotion ? {} : { x: distance, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: getAnimationConfig({
        duration: config?.duration || "normal",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        spring: config?.spring || "gentle",
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Slide out to top
   */
  slideOutUp: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const distance = config?.distance || 100;
    return {
      initial: { y: 0, opacity: 1 },
      exit: reduceMotion ? {} : { y: -distance, opacity: 0 },
      transition: getAnimationConfig({
        duration: config?.duration || "fast",
        easing: typeof config?.ease === "string" ? config.ease : "ease-in",
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Slide out to bottom
   */
  slideOutDown: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const distance = config?.distance || 100;
    return {
      initial: { y: 0, opacity: 1 },
      exit: reduceMotion ? {} : { y: distance, opacity: 0 },
      transition: getAnimationConfig({
        duration: config?.duration || "fast",
        easing: typeof config?.ease === "string" ? config.ease : "ease-in",
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Slide out to left
   */
  slideOutLeft: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const distance = config?.distance || 100;
    return {
      initial: { x: 0, opacity: 1 },
      exit: reduceMotion ? {} : { x: -distance, opacity: 0 },
      transition: getAnimationConfig({
        duration: config?.duration || "fast",
        easing: typeof config?.ease === "string" ? config.ease : "ease-in",
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Slide out to right
   */
  slideOutRight: (config?: PresetConfig & { distance?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const distance = config?.distance || 100;
    return {
      initial: { x: 0, opacity: 1 },
      exit: reduceMotion ? {} : { x: distance, opacity: 0 },
      transition: getAnimationConfig({
        duration: config?.duration || "fast",
        easing: typeof config?.ease === "string" ? config.ease : "ease-in",
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
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
    const scale = config?.scale || 0.95;
    return {
      initial: reduceMotion ? {} : { scale, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: getAnimationConfig({
        duration: config?.duration || "normal",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        spring: config?.spring || "gentle",
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Scale out animation
   */
  scaleOut: (config?: PresetConfig & { scale?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const scale = config?.scale || 0.95;
    return {
      initial: { scale: 1, opacity: 1 },
      exit: reduceMotion ? {} : { scale, opacity: 0 },
      transition: getAnimationConfig({
        duration: config?.duration || "fast",
        easing: typeof config?.ease === "string" ? config.ease : "ease-in",
        delay: config?.delay,
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Scale up on hover
   */
  scaleUp: (config?: PresetConfig & { scale?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const scale = config?.scale || 1.05;
    return {
      whileHover: reduceMotion ? {} : { scale },
      transition: getAnimationConfig({
        duration: config?.duration || "fast",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        spring: config?.spring || "gentle",
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Scale down on tap
   */
  scaleDown: (config?: PresetConfig & { scale?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const scale = config?.scale || 0.95;
    return {
      whileTap: reduceMotion ? {} : { scale },
      transition: getAnimationConfig({
        duration: config?.duration || "fast",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        reduceMotion: config?.reducedMotion,
      }),
    };
  },
};

/**
 * Stagger animation helper
 * Creates staggered animations for children elements
 */
export function createStagger(
  staggerChildren: number = 0.1,
  delayChildren: number = 0,
  config?: PresetConfig,
): {
  transition: {
    staggerChildren: number;
    delayChildren: number;
  } & SpringConfig;
} {
  const reduceMotion = shouldReduceMotion(config?.reducedMotion);
  if (reduceMotion) {
    return {
      transition: {
        staggerChildren: 0,
        delayChildren: 0,
        ...createSpring("noBounce"),
      },
    };
  }

  const springConfig = config?.spring;
  let springName: Spring | undefined;
  if (typeof springConfig === "string") {
    springName = springConfig;
  } else if (springConfig) {
    springName = undefined;
  } else {
    springName = "gentle";
  }
  const springPartial =
    typeof springConfig === "object" && springConfig !== null ? springConfig : undefined;

  return {
    transition: {
      staggerChildren,
      delayChildren,
      ...createSpring(springName, springPartial),
    },
  };
}

/**
 * Reveal on scroll preset
 * Uses Intersection Observer for scroll-triggered animations
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
  const { direction = "up", distance = 20, ...revealOptions } = config || {};

  const baseConfig = createRevealConfig({
    threshold: revealOptions.threshold,
    rootMargin: revealOptions.rootMargin,
    triggerOnce: revealOptions.triggerOnce,
    reduceMotion: config?.reducedMotion,
  });

  // Override initial/animate based on direction
  if (direction === "up") {
    return {
      ...fadePresets.fadeInUp({ ...config, distance }),
      ...baseConfig,
    };
  }
  if (direction === "down") {
    return {
      ...fadePresets.fadeInDown({ ...config, distance }),
      ...baseConfig,
    };
  }
  if (direction === "left") {
    return {
      ...fadePresets.fadeInLeft({ ...config, distance }),
      ...baseConfig,
    };
  }
  if (direction === "right") {
    return {
      ...fadePresets.fadeInRight({ ...config, distance }),
      ...baseConfig,
    };
  }

  // Default to fade
  return {
    ...fadePresets.fadeIn(config),
    ...baseConfig,
  };
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
    const scale = config?.scale || 1.05;
    // Default y offset: -5px (negative for upward movement)
    // Convert to rem: -5px = -0.3125rem (approximately -0.3rem)
    const y = config?.y ?? -5;

    return {
      whileHover: reduceMotion
        ? {}
        : {
            scale,
            y,
          },
      transition: getAnimationConfig({
        duration: config?.duration || "fast",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        spring: config?.spring || "gentle",
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Scale up on hover
   */
  hoverScale: (config?: PresetConfig & { scale?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const scale = config?.scale || 1.05;

    return {
      whileHover: reduceMotion ? {} : { scale },
      transition: getAnimationConfig({
        duration: config?.duration || "fast",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        spring: config?.spring || "gentle",
        reduceMotion: config?.reducedMotion,
      }),
    };
  },

  /**
   * Scale down on tap
   */
  tapScale: (config?: PresetConfig & { scale?: number }): AnimationProps => {
    const reduceMotion = shouldReduceMotion(config?.reducedMotion);
    const scale = config?.scale || 0.95;

    return {
      whileTap: reduceMotion ? {} : { scale },
      transition: getAnimationConfig({
        duration: config?.duration || "fast",
        easing: typeof config?.ease === "string" ? config.ease : "ease-out",
        reduceMotion: config?.reducedMotion,
      }),
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
