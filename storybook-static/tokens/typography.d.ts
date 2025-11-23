/**
 * Typography System Tokens
 *
 * Complete typography system for Tenerife UI based on design system specifications.
 * Includes: font families (Inter, Satoshi, Clash Display), fluid type scale using clamp(),
 * font weights, line heights, letter spacing, and predefined text styles.
 *
 * @see docs/tenerife_audit/design_system.md - typography system section
 */
/**
 * Font Families
 * Inter (primary), Satoshi (optional), Clash Display (headings/hero)
 */
export declare const fontFamily: {
  readonly sans: readonly [
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ];
  readonly satoshi: readonly [
    "Satoshi",
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ];
  readonly display: readonly [
    "Clash Display",
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ];
  readonly serif: readonly ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"];
  readonly mono: readonly [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ];
};
/**
 * Fluid Typography Scale
 * Uses clamp() for responsive type scaling
 * Values: text-xs through text-6xl
 *
 * Format: clamp(min, preferred, max)
 * min: smallest size (mobile)
 * preferred: fluid calculation
 * max: largest size (desktop)
 */
export declare const fontSize: {
  readonly xs: readonly [
    "clamp(0.75rem, 0.7rem + 0.125vw, 0.875rem)",
    {
      readonly lineHeight: "1rem";
      readonly letterSpacing: "0.05em";
    },
  ];
  readonly sm: readonly [
    "clamp(0.875rem, 0.8rem + 0.25vw, 1rem)",
    {
      readonly lineHeight: "1.25rem";
      readonly letterSpacing: "0.025em";
    },
  ];
  readonly base: readonly [
    "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
    {
      readonly lineHeight: "1.5rem";
      readonly letterSpacing: "0em";
    },
  ];
  readonly lg: readonly [
    "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)",
    {
      readonly lineHeight: "1.75rem";
      readonly letterSpacing: "-0.025em";
    },
  ];
  readonly xl: readonly [
    "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
    {
      readonly lineHeight: "1.75rem";
      readonly letterSpacing: "-0.025em";
    },
  ];
  readonly "2xl": readonly [
    "clamp(1.5rem, 1.25rem + 1.25vw, 2rem)",
    {
      readonly lineHeight: "2rem";
      readonly letterSpacing: "-0.05em";
    },
  ];
  readonly "3xl": readonly [
    "clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)",
    {
      readonly lineHeight: "2.25rem";
      readonly letterSpacing: "-0.05em";
    },
  ];
  readonly "4xl": readonly [
    "clamp(2.25rem, 1.75rem + 2.5vw, 3rem)",
    {
      readonly lineHeight: "2.5rem";
      readonly letterSpacing: "-0.025em";
    },
  ];
  readonly "5xl": readonly [
    "clamp(3rem, 2rem + 5vw, 4rem)",
    {
      readonly lineHeight: "1";
      readonly letterSpacing: "-0.025em";
    },
  ];
  readonly "6xl": readonly [
    "clamp(3.75rem, 2.5rem + 6.25vw, 5rem)",
    {
      readonly lineHeight: "1";
      readonly letterSpacing: "-0.05em";
    },
  ];
  readonly "7xl": readonly [
    "clamp(4.5rem, 3rem + 7.5vw, 6rem)",
    {
      readonly lineHeight: "1";
      readonly letterSpacing: "-0.05em";
    },
  ];
  readonly "8xl": readonly [
    "clamp(6rem, 4rem + 10vw, 8rem)",
    {
      readonly lineHeight: "1";
      readonly letterSpacing: "-0.05em";
    },
  ];
  readonly "9xl": readonly [
    "clamp(8rem, 5rem + 15vw, 12rem)",
    {
      readonly lineHeight: "1";
      readonly letterSpacing: "-0.05em";
    },
  ];
};
/**
 * Font Weight Tokens
 * Range: 300 (light) to 800 (extrabold)
 */
export declare const fontWeight: {
  readonly thin: "100";
  readonly extralight: "200";
  readonly light: "300";
  readonly normal: "400";
  readonly medium: "500";
  readonly semibold: "600";
  readonly bold: "700";
  readonly extrabold: "800";
  readonly black: "900";
};
/**
 * Line Height Tokens
 * Used for vertical rhythm and readability
 */
export declare const lineHeight: {
  readonly none: "1";
  readonly tight: "1.25";
  readonly snug: "1.375";
  readonly normal: "1.5";
  readonly relaxed: "1.625";
  readonly loose: "2";
};
/**
 * Letter Spacing Tokens
 * Used for tracking (character spacing)
 */
export declare const letterSpacing: {
  readonly tighter: "-0.05em";
  readonly tight: "-0.025em";
  readonly normal: "0em";
  readonly wide: "0.025em";
  readonly wider: "0.05em";
  readonly widest: "0.1em";
};
/**
 * CSS Custom Properties for Typography
 * These will be injected into the theme system
 */
export declare const typographyCSSVariables: {
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
};
/**
 * Predefined Text Styles
 * Common combinations for headings, body text, etc.
 */
