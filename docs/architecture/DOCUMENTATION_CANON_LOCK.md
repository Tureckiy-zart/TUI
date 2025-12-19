# Documentation Canon Lock

**Date:** 2025-01-27  
**Status:** 🔒 **LOCKED**  
**Purpose:** Fix current documentation structure, naming rules, and roles as canonical to prevent future semantic drift and duplication

---

## Purpose

This document fixes the current documentation system as **canonical** and **immutable**. It prevents:

- **Semantic drift** - Documents diverging from their intended purpose
- **Duplication** - Multiple documents covering the same semantic meaning
- **Naming chaos** - Inconsistent naming patterns and historical artifacts
- **Structural entropy** - Files placed in wrong folders or created without architectural decision

This lock document is the **single source of truth** for:
- What documentation exists and why
- Where documentation belongs
- How documentation must be named
- What role each document serves
- When and how documentation can change

**Relationship to Architectural Locks:**
- This document complements `FOUNDATION_LOCK.md` and `ARCHITECTURE_LOCK.md`
- Documentation structure is part of the architectural foundation
- Changes to documentation system require architectural decision

---

## Canonical Structure

The current folder structure is **canonical** and **fixed**. All documentation must be placed according to this structure.

### Root: `docs/`

**Purpose:** Contains ONLY canonical, authoritative, and active documentation (44 files)

**Rules:**
- ✅ All files in `docs/` are considered ACTIVE and CANONICAL
- ❌ Non-canonical documentation MUST be in `docs_archive/`
- ❌ Historical reports, audits, and deprecated docs MUST be archived

### `docs/architecture/`

**Purpose:** Authority Contracts, Architecture Rules, Locks, and architectural guidelines

**Contains:**
- Authority Contracts (`*_AUTHORITY.md`)
- Architecture Locks (`*_LOCK.md`, `ARCHITECTURE_STATE.md`)
- Architecture Rules (`ARCHITECTURE_RULES.md`, `EXTENSION_STATE.md`)
- Assistant Rules (`ASSISTANT_RULES.md`, `ASSISTANT_DEVELOPMENT_RULES.md`)
- Standards (`LINTING_STANDARD.md`)
- Tooling decisions (`TOOLING_DECISIONS.md`)
- Authority Navigation (`AUTHORITY_NAVIGATION.md`)
- `locks/` subdirectory - Component-specific locks

**Rules:**
- ✅ Authority Contracts MUST be in this folder
- ✅ Architecture locks and rules MUST be in this folder
- ✅ Component locks MUST be in `architecture/locks/` subdirectory
- ❌ Reference documentation MUST NOT be in this folder

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
- ✅ Developer-facing reference material ONLY
- ✅ API documentation and integration guides
- ✅ Typing standards and structural conventions
- ❌ Architecture rules MUST NOT be in this folder

### `docs/architecture/locks/`

**Purpose:** Component-specific locks

**Contains:**
- Component category locks (`LAYOUT_LOCK.md`, `TEXT_LOCK.md`)

**Rules:**
- ✅ Component-specific locks ONLY
- ❌ General architecture locks MUST be in `docs/architecture/` (parent directory)

### `docs/workflows/`

**Purpose:** Process workflows, checklists, and library maturity system

**Contains:**
- `tasks/` - Component creation checklists (`COMPONENT_CREATION_CHECKLIST.md`), feedback processes, component needs tracking, usage tracking, task index
- `foundation/` - Foundation processes (`FOUNDATION_STEP_PIPELINE.md`)

**Rules:**
- ✅ Process definitions and workflows
- ✅ Checklists and task management
- ❌ Architecture rules MUST NOT be in this folder

### `docs/governance/`

**Purpose:** Governance review cycles and review templates

**Contains:**
- Governance review cycles, review templates
- `reviews/` - Governance review reports

**Rules:**
- ✅ Governance processes and reviews
- ❌ Should NOT be part of primary reading route for architecture understanding

### `docs/reports/`

**Purpose:** Reports and audit documentation

**Contains:**
- Project reports (`*_REPORT.md`)
- `audit/` - Audit reports and analyses

**Rules:**
- ✅ Historical reports and audits
- ❌ Should NOT be part of primary reading route

### `docs/migrations/`

**Purpose:** Migration documentation

**Contains:**
- Migration reports and historical migration context

