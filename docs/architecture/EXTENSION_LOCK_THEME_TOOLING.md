# Extension Lock: Theme Tooling

**Date:** 2025-12-31  
**Status:** 🔒 **LOCKED** - **ACTIVE EXTENSION LOCK**  
**Lock Level:** EXTENSION  
**Tooling Name:** Theme Tooling (Generator, Validator, Parity Checker)  
**Locked Since:** 2025-12-31  
**Extension State:** Theme Tooling is **CLOSED** and **immutable in behavior**.  
**Audit Status:** ✅ FULL PASS (6/6 assumptions verified)  
**Purpose:** Formally lock the Theme Tooling CLI system to prevent behavioral drift, ensure Theme Contract v1 compliance enforcement, and protect CI gates from weakening.

**This document is the authoritative source of truth for Theme Tooling lock status. Theme Tooling is declared as Extension Infrastructure and is CLOSED for behavioral modifications.**

---

## Purpose and Scope

This document **formally locks the Theme Tooling system** at the Extension level for `@tenerife.music/ui`. The tooling is now treated as **Extension Infrastructure** and is **CLOSED** for behavioral modifications.

**This document is the authoritative source of truth** for Theme Tooling lock status. Theme Tooling is declared as **behaviorally immutable**. Any deviation from locked rules requires deliberate architectural action (ADR + unlock procedure).

**Extension Layer Status:** Theme Tooling is **CLOSED** for behavioral changes. All future changes require explicit unlock procedure.

**Lock Scope:**

- Theme Generator CLI (`pnpm theme:generate`)
- Theme Validator CLI (`pnpm theme:validate`)
- Token Parity Checker (`pnpm theme:parity-check`)
- Default output directory (`src/EXTENSIONS/themes/`)
- Validation rules (Theme Contract v1 compliance)
- Write guards (no files written if validation fails)
- CI gates (pre-commit hooks, CI workflow checks)

**Audit Evidence:**

- Audit ID: `TUNG_THEME_TOOLING_REALITY_CHECK_AUDIT_V1`
- Audit Date: 2025-12-30 to 2025-12-31
- Audit Location: `docs/reports/theme-tooling-audit/`
- Final Verdict: `08_final_verdict.md` (6/6 PASS)

**Related Documentation:**

- [FOUNDATION_LOCK_THEME.md](./FOUNDATION_LOCK_THEME.md) - Theme System Foundation lock (Theme Contract v1)
- [THEME_SYSTEM_ARCHITECTURE.md](../theming/THEME_SYSTEM_ARCHITECTURE.md) - Theme system architecture
- [THEME_EXTENSION_CONTRACT.md](../theming/THEME_EXTENSION_CONTRACT.md) - Client theme extension contract
- `tools/theme-contract/README.md` - Theme Contract package documentation
- `tools/theme-generator/README.md` - Theme Generator documentation
- `tools/theme-validator/README.md` - Theme Validator documentation
- `src/FOUNDATION/tokens/required-tokens.ts` - Canonical token registry

---

## Locked Contract Summary

**Theme Tooling** is now **LOCKED** at the Extension level. This lock defines:

1. **Default Output Path:** Themes are generated exclusively to `src/EXTENSIONS/themes/`. This path is immutable.

2. **Validation Rules:** Theme Generator enforces Theme Contract v1 compliance. All generated themes must pass validation before files are written.

3. **Parity Check:** Token parity checker validates all themes against the canonical token registry (`required-tokens.ts`).

4. **Write Guards:** No theme files are written to disk if validation fails. This behavior cannot be bypassed.

5. **No Bypass Flags:** CLI commands do not have flags to skip validation. This is by design and cannot change.

6. **CI Gates:** Pre-commit hooks and CI workflow enforce validation on all theme files.

**Principles:**

- Theme generation is a build-time operation
- Validation is mandatory and cannot be skipped
- Invalid themes cannot be committed
- Token registry is the single source of truth
- Extension themes live in `src/EXTENSIONS/themes/` only

---

## What Is Locked

### Default Output Directory

**Locked Rules:**

- ✅ `DEFAULT_OUTPUT_DIR` is set to `src/EXTENSIONS/themes/`
- ✅ Generated themes are written exclusively to `src/EXTENSIONS/themes/`
- ✅ No themes may be written to Foundation layer (`src/FOUNDATION/tokens/themes/`)
- ✅ Path cannot be changed without explicit unlock

**Location:**

- `tools/theme-generator/src/generator.ts:30`
- `tools/theme-generator/bin/theme-generate.ts:44` (help text)
- `tools/theme-generator/src/types.ts:71` (JSDoc)

