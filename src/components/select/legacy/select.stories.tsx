"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

const meta: Meta<typeof Select> = {
  title: "UI/Select (Legacy)",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Legacy Select component for dropdown selection. Supports 3 sizes and 3 states (default, error, disabled) with token-driven styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Select size",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    state: {
      control: { type: "select" },
      options: ["default", "error", "disabled"],
      description: "Select state",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable select interaction",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
};

export const Small: Story = {
  render: () => (
    <Select size="sm">
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </Select>
  ),
};

export const Medium: Story = {
  render: () => (
    <Select size="md">
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </Select>
  ),
};

export const Large: Story = {
  render: () => (
    <Select size="lg">
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </Select>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Select size="sm">
        <option value="">Small select</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>
      <Select size="md">
        <option value="">Medium select</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>
      <Select size="lg">
        <option value="">Large select</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <Select state="error" defaultValue="invalid">
      <option value="">Select an option</option>
      <option value="invalid">Invalid option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled defaultValue="option1">
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </Select>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Select state="default" defaultValue="option1">
        <option value="">Default state</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
      <Select state="error" defaultValue="invalid">
        <option value="">Error state</option>
        <option value="invalid">Invalid</option>
        <option value="option1">Option 1</option>
      </Select>
      <Select state="disabled" disabled defaultValue="option1">
        <option value="">Disabled state</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    </div>
  ),
};

export const WithSelectedValue: Story = {
  render: () => (
    <Select defaultValue="option2">
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
};

export const ManyOptions: Story = {
  render: () => (
    <Select className="w-64">
      <option value="">Choose a country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
      <option value="au">Australia</option>
      <option value="de">Germany</option>
      <option value="fr">France</option>
      <option value="es">Spain</option>
      <option value="it">Italy</option>
    </Select>
  ),
};
