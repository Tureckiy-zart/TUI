# Textarea Component Migration Guide

**Component:** Textarea  
**Migration Type:** ⚠️ **BREAKING CHANGES**  
**Version:** v1.x → v2.0.0 (MAJOR)  
**Date:** 2025-12-25  
**Reason:** Foundation Authority compliance (CVA_CANONICAL_STYLE, VARIANTS_SIZE_CANON, STATE_AUTHORITY)

---

## Overview

The Textarea component has undergone a **mandatory architectural refactor** via Pipeline 18A to achieve Foundation Authority compliance. This refactor introduces **intentional breaking changes** to the public API.

**⚠️ CRITICAL:** This is a **MAJOR version release** with **NO BACKWARD COMPATIBILITY**. Migration is **mandatory** for all consumers.

---

## Breaking Changes Summary

### BREAKING-1: State Prop Removal

**Status:** ❌ REMOVED

**Severity:** HIGH  
**Migration Difficulty:** EASY  
**Reason:** STATE_AUTHORITY compliance (states must be native HTML attributes, not prop enums)

**What Changed:**
- The `state` prop has been **completely removed**
- Error state: Use native `aria-invalid` attribute
- Disabled state: Use native `disabled` attribute
- Success state: Removed (validation feedback should be external)

### BREAKING-2: Variant Dictionary Change

**Status:** ❌ CHANGED

**Severity:** HIGH  
**Migration Difficulty:** EASY  
**Reason:** VARIANTS_SIZE_CANON compliance (Textarea is a surface component, not an interactive control)

**What Changed:**
- Variant dictionary changed from **InteractiveVariant** to **SurfaceVariant**
- Variant values changed:
  - `primary` → `default`
  - `secondary` → `elevated`
  - `outline` → `outlined`
  - `ghost` → `subtle`
  - `destructive` → removed (use `aria-invalid` for error state)

### BREAKING-3: CVA Migration (Internal Only)

**Status:** ✅ MIGRATED (no API impact)

**Severity:** LOW  
**Migration Difficulty:** NONE  
**Reason:** CVA Usage Decision Matrix compliance (token-driven component must use tokenCVA)

