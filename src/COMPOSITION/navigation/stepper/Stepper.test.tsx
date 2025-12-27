import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "../../../test/test-utils";

import { Stepper, type StepperStep } from "./Stepper";

describe("Stepper", () => {
  const defaultSteps: StepperStep[] = [
    { id: "step1", label: "Step 1", description: "First step description" },
    { id: "step2", label: "Step 2", description: "Second step description" },
    { id: "step3", label: "Step 3", description: "Third step description" },
    { id: "step4", label: "Step 4", description: "Fourth step description" },
  ];

  describe("Rendering", () => {
    it("renders stepper with steps", () => {
      renderWithTheme(<Stepper.Root steps={defaultSteps} activeStep={1} />);

      expect(screen.getByText("Step 1")).toBeInTheDocument();
      expect(screen.getByText("Step 2")).toBeInTheDocument();
      expect(screen.getByText("Step 3")).toBeInTheDocument();
      expect(screen.getByText("Step 4")).toBeInTheDocument();
    });

    it("renders step descriptions when provided", () => {
      renderWithTheme(<Stepper.Root steps={defaultSteps} activeStep={1} />);

      expect(screen.getByText("First step description")).toBeInTheDocument();
      expect(screen.getByText("Second step description")).toBeInTheDocument();
    });

    it("renders step numbers by default", () => {
      renderWithTheme(<Stepper.Root steps={defaultSteps} activeStep={1} />);

      // When activeStep=1:
      // Step 0 is completed (shows check icon, not number)
      // Step 1 is active (shows number "2")
      // Step 2 is default (shows number "3")
      // Step 3 is default (shows number "4")
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
      expect(screen.getByText("4")).toBeInTheDocument();
      // Step 0 shows check icon, not number "1"
      expect(screen.queryByText("1")).not.toBeInTheDocument();
    });

    it("does not render step numbers when showNumbers is false", () => {
      renderWithTheme(<Stepper.Root steps={defaultSteps} activeStep={1} showNumbers={false} />);

      expect(screen.queryByText("1")).not.toBeInTheDocument();
      expect(screen.queryByText("2")).not.toBeInTheDocument();
    });

    it("renders custom icons when provided", () => {
      const stepsWithIcons: StepperStep[] = [
        { id: "step1", label: "Step 1", icon: <span data-testid="icon1">👤</span> },
        { id: "step2", label: "Step 2", icon: <span data-testid="icon2">📝</span> },
      ];

      renderWithTheme(<Stepper.Root steps={stepsWithIcons} activeStep={0} />);

      expect(screen.getByTestId("icon1")).toBeInTheDocument();
      expect(screen.getByTestId("icon2")).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("marks active step with aria-current", () => {
      const { container } = renderWithTheme(<Stepper.Root steps={defaultSteps} activeStep={1} />);

      const indicators = container.querySelectorAll('[aria-current="step"]');
      expect(indicators).toHaveLength(1);
    });

    it("renders completed steps with check icon", () => {
      const { container } = renderWithTheme(<Stepper.Root steps={defaultSteps} activeStep={2} />);

      // Step 0 and 1 should be completed (show check icon)
      // Step 2 should be active (show number)
      // Step 3 should be default (show number)
      // Check icons are SVG with aria-hidden="true", so we search by lucide-check class
      const checkIcons = container.querySelectorAll(".lucide-check");
      expect(checkIcons.length).toBe(2); // Steps 0 and 1 are completed
    });

    it("renders disabled steps correctly", () => {
      const stepsWithDisabled: StepperStep[] = [
        { id: "step1", label: "Step 1" },
        { id: "step2", label: "Step 2", disabled: true },
        { id: "step3", label: "Step 3" },
      ];

      renderWithTheme(<Stepper.Root steps={stepsWithDisabled} activeStep={0} />);

      // Disabled step should be rendered but not interactive
      expect(screen.getByText("Step 2")).toBeInTheDocument();
    });
  });

  describe("Orientation", () => {
    it("renders horizontal stepper by default", () => {
      const { container } = renderWithTheme(<Stepper.Root steps={defaultSteps} activeStep={1} />);

      const root = container.firstChild as HTMLElement;
      expect(root).toHaveClass("flex-row");
    });

    it("renders vertical stepper when orientation is vertical", () => {
      const { container } = renderWithTheme(
        <Stepper.Root steps={defaultSteps} activeStep={1} orientation="vertical" />,
      );

      const root = container.firstChild as HTMLElement;
      expect(root).toHaveClass("flex-col");
    });
  });

  describe("Edge Cases", () => {
    it("handles activeStep out of bounds (negative)", () => {
      renderWithTheme(<Stepper.Root steps={defaultSteps} activeStep={-1} />);

      // Should clamp to 0
      expect(screen.getByText("Step 1")).toBeInTheDocument();
    });

    it("handles activeStep out of bounds (too large)", () => {
      renderWithTheme(<Stepper.Root steps={defaultSteps} activeStep={10} />);

      // Should clamp to last step (index 3)
      expect(screen.getByText("Step 4")).toBeInTheDocument();
    });

    it("handles empty steps array", () => {
      const { container } = renderWithTheme(<Stepper.Root steps={[]} activeStep={0} />);

      // Should render without errors
      // The root has role="group" with aria-label
      const root = screen.getByRole("group", { name: /progress steps/i });
      expect(root).toBeInTheDocument();
      // Should have no step items
      const stepItems = container.querySelectorAll('[role="listitem"]');
      expect(stepItems).toHaveLength(0);
    });

    it("handles single step", () => {
      const singleStep: StepperStep[] = [{ id: "step1", label: "Step 1" }];

      renderWithTheme(<Stepper.Root steps={singleStep} activeStep={0} />);

      expect(screen.getByText("Step 1")).toBeInTheDocument();
    });
  });

  describe("Stepper.Content", () => {
    it("renders content when step is active", () => {
      renderWithTheme(
        <Stepper.Root steps={defaultSteps} activeStep={1}>
          <Stepper.Content stepIndex={1} isActive={true}>
            <div data-testid="content">Step 2 Content</div>
          </Stepper.Content>
        </Stepper.Root>,
      );

      expect(screen.getByTestId("content")).toBeInTheDocument();
    });

    it("does not render content when step is not active", () => {
      renderWithTheme(
        <Stepper.Root steps={defaultSteps} activeStep={0}>
          <Stepper.Content stepIndex={1} isActive={false}>
            <div data-testid="content">Step 2 Content</div>
          </Stepper.Content>
        </Stepper.Root>,
      );

      expect(screen.queryByTestId("content")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has role='group' on root container", () => {
      const { container } = renderWithTheme(<Stepper.Root steps={defaultSteps} activeStep={1} />);

      const root = container.firstChild as HTMLElement;
      expect(root).toHaveAttribute("role", "group");
    });

    it("has aria-label on root container", () => {
      const { container } = renderWithTheme(<Stepper.Root steps={defaultSteps} activeStep={1} />);

      const root = container.firstChild as HTMLElement;
      expect(root).toHaveAttribute("aria-label", "Progress steps");
    });

    it("has aria-orientation attribute", () => {
      const { container } = renderWithTheme(
        <Stepper.Root steps={defaultSteps} activeStep={1} orientation="vertical" />,
      );

      const root = container.firstChild as HTMLElement;
      expect(root).toHaveAttribute("aria-orientation", "vertical");
    });

    it("marks active step with aria-current='step'", () => {
      const { container } = renderWithTheme(<Stepper.Root steps={defaultSteps} activeStep={1} />);

      const indicators = container.querySelectorAll('[aria-current="step"]');
      expect(indicators.length).toBeGreaterThan(0);
    });

    it("marks disabled steps with aria-disabled", () => {
      const stepsWithDisabled: StepperStep[] = [
        { id: "step1", label: "Step 1" },
        { id: "step2", label: "Step 2", disabled: true },
      ];

      const { container } = renderWithTheme(
        <Stepper.Root steps={stepsWithDisabled} activeStep={0} />,
      );

      const disabledIndicator = container.querySelector('[aria-disabled="true"]');
      expect(disabledIndicator).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly to StepperRoot", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(<Stepper.Root ref={ref} steps={defaultSteps} activeStep={1} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref correctly to StepperContent", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(
        <Stepper.Root steps={defaultSteps} activeStep={1}>
          <Stepper.Content ref={ref} stepIndex={1} isActive={true}>
            Content
          </Stepper.Content>
        </Stepper.Root>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
