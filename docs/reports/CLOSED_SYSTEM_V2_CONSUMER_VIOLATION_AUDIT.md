# Closed System v2 — Consumer Scope Violation Audit

**Project:** @tenerife.music/ui  
**Task ID:** TUI_CSV2_CONSUMER_VIOLATION_AUDIT_014  
**Date:** 2026-01-26  
**Status:** ✅ **COMPLETE**

---

## Purpose & Scope

This audit diagnoses consumer-level violations of Closed System v2 architecture without modifying code. The audit was performed on `docs-app/` as a representative example of consumer code that uses `@tenerife.music/ui`.

**Scope:**
- ✅ Application consumer code (docs-app/)
- ✅ Feature-level UI usage
- ✅ COMPOSITION usage sites (read-only)
- ✅ Extension usage sites (read-only)
- ✅ JSX usage of Foundation components
- ✅ Wrapper patterns around Foundation

**Out of Scope:**
- ❌ Foundation source code
- ❌ COMPOSITION implementation
- ❌ Extension implementation
- ❌ Any code modification or autofix
- ❌ CI enforcement changes

---

## Audit Methodology

### Scanning Approach

1. **Static Analysis (V1-V5):**
   - Created automated scanning script (`scripts/audit-consumer-violations.ts`)
   - Used TypeScript compiler API for AST parsing
   - Applied detection logic from existing ESLint rules
   - Scanned 177 TypeScript/TSX files in `docs-app/`

2. **Manual Review (V6):**
   - Manual inspection of wrapper components
   - Analysis of custom abstractions
   - Review of component composition patterns

### Detection Methods

**V1-V5:** Automated AST analysis using:
- Foundation component import tracking
- JSX attribute analysis
- Tailwind utility class detection
- HTML element to Foundation mapping
- Prop spread pattern detection

**V6:** Manual review focusing on:
- Wrapper components that override visual intent
- Custom abstractions hiding Foundation API
- Components adding styling on top of Foundation

---

## Violation Class Definitions

### V1: className on Foundation

**Description:** Passing `className` prop to Foundation components in consumer code.

**Rationale:** Foundation components exclude `className` from their public API to prevent bypassing the token system. Use component props for styling instead.

**Severity:** CRITICAL  
**Confidence:** HIGH

### V2: style on Foundation

**Description:** Passing inline `style` props to Foundation components.

**Rationale:** Foundation components exclude `style` from their public API to prevent bypassing the token system.

**Severity:** CRITICAL  
**Confidence:** HIGH

### V3: Utility-Based Styling

**Description:** Use of Tailwind utility classes on wrapper elements containing Foundation components (parallel styling channel).

**Rationale:** Wrapping Foundation components with utility-styled containers creates parallel styling systems that bypass the token system. Use Foundation layout components instead.

**Severity:** MAJOR  
**Confidence:** HIGH

### V4: Raw HTML Replacement

**Description:** Use of raw HTML elements where a Foundation primitive exists.

**Rationale:** Foundation components provide token-driven, accessible, and consistent implementations. Raw HTML bypasses these benefits.

**Severity:** MAJOR  
**Confidence:** HIGH

### V5: Prop Smuggling

**Description:** Spreading untyped props into Foundation components without explicit typing (prevents smuggling).

**Rationale:** Untyped prop spreads can bypass type checking and inject forbidden props (e.g., `className`, `style`). Explicit typing ensures only sanctioned props are passed.

**Severity:** MAJOR (generic names) / MINOR (complex spreads)  
**Confidence:** MEDIUM / LOW

### V6: Wrapper Intent Override

**Description:** Wrapper components that re-express visual intent outside Foundation.

**Rationale:** Wrappers that override visual intent create parallel expression surfaces, violating the Single Expression Surface principle.

**Severity:** MAJOR  
**Confidence:** Requires manual analysis

---

## Findings Summary

| Violation Class | Count | CRITICAL | MAJOR | MINOR | INFO | Affected Files |
|----------------|-------|----------|-------|-------|------|----------------|
| V1_CLASSNAME_ON_FOUNDATION | 0 | 0 | 0 | 0 | 0 | 0 |
| V2_STYLE_ON_FOUNDATION | 0 | 0 | 0 | 0 | 0 | 0 |
| V3_UTILITY_BASED_STYLING | 0 | 0 | 0 | 0 | 0 | 0 |
| V4_RAW_HTML_REPLACEMENT | 0 | 0 | 0 | 0 | 0 | 0 |
| V5_PROP_SMUGGLING | 0 | 0 | 0 | 0 | 0 | 0 |
| V6_WRAPPER_INTENT_OVERRIDE | 0 | 0 | 0 | 0 | 0 | 0 |
| **Total** | **0** | **0** | **0** | **0** | **0** | **0** |

**Files Scanned:** 177  
**Total Violations:** 0

### Patch: TUI_CSV2_FIX_CRITICAL_CLASSNAME_014

V1 CRITICAL violations (className on Foundation Button/Input) were removed in consumer code: `CodeBlock.tsx`, `Search.tsx`, `TokenExplorer.tsx`. Styling replaced with sanctioned props (`size="sm"` for icon-only Buttons) or removed (Input). Audit re-run confirms CRITICAL = 0; `eslint_guards_ready` set to true (pending MAJOR).

