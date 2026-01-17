# Canonical Documentation Inventory

**Date:** 2026-01-17
**Status:** ✅ Complete  
**Total Canonical Documents:** 50  
**Post-Archive State:** This inventory reflects the documentation state after archive restructure (DOCS_ARCHIVE_RESTRUCTURE_001) and Library Maturity Growth System implementation

---

## 1. Overview

### Purpose

This document provides a complete inventory of canonical documentation files. This inventory serves as:

- **Single source of truth** for what documentation is considered canonical
- **Reference guide** for assistants to understand the documentation surface
- **Verification checklist** to ensure no canonical documents are missing
- **Navigation aid** for developers and maintainers

**Canonical list authority:** This inventory defines the canonical list. Authoritative decisions live in LAW documents per `docs/architecture/DOCUMENTATION_CANON_LOCK.md`.

### Total Count

**50 canonical documents** are currently present in `docs/`.

### Post-Archive State

This inventory reflects the state **after** the documentation archive restructure (DOCS_ARCHIVE_RESTRUCTURE_001), where:

- Non-canonical documentation may be archived under `docs_archive/`
- Canonical and supporting documentation may exist in `docs/`; canonical files are listed here
- `docs_archive/` is excluded from git tracking and canonical information

---

## 2. Canonical Inventory (Grouped)

### Primary Canonical Entry Points

These documents serve as the primary entry points for understanding the project architecture and current state.

| Path | Description | Status |
|------|-------------|--------|
| `docs/ARCHITECTURE_CONTEXT.md` | Single source of truth for architecture, design decisions, Foundation vs Extension rules | **IMMUTABLE** |
| `docs/architecture/FOUNDATION_LOCK.md` | Authoritative Foundation lock status - source of truth for locked Foundation layer | **LOCKED** |
| `docs/PROJECT_ORIENTATION.md` | Canonical project orientation - documents PostCSS/Tailwind fix | **ACTIVE** |

**Total:** 3 files

---

### Authority Contracts

Foundation Authority Contracts define immutable rules for the design system. All Foundation Authorities are **LOCKED** and **IMMUTABLE**.

| Path | Description | Status |
|------|-------------|--------|
| `docs/architecture/INTERACTION_AUTHORITY.md` | Interaction state activation rules, priority order, blocking rules | **LOCKED** |
| `docs/architecture/STATE_MATRIX.md` | Canonical state set definition (base, hover, active, focus-visible, disabled, loading) | **LOCKED** |
| `docs/architecture/STATE_AUTHORITY.md` | State token model, naming rules, property mapping | **LOCKED** |
| `docs/architecture/SPACING_AUTHORITY.md` | Canonical spacing scale, component rules, forbidden patterns | **LOCKED** |
| `docs/architecture/RADIUS_AUTHORITY.md` | Canonical radius scale, component standards, forbidden patterns | **LOCKED** |
| `docs/architecture/TYPOGRAPHY_AUTHORITY.md` | Canonical typography scale, semantic roles, forbidden patterns | **LOCKED** |
| `docs/architecture/MOTION_AUTHORITY.md` | Canonical motion tokens, durations, easings, forbidden patterns | **LOCKED** |
| `docs/architecture/ELEVATION_AUTHORITY.md` | Canonical elevation tokens, z-index scale, forbidden patterns | **LOCKED** |
| `docs/architecture/LAYOUT_AUTHORITY.md` | Canonical layout primitives, separation laws, forbidden patterns | **LOCKED** |
| `docs/architecture/TOKEN_AUTHORITY.md` | Token system definition, ownership rules, semantic classifications | **LOCKED** |
| `docs/architecture/EXTENSION_AUTHORITY.md` | Extension layer boundary contract | **ACTIVE** |

**Total:** 11 files (10 Foundation + 1 Extension)

---

### Authority Navigation

| Path | Description | Status |
|------|-------------|--------|
| `docs/architecture/AUTHORITY_NAVIGATION.md` | Navigation map for Authority system - mental model | **ACTIVE** |

**Total:** 1 file

---

### Architecture Rules & Locks

These documents define architecture rules, locks, and development guidelines.

