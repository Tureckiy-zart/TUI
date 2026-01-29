/**
 * Token Runtime Smoke Test
 *
 * Detects undefined branches, broken initialization order, or runtime token shape regressions.
 *
 * This test ensures that all exported component token objects are defined at runtime
 * and that critical nested branches exist and are accessible.
 *
 * @task TUI_TOKEN_SYSTEM_TESTS_028
 */

import { describe, expect, it } from "vitest";

// Import all Foundation component tokens directly from their source files
// This matches the canonical import pattern (not from @/index)
import { ALERT_TOKENS } from "@/FOUNDATION/tokens/components/alert";
import { ARTIST_TOKENS } from "@/FOUNDATION/tokens/components/artist";
import { BUTTON_TOKENS } from "@/FOUNDATION/tokens/components/button";
import { CARD_TOKENS } from "@/FOUNDATION/tokens/components/card";
import { CHECKBOX_TOKENS } from "@/FOUNDATION/tokens/components/checkbox";
import { DATA_LIST_TOKENS } from "@/FOUNDATION/tokens/components/data-list";
import { DATA_TOKENS } from "@/FOUNDATION/tokens/components/data";
import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens/components/domain";
import { EMPTY_STATE_TOKENS } from "@/FOUNDATION/tokens/components/empty-state";
import { FILE_UPLOAD_TOKENS } from "@/FOUNDATION/tokens/components/file-upload";
import { GRADIENT_TOKENS } from "@/FOUNDATION/tokens/gradients";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { INPUT_TOKENS } from "@/FOUNDATION/tokens/components/input";
import { MENU_TOKENS } from "@/FOUNDATION/tokens/components/menu";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import { NAVIGATION_TOKENS } from "@/FOUNDATION/tokens/components/navigation";
import { NOTIFICATION_TOKENS } from "@/FOUNDATION/tokens/components/notifications";
import { OVERLAY_TOKENS } from "@/FOUNDATION/tokens/components/overlay";
import { PANEL_TOKENS } from "@/FOUNDATION/tokens/components/panel";
import { POPOVER_TOKENS } from "@/FOUNDATION/tokens/components/popover";
import { RADIO_TOKENS } from "@/FOUNDATION/tokens/components/radio";
import { SECTION_TOKENS } from "@/FOUNDATION/tokens/components/section";
import { SIMPLETABLE_TOKENS } from "@/FOUNDATION/tokens/components/simple-table";
import { SPINNER_TOKENS } from "@/FOUNDATION/tokens/components/spinner";
import { SURFACE_TOKENS } from "@/FOUNDATION/tokens/components/surface";
import { SWITCH_TOKENS } from "@/FOUNDATION/tokens/components/switch";
import { TABLE_TOKENS } from "@/FOUNDATION/tokens/components/table";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";
import { TIMELINE_TOKENS } from "@/FOUNDATION/tokens/components/timeline";
import { TOAST_TOKENS } from "@/FOUNDATION/tokens/components/toast";
import { TOOLTIP_TOKENS } from "@/FOUNDATION/tokens/components/tooltip";

/**
 * List of all Foundation component tokens to test
 * This matches the FORBIDDEN_TOKEN_NAMES list from eslint-rules/no-token-imports-from-index.ts
 */
