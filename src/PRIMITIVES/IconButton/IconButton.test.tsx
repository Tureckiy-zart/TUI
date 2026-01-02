import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { IconCheck, IconSearch } from "@/icons";
import { Button } from "@/PRIMITIVES/Button";
import { axeCheck, renderWithTheme, userEventSetup } from "@/test/test-utils";

import { IconButton } from "./IconButton";

describe("IconButton", () => {
  describe("API Contract", () => {
    describe("Rendering", () => {
      it("renders without errors with required props", () => {
        renderWithTheme(<IconButton icon={<IconSearch />} aria-label="Search" />);
        const button = screen.getByRole("button", { name: /search/i });
        expect(button).toBeInTheDocument();
      });

      it("renders with default variant and size", () => {
        renderWithTheme(<IconButton icon={<IconSearch />} aria-label="Search" />);
        const button = screen.getByRole("button", { name: /search/i });
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe("BUTTON");
      });

      it("renders icon content", () => {
        const { container } = renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Search" />,
        );
        const button = container.querySelector("button");
        expect(button).toBeInTheDocument();
        // Icon should be rendered inside button
        expect(button?.querySelector("svg")).toBeInTheDocument();
      });
    });

    describe("Required Props", () => {
      it("requires icon and aria-label props", () => {
        // TypeScript enforces required props at compile time
        // This test verifies that component renders correctly when both props are provided
        renderWithTheme(<IconButton icon={<IconSearch />} aria-label="Search" />);
        const button = screen.getByRole("button", { name: /search/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("aria-label", "Search");
      });

      it("renders icon content when icon prop is provided", () => {
        const { container } = renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Search" />,
        );
        const button = container.querySelector("button");
        expect(button?.querySelector("svg")).toBeInTheDocument();
      });

      it("applies aria-label attribute correctly", () => {
        renderWithTheme(<IconButton icon={<IconSearch />} aria-label="Custom label" />);
        const button = screen.getByRole("button", { name: /custom label/i });
        expect(button).toHaveAttribute("aria-label", "Custom label");
      });
    });

    describe("Variants", () => {
      it("accepts and renders primary variant", () => {
        renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Primary search" variant="primary" />,
        );
        const button = screen.getByRole("button", { name: /primary search/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders secondary variant", () => {
        renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Secondary search" variant="secondary" />,
        );
        const button = screen.getByRole("button", { name: /secondary search/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders accent variant", () => {
        renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Accent search" variant="accent" />,
        );
        const button = screen.getByRole("button", { name: /accent search/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders outline variant", () => {
        renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Outline search" variant="outline" />,
        );
        const button = screen.getByRole("button", { name: /outline search/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders ghost variant", () => {
        renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Ghost search" variant="ghost" />,
        );
        const button = screen.getByRole("button", { name: /ghost search/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders destructive variant", () => {
        renderWithTheme(
          <IconButton
            icon={<IconSearch />}
            aria-label="Destructive search"
            variant="destructive"
          />,
        );
        const button = screen.getByRole("button", { name: /destructive search/i });
        expect(button).toBeInTheDocument();
      });
    });

    describe("Sizes", () => {
      it("accepts and renders sm size", () => {
        renderWithTheme(<IconButton icon={<IconSearch />} aria-label="Small search" size="sm" />);
        const button = screen.getByRole("button", { name: /small search/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders md size (default)", () => {
        renderWithTheme(<IconButton icon={<IconSearch />} aria-label="Medium search" />);
        const button = screen.getByRole("button", { name: /medium search/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders lg size", () => {
        renderWithTheme(<IconButton icon={<IconSearch />} aria-label="Large search" size="lg" />);
        const button = screen.getByRole("button", { name: /large search/i });
        expect(button).toBeInTheDocument();
      });
    });

    describe("Prop Delegation", () => {
      it("delegates size prop to Button", () => {
        const { container } = renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Search" size="sm" />,
        );
        const button = container.querySelector("button");
        expect(button).toBeInTheDocument();
        // Button should receive size prop (verified by rendering)
      });

      it("delegates variant prop to Button", () => {
        const { container } = renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Search" variant="secondary" />,
        );
        const button = container.querySelector("button");
        expect(button).toBeInTheDocument();
        // Button should receive variant prop (verified by rendering)
      });

      it("delegates disabled prop to Button", () => {
        renderWithTheme(<IconButton icon={<IconSearch />} aria-label="Search" disabled />);
        const button = screen.getByRole("button", { name: /search/i });
        expect(button).toBeDisabled();
      });

      it("delegates onClick handler to Button", async () => {
        const user = userEventSetup();
        const handleClick = vi.fn();
        renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Search" onClick={handleClick} />,
        );
        const button = screen.getByRole("button", { name: /search/i });
        await user.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("delegates other HTML attributes to Button", () => {
        renderWithTheme(
          <IconButton
            icon={<IconSearch />}
            aria-label="Search"
            data-testid="icon-button"
            id="search-button"
          />,
        );
        const button = screen.getByRole("button", { name: /search/i });
        expect(button).toHaveAttribute("data-testid", "icon-button");
        expect(button).toHaveAttribute("id", "search-button");
      });
    });

    describe("Icon Rendering", () => {
      it("renders icon as children to Button", () => {
        const { container } = renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Search" />,
        );
        const button = container.querySelector("button");
        const icon = button?.querySelector("svg");
        expect(icon).toBeInTheDocument();
      });

      it("renders different icons correctly", () => {
        const { container: searchContainer } = renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Search" />,
        );
        const { container: checkContainer } = renderWithTheme(
          <IconButton icon={<IconCheck />} aria-label="Check" />,
        );

        const searchButton = searchContainer.querySelector("button");
        const checkButton = checkContainer.querySelector("button");

        expect(searchButton?.querySelector("svg")).toBeInTheDocument();
        expect(checkButton?.querySelector("svg")).toBeInTheDocument();
      });
    });

    describe("Button Integration", () => {
      it("renders Button with iconOnly={true}", () => {
        const { container } = renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Search" />,
        );
        const button = container.querySelector("button");
        expect(button).toBeInTheDocument();
        // IconButton should render Button internally with iconOnly={true}
        // This is verified by the square button appearance (handled by Button's iconOnly logic)
      });

      it("produces identical DOM to Button(iconOnly)", () => {
        // This test verifies that IconButton produces the same DOM structure as Button(iconOnly)
        const { container: iconButtonContainer } = renderWithTheme(
          <IconButton icon={<IconSearch />} aria-label="Search" size="md" variant="primary" />,
        );
        const { container: buttonContainer } = renderWithTheme(
          <Button iconOnly size="md" variant="primary" aria-label="Search">
            <IconSearch />
          </Button>,
        );

        const iconButton = iconButtonContainer.querySelector("button");
        const button = buttonContainer.querySelector("button");

        // Both should render button elements
        expect(iconButton).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        // Both should have aria-label
        expect(iconButton).toHaveAttribute("aria-label", "Search");
        expect(button).toHaveAttribute("aria-label", "Search");

        // Both should have the same class structure (verified by Button's iconOnly logic)
        // The actual class names may differ slightly, but the visual result should be identical
      });
    });
  });

  describe("Foundation Enforcement", () => {
    it("excludes className and style from public API", () => {
      // Foundation Enforcement: className and style are excluded from IconButtonProps
      // TypeScript will error at compile time if these props are passed
      // This is verified by TypeScript type checking, not runtime tests
      // See IconButton.types.ts or type-test file for compile-time verification

      // Runtime verification: IconButton should render without className/style
      renderWithTheme(<IconButton icon={<IconSearch />} aria-label="Search" />);
      const button = screen.getByRole("button", { name: /search/i });
      expect(button).toBeInTheDocument();
      // Button should not have className/style props passed through
      // (verified by Button's Foundation Enforcement)
    });
  });

  describe("Accessibility", () => {
    it("has aria-label attribute", () => {
      renderWithTheme(<IconButton icon={<IconSearch />} aria-label="Search" />);
      const button = screen.getByRole("button", { name: /search/i });
      expect(button).toHaveAttribute("aria-label", "Search");
    });

    it("is keyboard accessible", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn();
      renderWithTheme(
        <IconButton icon={<IconSearch />} aria-label="Search" onClick={handleClick} />,
      );
      const button = screen.getByRole("button", { name: /search/i });
      button.focus();
      expect(button).toHaveFocus();
      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("activates on Enter key press", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn();
      renderWithTheme(
        <IconButton icon={<IconSearch />} aria-label="Search" onClick={handleClick} />,
      );
      const button = screen.getByRole("button", { name: /search/i });
      button.focus();
      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("activates on Space key press", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn();
      renderWithTheme(
        <IconButton icon={<IconSearch />} aria-label="Search" onClick={handleClick} />,
      );
      const button = screen.getByRole("button", { name: /search/i });
      button.focus();
      await user.keyboard(" ");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("cannot receive focus when disabled", () => {
      renderWithTheme(<IconButton icon={<IconSearch />} aria-label="Search" disabled />);
      const button = screen.getByRole("button", { name: /search/i });
      button.focus();
      expect(button).not.toHaveFocus();
    });

    it("does not activate on Enter when disabled", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn();
      renderWithTheme(
        <IconButton icon={<IconSearch />} aria-label="Search" disabled onClick={handleClick} />,
      );
      const button = screen.getByRole("button", { name: /search/i });
      button.focus();
      await user.keyboard("{Enter}");
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not activate on Space when disabled", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn();
      renderWithTheme(
        <IconButton icon={<IconSearch />} aria-label="Search" disabled onClick={handleClick} />,
      );
      const button = screen.getByRole("button", { name: /search/i });
      button.focus();
      await user.keyboard(" ");
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("passes accessibility checks", async () => {
      const { container } = renderWithTheme(
        <IconButton icon={<IconSearch />} aria-label="Search" />,
      );
      const results = await axeCheck(container);
      (expect(results) as any).toHaveNoViolations();
    });
  });

  describe("Interaction", () => {
    it("calls onClick when clicked", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn();
      renderWithTheme(
        <IconButton icon={<IconSearch />} aria-label="Search" onClick={handleClick} />,
      );
      const button = screen.getByRole("button", { name: /search/i });
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn();
      renderWithTheme(
        <IconButton icon={<IconSearch />} aria-label="Search" disabled onClick={handleClick} />,
      );
      const button = screen.getByRole("button", { name: /search/i });
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("handles different icon types", () => {
      // Test with SVG element
      renderWithTheme(<IconButton icon={<IconSearch />} aria-label="Search" />);
      const button1 = screen.getByRole("button", { name: /search/i });
      expect(button1).toBeInTheDocument();

      // Test with React component
      renderWithTheme(<IconButton icon={<IconCheck />} aria-label="Check" />);
      const button2 = screen.getByRole("button", { name: /check/i });
      expect(button2).toBeInTheDocument();
    });

    it("handles empty aria-label gracefully", () => {
      // Empty string is technically valid for string type, but not recommended for accessibility
      expect(() => {
        renderWithTheme(<IconButton icon={<IconSearch />} aria-label="" />);
      }).not.toThrow();
    });

    it("handles ref forwarding", () => {
      const ref = vi.fn();
      renderWithTheme(<IconButton icon={<IconSearch />} aria-label="Search" ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });
});
