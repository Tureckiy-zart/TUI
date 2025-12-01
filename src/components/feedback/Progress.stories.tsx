import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 45,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Half: Story = {
  args: {
    value: 50,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = useState(45);

    return (
      <div className="space-y-md">
        <div>
          <label className="mb-sm block text-sm font-medium">Progress: {progress}%</label>
          <Progress value={progress} />
          <div className="mt-sm flex gap-sm">
            <button
              onClick={() => setProgress(Math.max(0, progress - 10))}
              className="rounded bg-secondary px-sm py-xs text-sm text-secondary-foreground hover:bg-secondary/80"
            >
              -10%
            </button>
            <button
              onClick={() => setProgress(Math.min(100, progress + 10))}
              className="rounded bg-secondary px-sm py-xs text-sm text-secondary-foreground hover:bg-secondary/80"
            >
              +10%
            </button>
          </div>
        </div>
      </div>
    );
  },
};
