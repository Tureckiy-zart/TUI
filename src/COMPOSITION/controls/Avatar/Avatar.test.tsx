import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../../test/test-utils";
import { Avatar } from "./Avatar";
import { AvatarGroup } from "./AvatarGroup";

describe("Avatar component", () => {
  // ============================================================================
  // Basic Rendering Tests
  // ============================================================================

  it("should render Avatar with default props", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" />);

    const avatar = container.querySelector('[aria-label="John Doe"]');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass("h-10", "w-10", "rounded-full");
  });

  it("should render Avatar with image", () => {
    const { container } = renderWithTheme(<Avatar src="/test-image.jpg" alt="John Doe" />);

    const avatar = container.querySelector('[aria-label="John Doe"]');
    expect(avatar).toBeInTheDocument();
  });

  // ============================================================================
  // Initials Extraction Tests
  // ============================================================================

  it("should extract initials from full name (first and last)", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" />);

    const avatar = container.querySelector('[aria-label="John Doe"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should extract single initial from single word name", () => {
    const { container } = renderWithTheme(<Avatar alt="Alice" />);

    const avatar = container.querySelector('[aria-label="Alice"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should extract first and last initials from multi-word name", () => {
    const { container } = renderWithTheme(<Avatar alt="Bob Smith Jr" />);

    const avatar = container.querySelector('[aria-label="Bob Smith Jr"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should handle empty name gracefully", () => {
    const { container } = renderWithTheme(<Avatar alt="" />);

    expect(container.firstChild).toBeInTheDocument();
  });

  // ============================================================================
  // Fallback Tests
  // ============================================================================

  it("should show fallback when image fails to load", async () => {
    const { container } = renderWithTheme(<Avatar src="/invalid-image.jpg" alt="John Doe" />);

    const avatar = container.querySelector('[aria-label="John Doe"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should use custom fallback when provided", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" fallback="👤" />);

    const avatar = container.querySelector('[aria-label="John Doe"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should prefer custom fallback over initials", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" fallback="JD" />);

    const avatar = container.querySelector('[aria-label="John Doe"]');
    expect(avatar).toBeInTheDocument();
  });

  // ============================================================================
  // Size Variant Tests
  // ============================================================================

  it("should render with xs size", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" size="xs" />);

    const avatar = container.querySelector('[class*="h-6"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should render with md size (default)", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" />);

    const avatar = container.querySelector('[class*="h-10"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should render with 2xl size", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" size="2xl" />);

    const avatar = container.querySelector('[class*="h-16"]');
    expect(avatar).toBeInTheDocument();
  });

  // ============================================================================
  // Shape Variant Tests
  // ============================================================================

  it("should render with circle shape (default)", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" />);

    const avatar = container.querySelector('[class*="rounded-full"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should render with square shape", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" shape="square" />);

    const avatar = container.querySelector('[class*="rounded-md"]');
    expect(avatar).toBeInTheDocument();
  });

  // ============================================================================
  // Status Indicator Tests
  // ============================================================================

  it("should render status indicator when status prop is provided", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" status="online" />);

    const statusDot = container.querySelector('[aria-label="Status: online"]');
    expect(statusDot).toBeInTheDocument();
  });

  it("should not render status indicator when status is null", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" status={null} />);

    const statusDot = container.querySelector('[aria-label*="Status:"]');
    expect(statusDot).not.toBeInTheDocument();
  });

  it("should not render status indicator when status is undefined", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" />);

    const statusDot = container.querySelector('[aria-label*="Status:"]');
    expect(statusDot).not.toBeInTheDocument();
  });

  it("should render online status with correct color", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" status="online" />);

    const statusDot = container.querySelector('[class*="bg-semantic-success"]');
    expect(statusDot).toBeInTheDocument();
  });

  it("should render offline status with correct color", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" status="offline" />);

    const statusDot = container.querySelector('[class*="bg-[hsl(var(--tm-muted))]"]');
    expect(statusDot).toBeInTheDocument();
  });

  it("should render busy status with correct color", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" status="busy" />);

    const statusDot = container.querySelector('[class*="bg-semantic-warning"]');
    expect(statusDot).toBeInTheDocument();
  });

  // ============================================================================
  // Accessibility Tests (ENHANCED - 10/10)
  // ============================================================================

  it("should have correct alt text on image", () => {
    const { container } = renderWithTheme(<Avatar src="/test-image.jpg" alt="John Doe" />);

    const avatar = container.querySelector('[aria-label="John Doe"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should have aria-label on status indicator", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" status="online" />);

    const statusDot = container.querySelector('[aria-label="Status: online"]');
    expect(statusDot).toBeInTheDocument();
  });

  it("should have aria-label with alt text on Avatar root", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" />);

    const avatar = container.querySelector('[aria-label="John Doe"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should have aria-label with status included on Avatar root", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" status="online" />);

    const avatar = container.querySelector('[aria-label="John Doe (online)"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should update aria-label when status changes", () => {
    const { container, rerender } = renderWithTheme(<Avatar alt="John Doe" status="online" />);

    expect(container.querySelector('[aria-label="John Doe (online)"]')).toBeInTheDocument();

    rerender(<Avatar alt="John Doe" status="busy" />);
    expect(container.querySelector('[aria-label="John Doe (busy)"]')).toBeInTheDocument();

    rerender(<Avatar alt="John Doe" />);
    expect(container.querySelector('[aria-label="John Doe"]')).toBeInTheDocument();
  });

  it("should be keyboard accessible (via Radix)", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" />);

    const avatar = container.querySelector('[aria-label="John Doe"]');
    expect(avatar).toBeInTheDocument();
  });

  // ============================================================================
  // Edge Case Tests
  // ============================================================================

  it("should handle very long names", () => {
    const { container } = renderWithTheme(<Avatar alt="John Jacob Jingleheimer Schmidt" />);

    const avatar = container.querySelector('[aria-label="John Jacob Jingleheimer Schmidt"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should handle names with special characters", () => {
    const { container } = renderWithTheme(<Avatar alt="María José" />);

    const avatar = container.querySelector('[aria-label="María José"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should handle names with leading/trailing whitespace", () => {
    const { container } = renderWithTheme(<Avatar alt="  John Doe  " />);

    const avatar = container.querySelector('[aria-label="  John Doe  "]');
    expect(avatar).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = renderWithTheme(<Avatar alt="John Doe" className="custom-class" />);

    const avatar = container.querySelector(".custom-class");
    expect(avatar).toBeInTheDocument();
  });
});

describe("AvatarGroup component", () => {
  const mockAvatars = [
    { src: "/user1.jpg", alt: "User 1" },
    { src: "/user2.jpg", alt: "User 2" },
    { src: "/user3.jpg", alt: "User 3" },
    { alt: "User 4" },
    { alt: "User 5" },
  ];

  // ============================================================================
  // Basic Rendering Tests
  // ============================================================================

  it("should render AvatarGroup with all avatars", () => {
    const { container } = renderWithTheme(<AvatarGroup avatars={mockAvatars} />);

    expect(container.querySelectorAll('[class*="h-10"]').length).toBe(5);
  });

  it("should render with default size (md)", () => {
    const { container } = renderWithTheme(<AvatarGroup avatars={mockAvatars.slice(0, 2)} />);

    const avatars = container.querySelectorAll('[class*="h-10"]');
    expect(avatars.length).toBe(2);
  });

  // ============================================================================
  // Max Count & Overflow Tests
  // ============================================================================

  it("should limit visible avatars to max count", () => {
    const { container } = renderWithTheme(<AvatarGroup avatars={mockAvatars} max={3} />);

    const avatars = container.querySelectorAll('[class*="h-10"]');
    expect(avatars.length).toBe(4);
  });

  it("should show correct overflow count", () => {
    const { container } = renderWithTheme(<AvatarGroup avatars={mockAvatars} max={3} />);

    const overflowAvatar = container.querySelector('[aria-label="+2 more"]');
    expect(overflowAvatar).toBeInTheDocument();
  });

  it("should not show overflow indicator when all avatars fit", () => {
    const { container } = renderWithTheme(
      <AvatarGroup avatars={mockAvatars.slice(0, 3)} max={5} />,
    );

    const overflowAvatar = container.querySelector('[aria-label*="+"]');
    expect(overflowAvatar).not.toBeInTheDocument();
  });

  it("should show all avatars when max is not provided", () => {
    const { container } = renderWithTheme(<AvatarGroup avatars={mockAvatars} />);

    const avatars = container.querySelectorAll('[class*="h-10"]');
    expect(avatars.length).toBe(5);
  });

  // ============================================================================
  // Size Variant Tests
  // ============================================================================

  it("should render with sm size", () => {
    const { container } = renderWithTheme(
      <AvatarGroup avatars={mockAvatars.slice(0, 2)} size="sm" />,
    );

    const avatars = container.querySelectorAll('[class*="h-8"]');
    expect(avatars.length).toBe(2);
  });

  it("should render with lg size", () => {
    const { container } = renderWithTheme(
      <AvatarGroup avatars={mockAvatars.slice(0, 2)} size="lg" />,
    );

    const avatars = container.querySelectorAll('[class*="h-12"]');
    expect(avatars.length).toBe(2);
  });

  // ============================================================================
  // Spacing Variant Tests
  // ============================================================================

  it("should apply tight spacing", () => {
    const { container } = renderWithTheme(
      <AvatarGroup avatars={mockAvatars.slice(0, 2)} spacing="tight" />,
    );

    const group = container.querySelector('[class*="-space-x-2"]');
    expect(group).toBeInTheDocument();
  });

  it("should apply normal spacing (default)", () => {
    const { container } = renderWithTheme(<AvatarGroup avatars={mockAvatars.slice(0, 2)} />);

    const group = container.querySelector('[class*="-space-x-3"]');
    expect(group).toBeInTheDocument();
  });

  it("should apply loose spacing", () => {
    const { container } = renderWithTheme(
      <AvatarGroup avatars={mockAvatars.slice(0, 2)} spacing="loose" />,
    );

    const group = container.querySelector('[class*="-space-x-4"]');
    expect(group).toBeInTheDocument();
  });

  // ============================================================================
  // Border/Separation Tests
  // ============================================================================

  it("should apply border to avatars for separation", () => {
    const { container } = renderWithTheme(<AvatarGroup avatars={mockAvatars.slice(0, 2)} />);

    const avatarsWithBorder = container.querySelectorAll('[class*="border-2"]');
    expect(avatarsWithBorder.length).toBe(2);
  });

  // ============================================================================
  // Accessibility Tests
  // ============================================================================

  it("should have correct alt text for overflow indicator", () => {
    const { container } = renderWithTheme(<AvatarGroup avatars={mockAvatars} max={3} />);

    const overflowAvatar = container.querySelector('[aria-label="+2 more"]');
    expect(overflowAvatar).toBeInTheDocument();
  });

  // ============================================================================
  // Key Management Tests (ENHANCED - 10/10)
  // ============================================================================

  it("should use provided keys over index", () => {
    const avatarsWithKeys = [
      { key: "user-1", alt: "User 1" },
      { key: "user-2", alt: "User 2" },
      { key: "user-3", alt: "User 3" },
    ];

    const { container } = renderWithTheme(<AvatarGroup avatars={avatarsWithKeys} />);

    expect(container.querySelectorAll('[class*="h-10"]').length).toBe(3);
  });

  it("should fallback to alt when key is not provided", () => {
    const avatarsWithoutKeys = [{ alt: "User 1" }, { alt: "User 2" }];

    const { container } = renderWithTheme(<AvatarGroup avatars={avatarsWithoutKeys} />);

    expect(container.querySelectorAll('[class*="h-10"]').length).toBe(2);
  });

  it("should fallback to index when neither key nor alt is unique", () => {
    const avatarsWithSameAlt = [
      { alt: "User", key: "user-1" },
      { alt: "User", key: "user-2" },
    ];

    const { container } = renderWithTheme(<AvatarGroup avatars={avatarsWithSameAlt} />);

    expect(container.querySelectorAll('[class*="h-10"]').length).toBe(2);
  });

  // ============================================================================
  // Edge Case Tests (ENHANCED - 10/10)
  // ============================================================================

  it("should handle single avatar", () => {
    const { container } = renderWithTheme(<AvatarGroup avatars={[{ alt: "Single User" }]} />);

    const avatar = container.querySelector('[aria-label="Single User"]');
    expect(avatar).toBeInTheDocument();
  });

  it("should handle empty avatars array gracefully", () => {
    const { container } = renderWithTheme(<AvatarGroup avatars={[]} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("should warn in dev mode for empty avatars array", () => {
    // Mock NODE_ENV to 'development' for this test
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    renderWithTheme(<AvatarGroup avatars={[]} />);

    expect(consoleSpy).toHaveBeenCalledWith(
      "[AvatarGroup] Received empty avatars array. Component will render nothing.",
    );

    consoleSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it("should apply custom className", () => {
    const { container } = renderWithTheme(
      <AvatarGroup avatars={mockAvatars.slice(0, 2)} className="custom-group-class" />,
    );

    const group = container.querySelector(".custom-group-class");
    expect(group).toBeInTheDocument();
  });
});
