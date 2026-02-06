# 📚 TUI Documentation

**Last Updated:** 2026-02-05  
**Purpose:** Central documentation hub for the TUI component library  
**Canonical List:** See `docs/CANONICAL_DOCUMENTATION_INVENTORY.md`

---

## ⚠️ Documentation Scope & Canonical Status

### Active Documentation (`docs/`)

**This directory (`docs/`) contains canonical and supporting documentation. The canonical list is defined in `docs/CANONICAL_DOCUMENTATION_INVENTORY.md`:**

- ✅ **Canonical Documents** - Canonical inventory and roles; authoritative decisions live in LAW documents
- ✅ **Authority Contracts** - Immutable Foundation and Extension authority rules
- ✅ **Architecture Rules** - Active architecture guidelines and locks
- ✅ **Reference Documentation** - Current API and integration references
- ✅ **Progress Tracking** - Active project progress and task management

**Only files listed in `docs/CANONICAL_DOCUMENTATION_INVENTORY.md` are canonical.**

### Archived Documentation (`docs_archive/`)

**⚠️ CRITICAL: `docs_archive/` is NOT source of truth and MUST NOT be used for canonical information.**

The `docs_archive/` directory contains:
- ❌ Historical reports and audits (one-time analysis)
- ❌ Legacy guides and outdated documentation
- ❌ Migration documentation (historical context only)
- ❌ Deprecated documents and code reviews
- ❌ Cursor/AI task results and experimental documents

**Rules:**
- ❌ **NEVER** use `docs_archive/` as source of truth
- ❌ **NEVER** reference archived documents for canonical rules
- ❌ **NEVER** use archived documents for canonical information
- ✅ **ALWAYS** use `docs/` for canonical information
- ✅ **ONLY** consult `docs_archive/` for historical reference (if explicitly requested)

**For canonical architecture, Authority rules, and active documentation, use ONLY `docs/` and the inventory.**

---

## 🎯 Canonical Entry Points

### Primary Entry Points (Start Here)

1. **[ARCHITECTURE_CONTEXT.md](./ARCHITECTURE_CONTEXT.md)**  
   → **IMMUTABLE** - Single source of truth for architecture, design decisions, Foundation vs Extension rules

2. **[architecture/FOUNDATION_LOCK.md](./architecture/FOUNDATION_LOCK.md)**  
   → **LOCKED** - Authoritative Foundation lock status (source of truth for locked Foundation layer)

3. **[PROJECT_ORIENTATION.md](./PROJECT_ORIENTATION.md)**  
   → **ACTIVE** - Canonical project orientation and current state

### Authority Contracts (Foundation - LOCKED)

All Foundation Authority Contracts are **LOCKED** and **IMMUTABLE**. **Foundation Enforcement** (className/style exclusion) is **LOCKED / APPLIED**:

- [INTERACTION_AUTHORITY.md](./architecture/INTERACTION_AUTHORITY.md) - Interaction state rules
- [STATE_MATRIX.md](./architecture/STATE_MATRIX.md) - Canonical state set
- [STATE_AUTHORITY.md](./architecture/STATE_AUTHORITY.md) - State token model
- [SPACING_AUTHORITY.md](./architecture/SPACING_AUTHORITY.md) - Spacing rules
- [RADIUS_AUTHORITY.md](./architecture/RADIUS_AUTHORITY.md) - Radius rules
- [TYPOGRAPHY_AUTHORITY.md](./architecture/TYPOGRAPHY_AUTHORITY.md) - Typography rules
- [MOTION_AUTHORITY.md](./architecture/MOTION_AUTHORITY.md) - Motion rules
- [ELEVATION_AUTHORITY.md](./architecture/ELEVATION_AUTHORITY.md) - Elevation rules
- [LAYOUT_AUTHORITY.md](./architecture/LAYOUT_AUTHORITY.md) - Layout rules
- [INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md](./architecture/INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md) - Interactive size scale rules
- [FOCUS_AUTHORITY.md](./architecture/FOCUS_AUTHORITY.md) - Focus navigation mechanics (trap, restore, tab order, focus-visible indication)
- [A11Y_AUTHORITY.md](./architecture/A11Y_AUTHORITY.md) - Accessibility requirements (semantic roles, aria-* as API, keyboard-only operability, accessible names)
- [INPUT_AUTHORITY.md](./architecture/INPUT_AUTHORITY.md) - Input component contract (form controls, validation, keyboard parity)
- [TOKEN_AUTHORITY.md](./architecture/TOKEN_AUTHORITY.md) - Token system rules
- [TYPOGRAPHY_CONTRACT.md](./architecture/TYPOGRAPHY_CONTRACT.md) - Typography foundation contract (contrast, rhythm, font supply)

