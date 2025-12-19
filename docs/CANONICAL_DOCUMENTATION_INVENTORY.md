# Canonical Documentation Inventory

**Date:** 2025-12-19  
**Status:** ✅ Complete  
**Total Canonical Documents:** 44  
**Post-Archive State:** This inventory reflects the documentation state after archive restructure (DOCS_ARCHIVE_RESTRUCTURE_001) and Library Maturity Growth System implementation

---

## 1. Overview

### Purpose

This document provides a complete and authoritative inventory of all canonical documentation files currently present in the `docs/` directory. This inventory serves as:

- **Single source of truth** for what documentation is considered canonical
- **Reference guide** for AI/Cursor assistants to understand the documentation surface
- **Verification checklist** to ensure no canonical documents are missing
- **Navigation aid** for developers and maintainers

### Total Count

**44 canonical documents** are currently present in `docs/`.

### Post-Archive State

This inventory reflects the state **after** the documentation archive restructure (DOCS_ARCHIVE_RESTRUCTURE_001), where:

- All non-canonical documentation (153+ files) has been moved to `docs_archive/`
- Only canonical, authoritative, and active documentation remains in `docs/`
- `docs_archive/` is excluded from git tracking and AI/Cursor context

---

## 2. Canonical Inventory (Grouped)

### Primary Canonical Entry Points

These documents serve as the primary entry points for understanding the project architecture and current state.

| Path | Description | Status |
|------|-------------|--------|
| `docs/INTERNAL_CANONICAL_CONTEXT.md` | Single source of truth for architecture, design decisions, Foundation vs Extension rules | **IMMUTABLE** |
| `docs/architecture/FINAL_FOUNDATION_LOCK.md` | Authoritative Foundation lock status - source of truth for locked Foundation layer | **LOCKED** |
| `docs/CANONICAL_PROJECT_ORIENTATION.md` | Canonical project orientation - documents PostCSS/Tailwind fix | **ACTIVE** |

**Total:** 3 files

---

### Authority Contracts

Foundation Authority Contracts define immutable rules for the design system. All Foundation Authorities are **LOCKED** and **IMMUTABLE**.

| Path | Description | Status |
|------|-------------|--------|
| `docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md` | Interaction state activation rules, priority order, blocking rules | **LOCKED** |
| `docs/architecture/STATE_AUTHORITY_MATRIX.md` | Canonical state set definition (base, hover, active, focus-visible, disabled, loading) | **LOCKED** |
| `docs/architecture/STATE_AUTHORITY_CONTRACT.md` | State token model, naming rules, property mapping | **LOCKED** |
| `docs/architecture/SPACING_AUTHORITY_CONTRACT.md` | Canonical spacing scale, component rules, forbidden patterns | **LOCKED** |
| `docs/architecture/RADIUS_AUTHORITY_CONTRACT.md` | Canonical radius scale, component standards, forbidden patterns | **LOCKED** |
| `docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md` | Canonical typography scale, semantic roles, forbidden patterns | **LOCKED** |
| `docs/architecture/MOTION_AUTHORITY_CONTRACT.md` | Canonical motion tokens, durations, easings, forbidden patterns | **LOCKED** |
| `docs/architecture/ELEVATION_AUTHORITY_CONTRACT.md` | Canonical elevation tokens, z-index scale, forbidden patterns | **LOCKED** |
| `docs/architecture/LAYOUT_AUTHORITY_CONTRACT.md` | Canonical layout primitives, separation laws, forbidden patterns | **LOCKED** |
| `docs/architecture/TOKEN_SYSTEM.md` | Token system definition, ownership rules, semantic classifications | **LOCKED** |
| `docs/architecture/EXTENSION_AUTHORITY_CONTRACT.md` | Extension layer boundary contract | **ACTIVE** |

**Total:** 11 files (10 Foundation + 1 Extension)

---

### Authority Navigation

