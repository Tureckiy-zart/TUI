🔧 Macro Execution Model (ADDED)

This pipeline operates under a three-phase execution model.

This model does not replace the step-by-step structure below.
It defines how the steps are interpreted and sequenced in practice.

PHASE A — ANALYZE (STEP 0–8)

Purpose: understand and evaluate the current state.

During this phase:

the component is inspected, classified, and reasoned about,

architectural and quality issues are identified,

refactoring opportunities are discovered.

Refactoring may occur in this phase only when explicitly allowed by the current STEP
and must remain strictly scoped.

The outcome of PHASE A is clarity, not finality.

PHASE B — FIX (MANDATORY)

Purpose: apply intentional code improvements based on findings from PHASE A.

PHASE B is a required consolidation phase.
It exists because code produced at scale cannot be trusted by default
and must be deliberately improved to meet best practices.

During this phase:

identified issues are addressed,

code readability, structure, and maintainability are improved,

duplication is reduced where it introduces maintenance risk,

confusing or incidental complexity is removed.

PHASE B is executed explicitly as **STEP 9** in the step-by-step pipeline below.

Skipping PHASE B is only allowed if the audit report explicitly records:

No refactor required after STEP 8

### Refactor Classification (REFERENCE)

**Quality Refactor**

Changes that improve readability, naming, internal structure,

or reduce duplication **without altering component responsibilities

or public API**.

**Structural Refactor**

Changes that alter component boundaries, responsibility distribution,

file structure, or public surface.

Quality refactors are expected during the FIX phase.

Structural refactors are allowed **only** when explicitly declared,

justified in the audit report, and re-validated against architectural constraints.

PHASE C — PROVE & LOCK (STEP 10–12)

Purpose: prove correctness, stability, and readiness for lock.

During this phase:

behavior is validated via tests,

usage and intent are demonstrated via Storybook,

accessibility is audited and corrected,

final architectural decisions are recorded and locked.

PHASE C assumes that the code has already been intentionally improved.

Tests and Storybook are built on top of refactored code, not used as a substitute for refactoring.

# **18A — Component Review & Improvement Pipeline (Refined)**

**Canonical:** YES (single source of truth for the pipeline)

> Note: **This pipeline document is not an audit report.** Audit reports are per-component files created in STEP 0 (e.g. `docs/reports/audit/BUTTON_BASELINE_REPORT.md`).
> 
> **Important:** This header applies only to the pipeline document; audit reports must not use 'canonical/locked/final' terminology until STEP 12.

**Status:** ACTIVE (Refinement of existing process, not a replacement)

**Scope:** Foundation / Extension components

**Purpose:** Consistent, repeatable improvement of component quality, architecture, and usability.

> This document is intentionally verbose. It is written as a **process control document**, not a checklist.
>
> The goal is not speed, but **predictable, high‑quality outcomes**.

---

## 🔗 TUNG System
This pipeline is based on the **TUNG (Task Unified Next-Gen)** system.
The full system specification and task templates can be found here:
- 📄 [TUNG System Specification](../tung_system_specification.md)
- 📄 [TUNG Step Template](templates/FOUNDATION_STEP_TUNG_TEMPLATE.json)

## 🤖 AI Model Recommendations
Each pipeline step has a recommended AI model for optimal execution.
See the complete model usage guide:
- 📄 [AI Models Usage Guide](ai_models_usage_guide_for_pipeline_tung.md)

---

## 🚀 Quick Start Guide

**Before starting the pipeline:**
1. Identify component name (use exported name, e.g., `Button`, not `button`)
2. Determine layer: Foundation or Extension
3. Prepare audit report path: `docs/reports/audit/<COMPONENT>_BASELINE_REPORT.md`
4. Open recommended AI model (see AI Models Usage Guide)

**Pipeline execution order:**
- **STEP 0** → Create baseline (Sonnet 4.5)
- **STEP 1–8** → Analyze and document (Sonnet/Opus) [findings → FIX backlog]
- **STEP 9** → Apply ALL fixes (Codex Max)
- **STEP 10–12** → Validate and lock (Codex Max / GPT-5.2)

**Mandatory checkpoints (must share audit report):**
- ✅ STEP 0 (Baseline)
- ✅ STEP 8 (Refactor Decision)
- ✅ STEP 9 (FIX Consolidation)
- ✅ STEP 10 (Tests & Storybook)
- ✅ STEP 11 (Accessibility)
- ✅ STEP 12 (Final Lock)

**Estimated time:** 6-8 hours for typical component

---

## 🎯 **0. Intent & Non‑Goals**

### **Intent**

This pipeline defines **how a component must be reviewed, understood, improved, and validated**.

The outcome of every run:

* the component is **better structured** than before,

* the code is **cleaner and more readable**,

* architectural violations are removed or explicitly documented,

* future maintenance becomes easier, not harder.

### **Non‑Goals**

This pipeline is **not**:

* a rewrite‑everything exercise,

* a theoretical architecture essay,

* a "find problems and stop" audit.

If the pipeline ends without **actual code improvement**, it is considered a failure.

---

## 📋 **1. General Execution Rules**

The following contract applies to all steps defined below.

## 📐 Step Execution Contract (REFERENCE)

