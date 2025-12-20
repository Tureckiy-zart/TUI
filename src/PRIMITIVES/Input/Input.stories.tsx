"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "@/PRIMITIVES/Icon";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Input component for text input fields. Supports 5 variants, 3 sizes (sm, md, lg), 4 states (default, disabled, error, success), icon slots, and full accessibility with token-driven styling using CSS variables.\n\n" +
          "**Token-Driven API:** Variant and size props use token-derived union types (`InputVariant`, `InputSize`) that are automatically synchronized with `INPUT_TOKENS`. This ensures type safety and prevents drift between prop types and token definitions.\n\n" +
          "**Responsive Support:** The `variant` and `size` props support `Responsive<T>` type, allowing responsive values:\n" +
          '- Single value: `variant="outline"` or `size="md"`\n' +
          '- Responsive object: `variant={{ base: "outline", md: "primary" }}` or `size={{ base: "sm", md: "lg" }}`\n\n' +
          "**Note:** After standardization, the visual output and DOM structure remain unchanged. Only the TypeScript types have been updated to use token-derived unions with Responsive support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
      description:
        "Input variant style. Token-derived type (`InputVariant`) synchronized with `INPUT_TOKENS.variant`. Supports `Responsive<InputVariant>` for responsive values.",
      table: {
        type: { summary: "Responsive<InputVariant>" },
        defaultValue: { summary: "outline" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description:
        "Input size. Token-derived type (`InputSize`) synchronized with `INPUT_TOKENS.size`. Supports `Responsive<InputSize>` for responsive values.",
      table: {
        type: { summary: "Responsive<InputSize>" },
        defaultValue: { summary: "md" },
      },
    },
    state: {
      control: { type: "select" },
      options: ["default", "disabled", "error", "success"],
      description: "Input state",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether input should take full width",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    type: {
      control: { type: "text" },
      description: "Input type (text, email, password, etc.)",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable input interaction",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Input variant="primary" placeholder="Primary variant" />
      <Input variant="secondary" placeholder="Secondary variant" />
      <Input variant="outline" placeholder="Outline variant" />
      <Input variant="ghost" placeholder="Ghost variant" />
      <Input variant="destructive" placeholder="Destructive variant" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Input state="default" placeholder="Default state" />
      <Input state="error" placeholder="Error state" defaultValue="Invalid value" />
      <Input state="success" placeholder="Success state" defaultValue="Valid value" />
      <Input state="disabled" placeholder="Disabled state" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available input states: default, error, success, and disabled.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Input placeholder="Search..." iconLeft={<Icon name="search" size="sm" />} />
      <Input
        placeholder="Email"
        type="email"
        iconLeft={<Icon name="info" size="sm" />}
        iconRight={<Icon name="check" size="sm" />}
      />
      <Input placeholder="Password" type="password" iconRight={<Icon name="close" size="sm" />} />
    </div>
  ),
};

export const Error: Story = {
  args: {
    state: "error",
    placeholder: "Input with error",
    defaultValue: "Invalid value",
  },
};

export const Success: Story = {
  args: {
    state: "success",
    placeholder: "Input with success",
    defaultValue: "Valid value",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
    defaultValue: "Disabled value",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Pre-filled value",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Input fullWidth placeholder="Full width input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Input with full width enabled (default behavior).",
      },
    },
  },
};

export const ResponsiveVariant: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <div className="text-sm text-muted-foreground">
        Resize the viewport to see variant change: outline (base) → primary (md breakpoint)
      </div>
      <Input variant={{ base: "outline", md: "primary" }} placeholder="Responsive variant input" />
      <Input variant="outline" placeholder="Static variant (for comparison)" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Input with responsive variant. The variant changes from 'outline' on base breakpoint to 'primary' on md breakpoint and above. " +
          "This demonstrates the `Responsive<InputVariant>` type support. Note: Currently, only the base value is applied (CVA limitation), " +
          "but the API accepts responsive objects for future implementation.",
      },
    },
  },
};

export const ResponsiveSize: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <div className="text-sm text-muted-foreground">
        Resize the viewport to see size change: sm (base) → lg (md breakpoint)
      </div>
      <Input size={{ base: "sm", md: "lg" }} placeholder="Responsive size input" />
      <Input size="md" placeholder="Static size (for comparison)" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Input with responsive size. The size changes from 'sm' on base breakpoint to 'lg' on md breakpoint and above. " +
          "This demonstrates the `Responsive<InputSize>` type support. Note: Currently, only the base value is applied (CVA limitation), " +
          "but the API accepts responsive objects for future implementation.",
      },
    },
  },
};

export const NotFullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Input fullWidth={false} placeholder="Not full width" />
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Input
        placeholder="Input with error"
        state="error"
        aria-invalid={true}
        aria-describedby="error-message"
      />
      <p id="error-message" className="text-sm text-[hsl(var(--destructive))]">
        This field is required
      </p>
      <Input placeholder="Input with success" state="success" aria-describedby="success-message" />
      <p id="success-message" className="text-sm text-[hsl(var(--semantic-success))]">
        Value is valid
      </p>
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Input variant="outline" placeholder="Outline in dark mode" />
      <Input variant="primary" placeholder="Primary in dark mode" />
      <Input variant="secondary" placeholder="Secondary in dark mode" />
    </div>
  ),
};

export const LightMode: Story = {
  parameters: {
    backgrounds: { default: "light" },
  },
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Input variant="outline" placeholder="Outline in light mode" />
      <Input variant="primary" placeholder="Primary in light mode" />
      <Input variant="secondary" placeholder="Secondary in light mode" />
    </div>
  ),
};

export const Comprehensive: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-lg">
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">All Variants with Icons</h3>
        <Input
          variant="primary"
          placeholder="Primary with search icon"
          iconLeft={<Icon name="search" size="sm" />}
        />
        <Input
          variant="secondary"
          placeholder="Secondary with check icon"
          iconRight={<Icon name="check" size="sm" />}
        />
        <Input
          variant="outline"
          placeholder="Outline with both icons"
          iconLeft={<Icon name="info" size="sm" />}
          iconRight={<Icon name="check" size="sm" />}
        />
        <Input
          variant="ghost"
          placeholder="Ghost variant"
          iconLeft={<Icon name="menu" size="sm" />}
        />
        <Input
          variant="destructive"
          placeholder="Destructive variant"
          iconLeft={<Icon name="error" size="sm" />}
        />
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">All Sizes</h3>
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">All States</h3>
        <Input state="default" placeholder="Default state" />
        <Input state="error" placeholder="Error state" defaultValue="Error value" />
        <Input state="success" placeholder="Success state" defaultValue="Success value" />
        <Input state="disabled" placeholder="Disabled state" disabled />
      </div>
    </div>
  ),
};
