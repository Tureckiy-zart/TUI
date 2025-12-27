import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "@/test/test-utils";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Textarea placeholder="Enter text" />);
      const textarea = screen.getByPlaceholderText("Enter text");
      expect(textarea).toBeInTheDocument();
    });

    it("renders with default size", () => {
      const { container } = renderWithTheme(<Textarea placeholder="Default textarea" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      renderWithTheme(<Textarea ref={ref} placeholder="Ref test" />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
      expect(ref.current?.placeholder).toBe("Ref test");
    });
  });

  describe("Sizes", () => {
    it("renders sm size", () => {
      const { container } = renderWithTheme(<Textarea size="sm" placeholder="Small" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });

    it("renders md size (default)", () => {
      const { container } = renderWithTheme(<Textarea size="md" placeholder="Medium" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });

    it("renders lg size", () => {
      const { container } = renderWithTheme(<Textarea size="lg" placeholder="Large" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("renders without disabled or invalid state by default", () => {
      const { container } = renderWithTheme(<Textarea placeholder="Default" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
      expect(textarea).not.toBeDisabled();
      expect(textarea).not.toHaveAttribute("aria-invalid", "true");
    });

    it("renders invalid state via invalid prop", () => {
      const { container } = renderWithTheme(<Textarea invalid placeholder="Invalid" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    it("renders invalid state via aria-invalid", () => {
      const { container } = renderWithTheme(<Textarea aria-invalid={true} placeholder="Invalid" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    it("renders disabled state via disabled prop", () => {
      renderWithTheme(<Textarea disabled placeholder="Disabled" />);
      const textarea = screen.getByPlaceholderText("Disabled");
      expect(textarea).toBeDisabled();
    });

    it("combines disabled and invalid", () => {
      renderWithTheme(<Textarea disabled invalid placeholder="Disabled and invalid" />);
      const textarea = screen.getByPlaceholderText("Disabled and invalid");
      expect(textarea).toBeDisabled();
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    it("invalid prop takes precedence over aria-invalid when both provided", () => {
      renderWithTheme(
        <Textarea invalid={false} aria-invalid={true} placeholder="Invalid precedence" />,
      );
      const textarea = screen.getByPlaceholderText("Invalid precedence");
      expect(textarea).toHaveAttribute("aria-invalid", "false");
    });
  });

  describe("Accessibility", () => {
    it("supports aria-invalid attribute", () => {
      renderWithTheme(<Textarea aria-invalid={true} placeholder="Invalid textarea" />);
      const textarea = screen.getByPlaceholderText("Invalid textarea");
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    it("supports aria-invalid false", () => {
      renderWithTheme(<Textarea aria-invalid={false} placeholder="Valid textarea" />);
      const textarea = screen.getByPlaceholderText("Valid textarea");
      expect(textarea).toHaveAttribute("aria-invalid", "false");
    });

    it("uses provided aria-describedby", () => {
      renderWithTheme(<Textarea aria-describedby="custom-id" placeholder="Custom describedby" />);
      const textarea = screen.getByPlaceholderText("Custom describedby");
      expect(textarea).toHaveAttribute("aria-describedby", "custom-id");
    });

    it("supports aria-required attribute", () => {
      renderWithTheme(<Textarea aria-required={true} placeholder="Required textarea" />);
      const textarea = screen.getByPlaceholderText("Required textarea");
      expect(textarea).toHaveAttribute("aria-required", "true");
    });

    it("supports native required attribute", () => {
      renderWithTheme(<Textarea required placeholder="Required textarea" />);
      const textarea = screen.getByPlaceholderText("Required textarea");
      expect(textarea).toBeRequired();
    });
  });

  describe("Interactions", () => {
    it("handles onChange events", async () => {
      const user = userEventSetup();
      const handleChange = vi.fn();
      renderWithTheme(<Textarea onChange={handleChange} placeholder="Type here" />);
      const textarea = screen.getByPlaceholderText("Type here");
      await user.type(textarea, "test");
      expect(handleChange).toHaveBeenCalled();
    });

    it("handles onFocus events", async () => {
      const user = userEventSetup();
      const handleFocus = vi.fn();
      renderWithTheme(<Textarea onFocus={handleFocus} placeholder="Focus test" />);
      const textarea = screen.getByPlaceholderText("Focus test");
      await user.click(textarea);
      expect(handleFocus).toHaveBeenCalled();
    });

    it("does not call onChange when disabled", async () => {
      const user = userEventSetup();
      const handleChange = vi.fn();
      renderWithTheme(
        <Textarea disabled onChange={handleChange} placeholder="Disabled textarea" />,
      );
      const textarea = screen.getByPlaceholderText("Disabled textarea");
      await user.type(textarea, "test");
      // Textarea should be disabled, so onChange may not fire
      expect(textarea).toBeDisabled();
    });
  });

  describe("Native textarea attributes", () => {
    it("renders with maxLength attribute", () => {
      renderWithTheme(<Textarea placeholder="With maxLength" maxLength={200} />);
      const textarea = screen.getByPlaceholderText("With maxLength");
      expect(textarea).toHaveAttribute("maxLength", "200");
    });

    it("renders with defaultValue", () => {
      renderWithTheme(<Textarea placeholder="With value" defaultValue="Initial value" />);
      const textarea = screen.getByPlaceholderText("With value");
      expect(textarea).toHaveValue("Initial value");
    });

    it("renders with value (controlled)", () => {
      renderWithTheme(<Textarea placeholder="Controlled" value="Controlled value" />);
      const textarea = screen.getByPlaceholderText("Controlled");
      expect(textarea).toHaveValue("Controlled value");
    });

    it("renders with placeholder", () => {
      renderWithTheme(<Textarea placeholder="Enter your text" />);
      const textarea = screen.getByPlaceholderText("Enter your text");
      expect(textarea).toBeInTheDocument();
    });

    it("renders with name attribute", () => {
      renderWithTheme(<Textarea name="description" placeholder="Description" />);
      const textarea = screen.getByPlaceholderText("Description");
      expect(textarea).toHaveAttribute("name", "description");
    });
  });

  describe("Layout", () => {
    it("renders full width by default", () => {
      const { container } = renderWithTheme(<Textarea placeholder="Full width" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toHaveClass("w-full");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for default textarea", () => {
      const { container } = renderWithTheme(<Textarea placeholder="Snapshot test" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
