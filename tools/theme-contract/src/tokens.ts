/**
 * Theme Contract Tokens
 *
 * Canonical source for required theme tokens.
 * Re-exports from Foundation to ensure single source of truth.
 *
 * @see src/FOUNDATION/tokens/required-tokens.ts
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

// Import from Foundation - the true canonical source
import { REQUIRED_THEME_TOKENS as FOUNDATION_TOKENS } from "../../../src/FOUNDATION/tokens/required-tokens.js";

/**
 * Required theme tokens from the canonical registry
 * Re-exported from Foundation for use in build-time tools
 */
export const REQUIRED_THEME_TOKENS = FOUNDATION_TOKENS;

/**
 * Set of required tokens for efficient lookup
 */
export const REQUIRED_TOKENS_SET: ReadonlySet<string> = new Set(REQUIRED_THEME_TOKENS);

/**
 * Tokens that require a corresponding -foreground pair
 * These are semantic color tokens that need both background and foreground
 */
export const TOKENS_REQUIRING_FOREGROUND = [
  "--tm-primary",
  "--tm-secondary",
  "--tm-accent",
  "--tm-destructive",
  "--tm-success",
  "--tm-warning",
  "--tm-info",
  "--tm-muted",
  "--tm-disabled",
  "--tm-selection-bg",
] as const;

/**
 * Deprecated tokens that should trigger warnings
 */
export const DEPRECATED_TOKENS: Record<string, string> = {
  "--tm-selection-fg": "Use --tm-selection-foreground instead",
};
