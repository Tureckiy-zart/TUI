/**
 * Spacing System Tokens
 *
 * Complete spacing system for Tenerife UI based on 8px grid system.
 * Includes: base spacing scale (0-96), semantic spacing tokens (xs..5xl),
 * and layout spacing tokens (sections, containers, grids).
 *
 * Base unit: 8px (0.5rem)
 * All spacing values are multiples of 8px for consistent layout rhythm.
 */
/**
 * Base Spacing Scale
 * Values from 0 to 96 based on 8px grid system
 * Format: numeric keys map to rem values
 */
export declare const spacing: {
  readonly 0: "0";
  readonly px: "1px";
  readonly 0.5: "0.125rem";
  readonly 1: "0.25rem";
  readonly 1.5: "0.375rem";
  readonly 2: "0.5rem";
  readonly 2.5: "0.625rem";
  readonly 3: "0.75rem";
  readonly 3.5: "0.875rem";
  readonly 4: "1rem";
  readonly 5: "1.25rem";
  readonly 6: "1.5rem";
  readonly 7: "1.75rem";
  readonly 8: "2rem";
  readonly 9: "2.25rem";
  readonly 10: "2.5rem";
  readonly 11: "2.75rem";
  readonly 12: "3rem";
  readonly 14: "3.5rem";
  readonly 16: "4rem";
  readonly 20: "5rem";
  readonly 24: "6rem";
  readonly 28: "7rem";
  readonly 32: "8rem";
  readonly 36: "9rem";
  readonly 40: "10rem";
  readonly 44: "11rem";
  readonly 48: "12rem";
  readonly 52: "13rem";
  readonly 56: "14rem";
  readonly 60: "15rem";
  readonly 64: "16rem";
  readonly 72: "18rem";
  readonly 80: "20rem";
  readonly 96: "24rem";
};
/**
 * Semantic Spacing Tokens
 * Named tokens for common spacing use cases
 * Maps to base spacing scale
 */
export declare const semanticSpacing: {
  readonly xs: "0.25rem";
  readonly sm: "0.5rem";
  readonly md: "1rem";
  readonly lg: "1.5rem";
  readonly xl: "2rem";
  readonly "2xl": "3rem";
  readonly "3xl": "4rem";
  readonly "4xl": "5rem";
  readonly "5xl": "6rem";
  readonly none: "0";
};
/**
 * Layout Spacing Tokens
 * Spacing for common layout patterns
 */
export declare const layoutSpacing: {
  readonly section: {
    readonly xs: "1.5rem";
    readonly sm: "2rem";
    readonly md: "3rem";
    readonly lg: "4rem";
    readonly xl: "5rem";
    readonly "2xl": "6rem";
  };
  readonly container: {
    readonly xs: "0.5rem";
    readonly sm: "1rem";
    readonly md: "1.5rem";
    readonly lg: "2rem";
    readonly xl: "3rem";
  };
  readonly grid: {
    readonly xs: "0.5rem";
    readonly sm: "1rem";
    readonly md: "1.5rem";
    readonly lg: "2rem";
    readonly xl: "3rem";
  };
  readonly stack: {
    readonly xs: "0.25rem";
    readonly sm: "0.5rem";
    readonly md: "1rem";
    readonly lg: "1.5rem";
    readonly xl: "2rem";
  };
  readonly component: {
    readonly xs: "0.25rem";
    readonly sm: "0.5rem";
    readonly md: "1rem";
    readonly lg: "1.5rem";
    readonly xl: "2rem";
  };
};
/**
 * CSS Custom Properties for Spacing
 * These will be injected into the theme system
 */
export declare const spacingCSSVariables: {
  readonly "--spacing-0": "0";
  readonly "--spacing-px": "1px";
  readonly "--spacing-0-5": "0.125rem";
  readonly "--spacing-1": "0.25rem";
  readonly "--spacing-1-5": "0.375rem";
  readonly "--spacing-2": "0.5rem";
  readonly "--spacing-2-5": "0.625rem";
  readonly "--spacing-3": "0.75rem";
  readonly "--spacing-3-5": "0.875rem";
  readonly "--spacing-4": "1rem";
  readonly "--spacing-5": "1.25rem";
  readonly "--spacing-6": "1.5rem";
  readonly "--spacing-7": "1.75rem";
  readonly "--spacing-8": "2rem";
  readonly "--spacing-9": "2.25rem";
  readonly "--spacing-10": "2.5rem";
  readonly "--spacing-11": "2.75rem";
  readonly "--spacing-12": "3rem";
  readonly "--spacing-14": "3.5rem";
  readonly "--spacing-16": "4rem";
  readonly "--spacing-20": "5rem";
  readonly "--spacing-24": "6rem";
  readonly "--spacing-xs": "0.25rem";
  readonly "--spacing-sm": "0.5rem";
  readonly "--spacing-md": "1rem";
  readonly "--spacing-lg": "1.5rem";
  readonly "--spacing-xl": "2rem";
  readonly "--spacing-2xl": "3rem";
  readonly "--spacing-3xl": "4rem";
  readonly "--spacing-4xl": "5rem";
  readonly "--spacing-5xl": "6rem";
  readonly "--spacing-none": "0";
  readonly "--layout-section-xs": "1.5rem";
  readonly "--layout-section-sm": "2rem";
  readonly "--layout-section-md": "3rem";
  readonly "--layout-section-lg": "4rem";
  readonly "--layout-section-xl": "5rem";
  readonly "--layout-section-2xl": "6rem";
  readonly "--layout-container-xs": "0.5rem";
  readonly "--layout-container-sm": "1rem";
  readonly "--layout-container-md": "1.5rem";
  readonly "--layout-container-lg": "2rem";
  readonly "--layout-container-xl": "3rem";
  readonly "--layout-grid-xs": "0.5rem";
  readonly "--layout-grid-sm": "1rem";
  readonly "--layout-grid-md": "1.5rem";
  readonly "--layout-grid-lg": "2rem";
  readonly "--layout-grid-xl": "3rem";
  readonly "--layout-stack-xs": "0.25rem";
  readonly "--layout-stack-sm": "0.5rem";
  readonly "--layout-stack-md": "1rem";
  readonly "--layout-stack-lg": "1.5rem";
  readonly "--layout-stack-xl": "2rem";
  readonly "--layout-component-xs": "0.25rem";
  readonly "--layout-component-sm": "0.5rem";
  readonly "--layout-component-md": "1rem";
  readonly "--layout-component-lg": "1.5rem";
  readonly "--layout-component-xl": "2rem";
};
/**
 * Tailwind Spacing Config
 * Maps to Tailwind theme.extend.spacing
 */
export declare const tailwindSpacingConfig: {
  readonly spacing: Record<string, string>;
};
/**
 * Type Exports
 */
export type Spacing = keyof typeof spacing;
export type SemanticSpacing = keyof typeof semanticSpacing;
export type SectionSpacing = keyof typeof layoutSpacing.section;
export type ContainerSpacing = keyof typeof layoutSpacing.container;
export type GridSpacing = keyof typeof layoutSpacing.grid;
export type StackSpacing = keyof typeof layoutSpacing.stack;
export type ComponentSpacing = keyof typeof layoutSpacing.component;
//# sourceMappingURL=spacing.d.ts.map
