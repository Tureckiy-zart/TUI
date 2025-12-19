# Canonical Document Naming Standard

**Date:** 2025-12-19  
**Status:** ✅ Complete  
**Purpose:** Define canonical document names for each semantic group based on meaning, not history

---

## Executive Summary

This document defines canonical naming standards for all 44 documentation files organized into 12 semantic groups. Names reflect **semantic meaning** rather than historical context or internal abbreviations.

**Key Principles:**
- One semantic meaning → one canonical name pattern
- Names should be understandable without project history knowledge
- Avoid internal abbreviations (TUI, internal, etc.) unless they carry semantic meaning
- Names reflect what the document **is**, not where it came from

---

## Canonical Documents by Group

### Group 1: Core Architecture Lock & Immutability

**Semantic Meaning:** Documents that establish the fundamental locked and immutable state of the architecture.

**Canonical Document:** `ARCHITECTURE_CONTEXT.md`  
**Reason:** Marked as IMMUTABLE and "single source of truth for architecture, design decisions, Foundation vs Extension rules"

**Naming Standard:** `ARCHITECTURE_{PURPOSE}.md`
- Primary context document: `ARCHITECTURE_CONTEXT.md`
- Foundation lock: `FOUNDATION_LOCK.md`
- Architecture lock: `ARCHITECTURE_LOCK.md`
- Canonical state: `ARCHITECTURE_STATE.md`

**Files:**
1. `ARCHITECTURE_CONTEXT.md` → `ARCHITECTURE_CONTEXT.md`
2. `FOUNDATION_LOCK.md` → `FOUNDATION_LOCK.md`
3. `ARCHITECTURE_LOCK.md` → `ARCHITECTURE_LOCK.md`
4. `ARCHITECTURE_LOCK.md` → `ARCHITECTURE_STATE.md`

---

### Group 2: Authority Contracts (Domain-Specific Immutable Rules)

**Semantic Meaning:** Documents that define immutable, domain-specific architectural rules.

**Canonical Pattern:** All documents are equally authoritative (each governs a specific domain)

**Naming Standard:** `{DOMAIN}_AUTHORITY.md`
- Domain names should be clear and semantic (spacing, typography, motion, etc.)
- "AUTHORITY" suffix indicates immutable contract
- Remove "CONTRACT" suffix (redundant with AUTHORITY)

**Files:**
1. `INTERACTION_AUTHORITY.md` → `INTERACTION_AUTHORITY.md`
2. `STATE_MATRIX.md` → `STATE_MATRIX.md` (matrix is part of state authority system)
3. `STATE_AUTHORITY.md` → `STATE_AUTHORITY.md`
4. `SPACING_AUTHORITY.md` → `SPACING_AUTHORITY.md`
5. `RADIUS_AUTHORITY.md` → `RADIUS_AUTHORITY.md`
6. `TYPOGRAPHY_AUTHORITY.md` → `TYPOGRAPHY_AUTHORITY.md`
7. `MOTION_AUTHORITY.md` → `MOTION_AUTHORITY.md`
8. `ELEVATION_AUTHORITY.md` → `ELEVATION_AUTHORITY.md`
9. `LAYOUT_AUTHORITY.md` → `LAYOUT_AUTHORITY.md`
10. `TOKEN_AUTHORITY.md` → `TOKEN_AUTHORITY.md` (token system is an authority)
11. `EXTENSION_AUTHORITY.md` → `EXTENSION_AUTHORITY.md`

---

### Group 3: Authority Navigation & Mental Models

**Semantic Meaning:** Documents that help navigate and understand the Authority system.

**Canonical Document:** `AUTHORITY_NAVIGATION.md` (only document in group)

**Naming Standard:** `AUTHORITY_NAVIGATION.md`
- "MAP" is implementation detail; "NAVIGATION" reflects semantic purpose

**Files:**
1. `AUTHORITY_NAVIGATION.md` → `AUTHORITY_NAVIGATION.md`

---

### Group 4: Architecture Rules & Extension Guidelines

