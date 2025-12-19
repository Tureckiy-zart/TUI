# 📚 TUI Documentation

**Last Updated:** 2025-12-19  
**Purpose:** Central documentation hub for the TUI component library  
**Total Files:** 44 (all canonical and authoritative)

---

## ⚠️ Documentation Scope & Canonical Status

### Active Documentation (`docs/`)

**This directory (`docs/`) contains ONLY canonical, authoritative, and active documentation (44 files):**

- ✅ **Canonical Documents** - Single source of truth for architecture and decisions
- ✅ **Authority Contracts** - Immutable Foundation and Extension authority rules
- ✅ **Architecture Rules** - Active architecture guidelines and locks
- ✅ **Reference Documentation** - Current API and integration references
- ✅ **Progress Tracking** - Active project progress and task management

**All files in `docs/` are considered ACTIVE and CANONICAL.**

### Archived Documentation (`docs_archive/`)

**⚠️ CRITICAL: `docs_archive/` is NOT source of truth and MUST NOT be used for canonical context.**

The `docs_archive/` directory contains:
- ❌ Historical reports and audits (one-time analysis)
- ❌ Legacy guides and outdated documentation
- ❌ Migration documentation (historical context only)
- ❌ Deprecated documents and code reviews
- ❌ Cursor/AI task results and experimental documents

**Rules:**
- ❌ **NEVER** use `docs_archive/` as source of truth
- ❌ **NEVER** reference archived documents for canonical rules
- ❌ **NEVER** use archived documents for AI/Cursor context
- ✅ **ALWAYS** use `docs/` for canonical and authoritative information
- ✅ **ONLY** consult `docs_archive/` for historical reference (if explicitly requested)

**For canonical architecture, Authority rules, and active documentation, use ONLY `docs/`.**

---

## 🎯 Canonical Entry Points

### Primary Entry Points (Start Here)

1. **[INTERNAL_CANONICAL_CONTEXT.md](./INTERNAL_CANONICAL_CONTEXT.md)**  
   → **IMMUTABLE** - Single source of truth for architecture, design decisions, Foundation vs Extension rules

2. **[architecture/FINAL_FOUNDATION_LOCK.md](./architecture/FINAL_FOUNDATION_LOCK.md)**  
   → **LOCKED** - Authoritative Foundation lock status (source of truth for locked Foundation layer)

3. **[CANONICAL_PROJECT_ORIENTATION.md](./CANONICAL_PROJECT_ORIENTATION.md)**  
   → **ACTIVE** - Canonical project orientation and current state

### Authority Contracts (Foundation - LOCKED)

All Foundation Authority Contracts are **LOCKED** and **IMMUTABLE**. **Foundation Enforcement** (className/style exclusion) is **LOCKED / APPLIED**:

- [INTERACTION_AUTHORITY_CONTRACT.md](./architecture/INTERACTION_AUTHORITY_CONTRACT.md) - Interaction state rules
- [STATE_AUTHORITY_MATRIX.md](./architecture/STATE_AUTHORITY_MATRIX.md) - Canonical state set
- [STATE_AUTHORITY_CONTRACT.md](./architecture/STATE_AUTHORITY_CONTRACT.md) - State token model
- [SPACING_AUTHORITY_CONTRACT.md](./architecture/SPACING_AUTHORITY_CONTRACT.md) - Spacing rules
- [RADIUS_AUTHORITY_CONTRACT.md](./architecture/RADIUS_AUTHORITY_CONTRACT.md) - Radius rules
- [TYPOGRAPHY_AUTHORITY_CONTRACT.md](./architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md) - Typography rules
- [MOTION_AUTHORITY_CONTRACT.md](./architecture/MOTION_AUTHORITY_CONTRACT.md) - Motion rules
- [ELEVATION_AUTHORITY_CONTRACT.md](./architecture/ELEVATION_AUTHORITY_CONTRACT.md) - Elevation rules
- [LAYOUT_AUTHORITY_CONTRACT.md](./architecture/LAYOUT_AUTHORITY_CONTRACT.md) - Layout rules
- [INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md](./architecture/INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md) - Interactive size scale rules
- [TOKEN_SYSTEM.md](./architecture/TOKEN_SYSTEM.md) - Token system rules

### Extension Authority

- [EXTENSION_AUTHORITY_CONTRACT.md](./architecture/EXTENSION_AUTHORITY_CONTRACT.md) - Extension layer boundary contract (ACTIVE)

### Authority Navigation

- [AUTHORITY_MAP.md](./architecture/AUTHORITY_MAP.md) - Navigation map for Authority system

### Architecture Rules & Locks

