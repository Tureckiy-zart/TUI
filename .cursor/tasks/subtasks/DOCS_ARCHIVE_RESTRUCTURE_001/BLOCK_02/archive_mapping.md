# Archive Mapping Plan

## KEEP List (36 files - DO NOT MOVE)

### Canonical (3)
- docs/INTERNAL_CANONICAL_CONTEXT.md
- docs/architecture/FINAL_FOUNDATION_LOCK.md
- docs/CANONICAL_PROJECT_ORIENTATION.md

### Authority Contracts (11)
- docs/architecture/INTERACTION_AUTHORITY_CONTRACT.md
- docs/architecture/STATE_AUTHORITY_MATRIX.md
- docs/architecture/STATE_AUTHORITY_CONTRACT.md
- docs/architecture/SPACING_AUTHORITY_CONTRACT.md
- docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
- docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
- docs/architecture/MOTION_AUTHORITY_CONTRACT.md
- docs/architecture/ELEVATION_AUTHORITY_CONTRACT.md
- docs/architecture/LAYOUT_AUTHORITY_CONTRACT.md
- docs/architecture/EXTENSION_AUTHORITY_CONTRACT.md
- docs/architecture/TUI_TOKEN_SYSTEM.md

### Authority Support (1)
- docs/architecture/AUTHORITY_MAP.md

### Architecture Rules (7)
- docs/architecture/TUI_ARCHITECTURE_LOCK.md
- docs/architecture/TUI_EXTENSION_CANONICAL_STATE.md
- docs/architecture/UI_ARCHITECTURE_RULES.md
- docs/architecture/TUI_CURSOR_GUARD_RULES.md
- docs/architecture/CURSOR_UI_RULES.md
- docs/architecture/LINTING_RULES.md
- docs/architecture/TOOLING_DECISIONS.md

### Lock Documents (2)
- docs/locks/TUI_LAYOUT_LOCK.md
- docs/locks/TUI_TEXT_LOCK.md

### Progress & Project Management (2)
- docs/PROJECT_PROGRESS.md
- docs/tasks/master_task_index.md

### Root Entry Points (2)
- docs/README.md
- docs/README_GPT.md

### Reference (5)
- docs/reference/public-api.md
- docs/reference/design_tokens_export.md
- docs/reference/token-map-overview.md
- docs/reference/UI_COMPONENTS_INVENTORY.md
- docs/reference/UI_INTEGRATION.md

### Structure (1)
- docs/structure/TYPING_STANDARD.md

### UI Exceptions (1)
- docs/ui/gradient_exceptions.md

### CI/CD (1)
- docs/CI-CD_OVERVIEW.md

---

## ARCHIVE MAPPING

### docs_archive/audits/ - Audits, verifications, quality reports

- docs/architecture/INTERACTION_AUTHORITY_AUDIT.md → docs_archive/audits/INTERACTION_AUTHORITY_AUDIT.md
- docs/architecture/INTERACTION_AUTHORITY_GUARD_LAYER.md → docs_archive/audits/INTERACTION_AUTHORITY_GUARD_LAYER.md
- docs/architecture/INTERACTION_AUTHORITY_HOVER_VERIFICATION.md → docs_archive/audits/INTERACTION_AUTHORITY_HOVER_VERIFICATION.md
- docs/auto/foundation/AUTHORITY_QUALITY_PASS_REPORT.md → docs_archive/audits/AUTHORITY_QUALITY_PASS_REPORT.md
- docs/auto/foundation/WORDING_REFINEMENT_REPORT.md → docs_archive/audits/WORDING_REFINEMENT_REPORT.md
- docs/review/STORYBOOK_ANIMATIONS_AUDIT.md → docs_archive/audits/STORYBOOK_ANIMATIONS_AUDIT.md
- docs/review/STORYBOOK_ANIMATIONS_FIX_PLAN.md → docs_archive/audits/STORYBOOK_ANIMATIONS_FIX_PLAN.md
- docs/STORYBOOK_SB10_IMPLICIT_ACTIONS_AUDIT.md → docs_archive/audits/STORYBOOK_SB10_IMPLICIT_ACTIONS_AUDIT.md

### docs_archive/reports/ - One-time reports, inventory, summaries

- docs/reports/DOCS_FULL_INVENTORY_REPORT.md → docs_archive/reports/DOCS_FULL_INVENTORY_REPORT.md
- docs/archive/* → docs_archive/reports/archive/ (entire archive directory)

### docs_archive/migrations/ - Historical migrations

- docs/migration/domain-decoupling-report.md → docs_archive/migrations/domain-decoupling-report.md
- docs/migration/EVENTCARD_EVENT_TO_PROPS_MIGRATION.md → docs_archive/migrations/EVENTCARD_EVENT_TO_PROPS_MIGRATION.md
- docs/migration/i18n-removal.md → docs_archive/migrations/i18n-removal.md
- docs/migration/route-decoupling.md → docs_archive/migrations/route-decoupling.md

### docs_archive/cursor_runs/ - Cursor/AI task results

- .cursor/reports/UI_LIB_COUPLING_ANALYSIS.md → docs_archive/cursor_runs/UI_LIB_COUPLING_ANALYSIS.md
- .cursor/reports/UI_LIB_DOMAIN_DEPENDENCIES.md → docs_archive/cursor_runs/UI_LIB_DOMAIN_DEPENDENCIES.md
- .cursor/reports/UI_LIB_INDEPENDENCE_ROADMAP.md → docs_archive/cursor_runs/UI_LIB_INDEPENDENCE_ROADMAP.md
- .cursor/reports/UI_LIB_PUBLIC_API.md → docs_archive/cursor_runs/UI_LIB_PUBLIC_API.md
- .cursor/reports/UI_LIB_ROUTE_HARDCODING.md → docs_archive/cursor_runs/UI_LIB_ROUTE_HARDCODING.md
- .cursor/tasks/migration/* → docs_archive/cursor_runs/migration_tasks/

### docs_archive/legacy/ - Outdated guides and descriptions

- docs/guides/* → docs_archive/legacy/guides/ (all guides)
- docs/guide/FOUNDATION_GUIDE.md → docs_archive/legacy/FOUNDATION_GUIDE.md
- docs/core/TENERIFEUI_CORECONTEXT_GPT.md → docs_archive/legacy/TENERIFEUI_CORECONTEXT_GPT.md
- docs/core/TENERIFEUI_CORECONTEXT_v1.0.md → docs_archive/legacy/TENERIFEUI_CORECONTEXT_v1.0.md
- docs/structure/STRUCTURE_OF_WORK.md → docs_archive/legacy/STRUCTURE_OF_WORK.md

### docs_archive/deprecated/ - Deprecated documents

- docs/architecture/BUTTON_CVA_ENFORCEMENT.md → docs_archive/deprecated/BUTTON_CVA_ENFORCEMENT.md
- docs/reviews/* → docs_archive/deprecated/reviews/ (all code review reports)
- docs/tenerife_audit/* → docs_archive/deprecated/tenerife_audit/ (original design audit)
- docs/DOCS_V1_1_CLASSIFICATION.md → docs_archive/deprecated/DOCS_V1_1_CLASSIFICATION.md
