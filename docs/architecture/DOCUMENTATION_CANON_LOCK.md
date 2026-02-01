# Documentation Canon Lock

**Date:** 2026-01-17  
**Status:** **ACTIVE**    
**Purpose:** Define documentation structure, naming rules, and roles to prevent semantic drift and duplication

---

## Purpose

This document defines the current documentation system as **canonical**. It prevents:

- **Semantic drift** - Documents diverging from their intended purpose
- **Duplication** - Multiple documents covering the same semantic meaning
- **Naming chaos** - Inconsistent naming patterns and historical artifacts
- **Structural entropy** - Files placed in wrong folders or created without architectural decision

This document is the **single source of truth** for:
- Documentation structure and roles
- Naming rules and placement
- Change policy for documentation
- Canonical list authority (see docs/CANONICAL_DOCUMENTATION_INVENTORY.md)

**Relationship to Architectural Locks:**
- This document complements `FOUNDATION_LOCK.md`, `FOUNDATION_LOCK_THEME.md`, and `ARCHITECTURE_LOCK.md`
- Documentation structure is part of the architectural foundation
- Changes to documentation system require architectural decision

---

## Canonical Structure

The current folder structure is **canonical** and **fixed**. All documentation must be placed according to this structure.

### Root: `docs/`

**Purpose:** Contains canonical and supporting documentation. The canonical list is maintained in `docs/CANONICAL_DOCUMENTATION_INVENTORY.md`.

**Rules:**
- ??: Canonical documents are defined by `docs/CANONICAL_DOCUMENTATION_INVENTORY.md`
- ??: Non-canonical documents may exist in `docs/` but are not authoritative
- ??? Historical reports, audits, and deprecated docs SHOULD be archived
### `docs/architecture/`

**Purpose:** Authority Contracts, Architecture Rules, Locks, and architectural guidelines

**Contains:**
- Authority Contracts (`*_AUTHORITY.md`)
- Architecture Locks (`*_LOCK.md`, `ARCHITECTURE_STATE.md`, `FOUNDATION_LOCK_THEME.md`)
- Architecture Rules (`ARCHITECTURE_RULES.md`, `EXTENSION_STATE.md`)
- Assistant Rules (`ASSISTANT_RULES.md`, `ASSISTANT_DEVELOPMENT_RULES.md`)
- Standards (`LINTING_STANDARD.md`)
- Tooling decisions (`TOOLING_DECISIONS.md`)
- Authority Navigation (`AUTHORITY_NAVIGATION.md`)
- `locks/` subdirectory - Component-specific locks
- `extension/` subdirectory - Extension Layer capability map and boundary rules

**Rules:**
- ? Authority Contracts MUST be in this folder
- ? Architecture locks and rules MUST be in this folder
- ? Component locks MUST be in `architecture/locks/` subdirectory
- ? Reference documentation MUST NOT be in this folder

### `docs/reference/`

**Purpose:** API references, integration guides, typing standards, and usage examples

**Contains:**
- API references (`API_REFERENCE.md`, `TOKENS_EXPORT_REFERENCE.md`)
- Integration guides (`INTEGRATION_GUIDE.md`)
- Component inventories (`COMPONENTS_INVENTORY.md`)
- Examples (`COMPONENT_EXAMPLES.md`)
- Token overviews (`TOKENS_OVERVIEW.md`)
- Typing standards (`TYPING_STANDARD.md`, `TYPING_SYSTEM.md`, `TYPESCRIPT_GENERAL_RULES.md`)
- UI exceptions (`GRADIENT_EXCEPTIONS.md`)
- Foundation reference (`FOUNDATION_REFERENCE.md`)

**Rules:**
- ? Developer-facing reference material ONLY
- ? API documentation and integration guides
- ? Typing standards and structural conventions
- ? Architecture rules MUST NOT be in this folder

### `docs/theming/`

**Purpose:** Theme system architecture, token naming decisions, and migration guides

**Contains:**
- Theme system architecture (`THEME_SYSTEM_ARCHITECTURE.md`)
- Token naming decisions (`TOKEN_NAMING_DECISION.md`)
- Migration guides (`MIGRATION_GUIDE_THEME_TOKENS.md`)

**Related Artifacts:**
- `src/FOUNDATION/tokens/required-tokens.ts` - Canonical token registry (single source of truth for required semantic tokens)
- `scripts/check-theme-token-parity.mjs` - Token parity checker (validates all theme files define same token set)

**Token System Rules:**
- ? All semantic tokens use `--tm-` prefix (Tenerife Music brand)
- ? Foreground tokens use `-foreground` suffix (canonical, not `-fg`)
- ? All themes must define identical token set (token parity requirement)
- ? Components consume semantic tokens only (`--tm-bg`, `--tm-fg`, `--tm-primary`, etc.)
- ? Foundation components must not branch on theme state (use semantic tokens only)
- ? Legacy tokens derive from canonical tokens (one-way compat mapping)

