# 📦 TenerifeUI - Cursor Configuration

**Date Created:** 2026-01-26  
**Version:** 2.1.1  
**Status:** ✅ Actively used

---

## 📋 Description

This folder contains Cursor AI configuration for the **TenerifeUI** project — a UI component library built on React, TypeScript, and Tailwind CSS.

Configuration includes:
- Component development rules (Cursor Rules)
- Task management system (Master Task Framework)
- Report and documentation templates
- Automation scripts

---

## 📁 `.cursor/` Folder Structure

```
.cursor/
├── README.md                          # This file
├── project-config.json                # Project configuration
│
├── rules/                             # Cursor AI rules
│   ├── user-rules.mdc                 # Core behavioral rules
│   ├── component-lifecycle.mdc       # Component lifecycle protocol
│   ├── block-and-scope-rules.mdc     # Scope rules
│   ├── COMPONENT_CREATION_AND_REFACTOR_CHECKLIST.mdc  # Creation/refactor checklist
│   ├── documentation-structure-freeze.mdc  # Documentation structure freeze
│   ├── CURSOR_RULES_RESOLUTION_ORDER.mdc   # Rule resolution order
│   ├── CURSOR_RULES_VERIFICATION.mdc       # Rules verification
│   ├── reporting-discipline.mdc            # Reporting discipline
│   └── GPT_PROJECT_LOCK.mdс                # Project lock for GPT
│
├── templates/                         # Report templates
│   ├── COMPONENT_REPORT_TEMPLATE.md  # Component report template
│   ├── RELEASE_TEMPLATE.md           # Release template
│   └── STORYBOOK_TEMPLATE.md         # Storybook stories template
│
├── tasks/                             # Task management system
│   ├── master/                        # Master Task system
│   │   ├── master_tasks.json          # Main tasks file
│   │   ├── example_task_master.json   # Task example
│   │   └── TUI_MASTER_TODO_FRAMEWORK_ADAPTERS.md  # Framework adapters
│   └── subtasks/                      # Subtasks
│       └── [various project subtasks]
│
├── scripts/                           # Automation scripts
│   ├── type_enforcement.sh            # Type checking
│   └── verify_npm_token.sh            # npm token verification
│
└── examples/                          # Configuration examples
    ├── CURSOR_SETUP_TASK.md           # Cursor setup document
    └── .cursorignore-library-example   # .cursorignore example
```

---

## 🎯 Core Rules (Cursor Rules)

### 1. **user-rules.mdc**
Core behavioral rules for AI:
- Communication language: Russian (chat), English (code/documentation)
- Refusal policy for architecture violations
- Date handling rules
- Foundation component rules (prohibition of `className`/`style`)

### 2. **component-lifecycle.mdc**
Component lifecycle protocol:
- Task classification (create/refactor/bugfix)
- Lock and Authority Contract checks
- Token validation
- Implementation rules

### 3. **block-and-scope-rules.mdc**
Scope rules:
- One task = one component/block
- Prohibition of scope expansion
- Block and component boundary rules

### 4. **COMPONENT_CREATION_AND_REFACTOR_CHECKLIST.mdc**
Detailed checklist for:
- **CREATE MODE** — creating new components
- **REFACTOR MODE** — refactoring existing components (Pipeline 18A)
- **BUGFIX MODE** — bug fixes

### 5. **CURSOR_RULES_RESOLUTION_ORDER.mdc**
Deterministic rule resolution order:
1. `docs/ARCHITECTURE_CONTEXT.md`
2. Authority Contracts
3. Lock documents
4. Architecture Rules
5. Cursor Rules
6. Task Instructions

### 6. **documentation-structure-freeze.mdc**
Documentation structure freeze rules:
- Prohibition of creating new top-level directories without lock update
- Canonical `docs/` structure
- Single source of truth: `docs/architecture/DOCUMENTATION_CANON_LOCK.md`

---

## 🏗️ Project Architecture

TenerifeUI uses **layer-based architecture** with 5 canonical layers:

1. **FOUNDATION** (`src/FOUNDATION/`) — tokens and themes (LOCKED)
2. **PRIMITIVES** (`src/PRIMITIVES/`) — atomic UI components
3. **COMPOSITION** (`src/COMPOSITION/`) — composition, layout, overlays
4. **PATTERNS** (`src/PATTERNS/`) — business/UI patterns
5. **DOMAIN** (`src/DOMAIN/`) — domain components

**Source of Truth:** `docs/ARCHITECTURE_CONTEXT.md`

---

## 📚 Key Documents

### Architecture
- `docs/ARCHITECTURE_CONTEXT.md` — single source of truth for architecture
- `docs/architecture/ARCHITECTURE_STATE.md` — canonical architecture state
- `docs/architecture/FOUNDATION_LOCK.md` — Foundation layer lock
- `docs/architecture/ARCHITECTURE_LOCK.md` — architectural decisions lock

### Closed System v2
- `docs/architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md` — canonical documentation index
- `docs/architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md` — Layout Semantics Canon (Phase H)
- `docs/architecture/closed-system/CLOSED_SYSTEM_V2_TYPOGRAPHY_SEMANTICS_CANON.md` — Typography Semantics Canon (Phase J.1)

