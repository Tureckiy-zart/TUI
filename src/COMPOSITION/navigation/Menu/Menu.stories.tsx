"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { Copy, Edit, MoreVertical, Share, Trash2 } from "lucide-react";

import { Menu } from "./Menu";

const meta: Meta<typeof Menu.Root> = {
  title: "UI / Composition / Navigation / Menu",
  component: Menu.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Menu component built on Radix DropdownMenu for explicit user-invoked action/navigation lists. Menu provides full ARIA menu semantics and is intended for primary navigation, command palettes, and explicit user-triggered action lists. For context menus (right-click), use ContextMenu. For generic dropdowns without menu semantics, use Dropdown. Supports keyboard navigation (ArrowUp/Down, Home/End, Enter/Space, Escape, typeahead), focus management, and full ARIA support. All behavior is handled by Radix DropdownMenu; Tenerife UI provides visual styling through tokens only.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // MenuRoot props (Radix DropdownMenu.Root props)
    open: {
      control: { type: "boolean" },
      description: "Controlled open state",
      table: {
        type: { summary: "boolean" },
      },
    },
    defaultOpen: {
      control: { type: "boolean" },
      description: "Default open state (uncontrolled)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onOpenChange: {
      control: false,
      description: "Callback fired when open state changes",
      table: {
        type: { summary: "(open: boolean) => void" },
      },
    },
    modal: {
      control: { type: "boolean" },
      description: "Whether menu is modal (traps focus)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    // Internal Radix props (hide from controls)
    dir: {
      control: false,
      table: {
        disable: true,
      },
    },
    // MenuContent, MenuItem, MenuSeparator, and MenuLabel props are handled via component composition
    // Props are set directly on the respective components (MenuContent, MenuItem, MenuSeparator, MenuLabel)
  },
};

export default meta;
type Story = StoryObj<typeof Menu.Root>;

/**
 * Default Menu usage with simple action list
 */
export const Default: Story = {
  render: () => {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
        <Menu>
          <Menu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
            <span>Open Menu</span>
            <MoreVertical className="h-4 w-4" />
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Copy</Menu.Item>
            <Menu.Item>Cut</Menu.Item>
            <Menu.Item>Paste</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Delete</Menu.Item>
          </Menu.Content>
        </Menu>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default Menu usage. Click the trigger button to open the menu. The menu appears below the trigger (handled by Radix). Use keyboard navigation: ArrowUp/ArrowDown to navigate, Enter/Space to activate, Escape to close.",
      },
    },
  },
};

/**
 * SizesGallery story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates all size variants for MenuContent padding and MenuItem padding/height.
 * Reference: [VARIANTS_SIZE_CANON.md](../../../docs/architecture/VARIANTS_SIZE_CANON.md)
 */
export const SizesGallery: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8 rounded-lg border border-dashed p-8">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">MenuContent Padding Variants</h3>
          <div className="flex gap-4">
            {(["sm", "md"] as const).map((padding) => (
              <div key={padding} className="space-y-2">
                <p className="text-xs text-[hsl(var(--tm-text-muted))]">Padding: {padding}</p>
                <Menu>
                  <Menu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
                    <span>Open Menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Menu.Trigger>
                  <Menu.Content padding={padding}>
                    <Menu.Item>Item 1</Menu.Item>
                    <Menu.Item>Item 2</Menu.Item>
                    <Menu.Item>Item 3</Menu.Item>
                  </Menu.Content>
                </Menu>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold">MenuItem Padding Variants</h3>
          <Menu>
            <Menu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
              <span>Open Menu</span>
              <MoreVertical className="h-4 w-4" />
            </Menu.Trigger>
            <Menu.Content>
              {(["xs", "sm", "md"] as const).map((padding) => (
                <Menu.Item key={padding} padding={padding}>
                  Padding: {padding}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold">MenuItem Height Variants</h3>
          <Menu>
            <Menu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
              <span>Open Menu</span>
              <MoreVertical className="h-4 w-4" />
            </Menu.Trigger>
            <Menu.Content>
              {(["sm", "md", "lg"] as const).map((height) => (
                <Menu.Item key={height} height={height}>
                  Height: {height}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "**Canonical SizesGallery Story:** Demonstrates all size variants for MenuContent padding and MenuItem padding/height. Required per VARIANTS_SIZE_CANON.md for components with size props.",
      },
    },
  },
};

/**
 * LongContent story (REQUIRED for overlay components)
 * Validates padding and maxWidth token behavior with long text content.
 * Reference: [SIZE_MAPPING_SPEC.md](../../../docs/architecture/SIZE_MAPPING_SPEC.md)
 */
export const LongContent: Story = {
  render: () => {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed p-8">
        <Menu>
          <Menu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
            <span>Open Menu</span>
            <MoreVertical className="h-4 w-4" />
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item>
              This is a very long menu item text that should wrap properly and demonstrate how the
              menu handles long content with proper padding and maxWidth token behavior
            </Menu.Item>
            <Menu.Item>
              Another long item with extensive text content to validate token behavior for padding
              and maximum width constraints in the menu component
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item>Short item</Menu.Item>
            <Menu.Item>
              This menu item contains a very long description that needs to wrap correctly within
              the menu content area, demonstrating proper text wrapping and padding token usage
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </div>
    );
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "**Canonical LongContent Story:** Validates padding and maxWidth token behavior with long text content. Required per SIZE_MAPPING_SPEC.md for overlay components.",
      },
    },
  },
};

/**
 * Menu with disabled item
 */
export const DisabledItem: Story = {
  render: () => {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
        <Menu>
          <Menu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
            <span>Open Menu</span>
            <MoreVertical className="h-4 w-4" />
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Copy</Menu.Item>
            <Menu.Item>Cut</Menu.Item>
            <Menu.Item disabled>Paste (Disabled)</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Delete</Menu.Item>
          </Menu.Content>
        </Menu>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Menu with a disabled item. Disabled items are visually dimmed and cannot be activated. Keyboard navigation automatically skips disabled items (handled by Radix).",
      },
    },
  },
};

