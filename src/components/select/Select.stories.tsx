"use client";

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";

const meta: Meta<typeof Select.Root> = {
  title: "UI/Select",
  component: Select.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Select component for dropdown selection. Supports variants (primary, secondary, outline, ghost), sizes (xs, sm, md, lg), keyboard navigation, and full ARIA support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost"],
      description: "Select variant style",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
      description: "Select size",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable select interaction",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select.Root>;

export const Default: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger placeholder="Select an option" />
      <Select.Listbox>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
        <Select.Option value="option3">Option 3</Select.Option>
      </Select.Listbox>
    </Select.Root>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select.Root defaultValue="option2">
      <Select.Trigger placeholder="Select an option" />
      <Select.Listbox>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
        <Select.Option value="option3">Option 3</Select.Option>
      </Select.Listbox>
    </Select.Root>
  ),
};

export const Primary: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger variant="primary" placeholder="Select an option" />
      <Select.Listbox>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
        <Select.Option value="option3">Option 3</Select.Option>
      </Select.Listbox>
    </Select.Root>
  ),
};

export const Secondary: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger variant="secondary" placeholder="Select an option" />
      <Select.Listbox>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
        <Select.Option value="option3">Option 3</Select.Option>
      </Select.Listbox>
    </Select.Root>
  ),
};

export const Outline: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger variant="outline" placeholder="Select an option" />
      <Select.Listbox>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
        <Select.Option value="option3">Option 3</Select.Option>
      </Select.Listbox>
    </Select.Root>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger variant="ghost" placeholder="Select an option" />
      <Select.Listbox>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
        <Select.Option value="option3">Option 3</Select.Option>
      </Select.Listbox>
    </Select.Root>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Select.Root>
        <Select.Trigger variant="primary" placeholder="Primary variant" />
        <Select.Listbox>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select.Listbox>
      </Select.Root>
      <Select.Root>
        <Select.Trigger variant="secondary" placeholder="Secondary variant" />
        <Select.Listbox>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select.Listbox>
      </Select.Root>
      <Select.Root>
        <Select.Trigger variant="outline" placeholder="Outline variant" />
        <Select.Listbox>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select.Listbox>
      </Select.Root>
      <Select.Root>
        <Select.Trigger variant="ghost" placeholder="Ghost variant" />
        <Select.Listbox>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select.Listbox>
      </Select.Root>
    </div>
  ),
};

export const ExtraSmall: Story = {
  render: () => (
    <Select.Root size="xs">
      <Select.Trigger placeholder="Extra small" />
      <Select.Listbox>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
      </Select.Listbox>
    </Select.Root>
  ),
};

export const Small: Story = {
  render: () => (
    <Select.Root size="sm">
      <Select.Trigger placeholder="Small" />
      <Select.Listbox>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
      </Select.Listbox>
    </Select.Root>
  ),
};

export const Medium: Story = {
  render: () => (
    <Select.Root size="md">
      <Select.Trigger placeholder="Medium" />
      <Select.Listbox>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
      </Select.Listbox>
    </Select.Root>
  ),
};

export const Large: Story = {
  render: () => (
    <Select.Root size="lg">
      <Select.Trigger placeholder="Large" />
      <Select.Listbox>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
      </Select.Listbox>
    </Select.Root>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Select.Root size="xs">
        <Select.Trigger placeholder="Extra small" />
        <Select.Listbox>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select.Listbox>
      </Select.Root>
      <Select.Root size="sm">
        <Select.Trigger placeholder="Small" />
        <Select.Listbox>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select.Listbox>
      </Select.Root>
      <Select.Root size="md">
        <Select.Trigger placeholder="Medium" />
        <Select.Listbox>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select.Listbox>
      </Select.Root>
      <Select.Root size="lg">
        <Select.Trigger placeholder="Large" />
        <Select.Listbox>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select.Listbox>
      </Select.Root>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select.Root disabled defaultValue="option1">
      <Select.Trigger placeholder="Disabled select" />
      <Select.Listbox>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
        <Select.Option value="option3">Option 3</Select.Option>
      </Select.Listbox>
    </Select.Root>
  ),
};

export const DisabledOption: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger placeholder="Select an option" />
      <Select.Listbox>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2" disabled>
          Disabled Option
        </Select.Option>
        <Select.Option value="option3">Option 3</Select.Option>
      </Select.Listbox>
    </Select.Root>
  ),
};

export const LongList: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger placeholder="Choose a country" />
      <Select.Listbox>
        <Select.Option value="us">United States</Select.Option>
        <Select.Option value="uk">United Kingdom</Select.Option>
        <Select.Option value="ca">Canada</Select.Option>
        <Select.Option value="au">Australia</Select.Option>
        <Select.Option value="de">Germany</Select.Option>
        <Select.Option value="fr">France</Select.Option>
        <Select.Option value="es">Spain</Select.Option>
        <Select.Option value="it">Italy</Select.Option>
        <Select.Option value="nl">Netherlands</Select.Option>
        <Select.Option value="be">Belgium</Select.Option>
        <Select.Option value="ch">Switzerland</Select.Option>
        <Select.Option value="at">Austria</Select.Option>
        <Select.Option value="se">Sweden</Select.Option>
        <Select.Option value="no">Norway</Select.Option>
        <Select.Option value="dk">Denmark</Select.Option>
        <Select.Option value="fi">Finland</Select.Option>
        <Select.Option value="pl">Poland</Select.Option>
        <Select.Option value="cz">Czech Republic</Select.Option>
        <Select.Option value="pt">Portugal</Select.Option>
        <Select.Option value="gr">Greece</Select.Option>
        <Select.Option value="ie">Ireland</Select.Option>
        <Select.Option value="lu">Luxembourg</Select.Option>
      </Select.Listbox>
    </Select.Root>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>("option2");

    return (
      <div className="flex w-64 flex-col gap-md">
        <Select.Root value={value} onValueChange={setValue}>
          <Select.Trigger placeholder="Controlled select" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select.Listbox>
        </Select.Root>
        <p className="text-sm text-muted-foreground">Selected: {value ?? "none"}</p>
      </div>
    );
  },
};
