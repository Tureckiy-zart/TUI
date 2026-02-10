"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { ListItem } from "../ListItem";
import { List } from "./List";

/**
 * List Storybook
 *
 * Structural list container that composes Stack with optional Divider injection.
 * Provides semantic ul/ol/div list structures without domain semantics.
 *
 * @status COMPLETE
 * @date 2026-01-01
 * @task TUNG_LIST_LISTITEM_COMPOSITION (C7 - Storybook Stories)
 *
 * Stories Structure:
 * - Default: Basic list with items
 * - Divided: List with dividers between items
 * - DividedWithInset: List with inset dividers
 * - OrderedList: Semantic ol list
 * - UnorderedList: Semantic ul list
 * - CustomGap: List with different gap sizes
 */

const meta: Meta<typeof List> = {
  title: "Composition / Layout / List",
  component: List,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Structural list container that composes Stack with optional Divider injection. Provides semantic ul/ol/div list structures without domain semantics. Reuses Stack and Divider primitives without duplication.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["ul", "ol", "div"],
      description: "Polymorphic element type (ul/ol/div)",
      table: {
        defaultValue: { summary: "div" },
        type: { summary: '"ul" | "ol" | "div"' },
      },
    },
    gap: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
      description: "Spacing between list items (passed to Stack)",
      table: {
        type: { summary: "SpacingToken" },
      },
    },
    divided: {
      control: "boolean",
      description: "Inject Divider between list items",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    dividerInset: {
      control: "boolean",
      description: "Add inset padding to dividers",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    dividerTone: {
      control: "select",
      options: ["border", "muted", "primary", "secondary", "accent"],
      description: "Color tone for dividers",
      table: {
        defaultValue: { summary: "border" },
        type: { summary: "DividerTone" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

/**
 * Default: Basic list with items
 *
 * Demonstrates basic List usage with simple text content.
 */
export const Default: Story = {
  args: {
    as: "div",
    children: (
      <>
        <ListItem>List item 1</ListItem>
        <ListItem>List item 2</ListItem>
        <ListItem>List item 3</ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Basic list with simple text items. No dividers, default gap.",
      },
    },
  },
};

/**
 * Divided: List with dividers between items
 *
 * Demonstrates divided list with Divider injection between items.
 */
export const Divided: Story = {
  args: {
    as: "div",
    divided: true,
    gap: "md",
    children: (
      <>
        <ListItem>List item 1</ListItem>
        <ListItem>List item 2</ListItem>
        <ListItem>List item 3</ListItem>
        <ListItem>List item 4</ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "List with dividers injected between items (not after last item). Uses default divider tone (border).",
      },
    },
  },
};

/**
 * DividedWithInset: List with inset dividers
 *
 * Demonstrates divided list with inset padding on dividers.
 */
export const DividedWithInset: Story = {
  args: {
    as: "div",
    divided: true,
    dividerInset: true,
    gap: "md",
    children: (
      <>
        <ListItem>List item 1 with longer content</ListItem>
        <ListItem>List item 2 with even longer content to demonstrate inset dividers</ListItem>
        <ListItem>List item 3</ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "List with inset dividers (dividers have horizontal padding, creating visual hierarchy).",
      },
    },
  },
};

/**
 * OrderedList: Semantic ol list
 *
 * Demonstrates semantic ordered list with native numbering.
 */
export const OrderedList: Story = {
  args: {
    as: "ol",
    gap: "sm",
    className: "list-decimal list-inside",
    children: (
      <>
        <ListItem>First item in ordered list</ListItem>
        <ListItem>Second item in ordered list</ListItem>
        <ListItem>Third item in ordered list</ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Semantic ordered list (ol) with native numbering. Uses Tailwind list-decimal utility for numbering.",
      },
    },
  },
};

/**
 * UnorderedList: Semantic ul list
 *
 * Demonstrates semantic unordered list with native bullets.
 */
export const UnorderedList: Story = {
  args: {
    as: "ul",
    gap: "sm",
    className: "list-disc list-inside",
    children: (
      <>
        <ListItem>First item in unordered list</ListItem>
        <ListItem>Second item in unordered list</ListItem>
        <ListItem>Third item in unordered list</ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Semantic unordered list (ul) with native bullets. Uses Tailwind list-disc utility for bullets.",
      },
    },
  },
};

/**
 * CustomGap: List with different gap sizes
 *
 * Demonstrates List with various gap sizes (token-based spacing).
 */
export const CustomGap: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 font-medium">Gap: xs</h3>
        <List gap="xs">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Gap: md (default)</h3>
        <List gap="md">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Gap: xl</h3>
        <List gap="xl">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates various gap sizes (xs/md/xl). All spacing is token-based via Stack composition.",
      },
    },
  },
};
