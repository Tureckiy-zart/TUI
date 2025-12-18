# Foundation Component Report — Template v1.0

**Status:** MANDATORY  
**Version:** 1.0  
**Date Created:** 2025-12-17  
**Classification:** Process Standard (Evolvable)  
**Authority Level:** Process Enforcement  
**Scope:** All Foundation Components  
**Audience:** Maintainers, Contributors, Cursor AI

---

## Purpose

This document defines the **mandatory canonical format** for Foundation Component Reports. All Foundation components **MUST** have a report following this format before Foundation Lock (Step 13) can be applied.

**This format is PROCESS, not LAW.** The format can evolve to improve ergonomics, but it cannot weaken or bypass architectural LAW.

---

## Mandatory Status

**Foundation Component Reports are MANDATORY:**

- ✅ **Required for Foundation Lock:** No component can reach Step 13 (Foundation Lock) without a compliant report
- ✅ **Single Source of Truth:** Reports are the authoritative artifact for lifecycle state
- ✅ **Process Violation:** Deviation from this format is considered a PROCESS VIOLATION
- ✅ **Enforcement:** AI agents and humans must treat reports as authoritative artifacts
- ✅ **Lifecycle Decisions:** Lifecycle progression decisions are ONLY valid when derived from a compliant report

---

## Report Structure

All Foundation Component Reports **MUST** follow this exact structure:

### 1. Metadata Section

**Required Fields:**
- Component name
- Layer (FOUNDATION)
- Category
- Status (В ПРОЦЕССЕ / COMPLETE / BLOCKED)
- Start date

**Format:**
```markdown
## Метаданные
- Компонент: [ComponentName]
- Слой: FOUNDATION
- Категория: [Category]
- Статус: [Status]
- Начато: [Date]
```

### 2. Lifecycle Steps (Steps 1-13)

**Required Structure for Each Step:**

Each STEP section **MUST** appear exactly once and in canonical order:

1. **Step 1: Semantic Declaration**
2. **Step 2: Alternative Cleanup**
3. **Step 3: State Model and Priority Verification**
4. **Step 4: JS-Free Interaction Model**
5. **Step 5: Token-Driven Model**
6. **Step 6: Public API Audit**
7. **Step 7: TypeScript System Compliance**
8. **Step 8: CVA Canonicalization**
9. **Step 9: Accessibility Hardening**
10. **Step 10: Authority Alignment**
11. **Step 11: Storybook Quality Gate**
12. **Step 12: Testing Quality Gate**
13. **Step 13: Foundation Lock**

**Lifecycle Structure:**
- **Steps 1-10:** Architectural validation and compliance verification
- **Steps 11-12:** Quality gates (Storybook and Testing) — must pass before Foundation Lock
- **Step 13:** Foundation Lock — formal locking after all validations and quality gates pass

**Each Step Section MUST Include:**

- **Status:** ✅ COMPLETE / ❌ BLOCKED / ⏳ PENDING / ⚠️ REQUIRES ADJUSTMENT
- **Purpose/Area:** Clear description of what is being verified
- **Requirements/Checklist:** Explicit checklist items
- **Findings:** Detailed results of verification
- **Result:** Explicit completion status and exit criteria verification

**Format:**
```markdown
## ШАГ [N] — [Step Name]

**Note:** Steps 11-12 are Quality Gates and must be completed before Step 13 (Foundation Lock).
**Статус:** [Status]

### Область проверки / Purpose
[Description]

### Требования / Requirements
[Checklist or requirements]

### Результаты / Findings
[Detailed findings]

### Результат / Result
[Explicit status and exit criteria]
```

### 3. Violation Summary & Resolution

**Required Section:** `## VIOLATION SUMMARY & RESOLUTION`

**MUST Include:**
- All violations consolidated in one place
- Each violation classified as:
  - ❌ **BLOCKING** — Prevents lifecycle progression
  - ⚠️ **NON-BLOCKING** — Does not prevent progression but requires attention
- Each violation status:
  - ✅ **FIXED** — Violation resolved
  - ⚠️ **STILL PRESENT — REQUIRES FIX** — Violation exists and must be fixed
  - ⚠️ **ACCEPTED EXCEPTION** — Violation exists but is architecturally justified
- Each violation MUST reference the STEP it belongs to
- Each violation MUST specify REQUIRED ACTION if not fixed
- Summary table of all violations

**Format:**
```markdown
## VIOLATION SUMMARY & RESOLUTION

**Date:** [Date]
**Purpose:** Consolidated view of all violations identified during [Component] Foundation lifecycle audit

### Violations by Step

#### Step [N] — [Step Name]

**Violation [N]: [Violation Name]**

- **Classification:** ❌ BLOCKING / ⚠️ NON-BLOCKING
- **Status:** ✅ FIXED / ⚠️ STILL PRESENT — REQUIRES FIX / ⚠️ ACCEPTED EXCEPTION
- **Step:** Step [N] ([Step Name])
- **Location:** [File paths and line numbers]
- **Description:** [Detailed description]
- **Required Action:** [Specific actions if not fixed]
- **Blocks:** [What it blocks]
- **Justification:** [Why it's blocking or accepted]

### Summary Table

| Violation | Step | Classification | Status | Blocks |
|-----------|------|----------------|--------|--------|
| [Name] | [N] | [Type] | [Status] | [What] |

### Resolution Status

**Blocking Violations:** [Count]
**Non-Blocking Violations:** [Count]
**Fixed Violations:** [Count]
```

