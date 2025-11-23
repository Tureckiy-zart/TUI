/**
 * Motion System Tokens
 *
 * Complete motion system for Tenerife UI based on design system specifications.
 * Includes: durations, easing functions, transitions, keyframe animations,
 * and reduced motion support for accessibility.
 *
 * All motion respects user preferences for reduced motion (prefers-reduced-motion).
 * Base duration unit: 100ms
 */
/**
 * Animation Duration Tokens
 * Values: instant, fast, normal, slow, slower, slowest
 * Base unit: 100ms
 */
export declare const durations: {
  readonly instant: "0ms";
  readonly fast: "150ms";
  readonly normal: "300ms";
  readonly slow: "500ms";
  readonly slower: "700ms";
  readonly slowest: "1000ms";
  readonly "75": "75ms";
  readonly "100": "100ms";
  readonly "200": "200ms";
  readonly "250": "250ms";
  readonly "400": "400ms";
  readonly "600": "600ms";
  readonly "800": "800ms";
};
/**
 * Easing Function Tokens
 * Cubic-bezier functions for natural motion
 */
export declare const easings: {
  readonly linear: "linear";
  readonly "ease-in": "cubic-bezier(0.4, 0, 1, 1)";
  readonly "ease-out": "cubic-bezier(0, 0, 0.2, 1)";
  readonly "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)";
  readonly ease: "ease";
  readonly bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
  readonly elastic: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  readonly "ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)";
  readonly "ease-in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)";
  readonly "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)";
};
/**
 * Transition Tokens
 * Pre-configured transitions combining duration and easing
 */
export declare const transitions: {
  readonly fast: "150ms cubic-bezier(0, 0, 0.2, 1)";
  readonly "fast-in": "150ms cubic-bezier(0.4, 0, 1, 1)";
  readonly "fast-out": "150ms cubic-bezier(0, 0, 0.2, 1)";
  readonly "fast-in-out": "150ms cubic-bezier(0.4, 0, 0.2, 1)";
  readonly normal: "300ms cubic-bezier(0.4, 0, 0.2, 1)";
  readonly "normal-in": "300ms cubic-bezier(0.4, 0, 1, 1)";
  readonly "normal-out": "300ms cubic-bezier(0, 0, 0.2, 1)";
  readonly "normal-in-out": "300ms cubic-bezier(0.4, 0, 0.2, 1)";
  readonly slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)";
  readonly "slow-in": "500ms cubic-bezier(0.4, 0, 1, 1)";
  readonly "slow-out": "500ms cubic-bezier(0, 0, 0.2, 1)";
  readonly "slow-in-out": "500ms cubic-bezier(0.4, 0, 0.2, 1)";
  readonly bounce: "300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)";
  readonly elastic: "500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  readonly DEFAULT: "300ms cubic-bezier(0.4, 0, 0.2, 1)";
};
/**
 * Keyframe Animation Tokens
 * Pre-defined animations for common UI patterns
 */
