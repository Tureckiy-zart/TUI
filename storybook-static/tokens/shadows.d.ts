/**
 * Shadow and Glow System Tokens
 *
 * Complete shadow system for Tenerife UI based on design system specifications.
 * Includes: elevation shadows, colored shadows (primary/accent), glow effects,
 * and focus ring tokens for accessibility.
 *
 * @see docs/tenerife_audit/design_system.md - shadow system section
 */
/**
 * Elevation Shadow Tokens
 * Used for component depth and elevation hierarchy
 * Values: none, xs, sm, md, lg, xl, 2xl
 */
export declare const elevationShadows: {
  readonly none: "none";
  readonly xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)";
  readonly sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
  readonly md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
  readonly lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
  readonly xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
  readonly "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)";
};
/**
 * Primary Colored Shadow Tokens
 * Used for interactive elements and brand emphasis with primary color
 */
export declare const primaryColoredShadows: {
  readonly xs: "0 1px 2px 0 hsl(var(--primary-500) / 0.15)";
  readonly sm: "0 2px 4px 0 hsl(var(--primary-500) / 0.2)";
  readonly md: "0 4px 8px 0 hsl(var(--primary-500) / 0.3)";
  readonly lg: "0 8px 16px 0 hsl(var(--primary-500) / 0.4)";
  readonly xl: "0 12px 24px 0 hsl(var(--primary-500) / 0.5)";
  readonly "2xl": "0 16px 32px 0 hsl(var(--primary-500) / 0.6)";
};
/**
 * Accent Colored Shadow Tokens
 * Used for accent elements and highlights with accent color
 */
export declare const accentColoredShadows: {
  readonly xs: "0 1px 2px 0 hsl(var(--accent-500) / 0.15)";
  readonly sm: "0 2px 4px 0 hsl(var(--accent-500) / 0.2)";
  readonly md: "0 4px 8px 0 hsl(var(--accent-500) / 0.3)";
  readonly lg: "0 8px 16px 0 hsl(var(--accent-500) / 0.4)";
  readonly xl: "0 12px 24px 0 hsl(var(--accent-500) / 0.5)";
  readonly "2xl": "0 16px 32px 0 hsl(var(--accent-500) / 0.6)";
};
/**
 * Glow Effect Tokens
 * Used for focus states, brand emphasis, and interactive feedback
 */
export declare const glowEffects: {
  readonly "glow-primary": "0 0 20px 0 hsl(var(--primary-500) / 0.5), 0 0 40px 0 hsl(var(--primary-500) / 0.3)";
  readonly "glow-primary-subtle": "0 0 8px 0 hsl(var(--primary-500) / 0.3)";
  readonly "glow-primary-medium": "0 0 16px 0 hsl(var(--primary-500) / 0.5)";
  readonly "glow-primary-strong": "0 0 24px 0 hsl(var(--primary-500) / 0.6)";
  readonly "glow-accent": "0 0 20px 0 hsl(var(--accent-500) / 0.5), 0 0 40px 0 hsl(var(--accent-500) / 0.3)";
  readonly "glow-accent-subtle": "0 0 8px 0 hsl(var(--accent-500) / 0.3)";
  readonly "glow-accent-medium": "0 0 16px 0 hsl(var(--accent-500) / 0.5)";
  readonly "glow-accent-strong": "0 0 24px 0 hsl(var(--accent-500) / 0.6)";
};
/**
 * Focus Ring Tokens
 * Used for keyboard focus indicators (accessibility)
 */
export declare const focusRings: {
  readonly default: "0 0 0 3px hsl(var(--ring) / 0.5)";
  readonly primary: "0 0 0 3px hsl(var(--primary-500) / 0.3)";
  readonly accent: "0 0 0 3px hsl(var(--accent-500) / 0.3)";
  readonly "focus-primary": "0 0 0 3px hsl(var(--primary-500) / 0.3)";
  readonly "focus-accent": "0 0 0 3px hsl(var(--accent-500) / 0.3)";
};
/**
 * CSS Custom Properties for Shadows
 * These will be injected into the theme system
 */
