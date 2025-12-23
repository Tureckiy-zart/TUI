🧾 **ARCHIVED SUPPORTING ARTIFACT**  
**Canonical entrypoint:** [../DOCS_DEDUP_AUDIT_REPORT.md](../DOCS_DEDUP_AUDIT_REPORT.md)  
**Reason:** Consolidated into appendices  
**Date:** 2025-12-22

---

# Documentation Deduplication Audit - Document Inventory

**Date:** 2025-12-22  
**Status:** WORKING DRAFT  
**Purpose:** Complete inventory of all rule-bearing documents for deduplication audit

---

## Document Classification System

**Types:**
- **AUTHORITY** - Defines architectural law (immutable rules)
- **LOCK** - Tracks lock status, component locks
- **META** - Navigation, maps, indexes (evolvable)
- **RULE** - Behavioral rules, enforcement rules
- **REFERENCE** - API references, typing standards, usage guides
- **WORKFLOW** - Process definitions, pipelines, checklists
- **REPORT** - Audit reports, inventory reports (excluded from rule extraction)

**Topic Tags:**
- `size` - Size scales, size restrictions
- `variant` - Variant naming, variant dictionaries
- `token` - Token usage, token mapping, raw value prohibitions
- `storybook` - Storybook requirements, Matrix/States stories
- `pipeline` - 18A pipeline, audit processes
- `typing` - Typing standards, CVA rules
- `foundation` - Foundation vs extension governance
- `spacing` - Spacing tokens
- `typography` - Typography tokens
- `radius` - Radius tokens
- `motion` - Motion tokens
- `elevation` - Elevation tokens
- `layout` - Layout rules
- `interaction` - Interaction states
- `state` - State definitions

---

## Rule-Bearing Documents Inventory

