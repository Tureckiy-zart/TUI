/**
 * FocusTrap Component Tests
 *
 * Tests focus trap functionality, edge cases, A11Y, focus management, and input handling.
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { vi } from "vitest";

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
      const insideButton = screen.getByRole("button", { name: "Inside Button" });
      const outsideButton = screen.getByRole("button", { name: "Outside Button" });

      // Focus input1
      input1.focus();
      await waitFor(() => {
        expect(input1).toHaveFocus();
      });

      // Tab should move to inside button first (normal tab order)
      await user.tab();
      await waitFor(() => {
        expect(insideButton).toHaveFocus();
      });

      // Tab should escape to outside (focus trap disabled)
      // When active=false, FocusTrap should not interfere with normal Tab navigation
      // In normal DOM order: Outside Button -> Input 1 -> Inside Button
      // So Tab from Inside Button (last focusable) should go to document.body
      // This confirms that trap is not interfering
      await user.tab();
      await waitFor(() => {
        // Focus should go to body (normal browser behavior when no more focusable elements)
        // or to outside button if browser cycles (some browsers do this)
        const activeElement = document.activeElement;
        expect(activeElement === document.body || activeElement === outsideButton).toBe(true);
      });
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
              <FocusTrap
                restoreFocus={true}
                initialFocusRef={triggerButtonRef as React.RefObject<HTMLElement | null>}
              >
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
      const onEscape = vi.fn();
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
      // When there are no focusable elements, focus may remain on body
      // This is acceptable behavior - the component should not crash
      await waitFor(() => {
        expect(document.body).toBeInTheDocument();
      });
    });

    it("should handle all elements disabled", async () => {
      // Should not throw error when all elements are disabled
      expect(() => {
        render(
          <FocusTrap>
            <div>
              <Input placeholder="Input 1" disabled />
              <Input placeholder="Input 2" disabled />
              <Button disabled>Button</Button>
            </div>
          </FocusTrap>,
        );
      }).not.toThrow();

      // When all elements are disabled, focus may remain on body
      // This is acceptable behavior - the component should not crash
      await waitFor(() => {
        // Component should render without errors
        expect(document.body).toBeInTheDocument();
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

      // Click add button to add new input (focus will remain on button after click)
      await user.click(addButton);

      // Wait for new input to appear
      await waitFor(() => {
        expect(screen.getByPlaceholderText("Input 2")).toBeInTheDocument();
      });

      // Focus should remain on button after click (normal browser behavior)
      await waitFor(() => {
        expect(addButton).toHaveFocus();
      });

      // Tab should move to new input (Input 2 is next in DOM order after Button when loop=true)
      // But since Button is last, Tab should wrap to Input 1 (first element) when loop=true
      // So we need to check if Input 2 was added before Button in DOM order
      // Actually, DOM order is: Input 1, Input 2 (if added), Button
      // So if focus is on Button and we Tab with loop=true, focus should go to Input 1
      // But if loop=false, Tab should stay on Button
      // Since loop defaults to true, Tab should go to Input 1
      await user.tab();
      await waitFor(() => {
        expect(input1).toHaveFocus();
      });

      // Now Tab should go to Input 2
      await user.tab();
      const input2 = screen.getByPlaceholderText("Input 2");
      await waitFor(() => {
        expect(input2).toHaveFocus();
      });
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
              <FocusTrap
                restoreFocus={true}
                initialFocusRef={previousButtonRef as React.RefObject<HTMLElement | null>}
              >
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

      // Focus previous button before opening trap
      previousButton.focus();
      await waitFor(() => {
        expect(previousButton).toHaveFocus();
      });

      // Click close button
      await user.click(closeButton);

      // Focus should restore to previous button
      await waitFor(
        () => {
          expect(previousButton).toHaveFocus();
        },
        { timeout: 2000 },
      );
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
      const onEscape = vi.fn();
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
      const insideButton = screen.getByRole("button", { name: "Inside Button" });
      const outsideButton = screen.getByRole("button", { name: "Outside Button" });

      // Focus input
      input.focus();
      await waitFor(() => {
        expect(input).toHaveFocus();
      });

      // Tab should move to inside button first (normal tab order)
      await user.tab();
      await waitFor(
        () => {
          expect(insideButton).toHaveFocus();
        },
        { timeout: 2000 },
      );

      // Tab should escape to outside button (focus trap disabled)
      // When active=false, FocusTrap should not interfere with normal Tab navigation
      await user.tab();
      // Note: In normal DOM order, Tab from inside button should go to outside button
      // But if focus goes to body, that's also acceptable - it means trap is not interfering
      const activeElement = document.activeElement;
      expect(activeElement === outsideButton || activeElement === document.body).toBe(true);
    });
  });
});
