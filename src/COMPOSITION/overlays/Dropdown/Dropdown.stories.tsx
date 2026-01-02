"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { Copy, Edit, MoreVertical, Share, Trash2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/PRIMITIVES/Button";

import { Dropdown } from "./Dropdown";

/**
 * # Dropdown
 *
 * Generic action container that provides semantic subcomponents for action lists.
 * Dropdown is a composition over Popover, delegating overlay behavior and keyboard accessibility.
 * Dropdown is NOT a Menu component - it's a generic container for actions without form semantics
 * or menu-specific ARIA roles.
 *
 * ## Features
 * - Compound component pattern (Root, Trigger, Content, Item, Separator)
 * - Delegates overlay behavior to Popover
 * - Token-driven styling (reuses POPOVER_TOKENS, defines DROPDOWN_TOKENS)
 * - Keyboard-accessible via Popover
 * - Native button semantics for items
 */
const meta: Meta<typeof Dropdown.Root> = {
  title: "UI / Extension / Dropdown",
  component: Dropdown.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Generic action container that provides semantic subcomponents for action lists. Composes Popover for overlay behavior and keyboard accessibility.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // DropdownRoot props (delegated to Popover)
    open: {
      control: "boolean",
      description: "Controlled open state",
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "Callback when open state changes",
    },
    modal: {
      control: "boolean",
      description: "Whether the dropdown is modal (blocks interaction with other elements)",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown.Root>;

/**
 * Basic Dropdown usage with simple action list
 */
export const Default: Story = {
  render: () => {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Copy</Dropdown.Item>
            <Dropdown.Item>Cut</Dropdown.Item>
            <Dropdown.Item>Paste</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Delete</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic Dropdown usage. Click the trigger button to open the dropdown. The dropdown appears below the trigger (handled by Popover). Use keyboard navigation: ArrowUp/ArrowDown to navigate, Enter/Space to activate, Escape to close.",
      },
    },
  },
};

/**
 * SizesGallery Story - REQUIRED for components with public size prop
 * Shows all supported sizes with text/icon/multi-line content
 * Reference: SIZE_MAPPING_SPEC.md
 */
export const SizesGallery: Story = {
  name: "SizesGallery",
  render: () => {
    return (
      <div className="flex flex-wrap gap-md">
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button size="sm">Small</Button>
          </Dropdown.Trigger>
          <Dropdown.Content size="sm">
            <Dropdown.Item>Action 1</Dropdown.Item>
            <Dropdown.Item>Action 2</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Action 3</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>

        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Medium</Button>
          </Dropdown.Trigger>
          <Dropdown.Content size="md">
            <Dropdown.Item>Action 1</Dropdown.Item>
            <Dropdown.Item>Action 2</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Action 3</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>

        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button size="lg">Large</Button>
          </Dropdown.Trigger>
          <Dropdown.Content size="lg">
            <Dropdown.Item>Action 1</Dropdown.Item>
            <Dropdown.Item>Action 2</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Action 3</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Canonical SizesGallery story showing all supported sizes (sm, md, lg). Required per SIZE_MAPPING_SPEC.md for components with public size prop. Each dropdown demonstrates the size prop on DropdownContent.",
      },
    },
  },
};

/**
 * Matrix Story - REQUIRED for components with BOTH size AND variant props
 * Shows all variants × all sizes in a grid layout
 * Reference: VARIANTS_SIZE_CANON.md
 */
