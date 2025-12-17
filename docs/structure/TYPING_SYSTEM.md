# Typing System Index

**Version:** 1.0  
**Date:** 2025-12-17  
**Status:** ✅ CANONICAL  
**Scope:** Complete typing architecture for `@tenerife.music/ui`  
**Audience:** Maintainers, Contributors, Cursor AI

---

## 📋 Purpose

This document is the **canonical entry point** for understanding the typing system architecture in `@tenerife.music/ui`. It provides:

- **System Overview:** How the typing system is organized
- **Hierarchy Definition:** Clear priority order of typing documents
- **Responsibility Mapping:** What each document governs
- **Navigation Guide:** Where to look for specific typing questions

**This document does NOT contain typing rules.** It is an **index and navigation tool** that links to the authoritative documents.

---

## 🏗️ Typing System Architecture

The typing system consists of **two primary documents** with a clear hierarchy:

```
┌─────────────────────────────────────────────────────────┐
│  TYPING_STANDARD.md (PRIMARY AUTHORITY)                 │
│  - Public API typing (variants, sizes, CVA boundaries) │
│  - Architectural typing decisions                        │
│  - Explicit union type requirements                     │
│  - MANDATORY, ENFORCED                                  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ takes precedence over
                          ▼
┌─────────────────────────────────────────────────────────┐
│  TYPESCRIPT_GENERAL_RULES.md (SECONDARY GUIDANCE)       │
│  - General TypeScript implementation rules              │
│  - Internal coding practices                           │
│  - Type safety guidelines                               │
│  - Does NOT override TYPING_STANDARD.md                 │
└─────────────────────────────────────────────────────────┘
```

---

## 📚 Document Hierarchy

### 1. PRIMARY AUTHORITY: `docs/structure/TYPING_STANDARD.md`

**Status:** MANDATORY, ENFORCED, CANONICAL  
**Priority:** HIGHEST (overrides all other typing guidelines)

**Governs:**
- ✅ Public component API typing (all components, Foundation + Extension)
- ✅ Variant, size, and similar prop type definitions
- ✅ CVA usage boundaries in public APIs
- ✅ Explicit union type requirements
- ✅ Type constraints for CVA variant maps

**Does NOT Govern:**
- ❌ Internal implementation typing patterns
- ❌ General TypeScript coding practices
- ❌ Hook typing patterns
- ❌ Utility function typing

**Key Rules:**
- Public APIs **MUST** use explicit union types (not CVA-derived)
- `VariantProps<typeof cvaVariants>` in public APIs is **FORBIDDEN**
- CVA variant maps **MUST** be type-constrained with `satisfies Record<...>`
- Inline string unions in props are **FORBIDDEN**

**When to Use:**
- Creating or modifying public component APIs
- Defining variant or size props
- Deciding between CVA-derived types vs explicit unions
- Any conflict with general TypeScript rules

---

### 2. SECONDARY GUIDANCE: `docs/structure/TYPESCRIPT_GENERAL_RULES.md`

**Status:** ACTIVE, SECONDARY  
**Priority:** LOWER (does not override `TYPING_STANDARD.md`)

**Governs:**
- ✅ General TypeScript implementation rules
- ✅ Internal coding practices
- ✅ Type safety guidelines (strict mode, no implicit any)
- ✅ Native type extension patterns
- ✅ Token type union definitions
- ✅ Hook typing patterns
- ✅ Event handler typing
- ✅ Component props interface structure

**Does NOT Govern:**
- ❌ Public API typing (see `TYPING_STANDARD.md`)
- ❌ Variant and size prop definitions (see `TYPING_STANDARD.md`)
- ❌ CVA usage boundaries in public APIs (see `TYPING_STANDARD.md`)

**Key Rules:**
- All components must have typed Props interfaces
- All Props must extend appropriate native HTML types
- Tokens must export type unions via `keyof typeof`
- Event handlers must be explicitly typed
- Strict mode requirements