| Path | Type | Topic Tags | Status | 1-Line Purpose |
|------|------|------------|--------|----------------|
| `docs/architecture/VARIANTS_SIZE_CANON.md` | AUTHORITY | size, variant, storybook, token | ✅ ACTIVE | Global size scale (xs..3xl) and variant naming dictionary |
| `docs/architecture/SIZE_MAPPING_SPEC.md` | AUTHORITY | size, token, storybook, pipeline | ✅ ACTIVE | Size-to-token mapping contract with Storybook and pipeline hooks |
| `docs/architecture/INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md` | AUTHORITY | size | ✅ LOCKED | Interactive size scale (sm\|md\|lg only) for interactive components |
| `docs/architecture/TOKEN_AUTHORITY.md` | AUTHORITY | token | ✅ LOCKED | Token system structure, domain ownership rules |
| `docs/architecture/SPACING_AUTHORITY.md` | AUTHORITY | spacing, token | ✅ LOCKED | Spacing token usage rules, 8px grid system |
| `docs/architecture/TYPOGRAPHY_AUTHORITY.md` | AUTHORITY | typography, token | ✅ LOCKED | Typography token usage rules |
| `docs/architecture/RADIUS_AUTHORITY.md` | AUTHORITY | radius, token | ✅ LOCKED | Border radius token usage rules |
| `docs/architecture/MOTION_AUTHORITY.md` | AUTHORITY | motion, token | ✅ LOCKED | Motion token usage rules |
| `docs/architecture/ELEVATION_AUTHORITY.md` | AUTHORITY | elevation, token | ✅ LOCKED | Elevation token usage rules |
| `docs/architecture/LAYOUT_AUTHORITY.md` | AUTHORITY | layout | ✅ LOCKED | Layout structure and flow rules |
| `docs/architecture/INTERACTION_AUTHORITY.md` | AUTHORITY | interaction, state | ✅ LOCKED | Interaction state activation rules |
| `docs/architecture/STATE_AUTHORITY.md` | AUTHORITY | state | ✅ LOCKED | State token format and naming rules |
| `docs/architecture/STATE_MATRIX.md` | AUTHORITY | state | ✅ LOCKED | Canonical state set definitions |
| `docs/architecture/EXTENSION_AUTHORITY.md` | AUTHORITY | foundation | ✅ ACTIVE | Extension layer boundary contract |
| `docs/architecture/FOUNDATION_LOCK.md` | LOCK | foundation | ✅ LOCKED | Foundation lock status tracking |
| `docs/architecture/ARCHITECTURE_LOCK.md` | LOCK | foundation | ✅ LOCKED | Architecture lock status |
| `docs/architecture/ARCHITECTURE_RULES.md` | AUTHORITY | token, foundation | ✅ ACTIVE | Radix UI and token union rules |
| `docs/architecture/AUTHORITY_NAVIGATION.md` | META | - | ✅ ACTIVE | Authority navigation map and mental model |
| `docs/architecture/EXTENSION_STATE.md` | META | foundation | CANONICAL | Extension state tracking |
| `docs/architecture/FOUNDATION_LOCK_OPERATING_RULES.md` | RULE | foundation, pipeline | ✅ ACTIVE | Foundation component lifecycle process |
| `docs/architecture/FOUNDATION_LIFECYCLE_PROCESS_INDEX.md` | META | foundation, pipeline | ✅ ACTIVE | Foundation lifecycle navigation |
| `docs/architecture/FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md` | RULE | foundation, pipeline | ✅ ACTIVE | Foundation component report template |
| `docs/architecture/FOUNDATION_COMPONENT_SCOPE.md` | RULE | foundation | ✅ ACTIVE | Foundation component scope definitions |
| `docs/architecture/FOUNDATION_CONTRACT.md` | RULE | foundation | ✅ ACTIVE | Foundation component contract |
| `docs/architecture/locks/TEXT_LOCK.md` | LOCK | typography | ✅ LOCKED | Text/Typography component lock |
| `docs/architecture/locks/LAYOUT_LOCK.md` | LOCK | layout | ✅ LOCKED | Layout component lock |
| `docs/architecture/locks/TOOLTIP_POPOVER_LOCK.md` | LOCK | foundation | ✅ LOCKED | Tooltip/Popover component lock |
| `docs/architecture/LINK_NO_ASCHILD_CANONICAL_ANCHOR.md` | LOCK | foundation | ✅ LOCKED | Link component asChild prohibition |
| `docs/architecture/ESLINT_SETUP.md` | RULE | token | ✅ ACTIVE | ESLint rules for token enforcement |
| `docs/architecture/LINTING_STANDARD.md` | RULE | token | ✅ ACTIVE | Linting standards |
| `docs/architecture/eslint_rules_scope_matrix.md` | RULE | token | ✅ ACTIVE | ESLint rules scope matrix |
| `docs/architecture/ASSISTANT_RULES.md` | RULE | - | ✅ ACTIVE | AI assistant development rules |
| `docs/architecture/ASSISTANT_DEVELOPMENT_RULES.md` | RULE | - | ✅ ACTIVE | AI assistant development rules |
| `docs/architecture/ARCHITECTURE_STATE.md` | META | foundation | ✅ ACTIVE | Architecture state tracking |
| `docs/architecture/CANONICAL_STATE_FINAL.md` | META | foundation | ✅ ACTIVE | Canonical state final |
| `docs/architecture/CI_CANONICAL_STATE.md` | META | - | ✅ ACTIVE | CI canonical state |
| `docs/architecture/CI_NODE_MATRIX_DECISION.md` | RULE | - | ✅ ACTIVE | CI node matrix decision |
| `docs/architecture/TOOLING_DECISIONS.md` | RULE | - | ✅ ACTIVE | Tooling decisions |
| `docs/architecture/TOAST_SYSTEM.md` | RULE | foundation | ✅ ACTIVE | Toast system rules |
| `docs/architecture/DOCUMENTATION_CANON_LOCK.md` | LOCK | - | ✅ ACTIVE | Documentation structure lock |
| `docs/architecture/decisions/TUI_API_DECISION_PRIMITIVES_EXPORT.md` | RULE | foundation | ✅ ACTIVE | Primitives export decision |
| `docs/architecture/ARCHITECTURE_DOCUMENTS_AUDIT.md` | REPORT | - | ✅ ACTIVE | Architecture documents audit (excluded from rule extraction) |
| `docs/reference/TYPING_STANDARD.md` | REFERENCE | typing, variant, size | MANDATORY | Public API typing standard (explicit unions, CVA rules) |
| `docs/reference/TYPING_SYSTEM.md` | META | typing | ✅ ACTIVE | Typing system index and navigation |
| `docs/reference/TYPESCRIPT_GENERAL_RULES.md` | REFERENCE | typing | ✅ ACTIVE | General TypeScript implementation rules |
| `docs/reference/TOKENS_OVERVIEW.md` | REFERENCE | token | ✅ ACTIVE | Token system overview |
| `docs/reference/TOKENS_EXPORT_REFERENCE.md` | REFERENCE | token | ✅ ACTIVE | Token export reference |
| `docs/reference/API_REFERENCE.md` | REFERENCE | - | ✅ ACTIVE | API reference |
| `docs/reference/FOUNDATION_REFERENCE.md` | REFERENCE | foundation | ✅ ACTIVE | Foundation component reference |
| `docs/reference/COMPONENT_EXAMPLES.md` | REFERENCE | - | ✅ ACTIVE | Component usage examples |
| `docs/reference/INTEGRATION_GUIDE.md` | REFERENCE | - | ✅ ACTIVE | Integration guide |
| `docs/reference/GRADIENT_EXCEPTIONS.md` | REFERENCE | token | ✅ ACTIVE | Gradient token exceptions |
| `docs/reference/COMPONENTS_INVENTORY.md` | REFERENCE | - | ✅ ACTIVE | Components inventory |
| `docs/reference/API_AND_TOKENS_AUDIT_SUMMARY.md` | REPORT | token | ✅ ACTIVE | API and tokens audit summary (excluded from rule extraction) |
| `docs/workflows/foundation/FOUNDATION_STEP_PIPELINE.md` | WORKFLOW | pipeline, storybook, token, size, variant | ACTIVE | 18A component review pipeline definition |
| `docs/workflows/foundation/old_FOUNDATION_STEP_PIPELINE.md` | WORKFLOW | pipeline | 🕰️ OUTDATED | Old pipeline version (should be deprecated) |
| `docs/workflows/tasks/COMPONENT_CREATION_CHECKLIST.md` | WORKFLOW | foundation | ✅ ACTIVE | Component creation checklist |
| `docs/workflows/tasks/COMPONENT_NEEDS_INVENTORY.md` | WORKFLOW | - | ✅ ACTIVE | Component needs inventory |
| `docs/workflows/tasks/FEEDBACK_COLLECTION_PROCESS.md` | WORKFLOW | - | ✅ ACTIVE | Feedback collection process |
| `docs/workflows/tasks/FEEDBACK_REVIEW_PROCESS.md` | WORKFLOW | - | ✅ ACTIVE | Feedback review process |
| `docs/workflows/tasks/COMPONENT_USAGE_TRACKING.md` | WORKFLOW | - | ✅ ACTIVE | Component usage tracking |
| `docs/workflows/tasks/TASK_INDEX.md` | META | - | ✅ ACTIVE | Task index |
| `.cursor/rules/user-rules.mdc` | RULE | - | ✅ ACTIVE | Cursor AI user rules |
| `.cursor/rules/component-lifecycle.mdc` | RULE | foundation | ✅ ACTIVE | Component lifecycle protocol |
| `.cursor/rules/block-and-scope-rules.mdc` | RULE | foundation | ✅ ACTIVE | Block and scope enforcement rules |
| `.cursor/rules/COMPONENT_CREATION_AND_REFACTOR_CHECKLIST.mdc` | RULE | foundation | ✅ ACTIVE | Component creation and refactor checklist |
| `.cursor/rules/documentation-structure-freeze.mdc` | RULE | - | ✅ ACTIVE | Documentation structure freeze rules |
| `.cursor/rules/CURSOR_RULES_RESOLUTION_ORDER.mdc` | RULE | - | ✅ ACTIVE | Cursor rules resolution order |
| `docs/ARCHITECTURE_CONTEXT.md` | META | foundation | ✅ IMMUTABLE | Single source of truth for architecture context |