To prevent ambiguity and execution drift, **every STEP execution** must explicitly answer the following questions,

either in the audit report or in the step task description.

### Mandatory Declarations

For each STEP, the following must be clear:

- **REPORT**

- Is a detailed report required, or is a status statement sufficient?

- **CODE CHANGES**

- Are code changes allowed in this step?

- If yes, what scope of changes is permitted?

- If no, changes must be deferred to PHASE B (FIX).

- **EXPECTED OUTPUT**

- What constitutes successful completion of this step?

- (e.g. classification only, applied refactor, validation artifacts)

- **BLOCKING CONDITION**

- Does a failure in this step block further progress?

- If yes, under what condition?

### Enforcement Rule

If any of the above is unclear or missing,

the step is considered **not executed**, even if code was reviewed.

This contract exists to ensure that:

- analysis, refactoring, and validation are not mixed implicitly,

- assistants and tooling follow the same execution logic,

- future iterations of the pipeline remain predictable and repeatable.

1. ✅ The pipeline is executed **top-to-bottom**, without reordering.

2. ✅ Each step has a clear purpose and stopping condition.

3. ✅ Code **may be refactored during the pipeline**, but:

* behavior must not change unless explicitly allowed,

* public API changes must be deliberate and documented.

4. ✅ Discovery, analysis, and refactoring are **part of the same process**, not separate activities.

5. ⚠️ **Mandatory reporting rule (CRITICAL):** every step **MUST end** by updating the component audit report file (the baseline report created in STEP 0).

* If a step results in no changes, the report must explicitly state: `No changes required in this step`.

* If changes were made, the report must include: what changed, why, and whether it is blocking or non-blocking.

6. ⚠️ **Assistant review checkpoints (CRITICAL process control):** the assistant must remind the operator when it is recommended or mandatory to share the current audit report before proceeding.

* **Mandatory to share the audit report (must not proceed without it):**

* STEP 0 (Baseline snapshot)

* STEP 8 (Intentional refactor decision)

* STEP 9 (Mandatory FIX & Consolidation)

* STEP 10 (Tests & Storybook validation)

* STEP 11 (Accessibility audit & fixes)

* STEP 12 (Final review & architectural lock)

* **Recommended to share the audit report (strongly advised when changes are non-trivial):**

* STEP 6 (Public API & DX)

* STEP 7 (Type system alignment)

* **Optional to share the audit report:**

* STEP 1–5 (Structural / patterns / interaction / tokens)

* The assistant must explicitly remind the operator at each checkpoint before issuing the next step task.

7. ⚠️ **No skipped documentation (CRITICAL):** a step is not considered executed unless the audit report contains a clearly labeled section for that step.

* If no work is required, the section must still exist and must contain: `No changes required in this step`.

* The operator must not proceed to the next step if the current step section is missing.

8. ⚠️ **Step gating rule (CRITICAL):** the assistant must not issue a TUNG for STEP N+1 unless STEP N is present in the report (even if it contains `No changes required`).

9. ⚠️ **Blocker classification rule (CRITICAL):** every step section must include a clear outcome tag:

* `Blocking: yes/no`

* If `yes`, include a single-sentence reason.

* If `no`, optionally mark items as `Deferred` with rationale.

10. ⚠️ **Language consistency (CRITICAL):** the pipeline and all audit reports must use a single language per document. For this pipeline, English-only.

* Emojis are **allowed and encouraged** as visual markers for readability, but must not replace words or structure.

11. ⚠️ **Vocabulary guardrails (CRITICAL):** the following words/claims are prohibited in STEP 0–11 and may only appear in STEP 12:

* `final`, `optimal`, `exemplary`, `canonical`, `locked`, `foundation-ready`.

* Allowed phrasing in STEP 0–10:

* `No issues detected in this step`

* `Compliant at this stage`

* `No changes required in this step`

* `Behavior unchanged`

12. ✅ **Work pattern inside each step (REQUIRED):** every step must follow the same internal order:

1) **Observe** (what exists)

2) **Decide** (what to do)

3) **Change** (apply scoped refactor if allowed)

4) **Record** (update audit report with blocker/non-blocker)

* Skipping any sub-part is a process violation.

---

## 🤖 **1A. Assistant-only Playbook (Internal Guidance)**

> Written **for the assistant (me)**. This is the missing "glue" that prevents Cursor from doing random stuff and prevents us from looping 12 times.

>

> **Goal:** I can drop into any new chat, open 18A, and instantly generate high-quality TUNG JSON per step with minimal rework.

---

### **A. The 4‑phase step invariant (non‑negotiable)**

Each STEP must complete **all four phases**:

1. **Observe** → collect evidence (paths, exports, current API, current behavior)

2. **Decide** → write a decision (what we change / what we do NOT change)

3. **Change** → apply scoped refactor (only if allowed in this step)

4. **Record** → update the audit report with blockers / non‑blockers

If any phase is missing → the step is **FAILED** even if code "looks fine".

---

### **B. Stable naming & paths (how I stop chaos)**

**Audit report path is mandatory and stable:**

* `docs/reports/audit/<COMPONENT>_BASELINE_REPORT.md`

Rules:

* Never create multiple reports for the same component.

* Never place reports in random folders.

