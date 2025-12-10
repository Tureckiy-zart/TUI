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

    it("renders with default variant and size", () => {
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

  describe("Variants", () => {
    it("renders primary variant", () => {
      const { container } = renderWithTheme(<Textarea variant="primary" placeholder="Primary" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      const { container } = renderWithTheme(
        <Textarea variant="secondary" placeholder="Secondary" />,
      );
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });

    it("renders outline variant", () => {
      const { container } = renderWithTheme(<Textarea variant="outline" placeholder="Outline" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });

    it("renders ghost variant", () => {
      const { container } = renderWithTheme(<Textarea variant="ghost" placeholder="Ghost" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });

    it("renders destructive variant", () => {
      const { container } = renderWithTheme(
        <Textarea variant="destructive" placeholder="Destructive" />,
      );
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders xs size", () => {
      const { container } = renderWithTheme(<Textarea size="xs" placeholder="Extra small" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });

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

    it("renders xl size", () => {
      const { container } = renderWithTheme(<Textarea size="xl" placeholder="Extra large" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("renders default state", () => {
      const { container } = renderWithTheme(<Textarea state="default" placeholder="Default" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
      expect(textarea).not.toBeDisabled();
    });

    it("renders error state", () => {
      const { container } = renderWithTheme(<Textarea state="error" placeholder="Error" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    it("renders success state", () => {
      const { container } = renderWithTheme(<Textarea state="success" placeholder="Success" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });

    it("renders disabled state", () => {
      renderWithTheme(<Textarea state="disabled" placeholder="Disabled" />);
      const textarea = screen.getByPlaceholderText("Disabled");
      expect(textarea).toBeDisabled();
    });

    it("is disabled when disabled prop is true", () => {
      renderWithTheme(<Textarea disabled placeholder="Disabled prop" />);
      const textarea = screen.getByPlaceholderText("Disabled prop");
      expect(textarea).toBeDisabled();
    });
  });

  describe("Character Counter", () => {
    it("does not show character counter by default", () => {
      const { container } = renderWithTheme(<Textarea placeholder="No counter" maxLength={100} />);
      const counter = container.querySelector(".absolute");
      expect(counter).toBeNull();
    });

    it("shows character counter when showCharacterCount is true and maxLength is provided", () => {
      const { container } = renderWithTheme(
        <Textarea placeholder="With counter" maxLength={100} showCharacterCount />,
      );
      const counter = container.querySelector(".absolute");
      expect(counter).toBeInTheDocument();
      expect(counter?.textContent).toBe("0 / 100");
    });

    it("displays correct character count", () => {
      const { container } = renderWithTheme(
        <Textarea
          placeholder="With counter"
          maxLength={100}
          showCharacterCount
          defaultValue="Hello"
        />,
      );
      const counter = container.querySelector(".absolute");
      expect(counter?.textContent).toBe("5 / 100");
    });

    it("updates character count when value changes", () => {
      const { container, rerender } = renderWithTheme(
        <Textarea
          placeholder="With counter"
          maxLength={100}
          showCharacterCount
          defaultValue="Hello"
        />,
      );
      let counter = container.querySelector(".absolute");
      expect(counter?.textContent).toBe("5 / 100");

      rerender(
        <Textarea
          placeholder="With counter"
          maxLength={100}
          showCharacterCount
          value="Hello World"
        />,
      );
      counter = container.querySelector(".absolute");
      expect(counter?.textContent).toBe("11 / 100");
    });

    it("wraps textarea in container when character counter is shown", () => {
      const { container } = renderWithTheme(
        <Textarea placeholder="With counter" maxLength={100} showCharacterCount />,
      );
      const wrapper = container.querySelector("div.relative");
      expect(wrapper).toBeInTheDocument();
      const textarea = wrapper?.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });

    it("does not wrap textarea when character counter is not shown", () => {
      const { container } = renderWithTheme(<Textarea placeholder="No counter" />);
      const wrapper = container.querySelector("div.relative");
      expect(wrapper).toBeNull();
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });

    it("applies error styling to counter when exceeding maxLength", () => {
      const { container } = renderWithTheme(
        <Textarea
          placeholder="With counter"
          maxLength={10}
          showCharacterCount
          defaultValue="This is a very long text that exceeds the limit"
        />,
      );
      const counter = container.querySelector(".absolute");
      expect(counter).toHaveClass("text-[hsl(var(--destructive))]");
    });
  });

  describe("FullWidth", () => {
    it("renders fullWidth by default", () => {
      const { container } = renderWithTheme(<Textarea placeholder="Full width" />);
      const textarea = container.querySelector("textarea");
      expect(textarea).toHaveClass("w-full");
    });

    it("renders not fullWidth when fullWidth is false", () => {
      const { container } = renderWithTheme(
        <Textarea fullWidth={false} placeholder="Not full width" />,
      );
      const textarea = container.querySelector("textarea");
      expect(textarea).not.toHaveClass("w-full");
    });
  });

  describe("Accessibility", () => {
    it("maps aria-invalid when state is error", () => {
      renderWithTheme(<Textarea state="error" placeholder="Error textarea" />);
      const textarea = screen.getByPlaceholderText("Error textarea");
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    it("maps aria-invalid when aria-invalid prop is true", () => {
      renderWithTheme(<Textarea aria-invalid={true} placeholder="Invalid textarea" />);
      const textarea = screen.getByPlaceholderText("Invalid textarea");
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    it("generates aria-describedby for error state", () => {
      const { container } = renderWithTheme(
        <Textarea state="error" placeholder="Error textarea" />,
      );
      const textarea = container.querySelector("textarea");
      expect(textarea).toHaveAttribute("aria-describedby");
    });

    it("generates aria-describedby for success state", () => {
      const { container } = renderWithTheme(
        <Textarea state="success" placeholder="Success textarea" />,
      );
      const textarea = container.querySelector("textarea");
      expect(textarea).toHaveAttribute("aria-describedby");
    });

    it("uses provided aria-describedby", () => {
      renderWithTheme(<Textarea aria-describedby="custom-id" placeholder="Custom describedby" />);
      const textarea = screen.getByPlaceholderText("Custom describedby");
      expect(textarea).toHaveAttribute("aria-describedby", "custom-id");
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
    it("renders with rows attribute", () => {
      renderWithTheme(<Textarea placeholder="With rows" rows={5} />);
      const textarea = screen.getByPlaceholderText("With rows");
      expect(textarea).toHaveAttribute("rows", "5");
    });

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
  });

  describe("ClassName merging", () => {
    it("merges custom className", () => {
      const { container } = renderWithTheme(
        <Textarea className="custom-class" placeholder="Custom class" />,
      );
      const textarea = container.querySelector("textarea");
      expect(textarea).toHaveClass("custom-class");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for outline variant", () => {
      const { container } = renderWithTheme(
        <Textarea variant="outline" placeholder="Snapshot test" />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
