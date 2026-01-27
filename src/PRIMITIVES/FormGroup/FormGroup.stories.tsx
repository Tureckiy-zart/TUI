"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box } from "@/COMPOSITION/layout/Box";
import { Input } from "@/PRIMITIVES/Input";
import { Label } from "@/PRIMITIVES/Label";
import { Text } from "@/PRIMITIVES/Text";

import { FormGroup } from "./FormGroup";

/**
 * FormGroup Storybook
 *
 * Stories demonstrate semantic form field grouping using native fieldset/legend.
 * FormGroup is layout-transparent for children and only manages vertical flow for its own semantic elements.
 */

const meta: Meta<typeof FormGroup> = {
  title: "UI / Primitives / FormGroup",
  component: FormGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "FormGroup is a semantic wrapper for grouping related form fields using native HTML fieldset/legend. " +
          "It provides optional description and error slots with automatic ID generation for accessibility. " +
          "FormGroup is layout-transparent for children - it does not manage layout inside children. " +
          "It only guarantees vertical flow for its own semantic elements (description, error).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    legend: {
      control: { type: "text" },
      description: "Optional legend text or React node for the fieldset",
      table: {
        type: { summary: "string | React.ReactNode" },
      },
    },
    description: {
      control: { type: "text" },
      description: "Optional description text or React node (rendered with automatic ID)",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    error: {
      control: { type: "text" },
      description: "Optional error message text or React node (rendered with automatic ID)",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the form group is disabled (maps to fieldset disabled)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: { type: "boolean" },
      description: "Whether the form group is required (maps to aria-required)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

/**
 * Default FormGroup with legend and form fields
 */
export const Default: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <FormGroup legend="Personal Information">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <Label htmlFor="first-name">First Name</Label>
            <Box mt="xs">
              <Input id="first-name" placeholder="Enter first name" />
            </Box>
          </div>
          <div>
            <Label htmlFor="last-name">Last Name</Label>
            <Box mt="xs">
              <Input id="last-name" placeholder="Enter last name" />
            </Box>
          </div>
        </div>
      </FormGroup>
    </div>
  ),
};

/**
 * FormGroup with description
 */
export const WithDescription: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <FormGroup
        legend="Contact Information"
        description={
          <Text size="sm" typographyRole="meta" color="muted">
            We'll never share your contact information with third parties.
          </Text>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Box mt="xs">
              <Input id="email" type="email" placeholder="you@example.com" />
            </Box>
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Box mt="xs">
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
            </Box>
          </div>
        </div>
      </FormGroup>
    </div>
  ),
};

/**
 * FormGroup with error message
 */
export const WithError: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <FormGroup
        legend="Account Settings"
        error={
          <Box className="text-destructive">
            <Text size="sm">Please correct the errors above before continuing.</Text>
          </Box>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <Label htmlFor="username">Username</Label>
            <Box mt="xs">
              <Input id="username" placeholder="Enter username" invalid />
            </Box>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Box mt="xs">
              <Input id="password" type="password" placeholder="Enter password" invalid />
            </Box>
          </div>
        </div>
      </FormGroup>
    </div>
  ),
};

/**
 * FormGroup with both description and error
 */
export const WithDescriptionAndError: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <FormGroup
        legend="Payment Information"
        description={
          <Text size="sm" typographyRole="meta" color="muted">
            All fields are required to complete your purchase.
          </Text>
        }
        error={
          <Box className="text-destructive">
            <Text size="sm">Please verify your payment information.</Text>
          </Box>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <Label htmlFor="card-number">Card Number</Label>
            <Box mt="xs">
              <Input id="card-number" placeholder="1234 5678 9012 3456" invalid />
            </Box>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <Label htmlFor="expiry">Expiry</Label>
              <Box mt="xs">
                <Input id="expiry" placeholder="MM/YY" invalid />
              </Box>
            </div>
            <div style={{ flex: 1 }}>
              <Label htmlFor="cvv">CVV</Label>
              <Box mt="xs">
                <Input id="cvv" placeholder="123" invalid />
              </Box>
            </div>
          </div>
        </div>
      </FormGroup>
    </div>
  ),
};

