import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Progress, type ProgressSize } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Foundation Locked/Primitives/Progress",
  component: Progress,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "Progress value (0-max)",
    },
    max: {
      control: { type: "number" },
      description: "Maximum progress value",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Progress bar size",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default progress bar (md size, 45%)
 */
export const Default: Story = {
  args: {
    value: 45,
    size: "md",
  },
};

/**
 * Empty progress bar (0%)
 */
export const Empty: Story = {
  args: {
    value: 0,
    size: "md",
  },
};

/**
 * Half progress bar (50%)
 */
export const Half: Story = {
  args: {
    value: 50,
    size: "md",
  },
};

/**
 * Full progress bar (100%)
 */
export const Full: Story = {
  args: {
    value: 100,
    size: "md",
  },
};

/**
 * SizesGallery story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates all size variants (sm, md, lg) at different progress values
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: ProgressSize[] = ["sm", "md", "lg"];
    const progressValues = [0, 25, 50, 75, 100];

    return (
      <div className="space-y-lg">
        {sizes.map((size) => (
          <div key={size} className="space-y-sm">
            <h3 className="text-sm font-semibold capitalize">Size: {size}</h3>
            <div className="space-y-xs">
              {progressValues.map((value) => (
                <div key={value} className="space-y-xs">
                  <div className="text-xs font-medium text-foreground">{value}%</div>
                  <Progress value={value} size={size} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Interactive progress bar with controls
 */
export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = useState(45);
    const [size, setSize] = useState<ProgressSize>("md");

    return (
      <div className="space-y-md">
        <div>
          <label className="mb-sm block text-sm font-medium">Progress: {progress}%</label>
          <Progress value={progress} size={size} />
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
            <button
              onClick={() => setProgress(0)}
              className="rounded bg-secondary px-sm py-xs text-sm text-secondary-foreground hover:bg-secondary/80"
            >
              Reset
            </button>
          </div>
        </div>

        <div>
          <label className="mb-sm block text-sm font-medium">Size: {size}</label>
          <div className="flex gap-sm">
            {(["sm", "md", "lg"] as ProgressSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded px-sm py-xs text-sm ${
                  size === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Upload Progress Example
 * Realistic use case: file upload progress
 */
export const UploadProgress: Story = {
  render: () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const startUpload = () => {
      setIsUploading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    };

    return (
      <div className="max-w-md space-y-md">
        <div>
          <div className="mb-sm flex items-center justify-between">
            <span className="text-sm font-medium">Uploading file.pdf</span>
            <span className="text-sm font-medium text-foreground">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} size="md" />
        </div>

        <button
          onClick={startUpload}
          disabled={isUploading}
          className="rounded bg-primary px-md py-sm text-sm text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Start Upload"}
        </button>
      </div>
    );
  },
};

/**
 * Multi-Step Wizard Example
 * Realistic use case: multi-step form progress
 */
export const MultiStepWizard: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    const progress = (currentStep / totalSteps) * 100;

    return (
      <div className="max-w-md space-y-md">
        <div>
          <div className="mb-sm flex items-center justify-between">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} size="md" />
        </div>

        <div className="flex gap-sm">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="rounded bg-secondary px-md py-sm text-sm text-secondary-foreground hover:bg-secondary/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
            disabled={currentStep === totalSteps}
            className="rounded bg-primary px-md py-sm text-sm text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {currentStep === totalSteps ? "Complete" : "Next"}
          </button>
        </div>
      </div>
    );
  },
};

/**
 * Size Comparison
 * Visual comparison of all sizes side by side
 */
export const SizeComparison: Story = {
  render: () => {
    return (
      <div className="max-w-md space-y-lg">
        <div className="space-y-sm">
          <div className="text-sm font-medium">Small (sm)</div>
          <Progress value={75} size="sm" />
        </div>

        <div className="space-y-sm">
          <div className="text-sm font-medium">Medium (md) - Default</div>
          <Progress value={75} size="md" />
        </div>

        <div className="space-y-sm">
          <div className="text-sm font-medium">Large (lg)</div>
          <Progress value={75} size="lg" />
        </div>
      </div>
    );
  },
};