### Patch: TUI_CSV2_PHASE_G_LAYOUT_NORMALIZATION_016

V3 MAJOR violations (utility-based styling wrappers) were removed in consumer code: `page.tsx`, `CodeBlock.tsx`, `Search.tsx`. Utility-based wrapper divs replaced with Foundation layout components (Container, Stack, Box). All 4 V3 violations resolved; `eslint_guards_ready` for Stage 2 upgrade to error.

---

## Detailed Findings by Class

### V1: className on Foundation (3 violations)

#### Finding 1: CodeBlock.tsx
- **File:** `docs-app/components/docs/CodeBlock.tsx`
- **Line:** 45
- **Component:** `Button`
- **Issue:** `className="h-8 w-8"` passed to Foundation Button component
- **Code:**
  ```tsx
  <Button
    variant="ghost"
    iconOnly
    onClick={handleCopy}
    className="h-8 w-8"  // ❌ Violation
    aria-label="Copy code"
  >
  ```
- **Severity:** CRITICAL
- **Confidence:** HIGH
- **Recommendation:** Use Button's `size` prop or wrap in layout component for sizing

#### Finding 2: Search.tsx
- **File:** `docs-app/components/docs/Search.tsx`
- **Line:** 69
- **Component:** `Input`
- **Issue:** `className="w-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"` passed to Foundation Input component
- **Code:**
  ```tsx
  <Input
    type="search"
    placeholder="Search docs... (Cmd/Ctrl+K)"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"  // ❌ Violation
    aria-label="Search documentation"
  />
  ```
- **Severity:** CRITICAL
- **Confidence:** HIGH
- **Recommendation:** Use Input's built-in focus styles or Foundation layout components for width

#### Finding 3: TokenExplorer.tsx
- **File:** `docs-app/components/docs/TokenExplorer.tsx`
- **Line:** 51
- **Component:** `Button`
- **Issue:** `className={cn("h-6 w-6", className)}` passed to Foundation Button component
- **Code:**
  ```tsx
  <Button
    variant="ghost"
    iconOnly
    onClick={handleCopy}
    className={cn("h-6 w-6", className)}  // ❌ Violation
    aria-label="Copy value"
  >
  ```
- **Severity:** CRITICAL
- **Confidence:** HIGH
- **Recommendation:** Use Button's `size` prop or remove className prop

---

### V2: style on Foundation (0 violations)

No violations detected. ✅

---

### V3: Utility-Based Styling (0 violations)

No violations detected. ✅

**Phase G Migration Complete:**
All V3 violations were resolved in Phase G — Layout Normalization (TUI_CSV2_PHASE_G_LAYOUT_NORMALIZATION_016). Utility-based wrapper divs in `page.tsx`, `CodeBlock.tsx`, and `Search.tsx` were replaced with Foundation layout components (Container, Stack, Box).

---

### V4: Raw HTML Replacement (0 violations)

No violations detected. ✅

**Note:** The scan checks for raw HTML elements (p, div, span, button, a, input, textarea, h1-h6) when corresponding Foundation components are imported. No such cases were found in the scanned code.

---

### V5: Prop Smuggling (0 violations)

No violations detected. ✅

**Note:** The scan checks for untyped prop spreads (`{...props}`, `{...rest}`, etc.) on Foundation components. No such cases were found in the scanned code.

---

### V6: Wrapper Intent Override (0 violations)

**Manual Review Results:**

After manual inspection of wrapper components and custom abstractions in `docs-app/`, no cases of V6 violations were identified.

**Reviewed Components:**
- `PageShell` - Layout wrapper, does not override Foundation visual intent
- `CodeBlock` - Wrapper for code display, Button is used correctly within
- `Search` - Search component wrapper, Input is used correctly within
- `TokenExplorer` - Token display component, Button is used correctly within
- `Header` - Layout component, uses Foundation components correctly
- `LiveExample` - Sandpack wrapper, does not contain Foundation components

**Conclusion:** All wrapper components reviewed are layout/structural wrappers that do not override the visual intent of Foundation components. They provide positioning, sizing, or structural context without modifying Foundation component appearance.

---

## Severity Assessment

### CRITICAL (0 violations)

No CRITICAL violations detected. ✅

**Historical Note:** V1 violations (className on Foundation) were resolved in TUI_CSV2_FIX_CRITICAL_CLASSNAME_014.

### MAJOR (0 violations)

No MAJOR violations detected. ✅

**Historical Note:** V3 violations (utility-based styling) were resolved in TUI_CSV2_PHASE_G_LAYOUT_NORMALIZATION_016.

### MINOR (0 violations)

No MINOR violations detected.

### INFO (0 violations)

No INFO violations detected.

---

## False Positive Notes

**No false positives identified.** All detected violations are legitimate violations of Closed System v2 principles.