**Semantic Meaning:** Documents that define how to work within the architecture.

**Canonical Document:** `ARCHITECTURE_RULES.md` (primary rules document)

**Naming Standard:** `{DOMAIN}_RULES.md` or `{DOMAIN}_GUIDELINES.md`
- "UI_" prefix is redundant (all architecture docs are UI-related)
- "CANONICAL_STATE" → "EXTENSION_STATE" (clearer purpose)

**Files:**
1. `ARCHITECTURE_RULES.md` → `ARCHITECTURE_RULES.md`
2. `EXTENSION_STATE.md` → `EXTENSION_STATE.md`
3. `CANONICAL_STATE_FINAL.md` → (ARCHIVED - no rename needed)

---

### Group 5: AI/Cursor Behavior Rules

**Semantic Meaning:** Documents that define mandatory behavior rules for AI assistants.

**Canonical Document:** `ASSISTANT_RULES.md` (more comprehensive, guard-focused)

**Naming Standard:** `ASSISTANT_RULES.md` or `AI_BEHAVIOR_RULES.md`
- Remove "TUI_" prefix (internal abbreviation)
- "CURSOR" is tool-specific; "ASSISTANT" is semantic
- "GUARD" vs "RULES" - consolidate to "RULES"

**Files:**
1. `ASSISTANT_RULES.md` → `ASSISTANT_RULES.md`
2. `ASSISTANT_DEVELOPMENT_RULES.md` → (merge into ASSISTANT_RULES.md or keep as `ASSISTANT_DEVELOPMENT_RULES.md`)

---

### Group 6: Component-Specific Locks

**Semantic Meaning:** Documents that lock specific component categories.

**Canonical Pattern:** All documents follow same pattern (each locks a category)

**Naming Standard:** `{CATEGORY}_LOCK.md`
- Category names should be clear (LAYOUT, TEXT, etc.)
- Already follows standard pattern

**Files:**
1. `LAYOUT_LOCK.md` → `LAYOUT_LOCK.md` (no change)
2. `TEXT_LOCK.md` → `TEXT_LOCK.md` (no change)

---

### Group 7: Progress & Task Management

**Semantic Meaning:** Documents that track project progress and task status.

**Canonical Documents:** Both are equally important (different purposes)
- `PROJECT_PROGRESS.md` - progress tracking
- `master_task_index.md` - task navigation

**Naming Standard:** `PROJECT_PROGRESS.md` and `TASK_INDEX.md`
- "master_" prefix is historical; "TASK_INDEX" is semantic

**Files:**
1. `PROJECT_PROGRESS.md` → `PROJECT_PROGRESS.md` (no change)
2. `master_task_index.md` → `TASK_INDEX.md`

---

### Group 8: Library Maturity & Growth System

**Semantic Meaning:** Documents that define processes for controlled library growth.

**Canonical Pattern:** All documents are process/workflow definitions

**Naming Standard:** `{PROCESS}_PROCESS.md` or `{TOPIC}_WORKFLOW.md`
- Use "PROCESS" for step-by-step workflows
- Use "WORKFLOW" for broader process definitions
- Remove "EXTENSION_" prefix where redundant

**Files:**
1. `COMPONENT_NEEDS_INVENTORY.md` → `COMPONENT_NEEDS_INVENTORY.md` (no change - inventory is clear)
2. `EXTENSION_COMPONENT_CREATION_CHECKLIST.md` → `COMPONENT_CREATION_CHECKLIST.md`
3. `USAGE_FEEDBACK_PROCESS.md` → `FEEDBACK_COLLECTION_PROCESS.md`
4. `FEEDBACK_REVIEW_PROCESS.md` → `FEEDBACK_REVIEW_PROCESS.md` (no change)
5. `COMPONENT_USAGE_TRACKING.md` → `COMPONENT_USAGE_TRACKING.md` (no change)

---

### Group 9: Reference Documentation

**Semantic Meaning:** Documents that provide API references, integration guides, and usage examples.

**Canonical Pattern:** All documents are reference material

