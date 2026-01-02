import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

import { Button } from "@/PRIMITIVES/Button/Button";
import { ButtonGroup, useButtonGroupContext } from "./ButtonGroup";

describe("ButtonGroup component", () => {
  describe("Rendering", () => {
    it("should render ButtonGroup with default props", () => {
      const { container } = render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const group = container.firstChild;
      expect(group).toBeInTheDocument();
      expect(group).toHaveClass("flex", "flex-row");
    });

    it("should render children buttons", () => {
      render(
        <ButtonGroup>
          <Button>Save</Button>
          <Button>Cancel</Button>
        </ButtonGroup>,
      );
      expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    });
  });

  describe("Orientation", () => {
    it("should apply horizontal direction by default", () => {
      const { container } = render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const group = container.firstChild;
      expect(group).toHaveClass("flex-row");
    });

    it("should apply horizontal direction when orientation is horizontal", () => {
      const { container } = render(
        <ButtonGroup orientation="horizontal">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const group = container.firstChild;
      expect(group).toHaveClass("flex-row");
    });

    it("should apply vertical direction when orientation is vertical", () => {
      const { container } = render(
        <ButtonGroup orientation="vertical">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const group = container.firstChild;
      expect(group).toHaveClass("flex-col");
    });
  });

  describe("Spacing", () => {
    it("should apply default spacing (sm) using spacing tokens", () => {
      const { container } = render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const group = container.firstChild as HTMLElement;
      expect(group).toHaveStyle({ gap: "var(--spacing-sm)" });
    });

    it("should apply custom spacing using spacing tokens", () => {
      const { container, rerender } = render(
        <ButtonGroup spacing="md">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const group = container.firstChild as HTMLElement;
      expect(group).toHaveStyle({ gap: "var(--spacing-md)" });

      rerender(
        <ButtonGroup spacing="lg">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      expect(group).toHaveStyle({ gap: "var(--spacing-lg)" });
    });

    it("should apply xs spacing", () => {
      const { container } = render(
        <ButtonGroup spacing="xs">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const group = container.firstChild as HTMLElement;
      expect(group).toHaveStyle({ gap: "var(--spacing-xs)" });
    });

    it("should apply xl spacing", () => {
      const { container } = render(
        <ButtonGroup spacing="xl">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const group = container.firstChild as HTMLElement;
      expect(group).toHaveStyle({ gap: "var(--spacing-xl)" });
    });
  });

  describe("Accessibility", () => {
    it("should have role='group' attribute", () => {
      const { container } = render(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const group = container.firstChild as HTMLElement;
      expect(group).toHaveAttribute("role", "group");
    });

    it("should not have aria-orientation attribute (not valid for role='group' per ARIA spec)", () => {
      const { container: verticalContainer } = render(
        <ButtonGroup orientation="vertical">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const verticalGroup = verticalContainer.firstChild as HTMLElement;
      expect(verticalGroup).not.toHaveAttribute("aria-orientation");

      const { container: horizontalContainer } = render(
        <ButtonGroup orientation="horizontal">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const horizontalGroup = horizontalContainer.firstChild as HTMLElement;
      expect(horizontalGroup).not.toHaveAttribute("aria-orientation");
    });

    it("should exclude aria-orientation even if passed via props", () => {
      // Test that aria-orientation is excluded even if someone tries to pass it
      // This ensures the destructuring in ButtonGroup works correctly
      const { container } = render(
        <ButtonGroup
          orientation="vertical"
          {...({ "aria-orientation": "vertical" } as React.HTMLAttributes<HTMLDivElement>)}
        >
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const group = container.firstChild as HTMLElement;
      expect(group).toHaveAttribute("role", "group");
      expect(group).not.toHaveAttribute("aria-orientation");
    });
  });

  describe("Context Propagation", () => {
    it("should provide context with size prop", () => {
      const TestComponent = () => {
        const context = useButtonGroupContext();
        return <div data-testid="context">{context?.size || "none"}</div>;
      };

      render(
        <ButtonGroup size="md">
          <TestComponent />
        </ButtonGroup>,
      );
      expect(screen.getByTestId("context")).toHaveTextContent("md");
    });

    it("should provide context with variant prop", () => {
      const TestComponent = () => {
        const context = useButtonGroupContext();
        return <div data-testid="context">{context?.variant || "none"}</div>;
      };

      render(
        <ButtonGroup variant="primary">
          <TestComponent />
        </ButtonGroup>,
      );
      expect(screen.getByTestId("context")).toHaveTextContent("primary");
    });

    it("should provide context with disabled prop", () => {
      const TestComponent = () => {
        const context = useButtonGroupContext();
        return <div data-testid="context">{context?.disabled ? "disabled" : "enabled"}</div>;
      };

      render(
        <ButtonGroup disabled>
          <TestComponent />
        </ButtonGroup>,
      );
      expect(screen.getByTestId("context")).toHaveTextContent("disabled");
    });

    it("should provide context with all props", () => {
      const TestComponent = () => {
        const context = useButtonGroupContext();
        return (
          <div data-testid="context">
            {context?.size}-{context?.variant}-{context?.disabled ? "disabled" : "enabled"}
          </div>
        );
      };

      render(
        <ButtonGroup size="lg" variant="outline" disabled>
          <TestComponent />
        </ButtonGroup>,
      );
      expect(screen.getByTestId("context")).toHaveTextContent("lg-outline-disabled");
    });

    it("should return undefined context when not within ButtonGroup", () => {
      const TestComponent = () => {
        const context = useButtonGroupContext();
        return <div data-testid="context">{context === undefined ? "undefined" : "defined"}</div>;
      };

      render(<TestComponent />);
      expect(screen.getByTestId("context")).toHaveTextContent("undefined");
    });
  });

  describe("Stack Props", () => {
    it("should pass align prop to Stack", () => {
      const { container } = render(
        <ButtonGroup align="center">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const group = container.firstChild;
      expect(group).toHaveClass("items-center");
    });

    it("should pass justify prop to Stack", () => {
      const { container } = render(
        <ButtonGroup justify="between">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const group = container.firstChild;
      expect(group).toHaveClass("justify-between");
    });

    it("should merge custom className", () => {
      const { container } = render(
        <ButtonGroup className="custom-class">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      const group = container.firstChild;
      expect(group).toHaveClass("custom-class");
    });
  });

  describe("Ref Forwarding", () => {
    it("should forward ref to Stack element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ButtonGroup ref={ref}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.tagName).toBe("DIV");
      expect(ref.current).toHaveAttribute("role", "group");
    });
  });

  describe("Integration with Button", () => {
    it("should render multiple buttons correctly", () => {
      render(
        <ButtonGroup>
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>,
      );
      expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
    });

    it("should work with buttons that have explicit props", () => {
      render(
        <ButtonGroup size="md" variant="primary">
          <Button size="sm" variant="outline">
            Small Outline
          </Button>
          <Button>Medium Primary</Button>
        </ButtonGroup>,
      );
      expect(screen.getByRole("button", { name: /small outline/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /medium primary/i })).toBeInTheDocument();
    });
  });
});
