/**
 * Tenerife Animation System (TAS)
 *
 * Unified animation system exports
 * All exports are explicit to avoid barrel leaks.
 */

// ============================================================================
// PRESETS
// ============================================================================
export {
  createStagger,
  fadePresets,
  hoverPresets,
  presets,
  revealOnScroll,
  scalePresets,
  slidePresets,
} from "./presets";

// ============================================================================
// TAS (Tenerife Animation System)
// ============================================================================
export type { Duration, Easing, Transition } from "./tas";
export { createTransition, shouldEnableAnimations, shouldReduceMotion } from "./tas";

// ============================================================================
// TYPES
// ============================================================================
export type {
  AnimationProps,
  ComponentAnimationConfig,
  PresetConfig,
  Spring,
  SpringConfig,
  TransitionConfig,
} from "./types";