| Path | Description | Status |
|------|-------------|--------|
| `docs/architecture/ARCHITECTURE_LOCK.md` | Canonical architecture lock - authoritative source for canonical state and forbidden regressions | **LOCKED** |
| `docs/architecture/ARCHITECTURE_LOCK.md` | **PRIMARY CANONICAL SOURCE** - UI architecture lock with all canonical rules and implementations | **LOCKED** |
| `docs/architecture/CANONICAL_STATE_FINAL.md` | ⚠️ **ARCHIVED/SUPERSEDED** - Final truth snapshot (superseded by ARCHITECTURE_LOCK.md) | **ARCHIVED** |
| `docs/architecture/EXTENSION_STATE.md` | Extension layer canonical state - Extension layer reference | **ACTIVE** |
| `docs/architecture/ARCHITECTURE_RULES.md` | UI architecture rules - Architecture rules reference | **ACTIVE** |
| `docs/architecture/ASSISTANT_RULES.md` | Cursor guard rules - Guard rules reference | **ACTIVE** |
| `docs/architecture/ASSISTANT_DEVELOPMENT_RULES.md` | Cursor AI rules for UI development - Cursor-specific rules | **ACTIVE** |
| `docs/architecture/LINTING_STANDARD.md` | Linting standards and rules - Linting reference | **ACTIVE** |
| `docs/architecture/TOOLING_DECISIONS.md` | Tooling decisions and rationale - Tooling reference | **ACTIVE** |

**Total:** 9 files

---

### Component Locks

These documents define lock status for specific component categories.

| Path | Description | Status |
|------|-------------|--------|
| `docs/architecture/locks/LAYOUT_LOCK.md` | Layout primitives and Extension Layout components lock - Component lock document | **LOCKED** |
| `docs/architecture/locks/TEXT_LOCK.md` | Text/typography components lock - Component lock document | **LOCKED** |

**Total:** 2 files

---

### Progress & Project Management

These documents track project progress and task management.

| Path | Description | Status |
|------|-------------|--------|
| `docs/PROJECT_PROGRESS.md` | Project progress tracking - canonical progress file - Single source of truth for progress | **ACTIVE** |
| `docs/workflows/tasks/TASK_INDEX.md` | Master task index and navigation - Task management reference | **ACTIVE** |

**Total:** 2 files

---

### Library Maturity Growth System

These documents support controlled library growth and component development processes.

| Path | Description | Status |
|------|-------------|--------|
| `docs/workflows/tasks/COMPONENT_NEEDS_INVENTORY.md` | Component needs tracking and prioritization - Tracks real component needs based on usage | **ACTIVE** |
| `docs/workflows/tasks/COMPONENT_CREATION_CHECKLIST.md` | Extension component creation checklist - Mandatory checklist for creating Extension components | **ACTIVE** |
| `docs/workflows/tasks/FEEDBACK_COLLECTION_PROCESS.md` | Usage feedback collection process - Defines how to collect and process usage feedback | **ACTIVE** |
| `docs/workflows/tasks/FEEDBACK_REVIEW_PROCESS.md` | Feedback review and decision process - Process for reviewing feedback and making decisions | **ACTIVE** |
| `docs/workflows/tasks/COMPONENT_USAGE_TRACKING.md` | Component usage tracking - Tracks component usage patterns and adoption rates | **ACTIVE** |

**Total:** 5 files

---

### TUNG Task System

These documents define the TUNG (Task Unified Next-Gen) automation and task management system.

| Path | Description | Status |
|------|-------------|--------|
| `docs/workflows/foundation/tung_system_specification.md` | TUNG system specification and rules | **ACTIVE** |
| `docs/workflows/foundation/templates/FOUNDATION_STEP_TUNG_TEMPLATE.json` | Canonical TUNG template for Foundation pipeline | **ACTIVE** |
| `docs/workflows/example_task_master.json` | Example master task in TUNG format | **ACTIVE** |
| `docs/workflows/foundation/COMPONENT_REFACTORING_PIPELINE.md` | Component Refactoring Pipeline (Step-by-step) | **ACTIVE** |

**Total:** 4 files

---

### Reference Documentation

These documents provide API and integration references.

| Path | Description | Status |
|------|-------------|--------|
| `docs/reference/API_REFERENCE.md` | Public API reference - API reference | **ACTIVE** |
| `docs/reference/TOKENS_EXPORT_REFERENCE.md` | Design tokens export reference - API reference | **ACTIVE** |
| `docs/reference/TOKENS_OVERVIEW.md` | Token map overview - API reference | **ACTIVE** |
| `docs/reference/COMPONENTS_INVENTORY.md` | UI components inventory - Reference documentation | **ACTIVE** |
| `docs/reference/INTEGRATION_GUIDE.md` | UI integration guide - Integration reference | **ACTIVE** |
| `docs/reference/COMPONENT_EXAMPLES.md` | Extension component examples and patterns - Reference examples for Extension components | **ACTIVE** |

