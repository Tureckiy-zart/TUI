# 18A — Component Review & Improvement Pipeline (Refined)

**Status:** ACTIVE (Refinement of existing process, not a replacement)
**Scope:** Foundation / Extension components
**Purpose:** Consistent, repeatable improvement of component quality, architecture, and usability.

> This document is intentionally verbose. It is written as a **process control document**, not a checklist.
> The goal is not speed, but **predictable, high‑quality outcomes**.

---

## 0. Intent & Non‑Goals

### Intent

This pipeline defines **how a component must be reviewed, understood, improved, and validated**.

The outcome of every run:

* the component is **better structured** than before,
* the code is **cleaner and more readable**,
* architectural violations are removed or explicitly documented,
* future maintenance becomes easier, not harder.

### Non‑Goals

This pipeline is **not**:

* a rewrite‑everything exercise,
* a theoretical architecture essay,
* a “find problems and stop” audit.

If the pipeline ends without **actual code improvement**, it is considered a failure.

---

## 1. General Execution Rules

1. The pipeline is executed **top-to-bottom**, without reordering.

2. Each step has a clear purpose and stopping condition.

3. Code **may be refactored during the pipeline**, but:

   * behavior must not change unless explicitly allowed,
   * public API changes must be deliberate and documented.

4. Discovery, analysis, and refactoring are **part of the same process**, not separate activities.

5. **Mandatory reporting rule (CRITICAL):** every step **MUST end** by updating the component audit report file (the baseline report created in STEP 0).

   * If a step results in no changes, the report must explicitly state: `No changes required in this step`.
   * If changes were made, the report must include: what changed, why, and whether it is blocking or non-blocking.

6. **Assistant review checkpoints (CRITICAL process control):** the assistant must remind the operator when it is recommended or mandatory to share the current audit report before proceeding.

   * **Mandatory to share the audit report (must not proceed without it):**

     * STEP 0 (Baseline snapshot)
     * STEP 8 (Intentional refactor decision)
     * STEP 9 (Tests & Storybook validation)
     * STEP 10 (Accessibility audit & fixes)
     * STEP 11 (Final review & architectural lock)

   * **Recommended to share the audit report (strongly advised when changes are non-trivial):**

     * STEP 6 (Public API & DX)
     * STEP 7 (Type system alignment)

   * **Optional to share the audit report:**

     * STEP 1–5 (Structural / patterns / interaction / tokens)

   The assistant must explicitly remind the operator at each checkpoint before issuing the next step task.

7. **No skipped documentation (CRITICAL):** a step is not considered executed unless the audit report contains a clearly labeled section for that step.

   * If no work is required, the section must still exist and must contain: `No changes required in this step`.
   * The operator must not proceed to the next step if the current step section is missing.

8. **Step gating rule (CRITICAL):** the assistant must not issue a TUNG for STEP N+1 unless STEP N is present in the report (even if it contains `No changes required`).

9. **Blocker classification rule (CRITICAL):** every step section must include a clear outcome tag:

   * `Blocking: yes/no`
   * If `yes`, include a single-sentence reason.
   * If `no`, optionally mark items as `Deferred` with rationale.

10. **Language consistency (CRITICAL):** the pipeline and all audit reports must use a single language per document. For this pipeline, English-only.

* Emojis are **allowed and encouraged** as visual markers for readability, but must not replace words or structure.

11. **Vocabulary guardrails (CRITICAL):** the following words/claims are prohibited in STEP 0–10 and may only appear in STEP 11:

* `final`, `optimal`, `exemplary`, `canonical`, `locked`, `foundation-ready`.

Allowed phrasing in STEP 0–10:

* `No issues detected in this step`
* `Compliant at this stage`
* `No changes required in this step`
* `Behavior unchanged`

12. **Work pattern inside each step (REQUIRED):** every step must follow the same internal order:

1) **Observe** (what exists)
2) **Decide** (what to do)
3) **Change** (apply scoped refactor if allowed)
4) **Record** (update audit report with blocker/non-blocker)

Skipping any sub-part is a process violation.

---

## 2. Audit Report Contract (REQUIRED)