**Enforcement:**

- CI workflow validates path compliance
- Audit artifacts document correct behavior
- Pre-commit hooks run parity check on Extension themes only

### CLI Command Interfaces

**Locked Rules:**

- ✅ `theme:generate` — generates themes with mandatory validation
- ✅ `theme:validate` — validates themes against Theme Contract v1
- ✅ `theme:parity-check` — validates token parity against registry
- ✅ No `--no-validate`, `--skip-validation`, or similar bypass flags exist
- ✅ Adding bypass flags is forbidden

**Enforcement:**

- CLI help output is documented in audit (`02_cli_help_outputs.md`)
- Any new flags require unlock procedure
- Bypass flags are architecturally forbidden

### Validation Rules

**Locked Rules:**

- ✅ All generated themes must pass completeness check (all required tokens present)
- ✅ All generated themes must pass contract version check (`--tm-contract-version: 1`)
- ✅ All generated themes must pass extra token check (no unknown `--tm-*` tokens)
- ✅ Validation failure blocks file writing

**Enforcement:**

- `validateTheme()` function enforces all rules
- Generator exits with error code 1 on validation failure
- No files are written if validation fails

### Write Guards

**Locked Rules:**

- ✅ Files are written to disk **only after** all validations pass
- ✅ Dry-run mode (`--dry-run`) never writes files
- ✅ Invalid themes are never persisted
- ✅ Parity check runs after file write to verify consistency

**Enforcement:**

- Generation flow: generate → validate → write → parity check
- Validation failure at any step blocks subsequent steps
- Audit evidence: `03_generation_runs.md`, `04_validation_runs.md`

### Token Parity Check

**Locked Rules:**

- ✅ Parity checker compares generated themes against `required-tokens.ts`
- ✅ Missing tokens cause parity failure
- ✅ Extra `--tm-*` tokens (except `--tm-contract-version`) cause parity failure
- ✅ `--tm-contract-version` is a special allowed token

**Enforcement:**

- `scripts/check-theme-token-parity.mjs` is the canonical parity checker
- Pre-commit hooks run parity check on theme files
- CI workflow runs parity check

### CI Gates

**Locked Rules:**

- ✅ Pre-commit hooks run validation on staged theme files
- ✅ CI workflow includes theme validation step
- ✅ `continue-on-error: false` — validation failures block CI
- ✅ Weakening CI gates is forbidden

**Location:**

- `.husky/pre-commit` — pre-commit validation
- `.github/workflows/ci.yml` — CI workflow

**Enforcement:**

- Pre-commit hook exits with error on validation failure
- CI workflow exits with error on validation failure
- Audit evidence: `07_ci_gate_verification.md`

---

## What Is Explicitly Allowed

### Allowed Changes

The following changes are **explicitly allowed** without unlock:

1. **Bug Fixes:**
   - Fix bugs that don't change locked behavior
   - Fix edge cases in color generation
   - Fix parsing or formatting issues

2. **Documentation Updates:**
   - Update README files
   - Add usage examples
   - Improve error messages
   - Add cross-references

3. **Performance Improvements:**
   - Optimize generation speed
   - Reduce memory usage
   - Improve startup time
   - (Without changing API or behavior)

4. **Test Improvements:**
   - Add new test cases
   - Improve test coverage
   - Add edge case tests

5. **Internal Refactoring:**
   - Improve code quality
   - Extract helper functions
   - Improve type safety
   - (Without changing external behavior)

### Allowed Patterns

**Theme Generation:**

- Generate themes with any valid palette name
- Generate themes with any valid HSL color
- Generate light, dark, or both modes
- Use custom accent colors
- Use contrast levels (AA, AAA)

**Validation:**

- Validate any CSS theme file
- Validate multiple files at once
- Use verbose output mode
- Use JSON output format

**Parity Check:**

- Run parity check manually
- Run parity check in CI
- Run parity check in pre-commit

---

## Forbidden Actions (Require UNLOCK)

The following actions are **strictly forbidden** without a formal UNLOCK procedure:

### ❌ Path Changes

- Changing `DEFAULT_OUTPUT_DIR` to any other path
- Writing themes to Foundation layer
- Writing themes outside `src/EXTENSIONS/themes/`

### ❌ Validation Bypass

- Adding `--no-validate` or similar bypass flags
- Skipping validation in generation flow
- Weakening validation rules
- Allowing partial themes

### ❌ CI Gate Weakening

- Setting `continue-on-error: true` for validation steps
- Removing pre-commit validation hooks
- Removing parity check from CI

