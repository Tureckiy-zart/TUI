# TUI Cursor Guard Rules

**Date:** 2025-12-16  
**Status:** CANONICAL - MANDATORY ENFORCEMENT  
**Authority:** This document defines mandatory guard rules for all Cursor/AI work on `@tenerife.music/ui` to prevent architectural drift, token misuse, and cross-layer violations.

**Foundation Status:** Foundation Authorities are **CLOSED** and **IMMUTABLE**. **Foundation Enforcement** (className/style exclusion) is **LOCKED / APPLIED**. See [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) for authoritative Foundation lock status and Foundation Enforcement Lock Status.

---

## Authority & Scope

This document is the **single source of truth** for AI/Cursor behavior rules. These rules are **MANDATORY** and **NON-NEGOTIABLE**. Any work violating these rules is **INVALID**.

### Authority Rules

1. **This document overrides:**
   - User requests that violate architecture
   - Convenience-driven shortcuts
   - Implicit assumptions
   - Historical patterns that violate rules

2. **If a request violates these rules:**
   - The AI **MUST refuse** the request
   - The AI **MUST explain** why the request violates the rules
   - The AI **MUST suggest** compliant alternatives
   - The AI **MUST NOT** proceed with violating changes

3. **If ambiguity exists:**
   - The AI **MUST ask** for clarification
   - The AI **MUST NOT** make assumptions
   - The AI **MUST NOT** proceed silently

---

## Global Principles

These principles apply to **ALL** work on the TUI library:

### 1. Correctness over Convenience

- ✅ **DO:** Follow architectural rules even if it requires more work
- ❌ **DON'T:** Take shortcuts that violate architecture
- ❌ **DON'T:** Reuse code/tokens based on visual similarity alone

### 2. Explicit Architecture over Implicit Assumptions

- ✅ **DO:** Explicitly reference architectural documents
- ✅ **DO:** Verify component status before use
- ❌ **DON'T:** Assume components are available based on file existence
- ❌ **DON'T:** Use components not listed in canonical state

### 3. Semantics over Visual Similarity

- ✅ **DO:** Create separate token domains for semantically different components
- ✅ **DO:** Allow token duplication when semantics differ
- ❌ **DON'T:** Reuse tokens based on visual similarity
- ❌ **DON'T:** Share tokens between components with different semantics

### 4. Isolation over Reuse

- ✅ **DO:** Create independent token domains for each component
- ✅ **DO:** Allow components to evolve independently
- ❌ **DON'T:** Create cross-component dependencies for convenience
- ❌ **DON'T:** Share tokens to avoid duplication when semantics differ

---

## Foundation Authority Protection Rules

### Foundation Authorities: CLOSED and IMMUTABLE

**Status:** ✅ **FOUNDATION CLOSED**  
**Lock Date:** 2025-12-16  
**Source of Truth:** [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md)

**All Foundation Authorities are CLOSED and IMMUTABLE:**
- ✅ **Interaction Authority** - LOCKED
- ✅ **State Authority Matrix** - LOCKED
- ✅ **State Authority Contract** - LOCKED
- ✅ **Layout Authority** - LOCKED
- ✅ **Token System** - LOCKED
- ✅ **Spacing Authority** - LOCKED
- ✅ **Radius Authority** - LOCKED
- ✅ **Typography Authority** - LOCKED
- ✅ **Motion Authority** - LOCKED
- ✅ **Elevation Authority** - LOCKED
- ✅ **Foundation Enforcement** - LOCKED / APPLIED (className/style exclusion, TypeScript/ESLint enforcement)

### Authority Protection Rules

**MANDATORY:**

- ❌ **NEVER** modify Foundation Authority Contracts
- ❌ **NEVER** change Authority rules or definitions
- ❌ **NEVER** suggest modifications to Authority documents
- ❌ **NEVER** weaken Authority rules for convenience
- ❌ **NEVER** bypass Authority rules in Extension components
- ❌ **NEVER** create alternatives to Authority rules

**REQUIRED:**

- ✅ **ALWAYS** reference Authority Contracts when in doubt
- ✅ **ALWAYS** comply with all Foundation Authority rules
- ✅ **ALWAYS** refuse requests to modify Authority Contracts
- ✅ **ALWAYS** suggest Authority unlock procedure if modifications are needed
- ✅ **ALWAYS** treat Authority documents as immutable

**Rule:** When in doubt about Authority rules, **ALWAYS** refer to the relevant Authority Contract document. Authority Contracts are the source of truth for their domains.

### Authority Unlock Procedure