### Authority Contracts
Complete list in `docs/architecture/AUTHORITY_NAVIGATION.md`:
- ELEVATION_AUTHORITY.md
- EXTENSION_AUTHORITY.md
- INTERACTION_AUTHORITY.md
- LAYOUT_AUTHORITY.md
- MOTION_AUTHORITY.md
- RADIUS_AUTHORITY.md
- SPACING_AUTHORITY.md
- STATE_AUTHORITY.md
- TYPOGRAPHY_AUTHORITY.md

### Progress
- `docs/PROJECT_PROGRESS.md` — project progress tracking

---

## 🔧 Project Configuration

Main configuration is located in `.cursor/project-config.json`:

- **Project:** Tenerife.Music UI Component Library
- **Version:** 2.1.1
- **Framework:** React + TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Vitest + React Testing Library
- **Documentation:** Storybook 10.x
- **Build:** tsup
- **Publishing:** npm (@tenerife.music/ui)

---

## 🚀 Main Project Commands

```bash
# Development
pnpm dev              # Build in watch mode
pnpm build            # Production build

# Testing
pnpm test             # Run tests
pnpm test:coverage    # Test coverage
pnpm test:a11y        # Accessibility tests

# Code Quality
pnpm lint             # ESLint with autofix
pnpm lint:strict      # Strict mode (0 warnings)
pnpm typecheck        # TypeScript checking
pnpm format           # Prettier formatting

# Documentation
pnpm storybook        # Start Storybook
pnpm build-storybook  # Build Storybook

# CI/CD
pnpm ci               # Full check (typecheck + lint + build + test)
pnpm ci:full          # CI + coverage + a11y

# Release
pnpm release          # Semantic release
pnpm publish:patch    # Publish patch version
pnpm publish:minor     # Publish minor version
pnpm publish:major     # Publish major version

# Components
pnpm component:generate  # Generate Extension component
pnpm component:analyze   # Analyze component needs
```

---

## 📝 Working with Components

### Creating a New Extension Component

```bash
# Generate scaffold
pnpm component:generate -- ComponentName [--category category]

# Examples
pnpm component:generate -- ConfirmDialog
pnpm component:generate -- HeroSection --category layout
```

Component will be created in `src/COMPOSITION/{categoryDir}/ComponentName/` with:
- `ComponentName.tsx` — main component
- `ComponentName.stories.tsx` — Storybook stories
- `ComponentName.test.tsx` — tests
- `ComponentName.index.ts` — exports

### Component Refactoring

Refactoring **MUST** follow Pipeline 18A:
`docs/workflows/foundation/FOUNDATION_STEP_PIPELINE.md`

**12 steps (STEP 0-11):**
1. STEP 0 — Baseline Snapshot
2. STEP 1 — Structural & Code Quality Review
3. STEP 2 — Semantic Role & Responsibility Validation
4. STEP 3 — Duplication & Internal Pattern Alignment
5. STEP 4 — State & Interaction Model Review
6. STEP 5 — Token, Size & Variant Consistency
7. STEP 6 — Public API & DX Review
8. STEP 7 — Type System Alignment
9. STEP 8 — Intentional Refactor Pass (checkpoint)
10. STEP 9 — Validation via Tests & Storybook (checkpoint)
11. STEP 10 — Accessibility Audit & Fixes (checkpoint)
12. STEP 11 — Final Review & Architectural Lock (checkpoint)

---

## 🔒 Important Constraints

### Foundation Components
**FORBIDDEN** to use `className` or `style` props for Foundation components:
- ❌ `<Text className="...">` — forbidden
- ✅ `<Box className="...">` — allowed (Extension component)

### Architectural Locks
- Foundation layer **LOCKED** (immutable)
- Directory structure **LOCKED**
- Authority Contracts **LOCKED**

### Scope Rules
- One task = one component/block
- Prohibition of scope expansion
- Prohibition of hidden changes

---

## 📖 Additional Resources

### Documentation
- `docs/README.md` — main documentation hub
- `docs/architecture/` — architectural documents
- `docs/reference/` — reference documentation
- `docs/workflows/` — workflows

### Templates
- `.cursor/templates/COMPONENT_REPORT_TEMPLATE.md` — component report
- `.cursor/templates/RELEASE_TEMPLATE.md` — release template
- `.cursor/templates/STORYBOOK_TEMPLATE.md` — Storybook template

---

## ✅ System Status

- ✅ Cursor Rules loaded and active
- ✅ Master Task system configured
- ✅ Architecture locked (LOCKED)
- ✅ Foundation layer closed (FINALIZED)
- ✅ Pipeline 18A for refactoring defined
- ✅ Rules system verified

---

## 🔄 Updates

**Last Updated:** 2026-01-27  
**Project Version:** 2.1.1  
**Status:** Feature Development Mode

---

**Note:** All rules and configurations in this folder are **mandatory** for compliance. AI assistants must follow them when working with the project.
