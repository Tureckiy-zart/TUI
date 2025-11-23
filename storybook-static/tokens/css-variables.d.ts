/**
 * CSS Variables Generator
 *
 * Merges all CSS custom properties from all token systems.
 * This file aggregates all CSS variables for injection into the theme system.
 */
/**
 * All CSS Variables from Tokens
 * Merges all token CSS variables into a single object
 */
export declare const allCSSVariables: {
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
  readonly "--font-sans": string;
  readonly "--font-satoshi": string;
  readonly "--font-display": string;
  readonly "--font-serif": string;
  readonly "--font-mono": string;
  readonly "--font-size-xs": "clamp(0.75rem, 0.7rem + 0.125vw, 0.875rem)";
  readonly "--font-size-sm": "clamp(0.875rem, 0.8rem + 0.25vw, 1rem)";
  readonly "--font-size-base": "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)";
  readonly "--font-size-lg": "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)";
  readonly "--font-size-xl": "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)";
  readonly "--font-size-2xl": "clamp(1.5rem, 1.25rem + 1.25vw, 2rem)";
  readonly "--font-size-3xl": "clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)";
  readonly "--font-size-4xl": "clamp(2.25rem, 1.75rem + 2.5vw, 3rem)";
  readonly "--font-size-5xl": "clamp(3rem, 2rem + 5vw, 4rem)";
  readonly "--font-size-6xl": "clamp(3.75rem, 2.5rem + 6.25vw, 5rem)";
  readonly "--font-weight-thin": "100";
  readonly "--font-weight-extralight": "200";
  readonly "--font-weight-light": "300";
  readonly "--font-weight-normal": "400";
  readonly "--font-weight-medium": "500";
  readonly "--font-weight-semibold": "600";
  readonly "--font-weight-bold": "700";
  readonly "--font-weight-extrabold": "800";
  readonly "--font-weight-black": "900";
  readonly "--line-height-none": "1";
  readonly "--line-height-tight": "1.25";
  readonly "--line-height-snug": "1.375";
  readonly "--line-height-normal": "1.5";
  readonly "--line-height-relaxed": "1.625";
  readonly "--line-height-loose": "2";
  readonly "--letter-spacing-tighter": "-0.05em";
  readonly "--letter-spacing-tight": "-0.025em";
  readonly "--letter-spacing-normal": "0em";
  readonly "--letter-spacing-wide": "0.025em";
  readonly "--letter-spacing-wider": "0.05em";
  readonly "--letter-spacing-widest": "0.1em";
  readonly "--primary-50": string;
  readonly "--primary-100": string;
  readonly "--primary-200": string;
  readonly "--primary-300": string;
  readonly "--primary-400": string;
  readonly "--primary-500": string;
  readonly "--primary-600": string;
  readonly "--primary-700": string;
  readonly "--primary-800": string;
  readonly "--primary-900": string;
  readonly "--primary-950": string;
  readonly "--accent-50": string;
  readonly "--accent-100": string;
  readonly "--accent-200": string;
  readonly "--accent-300": string;
  readonly "--accent-400": string;
  readonly "--accent-500": string;
  readonly "--accent-600": string;
  readonly "--accent-700": string;
  readonly "--accent-800": string;
  readonly "--accent-900": string;
  readonly "--accent-950": string;
  readonly "--secondary-50": string;
  readonly "--secondary-100": string;
  readonly "--secondary-200": string;
  readonly "--secondary-300": string;
  readonly "--secondary-400": string;
  readonly "--secondary-500": string;
  readonly "--secondary-600": string;
  readonly "--secondary-700": string;
  readonly "--secondary-800": string;
  readonly "--secondary-900": string;
  readonly "--secondary-950": string;
  readonly "--surface-base": string;
  readonly "--surface-elevated1": string;
  readonly "--surface-elevated2": string;
  readonly "--surface-elevated3": string;
  readonly "--surface-overlay": string;
  readonly "--surface-glass": string;
  readonly "--semantic-success": string;
  readonly "--semantic-success-foreground": string;
  readonly "--semantic-error": string;
  readonly "--semantic-error-foreground": string;
  readonly "--semantic-warning": string;
  readonly "--semantic-warning-foreground": string;
  readonly "--semantic-info": string;
  readonly "--semantic-info-foreground": string;
  readonly "--text-primary": string;
  readonly "--text-secondary": string;
  readonly "--text-tertiary": string;
  readonly "--text-muted": string;
  readonly "--text-inverse": string;
};
/**
 * Generate CSS string from CSS variables
 * Converts CSS variables object to CSS :root block
 */
export declare function generateCSSVariablesCSS(variables: Record<string, string>): string;
/**
 * All CSS Variables as CSS string
 * Ready for injection into CSS files
 */
export declare const allCSSVariablesCSS: string;
/**
 * Token System Summary
 * Lists all token systems and their variable counts
 */
export declare const tokenSystemSummary: {
  readonly colors: number;
  readonly typography: number;
  readonly spacing: number;
  readonly shadows: number;
  readonly radius: number;
  readonly motion: number;
  readonly total: number;
};
//# sourceMappingURL=css-variables.d.ts.map
