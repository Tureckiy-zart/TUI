"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { Copy, Edit, FileText, MoreVertical, Share, Trash2 } from "lucide-react";
import * as React from "react";

import { ContextMenu } from "./ContextMenu";

const meta: Meta<typeof ContextMenu.Root> = {
  title: "UI / Composition / Overlays / ContextMenu",
  component: ContextMenu.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ContextMenu component built on Radix ContextMenu for right-click menus. Supports sizes (sm, md, lg), token-based visual props, keyboard navigation, focus management, and full ARIA support. All behavior is handled by Radix ContextMenu; Tenerife UI provides visual styling through tokens only.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContextMenu.Root>;

/**
 * Default ContextMenu usage with basic right-click menu
 */
export const Default: Story = {
  render: () => {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
        <ContextMenu.Root>
          <ContextMenu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
            <span>Right-click me</span>
            <MoreVertical className="h-4 w-4" />
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
            <ContextMenu.Item>Cut</ContextMenu.Item>
            <ContextMenu.Item>Paste</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Delete</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic ContextMenu usage. Right-click the trigger area to open the menu. The menu opens at the cursor position automatically (handled by Radix).",
      },
    },
  },
};

/**
 * ContextMenu with icons on items
 */
export const WithIcons: Story = {
  render: () => {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
        <ContextMenu.Root>
          <ContextMenu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
            <span>Right-click me</span>
            <MoreVertical className="h-4 w-4" />
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </ContextMenu.Item>
            <ContextMenu.Item>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </ContextMenu.Item>
            <ContextMenu.Item>
              <Share className="mr-2 h-4 w-4" />
              Share
            </ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item tone="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "ContextMenu with icons on items. Icons are placed before the text content. Use the `tone` prop to apply different visual styles (e.g., destructive for delete actions).",
      },
    },
  },
};

/**
 * ContextMenu with checkbox and radio items
 */
export const CheckboxAndRadio: Story = {
  render: () => {
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [radioValue, setRadioValue] = React.useState("option1");

    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
        <ContextMenu.Root>
          <ContextMenu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
            <span>Right-click me</span>
            <MoreVertical className="h-4 w-4" />
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Label>View Options</ContextMenu.Label>
            <ContextMenu.CheckboxItem checked={checked1} onCheckedChange={setChecked1}>
              Show Grid
            </ContextMenu.CheckboxItem>
            <ContextMenu.CheckboxItem checked={checked2} onCheckedChange={setChecked2}>
              Show Rulers
            </ContextMenu.CheckboxItem>
            <ContextMenu.Separator />
            <ContextMenu.Label>Zoom Level</ContextMenu.Label>
            <ContextMenu.RadioGroup value={radioValue} onValueChange={setRadioValue}>
              <ContextMenu.RadioItem value="option1">50%</ContextMenu.RadioItem>
              <ContextMenu.RadioItem value="option2">100%</ContextMenu.RadioItem>
              <ContextMenu.RadioItem value="option3">200%</ContextMenu.RadioItem>
            </ContextMenu.RadioGroup>
          </ContextMenu.Content>
        </ContextMenu.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "ContextMenu with checkbox and radio items. Checkbox items use `checked` and `onCheckedChange` props. Radio items are grouped in a `RadioGroup` with `value` and `onValueChange` props. Labels provide section headers.",
      },
    },
  },
};

/**
 * ContextMenu with nested submenu
 */
export const Submenu: Story = {
  render: () => {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
        <ContextMenu.Root>
          <ContextMenu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
            <span>Right-click me</span>
            <MoreVertical className="h-4 w-4" />
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </ContextMenu.Item>
            <ContextMenu.Item>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger>
                <Share className="mr-2 h-4 w-4" />
                Share
              </ContextMenu.SubTrigger>
              <ContextMenu.SubContent>
                <ContextMenu.Item>
                  <FileText className="mr-2 h-4 w-4" />
                  Share via Email
                </ContextMenu.Item>
                <ContextMenu.Item>
                  <FileText className="mr-2 h-4 w-4" />
                  Share via Link
                </ContextMenu.Item>
                <ContextMenu.Item>
                  <FileText className="mr-2 h-4 w-4" />
                  Share via Social
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Sub>
            <ContextMenu.Separator />
            <ContextMenu.Item tone="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "ContextMenu with nested submenu. Use `Sub`, `SubTrigger`, and `SubContent` components to create nested menus. The submenu opens on hover or keyboard navigation (handled by Radix).",
      },
    },
  },
};

