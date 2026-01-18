/**
 * Form Component Tokens
 *
 * Shared design tokens for form-related components (Label, Input, Textarea, etc.).
 * These tokens represent shared form semantics that are unlikely to diverge between components.
 *
 * Note: This is a shared token domain for form semantics. Individual form components
 * (Input, Textarea, Select) have their own token domains for component-specific styling.
 */

/**
 * Form Component Tokens
 *
 * Defines shared tokens for form-related components.
 */
export const FORM_TOKENS = {
  /**
   * Label tokens
   * Spacing and styling for labels
   */
  label: {
    /**
     * Spacing between label and form control
     */
    spacing: "space-y-sm", // 8px (0.5rem) - spacing between label and control
    /**
     * Color for required asterisk mark
     */
    requiredMark: "text-[hsl(var(--tm-destructive))]", // Color for required asterisk
    /**
     * Disabled state styling for labels
     * Uses explicit disabled semantic token for better accessibility
     */
    disabled: "peer-disabled:text-disabled-foreground", // Disabled text color using explicit disabled semantic token
  } as const,

  /**
   * Field spacing tokens
   * Spacing between form fields
   */
  spacing: {
    /**
     * Vertical spacing between form fields
     */
    field: "space-y-sm", // 8px (0.5rem) - spacing between form fields
  } as const,
} as const;

/**
 * Type exports for Form tokens
 */
export type FormLabelSpacing = typeof FORM_TOKENS.label.spacing;
export type FormFieldSpacing = typeof FORM_TOKENS.spacing.field;
