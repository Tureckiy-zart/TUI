"use client";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/PRIMITIVES/Button";
import { Input } from "@/PRIMITIVES/Input";

import { Field } from "./Field";

/**
 * Field Storybook
 *
 * @status COMPLETE
 * @date 2025-12-25
 * @task TUNG_FIELD_STEP_10_STORYBOOK
 *
 * Stories Structure:
 * - Default: Basic field with label and input
 * - WithDescription: Field with helper text
 * - WithError: Field with error message
 * - WithDescriptionAndError: Field with both helper text and error
 * - Required: Field with required label
 * - States: Field in different states (default, with helper, with error)
 * - LoginForm: Realistic login form example
 * - MultiLineField: Field with textarea
 * - FieldInFormContext: Multiple fields in form layout
 *
 * Note: No Matrix/SizesGallery stories (Field has no size/variant props, structural component)
 */

const meta: Meta<typeof Field> = {
  title: "UI / Primitives / Field",
  component: Field,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form field composition primitive providing vertical layout structure for form elements. Composes Label, Control wrapper, Description, and Error into a Stack layout with consistent spacing.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Field>;

/**
 * Default field with label and input
 */
export const Default: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Field>
        <Field.Label htmlFor="username">Username</Field.Label>
        <Field.Control>
          <Input id="username" placeholder="Enter username" />
        </Field.Control>
      </Field>
    </div>
  ),
};

/**
 * Field with helper text
 */
export const WithDescription: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Field>
        <Field.Label htmlFor="email">Email Address</Field.Label>
        <Field.Control>
          <Input id="email" type="email" placeholder="you@example.com" />
        </Field.Control>
        <Field.Description>We'll never share your email with anyone else.</Field.Description>
      </Field>
    </div>
  ),
};

/**
 * Field with error message
 */
export const WithError: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Field>
        <Field.Label htmlFor="password">Password</Field.Label>
        <Field.Control>
          <Input id="password" type="password" />
        </Field.Control>
        <Field.Error>Password is required</Field.Error>
      </Field>
    </div>
  ),
};

/**
 * Field with both helper text and error message
 */
export const WithDescriptionAndError: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Field>
        <Field.Label htmlFor="new-password">New Password</Field.Label>
        <Field.Control>
          <Input id="new-password" type="password" />
        </Field.Control>
        <Field.Description>Must be at least 8 characters long.</Field.Description>
        <Field.Error>Password must contain at least one number</Field.Error>
      </Field>
    </div>
  ),
};

/**
 * Field with required label
 */
export const Required: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Field>
        <Field.Label htmlFor="required-email" required>
          Email Address
        </Field.Label>
        <Field.Control>
          <Input id="required-email" type="email" placeholder="you@example.com" />
        </Field.Control>
        <Field.Description>This field is required.</Field.Description>
      </Field>
    </div>
  ),
};

/**
 * Field in different states
 */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "320px" }}>
      {/* Default state */}
      <div>
        <h3 style={{ marginBottom: "1rem", fontSize: "0.875rem", fontWeight: 600 }}>
          Default State
        </h3>
        <Field>
          <Field.Label htmlFor="state-default">Username</Field.Label>
          <Field.Control>
            <Input id="state-default" placeholder="Enter username" />
          </Field.Control>
        </Field>
      </div>

      {/* With helper text */}
      <div>
        <h3 style={{ marginBottom: "1rem", fontSize: "0.875rem", fontWeight: 600 }}>
          With Helper Text
        </h3>
        <Field>
          <Field.Label htmlFor="state-helper">Email</Field.Label>
          <Field.Control>
            <Input id="state-helper" type="email" placeholder="you@example.com" />
          </Field.Control>
          <Field.Description>We'll send you a confirmation email.</Field.Description>
        </Field>
      </div>

      {/* With error */}
      <div>
        <h3 style={{ marginBottom: "1rem", fontSize: "0.875rem", fontWeight: 600 }}>With Error</h3>
        <Field>
          <Field.Label htmlFor="state-error">Password</Field.Label>
          <Field.Control>
            <Input id="state-error" type="password" />
          </Field.Control>
          <Field.Error>Password is required</Field.Error>
        </Field>
      </div>

      {/* Required field */}
      <div>
        <h3 style={{ marginBottom: "1rem", fontSize: "0.875rem", fontWeight: 600 }}>
          Required Field
        </h3>
        <Field>
          <Field.Label htmlFor="state-required" required>
            Full Name
          </Field.Label>
          <Field.Control>
            <Input id="state-required" placeholder="John Doe" />
          </Field.Control>
          <Field.Description>This field is required.</Field.Description>
        </Field>
      </div>
    </div>
  ),
};

