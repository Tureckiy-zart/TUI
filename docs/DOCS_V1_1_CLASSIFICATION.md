# Documentation Classification for v1.1 Cleanup

**Date:** 2025-12-15  
**Task:** TUNG_DOCS_CLEANUP_V1_1_PREP  
**Status:** ✅ Classification Complete  
**Action Required:** Manual review and approval before deletion

---

## Classification Criteria

### KEEP
Canonical, lock, system-level or onboarding documents required for long-term project context.

### DELETE
Intermediate, audit-only, inventory, exploratory or decision-support documents no longer needed.

### OPTIONAL
Potentially useful historical context, but not required for canonical state.

---

## KEEP

### Architecture Documents
**Reason:** Foundation architecture definitions, locked and canonical state

- `docs/architecture/CURSOR_UI_RULES.md` - Cursor AI rules for UI development
- `docs/architecture/FINAL_FOUNDATION_LOCK.md` - Final foundation lock document
- `docs/architecture/LINTING_RULES.md` - Linting standards and rules
- `docs/architecture/TOOLING_DECISIONS.md` - Tooling decisions and rationale
- `docs/architecture/TUI_ARCHITECTURE_LOCK.md` - UI architecture lock
- `docs/architecture/TUI_CURSOR_GUARD_RULES.md` - Cursor guard rules
- `docs/architecture/TUI_EXTENSION_CANONICAL_STATE.md` - Extension layer canonical state
- `docs/architecture/TUI_TOKEN_SYSTEM.md` - Token system definition
- `docs/architecture/UI_ARCHITECTURE_RULES.md` - UI architecture rules

### Lock Documents
**Reason:** Formally locked components, immutable contracts

- `docs/locks/TUI_LAYOUT_LOCK.md` - Layout primitives lock
- `docs/locks/TUI_TEXT_LOCK.md` - Text/typography components lock

### Canonical Documents
**Reason:** Single source of truth for project orientation and context

- `docs/CANONICAL_PROJECT_ORIENTATION.md` - Canonical project orientation (PostCSS/Tailwind fix)
- `docs/INTERNAL_CANONICAL_CONTEXT.md` - Internal canonical context for AI
- `docs/PROJECT_PROGRESS.md` - Project progress tracking

### Core Context
**Reason:** Core context for AI assistants and developers

- `docs/core/TENERIFEUI_CORECONTEXT_GPT.md` - GPT context
- `docs/core/TENERIFEUI_CORECONTEXT_v1.0.md` - Core context v1.0

### Foundation Guides
**Reason:** Critical foundation setup guides (PostCSS, Tailwind, Tokens)

- `docs/guides/POSTCSS_CONFIG.md` - PostCSS configuration guide (CRITICAL - documents the fix)
- `docs/guides/TOKEN_CVA_GUIDE.md` - Token CVA guide
- `docs/guides/TOKENS_GUIDE.md` - Tokens guide
- `docs/guides/THEME_GUIDE.md` - Theme system guide

### User Guides
**Reason:** User-facing documentation for library usage

- `docs/guides/a11y_guidelines.md` - Accessibility guidelines
- `docs/guides/ANIMATION_GUIDELINES.md` - Animation guidelines
- `docs/guides/COMPONENT_EXAMPLES.md` - Component examples
- `docs/guides/DATALIST_GUIDE.md` - Datalist component guide
- `docs/guides/FIELD_GUIDE.md` - Field component guide
- `docs/guides/GETTING_STARTED.md` - Getting started guide
- `docs/guides/GRID.md` - Grid system guide
- `docs/guides/ICON_GUIDE.md` - Icon system guide
- `docs/guides/INSTALLATION.md` - Installation guide
- `docs/guides/LAYOUT_PRIMITIVES_GUIDE.md` - Layout primitives guide
- `docs/guides/MASTER_GUIDE.md` - Master guide
- `docs/guides/MENU_SYSTEM_GUIDE.md` - Menu system guide
- `docs/guides/NAVIGATION_COMPONENTS_GUIDE.md` - Navigation components guide
- `docs/guides/NOTIFICATION_CENTER_GUIDE.md` - Notification center guide
- `docs/guides/props-guidelines.md` - Props guidelines
- `docs/guides/QUICK_START.md` - Quick start guide
- `docs/guides/TUI_TESTING_GUIDE.md` - Testing guide
- `docs/guides/TYPOGRAPHY_GUIDE.md` - Typography guide
- `docs/guides/USAGE.md` - Usage guide

### Reference Documentation
**Reason:** API and integration reference

- `docs/reference/design_tokens_export.md` - Design tokens export reference
- `docs/reference/public-api.md` - Public API reference
- `docs/reference/token-map-overview.md` - Token map overview
- `docs/reference/UI_COMPONENTS_INVENTORY.md` - UI components inventory (reference)
- `docs/reference/UI_INTEGRATION.md` - UI integration guide

### Structure Definitions
**Reason:** Project structure and typing standards

- `docs/structure/STRUCTURE_OF_WORK.md` - Work structure definition
- `docs/structure/TYPING_STANDARD.md` - Typing standards

### Project Management
**Reason:** Project tracking and task management