This pipeline is enforced through a single continuously-updated audit report created in STEP 0.

### File

* The audit report file path must be stable per component, e.g.:

  * `docs/reports/audit/BUTTON_BASELINE_REPORT.md`

### Required section structure

* The report must contain these top-level sections (even if empty):

  * `STEP 0` … `STEP 11`

### Required fields per step

Each `STEP N` section must include:

* `Outcome:` one of `No changes required | Changes applied | Changes required (not yet applied)`
* `Blocking:` `yes/no`
* `Notes:` 1–5 bullet points max
* `Changes:` list of actual changes (or `None`)
* `Deferred:` list of deferred items (or `None`)

### Emoji markers (READABILITY, OPTIONAL)

Emojis may be used to improve scanning and readability.

**Recommended mapping (do not invent new meanings):**

* ✅ for compliant / no issues / completed
* ⚠️ for non-blocking issues / warnings
* 🚫 for blockers
* 🛠️ for changes applied
* 🧾 for documentation/report updates

Rules:

* Emojis are optional; never rely on emojis alone.
* Keep emoji usage minimal (1 per bullet/line max).
* Emojis must not change the meaning of the text.

### Consistency rule (CRITICAL)

* If a change is mentioned in `Notes`, it must exist in `Changes` (or be marked `Deferred`).
* If a step made code changes, it must include `Behavior unchanged` confirmation (unless the step explicitly allows behavior change).

---

## 3. STEP 0 — Baseline Snapshot & Context Fixation

### Goal

Establish a **factual baseline** of what exists *right now*.

This step answers the question:

> “What exactly are we dealing with before we start improving anything?”

### Required Actions

* Locate all files related to the component (implementation, tests, stories).
* Identify:

  * component name(s) in use,
  * export points,
  * directory placement,
  * layer (Foundation / Extension / Legacy‑like behavior).
* Create a **baseline snapshot file** that records:

  * file paths,
  * exports,
  * dependencies (e.g. Radix, custom logic),
  * current public props.

### Important Notes

* This step **does not judge quality**.
* This step **does not change code**.
* This step prevents accidental refactoring of the wrong thing.

### Example

If both `Tooltip.tsx` and `Popover.tsx` exist, this step must record that fact *before* any conclusions are made.

---

## 3. STEP 1 — Structural & Code Quality Review

### Goal

Identify and remove **obvious structural problems** in the code.

### What to Look For

* Repeated JSX blocks that should be mapped.
* Conditional rendering that is hard to follow.
* Copy‑paste fragments with minor differences.
* Deeply nested logic without clear intent.

### What Is Allowed Here

* Refactoring for readability.
* Extracting helpers or subcomponents.
* Replacing repetition with iteration (`map`).

### What Is Not Allowed Here

* Changing behavior.
* Redesigning API.

### Example

Multiple similar tooltip content blocks → single mapped structure.

---

## 4. STEP 2 — Semantic Role & Responsibility Validation

### Goal

Ensure the component has a **clear, narrow responsibility**.

### Questions to Answer

* Is this component informational, interactive, or structural?
* Does it try to behave as more than one thing?

### Actions

* Write a short role definition (1–2 sentences).
* Identify logic that does not belong to this role.

### Refactoring Guidance

* Move misplaced logic out.
* Reduce scope rather than adding configuration flags.

---

## 5. STEP 3 — Duplication & Internal Pattern Alignment

### Goal

Normalize internal patterns so the component behaves like a **first‑class citizen** of the system.

### Checks

* Consistent prop order.
* Consistent JSX structure.
* Consistent handling of children / trigger / content.

### Refactoring Guidance

* Align structure with similar components.
* Prefer one clear pattern over multiple “almost the same” ones.

---

## 6. STEP 4 — State & Interaction Model Review

### Goal

Confirm that interaction logic is **simple, predictable, and platform‑native**.

### Checks

* What states exist and why.
* Which states are derived vs explicit.
* Whether JS is used where CSS or native behavior would suffice.

### Refactoring Guidance

* Remove unnecessary JS state.
* Simplify interaction paths.

---

## 7. STEP 5 — Token, Size & Variant Consistency

