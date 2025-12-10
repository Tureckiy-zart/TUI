import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import { SimpleModal } from "../SimpleModal";

describe("SimpleModal accessibility", () => {
  afterEach(() => cleanup());

  it("announces dialog semantics and closes via keyboard controls", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <SimpleModal
        isOpen
        onClose={onClose}
        title="Share feedback"
        description="Provide a quick update"
      >
        <button type="button">Action</button>
      </SimpleModal>,
    );

    const dialog = screen.getByRole("dialog", { name: /share feedback/i });
    expect(dialog).toHaveAttribute("aria-modal", "true");

    const closeButton = screen.getByRole("button", { name: /close modal/i });
    closeButton.focus();
    await user.keyboard("{Enter}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("has no detectable axe violations", async () => {
    render(
      <SimpleModal isOpen onClose={() => {}} title="Test modal">
        <p>Modal body</p>
      </SimpleModal>,
    );

    const results = await axe(document.body);
    (expect(results) as any).toHaveNoViolations();
  });
});
