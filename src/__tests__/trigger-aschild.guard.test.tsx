import React from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  Button,
  ContextMenu,
  Menu,
  Modal,
  Popover,
  PopoverTrigger,
  Select,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/index";

const nestedButtonPattern = /<button[^>]*>\s*<button/i;

describe("Trigger asChild SSR guard", () => {
  it("renders PopoverTrigger without nested button", () => {
    const html = renderToString(
      <Popover>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>
      </Popover>,
    );

    expect(html).not.toMatch(nestedButtonPattern);
  });

  it("renders Modal.Trigger without nested button", () => {
    const html = renderToString(
      <Modal.Root>
        <Modal.Trigger>
          <Button>Open Modal</Button>
        </Modal.Trigger>
      </Modal.Root>,
    );

    expect(html).not.toMatch(nestedButtonPattern);
  });

  it("renders Menu.Trigger without nested button", () => {
    const html = renderToString(
      <Menu>
        <Menu.Trigger>
          <Button>Open Menu</Button>
        </Menu.Trigger>
      </Menu>,
    );

    expect(html).not.toMatch(nestedButtonPattern);
  });

  it("renders TooltipTrigger without nested button", () => {
    const html = renderToString(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button>Open Tooltip</Button>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(html).not.toMatch(nestedButtonPattern);
  });

  it("renders Select.Trigger without nested button", () => {
    const html = renderToString(
      <Select.Root>
        <Select.Trigger>
          <Button>Open Select</Button>
        </Select.Trigger>
      </Select.Root>,
    );

    expect(html).not.toMatch(nestedButtonPattern);
  });

  it("renders ContextMenu.Trigger without nested button", () => {
    const html = renderToString(
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Button>Open Context Menu</Button>
        </ContextMenu.Trigger>
      </ContextMenu.Root>,
    );

    expect(html).not.toMatch(nestedButtonPattern);
  });
});