### Goal

Ensure the component speaks the **same visual language** as the rest of the system.

### Checks

* Token‑only styling (no raw values).
* Size usage aligned with the shared size scale.
* Variants that represent real use cases, not implementation quirks.

### Refactoring Guidance

* Collapse near‑duplicate variants.
* Remove custom size naming.

### Scope Boundary (CRITICAL)

STEP 5 is a **compliance validation step**, not a final optimization step.

* Allowed: `compliant`, `aligned`, `no issues detected at this stage`.
* Prohibited: declaring `optimal`, `final`, or “no further refactoring will ever be required”.

---

## 8. STEP 6 — Public API & DX Review

### Goal

Make the component **easy to understand and hard to misuse**.

### Checks

* Are all public props necessary?
* Can the component be used correctly without reading its implementation?

### Refactoring Guidance

* Remove or rename unclear props.
* Prefer composition over configuration.

### Scope Boundary (CRITICAL)

STEP 6 evaluates the **current API quality**, but must not declare the API final.

---

## 9. STEP 7 — Type System Alignment

### Goal

Use the type system as **a safety net and documentation tool**.

### Checks

* Explicit unions instead of wide types.
* No leaking of internal variant machinery.
* Types readable without implementation context.

### Refactoring Guidance

* Rewrite types for clarity.
* Treat types as part of the public contract.

### Scope Boundary (CRITICAL)

STEP 7 must not declare the type system `optimal` or `final`.

---

## 10. STEP 8 — Intentional Refactor Pass

### Goal

Perform a **final, focused quality sweep**.

### Guiding Question

> “If this code were reviewed today by a senior engineer, would it pass without comments?”

### Actions

* Re‑read all code.
* Simplify naming and structure.
* Remove remaining incidental complexity.

### Mandatory Outcome (CRITICAL)

This step **must end** with an explicit decision recorded in the audit report:

* `Refactor required` (with minimal scoped description)
* or `Refactor not required` (with justification)

Additionally, STEP 8 must record a list of **consciously NOT made changes**.

---

## 11. STEP 9 — Validation via Tests & Storybook

### Goal

Prove that the improved component behaves as expected.

### Requirements

* Tests cover public behavior and edge cases.
* Storybook demonstrates:

  * all variants,
  * all sizes,
  * meaningful interaction examples.

Minimal or placeholder coverage is not sufficient.

---

## 12. STEP 10 — Accessibility Audit & Fixes (MANDATORY)

### Goal

Make the component **accessible** and safe for keyboard and assistive technologies.

### Rationale (CRITICAL)

Accessibility work is typically the most code‑invasive phase:

* it touches real code paths,
* it changes semantics (ARIA/roles), focus behavior, and keyboard flows,
* it often introduces the largest set of changes.

Therefore, accessibility **cannot** be treated as an optional follow‑up.

### Scope

* ARIA roles and attributes.
* Keyboard navigation and focus management.
* Screen reader announcement behavior.
* Accessibility‑specific tests and Storybook stories.

### Important Notes

* This step may change code **only for accessibility correctness**.
* Public API changes are still prohibited unless explicitly agreed and documented.

---

## 13. STEP 11 — Final Review & Outcome Fixation + Architectural Lock

### Goal

Formally conclude the pipeline and **lock the component status across all architectural authority documents**.

### Actions

* Verify that all previous steps are complete.
* Confirm code quality improvements.
* Record final state and decisions.

### Mandatory Lock Propagation (CRITICAL)

This step is considered **INCOMPLETE** unless the locked status is propagated consistently to:

* `docs/FOUNDATION_LOCK.md`
* `docs/ARCHITECTURE_LOCK.md`
* `docs/PROJECT_PROGRESS.md`
* `docs/ARCHITECTURAL_INDEX.md` (or equivalent)
* the component audit report file

### Outcome

* Component accepted as canonical (and locked),
* or explicitly marked for further iteration.

---

## Closing Note

This pipeline exists to **prevent accidental complexity** and **raise the baseline quality** of the system over time.

Skipping steps or rushing execution will only reintroduce the problems this document is designed to eliminate.
