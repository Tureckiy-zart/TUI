import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Events", href: "/events" },
      { label: "Classical", href: "/events/classical" },
      { label: "Current Page" }
    ],
  },
};

export const Short: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Current Page" }
    ],
  },
};

export const Long: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Category", href: "/category" },
      { label: "Subcategory", href: "/category/subcategory" },
      { label: "Item", href: "/category/subcategory/item" },
      { label: "Details", href: "/category/subcategory/item/details" },
      { label: "Current Page" }
    ],
  },
};