### ❌ Contract Changes

- Changing Theme Contract v1 requirements
- Modifying required token list behavior
- Changing `--tm-*` token semantics

### ❌ Behavioral Changes

- Changing when files are written
- Changing exit codes
- Changing error handling behavior
- Modifying parity check logic

---

## Known Limitations / Technical Debt

### Token Names in Generator (F1)

**Status:** Accepted as Technical Debt

**Location:** `tools/theme-generator/src/token-mapper.ts:329-408`

**Issue:** All 46 token names are hardcoded in the `generateThemeTokens()` function rather than being dynamically derived from `REQUIRED_THEME_TOKENS`.

**Risk:** LOW — Validation + CI parity check prevent drift in practice.

**Mitigation:** The generator runs `validateTheme()` before writing any files, which checks against `REQUIRED_THEME_TOKENS`. Token drift is caught at generation time.

**Future Improvement:** Consider generating the token structure dynamically from `REQUIRED_THEME_TOKENS` to eliminate manual synchronization.

**Reference:** See `docs/reports/theme-tooling-audit/06_no_duplication_scan.md` for detailed analysis.

---

## Unlock Requirements

To unlock Theme Tooling for behavioral changes:

1. **ADR (Architecture Decision Record):**
   - Document the change and rationale
   - Identify impact on existing themes
   - Define migration strategy if needed

2. **Audit Update:**
   - Re-run all audit checks after changes
   - Update audit artifacts
   - Document any new assumptions

3. **Lock Document Update:**
   - Update this document with new locked rules
   - Document what changed and why
   - Update lock date

4. **Review:**
   - Architecture review required
   - All stakeholders must approve

---

## Enforcement

### CI Pipeline

- Theme validation runs on every commit affecting theme files
- Parity check runs on every commit affecting theme files
- Validation failures block merge

### Pre-commit Hooks

- Pre-commit hook validates staged theme files
- Pre-commit hook runs parity check
- Validation failures block commit

### Documentation

- This lock document defines locked rules
- Audit artifacts provide evidence of correct behavior
- README files reference this lock

### Code Review

- Changes to Theme Tooling require lock compliance review
- Bypass flags are forbidden
- Path changes require unlock procedure

---

## Summary

**Theme Tooling is LOCKED at Extension level and declared as ACTIVE EXTENSION LOCK.**

**Extension State:** Theme Tooling is **CLOSED** and **behaviorally immutable**.

**Locked Elements:**

- Default output path (`src/EXTENSIONS/themes/`)
- CLI command interfaces (no bypass flags)
- Validation rules (Theme Contract v1 compliance)
- Write guards (no files without validation)
- Parity check (token registry compliance)
- CI gates (blocking on failure)

**Unlock Requirements:**

- ADR describing change
- Audit re-run
- Lock document update
- Architecture review

**Enforcement:**

- CI pipeline validation
- Pre-commit hooks
- Code review requirements
- Documentation compliance

**After this lock, Theme Tooling must be treated as Extension Infrastructure. Any deviation requires deliberate architectural action (ADR + unlock procedure), not incremental fixes. Theme Tooling behavior is immutable.**

---

## Audit Evidence

| Artifact | Description |
|----------|-------------|
| `01_environment.md` | Node/pnpm versions, git commit SHA |
| `02_cli_help_outputs.md` | CLI --help outputs, bypass analysis |
| `03_generation_runs.md` | Generation test results |
| `04_validation_runs.md` | Validation test results |
| `05_paths_and_write_guards.md` | Path analysis across codebase |
| `06_no_duplication_scan.md` | Token list duplication analysis |
| `07_ci_gate_verification.md` | Pre-commit and CI workflow analysis |
| `08_final_verdict.md` | Final summary (6/6 PASS) |

**Audit Location:** `docs/reports/theme-tooling-audit/`

---

## Related Documentation

- [FOUNDATION_LOCK_THEME.md](./FOUNDATION_LOCK_THEME.md) - Theme System Foundation lock
- [ARCHITECTURE_LOCK.md](./ARCHITECTURE_LOCK.md) - Architecture lock document
- [THEME_SYSTEM_ARCHITECTURE.md](../theming/THEME_SYSTEM_ARCHITECTURE.md) - Theme system architecture
- `tools/theme-contract/README.md` - Theme Contract package documentation
- `tools/theme-generator/README.md` - Theme Generator documentation
- `src/FOUNDATION/tokens/required-tokens.ts` - Canonical token registry
- `scripts/check-theme-token-parity.mjs` - Token parity checker