**Total:** 6 files

---

### Structure & Standards

| Path | Description | Status |
|------|-------------|--------|
| `docs/reference/TYPING_STANDARD.md` | Typing standards - Typing reference | **ACTIVE** |
| `docs/reference/GRADIENT_EXCEPTIONS.md` | Gradient exceptions documentation - Documented exceptions | **ACTIVE** |

**Total:** 1 file

---

### CI/CD

| Path | Description | Status |
|------|-------------|--------|
| `docs/CI_CD_OVERVIEW.md` | CI/CD overview - CI/CD reference | **ACTIVE** |

**Total:** 1 file

---

### Documentation Entry Points

| Path | Description | Status |
|------|-------------|--------|
| `docs/README.md` | Main README - documentation hub - Documentation index | **ACTIVE** |
| `docs/ASSISTANT_README.md` | GPT-specific README - GPT context reference | **ACTIVE** |

**Total:** 2 files

---

### Documentation About Documentation (META)

These documents serve as entry points, track progress, or document the documentation system itself.

| Path | Description | Status |
|------|-------------|--------|
| `docs/architecture/DOCUMENTATION_CANON_LOCK.md` | Documentation structure lock - Single source of truth for documentation structure, naming rules, and organization | **LOCKED** |
| `docs/CANONICAL_DOCUMENTATION_INVENTORY.md` | This document - Complete inventory of canonical documentation files | **ACTIVE** |

**Total:** 2 files

---

## 3. Summary Table

