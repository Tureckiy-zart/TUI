import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { id: "1", title: "Event 1", description: "Description for event 1" },
  { id: "2", title: "Event 2", description: "Description for event 2" },
  { id: "3", title: "Event 3", description: "Description for event 3" },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const WithoutDescription: Story = {
  args: {
    items: [
      { id: "1", title: "Event 1" },
      { id: "2", title: "Event 2" },
      { id: "3", title: "Event 3" },
    ],
  },
};

export const LongDescriptions: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Event 1",
        description:
          "This is a very long description that should wrap properly and show how the component handles longer text content.",
      },
      {
        id: "2",
        title: "Event 2",
        description:
          "Another long description to demonstrate text wrapping and proper spacing in the list component.",
      },
      {
        id: "3",
        title: "Event 3",
        description: "Short description.",
      },
    ],
  },
};
