"use client";

/**
 * MultiSelect Storybook Stories
 *
 * Demonstrates all features and usage patterns of MultiSelect component.
 * Stories follow Storybook Stories Quality Standard.
 */

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { X } from "lucide-react";
import { MultiSelect } from "./MultiSelect";
import type { MultiSelectOption } from "./MultiSelect";

// ============================================================================
// META
// ============================================================================

/**
 * MultiSelect component meta configuration
 */
const meta: Meta<typeof MultiSelect> = {
  title: "UI / Composition / Controls / MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Multi-selection dropdown control with tag-based selection visualization. Composes Foundation Select and Checkbox with multiple value management and removable tags.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: false,
      description: "Selected values (controlled mode)",
      table: {
        type: { summary: "string[]" },
      },
    },
    defaultValue: {
      control: false,
      description: "Default selected values (uncontrolled mode)",
      table: {
        type: { summary: "string[]" },
      },
    },
    onValueChange: {
      control: false,
      description: "Callback when selection changes",
      table: {
        type: { summary: "(value: string[]) => void" },
      },
    },
    options: {
      control: false,
      description: "Options to display in dropdown",
      table: {
        type: { summary: "MultiSelectOption[]" },
      },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no items selected",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Select options..."' },
      },
    },
    maxTags: {
      control: "number",
      description: "Maximum number of tags to show in trigger",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined (show all)" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the component",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: '"md"' },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the component is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for the component",
      table: {
        type: { summary: "string" },
      },
    },
    "aria-labelledby": {
      control: "text",
      description: "ID of the element that labels this component",
      table: {
        type: { summary: "string" },
      },
    },
    renderTag: {
      control: false,
      description: "Custom render function for tags",
      table: {
        type: { summary: "(option: MultiSelectOption, onRemove: () => void) => React.ReactNode" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const withFixedWidth = (StoryComponent: React.FC) => (
  <div className="w-full max-w-sm">
    <StoryComponent />
  </div>
);

// ============================================================================
// SHARED OPTIONS
// ============================================================================

const fruits: MultiSelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape" },
];

const longOptionsList: MultiSelectOption[] = [
  { value: "opt1", label: "Option 1" },
  { value: "opt2", label: "Option 2" },
  { value: "opt3", label: "Option 3" },
  { value: "opt4", label: "Option 4" },
  { value: "opt5", label: "Option 5" },
  { value: "opt6", label: "Option 6" },
  { value: "opt7", label: "Option 7" },
  { value: "opt8", label: "Option 8" },
  { value: "opt9", label: "Option 9" },
  { value: "opt10", label: "Option 10" },
  { value: "opt11", label: "Option 11" },
  { value: "opt12", label: "Option 12" },
  { value: "opt13", label: "Option 13" },
  { value: "opt14", label: "Option 14" },
  { value: "opt15", label: "Option 15" },
  { value: "opt16", label: "Option 16" },
  { value: "opt17", label: "Option 17" },
  { value: "opt18", label: "Option 18" },
  { value: "opt19", label: "Option 19" },
  { value: "opt20", label: "Option 20" },
];

// ============================================================================
// CANONICAL STORIES
// ============================================================================

/**
 * Default MultiSelect story
 * Demonstrates basic usage with uncontrolled mode
 */
export const Default: Story = {
  args: {
    options: fruits,
    placeholder: "Select fruits...",
    "aria-label": "Fruit selector",
  },
  decorators: [withFixedWidth],
};

/**
 * SizesGallery story
 * Demonstrates all supported sizes (sm, md, lg)
 */
export const SizesGallery: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div className="w-full max-w-sm">
        <h3 className="mb-sm text-sm font-semibold">Size: sm</h3>
        <MultiSelect
          options={fruits}
          defaultValue={["apple", "banana"]}
          size="sm"
          placeholder="Small size"
          aria-label="Small multi-select"
        />
      </div>
      <div className="w-full max-w-sm">
        <h3 className="mb-sm text-sm font-semibold">Size: md (default)</h3>
        <MultiSelect
          options={fruits}
          defaultValue={["apple", "banana"]}
          size="md"
          placeholder="Medium size"
          aria-label="Medium multi-select"
        />
      </div>
      <div className="w-full max-w-sm">
        <h3 className="mb-sm text-sm font-semibold">Size: lg</h3>
        <MultiSelect
          options={fruits}
          defaultValue={["apple", "banana"]}
          size="lg"
          placeholder="Large size"
          aria-label="Large multi-select"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates all supported sizes (sm, md, lg) with pre-selected values.",
      },
    },
  },
};

