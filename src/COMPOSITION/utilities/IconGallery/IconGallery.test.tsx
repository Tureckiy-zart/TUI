/**
 * IconGallery Component Tests
 */

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { IconGallery } from "./IconGallery";

describe("IconGallery", () => {
  it("should render grid mode by default", () => {
    const { container } = render(<IconGallery />);
    const gallery = container.firstChild;
    expect(gallery).toBeInTheDocument();
  });

  it("should render with custom icons", () => {
    render(<IconGallery icons={["search", "menu"]} />);
    expect(screen.getByText("search")).toBeInTheDocument();
    expect(screen.getByText("menu")).toBeInTheDocument();
  });

  it("should render sizes mode", () => {
    render(<IconGallery mode="sizes" icons={["search"]} />);
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("sm")).toBeInTheDocument();
    expect(screen.getByText("md")).toBeInTheDocument();
    expect(screen.getByText("lg")).toBeInTheDocument();
    expect(screen.getByText("xl")).toBeInTheDocument();
  });

  it("should render colors mode", () => {
    render(<IconGallery mode="colors" icons={["search"]} />);
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("default")).toBeInTheDocument();
    expect(screen.getByText("muted")).toBeInTheDocument();
    expect(screen.getByText("success")).toBeInTheDocument();
  });

  it("should apply custom iconSize in grid mode", () => {
    const { container } = render(<IconGallery iconSize="lg" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should apply custom iconColor in grid mode", () => {
    const { container } = render(<IconGallery iconColor="muted" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  describe("Edge Cases", () => {
    it("should handle empty icons array", () => {
      const { container } = render(<IconGallery icons={[]} />);
      const gallery = container.firstChild;
      expect(gallery).toBeInTheDocument();
      // Should render grid but with no items
      expect(gallery?.childNodes.length).toBe(0);
    });

    it("should handle single icon", () => {
      render(<IconGallery icons={["search"]} />);
      expect(screen.getByText("search")).toBeInTheDocument();
    });

    it("should forward ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<IconGallery ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("should pass HTML attributes", () => {
      render(<IconGallery id="icon-gallery" data-testid="gallery" aria-label="Icon gallery" />);
      const gallery = screen.getByTestId("gallery");
      expect(gallery).toHaveAttribute("id", "icon-gallery");
      expect(gallery).toHaveAttribute("aria-label", "Icon gallery");
    });

    it("should apply custom className", () => {
      const { container } = render(<IconGallery className="custom-class" />);
      const gallery = container.firstChild;
      expect(gallery).toHaveClass("custom-class");
    });

    it("should handle all icon sizes in sizes mode", () => {
      render(<IconGallery mode="sizes" icons={["search"]} />);
      expect(screen.getByText("sm")).toBeInTheDocument();
      expect(screen.getByText("md")).toBeInTheDocument();
      expect(screen.getByText("lg")).toBeInTheDocument();
      expect(screen.getByText("xl")).toBeInTheDocument();
    });

    it("should handle all icon colors in colors mode", () => {
      render(<IconGallery mode="colors" icons={["search"]} />);
      expect(screen.getByText("default")).toBeInTheDocument();
      expect(screen.getByText("muted")).toBeInTheDocument();
      expect(screen.getByText("success")).toBeInTheDocument();
      expect(screen.getByText("warning")).toBeInTheDocument();
      expect(screen.getByText("danger")).toBeInTheDocument();
      expect(screen.getByText("info")).toBeInTheDocument();
    });
  });
});