**Naming Standard:** `{TOPIC}_REFERENCE.md` or `{TOPIC}_GUIDE.md`
- Use "REFERENCE" for API/technical references
- Use "GUIDE" for integration/how-to documentation
- Remove "UI_" prefix where redundant

**Files:**
1. `public-api.md` → `API_REFERENCE.md`
2. `design_tokens_export.md` → `TOKENS_EXPORT_REFERENCE.md`
3. `token-map-overview.md` → `TOKENS_OVERVIEW.md`
4. `UI_COMPONENTS_INVENTORY.md` → `COMPONENTS_INVENTORY.md`
5. `UI_INTEGRATION.md` → `INTEGRATION_GUIDE.md`
6. `EXTENSION_COMPONENT_EXAMPLES.md` → `COMPONENT_EXAMPLES.md`

---

### Group 10: Tooling & Standards

**Semantic Meaning:** Documents that define tooling decisions, linting standards, and typing standards.

**Canonical Pattern:** Each document defines a specific standard

**Naming Standard:** `{TOOL}_STANDARD.md` or `{TOOL}_RULES.md`
- Use "STANDARD" for mandatory conventions
- Use "RULES" for enforcement rules
- Remove "LINTING_" prefix (redundant with context)

**Files:**
1. `LINTING_STANDARD.md` → `LINTING_STANDARD.md`
2. `TOOLING_DECISIONS.md` → `TOOLING_DECISIONS.md` (no change - decisions is appropriate)
3. `TYPING_STANDARD.md` → `TYPING_STANDARD.md` (no change)

---

### Group 11: Entry Points & Orientation

**Semantic Meaning:** Documents that serve as entry points for understanding the project.

**Canonical Documents:** 
- `README.md` - main entry point (standard)
- `README_GPT.md` - AI assistant entry point
- `PROJECT_ORIENTATION.md` - project orientation

**Naming Standard:** `README.md`, `{AUDIENCE}_README.md`, `PROJECT_ORIENTATION.md`
- Keep standard README.md
- Use audience-specific READMEs
- "CANONICAL_" prefix is redundant

**Files:**
1. `README.md` → `README.md` (no change)
2. `README_GPT.md` → `ASSISTANT_README.md`
3. `PROJECT_ORIENTATION.md` → `PROJECT_ORIENTATION.md`

---

### Group 12: Exceptions & Special Cases

**Semantic Meaning:** Documents that document exceptions, special cases, or domain-specific deviations.

**Canonical Pattern:** Each document documents a specific exception/case

**Naming Standard:** `{TOPIC}_EXCEPTIONS.md` or `{TOPIC}_OVERVIEW.md`
- Use "EXCEPTIONS" for documented exceptions
- Use "OVERVIEW" for general overviews

**Files:**
1. `gradient_exceptions.md` → `GRADIENT_EXCEPTIONS.md`
2. `CI_CD_OVERVIEW.md` → `CI_CD_OVERVIEW.md` (standardize hyphenation)

---

## Complete Renaming Table

