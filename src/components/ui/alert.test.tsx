import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { Alert } from "./alert";

describe("Alert", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Alert>Alert message</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent("Alert message");
    });

    it("renders as div element", () => {
      const { container } = renderWithTheme(<Alert>Alert content</Alert>);
      const alert = container.querySelector("div[role='alert']");
      expect(alert).toBeInTheDocument();
    });
  });

  describe("Role", () => {
    it("has role='alert' attribute", () => {
      renderWithTheme(<Alert>Alert message</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("role", "alert");
    });

    it("is accessible via getByRole", () => {
      renderWithTheme(<Alert>Accessible alert</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent("Accessible alert");
    });
  });

  describe("Variants", () => {
    it("renders default variant", () => {
      const { container } = renderWithTheme(<Alert variant="default">Default Alert</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass("bg-muted");
      expect(alert).toHaveClass("border-border");
    });

    it("renders primary variant", () => {
      const { container } = renderWithTheme(<Alert variant="primary">Primary Alert</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass("bg-primary/10");
      expect(alert).toHaveClass("border-primary/20");
    });

    it("renders secondary variant", () => {
      const { container } = renderWithTheme(<Alert variant="secondary">Secondary Alert</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass("bg-secondary/10");
      expect(alert).toHaveClass("border-secondary/20");
    });

    it("renders accent variant", () => {
      const { container } = renderWithTheme(<Alert variant="accent">Accent Alert</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass("bg-accent/10");
      expect(alert).toHaveClass("border-accent/20");
    });

    it("renders destructive variant", () => {
      const { container } = renderWithTheme(<Alert variant="destructive">Destructive Alert</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass("bg-destructive/10");
      expect(alert).toHaveClass("border-destructive/20");
    });

    it("uses default variant when variant is not specified", () => {
      const { container } = renderWithTheme(<Alert>Default Alert</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass("bg-muted");
    });
  });

  describe("Content", () => {
    it("renders children content", () => {
      renderWithTheme(
        <Alert>
          <strong>Important:</strong> This is an alert message.
        </Alert>,
      );
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent("Important:");
      expect(alert).toHaveTextContent("This is an alert message.");
    });

    it("renders complex content", () => {
      renderWithTheme(
        <Alert>
          <div>
            <h3>Alert Title</h3>
            <p>Alert description</p>
          </div>
        </Alert>,
      );
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent("Alert Title");
      expect(alert).toHaveTextContent("Alert description");
    });
  });

  describe("Custom className", () => {
    it("applies custom className", () => {
      const { container } = renderWithTheme(<Alert className="custom-alert">Alert</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass("custom-alert");
    });

    it("merges custom className with variant classes", () => {
      const { container } = renderWithTheme(
        <Alert variant="primary" className="custom-alert">
          Alert
        </Alert>,
      );
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass("custom-alert");
      expect(alert).toHaveClass("bg-primary/10");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for default variant", () => {
      const { container } = renderWithTheme(<Alert>Default Alert</Alert>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for primary variant", () => {
      const { container } = renderWithTheme(<Alert variant="primary">Primary Alert</Alert>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for destructive variant", () => {
      const { container } = renderWithTheme(<Alert variant="destructive">Destructive Alert</Alert>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
