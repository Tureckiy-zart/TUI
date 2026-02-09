"use client";

/**
 * Chip Storybook Stories
 *
 * Demonstrates Chip component in all its modes and use cases.
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Composition / Overlays / Chip",
  component: Chip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Flexible component for displaying tags, filters, and selectable options. Supports multiple interaction modes: display-only, clickable, removable, and selectable.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent", "outline", "ghost", "destructive"],
      description: "Visual variant style",
      table: {
        type: { summary: "ChipVariant" },
        defaultValue: { summary: "primary" },
      },
    },
    radius: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "pill"],
      description: "Border radius style",
      table: {
        type: { summary: "ChipRadius" },
        defaultValue: { summary: "md" },
      },
    },
    removable: {
      control: { type: "boolean" },
      description: "Whether chip shows remove button (X icon)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    selected: {
      control: { type: "boolean" },
      description: "Whether chip is in selected state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether chip is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Click handler (makes chip interactive)",
      table: {
        type: { summary: "(event: React.MouseEvent) => void" },
      },
    },
    onRemove: {
      action: "removed",
      description: "Remove handler (called when X button clicked)",
      table: {
        type: { summary: "(event: React.MouseEvent) => void" },
      },
    },
    children: {
      control: { type: "text" },
      description: "Chip content",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default chip - basic display mode
 *
 * Simple visual tag without interaction.
 */
export const Default: Story = {
  args: {
    children: "Default Chip",
  },
  parameters: {
    docs: {
      description: {
        story: "Default chip in display mode. Simple visual tag without interaction.",
      },
    },
  },
};

/**
 * States - All chip states demonstrated
 *
 * Shows disabled, selected, removable, and clickable states.
 */
export const States: Story = {
  render: () => {
    const [clickCount, setClickCount] = React.useState(0);
    const [removed, setRemoved] = React.useState(false);
    const [selected, setSelected] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        {/* Default state */}
        <div className="flex flex-wrap gap-2">
          <h4 className="w-full text-sm font-semibold">Default State</h4>
          <Chip>Display Only</Chip>
          <Chip onClick={() => setClickCount((c) => c + 1)}>
            Clickable {clickCount > 0 && `(clicked ${clickCount}x)`}
          </Chip>
          {!removed && (
            <Chip removable onRemove={() => setRemoved(true)}>
              Removable
            </Chip>
          )}
          <Chip selected={selected} onClick={() => setSelected(!selected)}>
            {selected ? "Selected" : "Not Selected"}
          </Chip>
        </div>

        {/* Disabled state */}
        <div className="flex flex-wrap gap-2">
          <h4 className="w-full text-sm font-semibold">Disabled State</h4>
          <Chip disabled>Display Disabled</Chip>
          <Chip disabled onClick={() => {}}>
            Clickable Disabled
          </Chip>
          <Chip disabled removable onRemove={() => {}}>
            Removable Disabled
          </Chip>
          <Chip disabled selected>
            Selected Disabled
          </Chip>
        </div>

        {/* Combined states */}
        <div className="flex flex-wrap gap-2">
          <h4 className="w-full text-sm font-semibold">Combined States</h4>
          <Chip
            onClick={() => setClickCount((c) => c + 1)}
            removable
            onRemove={() => setRemoved(true)}
          >
            Clickable + Removable
          </Chip>
          <Chip
            selected={selected}
            onClick={() => setSelected(!selected)}
            removable
            onRemove={() => setRemoved(true)}
          >
            Selected + Clickable + Removable
          </Chip>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Demonstrates all chip states: default, disabled, selected, removable, clickable, and combinations. Interactive states are functional.",
      },
    },
  },
};

/**
 * Display Chips - Simple visual tags
 *
 * Display-only chips for status indicators, categories, and labels.
 */
export const DisplayChips: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip variant="primary">New Feature</Chip>
      <Chip variant="secondary">Documentation</Chip>
      <Chip variant="accent">Important</Chip>
      <Chip variant="outline">Optional</Chip>
      <Chip variant="ghost">Deprecated</Chip>
      <Chip variant="destructive">Breaking Change</Chip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Display-only chips (no interaction) for status indicators, categories, and labels. Similar to Badge component.",
      },
    },
  },
};

/**
 * Clickable Chips - Interactive filters and navigation
 *
 * Clickable chips for filters, categories, and navigation triggers.
 */
export const ClickableChips: Story = {
  render: () => {
    const [clicked, setClicked] = React.useState<string | null>(null);

    return (
      <div className="flex flex-wrap gap-2">
        <Chip variant="primary" onClick={() => setClicked("Primary")}>
          Primary Filter {clicked === "Primary" && " (selected)"}
        </Chip>
        <Chip variant="secondary" onClick={() => setClicked("Secondary")}>
          Secondary Filter {clicked === "Secondary" && " (selected)"}
        </Chip>
        <Chip variant="accent" onClick={() => setClicked("Accent")}>
          Accent Filter {clicked === "Accent" && " (selected)"}
        </Chip>
        <Chip variant="outline" onClick={() => setClicked("Outline")}>
          Outline Filter {clicked === "Outline" && " (selected)"}
        </Chip>
        <Chip variant="ghost" onClick={() => setClicked("Ghost")}>
          Ghost Filter {clicked === "Ghost" && " (selected)"}
        </Chip>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Clickable chips for filters, categories, and navigation. Click to trigger action. Enter/Space also activates. Shows visual feedback when clicked.",
      },
    },
  },
};

/**
 * Removable Chips - Tags with deletion
 *
 * Removable chips for input chips, selected filters, and tag management.
 */