If Authority modifications are required:

1. **Explicit Unlock Task** - Create explicit task with justification
2. **Full Audit** - Complete audit of all affected components
3. **Approval** - Receive explicit approval for unlock and changes
4. **Re-verification** - Verify all components after changes
5. **Re-lock** - Re-apply lock with updated documentation

**Rule:** Authority modifications require explicit unlock procedure. Do not proceed with Authority changes without explicit user approval and unlock workflow.

---

## Layer Rules

### Foundation Layer (LOCKED)

**Status:** IMMUTABLE  
**Rule:** DO NOT modify, extend, or create alternatives

**Foundation Authorities:** All Foundation Authority Contracts are **CLOSED** and **IMMUTABLE**. **Foundation Enforcement** (className/style exclusion) is **LOCKED / APPLIED**. Foundation components must comply with all Authority rules and Foundation Enforcement.

#### Locked Components

1. **Modal** - `src/components/modal/Modal.tsx`
2. **Tabs** - `src/components/navigation/tabs/Tabs.tsx`
3. **Select** - `src/components/select/Select.tsx`
4. **ContextMenu** - `src/components/context-menu/ContextMenu.tsx`
5. **Toast** - `src/components/overlays/Toast.tsx`

#### Foundation Layer Rules

**MANDATORY:**

- ❌ **NEVER** modify Foundation components
- ❌ **NEVER** replace Foundation component logic
- ❌ **NEVER** create alternatives to Foundation components
- ❌ **NEVER** extend Foundation components beyond their documented API
- ❌ **NEVER** import Foundation components from non-canonical paths
- ❌ **NEVER** use internal implementation details of Foundation components
- ❌ **NEVER** add `className` or `style` props to Foundation component public APIs (Foundation Enforcement is FINAL/APPLIED)
- ❌ **NEVER** extend `React.*HTMLAttributes` directly without `Omit<..., "className" | "style">` in Foundation components

**REQUIRED:**

- ✅ **ALWAYS** use Foundation components as-is
- ✅ **ALWAYS** compose Foundation components in Extension layer
- ✅ **ALWAYS** import Foundation components from canonical paths
- ✅ **ALWAYS** respect Foundation component APIs

#### Extension Compositions Rule

Extension compositions (e.g., Dialog, NotificationCenter) **MUST**:

- ✅ Use Foundation Layer components internally
- ✅ Compose Foundation components, not reimplement them
- ❌ **NEVER** reimplement Foundation Layer behavior
- ❌ **NEVER** bypass Foundation Layer components

**Example - Dialog Component:**

```typescript
// ✅ CORRECT: Dialog composes Modal
import { Modal, ModalContent, ModalHeader } from "@/components/modal/Modal";

export const Dialog = ({ ... }) => {
  return (
    <Modal>
      <ModalContent>
        <ModalHeader>...</ModalHeader>
        ...
      </ModalContent>
    </Modal>
  );
};

// ❌ INCORRECT: Dialog reimplements modal behavior
export const Dialog = ({ ... }) => {
  // Reimplementing modal logic - FORBIDDEN
  return <div className="modal-overlay">...</div>;
};
```

---

### Extension Layer (ALLOWED)

**Status:** MODIFIABLE  
**Rule:** May be modified and extended, but must obey token system rules

#### Extension Layer Rules

**ALLOWED:**

- ✅ Modify Extension components
- ✅ Extend Extension components
- ✅ Create new Extension components
- ✅ Use Extension components in compositions

**REQUIRED:**

- ✅ **ALWAYS** use independent token domains
- ✅ **ALWAYS** follow token system rules
- ✅ **ALWAYS** verify component is in ALLOWED list before use
- ✅ **ALWAYS** check canonical state document before using components

**FORBIDDEN:**

- ❌ **NEVER** introduce new behavior already covered by Foundation
- ❌ **NEVER** use components not listed in canonical state
- ❌ **NEVER** import from non-canonical paths
- ❌ **NEVER** violate token domain boundaries

#### Component Verification Rule

**BEFORE** using any component:

1. ✅ Check `docs/architecture/EXTENSION_CANONICAL_STATE.md`
2. ✅ Verify component is in ALLOWED section
3. ✅ Verify component is exported via `src/index.ts`
4. ✅ Use component from canonical import path

**If component is NOT in ALLOWED section:**

- ❌ **DO NOT USE** the component
- ❌ **DO NOT** import the component
- ❌ **DO NOT** reference the component in code
- ✅ **DO** suggest using an ALLOWED alternative