**Rules:**
- ? Theme system documentation and architecture decisions ONLY
- ? Token naming ADRs and migration guides
- ? Component-specific theme usage MUST be in `reference/`
- ? Architecture rules MUST NOT be in this folder

### `docs/architecture/locks/`

**Purpose:** Component-specific locks

**Contains:**
- `A11Y_LOCK.md` - A11Y system lock (accessibility, contrast, WCAG 2.1 AA)
- `BUTTON_LINK_LOCK.md` - Button, IconButton, Link Foundation lock
- `CAROUSEL_LOCK.md` - Carousel Extension lock
- `FOCUS_LOCK.v1.1.md` - Focus system lock
- `HEROMEDIA_LOCK.md` - HeroMedia Extension lock (Phase L)
- `INPUT_LOCK.md` - Input system lock
- `LAYOUT_LOCK.md` - Layout primitives and Extension Layout components lock
- `MODAL_CONTEXTMENU_TOAST_LOCK.md` - Modal, ContextMenu, Toast Foundation overlays lock
- `MOTION_LOCK.md` - Motion system lock (tokens, presets)
- `OVERLAYSLOT_LOCK.md` - OverlaySlot Extension lock (Phase L)
- `RESPONSIVE_VISIBILITY_LOCK.md` - ResponsiveVisibility Extension lock (Phase L)
- `RUNTIME_UTILITIES_LOCK.md` - Runtime utilities lock (tokenCVA, cn - TUNG-028)
- `SELECT_LOCK.md` - Select Foundation lock
- `TABS_LOCK.md` - Tabs Foundation lock
- `TEXT_LOCK.md` - Text/typography components lock
- `TOOLTIP_POPOVER_LOCK.md` - Tooltip, Popover, HoverCard lock

**Rules:**
- ? Component-specific locks ONLY
- ? General architecture locks MUST be in `docs/architecture/` (parent directory)

### `docs/architecture/extension/`

**Purpose:** Extension Layer architecture ? capability map and boundary rules

**Contains:**
- Extension capability map (`EXTENSION_CAPABILITY_MAP.md`)
- HeroMedia canonical capability definition (`HEROMEDIA_CANON.md`)
- OverlaySlot canonical capability definition (`OVERLAYSLOT_CANON.md`)
- ResponsiveVisibility canonical capability definition (`RESPONSIVE_VISIBILITY_CANON.md`)
- ResponsiveVisibility Extension API specification (`RESPONSIVE_VISIBILITY_EXTENSION_API.md`)

**Rules:**
- ? Extension Layer architecture documents ONLY (capability map, boundary rules)
- ? Reference documentation or audit reports MUST NOT be in this folder
- ? General architecture rules live in `docs/architecture/` (parent directory)

**Extension-Level Capability Locks (Phase L):**

The following Extension capabilities are architecturally LOCKED. Modifications only via new Phase L audit; hotfixes require explicit LOCK exception per TUNG policy.

| Capability | Layer    | Status            | Canon              |
| ---------- | -------- | ------------------ | ------------------ |
| HeroMedia  | Extension | LOCKED (Phase L ? Overlay + HeroMedia) | HEROMEDIA_CANON.md |
| OverlaySlot | Extension | LOCKED (Phase L ? Overlay + HeroMedia) | OVERLAYSLOT_CANON.md |
| ResponsiveVisibility | Extension | LOCKED (Phase L) | RESPONSIVE_VISIBILITY_CANON.md |

### `docs/workflows/`

**Purpose:** Process workflows, checklists, and library maturity system

**Contains:**
- `tasks/` - Component creation checklists (`COMPONENT_CREATION_CHECKLIST.md`), feedback processes, component needs tracking, usage tracking, task index
- `foundation/` - Foundation processes (`COMPONENT_REFACTORING_PIPELINE.md` - Pipeline 18A for component refactoring)
- `policies/` - Process policies and guard rules (`TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md`, `NO_DUPLICATION_POLICY.md`, `ESLINT_AUTOFIX_POLICY.md`, etc.)

**Rules:**
- ? Process definitions and workflows
- ? Component creation workflows (Component Creation Pipeline C0-C10)
- ? Component refactoring workflows (Component Refactoring Pipeline 18A)
- ? Checklists and task management
- ? Process policies and guard rules
- ? Architecture rules MUST NOT be in this folder

### `docs/governance/`

**Purpose:** Governance review cycles and review templates

**Contains:**
- Governance review cycles, review templates
- `reviews/` - Governance review reports

**Rules:**
- ? Governance processes and reviews
- ? Should NOT be part of primary reading route for architecture understanding

### `docs/reports/`

**Purpose:** Reports and audit documentation

**Contains:**
- Project reports (`*_REPORT.md`)
- `audit/` - Audit reports and analyses (Component Refactoring Pipeline 18A baseline reports)
- `creation/` - Component creation reports (Component Creation Pipeline C0-C10 completion reports)

