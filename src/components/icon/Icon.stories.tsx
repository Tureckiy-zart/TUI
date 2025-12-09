"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";

import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Unified Icon component with token-driven sizing, colors, and stroke. Supports SSR-safe rendering and tree-shakeable icon registry.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "select" },
      options: [
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
      ],
      description: "Icon name from registry",
      table: {
        type: { summary: "IconName" },
        defaultValue: { summary: "search" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Icon size",
      table: {
        type: { summary: "IconSize" },
        defaultValue: { summary: "md" },
      },
    },
    color: {
      control: { type: "select" },
      options: ["default", "muted", "success", "warning", "danger", "info"],
      description: "Icon color variant",
      table: {
        type: { summary: "IconColor" },
        defaultValue: { summary: "default" },
      },
    },
    stroke: {
      control: { type: "select" },
      options: ["thin", "normal", "bold"],
      description: "Stroke width variant",
      table: {
        type: { summary: "IconStroke" },
        defaultValue: { summary: "normal" },
      },
    },
    asChild: {
      control: { type: "boolean" },
      description: "Render as child element (composition pattern)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "search",
    size: "md",
    color: "default",
    stroke: "normal",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-md">
      <div className="flex flex-col items-center gap-xs">
        <Icon name="search" size="sm" />
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <Icon name="search" size="md" />
        <span className="text-xs text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <Icon name="search" size="lg" />
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <Icon name="search" size="xl" />
        <span className="text-xs text-muted-foreground">xl</span>
      </div>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md">
        <Icon name="info" color="default" />
        <span className="text-sm">default</span>
      </div>
      <div className="flex items-center gap-md">
        <Icon name="info" color="muted" />
        <span className="text-sm">muted</span>
      </div>
      <div className="flex items-center gap-md">
        <Icon name="success" color="success" />
        <span className="text-sm">success</span>
      </div>
      <div className="flex items-center gap-md">
        <Icon name="warning" color="warning" />
        <span className="text-sm">warning</span>
      </div>
      <div className="flex items-center gap-md">
        <Icon name="error" color="danger" />
        <span className="text-sm">danger</span>
      </div>
      <div className="flex items-center gap-md">
        <Icon name="info" color="info" />
        <span className="text-sm">info</span>
      </div>
    </div>
  ),
};

export const AllStrokeWidths: Story = {
  render: () => (
    <div className="flex items-center gap-md">
      <div className="flex flex-col items-center gap-xs">
        <Icon name="check" stroke="thin" size="lg" />
        <span className="text-xs text-muted-foreground">thin</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <Icon name="check" stroke="normal" size="lg" />
        <span className="text-xs text-muted-foreground">normal</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <Icon name="check" stroke="bold" size="lg" />
        <span className="text-xs text-muted-foreground">bold</span>
      </div>
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="flex flex-wrap gap-md">
      <Button>
        <Icon name="search" size="sm" className="mr-sm" />
        Search
      </Button>
      <Button variant="secondary">
        <Icon name="check" size="sm" className="mr-sm" />
        Confirm
      </Button>
      <Button variant="destructive">
        <Icon name="close" size="sm" className="mr-sm" />
        Delete
      </Button>
    </div>
  ),
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="relative">
        <Icon
          name="search"
          size="sm"
          className="absolute left-sm top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input className="pl-8" placeholder="Search..." />
      </div>
    </div>
  ),
};

export const SemanticColors: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md">
        <Icon name="success" color="success" />
        <span className="text-sm">Success message</span>
      </div>
      <div className="flex items-center gap-md">
        <Icon name="warning" color="warning" />
        <span className="text-sm">Warning message</span>
      </div>
      <div className="flex items-center gap-md">
        <Icon name="error" color="danger" />
        <span className="text-sm">Error message</span>
      </div>
      <div className="flex items-center gap-md">
        <Icon name="info" color="info" />
        <span className="text-sm">Info message</span>
      </div>
    </div>
  ),
};

export const FallbackIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <p className="text-sm text-muted-foreground">Invalid icon name falls back to error icon:</p>
      <Icon name={"invalidName" as any} size="lg" />
    </div>
  ),
};
