"use client";

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Primitives / Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Foundation switch component for binary toggle inputs. Supports 5 variants (InteractiveVariant), 5 sizes (GlobalSize subset), derived states (base, checked, disabled, invalid), keyboard navigation (Space to toggle), and full accessibility with token-driven styling. Foundation Enforcement: className and style props excluded.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
      description: "Switch variant style (InteractiveVariant)",
      table: {
        type: { summary: "SwitchVariant" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Switch size (GlobalSize subset)",
      table: {
        type: { summary: "SwitchSize" },
        defaultValue: { summary: "md" },
      },
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether switch is checked (controlled)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable switch interaction",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    invalid: {
      control: { type: "boolean" },
      description: "Mark switch as invalid (form validation)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
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

/**
 * Matrix Story (Canonical - REQUIRED)
 * Demonstrates all variants × all sizes grid.
 * Required by VARIANTS_SIZE_CANON.md for components with both variant and size props.
 */
export const Matrix: Story = {
  render: () => {
    const variants = ["primary", "secondary", "outline", "ghost", "destructive"] as const;
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

    return (
      <div className="flex flex-col gap-md">
        <div className="grid grid-cols-6 gap-md">
          <div /> {/* Empty corner */}
          {sizes.map((size) => (
            <div key={size} className="flex items-center justify-center">
              <span className="text-xs font-semibold text-[hsl(var(--tm-text-primary))]/80">
                {size}
              </span>
            </div>
          ))}
          {variants.map((variant) => (
            <React.Fragment key={variant}>
              <div className="flex items-center">
                <span className="text-xs font-semibold text-[hsl(var(--tm-text-primary))]/80">
                  {variant}
                </span>
              </div>
              {sizes.map((size) => (
                <div key={size} className="flex items-center justify-center">
                  <Switch
                    variant={variant}
                    size={size}
                    checked
                    aria-label={`${variant} ${size} switch`}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * SizesGallery Story (Canonical - REQUIRED)
 * Demonstrates all sizes with labels and realistic content.
 * Required by VARIANTS_SIZE_CANON.md for components with size prop.
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

    return (
      <div className="flex flex-col gap-lg">
        <div>
          <h3 className="mb-md text-sm font-semibold text-[hsl(var(--tm-text-primary))]/70">
            Unchecked Sizes
          </h3>
          <div className="flex flex-col gap-md">
            {sizes.map((size) => (
              <label key={size} className="flex cursor-pointer items-center gap-md">
                <Switch size={size} aria-labelledby={`unchecked-${size}-label`} />
                <span
                  id={`unchecked-${size}-label`}
                  className="text-sm text-[hsl(var(--tm-text-primary))]"
                >
                  {size.toUpperCase()} size switch - Enable notifications
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-md text-sm font-semibold text-[hsl(var(--tm-text-primary))]/70">
            Checked Sizes
          </h3>
          <div className="flex flex-col gap-md">
            {sizes.map((size) => (
              <label key={size} className="flex cursor-pointer items-center gap-md">
                <Switch size={size} checked aria-labelledby={`checked-${size}-label`} />
                <span
                  id={`checked-${size}-label`}
                  className="text-sm text-[hsl(var(--tm-text-primary))]"
                >
                  {size.toUpperCase()} size switch - Notifications enabled
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-md">
      <div className="flex flex-col items-center gap-sm">
        <Switch size="xs" aria-label="Extra small switch" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">xs</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="sm" aria-label="Small switch" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">sm</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="md" aria-label="Medium switch" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">md</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="lg" aria-label="Large switch" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">lg</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="xl" aria-label="Extra large switch" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">xl</span>
      </div>
    </div>
  ),
};

export const AllSizesChecked: Story = {
  render: () => (
    <div className="flex items-center gap-md">
      <div className="flex flex-col items-center gap-sm">
        <Switch size="xs" checked aria-label="Extra small checked switch" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">xs</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="sm" checked aria-label="Small checked switch" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">sm</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="md" checked aria-label="Medium checked switch" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">md</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="lg" checked aria-label="Large checked switch" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">lg</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Switch size="xl" checked aria-label="Extra large checked switch" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">xl</span>
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

/**
 * States Story (Canonical)
 * Demonstrates all internal states across all variants and sizes.
 * States: base (default), checked, disabled, disabledChecked, invalid.
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-md text-sm font-semibold text-[hsl(var(--tm-text-primary))]/70">
          Primary Variant
        </h3>
        <div className="flex flex-wrap gap-md">
          <div className="flex flex-col items-center gap-sm">
            <Switch variant="primary" aria-label="Primary base state" />
            <span className="text-xs text-[hsl(var(--tm-text-primary))]/60">Base</span>
          </div>
          <div className="flex flex-col items-center gap-sm">
            <Switch variant="primary" checked aria-label="Primary checked state" />
            <span className="text-xs text-[hsl(var(--tm-text-primary))]/60">Checked</span>
          </div>
          <div className="flex flex-col items-center gap-sm">
            <Switch variant="primary" disabled aria-label="Primary disabled state" />
            <span className="text-xs text-[hsl(var(--tm-text-primary))]/60">Disabled</span>
          </div>
          <div className="flex flex-col items-center gap-sm">
            <Switch
              variant="primary"
              checked
              disabled
              aria-label="Primary disabled checked state"
            />
            <span className="text-xs text-[hsl(var(--tm-text-primary))]/60">Disabled Checked</span>
          </div>
          <div className="flex flex-col items-center gap-sm">
            <Switch variant="primary" invalid aria-label="Primary invalid state" />
            <span className="text-xs text-[hsl(var(--tm-text-primary))]/60">Invalid</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-md text-sm font-semibold text-[hsl(var(--tm-text-primary))]/70">
          All Sizes × States
        </h3>
        <div className="grid grid-cols-5 gap-md">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} className="flex flex-col gap-sm">
              <span className="text-xs font-semibold text-[hsl(var(--tm-text-primary))]/80">
                {size}
              </span>
              <Switch size={size} aria-label={`${size} base`} />
              <Switch size={size} checked aria-label={`${size} checked`} />
              <Switch size={size} disabled aria-label={`${size} disabled`} />
              <Switch size={size} checked disabled aria-label={`${size} disabled checked`} />
              <Switch size={size} invalid aria-label={`${size} invalid`} />
            </div>
          ))}
        </div>
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

/**
 * Invalid State Story
 * Demonstrates validation state (form error feedback).
 */
export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-sm">
        <Switch invalid aria-label="Invalid switch" />
        <span className="text-destructive">This field has an error</span>
      </div>
      <div className="flex items-center gap-sm">
        <Switch invalid checked aria-label="Invalid checked switch" />
        <span className="text-destructive">Invalid state with checked</span>
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-md text-lg font-semibold">Keyboard Navigation</h3>
        <p className="mb-md text-sm font-medium text-[hsl(var(--tm-text-primary))]/90">
          Press <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 text-xs">Space</kbd>{" "}
          to toggle the switch.
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
        <p className="mb-md text-sm font-medium text-[hsl(var(--tm-text-primary))]/90">
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
