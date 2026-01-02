import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { ProfileCard } from "./ProfileCard";
import type { ProfileCardProps } from "./ProfileCard";

const defaultProps: ProfileCardProps = {
  name: "John Doe",
  email: "john@example.com",
};

describe("ProfileCard", () => {
  describe("API Contract", () => {
    describe("Rendering", () => {
      it("renders without errors with required props", () => {
        renderWithTheme(<ProfileCard {...defaultProps} />);
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("john@example.com")).toBeInTheDocument();
      });

      it("renders user name", () => {
        renderWithTheme(<ProfileCard name="Jane Smith" email="jane@example.com" />);
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      });

      it("renders user email", () => {
        renderWithTheme(<ProfileCard name="Jane Smith" email="jane@example.com" />);
        expect(screen.getByText("jane@example.com")).toBeInTheDocument();
      });

      it("renders avatar when avatar prop provided", () => {
        const { container } = renderWithTheme(
          <ProfileCard
            name="John Doe"
            email="john@example.com"
            avatar="https://example.com/avatar.jpg"
          />,
        );
        const avatar = container.querySelector('[aria-label*="John Doe"]');
        expect(avatar).toBeInTheDocument();
      });

      it("does not render avatar when avatar prop not provided", () => {
        const { container } = renderWithTheme(<ProfileCard {...defaultProps} />);
        const avatar = container.querySelector('[aria-label*="John Doe"]');
        expect(avatar).not.toBeInTheDocument();
      });

      it("forwards ref correctly", () => {
        const ref = { current: null as HTMLDivElement | null };
        renderWithTheme(<ProfileCard ref={ref} {...defaultProps} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });

      it("applies className prop", () => {
        const { container } = renderWithTheme(
          <ProfileCard {...defaultProps} className="custom-class" />,
        );
        expect(container.firstChild).toHaveClass("custom-class");
      });

      it("applies HTML attributes", () => {
        renderWithTheme(<ProfileCard {...defaultProps} data-testid="profile-card" />);
        expect(screen.getByTestId("profile-card")).toBeInTheDocument();
      });
    });

    describe("Runtime Validation", () => {
      it("throws error when name is empty", () => {
        expect(() => {
          renderWithTheme(<ProfileCard name="" email="john@example.com" />);
        }).toThrow('ProfileCard: "name" prop is required and cannot be empty');
      });

      it("throws error when name is whitespace only", () => {
        expect(() => {
          renderWithTheme(<ProfileCard name="   " email="john@example.com" />);
        }).toThrow('ProfileCard: "name" prop is required and cannot be empty');
      });

      it("throws error when email is empty", () => {
        expect(() => {
          renderWithTheme(<ProfileCard name="John Doe" email="" />);
        }).toThrow('ProfileCard: "email" prop is required and cannot be empty');
      });

      it("throws error when email is whitespace only", () => {
        expect(() => {
          renderWithTheme(<ProfileCard name="John Doe" email="   " />);
        }).toThrow('ProfileCard: "email" prop is required and cannot be empty');
      });
    });
  });

  describe("Size Variants", () => {
    it("renders with default size (md)", () => {
      renderWithTheme(<ProfileCard {...defaultProps} />);
      // Component should render without errors
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("renders with sm size", () => {
      renderWithTheme(<ProfileCard {...defaultProps} size="sm" />);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("renders with md size", () => {
      renderWithTheme(<ProfileCard {...defaultProps} size="md" />);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("renders with lg size", () => {
      renderWithTheme(<ProfileCard {...defaultProps} size="lg" />);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  describe("Variant Variants", () => {
    it("renders with default variant", () => {
      renderWithTheme(<ProfileCard {...defaultProps} variant="default" />);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("renders with elevated variant", () => {
      renderWithTheme(<ProfileCard {...defaultProps} variant="elevated" />);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles long name", () => {
      const longName = "A".repeat(100);
      renderWithTheme(<ProfileCard name={longName} email="test@example.com" />);
      expect(screen.getByText(longName)).toBeInTheDocument();
    });

    it("handles long email", () => {
      const longEmail = "a".repeat(50) + "@example.com";
      renderWithTheme(<ProfileCard name="Test" email={longEmail} />);
      expect(screen.getByText(longEmail)).toBeInTheDocument();
    });

    it("handles special characters in name", () => {
      renderWithTheme(<ProfileCard name="John O'Brien" email="john@example.com" />);
      expect(screen.getByText("John O'Brien")).toBeInTheDocument();
    });

    it("handles special characters in email", () => {
      renderWithTheme(<ProfileCard name="John Doe" email="john+test@example.com" />);
      expect(screen.getByText("john+test@example.com")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has semantic heading structure", () => {
      renderWithTheme(<ProfileCard {...defaultProps} />);
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("John Doe");
    });

    it("avatar has alt text", () => {
      const { container } = renderWithTheme(
        <ProfileCard
          name="John Doe"
          email="john@example.com"
          avatar="https://example.com/avatar.jpg"
        />,
      );
      const avatar = container.querySelector('[aria-label*="John Doe"]');
      expect(avatar).toBeInTheDocument();
    });
  });
});
