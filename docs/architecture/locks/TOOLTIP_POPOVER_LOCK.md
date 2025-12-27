# 🔒 TUI Tooltip / Popover / HoverCard Components Lock

**Version:** 1.2  
**Date Created:** 2025-12-21  
**Last Updated:** 2025-12-27  
**Status:** ✅ **LOCKED** - IMMUTABLE  
**Layer:** UI / EXTENSION / LOCKED  
**Priority:** CRITICAL  
**Pipeline:** TUNG_TOOLTIP_POPOVER_STEP_0-10 (Complete) + Pipeline 18A (Popover Complete, HoverCard Complete)

---

## 📋 Purpose

This document **formally locks** the Tooltip, Popover, and HoverCard component implementations of `@tenerife.music/ui`. After this lock, all Tooltip/Popover/HoverCard components and their associated implementation details are **immutable** and **closed for modifications**.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Pipeline Status:** ✅ **COMPLETE**  
**Final Status:** ✅ **STABLE_WITH_DEFERRED_ITEMS**  
**Quality:** ✅ **EXCELLENT**  
**Lock Report:** `docs/reports/audit/TOOLTIP_POPOVER_BASELINE_REPORT.md`

---

## 🔒 Locked Components

The following Overlay components are **LOCKED** and **IMMUTABLE**:

### 1. Tooltip Component
- **File:** `src/COMPOSITION/overlays/Tooltip.tsx`
- **Stories:** `src/COMPOSITION/overlays/Tooltip.stories.tsx`
- **Tests:** `src/COMPOSITION/overlays/Tooltip.test.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-21
- **Exports:** `Tooltip`, `TooltipProvider`, `TooltipTrigger`, `TooltipContent`, `TooltipWrapper`, `tooltipContentVariants`
- **Types:** `TooltipProps`, `TooltipVariant`
- **Rule:** DO NOT modify, extend, or create alternatives
- **Public API:** Internal-only (not exported from `src/index.ts`)
- **Technology:** `@radix-ui/react-tooltip` (v1.2.8)

### 2. Popover Component
- **File:** `src/COMPOSITION/overlays/Popover.tsx`
- **Stories:** `src/COMPOSITION/overlays/Popover.stories.tsx`
- **Tests:** `src/COMPOSITION/overlays/Popover.test.tsx`
- **Status:** ✅ **LOCKED** + ✅ **Pipeline 18A Complete**
- **Lock Date:** 2025-12-21
- **Pipeline 18A Completion:** 2025-12-25
- **Audit Report:** `docs/reports/audit/POPOVER_BASELINE_REPORT.md`
- **Exports:** `Popover`, `PopoverTrigger`, `PopoverAnchor`, `PopoverContent`, `PopoverWrapper`, `popoverContentVariants`
- **Types:** `PopoverProps`, `PopoverVariant`, `PopoverSize`
- **Rule:** DO NOT modify, extend, or create alternatives
- **Public API:** Internal-only (not exported from `src/index.ts`)
- **Technology:** `@radix-ui/react-popover` (v1.1.2)
- **CVA:** tokenCVA (migrated from cva per Pipeline 18A)
- **Type System:** Explicit union types (no CVA leakage)

### 3. HoverCard Component
- **Files:**
  - `src/PATTERNS/menus/menus/hover-card/HoverCardRoot.tsx`
  - `src/PATTERNS/menus/menus/hover-card/HoverCardTrigger.tsx`
  - `src/PATTERNS/menus/menus/hover-card/HoverCardContent.tsx`
  - `src/PATTERNS/menus/menus/hover-card/HoverCard.test.tsx`
- **Stories:** `src/PATTERNS/menus/menus/hover-card/HoverCard.stories.tsx`
- **Status:** ✅ **PROCESS LOCKED** + ✅ **Pipeline 18A Complete**
- **Lock Date:** 2025-12-21
- **Pipeline 18A Completion:** 2025-12-27
- **Audit Report:** `docs/reports/audit/HOVERCARD_BASELINE_REPORT.md`
- **Exports:** `HoverCardRoot`, `HoverCardTrigger`, `HoverCardContent`, `useHoverCardContext`
- **Types:** `HoverCardRootProps`, `HoverCardTriggerProps`, `HoverCardContentProps`
- **Rule:** DO NOT modify, extend, or create alternatives
- **Public API:** ✅ Public (exported from `src/index.ts`)
- **Technology:** Custom implementation wrapping Popover
- **Key Decisions:**
  - Delegation pattern: HoverCardContent delegates styling to PopoverContent (intentional design)
  - Token compliance: All styling via POPOVER_TOKENS through PopoverContent
  - Type system: Explicit types, no CVA type leakage (delegates to PopoverContent types)
  - Storybook compliance: Required stories added (Matrix, States, SizesGallery, LongContent per VARIANTS_SIZE_CANON)
  - Test coverage: Comprehensive test suite with 20+ test cases
  - Accessibility: ARIA attributes, keyboard navigation validated

---

## 🔒 Locked Utilities

The following utilities are **LOCKED** as part of the Tooltip/Popover/HoverCard lock:

### offset-resolution.ts
- **File:** `src/COMPOSITION/overlays/utils/offset-resolution.ts`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-21
- **Exports:** `resolveSideOffset`, `resolveAlignOffset`
- **Rule:** DO NOT modify scope or functionality beyond documented boundaries
- **Scope:** Token-to-pixel offset resolution only
- **Non-Goals:** Positioning logic, collision detection, responsive breakpoints

---

## 🔒 Locked Tokens

The following token domains are **LOCKED** as part of the Tooltip/Popover/HoverCard lock:

### TOOLTIP_TOKENS
- **File:** `src/FOUNDATION/tokens/components/tooltip.ts`
- **Status:** ✅ **LOCKED** (Foundation Layer)
- **Exports:** `TOOLTIP_TOKENS`, `TooltipContentRadius`, `TooltipContentShadow`
- **Rule:** DO NOT modify token values, structure, or exports
- **Scope:** Tooltip-specific tokens (background, border, text, radius, padding, fontSize, shadow)

### POPOVER_TOKENS
- **File:** `src/FOUNDATION/tokens/components/popover.ts`
- **Status:** ✅ **LOCKED** (Foundation Layer)
- **Exports:** `POPOVER_TOKENS`, `PopoverContentRadius`, `PopoverContentShadow`
- **Rule:** DO NOT modify token values, structure, or exports
- **Scope:** Popover-specific tokens (background, border, text, radius, padding, width, shadow)

---

## 🚫 What Is Forbidden

### Forbidden Actions

**THE FOLLOWING ACTIONS ARE FORBIDDEN:**

1. **Modifying Locked Components**
   - ❌ Changing component APIs or props
   - ❌ Removing or renaming exports
   - ❌ Breaking backward compatibility
   - ❌ Changing component behavior
   - ❌ Unifying Tooltip and Popover implementations (intentional duplication - see STEP 3 & STEP 8 rationale)

2. **Modifying Locked Utilities**
   - ❌ Expanding `offset-resolution.ts` beyond token-to-pixel resolution scope
   - ❌ Adding positioning logic or collision detection
   - ❌ Modifying utility function signatures

3. **Modifying Locked Tokens**
   - ❌ Changing token values in `TOOLTIP_TOKENS`
   - ❌ Changing token values in `POPOVER_TOKENS`
   - ❌ Modifying token structure or exports
   - ❌ Reinterpreting token semantics

4. **Creating Alternatives**
   - ❌ Creating `SimpleTooltip`, `BasicPopover`, `HoverCardV2`
   - ❌ Creating any duplicate overlay components
   - ❌ Creating alternative implementations

5. **Extending Beyond API**
   - ❌ Extending components beyond their documented API
   - ❌ Adding non-backward-compatible features
   - ❌ Changing component semantics

---

## ✅ What Is Allowed

### Allowed Actions

**THE FOLLOWING ACTIONS ARE ALLOWED:**

1. **Bug Fixes**
   - ✅ Fixing bugs in locked components
   - ✅ Improving accessibility (requires dedicated accessibility pipeline)
   - ✅ Performance optimizations (non-breaking)

2. **Non-Breaking Improvements**
   - ✅ Improving TypeScript types (non-breaking)
   - ✅ Improving documentation
   - ✅ Adding JSDoc comments

3. **Documentation Updates**
   - ✅ Updating component documentation
   - ✅ Clarifying usage examples
   - ✅ Improving Storybook stories (non-breaking)

4. **Accessibility Improvements** (Deferred)
   - ⚠️ Accessibility improvements are explicitly deferred to dedicated accessibility pipeline
   - ⚠️ Known issue: `HoverCardContent` has `role="tooltip"` (semantically incorrect)
   - ⚠️ Accessibility typing enhancements (low priority)

---

## 🔄 Unlock Procedure

### Unlock Requirements

To unlock any locked component, utility, or token:

1. **Justification Required**
   - Clear architectural justification
   - Impact assessment
   - Migration path documentation

2. **Unlock Approval**
   - Formal unlock request
   - Architecture review
   - Explicit approval

3. **Unlock Documentation**
   - Update lock status in this document
   - Document unlock reason
   - Update version history

### Unlock Constraints

**During Unlock:**
- ❌ No public API expansion without explicit approval
- ❌ No new variants or sizes without explicit approval
- ❌ No behavior changes outside approved scope
- ❌ No bypass of Authority Contracts

---

## 📊 Pipeline Completion Summary

### Pipeline Execution (STEP 0-10)

- ✅ **STEP 0-1:** Baseline Audit & Structural Refactor (offset resolution consolidation)
- ✅ **STEP 2:** Semantic Role Assessment
- ✅ **STEP 3:** Internal Pattern Alignment
- ✅ **STEP 4:** State & Interaction Model Review
- ✅ **STEP 5:** Token / Size / Variant Consistency
- ✅ **STEP 6:** Public API & DX Review
- ✅ **STEP 7:** Type System Alignment
- ✅ **STEP 8:** Intentional Refactor Pass
- ✅ **STEP 9:** Validation via Tests & Storybook
- ✅ **STEP 10:** Final Review & Outcome Fixation
- ✅ **Post-Pipeline:** Corrective Fixes & Guardrails

### Final Status

**Status:** ✅ **STABLE_WITH_DEFERRED_ITEMS**

**Rationale:**
- All implementations are intentional and stable
- Code quality is excellent
- All improvements properly consolidated
- Production-ready
- One accessibility issue identified (deferred to dedicated pipeline)

### Quality Metrics

**Code Quality:** ✅ **Excellent**
- Readability: Excellent
- Maintainability: Excellent
- Type Safety: Strong
- Consistency: Excellent

**Implementation Quality:** ✅ **Intentional and Stable**
- Clear intent expression
- Appropriate abstractions
- Optimal state management
- Proper error handling

**Documentation Quality:** ✅ **Comprehensive**
- Complete API documentation
- Usage examples provided
- Type definitions clear
- Storybook coverage complete

**Test Coverage:** ✅ **Established**
- Core behaviors validated
- API contracts verified
- Integration patterns demonstrated

---

## 📋 Known Limitations (Deferred)

### Deferred Items

**1. Accessibility Improvements (High Priority - Separate Pipeline)**
- **Issue:** `HoverCardContent` has `role="tooltip"` hardcoded, which is semantically incorrect
- **Impact:** Affects screen reader announcements
- **Status:** Deferred to dedicated accessibility review pipeline
- **Rationale:** Explicitly out of scope for structural/validation pipeline

**2. Accessibility Typing Enhancements (Low Priority - Future Enhancement)**
- **Issue:** Type system does not enforce accessibility requirements at type level
- **Impact:** Minor (does not affect functionality)
- **Status:** Deferred to future type system enhancement or accessibility pipeline

---

## 📚 Related Documents

- **[TOOLTIP_POPOVER_BASELINE_REPORT.md](../../reports/audit/TOOLTIP_POPOVER_BASELINE_REPORT.md)** - Complete pipeline execution report
- **[Architecture Lock](../ARCHITECTURE_LOCK.md)** - Foundation and Extension lock status
- **[Extension State](../EXTENSION_STATE.md)** - Extension layer component status
- **[Extension Authority](../EXTENSION_AUTHORITY.md)** - Extension layer boundary contract

---

## 📝 Version History

- **v1.2** (2025-12-27): HoverCard Pipeline 18A completion
  - HoverCard completed full Pipeline 18A (Steps 0-12)
  - Delegation pattern validated: HoverCardContent delegates styling to PopoverContent (intentional design)
  - Token compliance: All styling via POPOVER_TOKENS through PopoverContent
  - Type system: Explicit types, no CVA type leakage (delegates to PopoverContent types)
  - Canonical stories added: Matrix, States, SizesGallery, LongContent
  - Test coverage: Comprehensive test suite with 20+ test cases
  - Accessibility audit complete (ARIA attributes, keyboard navigation validated)
  - Audit report: `docs/reports/audit/HOVERCARD_BASELINE_REPORT.md`
  - **Note:** Tooltip remains at previous lock status (TUNG_TOOLTIP_POPOVER_STEP_0-10)

- **v1.1** (2025-12-25): Popover Pipeline 18A completion
  - Popover completed full Pipeline 18A (Steps 0-12)
  - CVA migration: cva → tokenCVA (Decision Matrix compliance)
  - Type system: Explicit union types (no CVA leakage)
  - Canonical stories added: Matrix, LongContent
  - Accessibility audit complete (WCAG 2.1 Level AA)
  - Audit report: `docs/reports/audit/POPOVER_BASELINE_REPORT.md`
  - **Note:** Tooltip and HoverCard remain at previous lock status (TUNG_TOOLTIP_POPOVER_STEP_0-10)

- **v1.0** (2025-12-21): Initial lock after completion of TUNG_TOOLTIP_POPOVER_STEP_0-10 pipeline
  - Tooltip, Popover, and HoverCard components locked
  - offset-resolution utility locked
  - TOOLTIP_TOKENS and POPOVER_TOKENS locked
  - Pipeline completion documented
  - Deferred items identified

---

**End of Tooltip / Popover / HoverCard Lock Document**