**What Changed:**
- Internal: `cva` → `tokenCVA`
- **No public API impact** (consumers don't need to change anything for this)

---

## Migration Guide

### Variant Mapping Table

| Old API (v1.x) | New API (v2.0) | Semantic Meaning | Visual Change |
|----------------|----------------|------------------|---------------|
| `variant="primary"` | `variant="default"` | Default surface styling | ✅ Visual parity preserved |
| `variant="secondary"` | `variant="elevated"` | Elevated surface appearance | ✅ Visual parity preserved |
| `variant="outline"` | `variant="outlined"` | Border emphasis (name normalized) | ✅ Visual parity preserved |
| `variant="ghost"` | `variant="subtle"` | Minimal styling | ✅ Visual parity preserved |
| `variant="destructive"` | ❌ **REMOVED** | Use `aria-invalid={true}` for error state | ⚠️ Use aria-invalid instead |

### State Model Migration Table

| Old API (v1.x) | New API (v2.0) | Native HTML Pattern | Notes |
|----------------|----------------|---------------------|-------|
| `state="disabled"` | `disabled={true}` | Native `disabled` attribute | ✅ Standard HTML pattern |
| `state="error"` | `aria-invalid={true}` | Native ARIA attribute | ⚠️ Use with `aria-describedby` |
| `state="success"` | ❌ **REMOVED** | External validation feedback | Validation UI should be external |
| `state="default"` | ❌ **REMOVED** | Implicit (no prop needed) | Default state is implicit |

---

## Code Examples

### Example 1: Basic Error State Migration

**BEFORE (v1.x):**
```tsx
<Textarea 
  variant="primary" 
  state="error" 
  placeholder="Enter text"
/>
```

**AFTER (v2.0):**
```tsx
<Textarea 
  variant="default" 
  aria-invalid={true}
  aria-describedby="error-message"
  placeholder="Enter text"
/>
<p id="error-message" className="text-sm text-destructive">
  Error message here
</p>
```

**Key Changes:**
- ✅ `variant="primary"` → `variant="default"`
- ✅ `state="error"` → `aria-invalid={true}`
- ✅ Added `aria-describedby` to associate error message
- ✅ Error message now external (proper separation of concerns)

---

### Example 2: Disabled State Migration

**BEFORE (v1.x):**
```tsx
<Textarea 
  variant="outline"
  state="disabled" 
  placeholder="Disabled textarea"
/>
```

**AFTER (v2.0):**
```tsx
<Textarea 
  variant="outlined"
  disabled={true}
  placeholder="Disabled textarea"
/>
```

**Key Changes:**
- ✅ `variant="outline"` → `variant="outlined"` (name normalized)
- ✅ `state="disabled"` → `disabled={true}` (native HTML attribute)

---

### Example 3: Form Integration with Conditional Error

**BEFORE (v1.x):**
```tsx
function MyForm() {
  const [error, setError] = useState(false);
  
  return (
    <Textarea 
      variant="outline" 
      state={error ? "error" : "default"}
      placeholder="Enter description"
    />
  );
}
```

**AFTER (v2.0):**
```tsx
function MyForm() {
  const [error, setError] = useState(false);
  const errorId = useId();
  
  return (
    <>
      <Textarea 
        variant="outlined" 
        aria-invalid={error}
        aria-describedby={error ? errorId : undefined}
        placeholder="Enter description"
      />
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          Please enter a valid description
        </p>
      )}
    </>
  );
}
```

**Key Changes:**
- ✅ `variant="outline"` → `variant="outlined"`
- ✅ `state={error ? "error" : "default"}` → `aria-invalid={error}`
- ✅ Added `aria-describedby` for error message association
- ✅ Error message now conditional and properly associated

---

### Example 4: Success State Migration

**BEFORE (v1.x):**
```tsx
<Textarea 
  variant="outline"
  state="success" 
  defaultValue="Valid content"
/>
```

**AFTER (v2.0):**
```tsx
<Textarea 
  variant="outlined"
  defaultValue="Valid content"
/>
<p className="text-sm text-semantic-success">
  ✓ Content is valid
</p>
```

**Key Changes:**
- ✅ `variant="outline"` → `variant="outlined"`
- ✅ `state="success"` → removed (validation feedback is now external)
- ✅ Success message rendered separately (proper separation of concerns)

---

### Example 5: All Variants Migration

**BEFORE (v1.x):**
```tsx
<Textarea variant="primary" />
<Textarea variant="secondary" />
<Textarea variant="outline" />
<Textarea variant="ghost" />
<Textarea variant="destructive" />
```

**AFTER (v2.0):**
```tsx
<Textarea variant="default" />
<Textarea variant="elevated" />
<Textarea variant="outlined" />
<Textarea variant="subtle" />
{/* destructive removed - use aria-invalid for error state */}
<Textarea aria-invalid={true} />
```

---

## Common Migration Pitfalls

### Pitfall 1: Forgetting `aria-describedby`

**❌ INCORRECT:**
```tsx
<Textarea aria-invalid={true} />
<p id="error-msg">Error message</p>
```

**✅ CORRECT:**
```tsx
<Textarea 
  aria-invalid={true}
  aria-describedby="error-msg"
/>
<p id="error-msg">Error message</p>
```

**Why:** Screen readers need `aria-describedby` to announce the error message when the textarea is focused.

---

### Pitfall 2: Using Old Variant Names

**❌ INCORRECT:**
```tsx
<Textarea variant="outline" />  {/* TypeScript error */}
<Textarea variant="primary" />  {/* TypeScript error */}
```

**✅ CORRECT:**
```tsx
<Textarea variant="outlined" />
<Textarea variant="default" />
```

**Why:** Variant names have changed per SurfaceVariant dictionary. TypeScript will catch this error.

---

### Pitfall 3: Keeping `state` Prop

**❌ INCORRECT:**
```tsx
<Textarea state="error" />  {/* TypeScript error */}
```

**✅ CORRECT:**
```tsx
<Textarea aria-invalid={true} aria-describedby="error-id" />
```

**Why:** The `state` prop no longer exists. TypeScript will catch this error.

---

### Pitfall 4: Using `destructive` Variant for Errors

**❌ INCORRECT:**
```tsx
<Textarea variant="destructive" />  {/* No longer exists */}
```

**✅ CORRECT:**
```tsx
<Textarea aria-invalid={true} aria-describedby="error-id" />
```

**Why:** Error state is now expressed via `aria-invalid`, not via variant. This separates visual styling (variant) from validation state (ARIA).

---

### Pitfall 5: Missing Error Message Element

**❌ INCORRECT:**
```tsx
<Textarea 
  aria-invalid={true}
  aria-describedby="error-msg"
/>
{/* Missing <p id="error-msg"> */}
```

**✅ CORRECT:**
```tsx
<Textarea 
  aria-invalid={true}
  aria-describedby="error-msg"
/>
<p id="error-msg">Error message here</p>
```

**Why:** If you use `aria-describedby`, the referenced element must exist. Otherwise, screen readers will not announce anything.

---

## Why These Changes Were Necessary

### Authority Compliance Rationale

#### 1. CVA Usage Decision Matrix (CVA_CANONICAL_STYLE.md)

**Problem:** Textarea used `cva` from `class-variance-authority` instead of `tokenCVA`.

**Rule Violated:** Decision Matrix RULE 1 - "tokenCVA is REQUIRED for token-driven axes"

**Why It Matters:**
- Textarea has token-driven visual axes (variant, size, state)
- Components with token-driven axes MUST use `tokenCVA` for validation and architectural consistency
- Using `cva` violated the mandatory architectural pattern

**Resolution:** Migrated from `cva` to `tokenCVA` (internal change, no API impact)

---

#### 2. Variant Dictionary Authority (VARIANTS_SIZE_CANON.md)

**Problem:** Textarea used **InteractiveVariant** dictionary (`primary`, `secondary`, `destructive`).

**Rule Violated:** "Textarea is a surface component, not an interactive control"

**Why It Matters:**
- **InteractiveVariant** is for components that **trigger actions** (Button, Link)
- **SurfaceVariant** is for components that **receive content** (Textarea, Card, Modal)
- Textarea is a form input surface that receives user text → must use SurfaceVariant
- Using InteractiveVariant created semantic confusion (what does "primary" textarea mean?)

**Resolution:** Migrated to SurfaceVariant (`default`, `elevated`, `outlined`, `filled`, `subtle`)

---

#### 3. State Authority (STATE_MATRIX.md, STATE_AUTHORITY.md)

**Problem:** Textarea used `state` prop enum (`"error"`, `"success"`, `"disabled"`).

**Rule Violated:** "States should be native HTML attributes, not prop enums"

**Why It Matters:**
- The `state` prop conflated **interaction states** (disabled) with **validation feedback** (error, success)
- Native HTML pattern: `disabled={true}`, `aria-invalid={true}`, `required={true}`
- Prop enums violate STATE_AUTHORITY principle: "Use native HTML patterns for states"
- Validation feedback (error/success) should be external to the input component

**Resolution:** 
- Removed `state` prop entirely
- Use native `disabled` attribute for disabled state
- Use native `aria-invalid` attribute for error state
- Success state removed (validation feedback should be external)

---

## Backward Compatibility Policy

### ⚠️ EXPLICIT DECLARATION

**NO BACKWARD COMPATIBILITY PROVIDED BY DESIGN.**

This is an **intentional architectural decision**, not an oversight.

### Why No Backward Compatibility?

Providing backward compatibility (e.g., supporting both `state` prop and `aria-invalid`) would:

1. ❌ **Violate Foundation Authority Contracts**
   - Reintroduce deprecated state model
   - Violate STATE_AUTHORITY principle
   - Undermine architectural compliance

2. ❌ **Create API Confusion**
   - Two ways to do the same thing
   - Unclear which pattern is "correct"
   - Documentation ambiguity

3. ❌ **Delay Proper Migration**
   - Consumers would avoid migrating
   - Technical debt accumulation
   - Eventually requires another breaking change

4. ❌ **Undermine Architectural Integrity**
   - Foundation layer must be exemplary
   - Cannot compromise on architectural correctness
   - Sets bad precedent for other components

### Migration is Mandatory

All consumers **must migrate** to the new API. There is no compatibility shim, deprecation period, or gradual migration path.

**This prioritizes long-term architectural correctness over short-term convenience.**

---

## Semver Policy

### Version Bump: MAJOR (v1.x → v2.0.0)

**Reason:** Breaking changes in public API require MAJOR version bump per [Semantic Versioning](https://semver.org/).

**Breaking Changes:**
- ❌ `state` prop removed (API surface changed)
- ❌ Variant values changed (API contract changed)

### Release Policy

**Required:**
- ✅ MAJOR version bump (v2.0.0)
- ✅ Migration guide published before release (this document)
- ✅ Release notes with "BREAKING CHANGES" section
- ✅ Changelog with migration guide reference

**Forbidden:**
- ❌ Silent release without migration guide
- ❌ Minor/patch release for breaking changes
- ❌ Hidden backward compatibility shims

---

## Migration Timeline

### Recommended Approach

**Timeline:** Immediate migration (breaking changes are intentional and necessary)

**Process:**
1. Read this migration guide thoroughly
2. Update all Textarea usages per mapping tables
3. Test TypeScript compilation (will catch most errors)
4. Test visual parity (styles should match)
5. Test accessibility (screen reader, keyboard navigation)

### Support Policy

**v1.x Support:** ❌ No updates after v2.0 release

**v2.0 Support:** ✅ Ongoing (current stable)

**Deprecation Period:** ❌ None (immediate breaking change)

---

## Testing Your Migration

### Migration Checklist

Use this checklist to verify your migration is complete:

- [ ] All `state` props removed from Textarea usages
- [ ] All variant values updated per mapping table:
  - [ ] `primary` → `default`
  - [ ] `secondary` → `elevated`
  - [ ] `outline` → `outlined`
  - [ ] `ghost` → `subtle`
  - [ ] `destructive` → removed (use `aria-invalid`)
- [ ] `aria-invalid={true}` used for error state
- [ ] `aria-describedby` associated with error messages
- [ ] `disabled={true}` attribute used for disabled state
- [ ] TypeScript compilation passes (no type errors)
- [ ] Visual parity verified (styles match expected)
- [ ] Accessibility tested:
  - [ ] Screen reader announces error messages
  - [ ] Keyboard navigation works correctly
  - [ ] Focus visible on keyboard navigation
  - [ ] Disabled state prevents interaction

### Testing Commands

```bash
# TypeScript check
pnpm run type-check

# Linting
pnpm run lint

# Unit tests
pnpm run test

# Storybook (visual verification)
pnpm run storybook
```

---

## Visual Comparison

### Variant Visual Parity

The new variant names have **visual parity** with the old names. The **styling is preserved**, only the **names changed**.

| Old Variant | New Variant | Visual Appearance |
|-------------|-------------|-------------------|
| `primary` | `default` | Standard border, transparent background |
| `secondary` | `elevated` | Elevated appearance, card background |
| `outline` | `outlined` | Emphasized border, transparent background |
| `ghost` | `subtle` | Minimal border, subtle text |
| `destructive` | (removed) | Use `aria-invalid` for error styling |

**Key Point:** If your UI looks different after migration, verify you've applied the correct variant mapping from the table above.

---

## FAQ

### Q: Why can't you keep `state` prop for backward compatibility?

**A:** Backward compatibility would violate Foundation Authority Contracts (STATE_AUTHORITY). The `state` prop pattern is architecturally incorrect and cannot be preserved.

### Q: Can I still use the old variant names?

**A:** No. TypeScript will enforce the new variant names. The old names no longer exist in the type system.

### Q: What if I need "destructive" styling?

**A:** Use `aria-invalid={true}` instead. Error/destructive styling is now expressed via validation state (`aria-invalid`), not via visual variant.

### Q: Do I need to change my tests?

**A:** Yes. Update your tests to:
- Use new variant names
- Use `aria-invalid` instead of `state="error"`
- Use `disabled` instead of `state="disabled"`

### Q: Will this break my production app?

**A:** Yes, if you upgrade without migration. **Read this guide first**, then migrate, then upgrade.

### Q: Is there a codemod for automatic migration?

**A:** No. Migration is straightforward and should be done manually with careful review. TypeScript will catch most issues.

### Q: Can I delay the migration?

**A:** Yes, by pinning your dependency to v1.x. However, v1.x will not receive updates. Migration is recommended.

---

## Additional Resources

### Documentation References

- **Pipeline 18A Audit Report:** [`docs/reports/audit/TEXTAREA_BASELINE_REPORT.md`](../reports/audit/TEXTAREA_BASELINE_REPORT.md)
- **CVA Canonical Style:** [`docs/architecture/CVA_CANONICAL_STYLE.md`](../architecture/CVA_CANONICAL_STYLE.md)
- **Variants Size Canon:** [`docs/architecture/VARIANTS_SIZE_CANON.md`](../architecture/VARIANTS_SIZE_CANON.md)
- **State Authority:** [`docs/architecture/STATE_AUTHORITY.md`](../architecture/STATE_AUTHORITY.md)
- **State Matrix:** [`docs/architecture/STATE_MATRIX.md`](../architecture/STATE_MATRIX.md)

### Support

For migration questions or issues:
1. Review this migration guide thoroughly
2. Check TypeScript errors (they will guide you)
3. Review the audit report for detailed rationale
4. Consult Foundation Authority documents for architectural context

---

## Conclusion

This migration introduces **intentional, necessary breaking changes** to achieve Foundation Authority compliance. While migration is mandatory and there is no backward compatibility, the migration path is straightforward with clear mappings and examples.

**Key Takeaways:**
- ✅ Variant names changed (InteractiveVariant → SurfaceVariant)
- ✅ State model changed (prop enum → native HTML attributes)
- ✅ Visual parity preserved (styles match)
- ✅ Architectural compliance achieved (Foundation Authority contracts)
- ❌ No backward compatibility (by design)
- ⚠️ MAJOR version bump required (v2.0.0)

**Thank you for migrating. Your adherence to architectural standards ensures long-term maintainability and correctness.**

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-12-25  
**Status:** ✅ FINAL