**Rules:**
- ✅ Migration documentation for historical reference
- ❌ Should NOT be part of primary reading route

### `docs/_internal/`

**Purpose:** Internal service documents (AI context only)

**Contains:**
- `ai/` - AI/Assistant context and GPT-specific documentation
  - `gpt_canon_context/` - GPT canonical context
  - `_to_GPT_project/` - GPT project documentation
  - `_to_GPT_project_essential/` - Essential GPT project documentation

**Rules:**
- ✅ AI-specific context and documentation
- ❌ Should NOT be part of primary reading route

### Root-Level Files: `docs/*.md`

**Purpose:** Entry points, orientation, and progress tracking

**Contains:**
- Architecture context (`ARCHITECTURE_CONTEXT.md`)
- Foundation lock (`FOUNDATION_LOCK.md` - in `architecture/` subfolder)
- Project orientation (`PROJECT_ORIENTATION.md`)
- Progress tracking (`PROJECT_PROGRESS.md`)
- Documentation inventory (`CANONICAL_DOCUMENTATION_INVENTORY.md`)
- Entry points (`README.md`, `ASSISTANT_README.md`)
- CI/CD overview (`CI_CD_OVERVIEW.md`)

**Rules:**
- ✅ High-level entry points and orientation
- ✅ Project-wide status and progress
- ❌ Detailed architecture rules MUST be in subfolders

### `docs_archive/`

**Purpose:** Archived, non-canonical documentation (excluded from canon)

**Contains:**
- Historical reports and audits
- Legacy guides and outdated documentation
- Migration documentation (historical context only)
- Deprecated documents and code reviews
- Cursor/AI task results and experimental documents

**Rules:**
- ❌ **NEVER** use `docs_archive/` as source of truth
- ❌ **NEVER** reference archived documents for canonical rules
- ❌ **NEVER** use archived documents for AI/Cursor context
- ✅ **ONLY** consult `docs_archive/` for historical reference (if explicitly requested)

---

## Documentation Structure Freeze

**Status:** 🔒 **FROZEN**  
**Date:** 2025-01-27  
**Purpose:** Prevent structural drift and ensure all documentation changes respect canonical organization

### Freeze Declaration

The current structure of `docs/` directory is **FROZEN** and **CANONICAL**. This structure represents the single source of truth for documentation organization.

**The following top-level directories are FROZEN:**

1. **`docs/architecture/`** - Authority Contracts, Architecture Rules, Locks, and architectural guidelines
   - **Purpose:** Contains immutable LAW documents and active GUIDE documents
   - **Boundary:** Architecture rules and authority contracts ONLY
   - **Forbidden:** Reference documentation, reports, or service documents

2. **`docs/reference/`** - API references, integration guides, typing standards, and usage examples
   - **Purpose:** Developer-facing reference material
   - **Boundary:** API documentation, integration guides, typing standards ONLY
   - **Forbidden:** Architecture rules or internal service documents

3. **`docs/governance/`** - Governance review cycles and review templates
   - **Purpose:** Governance processes and review reports
   - **Boundary:** Governance workflows and review documentation ONLY
   - **Forbidden:** Architecture rules or primary reading route documents

4. **`docs/workflows/`** - Process workflows, checklists, and library maturity system
   - **Purpose:** Process definitions, workflows, and task management
   - **Boundary:** Workflow definitions and process documentation ONLY
   - **Forbidden:** Architecture rules or reference documentation

5. **`docs/reports/`** - Reports and audit documentation
   - **Purpose:** Historical reports and audit analyses
   - **Boundary:** Project reports and audit documentation ONLY
   - **Forbidden:** Primary reading route documents or architecture rules

6. **`docs/migrations/`** - Migration documentation
   - **Purpose:** Historical migration context and reports
   - **Boundary:** Migration documentation ONLY
   - **Forbidden:** Primary reading route documents or active architecture rules

7. **`docs/_internal/`** - Internal service documents (AI context only)
   - **Purpose:** AI/Assistant-specific context and documentation
   - **Boundary:** Service documents for AI context ONLY
   - **Forbidden:** Reader-facing documentation or architecture rules

8. **`docs/archive/`** - Archived documentation (if exists)
   - **Purpose:** Non-canonical, archived documentation
   - **Boundary:** Historical and deprecated documentation ONLY
   - **Forbidden:** Active canonical documentation

