# 📊 Cursor Rules Matrix — UI Component Library

**Last Updated:** 2025-12-12  
**Rule Version:** 1.0  
**Status:** Active

---

## 🎯 Purpose

This matrix provides a comprehensive overview of all Cursor rules for UI component library, their priorities, dependencies, and relationships. Use this document to understand rule hierarchy and avoid conflicts.

---

## 📋 Rules Overview

| Rule File                             | Category         | Priority | Status | Last Updated | Dependencies                      |
| ------------------------------------- | ---------------- | -------- | ------ | ------------ | --------------------------------- |
| `main-branch-security.mdc`            | Security         | CRITICAL | Active | 2024-12-19   | None (source of truth)            |
| `system-core.mdc`                     | System Core      | CRITICAL | Active | 2024-12-19   | None                              |
| `library-rules.mdc`                   | Architecture     | CRITICAL | Active | 2024-12-19   | None                              |
| `tui-self-governing-architecture.mdc` | Architecture     | CRITICAL | Active | 2025-12-12   | `library-rules.mdc`, `typing.mdc` |
| `npm-publishing.mdc`                  | Publishing       | CRITICAL | Active | 2024-12-19   | `library-rules.mdc`               |
| `storybook-rules.mdc`                 | Documentation    | HIGH     | Active | 2024-12-19   | `library-rules.mdc`               |
| `testing-rules.mdc`                   | Quality          | HIGH     | Active | 2024-12-19   | `library-rules.mdc`               |
| `task-lifecycle-and-automation.mdc`   | Automation       | MEDIUM   | Active | 2024-12-19   | `docs/PROJECT_PROGRESS.md`        |
| `user-rules.mdc`                      | User Preferences | MEDIUM   | Active | 2024-12-19   | `main-branch-security.mdc`        |

---

## 🔗 Rule Dependencies

### Git Workflow Rules

- **Source of Truth:** `main-branch-security.mdc`
- **References:**
  - `.cursorrules` → References `main-branch-security.mdc`
  - `user-rules.mdc` → References `main-branch-security.mdc`

### Component Development Rules

- **Source of Truth:** `library-rules.mdc`
- **Architecture Guard:** `tui-self-governing-architecture.mdc`
- **References:**
  - `tui-self-governing-architecture.mdc` → Enforces token-driven design system
  - `storybook-rules.mdc` → References `library-rules.mdc`
  - `testing-rules.mdc` → References `library-rules.mdc`
  - `npm-publishing.mdc` → References `library-rules.mdc`

### Documentation Rules

- **Core Files:**
  - `docs/PROJECT_PROGRESS.md` (CANONICAL source)
  - `docs/UNFINISHED_TASKS.md`
- **Structure:**
  - `docs/architecture/` — Architecture documentation
  - `docs/guides/` — User guides
  - `docs/components/` — Component documentation
  - `docs/examples/` — Usage examples

### Logging Standards

- **Standard Path:** `.cursor/logs/`
- **Files:**
  - `.cursor/logs/system_activity.log` — Agent actions
  - `.cursor/logs/uncertainty_events.log` — Errors and issues
  - `.cursor/logs/structure_audit.log` — Validation logs

### Reporting Standards

- **Reports Location:** `.cursor/reports/current/`
- **Component Reports:** `.cursor/reports/current/components/`
- **Release Reports:** `.cursor/reports/current/releases/`
- **Templates:** `.cursor/templates/`

---

## 🎯 Rule Categories

### 🔒 Security Rules (CRITICAL)

1. **Main Branch Security** (`main-branch-security.mdc`)
   - Protects `main` and `dev` branches
   - Enforces feature branch workflow
   - **Priority:** CRITICAL

### 🏛️ System Core Rules (CRITICAL)

1. **System Core** (`system-core.mdc`)
   - Master Task expansion and Waterflow structure
   - Critical file protection (Master Task, .env)
   - File naming conventions and structure validation
   - **Priority:** CRITICAL

### 🏗️ Architecture Rules (CRITICAL)

1. **Library Rules** (`library-rules.mdc`)
   - Component structure and organization
   - Exports and types
   - Documentation standards
   - Styling guidelines
   - Accessibility requirements
   - **Priority:** CRITICAL

2. **TUI Self-Governing Architecture** (`tui-self-governing-architecture.mdc`)
   - Token-driven design system enforcement
   - Token Union + Responsive<T> patterns
   - Visual prop tokenization rules
   - Architecture guard for future work
   - **Priority:** CRITICAL
   - **Layer:** META / ARCHITECTURE GUARD

3. **npm Publishing Rules** (`npm-publishing.mdc`)
   - Semantic versioning
   - Changelog generation
   - npm publish workflow
   - Pre-publish checks
   - **Priority:** CRITICAL

### 📚 Documentation Rules (HIGH)

1. **Storybook Rules** (`storybook-rules.mdc`)
   - Story structure
   - Controls and args
   - Documentation standards
   - Addons configuration
   - **Priority:** HIGH

### 🧪 Quality Rules (HIGH)

1. **Testing Rules** (`testing-rules.mdc`)
   - Unit tests
   - Snapshot tests
   - Accessibility tests
   - Visual regression tests
   - Coverage requirements
   - **Priority:** HIGH

### 🔄 Automation Rules (MEDIUM)