export declare const shadowCSSVariables: {
  readonly "--shadow-none": "none";
  readonly "--shadow-xs": "0 1px 2px 0 rgb(0 0 0 / 0.05)";
  readonly "--shadow-sm": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
  readonly "--shadow-md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
  readonly "--shadow-lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
  readonly "--shadow-xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
  readonly "--shadow-2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)";
  readonly "--shadow-primary-xs": "0 1px 2px 0 hsl(var(--primary-500) / 0.15)";
  readonly "--shadow-primary-sm": "0 2px 4px 0 hsl(var(--primary-500) / 0.2)";
  readonly "--shadow-primary-md": "0 4px 8px 0 hsl(var(--primary-500) / 0.3)";
  readonly "--shadow-primary-lg": "0 8px 16px 0 hsl(var(--primary-500) / 0.4)";
  readonly "--shadow-primary-xl": "0 12px 24px 0 hsl(var(--primary-500) / 0.5)";
  readonly "--shadow-primary-2xl": "0 16px 32px 0 hsl(var(--primary-500) / 0.6)";
  readonly "--shadow-accent-xs": "0 1px 2px 0 hsl(var(--accent-500) / 0.15)";
  readonly "--shadow-accent-sm": "0 2px 4px 0 hsl(var(--accent-500) / 0.2)";
  readonly "--shadow-accent-md": "0 4px 8px 0 hsl(var(--accent-500) / 0.3)";
  readonly "--shadow-accent-lg": "0 8px 16px 0 hsl(var(--accent-500) / 0.4)";
  readonly "--shadow-accent-xl": "0 12px 24px 0 hsl(var(--accent-500) / 0.5)";
  readonly "--shadow-accent-2xl": "0 16px 32px 0 hsl(var(--accent-500) / 0.6)";
  readonly "--glow-primary": "0 0 20px 0 hsl(var(--primary-500) / 0.5), 0 0 40px 0 hsl(var(--primary-500) / 0.3)";
  readonly "--glow-primary-subtle": "0 0 8px 0 hsl(var(--primary-500) / 0.3)";
  readonly "--glow-primary-medium": "0 0 16px 0 hsl(var(--primary-500) / 0.5)";
  readonly "--glow-primary-strong": "0 0 24px 0 hsl(var(--primary-500) / 0.6)";
  readonly "--glow-accent": "0 0 20px 0 hsl(var(--accent-500) / 0.5), 0 0 40px 0 hsl(var(--accent-500) / 0.3)";
  readonly "--glow-accent-subtle": "0 0 8px 0 hsl(var(--accent-500) / 0.3)";
  readonly "--glow-accent-medium": "0 0 16px 0 hsl(var(--accent-500) / 0.5)";
  readonly "--glow-accent-strong": "0 0 24px 0 hsl(var(--accent-500) / 0.6)";
  readonly "--focus-ring-default": "0 0 0 3px hsl(var(--ring) / 0.5)";
  readonly "--focus-ring-primary": "0 0 0 3px hsl(var(--primary-500) / 0.3)";
  readonly "--focus-ring-accent": "0 0 0 3px hsl(var(--accent-500) / 0.3)";
  readonly "--focus-primary": "0 0 0 3px hsl(var(--primary-500) / 0.3)";
  readonly "--focus-accent": "0 0 0 3px hsl(var(--accent-500) / 0.3)";
};
/**
 * Component Shadow Mapping
 * Defines which shadow level to use for different component states
 */
export declare const componentShadowMapping: {
  readonly card: {
    readonly default: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
    readonly hover: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
    readonly active: "0 1px 2px 0 rgb(0 0 0 / 0.05)";
    readonly selected: "0 2px 4px 0 hsl(var(--primary-500) / 0.2)";
  };
  readonly button: {
    readonly default: "0 1px 2px 0 rgb(0 0 0 / 0.05)";
    readonly hover: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
    readonly active: "none";
    readonly focus: "0 0 0 3px hsl(var(--primary-500) / 0.3)";
  };
  readonly "button-accent": {
    readonly default: "0 1px 2px 0 hsl(var(--accent-500) / 0.15)";
    readonly hover: "0 2px 4px 0 hsl(var(--accent-500) / 0.2)";
    readonly active: "none";
    readonly focus: "0 0 0 3px hsl(var(--accent-500) / 0.3)";
  };
  readonly modal: {
    readonly default: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
    readonly backdrop: "rgba(0, 0, 0, 0.5)";
  };
  readonly dropdown: {
    readonly default: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
    readonly hover: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
  };
  readonly tooltip: {
    readonly default: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
  };
  readonly toast: {
    readonly default: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
    readonly success: "0 10px 15px -3px hsl(var(--success) / 0.3)";
    readonly error: "0 10px 15px -3px hsl(var(--error) / 0.3)";
  };
};
/**
 * Tailwind Shadow Config
 * Maps to Tailwind theme.extend.boxShadow
 */
export declare const tailwindShadowConfig: {
  readonly boxShadow: Record<string, string>;
  readonly ringWidth: {
    readonly DEFAULT: "3px";
    readonly sm: "2px";
    readonly md: "3px";
    readonly lg: "4px";
  };
  readonly ringColor: Record<string, string>;
};
/**
 * Type Exports
 */
export type ElevationShadow = keyof typeof elevationShadows;
export type ColoredShadow = keyof typeof primaryColoredShadows | keyof typeof accentColoredShadows;
export type GlowEffect = keyof typeof glowEffects;
export type FocusRing = keyof typeof focusRings;
//# sourceMappingURL=shadows.d.ts.map