/**
 * ContextMenu with disabled items
 */
export const DisabledItems: Story = {
  render: () => {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
        <ContextMenu.Root>
          <ContextMenu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
            <span>Right-click me</span>
            <MoreVertical className="h-4 w-4" />
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </ContextMenu.Item>
            <ContextMenu.Item disabled>
              <Edit className="mr-2 h-4 w-4" />
              Edit (Disabled)
            </ContextMenu.Item>
            <ContextMenu.Item>
              <Share className="mr-2 h-4 w-4" />
              Share
            </ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item disabled tone="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete (Disabled)
            </ContextMenu.Item>
            <ContextMenu.Item tone="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "ContextMenu with disabled items. Use the `disabled` prop to disable items. Disabled items are visually dimmed and cannot be interacted with. Radix handles keyboard navigation to skip disabled items.",
      },
    },
  },
};

/**
 * ContextMenu with two-level deep submenu nesting
 */
export const DeepSubmenuTwoLevels: Story = {
  render: () => {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed p-8">
        <ContextMenu.Root>
          <ContextMenu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
            <span>Right-click me</span>
            <MoreVertical className="h-4 w-4" />
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </ContextMenu.Item>
            <ContextMenu.Item>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger>
                <Share className="mr-2 h-4 w-4" />
                Share
              </ContextMenu.SubTrigger>
              <ContextMenu.SubContent>
                <ContextMenu.Item>
                  <FileText className="mr-2 h-4 w-4" />
                  Share via Email
                </ContextMenu.Item>
                <ContextMenu.Sub>
                  <ContextMenu.SubTrigger>
                    <FileText className="mr-2 h-4 w-4" />
                    Share via Social
                  </ContextMenu.SubTrigger>
                  <ContextMenu.SubContent>
                    <ContextMenu.Item>
                      <FileText className="mr-2 h-4 w-4" />
                      Share on Twitter
                    </ContextMenu.Item>
                    <ContextMenu.Item>
                      <FileText className="mr-2 h-4 w-4" />
                      Share on Facebook
                    </ContextMenu.Item>
                    <ContextMenu.Item>
                      <FileText className="mr-2 h-4 w-4" />
                      Share on LinkedIn
                    </ContextMenu.Item>
                  </ContextMenu.SubContent>
                </ContextMenu.Sub>
                <ContextMenu.Item>
                  <FileText className="mr-2 h-4 w-4" />
                  Share via Link
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Sub>
            <ContextMenu.Separator />
            <ContextMenu.Item tone="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "ContextMenu with two-level deep submenu nesting. This demonstrates nested submenus within submenus. The visual hierarchy and token styling should remain consistent across all nesting levels. Radix handles keyboard navigation and focus management for nested menus automatically.",
      },
    },
  },
};

/**
 * All available size variants (sm, md, lg)
 */
export const Sizes: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Small (sm)</h3>
          <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed p-8">
            <ContextMenu.Root>
              <ContextMenu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
                <span>Right-click me</span>
                <MoreVertical className="h-4 w-4" />
              </ContextMenu.Trigger>
              <ContextMenu.Content size="sm">
                <ContextMenu.Item>Copy</ContextMenu.Item>
                <ContextMenu.Item>Cut</ContextMenu.Item>
                <ContextMenu.Item>Paste</ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Medium (md) - Default</h3>
          <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed p-8">
            <ContextMenu.Root>
              <ContextMenu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
                <span>Right-click me</span>
                <MoreVertical className="h-4 w-4" />
              </ContextMenu.Trigger>
              <ContextMenu.Content size="md">
                <ContextMenu.Item>Copy</ContextMenu.Item>
                <ContextMenu.Item>Cut</ContextMenu.Item>
                <ContextMenu.Item>Paste</ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Large (lg)</h3>
          <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed p-8">
            <ContextMenu.Root>
              <ContextMenu.Trigger className="flex items-center gap-2 rounded-md border px-4 py-2">
                <span>Right-click me</span>
                <MoreVertical className="h-4 w-4" />
              </ContextMenu.Trigger>
              <ContextMenu.Content size="lg">
                <ContextMenu.Item>Copy</ContextMenu.Item>
                <ContextMenu.Item>Cut</ContextMenu.Item>
                <ContextMenu.Item>Paste</ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "All available size variants for ContextMenu. Size affects both content padding and item sizing. Items automatically inherit size from their parent Content, so you only need to set `size` on `Content`. You can still override individual items if needed.",
      },
    },
  },
};

