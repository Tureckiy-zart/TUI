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
export const fontFamily = {
  // Primary font - Inter (default sans)
  sans: [
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
  ],

  // Optional font - Satoshi
  satoshi: [
    "Satoshi",
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],

  // Display font - Clash Display (for headings and hero sections)
  display: [
    "Clash Display",
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],

  // Serif font family
  serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],

  // Monospace font family
  mono: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
} as const;

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
export const fontSize = {
  // text-xs: 12px base, scales from 0.75rem to 0.875rem
  xs: [
    "clamp(0.75rem, 0.7rem + 0.125vw, 0.875rem)",
    { lineHeight: "1rem", letterSpacing: "0.05em" },
  ],

  // text-sm: 14px base, scales from 0.875rem to 1rem
  sm: [
    "clamp(0.875rem, 0.8rem + 0.25vw, 1rem)",
    { lineHeight: "1.25rem", letterSpacing: "0.025em" },
  ],

  // text-base: 16px base, scales from 1rem to 1.125rem
  base: ["clamp(1rem, 0.95rem + 0.25vw, 1.125rem)", { lineHeight: "1.5rem", letterSpacing: "0em" }],

  // text-lg: 18px base, scales from 1.125rem to 1.25rem
  lg: [
    "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)",
    { lineHeight: "1.75rem", letterSpacing: "-0.025em" },
  ],

  // text-xl: 20px base, scales from 1.25rem to 1.5rem
  xl: [
    "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
    { lineHeight: "1.75rem", letterSpacing: "-0.025em" },
  ],

  // text-2xl: 24px base, scales from 1.5rem to 2rem
  "2xl": [
    "clamp(1.5rem, 1.25rem + 1.25vw, 2rem)",
    { lineHeight: "2rem", letterSpacing: "-0.05em" },
  ],

  // text-3xl: 30px base, scales from 1.875rem to 2.5rem
  "3xl": [
    "clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)",
    { lineHeight: "2.25rem", letterSpacing: "-0.05em" },
  ],

  // text-4xl: 36px base, scales from 2.25rem to 3rem
  "4xl": [
    "clamp(2.25rem, 1.75rem + 2.5vw, 3rem)",
    { lineHeight: "2.5rem", letterSpacing: "-0.025em" },
  ],

  // text-5xl: 48px base, scales from 3rem to 4rem
  "5xl": ["clamp(3rem, 2rem + 5vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],

  // text-6xl: 60px base, scales from 3.75rem to 5rem
  "6xl": ["clamp(3.75rem, 2.5rem + 6.25vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.05em" }],

  // text-7xl: 72px base (optional, for hero sections)
  "7xl": ["clamp(4.5rem, 3rem + 7.5vw, 6rem)", { lineHeight: "1", letterSpacing: "-0.05em" }],

  // text-8xl: 96px base (optional, for hero sections)
  "8xl": ["clamp(6rem, 4rem + 10vw, 8rem)", { lineHeight: "1", letterSpacing: "-0.05em" }],

  // text-9xl: 128px base (optional, for hero sections)
  "9xl": ["clamp(8rem, 5rem + 15vw, 12rem)", { lineHeight: "1", letterSpacing: "-0.05em" }],
} as const;

/**
 * Font Weight Tokens
 * Range: 300 (light) to 800 (extrabold)
 */
export const fontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
} as const;

/**
 * Line Height Tokens
 * Used for vertical rhythm and readability
 */
export const lineHeight = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const;

/**
 * Letter Spacing Tokens
 * Used for tracking (character spacing)
 */
export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

/**
 * CSS Custom Properties for Typography
 * These will be injected into the theme system
 */
export const typographyCSSVariables = {
  // Font families
  "--font-sans": fontFamily.sans.join(", "),
  "--font-satoshi": fontFamily.satoshi.join(", "),
  "--font-display": fontFamily.display.join(", "),
  "--font-serif": fontFamily.serif.join(", "),
  "--font-mono": fontFamily.mono.join(", "),

  // Font sizes (using clamp values)
  "--font-size-xs": fontSize.xs[0],
  "--font-size-sm": fontSize.sm[0],
  "--font-size-base": fontSize.base[0],
  "--font-size-lg": fontSize.lg[0],
  "--font-size-xl": fontSize.xl[0],
  "--font-size-2xl": fontSize["2xl"][0],
  "--font-size-3xl": fontSize["3xl"][0],
  "--font-size-4xl": fontSize["4xl"][0],
  "--font-size-5xl": fontSize["5xl"][0],
  "--font-size-6xl": fontSize["6xl"][0],

  // Font weights
  "--font-weight-thin": fontWeight.thin,
  "--font-weight-extralight": fontWeight.extralight,
  "--font-weight-light": fontWeight.light,
  "--font-weight-normal": fontWeight.normal,
  "--font-weight-medium": fontWeight.medium,
  "--font-weight-semibold": fontWeight.semibold,
  "--font-weight-bold": fontWeight.bold,
  "--font-weight-extrabold": fontWeight.extrabold,
  "--font-weight-black": fontWeight.black,

  // Line heights
  "--line-height-none": lineHeight.none,
  "--line-height-tight": lineHeight.tight,
  "--line-height-snug": lineHeight.snug,
  "--line-height-normal": lineHeight.normal,
  "--line-height-relaxed": lineHeight.relaxed,
  "--line-height-loose": lineHeight.loose,

  // Letter spacing
  "--letter-spacing-tighter": letterSpacing.tighter,
  "--letter-spacing-tight": letterSpacing.tight,
  "--letter-spacing-normal": letterSpacing.normal,
  "--letter-spacing-wide": letterSpacing.wide,
  "--letter-spacing-wider": letterSpacing.wider,
  "--letter-spacing-widest": letterSpacing.widest,
} as const;