**Rules:**
- ? Historical reports and audits
- ? Component refactoring reports (Pipeline 18A STEP 0-12 audit reports in `audit/` subdirectory)
- ? Component creation reports (Component Creation Pipeline C0-C10 completion reports in `creation/` subdirectory)
- ? Should NOT be part of primary reading route

### `docs/migrations/`

**Purpose:** Migration documentation

**Contains:**
- Migration reports and historical migration context

**Rules:**
- ? Migration documentation for historical reference
- ? Should NOT be part of primary reading route

### `docs/_internal/`

**Purpose:** Internal service documents (AI context only)

**Contains:**
- `ai/` - AI/Assistant context and GPT-specific documentation
  - `gpt_canon_context/` - GPT canonical context
  - `_to_GPT_project/` - GPT project documentation
  - `_to_GPT_project_essential/` - Essential GPT project documentation

**Rules:**
- ? AI-specific context and documentation
- ? Should NOT be part of primary reading route

### Root-Level Files: `docs/*.md`

**Purpose:** Entry points, orientation, and progress tracking

**Contains:**
- Architecture context (`ARCHITECTURE_CONTEXT.md`)
- Foundation lock (`FOUNDATION_LOCK.md` - in `architecture/` subfolder)
- Foundation theme lock (`FOUNDATION_LOCK_THEME.md` - Theme Contract v1)
- Project orientation (`PROJECT_ORIENTATION.md`)
- Progress tracking (`PROJECT_PROGRESS.md`)
- Documentation inventory (`CANONICAL_DOCUMENTATION_INVENTORY.md`)
- Entry points (`README.md`, `ASSISTANT_README.md`)
- CI/CD overview (`CI_CD_OVERVIEW.md`)

**Rules:**
- ? High-level entry points and orientation
- ? Project-wide status and progress
- ? Detailed architecture rules MUST be in subfolders

### `docs_archive/`

**Purpose:** Archived, non-canonical documentation (excluded from canon)

**Contains:**
- Historical reports and audits
- Legacy guides and outdated documentation
- Migration documentation (historical context only)
- Deprecated documents and code reviews
- assistant task results and experimental documents

**Rules:**
- ? **NEVER** use `docs_archive/` as source of truth
- ? **NEVER** reference archived documents for canonical rules
- ? **NEVER** use archived documents for assistant context
- ? **ONLY** consult `docs_archive/` for historical reference (if explicitly requested)

---

## Documentation Structure Governance

**Status:** **ACTIVE**    
**Baseline Date:** 2025-12-19 (Structure freeze date - structure remains frozen)  
**Last Updated:** 2026-01-31  
**Purpose:** Prevent structural drift and ensure all documentation changes respect canonical organization

### Freeze Declaration

The current structure of `docs/` directory is **CANONICAL** and **controlled**. This structure represents the single source of truth for documentation organization.

**The following top-level directories are CANONICAL:**

1. **`docs/architecture/`** - Authority Contracts, Architecture Rules, Locks, and architectural guidelines
   - **Purpose:** Contains immutable LAW documents and active GUIDE documents
   - **Boundary:** Architecture rules and authority contracts ONLY
   - **Contains:** `closed-system/`, `locks/`, `extension/` (Extension Layer capability map and boundary rules), `decisions/`, `rendering/`, `typography/` subdirectories
   - **Forbidden:** Reference documentation, reports, or service documents

2. **`docs/reference/`** - API references, integration guides, typing standards, and usage examples
   - **Purpose:** Developer-facing reference material
   - **Boundary:** API documentation, integration guides, typing standards ONLY
   - **Forbidden:** Architecture rules or internal service documents

3. **`docs/theming/`** - Theme system architecture, token naming decisions, and migration guides
   - **Purpose:** Theme system documentation and architecture decisions
   - **Boundary:** Theme system architecture, token naming ADRs, and migration guides ONLY
   - **Contains:** Theme system docs, canonical token registry (`required-tokens.ts`), token parity checker script
   - **Token System:** Single canonical contract (`data-theme` attribute), semantic tokens (`--tm-*`), token parity validation
   - **Forbidden:** Component-specific theme usage or architecture rules

4. **`docs/governance/`** - Governance review cycles and review templates
   - **Purpose:** Governance processes and review reports
   - **Boundary:** Governance workflows and review documentation ONLY
   - **Forbidden:** Architecture rules or primary reading route documents

5. **`docs/workflows/`** - Process workflows, checklists, and library maturity system
   - **Purpose:** Process definitions, workflows, and task management
   - **Contains:** 
     - `foundation/` - Component Refactoring Pipeline 18A (STEP 0-12 for existing components)
     - `tasks/` - Component Creation Pipeline C0-C10 checklists and workflows
   - **Boundary:** Workflow definitions and process documentation ONLY
   - **Forbidden:** Architecture rules or reference documentation

