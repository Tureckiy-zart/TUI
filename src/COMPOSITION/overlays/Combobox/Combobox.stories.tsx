import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Combobox } from "./Combobox";
import type { ComboboxOption } from "./Combobox";

/**
 * # Combobox
 *
 * Autocomplete component with dropdown list supporting text input and option selection.
 * Supports single-select and multi-select modes, client-side and server-side filtering.
 *
 * ## Features
 * - Single-select and multi-select modes
 * - Client-side filtering (default) and server-side filtering (optional)
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Token-driven styling (INPUT_TOKENS, POPOVER_TOKENS)
 * - Foundation composition (Input + Popover)
 * - A11Y compliant (role="combobox", aria-expanded, aria-autocomplete)
 */
const meta = {
  title: "UI / Extension / Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Autocomplete component with dropdown list supporting text input and option selection.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: "boolean",
      description: "Enable multi-select mode",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the combobox (Interactive Size Scale)",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    open: {
      control: "boolean",
      description: "Controlled open state",
    },
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options
const sampleOptions: ComboboxOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape" },
  { value: "honeydew", label: "Honeydew" },
];

const largeOptionList: ComboboxOption[] = [
  { value: "afghanistan", label: "Afghanistan" },
  { value: "albania", label: "Albania" },
  { value: "algeria", label: "Algeria" },
  { value: "andorra", label: "Andorra" },
  { value: "angola", label: "Angola" },
  { value: "argentina", label: "Argentina" },
  { value: "armenia", label: "Armenia" },
  { value: "australia", label: "Australia" },
  { value: "austria", label: "Austria" },
  { value: "azerbaijan", label: "Azerbaijan" },
  { value: "bahamas", label: "Bahamas" },
  { value: "bahrain", label: "Bahrain" },
  { value: "bangladesh", label: "Bangladesh" },
  { value: "barbados", label: "Barbados" },
  { value: "belarus", label: "Belarus" },
  { value: "belgium", label: "Belgium" },
  { value: "belize", label: "Belize" },
  { value: "benin", label: "Benin" },
  { value: "bhutan", label: "Bhutan" },
  { value: "bolivia", label: "Bolivia" },
];

/**
 * Default story demonstrating basic single-select usage with client-side filtering.
 */
export const Default: Story = {
  args: { children: null },
  render: () => {
    const [value, setValue] = React.useState<string>("");

    return (
      <div className="w-[300px]">
        <Combobox value={value} onValueChange={(v) => setValue(v as string)}>
          <Combobox.Input placeholder="Search fruits..." aria-label="Search fruits" />
          <Combobox.List options={sampleOptions} />
        </Combobox>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Basic single-select combobox with client-side filtering.",
      },
    },
  },
};

/**
 * SizesGallery demonstrates all available sizes (sm, md, lg).
 */
export const SizesGallery: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Small (sm)</h3>
        <Combobox size="sm">
          <Combobox.Input placeholder="Small size..." aria-label="Small combobox" />
          <Combobox.List options={sampleOptions} />
        </Combobox>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Medium (md) - Default</h3>
        <Combobox size="md">
          <Combobox.Input placeholder="Medium size..." aria-label="Medium combobox" />
          <Combobox.List options={sampleOptions} />
        </Combobox>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Large (lg)</h3>
        <Combobox size="lg">
          <Combobox.Input placeholder="Large size..." aria-label="Large combobox" />
          <Combobox.List options={sampleOptions} />
        </Combobox>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gallery of all available sizes: sm, md (default), lg.",
      },
    },
    layout: "padded",
  },
};

/**
 * States demonstrates different component states (disabled, invalid, loading).
 */
