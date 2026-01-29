import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Composition / Layout / Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Card is a token-driven card container component with Header, Body, and Footer subcomponents. Uses CARD_TOKENS for size-based styling. All styling uses tokens exclusively (no raw CSS values).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Card size - maps to CARD_TOKENS.size",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
      },
    },
    radius: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
      description: "Border radius (token-based, overrides size default)",
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
      description: "Shadow (token-based, overrides size default)",
    },
    p: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
      description: "Padding (token-based, overrides size default)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * Default Card usage with default props.
 */
export const Default: Story = {
  args: {
    size: "md",
    children: "Card content",
  },
  parameters: {
    docs: {
      description: {
        story: "Default Card with medium size (default)",
      },
    },
  },
};

/**
 * Matrix story - demonstrates all size combinations
 */
export const Matrix: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Size: sm</h3>
        <Card size="sm">
          <Card.Header>
            <h4 className="text-lg font-semibold">Card Header</h4>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">Subtitle or description</p>
          </Card.Header>
          <Card.Body>
            <p>Card body content with small size padding.</p>
          </Card.Body>
          <Card.Footer>
            <button className="text-sm">Action</button>
          </Card.Footer>
        </Card>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Size: md (default)</h3>
        <Card size="md">
          <Card.Header>
            <h4 className="text-lg font-semibold">Card Header</h4>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">Subtitle or description</p>
          </Card.Header>
          <Card.Body>
            <p>Card body content with medium size padding (default).</p>
          </Card.Body>
          <Card.Footer>
            <button className="text-sm">Action</button>
          </Card.Footer>
        </Card>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Size: lg</h3>
        <Card size="lg">
          <Card.Header>
            <h4 className="text-lg font-semibold">Card Header</h4>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">Subtitle or description</p>
          </Card.Header>
          <Card.Body>
            <p>Card body content with large size padding.</p>
          </Card.Body>
          <Card.Footer>
            <button className="text-sm">Action</button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card with all size variants (sm, md, lg) demonstrating size-based token defaults",
      },
    },
  },
};

/**
 * SizesGallery story - visual comparison of all sizes side-by-side
 */
export const SizesGallery: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
      <div>
        <h3 className="mb-sm text-sm font-semibold">Small (sm)</h3>
        <Card size="sm">
          <Card.Header>
            <h4 className="text-base font-semibold">Header</h4>
          </Card.Header>
          <Card.Body>
            <p className="text-sm">Body content</p>
          </Card.Body>
          <Card.Footer>
            <button className="text-xs">Action</button>
          </Card.Footer>
        </Card>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-semibold">Medium (md)</h3>
        <Card size="md">
          <Card.Header>
            <h4 className="text-base font-semibold">Header</h4>
          </Card.Header>
          <Card.Body>
            <p className="text-sm">Body content</p>
          </Card.Body>
          <Card.Footer>
            <button className="text-xs">Action</button>
          </Card.Footer>
        </Card>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-semibold">Large (lg)</h3>
        <Card size="lg">
          <Card.Header>
            <h4 className="text-base font-semibold">Header</h4>
          </Card.Header>
          <Card.Body>
            <p className="text-sm">Body content</p>
          </Card.Body>
          <Card.Footer>
            <button className="text-xs">Action</button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Visual comparison of all Card sizes side-by-side",
      },
    },
  },
};

/**
 * WithSubcomponents story - demonstrates Card with Header, Body, Footer
 */
export const WithSubcomponents: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Complete Card</h3>
        <Card>
          <Card.Header>
            <h4 className="text-lg font-semibold">Card Title</h4>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">Card subtitle or description</p>
          </Card.Header>
          <Card.Body>
            <p>Card body content goes here. This is the main content area of the card.</p>
          </Card.Body>
          <Card.Footer>
            <button className="text-sm">Cancel</button>
            <button className="text-sm">Confirm</button>
          </Card.Footer>
        </Card>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Card with Header Only</h3>
        <Card>
          <Card.Header>
            <h4 className="text-lg font-semibold">Header Only</h4>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">No body or footer</p>
          </Card.Header>
        </Card>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Card with Body Only</h3>
        <Card>
          <Card.Body>
            <p>Body content without header or footer</p>
          </Card.Body>
        </Card>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Card with Footer Only</h3>
        <Card>
          <Card.Footer>
            <button className="text-sm">Action</button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card with Header, Body, and Footer subcomponents in various combinations",
      },
    },
  },
};

/**
 * RealisticUsage story - demonstrates realistic card usage patterns
 */
export const RealisticUsage: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Product Card</h3>
        <Card size="md">
          <Card.Header>
            <h4 className="text-lg font-semibold">Product Name</h4>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">Product category</p>
          </Card.Header>
          <Card.Body>
            <p className="text-sm">Product description and details go here.</p>
            <p className="mt-sm text-lg font-bold">$99.99</p>
          </Card.Body>
          <Card.Footer>
            <button className="text-sm">Add to Cart</button>
            <button className="text-sm">View Details</button>
          </Card.Footer>
        </Card>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Settings Card</h3>
        <Card size="lg">
          <Card.Header>
            <h4 className="text-lg font-semibold">Account Settings</h4>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              Manage your account preferences
            </p>
          </Card.Header>
          <Card.Body>
            <div className="space-y-sm">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input type="email" className="mt-xs w-full rounded border p-xs" />
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <input type="password" className="mt-xs w-full rounded border p-xs" />
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <button className="text-sm">Cancel</button>
            <button className="text-sm">Save Changes</button>
          </Card.Footer>
        </Card>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Notification Card</h3>
        <Card size="sm">
          <Card.Header>
            <h4 className="text-base font-semibold">Notification</h4>
          </Card.Header>
          <Card.Body>
            <p className="text-sm">You have a new message from John Doe.</p>
          </Card.Body>
          <Card.Footer>
            <button className="text-xs">Dismiss</button>
            <button className="text-xs">View</button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Realistic usage examples of Card component in different contexts",
      },
    },
  },
};

/**
 * WithCustomProps story - demonstrates prop overrides
 */
export const WithCustomProps: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Custom Radius</h3>
        <Card size="md" radius="full">
          <Card.Body>
            <p>Card with full border radius (pill shape)</p>
          </Card.Body>
        </Card>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Custom Shadow</h3>
        <Card size="md" shadow="lg">
          <Card.Body>
            <p>Card with large shadow override</p>
          </Card.Body>
        </Card>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Custom Padding</h3>
        <Card size="md" p="xl">
          <Card.Body>
            <p>Card with extra large padding override</p>
          </Card.Body>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card with custom prop overrides (radius, shadow, padding)",
      },
    },
  },
};
