🧾 **ARCHIVED SUPPORTING ARTIFACT**  
**Canonical entrypoint:** [../DOCS_DEDUP_AUDIT_REPORT.md](../DOCS_DEDUP_AUDIT_REPORT.md)  
**Reason:** Consolidated into appendices  
**Date:** 2025-12-22

---

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

