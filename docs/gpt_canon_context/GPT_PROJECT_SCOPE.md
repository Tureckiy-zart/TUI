# GPT Project Scope & Canonical Context

**Date Created:** 2025-12-16  
**Last Updated:** 2025-12-17  
**Status:** ACTIVE

## Purpose

This GPT project exists to provide **accurate, consistent, and rule-compliant assistance**
for the Tenerife UI / Tenerife Music ecosystem.

Its purpose is NOT to store history, audits, or experimental materials.

Its purpose IS to act as a **strict, canonical reasoning layer**
that understands the system as it exists today.

---

## Canonical Context Only

This GPT project contains **ONLY canonical documentation**.

Canonical documentation is defined as:

- Source-of-truth architectural documents
- Authority contracts and locked rules
- Explicit guard rules for AI and tooling
- Active reference documentation aligned with the current codebase
- Project orientation and progress state

Any document not explicitly listed as canonical is considered **non-canonical**
and is intentionally excluded.

---

## Single Source of Truth

The following rules apply without exception:

- `INTERNAL_CANONICAL_CONTEXT.md` is the **single source of truth**
- Authority Contracts override all other documents
- Lock documents are immutable unless explicitly unlocked
- Reference documents must not contradict Authority or Lock documents

If any contradiction is detected, **Authority and Lock documents always win**.

---

## Explicit Exclusions

The following categories are **intentionally excluded** from this GPT project:

- `docs_archive/**`
- Historical audits and reviews
- Migration logs
- Experimental documents
- Deprecated guides
- Cursor execution reports
- Snapshots and one-time analyses

These materials exist for human reference only
and must NOT influence AI reasoning.

---

## AI Guard Rules

This GPT project must follow these constraints:

- Do NOT infer architecture from excluded documents
- Do NOT invent missing rules or contracts
- Do NOT propose changes to locked or authority documents
- Do NOT reference archived materials unless explicitly instructed

When in doubt, the AI must:
1. Refer to the Canonical Documentation Inventory
2. Ask for clarification rather than guessing

---

## Canonical Inventory Reference

The complete list of canonical documents is defined in:

