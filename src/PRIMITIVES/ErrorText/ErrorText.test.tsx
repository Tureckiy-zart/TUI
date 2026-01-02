import { screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { ErrorText } from "./ErrorText";

describe("ErrorText", () => {
  describe("Rendering", () => {
    it("renders error message", () => {
      renderWithTheme(<ErrorText>Error message here</ErrorText>);
      const error = screen.getByText("Error message here");
      expect(error).toBeInTheDocument();
    });

    it("renders as p element by default", () => {
      renderWithTheme(<ErrorText>Error message</ErrorText>);
      const error = screen.getByRole("alert");
      expect(error.tagName).toBe("P");
    });

    it("renders Text component with small size", () => {
      renderWithTheme(<ErrorText>Small error text</ErrorText>);
      const error = screen.getByText("Small error text");
      // Text component with size="sm" renders as span inside p
      expect(error.tagName).toBe("SPAN");
      expect(error.parentElement?.tagName).toBe("P");
    });
  });

  describe("Accessibility", () => {
    it("has role='alert' attribute", () => {
      renderWithTheme(<ErrorText>Error message</ErrorText>);
      const error = screen.getByRole("alert");
      expect(error).toHaveAttribute("role", "alert");
    });

    it("has aria-live='polite' attribute", () => {
      renderWithTheme(<ErrorText>Error message</ErrorText>);
      const error = screen.getByRole("alert");
      expect(error).toHaveAttribute("aria-live", "polite");
    });

    it("is accessible via getByRole", () => {
      renderWithTheme(<ErrorText>Accessible error</ErrorText>);
      const error = screen.getByRole("alert");
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent("Accessible error");
    });

    it("supports id prop for aria-describedby linking", () => {
      renderWithTheme(<ErrorText id="email-error">Email is required</ErrorText>);
      const error = screen.getByRole("alert");
      expect(error).toHaveAttribute("id", "email-error");
    });

    it("has ARIA attributes in asChild mode", () => {
      renderWithTheme(
        <ErrorText asChild>
          <div data-testid="custom-error">Custom error element</div>
        </ErrorText>,
      );
      const customError = screen.getByTestId("custom-error");
      expect(customError).toHaveAttribute("role", "alert");
      expect(customError).toHaveAttribute("aria-live", "polite");
    });

    it("uses semantic p element for accessibility", () => {
      renderWithTheme(<ErrorText>Semantic error</ErrorText>);
      const error = screen.getByRole("alert");
      expect(error.tagName).toBe("P");
    });

    it("supports aria-describedby linking with form controls", () => {
      renderWithTheme(
        <>
          <input id="test-input" aria-describedby="test-error" />
          <ErrorText id="test-error">Test error message</ErrorText>
        </>,
      );
      const input = screen.getByRole("textbox");
      const error = screen.getByRole("alert");
      expect(input).toHaveAttribute("aria-describedby", "test-error");
      expect(error).toHaveAttribute("id", "test-error");
    });
  });

  describe("Styling", () => {
    it("applies destructive color styling", () => {
      renderWithTheme(<ErrorText>Destructive error</ErrorText>);
      const error = screen.getByRole("alert");
      expect(error).toHaveClass("text-destructive");
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      renderWithTheme(<ErrorText ref={ref}>Test Error</ErrorText>);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
      expect(ref.current).toHaveAttribute("role", "alert");
    });

    it("ref points to p element", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      renderWithTheme(<ErrorText ref={ref}>Test Error</ErrorText>);
      expect(ref.current?.tagName).toBe("P");
    });
  });

  describe("asChild prop", () => {
    it("renders through Slot when asChild is true", () => {
      renderWithTheme(
        <ErrorText asChild>
          <div data-testid="custom-error">Custom error element</div>
        </ErrorText>,
      );
      const customError = screen.getByTestId("custom-error");
      expect(customError).toBeInTheDocument();
      // Slot applies attributes to the child element
      expect(customError).toHaveAttribute("role", "alert");
      expect(customError).toHaveAttribute("aria-live", "polite");
    });

    it("applies destructive color to Slot element", () => {
      renderWithTheme(
        <ErrorText asChild>
          <div data-testid="custom-error">Custom error</div>
        </ErrorText>,
      );
      const customError = screen.getByTestId("custom-error");
      // Slot merges className with child element
      expect(customError).toHaveClass("text-destructive");
    });

    it("forwards ref to Slot child element when asChild is true", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(
        <ErrorText asChild ref={ref}>
          <div data-testid="custom-error">Custom error</div>
        </ErrorText>,
      );
      // Slot forwards ref to the child element
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute("role", "alert");
      expect(ref.current).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("HTML attributes", () => {
    it("forwards HTML attributes", () => {
      renderWithTheme(
        <ErrorText id="test-error" data-testid="error-text" aria-label="Error">
          Error message
        </ErrorText>,
      );
      const error = screen.getByTestId("error-text");
      expect(error).toHaveAttribute("id", "test-error");
      expect(error).toHaveAttribute("aria-label", "Error");
    });

    it("supports aria-describedby pattern", () => {
      renderWithTheme(
        <>
          <input id="email" aria-describedby="email-error" />
          <ErrorText id="email-error">Email is required</ErrorText>
        </>,
      );
      const input = screen.getByRole("textbox");
      const error = screen.getByRole("alert");
      expect(input).toHaveAttribute("aria-describedby", "email-error");
      expect(error).toHaveAttribute("id", "email-error");
    });
  });

  describe("Content", () => {
    it("renders children content", () => {
      renderWithTheme(
        <ErrorText>
          <strong>Error:</strong> This field is required.
        </ErrorText>,
      );
      const error = screen.getByRole("alert");
      expect(error).toHaveTextContent("Error:");
      expect(error).toHaveTextContent("This field is required.");
    });

    it("renders complex content", () => {
      renderWithTheme(
        <ErrorText>
          <span>Multiple</span>
          <span>error</span>
          <span>parts</span>
        </ErrorText>,
      );
      const error = screen.getByRole("alert");
      expect(error).toHaveTextContent("Multiple");
      expect(error).toHaveTextContent("error");
      expect(error).toHaveTextContent("parts");
    });
  });
});
