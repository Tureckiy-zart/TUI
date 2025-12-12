/**
 * Tenerife Animation System Types
 *
 * Type definitions for TAS animation system
 */

import type { Spring as SpringToken } from "@/tokens/motion";
import type { ResponsiveAnimationPreset, ResponsiveDelay, ResponsiveMotion } from "@/tokens/types";

/**
 * Spring type re-exported for convenience
 */
export type Spring = SpringToken;

/**
 * Animation props for layout primitives
 * Returns CSS class names for Motion Tokens V2 animations
 */
export interface AnimationProps {
  /**
   * CSS class name for the animation
   * Maps to tm-motion-* utility classes
   */
  className?: string;
}

/**
 * Transition configuration
 */
export interface TransitionConfig {
  /**
   * Transition duration - token-based
   * Uses motion duration tokens
   */
  duration?: ResponsiveMotion;
  ease?: string | number[];
  /**
   * Transition delay - token-based
   * Uses motion duration tokens
   */
  delay?: ResponsiveDelay;
  type?: "tween" | "spring" | "inertia" | "keyframes";
  [key: string]: unknown;
}

/**
 * Spring configuration
 */
export interface SpringConfig {
  type: "spring";
  stiffness?: number;
  damping?: number;
  mass?: number;
  velocity?: number;
  [key: string]: unknown;
}

/**
 * Animation preset configuration
 */
export interface PresetConfig {
  /**
   * Animation duration - token-based
   * Uses motion duration tokens
   */
  duration?: ResponsiveMotion;
  /**
   * Animation delay - token-based
   * Uses motion duration tokens
   */
  delay?: ResponsiveDelay;
  ease?: string | number[];
  spring?: Spring | SpringConfig;
  reducedMotion?: boolean | "auto";
}

/**
 * Component animation configuration
 * Allows components to accept animation presets as props
 */
export interface ComponentAnimationConfig {
  /**
   * Animation preset for initial mount/entrance - token-based
   * Uses predefined animation preset tokens
   */
  animation?: ResponsiveAnimationPreset | string; // Allow string for custom CSS classes

  /**
   * Animation preset for hover state
   * Can be a preset name string or CSS class name
   */
  hoverAnimation?: "hoverLift" | "hoverScale" | "tapScale" | string;

  /**
   * Custom animation class name (overrides preset names)
   */
  animationProps?: AnimationProps;
}