### 4. Lifecycle Progression Status

**Required Section:** `## LIFECYCLE PROGRESSION STATUS`

**MUST Include:**
- Current blocking step (if any)
- Why it is blocking
- What exact action unblocks it
- Step completion status table
- Progression rules
- Next actions
- Explicit conclusion with lifecycle status

**Format:**
```markdown
## LIFECYCLE PROGRESSION STATUS

**Date:** [Date]
**Component:** [ComponentName]
**Current Status:** ⏸️ BLOCKED AT STEP [N] / ✅ CAN PROCEED

### Current Blocking Step

**Step [N] — [Step Name]** ❌ **BLOCKED** / ✅ **COMPLETE**

**Why it is blocking:**
- [Reason 1]
- [Reason 2]

**What exact action unblocks it:**
1. [Action 1]
2. [Action 2]

### Step Completion Status

| Step | Name | Status | Can Proceed? |
|------|------|--------|--------------|
| 1 | [Name] | [Status] | [Yes/No] |
| ... | ... | ... | ... |

### Progression Rules

**Critical Rule:** [Rule]

**Exception:** [Exception if any]

### Next Actions

1. **IMMEDIATE:** [Action]
2. **VERIFY:** [Action]
3. **PROCEED:** [Action]

### Conclusion

**Lifecycle Status:** ⏸️ **BLOCKED** / ✅ **CAN PROCEED**

[Component] component lifecycle is **[blocked at Step N]** / **[can proceed]** due to [reason].

**Blocking Violation:** [Violation name if blocked]

**Unblocking Action:** [Action if blocked]
```

### 5. Step Numbering Note

**Required Section:** `## Примечание о нумерации шагов`

**MUST Include:**
- Statement that step numbering is non-semantic
- Reference to canonical lifecycle source
- Note about lifecycle expansion (if applicable)

**Format:**
```markdown
## Примечание о нумерации шагов

Нумерация шагов является не-семантической. Порядок шагов имеет значение, но конкретные номера (1, 2, 3 и т.д.) не являются частью архитектурного контракта.

**Структура жизненного цикла:**
- Шаги 1-10: Архитектурная валидация и проверка соответствия
- Шаги 11-12: Контрольные точки качества (Storybook и Тестирование) — должны быть пройдены перед Foundation Lock
- Шаг 13: Foundation Lock — формальная блокировка после прохождения всех проверок и контрольных точек качества

**Ссылка на канонический жизненный цикл:** [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10
```

---

## Enforcement Rules

### Rule 1: Structural Compliance

**All STEP sections (1-13) MUST appear exactly once and in canonical order.**

- ❌ **FORBIDDEN:** Duplicate STEP sections
- ❌ **FORBIDDEN:** Missing STEP sections
- ❌ **FORBIDDEN:** Out-of-order STEP sections
- ❌ **FORBIDDEN:** Merged or combined STEP sections (except where canonical process combines them)

**Violation:** PROCESS VIOLATION — Report is non-compliant

### Rule 2: Violation Consolidation

**All violations MUST be consolidated into a single VIOLATION SUMMARY & RESOLUTION section.**

- ❌ **FORBIDDEN:** Violations scattered across multiple sections
- ❌ **FORBIDDEN:** Violations mentioned only in STEP sections without consolidation
- ❌ **FORBIDDEN:** Unclassified violations

**Violation:** PROCESS VIOLATION — Report is non-compliant

### Rule 3: Blocking Violation Enforcement

**Blocking violations automatically halt lifecycle progression regardless of narrative text.**

- ✅ **REQUIRED:** Blocking violations MUST be explicitly marked as ❌ BLOCKING
- ✅ **REQUIRED:** Blocking violations MUST prevent progression to Step 13
- ❌ **FORBIDDEN:** Narrative text that contradicts blocking violation status
- ❌ **FORBIDDEN:** Progression past blocked steps while violations exist

**Violation:** PROCESS VIOLATION — Lifecycle progression invalid

### Rule 4: Lifecycle Status Clarity

**Lifecycle progression status MUST be unambiguous.**

- ✅ **REQUIRED:** Explicit statement of current blocking step (if any)
- ✅ **REQUIRED:** Clear unblocking actions
- ✅ **REQUIRED:** Step completion status table
- ❌ **FORBIDDEN:** Ambiguous or contradictory status statements

**Violation:** PROCESS VIOLATION — Report is non-compliant

### Rule 5: Report as Authority

**Reports are the single source of truth for lifecycle state.**

- ✅ **REQUIRED:** AI agents MUST treat reports as authoritative artifacts
- ✅ **REQUIRED:** Humans MUST treat reports as authoritative artifacts
- ✅ **REQUIRED:** Lifecycle decisions MUST be derived from reports
- ❌ **FORBIDDEN:** Ignoring report status in favor of code inspection
- ❌ **FORBIDDEN:** Proceeding to Step 13 without compliant report