6. **`docs/reports/`** - Reports and audit documentation
   - **Purpose:** Historical reports, audit analyses, component refactoring reports, and component creation reports
   - **Boundary:** Project reports, audit documentation, component refactoring reports, and component creation reports ONLY
   - **Contains:** 
     - `audit/` subdirectory - Component Refactoring Pipeline 18A baseline reports (STEP 0-12 audit reports)
     - `creation/` subdirectory - Component Creation Pipeline C0-C10 completion reports
   - **Forbidden:** Primary reading route documents or architecture rules

7. **`docs/migrations/`** - Migration documentation
   - **Purpose:** Historical migration context and reports
   - **Boundary:** Migration documentation ONLY
   - **Forbidden:** Primary reading route documents or active architecture rules

8. **`docs/_internal/`** - Internal service documents (AI context only)
   - **Purpose:** AI/Assistant-specific context and documentation
   - **Boundary:** Service documents for AI context ONLY
   - **Forbidden:** Reader-facing documentation or architecture rules

9. **`docs/archive/`** - Archived documentation (if exists)
   - **Purpose:** Non-canonical, archived documentation
   - **Boundary:** Historical and deprecated documentation ONLY
   - **Forbidden:** Active canonical documentation

### Structural Change Policy

**Rule:** Any structural changes to `docs/` directory structure must be made through modification of this document (`DOCUMENTATION_CANON_LOCK.md`) first.

**Process for Structural Changes:**

1. **Proposal Phase:**
   - Document the proposed structural change
   - Justify why the change is architecturally necessary
   - Identify which documents will be affected

2. **Lock Update Phase:**
   - Update this document (`DOCUMENTATION_CANON_LOCK.md`) to reflect the new structure
   - Update the "Canonical Structure" section
   - Update the "Documentation Structure Freeze" section
   - Document the purpose and boundaries of any new directories

3. **Implementation Phase:**
   - Only after lock document is updated, implement the structural change
   - Move files according to the updated structure
   - Update all cross-references and links

4. **Verification Phase:**
   - Verify all files are in their canonical locations
   - Verify all links are valid
   - Verify no files are in unauthorized locations

**Disallowed Without Update:**

- ? Creating new top-level directories in `docs/`
- ? Moving documents between top-level directories
- ? Placing reader-facing documents in `_internal/`
- ? Placing architecture rules in `reference/`
- ? Placing reference documentation in `architecture/`
- ? Any structural change without first updating this lock document

### Enforcement Rules

**If a document violates structure:**
- The document is considered **non-canonical**
- The placement is considered an **error**
- The document must be moved to its canonical location

**If a file is placed outside its section:**
- This is a **structural violation**
- The file must be moved to the correct canonical location
- All references must be updated

**If a new directory is needed:**
- The lock document (`DOCUMENTATION_CANON_LOCK.md`) **MUST** be updated first
- The new directory's purpose and boundaries **MUST** be documented
- Only after lock update can the directory be created

**Priority Principle:**
- **Architecture and Governance have priority over convenience**
- Structural stability is more important than temporary convenience
- All structural changes require architectural justification

### Single Source of Truth

This document (`DOCUMENTATION_CANON_LOCK.md`) is the **single source of truth** for documentation structure.

**All structural questions must be resolved by reference to this document.**

- ? If a directory is listed here ? it is canonical
- ? If a directory is not listed here ? it is non-canonical
- ? If a document's placement is described here ? it is correct
- ? If a document's placement contradicts this document ? it is incorrect

**No structural change can be made unconsciously.** All changes must pass through this lock document.

---

## Naming Rules

Naming rules are **mandatory** and **strictly enforced**. All documentation must follow these patterns.

### Core Principles

1. **One semantic meaning ? one canonical name pattern**
2. **Names reflect meaning, not history**
3. **Avoid internal abbreviations** (TUI, internal, etc.) unless semantically meaningful
4. **Standardize case** (UPPERCASE for consistency)
5. **Remove redundant prefixes** (EXTENSION_, UI_ where context makes it clear)

### Mandatory Naming Patterns

#### Core Architecture Lock & Immutability

**Pattern:** `ARCHITECTURE_{PURPOSE}.md`

**Examples:**
- `ARCHITECTURE_CONTEXT.md` - Primary context document
- `FOUNDATION_LOCK.md` - Foundation lock (in `architecture/` subfolder)
- `FOUNDATION_LOCK_THEME.md` - Foundation lock for theme system (Theme Contract v1)
- `ARCHITECTURE_LOCK.md` - Architecture lock
- `ARCHITECTURE_STATE.md` - Architecture state

**Forbidden:**
- ? `INTERNAL_*` (internal detail)
- ? `FINAL_*` (historical marker)
- ? `CANONICAL_*` (redundant with context)
- ? `UI_*` prefix (redundant, all architecture is UI)

#### Authority Contracts

**Pattern:** `{DOMAIN}_AUTHORITY.md`

**Examples:**
- `SPACING_AUTHORITY.md`
- `TYPOGRAPHY_AUTHORITY.md`
- `MOTION_AUTHORITY.md`
- `TOKEN_AUTHORITY.md`
- `EXTENSION_AUTHORITY.md`

