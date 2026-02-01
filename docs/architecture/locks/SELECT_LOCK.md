# Select Foundation Lock

**Version:** 1.0  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Status:** LOCKED - IMMUTABLE  
**Layer:** FOUNDATION / COMPOSITION  
**Priority:** CRITICAL

---

## Purpose

This document **formally locks** the Select Foundation Form Input component of `@tenerife.music/ui`. After this lock, the Select component, its API, Radix delegation, and token usage are **immutable** and **closed for modifications**.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Relationship:** This lock covers the Select **component**. For input **system rules** (keyboard parity, interaction authority), see [INPUT_LOCK.md](./INPUT_LOCK.md).

**Source of Truth:** [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md), [EXTENSION_STATE.md](../EXTENSION_STATE.md)

---

## Locked Components

### Select

- **File:** `src/COMPOSITION/controls/Select/Select.tsx`
- **Status:** LOCKED (Pipeline 18A Complete)
- **Lock Date:** 2025-12-25
- **Base Library:** Radix Select
- **Audit Report:** `docs/reports/audit/SELECT_BASELINE_REPORT.md`
- **Lock Type:** FOUNDATION LOCK
- **Exports:** `Select`, `SelectContent`, `SelectGroup`, `SelectIcon`, `SelectItem`, `SelectItemIndicator`, `SelectItemText`, `SelectLabel`, `SelectRoot`, `SelectSeparator`, `SelectTrigger`, `SelectValue`, `SelectViewport`
- **Rule:** DO NOT modify without re-entry into Pipeline 18A

---

## Locked Architecture

- Behavior delegated to Radix Select
- Token-driven styling via tokenCVA and SELECT_TOKENS
- Foundation Enforcement: className/style excluded from public API

---

## Forbidden Actions

- Modifying component API or props
- Breaking Radix delegation
- Creating alternatives (SimpleSelect, BasicSelect, etc.)

---

## Unlock Procedure

1. Create unlock request with justification
2. Get architectural approval
3. Re-enter Pipeline 18A
4. Complete full audit
5. Re-lock with updated documentation

---

## Related Documents

- [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md)
- [EXTENSION_STATE.md](../EXTENSION_STATE.md)
- [INPUT_LOCK.md](./INPUT_LOCK.md)
