# Tabs Foundation Lock

**Version:** 1.0  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Status:** LOCKED - IMMUTABLE  
**Layer:** FOUNDATION / COMPOSITION  
**Priority:** CRITICAL

---

## Purpose

This document **formally locks** the Tabs Foundation Navigation component of `@tenerife.music/ui`. After this lock, the Tabs component, its API, Radix delegation, and token usage are **immutable** and **closed for modifications**.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Source of Truth:** [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md), [EXTENSION_STATE.md](../EXTENSION_STATE.md)

---

## Locked Components

### Tabs

- **File:** `src/COMPOSITION/navigation/tabs/Tabs.tsx`
- **Status:** LOCKED (Pipeline 18A Complete, Third Pass Complete)
- **Lock Date:** 2025-12-25 (First Pass), 2025-12-25 (Second Pass), 2025-12-27 (Third Pass)
- **Base Library:** Radix Tabs
- **Audit Report:** `docs/reports/audit/TABS_BASELINE_REPORT.md`
- **Lock Type:** PROCESS_LOCK (COMPOSITION layer)
- **Exports:** `Tabs`, `TabsRoot`, `TabsList`, `TabsTrigger`, `TabsContent`
- **Types:** `TabsContentProps`, `TabsListProps`, `TabsRootProps`, `TabsTriggerProps`
- **Rule:** DO NOT modify without re-entry into Pipeline 18A

---

## Locked Architecture

- Behavior delegated to Radix Tabs
- Token-driven styling via tokenCVA
- Foundation Enforcement: className/style excluded from public API

---

## Forbidden Actions

- Modifying component API or props
- Breaking Radix delegation
- Creating alternatives (SimpleTabs, BasicTabs, etc.)

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