export const States: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Normal</h3>
        <Combobox>
          <Combobox.Input placeholder="Normal state..." aria-label="Normal combobox" />
          <Combobox.List options={sampleOptions} />
        </Combobox>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Disabled</h3>
        <Combobox>
          <Combobox.Input placeholder="Disabled state..." aria-label="Disabled combobox" disabled />
          <Combobox.List options={sampleOptions} />
        </Combobox>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Invalid</h3>
        <Combobox>
          <Combobox.Input
            placeholder="Invalid state..."
            aria-label="Invalid combobox"
            aria-invalid={true}
          />
          <Combobox.List options={sampleOptions} />
        </Combobox>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Loading</h3>
        <Combobox>
          <Combobox.Input placeholder="Loading state..." aria-label="Loading combobox" />
          <Combobox.List options={sampleOptions} loading={true} />
        </Combobox>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different states: normal, disabled, invalid, loading.",
      },
    },
    layout: "padded",
  },
};

/**
 * MultiSelect demonstrates multi-select mode with tags.
 */
export const MultiSelect: Story = {
  args: { children: null },
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);

    return (
      <div className="w-[400px]">
        <Combobox multiple value={value} onValueChange={(v) => setValue(v as string[])}>
          <Combobox.Input
            placeholder="Select multiple fruits..."
            aria-label="Multi-select fruits"
          />
          <Combobox.List options={sampleOptions} />
        </Combobox>
        <div className="mt-2 text-sm text-muted-foreground">
          Selected: {value.length === 0 ? "None" : value.join(", ")}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Multi-select mode with tags. Users can select multiple options.",
      },
    },
  },
};

/**
 * ServerSideFiltering demonstrates server-side filtering with onSearch callback.
 */
export const ServerSideFiltering: Story = {
  args: {
    children: null,
  },
  render: () => {
    const [options, setOptions] = React.useState<ComboboxOption[]>(largeOptionList);
    const [loading, setLoading] = React.useState(false);

    const handleSearch = React.useCallback((query: string) => {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        const filtered = largeOptionList.filter((opt) =>
          opt.label?.toLowerCase().includes(query.toLowerCase()),
        );
        setOptions(filtered);
        setLoading(false);
      }, 500);
    }, []);

    return (
      <div className="w-[300px]">
        <Combobox>
          <Combobox.Input placeholder="Search countries..." aria-label="Search countries" />
          <Combobox.List
            options={options}
            onSearch={handleSearch}
            loading={loading}
            filterable={false}
          />
        </Combobox>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Server-side filtering with onSearch callback. Simulates async data fetching.",
      },
    },
  },
};

/**
 * LargeList demonstrates combobox with a large list of options.
 */
export const LargeList: Story = {
  args: {
    children: null,
  },
  render: () => {
    const [value, setValue] = React.useState<string>("");

    return (
      <div className="w-[300px]">
        <Combobox value={value} onValueChange={(v) => setValue(v as string)}>
          <Combobox.Input placeholder="Search countries..." aria-label="Search countries" />
          <Combobox.List options={largeOptionList} />
        </Combobox>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Combobox with large list of options (20+ items) demonstrating scrollable dropdown.",
      },
    },
  },
};

/**
 * EmptyState demonstrates empty state when no options match the filter.
 */
export const EmptyState: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="w-[300px]">
      <Combobox>
        <Combobox.Input placeholder="Search..." aria-label="Search empty list" />
        <Combobox.List options={[]} emptyMessage="No results found" />
      </Combobox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Empty state when no options are available or match the search query.",
      },
    },
  },
};

/**
 * WithDisabledOptions demonstrates options with disabled state.
 */
export const WithDisabledOptions: Story = {
  args: {
    children: null,
  },
  render: () => {
    const optionsWithDisabled: ComboboxOption[] = [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana", disabled: true },
      { value: "cherry", label: "Cherry" },
      { value: "date", label: "Date", disabled: true },
      { value: "elderberry", label: "Elderberry" },
    ];

    return (
      <div className="w-[300px]">
        <Combobox>
          <Combobox.Input
            placeholder="Search fruits..."
            aria-label="Search fruits with disabled options"
          />
          <Combobox.List options={optionsWithDisabled} />
        </Combobox>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Combobox with some disabled options that cannot be selected.",
      },
    },
  },
};