/**
 * Matrix: All tones × all sizes grid
 *
 * **Canonical Story (Required per VARIANTS_SIZE_CANON.md)**
 *
 * This story demonstrates all combinations of tone variants (neutral, primary, destructive)
 * and size variants (sm, md, lg) in a systematic grid. Required for components with BOTH
 * size AND tone props.
 *
 * **Purpose:** Verify visual consistency across all tone/size combinations.
 */
export const Matrix: Story = {
  render: () => {
    const tones: Array<"neutral" | "primary" | "destructive"> = [
      "neutral",
      "primary",
      "destructive",
    ];
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    return (
      <div className="flex flex-col gap-8 p-8">
        <h2 className="text-lg font-semibold">Matrix: All Tones × All Sizes</h2>

        {tones.map((tone) => (
          <div key={tone} className="flex flex-col gap-4">
            <h3 className="text-base font-semibold capitalize">{tone} Tone</h3>
            <div className="flex flex-wrap gap-6">
              {sizes.map((size) => (
                <div key={`${tone}-${size}`} className="flex flex-col gap-2">
                  <p className="text-xs text-[hsl(var(--tm-text-muted))]">size={size}</p>
                  <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed p-4">
                    <ContextMenu.Root>
                      <ContextMenu.Trigger className="rounded-md border px-3 py-1.5 text-sm">
                        Right-click
                      </ContextMenu.Trigger>
                      <ContextMenu.Content size={size}>
                        <ContextMenu.Item tone={tone}>Copy</ContextMenu.Item>
                        <ContextMenu.Item tone={tone}>Edit</ContextMenu.Item>
                        <ContextMenu.Item tone={tone}>Share</ContextMenu.Item>
                      </ContextMenu.Content>
                    </ContextMenu.Root>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Canonical Matrix Story:** Demonstrates all tone variants (neutral, primary, destructive) × all size variants (sm, md, lg). This story is required per VARIANTS_SIZE_CANON.md for components with both size and tone props. Use this to verify visual consistency across all combinations.",
      },
    },
  },
};

/**
 * States: All tones × all sizes × all states
 *
 * **Canonical Story (Required per VARIANTS_SIZE_CANON.md)**
 *
 * This story demonstrates all combinations of tone variants, size variants, and interaction states
 * (default, disabled). Required for interactive components.
 *
 * **Purpose:** Verify state styling consistency (hover, focus-visible, disabled) across all variants.
 */
export const States: Story = {
  render: () => {
    const tones: Array<"neutral" | "primary" | "destructive"> = [
      "neutral",
      "primary",
      "destructive",
    ];
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    return (
      <div className="flex flex-col gap-8 p-8">
        <h2 className="text-lg font-semibold">States: All Tones × All Sizes × All States</h2>

        {tones.map((tone) => (
          <div key={tone} className="flex flex-col gap-4">
            <h3 className="text-base font-semibold capitalize">{tone} Tone</h3>
            <div className="flex flex-wrap gap-6">
              {sizes.map((size) => (
                <div key={`${tone}-${size}`} className="flex flex-col gap-2">
                  <p className="text-xs text-[hsl(var(--tm-text-muted))]">size={size}</p>
                  <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-4">
                    <ContextMenu.Root>
                      <ContextMenu.Trigger className="rounded-md border px-3 py-1.5 text-sm">
                        Right-click
                      </ContextMenu.Trigger>
                      <ContextMenu.Content size={size}>
                        <ContextMenu.Item tone={tone}>Default State</ContextMenu.Item>
                        <ContextMenu.Item tone={tone} disabled>
                          Disabled State
                        </ContextMenu.Item>
                        <ContextMenu.Separator />
                        <ContextMenu.Label>Hover & Focus</ContextMenu.Label>
                        <ContextMenu.Item tone={tone}>Hover over me</ContextMenu.Item>
                        <ContextMenu.Item tone={tone}>Focus me (Tab)</ContextMenu.Item>
                      </ContextMenu.Content>
                    </ContextMenu.Root>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Canonical States Story:** Demonstrates all tone variants × all size variants × all interaction states (default, disabled, hover, focus-visible). This story is required per VARIANTS_SIZE_CANON.md for interactive components. Hover and focus states are CSS-driven (no JS state). Use this to verify state styling consistency.",
      },
    },
  },
};

/**
 * LongContent: Overlay padding/maxWidth validation
 *
 * **Canonical Story (Required per VARIANTS_SIZE_CANON.md)**
 *
 * This story validates padding and maxWidth token behavior with long text content.
 * Required for overlay components (Popover, Tooltip, ContextMenu, etc.).
 *
 * **Purpose:** Verify overlay doesn't overflow viewport, padding tokens work correctly,
 * and long content wraps appropriately.
 */
export const LongContent: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8 p-8">
        <h2 className="text-lg font-semibold">LongContent: Padding & MaxWidth Validation</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-semibold">Long Item Text (Wrapping Test)</h3>
            <div className="flex h-[250px] items-center justify-center rounded-lg border border-dashed p-8">
              <ContextMenu.Root>
                <ContextMenu.Trigger className="rounded-md border px-4 py-2">
                  Right-click for long content menu
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                  <ContextMenu.Item>
                    This is a very long menu item text that should wrap appropriately within the
                    context menu without breaking the layout or overflowing the viewport boundaries
                  </ContextMenu.Item>
                  <ContextMenu.Item>
                    Another extremely long item that tests the padding and maxWidth token behavior
                    to ensure proper text wrapping and visual consistency
                  </ContextMenu.Item>
                  <ContextMenu.Separator />
                  <ContextMenu.Item tone="destructive">
                    Delete this item with an unnecessarily verbose and descriptive label that goes
                    on and on
                  </ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Root>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-semibold">Many Items (Scrolling Test)</h3>
            <div className="flex h-[250px] items-center justify-center rounded-lg border border-dashed p-8">
              <ContextMenu.Root>
                <ContextMenu.Trigger className="rounded-md border px-4 py-2">
                  Right-click for many items menu
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                  <ContextMenu.Label>Actions</ContextMenu.Label>
                  <ContextMenu.Item>Copy</ContextMenu.Item>
                  <ContextMenu.Item>Cut</ContextMenu.Item>
                  <ContextMenu.Item>Paste</ContextMenu.Item>
                  <ContextMenu.Separator />
                  <ContextMenu.Label>Edit</ContextMenu.Label>
                  <ContextMenu.Item>Undo</ContextMenu.Item>
                  <ContextMenu.Item>Redo</ContextMenu.Item>
                  <ContextMenu.Separator />
                  <ContextMenu.Label>File</ContextMenu.Label>
                  <ContextMenu.Item>New File</ContextMenu.Item>
                  <ContextMenu.Item>Open File</ContextMenu.Item>
                  <ContextMenu.Item>Save File</ContextMenu.Item>
                  <ContextMenu.Item>Save As...</ContextMenu.Item>
                  <ContextMenu.Separator />
                  <ContextMenu.Label>Danger Zone</ContextMenu.Label>
                  <ContextMenu.Item tone="destructive">Delete File</ContextMenu.Item>
                  <ContextMenu.Item tone="destructive">Remove Project</ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Root>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-semibold">Custom Width Token Test</h3>
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed p-8">
              <ContextMenu.Root>
                <ContextMenu.Trigger className="rounded-md border px-4 py-2">
                  Right-click (width=xl)
                </ContextMenu.Trigger>
                <ContextMenu.Content width="xl">
                  <ContextMenu.Item>
                    Extra large width menu to test custom width token behavior with longer content
                  </ContextMenu.Item>
                  <ContextMenu.Item>Copy</ContextMenu.Item>
                  <ContextMenu.Item>Paste</ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Root>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Canonical LongContent Story:** Validates padding and maxWidth token behavior with long text content. This story is required per VARIANTS_SIZE_CANON.md for overlay components. Tests: (1) Long item text wrapping, (2) Many items scrolling, (3) Custom width tokens. Use this to verify overlay doesn't overflow viewport and padding tokens work correctly.",
      },
    },
  },
};