/**
 * FormGroup in disabled state
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <FormGroup legend="Billing Address" disabled>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <Label htmlFor="disabled-street">Street Address</Label>
            <Box mt="xs">
              <Input id="disabled-street" placeholder="123 Main St" disabled />
            </Box>
          </div>
          <div>
            <Label htmlFor="disabled-city">City</Label>
            <Box mt="xs">
              <Input id="disabled-city" placeholder="New York" disabled />
            </Box>
          </div>
        </div>
      </FormGroup>
    </div>
  ),
};

/**
 * FormGroup with required flag
 */
export const Required: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <FormGroup legend="Required Information" required>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <Label htmlFor="required-name" required>
              Full Name
            </Label>
            <Box mt="xs">
              <Input id="required-name" placeholder="Enter your full name" />
            </Box>
          </div>
          <div>
            <Label htmlFor="required-email" required>
              Email Address
            </Label>
            <Box mt="xs">
              <Input id="required-email" type="email" placeholder="you@example.com" />
            </Box>
          </div>
        </div>
      </FormGroup>
    </div>
  ),
};

/**
 * Accessibility demonstration
 * Shows aria-describedby relationships and screen reader announcements
 */
export const Accessibility: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <FormGroup
        legend="Accessibility Example"
        description={
          <Text size="sm" typographyRole="meta" color="muted" id="description-example">
            This description is automatically linked via aria-describedby.
          </Text>
        }
        error={
          <Box className="text-destructive" id="error-example">
            <Text size="sm">This error message is automatically linked via aria-errormessage.</Text>
          </Box>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <Label htmlFor="accessible-input">Input with Description</Label>
            <Box mt="xs">
              <Input
                id="accessible-input"
                placeholder="Focus to hear description"
                aria-describedby="description-example"
              />
            </Box>
          </div>
          <div>
            <Label htmlFor="accessible-error-input">Input with Error</Label>
            <Box mt="xs">
              <Input
                id="accessible-error-input"
                placeholder="Focus to hear error"
                invalid
                aria-invalid="true"
                aria-errormessage="error-example"
              />
            </Box>
          </div>
        </div>
      </FormGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates accessibility features: legend announced by screen readers, " +
          "description and error automatically receive IDs for aria-describedby/aria-errormessage linking.",
      },
    },
  },
};

/**
 * FormGroup without legend
 * Shows that legend is optional
 */
export const WithoutLegend: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <FormGroup>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <Label htmlFor="no-legend-1">Field 1</Label>
            <Box mt="xs">
              <Input id="no-legend-1" placeholder="Enter value" />
            </Box>
          </div>
          <div>
            <Label htmlFor="no-legend-2">Field 2</Label>
            <Box mt="xs">
              <Input id="no-legend-2" placeholder="Enter value" />
            </Box>
          </div>
        </div>
      </FormGroup>
    </div>
  ),
};

/**
 * Layout transparency demonstration
 * Shows that FormGroup does not manage layout inside children
 */
export const LayoutTransparency: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <FormGroup
        legend="Layout Transparency Example"
        description={
          <Text size="sm" typographyRole="meta" color="muted">
            FormGroup does not control layout inside children
          </Text>
        }
      >
        {/* User controls layout - FormGroup is transparent */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <Label htmlFor="grid-1">Field 1</Label>
            <Box mt="xs">
              <Input id="grid-1" placeholder="Grid column 1" />
            </Box>
          </div>
          <div>
            <Label htmlFor="grid-2">Field 2</Label>
            <Box mt="xs">
              <Input id="grid-2" placeholder="Grid column 2" />
            </Box>
          </div>
        </div>
      </FormGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates layout transparency: FormGroup does not manage layout inside children. " +
          "User is responsible for layout. FormGroup only manages vertical flow for its own semantic elements (description, error).",
      },
    },
  },
};