### Structural Change Policy

**CRITICAL RULE:** Any structural changes to `docs/` directory structure **MUST** be made through modification of this document (`DOCUMENTATION_CANON_LOCK.md`) first.

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

**Forbidden Without Lock Update:**

- ❌ Creating new top-level directories in `docs/`
- ❌ Moving documents between top-level directories
- ❌ Placing reader-facing documents in `_internal/`
- ❌ Placing architecture rules in `reference/`
- ❌ Placing reference documentation in `architecture/`
- ❌ Any structural change without first updating this lock document

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

- ✅ If a directory is listed here → it is canonical
- ❌ If a directory is not listed here → it is non-canonical
- ✅ If a document's placement is described here → it is correct
- ❌ If a document's placement contradicts this document → it is incorrect

**No structural change can be made unconsciously.** All changes must pass through this lock document.

---

## Naming Rules

Naming rules are **mandatory** and **strictly enforced**. All documentation must follow these patterns.

### Core Principles

1. **One semantic meaning → one canonical name pattern**
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
- `ARCHITECTURE_LOCK.md` - Architecture lock
- `ARCHITECTURE_STATE.md` - Architecture state

**Forbidden:**
- ❌ `INTERNAL_*` (internal detail)
- ❌ `FINAL_*` (historical marker)
- ❌ `CANONICAL_*` (redundant with context)
- ❌ `UI_*` prefix (redundant, all architecture is UI)

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
- ❌ `*_AUTHORITY_CONTRACT.md` (CONTRACT redundant with AUTHORITY)
- ❌ `TOKEN_AUTHORITY.md` (should be `TOKEN_AUTHORITY.md`)

#### Authority Navigation

**Pattern:** `AUTHORITY_NAVIGATION.md`

**Forbidden:**
- ❌ `AUTHORITY_NAVIGATION.md` (MAP is implementation detail)

#### Architecture Rules & Extension Guidelines

**Pattern:** `{DOMAIN}_RULES.md` or `{DOMAIN}_GUIDELINES.md` or `{DOMAIN}_STATE.md`

**Examples:**
- `ARCHITECTURE_RULES.md`
- `EXTENSION_STATE.md`
- `LINTING_STANDARD.md`

**Forbidden:**
- ❌ `ARCHITECTURE_RULES.md` (UI_ prefix redundant)
- ❌ `EXTENSION_STATE.md` (CANONICAL redundant)

#### AI/Assistant Behavior Rules

**Pattern:** `ASSISTANT_{PURPOSE}_RULES.md`

**Examples:**
- `ASSISTANT_RULES.md`
- `ASSISTANT_DEVELOPMENT_RULES.md`

**Forbidden:**
- ❌ `ASSISTANT_RULES.md` (TUI_ internal abbreviation, CURSOR tool-specific)
- ❌ `ASSISTANT_DEVELOPMENT_RULES.md` (CURSOR tool-specific, UI redundant)

#### Component Locks

**Pattern:** `{CATEGORY}_LOCK.md`

**Examples:**
- `LAYOUT_LOCK.md`
- `TEXT_LOCK.md`

**Rules:**
- ✅ Already follows standard pattern
- ✅ Category names must be clear

#### Progress & Task Management

**Pattern:** `PROJECT_PROGRESS.md` or `TASK_INDEX.md`

**Forbidden:**
- ❌ `master_task_index.md` (master_ is historical prefix)

#### Library Maturity & Growth Processes

**Pattern:** `{PROCESS}_PROCESS.md` or `{TOPIC}_WORKFLOW.md` or `{TOPIC}_INVENTORY.md` or `{TOPIC}_CHECKLIST.md`

**Examples:**
- `FEEDBACK_COLLECTION_PROCESS.md`
- `FEEDBACK_REVIEW_PROCESS.md`
- `COMPONENT_NEEDS_INVENTORY.md`
- `COMPONENT_CREATION_CHECKLIST.md`
- `COMPONENT_USAGE_TRACKING.md`