**When to Use:**
- Internal implementation typing
- Hook return type definitions
- Token type union creation
- General TypeScript best practices
- When `TYPING_STANDARD.md` does not apply

---

## 🔄 Conflict Resolution

**Rule:** `TYPING_STANDARD.md` **ALWAYS** takes precedence over `TYPESCRIPT_GENERAL_RULES.md`.

**Examples:**

| Scenario | TYPESCRIPT_GENERAL_RULES.md Suggests | TYPING_STANDARD.md Requires | Resolution |
|----------|--------------------------------------|----------------------------|------------|
| Public variant prop | `VariantProps<typeof variants>` | Explicit union type | ✅ Follow `TYPING_STANDARD.md` |
| Internal CVA usage | `VariantProps` is acceptable | N/A (internal only) | ✅ Follow `TYPESCRIPT_GENERAL_RULES.md` |
| Public size prop | General TypeScript patterns | Explicit union type | ✅ Follow `TYPING_STANDARD.md` |
| Hook return type | Interface definition | N/A (not public API) | ✅ Follow `TYPESCRIPT_GENERAL_RULES.md` |

**Enforcement:**
- AI assistants **MUST** follow `TYPING_STANDARD.md` for public APIs
- Manual reviews **MUST** verify compliance with `TYPING_STANDARD.md`
- Violations are considered **architectural violations**

---

## 🗺️ Where to Look: Navigation Guide

Use this guide to quickly find the right document for your typing question:

### Public API Typing

| Question | Document | Section |
|----------|----------|---------|
| How should I type variant props? | `TYPING_STANDARD.md` | Rule 1: Explicit Variant Union Types |
| Can I use `VariantProps` in public APIs? | `TYPING_STANDARD.md` | Rule 2: CVA Is NOT a Public Type Source |
| How should I constrain CVA variant maps? | `TYPING_STANDARD.md` | Rule 3: CVA Variant Maps MUST Be Type-Constrained |
| What's the pattern for public component props? | `TYPING_STANDARD.md` | Rule 4: Public Component Props MUST Use Canonical Types |
| Should I use inline unions or explicit types? | `TYPING_STANDARD.md` | Rule 1: Explicit Variant Union Types |

### General TypeScript

| Question | Document | Section |
|----------|----------|---------|
| How should I type component props interfaces? | `TYPESCRIPT_GENERAL_RULES.md` | Part 1: Component Typing |
| Should I extend native HTML types? | `TYPESCRIPT_GENERAL_RULES.md` | Native Type Extension |
| How should I type event handlers? | `TYPESCRIPT_GENERAL_RULES.md` | Event Handler Typing |
| What are the strict mode requirements? | `TYPESCRIPT_GENERAL_RULES.md` | Part 7: Type Checking Rules |
| How should I type hooks? | `TYPESCRIPT_GENERAL_RULES.md` | Part 4: Hook Typing |
| How should I export token type unions? | `TYPESCRIPT_GENERAL_RULES.md` | Part 2: Token Typing |

### Conflict Resolution

| Question | Document | Section |
|----------|----------|---------|
| What if documents conflict? | This document | Conflict Resolution |
| Which document takes precedence? | This document | Document Hierarchy |
| Can I use VariantProps internally? | `TYPESCRIPT_GENERAL_RULES.md` | CVA Variant Props (Internal Only) |

### Quick Decision Tree

```
Is this a PUBLIC component API typing question?
├─ YES → Use TYPING_STANDARD.md
│   ├─ Variant/size props? → Rule 1: Explicit Union Types
│   ├─ CVA usage? → Rule 2: CVA Is NOT a Public Type Source
│   └─ Public props structure? → Rule 4: Public Component Props
│
└─ NO → Use TYPESCRIPT_GENERAL_RULES.md
    ├─ Component props interface? → Part 1: Component Typing
    ├─ Hook typing? → Part 4: Hook Typing
    ├─ Token types? → Part 2: Token Typing
    └─ General practices? → Browse document sections
```

