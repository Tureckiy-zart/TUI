# Foundation Overlays Lock (Modal, ContextMenu, Toast)

**Version:** 1.0  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Status:** LOCKED - IMMUTABLE  
**Layer:** FOUNDATION / COMPOSITION  
**Priority:** CRITICAL

---

## Purpose

This document **formally locks** the Foundation Overlay components (Modal, ContextMenu, Toast) of `@tenerife.music/ui`. After this lock, all three components, their APIs, Radix delegation patterns, and token usage are **immutable** and **closed for modifications**.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Source of Truth:** [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md), [EXTENSION_STATE.md](../EXTENSION_STATE.md)

---

## Locked Components

The following Foundation Overlay components are **LOCKED** and **IMMUTABLE**:

### 1. Modal

- **File:** `src/COMPOSITION/overlays/Modal/Modal.tsx`
- **Status:** LOCKED (Pipeline 18A Complete)
- **Lock Date:** 2025-12-25
- **Base Library:** Radix Dialog
- **Audit Report:** `docs/reports/audit/MODAL_BASELINE_REPORT.md`
- **Lock Type:** PROCESS_LOCK (COMPOSITION layer)
- **Exports:** `Modal`, `ModalClose`, `ModalContent`, `ModalDescription`, `ModalFooter`, `ModalHeader`, `ModalOverlay`, `ModalRoot`, `ModalTitle`, `ModalTrigger`, `ModalSize`
- **Types:** `ModalCloseProps`, `ModalContentProps`, `ModalDescriptionProps`, `ModalFooterProps`, `ModalHeaderProps`, `ModalOverlayProps`, `ModalRootProps`, `ModalSize`, `ModalTitleProps`, `ModalTriggerProps`
- **Rule:** DO NOT modify without re-entry into Pipeline 18A

### 2. ContextMenu

- **File:** `src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx`
- **Status:** LOCKED (Pipeline 18A Complete)
- **Lock Date:** 2025-12-25
- **Base Library:** Radix ContextMenu
- **Audit Report:** `docs/reports/audit/CONTEXTMENU_BASELINE_REPORT.md`
- **Lock Type:** PROCESS_LOCK (COMPOSITION layer)
- **Exports:** `ContextMenu`, `ContextMenuCheckboxItem`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuRoot`, `ContextMenuSeparator`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuTrigger`
- **Types:** `ContextMenuCheckboxItemProps`, `ContextMenuContentProps`, `ContextMenuItemProps`, `ContextMenuLabelProps`, `ContextMenuRadioGroupProps`, `ContextMenuRadioItemProps`, `ContextMenuRootProps`, `ContextMenuSeparatorProps`, `ContextMenuSubContentProps`, `ContextMenuSubProps`, `ContextMenuSubTriggerProps`, `ContextMenuTriggerProps`
- **Rule:** DO NOT modify without re-entry into Pipeline 18A

### 3. Toast

- **File:** `src/COMPOSITION/overlays/Toast.tsx`
- **Status:** LOCKED (Pipeline 18A Complete)
- **Lock Date:** 2025-12-25
- **Base Library:** Radix Toast
- **Audit Report:** `docs/reports/audit/TOAST_BASELINE_REPORT.md`
- **Lock Type:** PROCESS_LOCK (COMPOSITION layer)
- **Exports:** `Toast`, `ToastAction`, `ToastClose`, `ToastDescription`, `ToastRoot`, `ToastTitle`, `toastVariants`
- **Types:** `ToastActionData`, `ToastData`, `ToastProps`, `ToastRootProps`, `ToastVariant`
- **Rule:** DO NOT modify without re-entry into Pipeline 18A

---

## Locked Architecture

- All three components delegate behavior to Radix UI primitives
- All styling via tokenCVA and component tokens (MODAL_TOKENS, OVERLAY_TOKENS, TOAST_TOKENS)
- Foundation Enforcement: className/style excluded from public API
- Size scale: sm, md, lg (overlay restriction compliant)

---

## Forbidden Actions

- Modifying component APIs or props
- Breaking Radix delegation
- Adding raw values or non-token styling
- Creating alternatives (SimpleModal, BasicToast, etc.)
- Changing exports without unlock procedure

---

## Unlock Procedure

1. Create unlock request with justification
2. Get architectural approval
3. Re-enter Pipeline 18A for affected component
4. Complete full audit and verification
5. Re-lock with updated documentation

---

## Related Documents

- [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md)
- [EXTENSION_STATE.md](../EXTENSION_STATE.md)
- [ARCHITECTURE_LOCK.md](../ARCHITECTURE_LOCK.md)