**Forbidden:**
- ❌ `EXTENSION_COMPONENT_CREATION_CHECKLIST.md` (EXTENSION_ prefix redundant)
- ❌ `USAGE_FEEDBACK_PROCESS.md` (should be `FEEDBACK_COLLECTION_PROCESS.md`)

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
- ❌ `public-api.md` (lowercase, no REFERENCE suffix)
- ❌ `design_tokens_export.md` (lowercase, no REFERENCE suffix)
- ❌ `token-map-overview.md` (lowercase, hyphen instead of underscore)
- ❌ `UI_COMPONENTS_INVENTORY.md` (UI_ prefix redundant)
- ❌ `UI_INTEGRATION.md` (UI_ redundant, should be GUIDE)
- ❌ `EXTENSION_COMPONENT_EXAMPLES.md` (EXTENSION_ prefix redundant)

#### Tooling & Standards

**Pattern:** `{TOOL}_STANDARD.md` or `{TOOL}_RULES.md` or `{TOOL}_DECISIONS.md`

**Examples:**
- `LINTING_STANDARD.md`
- `TYPING_STANDARD.md`
- `TOOLING_DECISIONS.md`

**Forbidden:**
- ❌ `LINTING_STANDARD.md` (should be STANDARD, not RULES)

#### Entry Points & Orientation

**Pattern:** `README.md` or `{AUDIENCE}_README.md` or `PROJECT_ORIENTATION.md`

**Examples:**
- `README.md` (standard)
- `ASSISTANT_README.md`
- `PROJECT_ORIENTATION.md`

**Forbidden:**
- ❌ `README_GPT.md` (GPT is tool-specific, should be ASSISTANT)
- ❌ `PROJECT_ORIENTATION.md` (CANONICAL redundant)

#### Exceptions & Special Cases

**Pattern:** `{TOPIC}_EXCEPTIONS.md` or `{TOPIC}_OVERVIEW.md`

**Examples:**
- `GRADIENT_EXCEPTIONS.md`
- `CI_CD_OVERVIEW.md`

**Forbidden:**
- ❌ `gradient_exceptions.md` (lowercase)
- ❌ `CI_CD_OVERVIEW.md` (hyphen instead of underscore)

### Case Standardization

- ✅ **UPPERCASE** for all canonical document names
- ❌ **lowercase** forbidden (except standard `README.md`)
- ✅ **Underscores** for word separation (`CI_CD_OVERVIEW.md`)
- ❌ **Hyphens** forbidden (`CI_CD_OVERVIEW.md` → `CI_CD_OVERVIEW.md`)

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

All 44 canonical documents are classified into four roles: **LAW**, **GUIDE**, **REFERENCE**, and **META**.

### LAW (Immutable Rules)

**Definition:** Documents that establish immutable, locked architectural rules. These documents have **LOCKED** or **IMMUTABLE** status and cannot be changed.

**Characteristics:**
- Define canonical scales, forbidden patterns, and component obligations
- Serve as single source of truth for domain decisions
- Override all other documentation for their domain
- Status: **LOCKED** or **IMMUTABLE**

**Documents (17 files):**

1. `docs/ARCHITECTURE_CONTEXT.md` - IMMUTABLE
2. `docs/architecture/FOUNDATION_LOCK.md` - LOCKED
3. `docs/architecture/ARCHITECTURE_LOCK.md` - LOCKED
4. `docs/architecture/ARCHITECTURE_STATE.md` - LOCKED
5. `docs/architecture/INTERACTION_AUTHORITY.md` - LOCKED
6. `docs/architecture/STATE_MATRIX.md` - LOCKED
7. `docs/architecture/STATE_AUTHORITY.md` - LOCKED
8. `docs/architecture/SPACING_AUTHORITY.md` - LOCKED
9. `docs/architecture/RADIUS_AUTHORITY.md` - LOCKED
10. `docs/architecture/TYPOGRAPHY_AUTHORITY.md` - LOCKED
11. `docs/architecture/MOTION_AUTHORITY.md` - LOCKED
12. `docs/architecture/ELEVATION_AUTHORITY.md` - LOCKED
13. `docs/architecture/LAYOUT_AUTHORITY.md` - LOCKED
14. `docs/architecture/TOKEN_AUTHORITY.md` - LOCKED
15. `docs/architecture/EXTENSION_AUTHORITY.md` - ACTIVE (but still LAW - defines Extension boundaries)
16. `docs/architecture/locks/LAYOUT_LOCK.md` - LOCKED
17. `docs/architecture/locks/TEXT_LOCK.md` - LOCKED

**Change Policy:** ❌ **FORBIDDEN** - LAW documents are immutable

### GUIDE (Active Development Guidelines)