| Path | Description | Status |
|------|-------------|--------|
| `docs/architecture/AUTHORITY_MAP.md` | Navigation map for Authority system - mental model | **ACTIVE** |

**Total:** 1 file

---

### Architecture Rules & Locks

These documents define architecture rules, locks, and development guidelines.

| Path | Description | Status |
|------|-------------|--------|
| `docs/architecture/CANONICAL_LOCK.md` | Canonical architecture lock - authoritative source for canonical state and forbidden regressions | **LOCKED** |
| `docs/architecture/UI_ARCHITECTURE_LOCK.md` | **PRIMARY CANONICAL SOURCE** - UI architecture lock with all canonical rules and implementations (supersedes CANONICAL_STATE_FINAL.md) | **LOCKED** |
| `docs/architecture/CANONICAL_STATE_FINAL.md` | ⚠️ **ARCHIVED/SUPERSEDED** - Final truth snapshot (superseded by UI_ARCHITECTURE_LOCK.md) | **ARCHIVED** |
| `docs/architecture/EXTENSION_CANONICAL_STATE.md` | Extension layer canonical state - Extension layer reference | **ACTIVE** |
| `docs/architecture/UI_ARCHITECTURE_RULES.md` | UI architecture rules - Architecture rules reference | **ACTIVE** |
| `docs/architecture/TUI_CURSOR_GUARD_RULES.md` | Cursor guard rules - Guard rules reference | **ACTIVE** |
| `docs/architecture/CURSOR_UI_RULES.md` | Cursor AI rules for UI development - Cursor-specific rules | **ACTIVE** |
| `docs/architecture/LINTING_RULES.md` | Linting standards and rules - Linting reference | **ACTIVE** |
| `docs/architecture/TOOLING_DECISIONS.md` | Tooling decisions and rationale - Tooling reference | **ACTIVE** |

**Total:** 9 files

---

### Component Locks

These documents define lock status for specific component categories.

| Path | Description | Status |
|------|-------------|--------|
| `docs/locks/LAYOUT_LOCK.md` | Layout primitives lock - Component lock document | **LOCKED** |
| `docs/locks/TEXT_LOCK.md` | Text/typography components lock - Component lock document | **LOCKED** |

**Total:** 2 files

---

### Progress & Project Management

These documents track project progress and task management.

| Path | Description | Status |
|------|-------------|--------|
| `docs/PROJECT_PROGRESS.md` | Project progress tracking - canonical progress file - Single source of truth for progress | **ACTIVE** |
| `docs/tasks/master_task_index.md` | Master task index and navigation - Task management reference | **ACTIVE** |

**Total:** 2 files

---

### Library Maturity Growth System

These documents support controlled library growth and component development processes.

| Path | Description | Status |
|------|-------------|--------|
| `docs/tasks/COMPONENT_NEEDS_INVENTORY.md` | Component needs tracking and prioritization - Tracks real component needs based on usage | **ACTIVE** |
| `docs/tasks/EXTENSION_COMPONENT_CREATION_CHECKLIST.md` | Extension component creation checklist - Mandatory checklist for creating Extension components | **ACTIVE** |
| `docs/tasks/USAGE_FEEDBACK_PROCESS.md` | Usage feedback collection process - Defines how to collect and process usage feedback | **ACTIVE** |
| `docs/tasks/FEEDBACK_REVIEW_PROCESS.md` | Feedback review and decision process - Process for reviewing feedback and making decisions | **ACTIVE** |
| `docs/tasks/COMPONENT_USAGE_TRACKING.md` | Component usage tracking - Tracks component usage patterns and adoption rates | **ACTIVE** |

**Total:** 5 files

---

### Reference Documentation

These documents provide API and integration references.

