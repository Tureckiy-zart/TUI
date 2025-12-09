"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "./Icon";

const meta: Meta = {
  title: "Components/Icon/Gallery",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Visual catalog of all available icons in the icon registry.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const iconNames = [
  "search",
  "menu",
  "chevronDown",
  "chevronRight",
  "check",
  "close",
  "info",
  "warning",
  "success",
  "error",
] as const;

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-md sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {iconNames.map((name) => (
        <div key={name} className="flex flex-col items-center gap-xs rounded-md border p-md">
          <Icon name={name} size="xl" />
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllIconsWithSizes: Story = {
  render: () => (
    <div className="space-y-lg">
      {iconNames.map((name) => (
        <div key={name} className="space-y-xs">
          <h3 className="text-sm font-semibold capitalize">{name}</h3>
          <div className="flex items-center gap-md">
            <div className="flex flex-col items-center gap-xs">
              <Icon name={name} size="sm" />
              <span className="text-xs text-muted-foreground">sm</span>
            </div>
            <div className="flex flex-col items-center gap-xs">
              <Icon name={name} size="md" />
              <span className="text-xs text-muted-foreground">md</span>
            </div>
            <div className="flex flex-col items-center gap-xs">
              <Icon name={name} size="lg" />
              <span className="text-xs text-muted-foreground">lg</span>
            </div>
            <div className="flex flex-col items-center gap-xs">
              <Icon name={name} size="xl" />
              <span className="text-xs text-muted-foreground">xl</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const AllIconsWithColors: Story = {
  render: () => (
    <div className="space-y-lg">
      {iconNames.map((name) => (
        <div key={name} className="space-y-xs">
          <h3 className="text-sm font-semibold capitalize">{name}</h3>
          <div className="flex items-center gap-md">
            <div className="flex flex-col items-center gap-xs">
              <Icon name={name} color="default" size="lg" />
              <span className="text-xs text-muted-foreground">default</span>
            </div>
            <div className="flex flex-col items-center gap-xs">
              <Icon name={name} color="muted" size="lg" />
              <span className="text-xs text-muted-foreground">muted</span>
            </div>
            <div className="flex flex-col items-center gap-xs">
              <Icon name={name} color="success" size="lg" />
              <span className="text-xs text-muted-foreground">success</span>
            </div>
            <div className="flex flex-col items-center gap-xs">
              <Icon name={name} color="warning" size="lg" />
              <span className="text-xs text-muted-foreground">warning</span>
            </div>
            <div className="flex flex-col items-center gap-xs">
              <Icon name={name} color="danger" size="lg" />
              <span className="text-xs text-muted-foreground">danger</span>
            </div>
            <div className="flex flex-col items-center gap-xs">
              <Icon name={name} color="info" size="lg" />
              <span className="text-xs text-muted-foreground">info</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