const TOKEN_TESTS = [
  { name: "ALERT_TOKENS", token: ALERT_TOKENS },
  { name: "ARTIST_TOKENS", token: ARTIST_TOKENS },
  { name: "BUTTON_TOKENS", token: BUTTON_TOKENS },
  { name: "CARD_TOKENS", token: CARD_TOKENS },
  { name: "CHECKBOX_TOKENS", token: CHECKBOX_TOKENS },
  { name: "DATA_LIST_TOKENS", token: DATA_LIST_TOKENS },
  { name: "DATA_TOKENS", token: DATA_TOKENS },
  { name: "DOMAIN_TOKENS", token: DOMAIN_TOKENS },
  { name: "EMPTY_STATE_TOKENS", token: EMPTY_STATE_TOKENS },
  { name: "FILE_UPLOAD_TOKENS", token: FILE_UPLOAD_TOKENS },
  { name: "GRADIENT_TOKENS", token: GRADIENT_TOKENS },
  { name: "ICON_TOKENS", token: ICON_TOKENS },
  { name: "INPUT_TOKENS", token: INPUT_TOKENS },
  { name: "MENU_TOKENS", token: MENU_TOKENS },
  { name: "MOTION_TOKENS", token: MOTION_TOKENS },
  { name: "NAVIGATION_TOKENS", token: NAVIGATION_TOKENS },
  { name: "NOTIFICATION_TOKENS", token: NOTIFICATION_TOKENS },
  { name: "OVERLAY_TOKENS", token: OVERLAY_TOKENS },
  { name: "PANEL_TOKENS", token: PANEL_TOKENS },
  { name: "POPOVER_TOKENS", token: POPOVER_TOKENS },
  { name: "RADIO_TOKENS", token: RADIO_TOKENS },
  { name: "SECTION_TOKENS", token: SECTION_TOKENS },
  { name: "SIMPLETABLE_TOKENS", token: SIMPLETABLE_TOKENS },
  { name: "SPINNER_TOKENS", token: SPINNER_TOKENS },
  { name: "SURFACE_TOKENS", token: SURFACE_TOKENS },
  { name: "SWITCH_TOKENS", token: SWITCH_TOKENS },
  { name: "TABLE_TOKENS", token: TABLE_TOKENS },
  { name: "TEXT_TOKENS", token: TEXT_TOKENS },
  { name: "TIMELINE_TOKENS", token: TIMELINE_TOKENS },
  { name: "TOAST_TOKENS", token: TOAST_TOKENS },
  { name: "TOOLTIP_TOKENS", token: TOOLTIP_TOKENS },
] as const;

