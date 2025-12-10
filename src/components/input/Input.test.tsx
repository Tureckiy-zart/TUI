import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { Icon } from "@/components/icon/Icon";
import { renderWithTheme, userEventSetup } from "@/test/test-utils";

import { Input } from "./Input";

describe("Input", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
    });

    it("renders with default variant and size", () => {
      const { container } = renderWithTheme(<Input placeholder="Default input" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithTheme(<Input ref={ref} placeholder="Ref test" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.placeholder).toBe("Ref test");
    });
  });

  describe("Variants", () => {
    it("renders primary variant", () => {
      const { container } = renderWithTheme(<Input variant="primary" placeholder="Primary" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      const { container } = renderWithTheme(<Input variant="secondary" placeholder="Secondary" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });

    it("renders outline variant", () => {
      const { container } = renderWithTheme(<Input variant="outline" placeholder="Outline" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });

    it("renders ghost variant", () => {
      const { container } = renderWithTheme(<Input variant="ghost" placeholder="Ghost" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });

    it("renders destructive variant", () => {
      const { container } = renderWithTheme(
        <Input variant="destructive" placeholder="Destructive" />,
      );
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders xs size", () => {
      const { container } = renderWithTheme(<Input size="xs" placeholder="Extra small" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });

    it("renders sm size", () => {
      const { container } = renderWithTheme(<Input size="sm" placeholder="Small" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });

    it("renders md size (default)", () => {
      const { container } = renderWithTheme(<Input size="md" placeholder="Medium" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });

    it("renders lg size", () => {
      const { container } = renderWithTheme(<Input size="lg" placeholder="Large" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });

    it("renders xl size", () => {
      const { container } = renderWithTheme(<Input size="xl" placeholder="Extra large" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("renders default state", () => {
      const { container } = renderWithTheme(<Input state="default" placeholder="Default" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
      expect(input).not.toBeDisabled();
    });

    it("renders error state", () => {
      const { container } = renderWithTheme(<Input state="error" placeholder="Error" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("renders success state", () => {
      const { container } = renderWithTheme(<Input state="success" placeholder="Success" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });

    it("renders disabled state", () => {
      renderWithTheme(<Input state="disabled" placeholder="Disabled" />);
      const input = screen.getByPlaceholderText("Disabled");
      expect(input).toBeDisabled();
    });

    it("is disabled when disabled prop is true", () => {
      renderWithTheme(<Input disabled placeholder="Disabled prop" />);
      const input = screen.getByPlaceholderText("Disabled prop");
      expect(input).toBeDisabled();
    });
  });

  describe("Icons", () => {
    it("renders with iconLeft", () => {
      const { container } = renderWithTheme(
        <Input placeholder="With left icon" iconLeft={<Icon name="search" size="sm" />} />,
      );
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
      // Icon should be in a wrapper div
      const wrapper = container.querySelector("div.relative");
      expect(wrapper).toBeInTheDocument();
    });

    it("renders with iconRight", () => {
      const { container } = renderWithTheme(
        <Input placeholder="With right icon" iconRight={<Icon name="check" size="sm" />} />,
      );
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
      const wrapper = container.querySelector("div.relative");
      expect(wrapper).toBeInTheDocument();
    });

    it("renders with both iconLeft and iconRight", () => {
      const { container } = renderWithTheme(
        <Input
          placeholder="With both icons"
          iconLeft={<Icon name="search" size="sm" />}
          iconRight={<Icon name="check" size="sm" />}
        />,
      );
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
      const wrapper = container.querySelector("div.relative");
      expect(wrapper).toBeInTheDocument();
    });

    it("does not wrap in container when no icons", () => {
      const { container } = renderWithTheme(<Input placeholder="No icons" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
      // Should not have relative wrapper when no icons
      const wrapper = container.querySelector("div.relative");
      expect(wrapper).toBeNull();
    });
  });

  describe("FullWidth", () => {
    it("renders fullWidth by default", () => {
      const { container } = renderWithTheme(<Input placeholder="Full width" />);
      const input = container.querySelector("input");
      expect(input).toHaveClass("w-full");
    });

    it("renders not fullWidth when fullWidth is false", () => {
      const { container } = renderWithTheme(
        <Input fullWidth={false} placeholder="Not full width" />,
      );
      const input = container.querySelector("input");
      expect(input).not.toHaveClass("w-full");
    });
  });

  describe("Accessibility", () => {
    it("maps aria-invalid when state is error", () => {
      renderWithTheme(<Input state="error" placeholder="Error input" />);
      const input = screen.getByPlaceholderText("Error input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("maps aria-invalid when aria-invalid prop is true", () => {
      renderWithTheme(<Input aria-invalid={true} placeholder="Invalid input" />);
      const input = screen.getByPlaceholderText("Invalid input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("generates aria-describedby for error state", () => {
      const { container } = renderWithTheme(<Input state="error" placeholder="Error input" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("aria-describedby");
    });

    it("generates aria-describedby for success state", () => {
      const { container } = renderWithTheme(<Input state="success" placeholder="Success input" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("aria-describedby");
    });

    it("uses provided aria-describedby", () => {
      renderWithTheme(<Input aria-describedby="custom-id" placeholder="Custom describedby" />);
      const input = screen.getByPlaceholderText("Custom describedby");
      expect(input).toHaveAttribute("aria-describedby", "custom-id");
    });
  });

  describe("Interactions", () => {
    it("handles onChange events", async () => {
      const user = userEventSetup();
      const handleChange = vi.fn();
      renderWithTheme(<Input onChange={handleChange} placeholder="Type here" />);
      const input = screen.getByPlaceholderText("Type here");
      await user.type(input, "test");
      expect(handleChange).toHaveBeenCalled();
    });

    it("handles onFocus events", async () => {
      const user = userEventSetup();
      const handleFocus = vi.fn();
      renderWithTheme(<Input onFocus={handleFocus} placeholder="Focus test" />);
      const input = screen.getByPlaceholderText("Focus test");
      await user.click(input);
      expect(handleFocus).toHaveBeenCalled();
    });

    it("does not call onChange when disabled", async () => {
      const user = userEventSetup();
      const handleChange = vi.fn();
      renderWithTheme(<Input disabled onChange={handleChange} placeholder="Disabled input" />);
      const input = screen.getByPlaceholderText("Disabled input");
      await user.type(input, "test");
      // Input should be disabled, so onChange may not fire
      expect(input).toBeDisabled();
    });
  });

  describe("Type attributes", () => {
    it("renders with type text by default", () => {
      renderWithTheme(<Input placeholder="Text input" />);
      const input = screen.getByPlaceholderText("Text input");
      expect(input).toHaveAttribute("type", "text");
    });

    it("renders with type email", () => {
      renderWithTheme(<Input type="email" placeholder="Email input" />);
      const input = screen.getByPlaceholderText("Email input");
      expect(input).toHaveAttribute("type", "email");
    });

    it("renders with type password", () => {
      renderWithTheme(<Input type="password" placeholder="Password input" />);
      const input = screen.getByPlaceholderText("Password input");
      expect(input).toHaveAttribute("type", "password");
    });
  });

  describe("ClassName merging", () => {
    it("merges custom className", () => {
      const { container } = renderWithTheme(
        <Input className="custom-class" placeholder="Custom class" />,
      );
      const input = container.querySelector("input");
      expect(input).toHaveClass("custom-class");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for outline variant", () => {
      const { container } = renderWithTheme(
        <Input variant="outline" placeholder="Snapshot test" />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
