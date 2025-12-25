import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Controls/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    min: {
      control: "number",
      description: "Minimum value",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    step: {
      control: "number",
      description: "Step increment",
    },
    disabled: {
      control: "boolean",
      description: "Whether the slider is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

/**
 * Default Slider
 * Basic usage with default props
 */
export const Default: Story = {
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    variant: "primary",
    size: "md",
    "aria-label": "Volume",
  },
};

/**
 * Matrix Story
 * Demonstrates all variant × size combinations (3 variants × 3 sizes = 9 combinations)
 * REQUIRED: Component has BOTH size AND variant props
 */
export const Matrix: Story = {
  render: () => {
    const variants: Array<"primary" | "secondary" | "outline"> = [
      "primary",
      "secondary",
      "outline",
    ];
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    return (
      <div className="space-y-8">
        {/* Header row */}
        <div className="grid grid-cols-4 gap-4 text-sm font-medium">
          <div></div>
          {sizes.map((size) => (
            <div key={size} className="text-center">
              {size}
            </div>
          ))}
        </div>

        {/* Variant rows */}
        {variants.map((variant) => (
          <div key={variant} className="grid grid-cols-4 items-center gap-4">
            <div className="text-sm font-medium">{variant}</div>
            {sizes.map((size) => (
              <div key={`${variant}-${size}`} className="w-full">
                <Slider
                  variant={variant}
                  size={size}
                  defaultValue={50}
                  aria-label={`${variant} ${size} slider`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

/**
 * States Story
 * Demonstrates all states (default, disabled) for each variant and size
 * REQUIRED: Component has public state props (disabled)
 */
export const States: Story = {
  render: () => {
    const variants: Array<"primary" | "secondary" | "outline"> = [
      "primary",
      "secondary",
      "outline",
    ];
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
    const states = [
      { name: "Default", props: {} },
      { name: "Disabled", props: { disabled: true } },
    ];

    return (
      <div className="space-y-8">
        {variants.map((variant) => (
          <div key={variant} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize">{variant}</h3>
            {sizes.map((size) => (
              <div key={size} className="space-y-2">
                <div className="text-sm font-medium">{size}</div>
                <div className="flex items-center gap-4">
                  {states.map((state) => (
                    <div key={state.name} className="flex-1 space-y-1">
                      <div className="text-xs text-muted-foreground">{state.name}</div>
                      <Slider
                        variant={variant}
                        size={size}
                        defaultValue={50}
                        aria-label={`${variant} ${size} ${state.name} slider`}
                        {...state.props}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Sizes Gallery
 * Demonstrates all supported sizes with consistent content
 * REQUIRED: Component has size prop
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Size Comparison</h3>
          <div className="space-y-6">
            {sizes.map((size) => (
              <div key={size} className="space-y-2">
                <div className="text-sm font-medium">{size}</div>
                <Slider
                  size={size}
                  variant="primary"
                  defaultValue={50}
                  aria-label={`${size} slider`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Use Case: Volume Control
 * Single value slider for volume adjustment
 */
export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = React.useState(75);

    return (
      <div className="max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Volume</label>
          <span className="text-sm text-muted-foreground">{volume}%</span>
        </div>
        <Slider
          variant="primary"
          size="md"
          value={volume}
          onValueChange={setVolume}
          min={0}
          max={100}
          step={1}
          aria-label="Volume control"
        />
      </div>
    );
  },
};

/**
 * Use Case: Price Filter
 * Single value slider for maximum price selection
 */
export const PriceFilter: Story = {
  render: () => {
    const [maxPrice, setMaxPrice] = React.useState(500);

    return (
      <div className="max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Maximum Price</label>
          <span className="text-sm text-muted-foreground">${maxPrice}</span>
        </div>
        <Slider
          variant="secondary"
          size="md"
          value={maxPrice}
          onValueChange={setMaxPrice}
          min={0}
          max={1000}
          step={10}
          aria-label="Maximum price filter"
        />
      </div>
    );
  },
};

/**
 * Use Case: Brightness Control
 * Slider with small step increments for fine control
 */
export const BrightnessControl: Story = {
  render: () => {
    const [brightness, setBrightness] = React.useState(50);

    return (
      <div className="max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Brightness</label>
          <span className="text-sm text-muted-foreground">{brightness}%</span>
        </div>
        <Slider
          variant="outline"
          size="lg"
          value={brightness}
          onValueChange={setBrightness}
          min={0}
          max={100}
          step={5}
          aria-label="Brightness control"
        />
      </div>
    );
  },
};

/**
 * Use Case: Disabled State
 * Demonstrates disabled slider behavior
 */
export const DisabledState: Story = {
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    variant: "primary",
    size: "md",
    disabled: true,
    "aria-label": "Disabled slider",
  },
};