**Violation:** PROCESS VIOLATION — Lifecycle decision invalid

---

## Canonical Example

**Reference Implementation:** [LINK_FOUNDATION_LOCK_REPORT.md](../reports/LINK_FOUNDATION_LOCK_REPORT.md)

The Link component report is the **first canonical example** of a compliant Foundation Component Report following this format.

**Key Features of Link Report:**
- ✅ All lifecycle steps in canonical order (Note: Link report was created before quality gates were added; new reports must include Steps 11-13)
- ✅ Each step appears exactly once
- ✅ Violations consolidated in VIOLATION SUMMARY & RESOLUTION
- ✅ Lifecycle status explicitly stated in LIFECYCLE PROGRESSION STATUS
- ✅ Blocking violations clearly marked and enforced
- ✅ No contradictory status statements

---

## Report Validation Checklist

Before a component can proceed to Step 13 (Foundation Lock), the report MUST pass this validation:

- [ ] **Metadata Section:** Present and complete
- [ ] **All Steps Present:** Steps 1-13 all present exactly once
- [ ] **Canonical Order:** Steps in correct order (1-13)
- [ ] **No Duplicates:** No duplicate STEP sections
- [ ] **Violation Section:** VIOLATION SUMMARY & RESOLUTION section present
- [ ] **All Violations Listed:** All violations from all steps consolidated
- [ ] **Violations Classified:** Each violation classified as BLOCKING or NON-BLOCKING
- [ ] **Violations Statused:** Each violation statused as FIXED, STILL PRESENT, or ACCEPTED EXCEPTION
- [ ] **Lifecycle Status Section:** LIFECYCLE PROGRESSION STATUS section present
- [ ] **Blocking Step Identified:** Current blocking step (if any) explicitly identified
- [ ] **Unblocking Actions:** Clear actions to unblock (if blocked)
- [ ] **Step Completion Table:** Table showing status of all steps
- [ ] **No Contradictions:** No contradictory status statements
- [ ] **Step Numbering Note:** Note about non-semantic numbering present

**If any checklist item fails, the report is NON-COMPLIANT and the component cannot proceed to Step 13.**

---

## Process Violation Consequences

**If a report violates this format:**

1. **Report is NON-COMPLIANT**
2. **Component cannot proceed to Step 13 (Foundation Lock)**
3. **Report must be fixed before lifecycle can continue**
4. **AI agents must refuse to proceed until report is compliant**

**If lifecycle progression occurs without compliant report:**

1. **Progression is INVALID**
2. **Foundation Lock is INVALID**
3. **Component status must be corrected**
4. **Report must be created/updated to reflect actual state**

---

## Evolution and Versioning

**This format is PROCESS, not LAW:**

- Format can evolve to improve ergonomics
- Format cannot weaken or bypass architectural LAW
- Format changes require versioning (v1.0, v2.0, etc.)
- Existing reports remain valid under their version
- New reports use current version

**Version History:**
- **v1.0** (2025-12-17): Initial canonical format established
  - Based on Link component report normalization
  - Defines mandatory structure and enforcement rules
  - Establishes report as authoritative artifact
- **v1.1** (2025-12-17): Expanded to include quality gates
  - Added Step 11: Storybook Quality Gate
  - Added Step 12: Testing Quality Gate
  - Renumbered Foundation Lock to Step 13
  - Updated lifecycle structure documentation

---

## Related Documents

**Canonical Lifecycle:**
- [FOUNDATION_LOCK_OPERATING_RULES.md](./FOUNDATION_LOCK_OPERATING_RULES.md) — Section 10 (authoritative lifecycle definition)

**Canonical Example:**
- [LINK_FOUNDATION_LOCK_REPORT.md](../reports/LINK_FOUNDATION_LOCK_REPORT.md) — First compliant report following this format

**Authority Documents:**
- [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) — Foundation lock status
- [INTERNAL_CANONICAL_CONTEXT.md](../INTERNAL_CANONICAL_CONTEXT.md) — Canonical architecture context

---

## Document Status

**Status:** ✅ MANDATORY  
**Version:** 1.0  
**Date Created:** 2025-12-17  
**Classification:** Process Standard (Evolvable)

**This format is MANDATORY for all Foundation components. No component can reach Foundation Lock without a compliant report following this format.**

---

## Backward Compatibility Note

**Lifecycle Expansion (2025-12-17):**

The Foundation lifecycle was expanded to include explicit quality gates:
- **Previous lifecycle:** 11 steps (Foundation Lock was Step 11)
- **Current lifecycle:** 13 steps (Storybook Step 11, Testing Step 12, Foundation Lock Step 13)

**For Existing Reports:**
- Reports created before 2025-12-17 may reference the old 11-step structure
- Existing reports remain valid but should be updated to reflect the new structure when lifecycle progresses
- Components in progress should update their reports to include Steps 11-13

**For New Reports:**
- All new reports MUST follow the 13-step structure
- Steps 11-12 (quality gates) are BLOCKING and must be completed before Step 13 (Foundation Lock)