- `docs/tasks/master_task_index.md` - Master task index
- `docs/CI-CD_OVERVIEW.md` - CI/CD overview
- `docs/README.md` - Main README
- `docs/README_GPT.md` - GPT-specific README
- `docs/redirect_map.json` - Redirect map for documentation

### UI Exceptions
**Reason:** Documented exceptions and special cases

- `docs/ui/gradient_exceptions.md` - Gradient exceptions documentation

---

## OPTIONAL

### Migration Documentation
**Reason:** Historical context for migrations, potentially useful for understanding evolution

- `docs/migration/domain-decoupling-report.md` - Domain decoupling migration report
- `docs/migration/EVENTCARD_EVENT_TO_PROPS_MIGRATION.md` - EventCard migration
- `docs/migration/i18n-removal.md` - i18n removal migration
- `docs/migration/route-decoupling.md` - Route decoupling migration

### Design System Audit
**Reason:** Original design system audit, potentially useful for design reference

- `docs/tenerife_audit/00_START_HERE.md` - Design audit start guide
- `docs/tenerife_audit/component_comparison_matrix.md` - Component comparison
- `docs/tenerife_audit/component_examples.md` - Component examples
- `docs/tenerife_audit/components_redesign.md` - Components redesign
- `docs/tenerife_audit/design_system.md` - Design system reference
- `docs/tenerife_audit/EXECUTIVE_SUMMARY.md` - Executive summary
- `docs/tenerife_audit/layout_and_brand_guide.md` - Layout and brand guide
- `docs/tenerife_audit/README.md` - Audit README
- `docs/tenerife_audit/technical_analysis.md` - Technical analysis
- `docs/tenerife_audit/ui_ux_audit_report.md` - UI/UX audit report

### Archive
**Reason:** Already archived historical reports, kept for reference but not required

- `docs/archive/` - All archived reports (entire directory)
  - Foundation reports
  - Layer reports
  - Task completion reports
  - Code review reports
  - All historical audit and validation reports

**Note:** Archive is already separated and can remain for historical reference, but not needed for canonical state.

---

## DELETE

### Code Review Reports
**Reason:** Decision-support documents from code reviews, not canonical reference

- `docs/reviews/L4_ARTIST_CARD_code_review.md` - L4 Artist Card code review
- `docs/reviews/L4_CATEGORY_CARD_code_review_EXTRA.md` - L4 Category Card extra review
- `docs/reviews/L4_CATEGORY_CARD_code_review.md` - L4 Category Card code review
- `docs/reviews/L4_EVENT_CARD_code_review.md` - L4 Event Card code review
- `docs/reviews/L4_S2_CODE_REVIEW.md` - L4 S2 code review
- `docs/reviews/L4_TICKET_CARD_code_review_EXTRA.md` - L4 Ticket Card extra review
- `docs/reviews/L4_TICKET_CARD_code_review.md` - L4 Ticket Card code review
- `docs/reviews/L4_VENUE_CARD_code_review.md` - L4 Venue Card code review
- `docs/reviews/TM_LINT_CI_SCRIPT_01_code_review.md` - Lint CI script review 01
- `docs/reviews/TM_LINT_CI_SCRIPT_FIX_02_code_review.md` - Lint CI script review 02
- `docs/reviews/U10_IMPLEMENT_TENERIFE_ANIMATION_SYSTEM_code_review.md` - U10 animation system review
- `docs/reviews/U7_BUILD_MULTI_BRAND_THEME_ENGINE_code_review.md` - U7 theme engine review
- `docs/reviews/U8_CREATE_DYNAMIC_LAYOUT_PRIMITIVES_code_review.md` - U8 layout primitives review
- `docs/reviews/U9_IMPLEMENT_DYNAMIC_SECTION_BUILDER_code_review.md` - U9 section builder review
- `docs/reviews/UI_MASTER_CODE_REVIEW_U2_U10.md` - UI master code review

### Review/Audit Reports
**Reason:** One-off audit and fix plan documents, not canonical reference

- `docs/review/STORYBOOK_ANIMATIONS_AUDIT.md` - Storybook animations audit
- `docs/review/STORYBOOK_ANIMATIONS_FIX_PLAN.md` - Storybook animations fix plan

---

## Summary

### Statistics

- **KEEP:** 58 files
- **OPTIONAL:** 13 files (migration) + 10 files (tenerife_audit) + archive directory
- **DELETE:** 16 files (code reviews + review audits)

### Notes

1. **Archive directory:** Already separated, can be kept for historical reference but not required for canonical state
2. **Migration docs:** Useful for understanding evolution but not required for operation
3. **Design audit:** Useful for design reference but not required for development
4. **Code reviews:** Decision-support documents, no longer needed after decisions are made
5. **All LOCK and CANONICAL documents preserved**
6. **All foundation guides preserved (especially POSTCSS_CONFIG.md)**
7. **All user-facing guides preserved**

### Next Steps

1. Review this classification
2. Approve DELETE list
3. Execute deletions
4. Optionally move OPTIONAL items to archive or keep as-is

---

**Classification Complete** ✅  
**Ready for Manual Review and Approval**