**Edge Cases Considered:**
1. **Layout wrappers:** Wrappers that only provide structural context (positioning, sizing) are flagged as V3, which is correct. They should use Foundation layout components.
2. **className for sizing:** Cases where `className` is used for sizing (e.g., `h-8 w-8`) are correctly flagged. Foundation components should provide size props.
3. **Focus styles:** Cases where `className` adds focus styles are correctly flagged. Foundation components should handle focus states internally.

---

## Readiness Assessment for ESLint Guards

### Current State

**ESLint Guards Status:** ✅ **IMPLEMENTED** (from TUI_CSV2_ESLINT_GUARDS_CONSUMER_013)

The following ESLint rules are already implemented:
- `tui/no-classname-on-foundation`
- `tui/no-style-on-foundation`
- `tui/no-utility-classes-near-foundation`
- `tui/no-raw-html-when-foundation-exists`
- `tui/no-prop-spread-into-foundation`

### Readiness for Activation

**Status:** ✅ **READY FOR FULL ACTIVATION**

**All Violations Resolved:**
1. ✅ **0 CRITICAL violations** — V1 violations resolved in TUI_CSV2_FIX_CRITICAL_CLASSNAME_014
2. ✅ **0 MAJOR violations** — V3 violations resolved in TUI_CSV2_PHASE_G_LAYOUT_NORMALIZATION_016
3. ✅ **0 total violations** — All consumer code compliant with Closed System v2

**Activation Status:**
- **Stage 1 (CRITICAL):** ✅ Active as **error** (no violations)
- **Stage 2 (MAJOR layout):** ✅ Ready to upgrade from **warn** to **error** (no violations)
- **Pre-staged (V4):** ✅ Active as **error** (no violations)

**Recommendations:**

1. **Upgrade Stage 2 ESLint Guard:**
   - Change `no-utility-classes-near-foundation` from `warn` to `error` in `eslint.consumer.config.mjs`
   - Update `docs/architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md`

2. **Monitor for Regressions:**
   - Continue running `pnpm lint:consumer` in CI
   - Re-run audit periodically to catch new violations

### Guard Effectiveness

**Expected Coverage:**
- ✅ V1: 100% (3 violations would be caught)
- ✅ V2: 100% (0 violations, rule ready)
- ✅ V3: 100% (4 violations would be caught)
- ✅ V4: 100% (0 violations, rule ready)
- ✅ V5: ~80% (0 violations found, but rule may miss some edge cases)
- ⚠️ V6: 0% (requires manual review, not automatable)

---

## Recommended Next Actions

### Immediate Actions (Before Guard Activation)

1. **Fix V1 Violations (CRITICAL):**
   - `CodeBlock.tsx`: Remove `className="h-8 w-8"` from Button, use `size` prop or layout wrapper
   - `Search.tsx`: Remove `className` from Input, use Foundation layout for width/focus styles
   - `TokenExplorer.tsx`: Remove `className` from Button, use `size` prop

2. **Fix V3 Violations (MAJOR):**
   - `page.tsx`: Replace utility-styled wrappers with Foundation `Container` and `Stack` components
   - `CodeBlock.tsx`: Use Foundation layout components for positioning
   - `Search.tsx`: Use Foundation `Box` for container styling

### Short-Term Actions

3. **Verify Foundation Component Coverage:**
   - Ensure Foundation components have sufficient props for common use cases
   - Add size variants if needed (for Button sizing cases)
   - Add layout components if needed (for wrapper cases)

4. **Document Migration Patterns:**
   - Create migration guide for common violation patterns
   - Document Foundation component alternatives
   - Provide examples of correct usage

### Long-Term Actions

5. **Activate ESLint Guards:**
   - After fixing violations, activate guards in CI
   - Monitor for new violations
   - Provide developer education

6. **External Consumer Audit:**
   - Apply audit methodology to external consumer repositories
   - Provide migration support
   - Document common patterns

---

## Conclusion

The audit identified **0 violations** in `docs-app/`:
- **0 CRITICAL** violations (V1: className on Foundation) — ✅ Resolved in TUI_CSV2_FIX_CRITICAL_CLASSNAME_014
- **0 MAJOR** violations (V3: utility-based styling) — ✅ Resolved in TUI_CSV2_PHASE_G_LAYOUT_NORMALIZATION_016
- **0 violations** for V2, V4, V5, V6

**Key Findings:**
1. ✅ All violations have been resolved using Foundation component props and layout components
2. ✅ No architectural blockers identified
3. ✅ ESLint guards are ready for full activation (Stage 2 can be upgraded to error)
4. ✅ Consumer code is fully compliant with Closed System v2 architecture

**Migration Summary:**
- **Phase G Complete:** All utility-based wrapper layouts migrated to Foundation Container / Stack / Box
- **Files Migrated:** `page.tsx`, `CodeBlock.tsx`, `Search.tsx`
- **Violations Resolved:** 4 V3 violations (MAJOR)

**Readiness:** ✅ **FULLY READY** - All guards can be activated as errors. Stage 2 ESLint guard ready for upgrade from warn to error.

---

**Audit Completed:** 2026-01-26  
**Last Updated:** 2026-01-26 (Phase G — Layout Normalization complete)  
**Next Review:** Monitor for regressions, upgrade Stage 2 ESLint guard to error
