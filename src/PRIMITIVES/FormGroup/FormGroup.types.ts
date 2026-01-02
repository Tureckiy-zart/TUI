"use client";

import * as React from "react";

/**
 * FormGroup Component Props
 *
 * Semantic wrapper for grouping related form fields using native fieldset/legend.
 * Provides optional description and error slots with automatic ID generation for accessibility.
 *
 * FormGroup is layout-transparent for children - it does not manage layout inside children.
 * It only guarantees vertical flow for its own semantic elements (description, error).
 *
 * @example
 * ```tsx
 * <FormGroup legend="Personal Information" required>
 *   <Input placeholder="First name" />
 *   <Input placeholder="Last name" />
 * </FormGroup>
 * ```
 *
 * @example
 * ```tsx
 * <FormGroup
 *   legend="Contact Details"
 *   description="We'll never share your contact information"
 *   error="Please fill all required fields"
 * >
 *   <Input placeholder="Email" />
 *   <Input placeholder="Phone" />
 * </FormGroup>
 * ```
 */
export interface FormGroupProps extends Omit<
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "className" | "style"
> {
  /**
   * Optional legend text or React node for the fieldset
   * Rendered as <legend> element when provided
   *
   * @example
   * ```tsx
   * <FormGroup legend="Account Settings">...</FormGroup>
   * ```
   */
  legend?: string | React.ReactNode;

  /**
   * Optional description text or React node
   * Rendered after children with automatic ID for aria-describedby
   *
   * @example
   * ```tsx
   * <FormGroup description="This information is optional">...</FormGroup>
   * ```
   */
  description?: React.ReactNode;

  /**
   * Optional error message text or React node
   * Rendered after description with automatic ID for aria-errormessage
   *
   * @example
   * ```tsx
   * <FormGroup error="Please correct the errors above">...</FormGroup>
   * ```
   */
  error?: React.ReactNode;

  /**
   * Whether the form group is disabled
   * Maps to native fieldset disabled attribute
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the form group is required
   * Maps to aria-required attribute on fieldset
   *
   * @default false
   */
  required?: boolean;

  /**
   * Form field children
   * Rendered without additional wrappers (layout-transparent)
   */
  children: React.ReactNode;
}