**Special Cases:**
- `STATE_MATRIX.md` - Part of state authority system (matrix is clear)

**Forbidden:**
- ? `*_AUTHORITY_CONTRACT.md` (CONTRACT redundant with AUTHORITY)
- ? `TOKEN_AUTHORITY.md` (should be `TOKEN_AUTHORITY.md`)

#### Authority Navigation

**Pattern:** `AUTHORITY_NAVIGATION.md`

**Forbidden:**
- ? `AUTHORITY_NAVIGATION.md` (MAP is implementation detail)

#### Architecture Rules & Extension Guidelines

**Pattern:** `{DOMAIN}_RULES.md` or `{DOMAIN}_GUIDELINES.md` or `{DOMAIN}_STATE.md`

**Examples:**
- `ARCHITECTURE_RULES.md`
- `EXTENSION_STATE.md`
- `LINTING_STANDARD.md`

**Forbidden:**
- ? `ARCHITECTURE_RULES.md` (UI_ prefix redundant)
- ? `EXTENSION_STATE.md` (CANONICAL redundant)

#### AI/Assistant Behavior Rules

**Pattern:** `ASSISTANT_{PURPOSE}_RULES.md`

**Examples:**
- `ASSISTANT_RULES.md`
- `ASSISTANT_DEVELOPMENT_RULES.md`

**Forbidden:**
- ? `ASSISTANT_RULES.md` (TUI_ internal abbreviation, CURSOR tool-specific)
- ? `ASSISTANT_DEVELOPMENT_RULES.md` (CURSOR tool-specific, UI redundant)

#### Component Locks

**Pattern:** `{CATEGORY}_LOCK.md`

**Examples:**
- `LAYOUT_LOCK.md`
- `TEXT_LOCK.md`

**Rules:**
- ? Already follows standard pattern
- ? Category names must be clear

#### Progress & Task Management

**Pattern:** `PROJECT_PROGRESS.md` or `TASK_INDEX.md`

**Forbidden:**
- ? `master_task_index.md` (master_ is historical prefix)

#### Library Maturity & Growth Processes

**Pattern:** `{PROCESS}_PROCESS.md` or `{TOPIC}_WORKFLOW.md` or `{TOPIC}_INVENTORY.md` or `{TOPIC}_CHECKLIST.md` or `{TOPIC}_PIPELINE.md`

**Examples:**
- `FEEDBACK_COLLECTION_PROCESS.md`
- `FEEDBACK_REVIEW_PROCESS.md`
- `COMPONENT_NEEDS_INVENTORY.md`
- `COMPONENT_CREATION_CHECKLIST.md`
- `COMPONENT_CREATION_PIPELINE.md` - Component Creation Pipeline C0-C10
- `COMPONENT_REFACTORING_PIPELINE.md` - Component Refactoring Pipeline 18A (STEP 0-12)
- `COMPONENT_USAGE_TRACKING.md`

**Forbidden:**
- ? `EXTENSION_COMPONENT_CREATION_CHECKLIST.md` (EXTENSION_ prefix redundant)
- ? `USAGE_FEEDBACK_PROCESS.md` (should be `FEEDBACK_COLLECTION_PROCESS.md`)

#### Reference Documentation

**Pattern:** `{TOPIC}_REFERENCE.md` or `{TOPIC}_GUIDE.md` or `{TOPIC}_OVERVIEW.md` or `{TOPIC}_INVENTORY.md` or `{TOPIC}_EXAMPLES.md`

**Examples:**
- `API_REFERENCE.md`
- `INTEGRATION_GUIDE.md`
- `TOKENS_OVERVIEW.md`
- `TOKENS_EXPORT_REFERENCE.md`
- `COMPONENTS_INVENTORY.md`
- `COMPONENT_EXAMPLES.md`

**Forbidden:**
- ? `public-api.md` (lowercase, no REFERENCE suffix)
- ? `design_tokens_export.md` (lowercase, no REFERENCE suffix)
- ? `token-map-overview.md` (lowercase, hyphen instead of underscore)
- ? `UI_COMPONENTS_INVENTORY.md` (UI_ prefix redundant)
- ? `UI_INTEGRATION.md` (UI_ redundant, should be GUIDE)
- ? `EXTENSION_COMPONENT_EXAMPLES.md` (EXTENSION_ prefix redundant)

#### Tooling & Standards

**Pattern:** `{TOOL}_STANDARD.md` or `{TOOL}_RULES.md` or `{TOOL}_DECISIONS.md`

**Examples:**
- `LINTING_STANDARD.md`
- `TYPING_STANDARD.md`
- `TOOLING_DECISIONS.md`

**Forbidden:**
- ? `LINTING_STANDARD.md` (should be STANDARD, not RULES)

#### Entry Points & Orientation

**Pattern:** `README.md` or `{AUDIENCE}_README.md` or `PROJECT_ORIENTATION.md`

**Examples:**
- `README.md` (standard)
- `ASSISTANT_README.md`
- `PROJECT_ORIENTATION.md`

