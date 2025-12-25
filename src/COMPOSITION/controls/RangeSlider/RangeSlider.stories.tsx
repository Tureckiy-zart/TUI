import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { RangeSlider } from "./RangeSlider";

const meta: Meta<typeof RangeSlider> = {
  title: "Controls/RangeSlider",
  component: RangeSlider,
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
      description: "Whether the range slider is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

/**
 * Default RangeSlider
 * Basic usage with default props
 */
export const Default: Story = {
  args: {
    defaultValue: [25, 75],
    min: 0,
    max: 100,
    step: 1,
    variant: "primary",
    size: "md",
    "aria-label": "Price range",
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
                <RangeSlider
                  variant={variant}
                  size={size}
                  defaultValue={[25, 75]}
                  aria-label={`${variant} ${size} range slider`}
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
                      <RangeSlider
                        variant={variant}
                        size={size}
                        defaultValue={[25, 75]}
                        aria-label={`${variant} ${size} ${state.name} range slider`}
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
                <RangeSlider
                  size={size}
                  variant="primary"
                  defaultValue={[25, 75]}
                  aria-label={`${size} range slider`}
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
 * Use Case: Price Range Filter
 * Range slider for min-max price selection
 */
export const PriceRangeFilter: Story = {
  render: () => {
    const [priceRange, setPriceRange] = React.useState<[number, number]>([100, 500]);

    return (
      <div className="max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Price Range</label>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <RangeSlider
          variant="primary"
          size="md"
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={1000}
          step={10}
          aria-label="Price range filter"
        />
      </div>
    );
  },
};

/**
 * Use Case: Date Range Selection
 * Range slider for selecting a date range (represented as days)
 */
export const DateRangeSelection: Story = {
  render: () => {
    const [dateRange, setDateRange] = React.useState<[number, number]>([7, 30]);

    return (
      <div className="max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Date Range</label>
          <span className="text-sm text-muted-foreground">
            {dateRange[0]} - {dateRange[1]} days
          </span>
        </div>
        <RangeSlider
          variant="secondary"
          size="md"
          value={dateRange}
          onValueChange={setDateRange}
          min={1}
          max={90}
          step={1}
          aria-label="Date range selection"
        />
      </div>
    );
  },
};

/**
 * Use Case: Temperature Range
 * Range slider for temperature min-max selection
 */
export const TemperatureRange: Story = {
  render: () => {
    const [tempRange, setTempRange] = React.useState<[number, number]>([18, 24]);

    return (
      <div className="max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Temperature Range</label>
          <span className="text-sm text-muted-foreground">
            {tempRange[0]}°C - {tempRange[1]}°C
          </span>
        </div>
        <RangeSlider
          variant="outline"
          size="lg"
          value={tempRange}
          onValueChange={setTempRange}
          min={10}
          max={30}
          step={1}
          aria-label="Temperature range"
        />
      </div>
    );
  },
};

/**
 * Use Case: Age Range Filter
 * Range slider for age filtering
 */
export const AgeRangeFilter: Story = {
  render: () => {
    const [ageRange, setAgeRange] = React.useState<[number, number]>([18, 65]);

    return (
      <div className="max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Age Range</label>
          <span className="text-sm text-muted-foreground">
            {ageRange[0]} - {ageRange[1]} years
          </span>
        </div>
        <RangeSlider
          variant="primary"
          size="md"
          value={ageRange}
          onValueChange={setAgeRange}
          min={0}
          max={100}
          step={1}
          aria-label="Age range filter"
        />
      </div>
    );
  },
};

/**
 * Use Case: Disabled State
 * Demonstrates disabled range slider behavior
 */
export const DisabledState: Story = {
  args: {
    defaultValue: [25, 75],
    min: 0,
    max: 100,
    variant: "primary",
    size: "md",
    disabled: true,
    "aria-label": "Disabled range slider",
  },
};
