"use client";

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Radio, RadioGroup } from "./index";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radio component for form inputs. Supports 5 variants, 5 sizes, multiple states (default, checked, disabled, error), keyboard navigation (Space to select, ArrowUp/ArrowDown in groups), and full accessibility with token-driven styling using CSS variables. Use within RadioGroup for group behavior.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
      description: "Radio variant style",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "outline" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Radio size",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    state: {
      control: { type: "select" },
      options: ["default", "checked", "disabled", "error"],
      description: "Radio state",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether radio is checked (controlled)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable radio interaction",
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
    "aria-label": "Default radio",
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    "aria-label": "Checked radio",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    "aria-label": "Disabled radio",
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    "aria-label": "Disabled checked radio",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-md">
      <div className="flex flex-col items-center gap-sm">
        <Radio size="xs" checked aria-label="Extra small radio" />
        <span className="text-xs text-muted-foreground">xs</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Radio size="sm" checked aria-label="Small radio" />
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Radio size="md" checked aria-label="Medium radio" />
        <span className="text-xs text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Radio size="lg" checked aria-label="Large radio" />
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Radio size="xl" checked aria-label="Extra large radio" />
        <span className="text-xs text-muted-foreground">xl</span>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md">
        <Radio variant="primary" checked aria-label="Primary radio" />
        <span>Primary</span>
      </div>
      <div className="flex items-center gap-md">
        <Radio variant="secondary" checked aria-label="Secondary radio" />
        <span>Secondary</span>
      </div>
      <div className="flex items-center gap-md">
        <Radio variant="outline" checked aria-label="Outline radio" />
        <span>Outline</span>
      </div>
      <div className="flex items-center gap-md">
        <Radio variant="ghost" checked aria-label="Ghost radio" />
        <span>Ghost</span>
      </div>
      <div className="flex items-center gap-md">
        <Radio variant="destructive" checked aria-label="Destructive radio" />
        <span>Destructive</span>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md">
        <Radio state="default" aria-label="Default state radio" />
        <span>Default</span>
      </div>
      <div className="flex items-center gap-md">
        <Radio state="checked" checked aria-label="Checked state radio" />
        <span>Checked</span>
      </div>
      <div className="flex items-center gap-md">
        <Radio state="error" aria-label="Error state radio" />
        <span>Error</span>
      </div>
      <div className="flex items-center gap-md">
        <Radio state="disabled" disabled aria-label="Disabled state radio" />
        <span>Disabled</span>
      </div>
    </div>
  ),
};

export const RadioGroupBasic: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center gap-sm">
        <Radio value="option1" aria-labelledby="radio-label-1" />
        <span id="radio-label-1">Option 1</span>
      </div>
      <div className="flex items-center gap-sm">
        <Radio value="option2" aria-labelledby="radio-label-2" />
        <span id="radio-label-2">Option 2</span>
      </div>
      <div className="flex items-center gap-sm">
        <Radio value="option3" aria-labelledby="radio-label-3" />
        <span id="radio-label-3">Option 3</span>
      </div>
    </RadioGroup>
  ),
};

export const RadioGroupVertical: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" orientation="vertical">
      <div className="flex items-center gap-sm">
        <Radio value="option1" aria-labelledby="vertical-label-1" />
        <span id="vertical-label-1">Option 1</span>
      </div>
      <div className="flex items-center gap-sm">
        <Radio value="option2" aria-labelledby="vertical-label-2" />
        <span id="vertical-label-2">Option 2</span>
      </div>
      <div className="flex items-center gap-sm">
        <Radio value="option3" aria-labelledby="vertical-label-3" />
        <span id="vertical-label-3">Option 3</span>
      </div>
    </RadioGroup>
  ),
};

export const RadioGroupHorizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" orientation="horizontal">
      <div className="flex items-center gap-sm">
        <Radio value="option1" aria-labelledby="horizontal-label-1" />
        <span id="horizontal-label-1">Option 1</span>
      </div>
      <div className="flex items-center gap-sm">
        <Radio value="option2" aria-labelledby="horizontal-label-2" />
        <span id="horizontal-label-2">Option 2</span>
      </div>
      <div className="flex items-center gap-sm">
        <Radio value="option3" aria-labelledby="horizontal-label-3" />
        <span id="horizontal-label-3">Option 3</span>
      </div>
    </RadioGroup>
  ),
};