**Forbidden:**
- ? `README_GPT.md` (GPT is tool-specific, should be ASSISTANT)
- ? `PROJECT_ORIENTATION.md` (CANONICAL redundant)

#### Exceptions & Special Cases

**Pattern:** `{TOPIC}_EXCEPTIONS.md` or `{TOPIC}_OVERVIEW.md`

**Examples:**
- `GRADIENT_EXCEPTIONS.md`
- `CI_CD_OVERVIEW.md`

**Forbidden:**
- ? `gradient_exceptions.md` (lowercase)
- ? `CI_CD_OVERVIEW.md` (hyphen instead of underscore)

### Case Standardization

- ? **UPPERCASE** for all canonical document names
- ? **lowercase** forbidden (except standard `README.md`)
- ? **Underscores** for word separation (`CI_CD_OVERVIEW.md`)
- ? **Hyphens** forbidden (`CI_CD_OVERVIEW.md` ? `CI_CD_OVERVIEW.md`)

### Forbidden Patterns Summary

1. **Internal abbreviations:** `TUI_*`, `INTERNAL_*` (unless semantically meaningful)
2. **Historical markers:** `FINAL_*`, `CANONICAL_*` (where redundant), `master_*`
3. **Redundant prefixes:** `UI_*`, `EXTENSION_*` (where context makes it clear)
4. **Redundant suffixes:** `*_CONTRACT` (redundant with `*_AUTHORITY`)
5. **Tool-specific names:** `CURSOR_*`, `GPT_*` (use semantic names like `ASSISTANT_*`)
6. **Implementation details:** `*_MAP` (use `*_NAVIGATION`), `*_GUARD` (use `*_RULES`)
7. **Lowercase:** All canonical docs must be UPPERCASE (except `README.md`)
8. **Hyphens:** Use underscores for word separation

---

## Document Roles

All canonical documents are classified into four roles: **LAW**, **GUIDE**, **REFERENCE**, and **META**.

### LAW (Immutable Rules)

**Definition:** Documents that establish immutable, locked architectural rules. These documents have **LOCKED** or **IMMUTABLE** status and cannot be changed.

**Characteristics:**
- Define canonical scales, forbidden patterns, and component obligations
- Serve as single source of truth for domain decisions
- Override all other documentation for their domain
- **Status:** **ACTIVE**    

**Documents (see inventory):**

1. `docs/ARCHITECTURE_CONTEXT.md` - IMMUTABLE
2. `docs/architecture/FOUNDATION_LOCK.md` - LOCKED
3. `docs/architecture/FOUNDATION_LOCK_THEME.md` - LOCKED (Theme Contract v1)
4. `docs/architecture/ARCHITECTURE_LOCK.md` - LOCKED
5. `docs/architecture/ARCHITECTURE_STATE.md` - LOCKED
6. `docs/architecture/INTERACTION_AUTHORITY.md` - LOCKED
7. `docs/architecture/STATE_MATRIX.md` - LOCKED
8. `docs/architecture/STATE_AUTHORITY.md` - LOCKED
9. `docs/architecture/SPACING_AUTHORITY.md` - LOCKED
10. `docs/architecture/RADIUS_AUTHORITY.md` - LOCKED
11. `docs/architecture/TYPOGRAPHY_AUTHORITY.md` - LOCKED
12. `docs/architecture/MOTION_AUTHORITY.md` - LOCKED
13. `docs/architecture/ELEVATION_AUTHORITY.md` - LOCKED
14. `docs/architecture/LAYOUT_AUTHORITY.md` - LOCKED
14. `docs/architecture/TOKEN_AUTHORITY.md` - LOCKED
15. `docs/architecture/EXTENSION_AUTHORITY.md` - ACTIVE (but still LAW - defines Extension boundaries)
16. `docs/architecture/locks/LAYOUT_LOCK.md` - LOCKED
17. `docs/architecture/locks/TEXT_LOCK.md` - LOCKED

**Change Policy:** ? **FORBIDDEN** - LAW documents are immutable

### GUIDE (Active Development Guidelines)

**Definition:** Documents that provide active guidelines, rules, and processes for working within the architecture. These documents guide development but are not immutable.

**Characteristics:**
- Define how to work within the architecture
- Provide development guidelines and checklists
- Establish processes and workflows
- **Status:** **ACTIVE**    

**Documents (see inventory):**

