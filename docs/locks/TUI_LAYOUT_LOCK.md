# 🔒 TUI Layout Primitives Lock

**Version:** 1.0  
**Date Created:** 2025-12-15  
**Status:** ✅ **LOCKED** - IMMUTABLE  
**Layer:** UI / EXTENSION / LOCKED  
**Priority:** CRITICAL

---

## 📋 Purpose

This document **formally locks** the Layout Primitives component system of `@tenerife.music/ui`. After this lock, all Layout Primitives components, their APIs, responsibilities, and relationships are **immutable** and **closed for modifications**.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

---

## 🔒 Locked Components

The following Layout Primitives components are **LOCKED** and **IMMUTABLE**:

### 1. Box Component
- **File:** `src/components/layout/Box.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-15
- **Exports:** `Box`, `BoxProps`
- **Role:** Lowest-level layout primitive - pure, generic container
- **Responsibility:** Spacing (padding/margin), visual properties (radius, shadow, background), element rendering (via `as` prop)
- **Does NOT provide:** Layout composition semantics (display, flexDirection, gap, alignment)
- **Rule:** DO NOT modify, extend, or create alternatives

### 2. Stack Component
- **File:** `src/components/layout/Stack.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-15
- **Exports:** `Stack`, `StackProps`
- **Role:** Primary layout composition primitive for vertical and horizontal flows
- **Responsibility:** Layout composition with semantic spacing (`spacing` prop - canonical), direction control, alignment
- **API:** `spacing` is canonical prop, `gap` is deprecated alias (backward compatible)
- **Rule:** DO NOT modify, extend, or create alternatives

### 3. Column Component
- **File:** `src/components/layout/Column.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-15
- **Exports:** `Column`, `ColumnProps`
- **Role:** Semantic alias for Stack (vertical direction)
- **Responsibility:** Provides explicit vertical layout API
- **Implementation:** Alias for `Stack` (shares implementation)
- **Rule:** DO NOT modify, extend, or create alternatives

### 4. Row Component
- **File:** `src/components/layout/Row.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-15
- **Exports:** `Row`, `RowProps`
- **Role:** Semantic alias for Stack (horizontal direction)
- **Responsibility:** Provides explicit horizontal layout API
- **Implementation:** Alias for `Stack(direction="horizontal")` (shares implementation)
- **Rule:** DO NOT modify, extend, or create alternatives

### 5. Container Component
- **File:** `src/components/layout/Container.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-15
- **Exports:** `Container`, `ContainerProps`
- **Role:** Specialized primitive for width constraint and horizontal padding
- **Responsibility:** Width constraint (maxWidth), horizontal padding, centering
- **Does NOT provide:** Layout composition behaviors (flex, grid, alignment)
- **Rule:** DO NOT modify, extend, or create alternatives

### 6. Flex Component
- **File:** `src/components/layout/Flex.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-15
- **Exports:** `Flex`, `FlexProps`
- **Role:** Advanced flexbox container extension of Box
- **Responsibility:** Full control over flexbox properties (direction, wrap, grow, shrink, basis, alignment, spacing)
- **Uses:** Box internally as base container
- **Rule:** DO NOT modify, extend, or create alternatives

### 7. Grid Component
- **File:** `src/components/layout/Grid.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-15
- **Exports:** `Grid`, `GridProps`
- **Role:** CSS Grid container extension of Box
- **Responsibility:** Full control over grid layout properties (columns, rows, gap, flow, alignment)
- **Uses:** Box internally as base container
- **Rule:** DO NOT modify, extend, or create alternatives

### 8. Surface Component
- **File:** `src/components/layout/Surface.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-15
- **Exports:** `Surface`, `SurfaceProps`, `surfaceVariants`
- **Role:** Surface elevation variant component extension of Box
- **Responsibility:** Provides surface elevation variants (flat, raised, sunken) with token-based styling
- **Uses:** Box internally as base container, CVA for variant management
- **Rule:** DO NOT modify, extend, or create alternatives

---

## 🔒 Locked Architecture

### Layout Hierarchy

The following hierarchy is **LOCKED** and **IMMUTABLE**:

```
Box (lowest-level primitive)
  ├── Stack (primary composition primitive)
  │   ├── Column (semantic alias for Stack - vertical)
  │   └── Row (semantic alias for Stack - horizontal)
  ├── Container (width constraint specialization)
  ├── Flex (advanced flexbox extension)
  ├── Grid (CSS Grid extension)
  └── Surface (elevation variant extension)
```

### Component Responsibilities

The following responsibilities are **LOCKED** and **IMMUTABLE**:

1. **Box:** Spacing and visual properties only (NO layout composition)
2. **Stack:** Primary layout composition primitive (vertical/horizontal flows)
3. **Column/Row:** Semantic aliases for Stack (zero extra logic)
4. **Container:** Width constraint and horizontal padding only (NO layout behaviors)
5. **Flex:** Advanced flexbox control (extension of Box)
6. **Grid:** CSS Grid control (extension of Box)
7. **Surface:** Surface elevation variants (extension of Box)

### API Contracts

The following API contracts are **LOCKED** and **IMMUTABLE**:

1. **Box API:** Only spacing (p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml), visual (radius, shadow, bg), and element rendering (as)
2. **Stack API:** `spacing` is canonical prop, `gap` is deprecated alias (backward compatible)
3. **Row/Column API:** Same as Stack (except direction is fixed)
4. **Container API:** Only maxWidth, padding, center (NO layout props)
5. **Flex/Grid/Surface API:** As documented, using Box internally

---

## 🚫 What Is Forbidden

### Forbidden Actions

