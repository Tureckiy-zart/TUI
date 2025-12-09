/**
 * Tenerife Animation System Types
 *
 * Type definitions for TAS animation system
 */

import type { Spring as SpringToken } from "@/tokens/motion";

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
  duration?: number | string;
  ease?: string | number[];
  delay?: number;
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
  duration?: number | string;
  delay?: number;
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
   * Animation preset for initial mount/entrance
   * Can be a preset name string or CSS class name
   */
  animation?:
    | "fadeIn"
    | "fadeInUp"
    | "fadeInDown"
    | "fadeInLeft"
    | "fadeInRight"
    | "slideInUp"
    | "slideInDown"
    | "slideInLeft"
    | "slideInRight"
    | "scaleIn"
    | string;

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