export const RemovableChips: Story = {
  render: () => {
    const [tags, setTags] = React.useState([
      { id: "react", label: "Tag: React" },
      { id: "typescript", label: "Tag: TypeScript" },
      { id: "tailwind", label: "Tag: Tailwind" },
      { id: "storybook", label: "Tag: Storybook" },
      { id: "deprecated", label: "Remove Me" },
    ]);

    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              variant={tag.id === "deprecated" ? "destructive" : "primary"}
              removable
              onRemove={() => setTags((prev) => prev.filter((t) => t.id !== tag.id))}
            >
              {tag.label}
            </Chip>
          ))}
        </div>
        {tags.length === 0 && (
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            All tags removed. Refresh to see them again.
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Removable chips for tag input, selected filters, and tag management. Click X or press Delete/Backspace to remove. Chips are actually removed from the list.",
      },
    },
  },
};

/**
 * Selectable Chips - Multi-select options
 *
 * Selectable chips for multi-select filters and option groups.
 */
export const SelectableChips: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = React.useState<Set<string>>(
      new Set(["option1", "categoryA", "categoryB"]),
    );

    const toggleOption = (id: string) => {
      setSelectedOptions((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    return (
      <div className="flex flex-wrap gap-2">
        <Chip
          variant="primary"
          selected={selectedOptions.has("option1")}
          onClick={() => toggleOption("option1")}
        >
          Option 1 {selectedOptions.has("option1") && "(Selected)"}
        </Chip>
        <Chip
          variant="primary"
          selected={selectedOptions.has("option2")}
          onClick={() => toggleOption("option2")}
        >
          Option 2 {selectedOptions.has("option2") && "(Selected)"}
        </Chip>
        <Chip
          variant="primary"
          selected={selectedOptions.has("option3")}
          onClick={() => toggleOption("option3")}
        >
          Option 3 {selectedOptions.has("option3") && "(Selected)"}
        </Chip>
        <Chip
          variant="secondary"
          selected={selectedOptions.has("categoryA")}
          onClick={() => toggleOption("categoryA")}
        >
          Category A {selectedOptions.has("categoryA") && "(Selected)"}
        </Chip>
        <Chip
          variant="secondary"
          selected={selectedOptions.has("categoryB")}
          onClick={() => toggleOption("categoryB")}
        >
          Category B {selectedOptions.has("categoryB") && "(Selected)"}
        </Chip>
        <Chip
          variant="secondary"
          selected={selectedOptions.has("categoryC")}
          onClick={() => toggleOption("categoryC")}
        >
          Category C {selectedOptions.has("categoryC") && "(Selected)"}
        </Chip>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Selectable chips for multi-select filters and option groups. Selected state shows visual ring. Click to toggle selection. Multiple chips can be selected simultaneously.",
      },
    },
  },
};

/**
 * Radius Variants - Border radius options
 *
 * Shows all radius variants: sm, md, lg, pill.
 */
export const RadiusVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip variant="primary" radius="sm">
        Small Radius
      </Chip>
      <Chip variant="primary" radius="md">
        Medium Radius (default)
      </Chip>
      <Chip variant="primary" radius="lg">
        Large Radius
      </Chip>
      <Chip variant="primary" radius="pill">
        Pill Radius
      </Chip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Border radius variants: sm (2px), md (4px, default), lg (6px), pill (fully rounded).",
      },
    },
  },
};

/**
 * Combined Use Cases - Real-world scenarios
 *
 * Demonstrates combining multiple features: clickable + removable, selected + removable, etc.
 */
export const CombinedUseCases: Story = {
  render: () => {
    // Active filters state
    const [filters, setFilters] = React.useState([
      { id: "music", label: "Category: Music" },
      { id: "tenerife", label: "Location: Tenerife" },
      { id: "today", label: "Date: Today" },
    ]);

    // Selected genres state
    const [selectedGenres, setSelectedGenres] = React.useState<Set<string>>(
      new Set(["rock", "jazz", "classical"]),
    );

    // Tags state
    const [tags, setTags] = React.useState(["react", "typescript", "tailwindcss"]);

    const toggleGenre = (id: string) => {
      setSelectedGenres((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    return (
      <div className="flex flex-col gap-4">
        {/* Filter chips (selected + clickable + removable) */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">Active Filters (clickable + removable)</h4>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Chip
                key={filter.id}
                variant="primary"
                onClick={() => {
                  // Filter click action (e.g., navigate to filter page)
                  console.log(`Filter clicked: ${filter.id}`);
                }}
                removable
                onRemove={() => setFilters((prev) => prev.filter((f) => f.id !== filter.id))}
              >
                {filter.label}
              </Chip>
            ))}
          </div>
          {filters.length === 0 && (
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              No active filters. Refresh to see them again.
            </p>
          )}
        </div>

        {/* Selected options (selected + removable) */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">Selected Options (selected + removable)</h4>
          <div className="flex flex-wrap gap-2">
            {["rock", "jazz", "classical"].map((genre) => (
              <Chip
                key={genre}
                variant="accent"
                selected={selectedGenres.has(genre)}
                onClick={() => toggleGenre(genre)}
                removable
                onRemove={() => {
                  setSelectedGenres((prev) => {
                    const next = new Set(prev);
                    next.delete(genre);
                    return next;
                  });
                }}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
                {selectedGenres.has(genre) && " (selected)"}
              </Chip>
            ))}
          </div>
        </div>

        {/* Tag input (removable only) */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">Tag Input (removable)</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Chip
                key={tag}
                variant="outline"
                removable
                onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
              >
                {tag}
              </Chip>
            ))}
          </div>
          {tags.length === 0 && (
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              All tags removed. Refresh to see them again.
            </p>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Real-world use cases combining multiple features: active filters (clickable + removable), selected options (selected + removable), tag input (removable). All interactions are functional.",
      },
    },
  },
};
