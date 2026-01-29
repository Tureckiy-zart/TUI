"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { IconGallery } from "./IconGallery";

const meta: Meta<typeof IconGallery> = {
  title: "Composition / Utilities / IconGallery",
  component: IconGallery,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Visual catalog component that displays icons in various layouts. Supports grid, sizes, and colors display modes.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IconGallery>;

export const Default: Story = {
  render: (args) => <IconGallery {...args} />,
  args: {
    mode: "grid",
  },
};

export const AllIcons: Story = {
  render: () => <IconGallery mode="grid" />,
};

export const AllIconsWithSizes: Story = {
  render: () => <IconGallery mode="sizes" />,
};

export const AllIconsWithColors: Story = {
  render: () => <IconGallery mode="colors" />,
};

export const CustomIcons: Story = {
  render: () => <IconGallery icons={["search", "menu", "check"]} mode="grid" />,
};

export const SingleIcon: Story = {
  render: () => <IconGallery icons={["search"]} mode="grid" />,
};

export const WithCustomProps: Story = {
  render: () => (
    <IconGallery
      icons={["search", "menu", "check"]}
      mode="grid"
      iconSize="lg"
      iconColor="muted"
      className="border-2 border-[hsl(var(--tm-primary))]"
    />
  ),
};

export const EmptyIcons: Story = {
  render: () => <IconGallery icons={[]} mode="grid" />,
};