/**
 * Realistic login form example
 */
export const LoginForm: Story = {
  render: () => (
    <div
      style={{
        width: "360px",
        padding: "2rem",
        border: "1px solid hsl(var(--tm-border-default))",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: 600 }}>Sign In</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Field>
          <Field.Label htmlFor="login-email" required>
            Email Address
          </Field.Label>
          <Field.Control>
            <Input id="login-email" type="email" placeholder="you@example.com" />
          </Field.Control>
        </Field>

        <Field>
          <Field.Label htmlFor="login-password" required>
            Password
          </Field.Label>
          <Field.Control>
            <Input id="login-password" type="password" placeholder="********" />
          </Field.Control>
          <Field.Description>
            <a href="#" style={{ color: "#3b82f6", textDecoration: "none" }}>
              Forgot your password?
            </a>
          </Field.Description>
        </Field>

        <div style={{ marginTop: "0.5rem" }}>
          <Button>Sign In</Button>
        </div>
      </div>
    </div>
  ),
};

/**
 * Field with textarea (multi-line input)
 */
export const MultiLineField: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Field>
        <Field.Label htmlFor="bio">Bio</Field.Label>
        <Field.Control>
          <textarea
            id="bio"
            rows={4}
            placeholder="Tell us about yourself..."
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid hsl(var(--tm-border-default))",
              fontSize: "0.875rem",
              resize: "vertical",
            }}
          />
        </Field.Control>
        <Field.Description>
          Brief description for your profile. Max 160 characters.
        </Field.Description>
      </Field>
    </div>
  ),
};

/**
 * Multiple fields in form layout
 */
export const FieldInFormContext: Story = {
  render: () => (
    <div
      style={{
        width: "480px",
        padding: "2rem",
        border: "1px solid hsl(var(--tm-border-default))",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: 600 }}>
        Create Account
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Field>
          <Field.Label htmlFor="signup-name" required>
            Full Name
          </Field.Label>
          <Field.Control>
            <Input id="signup-name" placeholder="John Doe" />
          </Field.Control>
        </Field>

        <Field>
          <Field.Label htmlFor="signup-email" required>
            Email Address
          </Field.Label>
          <Field.Control>
            <Input id="signup-email" type="email" placeholder="you@example.com" />
          </Field.Control>
          <Field.Description>We'll use this email for account notifications.</Field.Description>
        </Field>

        <Field>
          <Field.Label htmlFor="signup-password" required>
            Password
          </Field.Label>
          <Field.Control>
            <Input id="signup-password" type="password" placeholder="********" />
          </Field.Control>
          <Field.Description>Must be at least 8 characters long.</Field.Description>
        </Field>

        <Field>
          <Field.Label htmlFor="signup-confirm" required>
            Confirm Password
          </Field.Label>
          <Field.Control>
            <Input id="signup-confirm" type="password" placeholder="********" />
          </Field.Control>
        </Field>

        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
          <span style={{ flex: 1 }}>
            <Button variant="outline">Cancel</Button>
          </span>
          <span style={{ flex: 1 }}>
            <Button>Create Account</Button>
          </span>
        </div>
      </div>
    </div>
  ),
};

/**
 * Field with validation error example
 */
export const ValidationError: Story = {
  render: () => (
    <div style={{ width: "360px" }}>
      <Field>
        <Field.Label htmlFor="validation-email" required>
          Email Address
        </Field.Label>
        <Field.Control>
          <Input
            id="validation-email"
            type="email"
            defaultValue="invalid-email"
            aria-invalid="true"
            aria-describedby="email-error"
          />
        </Field.Control>
        <Field.Error id="email-error">Please enter a valid email address</Field.Error>
      </Field>
    </div>
  ),
};

/**
 * Field with custom spacing via className
 */
export const CustomSpacing: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Field className="gap-4">
        <Field.Label htmlFor="custom-spacing">Custom Spacing</Field.Label>
        <Field.Control>
          <Input id="custom-spacing" placeholder="Field with larger spacing" />
        </Field.Control>
        <Field.Description>This field uses custom gap spacing via className.</Field.Description>
      </Field>
    </div>
  ),
};
