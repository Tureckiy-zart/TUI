import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/button";

import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "./index";

const meta: Meta<typeof EmptyState> = {
  title: "Components/Data/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Token-driven empty state component for displaying empty or no-data states. Uses DATA_TOKENS for all spacing and sizing.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

/**
 * Basic empty state with icon, title, and description
 */
export const Basic: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateIcon>📭</EmptyStateIcon>
      <EmptyStateTitle>No items found</EmptyStateTitle>
      <EmptyStateDescription>There are no items to display at this time.</EmptyStateDescription>
    </EmptyState>
  ),
};

/**
 * Empty state with action button
 */
export const WithAction: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateIcon>📭</EmptyStateIcon>
      <EmptyStateTitle>No items found</EmptyStateTitle>
      <EmptyStateDescription>Get started by creating your first item.</EmptyStateDescription>
      <EmptyStateAction>
        <Button>Create Item</Button>
      </EmptyStateAction>
    </EmptyState>
  ),
};

/**
 * Empty state with different icon sizes
 */
export const IconSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <EmptyState>
        <EmptyStateIcon size="sm">📭</EmptyStateIcon>
        <EmptyStateTitle>Small Icon</EmptyStateTitle>
        <EmptyStateDescription>Icon size: sm</EmptyStateDescription>
      </EmptyState>

      <EmptyState>
        <EmptyStateIcon size="md">📭</EmptyStateIcon>
        <EmptyStateTitle>Medium Icon</EmptyStateTitle>
        <EmptyStateDescription>Icon size: md (default)</EmptyStateDescription>
      </EmptyState>

      <EmptyState>
        <EmptyStateIcon size="lg">📭</EmptyStateIcon>
        <EmptyStateTitle>Large Icon</EmptyStateTitle>
        <EmptyStateDescription>Icon size: lg</EmptyStateDescription>
      </EmptyState>
    </div>
  ),
};

/**
 * Empty state with custom React icon
 */
export const WithCustomIcon: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </EmptyStateIcon>
      <EmptyStateTitle>No data available</EmptyStateTitle>
      <EmptyStateDescription>We couldn't find any data to display.</EmptyStateDescription>
    </EmptyState>
  ),
};

/**
 * Empty state for search results
 */
export const SearchResults: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateIcon>🔍</EmptyStateIcon>
      <EmptyStateTitle>No results found</EmptyStateTitle>
      <EmptyStateDescription>Try adjusting your search terms or filters.</EmptyStateDescription>
      <EmptyStateAction>
        <Button variant="outline">Clear Filters</Button>
      </EmptyStateAction>
    </EmptyState>
  ),
};

/**
 * Empty state for error state
 */
export const ErrorState: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateIcon>⚠️</EmptyStateIcon>
      <EmptyStateTitle>Something went wrong</EmptyStateTitle>
      <EmptyStateDescription>We encountered an error while loading the data.</EmptyStateDescription>
      <EmptyStateAction>
        <Button>Try Again</Button>
      </EmptyStateAction>
    </EmptyState>
  ),
};

/**
 * Empty state with multiple actions
 */
export const MultipleActions: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateIcon>📦</EmptyStateIcon>
      <EmptyStateTitle>No packages</EmptyStateTitle>
      <EmptyStateDescription>You don't have any packages yet.</EmptyStateDescription>
      <EmptyStateAction>
        <div className="flex gap-2">
          <Button variant="outline">Import</Button>
          <Button>Create Package</Button>
        </div>
      </EmptyStateAction>
    </EmptyState>
  ),
};