1. `docs/architecture/AUTHORITY_NAVIGATION.md` - Navigation and mental models
2. `docs/architecture/ARCHITECTURE_RULES.md` - Architecture rules reference
3. `docs/architecture/EXTENSION_STATE.md` - Extension layer state
4. `docs/architecture/ASSISTANT_RULES.md` - Assistant guard rules
5. `docs/architecture/ASSISTANT_DEVELOPMENT_RULES.md` - Assistant development rules
6. `docs/architecture/LINTING_STANDARD.md` - Linting standards
7. `docs/architecture/TOOLING_DECISIONS.md` - Tooling decisions
8. `docs/reference/TYPING_STANDARD.md` - Typing standards
9. `docs/workflows/tasks/COMPONENT_CREATION_CHECKLIST.md` - Component creation checklist
10. `docs/workflows/tasks/FEEDBACK_COLLECTION_PROCESS.md` - Feedback collection process
11. `docs/workflows/tasks/FEEDBACK_REVIEW_PROCESS.md` - Feedback review process
12. `docs/workflows/tasks/COMPONENT_NEEDS_INVENTORY.md` - Component needs tracking
13. `docs/workflows/tasks/COMPONENT_USAGE_TRACKING.md` - Component usage tracking
14. `docs/reference/GRADIENT_EXCEPTIONS.md` - Documented exceptions
15. `docs/CI_CD_OVERVIEW.md` - CI/CD overview

**Change Policy:** ? **ALLOWED** with architectural review

### REFERENCE (API and Integration Documentation)

**Definition:** Documents that provide API references, integration guides, and usage examples for developers using the library.

**Characteristics:**
- Provide API references and documentation
- Integration guides and examples
- Component inventories and catalogs
- Developer-facing reference material
- **Status:** **ACTIVE**    

**Documents (see inventory):**

1. `docs/reference/API_REFERENCE.md` - Public API reference
2. `docs/reference/TOKENS_EXPORT_REFERENCE.md` - Design tokens export reference
3. `docs/reference/TOKENS_OVERVIEW.md` - Token map overview
4. `docs/reference/COMPONENTS_INVENTORY.md` - UI components inventory
5. `docs/reference/INTEGRATION_GUIDE.md` - UI integration guide
6. `docs/reference/COMPONENT_EXAMPLES.md` - Extension component examples

**Note:** Theme system token documentation (architecture, naming decisions, migration) is in `docs/theming/`, not `reference/`. Token registry (`src/FOUNDATION/tokens/required-tokens.ts`) and parity checker (`scripts/check-theme-token-parity.mjs`) are implementation artifacts.

**Change Policy:** ? **ALLOWED** for accuracy updates and API changes

### META (Documentation About Documentation)

**Definition:** Documents that serve as entry points, track progress, or document the documentation system itself.

**Characteristics:**
- Provide documentation navigation
- Project orientation and current state
- Entry points for different audiences
- Documentation hub functionality
- **Status:** **ACTIVE**    

**Documents (see inventory):**

1. `docs/README.md` - Main README, documentation hub
2. `docs/ASSISTANT_README.md` - Assistant-specific README
3. `docs/PROJECT_ORIENTATION.md` - Canonical project orientation
4. `docs/PROJECT_PROGRESS.md` - Project progress tracking
5. `docs/workflows/tasks/TASK_INDEX.md` - Task index and navigation
6. `docs/CANONICAL_DOCUMENTATION_INVENTORY.md` - Documentation inventory
7. `docs/architecture/DOCUMENTATION_CANON_LOCK.md` - This document

**Change Policy:** ? **ALLOWED** for inventory updates and progress tracking

**Note:** `docs/architecture/CANONICAL_STATE_FINAL.md` is **ARCHIVED** and not counted in the canonical documents.

---

## Change Policy

Changes to the documentation system are **strictly controlled**. This section defines when and how documentation can change.

### Adding New Canonical Documents

**Requirements:**
1. ? **Architectural decision required** - New documents must be justified architecturally
2. ? **Must follow naming rules** - Name must match mandatory pattern for semantic group
3. ? **Must be assigned to correct folder** - Placement must match folder purpose
4. ? **Must be classified into role** - Document must be LAW/GUIDE/REFERENCE/META
5. ? **Must be added to inventory** - `CANONICAL_DOCUMENTATION_INVENTORY.md` must be updated
6. ? **Must update this document** - If adding new folder or pattern, update this lock document

**Process:**
1. Propose new document with architectural justification
2. Verify naming follows canonical pattern
3. Verify folder placement is correct
4. Classify document role
5. Update `CANONICAL_DOCUMENTATION_INVENTORY.md`
6. Update this document if structure changes

### Modifying Existing Documents

#### LAW Documents

**Policy:** ? **FORBIDDEN**

**Rationale:** LAW documents are immutable. They define locked architectural rules that cannot change.

**Exception:** None. LAW documents are locked by definition.

#### GUIDE Documents

**Policy:** ? **ALLOWED** with architectural review

**Requirements:**
1. ? Changes must maintain architectural compliance
2. ? Changes must be reviewed for consistency
3. ? Changes must not violate LAW documents
4. ? Changes must update related documents if needed

**Process:**
1. Propose change with architectural justification
2. Review against LAW documents
3. Verify consistency with related GUIDE documents
4. Update cross-references if needed

#### REFERENCE Documents

**Policy:** ? **ALLOWED** for accuracy updates and API changes

**Requirements:**
1. ? Updates must reflect actual API/implementation
2. ? Updates must maintain accuracy
3. ? Updates must not introduce architectural rules (use GUIDE for that)

