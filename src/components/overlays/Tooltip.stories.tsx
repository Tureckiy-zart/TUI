import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  TooltipWrapper,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./Tooltip";
import { Button } from "../primitives/Button";
import { Badge } from "../primitives/Badge";
import { Input } from "../primitives/Input";
import { Label } from "../primitives/Label";
import { Info, HelpCircle, AlertCircle } from "lucide-react";

const meta: Meta<typeof TooltipWrapper> = {
  title: "Components/Overlays/Tooltip",
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

export const WithLongContent: Story = {
  args: {
    content:
      "This is a longer tooltip message that provides more detailed information about the element.",
    children: <Button>Hover for details</Button>,
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
            <Info className="h-4 w-4 text-muted-foreground" />
          </TooltipWrapper>
        </div>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>

      <div className="space-y-sm">
        <div className="flex items-center gap-sm">
          <Label htmlFor="password">Password</Label>
          <TooltipWrapper content="Password must be at least 8 characters long" variant="secondary">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
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
      <TooltipWrapper content="Fast tooltip (200ms delay)" delayDuration={200}>
        <Button>Fast Tooltip</Button>
      </TooltipWrapper>

      <TooltipWrapper content="Slow tooltip (1000ms delay)" delayDuration={1000}>
        <Button>Slow Tooltip</Button>
      </TooltipWrapper>

      <TooltipWrapper content="No delay tooltip" delayDuration={0}>
        <Button>No Delay</Button>
      </TooltipWrapper>
    </div>
  ),
};
