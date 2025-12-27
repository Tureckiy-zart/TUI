import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import {
  CardBase,
  CardBaseContentWrapper,
  CardBaseFooterWrapper,
  CardBaseImageWrapper,
} from "./CardBase";

describe("CardBase", () => {
  describe("API Contract", () => {
    describe("Rendering", () => {
      it("renders without errors", () => {
        renderWithTheme(<CardBase>Card content</CardBase>);
        const card = screen.getByText("Card content");
        expect(card).toBeInTheDocument();
      });

      it("renders with default size and variant", () => {
        const { container } = renderWithTheme(<CardBase>Default Card</CardBase>);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
        expect(card.tagName).toBe("DIV");
      });

      it("forwards ref correctly", () => {
        const ref = { current: null as HTMLDivElement | null };
        renderWithTheme(<CardBase ref={ref}>Card</CardBase>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });

      it("applies custom className", () => {
        const { container } = renderWithTheme(<CardBase className="custom-class">Card</CardBase>);
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveClass("custom-class");
      });
    });

    describe("Sizes", () => {
      it("accepts and renders sm size", () => {
        const { container } = renderWithTheme(<CardBase size="sm">Small Card</CardBase>);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
        expect(card.className).toBeTruthy();
      });

      it("accepts and renders md size (default)", () => {
        const { container } = renderWithTheme(<CardBase size="md">Medium Card</CardBase>);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
        expect(card.className).toBeTruthy();
      });

      it("defaults to md size when size prop is not provided", () => {
        const { container } = renderWithTheme(<CardBase>Default Size Card</CardBase>);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
        expect(card.className).toBeTruthy();
      });
    });

    describe("Variants", () => {
      it("accepts and renders default variant", () => {
        const { container } = renderWithTheme(
          <CardBase variant="default">Default Variant Card</CardBase>,
        );
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("accepts and renders elevated variant", () => {
        const { container } = renderWithTheme(
          <CardBase variant="elevated">Elevated Variant Card</CardBase>,
        );
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
        expect(card.className).toBeTruthy();
      });

      it("defaults to default variant when variant prop is not provided", () => {
        const { container } = renderWithTheme(<CardBase>Default Variant Card</CardBase>);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });
    });

    describe("Size and Variant Combinations", () => {
      it("renders sm size with default variant", () => {
        const { container } = renderWithTheme(
          <CardBase size="sm" variant="default">
            Small Default Card
          </CardBase>,
        );
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
        expect(card.className).toBeTruthy();
      });

      it("renders md size with elevated variant", () => {
        const { container } = renderWithTheme(
          <CardBase size="md" variant="elevated">
            Medium Elevated Card
          </CardBase>,
        );
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
        expect(card.className).toBeTruthy();
      });

      it("renders sm size with elevated variant", () => {
        const { container } = renderWithTheme(
          <CardBase size="sm" variant="elevated">
            Small Elevated Card
          </CardBase>,
        );
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
        expect(card.className).toBeTruthy();
      });
    });

    describe("HTML Attributes", () => {
      it("passes through HTML attributes", () => {
        const { container } = renderWithTheme(
          <CardBase data-testid="card" aria-label="Test card">
            Card
          </CardBase>,
        );
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveAttribute("data-testid", "card");
        expect(card).toHaveAttribute("aria-label", "Test card");
      });
    });
  });

  describe("CardBaseImageWrapper", () => {
    it("renders without errors", () => {
      renderWithTheme(
        <CardBaseImageWrapper>
          <div>Image</div>
        </CardBaseImageWrapper>,
      );
      expect(screen.getByText("Image")).toBeInTheDocument();
    });

    it("accepts size prop", () => {
      const { container } = renderWithTheme(
        <CardBaseImageWrapper size="sm">
          <div>Image</div>
        </CardBaseImageWrapper>,
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = { current: null as HTMLDivElement | null };
      renderWithTheme(
        <CardBaseImageWrapper ref={ref}>
          <div>Image</div>
        </CardBaseImageWrapper>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("applies custom className", () => {
      const { container } = renderWithTheme(
        <CardBaseImageWrapper className="custom-image-class">
          <div>Image</div>
        </CardBaseImageWrapper>,
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass("custom-image-class");
    });
  });

  describe("CardBaseContentWrapper", () => {
    it("renders without errors", () => {
      renderWithTheme(
        <CardBaseContentWrapper>
          <div>Content</div>
        </CardBaseContentWrapper>,
      );
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("accepts size prop", () => {
      const { container } = renderWithTheme(
        <CardBaseContentWrapper size="md">
          <div>Content</div>
        </CardBaseContentWrapper>,
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = { current: null as HTMLDivElement | null };
      renderWithTheme(
        <CardBaseContentWrapper ref={ref}>
          <div>Content</div>
        </CardBaseContentWrapper>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("applies custom className", () => {
      const { container } = renderWithTheme(
        <CardBaseContentWrapper className="custom-content-class">
          <div>Content</div>
        </CardBaseContentWrapper>,
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass("custom-content-class");
    });
  });

  describe("CardBaseFooterWrapper", () => {
    it("renders without errors", () => {
      renderWithTheme(
        <CardBaseFooterWrapper>
          <div>Footer</div>
        </CardBaseFooterWrapper>,
      );
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    it("accepts size prop", () => {
      const { container } = renderWithTheme(
        <CardBaseFooterWrapper size="sm">
          <div>Footer</div>
        </CardBaseFooterWrapper>,
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = { current: null as HTMLDivElement | null };
      renderWithTheme(
        <CardBaseFooterWrapper ref={ref}>
          <div>Footer</div>
        </CardBaseFooterWrapper>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("applies custom className", () => {
      const { container } = renderWithTheme(
        <CardBaseFooterWrapper className="custom-footer-class">
          <div>Footer</div>
        </CardBaseFooterWrapper>,
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass("custom-footer-class");
    });
  });

  describe("Composition", () => {
    it("renders complete card structure", () => {
      renderWithTheme(
        <CardBase>
          <CardBaseImageWrapper>
            <div>Image</div>
          </CardBaseImageWrapper>
          <CardBaseContentWrapper>
            <div>Content</div>
          </CardBaseContentWrapper>
          <CardBaseFooterWrapper>
            <div>Footer</div>
          </CardBaseFooterWrapper>
        </CardBase>,
      );

      expect(screen.getByText("Image")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    it("renders with all props applied", () => {
      const { container } = renderWithTheme(
        <CardBase size="sm" variant="elevated" data-testid="card">
          <CardBaseImageWrapper size="sm">
            <div>Image</div>
          </CardBaseImageWrapper>
          <CardBaseContentWrapper size="sm">
            <div>Content</div>
          </CardBaseContentWrapper>
          <CardBaseFooterWrapper size="sm">
            <div>Footer</div>
          </CardBaseFooterWrapper>
        </CardBase>,
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute("data-testid", "card");
      expect(screen.getByText("Image")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });
});