* If a report already exists elsewhere, we **move/redirect** to the canonical path in STEP 0.

**Component inventory naming:** use the *actual exported name* (Button, Tooltip, Popover…), not "popup/pop-up".

---

### **C. How I must write TUNG JSON (authoring contract)**

Every TUNG I issue must include:

* **Exact file paths** (no guessing; if unknown → STEP 0 first)

* **Explicit forbidden actions** (DO NOT list)

* **Explicit allowed scope** (Allowed list)

* **Acceptance criteria** that are verifiable

* **Mandatory audit report update** (STEP N section)

* **Deliverables** (which files must change)

If a TUNG is missing any of these → it's not a valid task.

---

### **D. Anti‑drift guardrails (must be repeated in every TUNG)**

I must explicitly forbid:

* Renaming files "to make it cleaner"

* Moving files across layers/folders unless the step explicitly targets relocation

* Adding new variants/sizes "for completeness"

* Public API redesign during STEP 1–5

* Declaring anything "final/canonical/locked" before STEP 12

* Introducing new helper systems unless required (no new token systems, no new config frameworks)

And I must explicitly allow only what the step allows.

---

### **E. Audit report format (must be enforced)**

Each STEP section in the audit report must contain:

* **Outcome:** `No changes required` | `Changes applied` | `Changes required (not applied)`

* **Blocking:** `yes/no`

* **Findings:** bullet list

* **Changes:** bullet list (or `None`)

* **Deferred:** bullet list (or `None`)

Emoji markers are allowed for scanability:

* ✅ done / correct

* ⚠️ non‑blocking issue

* ❌ blocker

* 🧱 explicit blocker list

* 🧾 report/decision note

**Important:** emoji must be semantic markers, not decoration.

---

### **F. Mandatory "show me the report" checkpoints**

To prevent loops, I must ask the operator to paste the current audit report after:

* **Mandatory:** STEP 0, STEP 8, STEP 9, STEP 10, STEP 11, STEP 12

* **Recommended:** STEP 5, STEP 6, STEP 7

If a risky change happens unexpectedly, request the report immediately.

---

### **G. TUNG JSON skeleton (copy pattern)**

💻
```json
{
  "meta": {
    "id": "TUI_<COMP>_STEP_<N>",
    "title": "<COMP>: STEP <N> — <Step Name>",
    "priority": "P0",
    "mode": "CODE|DOCS|CODE+DOCS",
    "scope": ["<COMP>"]
  },
  "axioms": [
    "No step reordering.",
    "No changes outside declared scope.",
    "Audit report STEP <N> must be updated."
  ],
  "inputs": {
    "files": ["<exact paths>"],
    "report": "docs/reports/audit/<COMP>_BASELINE_REPORT.md"
  },
  "constraints": {
    "forbidden": ["<list>", "..."],
    "allowed": ["<list>", "..."]
  },
  "tasks": [
    {
      "name": "Observe → Decide → Change → Record",
      "steps": ["..."],
      "acceptance": ["..."]
    }
  ],
  "deliverables": [
    "<changed files>",
    "docs/reports/audit/<COMP>_BASELINE_REPORT.md"
  ]
}
```

---

### **H. Step‑by‑step TUNG guidance (what I must instruct Cursor to do)**

#### **STEP 0 — Baseline Snapshot & Context Fixation**

**I must demand:**

* exact file inventory (impl/tests/stories/exports)

* stable audit report path creation

* layer identification (Foundation vs Extension)

**I must forbid:** any code changes.

**Acceptance must include:**

* report file exists at canonical path

* STEP 0 section filled

* list of exact paths and export points

---

#### **STEP 1 — Structural & Code Quality Review**

**Allowed:** readability refactors, mapping duplicates, extracting internal helpers/components.

**Forbidden:** behavior changes, API changes.

**Acceptance must include:**

* no public API diff

* duplication reduced (named examples)

* report STEP 1 updated

---

#### **STEP 2 — Semantic Role & Responsibility**

**I must demand:** 1–2 sentence role definition + explicit out‑of‑scope list.

**Forbidden:** new config flags that widen responsibility.

---

#### **STEP 3 — Duplication & Internal Pattern Alignment**

**I must demand:** consistency with nearest canonical patterns.

**Forbidden:** inventing new patterns.

---

#### **STEP 4 — State & Interaction Model**

**I must demand:** derived state via data‑attributes/CSS where possible; minimal JS state.

**Forbidden:** custom interaction logic that duplicates platform/native behavior.

---

#### **STEP 5 — Token, Size & Variant Consistency**

**I must demand:** token‑only; size scale subset justification; cross‑link to size canon docs.

**Forbidden:** component‑specific size scales; introducing `icon` as a size key.

**Acceptance must include:**

* sizes listed and justified

* token compliance statement

* report STEP 5 updated

---

#### **STEP 6 — Public API & DX Review**

**I must demand:** remove confusing props; enforce safe defaults; clear docs.

**Critical:** any deliberate contract decision (example: default button type) must be written + migration note.

---

#### **STEP 7 — Type System Alignment**

**I must demand:** explicit unions; no internal CVA types leaking; readable types.

**Forbidden:** widening types "for convenience".

---

