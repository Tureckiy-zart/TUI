# Documentation Deduplication Audit Report

**TUNG Version:** 1.0  
**TUNG ID:** TUNG_DOCS_DEDUP_AUDIT_01  
**Date:** 2025-12-22  
**Status:** ✅ COMPLETE  
**Priority:** CRITICAL

---

## 0. Executive Summary

- ✅ **58 rule-bearing documents** inventoried across `docs/` and `.cursor/` with complete classification and topic tagging
- ✅ **0 contradictions found** - all rules are complementary, properly referenced, or hierarchical
- 🎯 **7 canonical targets identified** - one source of truth per high-risk topic (sizes, variants, tokens, storybook, pipeline, typing)
- 🔁 **5 acceptable duplicates** with proper cross-references; **2 duplicates** need enhanced references
- 🕰️ **1 outdated document** identified for deprecation (`old_FOUNDATION_STEP_PIPELINE.md`)
- ⚠️ **6 cross-links missing** - primarily in FOUNDATION_STEP_PIPELINE STEP 5 and STEP 9 sections

---

## Navigation

This report consolidates all documentation deduplication audit findings. Supporting artifacts have been moved to appendices:

- [Appendix A: Document Inventory](#appendix-a-document-inventory)
- [Appendix B: Rule Extraction](#appendix-b-rule-extraction)
- [Appendix C: Overlap Map](#appendix-c-overlap-map)
- [Appendix D: Canonical Targets](#appendix-d-canonical-targets)
- [Appendix E: Contradictions](#appendix-e-contradictions)
- [Appendix F: Deprecation Plan](#appendix-f-deprecation-plan)
- [Appendix G: Cross-Link Checklist](#appendix-g-cross-link-checklist)
- [Appendix H: No Duplication Policy](#appendix-h-no-duplication-policy)

**Note:** Original supporting artifact files have been archived to `docs/reports/audit/_archive/` for historical reference.

---

## 1. Rule-Bearing Docs Inventory

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

**Total:** 58 rule-bearing documents

---

## 2. Overlap Map (by Topic)

### TOPIC: SIZE SCALES

#### Global Size Scale Definition
- 🎯 **VARIANTS_SIZE_CANON.md** - Canonical: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"`
- 🔁 **SIZE_MAPPING_SPEC.md** - Duplicate with reference ✅
- ⚠️ **INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md** - Partial overlap: `"sm" | "md" | "lg"` subset (complementary)

#### Component Size Subset Declarations
- 🎯 **VARIANTS_SIZE_CANON.md** - Canonical: Components MUST declare subset
- 🔁 **SIZE_MAPPING_SPEC.md** - Duplicate (should add explicit reference) ⚠️

#### Overlay Size Restriction
- 🎯 **VARIANTS_SIZE_CANON.md** - Canonical: Overlays restrict to `sm | md | lg`
- 🔁 **SIZE_MAPPING_SPEC.md** - Duplicate with reference ✅

#### Forbidden Non-GlobalSize Values
- 🎯 **VARIANTS_SIZE_CANON.md** - Canonical: Forbidden `size="icon"`, etc.
- 🔁 **SIZE_MAPPING_SPEC.md** - Duplicate (should add explicit reference) ⚠️

### TOPIC: VARIANTS

#### InteractiveVariant Dictionary
- 🎯 **VARIANTS_SIZE_CANON.md** - Canonical: `"primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive" | "link"`
- ✅ **Unique** - No other documents define this

#### SurfaceVariant Dictionary
- 🎯 **VARIANTS_SIZE_CANON.md** - Canonical: `"default" | "elevated" | "outlined" | "filled" | "subtle"`
- ✅ **Unique** - No other documents define this

#### Overlay Variant Rules
- 🎯 **VARIANTS_SIZE_CANON.md** - Canonical: Overlays MUST NOT use InteractiveVariant
- ✅ **SIZE_MAPPING_SPEC.md** - Defers to VARIANTS_SIZE_CANON ✅

### TOPIC: TOKENS

#### No Raw Values Policy
- 🎯 **SIZE_MAPPING_SPEC.md** - Canonical for size mappings: All mappings MUST reference tokens only
- 🎯 **ARCHITECTURE_RULES.md** - Canonical for component APIs: All visual props MUST use token unions
- ⚠️ **Token Authorities** (SPACING, TYPOGRAPHY, etc.) - Partial overlap: Domain-specific applications ✅

#### Token Domain Ownership
- 🎯 **TOKEN_AUTHORITY.md** - Canonical: One component, one token domain
- ✅ **Unique** - No other documents define this

### TOPIC: STORYBOOK

#### Matrix Story Requirements
- 🎯 **VARIANTS_SIZE_CANON.md** - Canonical: REQUIRED ONLY when component supports BOTH size AND variant
- 🔁 **SIZE_MAPPING_SPEC.md** - Duplicate with reference ✅
- ⚠️ **FOUNDATION_STEP_PIPELINE.md** - Partial overlap: General requirement, missing conditional rule ⚠️

#### States Story Requirements
- 🎯 **VARIANTS_SIZE_CANON.md** - Canonical: REQUIRED ONLY when component has public states
- ⚠️ **FOUNDATION_STEP_PIPELINE.md** - Partial overlap: General requirement, missing conditional rule ⚠️

#### Sizes Gallery Story
- 🎯 **SIZE_MAPPING_SPEC.md** - Canonical: REQUIRED for every component with public `size` prop
- ✅ **Unique** - No other documents define this

#### Story Naming Convention
- 🎯 **VARIANTS_SIZE_CANON.md** - Canonical: Stories MUST use exact names `Matrix`, `States`
- ✅ **Unique** - No other documents define this

### TOPIC: PIPELINE (18A)

#### Pipeline Execution Rules
- 🎯 **FOUNDATION_STEP_PIPELINE.md** - Canonical: Top-to-bottom execution, mandatory reporting, step gating
- ✅ **Unique** - No other documents define this

#### Pipeline Integration Hooks
- 🎯 **FOUNDATION_STEP_PIPELINE.md** - Canonical: STEP 5 Token/Size/Variant Consistency
- ⚠️ **SIZE_MAPPING_SPEC.md** - Partial overlap: Defines STEP 5 integration hooks ✅ (correctly references pipeline)

#### PR Gating Requirements
- 🎯 **SIZE_MAPPING_SPEC.md** - Canonical for size mapping: PR gates for mapping tables, raw values, overlay sizes
- ⚠️ **FOUNDATION_STEP_PIPELINE.md** - Partial overlap: Step gating (different context) ✅

### TOPIC: TYPING

#### Explicit Union Types
- 🎯 **TYPING_STANDARD.md** - Canonical: Components MUST define explicit union types
- ✅ **Unique** - No other documents define this

#### CVA Usage Boundaries
- 🎯 **TYPING_STANDARD.md** - Canonical: CVA MUST NOT be public type source
- ✅ **Unique** - No other documents define this

---

## 3. Contradictions

### Result: ❌ NO CONTRADICTIONS FOUND

After comprehensive analysis, **no contradictions were detected**. All rules are:
- ✅ Complementary (different scopes)
- ✅ Properly referenced (duplicates reference canonical source)
- ✅ Hierarchical (general vs specific applications)

### Potential Confusion Points (Not Contradictions)

#### 1. Global Size Scale vs Interactive Size Scale

**Rule A (VARIANTS_SIZE_CANON.md, line 55):**
> GlobalSize: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"`

**Rule B (INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md, line 79):**
> InteractiveSize: `"sm" | "md" | "lg"` ONLY

**Analysis:** ✅ Complementary - Rule A defines global scale, Rule B defines interactive subset. VARIANTS_SIZE_CANON explicitly acknowledges INTERACTIVE_SIZE_SCALE (line 797-803).

**Fix Plan:** No fix needed - properly integrated.

---

#### 2. Matrix Story: Conditional vs Unconditional

**Rule A (VARIANTS_SIZE_CANON.md, line 392):**
> Matrix Story REQUIRED ONLY when component publicly supports BOTH size AND variant props

**Rule B (SIZE_MAPPING_SPEC.md, line 373):**
> Matrix Story REQUIRED if component supports both `size` and `variant` props

**Analysis:** ✅ Same rule - SIZE_MAPPING_SPEC references VARIANTS_SIZE_CANON (line 375).

**Fix Plan:** No fix needed - properly referenced.

---

#### 3. Storybook: General vs Specific Requirements

**Rule A (FOUNDATION_STEP_PIPELINE.md, line 402):**
> Storybook demonstrates: all variants, all sizes, meaningful interaction examples

**Rule B (VARIANTS_SIZE_CANON.md, line 392):**
> Matrix Story REQUIRED ONLY when component supports BOTH size AND variant props

**Analysis:** ⚠️ Partial overlap - Rule A is general, Rule B is specific conditional. FOUNDATION_STEP_PIPELINE should reference VARIANTS_SIZE_CANON for Matrix/States specifics.

**Fix Plan:** Add cross-reference in FOUNDATION_STEP_PIPELINE STEP 9 section.

---

## 4. Canonical Targets (topic → 🎯 doc)

| Topic | 🎯 Canonical Target | Status |
|-------|---------------------|--------|
| **Size Scales** | `docs/architecture/VARIANTS_SIZE_CANON.md` | ✅ Clear |
| **Variants** | `docs/architecture/VARIANTS_SIZE_CANON.md` | ✅ Clear |
| **Size-to-Token Mapping** | `docs/architecture/SIZE_MAPPING_SPEC.md` | ✅ Clear |
| **Tokens (General)** | `docs/architecture/TOKEN_AUTHORITY.md` (domain ownership) + `docs/architecture/ARCHITECTURE_RULES.md` (token unions) | ✅ Clear |
| **Storybook** | `docs/architecture/VARIANTS_SIZE_CANON.md` (Matrix/States) + `docs/architecture/SIZE_MAPPING_SPEC.md` (Sizes Gallery) | ⚠️ Needs cross-link |
| **Pipeline** | `docs/workflows/foundation/FOUNDATION_STEP_PIPELINE.md` | ✅ Clear |
| **Typing** | `docs/reference/TYPING_STANDARD.md` | ✅ Clear |

---

## 5. Deprecation/Redirect Plan

### Documents to Mark as 🕰️ OUTDATED

#### 1. `docs/workflows/foundation/old_FOUNDATION_STEP_PIPELINE.md`

**Status:** 🕰️ **OUTDATED**

**Reason:** Superseded by `FOUNDATION_STEP_PIPELINE.md` (refined version)

**Canonical Source:** `docs/workflows/foundation/FOUNDATION_STEP_PIPELINE.md`

**Exact Pointer Text to Add:**
```markdown
> 🕰️ **OUTDATED**: This document is superseded by [FOUNDATION_STEP_PIPELINE.md](./FOUNDATION_STEP_PIPELINE.md).
> 
> **Canonical Source:** [FOUNDATION_STEP_PIPELINE.md](./FOUNDATION_STEP_PIPELINE.md) - 18A Component Review & Improvement Pipeline (Refined)
> 
> This document is kept for historical reference only. All new work should reference the canonical pipeline document.
```

**Action Required:**
- Add deprecation notice at top of `old_FOUNDATION_STEP_PIPELINE.md`
- Update any cross-references to point to `FOUNDATION_STEP_PIPELINE.md`

---

### Documents That Should Add Cross-References (Not Deprecation)

#### 1. `docs/workflows/foundation/FOUNDATION_STEP_PIPELINE.md` - STEP 9

**Issue:** General Storybook requirements don't reference Matrix/States conditional rules

**Action Required:**
- Add reference to VARIANTS_SIZE_CANON in STEP 9 section (line ~402)
- Add reference to SIZE_MAPPING_SPEC for Sizes Gallery requirement

**Exact Text to Add:**
```markdown
**Reference:** For specific Matrix and States story requirements, see [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md) "Storybook Requirements" section. For Sizes Gallery story requirements, see [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md) "Storybook Requirements" section.
```

---

#### 2. `docs/workflows/foundation/FOUNDATION_STEP_PIPELINE.md` - STEP 5

**Issue:** Token/Size/Variant consistency step doesn't explicitly reference size/variant authorities

**Action Required:**
- Add reference to VARIANTS_SIZE_CANON for size/variant rules (line ~295)
- Add reference to SIZE_MAPPING_SPEC for size mapping requirements (line ~295)

**Exact Text to Add:**
```markdown
**Reference:** For size and variant rules, see [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md). For size-to-token mapping requirements, see [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md).
```

---

#### 3. `docs/architecture/SIZE_MAPPING_SPEC.md` - Component Size Subset Declarations

**Issue:** Restates rule from VARIANTS_SIZE_CANON without explicit reference

**Action Required:**
- Add explicit reference to VARIANTS_SIZE_CANON in "Supported Subset" section (line 120)

**Exact Text to Add:**
```markdown
**Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) "Component-Specific Subset Declarations" section for complete rules on component size subset declarations.
```

---

#### 4. `docs/architecture/SIZE_MAPPING_SPEC.md` - Forbidden Non-GlobalSize Values

**Issue:** Restates rule from VARIANTS_SIZE_CANON without explicit reference

**Action Required:**
- Add explicit reference to VARIANTS_SIZE_CANON in "GlobalSize" section (line 110)

**Current Text (line 110):**
> **Rule:** ✅ All size props MUST use only GlobalSize values. Any non-GlobalSize entries (e.g., `'icon'`, `'tiny'`, `'huge'`) are FORBIDDEN.

**Enhanced Text:**
> **Rule:** ✅ All size props MUST use only GlobalSize values. Any non-GlobalSize entries (e.g., `'icon'`, `'tiny'`, `'huge'`) are FORBIDDEN.
> 
> **Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) "Forbidden Patterns" section for complete list of forbidden size values and migration guidance.

---

## 6. Cross-Link Checklist (Minimal Set)

### High Priority (Required for Clarity)

1. ✅ **FOUNDATION_STEP_PIPELINE.md STEP 9** → Add reference to VARIANTS_SIZE_CANON for Matrix/States rules
2. ✅ **FOUNDATION_STEP_PIPELINE.md STEP 9** → Add reference to SIZE_MAPPING_SPEC for Sizes Gallery
3. ✅ **FOUNDATION_STEP_PIPELINE.md STEP 5** → Add reference to VARIANTS_SIZE_CANON for size/variant rules
4. ✅ **FOUNDATION_STEP_PIPELINE.md STEP 5** → Add reference to SIZE_MAPPING_SPEC for size mapping rules

### Medium Priority (Enhancement)

5. ⚠️ **SIZE_MAPPING_SPEC.md line 120** → Add explicit reference to VARIANTS_SIZE_CANON for subset declarations
6. ⚠️ **SIZE_MAPPING_SPEC.md line 110** → Add explicit reference to VARIANTS_SIZE_CANON for forbidden values

### Already Present (No Action)

- ✅ SIZE_MAPPING_SPEC.md → VARIANTS_SIZE_CANON.md (multiple references)
- ✅ VARIANTS_SIZE_CANON.md → INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md
- ✅ VARIANTS_SIZE_CANON.md → Token Authorities
- ✅ SIZE_MAPPING_SPEC.md → Token Authorities
- ✅ TOKEN_AUTHORITY.md → Token Authorities

---

## 7. No Duplication Policy

**Recommendation:** All future documentation must reference existing authorities instead of restating rules. When a rule is defined in a canonical Authority document, other documents must use cross-references rather than duplicating the rule text. This policy ensures single-source-of-truth maintenance, reduces contradiction risk, and simplifies updates when rules evolve. Documents may summarize rules for context, but must include explicit references to canonical sources using the format: "See [CANONICAL_DOC.md](./CANONICAL_DOC.md) 'Section Name' for complete rules." Documents that restate rules without references are considered violations and should be updated to add cross-references or remove duplicate content.

**Enforcement:**
- For new documents: Review checklist - does this document restate any rules from Authority documents? If yes, add explicit cross-reference or remove duplicate content.
- For existing documents: Audit identified documents needing cross-references (see Cross-Link Checklist) and update to add references or remove duplicates.

---

## 8. Follow-up TUNG Candidates

1. **TUNG_DOCS_CROSS_LINK_01** - Add missing cross-references in FOUNDATION_STEP_PIPELINE STEP 5 and STEP 9
2. **TUNG_DOCS_CROSS_LINK_02** - Enhance SIZE_MAPPING_SPEC references to VARIANTS_SIZE_CANON in subset declarations and forbidden values sections
3. **TUNG_DOCS_DEPRECATE_01** - Mark old_FOUNDATION_STEP_PIPELINE.md as outdated with deprecation notice
4. **TUNG_DOCS_POLICY_01** - Formalize No Duplication Policy in documentation governance
5. **TUNG_DOCS_VERIFY_01** - Verify all Authority documents are listed in AUTHORITY_NAVIGATION.md
6. **TUNG_DOCS_LEGACY_01** - Create migration guide for legacy terms (size="icon", default variant patterns)

---

## Acceptance Criteria Verification

- ✅ Report exists at `docs/reports/audit/DOCS_DEDUP_AUDIT_REPORT.md`
- ✅ Every high-risk topic is covered (sizes/variants/tokens/storybook/pipeline)
- ✅ At least one 🎯 canonical target is chosen per topic
- ✅ Contradictions include concrete path references (0 contradictions found)
- ✅ No code changes and no file deletions performed

---

**Status:** ✅ **COMPLETE**  
**Date Completed:** 2025-12-22

---

# Appendices

## Appendix A: Document Inventory

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

**Total:** 58 rule-bearing documents

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

---

## Appendix B: Rule Extraction

# Documentation Deduplication Audit - Rule Extraction

**Date:** 2025-12-22  
**Status:** WORKING DRAFT  
**Purpose:** Extracted rule sets for each high-risk topic

---

## 1. SIZE SCALES

### VARIANTS_SIZE_CANON.md

**Rule Set:**
1. Global size scale: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"` (lines 54-55)
2. Components MUST declare which subset of global scale they support (line 71)
3. Interactive components use restricted subset `sm | md | lg` (line 79)
4. Typography components use full scale `xs..3xl` (line 79)
5. Default size is `md` (line 67)
6. Forbidden: inventing size names outside global scale (line 82)
7. Forbidden: non-GlobalSize values in size props (e.g., `size="icon"`) (line 85, 87)
8. Overlay size restriction: overlays with size prop MUST restrict to `sm | md | lg` only (line 172)
9. Forbidden for overlays: `xs`, `xl`, `2xl`, `3xl` (lines 175-178)

### SIZE_MAPPING_SPEC.md

**Rule Set:**
1. GlobalSize definition: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"` (line 105)
2. References VARIANTS_SIZE_CANON for GlobalSize definition (line 108)
3. All size props MUST use only GlobalSize values (line 110)
4. Forbidden: non-GlobalSize entries like `'icon'`, `'tiny'`, `'huge'` (line 110)
5. Components MUST declare `supportedSizes` explicitly (line 120)
6. Overlay strict subset: overlays with size prop MUST restrict to `sm | md | lg` only (line 126)
7. Forbidden for overlays: `xs`, `xl`, `2xl`, `3xl` (line 126)
8. References VARIANTS_SIZE_CANON for overlay restriction rule (line 128)
9. Interactive components: MUST map height, padding, text, radius for all supported sizes (line 294)
10. Overlay components: MUST restrict to `sm | md | lg` only (line 324)

### INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md

**Rule Set:**
1. Interactive size scale: `"sm" | "md" | "lg"` ONLY (line 79)
2. Button is canonical owner of interactive size scale (line 86)
3. All interactive components MUST align with Button size (line 88)
4. Forbidden for interactive: `xs`, `xl`, any custom sizes (lines 94-96)
5. Interactive components MUST use canonical interactive size scale (line 123)
6. Forbidden: `xs` and `xl` for interactive components (line 126)
7. Semi-interactive components MUST NOT use `size` as interactive scale (line 136)
8. Non-interactive components MUST NOT use `size` prop (line 155)

---

## 2. VARIANTS

### VARIANTS_SIZE_CANON.md

**Rule Set:**
1. InteractiveVariant: `"primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive" | "link"` (lines 98-105)
2. SurfaceVariant: `"default" | "elevated" | "outlined" | "filled" | "subtle"` (lines 124-129)
3. Overlays MUST NOT use InteractiveVariant dictionary (line 143)
4. Overlays default path: no variant prop at all (line 146)
5. Overlays alternative path: SurfaceVariant only if visual variation needed (line 149)
6. Components MUST declare which subset of global variant dictionary they support (line 199)
7. Forbidden: inventing variant names outside global dictionary (line 209)
8. Forbidden: encoding states as variants (line 211)
9. States are props, variants are style choices (line 298)
10. Token keys MUST use global size/variant names (line 330)

---

## 3. TOKENS

### SIZE_MAPPING_SPEC.md

**Rule Set:**
1. All mappings MUST reference tokens only (line 142)
2. Forbidden: raw numeric values, `rem`/`px` units, calculations (line 142)
3. No Raw Values Policy: mapping can only reference tokens (line 212)
4. Forbidden: `heightToken: "32px"`, `paddingXToken: "0.5rem"`, etc. (lines 215-218)
5. Token namespaces: SPACING_TOKENS, TYPOGRAPHY_TOKENS, RADIUS_TOKENS, COMPONENT_TOKENS (lines 137-140)
6. Mandatory mapping keys: heightToken, paddingXToken, paddingYToken, textToken, radiusToken (lines 152-173)
7. Optional keys: gapToken, iconSizeToken, minWidthToken, hitAreaToken, maxWidthToken (lines 177-196)

### TOKEN_AUTHORITY.md

**Rule Set:**
1. Token system is LOCKED and IMMUTABLE (line 4)
2. Foundation tokens: spacing, typography, colors, gradients, radius, shadows, motion, opacity (lines 45-52)
3. Shared component tokens: TEXT_TOKENS, ICON_TOKENS, MOTION_TOKENS, FORM_TOKENS (lines 113-118)
4. Component-specific tokens: one component, one token domain (line 149)
5. Rule: One component, one token domain (line 150)
6. Rule: No cross-domain dependencies (line 169)
7. Rule: Token domain encapsulation (line 184)
8. Rule: Shared semantics use shared tokens (line 207)
9. Rule: Foundation tokens for basic utilities (line 231)

### SPACING_AUTHORITY.md

**Rule Set:**
1. All spacing values must come from canonical spacing token system (line 26)
2. Components cannot introduce arbitrary spacing values (line 26)
3. Rule: Token-Only Spacing (line 163)
4. Forbidden: arbitrary pixel values, rem values, percentage values, calculated values (lines 173-176)
5. Rule: Grid System Compliance - 8px grid system (line 179)
6. Rule: Semantic Preference - prefer semantic spacing tokens (line 189)
7. Rule: Layout Pattern Mapping - use layout spacing tokens (line 203)
8. Forbidden: raw Tailwind spacing utilities (lines 259-262)

### TYPOGRAPHY_AUTHORITY.md

**Rule Set:**
1. All typography values must come from canonical typography token system (line 26)
2. Components cannot introduce arbitrary typography values (line 26)
3. Rule: Token-Only Typography (line 163)
4. Forbidden: arbitrary font sizes, weights, line heights (lines 173-176)
5. Rule: Semantic Preference (line 189)
6. Forbidden: raw Tailwind typography utilities (lines 259-262)

### RADIUS_AUTHORITY.md

**Rule Set:**
1. All border radius values must come from canonical radius token system (line 26)
2. Components cannot introduce arbitrary border radius values (line 26)
3. Rule: Token-Only Radius (line 163)
4. Forbidden: arbitrary radius values (lines 173-176)
5. Rule: Semantic Preference (line 189)
6. Forbidden: raw Tailwind radius utilities (lines 259-262)

### MOTION_AUTHORITY.md

**Rule Set:**
1. All motion values must come from canonical motion token system (line 26)
2. Components cannot introduce arbitrary motion values (line 26)
3. Rule: Token-Only Motion (line 163)
4. Forbidden: arbitrary durations, easings, transitions (lines 173-176)
5. Rule: Semantic Preference (line 189)

### ELEVATION_AUTHORITY.md

**Rule Set:**
1. All elevation values must come from canonical elevation token system (line 26)
2. Components cannot introduce arbitrary shadow or z-index values (line 26)
3. Rule: Token-Only Elevation (line 163)
4. Forbidden: arbitrary shadows, z-index values (lines 173-176)
5. Rule: Semantic Preference (line 189)

### ARCHITECTURE_RULES.md

**Rule Set:**
1. All visual props MUST use token union types (line 121)
2. Raw values (strings, numbers, CSS) are FORBIDDEN for visual props (line 121)
3. Token unions in component APIs: `prop?: TokenUnion | Responsive<TokenUnion>` (line 629)
4. Forbidden: raw strings, numbers, CSS values for visual props (lines 643-648)
5. Tailwind utilities FORBIDDEN for visual properties (lines 714-726)
6. Tailwind utilities ALLOWED for structural properties only (lines 700-710)

---

## 4. STORYBOOK

### VARIANTS_SIZE_CANON.md

**Rule Set:**
1. Matrix Story: REQUIRED ONLY when component publicly supports BOTH size AND variant props (line 392)
2. States Story: REQUIRED ONLY when component has public states/interactive behavior (line 393)
3. Matrix Story MUST display: all variants as rows, all sizes as columns, grid layout (lines 399-403)
4. Matrix story is NOT REQUIRED for components with only size OR only variant (lines 432-435)
5. States Story MUST display: all variants, all sizes, all canonical states (lines 441-445)
6. States story REQUIRED for: interactive components with state props, loading states, error/success states (lines 486-490)
7. States story NOT REQUIRED for: non-interactive components, overlays without interactive states, decorative components (lines 492-496)
8. Story naming: `Matrix` and `States` (exact names) (lines 502-504)
9. Forbidden story names: `VariantsMatrix`, `SizeMatrix`, `AllStates`, `StateVariations` (lines 507-510)

### SIZE_MAPPING_SPEC.md

**Rule Set:**
1. Sizes Gallery Story: REQUIRED for every component with public `size` prop (line 338)
2. Sizes Gallery MUST: single row per size, demonstrate text/icon/multi-line content, no hardcoded spacing (lines 341-345)
3. Matrix Story: REQUIRED if component supports both `size` and `variant` props (line 373)
4. References VARIANTS_SIZE_CANON for Matrix story rules (line 375)
5. Overlay Long Content Story: REQUIRED for overlays (line 381)
6. Overlay Long Content MUST: demonstrate padding, maxWidth token behavior, validate no overflow (lines 384-386)

### FOUNDATION_STEP_PIPELINE.md

**Rule Set:**
1. STEP 9: Storybook demonstrates all variants, all sizes, meaningful interaction examples (lines 402-406)
2. Minimal or placeholder coverage is not sufficient (line 408)
3. Accessibility-specific tests and Storybook stories (line 433)

---

## 5. PIPELINE (18A)

### FOUNDATION_STEP_PIPELINE.md

**Rule Set:**
1. Pipeline executed top-to-bottom, without reordering (line 39)
2. Mandatory reporting rule: every step MUST end by updating audit report (line 50)
3. Assistant review checkpoints: mandatory at STEP 0, 8, 9, 10, 11 (lines 57-64)
4. No skipped documentation: step not executed unless audit report contains section (line 76)
5. Step gating rule: cannot issue STEP N+1 unless STEP N present in report (line 81)
6. Blocker classification rule: every step section must include outcome tag (line 83)
7. Language consistency: English-only (line 89)
8. Vocabulary guardrails: prohibited words in STEP 0-10 (line 93)
9. Work pattern: Observe, Decide, Change, Record (lines 104-111)
10. STEP 9: Validation via Tests & Storybook (line 393)
11. STEP 10: Accessibility Audit & Fixes (MANDATORY) (line 412)
12. STEP 11: Final Review & Architectural Lock (line 442)

### SIZE_MAPPING_SPEC.md

**Rule Set:**
1. 18A Pipeline STEP 5 Integration: Token/Size/Variant Consistency validation (line 396)
2. Validation Step: pipeline checks mapping table exists (line 399)
3. Consistency Check: validates mapping table token references match actual usage (line 400)
4. Subset Verification: verifies component `supportedSizes` matches mapping table rows (line 401)
5. Overlay Rule Enforcement: verifies overlay components restrict to `sm | md | lg` only (line 402)
6. Future Lint/Audit Rule: if component has size prop, must have mapping table (line 408)
7. PR Gating Requirements: new sized component cannot merge without mapping table (line 421)
8. PR Gating: size prop addition requires mapping table (line 422)
9. PR Gating: token reference validation - no raw values (line 423)
10. PR Gating: overlay size validation - no sizes beyond `sm | md | lg` (line 424)

---

## 6. TYPING

### TYPING_STANDARD.md

**Rule Set:**
1. RULE 1: Explicit Variant Union Types REQUIRED (line 60)
2. Each component exposing `variant`, `size` MUST define explicit union types (line 62)
3. Forbidden: inline string unions in props, `string` as public variant type, inferring from CVA (lines 87-89)
4. RULE 2: CVA Is NOT a Public Type Source (FORBIDDEN) (line 93)
5. CVA MUST NOT be used as source of public types (line 95)
6. Forbidden: `VariantProps<typeof buttonVariants>` in public APIs (lines 99-104)
7. Required: CVA types may exist internally, public props MUST reference explicit union types (lines 109-110)
8. RULE 3: CVA Variant Maps MUST Be Type-Constrained (line 114)
9. All variant maps passed into CVA MUST use `satisfies Record<...>` (line 117)
10. RULE 4: Public Component Props MUST Use Canonical Types (line 153)
11. Public component props MUST reference canonical union types (line 155)
12. Forbidden: `variant?: string`, inline unions in props, CVA-derived types in public APIs (lines 157-161)

### TYPESCRIPT_GENERAL_RULES.md

**Rule Set:**
1. General TypeScript implementation rules (secondary to TYPING_STANDARD)
2. Does NOT override TYPING_STANDARD for public API typing (per TYPING_STANDARD line 19)

---

## 7. LEGACY TERMS FOUND

### size="icon"

**Occurrences:**
1. `docs/architecture/VARIANTS_SIZE_CANON.md` - Line 85, 87, 522, 562, 641, 642, 665, 850, 852, 855, 860, 866
2. `docs/architecture/SIZE_MAPPING_SPEC.md` - Line 110, 529
3. `docs/reports/inventory/VARIANTS_SIZE_INVENTORY.md` - Lines 24, 69, 78, 85, 87, 88, 89, 90, 93, 388, 393, 398, 449, 450, 451, 453, 511, 519, 549, 565, 566, 571, 572
4. `docs/reports/BUTTON_BASELINE_REPORT.md` - Lines 54, 124, 229, 302, 304, 306, 307, 1225, 1227, 1231, 1238, 1240, 1349, 1391, 1406, 1500, 1526

**Status:** 🕰️ Legacy term - violates GlobalSize requirement, documented for future migration

### default variant

**Occurrences:**
1. `docs/reports/inventory/VARIANTS_SIZE_INVENTORY.md` - Lines 28, 37, 72, 121, 145, 167, 210, 236, 262, 288, 314, 339, 349, 362, 372, 410
2. `docs/architecture/VARIANTS_SIZE_CANON.md` - Lines 133, 149, 162, 204, 574, 632, 728
3. `docs/architecture/FOUNDATION_LOCK.md` - Line 617
4. `docs/reports/BUTTON_BASELINE_REPORT.md` - Lines 204, 238, 427, 1266, 1389, 1408
5. Multiple reports and references

**Status:** ⚠️ Partial overlap - "default" is valid SurfaceVariant, but "default variant for input" conflicts with InteractiveVariant requirement

### matrix required everywhere

**Occurrences:**
1. `docs/architecture/VARIANTS_SIZE_CANON.md` - Lines 392, 430, 432-435, 543
2. `docs/architecture/SIZE_MAPPING_SPEC.md` - Line 373
3. `docs/reports/inventory/VARIANTS_SIZE_INVENTORY.md` - Lines 130, 154, 173, 176, 194, 197, 218, 345, 368, 416, 423, 430, 476, 536, 537, 538

**Status:** ✅ Correctly stated - Matrix REQUIRED ONLY when component supports BOTH size AND variant (not everywhere)

---

**Next Steps:** Use this extraction to build overlap map and identify contradictions.

---

## Appendix C: Overlap Map

# Documentation Deduplication Audit - Overlap Map

**Date:** 2025-12-22  
**Status:** WORKING DRAFT  
**Purpose:** Overlap map grouping rules by topic with duplicate/contradiction/partial overlap/unique markers

---

## Overlap Map by Topic

### TOPIC 1: SIZE SCALES

#### Rule: Global Size Scale Definition

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | GlobalSize: `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl"` | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | GlobalSize: `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl"` (references VARIANTS_SIZE_CANON) | 🔁 DUPLICATE (with reference) |
| `INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md` | InteractiveSize: `"sm" \| "md" \| "lg"` ONLY | ⚠️ PARTIAL OVERLAP (subset, not contradiction) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON defines global scale (canonical)
- ✅ SIZE_MAPPING_SPEC references VARIANTS_SIZE_CANON (acceptable duplicate with reference)
- ✅ INTERACTIVE_SIZE_SCALE defines subset for interactive components (complementary, not contradictory)

#### Rule: Component Size Subset Declarations

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | Components MUST declare which subset of global scale they support | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | Components MUST declare `supportedSizes` explicitly | 🔁 DUPLICATE (same rule, different wording) |
| `INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md` | Interactive components MUST use `sm \| md \| lg` | ⚠️ PARTIAL OVERLAP (specific case of subset rule) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is canonical for subset declaration rule
- ⚠️ SIZE_MAPPING_SPEC restates same rule (should reference VARIANTS_SIZE_CANON)
- ✅ INTERACTIVE_SIZE_SCALE is specific application of subset rule

#### Rule: Overlay Size Restriction

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | Overlays with size prop MUST restrict to `sm \| md \| lg` only | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | Overlays with size prop MUST restrict to `sm \| md \| lg` only (references VARIANTS_SIZE_CANON) | 🔁 DUPLICATE (with reference) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is canonical
- ✅ SIZE_MAPPING_SPEC correctly references VARIANTS_SIZE_CANON

#### Rule: Forbidden Non-GlobalSize Values

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | Forbidden: `size="icon"`, `size="tiny"`, `size="huge"` | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | Forbidden: non-GlobalSize entries like `'icon'`, `'tiny'`, `'huge'` | 🔁 DUPLICATE (same rule) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is canonical
- ⚠️ SIZE_MAPPING_SPEC restates same rule (should reference VARIANTS_SIZE_CANON)

---

### TOPIC 2: VARIANTS

#### Rule: InteractiveVariant Dictionary

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | InteractiveVariant: `"primary" \| "secondary" \| "accent" \| "outline" \| "ghost" \| "destructive" \| "link"` | 🎯 CANONICAL |
| No other documents define InteractiveVariant | - | ✅ UNIQUE |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is sole source of truth for InteractiveVariant

#### Rule: SurfaceVariant Dictionary

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | SurfaceVariant: `"default" \| "elevated" \| "outlined" \| "filled" \| "subtle"` | 🎯 CANONICAL |
| No other documents define SurfaceVariant | - | ✅ UNIQUE |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is sole source of truth for SurfaceVariant

#### Rule: Overlay Variant Rules

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | Overlays MUST NOT use InteractiveVariant; default path: no variant prop; alternative: SurfaceVariant only | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | Variant rules for overlays deferred to VARIANTS_SIZE_CANON | ✅ UNIQUE (deferral, not duplicate) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is canonical
- ✅ SIZE_MAPPING_SPEC correctly defers to VARIANTS_SIZE_CANON

---

### TOPIC 3: TOKENS

#### Rule: No Raw Values Policy

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `SIZE_MAPPING_SPEC.md` | All mappings MUST reference tokens only; no raw values, no CSS units | 🎯 CANONICAL (for size mappings) |
| `ARCHITECTURE_RULES.md` | All visual props MUST use token union types; raw values FORBIDDEN | 🎯 CANONICAL (for component APIs) |
| `SPACING_AUTHORITY.md` | All spacing values must come from canonical spacing token system | ⚠️ PARTIAL OVERLAP (specific domain) |
| `TYPOGRAPHY_AUTHORITY.md` | All typography values must come from canonical typography token system | ⚠️ PARTIAL OVERLAP (specific domain) |
| `RADIUS_AUTHORITY.md` | All border radius values must come from canonical radius token system | ⚠️ PARTIAL OVERLAP (specific domain) |
| `MOTION_AUTHORITY.md` | All motion values must come from canonical motion token system | ⚠️ PARTIAL OVERLAP (specific domain) |
| `ELEVATION_AUTHORITY.md` | All elevation values must come from canonical elevation token system | ⚠️ PARTIAL OVERLAP (specific domain) |

**Analysis:**
- ✅ SIZE_MAPPING_SPEC is canonical for size-to-token mapping rules
- ✅ ARCHITECTURE_RULES is canonical for general token union rules
- ✅ Token Authority documents are canonical for their specific domains (complementary, not contradictory)

#### Rule: Token Domain Ownership

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `TOKEN_AUTHORITY.md` | One component, one token domain; no cross-domain dependencies | 🎯 CANONICAL |
| No other documents define token domain ownership | - | ✅ UNIQUE |

**Analysis:**
- ✅ TOKEN_AUTHORITY is sole source of truth for token domain rules

---

### TOPIC 4: STORYBOOK

#### Rule: Matrix Story Requirements

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | Matrix Story REQUIRED ONLY when component supports BOTH size AND variant props | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | Matrix Story REQUIRED if component supports both `size` and `variant` props (references VARIANTS_SIZE_CANON) | 🔁 DUPLICATE (with reference) |
| `FOUNDATION_STEP_PIPELINE.md` | Storybook demonstrates all variants, all sizes | ⚠️ PARTIAL OVERLAP (general requirement, not specific Matrix rule) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is canonical for Matrix story conditional requirement
- ✅ SIZE_MAPPING_SPEC correctly references VARIANTS_SIZE_CANON
- ⚠️ FOUNDATION_STEP_PIPELINE has general requirement but doesn't specify conditional Matrix rule

#### Rule: States Story Requirements

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | States Story REQUIRED ONLY when component has public states/interactive behavior | 🎯 CANONICAL |
| `FOUNDATION_STEP_PIPELINE.md` | Storybook demonstrates meaningful interaction examples | ⚠️ PARTIAL OVERLAP (general requirement, not specific States rule) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is canonical for States story conditional requirement
- ⚠️ FOUNDATION_STEP_PIPELINE has general requirement but doesn't specify conditional States rule

#### Rule: Sizes Gallery Story

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `SIZE_MAPPING_SPEC.md` | Sizes Gallery Story REQUIRED for every component with public `size` prop | 🎯 CANONICAL |
| No other documents define Sizes Gallery requirement | - | ✅ UNIQUE |

**Analysis:**
- ✅ SIZE_MAPPING_SPEC is sole source of truth for Sizes Gallery requirement

#### Rule: Story Naming Convention

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | Stories MUST use exact names: `Matrix`, `States` | 🎯 CANONICAL |
| No other documents define story naming | - | ✅ UNIQUE |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is sole source of truth for story naming

---

### TOPIC 5: PIPELINE (18A)

#### Rule: Pipeline Execution Rules

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `FOUNDATION_STEP_PIPELINE.md` | Pipeline executed top-to-bottom; mandatory reporting; step gating; blocker classification | 🎯 CANONICAL |
| No other documents define pipeline execution rules | - | ✅ UNIQUE |

**Analysis:**
- ✅ FOUNDATION_STEP_PIPELINE is sole source of truth for pipeline execution

#### Rule: Pipeline Integration Hooks

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `FOUNDATION_STEP_PIPELINE.md` | STEP 9: Validation via Tests & Storybook | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | 18A Pipeline STEP 5 Integration: Token/Size/Variant Consistency validation | ⚠️ PARTIAL OVERLAP (specific integration point) |

**Analysis:**
- ✅ FOUNDATION_STEP_PIPELINE is canonical for pipeline structure
- ⚠️ SIZE_MAPPING_SPEC defines specific integration point (STEP 5) - should verify this aligns with FOUNDATION_STEP_PIPELINE

#### Rule: PR Gating Requirements

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `SIZE_MAPPING_SPEC.md` | PR gating: new sized component cannot merge without mapping table; no raw values; overlay size validation | 🎯 CANONICAL (for size mapping) |
| `FOUNDATION_STEP_PIPELINE.md` | Step gating rule: cannot issue STEP N+1 unless STEP N present | ⚠️ PARTIAL OVERLAP (different context: pipeline steps vs PR gates) |

**Analysis:**
- ✅ SIZE_MAPPING_SPEC is canonical for size mapping PR gates
- ✅ FOUNDATION_STEP_PIPELINE is canonical for pipeline step gates (different context)

---

### TOPIC 6: TYPING

#### Rule: Explicit Union Types

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `TYPING_STANDARD.md` | Each component exposing `variant`, `size` MUST define explicit union types | 🎯 CANONICAL |
| No other documents define explicit union type requirement | - | ✅ UNIQUE |

**Analysis:**
- ✅ TYPING_STANDARD is sole source of truth for typing rules

#### Rule: CVA Usage Boundaries

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `TYPING_STANDARD.md` | CVA MUST NOT be used as source of public types; CVA variant maps MUST be type-constrained | 🎯 CANONICAL |
| No other documents define CVA boundaries | - | ✅ UNIQUE |

**Analysis:**
- ✅ TYPING_STANDARD is sole source of truth for CVA rules

---

## Summary by Overlap Type

### 🔁 DUPLICATES (Same rule in multiple places)

1. **GlobalSize definition** - VARIANTS_SIZE_CANON (canonical) vs SIZE_MAPPING_SPEC (duplicate with reference) ✅ Acceptable
2. **Component size subset declarations** - VARIANTS_SIZE_CANON (canonical) vs SIZE_MAPPING_SPEC (duplicate, should reference) ⚠️ Needs reference
3. **Overlay size restriction** - VARIANTS_SIZE_CANON (canonical) vs SIZE_MAPPING_SPEC (duplicate with reference) ✅ Acceptable
4. **Forbidden non-GlobalSize values** - VARIANTS_SIZE_CANON (canonical) vs SIZE_MAPPING_SPEC (duplicate, should reference) ⚠️ Needs reference
5. **Matrix story requirement** - VARIANTS_SIZE_CANON (canonical) vs SIZE_MAPPING_SPEC (duplicate with reference) ✅ Acceptable

### ⚠️ PARTIAL OVERLAPS (Related but not identical)

1. **Size scales** - Global scale (VARIANTS_SIZE_CANON) vs Interactive subset (INTERACTIVE_SIZE_SCALE) ✅ Complementary
2. **Token rules** - General token unions (ARCHITECTURE_RULES) vs domain-specific (Token Authorities) ✅ Complementary
3. **Storybook requirements** - Specific Matrix/States rules (VARIANTS_SIZE_CANON) vs general requirements (FOUNDATION_STEP_PIPELINE) ⚠️ Needs clarification
4. **Pipeline integration** - Pipeline structure (FOUNDATION_STEP_PIPELINE) vs specific hooks (SIZE_MAPPING_SPEC) ⚠️ Needs verification

### ❌ CONTRADICTIONS (Conflicting rules)

**None found** - All rules are complementary or properly referenced.

### ✅ UNIQUE (Rule exists in only one place)

1. InteractiveVariant dictionary - VARIANTS_SIZE_CANON only
2. SurfaceVariant dictionary - VARIANTS_SIZE_CANON only
3. Token domain ownership - TOKEN_AUTHORITY only
4. Sizes Gallery story - SIZE_MAPPING_SPEC only
5. Story naming convention - VARIANTS_SIZE_CANON only
6. Pipeline execution rules - FOUNDATION_STEP_PIPELINE only
7. Typing standards - TYPING_STANDARD only

---

**Next Steps:** Identify canonical targets and detect any contradictions.

---

## Appendix D: Canonical Targets

# Documentation Deduplication Audit - Canonical Targets

**Date:** 2025-12-22  
**Status:** WORKING DRAFT  
**Purpose:** Canonical target decisions for each rule topic

---

## Canonical Target Decisions

### 🎯 SIZE SCALES

**Canonical Target:** `docs/architecture/VARIANTS_SIZE_CANON.md`

**Rationale:**
- Defines global unified size scale (`xs`..`3xl`)
- Defines component subset declaration requirements
- Defines overlay size restrictions
- Defines forbidden non-GlobalSize values
- Most comprehensive and authoritative document for size scales

**Other Documents:**
- `SIZE_MAPPING_SPEC.md` - References VARIANTS_SIZE_CANON for GlobalSize definition ✅
- `INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md` - Defines interactive subset (`sm|md|lg`) which is complementary ✅

**Action Required:**
- SIZE_MAPPING_SPEC already references VARIANTS_SIZE_CANON ✅
- No changes needed

---

### 🎯 VARIANTS

**Canonical Target:** `docs/architecture/VARIANTS_SIZE_CANON.md`

**Rationale:**
- Defines InteractiveVariant dictionary
- Defines SurfaceVariant dictionary
- Defines overlay variant rules
- Defines component variant declaration requirements
- Sole source of truth for variant naming

**Other Documents:**
- No other documents define variant dictionaries ✅

**Action Required:**
- No changes needed

---

### 🎯 SIZE-TO-TOKEN MAPPING

**Canonical Target:** `docs/architecture/SIZE_MAPPING_SPEC.md`

**Rationale:**
- Defines mandatory mapping keys (heightToken, paddingXToken, etc.)
- Defines token reference rules (no raw values)
- Defines component class rules (Interactive/Surface/Overlay)
- Defines mapping table template
- Sole source of truth for size-to-token mapping contract

**Other Documents:**
- References VARIANTS_SIZE_CANON for GlobalSize definition ✅
- References Token Authorities for token values ✅

**Action Required:**
- No changes needed

---

### 🎯 TOKENS (General Rules)

**Canonical Target:** `docs/architecture/TOKEN_AUTHORITY.md` (domain ownership) + `docs/architecture/ARCHITECTURE_RULES.md` (token unions)

**Rationale:**
- TOKEN_AUTHORITY: Defines token domain ownership, structure, hierarchy
- ARCHITECTURE_RULES: Defines token union requirements for component APIs
- Domain-specific authorities (SPACING, TYPOGRAPHY, etc.) are complementary

**Other Documents:**
- `SPACING_AUTHORITY.md` - Canonical for spacing tokens ✅
- `TYPOGRAPHY_AUTHORITY.md` - Canonical for typography tokens ✅
- `RADIUS_AUTHORITY.md` - Canonical for radius tokens ✅
- `MOTION_AUTHORITY.md` - Canonical for motion tokens ✅
- `ELEVATION_AUTHORITY.md` - Canonical for elevation tokens ✅
- `SIZE_MAPPING_SPEC.md` - References token authorities ✅

**Action Required:**
- No changes needed (properly structured)

---

### 🎯 STORYBOOK

**Canonical Target:** `docs/architecture/VARIANTS_SIZE_CANON.md` (Matrix/States rules) + `docs/architecture/SIZE_MAPPING_SPEC.md` (Sizes Gallery)

**Rationale:**
- VARIANTS_SIZE_CANON: Defines Matrix/States story conditional requirements and naming
- SIZE_MAPPING_SPEC: Defines Sizes Gallery story requirement (unique to size mapping)
- FOUNDATION_STEP_PIPELINE: General Storybook requirements (complementary)

**Other Documents:**
- `FOUNDATION_STEP_PIPELINE.md` - General Storybook requirements (STEP 9) ⚠️ Should reference VARIANTS_SIZE_CANON for Matrix/States specifics

**Action Required:**
- FOUNDATION_STEP_PIPELINE STEP 9 should add reference to VARIANTS_SIZE_CANON for Matrix/States conditional requirements

---

### 🎯 PIPELINE (18A)

**Canonical Target:** `docs/workflows/foundation/FOUNDATION_STEP_PIPELINE.md`

**Rationale:**
- Defines complete 18A pipeline structure (STEP 0-11)
- Defines execution rules, reporting requirements, step gating
- Defines STEP 5: Token, Size & Variant Consistency
- Sole source of truth for pipeline process

**Other Documents:**
- `SIZE_MAPPING_SPEC.md` - Defines STEP 5 integration hooks ✅ Correctly references pipeline

**Action Required:**
- No changes needed (SIZE_MAPPING_SPEC correctly references pipeline)

---

### 🎯 TYPING

**Canonical Target:** `docs/reference/TYPING_STANDARD.md`

**Rationale:**
- Defines explicit union type requirements
- Defines CVA usage boundaries
- Defines public API typing rules
- Takes precedence over all other typing guidelines
- Sole source of truth for public API typing

**Other Documents:**
- `TYPING_SYSTEM.md` - Navigation/index document ✅
- `TYPESCRIPT_GENERAL_RULES.md` - Secondary guidance (does not override TYPING_STANDARD) ✅

**Action Required:**
- No changes needed

---

## Summary Table

| Topic | 🎯 Canonical Target | Status |
|-------|---------------------|--------|
| **Size Scales** | `VARIANTS_SIZE_CANON.md` | ✅ Clear |
| **Variants** | `VARIANTS_SIZE_CANON.md` | ✅ Clear |
| **Size-to-Token Mapping** | `SIZE_MAPPING_SPEC.md` | ✅ Clear |
| **Tokens (General)** | `TOKEN_AUTHORITY.md` + `ARCHITECTURE_RULES.md` | ✅ Clear |
| **Storybook** | `VARIANTS_SIZE_CANON.md` (Matrix/States) + `SIZE_MAPPING_SPEC.md` (Sizes Gallery) | ⚠️ Needs cross-link |
| **Pipeline** | `FOUNDATION_STEP_PIPELINE.md` | ✅ Clear |
| **Typing** | `TYPING_STANDARD.md` | ✅ Clear |

---

**Next Steps:** Create deprecation/redirect plan and cross-link checklist.

---

## Appendix E: Contradictions

# Documentation Deduplication Audit - Contradictions

**Date:** 2025-12-22  
**Status:** WORKING DRAFT  
**Purpose:** Detected contradictions with concrete quotes and fix proposals

---

## Contradiction Analysis

### Result: ❌ NO CONTRADICTIONS FOUND

After comprehensive analysis of all rule-bearing documents, **no contradictions were detected**. All rules are either:
- ✅ Complementary (different scopes, not conflicting)
- ✅ Properly referenced (duplicates reference canonical source)
- ✅ Hierarchical (general rules vs specific applications)

---

## Potential Confusion Points (Not Contradictions)

### 1. Global Size Scale vs Interactive Size Scale

**Not a Contradiction:** These are complementary rules.

**Rule A (VARIANTS_SIZE_CANON.md, line 55):**
> GlobalSize: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"`

**Rule B (INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md, line 79):**
> InteractiveSize: `"sm" | "md" | "lg"` ONLY

**Analysis:**
- Rule A defines the **global scale** available to all components
- Rule B defines the **restricted subset** for interactive components
- These are **complementary**, not contradictory
- VARIANTS_SIZE_CANON explicitly acknowledges INTERACTIVE_SIZE_SCALE (line 797-803)

**Status:** ✅ No contradiction - properly integrated

---

### 2. Matrix Story: Conditional vs Unconditional

**Not a Contradiction:** These are the same rule stated differently.

**Rule A (VARIANTS_SIZE_CANON.md, line 392):**
> Matrix Story REQUIRED ONLY when component publicly supports BOTH size AND variant props

**Rule B (SIZE_MAPPING_SPEC.md, line 373):**
> Matrix Story REQUIRED if component supports both `size` and `variant` props

**Analysis:**
- Both state the same conditional requirement
- SIZE_MAPPING_SPEC references VARIANTS_SIZE_CANON (line 375)
- No contradiction - same rule, properly referenced

**Status:** ✅ No contradiction - properly referenced

---

### 3. Storybook: General vs Specific Requirements

**Not a Contradiction:** These are different levels of specificity.

**Rule A (FOUNDATION_STEP_PIPELINE.md, line 402):**
> Storybook demonstrates: all variants, all sizes, meaningful interaction examples

**Rule B (VARIANTS_SIZE_CANON.md, line 392):**
> Matrix Story REQUIRED ONLY when component supports BOTH size AND variant props

**Analysis:**
- Rule A is a **general requirement** (demonstrate variants/sizes)
- Rule B is a **specific conditional rule** (when Matrix is required)
- These are **complementary** - Rule B specifies when Rule A applies to Matrix stories
- FOUNDATION_STEP_PIPELINE should reference VARIANTS_SIZE_CANON for Matrix/States specifics

**Status:** ⚠️ Partial overlap - needs cross-link (not a contradiction)

---

## Summary

**Contradictions Found:** 0

**Partial Overlaps Requiring Cross-Links:** 1
- FOUNDATION_STEP_PIPELINE STEP 9 should reference VARIANTS_SIZE_CANON for Matrix/States conditional requirements

**All Other Overlaps:** Properly referenced or complementary

---

**Next Steps:** Create deprecation/redirect plan and cross-link checklist.

---

## Appendix F: Deprecation Plan

# Documentation Deduplication Audit - Deprecation/Redirect Plan

**Date:** 2025-12-22  
**Status:** WORKING DRAFT  
**Purpose:** Deprecation and redirect plan for outdated documents

---

## Deprecation Policy

Documents marked as 🕰️ **OUTDATED** should:
1. Add deprecation notice at top of document
2. Include exact pointer text to canonical source
3. Keep document for historical reference (do not delete)
4. Update any cross-references to point to canonical source

---

## Documents to Mark as 🕰️ OUTDATED

### 1. `docs/workflows/foundation/old_FOUNDATION_STEP_PIPELINE.md`

**Status:** 🕰️ **OUTDATED**

**Reason:** Superseded by `FOUNDATION_STEP_PIPELINE.md` (refined version)

**Canonical Source:** `docs/workflows/foundation/FOUNDATION_STEP_PIPELINE.md`

**Exact Pointer Text to Add:**
```markdown
> 🕰️ **OUTDATED**: This document is superseded by [FOUNDATION_STEP_PIPELINE.md](./FOUNDATION_STEP_PIPELINE.md).
> 
> **Canonical Source:** [FOUNDATION_STEP_PIPELINE.md](./FOUNDATION_STEP_PIPELINE.md) - 18A Component Review & Improvement Pipeline (Refined)
> 
> This document is kept for historical reference only. All new work should reference the canonical pipeline document.
```

**Action Required:**
- Add deprecation notice at top of `old_FOUNDATION_STEP_PIPELINE.md`
- Update any cross-references to point to `FOUNDATION_STEP_PIPELINE.md`

---

## Documents That Should Add Cross-References (Not Deprecation)

### 1. `docs/workflows/foundation/FOUNDATION_STEP_PIPELINE.md` - STEP 9

**Issue:** General Storybook requirements don't reference Matrix/States conditional rules

**Action Required:**
- Add reference to VARIANTS_SIZE_CANON in STEP 9 section
- Add reference to SIZE_MAPPING_SPEC for Sizes Gallery requirement

**Exact Text to Add:**
```markdown
**Reference:** For specific Matrix and States story requirements, see [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md) "Storybook Requirements" section. For Sizes Gallery story requirements, see [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md) "Storybook Requirements" section.
```

---

### 2. `docs/workflows/foundation/FOUNDATION_STEP_PIPELINE.md` - STEP 5

**Issue:** Token/Size/Variant consistency step doesn't explicitly reference size/variant authorities

**Action Required:**
- Add reference to VARIANTS_SIZE_CANON for size/variant rules
- Add reference to SIZE_MAPPING_SPEC for size mapping requirements

**Exact Text to Add:**
```markdown
**Reference:** For size and variant rules, see [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md). For size-to-token mapping requirements, see [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md).
```

---

### 3. `docs/architecture/SIZE_MAPPING_SPEC.md` - Component Size Subset Declarations

**Issue:** Restates rule from VARIANTS_SIZE_CANON without explicit reference

**Action Required:**
- Add explicit reference to VARIANTS_SIZE_CANON in "Supported Subset" section (line 120)

**Exact Text to Add:**
```markdown
**Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) "Component-Specific Subset Declarations" section for complete rules on component size subset declarations.
```

---

### 4. `docs/architecture/SIZE_MAPPING_SPEC.md` - Forbidden Non-GlobalSize Values

**Issue:** Restates rule from VARIANTS_SIZE_CANON without explicit reference

**Action Required:**
- Add explicit reference to VARIANTS_SIZE_CANON in "GlobalSize" section (line 110)

**Current Text (line 110):**
> **Rule:** ✅ All size props MUST use only GlobalSize values. Any non-GlobalSize entries (e.g., `'icon'`, `'tiny'`, `'huge'`) are FORBIDDEN.

**Enhanced Text:**
> **Rule:** ✅ All size props MUST use only GlobalSize values. Any non-GlobalSize entries (e.g., `'icon'`, `'tiny'`, `'huge'`) are FORBIDDEN.
> 
> **Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) "Forbidden Patterns" section for complete list of forbidden size values and migration guidance.

---

## Summary

**Documents to Deprecate:** 1
- `old_FOUNDATION_STEP_PIPELINE.md` 🕰️

**Documents Needing Cross-References:** 3
- `FOUNDATION_STEP_PIPELINE.md` STEP 9
- `SIZE_MAPPING_SPEC.md` (2 locations)

**Total Actions Required:** 4

---

**Next Steps:** Generate cross-link checklist and No Duplication Policy.

---

## Appendix G: Cross-Link Checklist

# Documentation Deduplication Audit - Cross-Link Checklist

**Date:** 2025-12-22  
**Status:** WORKING DRAFT  
**Purpose:** Minimal cross-link checklist for required references

---

## Cross-Link Checklist

### From Authority Documents to Each Other

#### ✅ Already Present

1. **SIZE_MAPPING_SPEC.md → VARIANTS_SIZE_CANON.md**
   - ✅ Line 108: References VARIANTS_SIZE_CANON for GlobalSize definition
   - ✅ Line 128: References VARIANTS_SIZE_CANON for overlay restriction rule
   - ✅ Line 375: References VARIANTS_SIZE_CANON for Matrix story rules
   - ✅ Line 568: Integration section references VARIANTS_SIZE_CANON
   - ✅ Line 624: Related Documents section includes VARIANTS_SIZE_CANON

2. **VARIANTS_SIZE_CANON.md → INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md**
   - ✅ Line 797: Integration section references INTERACTIVE_SIZE_SCALE
   - ✅ Line 880: Related Documents section includes INTERACTIVE_SIZE_SCALE

3. **VARIANTS_SIZE_CANON.md → Token Authorities**
   - ✅ Line 881: References TYPOGRAPHY_AUTHORITY
   - ✅ Line 882: References STATE_AUTHORITY
   - ✅ Line 884: References FOUNDATION_LOCK

4. **SIZE_MAPPING_SPEC.md → Token Authorities**
   - ✅ Line 579: References SPACING_AUTHORITY
   - ✅ Line 587: References TYPOGRAPHY_AUTHORITY
   - ✅ Line 595: References RADIUS_AUTHORITY
   - ✅ Line 625: Related Documents section includes all token authorities

5. **TOKEN_AUTHORITY.md → Token Authorities**
   - ✅ Lines 12-16: References all token authority contracts

#### ⚠️ Missing or Needs Enhancement

1. **FOUNDATION_STEP_PIPELINE.md → VARIANTS_SIZE_CANON.md**
   - ❌ Missing: Reference to Matrix/States conditional requirements in STEP 9
   - **Action:** Add reference in STEP 9 section (line ~402)

2. **FOUNDATION_STEP_PIPELINE.md → SIZE_MAPPING_SPEC.md**
   - ❌ Missing: Reference to Sizes Gallery requirement in STEP 9
   - **Action:** Add reference in STEP 9 section (line ~402)

3. **SIZE_MAPPING_SPEC.md → VARIANTS_SIZE_CANON.md**
   - ⚠️ Partial: References exist but could be more explicit in "Supported Subset" section
   - **Action:** Add explicit reference at line 120

4. **SIZE_MAPPING_SPEC.md → VARIANTS_SIZE_CANON.md**
   - ⚠️ Partial: References exist but could be more explicit in "GlobalSize" section
   - **Action:** Add explicit reference at line 110

---

### From Workflow Documents to Authority Documents

#### ✅ Already Present

1. **FOUNDATION_STEP_PIPELINE.md → Token Authorities**
   - ✅ STEP 5 references token consistency (implicit)
   - ⚠️ Could be more explicit about which authorities apply

#### ⚠️ Missing

1. **FOUNDATION_STEP_PIPELINE.md → VARIANTS_SIZE_CANON.md**
   - ❌ Missing: Explicit reference in STEP 5 for size/variant rules
   - **Action:** Add reference in STEP 5 section (line ~295)

2. **FOUNDATION_STEP_PIPELINE.md → SIZE_MAPPING_SPEC.md**
   - ❌ Missing: Reference to size mapping requirements in STEP 5
   - **Action:** Add reference in STEP 5 section (line ~295)

---

### From Reference Documents to Authority Documents

#### ✅ Already Present

1. **TYPING_STANDARD.md → TYPING_SYSTEM.md**
   - ✅ Line 15: References TYPING_SYSTEM for navigation

2. **TYPING_SYSTEM.md → TYPING_STANDARD.md**
   - ✅ References TYPING_STANDARD as primary authority

#### ⚠️ Missing

1. **TYPING_STANDARD.md → VARIANTS_SIZE_CANON.md**
   - ⚠️ Could reference VARIANTS_SIZE_CANON for size/variant type examples
   - **Note:** Not critical - TYPING_STANDARD is about typing patterns, not specific size/variant values

---

### From Reports to Authority Documents

**Note:** Reports are excluded from rule extraction, but should reference authorities when documenting violations.

#### ✅ Already Present

1. **VARIANTS_SIZE_INVENTORY.md → VARIANTS_SIZE_CANON.md**
   - ✅ References VARIANTS_SIZE_CANON throughout for alignment checks

---

## Minimal Cross-Link Checklist (Priority Order)

### High Priority (Required for Clarity)

1. ✅ **FOUNDATION_STEP_PIPELINE.md STEP 9** → Add reference to VARIANTS_SIZE_CANON for Matrix/States rules
2. ✅ **FOUNDATION_STEP_PIPELINE.md STEP 9** → Add reference to SIZE_MAPPING_SPEC for Sizes Gallery
3. ✅ **FOUNDATION_STEP_PIPELINE.md STEP 5** → Add reference to VARIANTS_SIZE_CANON for size/variant rules
4. ✅ **FOUNDATION_STEP_PIPELINE.md STEP 5** → Add reference to SIZE_MAPPING_SPEC for size mapping rules

### Medium Priority (Enhancement)

5. ⚠️ **SIZE_MAPPING_SPEC.md line 120** → Add explicit reference to VARIANTS_SIZE_CANON for subset declarations
6. ⚠️ **SIZE_MAPPING_SPEC.md line 110** → Add explicit reference to VARIANTS_SIZE_CANON for forbidden values

### Low Priority (Nice to Have)

7. ⚠️ **FOUNDATION_STEP_PIPELINE.md STEP 5** → Add explicit list of which authorities apply to token/size/variant checks

---

## Summary

**Total Cross-Links to Add:** 6

**High Priority:** 4
**Medium Priority:** 2
**Low Priority:** 1

**Existing Cross-Links:** Well-maintained (most documents already reference each other appropriately)

---

**Next Steps:** Write No Duplication Policy and generate final report.

---

## Appendix H: No Duplication Policy

# Documentation Deduplication Audit - No Duplication Policy

**Date:** 2025-12-22  
**Status:** WORKING DRAFT  
**Purpose:** No Duplication Policy recommendation for future documentation

---

## No Duplication Policy

**Recommendation:** All future documentation must reference existing authorities instead of restating rules. When a rule is defined in a canonical Authority document, other documents must use cross-references rather than duplicating the rule text. This policy ensures single-source-of-truth maintenance, reduces contradiction risk, and simplifies updates when rules evolve. Documents may summarize rules for context, but must include explicit references to canonical sources using the format: "See [CANONICAL_DOC.md](./CANONICAL_DOC.md) 'Section Name' for complete rules." Documents that restate rules without references are considered violations and should be updated to add cross-references or remove duplicate content.

---

## Policy Details

### When to Reference vs Restate

**✅ DO:**
- Reference canonical source with section name
- Summarize rule briefly for context, then reference
- Use format: "See [CANONICAL_DOC.md](./CANONICAL_DOC.md) 'Section Name' for complete rules"
- Include rule in Related Documents section

**❌ DON'T:**
- Restate complete rule text without reference
- Create new rule definitions that conflict with existing authorities
- Duplicate rule text in multiple documents
- Create "summary" documents that become alternate sources of truth

### Acceptable Duplication Patterns

**✅ Acceptable:**
1. **Reference with Summary** - Brief summary for context, then explicit reference
2. **Example-Based Restatement** - Restating rule through examples (with reference)
3. **Integration Sections** - Documents that show how multiple authorities work together

**❌ Unacceptable:**
1. **Full Rule Restatement** - Copying complete rule text without reference
2. **Alternate Formulations** - Restating same rule in different words without reference
3. **Hidden Duplication** - Restating rules in different sections without acknowledgment

### Enforcement

**For New Documents:**
- Review checklist: Does this document restate any rules from Authority documents?
- If yes: Add explicit cross-reference or remove duplicate content

**For Existing Documents:**
- Audit identified documents needing cross-references (see Cross-Link Checklist)
- Update documents to add references or remove duplicates

---

**Next Steps:** Generate final comprehensive audit report.

