# Runtime Utilities Lock (TUNG-028)

**Version:** 1.0  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Status:** LOCKED - IMMUTABLE  
**Layer:** FOUNDATION  
**Priority:** CRITICAL  
**Task ID:** TUNG-028

---

## Purpose

This document **formally locks** the Runtime Utilities (`tokenCVA`, `cn`) of `@tenerife.music/ui` as **private Foundation implementation details**. These utilities must be imported directly from `@/FOUNDATION/lib/*` and are **forbidden** from `@/index` exports.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Source of Truth:** [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md), [PROJECT_PROGRESS.md](../../PROJECT_PROGRESS.md)

---

## Locked Utilities

### 1. tokenCVA

- **File:** `src/FOUNDATION/lib/token-cva.ts`
- **Status:** LOCKED (private Foundation implementation)
- **Lock Date:** 2026-01-29
- **Role:** CVA variant transport layer for token-driven styling
- **Import:** `import { tokenCVA } from "@/FOUNDATION/lib/token-cva"`
- **Rule:** DO NOT export from `@/index`; DO NOT import from `@tenerife.music/ui`

### 2. cn

- **File:** `src/FOUNDATION/lib/utils.ts`
- **Status:** LOCKED (private Foundation implementation)
- **Lock Date:** 2026-01-29
- **Role:** className merge utility
- **Import:** `import { cn } from "@/FOUNDATION/lib/utils"`
- **Rule:** DO NOT export from `@/index`; DO NOT import from `@tenerife.music/ui`

---

## Enforcement

### ESLint Rules

- **no-runtime-utils-from-index:** Forbids exporting tokenCVA or cn from `@/index`
- **no-token-imports-from-index:** Enforces canonical token import patterns

### Import Rules

- **Allowed:** Direct import from `@/FOUNDATION/lib/token-cva`, `@/FOUNDATION/lib/utils`
- **Forbidden:** Import from `@tenerife.music/ui` or `@/index`

---

## Forbidden Actions

- Exporting tokenCVA or cn from `@/index`
- Re-exporting runtime utilities in public API
- Documenting tokenCVA/cn as public API

---

## Unlock Procedure

1. Create unlock request with justification
2. Get architectural approval
3. Update FOUNDATION_LOCK and related documents
4. Re-lock with updated documentation

---

## Related Documents

- [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md)
- [FOUNDATION_CONTRACT.md](../FOUNDATION_CONTRACT.md)
- [CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md](../closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md)