export const RadioGroupSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-md text-sm font-semibold">Small</h3>
        <RadioGroup defaultValue="small-1" size="sm">
          <div className="flex items-center gap-sm">
            <Radio value="small-1" aria-labelledby="small-label-1" />
            <span id="small-label-1">Option 1</span>
          </div>
          <div className="flex items-center gap-sm">
            <Radio value="small-2" aria-labelledby="small-label-2" />
            <span id="small-label-2">Option 2</span>
          </div>
        </RadioGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-semibold">Medium (default)</h3>
        <RadioGroup defaultValue="medium-1" size="md">
          <div className="flex items-center gap-sm">
            <Radio value="medium-1" aria-labelledby="medium-label-1" />
            <span id="medium-label-1">Option 1</span>
          </div>
          <div className="flex items-center gap-sm">
            <Radio value="medium-2" aria-labelledby="medium-label-2" />
            <span id="medium-label-2">Option 2</span>
          </div>
        </RadioGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-semibold">Large</h3>
        <RadioGroup defaultValue="large-1" size="lg">
          <div className="flex items-center gap-sm">
            <Radio value="large-1" aria-labelledby="large-label-1" />
            <span id="large-label-1">Option 1</span>
          </div>
          <div className="flex items-center gap-sm">
            <Radio value="large-2" aria-labelledby="large-label-2" />
            <span id="large-label-2">Option 2</span>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <label className="flex cursor-pointer items-center gap-sm">
        <Radio aria-labelledby="label-1" />
        <span id="label-1">Choose option 1</span>
      </label>
      <label className="flex cursor-pointer items-center gap-sm">
        <Radio checked aria-labelledby="label-2" />
        <span id="label-2">Choose option 2</span>
      </label>
      <label className="flex cursor-pointer items-center gap-sm">
        <Radio aria-labelledby="label-3" />
        <span id="label-3">Choose option 3</span>
      </label>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("option1");
    return (
      <div className="flex flex-col gap-md">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center gap-sm">
            <Radio value="option1" aria-labelledby="controlled-label-1" />
            <span id="controlled-label-1">
              Option 1 (Current: {value === "option1" ? "✓" : ""})
            </span>
          </div>
          <div className="flex items-center gap-sm">
            <Radio value="option2" aria-labelledby="controlled-label-2" />
            <span id="controlled-label-2">
              Option 2 (Current: {value === "option2" ? "✓" : ""})
            </span>
          </div>
          <div className="flex items-center gap-sm">
            <Radio value="option3" aria-labelledby="controlled-label-3" />
            <span id="controlled-label-3">
              Option 3 (Current: {value === "option3" ? "✓" : ""})
            </span>
          </div>
        </RadioGroup>
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-md">
        <RadioGroup defaultValue="option2">
          <div className="flex items-center gap-sm">
            <Radio value="option1" aria-labelledby="uncontrolled-label-1" />
            <span id="uncontrolled-label-1">Option 1</span>
          </div>
          <div className="flex items-center gap-sm">
            <Radio value="option2" aria-labelledby="uncontrolled-label-2" />
            <span id="uncontrolled-label-2">Option 2 (default)</span>
          </div>
          <div className="flex items-center gap-sm">
            <Radio value="option3" aria-labelledby="uncontrolled-label-3" />
            <span id="uncontrolled-label-3">Option 3</span>
          </div>
        </RadioGroup>
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <RadioGroup>
        <div className="flex items-center gap-sm">
          <Radio state="error" value="option1" aria-labelledby="error-label-1" />
          <span id="error-label-1" className="text-destructive">
            This field has an error
          </span>
        </div>
        <div className="flex items-center gap-sm">
          <Radio state="error" checked value="option2" aria-labelledby="error-label-2" />
          <span id="error-label-2" className="text-destructive">
            Error state with checked
          </span>
        </div>
      </RadioGroup>
    </div>
  ),
};

export const DisabledInGroup: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center gap-sm">
        <Radio value="option1" aria-labelledby="disabled-label-1" />
        <span id="disabled-label-1">Option 1 (enabled)</span>
      </div>
      <div className="flex items-center gap-sm">
        <Radio value="option2" disabled aria-labelledby="disabled-label-2" />
        <span id="disabled-label-2">Option 2 (disabled)</span>
      </div>
      <div className="flex items-center gap-sm">
        <Radio value="option3" aria-labelledby="disabled-label-3" />
        <span id="disabled-label-3">Option 3 (enabled)</span>
      </div>
    </RadioGroup>
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-md text-lg font-semibold">Keyboard Navigation in RadioGroup</h3>
        <p className="mb-md text-sm text-muted-foreground">
          Use <kbd className="rounded bg-muted px-1 py-0.5 text-xs">ArrowUp</kbd> /{" "}
          <kbd className="rounded bg-muted px-1 py-0.5 text-xs">ArrowDown</kbd> to navigate between
          options in vertical groups.
        </p>
        <p className="mb-md text-sm text-muted-foreground">
          Use <kbd className="rounded bg-muted px-1 py-0.5 text-xs">ArrowLeft</kbd> /{" "}
          <kbd className="rounded bg-muted px-1 py-0.5 text-xs">ArrowRight</kbd> in horizontal
          groups.
        </p>
        <p className="mb-md text-sm text-muted-foreground">
          Press <kbd className="rounded bg-muted px-1 py-0.5 text-xs">Space</kbd> to select the
          focused radio.
        </p>
        <RadioGroup defaultValue="option1" orientation="vertical">
          <div className="flex items-center gap-sm">
            <Radio value="option1" aria-labelledby="kb-label-1" />
            <span id="kb-label-1">Option 1 - Focus here and use arrow keys</span>
          </div>
          <div className="flex items-center gap-sm">
            <Radio value="option2" aria-labelledby="kb-label-2" />
            <span id="kb-label-2">Option 2</span>
          </div>
          <div className="flex items-center gap-sm">
            <Radio value="option3" aria-labelledby="kb-label-3" />
            <span id="kb-label-3">Option 3</span>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-md text-lg font-semibold">Screen Reader Support</h3>
        <p className="mb-md text-sm text-muted-foreground">
          All radios have proper ARIA attributes for screen readers. Use aria-label or
          aria-labelledby for labels.
        </p>
        <RadioGroup defaultValue="a11y-1">
          <Radio value="a11y-1" aria-label="Radio with aria-label" />
          <Radio value="a11y-2" aria-label="Another radio with aria-label" />
          <Radio value="a11y-3" aria-label="Third radio with aria-label" />
        </RadioGroup>
      </div>
      <div>
        <h3 className="mb-md text-lg font-semibold">With Labels</h3>
        <p className="mb-md text-sm text-muted-foreground">
          Use aria-labelledby to associate radios with visible labels.
        </p>
        <RadioGroup defaultValue="label-1">
          <div className="flex items-center gap-sm">
            <Radio value="label-1" aria-labelledby="a11y-label-1" />
            <span id="a11y-label-1">Radio with visible label</span>
          </div>
          <div className="flex items-center gap-sm">
            <Radio value="label-2" aria-labelledby="a11y-label-2" />
            <span id="a11y-label-2">Another radio with visible label</span>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};