export declare const textStyles: {
  readonly display: {
    readonly fontFamily: string;
    readonly fontSize: "clamp(3.75rem, 2.5rem + 6.25vw, 5rem)";
    readonly fontWeight: "700";
    readonly lineHeight: "1";
    readonly letterSpacing: "-0.025em";
  };
  readonly h1: {
    readonly fontFamily: string;
    readonly fontSize: "clamp(3rem, 2rem + 5vw, 4rem)";
    readonly fontWeight: "700";
    readonly lineHeight: "1.25";
    readonly letterSpacing: "-0.025em";
  };
  readonly h2: {
    readonly fontFamily: string;
    readonly fontSize: "clamp(2.25rem, 1.75rem + 2.5vw, 3rem)";
    readonly fontWeight: "700";
    readonly lineHeight: "1.25";
    readonly letterSpacing: "-0.025em";
  };
  readonly h3: {
    readonly fontFamily: string;
    readonly fontSize: "clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)";
    readonly fontWeight: "600";
    readonly lineHeight: "1.375";
    readonly letterSpacing: "0em";
  };
  readonly h4: {
    readonly fontFamily: string;
    readonly fontSize: "clamp(1.5rem, 1.25rem + 1.25vw, 2rem)";
    readonly fontWeight: "600";
    readonly lineHeight: "1.375";
    readonly letterSpacing: "0em";
  };
  readonly h5: {
    readonly fontFamily: string;
    readonly fontSize: "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)";
    readonly fontWeight: "500";
    readonly lineHeight: "1.5";
    readonly letterSpacing: "0em";
  };
  readonly h6: {
    readonly fontFamily: string;
    readonly fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)";
    readonly fontWeight: "500";
    readonly lineHeight: "1.5";
    readonly letterSpacing: "0em";
  };
  readonly body: {
    readonly fontFamily: string;
    readonly fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)";
    readonly fontWeight: "400";
    readonly lineHeight: "1.625";
    readonly letterSpacing: "0em";
  };
  readonly "body-sm": {
    readonly fontFamily: string;
    readonly fontSize: "clamp(0.875rem, 0.8rem + 0.25vw, 1rem)";
    readonly fontWeight: "400";
    readonly lineHeight: "1.5";
    readonly letterSpacing: "0em";
  };
  readonly "body-xs": {
    readonly fontFamily: string;
    readonly fontSize: "clamp(0.75rem, 0.7rem + 0.125vw, 0.875rem)";
    readonly fontWeight: "400";
    readonly lineHeight: "1.5";
    readonly letterSpacing: "0.025em";
  };
  readonly label: {
    readonly fontFamily: string;
    readonly fontSize: "clamp(0.875rem, 0.8rem + 0.25vw, 1rem)";
    readonly fontWeight: "500";
    readonly lineHeight: "1.5";
    readonly letterSpacing: "0.025em";
  };
  readonly "label-sm": {
    readonly fontFamily: string;
    readonly fontSize: "clamp(0.75rem, 0.7rem + 0.125vw, 0.875rem)";
    readonly fontWeight: "500";
    readonly lineHeight: "1.5";
    readonly letterSpacing: "0.05em";
  };
  readonly caption: {
    readonly fontFamily: string;
    readonly fontSize: "clamp(0.75rem, 0.7rem + 0.125vw, 0.875rem)";
    readonly fontWeight: "400";
    readonly lineHeight: "1.5";
    readonly letterSpacing: "0.025em";
  };
};
/**
 * Tailwind Typography Config
 * Maps to Tailwind theme.extend.typography
 * Note: Typed as tuples for Tailwind compatibility
 */
export declare const tailwindTypographyConfig: {
  fontFamily: {
    sans: string[];
    satoshi: string[];
    display: string[];
    serif: string[];
    mono: string[];
  };
  fontSize: {
    xs: [
      string,
      {
        lineHeight: string;
        letterSpacing: string;
      },
    ];
    sm: [
      string,
      {
        lineHeight: string;
        letterSpacing: string;
      },
    ];
    base: [
      string,
      {
        lineHeight: string;
        letterSpacing: string;
      },
    ];
    lg: [
      string,
      {
        lineHeight: string;
        letterSpacing: string;
      },
    ];
    xl: [
      string,
      {
        lineHeight: string;
        letterSpacing: string;
      },
    ];
    "2xl": [
      string,
      {
        lineHeight: string;
        letterSpacing: string;
      },
    ];
    "3xl": [
      string,
      {
        lineHeight: string;
        letterSpacing: string;
      },
    ];
    "4xl": [
      string,
      {
        lineHeight: string;
        letterSpacing: string;
      },
    ];
    "5xl": [
      string,
      {
        lineHeight: string;
        letterSpacing: string;
      },
    ];
    "6xl": [
      string,
      {
        lineHeight: string;
        letterSpacing: string;
      },
    ];
    "7xl": [
      string,
      {
        lineHeight: string;
        letterSpacing: string;
      },
    ];
    "8xl": [
      string,
      {
        lineHeight: string;
        letterSpacing: string;
      },
    ];
    "9xl": [
      string,
      {
        lineHeight: string;
        letterSpacing: string;
      },
    ];
  };
  fontWeight: Record<string, string>;
  lineHeight: Record<string, string>;
  letterSpacing: Record<string, string>;
};
/**
 * Type Exports
 */
export type FontFamily = keyof typeof fontFamily;
export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type LetterSpacing = keyof typeof letterSpacing;
export type LineHeight = keyof typeof lineHeight;
export type TextStyle = keyof typeof textStyles;
//# sourceMappingURL=typography.d.ts.map
