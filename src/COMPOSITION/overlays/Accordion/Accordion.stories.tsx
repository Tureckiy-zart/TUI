"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion.Root> = {
  title: "Composition / Accordion",
  component: Accordion.Root,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Vertically stacked set of interactive headings that reveal/hide associated content panels. Provides accessible disclosure pattern with keyboard navigation and ARIA support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description:
        "Accordion type: single (only one item open) or multiple (multiple items can be open)",
      table: {
        type: { summary: '"single" | "multiple"' },
        defaultValue: { summary: '"single"' },
      },
    },
    defaultValue: {
      control: "text",
      description: "Default value for uncontrolled accordion (single: string, multiple: string[])",
      table: {
        type: { summary: "string | string[]" },
      },
    },
    value: {
      control: "text",
      description: "Controlled value (single: string, multiple: string[])",
      table: {
        type: { summary: "string | string[]" },
      },
    },
    collapsible: {
      control: "boolean",
      description: "Allow closing all items (only for single type)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable all accordion items",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion.Root>;

/**
 * Default Accordion usage with default tokens (md size, primary variant)
 * Reference: VARIANTS_SIZE_CANON.md
 */
export const Default: Story = {
  render: () => (
    <Accordion.Root type="single" collapsible defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger variant="primary" size="md">
          What is Tenerife Music?
        </Accordion.Trigger>
        <Accordion.Content>
          Tenerife Music is a music platform that connects artists and fans through live events and
          digital experiences.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger variant="primary" size="md">
          How do I purchase tickets?
        </Accordion.Trigger>
        <Accordion.Content>
          You can purchase tickets directly through our website or mobile app. Select your preferred
          event, choose your seats, and complete the checkout process.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger variant="primary" size="md">
          Can I get a refund?
        </Accordion.Trigger>
        <Accordion.Content>
          Refunds are available up to 48 hours before the event. Please contact our support team for
          assistance with refund requests.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic Accordion usage with default tokens (md size, primary variant).",
      },
    },
  },
};

/**
 * All available size variants (sm, md, lg)
 * Reference: VARIANTS_SIZE_CANON.md
 */
export const SizesGallery: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-sm text-sm font-medium">Small (sm)</h3>
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="sm">
              Small Accordion Item
            </Accordion.Trigger>
            <Accordion.Content size="sm">
              Content for small accordion item. This demonstrates the compact size variant.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Medium (md) - Default</h3>
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Medium Accordion Item
            </Accordion.Trigger>
            <Accordion.Content size="md">
              Content for medium accordion item. This is the default size variant.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Large (lg)</h3>
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="lg">
              Large Accordion Item
            </Accordion.Trigger>
            <Accordion.Content size="lg">
              Content for large accordion item. This demonstrates the spacious size variant.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Accordion with different size tokens (sm, md, lg).",
      },
    },
  },
};

/**
 * Variants - Sizes Matrix (4 variants - 3 sizes = 12 combinations)
 * Reference: VARIANTS_SIZE_CANON.md
 */
export const Matrix: Story = {
  render: () => {
    const variants: Array<"primary" | "secondary" | "accent" | "neutral"> = [
      "primary",
      "secondary",
      "accent",
      "neutral",
    ];
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    return (
      <div className="flex flex-col gap-xl">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col gap-md">
            <h3 className="text-base font-semibold capitalize">{variant} Variant</h3>
            <div className="flex flex-col gap-md">
              {sizes.map((size) => (
                <Accordion.Root
                  key={`${variant}-${size}`}
                  type="single"
                  collapsible
                  defaultValue="item-1"
                >
                  <Accordion.Item value="item-1">
                    <Accordion.Trigger variant={variant} size={size}>
                      {variant} / {size}
                    </Accordion.Trigger>
                    <Accordion.Content variant={variant} size={size}>
                      Content for {variant} variant with {size} size.
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete variants - sizes matrix demonstrating all 12 combinations (4 variants - 3 sizes).",
      },
    },
  },
};

/**
 * Component states (disabled, multiple items open/closed)
 * Reference: VARIANTS_SIZE_CANON.md
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-sm text-sm font-medium">Disabled Item</h3>
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Enabled Item
            </Accordion.Trigger>
            <Accordion.Content>This item is enabled and can be toggled.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2" disabled>
            <Accordion.Trigger variant="primary" size="md">
              Disabled Item
            </Accordion.Trigger>
            <Accordion.Content>This item is disabled and cannot be toggled.</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Multiple Items Open (Multiple Mode)</h3>
        <Accordion.Root type="multiple" defaultValue={["item-1", "item-2"]}>
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1 (Open)
            </Accordion.Trigger>
            <Accordion.Content>This item is open by default in multiple mode.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger variant="primary" size="md">
              Item 2 (Open)
            </Accordion.Trigger>
            <Accordion.Content>
              This item is also open by default in multiple mode.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Trigger variant="primary" size="md">
              Item 3 (Closed)
            </Accordion.Trigger>
            <Accordion.Content>This item is closed by default.</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">All Items Disabled</h3>
        <Accordion.Root type="single" disabled>
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Disabled Accordion
            </Accordion.Trigger>
            <Accordion.Content>All items in this accordion are disabled.</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Accordion states: disabled items, multiple items open/closed, all items disabled.",
      },
    },
  },
};

/**
 * Long content validation (overflow handling)
 * Reference: SIZE_MAPPING_SPEC.md
 */
export const LongContent: Story = {
  render: () => (
    <Accordion.Root type="single" collapsible defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger variant="primary" size="md">
          Long Content Example
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-md">
            <p>
              This accordion item contains a large amount of content to demonstrate how the
              component handles overflow and scrolling. The content should be properly contained
              within the accordion panel.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "Accordion with long content to demonstrate overflow handling.",
      },
    },
  },
};

