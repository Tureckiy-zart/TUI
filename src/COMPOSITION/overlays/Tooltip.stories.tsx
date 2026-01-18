import type { ResponsiveDelay } from "@/FOUNDATION/tokens/types";
import { Badge } from "@/PRIMITIVES/Badge";
import { Button } from "@/PRIMITIVES/Button";
import { Input } from "@/PRIMITIVES/Input";
import { Label } from "@/PRIMITIVES/Label";
import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircle, HelpCircle, Info } from "lucide-react";
import { TooltipProvider, TooltipWrapper } from "./Tooltip";

const meta: Meta<typeof TooltipWrapper> = {
  title: "UI / Composition / Overlays / Tooltip",
  component: TooltipWrapper,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TooltipWrapper>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <Button>Hover me</Button>,
  },
};

export const LongContent: Story = {
  name: "LongContent",
  render: () => (
    <div className="space-y-md">
      <p className="text-sm text-[hsl(var(--tm-text-muted))]">
        This story validates padding and maxWidth token behavior with long text content.
      </p>
      <div className="flex gap-md">
        <TooltipWrapper content="This is a very long tooltip message that demonstrates how the tooltip handles extended text content. It should properly wrap and maintain appropriate padding and maximum width constraints based on the token system.">
          <Button>Long Content Tooltip</Button>
        </TooltipWrapper>
        <TooltipWrapper content="Another example with even more text to test the tooltip's ability to handle lengthy descriptions while maintaining proper visual appearance and readability. The tooltip should gracefully handle multi-line content.">
          <Button>Very Long Content</Button>
        </TooltipWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Validates padding and maxWidth token behavior with long text content. Required for overlay components per VARIANTS_SIZE_CANON.",
      },
    },
  },
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="flex gap-md">
      <TooltipWrapper content="Primary tooltip" variant="primary">
        <Button variant="primary">Primary</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Accent tooltip" variant="accent">
        <Button variant="outline">Accent</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Secondary tooltip" variant="secondary">
        <Button variant="outline">Secondary</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Destructive tooltip" variant="destructive">
        <Button variant="outline">Destructive</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Outline tooltip" variant="outline">
        <Button variant="outline">Outline</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Ghost tooltip" variant="ghost">
        <Button variant="ghost">Ghost</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Link tooltip" variant="link">
        <Button variant="ghost">Link</Button>
      </TooltipWrapper>
    </div>
  ),
};

export const DifferentPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-xl p-xl">
      <TooltipWrapper content="Top tooltip" side="top">
        <Button>Top</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Right tooltip" side="right">
        <Button>Right</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Bottom tooltip" side="bottom">
        <Button>Bottom</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Left tooltip" side="left">
        <Button>Left</Button>
      </TooltipWrapper>
    </div>
  ),
};

export const WithFormElements: Story = {
  render: () => (
    <div className="w-80 space-y-md">
      <div className="space-y-sm">
        <div className="flex items-center gap-sm">
          <Label htmlFor="email">Email</Label>
          <TooltipWrapper
            content="We'll never share your email with anyone else."
            variant="primary"
          >
            <Info className="h-4 w-4 text-[hsl(var(--tm-text-muted))]" />
          </TooltipWrapper>
        </div>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>

      <div className="space-y-sm">
        <div className="flex items-center gap-sm">
          <Label htmlFor="password">Password</Label>
          <TooltipWrapper content="Password must be at least 8 characters long" variant="secondary">
            <HelpCircle className="h-4 w-4 text-[hsl(var(--tm-text-muted))]" />
          </TooltipWrapper>
        </div>
        <Input id="password" type="password" placeholder="Enter your password" />
      </div>

      <div className="space-y-sm">
        <div className="flex items-center gap-sm">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <TooltipWrapper content="Passwords do not match" variant="destructive">
            <AlertCircle className="h-4 w-4 text-destructive" />
          </TooltipWrapper>
        </div>
        <Input id="confirm-password" type="password" placeholder="Confirm your password" />
      </div>
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <div className="flex gap-md">
      <TooltipWrapper content="This feature is currently in development" variant="secondary">
        <Badge variant="secondary">Beta</Badge>
      </TooltipWrapper>

      <TooltipWrapper content="This feature is available for premium users" variant="primary">
        <Badge variant="outline">Premium</Badge>
      </TooltipWrapper>

      <TooltipWrapper content="This feature is no longer supported" variant="destructive">
        <Badge variant="destructive">Deprecated</Badge>
      </TooltipWrapper>
    </div>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <div className="flex gap-md">
      <TooltipWrapper content="Fast tooltip (200ms delay)" delayDuration={200 as ResponsiveDelay}>
        <Button>Fast Tooltip</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Slow tooltip (1000ms delay)" delayDuration={1000 as ResponsiveDelay}>
        <Button>Slow Tooltip</Button>
      </TooltipWrapper>

      <TooltipWrapper content="No delay tooltip" delayDuration={0 as ResponsiveDelay}>
        <Button>No Delay</Button>
      </TooltipWrapper>
    </div>
  ),
};

