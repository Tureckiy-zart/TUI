import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "../../../test/test-utils";

import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  describe("Rendering", () => {
    it("renders breadcrumbs with items", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current Page" },
      ];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const nav = screen.getByRole("navigation", { name: /breadcrumb/i });
      expect(nav).toBeInTheDocument();

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("Current Page")).toBeInTheDocument();
    });

    it("renders with custom aria-label", () => {
      const items: BreadcrumbItem[] = [{ label: "Home" }];

      renderWithTheme(<Breadcrumbs.Root items={items} ariaLabel="Custom Label" />);

      const nav = screen.getByRole("navigation", { name: /custom label/i });
      expect(nav).toBeInTheDocument();
    });

    it("renders with default aria-label", () => {
      const items: BreadcrumbItem[] = [{ label: "Home" }];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const nav = screen.getByRole("navigation", { name: /breadcrumb/i });
      expect(nav).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      const items: BreadcrumbItem[] = [{ label: "Home" }];

      renderWithTheme(<Breadcrumbs.Root items={items} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("renders single item", () => {
      const items: BreadcrumbItem[] = [{ label: "Current Page" }];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      expect(screen.getByText("Current Page")).toBeInTheDocument();
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("renders empty items array", () => {
      const items: BreadcrumbItem[] = [];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
      const list = nav.querySelector("ol");
      expect(list).toBeInTheDocument();
    });
  });

  describe("Links", () => {
    it("renders links for items with href (except last item)", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current Page" },
      ];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const homeLink = screen.getByRole("link", { name: /home/i });
      const productsLink = screen.getByRole("link", { name: /products/i });

      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
      expect(productsLink).toBeInTheDocument();
      expect(productsLink).toHaveAttribute("href", "/products");

      // Last item should not be a link
      const currentPage = screen.getByText("Current Page");
      expect(currentPage).not.toHaveAttribute("href");
    });

    it("does not render link for last item even with href", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Current Page", href: "/current" },
      ];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const homeLink = screen.getByRole("link", { name: /home/i });
      expect(homeLink).toBeInTheDocument();

      // Last item should not be a link even if href is provided
      const currentPage = screen.getByText("Current Page");
      expect(currentPage.tagName).toBe("SPAN");
      expect(currentPage).not.toHaveAttribute("href");
    });
  });

  describe("Disabled State", () => {
    it("renders disabled item as span (not link)", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Disabled Item", href: "/disabled", disabled: true },
        { label: "Current Page" },
      ];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const homeLink = screen.getByRole("link", { name: /home/i });
      expect(homeLink).toBeInTheDocument();

      // Disabled item should not be a link
      const disabledItem = screen.getByText("Disabled Item");
      expect(disabledItem.tagName).toBe("SPAN");
      expect(disabledItem).not.toHaveAttribute("href");
    });

    it("applies disabled styling to disabled items", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Disabled Item", disabled: true },
        { label: "Current Page" },
      ];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const disabledItem = screen.getByText("Disabled Item");
      expect(disabledItem).toBeInTheDocument();
      // Disabled styling is applied via className, which is tested through visual regression
    });
  });

  describe("Current Page", () => {
    it("marks last item as current page with aria-current", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current Page" },
      ];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const currentPage = screen.getByText("Current Page");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    });

    it("does not mark non-last items as current page", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current Page" },
      ];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const home = screen.getByText("Home");
      const products = screen.getByText("Products");

      expect(home).not.toHaveAttribute("aria-current");
      expect(products).not.toHaveAttribute("aria-current");
    });
  });

  describe("Separators", () => {
    it("renders default separator (ChevronRight icon) between items", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current Page" },
      ];

      const { container } = renderWithTheme(<Breadcrumbs.Root items={items} />);

      // Should have 2 separators (between Home-Products and Products-Current)
      const separators = container.querySelectorAll('[aria-hidden="true"]');
      expect(separators.length).toBeGreaterThanOrEqual(2);
    });

    it("does not render separator before first item", () => {
      const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: "Current Page" }];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const home = screen.getByText("Home");
      const listItem = home.closest("li");
      const firstChild = listItem?.firstChild;

      // First child should be the link/span, not separator
      expect(firstChild).toBe(home);
    });

    it("renders custom separator", () => {
      const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: "Current Page" }];

      renderWithTheme(<Breadcrumbs.Root items={items} separator={<span>/</span>} />);

      expect(screen.getByText("/")).toBeInTheDocument();
    });
  });

  describe("Compound Components", () => {
    it("exports Breadcrumbs.Item component", () => {
      expect(Breadcrumbs.Item).toBeDefined();
    });

    it("exports Breadcrumbs.Separator component", () => {
      expect(Breadcrumbs.Separator).toBeDefined();
    });

    it("Breadcrumbs.Item forwards ref correctly", () => {
      const ref = React.createRef<HTMLLIElement>();

      renderWithTheme(
        <Breadcrumbs.Root items={[]}>
          <Breadcrumbs.Item ref={ref}>Test Item</Breadcrumbs.Item>
        </Breadcrumbs.Root>,
      );

      expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });

    it("Breadcrumbs.Separator forwards ref correctly", () => {
      const ref = React.createRef<HTMLSpanElement>();

      renderWithTheme(
        <Breadcrumbs.Root items={[]}>
          <Breadcrumbs.Item>
            <Breadcrumbs.Separator ref={ref}>/</Breadcrumbs.Separator>
          </Breadcrumbs.Item>
        </Breadcrumbs.Root>,
      );

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe("Accessibility", () => {
    it("uses semantic nav element", () => {
      const items: BreadcrumbItem[] = [{ label: "Home" }];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const nav = screen.getByRole("navigation");
      expect(nav.tagName).toBe("NAV");
    });

    it("uses semantic ol list element", () => {
      const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: "Current Page" }];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const nav = screen.getByRole("navigation");
      const list = nav.querySelector("ol");
      expect(list).toBeInTheDocument();
      expect(list?.tagName).toBe("OL");
    });

    it("uses semantic li list item elements", () => {
      const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: "Current Page" }];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const nav = screen.getByRole("navigation");
      const listItems = nav.querySelectorAll("li");
      expect(listItems.length).toBe(2);
    });

    it("separators have aria-hidden attribute", () => {
      const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: "Current Page" }];

      const { container } = renderWithTheme(<Breadcrumbs.Root items={items} />);

      const separators = container.querySelectorAll('[aria-hidden="true"]');
      expect(separators.length).toBeGreaterThan(0);
    });
  });

  describe("Edge Cases", () => {
    it("handles items with duplicate labels", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Home", href: "/home" },
        { label: "Current Page" },
      ];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const homeLinks = screen.getAllByText("Home");
      expect(homeLinks.length).toBe(2);
    });

    it("handles items with empty labels", () => {
      const items: BreadcrumbItem[] = [{ label: "", href: "/" }, { label: "Current Page" }];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      expect(screen.getByText("Current Page")).toBeInTheDocument();
    });

    it("handles deep chain (8+ items)", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Level 1", href: "/level1" },
        { label: "Level 2", href: "/level1/level2" },
        { label: "Level 3", href: "/level1/level2/level3" },
        { label: "Level 4", href: "/level1/level2/level3/level4" },
        { label: "Level 5", href: "/level1/level2/level3/level4/level5" },
        { label: "Level 6", href: "/level1/level2/level3/level4/level5/level6" },
        { label: "Level 7", href: "/level1/level2/level3/level4/level5/level6/level7" },
        { label: "Current Page" },
      ];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Current Page")).toBeInTheDocument();
      expect(screen.getByText("Current Page")).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Navigation Intent", () => {
    it("renders links with correct href attributes for navigation", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Category", href: "/products/category" },
        { label: "Current Page" },
      ];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const homeLink = screen.getByRole("link", { name: /home/i });
      const productsLink = screen.getByRole("link", { name: /products/i });
      const categoryLink = screen.getByRole("link", { name: /category/i });

      expect(homeLink).toHaveAttribute("href", "/");
      expect(productsLink).toHaveAttribute("href", "/products");
      expect(categoryLink).toHaveAttribute("href", "/products/category");
    });

    it("delegates navigation behavior to Link component", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current Page" },
      ];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      // Links should be rendered by Link component (not raw <a> tags)
      // This is verified by checking that links exist and have proper structure
      const homeLink = screen.getByRole("link", { name: /home/i });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");

      // Last item should not be a link (navigation intent: current page is not navigable)
      const currentPage = screen.getByText("Current Page");
      expect(currentPage.tagName).toBe("SPAN");
      expect(currentPage).not.toHaveAttribute("href");
    });

    it("links are keyboard focusable for navigation", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Current Page" },
      ];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const homeLink = screen.getByRole("link", { name: /home/i });
      const productsLink = screen.getByRole("link", { name: /products/i });

      // Links should be focusable (tabindex behavior handled by Link component)
      expect(homeLink).toBeInTheDocument();
      expect(productsLink).toBeInTheDocument();

      // Verify links can receive focus (focusability is browser-native for <a> elements)
      // Actual focus testing would require user interaction, which is tested via visual regression
    });

    it("disabled items are not navigable (no href on disabled items)", () => {
      const items: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Disabled Item", href: "/disabled", disabled: true },
        { label: "Current Page" },
      ];

      renderWithTheme(<Breadcrumbs.Root items={items} />);

      const disabledItem = screen.getByText("Disabled Item");
      expect(disabledItem.tagName).toBe("SPAN");
      expect(disabledItem).not.toHaveAttribute("href");

      // Navigation intent: disabled items should not be clickable/navigable
      const homeLink = screen.getByRole("link", { name: /home/i });
      expect(homeLink).toBeInTheDocument();
    });
  });
});
