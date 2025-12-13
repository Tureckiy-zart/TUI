# 📚 TUI Documentation

**Last Updated:** 2025-12-12  
**Purpose:** Central documentation hub for the TUI component library

---

## 📁 Documentation Structure

This directory contains all project documentation organized into logical sections:

```
docs/
├── guides/                  # User guides and tutorials
├── reference/               # API reference and technical documentation
├── reports/                 # Current and historical reports
│   └── current/            # Active and recent reports
├── archive/                 # Archived documentation
│   └── reports/            # Historical reports by category
├── migration/               # Migration guides and documentation
├── tenerife_audit/         # Design system and audit documentation
├── structure/              # Architecture and structure documentation
├── tasks/                  # Task management and indexes
├── reviews/                # Code review documentation
├── review/                 # Review documentation
├── core/                   # Core context documentation
├── ui/                     # UI-specific documentation
├── PROJECT_PROGRESS.md     # Project progress tracker
└── README.md               # This file
```

---

## 📂 Directory Overview

### `/guides`

User guides, tutorials, and best practices:

- `GETTING_STARTED.md` - Getting started guide
- `QUICK_START.md` - Quick start tutorial
- `INSTALLATION.md` - Installation instructions
- `USAGE.md` - Usage guide
- `THEME_GUIDE.md` - Theme system guide
- `TOKENS_GUIDE.md` - Design tokens guide
- `COMPONENT_EXAMPLES.md` - Component usage examples
- `ANIMATION_GUIDELINES.md` - Animation guidelines
- `a11y_guidelines.md` - Accessibility guidelines
- `TUI_TESTING_GUIDE.md` - Testing guide
- `GRID.md` - Grid system documentation
- `props-guidelines.md` - Props guidelines

**Status:** ✅ All guides organized and up to date.

---

### `/reference`

API reference and technical documentation:

- `public-api.md` - Complete public API reference
- `UI_INTEGRATION.md` - UI integration guide
- `UI_COMPONENTS_INVENTORY.md` - Components inventory
- `design_tokens_export.md` - Design tokens export documentation
- `token-map-overview.md` - Token mapping overview

**Status:** ✅ Reference documentation organized.

---

### `/reports`

Audit reports, changelog, and project reports:

- `current/` - Active and recent reports
  - `TUI_200_DOCS_V3_*.md` - Documentation v3 audit reports
  - `D6_ADAPTER_LAYER_COMPLETE_REPORT.md` - Adapter layer report
- Historical reports (various audit and completion reports)

**Status:** ✅ Reports organized with current reports in `current/` subdirectory.

---

### `/archive/reports`

Archived historical reports organized by category:

- `foundation/` - Foundation Layer reports (F0-F9, L0)
- `layer1/` - Layer 1 reports (L1)
- `layer2/` - Layer 2 reports (L2)
- `layer3/` - Layer 3 reports (L3)
- `tasks/` - Task completion reports (U0-U13)
- `other/` - Other historical reports (code reviews, audits, etc.)

**Status:** ✅ Historical reports archived and organized.

---

### `/migration`

Migration guides and refactoring documentation:

- `route-decoupling.md` - Route decoupling migration guide
- `i18n-removal.md` - I18n removal migration guide
- `domain-decoupling-report.md` - Domain decoupling report
- `EVENTCARD_EVENT_TO_PROPS_MIGRATION.md` - EventCard migration guide

**Status:** ✅ Migration documentation organized.

---

### `/tenerife_audit`

Design system specifications and audit documentation:

**Note:** The following files are referenced in some documentation but do not currently exist:
- `design_system.md` - Design system specifications (if needed, see [Tokens Guide](./guides/TOKENS_GUIDE.md))
- `components_redesign.md` - Component redesign specifications
- `layout_and_brand_guide.md` - Layout principles and brand guidelines
- `ui_ux_audit_report.md` - UI/UX audit findings
- `technical_analysis.md` - Technical analysis documentation
- `component_comparison_matrix.md` - Component comparison matrix

**Status:** ⚠️ These files are not present in the repository. For component examples, see [Component Examples](./guides/COMPONENT_EXAMPLES.md).

---

### `/structure`

Architecture and structural documentation:

- `STRUCTURE_OF_WORK.md` - Complete architecture and work sequence guide
- `TYPING_STANDARD.md` - Typing standards

**Status:** ✅ Files exist and are up to date.

---

### `/tasks`

Task management and navigation:

- `master_task_index.md` - Complete index of all Master Task V3 layers and tasks

**Status:** ✅ File exists and is up to date.

---

### `/reviews` and `/review`

Code review documentation:

- `reviews/` - Code review reports
- `review/` - Review documentation and plans

**Status:** ✅ Review documentation organized.

---

### `/core`

Core context documentation:

- `TENERIFEUI_CORECONTEXT_GPT.md` - Core context for GPT
- `TENERIFEUI_CORECONTEXT_v1.0.md` - Core context v1.0

**Status:** ✅ Core documentation available.

---

## 🔗 Quick Links

### Getting Started

- [Getting Started Guide](guides/GETTING_STARTED.md) - Start here for new users
- [Quick Start](guides/QUICK_START.md) - Quick start tutorial
- [Installation Guide](guides/INSTALLATION.md) - Installation instructions
- [Usage Guide](guides/USAGE.md) - How to use the library

### Essential Documentation

