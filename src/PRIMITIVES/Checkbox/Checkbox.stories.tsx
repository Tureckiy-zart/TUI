"use client";

import { IconCheck } from "@/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Checkbox } from "./Checkbox";

/**
 * Checkbox Storybook Quality Gate
 *
 * @status COMPLETE
 * @date 2025-12-28
 * @task CREATE_CHECKBOX_STORYBOOK_STORIES
 *
 * Quality Gate Requirements:
 * ✅ One axis per story (variant, size, state, indeterminate)
 * ✅ Comparative layout (all variants displayed simultaneously)
 * ✅ Only public API used (no internal imports or Radix usage exposed)
 * ✅ No UX or business scenarios
 * ✅ No navigation or routing logic
 * ✅ All Checkbox variants displayed comparatively
 *
 * Stories Structure:
 * - Default/Checked/Disabled: Basic states
 * - Matrix: 5 variants × 3 sizes grid (REQUIRED per VARIANTS_SIZE_CANON.md)
 * - SizesGallery: All sizes with labels (REQUIRED per VARIANTS_SIZE_CANON.md)
 * - States: All states (default, checked, indeterminate, disabled, error)
 * - AllVariants/AllSizes: Comparative views
 * - Indeterminate: Special indeterminate state demo
 * - WithLabel/Controlled/Uncontrolled: Interactive demos
 * - CustomIcons: Custom icon demonstration
 */

