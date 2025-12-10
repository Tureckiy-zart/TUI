# Migration Guide: EventCardEvent → EventCardProps

**Date:** 2025-12-08  
**Status:** Planning  
**Priority:** Low (backward compatibility alias exists)

---

## Overview

This migration guide describes how to migrate from the deprecated `EventCardEvent` type alias to the canonical `EventCardProps` type in the web app.

**Current Status:**

- ✅ `EventCardEvent` is available as a type alias for backward compatibility
- ⏳ Migration to `EventCardProps` is recommended for consistency
- ⏳ No breaking changes - migration can be done incrementally

---

## Background

### Why the Migration?

1. **Type Consistency**: `EventCardProps` is the canonical type name used in the UI library
2. **Clarity**: `EventCardProps` clearly indicates it's a props interface
3. **Maintainability**: Using the official type name reduces confusion
4. **Future-Proofing**: The alias may be removed in a future major version

### Current Situation

- **UI Library**: Exports both `EventCardProps` (canonical) and `EventCardEvent` (alias)
- **Web App**: Uses `EventCardEvent` in 19 files
- **Compatibility**: Both types are identical - `EventCardEvent = EventCardProps`

---

## Migration Steps

### Step 1: Identify All Usage Locations

**Files using `EventCardEvent`:**

1. `src/adapters/ui/wrappers.ts`
2. `src/adapters/ui/eventToCardProps.ts`
3. `src/lib/event-utils.ts`
4. `src/__tests__/eventCard.test.tsx`
5. `src/adapters/ui/README.md` (documentation)
6. `src/adapters/ui/__tests__/adapters.test.ts`
7. And 13 other files (see audit report)

**Find all occurrences:**

```bash
cd apps/web
grep -r "EventCardEvent" src/ --include="*.ts" --include="*.tsx"
```

---

### Step 2: Update Import Statements

**Before:**

```typescript
import type { EventCardEvent } from "@tenerife.music/ui";
```

**After:**

```typescript
import type { EventCardProps } from "@tenerife.music/ui";
```

**Or use both during transition:**

```typescript
import type { EventCardProps as EventCardEvent } from "@tenerife.music/ui";
// Then gradually replace EventCardEvent with EventCardProps
```

---

### Step 3: Update Type Annotations

**Before:**

```typescript
function eventToCardProps(event: EventBase): EventCardEvent {
  // ...
}
```

**After:**

```typescript
function eventToCardProps(event: EventBase): EventCardProps {
  // ...
}
```

---

### Step 4: Update Variable Declarations

**Before:**

```typescript
const eventCard: EventCardEvent = {
  title: "Event",
  getTicketsLabel: "Get Tickets",
};
```

**After:**

```typescript
const eventCard: EventCardProps = {
  title: "Event",
  getTicketsLabel: "Get Tickets",
};
```

---

### Step 5: Update Function Signatures

**Before:**

```typescript
export function convertEventToCardEvent(event: Event): EventCardEvent {
  // ...
}
```

**After:**

```typescript
export function convertEventToCardEvent(event: Event): EventCardProps {
  // ...
}
```

**Note:** Consider renaming function to `convertEventToCardProps` for consistency.

---

### Step 6: Update Documentation

**Files to update:**

- `src/adapters/ui/README.md`
- Any JSDoc comments referencing `EventCardEvent`
- Type documentation

**Before:**

```markdown
- **eventToCardProps**: Converts `EventBase` → `EventCardEvent`
```

**After:**

```markdown
- **eventToCardProps**: Converts `EventBase` → `EventCardProps`
```

---

## Migration Strategy

### Option 1: Big Bang Migration (Recommended for Small Codebase)

**Approach:** Update all files at once

**Steps:**

1. Update all imports
2. Update all type annotations
3. Run TypeScript check
4. Run tests
5. Commit changes

**Pros:**

- Clean, consistent codebase
- No intermediate state
- Easier to review

**Cons:**

- Requires all files to be updated at once
- Larger PR

---

### Option 2: Incremental Migration (Recommended for Large Codebase)

**Approach:** Migrate file by file or module by module

**Steps:**

1. Start with adapter layer (`src/adapters/ui/`)
2. Update utility functions (`src/lib/event-utils.ts`)
3. Update tests
4. Update remaining files
5. Remove alias import after all files migrated

**Pros:**

- Can be done incrementally
- Smaller, reviewable PRs
- Less risk

**Cons:**

- Temporary inconsistency
- Multiple PRs needed

---

## Recommended Approach

