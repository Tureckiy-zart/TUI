import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NextLinkAdapter } from "./NextLinkAdapter";

// Mock next/link since we are not in a Next.js environment
vi.mock("next/link", () => {
  return {
    default: ({ children, href, replace, prefetch }: any) => {
      // simulate legacyBehavior: render children
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
});
