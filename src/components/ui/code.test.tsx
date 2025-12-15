import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { Code } from "./code";

describe("Code", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Code>const code = 'example';</Code>);
      const code = screen.getByText("const code = 'example';");
      expect(code).toBeInTheDocument();
    });

    it("renders as code element by default for inline variant", () => {
      const { container } = renderWithTheme(<Code variant="inline">Code content</Code>);
      const codeElement = container.querySelector("code");
      expect(codeElement).toBeInTheDocument();
      expect(codeElement).toHaveTextContent("Code content");
    });

    it("renders as pre element by default for block variant", () => {
      const { container } = renderWithTheme(<Code variant="block">Code block</Code>);
      const preElement = container.querySelector("pre");
      expect(preElement).toBeInTheDocument();
      expect(preElement).toHaveTextContent("Code block");
    });
  });

  describe("Variants", () => {
    it("renders inline variant (default)", () => {
      const { container } = renderWithTheme(<Code variant="inline">Inline code</Code>);
      const codeElement = container.querySelector("code");
      expect(codeElement).toBeInTheDocument();
    });

    it("renders block variant", () => {
      const { container } = renderWithTheme(<Code variant="block">Code block</Code>);
      const preElement = container.querySelector("pre");
      expect(preElement).toBeInTheDocument();
      const codeElement = preElement?.querySelector("code");
      expect(codeElement).toBeInTheDocument();
    });
  });

  describe("Muted", () => {
    it("applies muted styles when muted is true", () => {
      const { container } = renderWithTheme(<Code muted>Muted Code</Code>);
      const codeElement = container.querySelector("code");
      expect(codeElement).toHaveClass("text-muted-foreground");
    });

    it("does not apply muted styles when muted is false", () => {
      const { container } = renderWithTheme(<Code muted={false}>Normal Code</Code>);
      const codeElement = container.querySelector("code");
      expect(codeElement).not.toHaveClass("text-muted-foreground");
    });

    it("defaults to not muted", () => {
      const { container } = renderWithTheme(<Code>Default Code</Code>);
      const codeElement = container.querySelector("code");
      expect(codeElement).not.toHaveClass("text-muted-foreground");
    });
  });

  describe("Custom Element", () => {
    it("renders as pre element when as prop is pre for inline variant", () => {
      const { container } = renderWithTheme(
        <Code variant="inline" as="pre">
          Code as pre
        </Code>,
      );
      const codeElement = container.querySelector("pre");
      expect(codeElement).toBeInTheDocument();
      expect(codeElement).toHaveTextContent("Code as pre");
    });

    it("renders as code element when as prop is code for block variant", () => {
      const { container } = renderWithTheme(
        <Code variant="block" as="code">
          Code block as code
        </Code>,
      );
      const codeElement = container.querySelector("code");
      expect(codeElement).toBeInTheDocument();
      expect(codeElement).toHaveTextContent("Code block as code");
    });
  });

  describe("Combined Props", () => {
    it("renders with variant and muted", () => {
      const { container } = renderWithTheme(
        <Code variant="block" muted>
          Muted Code Block
        </Code>,
      );
      const preElement = container.querySelector("pre");
      expect(preElement).toBeInTheDocument();
      expect(preElement).toHaveClass("text-muted-foreground");
    });
  });

  describe("Custom className", () => {
    it("applies custom className", () => {
      const { container } = renderWithTheme(<Code className="custom-class">Code</Code>);
      const codeElement = container.querySelector("code");
      expect(codeElement).toHaveClass("custom-class");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for inline variant", () => {
      const { container } = renderWithTheme(<Code variant="inline">Inline Code</Code>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for block variant", () => {
      const { container } = renderWithTheme(<Code variant="block">Code Block</Code>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