export declare const keyframes: {
  readonly fadeIn: {
    readonly from: {
      readonly opacity: 0;
    };
    readonly to: {
      readonly opacity: 1;
    };
  };
  readonly fadeOut: {
    readonly from: {
      readonly opacity: 1;
    };
    readonly to: {
      readonly opacity: 0;
    };
  };
  readonly slideInUp: {
    readonly from: {
      readonly transform: "translateY(100%)";
      readonly opacity: 0;
    };
    readonly to: {
      readonly transform: "translateY(0)";
      readonly opacity: 1;
    };
  };
  readonly slideInDown: {
    readonly from: {
      readonly transform: "translateY(-100%)";
      readonly opacity: 0;
    };
    readonly to: {
      readonly transform: "translateY(0)";
      readonly opacity: 1;
    };
  };
  readonly slideInLeft: {
    readonly from: {
      readonly transform: "translateX(-100%)";
      readonly opacity: 0;
    };
    readonly to: {
      readonly transform: "translateX(0)";
      readonly opacity: 1;
    };
  };
  readonly slideInRight: {
    readonly from: {
      readonly transform: "translateX(100%)";
      readonly opacity: 0;
    };
    readonly to: {
      readonly transform: "translateX(0)";
      readonly opacity: 1;
    };
  };
  readonly slideOutUp: {
    readonly from: {
      readonly transform: "translateY(0)";
      readonly opacity: 1;
    };
    readonly to: {
      readonly transform: "translateY(-100%)";
      readonly opacity: 0;
    };
  };
  readonly slideOutDown: {
    readonly from: {
      readonly transform: "translateY(0)";
      readonly opacity: 1;
    };
    readonly to: {
      readonly transform: "translateY(100%)";
      readonly opacity: 0;
    };
  };
  readonly slideOutLeft: {
    readonly from: {
      readonly transform: "translateX(0)";
      readonly opacity: 1;
    };
    readonly to: {
      readonly transform: "translateX(-100%)";
      readonly opacity: 0;
    };
  };
  readonly slideOutRight: {
    readonly from: {
      readonly transform: "translateX(0)";
      readonly opacity: 1;
    };
    readonly to: {
      readonly transform: "translateX(100%)";
      readonly opacity: 0;
    };
  };
  readonly scaleIn: {
    readonly from: {
      readonly transform: "scale(0.95)";
      readonly opacity: 0;
    };
    readonly to: {
      readonly transform: "scale(1)";
      readonly opacity: 1;
    };
  };
  readonly scaleOut: {
    readonly from: {
      readonly transform: "scale(1)";
      readonly opacity: 1;
    };
    readonly to: {
      readonly transform: "scale(0.95)";
      readonly opacity: 0;
    };
  };
  readonly scaleUp: {
    readonly from: {
      readonly transform: "scale(1)";
    };
    readonly to: {
      readonly transform: "scale(1.05)";
    };
  };
  readonly scaleDown: {
    readonly from: {
      readonly transform: "scale(1.05)";
    };
    readonly to: {
      readonly transform: "scale(1)";
    };
  };
  readonly spin: {
    readonly from: {
      readonly transform: "rotate(0deg)";
    };
    readonly to: {
      readonly transform: "rotate(360deg)";
    };
  };
  readonly spinReverse: {
    readonly from: {
      readonly transform: "rotate(360deg)";
    };
    readonly to: {
      readonly transform: "rotate(0deg)";
    };
  };
  readonly pulse: {
    readonly "0%, 100%": {
      readonly opacity: 1;
    };
    readonly "50%": {
      readonly opacity: 0.5;
    };
  };
  readonly bounce: {
    readonly "0%, 100%": {
      readonly transform: "translateY(-25%)";
      readonly animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)";
    };
    readonly "50%": {
      readonly transform: "translateY(0)";
      readonly animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)";
    };
  };
  readonly shake: {
    readonly "0%, 100%": {
      readonly transform: "translateX(0)";
    };
    readonly "10%, 30%, 50%, 70%, 90%": {
      readonly transform: "translateX(-4px)";
    };
    readonly "20%, 40%, 60%, 80%": {
      readonly transform: "translateX(4px)";
    };
  };
  readonly ping: {
    readonly "75%, 100%": {
      readonly transform: "scale(2)";
      readonly opacity: 0;
    };
  };
  readonly "accordion-down": {
    readonly from: {
      readonly height: "0";
    };
    readonly to: {
      readonly height: "var(--radix-accordion-content-height)";
    };
  };
  readonly "accordion-up": {
    readonly from: {
      readonly height: "var(--radix-accordion-content-height)";
    };
    readonly to: {
      readonly height: "0";
    };
  };
};
/**
 * Animation Tokens
 * Pre-configured animations combining keyframes, duration, and easing
 */