/**
 * Predefined Text Styles
 * Common combinations for headings, body text, etc.
 */
export const textStyles = {
  // Display styles (for hero sections)
  display: {
    fontFamily: fontFamily.display.join(", "),
    fontSize: fontSize["6xl"][0],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.tight,
  },

  // Heading styles
  h1: {
    fontFamily: fontFamily.display.join(", "),
    fontSize: fontSize["5xl"][0],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily: fontFamily.display.join(", "),
    fontSize: fontSize["4xl"][0],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize["3xl"][0],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize["2xl"][0],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  h5: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.xl[0],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.lg[0],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Body text styles
  body: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.base[0],
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  "body-sm": {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.sm[0],
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  "body-xs": {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.xs[0],
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },

  // Label styles
  label: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.sm[0],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
  "label-sm": {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.xs[0],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wider,
  },

  // Caption styles
  caption: {
    fontFamily: fontFamily.sans.join(", "),
    fontSize: fontSize.xs[0],
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
} as const;

/**
 * Tailwind Typography Config
 * Maps to Tailwind theme.extend.typography
 * Note: Typed as tuples for Tailwind compatibility
 */
export const tailwindTypographyConfig = {
  fontFamily: {
    sans: [...fontFamily.sans] as string[],
    satoshi: [...fontFamily.satoshi] as string[],
    display: [...fontFamily.display] as string[],
    serif: [...fontFamily.serif] as string[],
    mono: [...fontFamily.mono] as string[],
  },
  fontSize: {
    xs: [
      fontSize.xs[0],
      { lineHeight: fontSize.xs[1].lineHeight, letterSpacing: fontSize.xs[1].letterSpacing },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    sm: [
      fontSize.sm[0],
      { lineHeight: fontSize.sm[1].lineHeight, letterSpacing: fontSize.sm[1].letterSpacing },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    md: [
      fontSize.base[0],
      { lineHeight: fontSize.base[1].lineHeight, letterSpacing: fontSize.base[1].letterSpacing },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    base: [
      fontSize.base[0],
      { lineHeight: fontSize.base[1].lineHeight, letterSpacing: fontSize.base[1].letterSpacing },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    lg: [
      fontSize.lg[0],
      { lineHeight: fontSize.lg[1].lineHeight, letterSpacing: fontSize.lg[1].letterSpacing },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    xl: [
      fontSize.xl[0],
      { lineHeight: fontSize.xl[1].lineHeight, letterSpacing: fontSize.xl[1].letterSpacing },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "2xl": [
      fontSize["2xl"][0],
      {
        lineHeight: fontSize["2xl"][1].lineHeight,
        letterSpacing: fontSize["2xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "3xl": [
      fontSize["3xl"][0],
      {
        lineHeight: fontSize["3xl"][1].lineHeight,
        letterSpacing: fontSize["3xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "4xl": [
      fontSize["4xl"][0],
      {
        lineHeight: fontSize["4xl"][1].lineHeight,
        letterSpacing: fontSize["4xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "5xl": [
      fontSize["5xl"][0],
      {
        lineHeight: fontSize["5xl"][1].lineHeight,
        letterSpacing: fontSize["5xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "6xl": [
      fontSize["6xl"][0],
      {
        lineHeight: fontSize["6xl"][1].lineHeight,
        letterSpacing: fontSize["6xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "7xl": [
      fontSize["7xl"][0],
      {
        lineHeight: fontSize["7xl"][1].lineHeight,
        letterSpacing: fontSize["7xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "8xl": [
      fontSize["8xl"][0],
      {
        lineHeight: fontSize["8xl"][1].lineHeight,
        letterSpacing: fontSize["8xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
    "9xl": [
      fontSize["9xl"][0],
      {
        lineHeight: fontSize["9xl"][1].lineHeight,
        letterSpacing: fontSize["9xl"][1].letterSpacing,
      },
    ] as [string, { lineHeight: string; letterSpacing: string }],
  },
  fontWeight: { ...fontWeight },
  lineHeight: { ...lineHeight },
  letterSpacing: { ...letterSpacing },
} as const;

/**
 * Canonical Typography Types
 * Restricted to canonical values for component APIs
 */

/**
 * Canonical font weight tokens
 * Only these four weights should be used in typography components
 */
export type CanonicalFontWeight = "normal" | "medium" | "semibold" | "bold";

/**
 * Canonical font size scale tokens
 * Used for typography components
 */
export type CanonicalFontSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

/**
 * Canonical line height tokens
 * Used for typography components
 */
export type CanonicalLineHeight = "tight" | "normal" | "loose";

/**
 * Canonical letter spacing (tracking) tokens
 * Used for typography components
 */
export type CanonicalLetterSpacing = "tight" | "normal" | "wide";

/**
 * Canonical text color tokens
 * Semantic text colors for typography components
 */
export type CanonicalTextColor = "primary" | "secondary" | "muted" | "destructive" | "accent";

/**
 * Font size mapping for md (maps to base)
 */
export const fontSizeWithMd = {
  ...fontSize,
  md: fontSize.base,
} as const;

/**
 * Type Exports
 */
export type FontFamily = keyof typeof fontFamily;
export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type LetterSpacing = keyof typeof letterSpacing;
export type LineHeight = keyof typeof lineHeight;
export type TextStyle = keyof typeof textStyles;
