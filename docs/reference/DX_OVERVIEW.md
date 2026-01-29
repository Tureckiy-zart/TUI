# Developer Experience — Overview

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Purpose:** Entry point for developers and agents: where to find architecture rules and how to use the library in code.  
**Source of Truth:** [CLOSED_SYSTEM_V2_CANON_INDEX.md](../architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md), [CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md](../architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md), [ARCHITECTURE_CONTEXT.md](../ARCHITECTURE_CONTEXT.md)

---

## Purpose

This document is the **entry point for usage and how-to**. It does not define architecture or rules. It tells you where to look:

- **Architecture and formal rules** → Canon Index and Lock documents (see below).
- **How to use components and tokens in code** → Usage guides in this reference section.

---

## What is Closed System v2

Closed System v2 is the architectural closure of the Tenerife UI library. It means:

1. **Expression surface is fixed** — UI intent is expressed only through sanctioned APIs (public components, token props). No bypass channels (e.g. `className`/`style` on Foundation components, deep imports, raw utility classes for layout/typography/color).
2. **Boundaries are enforced** — Consumer code uses the public API only. Internal paths and implementation details are not part of the contract.
3. **Change control is mandatory** — Modifications to the system follow formal audit; ad-hoc bypasses are forbidden.

**Source:** [CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md](../architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md)

---

## Where to Find What

### Architecture and Rules (Canon)

- **Canon index (navigation hub):** [CLOSED_SYSTEM_V2_CANON_INDEX.md](../architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md) — single source of truth for canonical Closed System v2 documentation. Start here for problem definition, architecture model, phase locks, semantics canons.
- **Global architecture:** [ARCHITECTURE_CONTEXT.md](../ARCHITECTURE_CONTEXT.md) — Foundation status, Authority contracts, immutability rules.
- **Why the system is closed:** [CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md](../architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md) — closure rationale, problem classes prevented.

Formal rules (what is locked, what is forbidden) live in Canon and Lock documents. This overview does not restate them; it points you to them.

### Usage and How-To (Reference)

Use these guides when writing consumer code. Each guide cites its source of truth (Canon, Lock, or Authority).

| Guide | When to use it |
|-------|-----------------|
| [FOUNDATION_USAGE_GUIDE.md](./FOUNDATION_USAGE_GUIDE.md) | Using Foundation components (Button, Text, Input, etc.) without bypasses: public API, no `className`/`style`, Box/Stack for layout. |
| [LAYOUT_USAGE_GUIDE.md](./LAYOUT_USAGE_GUIDE.md) | Choosing and using Grid, Section, Stack, Row instead of raw flex/grid or utility classes. |
| [TYPOGRAPHY_USAGE_GUIDE.md](./TYPOGRAPHY_USAGE_GUIDE.md) | When `Text.size` / `typographyRole` / `color` are allowed (semantic) vs forbidden (presentational). |
| [TOKEN_USAGE_GUIDE.md](./TOKEN_USAGE_GUIDE.md) | Choosing tokens (spacing, color, radius, typography) without raw Tailwind utilities. |

---

## Quick Paths

- **"What is allowed / forbidden?"** → Canon Index → relevant Lock or Canon document.
- **"How do I use Button / Text / layout / tokens in code?"** → [FOUNDATION_USAGE_GUIDE.md](./FOUNDATION_USAGE_GUIDE.md), [LAYOUT_USAGE_GUIDE.md](./LAYOUT_USAGE_GUIDE.md), [TYPOGRAPHY_USAGE_GUIDE.md](./TYPOGRAPHY_USAGE_GUIDE.md), [TOKEN_USAGE_GUIDE.md](./TOKEN_USAGE_GUIDE.md).

---

## Related Documents

- [CLOSED_SYSTEM_V2_CANON_INDEX.md](../architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md) — Canonical documentation index and navigation.
- [FOUNDATION_REFERENCE.md](./FOUNDATION_REFERENCE.md) — What a Foundation component is and when the Foundation pipeline applies (process); for usage in consumer code see [FOUNDATION_USAGE_GUIDE.md](./FOUNDATION_USAGE_GUIDE.md).
