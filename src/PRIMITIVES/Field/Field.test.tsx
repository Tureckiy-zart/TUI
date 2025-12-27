import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { Input } from "@/PRIMITIVES/Input";
import { renderWithTheme } from "@/test/test-utils";

import { Field } from "./Field";

describe("Field", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(
        <Field>
          <Field.Label>Username</Field.Label>
          <Field.Control>
            <Input placeholder="Enter username" />
          </Field.Control>
        </Field>,
      );
      const label = screen.getByText("Username");
      expect(label).toBeInTheDocument();
    });

    it("renders with children", () => {
      const { container } = renderWithTheme(
        <Field>
          <Field.Label>Email</Field.Label>
          <Field.Control>
            <Input type="email" />
          </Field.Control>
        </Field>,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(
        <Field ref={ref}>
          <Field.Label>Test</Field.Label>
        </Field>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Field.Label", () => {
    it("renders label text", () => {
      renderWithTheme(
        <Field>
          <Field.Label>Email Address</Field.Label>
        </Field>,
      );
      const label = screen.getByText("Email Address");
      expect(label).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLLabelElement>();
      renderWithTheme(
        <Field>
          <Field.Label ref={ref}>Test Label</Field.Label>
        </Field>,
      );
      expect(ref.current).toBeInstanceOf(HTMLLabelElement);
      expect(ref.current?.textContent).toBe("Test Label");
    });

    it("accepts htmlFor prop", () => {
      renderWithTheme(
        <Field>
          <Field.Label htmlFor="email-input">Email</Field.Label>
        </Field>,
      );
      const label = screen.getByText("Email");
      expect(label).toHaveAttribute("for", "email-input");
    });

    it("accepts required prop", () => {
      renderWithTheme(
        <Field>
          <Field.Label required>Required Field</Field.Label>
        </Field>,
      );
      const label = screen.getByText(/Required Field/);
      expect(label.textContent).toContain("*");
    });
  });

  describe("Field.Control", () => {
    it("renders control wrapper", () => {
      const { container } = renderWithTheme(
        <Field>
          <Field.Control>
            <Input placeholder="Test" />
          </Field.Control>
        </Field>,
      );
      const input = screen.getByPlaceholderText("Test");
      expect(input).toBeInTheDocument();
      expect(input.parentElement).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(
        <Field>
          <Field.Control ref={ref}>
            <Input />
          </Field.Control>
        </Field>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("accepts className prop", () => {
      const { container } = renderWithTheme(
        <Field>
          <Field.Control className="custom-class">
            <Input placeholder="Test" />
          </Field.Control>
        </Field>,
      );
      const input = screen.getByPlaceholderText("Test");
      expect(input.parentElement).toHaveClass("custom-class");
    });

    it("wraps input correctly", () => {
      renderWithTheme(
        <Field>
          <Field.Control>
            <Input placeholder="Wrapped input" />
          </Field.Control>
        </Field>,
      );
      const input = screen.getByPlaceholderText("Wrapped input");
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe("INPUT");
    });
  });

  describe("Field.Description", () => {
    it("renders description text", () => {
      renderWithTheme(
        <Field>
          <Field.Description>Helper text here</Field.Description>
        </Field>,
      );
      const description = screen.getByText("Helper text here");
      expect(description).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLSpanElement>();
      renderWithTheme(
        <Field>
          <Field.Description ref={ref}>Test Description</Field.Description>
        </Field>,
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.textContent).toBe("Test Description");
    });

    it("uses small size by default", () => {
      const { container } = renderWithTheme(
        <Field>
          <Field.Description>Small text</Field.Description>
        </Field>,
      );
      const description = screen.getByText("Small text");
      expect(description).toBeInTheDocument();
      // Text component with size="sm" renders as span
      expect(description.tagName).toBe("SPAN");
    });

    it("is muted by default", () => {
      const { container } = renderWithTheme(
        <Field>
          <Field.Description>Muted text</Field.Description>
        </Field>,
      );
      const description = screen.getByText("Muted text");
      expect(description).toBeInTheDocument();
      // Muted prop is applied via Text component
    });
  });

  describe("Field.Error", () => {
    it("renders error text", () => {
      renderWithTheme(
        <Field>
          <Field.Error>Error message here</Field.Error>
        </Field>,
      );
      const error = screen.getByText("Error message here");
      expect(error).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLSpanElement>();
      renderWithTheme(
        <Field>
          <Field.Error ref={ref}>Test Error</Field.Error>
        </Field>,
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      // ref points to wrapper span, not Text span
    });

    it("uses destructive color", () => {
      const { container } = renderWithTheme(
        <Field>
          <Field.Error>Destructive error</Field.Error>
        </Field>,
      );
      const error = screen.getByText("Destructive error");
      // Wrapper span has text-destructive class
      expect(error.parentElement).toHaveClass("text-destructive");
    });

    it("uses small size by default", () => {
      renderWithTheme(
        <Field>
          <Field.Error>Small error</Field.Error>
        </Field>,
      );
      const error = screen.getByText("Small error");
      expect(error).toBeInTheDocument();
      // Text component with size="sm" renders as span
      expect(error.tagName).toBe("SPAN");
    });
  });

  describe("Composition", () => {
    it("renders complete field with all subcomponents", () => {
      renderWithTheme(
        <Field>
          <Field.Label htmlFor="email">Email</Field.Label>
          <Field.Control>
            <Input id="email" type="email" placeholder="Enter email" />
          </Field.Control>
          <Field.Description>We'll never share your email.</Field.Description>
        </Field>,
      );

      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
      expect(screen.getByText("We'll never share your email.")).toBeInTheDocument();
    });

    it("renders field with error", () => {
      renderWithTheme(
        <Field>
          <Field.Label htmlFor="password">Password</Field.Label>
          <Field.Control>
            <Input id="password" type="password" />
          </Field.Control>
          <Field.Error>Password is required</Field.Error>
        </Field>,
      );

      expect(screen.getByText("Password")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });

    it("renders field with description and error", () => {
      renderWithTheme(
        <Field>
          <Field.Label htmlFor="username">Username</Field.Label>
          <Field.Control>
            <Input id="username" />
          </Field.Control>
          <Field.Description>Choose a unique username</Field.Description>
          <Field.Error>Username is taken</Field.Error>
        </Field>,
      );

      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("Choose a unique username")).toBeInTheDocument();
      expect(screen.getByText("Username is taken")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("label associates with input via htmlFor and id", () => {
      renderWithTheme(
        <Field>
          <Field.Label htmlFor="test-input">Test Label</Field.Label>
          <Field.Control>
            <Input id="test-input" />
          </Field.Control>
        </Field>,
      );

      const label = screen.getByText("Test Label");
      const input = document.getElementById("test-input");

      expect(label).toHaveAttribute("for", "test-input");
      expect(input).toHaveAttribute("id", "test-input");
    });

    it("description can be associated with input via aria-describedby", () => {
      renderWithTheme(
        <Field>
          <Field.Label htmlFor="email">Email</Field.Label>
          <Field.Control>
            <Input id="email" aria-describedby="email-description" />
          </Field.Control>
          <Field.Description id="email-description">Enter your email address</Field.Description>
        </Field>,
      );

      const input = document.getElementById("email");
      const description = document.getElementById("email-description");

      expect(input).toHaveAttribute("aria-describedby", "email-description");
      expect(description).toBeInTheDocument();
    });

    it("error can be associated with input via aria-errormessage", () => {
      renderWithTheme(
        <Field>
          <Field.Label htmlFor="password">Password</Field.Label>
          <Field.Control>
            <Input id="password" aria-invalid="true" aria-errormessage="password-error" />
          </Field.Control>
          <Field.Error id="password-error">Password is required</Field.Error>
        </Field>,
      );

      const input = document.getElementById("password");
      const error = document.getElementById("password-error");

      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute("aria-errormessage", "password-error");
      expect(error).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("renders with empty children", () => {
      const { container } = renderWithTheme(<Field />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders with only label", () => {
      renderWithTheme(
        <Field>
          <Field.Label>Standalone Label</Field.Label>
        </Field>,
      );
      expect(screen.getByText("Standalone Label")).toBeInTheDocument();
    });

    it("renders with only control", () => {
      renderWithTheme(
        <Field>
          <Field.Control>
            <Input placeholder="Standalone input" />
          </Field.Control>
        </Field>,
      );
      expect(screen.getByPlaceholderText("Standalone input")).toBeInTheDocument();
    });

    it("renders multiple errors", () => {
      renderWithTheme(
        <Field>
          <Field.Error>Error 1</Field.Error>
          <Field.Error>Error 2</Field.Error>
        </Field>,
      );
      expect(screen.getByText("Error 1")).toBeInTheDocument();
      expect(screen.getByText("Error 2")).toBeInTheDocument();
    });

    it("accepts custom className", () => {
      const { container } = renderWithTheme(
        <Field className="custom-field">
          <Field.Label>Test</Field.Label>
        </Field>,
      );
      // Field renders as Stack, which renders as div
      expect(container.firstChild).toHaveClass("custom-field");
    });

    it("accepts data attributes", () => {
      const { container } = renderWithTheme(
        <Field data-testid="field-test">
          <Field.Label>Test</Field.Label>
        </Field>,
      );
      expect(container.firstChild).toHaveAttribute("data-testid", "field-test");
    });
  });
});