- [UI_ARCHITECTURE_LOCK.md](./architecture/UI_ARCHITECTURE_LOCK.md) - UI architecture lock
- [EXTENSION_CANONICAL_STATE.md](./architecture/EXTENSION_CANONICAL_STATE.md) - Extension layer canonical state
- [FOUNDATION_CONTRACT.md](./architecture/FOUNDATION_CONTRACT.md) - 🔒 **FINAL/APPLIED** Foundation component contract (Foundation Enforcement is LOCKED)
- [FOUNDATION_COMPONENT_SCOPE.md](./architecture/FOUNDATION_COMPONENT_SCOPE.md) - 🔒 **FINAL/APPLIED** Foundation component scope
- [UI_ARCHITECTURE_RULES.md](./architecture/UI_ARCHITECTURE_RULES.md) - UI architecture rules
- [TUI_CURSOR_GUARD_RULES.md](./architecture/TUI_CURSOR_GUARD_RULES.md) - Cursor guard rules
- [CURSOR_UI_RULES.md](./architecture/CURSOR_UI_RULES.md) - Cursor AI rules for UI development
- [LINTING_RULES.md](./architecture/LINTING_RULES.md) - Linting standards
- [TOOLING_DECISIONS.md](./architecture/TOOLING_DECISIONS.md) - Tooling decisions

### Component Locks

- [locks/LAYOUT_LOCK.md](./locks/LAYOUT_LOCK.md) - Layout primitives lock
- [locks/TEXT_LOCK.md](./locks/TEXT_LOCK.md) - Text/typography components lock

### Progress & Project Management

- [PROJECT_PROGRESS.md](./PROJECT_PROGRESS.md) - Project progress tracking (canonical progress file)
- [tasks/master_task_index.md](./tasks/master_task_index.md) - Master task index and navigation

### Library Maturity Growth System

- [tasks/COMPONENT_NEEDS_INVENTORY.md](./tasks/COMPONENT_NEEDS_INVENTORY.md) - Component needs tracking and prioritization
- [tasks/EXTENSION_COMPONENT_CREATION_CHECKLIST.md](./tasks/EXTENSION_COMPONENT_CREATION_CHECKLIST.md) - Extension component creation checklist
- [tasks/USAGE_FEEDBACK_PROCESS.md](./tasks/USAGE_FEEDBACK_PROCESS.md) - Usage feedback collection process
- [tasks/FEEDBACK_REVIEW_PROCESS.md](./tasks/FEEDBACK_REVIEW_PROCESS.md) - Feedback review and decision process
- [tasks/COMPONENT_USAGE_TRACKING.md](./tasks/COMPONENT_USAGE_TRACKING.md) - Component usage tracking

### Reference Documentation

- [reference/public-api.md](./reference/public-api.md) - Public API reference
- [reference/design_tokens_export.md](./reference/design_tokens_export.md) - Design tokens export reference
- [reference/token-map-overview.md](./reference/token-map-overview.md) - Token map overview
- [reference/UI_COMPONENTS_INVENTORY.md](./reference/UI_COMPONENTS_INVENTORY.md) - UI components inventory
- [reference/UI_INTEGRATION.md](./reference/UI_INTEGRATION.md) - UI integration guide
- [reference/EXTENSION_COMPONENT_EXAMPLES.md](./reference/EXTENSION_COMPONENT_EXAMPLES.md) - Extension component examples and patterns

### Structure & Standards

- [structure/TYPING_STANDARD.md](./structure/TYPING_STANDARD.md) - Typing standards

### UI Exceptions

- [ui/gradient_exceptions.md](./ui/gradient_exceptions.md) - Gradient exceptions documentation

### CI/CD

- [CI-CD_OVERVIEW.md](./CI-CD_OVERVIEW.md) - CI/CD overview

### AI Context

- [README_GPT.md](./README_GPT.md) - GPT-specific context reference

---

## 📁 Documentation Structure

This directory contains **ONLY canonical and active documentation** (44 files total):

```
docs/
├── architecture/            # Authority Contracts, Architecture Rules, Locks (20 files)
│   ├── *_AUTHORITY_CONTRACT.md  # Foundation Authority Contracts (LOCKED)
│   ├── EXTENSION_AUTHORITY_CONTRACT.md  # Extension boundary contract
│   ├── FINAL_FOUNDATION_LOCK.md  # Foundation lock status (source of truth)
│   ├── UI_ARCHITECTURE_LOCK.md  # Architecture lock
│   ├── UI_ARCHITECTURE_RULES.md  # Architecture rules
│   └── ...                 # Other architecture rules and locks
├── locks/                   # Component lock documents (2 files)
├── reference/              # API reference and technical documentation (6 files)
├── structure/              # Typing standards (1 file)
├── tasks/                  # Task management, component needs, feedback processes (6 files)
├── ui/                     # UI-specific documentation (1 file)
├── INTERNAL_CANONICAL_CONTEXT.md  # Single source of truth (IMMUTABLE)
├── CANONICAL_PROJECT_ORIENTATION.md  # Project orientation
├── PROJECT_PROGRESS.md     # Project progress tracker
├── CI-CD_OVERVIEW.md       # CI/CD overview
├── README.md               # This file
└── README_GPT.md          # GPT-specific context
```