| Old Name | Canonical Name | Group | Rationale |
|----------|---------------|-------|-----------|
| `ARCHITECTURE_CONTEXT.md` | `ARCHITECTURE_CONTEXT.md` | 1 | Remove "INTERNAL" (internal detail), "CANONICAL" redundant with context |
| `FOUNDATION_LOCK.md` | `FOUNDATION_LOCK.md` | 1 | "FINAL" is historical, not semantic |
| `ARCHITECTURE_LOCK.md` | `ARCHITECTURE_LOCK.md` | 1 | "UI_" prefix redundant (all architecture is UI) |
| `ARCHITECTURE_LOCK.md` | `ARCHITECTURE_STATE.md` | 1 | Reflects semantic purpose (state definition) |
| `INTERACTION_AUTHORITY.md` | `INTERACTION_AUTHORITY.md` | 2 | "CONTRACT" redundant with "AUTHORITY" |
| `STATE_MATRIX.md` | `STATE_MATRIX.md` | 2 | Part of state authority system, matrix is clear |
| `STATE_AUTHORITY.md` | `STATE_AUTHORITY.md` | 2 | "CONTRACT" redundant with "AUTHORITY" |
| `SPACING_AUTHORITY.md` | `SPACING_AUTHORITY.md` | 2 | "CONTRACT" redundant with "AUTHORITY" |
| `RADIUS_AUTHORITY.md` | `RADIUS_AUTHORITY.md` | 2 | "CONTRACT" redundant with "AUTHORITY" |
| `TYPOGRAPHY_AUTHORITY.md` | `TYPOGRAPHY_AUTHORITY.md` | 2 | "CONTRACT" redundant with "AUTHORITY" |
| `MOTION_AUTHORITY.md` | `MOTION_AUTHORITY.md` | 2 | "CONTRACT" redundant with "AUTHORITY" |
| `ELEVATION_AUTHORITY.md` | `ELEVATION_AUTHORITY.md` | 2 | "CONTRACT" redundant with "AUTHORITY" |
| `LAYOUT_AUTHORITY.md` | `LAYOUT_AUTHORITY.md` | 2 | "CONTRACT" redundant with "AUTHORITY" |
| `TOKEN_AUTHORITY.md` | `TOKEN_AUTHORITY.md` | 2 | Token system is an authority, consistent naming |
| `EXTENSION_AUTHORITY.md` | `EXTENSION_AUTHORITY.md` | 2 | "CONTRACT" redundant with "AUTHORITY" |
| `AUTHORITY_NAVIGATION.md` | `AUTHORITY_NAVIGATION.md` | 3 | "MAP" is implementation, "NAVIGATION" is semantic |
| `ARCHITECTURE_RULES.md` | `ARCHITECTURE_RULES.md` | 4 | "UI_" prefix redundant |
| `EXTENSION_STATE.md` | `EXTENSION_STATE.md` | 4 | "CANONICAL" redundant |
| `ASSISTANT_RULES.md` | `ASSISTANT_RULES.md` | 5 | Remove "TUI_" (internal), "CURSOR" → "ASSISTANT" (semantic), "GUARD" → "RULES" |
| `ASSISTANT_DEVELOPMENT_RULES.md` | `ASSISTANT_DEVELOPMENT_RULES.md` | 5 | "CURSOR" → "ASSISTANT", "UI" → "DEVELOPMENT" (clearer scope) |
| `master_task_index.md` | `TASK_INDEX.md` | 7 | "master_" is historical, not semantic |
| `EXTENSION_COMPONENT_CREATION_CHECKLIST.md` | `COMPONENT_CREATION_CHECKLIST.md` | 8 | "EXTENSION_" prefix redundant (context makes it clear) |
| `USAGE_FEEDBACK_PROCESS.md` | `FEEDBACK_COLLECTION_PROCESS.md` | 8 | "USAGE_" redundant, "COLLECTION" clearer than implicit |
| `public-api.md` | `API_REFERENCE.md` | 9 | Standardize case, add "REFERENCE" suffix |
| `design_tokens_export.md` | `TOKENS_EXPORT_REFERENCE.md` | 9 | Standardize case, clarify purpose |
| `token-map-overview.md` | `TOKENS_OVERVIEW.md` | 9 | Standardize case, remove "map" (implementation detail) |
| `UI_COMPONENTS_INVENTORY.md` | `COMPONENTS_INVENTORY.md` | 9 | "UI_" prefix redundant |
| `UI_INTEGRATION.md` | `INTEGRATION_GUIDE.md` | 9 | "UI_" redundant, "GUIDE" clearer than implicit |
| `EXTENSION_COMPONENT_EXAMPLES.md` | `COMPONENT_EXAMPLES.md` | 9 | "EXTENSION_" prefix redundant |
| `LINTING_STANDARD.md` | `LINTING_STANDARD.md` | 10 | "STANDARD" more appropriate than "RULES" |
| `PROJECT_ORIENTATION.md` | `PROJECT_ORIENTATION.md` | 11 | "CANONICAL" redundant |
| `README_GPT.md` | `ASSISTANT_README.md` | 11 | "GPT" is tool-specific, "ASSISTANT" is semantic |
| `gradient_exceptions.md` | `GRADIENT_EXCEPTIONS.md` | 12 | Standardize case |
| `CI_CD_OVERVIEW.md` | `CI_CD_OVERVIEW.md` | 12 | Standardize hyphenation (underscore) |