### Extension Authority

- [EXTENSION_AUTHORITY.md](./architecture/EXTENSION_AUTHORITY.md) - Extension layer boundary contract (ACTIVE)

### Extension Layer (architecture/extension/)

- [EXTENSION_CAPABILITY_MAP.md](./architecture/extension/EXTENSION_CAPABILITY_MAP.md) - Extension Layer capability map (Hero, overlay, layout capabilities)
- [HEROMEDIA_CANON.md](./architecture/extension/HEROMEDIA_CANON.md) - HeroMedia canonical capability definition (design-locked)

### Authority Navigation

- [AUTHORITY_NAVIGATION.md](./architecture/AUTHORITY_NAVIGATION.md) - Navigation map for Authority system

### Architecture Rules & Locks

- [ARCHITECTURE_LOCK.md](./architecture/ARCHITECTURE_LOCK.md) - UI architecture lock
- [EXTENSION_STATE.md](./architecture/EXTENSION_STATE.md) - Extension layer canonical state
- [FOUNDATION_CONTRACT.md](./architecture/FOUNDATION_CONTRACT.md) - 🔒 **FINAL/APPLIED** Foundation component contract (Foundation Enforcement is LOCKED)
- [FOUNDATION_COMPONENT_SCOPE.md](./architecture/FOUNDATION_COMPONENT_SCOPE.md) - 🔒 **FINAL/APPLIED** Foundation component scope
- [ARCHITECTURE_RULES.md](./architecture/ARCHITECTURE_RULES.md) - UI architecture rules
- [ASSISTANT_RULES.md](./architecture/ASSISTANT_RULES.md) - Cursor guard rules
- [ASSISTANT_DEVELOPMENT_RULES.md](./architecture/ASSISTANT_DEVELOPMENT_RULES.md) - Cursor AI rules for UI development
- [LINTING_STANDARD.md](./architecture/LINTING_STANDARD.md) - Linting standards
- [TOOLING_DECISIONS.md](./architecture/TOOLING_DECISIONS.md) - Tooling decisions

### Closed System v2 Documentation

**Status:** ✅ **CANONICAL** - Closed System v2 is finalized and locked (Phase F complete)

- [architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md](./architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md) - **Canonical index** - Single source of truth for Closed System v2 documentation
- [architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md](./architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md) - **Why the system is closed** - System closure rationale, problem classes prevented, change control policy
- [architecture/closed-system/CONSUMER_LAYOUT_GUIDE.md](./architecture/closed-system/CONSUMER_LAYOUT_GUIDE.md) - **Consumer Layout Guide** - Normative consumer usage rules (no className/style on UI components)
- [architecture/closed-system/DOM_BOUNDARY_COMPONENTS.md](./architecture/closed-system/DOM_BOUNDARY_COMPONENTS.md) - **DOM boundary** - Fixed DOM-boundary component list (canonical)
- [architecture/closed-system/CLOSED_SYSTEM_V2_CANONICAL_PROBLEM_DEFINITION.md](./architecture/closed-system/CLOSED_SYSTEM_V2_CANONICAL_PROBLEM_DEFINITION.md) - Phase A: Problem definition
- [architecture/closed-system/CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md](./architecture/closed-system/CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md) - Phase B: Architecture model and principles
- [architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_F_LOCK.md](./architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_F_LOCK.md) - Phase F: Lock declaration (current phase status)

**All canonical documents are immutable after merge. See the canonical index for complete documentation set.**

### Component Locks