**For this project:** Use **Option 2 (Incremental Migration)**

**Migration Order:**

1. **Phase 1:** Adapter layer (`src/adapters/ui/`)
2. **Phase 2:** Utility functions (`src/lib/`)
3. **Phase 3:** Tests (`src/__tests__/`)
4. **Phase 4:** Documentation
5. **Phase 5:** Remaining files

---

## Code Examples

### Example 1: Adapter Function

**File:** `src/adapters/ui/eventToCardProps.ts`

**Before:**

```typescript
import type { EventCardEvent } from "@tenerife.music/ui";

export function eventToCardProps(
  event: EventBase,
  locale: string,
  options: EventToCardPropsOptions = {},
): EventCardEvent {
  // Implementation
}
```

**After:**

```typescript
import type { EventCardProps } from "@tenerife.music/ui";

export function eventToCardProps(
  event: EventBase,
  locale: string,
  options: EventToCardPropsOptions = {},
): EventCardProps {
  // Implementation (unchanged)
}
```

---

### Example 2: Utility Function

**File:** `src/lib/event-utils.ts`

**Before:**

```typescript
import { EventCardEvent } from "@tenerife.music/ui";

export function convertEventToCardEvent(event: Event): EventCardEvent {
  // Implementation
}
```

**After:**

```typescript
import { EventCardProps } from "@tenerife.music/ui";

export function convertEventToCardEvent(event: Event): EventCardProps {
  // Implementation (unchanged)
}
```

---

### Example 3: Test File

**File:** `src/__tests__/eventCard.test.tsx`

**Before:**

```typescript
import { EventCard, type EventCardEvent } from "@tenerife.music/ui";

describe("EventCard", () => {
  it("renders correctly", () => {
    const event: EventCardEvent = {
      title: "Test Event",
      getTicketsLabel: "Get Tickets",
    };
    // Test
  });
});
```

**After:**

```typescript
import { EventCard, type EventCardProps } from "@tenerife.music/ui";

describe("EventCard", () => {
  it("renders correctly", () => {
    const event: EventCardProps = {
      title: "Test Event",
      getTicketsLabel: "Get Tickets",
    };
    // Test (unchanged)
  });
});
```

---

## Verification Steps

### After Migration

1. **TypeScript Check:**

   ```bash
   cd apps/web
   npm run typecheck
   ```

2. **Run Tests:**

   ```bash
   npm test
   ```

3. **Build Check:**

   ```bash
   npm run build
   ```

4. **Search for Remaining Usage:**
   ```bash
   grep -r "EventCardEvent" src/ --include="*.ts" --include="*.tsx"
   # Should return no results (except in comments/docs)
   ```

---

## Rollback Plan

If issues arise:

1. The `EventCardEvent` alias is still available in UI library
2. Revert import changes
3. Type annotations remain compatible
4. No breaking changes

---

## Timeline

**Recommended Timeline:**

- **Week 1:** Phase 1 (Adapter layer)
- **Week 2:** Phase 2 (Utilities)
- **Week 3:** Phase 3 (Tests)
- **Week 4:** Phase 4-5 (Documentation & cleanup)

**Or:** Complete in one sprint if team capacity allows

---

## Checklist

### Pre-Migration

- [ ] Review all files using `EventCardEvent`
- [ ] Create migration branch
- [ ] Notify team of migration plan

### Migration

- [ ] Update adapter layer imports
- [ ] Update adapter layer type annotations
- [ ] Update utility function imports
- [ ] Update utility function type annotations
- [ ] Update test files
- [ ] Update documentation
- [ ] Update remaining files

### Post-Migration

- [ ] Run TypeScript check
- [ ] Run all tests
- [ ] Verify build succeeds
- [ ] Search for remaining `EventCardEvent` usage
- [ ] Update migration guide status
- [ ] Create PR with migration changes

---

## Future: Removing the Alias

**After migration is complete in web app:**

1. Remove `EventCardEvent` export from UI library `src/index.ts`
2. Update UI library version (major bump if needed)
3. Update web app to use new UI library version
4. Verify no `EventCardEvent` imports remain

**Timeline:** After all consumers have migrated (estimated: 3-6 months)

---

## Questions or Issues?

If you encounter issues during migration:

1. Check that `EventCardProps` is imported correctly
2. Verify TypeScript compilation passes
3. Ensure all tests pass
4. Review this guide for missed steps

---

**Migration Guide Version:** 1.0  
**Last Updated:** 2025-12-08  
**Status:** Ready for implementation
