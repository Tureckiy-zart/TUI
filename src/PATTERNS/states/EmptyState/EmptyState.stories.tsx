import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/PRIMITIVES/Button";

import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "./index";

const meta: Meta<typeof EmptyState> = {
  title: "UI / Patterns / States / EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Token-driven empty state component for displaying empty or no-data states. Uses EMPTY_STATE_TOKENS for all spacing and sizing.",
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
 * Sizes Gallery - Demonstrates all supported icon sizes
 *
 * Required per VARIANTS_SIZE_CANON.md: SizesGallery story is REQUIRED when component exposes public size prop.
 * EmptyStateIcon has size prop (sm | md | lg), so this story is required.
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes = ["sm", "md", "lg"] as const;

    return (
      <div className="space-y-8">
        {sizes.map((size) => (
          <EmptyState key={size}>
            <EmptyStateIcon size={size}>📭</EmptyStateIcon>
            <EmptyStateTitle>Icon Size: {size}</EmptyStateTitle>
            <EmptyStateDescription>
              {size === "md" ? "Default size" : `Size: ${size}`}
            </EmptyStateDescription>
          </EmptyState>
        ))}
      </div>
    );
  },
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
          className="text-[hsl(var(--tm-text-muted))]"
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
