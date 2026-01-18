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
      <EmptyStateIcon>UPLOAD</EmptyStateIcon>
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