export const Matrix: Story = {
  name: "Matrix (Variants × Sizes)",
  render: () => {
    const variants: Array<
      "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive"
    > = ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"];
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    return (
      <div className="space-y-lg">
        <div className="space-y-sm">
          <h3 className="text-lg font-semibold">Dropdown Matrix</h3>
          <p className="text-sm text-muted-foreground">
            All variants × all sizes. Each cell shows a dropdown with that variant/size combination.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-border bg-muted p-sm text-left text-sm font-medium">
                  Variant / Size
                </th>
                {sizes.map((size) => (
                  <th
                    key={size}
                    className="border border-border bg-muted p-sm text-center text-sm font-medium"
                  >
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variants.map((variant) => (
                <tr key={variant}>
                  <td className="border border-border bg-muted p-sm text-sm font-medium">
                    {variant}
                  </td>
                  {sizes.map((size) => (
                    <td key={size} className="border border-border p-md text-center">
                      <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                          <Button size="sm" variant="outline">
                            {variant.slice(0, 3)}
                          </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content variant={variant} size={size}>
                          <Dropdown.Item>Action 1</Dropdown.Item>
                          <Dropdown.Item>Action 2</Dropdown.Item>
                        </Dropdown.Content>
                      </Dropdown.Root>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Canonical Matrix story showing all possible combinations of variants and sizes. Required per VARIANTS_SIZE_CANON.md for components with both variant and size props.",
      },
    },
  },
};

/**
 * States Story - REQUIRED for components with public states/interactive behavior
 * Shows all variants × all sizes × all states (default, disabled, etc.)
 * Reference: VARIANTS_SIZE_CANON.md
 */
export const States: Story = {
  name: "States",
  render: () => {
    return (
      <div className="space-y-lg">
        <div className="space-y-sm">
          <h3 className="text-lg font-semibold">Dropdown States</h3>
          <p className="text-sm text-muted-foreground">
            All states for DropdownItem: default, disabled. Each dropdown demonstrates different
            item states.
          </p>
        </div>
        <div className="flex flex-wrap gap-md">
          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <Button>Default Items</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Action 1</Dropdown.Item>
              <Dropdown.Item>Action 2</Dropdown.Item>
              <Dropdown.Item>Action 3</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>

          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <Button>With Disabled</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Action 1</Dropdown.Item>
              <Dropdown.Item disabled>Disabled Action</Dropdown.Item>
              <Dropdown.Item>Action 3</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>

          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <Button>All Disabled</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item disabled>Disabled Action 1</Dropdown.Item>
              <Dropdown.Item disabled>Disabled Action 2</Dropdown.Item>
              <Dropdown.Item disabled>Disabled Action 3</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Canonical States story showing all possible states for DropdownItem. Required per VARIANTS_SIZE_CANON.md for components with public state props/interactive behavior.",
      },
    },
  },
};

/**
 * LongContent Story - REQUIRED for Overlay components
 * Validates padding and maxWidth token behavior with long text
 * Reference: SIZE_MAPPING_SPEC.md
 */
export const LongContent: Story = {
  name: "LongContent",
  render: () => {
    return (
      <div className="flex flex-wrap gap-md">
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Small Long Content</Button>
          </Dropdown.Trigger>
          <Dropdown.Content size="sm">
            <Dropdown.Item>
              This is a very long action item text that should wrap properly within the dropdown
              content area and respect the padding and maxWidth tokens defined for the small size.
            </Dropdown.Item>
            <Dropdown.Item>
              Another long action item that demonstrates how the dropdown handles multi-line content
              and ensures proper spacing and readability.
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>

        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Medium Long Content</Button>
          </Dropdown.Trigger>
          <Dropdown.Content size="md">
            <Dropdown.Item>
              This is a very long action item text that should wrap properly within the dropdown
              content area and respect the padding and maxWidth tokens defined for the medium size.
            </Dropdown.Item>
            <Dropdown.Item>
              Another long action item that demonstrates how the dropdown handles multi-line content
              and ensures proper spacing and readability.
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>

        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Large Long Content</Button>
          </Dropdown.Trigger>
          <Dropdown.Content size="lg">
            <Dropdown.Item>
              This is a very long action item text that should wrap properly within the dropdown
              content area and respect the padding and maxWidth tokens defined for the large size.
            </Dropdown.Item>
            <Dropdown.Item>
              Another long action item that demonstrates how the dropdown handles multi-line content
              and ensures proper spacing and readability.
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Canonical LongContent story validating padding and maxWidth token behavior with long text. Required per SIZE_MAPPING_SPEC.md for Overlay components. Each dropdown demonstrates long content handling for different sizes.",
      },
    },
  },
};

/**
 * Dropdown with icons on items
 */
export const WithIcons: Story = {
  render: () => {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Dropdown.Item>
            <Dropdown.Item>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Dropdown.Item>
            <Dropdown.Item>
              <Share className="mr-2 h-4 w-4" />
              Share
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dropdown with icons on items. Icons are placed before the text content. Icon slot is allowed but not required - Dropdown does not enforce icon usage.",
      },
    },
  },
};

/**
 * Dropdown with separator grouping
 */
export const WithSeparators: Story = {
  render: () => {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>New File</Dropdown.Item>
            <Dropdown.Item>Open File</Dropdown.Item>
            <Dropdown.Item>Save</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Cut</Dropdown.Item>
            <Dropdown.Item>Copy</Dropdown.Item>
            <Dropdown.Item>Paste</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Settings</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dropdown with separators to group related items. Separators provide visual grouping and improve dropdown readability. Multiple separators can be used to create multiple groups.",
      },
    },
  },
};

/**
 * Keyboard Navigation demonstration
 */
export const KeyboardNavigation: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4 rounded-lg border border-dashed p-8">
        <div className="flex h-[200px] items-center justify-center">
          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <Button>Open Dropdown (Try Keyboard)</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
              <Dropdown.Item>Item 3</Dropdown.Item>
              <Dropdown.Item disabled>Disabled Item</Dropdown.Item>
              <Dropdown.Item>Item 4</Dropdown.Item>
              <Dropdown.Item>Item 5</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </div>
        <div className="rounded-md bg-muted p-4 text-sm">
          <p className="mb-2 font-semibold">Keyboard Navigation:</p>
          <ul className="list-inside list-disc space-y-1">
            <li>
              <kbd className="rounded border bg-background px-1.5 py-0.5">Enter</kbd> or{" "}
              <kbd className="rounded border bg-background px-1.5 py-0.5">Space</kbd> - Activate
              item
            </li>
            <li>
              <kbd className="rounded border bg-background px-1.5 py-0.5">↑</kbd> /{" "}
              <kbd className="rounded border bg-background px-1.5 py-0.5">↓</kbd> - Navigate items
              (via Popover)
            </li>
            <li>
              <kbd className="rounded border bg-background px-1.5 py-0.5">Esc</kbd> - Close dropdown
            </li>
            <li>Typeahead - Type to search items (via Popover)</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Keyboard navigation demonstration. All keyboard navigation is handled by Popover (delegated). Disabled items are automatically skipped during navigation. Typeahead search is supported by default via Popover.",
      },
    },
  },
};