---

## Documents Excluded from Rule Extraction

**Reports** (audit findings, not rules):
- All files in `docs/reports/` (baseline reports, lock reports, audit reports)
- `docs/architecture/ARCHITECTURE_DOCUMENTS_AUDIT.md`
- `docs/reference/API_AND_TOKENS_AUDIT_SUMMARY.md`

**Internal/Archive** (not canonical):
- All files in `docs/_internal/`
- All files in `docs_archive/`

**Migrations** (historical context):
- All files in `docs/migrations/`

**Governance** (review templates, not rules):
- All files in `docs/governance/` (review cycles, templates)

---

## Summary Statistics

- **Total Rule-Bearing Documents:** 58
- **Authority Documents:** 14
- **Lock Documents:** 6
- **Meta Documents:** 6
- **Rule Documents:** 12
- **Reference Documents:** 10
- **Workflow Documents:** 7
- **Cursor Rules:** 6

**By High-Risk Topic:**
- **Size:** 3 documents (VARIANTS_SIZE_CANON, SIZE_MAPPING_SPEC, INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT)
- **Variant:** 1 document (VARIANTS_SIZE_CANON)
- **Token:** 6 documents (TOKEN_AUTHORITY, SPACING_AUTHORITY, TYPOGRAPHY_AUTHORITY, RADIUS_AUTHORITY, MOTION_AUTHORITY, ELEVATION_AUTHORITY)
- **Storybook:** 2 documents (VARIANTS_SIZE_CANON, SIZE_MAPPING_SPEC, FOUNDATION_STEP_PIPELINE)
- **Pipeline:** 1 document (FOUNDATION_STEP_PIPELINE)
- **Typing:** 3 documents (TYPING_STANDARD, TYPING_SYSTEM, TYPESCRIPT_GENERAL_RULES)
- **Foundation:** 8 documents (FOUNDATION_LOCK, ARCHITECTURE_LOCK, EXTENSION_AUTHORITY, etc.)

---

**Next Steps:** Use this inventory to extract rule sets by topic and build overlap map.