- [architecture/locks/A11Y_LOCK.md](./architecture/locks/A11Y_LOCK.md) - A11Y system lock (accessibility, contrast, WCAG 2.1 AA)
- [architecture/locks/BUTTON_LINK_LOCK.md](./architecture/locks/BUTTON_LINK_LOCK.md) - Button, IconButton, Link Foundation lock
- [architecture/locks/CAROUSEL_LOCK.md](./architecture/locks/CAROUSEL_LOCK.md) - Carousel Extension lock
- [architecture/locks/FOCUS_LOCK.v1.1.md](./architecture/locks/FOCUS_LOCK.v1.1.md) - Focus system lock
- [architecture/locks/HEROMEDIA_LOCK.md](./architecture/locks/HEROMEDIA_LOCK.md) - HeroMedia Extension lock (Phase L)
- [architecture/locks/INPUT_LOCK.md](./architecture/locks/INPUT_LOCK.md) - Input system lock
- [architecture/locks/LAYOUT_LOCK.md](./architecture/locks/LAYOUT_LOCK.md) - Layout primitives and Extension Layout components lock
- [architecture/locks/MODAL_CONTEXTMENU_TOAST_LOCK.md](./architecture/locks/MODAL_CONTEXTMENU_TOAST_LOCK.md) - Modal, ContextMenu, Toast Foundation overlays lock
- [architecture/locks/MOTION_LOCK.md](./architecture/locks/MOTION_LOCK.md) - Motion system lock (tokens, presets)
- [architecture/locks/OVERLAYSLOT_LOCK.md](./architecture/locks/OVERLAYSLOT_LOCK.md) - OverlaySlot Extension lock (Phase L)
- [architecture/locks/RUNTIME_UTILITIES_LOCK.md](./architecture/locks/RUNTIME_UTILITIES_LOCK.md) - Runtime utilities lock (tokenCVA, cn - TUNG-028)
- [architecture/locks/SELECT_LOCK.md](./architecture/locks/SELECT_LOCK.md) - Select Foundation lock
- [architecture/locks/TABS_LOCK.md](./architecture/locks/TABS_LOCK.md) - Tabs Foundation lock
- [architecture/locks/TEXT_LOCK.md](./architecture/locks/TEXT_LOCK.md) - Text/typography components lock
- [architecture/locks/TOOLTIP_POPOVER_LOCK.md](./architecture/locks/TOOLTIP_POPOVER_LOCK.md) - Tooltip, Popover, HoverCard lock

### Progress & Project Management

- [PROJECT_PROGRESS.md](./PROJECT_PROGRESS.md) - Project progress tracking (canonical progress file)
- [workflows/tasks/TASK_INDEX.md](./workflows/tasks/TASK_INDEX.md) - Master task index and navigation

### Library Maturity Growth System

- [workflows/tasks/COMPONENT_NEEDS_INVENTORY.md](./workflows/tasks/COMPONENT_NEEDS_INVENTORY.md) - Component needs tracking and prioritization
- [workflows/tasks/COMPONENT_CREATION_CHECKLIST.md](./workflows/tasks/COMPONENT_CREATION_CHECKLIST.md) - Extension component creation checklist
- [workflows/foundation/COMPONENT_REFACTORING_PIPELINE.md](./workflows/foundation/COMPONENT_REFACTORING_PIPELINE.md) - **Component Refactoring Pipeline (18A)** - Canonical process for refactoring existing components
- [workflows/tasks/FEEDBACK_COLLECTION_PROCESS.md](./workflows/tasks/FEEDBACK_COLLECTION_PROCESS.md) - Usage feedback collection process
- [workflows/tasks/FEEDBACK_REVIEW_PROCESS.md](./workflows/tasks/FEEDBACK_REVIEW_PROCESS.md) - Feedback review and decision process
- [workflows/tasks/COMPONENT_USAGE_TRACKING.md](./workflows/tasks/COMPONENT_USAGE_TRACKING.md) - Component usage tracking

### Reference Documentation

- [reference/DX_OVERVIEW.md](./reference/DX_OVERVIEW.md) - **Developer experience (DX)** - Entry point for usage and how-to (Foundation, Layout, Typography, Token guides)
- [reference/API_REFERENCE.md](./reference/API_REFERENCE.md) - Public API reference
- [reference/TOKENS_EXPORT_REFERENCE.md](./reference/TOKENS_EXPORT_REFERENCE.md) - Design tokens export reference
- [reference/TOKENS_OVERVIEW.md](./reference/TOKENS_OVERVIEW.md) - Token map overview
- [reference/COMPONENTS_INVENTORY.md](./reference/COMPONENTS_INVENTORY.md) - UI components inventory
- [reference/INTEGRATION_GUIDE.md](./reference/INTEGRATION_GUIDE.md) - UI integration guide
- [reference/THEMEPARAMS_CSP_AND_ESLINT_ENV.md](./reference/THEMEPARAMS_CSP_AND_ESLINT_ENV.md) - Tooling/infrastructure: FOUC prevention, CSP nonce, ESLint source-root detection
- [reference/COMPONENT_EXAMPLES.md](./reference/COMPONENT_EXAMPLES.md) - Extension component examples and patterns
- [reference/TYPING_STANDARD.md](./reference/TYPING_STANDARD.md) - Typing standards
- [reference/MOTION_ANIMATIONS_GUIDE.md](./reference/MOTION_ANIMATIONS_GUIDE.md) - Motion animations working guide (implementation, troubleshooting, common pitfalls)
- [reference/GRADIENT_EXCEPTIONS.md](./reference/GRADIENT_EXCEPTIONS.md) - Gradient exceptions documentation

