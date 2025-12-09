import type { Meta, StoryObj } from "@storybook/react";

import { DataListItem, DataListLabel, DataListRoot, DataListValue } from "./index";

const meta: Meta<typeof DataListRoot> = {
  title: "Components/Data/DataList",
  component: DataListRoot,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Mobile-first data list component for displaying key-value pairs. Uses semantic HTML (dl/dt/dd) and DATA_TOKENS for spacing.",
      },
    },
  },
  argTypes: {
    labelWidth: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Label width for desktop layout",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataListRoot>;

/**
 * Basic data list
 */
export const Basic: Story = {
  render: () => (
    <DataListRoot>
      <DataListItem>
        <DataListLabel>Name</DataListLabel>
        <DataListValue>John Doe</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Email</DataListLabel>
        <DataListValue>john.doe@example.com</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Role</DataListLabel>
        <DataListValue>Administrator</DataListValue>
      </DataListItem>
    </DataListRoot>
  ),
};

/**
 * Data list with different padding sizes
 */
export const PaddingSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-semibold">Small Padding</h3>
        <DataListRoot>
          <DataListItem padding="sm">
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
          <DataListItem padding="sm">
            <DataListLabel>Email</DataListLabel>
            <DataListValue>john.doe@example.com</DataListValue>
          </DataListItem>
        </DataListRoot>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">Medium Padding (Default)</h3>
        <DataListRoot>
          <DataListItem padding="md">
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
          <DataListItem padding="md">
            <DataListLabel>Email</DataListLabel>
            <DataListValue>john.doe@example.com</DataListValue>
          </DataListItem>
        </DataListRoot>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">Large Padding</h3>
        <DataListRoot>
          <DataListItem padding="lg">
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
          <DataListItem padding="lg">
            <DataListLabel>Email</DataListLabel>
            <DataListValue>john.doe@example.com</DataListValue>
          </DataListItem>
        </DataListRoot>
      </div>
    </div>
  ),
};

/**
 * User profile data list
 */
export const UserProfile: Story = {
  render: () => (
    <DataListRoot>
      <DataListItem>
        <DataListLabel>Full Name</DataListLabel>
        <DataListValue>Jane Smith</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Username</DataListLabel>
        <DataListValue>@janesmith</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Email</DataListLabel>
        <DataListValue>jane.smith@example.com</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Role</DataListLabel>
        <DataListValue>Editor</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Member Since</DataListLabel>
        <DataListValue>January 15, 2024</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Status</DataListLabel>
        <DataListValue>
          <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400">
            Active
          </span>
        </DataListValue>
      </DataListItem>
    </DataListRoot>
  ),
};

/**
 * Product information data list
 */
export const ProductInfo: Story = {
  render: () => (
    <DataListRoot>
      <DataListItem>
        <DataListLabel>Product Name</DataListLabel>
        <DataListValue>Premium Headphones</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>SKU</DataListLabel>
        <DataListValue>PH-2024-001</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Price</DataListLabel>
        <DataListValue>$199.99</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Stock</DataListLabel>
        <DataListValue>42 units</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Category</DataListLabel>
        <DataListValue>Audio Equipment</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Description</DataListLabel>
        <DataListValue>
          High-quality wireless headphones with noise cancellation and premium sound quality.
        </DataListValue>
      </DataListItem>
    </DataListRoot>
  ),
};

/**
 * Responsive behavior demonstration
 * On mobile: labels above values (vertical)
 * On desktop: labels on left, values on right (horizontal)
 */
export const Responsive: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Resize the viewport to see the responsive behavior. On mobile, labels appear above values.
        On desktop (md breakpoint and above), labels appear on the left with fixed width.
      </p>
      <DataListRoot>
        <DataListItem>
          <DataListLabel>Mobile Layout</DataListLabel>
          <DataListValue>Labels stack above values</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Desktop Layout</DataListLabel>
          <DataListValue>Labels on left, values on right</DataListValue>
        </DataListItem>
      </DataListRoot>
    </div>
  ),
};
