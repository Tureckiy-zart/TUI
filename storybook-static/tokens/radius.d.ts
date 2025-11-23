/**
 * Border Radius System Tokens
 *
 * Complete border radius system for Tenerife UI based on design system specifications.
 * Includes: radius scale (none..3xl, full), component-specific radius standards,
 * and CSS variable definitions.
 *
 * Base unit: 4px (0.25rem)
 * All radius values follow a consistent scale for visual harmony.
 */
/**
 * Border Radius Scale
 * Values: none, xs, sm, md, lg, xl, 2xl, 3xl, full
 */
export declare const borderRadius: {
  readonly none: "0";
  readonly xs: "0.125rem";
  readonly sm: "0.25rem";
  readonly DEFAULT: "0.25rem";
  readonly base: "0.25rem";
  readonly md: "0.375rem";
  readonly lg: "0.5rem";
  readonly xl: "0.75rem";
  readonly "2xl": "1rem";
  readonly "3xl": "1.5rem";
  readonly full: "9999px";
};
/**
 * Component-Specific Radius Standards
 * Defines recommended radius values for different component types
 */
export declare const componentRadius: {
  readonly button: {
    readonly sm: "0.25rem";
    readonly md: "0.375rem";
    readonly lg: "0.5rem";
    readonly pill: "9999px";
  };
  readonly card: {
    readonly sm: "0.25rem";
    readonly md: "0.375rem";
    readonly lg: "0.5rem";
    readonly xl: "0.75rem";
  };
  readonly input: {
    readonly sm: "0.25rem";
    readonly md: "0.375rem";
    readonly lg: "0.5rem";
  };
  readonly badge: {
    readonly sm: "0.125rem";
    readonly md: "0.25rem";
    readonly lg: "0.375rem";
    readonly pill: "9999px";
  };
  readonly avatar: {
    readonly sm: "9999px";
    readonly md: "9999px";
    readonly lg: "9999px";
    readonly square: "0.375rem";
  };
  readonly modal: {
    readonly sm: "0.375rem";
    readonly md: "0.5rem";
    readonly lg: "0.75rem";
    readonly xl: "1rem";
  };
  readonly tooltip: {
    readonly sm: "0.25rem";
    readonly md: "0.375rem";
  };
  readonly toast: {
    readonly sm: "0.375rem";
    readonly md: "0.5rem";
    readonly lg: "0.75rem";
  };
  readonly chip: {
    readonly sm: "0.125rem";
    readonly md: "0.25rem";
    readonly lg: "0.375rem";
    readonly pill: "9999px";
  };
  readonly image: {
    readonly none: "0";
    readonly sm: "0.25rem";
    readonly md: "0.375rem";
    readonly lg: "0.5rem";
    readonly xl: "0.75rem";
    readonly full: "9999px";
  };
};
/**
 * CSS Custom Properties for Border Radius
 * These will be injected into the theme system
 */
export declare const radiusCSSVariables: {
  readonly "--radius-none": "0";
  readonly "--radius-xs": "0.125rem";
  readonly "--radius-sm": "0.25rem";
  readonly "--radius-base": "0.25rem";
  readonly "--radius-md": "0.375rem";
  readonly "--radius-lg": "0.5rem";
  readonly "--radius-xl": "0.75rem";
  readonly "--radius-2xl": "1rem";
  readonly "--radius-3xl": "1.5rem";
  readonly "--radius-full": "9999px";
  readonly "--radius": "0.375rem";
  readonly "--radius-button": "0.375rem";
  readonly "--radius-card": "0.375rem";
  readonly "--radius-input": "0.375rem";
  readonly "--radius-badge": "0.25rem";
  readonly "--radius-modal": "0.5rem";
  readonly "--radius-tooltip": "0.25rem";
  readonly "--radius-toast": "0.5rem";
  readonly "--radius-chip": "0.25rem";
  readonly "--radius-image": "0.375rem";
};
/**
 * Tailwind Border Radius Config
 * Maps to Tailwind theme.extend.borderRadius
 */
export declare const tailwindRadiusConfig: {
  readonly borderRadius: Record<string, string>;
};
/**
 * Type Exports
 */
export type BorderRadius = keyof typeof borderRadius;
export type ComponentRadius = {
  button: keyof typeof componentRadius.button;
  card: keyof typeof componentRadius.card;
  input: keyof typeof componentRadius.input;
  badge: keyof typeof componentRadius.badge;
  avatar: keyof typeof componentRadius.avatar;
  modal: keyof typeof componentRadius.modal;
  tooltip: keyof typeof componentRadius.tooltip;
  toast: keyof typeof componentRadius.toast;
  chip: keyof typeof componentRadius.chip;
  image: keyof typeof componentRadius.image;
};
//# sourceMappingURL=radius.d.ts.map
