import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { Box } from "./Box";

describe("Box component", () => {
  it("should render box with default props", () => {
    const { container } = render(
      <Box>
        <div>Content</div>
      </Box>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toBeInTheDocument();
    expect(box?.tagName).toBe("DIV");
  });

  it("should apply padding using spacing tokens", () => {
    const { container, rerender } = render(<Box p={4}>Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({ padding: "var(--spacing-4)" });

    rerender(<Box p="md">Content</Box>);
    expect(box).toHaveStyle({ padding: "var(--spacing-md)" });
  });

  it("should apply margin using spacing tokens", () => {
    const { container } = render(<Box m={6}>Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({ margin: "var(--spacing-6)" });
  });

  it("should apply directional padding", () => {
    const { container } = render(
      <Box pt={4} pr={6} pb={8} pl={2}>
        Content
      </Box>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({
      paddingTop: "var(--spacing-4)",
      paddingRight: "var(--spacing-6)",
      paddingBottom: "var(--spacing-8)",
      paddingLeft: "var(--spacing-2)",
    });
  });

  it("should apply directional margin", () => {
    const { container } = render(
      <Box mt={2} mr={4} mb={6} ml={8}>
        Content
      </Box>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({
      marginTop: "var(--spacing-2)",
      marginRight: "var(--spacing-4)",
      marginBottom: "var(--spacing-6)",
      marginLeft: "var(--spacing-8)",
    });
  });

  it("should apply horizontal and vertical padding", () => {
    const { container } = render(
      <Box px={4} py={6}>
        Content
      </Box>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({
      paddingLeft: "var(--spacing-4)",
      paddingRight: "var(--spacing-4)",
      paddingTop: "var(--spacing-6)",
      paddingBottom: "var(--spacing-6)",
    });
  });

  it("should apply background color using CSS variables", () => {
    const { container } = render(<Box bg="background">Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({ backgroundColor: "var(--background)" });
  });

  it("should apply border radius using tokens", () => {
    const { container, rerender } = render(<Box radius="sm">Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({ borderRadius: "var(--radius-sm)" });

    rerender(<Box radius="md">Content</Box>);
    expect(box).toHaveStyle({ borderRadius: "var(--radius-md)" });
  });

  it("should render as different HTML element", () => {
    const { container } = render(<Box as="section">Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box?.tagName).toBe("SECTION");
  });

  it("should merge custom className", () => {
    const { container } = render(<Box className="custom-class">Content</Box>);
    const box = container.firstChild;
    expect(box).toHaveClass("custom-class");
  });

  it("should merge custom style", () => {
    const { container } = render(
      <Box style={{ color: "red" }} p={4}>
        Content
      </Box>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({
      padding: "var(--spacing-4)",
      color: "rgb(255, 0, 0)", // Browser normalizes "red" to rgb(255, 0, 0)
    });
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Box ref={ref}>
        <div>Content</div>
      </Box>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("should handle responsive spacing values", () => {
    const { container } = render(<Box p={{ base: 2, md: 4, lg: 6 }}>Content</Box>);
    const box = container.firstChild as HTMLElement;
    // Should use base value
    expect(box).toHaveStyle({ padding: "var(--spacing-2)" });
  });

  it("should handle semantic spacing tokens", () => {
    const { container } = render(<Box p="lg">Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({ padding: "var(--spacing-lg)" });
  });

  it("should handle layout spacing tokens", () => {
    const { container } = render(<Box p={"grid-md" as any}>Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({ padding: "var(--layout-grid-md)" });
  });

  describe("Layout props removal", () => {
    it("should NOT have display prop in BoxProps interface", () => {
      // TypeScript type check - display should not be in BoxProps
      // This is verified by TypeScript compilation
      const boxProps: React.ComponentProps<typeof Box> = {
        p: "md",
        bg: "background",
      };
      expect(boxProps).toBeDefined();
      // @ts-expect-error - display should not exist
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _display = boxProps.display;
    });

    it("should NOT have flexDirection prop in BoxProps interface", () => {
      const boxProps: React.ComponentProps<typeof Box> = {
        p: "md",
      };
      // @ts-expect-error - flexDirection should not exist
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _flexDirection = boxProps.flexDirection;
    });

    it("should NOT have gap prop in BoxProps interface", () => {
      const boxProps: React.ComponentProps<typeof Box> = {
        p: "md",
      };
      // @ts-expect-error - gap should not exist
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _gap = boxProps.gap;
    });

    it("should NOT have align prop in BoxProps interface", () => {
      const boxProps: React.ComponentProps<typeof Box> = {
        p: "md",
      };
      // @ts-expect-error - align should not exist
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _align = boxProps.align;
    });

    it("should NOT have justify prop in BoxProps interface", () => {
      const boxProps: React.ComponentProps<typeof Box> = {
        p: "md",
      };
      // @ts-expect-error - justify should not exist
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _justify = boxProps.justify;
    });

    it("should only accept spacing and visual props", () => {
      const { container } = render(
        <Box p="md" m="sm" bg="background" radius="lg" shadow="md">
          Content
        </Box>,
      );
      const box = container.firstChild as HTMLElement;
      expect(box).toHaveStyle({
        padding: "var(--spacing-md)",
        margin: "var(--spacing-sm)",
        backgroundColor: "var(--background)",
        borderRadius: "var(--radius-lg)",
      });
      expect(box).toHaveClass("shadow-md");
    });
  });
});
