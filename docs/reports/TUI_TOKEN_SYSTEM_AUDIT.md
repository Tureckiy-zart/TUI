# TUI Token System Audit Report

**Date:** 2025-12-13  
**Status:** Complete  
**Scope:** Cross-component token leakage and domain boundary violations

---

## Executive Summary

This audit identified **7 critical violations** of token domain boundaries in the TUI design token system. The violations involve components importing tokens from other component domains, creating tight coupling and preventing independent evolution of components.

**Key Findings:**
- Select component tokens incorrectly defined in INPUT_TOKENS
- Select components using INPUT_TOKENS instead of SELECT_TOKENS
- Textarea component has no independent token domain
- Label, Divider, and Dropdown components depend on INPUT_TOKENS for basic utilities

**Impact:** These violations prevent components from evolving independently and create maintenance burden when token values need to diverge between components.

---

## Token Domain Structure

### Foundation Tokens
Foundation tokens are semantically neutral and can be used across all components:
- `spacing` - Spacing utilities (px-*, py-*, etc.)
- `typography` - Font sizes, weights, line heights
- `colors` - Color system with CSS variables
- `radius` - Border radius utilities
- `shadows` - Elevation shadows
- `motion` - Animation and transition tokens
- `opacity` - Opacity utilities

### Shared Component Tokens
Semantically neutral tokens shared across multiple components:
- `TEXT_TOKENS` - Typography utilities (fontSize, fontWeight, lineHeight)
- `ICON_TOKENS` - Icon sizing and styling
- `MOTION_TOKENS` - Animation and transition utilities

### Component-Specific Tokens
Each component should have its own token domain in `src/tokens/components/`:
- `INPUT_TOKENS` - Input component tokens
- `SELECT_TOKENS` - Select component tokens
- `BUTTON_TOKENS` - Button component tokens
- etc.

---

## Violation Matrix

| Component | Violating Token Domain | Violation Type | Severity | Status |
|-----------|----------------------|----------------|----------|--------|
| INPUT_TOKENS | Self (contains Select tokens) | Domain leakage | Critical | Fixed |
| Select (select-variants.ts) | INPUT_TOKENS | Cross-domain dependency | Critical | Fixed |
| Select (legacy/select.tsx) | INPUT_TOKENS | Cross-domain dependency | Critical | Fixed |
| Textarea | INPUT_TOKENS | No independent domain | Critical | Fixed |
| Label | INPUT_TOKENS | Cross-domain dependency | Moderate | Fixed |
| Divider | INPUT_TOKENS | Cross-domain dependency | Minor | Fixed |
| Dropdown | INPUT_TOKENS | Cross-domain dependency | Minor | Fixed |

---

## Detailed Violations

### 1. INPUT_TOKENS Contains Select-Specific Tokens

**Location:** `src/tokens/components/input.ts` (lines 96-121)

**Violation Details:**
```typescript
selectListbox: {
  border: "border border-[hsl(var(--border))]",
  background: "bg-[hsl(var(--popover))]",
  text: "text-[hsl(var(--popover-foreground))]",
  radius: "rounded-md",
  shadow: "shadow-md",
},
selectOption: {
  focus: { ... },
  selected: { ... },
}
```

**Impact:**
- Select component domain leakage into Input domain
- Creates confusion about token ownership
- Prevents Select from evolving independently

**Resolution:**
- ✅ Removed `selectListbox` and `selectOption` from INPUT_TOKENS
- These tokens already exist in SELECT_TOKENS as `content` and `item`

---

### 2. Legacy Select Component Uses INPUT_TOKENS

**Location:** `src/components/select/legacy/select.tsx`

**Violation Details:**
- Entire component imports and uses `INPUT_TOKENS` instead of `SELECT_TOKENS`
- Uses INPUT_TOKENS for:
  - Size variants (sm, md, lg)
  - State variants (default, error, disabled)
  - Shadow token

**Impact:**
- Direct cross-domain token dependency
- Legacy component cannot evolve independently

**Resolution:**
- ✅ Updated to use `SELECT_TOKENS` equivalents
- Maintained visual appearance by using matching token values

---

### 3. Select Variants File Uses INPUT_TOKENS

**Location:** `src/components/select/select-variants.ts`

**Violation Details:**
- `selectTriggerVariants` uses INPUT_TOKENS for:
  - All sizing (xs, sm, md, lg)
  - All variants (primary, secondary, outline, ghost)
  - All states (open, closed, disabled)
  - Width (full)
  - Shadow
- `selectListboxVariants` uses `INPUT_TOKENS.selectListbox.*`
- `selectOptionVariants` uses `INPUT_TOKENS.selectOption.*` and `INPUT_TOKENS.width.full`

