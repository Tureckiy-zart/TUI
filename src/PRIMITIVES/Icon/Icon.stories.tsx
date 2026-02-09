"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/PRIMITIVES/Button";
import { Input } from "@/PRIMITIVES/Input";

import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Primitives / Icon",
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
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">sm</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <Icon name="search" size="md" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">md</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <Icon name="search" size="lg" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">lg</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <Icon name="search" size="xl" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">xl</span>
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
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">thin</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <Icon name="check" stroke="normal" size="lg" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">normal</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <Icon name="check" stroke="bold" size="lg" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">bold</span>
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
          className="absolute left-sm top-1/2 -translate-y-1/2 text-[hsl(var(--tm-text-primary))]/70"
        />
        <Input placeholder="Search..." data-has-icon="true" />
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
      <p className="text-sm font-medium text-[hsl(var(--tm-text-primary))]/90">
        Invalid icon name falls back to error icon:
      </p>
      <Icon name={"invalidName" as any} size="lg" />
    </div>
  ),
};

/**
 * SizesGallery Story (REQUIRED per VARIANTS_SIZE_CANON.md)
 * Demonstrates all supported sizes with different content types
 */
export const SizesGallery: Story = {
  render: () => (
    <div className="flex flex-col gap-xl">
      {/* Size scale demonstration */}
      <div>
        <h3 className="mb-md text-lg font-semibold">Icon Size Scale</h3>
        <p className="mb-lg text-sm text-[hsl(var(--tm-text-muted))]">
          Icon uses a visual size scale (sm, md, lg, xl) distinct from interactive components. Per
          Foundation rule: "Semi-interactive components (Icon, Badge, Avatar) MUST NOT use size as
          interactive scale"
        </p>
        <div className="flex items-end gap-lg">
          <div className="flex flex-col items-center gap-sm">
            <Icon name="search" size="sm" />
            <span className="text-xs font-medium">sm</span>
            <span className="text-xs text-[hsl(var(--tm-text-muted))]">12px</span>
          </div>
          <div className="flex flex-col items-center gap-sm">
            <Icon name="search" size="md" />
            <span className="text-xs font-medium">md</span>
            <span className="text-xs text-[hsl(var(--tm-text-muted))]">16px (default)</span>
          </div>
          <div className="flex flex-col items-center gap-sm">
            <Icon name="search" size="lg" />
            <span className="text-xs font-medium">lg</span>
            <span className="text-xs text-[hsl(var(--tm-text-muted))]">20px</span>
          </div>
          <div className="flex flex-col items-center gap-sm">
            <Icon name="search" size="xl" />
            <span className="text-xs font-medium">xl</span>
            <span className="text-xs text-[hsl(var(--tm-text-muted))]">24px</span>
          </div>
        </div>
      </div>

      {/* Different icon types at each size */}
      <div>
        <h3 className="mb-md text-lg font-semibold">Different Icon Types</h3>
        <div className="grid grid-cols-4 gap-lg">
          {/* sm size */}
          <div className="flex flex-col gap-md">
            <span className="text-sm font-medium">sm (12px)</span>
            <div className="flex flex-wrap gap-md">
              <Icon name="search" size="sm" />
              <Icon name="check" size="sm" />
              <Icon name="close" size="sm" />
              <Icon name="info" size="sm" />
              <Icon name="warning" size="sm" />
              <Icon name="success" size="sm" />
              <Icon name="error" size="sm" />
              <Icon name="menu" size="sm" />
            </div>
          </div>

          {/* md size */}
          <div className="flex flex-col gap-md">
            <span className="text-sm font-medium">md (16px)</span>
            <div className="flex flex-wrap gap-md">
              <Icon name="search" size="md" />
              <Icon name="check" size="md" />
              <Icon name="close" size="md" />
              <Icon name="info" size="md" />
              <Icon name="warning" size="md" />
              <Icon name="success" size="md" />
              <Icon name="error" size="md" />
              <Icon name="menu" size="md" />
            </div>
          </div>

          {/* lg size */}
          <div className="flex flex-col gap-md">
            <span className="text-sm font-medium">lg (20px)</span>
            <div className="flex flex-wrap gap-md">
              <Icon name="search" size="lg" />
              <Icon name="check" size="lg" />
              <Icon name="close" size="lg" />
              <Icon name="info" size="lg" />
              <Icon name="warning" size="lg" />
              <Icon name="success" size="lg" />
              <Icon name="error" size="lg" />
              <Icon name="menu" size="lg" />
            </div>
          </div>

          {/* xl size */}
          <div className="flex flex-col gap-md">
            <span className="text-sm font-medium">xl (24px)</span>
            <div className="flex flex-wrap gap-md">
              <Icon name="search" size="xl" />
              <Icon name="check" size="xl" />
              <Icon name="close" size="xl" />
              <Icon name="info" size="xl" />
              <Icon name="warning" size="xl" />
              <Icon name="success" size="xl" />
              <Icon name="error" size="xl" />
              <Icon name="menu" size="xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Size with different colors */}
      <div>
        <h3 className="mb-md text-lg font-semibold">Sizes with Colors</h3>
        <div className="grid grid-cols-4 gap-lg">
          <div className="flex flex-col gap-md">
            <span className="text-sm font-medium">sm</span>
            <div className="flex flex-wrap gap-md">
              <Icon name="info" size="sm" color="default" />
              <Icon name="success" size="sm" color="success" />
              <Icon name="warning" size="sm" color="warning" />
              <Icon name="error" size="sm" color="danger" />
            </div>
          </div>
          <div className="flex flex-col gap-md">
            <span className="text-sm font-medium">md</span>
            <div className="flex flex-wrap gap-md">
              <Icon name="info" size="md" color="default" />
              <Icon name="success" size="md" color="success" />
              <Icon name="warning" size="md" color="warning" />
              <Icon name="error" size="md" color="danger" />
            </div>
          </div>
          <div className="flex flex-col gap-md">
            <span className="text-sm font-medium">lg</span>
            <div className="flex flex-wrap gap-md">
              <Icon name="info" size="lg" color="default" />
              <Icon name="success" size="lg" color="success" />
              <Icon name="warning" size="lg" color="warning" />
              <Icon name="error" size="lg" color="danger" />
            </div>
          </div>
          <div className="flex flex-col gap-md">
            <span className="text-sm font-medium">xl</span>
            <div className="flex flex-wrap gap-md">
              <Icon name="info" size="xl" color="default" />
              <Icon name="success" size="xl" color="success" />
              <Icon name="warning" size="xl" color="warning" />
              <Icon name="error" size="xl" color="danger" />
            </div>
          </div>
        </div>
      </div>

      {/* Size with different stroke widths */}
      <div>
        <h3 className="mb-md text-lg font-semibold">Sizes with Stroke Widths</h3>
        <div className="grid grid-cols-4 gap-lg">
          <div className="flex flex-col gap-md">
            <span className="text-sm font-medium">sm</span>
            <div className="flex flex-wrap gap-md">
              <Icon name="check" size="sm" stroke="thin" />
              <Icon name="check" size="sm" stroke="normal" />
              <Icon name="check" size="sm" stroke="bold" />
            </div>
          </div>
          <div className="flex flex-col gap-md">
            <span className="text-sm font-medium">md</span>
            <div className="flex flex-wrap gap-md">
              <Icon name="check" size="md" stroke="thin" />
              <Icon name="check" size="md" stroke="normal" />
              <Icon name="check" size="md" stroke="bold" />
            </div>
          </div>
          <div className="flex flex-col gap-md">
            <span className="text-sm font-medium">lg</span>
            <div className="flex flex-wrap gap-md">
              <Icon name="check" size="lg" stroke="thin" />
              <Icon name="check" size="lg" stroke="normal" />
              <Icon name="check" size="lg" stroke="bold" />
            </div>
          </div>
          <div className="flex flex-col gap-md">
            <span className="text-sm font-medium">xl</span>
            <div className="flex flex-wrap gap-md">
              <Icon name="check" size="xl" stroke="thin" />
              <Icon name="check" size="xl" stroke="normal" />
              <Icon name="check" size="xl" stroke="bold" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
