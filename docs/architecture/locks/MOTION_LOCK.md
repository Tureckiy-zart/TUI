# 🔒 Motion System Lock

**Version:** 1.2  
**Date Created:** 2025-12-27  
**Status:** ✅ **LOCKED (singular, versionless since 2.0.0)** - IMMUTABLE  
**Layer:** FOUNDATION / ARCHITECTURE  
**Priority:** CRITICAL

---

## 📋 Purpose

This document **formally locks** the Motion system of `@tenerife.music/ui`. After this lock, all motion tokens, presets, utilities, policies, audit stories, and tests are **immutable** and **closed for modifications**.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

> **⚠️ BREAKING CHANGE (2.0.0):** Motion V1 tokens have been completely removed from the codebase.  
> The motion system is singular and versionless post-2.0.0. CI guards prevent V1 reintroduction.

---

## 🔒 Locked Components

The following Motion system components are **LOCKED** and **IMMUTABLE**:

### 1. Motion Tokens

#### Foundation Motion Tokens
- **File:** `src/FOUNDATION/tokens/motion/v2.ts`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Exports:** `motionDurations`, `motionEasings`, `motionTransitions`, `motionFade`, `motionScale`, `motionSlide`, `motionCombined`, `motionCSSVariables`, `motionTailwindConfig`, `motionReducedMotion`, `motionTransitionProperty`
- **Role:** Canonical motion token definitions
- **Rule:** DO NOT modify, extend, or create alternatives

> **Note:** Motion V1 (`src/FOUNDATION/tokens/motion.ts`) was deleted in 2.0.0. See MOTION_V1_INVENTORY.md for removal details.

#### Component Motion Tokens
- **File:** `src/FOUNDATION/tokens/components/motion.ts`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Exports:** `MOTION_TOKENS`
- **Role:** Component-level motion token mappings
- **Rule:** DO NOT modify, extend, or create alternatives

### 2. Motion Presets/Utilities

#### Tailwind Preset
- **File:** `src/preset.ts`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Exports:** Tailwind preset with `.tm-motion-*` utilities
- **Role:** Motion utility classes (fade-in, fade-out, scale-in, slide-*, hover-lift, tap-scale, etc.)
- **Rule:** DO NOT modify, extend, or create alternatives

#### Motion Presets (TAS)
- **File:** `src/COMPOSITION/motion/animation/presets.ts`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Exports:** Animation preset functions
- **Role:** Reusable animation presets for common UI patterns
- **Rule:** DO NOT modify, extend, or create alternatives

### 3. Motion Authority Contract

#### Motion Authority
- **File:** `docs/architecture/MOTION_AUTHORITY.md`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Version:** 1.4
- **Role:** Canonical motion rules and constraints
- **Rule:** DO NOT modify without explicit unlock procedure

### 4. Motion Audit Stories

#### Motion Overview
- **File:** `src/COMPOSITION/motion/MotionOverview.stories.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Canonical visual checker for all motion presets
- **Rule:** DO NOT modify, extend, or create alternatives

#### Interactivity States
- **File:** `src/COMPOSITION/motion/InteractivityStates.stories.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Canonical visual checker for hover/active/focus states
- **Rule:** DO NOT modify, extend, or create alternatives