describe("Token Runtime Smoke Test", () => {
  describe("Token object existence", () => {
    it.each(TOKEN_TESTS)("$name should be defined", ({ name, token }) => {
      expect(token, `${name} should be defined at runtime`).toBeDefined();
      expect(token, `${name} should be an object`).toBeTypeOf("object");
    });
  });

  describe("Critical nested paths", () => {
    it("SIMPLETABLE_TOKENS.padding.cell.sm should be defined", () => {
      expect(SIMPLETABLE_TOKENS.padding).toBeDefined();
      expect(SIMPLETABLE_TOKENS.padding.cell).toBeDefined();
      expect(SIMPLETABLE_TOKENS.padding.cell.sm).toBeDefined();
      expect(() => SIMPLETABLE_TOKENS.padding.cell.sm).not.toThrow();
    });

    it("TABLE_TOKENS.layout should be defined", () => {
      expect(TABLE_TOKENS.layout).toBeDefined();
      expect(TABLE_TOKENS.layout.overflow).toBeDefined();
      expect(TABLE_TOKENS.layout.table).toBeDefined();
      expect(() => TABLE_TOKENS.layout.table).not.toThrow();
    });

    it("FILE_UPLOAD_TOKENS.dropzone.state should be defined", () => {
      expect(FILE_UPLOAD_TOKENS.dropzone).toBeDefined();
      expect(FILE_UPLOAD_TOKENS.dropzone.state).toBeDefined();
      expect(FILE_UPLOAD_TOKENS.dropzone.state.dragActive).toBeDefined();
      expect(FILE_UPLOAD_TOKENS.dropzone.state.error).toBeDefined();
      expect(() => FILE_UPLOAD_TOKENS.dropzone.state.dragActive.border).not.toThrow();
    });

    it("EMPTY_STATE_TOKENS.icon.size.md should be defined", () => {
      expect(EMPTY_STATE_TOKENS.icon).toBeDefined();
      expect(EMPTY_STATE_TOKENS.icon.size).toBeDefined();
      expect(EMPTY_STATE_TOKENS.icon.size.md).toBeDefined();
      expect(() => EMPTY_STATE_TOKENS.icon.size.md).not.toThrow();
    });

    it("BUTTON_TOKENS should have critical paths", () => {
      expect(BUTTON_TOKENS.height).toBeDefined();
      expect(BUTTON_TOKENS.padding).toBeDefined();
      expect(() => BUTTON_TOKENS.height.sm).not.toThrow();
      expect(() => BUTTON_TOKENS.padding.horizontal.sm).not.toThrow();
    });

    it("CARD_TOKENS should have critical paths", () => {
      expect(CARD_TOKENS.padding).toBeDefined();
      expect(CARD_TOKENS.radius).toBeDefined();
      expect(CARD_TOKENS.shadow).toBeDefined();
      expect(() => CARD_TOKENS.padding.md).not.toThrow();
      expect(() => CARD_TOKENS.radius.md).not.toThrow();
    });

    it("DATA_LIST_TOKENS should have critical paths", () => {
      expect(DATA_LIST_TOKENS.spacing).toBeDefined();
      expect(DATA_LIST_TOKENS.labelWidth).toBeDefined();
      expect(DATA_LIST_TOKENS.rowPadding).toBeDefined();
      expect(() => DATA_LIST_TOKENS.spacing.gap).not.toThrow();
      expect(() => DATA_LIST_TOKENS.labelWidth.md).not.toThrow();
    });

    it("TIMELINE_TOKENS should have critical paths", () => {
      expect(TIMELINE_TOKENS.spacing).toBeDefined();
      expect(TIMELINE_TOKENS.dot).toBeDefined();
      expect(TIMELINE_TOKENS.connector).toBeDefined();
      expect(() => TIMELINE_TOKENS.spacing.gap).not.toThrow();
      expect(() => TIMELINE_TOKENS.dot.size).not.toThrow();
    });

    it("TABLE_TOKENS should have padding paths", () => {
      expect(TABLE_TOKENS.padding).toBeDefined();
      expect(TABLE_TOKENS.padding.cell).toBeDefined();
      expect(TABLE_TOKENS.padding.header).toBeDefined();
      expect(() => TABLE_TOKENS.padding.cell.sm).not.toThrow();
      expect(() => TABLE_TOKENS.padding.header.md).not.toThrow();
    });

    it("FILE_UPLOAD_TOKENS should have dropzone paths", () => {
      expect(FILE_UPLOAD_TOKENS.dropzone).toBeDefined();
      expect(FILE_UPLOAD_TOKENS.dropzone.height).toBeDefined();
      expect(FILE_UPLOAD_TOKENS.dropzone.padding).toBeDefined();
      expect(() => FILE_UPLOAD_TOKENS.dropzone.height.sm).not.toThrow();
      expect(() => FILE_UPLOAD_TOKENS.dropzone.padding.horizontal.md).not.toThrow();
    });
  });

  describe("Deep path access safety", () => {
    it("should not throw when accessing nested paths", () => {
      // Test various deep paths that were problematic in the past
      expect(() => {
        const simpleTablePadding = SIMPLETABLE_TOKENS.padding.cell.sm;
        const tableLayout = TABLE_TOKENS.layout.overflow;
        const fileUploadState = FILE_UPLOAD_TOKENS.dropzone.state.dragActive.border;
        const emptyStateIcon = EMPTY_STATE_TOKENS.icon.size.md;
        return { simpleTablePadding, tableLayout, fileUploadState, emptyStateIcon };
      }).not.toThrow();
    });

    it("should have accessible nested values", () => {
      // Verify that nested values are strings (Tailwind classes)
      expect(typeof SIMPLETABLE_TOKENS.padding.cell.sm).toBe("string");
      expect(typeof TABLE_TOKENS.layout.overflow).toBe("string");
      expect(typeof FILE_UPLOAD_TOKENS.dropzone.state.dragActive.border).toBe("string");
      expect(typeof EMPTY_STATE_TOKENS.icon.size.md).toBe("string");
    });
  });
});