/**
 * States story
 * Demonstrates component states (empty, selected, disabled)
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div className="w-full max-w-sm">
        <h3 className="mb-sm text-sm font-semibold">Empty (no selection)</h3>
        <MultiSelect
          options={fruits}
          placeholder="Select fruits..."
          aria-label="Empty multi-select"
        />
      </div>
      <div className="w-full max-w-sm">
        <h3 className="mb-sm text-sm font-semibold">With selection</h3>
        <MultiSelect
          options={fruits}
          defaultValue={["apple", "banana", "cherry"]}
          placeholder="Select fruits..."
          aria-label="Multi-select with selection"
        />
      </div>
      <div className="w-full max-w-sm">
        <h3 className="mb-sm text-sm font-semibold">Disabled</h3>
        <MultiSelect
          options={fruits}
          defaultValue={["apple", "banana"]}
          disabled
          placeholder="Select fruits..."
          aria-label="Disabled multi-select"
        />
      </div>
      <div className="w-full max-w-sm">
        <h3 className="mb-sm text-sm font-semibold">Disabled (empty)</h3>
        <MultiSelect
          options={fruits}
          disabled
          placeholder="Select fruits..."
          aria-label="Disabled empty multi-select"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates component states: empty, with selection, disabled with selection, disabled empty.",
      },
    },
  },
};

/**
 * LongContent story
 * Demonstrates long option list with scrolling
 */
export const LongContent: Story = {
  args: {
    options: longOptionsList,
    placeholder: "Select options...",
    "aria-label": "Long content multi-select",
  },
  decorators: [withFixedWidth],
  parameters: {
    docs: {
      description: {
        story: "Demonstrates long option list with scrollable dropdown (20 options).",
      },
    },
  },
};

// ============================================================================
// USE CASE STORIES
// ============================================================================

/**
 * ControlledMode story
 * Demonstrates controlled mode with external state management
 */
export const ControlledMode: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(["apple", "banana"]);
    return (
      <div className="w-full max-w-sm">
        <MultiSelect
          options={fruits}
          value={selected}
          onValueChange={setSelected}
          placeholder="Select fruits..."
          aria-label="Controlled multi-select"
        />
        <div className="mt-md text-sm text-[hsl(var(--tm-text-muted))]">
          Selected: {selected.length > 0 ? selected.join(", ") : "None"}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled mode with external state management. Shows selected values below.",
      },
    },
  },
};

/**
 * WithManySelected story
 * Demonstrates many selected values with tag overflow
 */
export const WithManySelected: Story = {
  args: {
    options: longOptionsList,
    defaultValue: ["opt1", "opt2", "opt3", "opt4", "opt5", "opt6", "opt7", "opt8"],
    placeholder: "Select options...",
    "aria-label": "Multi-select with many selected",
  },
  decorators: [withFixedWidth],
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates many selected values. All tags are shown in trigger (use maxTags to limit).",
      },
    },
  },
};

/**
 * MaxTagsLimit story
 * Demonstrates maxTags prop to limit visible tags
 */
export const MaxTagsLimit: Story = {
  args: {
    options: longOptionsList,
    defaultValue: ["opt1", "opt2", "opt3", "opt4", "opt5", "opt6"],
    maxTags: 3,
    placeholder: "Select options...",
    "aria-label": "Multi-select with max tags limit",
  },
  decorators: [withFixedWidth],
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates maxTags prop. Shows only first 3 tags, with '+N more' indicator for remaining selected values.",
      },
    },
  },
};

/**
 * DisabledOptions story
 * Demonstrates disabled options in the list
 */
export const DisabledOptions: Story = {
  args: {
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana", disabled: true },
      { value: "cherry", label: "Cherry" },
      { value: "date", label: "Date", disabled: true },
      { value: "elderberry", label: "Elderberry" },
    ],
    defaultValue: ["apple"],
    placeholder: "Select fruits...",
    "aria-label": "Multi-select with disabled options",
  },
  decorators: [withFixedWidth],
  parameters: {
    docs: {
      description: {
        story: "Demonstrates disabled options in the list. Disabled options cannot be selected.",
      },
    },
  },
};

/**
 * CustomRenderTag story
 * Demonstrates custom tag rendering with renderTag prop
 */
export const CustomRenderTag: Story = {
  args: {
    options: fruits,
    defaultValue: ["apple", "banana", "cherry"],
    placeholder: "Select fruits...",
    "aria-label": "Multi-select with custom tags",
    renderTag: (option, onRemove) => (
      <span
        key={option.value}
        className="inline-flex items-center gap-xs rounded-full bg-[hsl(var(--tm-primary))] px-sm py-xs text-xs font-semibold text-[hsl(var(--tm-primary-foreground))]"
      >
        {option.label}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${option.label}`}
          className="rounded-full p-0.5 hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-white/10"
        >
          <X className="h-3 w-3" />
        </button>
      </span>
    ),
  },
  decorators: [withFixedWidth],
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates custom tag rendering with renderTag prop. Tags use a custom primary-style pill and remove button.",
      },
    },
  },
};