**Impact:**
- Select component depends entirely on Input token domain
- Cannot evolve independently

**Resolution:**
- ✅ Replaced all `INPUT_TOKENS` references with `SELECT_TOKENS` equivalents
- Used `SELECT_TOKENS.trigger.*` for trigger variants
- Used `SELECT_TOKENS.content.*` for listbox variants
- Used `SELECT_TOKENS.item.*` for option variants
- Used `SELECT_TOKENS.width.full` for width

---

### 4. Textarea Component Uses INPUT_TOKENS

**Locations:**
- `src/components/textarea/Textarea.tsx`
- `src/components/textarea/textarea-variants.ts`
- `src/components/textarea/legacy/textarea.tsx`

**Violation Details:**
Textarea extensively uses `INPUT_TOKENS` for:
- Variants (primary, secondary, outline, ghost, destructive)
- Sizes (xs, sm, md, lg, xl)
- States (default, error, success, disabled)
- Width (`width.full`)
- Shadow
- Message tokens (position, color)

**Impact:**
- Textarea has no independent token domain
- Cannot evolve independently from Input
- Creates tight coupling

**Resolution:**
- ✅ Created `TEXTAREA_TOKENS` in `src/tokens/components/textarea.ts`
- ✅ Duplicated structure from INPUT_TOKENS with identical values
- ✅ Updated all Textarea components to use TEXTAREA_TOKENS
- ✅ Maintained semantic separation for future divergence

---

### 5. Label Component Uses INPUT_TOKENS

**Location:** `src/components/ui/label.tsx`

**Violation Details:**
- Uses `INPUT_TOKENS.label.requiredMark` for required asterisk styling

**Impact:**
- Label depends on Input domain for basic form semantics

**Resolution:**
- ✅ Created `FORM_TOKENS` for shared form semantics
- ✅ Moved `label.requiredMark` to `FORM_TOKENS.label.requiredMark`
- ✅ Updated Label component to use FORM_TOKENS

---

### 6. Divider Component Uses INPUT_TOKENS

**Location:** `src/components/primitives/Divider.tsx`

**Violation Details:**
- Uses `INPUT_TOKENS.width.full` for horizontal divider width

**Impact:**
- Divider depends on Input domain for basic width utility

**Resolution:**
- ✅ Replaced with foundation token `w-full` directly
- ✅ No component-specific token needed for basic utility

---

### 7. Dropdown Uses INPUT_TOKENS

**Location:** `src/components/dropdown/dropdown-variants.ts`

**Violation Details:**
- Uses `INPUT_TOKENS.width.full` for dropdown items

**Impact:**
- Dropdown depends on Input domain for width

**Resolution:**
- ✅ Added `width.full` to `DROPDOWN_TOKENS`
- ✅ Updated dropdown-variants.ts to use `DROPDOWN_TOKENS.width.full`

---

## Component → Token Ownership Matrix

| Component | Own Token Domain | Should Import From |
|-----------|-----------------|-------------------|
| Input | ✅ INPUT_TOKENS | Foundation, TEXT_TOKENS, ICON_TOKENS, MOTION_TOKENS |
| Select | ✅ SELECT_TOKENS | Foundation, TEXT_TOKENS, ICON_TOKENS, MOTION_TOKENS |
| Textarea | ✅ TEXTAREA_TOKENS | Foundation, TEXT_TOKENS, MOTION_TOKENS |
| Label | ✅ FORM_TOKENS | Foundation, TEXT_TOKENS |
| Divider | ✅ Foundation only | Foundation tokens directly |
| Dropdown | ✅ DROPDOWN_TOKENS | Foundation, TEXT_TOKENS, MOTION_TOKENS |

---

## Semantically Overloaded Tokens

### Tokens That Should Be Elevated to Foundation/Shared

1. **Width Utilities**
   - `width.full` (`w-full`) - Used by multiple components
   - **Recommendation:** Use foundation token directly or create shared `LAYOUT_TOKENS`

2. **Form Semantics**
   - `label.requiredMark` - Used by Label component
   - **Recommendation:** ✅ Moved to `FORM_TOKENS` (shared form semantics)

3. **Message/Helper Text**
   - `message.*` tokens - Used by Input and Textarea
   - **Recommendation:** Consider `FORM_TOKENS.message.*` if shared, or keep in component tokens if component-specific

---

## Normalization Actions Taken

### Phase 1: Token Domain Cleanup

1. ✅ **Removed Select tokens from INPUT_TOKENS**
   - Deleted `selectListbox` and `selectOption` from `input.ts`
   - Verified no components depend on these (they use SELECT_TOKENS)

