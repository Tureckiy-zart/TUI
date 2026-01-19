import type { Meta, StoryObj } from "@storybook/react";

import { Field } from "@/PRIMITIVES/Field";
import { FormGroup } from "@/PRIMITIVES/FormGroup";
import { Input } from "@/PRIMITIVES/Input";
import { Label } from "@/PRIMITIVES/Label";

import { ErrorText } from "./ErrorText";

const meta: Meta<typeof ErrorText> = {
  title: "UI / Primitives / ErrorText",
  component: ErrorText,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'ErrorText is a Foundation primitive component that provides accessible error messaging for form validation feedback. It is a thin presentational wrapper over Text component with destructive color styling and ARIA attributes (role="alert", aria-live="polite") for screen reader announcements, usable standalone or within FormGroup/Field compositions.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "Error message content (required)",
      control: { type: "text" },
    },
    id: {
      description: "Optional ID for aria-describedby linking",
      control: { type: "text" },
    },
    asChild: {
      description: "Use Radix Slot pattern for composition",
      control: { type: "boolean" },
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorText>;

/**
 * Default ErrorText usage
 */
export const Default: Story = {
  args: {
    children: "This field is required",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic ErrorText usage with default props. ErrorText renders as a paragraph element with destructive color styling and ARIA attributes for screen reader announcements.",
      },
    },
  },
};

/**
 * ErrorText with id for aria-describedby linking
 */
export const WithId: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input id="email" aria-describedby="email-error" />
        <ErrorText id="email-error">Email is required</ErrorText>
      </FormGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ErrorText with id prop for aria-describedby linking. The Input component references the ErrorText via aria-describedby, making the error message accessible to screen readers when validation fails.",
      },
    },
  },
};

/**
 * ErrorText with asChild prop for Slot composition
 */
export const WithAsChild: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <ErrorText asChild>
        <div className="rounded-md border border-[hsl(var(--tm-destructive))]/50 bg-[hsl(var(--tm-destructive))]/10 p-2">
          Custom error container with ErrorText semantics
        </div>
      </ErrorText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'ErrorText with asChild prop using Radix Slot pattern. The Slot applies ARIA attributes (role="alert", aria-live="polite") and destructive color styling to the child element, allowing custom error container styling while maintaining accessibility.',
      },
    },
  },
};

/**
 * Standalone ErrorText usage
 */
export const Standalone: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <ErrorText>This is a standalone error message</ErrorText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Standalone ErrorText usage without form integration. ErrorText can be used independently to display error messages, with ARIA attributes ensuring screen reader announcements.",
      },
    },
  },
};

/**
 * ErrorText with FormGroup integration
 */
export const WithFormGroup: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <FormGroup>
        <Label htmlFor="username">Username</Label>
        <Input id="username" aria-describedby="username-error" />
        <ErrorText id="username-error">Username must be at least 3 characters</ErrorText>
      </FormGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ErrorText integrated with FormGroup component. FormGroup provides consistent spacing and layout for form elements, with ErrorText displaying validation feedback below the input field.",
      },
    },
  },
};

/**
 * ErrorText with Field integration
 */
export const WithField: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Field>
        <Field.Label htmlFor="password">Password</Field.Label>
        <Field.Control>
          <Input id="password" type="password" aria-describedby="password-error" />
        </Field.Control>
        <ErrorText id="password-error">Password must be at least 8 characters</ErrorText>
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ErrorText integrated with Field composition component. Field provides structured layout for form fields, with ErrorText displaying validation feedback. Note: ErrorText is standalone (not Field.Error), allowing flexible composition.",
      },
    },
  },
};

/**
 * Multiple error messages example
 */
export const MultipleErrors: Story = {
  render: () => (
    <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <FormGroup>
        <Label htmlFor="email-1">Email</Label>
        <Input id="email-1" aria-describedby="email-error-1" />
        <ErrorText id="email-error-1">Email is required</ErrorText>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password-1">Password</Label>
        <Input id="password-1" type="password" aria-describedby="password-error-1" />
        <ErrorText id="password-error-1">Password must contain at least one number</ErrorText>
      </FormGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple ErrorText components in a form layout. Each ErrorText has a unique id for aria-describedby linking, allowing multiple form fields to display independent error messages.",
      },
    },
  },
};

/**
 * ErrorText with complex content
 */
export const ComplexContent: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <ErrorText>
        <strong>Error:</strong> This field contains invalid characters. Please use only letters,
        numbers, and hyphens.
      </ErrorText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ErrorText with complex content including HTML elements. ErrorText accepts any React.ReactNode as children, allowing rich error message formatting while maintaining accessibility through ARIA attributes.",
      },
    },
  },
};

/**
 * Accessibility demonstration
 * ErrorText announces errors to screen readers via role="alert" and aria-live="polite"
 */
export const Accessibility: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <FormGroup>
        <Label htmlFor="accessibility-email">Email Address</Label>
        <Input id="accessibility-email" aria-describedby="accessibility-error" />
        <ErrorText id="accessibility-error">
          Screen readers will announce this error message automatically when it appears
        </ErrorText>
      </FormGroup>
      <div style={{ marginTop: "2rem", fontSize: "0.875rem", color: "var(--tm-fg-muted)" }}>
        <p>
          <strong>Accessibility features:</strong>
        </p>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li>role="alert" - Announces error to screen readers</li>
          <li>aria-live="polite" - Announces changes without interrupting</li>
          <li>id prop - Enables aria-describedby linking from form controls</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Accessibility demonstration showing how ErrorText announces errors to screen readers. The role="alert" attribute ensures immediate announcement, while aria-live="polite" prevents interruption of user interaction. The id prop enables aria-describedby linking from form controls.',
      },
    },
  },
};
