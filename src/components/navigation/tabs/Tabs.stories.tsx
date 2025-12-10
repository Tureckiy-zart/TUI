import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs.Root> = {
  title: "Components/Navigation/Tabs",
  component: Tabs.Root,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Token-driven tabs component with full keyboard navigation and accessibility support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the tabs",
    },
    defaultValue: {
      control: "text",
      description: "Default value for uncontrolled usage",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs.Root>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("tab1");
    return (
      <Tabs.Root value={value} onValueChange={setValue}>
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <div className="p-4">Content for Tab 1</div>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <div className="p-4">Content for Tab 2</div>
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <div className="p-4">Content for Tab 3</div>
        </Tabs.Content>
      </Tabs.Root>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = React.useState("tab1");
    const [value2, setValue2] = React.useState("tab1");
    const [value3, setValue3] = React.useState("tab1");
    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-2 text-sm font-medium">Small</h3>
          <Tabs.Root value={value1} onValueChange={setValue1}>
            <Tabs.List size="sm">
              <Tabs.Trigger value="tab1" size="sm">
                Tab 1
              </Tabs.Trigger>
              <Tabs.Trigger value="tab2" size="sm">
                Tab 2
              </Tabs.Trigger>
              <Tabs.Trigger value="tab3" size="sm">
                Tab 3
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Medium (Default)</h3>
          <Tabs.Root value={value2} onValueChange={setValue2}>
            <Tabs.List size="md">
              <Tabs.Trigger value="tab1" size="md">
                Tab 1
              </Tabs.Trigger>
              <Tabs.Trigger value="tab2" size="md">
                Tab 2
              </Tabs.Trigger>
              <Tabs.Trigger value="tab3" size="md">
                Tab 3
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Large</h3>
          <Tabs.Root value={value3} onValueChange={setValue3}>
            <Tabs.List size="lg">
              <Tabs.Trigger value="tab1" size="lg">
                Tab 1
              </Tabs.Trigger>
              <Tabs.Trigger value="tab2" size="lg">
                Tab 2
              </Tabs.Trigger>
              <Tabs.Trigger value="tab3" size="lg">
                Tab 3
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [value, setValue] = React.useState("tab1");
    return (
      <Tabs.Root value={value} onValueChange={setValue} orientation="vertical">
        <Tabs.List orientation="vertical">
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <div className="p-4">Content for Tab 1</div>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <div className="p-4">Content for Tab 2</div>
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <div className="p-4">Content for Tab 3</div>
        </Tabs.Content>
      </Tabs.Root>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = React.useState("tab1");
    return (
      <Tabs.Root value={value} onValueChange={setValue}>
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2" disabled>
            Tab 2 (Disabled)
          </Tabs.Trigger>
          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <div className="p-4">Content for Tab 1</div>
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <div className="p-4">Content for Tab 3</div>
        </Tabs.Content>
      </Tabs.Root>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">
        <div className="p-4">Content for Tab 1</div>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <div className="p-4">Content for Tab 2</div>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <div className="p-4">Content for Tab 3</div>
      </Tabs.Content>
    </Tabs.Root>
  ),
};