#### **STEP 8 — Intentional Refactor Pass**

**Mandatory:** explicit decision recorded:

* `Refactor required` + list

* OR `Refactor not required` + justification

Also record **consciously NOT made changes**.

---

#### **STEP 9 — Mandatory FIX & Consolidation**

**I must demand:**

* all FIX backlog items applied or explicitly deferred

* compliance with existing system standards

* explicit decision recorded in audit report

**Forbidden:** proceeding without completing FIX phase.

**Acceptance must include:**

* all fixes applied or deferred with justification

* report STEP 9 updated

---

#### **STEP 10 — Validation via Tests & Storybook**

**I must demand:**

* tests for public behavior and edge cases

* Storybook demonstrates **matrix** (variants × sizes), states, and at least one realistic usage

**Forbidden:** one placeholder story + one shallow test.

**Acceptance must include:**

* tests added/updated

* story matrix present

* report STEP 10 updated

---

#### **STEP 11 — Accessibility Audit & Fixes (MANDATORY)**

**I must demand:** keyboard, focus, ARIA/role correctness + A11Y stories/tests.

**Risk:** this is the most code‑invasive step. Require strict scoping and proof.

---

#### **STEP 12 — Final Review & Outcome Fixation + Architectural Lock**

**I must demand:** lock propagation + doc sync + final gate results.

Lock propagation targets (minimum):

**Required files (all components):**
* `docs/architecture/FOUNDATION_LOCK.md` — If component is Foundation layer
* `docs/architecture/ARCHITECTURE_LOCK.md` — Architectural decisions and constraints
* `docs/PROJECT_PROGRESS.md` — Project progress tracking
* `docs/reports/audit/<COMPONENT>_BASELINE_REPORT.md` — Component audit report (final section)

**Additional files (if applicable):**
* `docs/architecture/EXTENSION_STATE.md` — If component is Extension layer

**Forbidden:** claiming locked if any doc/report contradicts reality.

---

### **I. Minimum closure checklist (what "DONE" means)**

A component is considered **closed** only when:

* Audit report has STEP 0–12 filled

* Inventory/canon docs do not contradict code

* Storybook coverage is not placeholder (matrix + states)

* Tests cover behavior

* A11Y step executed

* Lock propagation completed and consistent

---

## 📄 **2. Audit Report Contract (REQUIRED)**

This pipeline is enforced through a single continuously-updated audit report created in STEP 0.

### **File**

* The audit report file path must be stable per component, e.g.:

* `docs/reports/audit/BUTTON_BASELINE_REPORT.md`

### **Required section structure**

* The report must contain these top-level sections (even if empty):

* `STEP 0` … `STEP 12`

### **Required fields per step**

Each `STEP N` section must include:

* `Outcome:` one of `No changes required | Changes applied | Changes required (not yet applied)`

* `Blocking:` `yes/no`

* `Notes:` 1–5 bullet points max

* `Changes:` list of actual changes (or `None`)

* `Deferred:` list of deferred items (or `None`)

### **Emoji markers (READABILITY, OPTIONAL)**

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

### **Consistency rule (CRITICAL)**

* If a change is mentioned in `Notes`, it must exist in `Changes` (or be marked `Deferred`).

* If a step made code changes, it must include `Behavior unchanged` confirmation (unless the step explicitly allows behavior change).

---

## 📸 **3. STEP 0 — Baseline Snapshot & Context Fixation**

### Goal

Establish a **factual baseline** of what exists **right now** and create a single, large, self-contained audit report that:
1) captures the baseline (what exists now),
2) captures the intended run plan (what we expect to do in STEP 1–12),
3) prevents execution drift and rework loops.

This step answers the question:

> "What exactly are we dealing with before we start improving anything?"

### Recommended Model

**Sonnet 4.5** — Structured documentation and careful reading. No code changes required in this step.

### Mandatory Output

Create/overwrite the audit report at the canonical path:

- `docs/reports/audit/<COMPONENT>_BASELINE_REPORT.md`

### Required Sections in the Audit Report (all required)

STEP 0 MUST produce a "Full Audit Report" with the following sections:

0) **Pipeline Progress Tracker**
   - Checklist of all steps (STEP 0-12)
   - Estimated time per step
   - Checkpoint markers
   - Total estimated time

1) **Header / Metadata**
   - Component name (exported name)
   - Layer (Foundation / Extension)
   - Date, operator, assistant
   - Source files (exact paths)

2) **Baseline Inventory (FACTS ONLY)**
   - Implementation files
   - Storybook files
   - Test files
   - Export points (barrels + root exports)
   - External deps (Radix, etc.)
   - Current public props (snapshot)

3) **Run Plan (STEP MAP) — REQUIRED**
   A short plan for each step (STEP 1–12) including:
   - What will be verified
   - What is considered BLOCKING
   - Whether code changes are allowed in that step
   - Expected artifacts (report updates, tests, stories, docs)

   This is not "future work promises".
   This is an execution map to prevent drift.

4) **Risk Register (ANTI-DRIFT) — REQUIRED**
   List the most likely failure modes for this component, e.g.:
   - Cursor invents new variants/sizes
   - Cursor renames/moves files
   - Placeholder stories/tests
   - API widening during structural steps
   For each risk: prevention rule.

