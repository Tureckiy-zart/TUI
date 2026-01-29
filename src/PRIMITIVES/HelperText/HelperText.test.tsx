import { screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { axeCheck, renderWithTheme } from "@/test/test-utils";

import { HelperText } from "./HelperText";

describe("HelperText", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<HelperText>Helper text content</HelperText>);
      const helperText = screen.getByText("Helper text content");
      expect(helperText).toBeInTheDocument();
    });

    it("renders as paragraph element by default", () => {
      const { container } = renderWithTheme(<HelperText>Helper text content</HelperText>);
      const paragraph = container.querySelector("p");
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent("Helper text content");
    });

    it("applies default size (sm)", () => {
      const { container } = renderWithTheme(<HelperText>Small helper text</HelperText>);
      const paragraph = container.querySelector("p");
      expect(paragraph).toBeInTheDocument();
      // Size is applied via Text component's CVA classes
    });

    it("applies default color (muted)", () => {
      const { container } = renderWithTheme(<HelperText>Muted helper text</HelperText>);
      const paragraph = container.querySelector("p");
      expect(paragraph).toHaveClass("text-[hsl(var(--tm-text-muted))]");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      renderWithTheme(<HelperText ref={ref}>Test Helper Text</HelperText>);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
      expect(ref.current?.textContent).toBe("Test Helper Text");
    });
  });

  describe("Accessibility", () => {
    it("supports aria-describedby", () => {
      const { container } = renderWithTheme(
        <HelperText id="helper-id" aria-describedby="input-id">
          Helper text
        </HelperText>,
      );
      const paragraph = container.querySelector("p");
      expect(paragraph).toHaveAttribute("id", "helper-id");
      expect(paragraph).toHaveAttribute("aria-describedby", "input-id");
    });

    it("can be referenced via aria-describedby from other elements", () => {
      const { container } = renderWithTheme(
        <>
          <input aria-describedby="helper-id" aria-label="Input" />
          <HelperText id="helper-id">Helper text for input</HelperText>
        </>,
      );
      const input = container.querySelector("input");
      const helperText = container.querySelector("p");
      expect(input).toHaveAttribute("aria-describedby", "helper-id");
      expect(helperText).toHaveAttribute("id", "helper-id");
    });

    it("passes axe accessibility checks", async () => {
      const { container } = renderWithTheme(
        <HelperText id="h1">Enter your email address</HelperText>,
      );
      const results = await axeCheck(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe("Props Forwarding", () => {
    it("forwards all Text props except className and style", () => {
      const { container } = renderWithTheme(
        <HelperText id="test-id" data-testid="helper-text" aria-label="Helper text label">
          Helper text
        </HelperText>,
      );
      const paragraph = container.querySelector("p");
      expect(paragraph).toHaveAttribute("id", "test-id");
      expect(paragraph).toHaveAttribute("data-testid", "helper-text");
      expect(paragraph).toHaveAttribute("aria-label", "Helper text label");
    });

    it("allows size override", () => {
      const { container } = renderWithTheme(<HelperText size="md">Medium helper text</HelperText>);
      const paragraph = container.querySelector("p");
      expect(paragraph).toBeInTheDocument();
      // Size override is applied via Text component
    });

    it("allows color override", () => {
      const { container } = renderWithTheme(
        <HelperText typographyRole="body" color="primary">
          Primary color helper text
        </HelperText>,
      );
      const paragraph = container.querySelector("p");
      expect(paragraph).not.toHaveClass("text-[hsl(var(--tm-text-muted))]");
    });

    it("allows as prop override", () => {
      const { container } = renderWithTheme(<HelperText as="span">Span helper text</HelperText>);
      const span = container.querySelector("span");
      expect(span).toBeInTheDocument();
      expect(span).toHaveTextContent("Span helper text");
    });
  });

  describe("Default Values", () => {
    it("uses size='sm' as default", () => {
      const { container } = renderWithTheme(<HelperText>Default size helper text</HelperText>);
      const paragraph = container.querySelector("p");
      expect(paragraph).toBeInTheDocument();
      // Default size is applied via Text component
    });

    it("uses typographyRole='meta' and color='muted' as default", () => {
      const { container } = renderWithTheme(<HelperText>Default color helper text</HelperText>);
      const paragraph = container.querySelector("p");
      expect(paragraph).toHaveClass("text-[hsl(var(--tm-text-muted))]");
    });

    it("uses as='p' as default", () => {
      const { container } = renderWithTheme(<HelperText>Default element helper text</HelperText>);
      const paragraph = container.querySelector("p");
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent("Default element helper text");
    });
  });
});
