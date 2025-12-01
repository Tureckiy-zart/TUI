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
 */
export interface AnimationProps {
  /**
   * Initial animation state (Framer Motion)
   */
  initial?: string | object | false;

  /**
   * Animate to this state (Framer Motion)
   */
  animate?: string | object | false;

  /**
   * Exit animation state (Framer Motion)
   */
  exit?: string | object | false;

  /**
   * Transition configuration
   */
  transition?: string | object | Spring;

  /**
   * Animation on hover
   */
  whileHover?: object;

  /**
   * Animation on focus
   */
  whileFocus?: object;

  /**
   * Animation on tap
   */
  whileTap?: object;

  /**
   * Animation on drag
   */
  whileDrag?: object;

  /**
   * Animation on in view (Intersection Observer)
   */
  whileInView?: object;

  /**
   * Viewport options for whileInView
   */
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number;
  };
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
   * Can be a preset name string or AnimationProps object
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
    | AnimationProps;

  /**
   * Animation preset for hover state
   * Can be a preset name string or AnimationProps object
   */
  hoverAnimation?: "hoverLift" | "hoverScale" | "tapScale" | AnimationProps;

  /**
   * Custom animation props (overrides preset names)
   */
  animationProps?: AnimationProps;
}
