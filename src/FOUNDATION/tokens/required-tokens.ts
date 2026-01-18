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
 * @see docs/theming/TM_TOKEN_CONTRACT_V1.md - Canon TM token contract v1
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
  // Surface tokens
  "--tm-surface-base",
  "--tm-surface-raised",
  "--tm-surface-overlay",

  // Text tokens
  "--tm-text-primary",
  "--tm-text-secondary",
  "--tm-text-muted",
  "--tm-text-inverse",

  // Border tokens
  "--tm-border-default",
  "--tm-border-strong",

  // Focus tokens
  "--tm-focus-ring",

  // Color tokens
  "--tm-primary",
  "--tm-primary-foreground",
  "--tm-secondary",
  "--tm-secondary-foreground",
  "--tm-accent",
  "--tm-accent-foreground",
  "--tm-destructive",
  "--tm-destructive-foreground",
  "--tm-muted",
  "--tm-muted-foreground",

  // State tokens
  "--tm-disabled",
  "--tm-disabled-foreground",
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
