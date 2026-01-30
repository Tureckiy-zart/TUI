import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stack } from "@/COMPOSITION/layout";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

import { DataListItem, DataListLabel, DataListRoot, DataListValue } from "./index";

const meta: Meta<typeof DataListRoot> = {
  title: "Patterns / Lists / DataList",
  component: DataListRoot,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Mobile-first data list component for displaying key-value pairs. Uses semantic HTML (dl/dt/dd) and DATA_LIST_TOKENS for spacing.",
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
    <Stack spacing="xl">
      <Stack spacing="sm">
        <Heading as="h3" level={3}>
          Small Padding
        </Heading>
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
      </Stack>

      <Stack spacing="sm">
        <Heading as="h3" level={3}>
          Medium Padding (Default)
        </Heading>
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
      </Stack>

      <Stack spacing="sm">
        <Heading as="h3" level={3}>
          Large Padding
        </Heading>
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
      </Stack>
    </Stack>
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
          <Text size="xs" typographyRole="meta" color="muted">
            Active
          </Text>
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
/**
 * Responsive behavior demonstration
 * On mobile: labels above values (vertical)
 * On desktop: labels on left, values on right (horizontal)
 */
export const Responsive: Story = {
  render: () => (
    <Stack spacing="md">
      <Text size="sm" typographyRole="meta" color="muted">
        Resize the viewport to see the responsive behavior. On mobile, labels appear above values.
        On desktop (md breakpoint and above), labels appear on the left with fixed width.
      </Text>
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
    </Stack>
  ),
};

/**
 * SizesGallery - Demonstrates all padding sizes
 * Required per SIZE_MAPPING_SPEC.md for components with size props
 */
export const SizesGallery: Story = {
  render: () => (
    <Stack spacing="xl">
      <Stack spacing="sm">
        <Heading as="h3" level={3}>
          Small Padding
        </Heading>
        <DataListRoot>
          <DataListItem padding="sm">
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
          <DataListItem padding="sm">
            <DataListLabel>Email</DataListLabel>
            <DataListValue>john.doe@example.com</DataListValue>
          </DataListItem>
          <DataListItem padding="sm">
            <DataListLabel>Role</DataListLabel>
            <DataListValue>Administrator</DataListValue>
          </DataListItem>
        </DataListRoot>
      </Stack>

      <Stack spacing="sm">
        <Heading as="h3" level={3}>
          Medium Padding (Default)
        </Heading>
        <DataListRoot>
          <DataListItem padding="md">
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
          <DataListItem padding="md">
            <DataListLabel>Email</DataListLabel>
            <DataListValue>john.doe@example.com</DataListValue>
          </DataListItem>
          <DataListItem padding="md">
            <DataListLabel>Role</DataListLabel>
            <DataListValue>Administrator</DataListValue>
          </DataListItem>
        </DataListRoot>
      </Stack>

      <Stack spacing="sm">
        <Heading as="h3" level={3}>
          Large Padding
        </Heading>
        <DataListRoot>
          <DataListItem padding="lg">
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
          <DataListItem padding="lg">
            <DataListLabel>Email</DataListLabel>
            <DataListValue>john.doe@example.com</DataListValue>
          </DataListItem>
          <DataListItem padding="lg">
            <DataListLabel>Role</DataListLabel>
            <DataListValue>Administrator</DataListValue>
          </DataListItem>
        </DataListRoot>
      </Stack>
    </Stack>
  ),
};
