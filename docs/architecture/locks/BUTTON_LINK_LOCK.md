# Button, IconButton, Link Foundation Lock

**Version:** 1.0  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Status:** LOCKED - IMMUTABLE  
**Layer:** FOUNDATION / PRIMITIVES  
**Priority:** CRITICAL

---

## Purpose

This document **formally locks** the Button, IconButton, and Link Foundation components of `@tenerife.music/ui`. After this lock, these components, their APIs, and token usage are **immutable** and **closed for modifications**.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Source of Truth:** [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md), [EXTENSION_STATE.md](../EXTENSION_STATE.md)

---

## Locked Components

### 1. Button

- **File:** `src/PRIMITIVES/Button/Button.tsx`
- **Status:** FINAL LOCK
- **Lock Date:** 2025-12-25
- **Lock Report:** `docs/reports/BUTTON_FOUNDATION_LOCK_REPORT.md`
- **Audit Report:** `docs/reports/audit/BUTTON_BASELINE_REPORT.md`
- **Purpose:** Sole action trigger foundation. All user-initiated actions must use this component.
- **Exports:** `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize`
- **Allowed:** Bug fixes, type improvements, documentation updates, accessibility fixes
- **Forbidden:** Public API changes, new variants/sizes, behavior changes, token modifications
- **Rule:** DO NOT modify, extend, or create alternatives

### 2. IconButton

- **File:** `src/PRIMITIVES/IconButton/IconButton.tsx`
- **Status:** LOCKED
- **Lock Date:** 2026-01-02
- **Base:** Native `<button>` (via Button)
- **Exports:** `IconButton`, `IconButtonProps`
- **Rule:** DO NOT modify without unlock procedure

### 3. Link

- **File:** `src/PRIMITIVES/Link/Link.tsx`
- **Status:** LOCKED (Pipeline 18A Complete)
- **Lock Date:** 2025-12-25
- **Base Library:** Native `<a>`
- **Audit Report:** `docs/reports/audit/LINK_BASELINE_REPORT.md`
- **Lock Report:** `docs/reports/LINK_FOUNDATION_LOCK_REPORT.md` (legacy)
- **Exports:** `Link`, `LinkProps`, `LinkSize`, `LinkVariant`, `linkVariants`
- **Rule:** DO NOT modify without re-entry into Pipeline 18A

---

## Locked Architecture

- Button is the canonical Foundation reference for token-driven CVA patterns
- All components use tokenCVA and BUTTON_TOKENS / LINK_TOKENS
- Foundation Enforcement: className/style excluded from public API

---

## Forbidden Actions

- Modifying Button, IconButton, or Link APIs
- Creating alternatives (SimpleButton, BasicLink, etc.)
- Adding new variants/sizes without unlock

---

## Unlock Procedure

1. Create unlock request with justification
2. Get architectural approval
3. For Button: explicit FINAL LOCK exception required
4. For Link/IconButton: Re-enter Pipeline 18A if structural changes
5. Re-lock with updated documentation

---

## Related Documents

- [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md)
- [EXTENSION_STATE.md](../EXTENSION_STATE.md)
- [LINK_NO_ASCHILD_CANONICAL_ANCHOR.md](../LINK_NO_ASCHILD_CANONICAL_ANCHOR.md)