2. ✅ **Created TEXTAREA_TOKENS**
   - Created `src/tokens/components/textarea.ts`
   - Duplicated structure from INPUT_TOKENS with identical values
   - Maintained semantic separation for future divergence

3. ✅ **Created FORM_TOKENS**
   - Created `src/tokens/components/form.ts`
   - Moved `label.requiredMark` from INPUT_TOKENS
   - Provides shared form semantics

4. ✅ **Added width.full to DROPDOWN_TOKENS**
   - Added `width.full` to dropdown token domain
   - Removed dependency on INPUT_TOKENS

### Phase 2: Component Updates

1. ✅ **Updated Select component files**
   - `src/components/select/select-variants.ts` - Now uses SELECT_TOKENS
   - `src/components/select/legacy/select.tsx` - Now uses SELECT_TOKENS

2. ✅ **Updated Textarea component files**
   - `src/components/textarea/Textarea.tsx` - Now uses TEXTAREA_TOKENS
   - `src/components/textarea/textarea-variants.ts` - Now uses TEXTAREA_TOKENS
   - `src/components/textarea/legacy/textarea.tsx` - Now uses TEXTAREA_TOKENS

3. ✅ **Updated Label component**
   - `src/components/ui/label.tsx` - Now uses FORM_TOKENS

4. ✅ **Updated Divider component**
   - `src/components/primitives/Divider.tsx` - Now uses foundation token `w-full` directly

5. ✅ **Updated Dropdown component**
   - `src/components/dropdown/dropdown-variants.ts` - Now uses DROPDOWN_TOKENS.width.full

### Phase 3: Token Exports

1. ✅ **Updated token index**
   - Added TEXTAREA_TOKENS export to `src/tokens/components/index.ts`
   - Added FORM_TOKENS export to `src/tokens/components/index.ts`

---

## Verification

### Visual Regression
- ✅ All components maintain identical visual appearance
- ✅ Token values unchanged, only ownership/imports changed

### Type Safety
- ✅ All TypeScript types updated
- ✅ No type errors introduced

### Test Coverage
- ✅ Components render correctly with new token imports
- ✅ No breaking changes to component APIs

---

## Recommendations

### Short Term
1. ✅ **Complete** - Remove all cross-domain token dependencies
2. ✅ **Complete** - Create independent token domains for Textarea
3. ✅ **Complete** - Create FORM_TOKENS for shared form semantics

### Long Term
1. **Consider LAYOUT_TOKENS** - For shared layout utilities (width, height, etc.)
2. **Documentation** - Maintain canonical documentation on token domain rules
3. **Linting Rules** - Consider ESLint rules to prevent cross-domain imports
4. **Token Validation** - Automated checks to prevent future violations

---

## Success Criteria

✅ **All criteria met:**

1. ✅ No component imports tokens from another component's token domain
2. ✅ Each token domain has clear semantic ownership
3. ✅ Select no longer depends on Input tokens
4. ✅ Token system is documented and enforceable
5. ✅ Visual appearance unchanged (verified via tests/Storybook)

---

## Files Modified

### Token Files
- `src/tokens/components/input.ts` - Removed Select tokens
- `src/tokens/components/textarea.ts` - Created (new)
- `src/tokens/components/form.ts` - Created (new)
- `src/tokens/components/dropdown.ts` - Added width.full
- `src/tokens/components/index.ts` - Added exports

### Component Files
- `src/components/select/select-variants.ts` - Updated to use SELECT_TOKENS
- `src/components/select/legacy/select.tsx` - Updated to use SELECT_TOKENS
- `src/components/textarea/Textarea.tsx` - Updated to use TEXTAREA_TOKENS
- `src/components/textarea/textarea-variants.ts` - Updated to use TEXTAREA_TOKENS
- `src/components/textarea/legacy/textarea.tsx` - Updated to use TEXTAREA_TOKENS
- `src/components/ui/label.tsx` - Updated to use FORM_TOKENS
- `src/components/primitives/Divider.tsx` - Updated to use foundation token
- `src/components/dropdown/dropdown-variants.ts` - Updated to use DROPDOWN_TOKENS

---

## Conclusion

All identified violations have been resolved. The token system now enforces strict domain boundaries, allowing components to evolve independently while maintaining visual consistency. The refactoring was completed with zero visual regressions and full type safety.

**Next Steps:**
- Monitor for any new violations
- Consider automated linting rules
- Update team documentation on token domain rules

---

**Report Generated:** 2025-12-13  
**Audit Completed:** 2025-12-13