### CI/CD

- [CI_CD_OVERVIEW.md](./CI_CD_OVERVIEW.md) - CI/CD overview

### Assistant Context

- [ASSISTANT_README.md](./ASSISTANT_README.md) - GPT-specific context reference

---

## 📁 Documentation Structure

This directory contains canonical and supporting documentation. The canonical list is defined in `docs/CANONICAL_DOCUMENTATION_INVENTORY.md`:

```
docs/
├── architecture/            # LAW documents: Authority Contracts, Architecture Rules, Locks
│   ├── locks/              # Component lock documents (15 files)
│   ├── *_AUTHORITY.md      # Foundation Authority Contracts (LOCKED)
│   ├── EXTENSION_AUTHORITY.md  # Extension boundary contract
│   ├── FOUNDATION_LOCK.md  # Foundation lock status (source of truth)
│   ├── ARCHITECTURE_LOCK.md  # Architecture lock
│   ├── ARCHITECTURE_RULES.md  # Architecture rules
│   └── ...                 # Other architecture rules and locks
├── reference/              # Reference documentation: API, integration, typing standards
│   ├── API_REFERENCE.md
│   ├── TOKENS_EXPORT_REFERENCE.md
│   ├── TYPING_STANDARD.md
│   ├── GRADIENT_EXCEPTIONS.md
│   └── ...                 # Other reference documents
├── workflows/              # Processes and workflows
│   ├── tasks/              # Task management, component needs, feedback processes
│   └── foundation/         # Foundation processes
├── governance/              # Governance processes and reviews
├── reports/                # Reports and audits
│   └── audit/              # Audit reports
├── migrations/             # Migration documentation
└── _internal/              # Internal service documents
    └── ai/                 # AI/Assistant context
├── ARCHITECTURE_CONTEXT.md  # Single source of truth (IMMUTABLE)
├── PROJECT_ORIENTATION.md  # Project orientation
├── PROJECT_PROGRESS.md     # Project progress tracker
├── CI_CD_OVERVIEW.md       # CI/CD overview
├── README.md               # This file
└── ASSISTANT_README.md     # GPT-specific context
```

**Note:** Historical reports, audits, legacy guides, and deprecated documentation have been moved to `docs_archive/` (excluded from git and canonical information).

---

## 🚀 Quick Start Guide

### For Assistants

1. **Start with:** [ARCHITECTURE_CONTEXT.md](./ARCHITECTURE_CONTEXT.md) - Single source of truth
2. **Check Foundation status:** [architecture/FOUNDATION_LOCK.md](./architecture/FOUNDATION_LOCK.md)
3. **Consult Authority Contracts:** [architecture/AUTHORITY_NAVIGATION.md](./architecture/AUTHORITY_NAVIGATION.md) for navigation
4. **Verify component status:** [architecture/EXTENSION_STATE.md](./architecture/EXTENSION_STATE.md)
5. **Closed System v2:** [architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md](./architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md) - Canonical documentation index
6. **Consumer Layout Guide:** [architecture/closed-system/CONSUMER_LAYOUT_GUIDE.md](./architecture/closed-system/CONSUMER_LAYOUT_GUIDE.md) - Normative consumer usage rules

### For Developers

1. **Architecture:** [ARCHITECTURE_CONTEXT.md](./ARCHITECTURE_CONTEXT.md)
2. **Foundation Lock:** [architecture/FOUNDATION_LOCK.md](./architecture/FOUNDATION_LOCK.md)
3. **Task Management:** [workflows/tasks/TASK_INDEX.md](./workflows/tasks/TASK_INDEX.md)
4. **Progress:** [PROJECT_PROGRESS.md](./PROJECT_PROGRESS.md)

### For API Reference

1. **Public API:** [reference/API_REFERENCE.md](./reference/API_REFERENCE.md)
2. **Integration:** [reference/INTEGRATION_GUIDE.md](./reference/INTEGRATION_GUIDE.md)
3. **Components:** [reference/COMPONENTS_INVENTORY.md](./reference/COMPONENTS_INVENTORY.md)
4. **Tokens:** [reference/TOKENS_EXPORT_REFERENCE.md](./reference/TOKENS_EXPORT_REFERENCE.md)

---

## 📋 Architecture Overview

TUI follows a two-layer architecture:

### Foundation Layer (Locked)

The Foundation layer consists of immutable components that serve as the sole canonical foundation. All Foundation Authority Contracts are **LOCKED** and **IMMUTABLE**.

See [FOUNDATION_LOCK.md](./architecture/FOUNDATION_LOCK.md) for complete architecture rules and lock status.

### Extension Layer

Extension components are composable and may use Foundation components internally. They provide domain-specific functionality and can be created, modified, or deleted without affecting the Foundation layer.

See [EXTENSION_AUTHORITY.md](./architecture/EXTENSION_AUTHORITY.md) for Extension layer rules.

### Closed System v2

Closed System v2 is the architectural model that ensures system closure across Foundation, COMPOSITION, and Extension layers. All phases (A-F) are **COMPLETE** and **LOCKED**.

See [architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md](./architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md) for complete canonical documentation. Consumer usage rules live in [architecture/closed-system/CONSUMER_LAYOUT_GUIDE.md](./architecture/closed-system/CONSUMER_LAYOUT_GUIDE.md).

---

## 🔄 Documentation Updates

### When to Update

- After completing any Master Task → Update [PROJECT_PROGRESS.md](./PROJECT_PROGRESS.md)
- After creating new components → Update [reference/COMPONENTS_INVENTORY.md](./reference/COMPONENTS_INVENTORY.md)
- After architecture changes → Update [ARCHITECTURE_CONTEXT.md](./ARCHITECTURE_CONTEXT.md) (if explicitly approved)

### Update Process

1. Make changes to documentation files
2. Update [PROJECT_PROGRESS.md](./PROJECT_PROGRESS.md) with completion status
3. Commit changes with descriptive message

**Note:** Authority Contracts and Canonical documents require explicit approval for modifications.

---

## 📖 Documentation Standards

### Markdown Format

- Use standard Markdown syntax
- Include frontmatter with metadata (date, version, purpose)
- Use consistent heading hierarchy
- Include table of contents for long documents

### Cross-References

- Use relative paths for internal links
- Update links when files are moved
- All links in this README point to canonical documents only

### Version Control

- All documentation is version controlled
- Use semantic versioning for major documents
- Include version numbers in document headers

### Structure Interpretation Rules

**Single Source of Truth for Documentation Structure:**

The structure of `docs/` directory is **CANONICAL** and **controlled**. All structural questions must be resolved by reference to:

- **[architecture/DOCUMENTATION_CANON_LOCK.md](./architecture/DOCUMENTATION_CANON_LOCK.md)** - **Single source of truth** for documentation structure, naming rules, and organization

**Rules:**
- ✅ If a directory is listed in `DOCUMENTATION_CANON_LOCK.md` → it is canonical
- ❌ If a directory is not listed → it is non-canonical
- ✅ If a document's placement is described → it is correct
- ❌ If a document's placement contradicts the lock → it is incorrect

**Structural Changes:**
- Any structural changes to `docs/` **MUST** be made through modification of `DOCUMENTATION_CANON_LOCK.md` first
- Creating new top-level directories without updating the lock is **FORBIDDEN**
- Moving documents between sections without updating the lock is **FORBIDDEN**

See [architecture/DOCUMENTATION_CANON_LOCK.md](./architecture/DOCUMENTATION_CANON_LOCK.md) for complete structure freeze rules and enforcement.

---

## 📞 Support

For questions about documentation:

- Check the relevant canonical document from the entry points above
- Review [ARCHITECTURE_CONTEXT.md](./ARCHITECTURE_CONTEXT.md) for architecture questions
- Check [PROJECT_PROGRESS.md](./PROJECT_PROGRESS.md) for current status
- Consult [workflows/tasks/TASK_INDEX.md](./workflows/tasks/TASK_INDEX.md) for task overview

**Remember:** Use ONLY `docs/` for canonical information. `docs_archive/` is NOT source of truth.

---

**Last Updated:** 2026-01-29  
**Documentation Version:** 3.2  
**Canonical Documents:** See `docs/CANONICAL_DOCUMENTATION_INVENTORY.md`  
**Archive Status:** Isolated (excluded from git and canonical information)

### Library Maturity Growth System

The library now includes a comprehensive system for controlled growth:
- Component needs identification and tracking
- Extension component creation templates and tools
- Usage feedback collection and review processes
- Enhanced Storybook DX with a11y testing and token display
- Automated component request triage workflow

See [workflows/tasks/COMPONENT_NEEDS_INVENTORY.md](./workflows/tasks/COMPONENT_NEEDS_INVENTORY.md) for details.