| File Path | Category | Status | Notes |
|-----------|----------|--------|-------|
| `docs/ARCHITECTURE_CONTEXT.md` | Primary Entry Point | Canonical (IMMUTABLE) | Single source of truth |
| `docs/architecture/FOUNDATION_LOCK.md` | Primary Entry Point | Authority (LOCKED) | Foundation lock status |
| `docs/PROJECT_ORIENTATION.md` | Primary Entry Point | Canonical (ACTIVE) | Project orientation |
| `docs/architecture/INTERACTION_AUTHORITY.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/STATE_MATRIX.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/STATE_AUTHORITY.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/SPACING_AUTHORITY.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/RADIUS_AUTHORITY.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/TYPOGRAPHY_AUTHORITY.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/MOTION_AUTHORITY.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/ELEVATION_AUTHORITY.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/LAYOUT_AUTHORITY.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/TOKEN_AUTHORITY.md` | Authority Contract | Authority (LOCKED) | Foundation Authority |
| `docs/architecture/EXTENSION_AUTHORITY.md` | Authority Contract | Authority (ACTIVE) | Extension boundary |
| `docs/architecture/AUTHORITY_NAVIGATION.md` | Authority Navigation | Reference (ACTIVE) | Authority navigation |
| `docs/architecture/ARCHITECTURE_LOCK.md` | Architecture Rules | Lock (LOCKED) | Canonical architecture lock |
| `docs/architecture/ARCHITECTURE_LOCK.md` | Architecture Rules | Lock (LOCKED) | **PRIMARY CANONICAL SOURCE** - Architecture lock (supersedes CANONICAL_STATE_FINAL.md) |
| `docs/architecture/CANONICAL_STATE_FINAL.md` | Architecture Rules | Reference (ARCHIVED) | ⚠️ **ARCHIVED/SUPERSEDED** - Final truth snapshot (superseded by ARCHITECTURE_LOCK.md) |
| `docs/architecture/EXTENSION_STATE.md` | Architecture Rules | Reference (ACTIVE) | Extension state |
| `docs/architecture/ARCHITECTURE_RULES.md` | Architecture Rules | Reference (ACTIVE) | Architecture rules |
| `docs/architecture/ASSISTANT_RULES.md` | Architecture Rules | Reference (ACTIVE) | Guard rules |
| `docs/architecture/ASSISTANT_DEVELOPMENT_RULES.md` | Architecture Rules | Reference (ACTIVE) | Cursor rules |
| `docs/architecture/LINTING_STANDARD.md` | Architecture Rules | Reference (ACTIVE) | Linting rules |
| `docs/architecture/TOOLING_DECISIONS.md` | Architecture Rules | Reference (ACTIVE) | Tooling decisions |
| `docs/architecture/locks/LAYOUT_LOCK.md` | Component Lock | Lock (LOCKED) | Layout lock |
| `docs/architecture/locks/TEXT_LOCK.md` | Component Lock | Lock (LOCKED) | Text lock |
| `docs/PROJECT_PROGRESS.md` | Progress & Management | Reference (ACTIVE) | Progress tracking |
| `docs/workflows/tasks/TASK_INDEX.md` | Progress & Management | Reference (ACTIVE) | Task index |
| `docs/workflows/tasks/COMPONENT_NEEDS_INVENTORY.md` | Library Maturity | Reference (ACTIVE) | Component needs tracking |
| `docs/workflows/tasks/COMPONENT_CREATION_CHECKLIST.md` | Library Maturity | Reference (ACTIVE) | Component creation checklist |
| `docs/workflows/tasks/FEEDBACK_COLLECTION_PROCESS.md` | Library Maturity | Reference (ACTIVE) | Feedback collection process |
| `docs/workflows/tasks/FEEDBACK_REVIEW_PROCESS.md` | Library Maturity | Reference (ACTIVE) | Feedback review process |
| `docs/workflows/tasks/COMPONENT_USAGE_TRACKING.md` | Library Maturity | Reference (ACTIVE) | Usage tracking |
| `docs/reference/API_REFERENCE.md` | Reference | Reference (ACTIVE) | API reference |
| `docs/reference/TOKENS_EXPORT_REFERENCE.md` | Reference | Reference (ACTIVE) | Tokens export |
| `docs/reference/TOKENS_OVERVIEW.md` | Reference | Reference (ACTIVE) | Token map |
| `docs/reference/COMPONENTS_INVENTORY.md` | Reference | Reference (ACTIVE) | Components inventory |
| `docs/reference/INTEGRATION_GUIDE.md` | Reference | Reference (ACTIVE) | Integration guide |
| `docs/reference/COMPONENT_EXAMPLES.md` | Reference | Reference (ACTIVE) | Component examples |
| `docs/reference/TYPING_STANDARD.md` | Structure & Standards | Reference (ACTIVE) | Typing standard |
| `docs/reference/GRADIENT_EXCEPTIONS.md` | UI Exceptions | Reference (ACTIVE) | Gradient exceptions |
| `docs/CI_CD_OVERVIEW.md` | CI/CD | Reference (ACTIVE) | CI/CD overview |
| `docs/README.md` | Entry Point | Reference (ACTIVE) | Documentation index |
| `docs/ASSISTANT_README.md` | Entry Point | Reference (ACTIVE) | GPT context |
| `docs/architecture/DOCUMENTATION_CANON_LOCK.md` | META | Lock (LOCKED) | Documentation structure lock - Single source of truth |
| `docs/CANONICAL_DOCUMENTATION_INVENTORY.md` | META | Reference (ACTIVE) | This document - Documentation inventory |
| `docs/workflows/foundation/tung_system_specification.md` | TUNG System | Reference (ACTIVE) | System specification |
| `docs/workflows/foundation/templates/FOUNDATION_STEP_TUNG_TEMPLATE.json` | TUNG System | Reference (ACTIVE) | JSON Step Template |
| `docs/workflows/example_task_master.json` | TUNG System | Reference (ACTIVE) | Master Task Example |
| `docs/workflows/foundation/COMPONENT_REFACTORING_PIPELINE.md` | Workflow | Reference (ACTIVE) | Step-by-step pipeline |

**Total:** 50 files

---

## 4. Final Statement

> **This document reflects the full and complete set of canonical documentation files currently present in `docs/`.**  
> **Any documentation not listed here is non-canonical, even if it resides in `docs/`.**

### Verification

- ??: Canonical files listed in this inventory
- ??: Paths resolve within `docs/`
- ??: Categories are clear and non-overlapping
- ??: No archived content referenced as canonical
- ??: Library Maturity Growth System documents included

### Usage

- **For Assistants:** Use this inventory to understand the canonical documentation surface
- **For Developers:** Use this inventory to verify canonical documentation status
- **For Maintainers:** Use this inventory to ensure no canonical documents are missing or misplaced

---

**Last Updated:** 2026-01-17  
**Inventory Version:** 1.2  
**Related Tasks:** DOCS_ARCHIVE_RESTRUCTURE_001, TUNG_LIBRARY_MATURITY_PLAN_06, TUNG_SYSTEM_INTEGRATION