#### Reduced Motion Policy
- **File:** `src/COMPOSITION/motion/ReducedMotionPolicy.stories.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Canonical visual checker for reduced motion compliance
- **Rule:** DO NOT modify, extend, or create alternatives

### 5. Motion Integrity Tests

#### Motion Integrity Tests
- **File:** `src/COMPOSITION/motion/animation/motion-integrity.test.ts`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Automated checks for motion CSS variables and animation classes
- **Rule:** DO NOT modify, extend, or create alternatives

#### Interactivity Integrity Tests
- **File:** `src/COMPOSITION/motion/animation/interactivity-integrity.test.ts`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Automated checks for hover/active/focus states
- **Rule:** DO NOT modify, extend, or create alternatives

#### Reduced Motion Tests
- **File:** `src/COMPOSITION/motion/animation/reduced-motion.test.ts`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Automated checks for reduced motion support
- **Rule:** DO NOT modify, extend, or create alternatives

### 6. Static Guards

#### ESLint Rule
- **File:** `eslint-rules/no-raw-motion-scale.ts`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Prevents non-tokenized motion usage
- **Rule:** DO NOT modify, extend, or create alternatives

---

## 🔒 Locked Architecture

### Motion System Hierarchy

The following hierarchy is **LOCKED** and **IMMUTABLE**:

```
Motion Authority Contract (docs/architecture/MOTION_AUTHORITY.md)
  ├── Motion Tokens (src/FOUNDATION/tokens/motion/v2.ts) [ONLY]
  ├── Component Tokens (src/FOUNDATION/tokens/components/motion.ts)
  ├── Motion Presets (src/preset.ts)
  │   └── .tm-motion-* utilities
  ├── TAS Presets (src/COMPOSITION/motion/animation/presets.ts)
  ├── Audit Stories (src/COMPOSITION/motion/*.stories.tsx)
  ├── Integrity Tests (src/COMPOSITION/motion/animation/*.test.ts)
  └── Static Guards (eslint-rules/no-raw-motion-scale.ts)
```

**Note:** Motion V1 was permanently removed in 2.0.0. The motion system is singular and versionless post-2.0.0.

### Motion Domains

The following motion domains are **LOCKED** and **IMMUTABLE**:

1. **Enter/Exit** - Animations for element appearance/disappearance
2. **Hover** - Interactive feedback on hover
3. **Press/Tap** - Interactive feedback on press/tap
4. **Focus/Keyboard** - Visual feedback for keyboard navigation
5. **Expand/Collapse** - Animations for expanding/collapsing content
6. **Toast/Dialog** - Transitions for notifications and dialogs
7. **Loading/Progress** - Micro-motion for loading states

### Allowed Mechanisms

The following mechanisms are **LOCKED** and **IMMUTABLE**:

1. **Token CSS Variables** - `var(--motion-duration-*)`, `var(--motion-easing-*)`
2. **tm-motion Utilities** - `.tm-motion-*` classes
3. **Tailwind Motion Utilities** - Token-based Tailwind utilities (`duration-normal`, `ease-out`)

### Forbidden Patterns

The following patterns are **LOCKED** as forbidden:

1. Raw duration values (`duration-200`, `duration-300`, etc. - use semantic names)
2. Raw easing values (`cubic-bezier(...)` - use tokens)
3. Raw transition/animation values (`transition: 200ms ease-out` - use tokens)
4. Ad-hoc keyframes in components
5. Inline style animations
6. Component-level motion scales
7. Physics-based motion (spring, inertia) - explicitly forbidden (see MOTION_AUTHORITY.md)

### Motion GAP Rule

**Motion GAP resolution is mandatory for component lock.**

**Rule:** A component may only be considered LOCKED if all potential Motion GAPs are resolved.

**Motion GAP Definition:** A Motion GAP is a state where a component undergoes a perceivable state or spatial change without temporal feedback (motion/animation).

**GAP Resolution Requirements:**

1. **All state/spatial changes MUST be evaluated** for Motion GAP (visibility, size/layout, selection/active state, user-triggered actions)
2. **Each GAP MUST be resolved** using one of three allowed outcomes:
   - **ADD MOTION** — Canonical motion preset applied
   - **NO MOTION BY DESIGN** — Explicitly declared intentional absence
   - **DEFERRED** — Postponed with documented rationale (UNLOCKED components only)
3. **Unresolved GAPs are a hard blocker** for motion lock
4. **Post-lock GAP discovery** requires formal unlock procedure

**Lock Breaking Condition:** Any unresolved Motion GAP discovered in a LOCKED component requires formal unlock procedure before resolution.

**Reference:** See [Motion Authority Contract](../MOTION_AUTHORITY.md#motion-gap) for complete GAP definition and resolution rules.

**Visual Examples:** See Storybook section "Foundation Locked/Composition/Motion/GAP" for visual demonstrations of GAP evaluation and resolution.

---

## 🚫 What Is Forbidden

### Forbidden Actions

**THE FOLLOWING ACTIONS ARE FORBIDDEN:**

1. **Modifying Locked Motion Components**
   - ❌ Changing motion token values
   - ❌ Adding new motion tokens without unlock procedure
   - ❌ Removing or renaming motion tokens
   - ❌ Modifying `.tm-motion-*` utilities
   - ❌ Changing motion preset implementations
   - ❌ Modifying motion authority rules

2. **Modifying Motion Architecture**
   - ❌ Adding new motion domains without unlock procedure
   - ❌ Changing allowed mechanisms
   - ❌ Modifying forbidden patterns
   - ❌ Changing motion system hierarchy

3. **Modifying Audit Infrastructure**
   - ❌ Modifying audit stories (MotionOverview, InteractivityStates, ReducedMotionPolicy)
   - ❌ Removing or disabling integrity tests
   - ❌ Modifying static guards (ESLint rules)

4. **Creating Alternatives**
   - ❌ Creating custom motion systems
   - ❌ Creating component-specific motion tokens
   - ❌ Creating alternative motion utilities

5. **Bypassing Motion System**
   - ❌ Using raw CSS motion values without escape hatch
   - ❌ Using framer-motion (not in approved stack)
   - ❌ Creating custom keyframes in components

---

## ✅ What Is Allowed

### Allowed Actions

**THE FOLLOWING ACTIONS ARE ALLOWED:**

1. **Using Motion System**
   - ✅ Using `.tm-motion-*` utilities
   - ✅ Using `MOTION_TOKENS` references
   - ✅ Using token-based Tailwind utilities
   - ✅ Creating new components that use motion tokens

2. **Bug Fixes**
   - ✅ Fixing bugs in motion system
   - ✅ Improving accessibility
   - ✅ Performance optimizations (non-breaking)

3. **Non-Breaking Improvements**
   - ✅ Improving TypeScript types
   - ✅ Improving documentation
   - ✅ Adding JSDoc comments
   - ✅ Improving Storybook stories (non-breaking)

4. **Escape Hatch (Rare)**
   - ✅ Using raw motion values with explicit comment and approval (see Escape Hatch Policy in MOTION_AUTHORITY.md)

---

## 🔄 Unlock Procedure

If modifications to locked Motion system components are required, the following procedure **MUST** be followed:

### Step 1: Create Unlock Task

- Define explicit requirements and justification
- Document why unlock is necessary
- Identify scope of changes (tokens, presets, authority, tests, etc.)
- Get architectural approval

### Step 2: Perform Full Audit

- Audit all motion usage across codebase
- Document all dependencies on motion system
- Identify all affected components
- **Evaluate all components for Motion GAP** (state/spatial changes without motion)
- **Resolve all Motion GAPs** (ADD MOTION, NO MOTION BY DESIGN, or DEFERRED with rationale)
- Create impact analysis report

### Step 3: Get Approval

- Receive explicit approval for unlock
- Document approval decision
- Define rollback strategy

### Step 4: Apply Changes

- Make approved changes
- Update all affected components
- Update motion authority documentation
- Update audit stories if needed
- Update integrity tests if needed

### Step 5: Re-verify

- Run all motion integrity tests
- Verify Storybook audit stories
- Verify ESLint guards
- Ensure no violations introduced
- Update all related documents

### Step 6: Re-lock

- Re-apply lock with updated documentation
- Update version numbers
- Update all canonical documents
- Document changes in version history

### Unlock Checklist

Before requesting unlock, ensure:

- [ ] Reason is architecturally justified (not convenience)
- [ ] Impact analysis is complete
- [ ] All affected components identified
- [ ] Rollback strategy defined
- [ ] Tests updated (if needed)
- [ ] Storybook stories updated (if needed)
- [ ] Documentation updated
- [ ] Approval obtained

**⚠️ CRITICAL**: This lock applies to **BOTH humans and AI agents**. Any request to modify locked Motion system components **MUST** be refused with reference to this lock and the required unlock procedure.

---

## 📊 Lock Status

| Component | Status | Lock Date | Immutability |
|-----------|--------|-----------|--------------|
| Motion Tokens V2 | ✅ LOCKED | 2025-12-27 | Immutable |
| Component Motion Tokens | ✅ LOCKED | 2025-12-27 | Immutable |
| Motion Presets (preset.ts) | ✅ LOCKED | 2025-12-27 | Immutable |
| TAS Presets | ✅ LOCKED | 2025-12-27 | Immutable |
| Motion Authority | ✅ LOCKED | 2025-12-27 | Immutable |
| Motion Overview Story | ✅ LOCKED | 2025-12-27 | Immutable |
| Interactivity States Story | ✅ LOCKED | 2025-12-27 | Immutable |
| Reduced Motion Story | ✅ LOCKED | 2025-12-27 | Immutable |
| Motion Integrity Tests | ✅ LOCKED | 2025-12-27 | Immutable |
| Interactivity Tests | ✅ LOCKED | 2025-12-27 | Immutable |
| Reduced Motion Tests | ✅ LOCKED | 2025-12-27 | Immutable |
| ESLint Rule | ✅ LOCKED | 2025-12-27 | Immutable |

**Motion System Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-27  
**Next Review:** Never (system is immutable)

---

## 📚 Related Documents

- **[Motion Authority Contract](../MOTION_AUTHORITY.md)** - Canonical motion rules and constraints
- **[Motion Inventory Report](../../reports/audit/MOTION_INVENTORY_REPORT.md)** - Complete inventory of motion usage
- **[Motion Coverage Matrix](../../reports/audit/MOTION_COVERAGE_MATRIX.md)** - Coverage matrix by domain and component
- **[Motion Gaps](../../reports/audit/MOTION_GAPS.md)** - Prioritized list of gaps
- **[Motion Animations Guide](../../reference/MOTION_ANIMATIONS_GUIDE.md)** - Practical implementation guide
- **[Foundation Lock](../FOUNDATION_LOCK.md)** - Foundation layer lock status
- **[Architecture Lock](../ARCHITECTURE_LOCK.md)** - Architecture lock status

---

## 🎯 Success Criteria

The Motion system lock is successful when:

- ✅ All motion tokens are marked as LOCKED
- ✅ All motion presets are marked as LOCKED
- ✅ Motion authority is locked and immutable
- ✅ Audit stories exist and are locked
- ✅ Integrity tests exist and are locked
- ✅ Static guards (ESLint) are in place and locked
- ✅ Rules are clear enough to prevent future ambiguity
- ✅ All canonical documents are updated
- ✅ CI gates prevent regressions
- ✅ No ambiguity about allowed changes

---

## 🚨 Failure Conditions

The Motion system lock fails if:

- ❌ Ambiguous rules that allow interpretation
- ❌ Missing components in lock documentation
- ❌ Room for interpretation on modifications
- ❌ Lock not explicitly marked in all documents
- ❌ Guard rules not enforcing immutability
- ❌ Motion system responsibilities not clearly defined
- ❌ CI gates not blocking regressions

---

## 📝 Final Note

**Motion 2.0.0 finalized. Motion V1 permanently removed.**

After this lock, the Motion system is considered complete and immutable. Motion V1 has been permanently removed as of version 2.0.0 and must not be reintroduced. The motion system is singular and versionless post-2.0.0.

All future work must respect this lock. Motion system components are **read-only** except for bug fixes and non-breaking improvements. The **motion tokens, presets, authority, audit stories, tests, and guards are locked** and immutable - all modifications require explicit unlock procedure with full audit.

**This is a binding architectural contract. Violations are considered architectural breaches.**

**The Motion system architecture phase is closed.**

---

**Status:** ✅ **LOCKED (singular, versionless since 2.0.0)**  
**Version:** 1.3  
**Date Created:** 2025-12-27  
**Last Updated:** 2025-12-27  
**Priority:** CRITICAL  
**Next Review:** Never (system is immutable)

---

## Documentation Consistency Sign-off

**Date:** 2025-12-27  
**Status:** ✅ **ALIGNED**

Documentation aligned with Motion 2.0.0 (V1 fully removed). All references to Motion V1/V2 versioning have been removed. Motion system is described as singular and versionless post-2.0.0.

---

## 📋 Version History

- **v1.3** (2025-12-27): Motion 2.0.0 Finalization
  - Motion 2.0.0 finalized - Motion V1 permanently removed
  - Added explicit prohibition of physics-based motion (spring, inertia)
  - Updated hierarchy to reflect singular, versionless architecture
  - Reasserted Motion LOCK status post-2.0.0 cleanup

- **v1.2** (2025-12-27): Motion GAP Rule Integration
  - Added Motion GAP rule to locked architecture section
  - Declared GAP resolution as mandatory requirement for component lock
  - Established unresolved GAP as hard blocker for motion lock
  - Updated unlock procedure to include GAP evaluation and resolution
  - Integrated GAP rule with Motion Authority Contract

- **v1.1** (2025-12-27): Motion V1 Removed in 2.0.0
  - Removed Motion V1 tokens (motion.ts deleted)
  - Motion system is now singular and versionless
  - Updated lock to reflect singular architecture
  - Added CI guard: `pnpm check:motion-v1`

- **v1.0** (2025-12-27): Initial Motion System Lock
  - Locked motion tokens
  - Locked Motion presets and utilities
  - Locked Motion authority and policies
  - Locked audit stories and integrity tests
  - Locked CI enforcement guards
