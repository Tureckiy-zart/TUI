# Legacy Component Policy

**Date Created:** 2025-12-25  
**Status:** ✅ **ACTIVE**  
**Purpose:** Define rules for handling legacy components that violate token-driven architecture

---

## Policy Statement

Legacy components **MUST NOT** be exported. Legacy components should be archived in `legacy/` folders, removed from public exports, and not referenced in public documentation.

---

## Legacy Component Rules

### Export Prohibition

**Rule:** Legacy components **MUST NOT** be exported.

**Requirement:**
- ❌ Legacy components must NOT appear in `src/index.ts` exports
- ❌ Legacy components must NOT be part of public API
- ❌ Legacy components must NOT be accessible via package exports

**Rationale:** Legacy components violate token-driven architecture and should not be part of the public API.

### Archive Location

**Requirement:** Legacy components should be archived in `legacy/` folders:

- ✅ Move legacy components to `legacy/` subdirectories
- ✅ Keep legacy components for reference only
- ✅ Isolate legacy components from active codebase

**Examples of Legacy Directories:**
- `src/components/input/legacy/` - Archived input components
- `src/components/select/legacy/` - Archived select components
- `src/components/textarea/legacy/` - Archived textarea components

### Public Documentation Exclusion

**Requirement:** Legacy components must not be referenced in public documentation:

- ❌ Legacy components must NOT appear in public API documentation
- ❌ Legacy components must NOT be referenced in usage guides
- ❌ Legacy components must NOT be shown in examples
- ❌ Legacy components must NOT be mentioned in migration guides (unless explicitly documenting migration away from them)

**Allowed:**
- ✅ Internal migration documentation may reference legacy components
- ✅ Historical context documentation may mention legacy components
- ✅ Deprecation notices may reference legacy components

### Usage Prohibition

**Requirement:** Legacy components must not be used in new code:

- ❌ Legacy components must NOT be used in new implementations
- ❌ Legacy components must NOT be imported in new code
- ❌ Legacy components must NOT be referenced in new features

**Allowed:**
- ✅ Legacy components may be kept for reference
- ✅ Legacy components may be studied for migration purposes
- ✅ Legacy components may be used during migration period (with explicit approval)

---

## Legacy Component Identification

### Characteristics of Legacy Components

Legacy components typically exhibit:

- ❌ Non-token-driven styling (raw values, inline styles)
- ❌ Violations of Authority Contracts
- ❌ Non-canonical patterns
- ❌ Deprecated APIs or patterns
- ❌ Missing Foundation compliance

### Migration Path

**For components identified as legacy:**

1. **Identify legacy status** - Document why component is legacy
2. **Create migration plan** - Plan for canonical replacement
3. **Archive legacy component** - Move to `legacy/` folder
4. **Remove from exports** - Remove from public API
5. **Update documentation** - Remove from public docs
6. **Create canonical replacement** - Build token-driven replacement

---

## Examples

### Legacy Component Archive Example

**Before:**
```
src/components/input/
  ├── Input.tsx (legacy, non-token-driven)
  └── Input.stories.tsx
```

**After:**
```
src/components/input/
  ├── legacy/
  │   └── Input.tsx (archived)
  ├── Input.tsx (canonical, token-driven)
  └── Input.stories.tsx
```

### Export Removal Example

**Before:**
```typescript
// src/index.ts
export { Input } from './components/input/Input'; // Legacy
export { Input as InputV2 } from './components/input/InputV2'; // Canonical
```

**After:**
```typescript
// src/index.ts
// Legacy Input removed from exports
export { Input } from './components/input/InputV2'; // Canonical only
```

---

## Rationale

**Why Legacy Components Must Not Be Exported:**

1. **Architectural Integrity** - Legacy components violate token-driven architecture
2. **API Clarity** - Public API should expose only stable, token-driven components
3. **Consumer Protection** - Preventing use of deprecated patterns protects consumers
4. **Migration Encouragement** - Removing legacy components encourages migration to canonical patterns

**Why Legacy Components Are Kept:**

1. **Reference** - Legacy components provide reference for migration
2. **Historical Context** - Legacy components document evolution of codebase
3. **Migration Support** - Legacy components can be studied during migration

---

## Related Documents

- [ARCHITECTURE_CONTEXT.md](../../ARCHITECTURE_CONTEXT.md) - Architecture context and legacy component handling
- [DEPRECATION_POLICY.md](./DEPRECATION_POLICY.md) - Deprecation policy
- [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Foundation Lock reference