**Process:**
1. Update document to reflect current state
2. Verify accuracy against implementation
3. Update cross-references if needed

#### META Documents

**Policy:** ? **ALLOWED** for inventory updates and progress tracking

**Requirements:**
1. ? Updates must reflect current state
2. ? Inventory updates must be complete
3. ? Progress tracking must be accurate

**Process:**
1. Update document with current information
2. Verify completeness
3. Update cross-references if needed

### Renaming Documents

**Policy:** ? **FORBIDDEN** without architectural decision

**Requirements:**
1. ? Architectural decision required
2. ? Must update all links (especially `.cursor/rules/*.mdc` files)
3. ? Must update `CANONICAL_DOCUMENTATION_INVENTORY.md`
4. ? Must update this document if naming pattern changes
5. ? Must verify no broken links

**Process:**
1. Propose rename with architectural justification
2. Identify all files that reference the document
3. Update all references
4. Update inventory
5. Update this document if pattern changes
6. Verify no broken links

### Moving Documents

**Policy:** ? **FORBIDDEN** without architectural decision

**Requirements:**
1. ? Architectural decision required
2. ? Must update all links
3. ? Must verify folder placement matches purpose
4. ? Must update `CANONICAL_DOCUMENTATION_INVENTORY.md`

**Process:**
1. Propose move with architectural justification
2. Verify new folder matches document purpose
3. Update all references
4. Update inventory
5. Verify no broken links

### Deleting Documents

**Policy:** ? **FORBIDDEN** (archive instead)

**Requirements:**
1. ? Documents must be archived, not deleted
2. ? Move to `docs_archive/` if deprecated
3. ? Update `CANONICAL_DOCUMENTATION_INVENTORY.md` to mark as archived
4. ? Update all references to point to replacement or archive

**Process:**
1. Identify replacement document (if any)
2. Move document to `docs_archive/`
3. Update inventory to mark as archived
4. Update all references
5. Verify no broken links

---

## Enforcement

This documentation canon is **mandatory** and **strictly enforced**.

### Assistant Requirements

Assistants **MUST**:
- ? Follow this canon when creating or modifying documentation
- ? Refuse tasks that violate naming rules
- ? Refuse tasks that violate folder structure
- ? Refuse tasks that modify LAW documents
- ? Verify compliance before creating new documentation
- ? Reference this document when documentation questions arise

Assistants **MUST NOT**:
- ? Create documentation that violates naming rules
- ? Place documentation in wrong folders
- ? Modify LAW documents
- ? Rename or move documents without architectural decision
- ? Create duplicate documentation

### Violation Handling

**When violations are detected:**
1. **REFUSE** the task immediately
2. **EXPLAIN** which rule was violated
3. **REFERENCE** this document
4. **SUGGEST** correct approach if possible

**No exceptions:** This canon applies to all documentation work without exception.

### Verification

Before completing any documentation task, verify:
- ? Naming follows canonical pattern
- ? Folder placement is correct
- ? Document role is classified
- ? Inventory is updated (if adding/modifying)
- ? All links are valid (if renaming/moving)
- ? No LAW documents are modified

---

## Summary

This document defines the documentation system as canonical:

- **Canonical documents listed** in docs/CANONICAL_DOCUMENTATION_INVENTORY.md${nl}- **4 document roles:** LAW, GUIDE, REFERENCE, META (see inventory)
- **Authoritative decisions:** LAW documents (see roles in the inventory)
- **Canonical folder structure** with clear purposes
- **Mandatory naming patterns** for each semantic group
- **Strict change policy** preventing drift and duplication
- **Theme system documentation** in docs/theming/ with canonical token registry and parity validation

**Token System Integration:**
- Canonical token registry: `src/FOUNDATION/tokens/required-tokens.ts` (single source of truth for required semantic tokens)
- Token parity checker: `scripts/check-theme-token-parity.mjs` (CI validation script)
- Theme system docs: `docs/theming/` (architecture, naming decisions, migration guides)
- Token naming: `--tm-*` prefix with `-foreground` suffix (canonical spelling)
- Token parity: All theme files must define identical token set (validated by parity checker)

**This canon is ACTIVE and must be followed for all documentation work.**

---

**Last Updated:** 2026-01-31  
**Status:** **ACTIVE**    
**Related Documents:**
- `docs/CANONICAL_DOCUMENTATION_INVENTORY.md` - Complete inventory of canonical documents
- `docs/DOCS_CANONICAL_NAMING_STANDARD.md` - Naming standard reference
- `docs/DOCS_SEMANTIC_GROUPING_REPORT.md` - Semantic grouping analysis
- `docs/architecture/FOUNDATION_LOCK.md` - Foundation layer lock
- `docs/architecture/FOUNDATION_LOCK_THEME.md` - Foundation lock for theme system (Theme Contract v1)
- `docs/architecture/ARCHITECTURE_LOCK.md` - Architecture lock

