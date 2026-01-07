import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { axeCheck, renderWithTheme, userEventSetup } from "@/test/test-utils";

import { Link } from "./Link";

describe("Link", () => {
  describe("Semantic <a> Behavior", () => {
    it("renders as anchor element with href", () => {
      renderWithTheme(<Link href="/about">About</Link>);
      const link = screen.getByRole("link", { name: /about/i });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/about");
    });

    it("renders without errors", () => {
      renderWithTheme(<Link href="/home">Home</Link>);
      const link = screen.getByRole("link", { name: /home/i });
      expect(link).toBeInTheDocument();
    });

    it("renders with default variant and size", () => {
      renderWithTheme(<Link href="/default">Default Link</Link>);
      const link = screen.getByRole("link", { name: /default link/i });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
    });

    it("preserves href attribute", () => {
      renderWithTheme(<Link href="https://example.com">External</Link>);
      const link = screen.getByRole("link", { name: /external/i });
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("preserves other anchor attributes", () => {
      renderWithTheme(
        <Link href="/test" target="_blank" rel="noopener noreferrer" aria-label="Test link">
          Test
        </Link>,
      );
      const link = screen.getByRole("link", { name: /test link/i });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("supports onClick handler while maintaining navigation", () => {
      const handleClick = vi.fn((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
      });
      renderWithTheme(
        <Link href="/test" onClick={handleClick}>
          Clickable Link
        </Link>,
      );
      const link = screen.getByRole("link", { name: /clickable link/i });
      link.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Layout Behavior", () => {
    it("renders default Link as inline (inline-flex)", () => {
      const { container } = renderWithTheme(<Link href="/test">Default Link</Link>);
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      // Default variant='text' should use inline-flex layout
      expect(link?.className).toContain("inline-flex");
      expect(link?.className).not.toContain("block");
      expect(link?.className).not.toContain("w-full");
    });

    it("renders variant='text' as inline (inline-flex)", () => {
      const { container } = renderWithTheme(
        <Link href="/test" variant="text">
          Text Link
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      // variant='text' should use inline-flex layout
      expect(link?.className).toContain("inline-flex");
      expect(link?.className).not.toContain("block");
      expect(link?.className).not.toContain("w-full");
    });

    it("renders variant='wrapper' as block-level (block w-full)", () => {
      const { container } = renderWithTheme(
        <Link href="/test" variant="wrapper">
          Wrapper Link
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      // variant='wrapper' should use block-level layout for wrapper use cases
      expect(link?.className).toContain("block");
      expect(link?.className).toContain("w-full");
      expect(link?.className).not.toContain("inline-flex");
    });

    it("renders variant='link' as block-level (deprecated alias for wrapper)", () => {
      const { container } = renderWithTheme(
        <Link href="/test" variant="link">
          Wrapper Link
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      // variant='link' (deprecated) should use block-level layout, identical to wrapper
      expect(link?.className).toContain("block");
      expect(link?.className).toContain("w-full");
      expect(link?.className).not.toContain("inline-flex");
    });

    it("variant='link' behaves identically to variant='wrapper'", () => {
      const { container: containerLink } = renderWithTheme(
        <Link href="/test" variant="link">
          Deprecated Link
        </Link>,
      );
      const { container: containerWrapper } = renderWithTheme(
        <Link href="/test" variant="wrapper">
          Wrapper Link
        </Link>,
      );
      const linkElement = containerLink.querySelector("a");
      const wrapperElement = containerWrapper.querySelector("a");
      expect(linkElement).toBeInTheDocument();
      expect(wrapperElement).toBeInTheDocument();
      // Both should have identical class names (same layout tokens)
      expect(linkElement?.className).toBe(wrapperElement?.className);
    });
  });

  describe("Variants", () => {
    it("accepts and renders primary variant", () => {
      renderWithTheme(
        <Link href="#" variant="primary">
          Primary
        </Link>,
      );
      const link = screen.getByRole("link", { name: /primary/i });
      expect(link).toBeInTheDocument();
    });

    it("accepts and renders secondary variant", () => {
      renderWithTheme(
        <Link href="#" variant="secondary">
          Secondary
        </Link>,
      );
      const link = screen.getByRole("link", { name: /secondary/i });
      expect(link).toBeInTheDocument();
    });

    it("accepts and renders accent variant", () => {
      renderWithTheme(
        <Link href="#" variant="accent">
          Accent
        </Link>,
      );
      const link = screen.getByRole("link", { name: /accent/i });
      expect(link).toBeInTheDocument();
    });

    it("accepts and renders outline variant", () => {
      renderWithTheme(
        <Link href="#" variant="outline">
          Outline
        </Link>,
      );
      const link = screen.getByRole("link", { name: /outline/i });
      expect(link).toBeInTheDocument();
    });

    it("accepts and renders ghost variant", () => {
      renderWithTheme(
        <Link href="#" variant="ghost">
          Ghost
        </Link>,
      );
      const link = screen.getByRole("link", { name: /ghost/i });
      expect(link).toBeInTheDocument();
    });

    it("accepts and renders text variant (default)", () => {
      renderWithTheme(<Link href="#">Text</Link>);
      const link = screen.getByRole("link", { name: /text/i });
      expect(link).toBeInTheDocument();
    });

    it("accepts and renders text variant explicitly", () => {
      renderWithTheme(
        <Link href="#" variant="text">
          Text Link
        </Link>,
      );
      const link = screen.getByRole("link", { name: /text link/i });
      expect(link).toBeInTheDocument();
    });

    it("accepts and renders wrapper variant", () => {
      renderWithTheme(
        <Link href="#" variant="wrapper">
          Wrapper Variant
        </Link>,
      );
      const link = screen.getByRole("link", { name: /wrapper variant/i });
      expect(link).toBeInTheDocument();
    });

    it("accepts and renders link variant (deprecated)", () => {
      renderWithTheme(
        <Link href="#" variant="link">
          Link Variant
        </Link>,
      );
      const link = screen.getByRole("link", { name: /link variant/i });
      expect(link).toBeInTheDocument();
    });

    it("accepts and renders destructive variant", () => {
      renderWithTheme(
        <Link href="#" variant="destructive">
          Destructive
        </Link>,
      );
      const link = screen.getByRole("link", { name: /destructive/i });
      expect(link).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("accepts and renders sm size", () => {
      renderWithTheme(
        <Link href="#" size="sm">
          Small
        </Link>,
      );
      const link = screen.getByRole("link", { name: /small/i });
      expect(link).toBeInTheDocument();
    });

    it("accepts and renders md size (default)", () => {
      renderWithTheme(
        <Link href="#" size="md">
          Medium
        </Link>,
      );
      const link = screen.getByRole("link", { name: /medium/i });
      expect(link).toBeInTheDocument();
    });

    it("accepts and renders lg size", () => {
      renderWithTheme(
        <Link href="#" size="lg">
          Large
        </Link>,
      );
      const link = screen.getByRole("link", { name: /large/i });
      expect(link).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("applies aria-disabled when disabled prop is true", () => {
      renderWithTheme(
        <Link href="/disabled" disabled>
          Disabled Link
        </Link>,
      );
      const link = screen.getByRole("link", { name: /disabled link/i });
      expect(link).toHaveAttribute("aria-disabled", "true");
      expect(link).toHaveAttribute("tabindex", "-1");
    });

    it("does not apply aria-disabled when disabled prop is false", () => {
      renderWithTheme(
        <Link href="/enabled" disabled={false}>
          Enabled Link
        </Link>,
      );
      const link = screen.getByRole("link", { name: /enabled link/i });
      expect(link).not.toHaveAttribute("aria-disabled");
    });

    it("does not apply aria-disabled when disabled prop is not provided", () => {
      renderWithTheme(<Link href="/default">Default Link</Link>);
      const link = screen.getByRole("link", { name: /default link/i });
      expect(link).not.toHaveAttribute("aria-disabled");
    });

    it("prevents navigation when disabled", () => {
      const handleClick = vi.fn((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
      });
      renderWithTheme(
        <Link href="/disabled" disabled onClick={handleClick}>
          Disabled Link
        </Link>,
      );
      const link = screen.getByRole("link", { name: /disabled link/i });
      link.click();
      // onClick should not be called when disabled
      expect(handleClick).not.toHaveBeenCalled();
      expect(link).toHaveAttribute("aria-disabled", "true");
    });

    it("applies disabled state to all variants", () => {
      const variants = [
        "primary",
        "secondary",
        "accent",
        "outline",
        "ghost",
        "text",
        "link",
        "wrapper",
        "destructive",
      ] as const;
      variants.forEach((variant) => {
        const { unmount } = renderWithTheme(
          <Link href="#" variant={variant} disabled>
            {variant} Disabled
          </Link>,
        );
        const link = screen.getByRole("link", { name: new RegExp(`${variant} disabled`, "i") });
        expect(link).toHaveAttribute("aria-disabled", "true");
        expect(link).toHaveAttribute("tabindex", "-1");
        unmount();
      });
    }, 10000);

    it("is excluded from tab navigation when disabled", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <div>
          <Link href="/first">First Link</Link>
          <Link href="/disabled" disabled>
            Disabled Link
          </Link>
          <Link href="/second">Second Link</Link>
        </div>,
      );
      const firstLink = screen.getByRole("link", { name: /first link/i });
      const disabledLink = screen.getByRole("link", { name: /disabled link/i });
      const secondLink = screen.getByRole("link", { name: /second link/i });

      firstLink.focus();
      await user.keyboard("{Tab}");
      // Tab navigation should skip disabled link and go to second link
      expect(secondLink).toHaveFocus();
      expect(disabledLink).not.toHaveFocus();
    });
  });

  describe("Anchor Semantics", () => {
    it("always renders anchor element", () => {
      renderWithTheme(<Link href="/test">Test Link</Link>);
      const link = screen.getByRole("link", { name: /test link/i });
      expect(link.tagName).toBe("A");
      expect(link).toBeInstanceOf(HTMLAnchorElement);
    });

    it("applies variant classes correctly", () => {
      const { container } = renderWithTheme(
        <Link href="/test" variant="primary">
          Primary Link
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      // Verify variant classes are applied (check for primary variant classes)
      expect(link?.className).toContain("text-primary");
    });

    it("applies size classes correctly", () => {
      const { container } = renderWithTheme(
        <Link href="/test" size="lg">
          Large Link
        </Link>,
      );
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      // Verify size classes are applied (check for lg size classes)
      expect(link?.className).toContain("h-10"); // lg height
    });

    it("applies distinct fontSize classes for each size", () => {
      const { container: smContainer } = renderWithTheme(
        <Link href="/test" size="sm">
          Small Link
        </Link>,
      );
      const { container: mdContainer } = renderWithTheme(
        <Link href="/test" size="md">
          Medium Link
        </Link>,
      );
      const { container: lgContainer } = renderWithTheme(
        <Link href="/test" size="lg">
          Large Link
        </Link>,
      );

      const smLink = smContainer.querySelector("a");
      const mdLink = mdContainer.querySelector("a");
      const lgLink = lgContainer.querySelector("a");

      // Verify each size uses distinct fontSize class
      expect(smLink?.className).toContain("text-sm");
      expect(mdLink?.className).toContain("text-base");
      expect(lgLink?.className).toContain("text-lg");

      // Verify no size aliasing (each size must be distinct)
      expect(smLink?.className).not.toContain("text-base");
      expect(smLink?.className).not.toContain("text-lg");
      expect(mdLink?.className).not.toContain("text-sm");
      expect(mdLink?.className).not.toContain("text-lg");
      expect(lgLink?.className).not.toContain("text-sm");
      expect(lgLink?.className).not.toContain("text-base");
    });

    it("prevents nested anchor elements", () => {
      // Verify that children cannot be anchor elements
      renderWithTheme(
        <Link href="/test">
          <span>Valid child</span>
        </Link>,
      );
      const link = screen.getByRole("link");
      expect(link.tagName).toBe("A");
      // Verify no nested anchors exist
      const nestedAnchors = link.querySelectorAll("a");
      expect(nestedAnchors).toHaveLength(0);
    });
  });

  describe("Icons", () => {
    it("renders with leftIcon", () => {
      renderWithTheme(
        <Link href="#" leftIcon={<span data-testid="left-icon">←</span>}>
          With Left Icon
        </Link>,
      );
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
      expect(screen.getByRole("link")).toHaveTextContent("With Left Icon");
    });

    it("renders with rightIcon", () => {
      renderWithTheme(
        <Link href="#" rightIcon={<span data-testid="right-icon">→</span>}>
          With Right Icon
        </Link>,
      );
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
      expect(screen.getByRole("link")).toHaveTextContent("With Right Icon");
    });

    it("renders with both leftIcon and rightIcon", () => {
      renderWithTheme(
        <Link
          href="#"
          leftIcon={<span data-testid="left-icon">←</span>}
          rightIcon={<span data-testid="right-icon">→</span>}
        >
          With Icons
        </Link>,
      );
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
      expect(screen.getByRole("link")).toHaveTextContent("With Icons");
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      renderWithTheme(<Link href="/test">Test Link</Link>);
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
    });

    it("has accessible name from text content", () => {
      renderWithTheme(<Link href="/about">About Us</Link>);
      const link = screen.getByRole("link", { name: /about us/i });
      expect(link).toBeInTheDocument();
    });

    it("has accessible name from aria-label", () => {
      renderWithTheme(
        <Link href="/close" aria-label="Close navigation">
          ×
        </Link>,
      );
      const link = screen.getByRole("link", { name: /close navigation/i });
      expect(link).toBeInTheDocument();
    });

    it("supports aria attributes", () => {
      renderWithTheme(
        <Link href="/test" aria-describedby="desc" aria-current="page">
          Current Page
        </Link>,
      );
      const link = screen.getByRole("link", { name: /current page/i });
      expect(link).toHaveAttribute("aria-describedby", "desc");
      expect(link).toHaveAttribute("aria-current", "page");
    });

    it("passes axe accessibility checks", async () => {
      const { container } = renderWithTheme(<Link href="/test">Accessible Link</Link>);
      const results = await axeCheck(container);
      expect(results.violations).toHaveLength(0);
    });

    it("passes axe accessibility checks when disabled", async () => {
      const { container } = renderWithTheme(
        <Link href="/disabled" disabled>
          Disabled Link
        </Link>,
      );
      const results = await axeCheck(container);
      expect(results.violations).toHaveLength(0);
    });

    it("passes axe accessibility checks with aria-label", async () => {
      const { container } = renderWithTheme(
        <Link href="/icon" aria-label="Icon link">
          →
        </Link>,
      );
      const results = await axeCheck(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe("Keyboard Interaction", () => {
    it("can receive focus", () => {
      renderWithTheme(<Link href="/focusable">Focusable</Link>);
      const link = screen.getByRole("link");
      link.focus();
      expect(link).toHaveFocus();
    });

    it("can be activated with Enter key", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
      });
      renderWithTheme(
        <Link href="/enter" onClick={handleClick}>
          Press Enter
        </Link>,
      );
      const link = screen.getByRole("link");
      link.focus();
      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("can be navigated to with Tab key", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <div>
          <Link href="/first">First Link</Link>
          <Link href="/second">Second Link</Link>
        </div>,
      );
      const firstLink = screen.getByRole("link", { name: /first link/i });
      const secondLink = screen.getByRole("link", { name: /second link/i });

      firstLink.focus();
      expect(firstLink).toHaveFocus();

      await user.keyboard("{Tab}");
      expect(secondLink).toHaveFocus();
    });

    it("supports keyboard navigation between links", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <div>
          <Link href="/one">One</Link>
          <Link href="/two">Two</Link>
          <Link href="/three">Three</Link>
        </div>,
      );
      const one = screen.getByRole("link", { name: /one/i });
      const two = screen.getByRole("link", { name: /two/i });
      const three = screen.getByRole("link", { name: /three/i });

      one.focus();
      await user.keyboard("{Tab}");
      expect(two).toHaveFocus();
      await user.keyboard("{Tab}");
      expect(three).toHaveFocus();
    });

    it("can be focused programmatically", () => {
      renderWithTheme(<Link href="/programmatic">Programmatic Focus</Link>);
      const link = screen.getByRole("link");
      link.focus();
      expect(link).toHaveFocus();
    });
  });

  describe("Public API Regression Protection", () => {
    it("accepts all public props without errors", () => {
      renderWithTheme(
        <Link
          href="/test"
          variant="primary"
          size="md"
          disabled={false}
          leftIcon={<span>←</span>}
          rightIcon={<span>→</span>}
          id="test-id"
          aria-label="Test link"
        >
          All Props
        </Link>,
      );
      const link = screen.getByRole("link", { name: /test link/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveAttribute("id", "test-id");
      // Foundation components do not support className prop
    });

    it("maintains href requirement for semantic link behavior", () => {
      renderWithTheme(<Link href="/required">Required Href</Link>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/required");
    });

    it("supports standard anchor HTML attributes", () => {
      renderWithTheme(
        <Link
          href="/test"
          target="_blank"
          rel="noopener noreferrer"
          download="file.pdf"
          hrefLang="en"
          type="text/html"
        >
          Full Attributes
        </Link>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAttribute("download", "file.pdf");
      expect(link).toHaveAttribute("hreflang", "en");
      expect(link).toHaveAttribute("type", "text/html");
    });

    it("maintains variant and size API contract", () => {
      const variants: Array<
        | "primary"
        | "secondary"
        | "accent"
        | "outline"
        | "ghost"
        | "text"
        | "link"
        | "wrapper"
        | "destructive"
      > = [
        "primary",
        "secondary",
        "accent",
        "outline",
        "ghost",
        "text",
        "link",
        "wrapper",
        "destructive",
      ];
      const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

      variants.forEach((variant) => {
        sizes.forEach((size) => {
          const { unmount } = renderWithTheme(
            <Link href="#" variant={variant} size={size}>
              {variant} {size}
            </Link>,
          );
          const link = screen.getByRole("link");
          expect(link).toBeInTheDocument();
          unmount();
        });
      });
    }, 30000);
  });
});
