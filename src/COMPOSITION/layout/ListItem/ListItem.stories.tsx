"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { List } from "../List/List";
import { ListItem } from "./ListItem";

/**
 * ListItem Storybook
 *
 * Structural list item wrapper with interactive/disabled states, no content styling.
 * Provides semantic li/div elements with proper accessibility and state handling.
 *
 * @status COMPLETE
 * @date 2026-01-01
 * @task TUNG_LIST_LISTITEM_COMPOSITION (C7 - Storybook Stories)
 *
 * Stories Structure:
 * - Default: Basic static list item
 * - Interactive: Interactive list item with hover
 * - Disabled: Disabled list item
 * - States: All states (default, interactive, disabled)
 * - AlignmentVariants: Items with different alignment (start, center)
 */

const meta: Meta<typeof ListItem> = {
  title: "UI / Composition / Layout / ListItem",
  component: ListItem,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Structural list item wrapper with interactive/disabled states, no content styling. Provides semantic li/div elements with proper accessibility and state handling. Uses tokenCVA for variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["li", "div"],
      description: "Polymorphic element type (li/div)",
      table: {
        defaultValue: { summary: "li" },
        type: { summary: '"li" | "div"' },
      },
    },
    interactive: {
      control: "boolean",
      description: "Interactive state (adds hover/focus styling)",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state (reduces opacity, disables pointer events)",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    align: {
      control: "select",
      options: ["start", "center"],
      description: "Vertical alignment of content",
      table: {
        defaultValue: { summary: "start" },
        type: { summary: '"start" | "center"' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

/**
 * Default: Basic static list item
 *
 * Demonstrates basic ListItem usage with simple text content.
 */
export const Default: Story = {
  args: {
    children: "Static list item with text content",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic static list item. No interactive states, no hover effects.",
      },
    },
  },
};

/**
 * Interactive: Interactive list item with hover
 *
 * Demonstrates interactive ListItem with hover transition and focus-visible styling.
 */
export const Interactive: Story = {
  args: {
    interactive: true,
    children: (
      <div className="flex items-center gap-3 p-3">
        <div className="h-10 w-10 rounded-full bg-muted" />
        <div>
          <div className="font-medium">Interactive item</div>
          <div className="text-sm text-muted-foreground">Hover to see transition</div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive list item with hover transition (motion tokens). Click or hover to see interactive states.",
      },
    },
  },
};

/**
 * Disabled: Disabled list item
 *
 * Demonstrates disabled ListItem with reduced opacity and disabled pointer events.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <div className="flex items-center gap-3 p-3">
        <div className="h-10 w-10 rounded-full bg-muted" />
        <div>
          <div className="font-medium">Disabled item</div>
          <div className="text-sm text-muted-foreground">This item is disabled</div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled list item with reduced opacity and disabled pointer events.",
      },
    },
  },
};

/**
 * States: All states (default, interactive, disabled)
 *
 * Demonstrates all ListItem states in a single view.
 */
export const States: Story = {
  render: () => (
    <List gap="md" divided>
      <ListItem>
        <div className="p-3">
          <div className="font-medium">Default state</div>
          <div className="text-sm text-muted-foreground">Static list item</div>
        </div>
      </ListItem>

      <ListItem interactive>
        <div className="p-3">
          <div className="font-medium">Interactive state</div>
          <div className="text-sm text-muted-foreground">Hover to see transition</div>
        </div>
      </ListItem>

      <ListItem disabled>
        <div className="p-3">
          <div className="font-medium">Disabled state</div>
          <div className="text-sm text-muted-foreground">Reduced opacity, no pointer events</div>
        </div>
      </ListItem>
    </List>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all ListItem states: default (static), interactive (hover), and disabled.",
      },
    },
  },
};

/**
 * AlignmentVariants: Items with different alignment (start, center)
 *
 * Demonstrates ListItem with different vertical alignment options.
 */
export const AlignmentVariants: Story = {
  render: () => (
    <List gap="lg" divided>
      <ListItem align="start">
        <div className="flex gap-3">
          <div className="h-16 w-16 rounded-lg bg-muted" />
          <div>
            <div className="font-medium">Align: start (default)</div>
            <div className="text-sm text-muted-foreground">
              Content is aligned to the start (top)
            </div>
            <div className="text-sm text-muted-foreground">
              Second line to demonstrate alignment
            </div>
          </div>
        </div>
      </ListItem>

      <ListItem align="center">
        <div className="flex gap-3">
          <div className="h-16 w-16 rounded-lg bg-muted" />
          <div>
            <div className="font-medium">Align: center</div>
            <div className="text-sm text-muted-foreground">Content is vertically centered</div>
          </div>
        </div>
      </ListItem>
    </List>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates vertical alignment options: start (top) and center. Useful for aligning icons or avatars with text content.",
      },
    },
  },
};
