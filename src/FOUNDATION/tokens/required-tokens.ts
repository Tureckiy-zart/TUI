/**
 * Canonical Token Registry
 *
 * This file defines the complete list of required semantic tokens that must be
 * present in every theme CSS file. This registry serves as the single source
 * of truth for token parity validation.
 *
 * All theme files (theme.default-light.css, theme.default-dark.css, etc.)
 * must define exactly this set of tokens. The token parity checker script
 * compares theme files against this registry to ensure consistency.
 *
 * @see docs/theming/TOKEN_NAMING_DECISION.md - Token naming decision
 * @see docs/theming/THEME_SYSTEM_ARCHITECTURE.md - Theme system architecture
 * @see scripts/check-theme-token-parity.mjs - Parity checker script
 */

/**
 * Required semantic tokens for all themes
 *
 * These tokens must be defined in every theme CSS file using the format:
 * :root[data-theme="<theme-id>"] {
 *   --tm-<token-name>: <value>;
 * }
 */
export const REQUIRED_THEME_TOKENS = [
  // Background tokens
  "--tm-bg",
  "--tm-bg-elev-1",
  "--tm-bg-elev-2",
  "--tm-overlay",
  "--tm-scrim",

  // Foreground/text tokens
  "--tm-fg",
  "--tm-fg-muted",
  "--tm-fg-subtle",

  // Border tokens
  "--tm-border",
  "--tm-border-strong",
  "--tm-separator",

  // Focus and shadow tokens
  "--tm-ring",
  "--tm-shadow-color",
  "--tm-ring-offset",
  "--tm-shadow-1",
  "--tm-shadow-2",

  // Primary brand color tokens
  "--tm-primary",
  "--tm-primary-foreground",
  "--tm-primary-hover",

  // Secondary brand color tokens
  "--tm-secondary",
  "--tm-secondary-foreground",
  "--tm-secondary-hover",

  // Accent color tokens
  "--tm-accent",
  "--tm-accent-foreground",
  "--tm-accent-hover",

  // Destructive/error color tokens
  "--tm-destructive",
  "--tm-destructive-foreground",
  "--tm-destructive-hover",

  // Success color tokens
  "--tm-success",
  "--tm-success-foreground",
  "--tm-success-hover",

  // Warning color tokens
  "--tm-warning",
  "--tm-warning-foreground",
  "--tm-warning-hover",

  // Info color tokens
  "--tm-info",
  "--tm-info-foreground",
  "--tm-info-hover",

  // Muted color tokens
  "--tm-muted",
  "--tm-muted-foreground",

  // Disabled state tokens
  "--tm-disabled",
  "--tm-disabled-foreground",

  // Link tokens (optional but recommended)
  "--tm-link",
  "--tm-link-hover",

  // Selection tokens (optional but recommended)
  // Note: --tm-selection-fg is deprecated, use --tm-selection-foreground instead
  "--tm-selection-bg",
  "--tm-selection-foreground",
] as const;

/**
 * Type for required token names
 */
export type RequiredTokenName = (typeof REQUIRED_THEME_TOKENS)[number];

/**
 * Validate that a token name is in the required list
 */
export function isRequiredToken(tokenName: string): tokenName is RequiredTokenName {
  return REQUIRED_THEME_TOKENS.includes(tokenName as RequiredTokenName);
}

/**
 * Get all required tokens as a Set for efficient lookup
 */
export function getRequiredTokensSet(): Set<string> {
  return new Set(REQUIRED_THEME_TOKENS);
}