5) **Initial FIX Backlog (EMPTY STRUCTURE) — REQUIRED**
   Create placeholders:
   - `FIX-BLOCKERS (must fix)`
   - `FIX-NONBLOCKERS (nice to fix)`
   - `DEFERRED (explicitly not doing)`
   Items are filled in STEP 1–8 and executed in STEP 9.

6) **DoD (Definition of Done) — REQUIRED**
   The component is considered "closed" only when:
   - STEP 0–12 sections exist and are filled
   - STEP 10 tests + Storybook are not placeholder
   - STEP 11 A11Y executed
   - STEP 12 lock propagation completed and consistent

### Constraints

- STEP 0 MUST NOT change code.
- STEP 0 MUST NOT rename or move files.
- STEP 0 is BLOCKING if the report is missing any required section above.
- This step **does not judge quality**.
- This step prevents accidental refactoring of the wrong thing.

### Example

💡 If both `Tooltip.tsx` and `Popover.tsx` exist, this step must record that fact **before** any conclusions are made.

### Step Completion Checklist

Before proceeding to STEP 1, verify:
- [ ] Audit report created at canonical path: `docs/reports/audit/<COMPONENT>_BASELINE_REPORT.md`
- [ ] Pipeline Progress Tracker section exists
- [ ] Header/Metadata section filled
- [ ] Baseline Inventory documented (files, exports, deps, props)
- [ ] Run Plan (STEP MAP) created
- [ ] Risk Register (ANTI-DRIFT) filled
- [ ] Initial FIX Backlog structure created
- [ ] DoD (Definition of Done) documented
- [ ] No code changes made
- [ ] STEP 0 section in audit report filled
- [ ] Checkpoint: Audit report shared with operator

---

## 🔍 **4. STEP 1 — Structural & Code Quality Review**

### **Goal**

Identify and remove **obvious structural problems** in the code.

### **Recommended Model**

**Sonnet 4.5** — Analysis and documentation. Refactoring findings are recorded in FIX backlog and deferred to STEP 9.

### **What to Look For**

* Repeated JSX blocks that should be mapped.

* Conditional rendering that is hard to follow.

* Copy‑paste fragments with minor differences.

* Deeply nested logic without clear intent.

### **What Is Allowed Here**

* ✅ Refactoring for readability.

* ✅ Extracting helpers or subcomponents.

* ✅ Replacing repetition with iteration (`map`).

### **What Is Not Allowed Here**

* 🚫 Changing behavior.

* 🚫 Redesigning API.

### **Example**

💡 Multiple similar tooltip content blocks → single mapped structure.

### **Step Completion Checklist**

Before proceeding to STEP 2, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 1 section exists
- [ ] Outcome field filled (`No changes required` | `Changes applied` | `Changes required`)
- [ ] Blocking field filled (`yes/no`)
- [ ] Structural issues documented in FIX backlog
- [ ] No behavior changes made
- [ ] No API changes made
- [ ] Model recommendation followed (Sonnet 4.5)

---

## 🎯 **5. STEP 2 — Semantic Role & Responsibility Validation**

### **Goal**

Ensure the component has a **clear, narrow responsibility**.

### **Recommended Model**

**Opus 4.5** — Architectural analysis and decision-making about component role and responsibility.

### **Questions to Answer**

* Is this component informational, interactive, or structural?

* Does it try to behave as more than one thing?

### **Actions**

* Write a short role definition (1–2 sentences).

* Identify logic that does not belong to this role.

### **Refactoring Guidance**

* Move misplaced logic out.

* Reduce scope rather than adding configuration flags.

### **Step Completion Checklist**

Before proceeding to STEP 3, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 2 section exists
- [ ] Role definition written (1-2 sentences)
- [ ] Out-of-scope logic identified
- [ ] Findings documented in FIX backlog
- [ ] Model recommendation followed (Opus 4.5)

---

## 🔄 **6. STEP 3 — Duplication & Internal Pattern Alignment**

### **Goal**

Normalize internal patterns so the component behaves like a **first‑class citizen** of the system.

### **Recommended Model**

**Sonnet 4.5** — Analysis and documentation. Refactoring findings are recorded in FIX backlog and deferred to STEP 9.

### **Checks**

* Consistent prop order.

* Consistent JSX structure.

* Consistent handling of children / trigger / content.

### **Refactoring Guidance**

* Align structure with similar components.

* Prefer one clear pattern over multiple "almost the same" ones.

### **Step Completion Checklist**

Before proceeding to STEP 4, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 3 section exists
- [ ] Pattern alignment issues documented
- [ ] Findings documented in FIX backlog
- [ ] Model recommendation followed (Sonnet 4.5)

---

## ⚡ **7. STEP 4 — State & Interaction Model Review**

### **Goal**

Confirm that interaction logic is **simple, predictable, and platform‑native**.

### **Recommended Model**

**Sonnet 4.5** — Analysis and documentation. Refactoring findings are recorded in FIX backlog and deferred to STEP 9.

### **Checks**

* What states exist and why.

* Which states are derived vs explicit.

* Whether JS is used where CSS or native behavior would suffice.

### **Refactoring Guidance**

* Remove unnecessary JS state.

* Simplify interaction paths.