1. **Task Lifecycle & Automation** (`task-lifecycle-and-automation.mdc`)
   - Task completion workflow
   - Component completion automation
   - Reporting and synchronization
   - **Priority:** MEDIUM

### 👤 User Rules (MEDIUM)

1. **User Rules** (`user-rules.mdc`)
   - User preferences
   - Language processing rules
   - **Priority:** MEDIUM

---

## 🔄 Rule Resolution Order

When conflicts occur, rules are resolved in this order:

1. **CRITICAL Security Rules** (highest priority)
   - `main-branch-security.mdc`

2. **CRITICAL System Core Rules**
   - `system-core.mdc` (Master Task, file protection, structure)

3. **CRITICAL Architecture Rules**
   - `library-rules.mdc` (component structure, exports, types)
   - `tui-self-governing-architecture.mdc` (token-driven design system enforcement)
   - `npm-publishing.mdc` (versioning, publishing)

4. **HIGH Priority Rules**
   - `storybook-rules.mdc` (documentation)
   - `testing-rules.mdc` (quality)

5. **MEDIUM Priority Rules**
   - `task-lifecycle-and-automation.mdc` (automation)
   - `user-rules.mdc` (user preferences)

---

## 📊 Rule Consolidation Summary

### Library-Specific Rules:

1. **library-rules.mdc**
   - Component structure and organization
   - Exports and types
   - Documentation standards
   - Styling guidelines
   - Accessibility requirements

2. **tui-self-governing-architecture.mdc**
   - Token-driven design system enforcement
   - Token Union + Responsive<T> patterns
   - Visual prop tokenization rules
   - Architecture guard for future work

3. **npm-publishing.mdc**
   - Semantic versioning
   - Changelog generation
   - npm publish workflow
   - Pre-publish checks

4. **storybook-rules.mdc**
   - Story structure
   - Controls and args
   - Documentation standards
   - Addons configuration

5. **testing-rules.mdc**
   - Unit tests
   - Snapshot tests
   - Accessibility tests
   - Visual regression tests
   - Coverage requirements

### Universal Rules:

- `main-branch-security.mdc` - Git workflow
- `system-core.mdc` - Master Task system
- `task-lifecycle-and-automation.mdc` - Automation
- `user-rules.mdc` - User preferences

---

## 📊 Rule Conflicts & Resolutions

### Component Structure Conflicts

- **Issue:** Different component structures across projects
- **Resolution:** `library-rules.mdc` is the source of truth
- **Action:** All components must follow structure defined in `library-rules.mdc`

### Versioning Conflicts

- **Issue:** Inconsistent versioning approach
- **Resolution:** `npm-publishing.mdc` defines semantic versioning
- **Action:** Always use semantic versioning (MAJOR.MINOR.PATCH)

### Testing Conflicts

- **Issue:** Different testing approaches
- **Resolution:** `testing-rules.mdc` defines testing standards
- **Action:** Follow testing rules: 80%+ coverage, accessibility tests required

---

## ✅ Compliance Checklist

- [x] All rules have metadata headers
- [x] All paths updated for library structure
- [x] Git Workflow rules unified (source: `main-branch-security.mdc`)
- [x] Component rules defined (`library-rules.mdc`)
- [x] npm publishing rules defined (`npm-publishing.mdc`)
- [x] Storybook rules defined (`storybook-rules.mdc`)
- [x] Testing rules defined (`testing-rules.mdc`)
- [x] Dependencies documented
- [x] Rule matrix validated

---

## 🔍 Quick Reference

### Where to find rules:

- **Security:** `.cursor/rules/main-branch-security.mdc`
- **System Core:** `.cursor/rules/system-core.mdc`
- **Component Development:** `.cursor/rules/library-rules.mdc`
- **Architecture Guard:** `.cursor/rules/tui-self-governing-architecture.mdc`
- **npm Publishing:** `.cursor/rules/npm-publishing.mdc`
- **Storybook:** `.cursor/rules/storybook-rules.mdc`
- **Testing:** `.cursor/rules/testing-rules.mdc`
- **Automation:** `.cursor/rules/task-lifecycle-and-automation.mdc`
- **User Preferences:** `.cursor/rules/user-rules.mdc`

### Where to find documentation:

- **Progress:** `docs/PROJECT_PROGRESS.md` (CANONICAL)
- **Tasks:** `docs/UNFINISHED_TASKS.md`
- **Architecture:** `docs/architecture/`
- **Components:** `docs/components/`
- **Examples:** `docs/examples/`

---

## 🔗 Cross-References

### library-rules.mdc references:

- `main-branch-security.mdc` (Git workflow)
- `testing-rules.mdc` (testing requirements)
- `storybook-rules.mdc` (documentation)

### tui-self-governing-architecture.mdc references:

- `library-rules.mdc` (component structure)
- `typing.mdc` (TypeScript typing standards)
- Token types: `src/tokens/types/index.ts`
- Responsive types: `src/types/responsive.ts`

### npm-publishing.mdc references:

- `library-rules.mdc` (component structure)
- `testing-rules.mdc` (pre-publish tests)

### storybook-rules.mdc references:

- `library-rules.mdc` (component structure)
- `testing-rules.mdc` (accessibility testing)

### testing-rules.mdc references:

- `library-rules.mdc` (component structure)
- `storybook-rules.mdc` (visual regression)

---

**Last Updated:** 2025-12-12  
**Next Review:** 2026-01-12  
**Version:** 1.0