/**
 * Menu with separator
 */
export const Separator: Story = {
  render: () => {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
        <Menu>
          <Menu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
            <span>Open Menu</span>
            <MoreVertical className="h-4 w-4" />
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item>New File</Menu.Item>
            <Menu.Item>Open File</Menu.Item>
            <Menu.Item>Save</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Cut</Menu.Item>
            <Menu.Item>Copy</Menu.Item>
            <Menu.Item>Paste</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Settings</Menu.Item>
          </Menu.Content>
        </Menu>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Menu with separators to group related items. Separators provide visual grouping and improve menu readability. Multiple separators can be used to create multiple groups.",
      },
    },
  },
};

/**
 * Menu with groups and labels
 */
export const WithGroups: Story = {
  render: () => {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
        <Menu>
          <Menu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
            <span>Open Menu</span>
            <MoreVertical className="h-4 w-4" />
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Group>
              <Menu.Label>File</Menu.Label>
              <Menu.Item>New</Menu.Item>
              <Menu.Item>Open</Menu.Item>
              <Menu.Item>Save</Menu.Item>
            </Menu.Group>
            <Menu.Separator />
            <Menu.Group>
              <Menu.Label>Edit</Menu.Label>
              <Menu.Item>Cut</Menu.Item>
              <Menu.Item>Copy</Menu.Item>
              <Menu.Item>Paste</Menu.Item>
            </Menu.Group>
            <Menu.Separator />
            <Menu.Group>
              <Menu.Item>Settings</Menu.Item>
            </Menu.Group>
          </Menu.Content>
        </Menu>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Menu with groups and labels. Groups provide logical organization, and labels provide section headers. Labels are visually distinct (muted text, semibold) and help users understand menu structure.",
      },
    },
  },
};

/**
 * Menu with icons
 */
export const WithIcons: Story = {
  render: () => {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
        <Menu>
          <Menu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
            <span>Open Menu</span>
            <MoreVertical className="h-4 w-4" />
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Menu.Item>
            <Menu.Item>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Menu.Item>
            <Menu.Item>
              <Share className="mr-2 h-4 w-4" />
              Share
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Menu with icons on items. Icons are placed before the text content. Icon slot is allowed but not required - Menu does not enforce icon usage.",
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
          <Menu>
            <Menu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
              <span>Open Menu (Try Keyboard)</span>
              <MoreVertical className="h-4 w-4" />
            </Menu.Trigger>
            <Menu.Content>
              <Menu.Item>Item 1</Menu.Item>
              <Menu.Item>Item 2</Menu.Item>
              <Menu.Item>Item 3</Menu.Item>
              <Menu.Item disabled>Disabled Item</Menu.Item>
              <Menu.Item>Item 4</Menu.Item>
              <Menu.Item>Item 5</Menu.Item>
            </Menu.Content>
          </Menu>
        </div>
        <div className="rounded-md bg-[hsl(var(--tm-muted))] p-4 text-sm">
          <p className="mb-2 font-semibold">Keyboard Navigation:</p>
          <ul className="list-inside list-disc space-y-1">
            <li>
              <kbd className="rounded border bg-[hsl(var(--tm-surface-base))] px-1.5 py-0.5">
                Enter
              </kbd>{" "}
              or{" "}
              <kbd className="rounded border bg-[hsl(var(--tm-surface-base))] px-1.5 py-0.5">
                Space
              </kbd>{" "}
              - Activate item
            </li>
            <li>
              <kbd className="rounded border bg-[hsl(var(--tm-surface-base))] px-1.5 py-0.5">^</kbd>{" "}
              /{" "}
              <kbd className="rounded border bg-[hsl(var(--tm-surface-base))] px-1.5 py-0.5">v</kbd>{" "}
              - Navigate items
            </li>
            <li>
              <kbd className="rounded border bg-[hsl(var(--tm-surface-base))] px-1.5 py-0.5">
                Home
              </kbd>{" "}
              /{" "}
              <kbd className="rounded border bg-[hsl(var(--tm-surface-base))] px-1.5 py-0.5">
                End
              </kbd>{" "}
              - First/Last item
            </li>
            <li>
              <kbd className="rounded border bg-[hsl(var(--tm-surface-base))] px-1.5 py-0.5">
                Esc
              </kbd>{" "}
              - Close menu
            </li>
            <li>Typeahead - Type to search items (Radix default)</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Keyboard navigation demonstration. All keyboard navigation is handled by Radix DropdownMenu. Disabled items are automatically skipped during navigation. Typeahead search is supported by default.",
      },
    },
  },
};
