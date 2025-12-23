🧾 **ARCHIVED SUPPORTING ARTIFACT**  
**Canonical entrypoint:** [../DOCS_DEDUP_AUDIT_REPORT.md](../DOCS_DEDUP_AUDIT_REPORT.md)  
**Reason:** Consolidated into appendices  
**Date:** 2025-12-22

---

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

