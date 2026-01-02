"use client";

/**
 * FormGroup Component
 *
 * @semantic_role FOUNDATION_PRIMITIVE_FORM_GROUPING
 *
 * @semantic_definition
 * FormGroup is a semantic wrapper for grouping related form fields using native HTML fieldset/legend.
 * It provides optional description and error slots with automatic ID generation for accessibility.
 * FormGroup is layout-transparent for children - it does not manage layout inside children.
 * It only guarantees vertical flow for its own semantic elements (description, error).
 *
 * **What FormGroup IS:**
 * - Semantic wrapper for grouping related form fields
 * - Uses native <fieldset> and conditional <legend> for accessibility
 * - Provides automatic ID generation for description/error (aria-describedby)
 * - Layout-transparent for user-provided children
 *
 * **What FormGroup IS NOT:**
 * - NOT a layout manager for its children
 * - NOT a validation system
 * - NOT a form state manager
 * - NOT a visual card/panel component
 *
 * **Layout Behavior:**
 * FormGroup is not a layout manager for its children.
 * It only guarantees a readable vertical flow for its own semantic elements (description, error).
 * User is responsible for layout inside children.
 * FormGroup must remain layout-transparent for child components.
 *
 * **Boundaries:**
 * - vs Field: Field manages single field layout (Label + Control + Description + Error), FormGroup groups multiple fields
 * - vs Form: Form handles form submission and validation, FormGroup only groups fields semantically
 *
 * **Forbidden Extensions:**
 * Validation logic, state management, input registration, visual framing, layout control inside children.
 *
 * @status NEW COMPONENT
 * @rule Foundation Enforcement: className and style props excluded from public API
 * @rule Layout Transparency: Children rendered without additional wrappers
 * @rule Token Compliance: Uses token-based spacing only (semanticSpacing.sm via Stack)
 */

import * as React from "react";

import { Stack } from "@/COMPOSITION/layout";

import type { FormGroupProps } from "./FormGroup.types";

/**
 * FormGroup Component Implementation
 *
 * Semantic wrapper for grouping related form fields.
 * Uses native fieldset/legend for accessibility and semantic grouping.
 *
 * Layout Strategy:
 * - Children are rendered without additional wrappers (layout-transparent)
 * - Stack is used only for vertical flow of description and error elements
 * - User controls layout inside children
 *
 * Accessibility:
 * - Automatic ID generation for description and error (aria-describedby)
 * - Legend announced by screen readers when provided
 * - Disabled state propagates to all form controls via fieldset disabled
 * - Required state reflected via aria-required on fieldset
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
const FormGroup = React.forwardRef<HTMLFieldSetElement, FormGroupProps>(
  ({ legend, description, error, disabled, required, children, ...props }, ref) => {
    const groupId = React.useId();
    const descriptionId = description ? `formgroup-${groupId}-description` : undefined;
    const errorId = error ? `formgroup-${groupId}-error` : undefined;

    // Helper function to add ID and aria-describedby to description/error
    const addIdToElement = (element: React.ReactNode, id: string | undefined): React.ReactNode => {
      if (!element || !id) {
        return null;
      }

      if (React.isValidElement(element)) {
        return React.cloneElement(
          element as React.ReactElement,
          {
            id,
            "aria-describedby": id,
          } as React.HTMLAttributes<HTMLElement>,
        );
      }

      return (
        <div id={id} aria-describedby={id}>
          {element}
        </div>
      );
    };

    const descriptionWithId = addIdToElement(description, descriptionId);
    const errorWithId = addIdToElement(error, errorId);

    return (
      <fieldset ref={ref} disabled={disabled} aria-required={required || undefined} {...props}>
        {legend && <legend>{legend}</legend>}
        {children}
        {(descriptionWithId || errorWithId) && (
          <Stack direction="vertical" spacing="sm">
            {descriptionWithId}
            {errorWithId}
          </Stack>
        )}
      </fieldset>
    );
  },
);

FormGroup.displayName = "FormGroup";

export { FormGroup };
