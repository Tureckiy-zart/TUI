import type { Meta, StoryObj } from "@storybook/react";
import { Timeline } from "./Timeline";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { id: "1", title: "Project Started", date: "2024-01-01", description: "Initial project setup" },
  { id: "2", title: "First Milestone", date: "2024-02-01", description: "Core features completed" },
  { id: "3", title: "Beta Release", date: "2024-03-01", description: "Beta version released" },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const WithoutDescription: Story = {
  args: {
    items: [
      { id: "1", title: "Project Started", date: "2024-01-01" },
      { id: "2", title: "First Milestone", date: "2024-02-01" },
      { id: "3", title: "Beta Release", date: "2024-03-01" },
    ],
  },
};

export const LongDescriptions: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Project Started",
        date: "2024-01-01",
        description: "Initial project setup with comprehensive planning and architecture design",
      },
      {
        id: "2",
        title: "First Milestone",
        date: "2024-02-01",
        description:
          "Core features completed including authentication, user management, and basic functionality",
      },
      {
        id: "3",
        title: "Beta Release",
        date: "2024-03-01",
        description: "Beta version released to selected users for testing and feedback collection",
      },
    ],
  },
};