---

### Product Layer (RESTRICTED)

**Status:** NOT PART OF UI LIBRARY  
**Rule:** Product-specific components must not leak into Extension layer

#### Product Layer Rules

**FORBIDDEN:**

- ❌ **NEVER** use product/domain components in UI library
- ❌ **NEVER** treat domain components as generic UI primitives
- ❌ **NEVER** export product components from UI library
- ❌ **NEVER** create product-specific components in Extension layer

**Product Components (Examples - DO NOT USE):**

- EventCard, VenueCard, ArtistCard, CategoryCard, PromoCard, TicketCard
- LoginForm, RegisterForm, ProfileCard
- Dashboard, UserManagement
- SearchBar, FilterBar, DateRangePicker
- HeroSection, CTASection, TrendingSection

**REQUIRED:**

- ✅ Use canonical primitives (e.g., CardBase) to build product components
- ✅ Keep product components in product/domain layer
- ✅ Do not export product components from UI library

---

## Token System Rules

### Rule 1: Component-Specific Token Domains

**MANDATORY:** Each component **MUST** have its own token domain.

**✅ CORRECT:**
```typescript
// Input component
import { INPUT_TOKENS } from "@/tokens/components/input";

// Select component
import { SELECT_TOKENS } from "@/tokens/components/select";

// Textarea component
import { TEXTAREA_TOKENS } from "@/tokens/components/textarea";
```

**❌ INCORRECT:**
```typescript
// Select using Input tokens - FORBIDDEN
import { INPUT_TOKENS } from "@/tokens/components/input";

// Textarea using Input tokens - FORBIDDEN
import { INPUT_TOKENS } from "@/tokens/components/input";
```

### Rule 2: No Cross-Domain Dependencies

**MANDATORY:** Components **MUST NOT** import tokens from another component's token domain.

**✅ CORRECT:**
```typescript
// Textarea has its own tokens
import { TEXTAREA_TOKENS } from "@/tokens/components/textarea";
```

**❌ INCORRECT:**
```typescript
// Textarea using Input tokens - FORBIDDEN
import { INPUT_TOKENS } from "@/tokens/components/input";
```

### Rule 3: Token Domain Encapsulation

**MANDATORY:** A component's token domain **MUST NOT** contain tokens for other components.

**✅ CORRECT:**
```typescript
// INPUT_TOKENS only contains Input-specific tokens
export const INPUT_TOKENS = {
  height: { ... },
  padding: { ... },
  // Only Input tokens
};
```

**❌ INCORRECT:**
```typescript
// INPUT_TOKENS contains Select tokens - FORBIDDEN
export const INPUT_TOKENS = {
  height: { ... },
  selectListbox: { ... }, // FORBIDDEN - Select tokens in Input domain
};
```

### Rule 4: Token Reuse Based on Visual Similarity is FORBIDDEN

**MANDATORY:** Token reuse based on visual similarity is **FORBIDDEN**.

**Rationale:** Components may look similar now but need to evolve independently. Visual similarity does not imply semantic similarity.

**✅ CORRECT:**
```typescript
// Input and Textarea have separate token domains
// Even if values are identical, they are separate domains
export const INPUT_TOKENS = {
  variant: { primary: "..." },
};

export const TEXTAREA_TOKENS = {
  variant: { primary: "..." }, // Same value, different domain
};
```

**❌ INCORRECT:**
```typescript
// Reusing Input tokens in Textarea because they look similar - FORBIDDEN
import { INPUT_TOKENS } from "@/tokens/components/input";
// Using INPUT_TOKENS in Textarea component
```

### Rule 5: Token Duplication is Allowed

**MANDATORY:** Token duplication is **ALLOWED** when semantics differ.

**Rationale:** Components need to evolve independently. Duplication allows independent evolution.

**✅ CORRECT:**
```typescript
// INPUT_TOKENS
export const INPUT_TOKENS = {
  variant: {
    primary: "bg-primary text-primary-foreground",
    outline: "border border-input",
  },
};

// TEXTAREA_TOKENS (duplicated structure, identical values)
export const TEXTAREA_TOKENS = {
  variant: {
    primary: "bg-primary text-primary-foreground", // Same values
    outline: "border border-input", // Same values
  },
};
```

### Rule 6: Shared Tokens for True Shared Semantics

**MANDATORY:** Shared tokens **MUST** represent true shared design intent.

**✅ CORRECT:**
```typescript
// FORM_TOKENS for shared form semantics
import { FORM_TOKENS } from "@/tokens/components/form";

<Label required>
  {required && <span className={FORM_TOKENS.label.requiredMark}>*</span>}
</Label>
```