- [Final Foundation Lock](architecture/FINAL_FOUNDATION_LOCK.md) - 🔒 **Authoritative Foundation lock** (single source of truth)
- [Architecture Lock](architecture/TUI_ARCHITECTURE_LOCK.md) - Foundation architecture lock and rules
- [Master Task Index](tasks/master_task_index.md) - Complete task reference
- [Structure of Work](structure/STRUCTURE_OF_WORK.md) - Architecture guide
- [Project Progress](PROJECT_PROGRESS.md) - Task completion tracking

### Guides

- [Theme Guide](guides/THEME_GUIDE.md) - Theme system documentation
- [Tokens Guide](guides/TOKENS_GUIDE.md) - Design tokens guide
- [Component Examples](guides/COMPONENT_EXAMPLES.md) - Component usage examples
- [Animation Guidelines](guides/ANIMATION_GUIDELINES.md) - Animation best practices
- [Accessibility Guidelines](guides/a11y_guidelines.md) - A11y best practices
- [Testing Guide](guides/TUI_TESTING_GUIDE.md) - Testing documentation

### Reference

- [Public API Reference](reference/public-api.md) - Complete API documentation
- [UI Integration Guide](reference/UI_INTEGRATION.md) - Integration guide
- [Components Inventory](reference/UI_COMPONENTS_INVENTORY.md) - Components list

### Reports

- [Current Reports](reports/current/) - Active and recent reports
- [Project Audit Report](reports/PROJECT_AUDIT_REPORT.md)
- [Path Resolution Report](reports/PATH_RESOLUTION_REPORT.md)
- [Changelog](reports/CHANGELOG.md)

### Migration

- [Route Decoupling](migration/route-decoupling.md) - Route decoupling guide
- [I18n Removal](migration/i18n-removal.md) - I18n removal guide
- [Domain Decoupling](migration/domain-decoupling-report.md) - Domain decoupling report

### Redirects

If you're looking for a file that was moved, check [redirect_map.json](redirect_map.json) for the new location.

---

## 📋 Architecture Overview

TUI follows a two-layer architecture:

### Foundation Layer (Locked)

The Foundation layer consists of five immutable components that serve as the sole canonical foundation for their categories:

- **Modal** (Radix Dialog) - `src/components/modal/`
- **Tabs** (Radix Tabs) - `src/components/navigation/tabs/`
- **Select** (Radix Select) - `src/components/select/`
- **ContextMenu** (Radix ContextMenu) - `src/components/menus/context-menu/`
- **Toast** (Radix Toast) - `src/components/overlays/`

Foundation components are **locked** and **immutable**. All behavior is delegated to Radix UI primitives, and styling is token-driven.

See [Final Foundation Lock](architecture/FINAL_FOUNDATION_LOCK.md) for complete architecture rules.

### Extension Layer

Extension components are composable and may use Foundation components internally. They provide domain-specific functionality and can be created, modified, or deleted without affecting the Foundation layer.

---

## 🗂️ File Organization Rules

### Where Files Belong

- **User guides and tutorials** → `guides/`
- **API reference and technical docs** → `reference/`
- **Current reports** → `reports/current/`
- **Historical reports** → `archive/reports/`
- **Migration guides** → `migration/`
- **Design specifications** → `tenerife_audit/`
- **Architecture docs** → `structure/`
- **Task indexes** → `tasks/`
- **Code reviews** → `reviews/` or `review/`
- **Core context** → `core/`
- **UI-specific docs** → `ui/`

### Naming Conventions

- Use `SCREAMING_SNAKE_CASE.md` for important documents (e.g., `STRUCTURE_OF_WORK.md`)
- Use `snake_case.md` for regular documents (e.g., `design_system.md`)
- Use `PascalCase.md` for reports (e.g., `PROJECT_AUDIT_REPORT.md`)

---

## 🔄 Documentation Updates

### When to Update

- After completing any Master Task → Update `PROJECT_PROGRESS.md`
- After creating new components → Update component documentation
- After releases → Update `reports/CHANGELOG.md`
- After audits → Create new reports in `reports/`

### Update Process

1. Make changes to documentation files
2. Update `PROJECT_PROGRESS.md` with completion status
3. Update `CHANGELOG.md` if applicable
4. Commit changes with descriptive message

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
- Check `redirect_map.json` for moved files

### Version Control

- All documentation is version controlled
- Use semantic versioning for major documents
- Include version numbers in document headers

---

## 🚀 Getting Started

### For Developers

1. Read [Structure of Work](structure/STRUCTURE_OF_WORK.md) to understand architecture
2. Review [Master Task Index](tasks/master_task_index.md) for task overview
3. Check [Project Progress](../PROJECT_PROGRESS.md) for current status
4. Follow task dependencies when implementing features

### For Designers

1. Review design system documentation (when available)
2. Check component redesign specifications
3. Review layout and brand guidelines
4. Reference audit reports for current state

### For Project Managers

1. Review [Master Task Index](tasks/master_task_index.md) for task overview
2. Check [Project Progress](../PROJECT_PROGRESS.md) for completion status
3. Review audit reports for project health
4. Check [Changelog](reports/CHANGELOG.md) for recent changes

---

## 📞 Support

For questions about documentation:

- Check the relevant documentation file
- Review [Master Task Index](tasks/master_task_index.md)
- Check [redirect_map.json](redirect_map.json) for moved files
- Review [Project Audit Report](reports/PROJECT_AUDIT_REPORT.md) for project status

---

**Last Updated:** 2025-12-12  
**Documentation Version:** 2.1  
**Master Task Version:** 3.0
