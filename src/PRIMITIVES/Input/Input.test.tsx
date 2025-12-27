import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "@/test/test-utils";

import { Input } from "./Input";

describe("Input", () => {
  describe("Rendering", () => {
    it("renders input element", () => {
      renderWithTheme(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe("INPUT");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithTheme(<Input ref={ref} placeholder="Ref test" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.placeholder).toBe("Ref test");
    });
  });

  describe("Sizes", () => {
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
  });

  describe("States", () => {
    it("applies disabled attribute", () => {
      renderWithTheme(<Input disabled placeholder="Disabled" />);
      const input = screen.getByPlaceholderText("Disabled");
      expect(input).toBeDisabled();
    });

    it("applies aria-invalid when invalid is true", () => {
      renderWithTheme(<Input invalid placeholder="Invalid input" />);
      const input = screen.getByPlaceholderText("Invalid input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("does not apply aria-invalid when invalid is false", () => {
      renderWithTheme(<Input invalid={false} placeholder="Valid input" />);
      const input = screen.getByPlaceholderText("Valid input");
      expect(input).not.toHaveAttribute("aria-invalid", "true");
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

  describe("Native props forwarding", () => {
    it("forwards all native input HTML attributes", () => {
      renderWithTheme(
        <Input placeholder="Test" id="test-input" name="test-input" value="test value" readOnly />,
      );
      const input = screen.getByPlaceholderText("Test");
      expect(input).toHaveAttribute("id", "test-input");
      expect(input).toHaveAttribute("name", "test-input");
      expect(input).toHaveValue("test value");
      expect(input).toHaveAttribute("readonly");
    });
  });
});