---

## 📖 Document Responsibilities

### `TYPING_STANDARD.md` Responsibilities

**MUST Define:**
- ✅ Public API typing rules (variants, sizes, CVA boundaries)
- ✅ Explicit union type requirements
- ✅ CVA usage constraints in public APIs
- ✅ Type constraint patterns for CVA variant maps

**MUST NOT Define:**
- ❌ Internal implementation typing patterns
- ❌ General TypeScript coding practices
- ❌ Hook typing patterns
- ❌ Utility function typing

**Problem It Solves:**
- Ensures public APIs are explicitly typed (not inferred from implementation)
- Prevents CVA-derived types from leaking into public APIs
- Ensures architectural stability and IDE autocomplete

---

### `TYPESCRIPT_GENERAL_RULES.md` Responsibilities

**MUST Define:**
- ✅ General TypeScript implementation rules
- ✅ Internal coding practices
- ✅ Type safety guidelines
- ✅ Hook typing patterns
- ✅ Token type union definitions
- ✅ Event handler typing

**MUST NOT Define:**
- ❌ Public API typing rules (delegated to `TYPING_STANDARD.md`)
- ❌ Variant and size prop definitions (delegated to `TYPING_STANDARD.md`)
- ❌ CVA usage boundaries in public APIs (delegated to `TYPING_STANDARD.md`)

**Problem It Solves:**
- Provides general TypeScript best practices
- Ensures type safety across the codebase
- Standardizes internal implementation patterns

---

## 🔗 Related Documents

### Typing Documents

- **`docs/structure/TYPING_STANDARD.md`** - PRIMARY AUTHORITY for public API typing
- **`docs/structure/TYPESCRIPT_GENERAL_RULES.md`** - SECONDARY GUIDANCE for general TypeScript rules

### Architecture Documents

- **`docs/INTERNAL_CANONICAL_CONTEXT.md`** - References this index as the canonical entry point for typing rules
- **`docs/architecture/UI_ARCHITECTURE_RULES.md`** - References `TYPING_STANDARD.md` for CVA-derived typing rules
- **`docs/architecture/CURSOR_UI_RULES.md`** - References `TYPING_STANDARD.md` as MANDATORY for AI assistants

### Token System

- **`src/tokens/types/index.ts`** - Token union type definitions
- **`docs/architecture/TUI_TOKEN_SYSTEM.md`** - Token system documentation

---

## ✅ Verification Checklist

Before marking typing work as complete, verify:

- [ ] Public API typing follows `TYPING_STANDARD.md` (explicit unions, NOT VariantProps)
- [ ] Internal implementation typing follows `TYPESCRIPT_GENERAL_RULES.md`
- [ ] No conflicts between documents (if conflict, `TYPING_STANDARD.md` wins)
- [ ] All variant/size props use explicit union types
- [ ] CVA variant maps are type-constrained with `satisfies Record<...>`
- [ ] Component props extend appropriate native HTML types
- [ ] Event handlers are explicitly typed
- [ ] TypeScript compilation passes with no errors

---

## 🎯 Summary

**The typing system has a clear hierarchy:**

1. **`TYPING_STANDARD.md`** - PRIMARY AUTHORITY for public API typing (MANDATORY, ENFORCED)
2. **`TYPESCRIPT_GENERAL_RULES.md`** - SECONDARY GUIDANCE for general TypeScript rules

**Key Principle:** Public API typing is an architectural concern governed by `TYPING_STANDARD.md`. Internal implementation typing follows general TypeScript best practices in `TYPESCRIPT_GENERAL_RULES.md`.

**When in doubt:** If it's a public API typing question, use `TYPING_STANDARD.md`. Otherwise, use `TYPESCRIPT_GENERAL_RULES.md`.

---

**Status:** ✅ CANONICAL  
**Version:** 1.0  
**Last Updated:** 2025-12-17  
**Next Review:** When typing system architecture changes

