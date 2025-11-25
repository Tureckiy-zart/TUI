# 📋 Master Task V3 - Complete Index

**Version:** 3.1  
**Last Updated:** 2025-11-25  
**Purpose:** Navigation and reference guide for all Master Task V3 layers and tasks

---

## 📚 Table of Contents

- [Overview](#overview)
- [Layer 0: Orientation & Upgrade Layer](#layer-0-orientation--upgrade-layer)
- [Critical Decoupling Layer (P0)](#critical-decoupling-layer-p0)
- [Layer 1: Foundation Layer](#layer-1-foundation-layer)
- [Layer 2: Core Components Layer](#layer-2-core-components-layer)
- [Layer 3: Advanced Components Layer](#layer-3-advanced-components-layer)
- [Layer 4: Quality & Delivery Layer](#layer-4-quality--delivery-layer)
- [Layer 5: Publishing Layer](#layer-5-publishing-layer)
- [Layer 6: CI/CD Layer](#layer-6-cicd-layer)
- [Layer 7: Maintenance Layer](#layer-7-maintenance-layer)
- [Dependencies Map](#dependencies-map)
- [Documentation References](#documentation-references)

---

## Overview

Master Task V3.1 defines **71 tasks** across **9 layers** to build a universal, theme-driven UI component library. All tasks follow a strict dependency chain and must be executed in the correct order.

**NEW: Critical Decoupling Layer (P0)** - Added 7 critical tasks for full UI library independence from Tenerife domain.

**Key Principles:**

- All design values come from design tokens
- Components are stateless and controlled via props
- Theme system enables multiple brand support
- Full accessibility compliance (WCAG 2.1 AA)
- Comprehensive testing and documentation

---

## Layer 0: Orientation & Upgrade Layer

**Purpose:** Prepare the project for Master Task execution by auditing existing code, understanding architecture, and retrofitting theme system.

### Tasks

| ID      | Title                                                | Dependencies   | Status  |
| ------- | ---------------------------------------------------- | -------------- | ------- |
| **G0**  | Consult project structure and design documentation   | None           | pending |
| **U0**  | Audit existing components for token compliance       | G0             | pending |
| **U1**  | Introduce theme system into existing components      | U0, F7, F8, F9 | pending |
| **U2**  | Enforce minimal API and variant consistency          | U1             | pending |
| **U3**  | Implement theme scaffolding CLI                      | F7, F8, F9     | pending |
| **U4**  | Introduce premium layout sections                    | C0, U1, U2     | pending |
| **U5**  | Export tokens for design tools                       | F0-F6          | pending |
| **U6**  | Augment accessibility and testing                    | Q1, Q2         | pending |
| **U7**  | Build multi-brand theme engine                       | U3, F8, F9     | pending |
| **U8**  | Create dynamic layout primitives                     | F3, F7, F8     | pending |
| **U9**  | Implement dynamic section builder                    | U8, C0, U4     | pending |
| **U10** | Integrate Figma token sync                           | U5             | pending |
| **U11** | Build theme marketplace infrastructure               | U7, U3         | pending |
| **U12** | Provide component scaffolding CLI                    | C0, U2         | pending |
| **U13** | Provide guidelines for customizing tokens and themes | U5, U7         | pending |

**Key Documentation:**

- [Structure of Work](../structure/STRUCTURE_OF_WORK.md)
- [Design System](../tenerife_audit/design_system.md) (missing)
- [Components Redesign](../tenerife_audit/components_redesign.md) (missing)
- [Layout and Brand Guide](../tenerife_audit/layout_and_brand_guide.md) (missing)

---

## Critical Decoupling Layer (P0)

**Priority:** P0 - CRITICAL  
**Type:** Unplanned Critical Work  
**Branch:** `feature/ui-lib-full-decoupling`  
**Purpose:** Full 7-phase architectural refactor to remove domain coupling, multilingual logic, route hardcoding, redesign props, rewrite public API, create adapter layer, and integrate consumer-side mapping.

### Tasks

| ID     | Title                        | Dependencies | Status  |
| ------ | ---------------------------- | ------------ | ------- |
| **D1** | Public API Rewrite           | None         | pending |
| **D2** | Domain Decoupling            | D1           | pending |
| **D3** | Route Decoupling             | D2           | pending |
| **D4** | I18n Removal                 | D3           | pending |
| **D5** | Props Redesign               | D4           | pending |
| **D6** | Adapter Layer (Main Project) | D5           | pending |
| **D7** | Frontend Integration         | D6           | pending |

### Dependency Chain

```
D1 → D2 → D3 → D4 → D5 → D6 → D7
```

### Key Documentation

- [UI_LIB_PUBLIC_API.md](../../.cursor/reports/UI_LIB_PUBLIC_API.md)
- [UI_LIB_DOMAIN_DEPENDENCIES.md](../../.cursor/reports/UI_LIB_DOMAIN_DEPENDENCIES.md)
- [UI_LIB_ROUTE_HARDCODING.md](../../.cursor/reports/UI_LIB_ROUTE_HARDCODING.md)
- [UI_LIB_COUPLING_ANALYSIS.md](../../.cursor/reports/UI_LIB_COUPLING_ANALYSIS.md)
- [UI_LIB_INDEPENDENCE_ROADMAP.md](../../.cursor/reports/UI_LIB_INDEPENDENCE_ROADMAP.md)

### Subtask Files

- `.cursor/tasks/subtasks/UI_LIB_PHASE_1_PUBLIC_API_REWRITE.subtasks.json`
- `.cursor/tasks/subtasks/UI_LIB_PHASE_2_DOMAIN_DECOUPLING.subtasks.json`
- `.cursor/tasks/subtasks/UI_LIB_PHASE_3_ROUTE_DECOUPLING.subtasks.json`
- `.cursor/tasks/subtasks/UI_LIB_PHASE_4_I18N_REMOVAL.subtasks.json`
- `.cursor/tasks/subtasks/UI_LIB_PHASE_5_PROPS_REDESIGN.subtasks.json`
- `.cursor/tasks/subtasks/UI_LIB_PHASE_6_ADAPTER_LAYER.subtasks.json`
- `.cursor/tasks/subtasks/UI_LIB_PHASE_7_FRONTEND_INTEGRATION.subtasks.json`

### Outputs

**Phase 1-5 (UI Library):**

- Refactored `src/index.ts` with clean public API
- Domain-agnostic component interfaces
- `docs/public-api.md`
- `docs/domain-decoupling-report.md`
- `docs/route-decoupling.md`
- `docs/i18n-removal.md`
- `docs/props-guidelines.md`

**Phase 6-7 (Main Project):**

- `apps/web/src/adapters/ui/` adapter layer
- Updated frontend component usages
- `docs/ui-integration-report.md`

### Completion Criteria

- [ ] All 7 subtask files generated
- [ ] No internal paths importable externally
- [ ] No domain types in UI components
- [ ] No hardcoded routes in UI components
- [ ] No multilingual patterns in UI components
- [ ] Adapter layer isolates domain from UI
- [ ] Full typecheck passes in both projects

---

## Layer 1: Foundation Layer

**Purpose:** Establish the design token system and theme infrastructure that all components will use.

### Tasks

| ID     | Title                                        | Dependencies | Status  |
| ------ | -------------------------------------------- | ------------ | ------- |
| **F0** | Create base token files                      | None         | pending |
| **F1** | Implement color palette tokens               | None         | pending |
| **F2** | Implement typography system tokens           | None         | pending |
| **F3** | Implement spacing system tokens              | None         | pending |
| **F4** | Implement shadow and glow system tokens      | None         | pending |
| **F5** | Implement border radius system tokens        | None         | pending |
| **F6** | Implement motion and transition tokens       | None         | pending |
| **F7** | Configure Tailwind CSS and theme integration | F1-F6        | pending |
| **F8** | Establish theme system                       | F7           | pending |
| **F9** | Create theme override files                  | F8           | pending |

**Key Documentation:**

- [Design System](../tenerife_audit/design_system.md) (missing)

**Outputs:**

- `src/tokens/colors.ts`
- `src/tokens/typography.ts`
- `src/tokens/spacing.ts`
- `src/tokens/shadows.ts`
- `src/tokens/radius.ts`
- `src/tokens/motion.ts`
- `src/theme/ThemeProvider.tsx`
- `src/themes/default.ts`
- `src/themes/dark.ts`
- `src/themes/brand.ts`

---

## Layer 2: Core Components Layer

**Purpose:** Build foundational UI components using the token system.

### Tasks

| ID      | Title                                       | Dependencies      | Status  |
| ------- | ------------------------------------------- | ----------------- | ------- |
| **C0**  | Enforce token-driven component architecture | F0, F7, F8        | pending |
| **C1**  | Create Button component                     | F1-F8             | pending |
| **C2**  | Create Input component                      | F1-F8             | pending |
| **C3**  | Create FormInput component                  | C2                | pending |
| **C4**  | Create Select component                     | C2, C3            | pending |
| **C5**  | Create Textarea component                   | C2                | pending |
| **C6**  | Create Label component                      | None              | pending |
| **C7**  | Create Card (base) component                | F1-F8             | pending |
| **C8**  | Create Section component                    | F3, F7, F8        | pending |
| **C9**  | Create GridLayout component                 | F3, F7, F8        | pending |
| **C10** | Create Badge component                      | F1, F3-F5, F7, F8 | pending |

**Key Documentation:**

- [Components Redesign](../tenerife_audit/components_redesign.md) (missing)
- [Design System](../tenerife_audit/design_system.md) (missing)

---

## Layer 3: Advanced Components Layer

**Purpose:** Build complex, composite components using core components.

### Tasks

| ID      | Title                            | Dependencies   | Status  |
| ------- | -------------------------------- | -------------- | ------- |
| **A1**  | Create EventCard component       | C7, C10, F4    | pending |
| **A2**  | Create VenueCard component       | A1             | pending |
| **A3**  | Create SearchBar component       | C2, F4, F6     | pending |
| **A4**  | Create Navigation components     | C1, C8, F4, F6 | pending |
| **A5**  | Create Hero components           | C1, C8, F4     | pending |
| **A6**  | Create Feature component         | C8, C9         | pending |
| **A7**  | Create CTA component             | C1, C8         | pending |
| **A8**  | Create Modal component           | F4-F7          | pending |
| **A9**  | Create Dropdown component        | C4, F4, F6     | pending |
| **A10** | Create Avatar component          | F5             | pending |
| **A11** | Create Skeleton Loader component | F6             | pending |

**Key Documentation:**

- [Components Redesign](../tenerife_audit/components_redesign.md) (missing)
- [Layout and Brand Guide](../tenerife_audit/layout_and_brand_guide.md) (missing)
- [Design System](../tenerife_audit/design_system.md) (missing)

---

## Layer 4: Quality & Delivery Layer

**Purpose:** Ensure quality through testing, documentation, and accessibility compliance.

### Tasks

| ID     | Title                             | Dependencies   | Status  |
| ------ | --------------------------------- | -------------- | ------- |
| **Q1** | Configure Storybook               | All components | pending |
| **Q2** | Write unit and integration tests  | All components | pending |
| **Q3** | Perform accessibility audits      | Q1             | pending |
| **Q4** | Write component documentation     | All components | pending |
| **Q5** | Add JSDoc comments                | All components | pending |
| **Q6** | Generate API documentation        | Q5             | pending |
| **Q7** | Document theme switching          | F9, Q4         | pending |
| **Q8** | Add multi-theme compilation tests | F9, Q1, Q2     | pending |

**Key Documentation:**

- [Design System](../tenerife_audit/design_system.md) (missing)
- [Components Redesign](../tenerife_audit/components_redesign.md) (missing)
- [Layout and Brand Guide](../tenerife_audit/layout_and_brand_guide.md) (missing)

---

## Layer 5: Publishing Layer

**Purpose:** Prepare the library for npm publication with proper build system and versioning.

### Tasks

| ID     | Title                                             | Dependencies       | Status  |
| ------ | ------------------------------------------------- | ------------------ | ------- |
| **P1** | Configure package metadata                        | None               | pending |
| **P2** | Implement build system                            | P1, All components | pending |
| **P3** | Implement semantic versioning and release process | P1                 | pending |

**Key Documentation:**

- [Design System](../tenerife_audit/design_system.md) (missing)
- [Publishing Guide](../PUBLISHING.md)

---

## Layer 6: CI/CD Layer

**Purpose:** Automate testing, building, and publishing workflows.

### Tasks

| ID      | Title                                  | Dependencies | Status  |
| ------- | -------------------------------------- | ------------ | ------- |
| **CI1** | Set up continuous integration pipeline | P2, Q1, Q2   | pending |
| **CI2** | Deploy Storybook automatically         | Q1           | pending |
| **CI3** | Automate npm publishing                | P3, P2       | pending |

**Key Documentation:**

- [Design System](../tenerife_audit/design_system.md) (missing)

---

## Layer 7: Maintenance Layer

**Purpose:** Establish long-term maintenance and contribution workflows.

### Tasks

| ID     | Title                                    | Dependencies | Status  |
| ------ | ---------------------------------------- | ------------ | ------- |
| **M1** | Enable automated dependency updates      | CI1          | pending |
| **M2** | Create issue and pull request templates  | None         | pending |
| **M3** | Define versioning and maintenance policy | P3           | pending |

**Key Documentation:**

- [Design System](../tenerife_audit/design_system.md) (missing)

---

## Dependencies Map

### Critical Path (Must Execute First)

```
G0 → U0 → [D1-D7] → [F0-F9] → C0 → C1-C10 → A1-A11 → Q1-Q8 → P1-P3 → CI1-CI3 → M1-M3
```

**Note:** The Critical Decoupling Layer (D1-D7) is now P0 priority and must be completed before continuing with other layers.

### Parallel Execution Opportunities

- **Foundation Layer (F1-F6):** Can execute in parallel (no dependencies between them)
- **Core Components (C1-C10):** Some can execute in parallel after C0
- **Advanced Components (A1-A11):** Can execute in parallel after core components

### Key Dependency Chains

1. **Theme System Chain:**

   ```
   F0-F6 → F7 → F8 → F9 → U1, U3, U7
   ```

2. **Component Chain:**

   ```
   C0 → C1-C10 → A1-A11
   ```

3. **Quality Chain:**
   ```
   Components → Q1 → Q2 → Q3-Q8
   ```

---

## Documentation References

### Required Documentation Files

| File                          | Location               | Status                   | Referenced In |
| ----------------------------- | ---------------------- | ------------------------ | ------------- |
| **design_system.md**          | `docs/tenerife_audit/` | ❌ Missing               | 30+ tasks     |
| **components_redesign.md**    | `docs/tenerife_audit/` | ❌ Missing               | 20+ tasks     |
| **layout_and_brand_guide.md** | `docs/tenerife_audit/` | ❌ Missing               | 10+ tasks     |
| **STRUCTURE_OF_WORK.md**      | `docs/structure/`      | ✅ Exists                | G0, Reference |
| **AUDIT_REPORT.md**           | `docs/reports/`        | ⚠️ Will be created by U0 | U0, U1, U2    |

### Available Documentation Files

| File                          | Location        | Status    |
| ----------------------------- | --------------- | --------- |
| **PROJECT_PROGRESS.md**       | `docs/`         | ✅ Exists |
| **PUBLISHING.md**             | `docs/`         | ✅ Exists |
| **PROJECT_AUDIT_REPORT.md**   | `docs/reports/` | ✅ Exists |
| **PATH_RESOLUTION_REPORT.md** | `docs/reports/` | ✅ Exists |
| **CHANGELOG.md**              | `docs/reports/` | ✅ Exists |

---

## Task Status Legend

- **pending** - Not started
- **in_progress** - Currently being worked on
- **completed** - Finished successfully
- **cancelled** - No longer needed

---

## Quick Links

- [Master Task JSON](../../.cursor/tasks/master/master_tasks.json)
- [Project Progress](../PROJECT_PROGRESS.md)
- [Structure of Work](../structure/STRUCTURE_OF_WORK.md)
- [Publishing Guide](../PUBLISHING.md)
- [Audit Reports](../reports/)

---

**Last Updated:** 2025-11-25  
**Master Task Version:** 3.1  
**Total Tasks:** 71  
**Total Layers:** 9 (including Critical Decoupling Layer)
