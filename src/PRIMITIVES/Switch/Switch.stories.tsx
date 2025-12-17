"use client";

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Switch component for toggle inputs. Supports 5 variants, 5 sizes, multiple states (default, checked, disabled, error), keyboard navigation (Space to toggle), and full accessibility with token-driven styling using CSS variables. The switch consists of a track (container) and handle (thumb) that slides within the track.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
      description: "Switch variant style",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Switch size",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    state: {
      control: { type: "select" },
      options: ["default", "checked", "disabled", "error"],
      description: "Switch state",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether switch is checked (controlled)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable switch interaction",
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
    "aria-label": "Default switch",
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    "aria-label": "Checked switch",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    "aria-label": "Disabled switch",
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    "aria-label": "Disabled checked switch",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-md">
      <div className="flex flex-col items-center gap-sm">
        <Switch size="xs" aria-label="Extra small switch" />
        <span className="text-xs text-muted-foreground">xs</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="sm" aria-label="Small switch" />
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="md" aria-label="Medium switch" />
        <span className="text-xs text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="lg" aria-label="Large switch" />
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="xl" aria-label="Extra large switch" />
        <span className="text-xs text-muted-foreground">xl</span>
      </div>
    </div>
  ),
};

export const AllSizesChecked: Story = {
  render: () => (
    <div className="flex items-center gap-md">
      <div className="flex flex-col items-center gap-sm">
        <Switch size="xs" checked aria-label="Extra small checked switch" />
        <span className="text-xs text-muted-foreground">xs</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="sm" checked aria-label="Small checked switch" />
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="md" checked aria-label="Medium checked switch" />
        <span className="text-xs text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="lg" checked aria-label="Large checked switch" />
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="xl" checked aria-label="Extra large checked switch" />
        <span className="text-xs text-muted-foreground">xl</span>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md">
        <Switch variant="primary" checked aria-label="Primary switch" />
        <span>Primary</span>
      </div>
      <div className="flex items-center gap-md">
        <Switch variant="secondary" checked aria-label="Secondary switch" />
        <span>Secondary</span>
      </div>
      <div className="flex items-center gap-md">
        <Switch variant="outline" checked aria-label="Outline switch" />
        <span>Outline</span>
      </div>
      <div className="flex items-center gap-md">
        <Switch variant="ghost" checked aria-label="Ghost switch" />
        <span>Ghost</span>
      </div>
      <div className="flex items-center gap-md">
        <Switch variant="destructive" checked aria-label="Destructive switch" />
        <span>Destructive</span>
      </div>
    </div>
  ),
};

export const AllVariantsUnchecked: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md">
        <Switch variant="primary" aria-label="Primary switch unchecked" />
        <span>Primary</span>
      </div>
      <div className="flex items-center gap-md">
        <Switch variant="secondary" aria-label="Secondary switch unchecked" />
        <span>Secondary</span>
      </div>
      <div className="flex items-center gap-md">
        <Switch variant="outline" aria-label="Outline switch unchecked" />
        <span>Outline</span>
      </div>
      <div className="flex items-center gap-md">
        <Switch variant="ghost" aria-label="Ghost switch unchecked" />
        <span>Ghost</span>
      </div>
      <div className="flex items-center gap-md">
        <Switch variant="destructive" aria-label="Destructive switch unchecked" />
        <span>Destructive</span>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md">
        <Switch state="default" aria-label="Default state switch" />
        <span>Default</span>
      </div>
      <div className="flex items-center gap-md">
        <Switch state="checked" checked aria-label="Checked state switch" />
        <span>Checked</span>
      </div>
      <div className="flex items-center gap-md">
        <Switch state="error" aria-label="Error state switch" />
        <span>Error</span>
      </div>
      <div className="flex items-center gap-md">
        <Switch state="disabled" disabled aria-label="Disabled state switch" />
        <span>Disabled</span>
      </div>
      <div className="flex items-center gap-md">
        <Switch state="disabled" checked disabled aria-label="Disabled checked state switch" />
        <span>Disabled Checked</span>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <label className="flex cursor-pointer items-center gap-sm">
        <Switch aria-labelledby="switch-label-1" />
        <span id="switch-label-1">Enable notifications</span>
      </label>
      <label className="flex cursor-pointer items-center gap-sm">
        <Switch checked aria-labelledby="switch-label-2" />
        <span id="switch-label-2">Dark mode enabled</span>
      </label>
      <label className="flex cursor-pointer items-center gap-sm">
        <Switch aria-labelledby="switch-label-3" />
        <span id="switch-label-3">Auto-save documents</span>
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
          <Switch
            checked={checked}
            onCheckedChange={setChecked}
            aria-labelledby="controlled-label"
          />
          <span id="controlled-label">Controlled switch: {checked ? "on" : "off"}</span>
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
          <Switch aria-labelledby="uncontrolled-label" />
          <span id="uncontrolled-label">Uncontrolled switch</span>
        </label>
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-sm">
        <Switch state="error" aria-label="Error switch" aria-invalid="true" />
        <span className="text-destructive">This field has an error</span>
      </div>
      <div className="flex items-center gap-sm">
        <Switch state="error" checked aria-label="Error checked switch" aria-invalid="true" />
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
          switch.
        </p>
        <div className="flex flex-col gap-sm">
          <label className="flex cursor-pointer items-center gap-sm">
            <Switch aria-labelledby="a11y-label-1" />
            <span id="a11y-label-1">Focus this switch and press Space</span>
          </label>
        </div>
      </div>
      <div>
        <h3 className="mb-md text-lg font-semibold">Screen Reader Support</h3>
        <p className="mb-md text-sm text-muted-foreground">
          All switches have proper ARIA attributes for screen readers.
        </p>
        <div className="flex flex-col gap-sm">
          <Switch aria-label="Switch with aria-label" />
          <Switch checked aria-label="Checked switch with aria-label" />
          <Switch disabled aria-label="Disabled switch with aria-label" />
        </div>
      </div>
    </div>
  ),
};