**When to use shared tokens:**

- Multiple components need the same semantic tokens
- Semantics are unlikely to diverge
- Tokens represent shared design intent (not visual similarity)

**Examples of shared tokens:**

- `FORM_TOKENS` - Shared form semantics (label, required mark, field spacing)
- `TEXT_TOKENS` - Typography utilities
- `ICON_TOKENS` - Icon sizing and styling
- `MOTION_TOKENS` - Animation and transition utilities

### Rule 7: Foundation Tokens for Basic Utilities

**MANDATORY:** Basic utilities **MUST** use foundation tokens directly.

**✅ CORRECT:**
```typescript
// Divider uses foundation token directly
<div className={cn("w-full", className)} />
```

**❌ INCORRECT:**
```typescript
// Divider using Input tokens for basic utility - FORBIDDEN
import { INPUT_TOKENS } from "@/tokens/components/input";
<div className={cn(INPUT_TOKENS.width.full, className)} />
```

### Rule 8: DRY Principle Does NOT Apply to Tokens

**MANDATORY:** DRY (Don't Repeat Yourself) principle **DOES NOT** apply to tokens.

**Rationale:** Token duplication allows components to evolve independently. Sharing tokens creates coupling that prevents independent evolution.

**✅ CORRECT:**
```typescript
// Duplicate token structures even if values are identical
export const INPUT_TOKENS = { variant: { primary: "..." } };
export const TEXTAREA_TOKENS = { variant: { primary: "..." } };
```

**❌ INCORRECT:**
```typescript
// Sharing tokens to avoid duplication - FORBIDDEN
export const FORM_INPUT_TOKENS = { variant: { primary: "..." } };
// Both Input and Textarea use FORM_INPUT_TOKENS - FORBIDDEN
```

---

## TypeScript Safety Rules

### Rule 1: Unsafe Type Assertions Prohibition

**MANDATORY:** Unsafe type assertions (`as any`, `as unknown as`) that bypass the public API type system are **FORBIDDEN** in all contexts.

**Scope of Prohibition:**
- Component implementation
- Tests
- Storybook stories
- Examples and documentation
- Internal utilities

**FORBIDDEN Patterns:**

```typescript
// ❌ FORBIDDEN - using as any to bypass public API
<Component {...({ disabled: true } as any)} />

// ❌ FORBIDDEN - unsafe type assertions
const props = componentProps as any;
const value = data as unknown as TargetType;

// ❌ FORBIDDEN - bypassing TypeScript errors instead of fixing types
const result = (someValue as any).method();
```

**REQUIRED Process:**

If a prop or feature is needed but does not exist in the public API:

1. ✅ **MUST request architectural approval** to add the prop to the public API
2. ✅ **MUST NOT** use `as any` to bypass the type system
3. ✅ **MUST wait** for approval and implementation before using in tests/Storybook

**Exception Process:**

Exceptions are allowed **ONLY** after explicit architectural approval and documentation:
- Exception must be documented with rationale
- Exception must be temporary (with plan to fix)
- Exception must be approved through architectural decision process

**Violation Severity:**

- **Silent use of `as any`** = **BLOCKING PROCESS VIOLATION**
- Violations prevent progression past Step 7 (TypeScript System Compliance)
- Violations in tests/Storybook prevent progression past Steps 11-12 (Quality Gates)

**Canonical Precedent: Link `disabled` Decision**

The Link component's `disabled` prop decision serves as a canonical precedent:
- **Initial State:** `disabled` was not part of Link's public API
- **Violation:** Tests/Storybook used `as any` to simulate `disabled` prop
- **Resolution:** Architectural decision was made to add `disabled` to Link's public API
- **Outcome:** `disabled` is now part of Link's public API (see `LinkProps`)

**Lesson:** If a prop is needed for tests/Storybook/examples, it MUST be added to the public API through proper architectural approval, not bypassed with `as any`.

**Reference:** See [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Step 7: TypeScript System Compliance — Unsafe Type Assertions Prohibition

---

## Refactor Rules

### Rule 1: One Task — One Component

**MANDATORY:** Each refactoring task **MUST** focus on one component only.

**✅ CORRECT:**
- Task: "Fix Input component token violations"
- Scope: Input component only
- Changes: Input component and INPUT_TOKENS only

**❌ INCORRECT:**
- Task: "Fix Input component token violations"
- Scope: Input, Select, Textarea, Label, Divider (multiple components)
- Changes: Multiple components in one task

### Rule 2: No Side Refactors

**MANDATORY:** **DO NOT** perform side refactors not explicitly requested.

**✅ CORRECT:**
- User request: "Fix Input component"
- Action: Fix Input component only
- No changes to other components

**❌ INCORRECT:**
- User request: "Fix Input component"
- Action: Fix Input component + "while I'm at it, let me also fix Select and Textarea"
- Side refactors are FORBIDDEN

### Rule 3: No Architectural Changes Without Approval

**MANDATORY:** **DO NOT** make architectural changes without explicit user approval.

**Architectural changes include:**

- Creating new token domains
- Changing token domain structure
- Modifying Foundation components
- Changing component layer assignments
- Creating new shared tokens

**✅ CORRECT:**
- User request: "Create TEXTAREA_TOKENS for Textarea component"
- Action: Create TEXTAREA_TOKENS as requested
- Explicit approval for architectural change

**❌ INCORRECT:**
- User request: "Fix Textarea component"
- Action: "I'll also create a new shared token system while fixing it"
- Architectural changes without approval are FORBIDDEN

### Rule 4: No Token Changes Unless Task Explicitly Allows It

**MANDATORY:** **DO NOT** change tokens unless the task explicitly allows token changes.

**✅ CORRECT:**
- Task: "Fix Input component styling"
- Token changes: Allowed if task mentions styling/tokens
- Action: Update INPUT_TOKENS if needed

**❌ INCORRECT:**
- Task: "Fix Input component bug"
- Token changes: Not mentioned in task
- Action: "I'll also refactor the tokens while fixing the bug"
- Token changes without explicit permission are FORBIDDEN

---

## Workflow Rules

### Rule 1: Analyze Before Modifying

**MANDATORY:** **ALWAYS** analyze before modifying.

**Required steps:**

1. ✅ Read relevant architectural documents
2. ✅ **Check Foundation Authority status** (Foundation Authorities are CLOSED)
3. ✅ **Verify Authority compliance** (all changes must comply with Authority rules)
4. ✅ Identify affected components
5. ✅ Check component status (LOCKED/ALLOWED/RESTRICTED)
6. ✅ Verify token domain ownership
7. ✅ Check for cross-domain dependencies
8. ✅ Plan changes before executing

**Rule:** If a change would violate Foundation Authority rules, **MUST refuse** and explain why. Foundation Authorities are immutable.

**✅ CORRECT:**
```
1. Read EXTENSION_CANONICAL_STATE.md
2. Verify component is ALLOWED
3. Check token domain rules
4. Plan changes
5. Execute changes
```

**❌ INCORRECT:**
```
1. Start modifying files immediately
2. Discover violations later
3. Fix violations reactively
```

### Rule 2: List Affected Files Before Editing

**MANDATORY:** **ALWAYS** list affected files before editing.

**Required format:**

```
## Files to be modified:
- src/components/input/Input.tsx
- src/tokens/components/input.ts

## Files to be read (for context):
- docs/architecture/TOKEN_SYSTEM.md
- docs/architecture/EXTENSION_CANONICAL_STATE.md
```

**✅ CORRECT:**
- List all files before editing
- Explain why each file is affected
- Verify no unintended files are affected

**❌ INCORRECT:**
- Start editing without listing files
- Discover additional files need changes mid-edit
- Make changes to files not listed

### Rule 3: Describe Expected Outcome Before Coding

**MANDATORY:** **ALWAYS** describe expected outcome before coding.

**Required format:**

```
## Expected Outcome:
- Input component will use INPUT_TOKENS exclusively
- No cross-domain token dependencies
- Visual appearance unchanged
- Type safety maintained
```

**✅ CORRECT:**
- Describe what will change
- Describe what will NOT change
- Describe verification steps
- Describe success criteria

**❌ INCORRECT:**
- Start coding without describing outcome
- Discover issues after coding
- Unclear success criteria

---

## Reporting Rules

### Rule 1: Every Task Must End with a Report

**MANDATORY:** **ALWAYS** provide a completion report at the end of each task.

**Required report format:**

```markdown
## Task Completion Report

### Changed Files
- `src/components/input/Input.tsx` - Updated to use INPUT_TOKENS
- `src/tokens/components/input.ts` - Removed Select tokens

### Unchanged Files (Verified)
- `src/components/select/Select.tsx` - Verified no changes needed
- `src/tokens/components/select.ts` - Verified no changes needed

### Verification Steps
1. ✅ TypeScript compilation passes
2. ✅ No cross-domain token imports
3. ✅ Visual appearance verified in Storybook
4. ✅ Component tests pass

### Intentional Non-Fixes
- Select component tokens were not changed (outside task scope)
- Textarea component tokens were not changed (outside task scope)
```

### Rule 2: Report Must List Changed and Unchanged Files

**MANDATORY:** Report **MUST** include:

- ✅ **Changed files** - Files that were modified
- ✅ **Unchanged files** - Files that were verified but not changed
- ✅ **Verification steps** - Steps taken to verify correctness
- ✅ **Intentional non-fixes** - Issues intentionally not fixed (with reasons)

### Rule 3: If Something Was Intentionally NOT Fixed, It Must Be Stated

**MANDATORY:** **ALWAYS** state if something was intentionally not fixed.

**✅ CORRECT:**
```
### Intentional Non-Fixes
- Select component still uses INPUT_TOKENS (outside task scope)
- Textarea component still uses INPUT_TOKENS (outside task scope)
- These will be addressed in separate tasks
```

**❌ INCORRECT:**
```
### Intentional Non-Fixes
(None - everything was fixed)
```
When there are known issues not fixed, they must be stated.

---

## Enforcement

### Rule 1: AI MUST Refuse Violating Requests

**MANDATORY:** If a requested change violates these rules, the AI **MUST refuse**.

**Response format:**

```
❌ **Request Refused: Violates Guard Rules**

Your request violates the following guard rules:
- [Rule name]: [Explanation]

**Why this violates the rules:**
[Detailed explanation]

**Compliant alternatives:**
1. [Alternative approach 1]
2. [Alternative approach 2]

**Required steps to proceed:**
1. [Step 1]
2. [Step 2]
```

### Rule 2: AI MUST Ask for Clarification on Ambiguity

**MANDATORY:** If ambiguity exists, the AI **MUST ask** for clarification.

**Response format:**

```
❓ **Clarification Required**

Your request is ambiguous regarding:
- [Ambiguity 1]: [Question]
- [Ambiguity 2]: [Question]

**Please clarify:**
1. [Question 1]
2. [Question 2]

**I cannot proceed without clarification to avoid violating guard rules.**
```

### Rule 3: Silence or Assumptions are NOT Allowed

**MANDATORY:** The AI **MUST NOT** proceed with assumptions or silence.

**✅ CORRECT:**
- Ask for clarification when uncertain
- Refuse requests that violate rules
- Explain decisions explicitly

**❌ INCORRECT:**
- Proceed with assumptions
- Remain silent about rule violations
- Make implicit decisions

---

## Verification Checklist

Before completing any task, verify:

### Architecture Compliance
- [ ] Component status verified (LOCKED/ALLOWED/RESTRICTED)
- [ ] Component is in canonical state document
- [ ] No Foundation component modifications
- [ ] No product components in Extension layer
- [ ] **Foundation Authority compliance verified** (all changes comply with Authority rules)
- [ ] **No Authority Contract modifications** (Foundation Authorities are CLOSED)
- [ ] **Canonical architecture compliance verified** (no forbidden regressions)
- [ ] **Canonical component imports verified** (using canonical paths only)
- [ ] **No overlay infrastructure in PATTERNS** (overlays in COMPOSITION only)

### Token System Compliance
- [ ] Component has independent token domain
- [ ] No cross-domain token imports
- [ ] Token domain doesn't contain other component tokens
- [ ] Shared tokens used only for true shared semantics
- [ ] Foundation tokens used for basic utilities

### Workflow Compliance
- [ ] Analyzed before modifying
- [ ] Listed affected files before editing
- [ ] Described expected outcome before coding
- [ ] Completed report provided

### Reporting Compliance
- [ ] Changed files listed
- [ ] Unchanged files listed
- [ ] Verification steps documented
- [ ] Intentional non-fixes stated (if any)

---

## Examples

### Example 1: Correct Refactoring

**User Request:** "Fix Input component to use INPUT_TOKENS exclusively"

**AI Response:**

```
✅ **Task Accepted**

## Analysis:
- Component: Input (Extension Layer, ALLOWED)
- Current issue: Uses some tokens from other domains
- Solution: Update to use INPUT_TOKENS exclusively

## Files to be modified:
- src/components/input/Input.tsx
- src/tokens/components/input.ts (if needed)

## Files to be read:
- docs/architecture/TOKEN_SYSTEM.md
- docs/architecture/EXTENSION_CANONICAL_STATE.md

## Expected Outcome:
- Input component uses INPUT_TOKENS exclusively
- No cross-domain dependencies
- Visual appearance unchanged
- Type safety maintained

[Proceeds with changes]

## Task Completion Report:
[Report provided]
```

### Example 2: Refused Request

**User Request:** "Modify Modal component to add new feature"

**AI Response:**

```
❌ **Request Refused: Violates Guard Rules**

Your request violates the following guard rules:
- Foundation Layer Rule: Modal is LOCKED and IMMUTABLE

**Why this violates the rules:**
Modal is a Foundation Layer component and cannot be modified. Foundation components are immutable to maintain system stability.

**Compliant alternatives:**
1. Create an Extension Layer component that composes Modal
2. Use Modal's existing API to achieve the desired behavior
3. Create a new Extension composition component

**Required steps to proceed:**
1. Clarify the desired feature
2. Determine if Modal's existing API supports it
3. If not, create Extension Layer composition
```

### Example 3: Clarification Request

**User Request:** "Fix Select component tokens"

**AI Response:**

```
❓ **Clarification Required**

Your request is ambiguous regarding:
- Scope: Which Select component? (Canonical or legacy?)
- Token changes: What specific token issues need fixing?
- Task scope: Is this limited to Select only, or should I also fix related components?

**Please clarify:**
1. Which Select component should be fixed? (src/components/select/Select.tsx or legacy?)
2. What specific token violations exist?
3. Should this task be limited to Select component only (no side refactors)?

**I cannot proceed without clarification to avoid violating guard rules.**
```

---

## Canonical Architecture Protection Rules

### Canonical Architecture: LOCKED

**Status:** ✅ **CANONICAL ARCHITECTURE LOCKED**  
**Lock Date:** 2025-12-17  
**Source of Truth:** [CANONICAL_LOCK.md](./CANONICAL_LOCK.md)

**The UI architecture is OFFICIALLY LOCKED as CANONICAL.** All architectural decisions documented in CANONICAL_LOCK.md are **FINAL** and **MUST NOT** change without explicit unlock procedure.

### Forbidden Regressions (MANDATORY)

**The following are EXPLICITLY FORBIDDEN and MUST NOT be reintroduced:**

#### ❌ Dropdown Components and Tokens

**MANDATORY:**
- ❌ **NEVER** create Dropdown components in any layer
- ❌ **NEVER** create Dropdown tokens in FOUNDATION
- ❌ **NEVER** export Dropdown from public API
- ❌ **NEVER** use Dropdown in new code

**Rationale:** Dropdown was removed (MIGRATION_12C). Use Select or ContextMenu instead.

**If requested:** **MUST REFUSE** and suggest using Select or ContextMenu.

#### ❌ Legacy Card in PRIMITIVES

**MANDATORY:**
- ❌ **NEVER** create Card component in PRIMITIVES layer
- ❌ **NEVER** reintroduce legacy PRIMITIVES/Card

**Rationale:** Legacy PRIMITIVES/Card was removed (MIGRATION_12A). Use COMPOSITION/layout/Card instead.

**If requested:** **MUST REFUSE** and suggest using COMPOSITION/layout/Card.

#### ❌ Overlay Infrastructure in PATTERNS

**MANDATORY:**
- ❌ **NEVER** add overlay primitives to PATTERNS layer
- ❌ **NEVER** create Popover, Modal, ContextMenu, or Toast in PATTERNS
- ❌ **NEVER** add overlay infrastructure to PATTERNS

**Rationale:** Overlays **MUST** live in COMPOSITION layer only. PATTERNS is for business/UI patterns, not overlay primitives.

**If requested:** **MUST REFUSE** and suggest using COMPOSITION/overlays components.

#### ❌ Legacy useToast Exports in New Code

**MANDATORY:**
- ❌ **NEVER** use `useToast` from `hooks/useToast.ts` in new code
- ❌ **NEVER** use `useToast` from `hooks/use-toast.ts` in new code

**Rationale:** Legacy exports are deprecated. New code **MUST** use canonical hooks (`useLocalToast`, `useGlobalToast`).

**If requested:** **MUST REFUSE** and suggest using canonical hooks.

#### ❌ Tokens Without Components

**MANDATORY:**
- ❌ **NEVER** create tokens in FOUNDATION without active components
- ❌ **NEVER** create orphaned tokens

**Rationale:** Tokens **MUST** correspond to active components. Orphaned tokens create maintenance burden.

**If requested:** **MUST REFUSE** and require component creation first.

### Allowed Actions (MANDATORY)

**The following actions are EXPLICITLY ALLOWED:**

#### ✅ Extend Within Layer

**ALLOWED:**
- ✅ Add new components within existing layers (PRIMITIVES, COMPOSITION, PATTERNS, DOMAIN)
- ✅ Extend existing components within their layer
- ✅ Add new patterns in PATTERNS layer

**Rule:** Extensions **MUST** respect layer boundaries and canonical rules.

#### ✅ Add New Component with Layer Justification

**ALLOWED:**
- ✅ Create new components with explicit layer justification
- ✅ Verify component belongs to correct layer before creation

**Rule:** New components **MUST** be placed in the correct layer based on their purpose and behavior.

#### ✅ Unlock Required for Architecture Changes

**REQUIRED:**
- ✅ Architecture changes require explicit unlock procedure
- ✅ Unlock must be documented and approved
- ✅ Changes must follow canonical rules

**Rule:** Architecture changes **MUST** go through unlock protocol defined in CANONICAL_LOCK.md.

### Canonical Component Import Rules

**MANDATORY:** Components **MUST** be imported from canonical locations only.

**Canonical Locations:**
- ✅ Popover: `COMPOSITION/overlays/Popover`
- ✅ Modal: `COMPOSITION/overlays/Modal`
- ✅ ContextMenu: `COMPOSITION/overlays/ContextMenu`
- ✅ Toast: `COMPOSITION/overlays/Toast`
- ✅ Card: `COMPOSITION/layout/Card`

**FORBIDDEN:**
- ❌ Importing from non-canonical paths
- ❌ Creating duplicate implementations
- ❌ Bypassing canonical components

### Canonical Architecture Verification

**BEFORE** any architectural change:

1. ✅ Check [CANONICAL_LOCK.md](./CANONICAL_LOCK.md) for canonical state
2. ✅ Verify change does not violate forbidden regressions
3. ✅ Verify change respects layer boundaries
4. ✅ Verify change uses canonical components
5. ✅ If unlock required, follow unlock protocol

**Rule:** If change violates canonical architecture, **MUST REFUSE** and explain why.

---

## Related Documentation

- [CANONICAL_LOCK.md](./CANONICAL_LOCK.md) - **Source of truth** for canonical architecture state
- [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) - **Source of truth** for Foundation lock status
- [UI_ARCHITECTURE_LOCK.md](./UI_ARCHITECTURE_LOCK.md) - **PRIMARY CANONICAL SOURCE** - Architecture lock with all canonical rules and implementations (supersedes CANONICAL_STATE_FINAL.md)
- [Extension Authority Contract](./EXTENSION_AUTHORITY_CONTRACT.md) - Extension layer boundary contract
- [TUI Token System](./TOKEN_SYSTEM.md) - Token system rules and structure (LOCKED)
- [TUI Extension Canonical State](./EXTENSION_CANONICAL_STATE.md) - Component usage rules
- [TUI Token System Audit Report](../../docs_archive/reports/archive/archive/reports/other/TOKEN_SYSTEM_AUDIT.md) - Audit findings and violations (Note: File may be in docs_archive)

---

## Document Status

**Status:** CANONICAL - MANDATORY ENFORCEMENT  
**Version:** 1.2  
**Last Updated:** 2025-12-17

This document is **MANDATORY**. Any work violating these rules is **INVALID**. These rules must be enforced by all AI/Cursor interactions with the TUI library.

---

## Version History

- **v1.2** (2025-12-17): Canonical Architecture Protection Rules
  - Added "Canonical Architecture Protection Rules" section
  - Added forbidden regressions list (Dropdown, legacy Card, PATTERNS overlays, legacy useToast, orphaned tokens)
  - Added allowed actions (extend within layer, add with justification, unlock protocol)
  - Added canonical component import rules
  - Added canonical architecture verification checklist
  - Added reference to CANONICAL_LOCK.md as source of truth
  - Clarified that canonical architecture is LOCKED

- **v1.1** (2025-12-16): Foundation Authority Protection Rules
  - Added "Foundation Authority Protection Rules" section
  - Added Authority protection rules (never modify, always comply, always reference)
  - Added Authority unlock procedure documentation
  - Updated "Analyze Before Modifying" rule to include Authority compliance check
  - Updated Architecture Compliance checklist to include Authority verification
  - Added references to FINAL_FOUNDATION_LOCK.md as source of truth
  - Clarified that Foundation Authorities are CLOSED and IMMUTABLE

- **v1.0** (2025-12-13): Initial guard rules document

---

**End of Guard Rules Document**
