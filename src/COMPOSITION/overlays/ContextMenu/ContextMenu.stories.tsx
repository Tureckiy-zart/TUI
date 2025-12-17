"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { Copy, Edit, FileText, MoreVertical, Share, Trash2 } from "lucide-react";
import * as React from "react";

import { ContextMenu } from "./ContextMenu";

const meta: Meta<typeof ContextMenu.Root> = {
  title: "UI/Foundation/ContextMenu",
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