| Path | Description | Status |
|------|-------------|--------|
| `docs/reference/public-api.md` | Public API reference - API reference | **ACTIVE** |
| `docs/reference/design_tokens_export.md` | Design tokens export reference - API reference | **ACTIVE** |
| `docs/reference/token-map-overview.md` | Token map overview - API reference | **ACTIVE** |
| `docs/reference/UI_COMPONENTS_INVENTORY.md` | UI components inventory - Reference documentation | **ACTIVE** |
| `docs/reference/UI_INTEGRATION.md` | UI integration guide - Integration reference | **ACTIVE** |
| `docs/reference/EXTENSION_COMPONENT_EXAMPLES.md` | Extension component examples and patterns - Reference examples for Extension components | **ACTIVE** |

**Total:** 6 files

---

### Structure & Standards

| Path | Description | Status |
|------|-------------|--------|
| `docs/structure/TYPING_STANDARD.md` | Typing standards - Typing reference | **ACTIVE** |

**Total:** 1 file

---

### UI Exceptions

| Path | Description | Status |
|------|-------------|--------|
| `docs/ui/gradient_exceptions.md` | Gradient exceptions documentation - Documented exceptions | **ACTIVE** |

**Total:** 1 file

---

### CI/CD

| Path | Description | Status |
|------|-------------|--------|
| `docs/CI-CD_OVERVIEW.md` | CI/CD overview - CI/CD reference | **ACTIVE** |

**Total:** 1 file

---

### Documentation Entry Points

| Path | Description | Status |
|------|-------------|--------|
| `docs/README.md` | Main README - documentation hub - Documentation index | **ACTIVE** |
| `docs/README_GPT.md` | GPT-specific README - GPT context reference | **ACTIVE** |

**Total:** 2 files

---

## 3. Summary Table