**Definition:** Documents that provide active guidelines, rules, and processes for working within the architecture. These documents guide development but are not immutable.

**Characteristics:**
- Define how to work within the architecture
- Provide development guidelines and checklists
- Establish processes and workflows
- Status: **ACTIVE**

**Documents (15 files):**

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

**Change Policy:** ✅ **ALLOWED** with architectural review

### REFERENCE (API and Integration Documentation)

**Definition:** Documents that provide API references, integration guides, and usage examples for developers using the library.

**Characteristics:**
- Provide API references and documentation
- Integration guides and examples
- Component inventories and catalogs
- Developer-facing reference material
- Status: **ACTIVE**

**Documents (6 files):**

1. `docs/reference/API_REFERENCE.md` - Public API reference
2. `docs/reference/TOKENS_EXPORT_REFERENCE.md` - Design tokens export reference
3. `docs/reference/TOKENS_OVERVIEW.md` - Token map overview
4. `docs/reference/COMPONENTS_INVENTORY.md` - UI components inventory
5. `docs/reference/INTEGRATION_GUIDE.md` - UI integration guide
6. `docs/reference/COMPONENT_EXAMPLES.md` - Extension component examples

**Change Policy:** ✅ **ALLOWED** for accuracy updates and API changes

### META (Documentation About Documentation)

**Definition:** Documents that serve as entry points, track progress, or document the documentation system itself.

**Characteristics:**
- Provide documentation navigation
- Project orientation and current state
- Entry points for different audiences
- Documentation hub functionality
- Status: **ACTIVE**

**Documents (6 files):**

1. `docs/README.md` - Main README, documentation hub
2. `docs/ASSISTANT_README.md` - Assistant-specific README
3. `docs/PROJECT_ORIENTATION.md` - Canonical project orientation
4. `docs/PROJECT_PROGRESS.md` - Project progress tracking
5. `docs/workflows/tasks/TASK_INDEX.md` - Task index and navigation
6. `docs/CANONICAL_DOCUMENTATION_INVENTORY.md` - Documentation inventory
7. `docs/architecture/DOCUMENTATION_CANON_LOCK.md` - This document

**Change Policy:** ✅ **ALLOWED** for inventory updates and progress tracking

**Note:** `docs/architecture/CANONICAL_STATE_FINAL.md` is **ARCHIVED** and not counted in the 44 canonical documents.

---

## Change Policy

Changes to the documentation system are **strictly controlled**. This section defines when and how documentation can change.

### Adding New Canonical Documents

**Requirements:**
1. ✅ **Architectural decision required** - New documents must be justified architecturally
2. ✅ **Must follow naming rules** - Name must match mandatory pattern for semantic group
3. ✅ **Must be assigned to correct folder** - Placement must match folder purpose
4. ✅ **Must be classified into role** - Document must be LAW/GUIDE/REFERENCE/META
5. ✅ **Must be added to inventory** - `CANONICAL_DOCUMENTATION_INVENTORY.md` must be updated
6. ✅ **Must update this document** - If adding new folder or pattern, update this lock document

**Process:**
1. Propose new document with architectural justification
2. Verify naming follows canonical pattern
3. Verify folder placement is correct
4. Classify document role
5. Update `CANONICAL_DOCUMENTATION_INVENTORY.md`
6. Update this document if structure changes

### Modifying Existing Documents

#### LAW Documents

**Policy:** ❌ **FORBIDDEN**

**Rationale:** LAW documents are immutable. They define locked architectural rules that cannot change.

**Exception:** None. LAW documents are locked by definition.

#### GUIDE Documents

**Policy:** ✅ **ALLOWED** with architectural review

**Requirements:**
1. ✅ Changes must maintain architectural compliance
2. ✅ Changes must be reviewed for consistency
3. ✅ Changes must not violate LAW documents
4. ✅ Changes must update related documents if needed

**Process:**
1. Propose change with architectural justification
2. Review against LAW documents
3. Verify consistency with related GUIDE documents
4. Update cross-references if needed

#### REFERENCE Documents

**Policy:** ✅ **ALLOWED** for accuracy updates and API changes

**Requirements:**
1. ✅ Updates must reflect actual API/implementation
2. ✅ Updates must maintain accuracy
3. ✅ Updates must not introduce architectural rules (use GUIDE for that)