### **Step Completion Checklist**

Before proceeding to STEP 5, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 4 section exists
- [ ] State model documented
- [ ] Interaction issues documented in FIX backlog
- [ ] Model recommendation followed (Sonnet 4.5)

---

## 🎨 **8. STEP 5 — Token, Size & Variant Consistency**

### **Goal**

Ensure the component speaks the **same visual language** as the rest of the system.

### **Recommended Model**

**Sonnet 4.5** — Compliance validation and documentation.

### **Checks**

* Token‑only styling (no raw values).

* Size usage aligned with the shared size scale.

* Variants that represent real use cases, not implementation quirks.

### **Refactoring Guidance**

* Collapse near‑duplicate variants.

* Remove custom size naming.

### **Scope Boundary (CRITICAL)**

⚠️ STEP 5 is a **compliance validation step**, not a final optimization step.

* Allowed: `compliant`, `aligned`, `no issues detected at this stage`.

* Prohibited: declaring `optimal`, `final`, or "no further refactoring will ever be required".

### **Reference**

📖 [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md) - Defines the global size scale and variant naming dictionary that components must align with.

📖 [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md) - Defines the size-to-token mapping contract that components must follow.

STEP 5 checks compliance; mapping details live in SIZE_MAPPING_SPEC; naming rules live in VARIANTS_SIZE_CANON.

### **Step Completion Checklist**

Before proceeding to STEP 6, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 5 section exists
- [ ] Token compliance validated
- [ ] Size scale alignment checked
- [ ] Variant issues documented in FIX backlog
- [ ] Model recommendation followed (Sonnet 4.5)
- [ ] Recommended checkpoint: Share audit report

---

## 📚 **9. STEP 6 — Public API & DX Review**

### **Goal**

Make the component **easy to understand and hard to misuse**.

### **Recommended Model**

**Opus 4.5** — Architectural judgment about public API design and developer experience.

### **Checks**

* Are all public props necessary?

* Can the component be used correctly without reading its implementation?

### **Refactoring Guidance**

* Remove or rename unclear props.

* Prefer composition over configuration.

### **Scope Boundary (CRITICAL)**

⚠️ STEP 6 evaluates the **current API quality**, but must not declare the API final.

### **Step Completion Checklist**

Before proceeding to STEP 7, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 6 section exists
- [ ] Public API reviewed
- [ ] DX issues documented in FIX backlog
- [ ] Model recommendation followed (Opus 4.5)
- [ ] Recommended checkpoint: Share audit report

---

## 🔷 **10. STEP 7 — Type System Alignment**

### **Goal**

Use the type system as **a safety net and documentation tool**.

### **Recommended Model**

**Opus 4.5** — Type system analysis and reasoning.

### **Checks**

* Explicit unions instead of wide types.

* No leaking of internal variant machinery.

* Types readable without implementation context.

### **Refactoring Guidance**

* Rewrite types for clarity.

* Treat types as part of the public contract.

### **Scope Boundary (CRITICAL)**

⚠️ STEP 7 must not declare the type system `optimal` or `final`.

### **Step Completion Checklist**

Before proceeding to STEP 8, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 7 section exists
- [ ] Type system reviewed
- [ ] Type issues documented in FIX backlog
- [ ] Model recommendation followed (Opus 4.5)
- [ ] Recommended checkpoint: Share audit report

---

## ✨ **11. STEP 8 — Intentional Refactor Pass**

### **Goal**

Perform a **final, focused quality sweep**.

### **Recommended Model**

**Opus 4.5** — Senior-level decision-making about what to fix in STEP 9.

### **Guiding Question**

> "If this code were reviewed today by a senior engineer, would it pass without comments?"

### **Actions**

* Re‑read all code.

* Simplify naming and structure.

* Remove remaining incidental complexity.

### **Mandatory Outcome (CRITICAL)**

⚠️ This step **must end** with an explicit decision recorded in the audit report:

* `Refactor required` (with minimal scoped description)

* or `Refactor not required` (with justification)

Additionally, STEP 8 must record a list of **consciously NOT made changes**.

### **Step Completion Checklist**

Before proceeding to STEP 9, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 8 section exists
- [ ] Explicit decision recorded: `Refactor required` OR `Refactor not required`
- [ ] Consciously NOT made changes documented
- [ ] FIX backlog finalized (all STEP 1-8 findings collected)
- [ ] Model recommendation followed (Opus 4.5)
- [ ] **MANDATORY checkpoint: Share audit report before STEP 9**

---

## 🛠️ **12. STEP 9 — Mandatory FIX & Consolidation (CRITICAL)**

### **Goal**

Apply all required fixes identified during STEP 1–8 to ensure full compliance

with existing system standards before any validation or locking occurs.

### **Recommended Model**

**GPT‑5.1 Codex Max** — Apply ALL fixes from backlog. Heavy code work including refactoring, structure improvements, and duplication removal.

### **Scope**

- Apply all items from the FIX backlog.

- Improve readability, structure, and maintainability.

- Remove duplication and incidental complexity.

### **Constraints**

- No new features.

- No behavior changes unless explicitly required by fixes.

- Public API changes are prohibited unless explicitly approved and documented.

### **FIX Backlog**

