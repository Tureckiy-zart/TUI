/**
 * Animation Utilities
 *
 * Helper functions for working with animation props in components
 */

import { fadePresets, hoverPresets, scalePresets, slidePresets } from "./presets";
import type { AnimationProps, ComponentAnimationConfig } from "./types";

/**
 * Resolve animation preset name to AnimationProps
 */
function resolveAnimationPreset(
  preset: ComponentAnimationConfig["animation"],
): AnimationProps | undefined {
  if (!preset) return undefined;

  // If already AnimationProps, return as-is
  if (typeof preset === "object") {
    return preset;
  }

  // Map preset names to actual presets
  switch (preset) {
    case "fadeIn":
      return fadePresets.fadeIn();
    case "fadeInUp":
      return fadePresets.fadeInUp();
    case "fadeInDown":
      return fadePresets.fadeInDown();
    case "fadeInLeft":
      return fadePresets.fadeInLeft();
    case "fadeInRight":
      return fadePresets.fadeInRight();
    case "slideInUp":
      return slidePresets.slideInUp();
    case "slideInDown":
      return slidePresets.slideInDown();
    case "slideInLeft":
      return slidePresets.slideInLeft();
    case "slideInRight":
      return slidePresets.slideInRight();
    case "scaleIn":
      return scalePresets.scaleIn();
    default:
      return undefined;
  }
}

/**
 * Resolve hover animation preset name to AnimationProps
 */
function resolveHoverAnimationPreset(
  preset: ComponentAnimationConfig["hoverAnimation"],
): AnimationProps | undefined {
  if (!preset) return undefined;

  // If already AnimationProps, return as-is
  if (typeof preset === "object") {
    return preset;
  }

  // Map preset names to actual presets
  switch (preset) {
    case "hoverLift":
      return hoverPresets.hoverLift();
    case "hoverScale":
      return hoverPresets.hoverScale();
    case "tapScale":
      return hoverPresets.tapScale();
    default:
      return undefined;
  }
}

/**
 * Resolve component animation config to AnimationProps
 * Merges animation, hoverAnimation, and custom animationProps
 */
export function resolveComponentAnimations(config?: ComponentAnimationConfig): AnimationProps {
  if (!config) return {};

  const animation = resolveAnimationPreset(config.animation);
  const hoverAnimation = resolveHoverAnimationPreset(config.hoverAnimation);
  const customProps = config.animationProps || {};

  // Merge all animation props
  // Priority: customProps > hoverAnimation > animation
  // Note: whileHover, whileTap, transition are not part of AnimationProps (CSS-only animations)
  return {
    ...animation,
    ...hoverAnimation,
    ...customProps,
  };
}
