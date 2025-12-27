/**
 * IconGallery Component Tests
 */

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
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
});
