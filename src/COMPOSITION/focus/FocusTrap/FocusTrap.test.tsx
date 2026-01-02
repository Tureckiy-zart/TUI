/**
 * FocusTrap Component Tests
 *
 * Tests focus trap functionality, edge cases, A11Y, focus management, and input handling.
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";

import { Button } from "@/PRIMITIVES/Button";
import { Input } from "@/PRIMITIVES/Input";

import { FocusTrap } from "./FocusTrap";

describe("FocusTrap", () => {
  describe("Behavior Tests", () => {
    it("should trap focus when active=true", async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button>Outside Button</button>
          <FocusTrap active={true}>
            <div>
              <Input placeholder="Input 1" />
              <Input placeholder="Input 2" />
              <Button>Inside Button</Button>
            </div>
          </FocusTrap>
        </div>,
      );

      const input1 = screen.getByPlaceholderText("Input 1");
      const input2 = screen.getByPlaceholderText("Input 2");
      const insideButton = screen.getByRole("button", { name: "Inside Button" });
      const outsideButton = screen.getByRole("button", { name: "Outside Button" });

      // Focus should be on first focusable element
      await waitFor(() => {
        expect(input1).toHaveFocus();
      });

      // Tab should move to next element
      await user.tab();
      expect(input2).toHaveFocus();

      // Tab should move to button
      await user.tab();
      expect(insideButton).toHaveFocus();

      // Tab should wrap to first element (loop mode)
      await user.tab();
      expect(input1).toHaveFocus();

      // Shift+Tab should wrap to last element
      await user.tab({ shift: true });
      expect(insideButton).toHaveFocus();
    });

    it("should not trap focus when active=false", async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button>Outside Button</button>
          <FocusTrap active={false}>
            <div>
              <Input placeholder="Input 1" />
              <Button>Inside Button</Button>
            </div>
          </FocusTrap>
        </div>,
      );

      const input1 = screen.getByPlaceholderText("Input 1");
      const outsideButton = screen.getByRole("button", { name: "Outside Button" });

      // Focus input1
      input1.focus();
      expect(input1).toHaveFocus();

      // Tab should escape to outside button
      await user.tab();
      expect(outsideButton).toHaveFocus();
    });

    it("should set initial focus to initialFocusRef if provided", async () => {
      const TestComponent = () => {
        const input2Ref = useRef<HTMLInputElement>(null);

        return (
          <FocusTrap initialFocusRef={input2Ref}>
            <div>
              <Input placeholder="Input 1" />
              <Input ref={input2Ref} placeholder="Input 2" />
              <Button>Button</Button>
            </div>
          </FocusTrap>
        );
      };

      render(<TestComponent />);

      const input2 = screen.getByPlaceholderText("Input 2");

      await waitFor(() => {
        expect(input2).toHaveFocus();
      });
    });

    it("should set initial focus to first focusable element if initialFocusRef not provided", async () => {
      render(
        <FocusTrap>
          <div>
            <Input placeholder="Input 1" />
            <Input placeholder="Input 2" />
            <Button>Button</Button>
          </div>
        </FocusTrap>,
      );

      const input1 = screen.getByPlaceholderText("Input 1");

      await waitFor(() => {
        expect(input1).toHaveFocus();
      });
    });

    it("should restore focus on unmount if restoreFocus=true", async () => {
      const TestComponent = () => {
        const [isOpen, setIsOpen] = useState(true);
        const triggerButtonRef = useRef<HTMLButtonElement>(null);

        return (
          <div>
            <Button ref={triggerButtonRef} onClick={() => setIsOpen(false)}>
              Trigger
            </Button>
            {isOpen && (
              <FocusTrap restoreFocus={true} initialFocusRef={triggerButtonRef}>
                <div>
                  <Input placeholder="Input" />
                  <Button onClick={() => setIsOpen(false)}>Close</Button>
                </div>
              </FocusTrap>
            )}
          </div>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const triggerButton = screen.getByRole("button", { name: "Trigger" });
      const closeButton = screen.getByRole("button", { name: "Close" });

      // Click close button
      await user.click(closeButton);

      // Focus should restore to trigger button
      await waitFor(() => {
        expect(triggerButton).toHaveFocus();
      });
    });

    it("should call onEscape callback when Escape key is pressed", async () => {
      const onEscape = jest.fn();
      const user = userEvent.setup();

      render(
        <FocusTrap onEscape={onEscape}>
          <div>
            <Input placeholder="Input" />
            <Button>Button</Button>
          </div>
        </FocusTrap>,
      );

      const input = screen.getByPlaceholderText("Input");
      input.focus();

      // Press Escape
      await user.keyboard("{Escape}");

      expect(onEscape).toHaveBeenCalledTimes(1);
    });

    it("should not call onEscape if callback not provided", async () => {
      const user = userEvent.setup();

      render(
        <FocusTrap>
          <div>
            <Input placeholder="Input" />
            <Button>Button</Button>
          </div>
        </FocusTrap>,
      );

      const input = screen.getByPlaceholderText("Input");
      input.focus();

      // Press Escape (should not throw error)
      await user.keyboard("{Escape}");

      // Focus should still be on input
      expect(input).toHaveFocus();
    });

    it("should prevent wrapping when loop=false", async () => {
      const user = userEvent.setup();

      render(
        <FocusTrap loop={false}>
          <div>
            <Input placeholder="Input 1" />
            <Input placeholder="Input 2" />
            <Button>Button</Button>
          </div>
        </FocusTrap>,
      );

      const input1 = screen.getByPlaceholderText("Input 1");
      const input2 = screen.getByPlaceholderText("Input 2");
      const button = screen.getByRole("button", { name: "Button" });

      // Focus should be on first element
      await waitFor(() => {
        expect(input1).toHaveFocus();
      });

      // Shift+Tab at first should stay at first (no wrap)
      await user.tab({ shift: true });
      expect(input1).toHaveFocus();

      // Tab to last element
      await user.tab();
      expect(input2).toHaveFocus();
      await user.tab();
      expect(button).toHaveFocus();

      // Tab at last should stay at last (no wrap)
      await user.tab();
      expect(button).toHaveFocus();
    });
  });

  describe("Edge Cases", () => {
    it("should handle no focusable elements gracefully", async () => {
      render(
        <FocusTrap>
          <div>
            <div>No focusable elements</div>
          </div>
        </FocusTrap>,
      );

      // Should not throw error
      await waitFor(() => {
        expect(document.activeElement).not.toBe(document.body);
      });
    });

    it("should handle all elements disabled", async () => {
      render(
        <FocusTrap>
          <div>
            <Input placeholder="Input 1" disabled />
            <Input placeholder="Input 2" disabled />
            <Button disabled>Button</Button>
          </div>
        </FocusTrap>,
      );

      // Should not throw error
      await waitFor(() => {
        expect(document.activeElement).not.toBe(document.body);
      });
    });

    it("should handle dynamic focusable elements", async () => {
      const TestComponent = () => {
        const [showInput, setShowInput] = useState(false);

        return (
          <FocusTrap>
            <div>
              <Input placeholder="Input 1" />
              {showInput && <Input placeholder="Input 2" />}
              <Button onClick={() => setShowInput(true)}>Add Input</Button>
            </div>
          </FocusTrap>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const addButton = screen.getByRole("button", { name: "Add Input" });
      const input1 = screen.getByPlaceholderText("Input 1");

      // Focus should be on first input
      await waitFor(() => {
        expect(input1).toHaveFocus();
      });

      // Click add button
      await user.click(addButton);

      // Tab should move to new input
      await user.tab();
      const input2 = screen.getByPlaceholderText("Input 2");
      expect(input2).toHaveFocus();
    });
  });

  describe("A11Y Tests", () => {
    it("should not render visible elements (component is invisible wrapper)", () => {
      const { container } = render(
        <FocusTrap>
          <div>
            <Input placeholder="Input" />
          </div>
        </FocusTrap>,
      );

      // Component should render a div wrapper (invisible)
      const wrapper = container.firstChild;
      expect(wrapper).toBeInstanceOf(HTMLDivElement);
      expect(wrapper).toHaveStyle({ display: "block" });
    });

    it("should not block programmatic focus management", async () => {
      const TestComponent = () => {
        const input2Ref = useRef<HTMLInputElement>(null);

        return (
          <FocusTrap>
            <div>
              <Input placeholder="Input 1" />
              <Input ref={input2Ref} placeholder="Input 2" />
              <Button onClick={() => input2Ref.current?.focus()}>Focus Input 2</Button>
            </div>
          </FocusTrap>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const focusButton = screen.getByRole("button", { name: "Focus Input 2" });
      const input2 = screen.getByPlaceholderText("Input 2");

      // Click button to programmatically focus input2
      await user.click(focusButton);

      // Focus should be on input2
      expect(input2).toHaveFocus();
    });
  });

  describe("Focus Tests", () => {
    it("should contain Tab/Shift+Tab within children subtree", async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button>Outside Button</button>
          <FocusTrap>
            <div>
              <Input placeholder="Input 1" />
              <Input placeholder="Input 2" />
              <Button>Inside Button</Button>
            </div>
          </FocusTrap>
        </div>,
      );

      const input1 = screen.getByPlaceholderText("Input 1");
      const input2 = screen.getByPlaceholderText("Input 2");
      const insideButton = screen.getByRole("button", { name: "Inside Button" });
      const outsideButton = screen.getByRole("button", { name: "Outside Button" });

      // Focus should be on first input
      await waitFor(() => {
        expect(input1).toHaveFocus();
      });

      // Tab should cycle within trapped area
      await user.tab();
      expect(input2).toHaveFocus();
      await user.tab();
      expect(insideButton).toHaveFocus();
      await user.tab();
      expect(input1).toHaveFocus();

      // Focus should not escape to outside button
      expect(outsideButton).not.toHaveFocus();
    });

    it("should restore focus to previous element on unmount", async () => {
      const TestComponent = () => {
        const [isOpen, setIsOpen] = useState(true);
        const previousButtonRef = useRef<HTMLButtonElement>(null);

        return (
          <div>
            <Button ref={previousButtonRef} onClick={() => setIsOpen(true)}>
              Previous Button
            </Button>
            {isOpen && (
              <FocusTrap restoreFocus={true}>
                <div>
                  <Input placeholder="Input" />
                  <Button onClick={() => setIsOpen(false)}>Close</Button>
                </div>
              </FocusTrap>
            )}
          </div>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      const previousButton = screen.getByRole("button", { name: "Previous Button" });
      const closeButton = screen.getByRole("button", { name: "Close" });

      // Click close button
      await user.click(closeButton);

      // Focus should restore to previous button
      await waitFor(() => {
        expect(previousButton).toHaveFocus();
      });
    });

    it("should follow DOM order for tab order", async () => {
      const user = userEvent.setup();

      render(
        <FocusTrap>
          <div>
            <Input placeholder="Input 1" />
            <Input placeholder="Input 2" />
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </div>
        </FocusTrap>,
      );

      const input1 = screen.getByPlaceholderText("Input 1");
      const input2 = screen.getByPlaceholderText("Input 2");
      const button1 = screen.getByRole("button", { name: "Button 1" });
      const button2 = screen.getByRole("button", { name: "Button 2" });

      // Focus should be on first input
      await waitFor(() => {
        expect(input1).toHaveFocus();
      });

      // Tab order should follow DOM order
      await user.tab();
      expect(input2).toHaveFocus();
      await user.tab();
      expect(button1).toHaveFocus();
      await user.tab();
      expect(button2).toHaveFocus();
    });
  });

  describe("Input Tests", () => {
    it("should support keyboard parity (Tab/Shift+Tab for focus navigation)", async () => {
      const user = userEvent.setup();

      render(
        <FocusTrap>
          <div>
            <Input placeholder="Input 1" />
            <Input placeholder="Input 2" />
            <Button>Button</Button>
          </div>
        </FocusTrap>,
      );

      const input1 = screen.getByPlaceholderText("Input 1");
      const input2 = screen.getByPlaceholderText("Input 2");
      const button = screen.getByRole("button", { name: "Button" });

      // Focus should be on first input
      await waitFor(() => {
        expect(input1).toHaveFocus();
      });

      // Tab should move forward
      await user.tab();
      expect(input2).toHaveFocus();
      await user.tab();
      expect(button).toHaveFocus();

      // Shift+Tab should move backward
      await user.tab({ shift: true });
      expect(input2).toHaveFocus();
      await user.tab({ shift: true });
      expect(input1).toHaveFocus();
    });

    it("should handle Escape key semantics (calls onEscape if provided)", async () => {
      const onEscape = jest.fn();
      const user = userEvent.setup();

      render(
        <FocusTrap onEscape={onEscape}>
          <div>
            <Input placeholder="Input" />
            <Button>Button</Button>
          </div>
        </FocusTrap>,
      );

      const input = screen.getByPlaceholderText("Input");
      input.focus();

      // Press Escape
      await user.keyboard("{Escape}");

      expect(onEscape).toHaveBeenCalledTimes(1);
    });

    it("should block focus trap when active=false", async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button>Outside Button</button>
          <FocusTrap active={false}>
            <div>
              <Input placeholder="Input" />
              <Button>Inside Button</Button>
            </div>
          </FocusTrap>
        </div>,
      );

      const input = screen.getByPlaceholderText("Input");
      const outsideButton = screen.getByRole("button", { name: "Outside Button" });

      // Focus input
      input.focus();
      expect(input).toHaveFocus();

      // Tab should escape to outside button (focus trap disabled)
      await user.tab();
      expect(outsideButton).toHaveFocus();
    });
  });
});