/**
 * FAQ Use Case
 * Demonstrates real-world FAQ section usage
 */
export const FAQ: Story = {
  render: () => (
    <div className="max-w-2xl">
      <h2 className="mb-lg text-2xl font-bold">Frequently Asked Questions</h2>
      <Accordion.Root type="single" collapsible>
        <Accordion.Item value="faq-1">
          <Accordion.Trigger variant="primary" size="md">
            How do I create an account?
          </Accordion.Trigger>
          <Accordion.Content>
            To create an account, click the "Sign Up" button in the top right corner, fill in your
            email address and password, and verify your email through the confirmation link we send
            you.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="faq-2">
          <Accordion.Trigger variant="primary" size="md">
            What payment methods do you accept?
          </Accordion.Trigger>
          <Accordion.Content>
            We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple
            Pay. All payments are processed securely through our encrypted payment gateway.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="faq-3">
          <Accordion.Trigger variant="primary" size="md">
            Can I cancel my subscription?
          </Accordion.Trigger>
          <Accordion.Content>
            Yes, you can cancel your subscription at any time from your account settings. Your
            access will continue until the end of your current billing period.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="faq-4">
          <Accordion.Trigger variant="primary" size="md">
            How do I contact support?
          </Accordion.Trigger>
          <Accordion.Content>
            You can contact our support team by emailing support@example.com or using the live chat
            feature in the bottom right corner of the website. We typically respond within 24 hours.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "FAQ section use case demonstrating accordion for frequently asked questions.",
      },
    },
  },
};

/**
 * Settings Panel Use Case
 * Demonstrates accordion for settings organization
 */
export const SettingsPanel: Story = {
  render: () => (
    <div className="max-w-2xl">
      <h2 className="mb-lg text-2xl font-bold">Account Settings</h2>
      <Accordion.Root type="multiple" defaultValue={["profile"]}>
        <Accordion.Item value="profile">
          <Accordion.Trigger variant="secondary" size="md">
            Profile Information
          </Accordion.Trigger>
          <Accordion.Content variant="secondary">
            <div className="space-y-md">
              <div>
                <label className="mb-xs block text-sm font-medium">Display Name</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-[hsl(var(--tm-border-default))] px-md py-sm"
                  defaultValue="John Doe"
                />
              </div>
              <div>
                <label className="mb-xs block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full rounded-md border border-[hsl(var(--tm-border-default))] px-md py-sm"
                  defaultValue="john@example.com"
                />
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="privacy">
          <Accordion.Trigger variant="secondary" size="md">
            Privacy Settings
          </Accordion.Trigger>
          <Accordion.Content variant="secondary">
            <div className="space-y-md">
              <label className="flex items-center gap-sm">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">Make my profile public</span>
              </label>
              <label className="flex items-center gap-sm">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Allow search engines to index my profile</span>
              </label>
            </div>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="notifications">
          <Accordion.Trigger variant="secondary" size="md">
            Notification Preferences
          </Accordion.Trigger>
          <Accordion.Content variant="secondary">
            <div className="space-y-md">
              <label className="flex items-center gap-sm">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">Email notifications</span>
              </label>
              <label className="flex items-center gap-sm">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">Push notifications</span>
              </label>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Settings panel use case demonstrating accordion for organizing settings sections.",
      },
    },
  },
};