export const KeyboardAccessibility: Story = {
  name: "Keyboard Accessibility",
  render: () => (
    <div className="space-y-md">
      <p className="text-sm text-[hsl(var(--tm-text-muted))]">
        Use{" "}
        <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 font-mono text-xs">Tab</kbd>{" "}
        to focus buttons and see tooltips appear. Press{" "}
        <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 font-mono text-xs">
          Escape
        </kbd>{" "}
        to dismiss.
      </p>
      <div className="flex gap-md">
        <TooltipWrapper content="This tooltip appears on focus">
          <Button>Focus me (Tab)</Button>
        </TooltipWrapper>
        <TooltipWrapper content="Tooltip with keyboard navigation">
          <Button>Keyboard accessible</Button>
        </TooltipWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates keyboard accessibility. Tooltips appear when trigger elements receive focus via keyboard navigation. Press Escape to dismiss.",
      },
    },
  },
};

export const States: Story = {
  name: "States",
  render: () => (
    <div className="space-y-lg">
      <div className="space-y-md">
        <h3 className="text-sm font-semibold">All Variants</h3>
        <div className="flex flex-wrap gap-md">
          <TooltipWrapper content="Primary tooltip" variant="primary">
            <Button variant="primary">Primary</Button>
          </TooltipWrapper>
          <TooltipWrapper content="Secondary tooltip" variant="secondary">
            <Button variant="outline">Secondary</Button>
          </TooltipWrapper>
          <TooltipWrapper content="Accent tooltip" variant="accent">
            <Button variant="outline">Accent</Button>
          </TooltipWrapper>
          <TooltipWrapper content="Outline tooltip" variant="outline">
            <Button variant="outline">Outline</Button>
          </TooltipWrapper>
          <TooltipWrapper content="Ghost tooltip" variant="ghost">
            <Button variant="ghost">Ghost</Button>
          </TooltipWrapper>
          <TooltipWrapper content="Link tooltip" variant="link">
            <Button variant="ghost">Link</Button>
          </TooltipWrapper>
          <TooltipWrapper content="Destructive tooltip" variant="destructive">
            <Button variant="outline">Destructive</Button>
          </TooltipWrapper>
        </div>
      </div>
      <div className="space-y-md">
        <h3 className="text-sm font-semibold">Focus States</h3>
        <p className="text-sm text-[hsl(var(--tm-text-muted))]">
          Use{" "}
          <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 font-mono text-xs">Tab</kbd>{" "}
          to focus buttons and see tooltips appear. Press{" "}
          <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 font-mono text-xs">
            Escape
          </kbd>{" "}
          to dismiss.
        </p>
        <div className="flex gap-md">
          <TooltipWrapper content="Tooltip for primary button" variant="primary">
            <Button variant="primary">Primary (Focus)</Button>
          </TooltipWrapper>
          <TooltipWrapper content="Tooltip for outline button" variant="outline">
            <Button variant="outline">Outline (Focus)</Button>
          </TooltipWrapper>
          <TooltipWrapper content="Tooltip for ghost button" variant="ghost">
            <Button variant="ghost">Ghost (Focus)</Button>
          </TooltipWrapper>
        </div>
      </div>
      <div className="space-y-md">
        <h3 className="text-sm font-semibold">Controlled State</h3>
        <div className="flex gap-md">
          <TooltipWrapper content="Controlled open tooltip" variant="primary" open={true}>
            <Button>Always Open</Button>
          </TooltipWrapper>
          <TooltipWrapper content="Controlled closed tooltip" variant="primary" open={false}>
            <Button>Always Closed</Button>
          </TooltipWrapper>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all variants and states (default, focus, controlled). Required for interactive components per VARIANTS_SIZE_CANON.",
      },
    },
  },
};
