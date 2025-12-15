/**
 * Tailwind Color Safelist (STATIC)
 *
 * HARD RULE: This MUST be a static array of string literals.
 * Tailwind requires safelist to be available at build time.
 * No functions, generators, maps, or runtime logic allowed.
 *
 * This file ensures that all token-based color utility classes
 * are always included in Tailwind's CSS output, preventing
 * transparent backgrounds and missing styles.
 *
 * DO NOT:
 * - Use functions or generators
 * - Import from tokens dynamically
 * - Use Object.keys() or .map()
 * - Make this depend on runtime JavaScript
 * - Use RegExp patterns
 *
 * DO:
 * - Keep as static string literal array
 * - Update manually when adding new token-based classes
 * - Ensure all bg-*, text-*, border-* variants are included
 * - Include ALL opacity variants (50, 75, 80, 85, 90, 95) for critical colors
 */

export const TAILWIND_COLOR_SAFELIST = [
  // Backgrounds - base
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-destructive",
  "bg-muted",
  "bg-background",
  "bg-card",
  "bg-popover",

  // Backgrounds - opacity variants (50, 75, 80, 85, 90, 95)
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary/80",
  "bg-primary/85",
  "bg-primary/90",
  "bg-primary/95",
  "bg-secondary/50",
  "bg-secondary/75",
  "bg-secondary/80",
  "bg-secondary/85",
  "bg-secondary/90",
  "bg-secondary/95",
  "bg-accent/50",
  "bg-accent/75",
  "bg-accent/80",
  "bg-accent/85",
  "bg-accent/90",
  "bg-accent/95",
  "bg-destructive/50",
  "bg-destructive/75",
  "bg-destructive/80",
  "bg-destructive/85",
  "bg-destructive/90",
  "bg-destructive/95",

  // Text - base
  "text-primary-foreground",
  "text-secondary-foreground",
  "text-accent-foreground",
  "text-destructive-foreground",
  "text-foreground",
  "text-muted-foreground",
  "text-card-foreground",
  "text-popover-foreground",
  "text-semantic-success-foreground",
  "text-semantic-error-foreground",
  "text-semantic-warning-foreground",
  "text-semantic-info-foreground",

  // Text - opacity variants (50, 75, 80, 85, 90, 95)
  "text-primary-foreground/50",
  "text-primary-foreground/75",
  "text-primary-foreground/80",
  "text-primary-foreground/85",
  "text-primary-foreground/90",
  "text-primary-foreground/95",
  "text-secondary-foreground/50",
  "text-secondary-foreground/75",
  "text-secondary-foreground/80",
  "text-secondary-foreground/85",
  "text-secondary-foreground/90",
  "text-secondary-foreground/95",
  "text-accent-foreground/50",
  "text-accent-foreground/75",
  "text-accent-foreground/80",
  "text-accent-foreground/85",
  "text-accent-foreground/90",
  "text-accent-foreground/95",
  "text-foreground/50",
  "text-foreground/75",
  "text-foreground/80",
  "text-foreground/85",
  "text-foreground/90",
  "text-foreground/95",

  // Borders - base
  "border-input",
  "border-border",
  "border-accent",
  "border-primary",
  "border-secondary",
  "border-destructive",

  // Borders - opacity variants (50, 75, 80, 85, 90, 95)
  "border-primary/50",
  "border-primary/75",
  "border-primary/80",
  "border-primary/85",
  "border-primary/90",
  "border-primary/95",
  "border-secondary/50",
  "border-secondary/75",
  "border-secondary/80",
  "border-secondary/85",
  "border-secondary/90",
  "border-secondary/95",
  "border-accent/50",
  "border-accent/75",
  "border-accent/80",
  "border-accent/85",
  "border-accent/90",
  "border-accent/95",
  "border-destructive/50",
  "border-destructive/75",
  "border-destructive/80",
  "border-destructive/85",
  "border-destructive/90",
  "border-destructive/95",

  // Hover states with opacity (for buttons and interactive elements)
  "hover:bg-primary/50",
  "hover:bg-primary/75",
  "hover:bg-primary/80",
  "hover:bg-primary/85",
  "hover:bg-primary/90",
  "hover:bg-primary/95",
  "hover:bg-secondary/50",
  "hover:bg-secondary/75",
  "hover:bg-secondary/80",
  "hover:bg-secondary/85",
  "hover:bg-secondary/90",
  "hover:bg-secondary/95",
  "hover:bg-accent/50",
  "hover:bg-accent/75",
  "hover:bg-accent/80",
  "hover:bg-accent/85",
  "hover:bg-accent/90",
  "hover:bg-accent/95",
  "hover:bg-destructive/50",
  "hover:bg-destructive/75",
  "hover:bg-destructive/80",
  "hover:bg-destructive/85",
  "hover:bg-destructive/90",
  "hover:bg-destructive/95",

  // Hover states without opacity (for outline/ghost variants)
  "hover:bg-accent",
  "hover:bg-muted",
  "hover:bg-primary",
  "hover:bg-secondary",
  "hover:text-accent-foreground",
  "hover:text-foreground",
  "hover:text-primary-foreground",
  "hover:text-secondary-foreground",
  "hover:border-accent",
  "hover:border-primary",
  "hover:border-secondary",

  // Focus
  "focus-visible:ring-ring",
  "focus-visible:ring-primary",
  "focus-visible:ring-accent",
];