A FIX backlog must be explicitly defined in the audit report, containing:

- architectural violations discovered during STEP 1–7,

- code quality issues (readability, structure, naming, duplication),

- refactors identified but not yet applied,

- items consciously deferred with justification.

### **Required Decision**

The audit report **must include one of the following explicit outcomes**:

- `Refactor required` — with a concrete list of fixes to be applied.

- `No refactor required` — with a clear justification.

If `Refactor required` is declared:

- all listed fixes **must be applied** before proceeding,

- affected steps **must be re-validated** and recorded.

### **FIX Sufficiency Criteria (REQUIRED)**

The FIX phase is considered complete **only** when the component is fully compliant

with all **existing system standards** applicable to its layer and scope.

This includes, but is not limited to:

- architectural and layering rules,

- token and styling constraints,

- public API and DX conventions,

- type system rules and exposure boundaries,

- accessibility requirements where applicable.

FIX completion is defined by **compliance**, not subjective cleanliness,

personal preference, or perceived elegance.

If compliance cannot be achieved without disproportionate changes,

this must be explicitly recorded and escalated (see Failure Modes).

### **Mandatory Outcome**

All blocking and non-blocking FIX items must be resolved or explicitly deferred

with justification in the audit report.

Proceeding without completing this step is a **process violation**.

This step exists to guarantee that:

- tests do not validate poor code,

- Storybook does not document accidental complexity,

- the locked result reflects deliberate engineering decisions.

### **STEP 9 Decision Flow**

1. Review FIX backlog from STEP 1-8
2. Classify fixes:
   - **BLOCKERS** → must fix now
   - **NON-BLOCKERS** → fix or defer with justification
   - **DEFERRED** → explicitly document why not fixing
3. Apply fixes (use Codex Max)
4. Update audit report STEP 9 section
5. **Checkpoint: Share report before STEP 10**

**Exit condition:** All BLOCKERS resolved OR component marked "Not ready for Foundation"

### **Step Completion Checklist**

Before proceeding to STEP 10, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 9 section exists
- [ ] All BLOCKERS from FIX backlog resolved
- [ ] NON-BLOCKERS fixed or deferred with justification
- [ ] Code quality improved (readability, structure, maintainability)
- [ ] Duplication reduced
- [ ] No new features added
- [ ] Public API changes documented (if any)
- [ ] Model recommendation followed (Codex Max)
- [ ] **MANDATORY checkpoint: Share audit report before STEP 10**

---

## Failure Modes & Exit Conditions (REFERENCE)

If during execution it becomes clear that:

- the required FIX scope is disproportionate to the component value,

- the component violates foundational assumptions,

- or the component is not suitable for Foundation status,

the pipeline may be **stopped intentionally**.

In such cases, the component must be explicitly marked as:

`Not ready for Foundation`.

Stopping the pipeline is a **valid outcome** and must be recorded

in the audit report with a clear justification.

---

## ✅ **13. STEP 10 — Validation via Tests & Storybook**

### **Goal**

Prove that the improved component behaves as expected.

Tests and Storybook are treated as **executable proof of the component contract**,

### **Recommended Model**

**GPT‑5.1 Codex Max** — Code generation for tests and Storybook stories.


not as auxiliary validation artifacts.

If a behavior, variant, interaction, or constraint cannot be clearly demonstrated

via tests or Storybook, the component is considered **incomplete** at this stage.

### **Requirements**

* Tests cover public behavior and edge cases.

* Storybook demonstrates:

 * all variants,

 * all sizes,

 * meaningful interaction examples.

Minimal or placeholder coverage is not sufficient.

### **Reference**

📖 [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md) - Defines Matrix/States conditional story requirements for components with variants.

📖 [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md) - Defines Sizes Gallery story requirements for demonstrating size mappings.

Story names are canonical in VARIANTS_SIZE_CANON; size-mapping stories are defined in SIZE_MAPPING_SPEC.

### **Step Completion Checklist**

Before proceeding to STEP 11, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 10 section exists
- [ ] Tests cover public behavior and edge cases
- [ ] Storybook demonstrates all variants and sizes
- [ ] Storybook includes meaningful interaction examples
- [ ] No placeholder coverage
- [ ] Model recommendation followed (Codex Max)
- [ ] **MANDATORY checkpoint: Share audit report before STEP 11**

---

## ♿ **14. STEP 11 — Accessibility Audit & Fixes (MANDATORY)**

### **Goal**

Make the component **accessible** and safe for keyboard and assistive technologies.

### **Recommended Model**

**GPT‑5.1 Codex Max** — A11Y correctness requires code-invasive changes (ARIA, keyboard navigation, focus management).

### **Rationale (CRITICAL)**

⚠️ Accessibility work is typically the most code‑invasive phase:

* it touches real code paths,

* it changes semantics (ARIA/roles), focus behavior, and keyboard flows,

* it often introduces the largest set of changes.

Therefore, accessibility **cannot** be treated as an optional follow‑up.

### **Scope**

* ARIA roles and attributes.

* Keyboard navigation and focus management.

* Screen reader announcement behavior.

* Accessibility‑specific tests and Storybook stories.

### **Important Notes**

* This step may change code **only for accessibility correctness**.