const meta: Meta<typeof Checkbox> = {
  title: "Primitives / Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Checkbox component for binary selection inputs. Supports 5 variants (primary, secondary, outline, ghost, destructive), 3 sizes (sm, md, lg), indeterminate state, keyboard navigation (Space to toggle), and full accessibility with token-driven styling. Foundation Enforcement: className and style props excluded.",
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
        type: { summary: "CheckboxVariant" },
        defaultValue: { summary: "outline" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Checkbox size (canonical interactive scale)",
      table: {
        type: { summary: "CheckboxSize" },
        defaultValue: { summary: "md" },
      },
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether checkbox is checked (controlled)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    indeterminate: {
      control: { type: "boolean" },
      description: "Whether checkbox is in indeterminate state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable checkbox interaction",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    state: {
      control: { type: "select" },
      options: ["default", "checked", "indeterminate", "error", "disabled", "disabledChecked"],
      description: "Checkbox state (derived from props)",
      table: {
        type: { summary: "CheckboxState" },
        defaultValue: { summary: "default" },
      },
    },
    icon: {
      control: false,
      description: "Custom icon to display when checked",
    },
    indeterminateIcon: {
      control: false,
      description: "Custom icon to display when indeterminate",
    },
    "aria-label": {
      control: { type: "text" },
      description: "ARIA label for accessibility",
    },
    "aria-labelledby": {
      control: { type: "text" },
      description: "ARIA labelledby reference",
    },
    "aria-describedby": {
      control: { type: "text" },
      description: "ARIA describedby reference",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

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

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    "aria-label": "Indeterminate checkbox",
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
    const sizes = ["sm", "md", "lg"] as const;

    return (
      <div className="flex flex-col gap-md">
        <div className="grid grid-cols-4 gap-md">
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
                  <Checkbox
                    variant={variant}
                    size={size}
                    checked
                    aria-label={`${variant} ${size} checkbox`}
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
    const sizes = ["sm", "md", "lg"] as const;

    return (
      <div className="flex flex-col gap-lg">
        <div>
          <h3 className="mb-md text-sm font-semibold text-[hsl(var(--tm-text-primary))]/70">
            Unchecked Sizes
          </h3>
          <div className="flex flex-col gap-md">
            {sizes.map((size) => (
              <label key={size} className="flex cursor-pointer items-center gap-md">
                <Checkbox size={size} aria-labelledby={`unchecked-${size}-label`} />
                <span
                  id={`unchecked-${size}-label`}
                  className="text-sm text-[hsl(var(--tm-text-primary))]"
                >
                  {size.toUpperCase()} size checkbox - Accept terms and conditions
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
                <Checkbox size={size} checked aria-labelledby={`checked-${size}-label`} />
                <span
                  id={`checked-${size}-label`}
                  className="text-sm text-[hsl(var(--tm-text-primary))]"
                >
                  {size.toUpperCase()} size checkbox - Terms accepted
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-md text-sm font-semibold text-[hsl(var(--tm-text-primary))]/70">
            Indeterminate Sizes
          </h3>
          <div className="flex flex-col gap-md">
            {sizes.map((size) => (
              <label key={size} className="flex cursor-pointer items-center gap-md">
                <Checkbox
                  size={size}
                  indeterminate
                  aria-labelledby={`indeterminate-${size}-label`}
                />
                <span
                  id={`indeterminate-${size}-label`}
                  className="text-sm text-[hsl(var(--tm-text-primary))]"
                >
                  {size.toUpperCase()} size checkbox - Some items selected
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
        <Checkbox size="sm" aria-label="Small checkbox" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">sm</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Checkbox size="md" aria-label="Medium checkbox" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">md</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Checkbox size="lg" aria-label="Large checkbox" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">lg</span>
      </div>
    </div>
  ),
};

export const AllSizesChecked: Story = {
  render: () => (
    <div className="flex items-center gap-md">
      <div className="flex flex-col items-center gap-sm">
        <Checkbox size="sm" checked aria-label="Small checked checkbox" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">sm</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Checkbox size="md" checked aria-label="Medium checked checkbox" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">md</span>
      </div>
      <div className="flex flex-col items-center gap-sm">
        <Checkbox size="lg" checked aria-label="Large checked checkbox" />
        <span className="text-xs font-medium text-[hsl(var(--tm-text-primary))]">lg</span>
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

export const AllVariantsUnchecked: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md">
        <Checkbox variant="primary" aria-label="Primary checkbox unchecked" />
        <span>Primary</span>
      </div>
      <div className="flex items-center gap-md">
        <Checkbox variant="secondary" aria-label="Secondary checkbox unchecked" />
        <span>Secondary</span>
      </div>
      <div className="flex items-center gap-md">
        <Checkbox variant="outline" aria-label="Outline checkbox unchecked" />
        <span>Outline</span>
      </div>
      <div className="flex items-center gap-md">
        <Checkbox variant="ghost" aria-label="Ghost checkbox unchecked" />
        <span>Ghost</span>
      </div>
      <div className="flex items-center gap-md">
        <Checkbox variant="destructive" aria-label="Destructive checkbox unchecked" />
        <span>Destructive</span>
      </div>
    </div>
  ),
};

/**
 * States Story (Canonical)
 * Demonstrates all internal states across all variants and sizes.
 * States: default, checked, indeterminate, disabled, disabledChecked, error.
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
            <Checkbox variant="primary" aria-label="Primary default state" />
            <span className="text-xs text-[hsl(var(--tm-text-primary))]/60">Default</span>
          </div>
          <div className="flex flex-col items-center gap-sm">
            <Checkbox variant="primary" checked aria-label="Primary checked state" />
            <span className="text-xs text-[hsl(var(--tm-text-primary))]/60">Checked</span>
          </div>
          <div className="flex flex-col items-center gap-sm">
            <Checkbox variant="primary" indeterminate aria-label="Primary indeterminate state" />
            <span className="text-xs text-[hsl(var(--tm-text-primary))]/60">Indeterminate</span>
          </div>
          <div className="flex flex-col items-center gap-sm">
            <Checkbox variant="primary" disabled aria-label="Primary disabled state" />
            <span className="text-xs text-[hsl(var(--tm-text-primary))]/60">Disabled</span>
          </div>
          <div className="flex flex-col items-center gap-sm">
            <Checkbox
              variant="primary"
              checked
              disabled
              aria-label="Primary disabled checked state"
            />
            <span className="text-xs text-[hsl(var(--tm-text-primary))]/60">Disabled Checked</span>
          </div>
          <div className="flex flex-col items-center gap-sm">
            <Checkbox variant="primary" state="error" aria-label="Primary error state" />
            <span className="text-xs text-[hsl(var(--tm-text-primary))]/60">Error</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-md text-sm font-semibold text-[hsl(var(--tm-text-primary))]/70">
          All Sizes × States
        </h3>
        <div className="grid grid-cols-3 gap-md">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col gap-sm">
              <span className="text-xs font-semibold text-[hsl(var(--tm-text-primary))]/80">
                {size}
              </span>
              <Checkbox size={size} aria-label={`${size} default`} />
              <Checkbox size={size} checked aria-label={`${size} checked`} />
              <Checkbox size={size} indeterminate aria-label={`${size} indeterminate`} />
              <Checkbox size={size} disabled aria-label={`${size} disabled`} />
              <Checkbox size={size} checked disabled aria-label={`${size} disabled checked`} />
              <Checkbox size={size} state="error" aria-label={`${size} error`} />
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
        <Checkbox aria-labelledby="checkbox-label-1" />
        <span id="checkbox-label-1">Accept terms and conditions</span>
      </label>
      <label className="flex cursor-pointer items-center gap-sm">
        <Checkbox checked aria-labelledby="checkbox-label-2" />
        <span id="checkbox-label-2">Subscribe to newsletter</span>
      </label>
      <label className="flex cursor-pointer items-center gap-sm">
        <Checkbox indeterminate aria-labelledby="checkbox-label-3" />
        <span id="checkbox-label-3">Some options selected</span>
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
          <Checkbox aria-labelledby="uncontrolled-label" />
          <span id="uncontrolled-label">Uncontrolled checkbox</span>
        </label>
      </div>
    );
  },
};

/**
 * Indeterminate Controlled Story
 * Demonstrates controlled indeterminate state cycling.
 */
export const IndeterminateControlled: Story = {
  render: () => {
    const [state, setState] = React.useState<"unchecked" | "checked" | "indeterminate">(
      "unchecked",
    );

    const handleChange = React.useCallback(() => {
      setState((prev) => {
        if (prev === "unchecked") return "checked";
        if (prev === "checked") return "indeterminate";
        return "unchecked";
      });
    }, []);

    return (
      <div className="flex flex-col gap-md">
        <label className="flex cursor-pointer items-center gap-sm">
          <Checkbox
            checked={state === "checked"}
            indeterminate={state === "indeterminate"}
            onCheckedChange={handleChange}
            aria-labelledby="indeterminate-controlled-label"
          />
          <span id="indeterminate-controlled-label">
            Click to cycle: {state === "unchecked" && "Unchecked"}
            {state === "checked" && "Checked"}
            {state === "indeterminate" && "Indeterminate"}
          </span>
        </label>
      </div>
    );
  },
};

/**
 * Error State Story
 * Demonstrates validation state (form error feedback).
 */
export const Error: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-sm">
        <Checkbox state="error" aria-label="Error checkbox" />
        <span className="text-destructive">This field has an error</span>
      </div>
      <div className="flex items-center gap-sm">
        <Checkbox state="error" checked aria-label="Error checked checkbox" />
        <span className="text-destructive">Error state with checked</span>
      </div>
    </div>
  ),
};

/**
 * Custom Icons Story
 * Demonstrates custom icon and indeterminate icon customization.
 */
export const CustomIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-md text-sm font-semibold text-[hsl(var(--tm-text-primary))]/70">
          Custom Check Icon
        </h3>
        <div className="flex flex-col gap-md">
          <label className="flex cursor-pointer items-center gap-sm">
            <Checkbox
              checked
              icon={<IconCheck className="size-3 text-blue-600" />}
              aria-labelledby="custom-icon-label-1"
            />
            <span id="custom-icon-label-1">Custom blue check icon</span>
          </label>
          <label className="flex cursor-pointer items-center gap-sm">
            <Checkbox
              checked
              icon={<span className="text-lg">✓</span>}
              aria-labelledby="custom-icon-label-2"
            />
            <span id="custom-icon-label-2">Custom text checkmark</span>
          </label>
        </div>
      </div>
      <div>
        <h3 className="mb-md text-sm font-semibold text-[hsl(var(--tm-text-primary))]/70">
          Custom Indeterminate Icon
        </h3>
        <div className="flex flex-col gap-md">
          <label className="flex cursor-pointer items-center gap-sm">
            <Checkbox
              indeterminate
              indeterminateIcon={
                <span className="block h-0.5 w-2 rounded-sm bg-purple-600" aria-hidden="true" />
              }
              aria-labelledby="custom-indeterminate-label-1"
            />
            <span id="custom-indeterminate-label-1">Custom purple indeterminate indicator</span>
          </label>
          <label className="flex cursor-pointer items-center gap-sm">
            <Checkbox
              indeterminate
              indeterminateIcon={<span className="text-lg font-bold">—</span>}
              aria-labelledby="custom-indeterminate-label-2"
            />
            <span id="custom-indeterminate-label-2">Custom text indeterminate</span>
          </label>
        </div>
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
          to toggle the checkbox.
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
        <p className="mb-md text-sm font-medium text-[hsl(var(--tm-text-primary))]/90">
          All checkboxes have proper ARIA attributes for screen readers. Indeterminate state uses
          aria-checked="mixed".
        </p>
        <div className="flex flex-col gap-sm">
          <Checkbox aria-label="Checkbox with aria-label" />
          <Checkbox checked aria-label="Checked checkbox with aria-label" />
          <Checkbox indeterminate aria-label="Indeterminate checkbox with aria-label" />
          <Checkbox disabled aria-label="Disabled checkbox with aria-label" />
        </div>
      </div>
      <div>
        <h3 className="mb-md text-lg font-semibold">ARIA Labelledby</h3>
        <p className="mb-md text-sm font-medium text-[hsl(var(--tm-text-primary))]/90">
          Using aria-labelledby to associate checkbox with label element.
        </p>
        <div className="flex flex-col gap-sm">
          <label className="flex cursor-pointer items-center gap-sm">
            <Checkbox aria-labelledby="a11y-labelledby-1" />
            <span id="a11y-labelledby-1">Checkbox with aria-labelledby</span>
          </label>
        </div>
      </div>
    </div>
  ),
};