| File Path | Category | Status | Notes |
|-----------|----------|--------|-------|
| `docs/INTERNAL_CANONICAL_CONTEXT.md` | Primary Entry Point | Canonical (IMMUTABLE) | Single source of truth |
| `docs/architecture/FINAL_FOUNDATION_LOCK.md` | Primary Entry Point | Authority (LOCKED) | Foundation lock status |
| `docs/CANONICAL_PROJECT_ORIENTATION.md` | Primary Entry Point | Canonical (ACTIVE) | Project orientation |
| `docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/STATE_AUTHORITY_MATRIX.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/STATE_AUTHORITY_CONTRACT.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/SPACING_AUTHORITY_CONTRACT.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/RADIUS_AUTHORITY_CONTRACT.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/MOTION_AUTHORITY_CONTRACT.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/ELEVATION_AUTHORITY_CONTRACT.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/LAYOUT_AUTHORITY_CONTRACT.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/TOKEN_SYSTEM.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/EXTENSION_AUTHORITY_CONTRACT.md` | Authority Contract | Authority (ACTIVE) | Extension boundary |
| `docs/architecture/AUTHORITY_MAP.md` | Authority Navigation | Reference (ACTIVE) | Authority navigation |
| `docs/architecture/CANONICAL_LOCK.md` | Architecture Rules | Lock (LOCKED) | Canonical architecture lock |
| `docs/architecture/UI_ARCHITECTURE_LOCK.md` | Architecture Rules | Lock (LOCKED) | **PRIMARY CANONICAL SOURCE** - Architecture lock (supersedes CANONICAL_STATE_FINAL.md) |
| `docs/architecture/CANONICAL_STATE_FINAL.md` | Architecture Rules | Reference (ARCHIVED) | ⚠️ **ARCHIVED/SUPERSEDED** - Final truth snapshot (superseded by UI_ARCHITECTURE_LOCK.md) |
| `docs/architecture/EXTENSION_CANONICAL_STATE.md` | Architecture Rules | Reference (ACTIVE) | Extension state |
| `docs/architecture/UI_ARCHITECTURE_RULES.md` | Architecture Rules | Reference (ACTIVE) | Architecture rules |
| `docs/architecture/TUI_CURSOR_GUARD_RULES.md` | Architecture Rules | Reference (ACTIVE) | Guard rules |
| `docs/architecture/CURSOR_UI_RULES.md` | Architecture Rules | Reference (ACTIVE) | Cursor rules |
| `docs/architecture/LINTING_RULES.md` | Architecture Rules | Reference (ACTIVE) | Linting rules |
| `docs/architecture/TOOLING_DECISIONS.md` | Architecture Rules | Reference (ACTIVE) | Tooling decisions |
| `docs/locks/LAYOUT_LOCK.md` | Component Lock | Lock (LOCKED) | Layout lock |
| `docs/locks/TEXT_LOCK.md` | Component Lock | Lock (LOCKED) | Text lock |
| `docs/PROJECT_PROGRESS.md` | Progress & Management | Reference (ACTIVE) | Progress tracking |
| `docs/tasks/master_task_index.md` | Progress & Management | Reference (ACTIVE) | Task index |
| `docs/tasks/COMPONENT_NEEDS_INVENTORY.md` | Library Maturity | Reference (ACTIVE) | Component needs tracking |
| `docs/tasks/EXTENSION_COMPONENT_CREATION_CHECKLIST.md` | Library Maturity | Reference (ACTIVE) | Component creation checklist |
| `docs/tasks/USAGE_FEEDBACK_PROCESS.md` | Library Maturity | Reference (ACTIVE) | Feedback collection process |
| `docs/tasks/FEEDBACK_REVIEW_PROCESS.md` | Library Maturity | Reference (ACTIVE) | Feedback review process |
| `docs/tasks/COMPONENT_USAGE_TRACKING.md` | Library Maturity | Reference (ACTIVE) | Usage tracking |
| `docs/reference/public-api.md` | Reference | Reference (ACTIVE) | API reference |
| `docs/reference/design_tokens_export.md` | Reference | Reference (ACTIVE) | Tokens export |
| `docs/reference/token-map-overview.md` | Reference | Reference (ACTIVE) | Token map |
| `docs/reference/UI_COMPONENTS_INVENTORY.md` | Reference | Reference (ACTIVE) | Components inventory |
| `docs/reference/UI_INTEGRATION.md` | Reference | Reference (ACTIVE) | Integration guide |
| `docs/reference/EXTENSION_COMPONENT_EXAMPLES.md` | Reference | Reference (ACTIVE) | Component examples |
| `docs/structure/TYPING_STANDARD.md` | Structure & Standards | Reference (ACTIVE) | Typing standard |
| `docs/ui/gradient_exceptions.md` | UI Exceptions | Reference (ACTIVE) | Gradient exceptions |
| `docs/CI-CD_OVERVIEW.md` | CI/CD | Reference (ACTIVE) | CI/CD overview |
| `docs/README.md` | Entry Point | Reference (ACTIVE) | Documentation index |
| `docs/README_GPT.md` | Entry Point | Reference (ACTIVE) | GPT context |

**Total:** 44 files

---

## 4. Final Statement

> **This document reflects the full and complete set of canonical documentation files currently present in `docs/`.**  
> **Any documentation not listed here is non-canonical and resides outside the active documentation surface.**

### Verification

- ✅ All 44 files from `docs/` are listed
- ✅ File count matches actual `docs/` count (44 files)
- ✅ Categories are clear and non-overlapping
- ✅ No references to archived content
- ✅ All files are canonical, authoritative, or active documentation
- ✅ Library Maturity Growth System documents included

### Usage

- **For AI/Cursor:** Use this inventory to understand the complete documentation surface without scanning directories
- **For Developers:** Use this inventory to verify canonical documentation status
- **For Maintainers:** Use this inventory to ensure no canonical documents are missing or misplaced

---

**Last Updated:** 2025-12-19  
**Inventory Version:** 1.1  
**Related Tasks:** DOCS_ARCHIVE_RESTRUCTURE_001, TUNG_LIBRARY_MATURITY_PLAN_06