**Note:** Historical reports, audits, legacy guides, and deprecated documentation have been moved to `docs_archive/` (excluded from git and AI context).

---

## 🚀 Quick Start Guide

### For AI/Cursor Assistants

1. **Start with:** [INTERNAL_CANONICAL_CONTEXT.md](./INTERNAL_CANONICAL_CONTEXT.md) - Single source of truth
2. **Check Foundation status:** [architecture/FINAL_FOUNDATION_LOCK.md](./architecture/FINAL_FOUNDATION_LOCK.md)
3. **Consult Authority Contracts:** [architecture/AUTHORITY_MAP.md](./architecture/AUTHORITY_MAP.md) for navigation
4. **Verify component status:** [architecture/EXTENSION_CANONICAL_STATE.md](./architecture/EXTENSION_CANONICAL_STATE.md)

### For Developers

1. **Architecture:** [INTERNAL_CANONICAL_CONTEXT.md](./INTERNAL_CANONICAL_CONTEXT.md)
2. **Foundation Lock:** [architecture/FINAL_FOUNDATION_LOCK.md](./architecture/FINAL_FOUNDATION_LOCK.md)
3. **Task Management:** [tasks/master_task_index.md](./tasks/master_task_index.md)
4. **Progress:** [PROJECT_PROGRESS.md](./PROJECT_PROGRESS.md)

### For API Reference

1. **Public API:** [reference/public-api.md](./reference/public-api.md)
2. **Integration:** [reference/UI_INTEGRATION.md](./reference/UI_INTEGRATION.md)
3. **Components:** [reference/UI_COMPONENTS_INVENTORY.md](./reference/UI_COMPONENTS_INVENTORY.md)
4. **Tokens:** [reference/design_tokens_export.md](./reference/design_tokens_export.md)

---

## 📋 Architecture Overview

TUI follows a two-layer architecture:

### Foundation Layer (Locked)

The Foundation layer consists of immutable components that serve as the sole canonical foundation. All Foundation Authority Contracts are **LOCKED** and **IMMUTABLE**.

See [FINAL_FOUNDATION_LOCK.md](./architecture/FINAL_FOUNDATION_LOCK.md) for complete architecture rules and lock status.

### Extension Layer

Extension components are composable and may use Foundation components internally. They provide domain-specific functionality and can be created, modified, or deleted without affecting the Foundation layer.

See [EXTENSION_AUTHORITY_CONTRACT.md](./architecture/EXTENSION_AUTHORITY_CONTRACT.md) for Extension layer rules.

---

## 🔄 Documentation Updates

### When to Update

- After completing any Master Task → Update [PROJECT_PROGRESS.md](./PROJECT_PROGRESS.md)
- After creating new components → Update [reference/UI_COMPONENTS_INVENTORY.md](./reference/UI_COMPONENTS_INVENTORY.md)
- After architecture changes → Update [INTERNAL_CANONICAL_CONTEXT.md](./INTERNAL_CANONICAL_CONTEXT.md) (if explicitly approved)

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

---

## 📞 Support

For questions about documentation:

- Check the relevant canonical document from the entry points above
- Review [INTERNAL_CANONICAL_CONTEXT.md](./INTERNAL_CANONICAL_CONTEXT.md) for architecture questions
- Check [PROJECT_PROGRESS.md](./PROJECT_PROGRESS.md) for current status
- Consult [tasks/master_task_index.md](./tasks/master_task_index.md) for task overview

**Remember:** Use ONLY `docs/` for canonical information. `docs_archive/` is NOT source of truth.

---

**Last Updated:** 2025-12-19  
**Documentation Version:** 3.2  
**Total Canonical Files:** 44  
**Archive Status:** Isolated (excluded from git and AI context)

### Library Maturity Growth System

The library now includes a comprehensive system for controlled growth:
- Component needs identification and tracking
- Extension component creation templates and tools
- Usage feedback collection and review processes
- Enhanced Storybook DX with a11y testing and token display
- Automated component request triage workflow

See [tasks/COMPONENT_NEEDS_INVENTORY.md](./tasks/COMPONENT_NEEDS_INVENTORY.md) for details.