---

## Naming Standards Summary

| Group | Standard Pattern | Example |
|-------|-----------------|---------|
| Core Architecture Lock | `ARCHITECTURE_{PURPOSE}.md` | `ARCHITECTURE_CONTEXT.md` |
| Authority Contracts | `{DOMAIN}_AUTHORITY.md` | `SPACING_AUTHORITY.md` |
| Authority Navigation | `AUTHORITY_NAVIGATION.md` | `AUTHORITY_NAVIGATION.md` |
| Architecture Rules | `{DOMAIN}_RULES.md` | `ARCHITECTURE_RULES.md` |
| AI Behavior Rules | `ASSISTANT_{PURPOSE}_RULES.md` | `ASSISTANT_RULES.md` |
| Component Locks | `{CATEGORY}_LOCK.md` | `LAYOUT_LOCK.md` |
| Progress & Tasks | `PROJECT_PROGRESS.md`, `TASK_INDEX.md` | `PROJECT_PROGRESS.md` |
| Growth Processes | `{PROCESS}_PROCESS.md` | `FEEDBACK_COLLECTION_PROCESS.md` |
| Reference Docs | `{TOPIC}_REFERENCE.md` or `{TOPIC}_GUIDE.md` | `API_REFERENCE.md` |
| Tooling Standards | `{TOOL}_STANDARD.md` | `LINTING_STANDARD.md` |
| Entry Points | `README.md`, `{AUDIENCE}_README.md` | `ASSISTANT_README.md` |
| Exceptions | `{TOPIC}_EXCEPTIONS.md` | `GRADIENT_EXCEPTIONS.md` |

---

## Implementation Notes

### Files That Don't Need Renaming

The following files already follow canonical naming standards:
- `LAYOUT_LOCK.md`
- `TEXT_LOCK.md`
- `PROJECT_PROGRESS.md`
- `COMPONENT_NEEDS_INVENTORY.md`
- `FEEDBACK_REVIEW_PROCESS.md`
- `COMPONENT_USAGE_TRACKING.md`
- `TOOLING_DECISIONS.md`
- `TYPING_STANDARD.md`
- `README.md`

### Files That Need Special Consideration

1. **`ASSISTANT_DEVELOPMENT_RULES.md`** - Consider merging with `ASSISTANT_RULES.md` or keeping as `ASSISTANT_DEVELOPMENT_RULES.md` if it has distinct content
2. **`CANONICAL_STATE_FINAL.md`** - Already archived, no rename needed
3. **Authority documents** - All follow consistent pattern after removing "CONTRACT" suffix

### Consistency Principles Applied

1. **Remove internal abbreviations:** TUI, UI_ (where redundant), INTERNAL
2. **Remove historical markers:** FINAL, CANONICAL (where redundant), master_
3. **Standardize suffixes:** CONTRACT → AUTHORITY, RULES → STANDARD (where appropriate)
4. **Clarify purpose:** MAP → NAVIGATION, GUARD → RULES
5. **Standardize case:** lowercase → UPPERCASE for consistency
6. **Remove redundant prefixes:** EXTENSION_, UI_ (where context makes it clear)

---

## Verification

✅ All 44 documents have proposed canonical names  
✅ Names reflect semantic meaning, not history  
✅ Internal abbreviations removed where not semantically meaningful  
✅ Consistent naming patterns within each group  
✅ One semantic meaning → one canonical name pattern

---

**Report Generated:** 2025-12-19  
**Source:** `docs/DOCS_SEMANTIC_GROUPING_REPORT.md`

