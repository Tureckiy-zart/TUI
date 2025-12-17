import type { Meta, StoryObj } from "@storybook/react";
import { Stepper, type StepperStep } from "./Stepper";

const meta: Meta<typeof Stepper.Root> = {
  title: "Components/Navigation/Stepper",
  component: Stepper.Root,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Token-driven stepper component for multi-step processes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the stepper",
    },
    activeStep: {
      control: { type: "number", min: 0 },
      description: "Current active step index (0-indexed)",
    },
    showNumbers: {
      control: "boolean",
      description: "Whether to show step numbers",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper.Root>;

const defaultSteps: StepperStep[] = [
  { id: "step1", label: "Step 1", description: "First step description" },
  { id: "step2", label: "Step 2", description: "Second step description" },
  { id: "step3", label: "Step 3", description: "Third step description" },
  { id: "step4", label: "Step 4", description: "Fourth step description" },
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 1,
  },
};

export const Horizontal: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 1,
    orientation: "horizontal",
  },
};

export const Vertical: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 1,
    orientation: "vertical",
  },
};

export const FirstStep: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 0,
  },
};

export const LastStep: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 3,
  },
};

export const AllCompleted: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 3,
  },
};

export const WithoutNumbers: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 1,
    showNumbers: false,
  },
};

export const WithIcons: Story = {
  render: () => {
    const steps: StepperStep[] = [
      { id: "step1", label: "Account", description: "Create account", icon: <span>👤</span> },
      { id: "step2", label: "Profile", description: "Set up profile", icon: <span>📝</span> },
      { id: "step3", label: "Verify", description: "Verify email", icon: <span>✉️</span> },
      { id: "step4", label: "Complete", description: "You're done!", icon: <span>✅</span> },
    ];
    return <Stepper.Root steps={steps} activeStep={1} />;
  },
};

export const WithContent: Story = {
  render: () => {
    const steps: StepperStep[] = [
      { id: "step1", label: "Step 1", description: "First step" },
      { id: "step2", label: "Step 2", description: "Second step" },
      { id: "step3", label: "Step 3", description: "Third step" },
    ];
    return (
      <div className="space-y-4">
        <Stepper.Root steps={steps} activeStep={1}>
          <Stepper.Content stepIndex={1} isActive={true}>
            <div className="rounded-md border p-4">
              <h3 className="font-semibold">Step 2 Content</h3>
              <p className="text-sm text-muted-foreground">This is the content for step 2.</p>
            </div>
          </Stepper.Content>
        </Stepper.Root>
      </div>
    );
  },
};
