/**
 * Theme Contract Patterns
 *
 * Canonical regex patterns for Theme Contract v1 validation.
 * All build-time tools must import patterns from here.
 *
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

/**
 * Theme ID regex pattern
 * Format: <palette>-<mode> where mode is "light" or "dark"
 * Examples: "ocean-light", "brand-dark", "default-light", "my-brand-light"
 *
 * Rules:
 * - Must start with a lowercase letter
 * - Can contain lowercase letters, numbers, and single hyphens
 * - Consecutive hyphens (--) are NOT allowed
 * - Must end with "-light" or "-dark"
 */
export const THEME_ID_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*-(light|dark)$/;

/**
 * Palette name regex pattern
 * Lowercase alphanumeric with hyphens, starting with letter
 * Examples: "ocean", "my-brand", "default"
 *
 * Rules:
 * - Must start with a lowercase letter
 * - Can contain lowercase letters, numbers, and single hyphens
 * - Consecutive hyphens (--) are NOT allowed
 * - Cannot end with a hyphen
 */
export const PALETTE_NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

/**
 * Valid theme modes array
 */
export const VALID_MODES = ["light", "dark"] as const;