**THE FOLLOWING ACTIONS ARE FORBIDDEN:**

1. **Modifying Locked Components**
   - ❌ Changing component APIs or props
   - ❌ Removing or renaming exports
   - ❌ Breaking backward compatibility
   - ❌ Changing component behavior
   - ❌ Adding layout props to Box
   - ❌ Removing spacing/gap from Stack
   - ❌ Changing Row/Column from aliases to implementations

2. **Modifying Component Responsibilities**
   - ❌ Adding layout composition to Box
   - ❌ Adding layout behaviors to Container
   - ❌ Changing Stack from primary composition primitive
   - ❌ Changing Row/Column from semantic aliases

3. **Modifying Component Hierarchy**
   - ❌ Changing Box → Stack → Container hierarchy
   - ❌ Changing Row/Column relationship to Stack
   - ❌ Changing Flex/Grid/Surface relationship to Box

4. **Creating Alternatives**
   - ❌ Creating `SimpleBox`, `BasicStack`, `OldContainer`
   - ❌ Creating `BoxV2`, `StackV2`, `ContainerV2`
   - ❌ Creating any duplicate layout components

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
   - ✅ Improving accessibility
   - ✅ Performance optimizations (non-breaking)

2. **Non-Breaking Improvements**
   - ✅ Adding new optional props (backward-compatible)
   - ✅ Improving TypeScript types
   - ✅ Improving documentation
   - ✅ Adding JSDoc comments

3. **Documentation Updates**
   - ✅ Updating component documentation
   - ✅ Clarifying usage examples
   - ✅ Improving Storybook stories (non-breaking)

---

## 🔄 Unlock Procedure

If modifications to locked Layout Primitives components are required, the following procedure **MUST** be followed:

1. **Create Unlock Task**
   - Define explicit requirements and justification
   - Document why unlock is necessary
   - Get architectural approval

2. **Perform Full Audit**
   - Audit all Layout Primitives components
   - Audit all component relationships
   - Document all dependencies

3. **Get Approval**
   - Receive explicit approval for unlock
   - Document approval decision

4. **Apply Changes**
   - Make approved changes
   - Verify no breaking changes
   - Update all documentation

5. **Re-verify**
   - Complete verification
   - Ensure no violations introduced
   - Update all related documents

6. **Re-lock**
   - Re-apply lock with updated documentation
   - Update all canonical documents

**⚠️ CRITICAL**: This lock applies to **BOTH humans and AI agents**. Any request to modify locked Layout Primitives components **MUST** be refused with reference to this lock and the required unlock procedure.

---

## 📊 Lock Status

| Component  | Status    | Lock Date | Immutability |
| ---------- | --------- | --------- | ------------ |
| Box        | ✅ LOCKED | 2025-12-15 | Immutable    |
| Stack      | ✅ LOCKED | 2025-12-15 | Immutable    |
| Column     | ✅ LOCKED | 2025-12-15 | Immutable    |
| Row        | ✅ LOCKED | 2025-12-15 | Immutable    |
| Container  | ✅ LOCKED | 2025-12-15 | Immutable    |
| Flex       | ✅ LOCKED | 2025-12-15 | Immutable    |
| Grid       | ✅ LOCKED | 2025-12-15 | Immutable    |
| Surface    | ✅ LOCKED | 2025-12-15 | Immutable    |

**Layout Primitives System Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-15  
**Next Review:** Never (components are immutable)

---

## 📚 Related Documents

- **[Extension Canonical State](../architecture/TUI_EXTENSION_CANONICAL_STATE.md)** - Component usage rules and responsibilities
- **[Architecture Lock](../architecture/TUI_ARCHITECTURE_LOCK.md)** - Foundation and Extension lock status
- **[Layout Standardization Report](../../docs_archive/reports/archive/archive/reports/other/TUI_LAYOUT_STANDARDIZATION_REPORT.md)** - Standardization and cleanup report (Note: File may be in docs_archive)
- **[Layout Inventory and Audit Report](../../docs_archive/reports/archive/archive/reports/other/TUI_LAYOUT_INVENTORY_AND_AUDIT_REPORT.md)** - Initial inventory and audit (Note: File may be in docs_archive)

---

## 🎯 Success Criteria

The Layout Primitives lock is successful when:

- ✅ All Layout Primitives components are marked as LOCKED
- ✅ Component responsibilities are clearly defined and immutable
- ✅ Component hierarchy is documented and immutable
- ✅ API contracts are explicit and immutable
- ✅ Rules are clear enough to prevent future ambiguity
- ✅ All canonical documents are updated
- ✅ Guard rules enforce immutability
- ✅ No ambiguity about allowed changes

---

## 🚨 Failure Conditions

The Layout Primitives lock fails if:

- ❌ Ambiguous rules that allow interpretation
- ❌ Missing components in lock documentation
- ❌ Room for interpretation on modifications
- ❌ Lock not explicitly marked in all documents
- ❌ Guard rules not enforcing immutability
- ❌ Component responsibilities not clearly defined

---

## 📝 Final Note

**After this lock, the Layout Primitives component system is considered complete and immutable.**

All future work must respect this lock. Layout Primitives components are **read-only** except for bug fixes and non-breaking improvements. The **component hierarchy, responsibilities, and API contracts are locked** and immutable - all modifications require explicit unlock procedure with full audit.

**This is a binding architectural contract. Violations are considered architectural breaches.**

**The Layout Primitives architecture phase is closed.**

---

**Status:** ✅ **LOCKED**  
**Version:** 1.0  
**Date Created:** 2025-12-15  
**Priority:** CRITICAL  
**Next Review:** Never (components are immutable)

