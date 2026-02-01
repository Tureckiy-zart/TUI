# Documentation Retention Policy — Applied Report

**Task:** TUI_DOCS_RETENTION_APPLY_001  
**Date:** 2026-02-01  
**Source:** [DOCS_FULL_TREE.md](./inventory/DOCS_FULL_TREE.md)  
**Policy:** [RETENTION_POLICY.md](../workflows/policies/RETENTION_POLICY.md)

---

## Summary

| Metric | Count |
|--------|-------|
| Files in scope (reports, migrations, _internal) | 257 |
| Files referenced by CANON/LOCK/AUTHORITY/PROJECT_PROGRESS | 254+ |
| Files moved to docs_archive/ | 0 |
| Files REVIEW_REQUIRED | 3 |

**Result:** No files moved. All scope files are either referenced by canonical documents or marked REVIEW_REQUIRED.

---

## Scope Definition

**Included:**
- `docs/reports/**`
- `docs/migrations/**`
- `docs/_internal/**`

**Excluded:**
- `docs/architecture/**`
- `docs/theming/**`
- `docs/workflows/**`
- `docs/reference/**`
- `docs/governance/**`

**Rule:** Cannot move files referenced from CANON / LOCK / AUTHORITY documents.

---

## Classification by Category

| Category | Count | Action | Reason |
|----------|-------|--------|--------|
| FINAL_REPORT | ~180 | KEEP | Baseline/Creation reports referenced by EXTENSION_STATE, FOUNDATION_LOCK, *_LOCK.md |
| OUTPUT | 5 | KEEP | runtime-css-vars.*, a11y-contrast.output.txt — verification evidence in FOUNDATION_LOCK (TM-Only Runtime Lock) |
| LOG | 1 | KEEP | GAP3_verification_log — referenced by FOCUS_LOCK |
| SNAPSHOT | ~15 | KEEP | PHASE_L_DECISION_SNAPSHOT, *_SNAPSHOT — referenced by SURFACE_ELEVATION_INTENT, INVERSE_TYPOGRAPHY_INTENT, FOCUS_LOCK |
| MIGRATION | 3 | KEEP | MIGRATION_12C, TEXTAREA_MIGRATION, typography-color-policy — referenced by PROJECT_PROGRESS, TYPOGRAPHY_CONTRACT, TEXTAREA_BASELINE_REPORT |
| TEMP_REPORT | 3 | REVIEW_REQUIRED | SYNC_REPORT_*, TUNG_ESSENTIAL_DOCS_SYNC_01.json — _internal, part of sync process |
| Other reports | ~50 | KEEP | Referenced by PROJECT_PROGRESS, FOUNDATION_LOCK, A11Y_LOCK, EXTENSION_STATE |

---

## Reference Analysis

### Files Explicitly Referenced by FOUNDATION_LOCK

- `docs/reports/TM_ONLY_RUNTIME_VERIFICATION_003.md`
- `docs/reports/runtime-css-vars.snapshot.txt`
- `docs/reports/runtime-css-vars.night.snapshot.txt`
- `docs/reports/runtime-css-vars.check.txt`
- `docs/reports/runtime-css-vars.diff.txt`
- `docs/reports/a11y-contrast.output.txt`
- `docs/reports/foundation/TUI_FOUNDATION_LOCK_SWEEP_01_STATUS.md`
- `docs/reports/foundation/TUI_FOUNDATION_LOCK_SWEEP_01_VIOLATIONS.md`
- ~80 `docs/reports/audit/*_BASELINE_REPORT.md`
- ~21 `docs/reports/creation/*_CREATION_REPORT.md`

### Files Referenced by EXTENSION_STATE

- All audit and creation reports listed in component status

### Files Referenced by A11Y_LOCK

- `docs/reports/TUNG_A11Y_SYSTEM_V1.md`
- `docs/reports/archive/TUNG_A11Y_SYSTEM_V1_verify.md`
- `docs/reports/a11y/A11Y_CONTRAST_CLOSURE_REPORT.md`
- `docs/reports/a11y/CONTRAST_SCRIPT_NOTES.md`

### Files Referenced by FOCUS_LOCK / FOCUS_AUTHORITY

- `docs/reports/archive/audit/FOCUS_AUDIT_REPORT.md`
- `docs/reports/archive/audit/FOCUS_GAPS.md`
- `docs/reports/archive/focus/GAP3_verification_log_v1.1.md`
- `docs/reports/archive/focus/GAP3_patch.md`
- `docs/reports/archive/focus/GAP3_verify.md`

### Files Referenced by TOKEN_REALITY_AUDIT_027

- `docs/reports/tokens/TOKEN_REALITY_AUDIT_027_INVENTORY.json`
- `docs/reports/tokens/TOKEN_REALITY_AUDIT_027_USAGE.json`
- `docs/reports/tokens/TOKEN_REALITY_AUDIT_027_GAPS.backlog.json`

### Migrations Referenced

- `docs/migrations/MIGRATION_12C_DROPDOWN_TOKENS_REMOVAL_REPORT.md` — PROJECT_PROGRESS
- `docs/migrations/TEXTAREA_MIGRATION.md` — TEXTAREA_BASELINE_REPORT
- `docs/migrations/typography-color-policy-migration.md` — TYPOGRAPHY_CONTRACT

---

## REVIEW_REQUIRED

The following files are in scope and not referenced by canonical documents. Status unclear — operator decision required before any move.

| Path | Category | Notes |
|------|----------|-------|
| `docs/_internal/ai/_to_GPT_project_essential/SYNC_REPORT_2026-01-03.md` | TEMP_REPORT | Sync process artifact; may be part of AI context |
| `docs/_internal/ai/_to_GPT_project_essential/SYNC_REPORT_2026-01-30.md` | TEMP_REPORT | Sync process artifact; may be part of AI context |
| `docs/_internal/ai/_to_GPT_project_essential/TUNG_ESSENTIAL_DOCS_SYNC_01.json` | SNAPSHOT | Manifest for sync; may be used by sync scripts |

**Recommendation:** Do NOT move until sync process and _internal usage are verified. Rule: "If status is unclear — mark as REVIEW_REQUIRED, do not move."

---

## Moves Executed

None. No candidates met the criteria for archiving (all referenced or REVIEW_REQUIRED).

---

## docs_archive/ Status

The `docs_archive/` directory is the target for archived non-canonical documentation. Per [docs/README.md](../README.md):

- `docs_archive/` is NOT source of truth
- NEVER use docs_archive/ for canonical information
- ONLY consult docs_archive/ for historical reference when explicitly requested

No new subdirectories were created. No files were moved.

---

## Conclusion

Retention Policy application completed with **zero moves**. All files in scope (docs/reports/**, docs/migrations/**, docs/_internal/**) are either:

1. **Referenced** by CANON, LOCK, AUTHORITY, or PROJECT_PROGRESS — cannot move
2. **REVIEW_REQUIRED** — status unclear, do not move per rule

The constraint "cannot move files referenced by canonical documents" leaves an empty candidate pool. RETENTION_POLICY states "Keep all review reports indefinitely" — moving to archive would preserve them, but the reference constraint takes precedence.
