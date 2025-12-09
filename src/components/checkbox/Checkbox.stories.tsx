"use client";

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Checkbox component for form inputs. Supports 5 variants, 5 sizes, multiple states (default, checked, indeterminate, disabled, error), keyboard navigation (Space to toggle), and full accessibility with token-driven styling using CSS variables.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
      description: "Checkbox variant style",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "outline" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Checkbox size",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    state: {
      control: { type: "select" },
      options: ["default", "checked", "indeterminate", "error", "disabled"],
      description: "Checkbox state",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether checkbox is checked (controlled)",
    },
    indeterminate: {
      control: { type: "boolean" },
      description: "Whether checkbox is in indeterminate state",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable checkbox interaction",
    },
    "aria-label": {
      control: { type: "text" },
      description: "ARIA label for accessibility",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Default checkbox",
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    "aria-label": "Checked checkbox",
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    "aria-label": "Indeterminate checkbox",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    "aria-label": "Disabled checkbox",
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    "aria-label": "Disabled checked checkbox",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-md">
      <div className="flex flex-col items-center gap-sm">
        <Checkbox size="xs" aria-label="Extra small checkbox" />
        <span className="text-xs text-muted-foreground">xs</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Checkbox size="sm" aria-label="Small checkbox" />
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Checkbox size="md" aria-label="Medium checkbox" />
        <span className="text-xs text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Checkbox size="lg" aria-label="Large checkbox" />
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Checkbox size="xl" aria-label="Extra large checkbox" />
        <span className="text-xs text-muted-foreground">xl</span>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md">
        <Checkbox variant="primary" checked aria-label="Primary checkbox" />
        <span>Primary</span>
      </div>
      <div className="flex items-center gap-md">
        <Checkbox variant="secondary" checked aria-label="Secondary checkbox" />
        <span>Secondary</span>
      </div>
      <div className="flex items-center gap-md">
        <Checkbox variant="outline" checked aria-label="Outline checkbox" />
        <span>Outline</span>
      </div>
      <div className="flex items-center gap-md">
        <Checkbox variant="ghost" checked aria-label="Ghost checkbox" />
        <span>Ghost</span>
      </div>
      <div className="flex items-center gap-md">
        <Checkbox variant="destructive" checked aria-label="Destructive checkbox" />
        <span>Destructive</span>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md">
        <Checkbox state="default" aria-label="Default state checkbox" />
        <span>Default</span>
      </div>
      <div className="flex items-center gap-md">
        <Checkbox state="checked" checked aria-label="Checked state checkbox" />
        <span>Checked</span>
      </div>
      <div className="flex items-center gap-md">
        <Checkbox state="indeterminate" indeterminate aria-label="Indeterminate state checkbox" />
        <span>Indeterminate</span>
      </div>
      <div className="flex items-center gap-md">
        <Checkbox state="error" aria-label="Error state checkbox" />
        <span>Error</span>
      </div>
      <div className="flex items-center gap-md">
        <Checkbox state="disabled" disabled aria-label="Disabled state checkbox" />
        <span>Disabled</span>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <label className="flex cursor-pointer items-center gap-sm">
        <Checkbox aria-labelledby="checkbox-label-1" />
        <span id="checkbox-label-1">Accept terms and conditions</span>
      </label>
      <label className="flex cursor-pointer items-center gap-sm">
        <Checkbox checked aria-labelledby="checkbox-label-2" />
        <span id="checkbox-label-2">Subscribe to newsletter</span>
      </label>
      <label className="flex cursor-pointer items-center gap-sm">
        <Checkbox indeterminate aria-labelledby="checkbox-label-3" />
        <span id="checkbox-label-3">Select all items</span>
      </label>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex flex-col gap-md">
        <label className="flex cursor-pointer items-center gap-sm">
          <Checkbox
            checked={checked}
            onCheckedChange={setChecked}
            aria-labelledby="controlled-label"
          />
          <span id="controlled-label">
            Controlled checkbox: {checked ? "checked" : "unchecked"}
          </span>
        </label>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-md">
        <label className="flex cursor-pointer items-center gap-sm">
          <Checkbox defaultChecked aria-labelledby="uncontrolled-label" />
          <span id="uncontrolled-label">Uncontrolled checkbox (defaultChecked)</span>
        </label>
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-sm">
        <Checkbox state="error" aria-label="Error checkbox" aria-invalid="true" />
        <span className="text-destructive">This field has an error</span>
      </div>
      <div className="flex items-center gap-sm">
        <Checkbox state="error" checked aria-label="Error checked checkbox" aria-invalid="true" />
        <span className="text-destructive">Error state with checked</span>
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-md text-lg font-semibold">Keyboard Navigation</h3>
        <p className="mb-md text-sm text-muted-foreground">
          Press <kbd className="rounded bg-muted px-1 py-0.5 text-xs">Space</kbd> to toggle the
          checkbox.
        </p>
        <div className="flex flex-col gap-sm">
          <label className="flex cursor-pointer items-center gap-sm">
            <Checkbox aria-labelledby="a11y-label-1" />
            <span id="a11y-label-1">Focus this checkbox and press Space</span>
          </label>
        </div>
      </div>
      <div>
        <h3 className="mb-md text-lg font-semibold">Screen Reader Support</h3>
        <p className="mb-md text-sm text-muted-foreground">
          All checkboxes have proper ARIA attributes for screen readers.
        </p>
        <div className="flex flex-col gap-sm">
          <Checkbox aria-label="Checkbox with aria-label" />
          <Checkbox checked aria-label="Checked checkbox with aria-label" />
          <Checkbox indeterminate aria-label="Indeterminate checkbox with aria-label" />
        </div>
      </div>
    </div>
  ),
};
