🧾 **ARCHIVED SUPPORTING ARTIFACT**  
**Canonical entrypoint:** [../DOCS_DEDUP_AUDIT_REPORT.md](../DOCS_DEDUP_AUDIT_REPORT.md)  
**Reason:** Consolidated into appendices  
**Date:** 2025-12-22

---

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

### 2. `docs/architecture/SIZE_MAPPING_SPEC.md` - Component Size Subset Declarations

**Issue:** Restates rule from VARIANTS_SIZE_CANON without explicit reference

**Action Required:**
- Add explicit reference to VARIANTS_SIZE_CANON in "Supported Subset" section (line 112)

**Exact Text to Add:**
```markdown
**Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) "Component-Specific Subset Declarations" section for complete rules on component size subset declarations.
```

---

### 3. `docs/architecture/SIZE_MAPPING_SPEC.md` - Forbidden Non-GlobalSize Values

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

