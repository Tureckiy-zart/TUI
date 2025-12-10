"use client";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Textarea } from "@/components/textarea";
import type { Meta, StoryObj } from "@storybook/react";
import { Field } from "./field";

const meta: Meta<typeof Field> = {
  title: "UI/Field",
  component: Field,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Field API provides a composable structure for form fields with label, control, description, and error message. Uses Stack and Text primitives with token-based spacing.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicInput: Story = {
  render: () => (
    <Field className="w-64">
      <Field.Label htmlFor="basic-input">Email Address</Field.Label>
      <Field.Control>
        <Input id="basic-input" type="email" placeholder="you@example.com" />
      </Field.Control>
    </Field>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field className="w-64">
      <Field.Label htmlFor="desc-input">Username</Field.Label>
      <Field.Control>
        <Input id="desc-input" placeholder="Enter your username" />
      </Field.Control>
      <Field.Description>Choose a unique username for your account</Field.Description>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field className="w-64">
      <Field.Label htmlFor="error-input">Email Address</Field.Label>
      <Field.Control>
        <Input id="error-input" type="email" state="error" defaultValue="invalid-email" />
      </Field.Control>
      <Field.Error>Please enter a valid email address</Field.Error>
    </Field>
  ),
};

export const RequiredField: Story = {
  render: () => (
    <Field className="w-64">
      <Field.Label htmlFor="required-input" required>
        Full Name
      </Field.Label>
      <Field.Control>
        <Input id="required-input" placeholder="John Doe" />
      </Field.Control>
    </Field>
  ),
};

export const TextareaField: Story = {
  render: () => (
    <Field className="w-64">
      <Field.Label htmlFor="textarea-field">Message</Field.Label>
      <Field.Control>
        <Textarea id="textarea-field" placeholder="Enter your message..." rows={4} />
      </Field.Control>
      <Field.Description>Maximum 500 characters</Field.Description>
    </Field>
  ),
};

export const SelectField: Story = {
  render: () => (
    <Field className="w-64">
      <Field.Label htmlFor="select-field">Country</Field.Label>
      <Field.Control>
        <Select.Root>
          <Select.Trigger id="select-field" placeholder="Select a country" />
          <Select.Listbox>
            <Select.Option value="us">United States</Select.Option>
            <Select.Option value="uk">United Kingdom</Select.Option>
            <Select.Option value="ca">Canada</Select.Option>
          </Select.Listbox>
        </Select.Root>
      </Field.Control>
    </Field>
  ),
};

export const CompleteForm: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-lg">
      <Field>
        <Field.Label htmlFor="form-name" required>
          Full Name
        </Field.Label>
        <Field.Control>
          <Input id="form-name" placeholder="John Doe" />
        </Field.Control>
      </Field>

      <Field>
        <Field.Label htmlFor="form-email" required>
          Email Address
        </Field.Label>
        <Field.Control>
          <Input id="form-email" type="email" placeholder="you@example.com" />
        </Field.Control>
        <Field.Description>We'll never share your email with anyone else</Field.Description>
      </Field>

      <Field>
        <Field.Label htmlFor="form-country">Country</Field.Label>
        <Field.Control>
          <Select.Root>
            <Select.Trigger id="form-country" placeholder="Select a country" />
            <Select.Listbox>
              <Select.Option value="us">United States</Select.Option>
              <Select.Option value="uk">United Kingdom</Select.Option>
              <Select.Option value="ca">Canada</Select.Option>
            </Select.Listbox>
          </Select.Root>
        </Field.Control>
      </Field>

      <Field>
        <Field.Label htmlFor="form-message">Message</Field.Label>
        <Field.Control>
          <Textarea id="form-message" placeholder="Your message..." rows={4} />
        </Field.Control>
        <Field.Description>Optional message</Field.Description>
      </Field>
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <Field className="w-64">
      <Field.Label htmlFor="error-field" required>
        Password
      </Field.Label>
      <Field.Control>
        <Input id="error-field" type="password" state="error" defaultValue="weak" />
      </Field.Control>
      <Field.Error>Password must be at least 8 characters long</Field.Error>
    </Field>
  ),
};

export const DisabledField: Story = {
  render: () => (
    <Field className="w-64">
      <Field.Label htmlFor="disabled-field">Disabled Input</Field.Label>
      <Field.Control>
        <Input id="disabled-field" disabled defaultValue="Cannot edit" />
      </Field.Control>
      <Field.Description>This field is disabled</Field.Description>
    </Field>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-lg">
      <Field>
        <Field.Label htmlFor="small-input">Small Input</Field.Label>
        <Field.Control>
          <Input id="small-input" size="sm" placeholder="Small" />
        </Field.Control>
      </Field>

      <Field>
        <Field.Label htmlFor="medium-input">Medium Input</Field.Label>
        <Field.Control>
          <Input id="medium-input" size="md" placeholder="Medium" />
        </Field.Control>
      </Field>

      <Field>
        <Field.Label htmlFor="large-input">Large Input</Field.Label>
        <Field.Control>
          <Input id="large-input" size="lg" placeholder="Large" />
        </Field.Control>
      </Field>
    </div>
  ),
};
