import type { Meta, StoryObj } from '@storybook/react';
import { FilterBar } from './FilterBar';

const meta: Meta<typeof FilterBar> = {
  title: 'Filters/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCategories = [
  { value: 'music', label: 'Music', count: 45 },
  { value: 'dance', label: 'Dance', count: 23 },
  { value: 'jazz', label: 'Jazz', count: 12 },
  { value: 'rock', label: 'Rock', count: 18 },
  { value: 'electronic', label: 'Electronic', count: 31 },
];

export const Default: Story = {
  args: {
    categories: mockCategories,
    showSearch: true,
    showCategory: true,
    showDateRange: true,
    showPriceRange: true,
    showSorting: true,
  },
};

export const SearchOnly: Story = {
  args: {
    showSearch: true,
    showCategory: false,
    showDateRange: false,
    showPriceRange: false,
    showSorting: false,
  },
};

export const WithoutPriceRange: Story = {
  args: {
    categories: mockCategories,
    showSearch: true,
    showCategory: true,
    showDateRange: true,
    showPriceRange: false,
    showSorting: true,
  },
};

export const Compact: Story = {
  render: () => (
    <div className="max-w-md">
      <FilterBar
        categories={mockCategories}
        showSearch={true}
        showCategory={true}
        showDateRange={false}
        showPriceRange={false}
        showSorting={true}
      />
    </div>
  ),
};
