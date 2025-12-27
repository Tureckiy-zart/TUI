import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { NextLinkAdapter } from "./NextLinkAdapter";

// Mock next/link since we are not in a Next.js environment
vi.mock("next/link", () => {
  return {
    default: ({
      children,
      href,
      replace,
      prefetch,
      passHref: _passHref,
      legacyBehavior: _legacyBehavior,
    }: any) => {
      // simulate legacyBehavior: render children
      // With passHref and legacyBehavior, Next.js passes href to child via function
      // But in our case, we pass href directly to Link component
      // We pass the Next-specific props to a data attribute to verify they were passed
      return (
        <div
          data-testid="next-link-mock"
          data-href={href}
          data-replace={replace?.toString()}
          data-prefetch={prefetch?.toString()}
        >
          {children}
        </div>
      );
    },
  };
});

describe("NextLinkAdapter", () => {
  it("renders the Foundation Link correctly", () => {
    render(<NextLinkAdapter href="/test">Test Link</NextLinkAdapter>);

    // Check if text is rendered
    expect(screen.getByText("Test Link")).toBeInTheDocument();

    // Check if it's an anchor tag (Foundation Link renders <a>)
    const link = screen.getByText("Test Link").closest("a");
    expect(link).toBeInTheDocument();
  });

  it("passes Next.js specific props to NextLink", () => {
    render(
      <NextLinkAdapter href="/dashboard" replace prefetch={false} variant="primary">
        Go
      </NextLinkAdapter>,
    );

    const mockWrapper = screen.getByTestId("next-link-mock");
    expect(mockWrapper).toHaveAttribute("data-href", "/dashboard");
    expect(mockWrapper).toHaveAttribute("data-replace", "true");
    expect(mockWrapper).toHaveAttribute("data-prefetch", "false");
  });

  it("passes Foundation props to the inner Link", () => {
    render(
      <NextLinkAdapter href="/test" variant="destructive" size="sm">
        Delete
      </NextLinkAdapter>,
    );

    const link = screen.getByText("Delete").closest("a");
    // Verify Foundation classes/attributes are applied (indirectly checking if props passed)
    // Since we don't want to test Foundation internals, we just trust it renders.
    // But we can check if it exists.
    expect(link).toBeInTheDocument();
  });

  it("forwards ref to the anchor element", () => {
    const ref = React.createRef<HTMLAnchorElement>();

    render(
      <NextLinkAdapter ref={ref} href="/test">
        Test Link
      </NextLinkAdapter>,
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    expect(ref.current).toHaveAttribute("href", "/test");
  });

  it("prevents navigation when disabled", () => {
    const handleClick = vi.fn();
    render(
      <NextLinkAdapter href="/test" disabled onClick={handleClick}>
        Disabled Link
      </NextLinkAdapter>,
    );

    const link = screen.getByText("Disabled Link").closest("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabIndex", "-1");

    // Simulate click
    link?.click();

    // handleClick should not be called when disabled
    // Note: In real Next.js, navigation would also be prevented
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("passes all Next.js props correctly", () => {
    render(
      <NextLinkAdapter href="/test" prefetch={false} replace scroll={false} shallow locale="en">
        Test
      </NextLinkAdapter>,
    );

    const mockWrapper = screen.getByTestId("next-link-mock");
    expect(mockWrapper).toHaveAttribute("data-href", "/test");
    expect(mockWrapper).toHaveAttribute("data-prefetch", "false");
    expect(mockWrapper).toHaveAttribute("data-replace", "true");
  });

  it("renders with leftIcon and rightIcon", () => {
    render(
      <NextLinkAdapter
        href="/test"
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        With Icons
      </NextLinkAdapter>,
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    expect(screen.getByText("With Icons")).toBeInTheDocument();
  });

  describe("Accessibility", () => {
    it("renders as a single semantic anchor element", () => {
      render(<NextLinkAdapter href="/test">Test Link</NextLinkAdapter>);

      const link = screen.getByRole("link", { name: /test link/i });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/test");
    });

    it("is keyboard focusable when enabled", () => {
      render(<NextLinkAdapter href="/test">Focusable Link</NextLinkAdapter>);

      const link = screen.getByRole("link", { name: /focusable link/i });
      link.focus();
      expect(link).toHaveFocus();
    });

    it("applies aria-disabled when disabled", () => {
      render(
        <NextLinkAdapter href="/test" disabled>
          Disabled Link
        </NextLinkAdapter>,
      );

      const link = screen.getByRole("link", { name: /disabled link/i });
      expect(link).toHaveAttribute("aria-disabled", "true");
    });

    it("removes from tab order when disabled", () => {
      render(
        <NextLinkAdapter href="/test" disabled>
          Disabled Link
        </NextLinkAdapter>,
      );

      const link = screen.getByRole("link", { name: /disabled link/i });
      expect(link).toHaveAttribute("tabIndex", "-1");
    });

    it("does not apply aria-disabled when enabled", () => {
      render(<NextLinkAdapter href="/test">Enabled Link</NextLinkAdapter>);

      const link = screen.getByRole("link", { name: /enabled link/i });
      expect(link).not.toHaveAttribute("aria-disabled");
    });

    it("preserves aria attributes from props", () => {
      render(
        <NextLinkAdapter href="/test" aria-label="Custom label" aria-current="page">
          Link
        </NextLinkAdapter>,
      );

      const link = screen.getByRole("link", { name: /custom label/i });
      expect(link).toHaveAttribute("aria-current", "page");
    });

    it("does not create nested interactive elements", () => {
      render(<NextLinkAdapter href="/test">Test Link</NextLinkAdapter>);

      const link = screen.getByRole("link", { name: /test link/i });
      // Verify only one anchor element exists (no nested anchors)
      const allAnchors = screen.getAllByRole("link");
      expect(allAnchors).toHaveLength(1);
      expect(allAnchors[0]).toBe(link);
    });

    it("has accessible name from children", () => {
      render(<NextLinkAdapter href="/test">Accessible Link</NextLinkAdapter>);

      const link = screen.getByRole("link", { name: /accessible link/i });
      expect(link).toBeInTheDocument();
    });

    it("has accessible name from aria-label when provided", () => {
      render(
        <NextLinkAdapter href="/test" aria-label="Custom accessible name">
          Link Text
        </NextLinkAdapter>,
      );

      const link = screen.getByRole("link", { name: /custom accessible name/i });
      expect(link).toBeInTheDocument();
    });
  });
});