export declare const animations: {
  readonly fadeIn: "fadeIn 300ms cubic-bezier(0, 0, 0.2, 1)";
  readonly fadeOut: "fadeOut 150ms cubic-bezier(0.4, 0, 1, 1)";
  readonly slideInUp: "slideInUp 300ms cubic-bezier(0, 0, 0.2, 1)";
  readonly slideInDown: "slideInDown 300ms cubic-bezier(0, 0, 0.2, 1)";
  readonly slideInLeft: "slideInLeft 300ms cubic-bezier(0, 0, 0.2, 1)";
  readonly slideInRight: "slideInRight 300ms cubic-bezier(0, 0, 0.2, 1)";
  readonly slideOutUp: "slideOutUp 150ms cubic-bezier(0.4, 0, 1, 1)";
  readonly slideOutDown: "slideOutDown 150ms cubic-bezier(0.4, 0, 1, 1)";
  readonly slideOutLeft: "slideOutLeft 150ms cubic-bezier(0.4, 0, 1, 1)";
  readonly slideOutRight: "slideOutRight 150ms cubic-bezier(0.4, 0, 1, 1)";
  readonly scaleIn: "scaleIn 300ms cubic-bezier(0, 0, 0.2, 1)";
  readonly scaleOut: "scaleOut 150ms cubic-bezier(0.4, 0, 1, 1)";
  readonly spin: "spin 1s linear infinite";
  readonly pulse: "pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite";
  readonly bounce: "bounce 1s linear infinite";
  readonly ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) cubic-bezier(0, 0, 0.2, 1) infinite";
  readonly shake: "shake 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
  readonly "accordion-down": "accordion-down 300ms cubic-bezier(0, 0, 0.2, 1)";
  readonly "accordion-up": "accordion-up 300ms cubic-bezier(0, 0, 0.2, 1)";
};
/**
 * Reduced Motion Support
 * Respects prefers-reduced-motion media query
 */
export declare const reducedMotion: {
  readonly duration: "0ms";
  readonly easing: "linear";
  readonly transition: "0ms linear";
  readonly mediaQuery: "@media (prefers-reduced-motion: reduce)";
  readonly disableAnimations: "animation: none !important; transition: none !important;";
};
/**
 * CSS Custom Properties for Motion
 * These will be injected into the theme system
 */
export declare const motionCSSVariables: {
  readonly "--duration-instant": "0ms";
  readonly "--duration-fast": "150ms";
  readonly "--duration-normal": "300ms";
  readonly "--duration-slow": "500ms";
  readonly "--duration-slower": "700ms";
  readonly "--duration-slowest": "1000ms";
  readonly "--ease-linear": "linear";
  readonly "--ease-in": "cubic-bezier(0.4, 0, 1, 1)";
  readonly "--ease-out": "cubic-bezier(0, 0, 0.2, 1)";
  readonly "--ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)";
  readonly "--ease-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
  readonly "--ease-elastic": "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  readonly "--transition-fast": "150ms cubic-bezier(0, 0, 0.2, 1)";
  readonly "--transition-normal": "300ms cubic-bezier(0.4, 0, 0.2, 1)";
  readonly "--transition-slow": "500ms cubic-bezier(0.4, 0, 0.2, 1)";
  readonly "--transition-default": "300ms cubic-bezier(0.4, 0, 0.2, 1)";
};
/**
 * Tailwind Motion Config
 * Maps to Tailwind theme.extend for durations, transitions, keyframes, animations
 */
export declare const tailwindMotionConfig: {
  readonly transitionDuration: Record<string, string>;
  readonly transitionTimingFunction: Record<string, string>;
  readonly transitionProperty: {
    readonly DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter";
    readonly colors: "color, background-color, border-color, text-decoration-color, fill, stroke";
    readonly opacity: "opacity";
    readonly shadow: "box-shadow";
    readonly transform: "transform";
    readonly all: "all";
    readonly none: "none";
  };
  readonly keyframes: Record<string, any>;
  readonly animation: Record<string, string>;
};
/**
 * Type Exports
 */
export type Duration = keyof typeof durations;
export type Easing = keyof typeof easings;
export type Transition = keyof typeof transitions;
export type Keyframe = keyof typeof keyframes;
export type Animation = keyof typeof animations;
//# sourceMappingURL=motion.d.ts.map
