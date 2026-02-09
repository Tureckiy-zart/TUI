"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof Radio> = {
  title: "Primitives / Radio",
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

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-md text-sm font-semibold">Variants - Sizes Matrix</h3>
        <div className="grid grid-cols-6 gap-md">
          <div className="text-xs font-medium">Size →</div>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} className="text-center text-xs font-medium">
              {size}
            </div>
          ))}
          {(["primary", "secondary", "outline", "ghost", "destructive"] as const).map((variant) => (
            <>
              <div key={`${variant}-label`} className="text-xs font-medium capitalize">
                {variant}
              </div>
              {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                <div key={`${variant}-${size}`} className="flex justify-center">
                  <Radio
                    variant={variant}
                    size={size}
                    checked
                    aria-label={`${variant} ${size} radio`}
                  />
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const SizesGallery: Story = {
  render: () => (
    <div className="flex items-center gap-md">
      <div className="flex flex-col items-center gap-sm">
        <Radio size="xs" checked aria-label="Extra small radio" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">xs</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Radio size="sm" checked aria-label="Small radio" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">sm</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Radio size="md" checked aria-label="Medium radio" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">md</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Radio size="lg" checked aria-label="Large radio" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">lg</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Radio size="xl" checked aria-label="Extra large radio" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">xl</span>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-md text-sm font-semibold">
          States Matrix (All Variants - All Sizes - All States)
        </h3>
        <p className="mb-md text-xs text-[hsl(var(--tm-text-primary))]/70">
          Interactive examples: Default states are clickable. Other states (checked, disabled,
          error) are shown for visual reference.
        </p>
        <div className="grid grid-cols-5 gap-md">
          {(["primary", "secondary", "outline", "ghost", "destructive"] as const).map((variant) => (
            <RadioGroup key={variant} defaultValue={`${variant}-xs-default`} orientation="vertical">
              <div className="flex flex-col gap-sm">
                <h4 className="text-xs font-medium capitalize">{variant}</h4>
                {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                  <div key={size} className="flex flex-col gap-xs">
                    <div className="flex items-center gap-xs">
                      <Radio
                        variant={variant}
                        size={size}
                        value={`${variant}-${size}-default`}
                        aria-label={`${variant} ${size} default`}
                      />
                      <span className="text-xs">default</span>
                    </div>
                    <div className="flex items-center gap-xs">
                      <Radio
                        variant={variant}
                        size={size}
                        checked
                        disabled
                        aria-label={`${variant} ${size} checked`}
                      />
                      <span className="text-xs">checked</span>
                    </div>
                    <div className="flex items-center gap-xs">
                      <Radio
                        variant={variant}
                        size={size}
                        disabled
                        aria-label={`${variant} ${size} disabled`}
                      />
                      <span className="text-xs">disabled</span>
                    </div>
                    <div className="flex items-center gap-xs">
                      <Radio
                        variant={variant}
                        size={size}
                        state="error"
                        aria-label={`${variant} ${size} error`}
                      />
                      <span className="text-xs">error</span>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [orientation, setOrientation] = React.useState<"vertical" | "horizontal">("vertical");
    const [controlledValue, setControlledValue] = React.useState("controlled-1");

    return (
      <div className="flex flex-col gap-lg">
        <div>
          <h3 className="mb-md text-sm font-semibold">Orientation</h3>
          <div className="mb-md flex gap-sm">
            <button
              type="button"
              onClick={() => setOrientation("vertical")}
              className={`rounded px-2 py-1 text-xs ${
                orientation === "vertical"
                  ? "bg-[hsl(var(--tm-primary))] text-[hsl(var(--tm-primary-foreground))]"
                  : "bg-[hsl(var(--tm-muted))]"
              }`}
            >
              Vertical
            </button>
            <button
              type="button"
              onClick={() => setOrientation("horizontal")}
              className={`rounded px-2 py-1 text-xs ${
                orientation === "horizontal"
                  ? "bg-[hsl(var(--tm-primary))] text-[hsl(var(--tm-primary-foreground))]"
                  : "bg-[hsl(var(--tm-muted))]"
              }`}
            >
              Horizontal
            </button>
          </div>
          <RadioGroup defaultValue="orientation-1" orientation={orientation}>
            <div className="flex items-center gap-sm">
              <Radio value="orientation-1" aria-labelledby="orientation-label-1" />
              <span id="orientation-label-1">Option 1</span>
            </div>
            <div className="flex items-center gap-sm">
              <Radio value="orientation-2" aria-labelledby="orientation-label-2" />
              <span id="orientation-label-2">Option 2</span>
            </div>
            <div className="flex items-center gap-sm">
              <Radio value="orientation-3" aria-labelledby="orientation-label-3" />
              <span id="orientation-label-3">Option 3</span>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="mb-md text-sm font-semibold">Controlled</h3>
          <RadioGroup value={controlledValue} onValueChange={setControlledValue}>
            <div className="flex items-center gap-sm">
              <Radio value="controlled-1" aria-labelledby="controlled-label-1" />
              <span id="controlled-label-1">
                Option 1 {controlledValue === "controlled-1" && "(selected)"}
              </span>
            </div>
            <div className="flex items-center gap-sm">
              <Radio value="controlled-2" aria-labelledby="controlled-label-2" />
              <span id="controlled-label-2">
                Option 2 {controlledValue === "controlled-2" && "(selected)"}
              </span>
            </div>
            <div className="flex items-center gap-sm">
              <Radio value="controlled-3" aria-labelledby="controlled-label-3" />
              <span id="controlled-label-3">
                Option 3 {controlledValue === "controlled-3" && "(selected)"}
              </span>
            </div>
          </RadioGroup>
          <p className="mt-sm text-xs text-[hsl(var(--tm-text-primary))]/70">
            Selected: {controlledValue}
          </p>
        </div>

        <div>
          <h3 className="mb-md text-sm font-semibold">Uncontrolled</h3>
          <RadioGroup defaultValue="uncontrolled-2">
            <div className="flex items-center gap-sm">
              <Radio value="uncontrolled-1" aria-labelledby="uncontrolled-label-1" />
              <span id="uncontrolled-label-1">Option 1</span>
            </div>
            <div className="flex items-center gap-sm">
              <Radio value="uncontrolled-2" aria-labelledby="uncontrolled-label-2" />
              <span id="uncontrolled-label-2">Option 2 (default)</span>
            </div>
            <div className="flex items-center gap-sm">
              <Radio value="uncontrolled-3" aria-labelledby="uncontrolled-label-3" />
              <span id="uncontrolled-label-3">Option 3</span>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="mb-md text-sm font-semibold">With Label</h3>
          <RadioGroup defaultValue="label-2">
            <label className="flex cursor-pointer items-center gap-sm">
              <Radio value="label-1" aria-labelledby="label-text-1" />
              <span id="label-text-1">Choose option 1</span>
            </label>
            <label className="flex cursor-pointer items-center gap-sm">
              <Radio value="label-2" aria-labelledby="label-text-2" />
              <span id="label-text-2">Choose option 2</span>
            </label>
            <label className="flex cursor-pointer items-center gap-sm">
              <Radio value="label-3" aria-labelledby="label-text-3" />
              <span id="label-text-3">Choose option 3</span>
            </label>
          </RadioGroup>
        </div>

        <div>
          <h3 className="mb-md text-sm font-semibold">With Disabled Item</h3>
          <RadioGroup defaultValue="disabled-group-1">
            <div className="flex items-center gap-sm">
              <Radio value="disabled-group-1" aria-labelledby="disabled-group-label-1" />
              <span id="disabled-group-label-1">Option 1 (enabled)</span>
            </div>
            <div className="flex items-center gap-sm">
              <Radio value="disabled-group-2" disabled aria-labelledby="disabled-group-label-2" />
              <span id="disabled-group-label-2">Option 2 (disabled)</span>
            </div>
            <div className="flex items-center gap-sm">
              <Radio value="disabled-group-3" aria-labelledby="disabled-group-label-3" />
              <span id="disabled-group-label-3">Option 3 (enabled)</span>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="mb-md text-sm font-semibold">Error State</h3>
          <RadioGroup defaultValue="error-1">
            <div className="flex items-center gap-sm">
              <Radio state="error" value="error-1" aria-labelledby="error-label-1" />
              <span id="error-label-1" className="text-[hsl(var(--tm-destructive))]">
                This field has an error
              </span>
            </div>
            <div className="flex items-center gap-sm">
              <Radio state="error" checked value="error-2" aria-labelledby="error-label-2" />
              <span id="error-label-2" className="text-[hsl(var(--tm-destructive))]">
                Error state with checked
              </span>
            </div>
          </RadioGroup>
        </div>
      </div>
    );
  },
};

export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-md text-lg font-semibold">Keyboard Navigation</h3>
        <p className="mb-md text-sm font-medium text-[hsl(var(--tm-text-primary))]/90">
          Use <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 text-xs">ArrowUp</kbd> /{" "}
          <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 text-xs">ArrowDown</kbd> to
          navigate between options in vertical groups.
        </p>
        <p className="mb-md text-sm font-medium text-[hsl(var(--tm-text-primary))]/90">
          Use <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 text-xs">ArrowLeft</kbd>{" "}
          / <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 text-xs">ArrowRight</kbd>{" "}
          in horizontal groups.
        </p>
        <p className="mb-md text-sm font-medium text-[hsl(var(--tm-text-primary))]/90">
          Press <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 text-xs">Space</kbd>{" "}
          to select the focused radio.
        </p>
        <RadioGroup defaultValue="kb-1" orientation="vertical">
          <div className="flex items-center gap-sm">
            <Radio value="kb-1" aria-labelledby="kb-label-1" />
            <span id="kb-label-1">Option 1 - Focus here and use arrow keys</span>
          </div>
          <div className="flex items-center gap-sm">
            <Radio value="kb-2" aria-labelledby="kb-label-2" />
            <span id="kb-label-2">Option 2</span>
          </div>
          <div className="flex items-center gap-sm">
            <Radio value="kb-3" aria-labelledby="kb-label-3" />
            <span id="kb-label-3">Option 3</span>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-md text-lg font-semibold">Screen Reader Support</h3>
        <p className="mb-md text-sm font-medium text-[hsl(var(--tm-text-primary))]/90">
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
        <h3 className="mb-md text-lg font-semibold">With Visible Labels</h3>
        <p className="mb-md text-sm font-medium text-[hsl(var(--tm-text-primary))]/90">
          Use aria-labelledby to associate radios with visible labels.
        </p>
        <RadioGroup defaultValue="a11y-label-1">
          <div className="flex items-center gap-sm">
            <Radio value="a11y-label-1" aria-labelledby="a11y-visible-label-1" />
            <span id="a11y-visible-label-1">Radio with visible label</span>
          </div>
          <div className="flex items-center gap-sm">
            <Radio value="a11y-label-2" aria-labelledby="a11y-visible-label-2" />
            <span id="a11y-visible-label-2">Another radio with visible label</span>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};