**Process:**
1. Update document to reflect current state
2. Verify accuracy against implementation
3. Update cross-references if needed

#### META Documents

**Policy:** ✅ **ALLOWED** for inventory updates and progress tracking

**Requirements:**
1. ✅ Updates must reflect current state
2. ✅ Inventory updates must be complete
3. ✅ Progress tracking must be accurate

**Process:**
1. Update document with current information
2. Verify completeness
3. Update cross-references if needed

### Renaming Documents

**Policy:** ❌ **FORBIDDEN** without architectural decision

**Requirements:**
1. ✅ Architectural decision required
2. ✅ Must update all links (especially `.cursor/rules/*.mdc` files)
3. ✅ Must update `CANONICAL_DOCUMENTATION_INVENTORY.md`
4. ✅ Must update this document if naming pattern changes
5. ✅ Must verify no broken links

**Process:**
1. Propose rename with architectural justification
2. Identify all files that reference the document
3. Update all references
4. Update inventory
5. Update this document if pattern changes
6. Verify no broken links

### Moving Documents

**Policy:** ❌ **FORBIDDEN** without architectural decision

**Requirements:**
1. ✅ Architectural decision required
2. ✅ Must update all links
3. ✅ Must verify folder placement matches purpose
4. ✅ Must update `CANONICAL_DOCUMENTATION_INVENTORY.md`

**Process:**
1. Propose move with architectural justification
2. Verify new folder matches document purpose
3. Update all references
4. Update inventory
5. Verify no broken links

### Deleting Documents

**Policy:** ❌ **FORBIDDEN** (archive instead)

**Requirements:**
1. ✅ Documents must be archived, not deleted
2. ✅ Move to `docs_archive/` if deprecated
3. ✅ Update `CANONICAL_DOCUMENTATION_INVENTORY.md` to mark as archived
4. ✅ Update all references to point to replacement or archive

**Process:**
1. Identify replacement document (if any)
2. Move document to `docs_archive/`
3. Update inventory to mark as archived
4. Update all references
5. Verify no broken links

---

## Enforcement

This documentation canon is **mandatory** and **strictly enforced**.

### AI/Cursor Assistant Requirements

AI/Cursor assistants **MUST**:
- ✅ Follow this canon when creating or modifying documentation
- ✅ Refuse tasks that violate naming rules
- ✅ Refuse tasks that violate folder structure
- ✅ Refuse tasks that modify LAW documents
- ✅ Verify compliance before creating new documentation
- ✅ Reference this document when documentation questions arise

AI/Cursor assistants **MUST NOT**:
- ❌ Create documentation that violates naming rules
- ❌ Place documentation in wrong folders
- ❌ Modify LAW documents
- ❌ Rename or move documents without architectural decision
- ❌ Create duplicate documentation

### Violation Handling

**When violations are detected:**
1. **REFUSE** the task immediately
2. **EXPLAIN** which rule was violated
3. **REFERENCE** this document
4. **SUGGEST** correct approach if possible

**No exceptions:** This canon applies to all documentation work without exception.

### Verification

Before completing any documentation task, verify:
- ✅ Naming follows canonical pattern
- ✅ Folder placement is correct
- ✅ Document role is classified
- ✅ Inventory is updated (if adding/modifying)
- ✅ All links are valid (if renaming/moving)
- ✅ No LAW documents are modified

---

## Summary

This document fixes the current documentation system as canonical:

- **44 canonical documents** organized into **12 semantic groups**
- **4 document roles:** LAW (17), GUIDE (15), REFERENCE (6), META (6)
- **Canonical folder structure** with clear purposes
- **Mandatory naming patterns** for each semantic group
- **Strict change policy** preventing drift and duplication

**This canon is LOCKED and must be followed for all documentation work.**

---

**Last Updated:** 2025-01-27  
**Status:** 🔒 **LOCKED**  
**Related Documents:**
- `docs/CANONICAL_DOCUMENTATION_INVENTORY.md` - Complete inventory of 44 documents
- `docs/DOCS_CANONICAL_NAMING_STANDARD.md` - Naming standard reference
- `docs/DOCS_SEMANTIC_GROUPING_REPORT.md` - Semantic grouping analysis
- `docs/architecture/FOUNDATION_LOCK.md` - Foundation layer lock
- `docs/architecture/ARCHITECTURE_LOCK.md` - Architecture lock