* Public API changes are still prohibited unless explicitly agreed and documented.

### **Step Completion Checklist**

Before proceeding to STEP 12, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 11 section exists
- [ ] ARIA roles and attributes correct
- [ ] Keyboard navigation working
- [ ] Focus management implemented
- [ ] Screen reader behavior tested
- [ ] A11Y-specific tests added
- [ ] A11Y-specific Storybook stories added
- [ ] Model recommendation followed (Codex Max)
- [ ] **MANDATORY checkpoint: Share audit report before STEP 12**

---

## 🔒 **15. STEP 12 — Final Review & Outcome Fixation + Architectural Lock**

### **Goal**

Formally conclude the pipeline and **lock the component status across all architectural authority documents**.

### **Recommended Model**

**GPT‑5.2** — Independent verification and final validation before locking.

### **Actions**

* Verify that all previous steps are complete.

* Confirm code quality improvements.

* Record final state and decisions.

### **Mandatory Lock Propagation (CRITICAL)**

⚠️ This step is considered **INCOMPLETE** unless the locked status is propagated consistently to:

**Required files (all components):**
* `docs/architecture/FOUNDATION_LOCK.md` — If component is Foundation layer
* `docs/architecture/ARCHITECTURE_LOCK.md` — Architectural decisions and constraints
* `docs/PROJECT_PROGRESS.md` — Project progress tracking
* `docs/reports/audit/<COMPONENT>_BASELINE_REPORT.md` — Component audit report (final section)

**Additional files (if applicable):**
* `docs/architecture/EXTENSION_STATE.md` — If component is Extension layer

**Note:** The component's layer (Foundation vs Extension) determines which lock files must be updated. Foundation components are locked in `FOUNDATION_LOCK.md`, Extension components are tracked in `EXTENSION_STATE.md`.

### **Outcome**

* Component accepted and locked (Foundation Lock),

* or explicitly marked for further iteration.

### **Step Completion Checklist**

Before marking pipeline complete, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 12 section exists
- [ ] All previous steps (STEP 0-11) verified complete
- [ ] Code quality improvements confirmed
- [ ] Lock propagation completed to all required files:
  - [ ] `docs/architecture/FOUNDATION_LOCK.md` (if Foundation)
  - [ ] `docs/architecture/ARCHITECTURE_LOCK.md`
  - [ ] `docs/PROJECT_PROGRESS.md`
  - [ ] `docs/reports/audit/<COMPONENT>_BASELINE_REPORT.md`
  - [ ] `docs/architecture/EXTENSION_STATE.md` (if Extension)
- [ ] Model recommendation followed (GPT-5.2)
- [ ] **MANDATORY checkpoint: Final audit report shared**

---

---

## 🔧 Troubleshooting

### "Audit report section missing"
**Problem:** Cannot proceed to STEP N+1 without STEP N section.

**Solution:** Create STEP N section in audit report, even if it contains `No changes required in this step`.

### "FIX backlog too large"
**Problem:** Too many fixes identified in STEP 1-8.

**Solution:** 
- Consider splitting into multiple pipeline runs
- Mark component "Not ready for Foundation" if fixes are disproportionate
- Document decision in STEP 8 audit section

### "Tests fail after STEP 9"
**Problem:** Code changes in STEP 9 broke existing tests.

**Solution:** 
- Review STEP 9 changes for unintended behavior changes
- Update tests in STEP 10, not during STEP 9
- Document test updates in STEP 10 audit section

### "A11Y changes break existing behavior"
**Problem:** Accessibility fixes in STEP 11 changed component behavior.

**Solution:** 
- Document in STEP 11 audit section
- May require re-validation in STEP 10
- Ensure behavior changes are accessibility-required only

### "Lock propagation incomplete"
**Problem:** Not all lock files updated in STEP 12.

**Solution:** Verify all required files updated:
- `docs/architecture/FOUNDATION_LOCK.md` (if Foundation)
- `docs/architecture/ARCHITECTURE_LOCK.md`
- `docs/PROJECT_PROGRESS.md`
- `docs/reports/audit/<COMPONENT>_BASELINE_REPORT.md`
- `docs/architecture/EXTENSION_STATE.md` (if Extension)

### "Model recommendation not followed"
**Problem:** Wrong AI model used for step.

**Solution:** 
- Check [AI Models Usage Guide](ai_models_usage_guide_for_pipeline_tung.md)
- Use recommended model for optimal results
- Document if different model used with justification

---

## 📚 Reference Examples

Successfully completed pipeline runs:
- **Button:** `docs/reports/audit/BUTTON_BASELINE_REPORT.md`
- **Tooltip:** `docs/reports/audit/TOOLTIP_BASELINE_REPORT.md`
- **Tabs:** `docs/reports/audit/TABS_BASELINE_REPORT.md`

These reports demonstrate:
- Complete STEP 0-12 structure
- Proper FIX backlog usage
- Checkpoint compliance
- Lock propagation
- Model recommendations followed

---

## **Closing Note**

This pipeline exists to **prevent accidental complexity** and **raise the baseline quality** of the system over time.

Skipping steps or rushing execution will only reintroduce the problems this document is designed to eliminate.

**Pipeline completion time:** 6-8 hours for typical component.

