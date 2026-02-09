"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { SearchBar } from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Composition / Navigation / SearchBar",
  component: SearchBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Search bar component with autocomplete suggestions. Provides search input with dropdown suggestions, keyboard navigation, and suggestion selection.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the search input",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: { summary: "string" },
      },
    },
    onSearch: {
      action: "searched",
      description: "Callback fired when search query changes",
      table: {
        type: { summary: "(query: string) => void" },
      },
    },
    suggestions: {
      control: "object",
      description: "Array of suggestion strings",
      table: {
        type: { summary: "string[]" },
      },
    },
    onSuggestionSelect: {
      action: "suggestionSelected",
      description: "Callback fired when a suggestion is selected",
      table: {
        type: { summary: "(suggestion: string) => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

const defaultSuggestions = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
];

/**
 * Default SearchBar usage
 */
export const Default: Story = {
  args: {
    placeholder: "Search...",
    suggestions: defaultSuggestions,
    onSearch: () => {},
    onSuggestionSelect: () => {},
  },
};

/**
 * SearchBar without suggestions
 */
export const WithoutSuggestions: Story = {
  args: {
    placeholder: "Search...",
    suggestions: [],
    onSearch: () => {},
  },
};

/**
 * SearchBar with many suggestions
 */
export const ManySuggestions: Story = {
  args: {
    placeholder: "Search products...",
    suggestions: [
      "Apple iPhone 15",
      "Apple iPhone 14",
      "Apple MacBook Pro",
      "Apple iPad",
      "Samsung Galaxy S24",
      "Samsung Galaxy Tab",
      "Google Pixel 8",
      "Microsoft Surface",
      "Dell XPS 13",
      "HP Spectre",
      "Lenovo ThinkPad",
      "Asus ZenBook",
    ],
    onSearch: () => {},
    onSuggestionSelect: () => {},
  },
};

/**
 * SearchBar with filtered suggestions
 */
export const FilteredSuggestions: Story = {
  render: () => {
    const [query, setQuery] = React.useState("");
    const allSuggestions = defaultSuggestions;
    const filtered = allSuggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

    return (
      <SearchBar
        placeholder="Search fruits..."
        suggestions={filtered}
        onSearch={setQuery}
        onSuggestionSelect={() => {}}
      />
    );
  },
};

/**
 * SearchBar states demonstration
 */
export const States: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 text-sm font-medium">Default State</h3>
        <SearchBar placeholder="Search..." suggestions={defaultSuggestions} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">With Value</h3>
        <SearchBar placeholder="Search..." suggestions={defaultSuggestions} onSearch={() => {}} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Focused (interactive)</h3>
        <SearchBar placeholder="Search..." suggestions={defaultSuggestions} />
        <p className="mt-2 text-xs text-[hsl(var(--tm-text-muted))]">
          Click the input to see focused state with suggestions dropdown
        </p>
      </div>
    </div>
  ),
};

/**
 * Realistic usage example
 */
export const RealisticUsage: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedSuggestion, setSelectedSuggestion] = React.useState<string | null>(null);

    const productSuggestions = [
      "Wireless Headphones",
      "Bluetooth Speaker",
      "Smart Watch",
      "Laptop Stand",
      "USB-C Cable",
      "Wireless Mouse",
      "Keyboard",
      "Monitor Stand",
    ];

    return (
      <div className="space-y-4">
        <SearchBar
          placeholder="Search products..."
          suggestions={productSuggestions}
          onSearch={setSearchQuery}
          onSuggestionSelect={(suggestion) => {
            setSelectedSuggestion(suggestion);
            setSearchQuery(suggestion);
          }}
        />
        {selectedSuggestion && (
          <div className="rounded-md bg-[hsl(var(--tm-muted))] p-4">
            <p className="text-sm font-medium">Selected:</p>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">{selectedSuggestion}</p>
          </div>
        )}
        {searchQuery && !selectedSuggestion && (
          <div className="rounded-md bg-[hsl(var(--tm-muted))] p-4">
            <p className="text-sm font-medium">Searching for:</p>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">{searchQuery}</p>
          </div>
        )}
      </div>
    );
  },
};
