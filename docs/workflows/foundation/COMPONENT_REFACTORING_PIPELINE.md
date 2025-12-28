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

## 🗺️ Authority Navigation & Reference

This pipeline enforces compliance with Authority Contracts and architectural standards.

### Process Policies

📄 [TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md](../policies/TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md) - Locked component change guard policy  
📄 [LOCKED_CHANGE_EXCEPTION_TEMPLATE.md](../policies/LOCKED_CHANGE_EXCEPTION_TEMPLATE.md) - Exception declaration template  
📄 [POLICIES_INDEX.md](../policies/POLICIES_INDEX.md) - Complete policies index

### Complete Authority Map

📖 [AUTHORITY_NAVIGATION.md](../../architecture/AUTHORITY_NAVIGATION.md) - Complete Authority navigation map (question → authority mapping)

### State Authorities (WHAT/WHEN/HOW)

- 📖 [STATE_MATRIX.md](../../architecture/STATE_MATRIX.md) - **WHAT** states exist (canonical set: base, hover, active, focus-visible, disabled, loading)
- 📖 [INTERACTION_AUTHORITY.md](../../architecture/INTERACTION_AUTHORITY.md) - **WHEN** states activate (activation conditions, blocking rules, priority order)
- 📖 [STATE_AUTHORITY.md](../../architecture/STATE_AUTHORITY.md) - **HOW** states represented (format, structure, naming, CSS variables)

### Token Authorities

- 📖 [SPACING_AUTHORITY.md](../../architecture/SPACING_AUTHORITY.md) - Spacing token scale (padding, margin, gap)
- 📖 [TYPOGRAPHY_AUTHORITY.md](../../architecture/TYPOGRAPHY_AUTHORITY.md) - Typography tokens (font-size, line-height, font-weight, letter-spacing, font-family)
- 📖 [RADIUS_AUTHORITY.md](../../architecture/RADIUS_AUTHORITY.md) - Border radius token scale
- 📖 [MOTION_AUTHORITY.md](../../architecture/MOTION_AUTHORITY.md) - Motion/animation tokens (duration, easing, transitions)
- 📖 [ELEVATION_AUTHORITY.md](../../architecture/ELEVATION_AUTHORITY.md) - Elevation tokens (shadows, z-index layers)

### Size & Variant Authorities

- 📖 [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md) - Global size scale (xs..3xl) and variant naming dictionary
- 📖 [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md) - Size-to-token mapping contract (how size maps to tokens)

### Structural Authorities

- 📖 [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) - Layout structure and flow (WHERE elements positioned)

### Lock Documents

- 📖 [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Foundation layer lock status
- 📖 [ARCHITECTURE_LOCK.md](../../architecture/ARCHITECTURE_LOCK.md) - Architectural decisions lock
- 📖 [EXTENSION_STATE.md](../../architecture/EXTENSION_STATE.md) - Extension layer tracking

### Reference Components for Complex Controls

- 📖 [Component Examples Library](../../reference/COMPONENT_EXAMPLES.md) - Reference examples including **Button** (Foundation) and **Slider** (Extension) for complex controls
  - **Button** (`src/PRIMITIVES/Button/Button.tsx`) - Foundation layer reference: token compliance, Foundation Enforcement
  - **Slider** (`src/COMPOSITION/controls/Slider/Slider.tsx`) - Extension layer reference: token migration, token hole fixing, complex control patterns

**Pipeline Compliance Rule:** Every step must validate against applicable Authority documents. Violations are blocking.

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

**I must demand:**

* Final Report Consistency Check completion (6 mandatory checks)

* All consistency checks pass before Lock Propagation

**Mandatory checks before Lock Propagation:**
- Lock status consistency (single status throughout)
- Baseline BLOCKER → STEP 9 resolution traceability
- STEP 9 absolutism verification (explanations for exceptions)
- File reality verification (mentions match actual state)
- Outcome/changes logic consistency
- Export decision documentation

**Forbidden:** Proceeding to Lock Propagation if any consistency check fails

**Acceptance must include:**
- All 6 consistency checks verified passed
- Audit report wording corrections applied (if any)
- Lock Propagation completed only after consistency check pass

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

* `Blocking:` `yes/no` (with reason if `yes`)

* `Notes:` 2-5 bullet points max (key decisions, findings)

* `Changes:` list of actual changes (or `None`)

* `Artifacts:` links to created/modified files (or `None`)

* `Deferred:` list of deferred items (or `None`)

**Standardized Section Format Example:**
```markdown
## STEP N — Step Name

**Outcome:** Changes applied  
**Blocking:** no  
**Notes:**
- Key finding or decision point
- Another important note
- Reference to specific authority contract

**Changes:**
- List of actual changes made
- Files modified or created

**Artifacts:**
- Links to created/modified files
- Documentation references

**Deferred:**
- Items explicitly not addressed (with justification)
```

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

### **Final Consistency Verification (STEP 12)**

Before STEP 12 completion, the audit report MUST pass 6 mandatory consistency checks:

1. Lock status is unified and consistent throughout
2. All baseline BLOCKERS have resolution traces in STEP 9
3. Absolute claims in STEP 9 have explanatory context
4. All file mentions correspond to actual repository state
5. No logical contradictions between outcome and changes sections
6. Export decisions are explicitly documented

Any failure in these checks prevents STEP 12 completion.

---

## 📸 **3. STEP 0 — Baseline Snapshot & Context Fixation**

### Goal

Establish a **factual baseline** of what exists **right now** and create a single, large, self-contained audit report that:
1) captures the baseline (what exists now),
2) captures the intended run plan (what we expect to do in STEP 1–12),
3) prevents execution drift and rework loops.

This step answers the question:

> "What exactly are we dealing with before we start improving anything?"

### Lock Status Check (MANDATORY)

**Before proceeding:** Verify component lock status:

- Check `docs/architecture/FOUNDATION_LOCK.md` for Foundation components
- Check `docs/architecture/EXTENSION_STATE.md` for Extension components
- If component is LOCKED, review [TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md](../policies/TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md) policy
- Document lock status in audit report STEP 0 section

**For LOCKED components:** Any changes require exception declaration per policy. See [LOCKED_CHANGE_EXCEPTION_TEMPLATE.md](../policies/LOCKED_CHANGE_EXCEPTION_TEMPLATE.md) for template.

### Recommended Model

**Sonnet 4.5** — Structured documentation and careful reading. No code changes required in this step.

### Mandatory Output

Create/overwrite the audit report at the canonical path:

- `docs/reports/audit/<COMPONENT>_BASELINE_REPORT.md`

### Required Sections in the Audit Report (all required)

STEP 0 MUST produce a "Full Audit Report" with the following sections:

0) **Pipeline Progress Tracker (MANDATORY)**
   - Checklist of all steps (STEP 0-12) with status indicators
   - Estimated time per step
   - Checkpoint markers (mandatory/recommended)
   - Total estimated time
   
   **Template:**
   ```markdown
   ## Pipeline Progress Tracker
   
   | Step | Name | Status | Estimated Time |
   |------|------|--------|----------------|
   | STEP 0 | Baseline Snapshot | ⬜ Pending | 30 min |
   | STEP 1 | Structural & Code Quality | ⬜ Pending | 30 min |
   | STEP 2 | Semantic Role & Responsibility | ⬜ Pending | 15 min |
   | STEP 3 | Duplication & Pattern Alignment | ⬜ Pending | 30 min |
   | STEP 4 | State & Interaction Model | ⬜ Pending | 30 min |
   | STEP 5 | Token, Size & Variant | ⬜ Pending | 45 min |
   | STEP 6 | Public API & DX | ⬜ Pending | 30 min |
   | STEP 7 | Type System Alignment | ⬜ Pending | 30 min |
   | STEP 8 | Intentional Refactor Pass | ⬜ Pending | 30 min |
   | STEP 9 | Mandatory FIX | ⬜ Pending | 2 hours |
   | STEP 10 | Tests & Storybook | ⬜ Pending | 2 hours |
   | STEP 11 | Accessibility Audit | ⬜ Pending | 1 hour |
   | STEP 12 | Final Review & Lock | ⬜ Pending | 30 min |
   
   **Total Estimated Time:** 8-10 hours
   **Actual Time:** {to be filled on completion}
   ```

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
- [ ] **Pipeline Progress Tracker section exists** with all steps (STEP 0-12) and estimated times
- [ ] Header/Metadata section filled
- [ ] Baseline Inventory documented (files, exports, deps, props)
- [ ] Run Plan (STEP MAP) created
- [ ] Risk Register (ANTI-DRIFT) filled
- [ ] Initial FIX Backlog structure created
- [ ] DoD (Definition of Done) documented
- [ ] No code changes made
- [ ] STEP 0 section in audit report filled (using standardized format: Outcome, Blocking, Notes, Changes, Artifacts, Deferred)
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

* **CVA Structure Validation (MANDATORY):**
  - ✅ Validate CVA structure against canonical style (see `CVA_CANONICAL_STYLE.md`)
  - ✅ Check for forbidden patterns (variant maps in variables, function calls, conditional logic)
  - ✅ Verify variants are defined inline within CVA config
  - ✅ Verify single tokenCVA invocation per variant set
  - ✅ **Validate CVA type against Decision Matrix** (tokenCVA vs cva selection)
  - ✅ Document any deviations in audit report

### **Refactoring Guidance**

* Align structure with similar components.

* Prefer one clear pattern over multiple "almost the same" ones.

### **Reference (CRITICAL)**

**CVA Canonical Style Authority:**

📖 [CVA_CANONICAL_STYLE.md](../../architecture/CVA_CANONICAL_STYLE.md) - Canonical CVA structure pattern
- Variants must be explicit and inspectable
- No inline variant objects outside CVA config
- No dynamic construction of variants
- Single tokenCVA invocation per variant set
- Variants defined inline ONLY inside tokenCVA
- **CVA Usage Decision Matrix** - Mandatory rules for tokenCVA vs cva selection

**CVA Usage Decision Matrix Rules:**
- ✅ **RULE 1:** tokenCVA is REQUIRED for components with token-driven axes (variant, size, state)
- ✅ **RULE 2:** cva is ALLOWED only for components without token-driven axes (boolean/presentational flags only)
- ✅ **RULE 3:** Foundation components using cva MUST document explicit rationale in audit report

**Common CVA Violations:**
- ❌ Variant maps defined in separate variables (violates explicit variant requirement)
- ❌ Function calls generating variant objects (violates declarative requirement)
- ❌ Conditional spreading inside CVA config (violates static requirement)
- ❌ Building CVA config dynamically (violates single invocation requirement)
- ❌ Reusing variant objects across components (violates inline requirement)
- ❌ Using cva for token-driven component (violates Decision Matrix RULE 1)
- ❌ Using tokenCVA for boolean-only component without justification (violates Decision Matrix RULE 2)

**Reference Examples:**
- **Button** (`src/PRIMITIVES/Button/Button.tsx`) - Foundation component with tokenCVA, complete token compliance
- **Slider** (`src/COMPOSITION/controls/Slider/Slider.tsx`) - Extension component with tokenCVA migration pattern (cva → tokenCVA), token hole fixing
- 📖 [Component Examples Library](../../reference/COMPONENT_EXAMPLES.md) - Complete reference examples

**STEP 3 validates CVA structure against canonical style AND CVA Usage Decision Matrix. Non-canonical structure or incorrect CVA type selection is a BLOCKER.**

### **Step Completion Checklist**

Before proceeding to STEP 4, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 3 section exists
- [ ] Pattern alignment issues documented
- [ ] CVA structure validated against canonical style
- [ ] CVA violations documented in FIX backlog (if any)
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

* **Input Interaction Validation (MANDATORY for interactive components):**
  - **Keyboard parity validation:**
    - Every pointer interaction MUST have keyboard equivalent
    - Enter/Space semantics correct for component type
    - Reference: [INPUT_AUTHORITY.md](../../architecture/INPUT_AUTHORITY.md)
  - **State blocking validation:**
    - Disabled state blocks all activation events (pointer + keyboard)
    - Loading state blocks pointer (if implemented)
    - Readonly state blocks changes, allows focus
    - Reference: [INPUT_AUTHORITY.md](../../architecture/INPUT_AUTHORITY.md)

### **Refactoring Guidance**

* Remove unnecessary JS state.

* Simplify interaction paths.

* Ensure keyboard parity for all interactive elements.

* Verify state blocking behavior (disabled/loading/readonly).

### **Reference (CRITICAL)**

**State Authorities (3-Layer System):**

📖 [STATE_MATRIX.md](../../architecture/STATE_MATRIX.md) - **WHAT** states exist
- Canonical state set: `base`, `hover`, `active`, `focus-visible`, `disabled`, `loading`
- State relationships and mutual exclusivity rules

📖 [INTERACTION_AUTHORITY.md](../../architecture/INTERACTION_AUTHORITY.md) - **WHEN** states activate
- Activation conditions and blocking rules
- Priority order: `disabled > loading > active > hover > focus-visible > base`
- Browser-native interaction rules

📖 [STATE_AUTHORITY.md](../../architecture/STATE_AUTHORITY.md) - **HOW** states represented
- State token naming pattern: `--{component}-{variant}-{state}-{property}`
- CSS variable structure and format
- State representation as tokens

**Input Interaction Authority:**

📖 [INPUT_AUTHORITY.md](../../architecture/INPUT_AUTHORITY.md) - **Input interaction contracts**
- Keyboard parity requirements (every pointer interaction MUST have keyboard equivalent)
- Enter/Space semantics by component type
- State blocking rules (disabled/loading/readonly)
- Accidental interaction prevention

**STEP 4 validates interaction logic against all three state authorities AND input interaction contracts.**

**Common Violations:**
- ❌ Custom state invention (violates STATE_MATRIX)
- ❌ JavaScript-driven hover/active (violates INTERACTION_AUTHORITY)
- ❌ Incorrect state priority (violates INTERACTION_AUTHORITY)
- ❌ Non-standard state naming (violates STATE_AUTHORITY)
- ❌ Missing keyboard parity (violates INPUT_AUTHORITY)
- ❌ Incorrect Enter/Space semantics (violates INPUT_AUTHORITY)
- ❌ Disabled/loading state not blocking interactions (violates INPUT_AUTHORITY)

### **Step Completion Checklist**

Before proceeding to STEP 5, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 4 section exists
- [ ] State model documented
- [ ] Input interaction validation completed (keyboard parity, Enter/Space semantics, state blocking)
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

* **A11Y Requirements Evaluation (MANDATORY for interactive components):**
  - **Accessible name evaluation:**
    - Every interactive control MUST have accessible name
    - Icon-only buttons: aria-label required
    - Form inputs: label association required (htmlFor/aria-labelledby)
    - Modal overlays: aria-labelledby required (via title)
    - Reference: [A11Y_AUTHORITY.md](../../architecture/A11Y_AUTHORITY.md)
  - **Semantic role evaluation:**
    - Native semantic elements preferred (`<button>`, `<a>`, `<input>`, etc.)
    - Non-semantic elements MUST have `role` + `tabindex` + keyboard handlers if interactive
    - Redundant ARIA forbidden (e.g., `aria-disabled` on native `disabled` button)
    - Reference: [A11Y_AUTHORITY.md](../../architecture/A11Y_AUTHORITY.md)

* **Focus Behavior Evaluation (MANDATORY for interactive components):**
  - **Focus trap requirements:**
    - Modal overlays: MUST trap focus
    - Non-modal overlays: MUST NOT trap focus
    - Reference: [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md)
  - **Focus restore requirements:**
    - Modal overlays: MUST restore focus to trigger on close
    - Focus restore MUST be synchronous
    - Reference: [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md)
  - **Tab order requirements:**
    - DOM order = navigation order
    - Roving tabindex for composite controls (Tabs, Select, Menu, RadioGroup)
    - Positive tabindex forbidden
    - Reference: [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md)
  - **Focus-visible styling:**
    - `:focus-visible` pseudo-class MUST be used for focus rings
    - `:focus` alone MUST NOT be used for focus rings
    - Reference: [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md)

* **Loading State Evaluation (if applicable):**
  - **Loading state requirements:**
    - Loading state blocking behavior (pointer blocked, keyboard focus allowed)
    - Loading indicator requirements (visual indicator, aria-busy)
    - aria-busy attribute required
    - Reference: [INPUT_AUTHORITY.md](../../architecture/INPUT_AUTHORITY.md)

### **Refactoring Guidance**

* Collapse near‑duplicate variants.

* Remove custom size naming.

* Ensure accessible names for all interactive controls.

* Verify focus behavior (trap, restore, tab order).

* Verify loading state blocking behavior (if applicable).

### **Scope Boundary (CRITICAL)**

⚠️ STEP 5 is a **compliance validation step**, not a final optimization step.

* Allowed: `compliant`, `aligned`, `no issues detected at this stage`.

* Prohibited: declaring `optimal`, `final`, or "no further refactoring will ever be required".

### **Reference (CRITICAL)**

**Size & Variant Canon:**

📖 [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md) - Global size scale and variant naming dictionary
- GlobalSize scale: `xs | sm | md | lg | xl | 2xl | 3xl`
- InteractiveVariant dictionary: `primary | secondary | accent | outline | ghost | destructive | link`
- SurfaceVariant dictionary: `default | elevated | outlined | filled | subtle`
- Component subset declarations
- Overlay size restriction: `sm | md | lg` only
- Storybook requirements: Matrix and States stories

📖 [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md) - Size-to-token mapping contract
- Mandatory mapping keys: heightToken, paddingXToken, paddingYToken, textToken, radiusToken
- Optional mapping keys: gapToken, iconSizeToken, minWidthToken, hitAreaToken, maxWidthToken
- No raw values policy (token references only)
- Storybook requirements: SizesGallery story

**Token Authorities (Referenced by Size Mappings):**

📖 [SPACING_AUTHORITY.md](../../architecture/SPACING_AUTHORITY.md) - Spacing token scale
- Canonical spacing scale: `spacing[0]`, `spacing[px]`, `spacing[1..8]`
- Semantic spacing: `semanticSpacing.xs`, `semanticSpacing.sm`, `semanticSpacing.md`, `semanticSpacing.lg`, `semanticSpacing.xl`
- Layout spacing: `layoutSpacing.section.*`, `layoutSpacing.container.*`, `layoutSpacing.grid.*`
- Forbidden: raw pixel/rem values

📖 [TYPOGRAPHY_AUTHORITY.md](../../architecture/TYPOGRAPHY_AUTHORITY.md) - Typography token scale
- Font size scale: `fontSize.xs`, `fontSize.sm`, `fontSize.base`, `fontSize.lg`, `fontSize.xl`, `fontSize["2xl"]`
- Font family: `fontFamily.sans`, `fontFamily.display`
- Font weight: `fontWeight.normal`, `fontWeight.medium`, `fontWeight.semibold`, `fontWeight.bold`
- Line height: `lineHeight.tight`, `lineHeight.normal`, `lineHeight.relaxed`
- Forbidden: raw font-size values

📖 [RADIUS_AUTHORITY.md](../../architecture/RADIUS_AUTHORITY.md) - Border radius token scale
- Base radius: `borderRadius.none`, `borderRadius.sm`, `borderRadius.md`, `borderRadius.lg`, `borderRadius.full`
- Component radius: `componentRadius.button.*`, `componentRadius.input.*`, etc.
- Forbidden: raw border-radius values

📖 [MOTION_AUTHORITY.md](../../architecture/MOTION_AUTHORITY.md) - Motion/animation tokens
- Duration scale: `duration.fast`, `duration.normal`, `duration.slow`
- Easing: `easing.default`, `easing.in`, `easing.out`, `easing.inOut`
- Transition presets: `transitions.fast`, `transitions.normal`, `transitions.slow`
- **Motion GAP rule:** All state/spatial changes must be evaluated for Motion GAP
- **GAP resolution:** ADD MOTION, NO MOTION BY DESIGN, or DEFERRED (UNLOCKED only)
- Forbidden: raw transition values, unresolved GAPs in LOCKED components

📖 [ELEVATION_AUTHORITY.md](../../architecture/ELEVATION_AUTHORITY.md) - Elevation tokens
- Shadow scale: `elevationShadows.none`, `elevationShadows.sm`, `elevationShadows.md`, `elevationShadows.lg`
- Z-index layers: `zIndex.base`, `zIndex.dropdown`, `zIndex.overlay`, `zIndex.modal`, `zIndex.notification`
- Focus rings: `focusRings.default`
- Forbidden: raw box-shadow/z-index values

**STEP 5 Compliance Rules:**
1. ✅ All sizes must use GlobalSize scale (component declares supported subset)
2. ✅ All variants must use canonical variant dictionaries (InteractiveVariant or SurfaceVariant)
3. ✅ Overlay components: restricted to `sm | md | lg` sizes only (CRITICAL rule)
4. ✅ All mappings must reference tokens only (no raw values)
5. ✅ Size mapping table required for all sized components
6. ✅ Matrix story required if component has BOTH size AND variant props
7. ✅ States story required if component has public state props/interactive behavior
8. ✅ SizesGallery story required if component has public size prop

**Common Violations:**
- ❌ Using `size="icon"` (forbidden non-GlobalSize value, use `iconOnly={true}` instead)
- ❌ Raw spacing values (e.g., `padding: "8px"` instead of `semanticSpacing.sm`)
- ❌ Raw typography values (e.g., `fontSize: "14px"` instead of `fontSize.sm`)
- ❌ Invented variant names (e.g., `variant="danger"` instead of `variant="destructive"`)
- ❌ Overlay with `xs` or `xl` sizes (violates overlay restriction)
- ❌ States encoded as variants (e.g., `variant="disabled"` instead of `disabled={true}`)

**Validation Order:**
1. Check GlobalSize compliance (VARIANTS_SIZE_CANON)
2. Check variant dictionary compliance (VARIANTS_SIZE_CANON)
3. Check size mapping table existence (SIZE_MAPPING_SPEC)
4. Check token reference compliance (all Token Authorities)
5. **Check Motion GAP resolution** (MOTION_AUTHORITY.md) - Evaluate all state/spatial changes for Motion GAP
6. **Check A11Y requirements** (A11Y_AUTHORITY.md) - Accessible names, semantic roles, ARIA contracts
7. **Check Focus behavior** (FOCUS_AUTHORITY.md) - Focus trap, restore, tab order, focus-visible
8. **Check Loading state** (INPUT_AUTHORITY.md) - Loading blocking behavior, aria-busy (if applicable)
9. Check Storybook story requirements (VARIANTS_SIZE_CANON + SIZE_MAPPING_SPEC)

### **Step Completion Checklist**

Before proceeding to STEP 6, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 5 section exists
- [ ] Token compliance validated
- [ ] Size scale alignment checked
- [ ] A11Y requirements evaluated (if interactive component)
- [ ] Focus behavior evaluated (if interactive component)
- [ ] Loading state evaluated (if applicable)
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

* **Typing Standard Compliance (MANDATORY):**
  - Public props MUST reference explicit union types (e.g., `type ButtonVariant = "primary" | "secondary"`)
  - CVA-derived types FORBIDDEN in public API (e.g., `VariantProps<typeof buttonVariants>`)
  - Variant maps MUST use `satisfies Record<Type, string>` constraints
  - NO inline string unions in props (define explicit types first)
  - NO `string` as variant/size type (must be explicit union)
  - Reference: [TYPING_STANDARD.md](../../reference/TYPING_STANDARD.md) - **MANDATORY** architectural standard

* **A11Y Contract Requirements (MANDATORY for interactive components):**
  - Document accessible name requirements (visible label/aria-label/aria-labelledby/text content)
  - Document ARIA props exposed in public API (aria-label, aria-labelledby, aria-describedby)
  - Document semantic role requirements (native element preferred, role attribute if needed)
  - For icon-only buttons: Document aria-label prop requirement
  - For form inputs: Document label association (htmlFor/aria-labelledby)
  - For modal overlays: Document aria-labelledby requirement (via title)
  - Reference: [A11Y_AUTHORITY.md](../../architecture/A11Y_AUTHORITY.md)

* **Input Contract Requirements (MANDATORY for interactive components):**
  - Document keyboard parity requirements (every pointer interaction MUST have keyboard equivalent)
  - Document Enter/Space semantics (component-type specific)
  - Document disabled state blocking (MUST block all activation events)
  - Document loading state blocking (if loading state implemented)
  - Reference: [INPUT_AUTHORITY.md](../../architecture/INPUT_AUTHORITY.md)

### **Refactoring Guidance**

* Remove or rename unclear props.

* Prefer composition over configuration.

* Ensure explicit union types for all variant/size props.

* Document A11Y and Input contracts in public API.

### **Reference (CRITICAL)**

**Typing Standard:**

📖 [TYPING_STANDARD.md](../../reference/TYPING_STANDARD.md) - **MANDATORY** for public API typing
- Explicit union types required (e.g., `type ButtonVariant = "primary" | "secondary"`)
- CVA-derived types FORBIDDEN in public API
- Variant maps MUST use `satisfies Record<Type, string>` constraints

**A11Y Contract:**
- Document accessible name requirements
- Document ARIA props exposed in public API
- Reference: [A11Y_AUTHORITY.md](../../architecture/A11Y_AUTHORITY.md)

**Input Contract:**
- Document keyboard parity requirements
- Document Enter/Space semantics
- Reference: [INPUT_AUTHORITY.md](../../architecture/INPUT_AUTHORITY.md)

### **Scope Boundary (CRITICAL)**

⚠️ STEP 6 evaluates the **current API quality**, but must not declare the API final.

### **Step Completion Checklist**

Before proceeding to STEP 7, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 6 section exists
- [ ] Public API reviewed
- [ ] TYPING_STANDARD compliance verified (explicit union types, no CVA-derived types)
- [ ] A11Y contract documented (if interactive component)
- [ ] Input contract documented (if interactive component)
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

* **CVA Structure & Type Alignment (MANDATORY):**
  - ✅ Ensure CVA structure matches canonical variant/type layout (see `CVA_CANONICAL_STYLE.md`)
  - ✅ Verify explicit union types exist (see `TYPING_STANDARD.md`)
  - ✅ Verify `satisfies Record<Type, string>` constraints are present in CVA variant maps
  - ✅ Ensure no CVA-derived types leak into public API
  - ✅ Verify CVA structure supports explicit union types (variants inline, no intermediate objects)

### **Refactoring Guidance**

* Rewrite types for clarity.

* Treat types as part of the public contract.

### **Scope Boundary (CRITICAL)**

⚠️ STEP 7 must not declare the type system `optimal` or `final`.

### **Reference**

**Type System Standards:**

📖 [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md) - Size and variant type declarations
- Component must declare supported sizes explicitly (e.g., `type ButtonSize = "sm" | "md" | "lg"`)
- Component must declare supported variants explicitly (e.g., `type ButtonVariant = "primary" | "secondary" | ...`)
- No invented type names outside canonical dictionaries

**CVA Canonical Style Authority:**

📖 [CVA_CANONICAL_STYLE.md](../../architecture/CVA_CANONICAL_STYLE.md) - Canonical CVA structure pattern
- CVA structure must support explicit union types
- Variant maps must use `satisfies Record<Type, string>` constraints
- CVA structure must not leak into public API types
- **CVA Usage Decision Matrix** - Mandatory rules for tokenCVA vs cva selection

**CVA Usage Decision Matrix Validation:**
- ✅ Components with token-driven axes (variant, size, state) MUST use tokenCVA
- ✅ Components with only boolean/presentational flags MAY use cva
- ✅ Foundation components using cva MUST document explicit rationale

**Typing Standard:**

📖 [TYPING_STANDARD.md](../../reference/TYPING_STANDARD.md) - Explicit union types requirement
- Public props MUST reference explicit union types
- CVA-derived types are FORBIDDEN in public APIs
- Variant maps MUST be type-constrained with `satisfies Record<Type, string>`

**Common Type Patterns:**

✅ **Explicit Size/Variant Types:**
```typescript
export type ButtonSize = "sm" | "md" | "lg"; // Explicit GlobalSize subset
export type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive";
```

✅ **Props Interface:**
```typescript
export interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
}
```

✅ **CVA with Type Constraints:**
```typescript
export const buttonVariants = tokenCVA({
  variants: {
    variant: {
      primary: `${TOKENS.variant.primary.bg}`,
      secondary: `${TOKENS.variant.secondary.bg}`,
    } satisfies Record<ButtonVariant, string>, // Type constraint required
  },
});
```

❌ **Wide Types (Forbidden):**
```typescript
type ButtonSize = string; // Too wide, violates GlobalSize
type ButtonVariant = string; // Too wide, violates variant dictionary
```

❌ **Leaking Internal Machinery (Forbidden):**
```typescript
export type ButtonProps = VariantProps<typeof buttonVariants>; // Leaks CVA internal types
```

❌ **CVA Without Type Constraints (Forbidden):**
```typescript
export const buttonVariants = tokenCVA({
  variants: {
    variant: {
      primary: `${TOKENS.variant.primary.bg}`,
      secondary: `${TOKENS.variant.secondary.bg}`,
    }, // ❌ Missing satisfies Record<ButtonVariant, string>
  },
});
```

**STEP 7 validates that types are explicit, readable, aligned with canonical dictionaries, that CVA structure supports type system requirements, and that CVA type selection (tokenCVA vs cva) matches Decision Matrix. CVA structure violations, Decision Matrix violations, and TYPING_STANDARD violations are BLOCKERS.**

**TYPING_STANDARD Validation (MANDATORY):**
- ✅ Verify explicit union types exist for all variant/size props (no `string` types)
- ✅ Verify NO CVA-derived types in public API (`VariantProps<typeof variants>` forbidden)
- ✅ Verify variant maps use `satisfies Record<Type, string>` constraints
- ✅ Verify NO inline string unions in props (explicit types defined first)
- ✅ Reference: [TYPING_STANDARD.md](../../reference/TYPING_STANDARD.md)

### **Step Completion Checklist**

Before proceeding to STEP 8, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 7 section exists
- [ ] Type system reviewed
- [ ] TYPING_STANDARD compliance verified (explicit union types, no CVA-derived types, satisfies constraints)
- [ ] CVA structure validated for type alignment
- [ ] Type constraints (`satisfies Record<Type, string>`) verified in CVA variant maps
- [ ] Type issues documented in FIX backlog
- [ ] Model recommendation followed (Opus 4.5)
- [ ] Recommended checkpoint: Share audit report

---

## ✨ **11. STEP 8 — Intentional Refactor Pass**

### **Goal**

Perform a **final, focused quality sweep**.

### **Locked Component Exception Check (MANDATORY)**

**For LOCKED components:** Before deciding on refactor changes:

- Review [TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md](../policies/TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md) policy
- If changes violate lock policy, declare exception using [LOCKED_CHANGE_EXCEPTION_TEMPLATE.md](../policies/LOCKED_CHANGE_EXCEPTION_TEMPLATE.md)
- Document exception in audit report BEFORE proceeding to STEP 9
- Exception must include: reason, pipeline step, why lock is insufficient, risk assessment, rollback strategy

**Exception Declaration:** Must be completed in STEP 8 before any code changes in STEP 9.

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

### **Locked Component Guard (MANDATORY)**

**For LOCKED components:** Before applying ANY code changes:

- ✅ Verify exception declaration exists in audit report (from STEP 8)
- ✅ Verify exception follows [TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md](../policies/TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md) policy
- ✅ Verify change scope matches exception declaration (minimal delta only)
- ❌ **FORBIDDEN:** Changes without exception declaration
- ❌ **FORBIDDEN:** Changes exceeding exception scope

**Guard Enforcement:** If exception is missing or invalid, STOP and request exception declaration before proceeding.

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

### **CVA Normalization (MANDATORY)**

**If CVA structure deviates from canonical style, normalization is REQUIRED:**

- ✅ Normalize CVA structure to canonical pattern (see `CVA_CANONICAL_STYLE.md`)
- ✅ Remove intermediate variant objects
- ✅ Inline all variant definitions within CVA config
- ✅ Remove conditional logic from CVA config
- ✅ Ensure single tokenCVA invocation per variant set
- ✅ Verify `satisfies Record<Type, string>` constraints are present
- ✅ **Normalize CVA type if non-canonical** (tokenCVA vs cva decision per Decision Matrix)

**CVA Type Normalization Rules:**
- ✅ If component has token-driven axes (variant, size, state) → **MUST** use tokenCVA
- ✅ If component has only boolean/presentational flags → **MAY** use cva
- ✅ If Foundation component uses cva → **MUST** document explicit rationale in audit report
- ✅ If CVA type mismatch detected → **MUST** migrate to correct type before STEP 10

**Blocking Condition:** Component cannot proceed to STEP 10 if CVA structure is non-canonical OR if CVA type does not match Decision Matrix requirements.

**Reference:**

📖 [CVA_CANONICAL_STYLE.md](../../architecture/CVA_CANONICAL_STYLE.md) - Canonical CVA structure pattern, forbidden patterns, and CVA Usage Decision Matrix

### **FIX Sufficiency Criteria (REQUIRED)**

The FIX phase is considered complete **only** when the component is fully compliant

with all **existing system standards** applicable to its layer and scope.

This includes, but is not limited to:

- architectural and layering rules,

- token and styling constraints,

- public API and DX conventions,

- type system rules and exposure boundaries,

- **CVA canonical style compliance** (structure must match canonical pattern),

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
- [ ] CVA structure normalized to canonical style (if deviations existed)
- [ ] CVA type normalized per Decision Matrix (tokenCVA vs cva selection validated)
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

### **Reference (CRITICAL)**

**Storybook Quality Standard (MANDATORY):**

📖 [STORYBOOK_STORIES_STANDARD.md](../../reference/STORYBOOK_STORIES_STANDARD.md) - **MANDATORY** quality standard for all Storybook stories

**Storybook Quality Standard Requirements:**
- Title structure: `UI / {Layer} / {ComponentName}` (e.g., `UI / Foundation / Button`)
- All stories have JSDoc comments
- All stories have `parameters.docs.description.story`
- Layout parameter is correct (centered/padded/fullscreen)
- All public props in argTypes with descriptions
- Internal props hidden (`control: false`, `table: { disable: true }`)
- Story order follows canonical order (Default → SizesGallery → Matrix → States → LongContent → Use cases)

**Canonical Story Requirements:**

📖 [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md) - Canonical story names and requirements

**Strict Story Requirements:**

1. **Default Story** - **REQUIRED** for all components
   - Name: `Default` (canonical, MUST be first story)
   - Shows: Basic usage example
   - Must demonstrate component in typical use case

2. **Matrix Story** - **REQUIRED** ONLY when component publicly supports **BOTH** size AND variant props
   - Name: `Matrix` (canonical, no other names allowed)
   - Shows: All variants × all sizes grid
   - Components with only size OR only variant: Matrix NOT REQUIRED

3. **States Story** - **REQUIRED** ONLY when component has public states/interactive behavior
   - Name: `States` (canonical, no other names allowed)
   - Shows: All variants × all sizes × all states (default, disabled, loading, etc.)
   - Non-interactive components: States NOT REQUIRED

4. **SizesGallery Story** - **REQUIRED** when component exposes public `size` prop
   - Name: `SizesGallery` (canonical)
   - Shows: All supported sizes with text/icon/multi-line content
   - Reference: [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md)

5. **LongContent Story** - **REQUIRED** for Overlay components (Tooltip, Popover, etc.)
   - Name: `LongContent` (canonical)
   - Validates: padding and maxWidth token behavior with long text
   - Required regardless of whether `size` prop exists

**Story Naming Authority:**
- ✅ Use canonical names only: `Default`, `Matrix`, `States`, `SizesGallery`, `LongContent`
- ❌ Forbidden names: `VariantsMatrix`, `AllStates`, `SizeMatrix`, `StateVariations`, `Basic`, `Example`

**Common Violations:**
- ❌ Missing Default story (MUST be first story)
- ❌ Missing Matrix story when component has both size AND variant props
- ❌ Missing States story for interactive components
- ❌ Missing SizesGallery story for sized components
- ❌ Using non-canonical story names
- ❌ Incorrect title structure (not `UI / {Layer} / {ComponentName}`)
- ❌ Missing JSDoc comments on stories
- ❌ Missing `parameters.docs.description.story` on stories
- ❌ Missing or incomplete argTypes (all public props must be documented)
- ❌ Placeholder stories (single example only)

**Test Requirements:**

✅ **Required Coverage:**
- Public behavior and edge cases
- All variant combinations (if applicable)
- All size combinations (if applicable)
- State transitions (disabled, loading, etc.)
- Accessibility (keyboard navigation, ARIA attributes, screen reader behavior)

❌ **Forbidden Patterns:**
- Shallow tests (single "renders without crashing" test)
- Missing edge case coverage
- No accessibility tests

**STEP 10 validates that tests and Storybook provide executable proof of component contract.**

### **Step Completion Checklist**

Before proceeding to STEP 11, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 10 section exists
- [ ] Tests cover public behavior and edge cases
- [ ] Storybook demonstrates all variants and sizes
- [ ] Storybook includes meaningful interaction examples
- [ ] **Storybook Quality Standard compliance verified:**
  - [ ] Title structure: `UI / {Layer} / {ComponentName}`
  - [ ] Default story exists and is first story
  - [ ] Canonical story names used (Matrix, States, SizesGallery, LongContent)
  - [ ] All stories have JSDoc comments
  - [ ] All stories have `parameters.docs.description.story`
  - [ ] Layout parameter is correct (centered/padded/fullscreen)
  - [ ] All public props in argTypes with descriptions
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

* **A11Y Authority Requirements (MANDATORY):**
  - **Accessible names:**
    - Every interactive control MUST have accessible name
    - Icon-only buttons have aria-label
    - Form inputs have associated labels (htmlFor/aria-labelledby)
    - Modal overlays have aria-labelledby (via title)
    - Reference: [A11Y_AUTHORITY.md](../../architecture/A11Y_AUTHORITY.md)
  - **Semantic roles:**
    - Native semantic elements preferred (`<button>`, `<a>`, `<input>`, etc.)
    - Non-semantic elements MUST have `role` + `tabindex` + keyboard handlers if interactive
    - Redundant ARIA forbidden (e.g., `aria-disabled` on native `disabled` button)
    - Reference: [A11Y_AUTHORITY.md](../../architecture/A11Y_AUTHORITY.md)
  - **ARIA attributes:**
    - ARIA attributes MUST match component state (aria-checked, aria-invalid, aria-disabled)
    - ARIA attributes MUST NOT conflict with native semantics
    - ARIA state attributes MUST match component state
    - Reference: [A11Y_AUTHORITY.md](../../architecture/A11Y_AUTHORITY.md)

* **Focus Authority Requirements (MANDATORY):**
  - **Focus trap:**
    - Modal overlays: MUST trap focus
    - Non-modal overlays: MUST NOT trap focus
    - Focus trap MUST be invisible to screen readers
    - Reference: [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md)
  - **Focus restore:**
    - Modal overlays: MUST restore focus to trigger on close
    - Focus restore MUST be synchronous
    - Handle missing trigger gracefully
    - Reference: [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md)
  - **Tab order:**
    - DOM order = navigation order
    - Roving tabindex for composite controls (Tabs, Select, Menu, RadioGroup)
    - Positive tabindex forbidden
    - Reference: [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md)
  - **Focus-visible styling:**
    - `:focus-visible` pseudo-class MUST be used for focus rings
    - `:focus` alone MUST NOT be used for focus rings
    - Focus rings MUST be visible in all color modes
    - Reference: [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md)

* **Input Authority Requirements (MANDATORY):**
  - **Keyboard parity:**
    - Every pointer interaction MUST have keyboard equivalent
    - Enter/Space semantics correct for component type
    - Reference: [INPUT_AUTHORITY.md](../../architecture/INPUT_AUTHORITY.md)
  - **State blocking:**
    - Disabled state blocks all activation events (pointer + keyboard)
    - Loading state blocks pointer (if implemented)
    - Readonly state blocks changes, allows focus
    - Reference: [INPUT_AUTHORITY.md](../../architecture/INPUT_AUTHORITY.md)
  - **Enter/Space semantics:**
    - Button: Enter/Space activate
    - Checkbox/Switch/Radio: Space toggles
    - Link: Enter navigates, Space scrolls (native)
    - Form input: Enter submits (in form), Space inserts character
    - Reference: [INPUT_AUTHORITY.md](../../architecture/INPUT_AUTHORITY.md)

* **Accessibility-specific tests and Storybook stories:**
  - A11Y tests (accessible names, ARIA states, redundant ARIA prevention)
  - Focus tests (trap, restore, roving tabindex, tab order, focus-visible, Escape key)
  - Input tests (keyboard parity, Enter/Space semantics, disabled/loading/readonly blocking)

### **Reference (CRITICAL)**

**A11Y Authority:**

📖 [A11Y_AUTHORITY.md](../../architecture/A11Y_AUTHORITY.md) - Accessibility rules (accessible names, ARIA contracts, semantic roles)

**Focus Authority:**

📖 [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md) - Focus navigation rules (trap, restore, roving tabindex, tab order)

**Input Authority:**

📖 [INPUT_AUTHORITY.md](../../architecture/INPUT_AUTHORITY.md) - Input interaction rules (keyboard parity, Enter/Space semantics, state blocking)

### **Important Notes**

* This step may change code **only for accessibility correctness**.

* Public API changes are still prohibited unless explicitly agreed and documented.

### **Step Completion Checklist**

Before proceeding to STEP 12, verify:
- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 11 section exists
- [ ] **A11Y Authority requirements verified:**
  - [ ] Accessible names verified (every interactive control has accessible name)
  - [ ] Semantic roles correct (native elements preferred, redundant ARIA prevented)
  - [ ] ARIA attributes match component state
- [ ] **Focus Authority requirements verified:**
  - [ ] Focus trap implemented (modal overlays) or not implemented (non-modal overlays)
  - [ ] Focus restore implemented (modal overlays)
  - [ ] Tab order follows DOM order
  - [ ] Roving tabindex implemented (composite controls)
  - [ ] Focus-visible styling implemented
- [ ] **Input Authority requirements verified:**
  - [ ] Keyboard parity verified (every pointer interaction has keyboard equivalent)
  - [ ] Enter/Space semantics correct for component type
  - [ ] Disabled/loading/readonly state blocking verified
- [ ] A11Y-specific tests added (accessible names, ARIA states, redundant ARIA)
- [ ] Focus-specific tests added (trap, restore, roving tabindex, tab order, focus-visible, Escape)
- [ ] Input-specific tests added (keyboard parity, Enter/Space semantics, state blocking)
- [ ] A11Y-specific Storybook stories added
- [ ] Model recommendation followed (Codex Max)
- [ ] **MANDATORY checkpoint: Share audit report before STEP 12**

---

## 🔒 **15. STEP 12 — Final Review & Outcome Fixation + Architectural Lock**

### **Goal**

Formally conclude the pipeline and **lock the component status across all architectural authority documents**.

### **Recommended Model**

**GPT‑5.2** — Independent verification and final validation before locking.

### **Constraints**

- ✅ Lock propagation to ALL required files is **MANDATORY** (see Lock Propagation section).
- ✅ Missing any required lock file update is a **BLOCKING** condition.
- ✅ Pipeline completion requires verification of ALL lock file updates.
- 🚫 Cannot mark STEP 12 complete without lock propagation.
- 🚫 Cannot skip lock propagation for any component.

### **Mandatory Lock Propagation Rule (NON-NEGOTIABLE)**

🚫 **CRITICAL ENFORCEMENT:** Lock propagation to all required files is **MANDATORY** and **NON-NEGOTIABLE**.

**This step CANNOT be considered complete** unless lock propagation is verified in ALL required files listed below.

**Blocking Condition:** If any required lock file is not updated, STEP 12 is **INCOMPLETE** and the pipeline **CANNOT** be marked as finished.

**Verification Requirement:** The assistant MUST verify that all lock files have been updated before marking STEP 12 complete.

### **Actions**

* Verify that all previous steps are complete.

* Confirm code quality improvements.

* Record final state and decisions.

* **MANDATORY:** Perform Final Report Consistency Check before Lock Propagation (see Final Report Consistency Check section below).

* **MANDATORY:** Propagate lock status to ALL required files (see Lock Propagation section below).

### **Mandatory Final Report Consistency Check (CRITICAL)**

⚠️ **This phase is BLOCKING** and must be completed before Lock Propagation.

**Purpose:** Verify that the audit report is logically, terminologically, and factually consistent with the actual final state of the component before locking.

**Scope:** Audit report only. Codebase and implementation MUST NOT be modified at this stage.

**Execution Order:** This check MUST be performed before Lock Propagation. Lock Propagation cannot proceed if any consistency check fails.

**Required Checks:**

1. **CHECK_LOCK_STATUS** — Lock Status Consistency
   - Verify: Lock status is unified and matches final state (LOCKED / PROCESS LOCKED)
   - Forbidden: Contradictory statuses (e.g., NOT LOCKED in one section, LOCKED in another)
   - Action: If contradiction found → correct wording, ensure single consistent status throughout report

2. **CHECK_BASELINE_TO_FIX_LINK** — Baseline BLOCKER Resolution Traceability
   - Verify: Every BLOCKER recorded in baseline (STEP 5 or earlier) has explicit textual link to its resolution in STEP 9 or reclassification as Accepted Exception
   - Forbidden: BLOCKERS mentioned in baseline without resolution trace in STEP 9
   - Action: Add explicit links or reclassification documentation

3. **CHECK_STEP_9_ABSOLUTISM** — STEP 9 Absolutism Verification
   - Verify: Formulations like "All BLOCKERS resolved" are only acceptable with explanation for exceptions or reclassifications
   - Forbidden: Absolute claims without justification for any exceptions
   - Action: Add explanatory context for any exceptions

4. **CHECK_FILE_REALITY** — File Reality Verification
   - Verify: All file mentions (tests, stories, tokens) correspond to actual repository state
   - Forbidden: Mentions of "MISSING" if file exists, or claims of existence if file missing
   - Action: Verify files exist at mentioned paths, correct status claims

5. **CHECK_OUTCOME_LOGIC** — Outcome/Changes Logic Consistency
   - Verify: Outcome / Changes sections contain no logical contradictions (e.g., "Changes required" + "Changes: None")
   - Forbidden: Contradictory statements in outcome vs changes sections
   - Action: Align outcome statements with actual changes listed

6. **CHECK_EXPORT_DECISIONS** — Export Decision Documentation
   - Verify: If component is intentionally not exported, this is explicitly recorded as architectural decision
   - Forbidden: Silent non-export without documented reason
   - Action: Document export decisions explicitly

**Failure Policy:**

⚠️ **CRITICAL ENFORCEMENT:** STEP 12 completion is **BLOCKED** until ALL 6 checks pass. Any failure in any check prevents Lock Propagation and prevents STEP 12 from being marked as complete.

- **On Failure:** STEP 12 **CANNOT** be marked as complete. The pipeline **MUST NOT** proceed to Lock Propagation until all consistency checks pass.
- **Allowed Actions (Audit Report Only):**
  - Audit report wording correction (e.g., changing "NOT LOCKED" to "LOCKED" to match final state)
  - Terminology alignment (e.g., ensuring consistent use of "LOCKED" vs "PROCESS LOCKED")
  - Status clarification (e.g., adding explicit links from baseline BLOCKERS to STEP 9 resolution)
  - Adding explanatory context for absolute claims (e.g., "All BLOCKERS resolved" → "All BLOCKERS resolved (0 BLOCKERS found in baseline)")
  - Correcting file status claims (e.g., changing "MISSING tests" to "Tests created in STEP 10")
  - Aligning outcome statements with changes (e.g., changing "Changes required" to "No changes required" if Changes: None)
  - Documenting export decisions explicitly
- **Forbidden Actions:**
  - Code changes (component implementation, tests, stories)
  - Token changes (token definitions, token usage)
  - Reopening STEP 9 (cannot return to FIX phase)
  - Modifying lock files before consistency check passes

**Verification Checklist:**

⚠️ **MANDATORY:** Before proceeding to Lock Propagation, ALL 6 checks MUST be verified and explicitly documented in the audit report STEP 12 section. Each check must show either "✅ PASS" or "❌ FAIL" with correction applied.

**Verification Requirements:**

1. **CHECK_LOCK_STATUS** — Lock Status Consistency
   - **Verify:** Single consistent lock status throughout report (LOCKED / PROCESS LOCKED)
   - **Typical Contradiction:** "NOT LOCKED" in baseline (STEP 0) but "LOCKED" in STEP 12
   - **Fix:** Correct all mentions to match final state (e.g., change "NOT LOCKED" → "LOCKED" throughout report)
   - **Documentation:** Explicitly state final lock status in STEP 12 section
   - [ ] ✅ Verified: Single consistent lock status throughout report

2. **CHECK_BASELINE_TO_FIX_LINK** — Baseline BLOCKER Resolution Traceability
   - **Verify:** Every BLOCKER from baseline (STEP 0-7) has explicit textual link to resolution in STEP 9 or reclassification as Accepted Exception
   - **Typical Contradiction:** BLOCKER mentioned in STEP 5 (e.g., "Missing type constraints") without explicit link to STEP 9 resolution
   - **Fix:** Add explicit link in STEP 9 section (e.g., "Resolved BLOCKER from STEP 5: Added `satisfies Record<Type, string>` constraint")
   - **Documentation:** List all baseline BLOCKERS and their resolution status in STEP 12 section
   - [ ] ✅ Verified: All baseline BLOCKERS have resolution traces or explicit exception documentation

3. **CHECK_STEP_9_ABSOLUTISM** — STEP 9 Absolutism Verification
   - **Verify:** Formulations like "All BLOCKERS resolved" have explanatory context for any exceptions or reclassifications
   - **Typical Contradiction:** "All BLOCKERS resolved" without explanation when some were deferred or reclassified
   - **Fix:** Add explanatory context (e.g., "All BLOCKERS resolved (0 BLOCKERS found in baseline)" or "All BLOCKERS resolved; 2 NON-BLOCKERS deferred with justification")
   - **Documentation:** Explicitly state resolution status with context in STEP 12 section
   - [ ] ✅ Verified: Absolute claims have explanatory context

4. **CHECK_FILE_REALITY** — File Reality Verification
   - **Verify:** All file mentions (tests, stories, tokens) correspond to actual repository state
   - **Typical Contradiction:** "MISSING tests" in baseline (STEP 0) but tests created in STEP 10, or "Tests exist" but file missing
   - **Fix:** Verify files exist at mentioned paths, correct status claims (e.g., change "MISSING tests" → "Tests created in STEP 10: `src/Component/Component.test.tsx`")
   - **Documentation:** List all file statuses and verify against repository in STEP 12 section
   - [ ] ✅ Verified: All file mentions match repository state

5. **CHECK_OUTCOME_LOGIC** — Outcome/Changes Logic Consistency
   - **Verify:** Outcome / Changes sections contain no logical contradictions
   - **Typical Contradiction:** Outcome: "Changes required" but Changes: None, or Outcome: "No changes required" but Changes: "Added tests"
   - **Fix:** Align outcome statements with actual changes listed (e.g., if Changes: None, then Outcome: "No changes required")
   - **Documentation:** Explicitly verify outcome matches changes in STEP 12 section
   - [ ] ✅ Verified: No contradictions between outcome and changes sections

6. **CHECK_EXPORT_DECISIONS** — Export Decision Documentation
   - **Verify:** If component is intentionally not exported, this is explicitly recorded as architectural decision
   - **Typical Contradiction:** Component not exported from `src/index.ts` without documented reason
   - **Fix:** Document export decision explicitly (e.g., "Component intentionally not exported: Extension-only adapter per architecture rules")
   - **Documentation:** Explicitly state export decision and rationale in STEP 12 section
   - [ ] ✅ Verified: Export decisions explicitly documented

**All 6 checks MUST pass before Lock Propagation can proceed.**

**Completion Rule:** 

⚠️ **MANDATORY:** Final Report Consistency Check is complete **ONLY** when ALL 6 checks pass. Any failure in any check is **BLOCKING** and prevents Lock Propagation.

**STEP 12 is considered complete ONLY after:**
1. All 6 consistency checks have passed (verified and documented in audit report)
2. All contradictions found during checks have been corrected in audit report
3. Lock Propagation has been completed (see Lock Propagation section below)
4. All items in Step Completion Checklist (see below) have been verified

**This check is an integral part of STEP 12 completion process.** It cannot be skipped, deferred, or marked as "optional". The assistant executing STEP 12 MUST verify all 6 checks before proceeding to Lock Propagation. See Step Completion Checklist section for complete verification requirements.

### **Typical Contradictions & Fixes (REFERENCE)**

This section provides examples of common contradictions found in audit reports and how to fix them. Use this as a reference when performing Final Report Consistency Check.

#### **Contradiction 1: Lock Status Inconsistency**

**Problem:** Component status is "NOT LOCKED" in baseline (STEP 0) but "LOCKED" in STEP 12, or status changes between sections without explanation.

**Example:**
- STEP 0: "Status: NOT LOCKED"
- STEP 12: "Status: LOCKED" (without explanation of change)

**Fix:**
- Correct all mentions to match final state throughout report
- Add explicit statement in STEP 12: "Component status: LOCKED (locked in STEP 12 after pipeline completion)"

**Correct Formulation:**
```
STEP 0: "Status: NOT LOCKED (will be locked after pipeline completion)"
STEP 12: "Status: LOCKED (locked in STEP 12 after pipeline completion)"
```

#### **Contradiction 2: BLOCKER Without Resolution Trace**

**Problem:** BLOCKER mentioned in baseline (STEP 5 or earlier) without explicit link to its resolution in STEP 9.

**Example:**
- STEP 5: "❌ BLOCKER: Missing type constraints (`satisfies Record<Type, string>`)"
- STEP 9: "All BLOCKERS resolved" (without mentioning which BLOCKER was resolved)

**Fix:**
- Add explicit link in STEP 9 section: "Resolved BLOCKER from STEP 5: Added `satisfies Record<ButtonVariant, string>` constraint"
- Document in STEP 12: "All baseline BLOCKERS resolved: STEP 5 BLOCKER (type constraints) → resolved in STEP 9"

**Correct Formulation:**
```
STEP 5: "❌ BLOCKER: Missing type constraints"
STEP 9: "Resolved BLOCKER from STEP 5: Added `satisfies Record<ButtonVariant, string>` constraint"
STEP 12: "All baseline BLOCKERS resolved: STEP 5 BLOCKER (type constraints) → resolved in STEP 9"
```

#### **Contradiction 3: "All BLOCKERS resolved" Without Context**

**Problem:** Absolute claim "All BLOCKERS resolved" without explanation when some items were deferred or reclassified.

**Example:**
- STEP 9: "All BLOCKERS resolved"
- But FIX backlog shows: "2 NON-BLOCKERS deferred"

**Fix:**
- Add explanatory context: "All BLOCKERS resolved (0 BLOCKERS found in baseline; 2 NON-BLOCKERS deferred with justification)"
- Or: "All BLOCKERS resolved; 2 NON-BLOCKERS deferred (see Deferred section)"

**Correct Formulation:**
```
STEP 9: "All BLOCKERS resolved (0 BLOCKERS found in baseline). 2 NON-BLOCKERS deferred with justification (see Deferred section)"
```

#### **Contradiction 4: File Status Mismatch**

**Problem:** File mentioned as "MISSING" in baseline but created in STEP 10, or file claimed to exist but missing.

**Example:**
- STEP 0: "Tests: MISSING"
- STEP 10: "Tests created: `src/Component/Component.test.tsx`"
- STEP 12: Still mentions "MISSING tests" in baseline section

**Fix:**
- Update baseline section to reflect final state: "Tests: Created in STEP 10 (`src/Component/Component.test.tsx`)"
- Or add note: "Baseline: Tests MISSING → Created in STEP 10"

**Correct Formulation:**
```
STEP 0: "Tests: MISSING (will be created in STEP 10)"
STEP 10: "Tests created: `src/Component/Component.test.tsx`"
STEP 12: "File Reality Check: Tests exist at `src/Component/Component.test.tsx` (created in STEP 10)"
```

#### **Contradiction 5: Outcome/Changes Logic Mismatch**

**Problem:** Outcome states "Changes required" but Changes: None, or vice versa.

**Example:**
- STEP 5: "Outcome: Changes required"
- STEP 5: "Changes: None"

**Fix:**
- Align outcome with actual changes: If Changes: None, then Outcome: "No changes required"
- Or if changes were made: Outcome: "Changes applied" + list actual changes

**Correct Formulation:**
```
STEP 5: "Outcome: No changes required"
STEP 5: "Changes: None"
```

Or:

```
STEP 5: "Outcome: Changes applied"
STEP 5: "Changes: Added `satisfies Record<Type, string>` constraint to variant map"
```

#### **Contradiction 6: Silent Non-Export**

**Problem:** Component not exported from `src/index.ts` without documented architectural decision.

**Example:**
- Component exists but not in `src/index.ts` exports
- No explanation in audit report

**Fix:**
- Document export decision explicitly in STEP 12: "Component intentionally not exported: Extension-only adapter per architecture rules (see EXTENSION_STATE.md)"

**Correct Formulation:**
```
STEP 12: "Export Decision: Component intentionally not exported from `src/index.ts`. Rationale: Extension-only framework adapter per architecture rules. Component is exported from `src/EXTENSIONS/next/index.ts` for Next.js-specific usage."
```

### **Mandatory Lock Propagation (CRITICAL)**

⚠️ **This step is considered INCOMPLETE and BLOCKING** unless the locked status is propagated consistently to **ALL** required files listed below.

**Failure to update any required file is a PROCESS VIOLATION** and prevents pipeline completion.

**Required files (all components):**

- 📖 [docs/architecture/FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) — **MANDATORY** if component is Foundation layer
  - Add component to locked component list
  - Document lock date and version
  - **BLOCKING:** If Foundation component and this file is not updated → STEP 12 INCOMPLETE
  
- 📖 [docs/architecture/ARCHITECTURE_LOCK.md](../../architecture/ARCHITECTURE_LOCK.md) — **MANDATORY** for all components
  - Document architectural decisions made during pipeline
  - Record any conscious trade-offs or deferred changes
  - **BLOCKING:** If this file is not updated → STEP 12 INCOMPLETE
  
- 📖 [docs/PROJECT_PROGRESS.md](../../PROJECT_PROGRESS.md) — **MANDATORY** for all components
  - Update component status to "Locked" or "Foundation-Ready"
  - Record completion date
  - **BLOCKING:** If this file is not updated → STEP 12 INCOMPLETE
  
- `docs/reports/audit/<COMPONENT>_BASELINE_REPORT.md` — **MANDATORY** for all components
  - Complete STEP 12 section with final review outcome
  - Mark all previous steps as verified
  - **BLOCKING:** If this file is not updated → STEP 12 INCOMPLETE

**Additional files (if applicable):**

- 📖 [docs/architecture/EXTENSION_STATE.md](../../architecture/EXTENSION_STATE.md) — **MANDATORY** if component is Extension layer
  - Update component extension status
  - Document extension-specific decisions
  - **BLOCKING:** If Extension component and this file is not updated → STEP 12 INCOMPLETE

**Lock Propagation Checklist (ALL ITEMS REQUIRED):**
- [ ] FOUNDATION_LOCK.md updated (if Foundation component) — **MANDATORY**
- [ ] ARCHITECTURE_LOCK.md updated with decisions — **MANDATORY**
- [ ] PROJECT_PROGRESS.md updated with status — **MANDATORY**
- [ ] Component audit report STEP 12 completed — **MANDATORY**
- [ ] EXTENSION_STATE.md updated (if Extension component) — **MANDATORY**
- [ ] All lock documents consistent (no contradictions) — **MANDATORY**

**Note:** The component's layer (Foundation vs Extension) determines which lock files must be updated. Foundation components are locked in `FOUNDATION_LOCK.md`, Extension components are tracked in `EXTENSION_STATE.md`.

**Verification:** Lock propagation is verified by cross-checking all documents for consistency. Any contradiction between documents is a BLOCKING issue.

**Enforcement:** The assistant MUST verify completion of ALL checklist items before marking STEP 12 complete. Missing any item is a BLOCKING condition.

### **Outcome**

* Component accepted and locked (Foundation Lock),

* or explicitly marked for further iteration.

### **Step Completion Checklist**

**⚠️ CRITICAL:** Before marking pipeline complete, ALL items below MUST be verified. Missing any item is a BLOCKING condition.

- [ ] All 4 phases completed (Observe → Decide → Change → Record)
- [ ] Audit report STEP 12 section exists
- [ ] All previous steps (STEP 0-11) verified complete
- [ ] Code quality improvements confirmed
- [ ] **MANDATORY Final Report Consistency Check — ALL checks verified and documented:**
  - [ ] Final Report Consistency Check executed **BEFORE** Lock Propagation — **REQUIRED**
  - [ ] All 6 checks explicitly documented in audit report STEP 12 section with PASS/FAIL status — **REQUIRED**
  - [ ] All contradictions found during checks corrected in audit report — **REQUIRED**
  - [ ] CHECK_LOCK_STATUS: Lock status consistent throughout report — **REQUIRED**
  - [ ] CHECK_BASELINE_TO_FIX_LINK: All baseline BLOCKERS have resolution traces — **REQUIRED**
  - [ ] CHECK_STEP_9_ABSOLUTISM: Absolute claims have explanatory context — **REQUIRED**
  - [ ] CHECK_FILE_REALITY: File mentions match repository state — **REQUIRED**
  - [ ] CHECK_OUTCOME_LOGIC: No contradictions in outcome/changes — **REQUIRED**
  - [ ] CHECK_EXPORT_DECISIONS: Export decisions explicitly documented — **REQUIRED**
  - [ ] All 6 checks show ✅ PASS status — **REQUIRED** (any ❌ FAIL blocks completion)
- [ ] **MANDATORY Lock Propagation — ALL files verified:**
  - [ ] `docs/architecture/FOUNDATION_LOCK.md` updated (if Foundation component) — **REQUIRED**
  - [ ] `docs/architecture/ARCHITECTURE_LOCK.md` updated — **REQUIRED**
  - [ ] `docs/PROJECT_PROGRESS.md` updated — **REQUIRED**
  - [ ] `docs/reports/audit/<COMPONENT>_BASELINE_REPORT.md` STEP 12 completed — **REQUIRED**
  - [ ] `docs/architecture/EXTENSION_STATE.md` updated (if Extension component) — **REQUIRED**
  - [ ] All lock documents cross-checked for consistency — **REQUIRED**
- [ ] Model recommendation followed (GPT-5.2)
- [ ] **MANDATORY checkpoint: Final audit report shared**

**Completion Rule:** STEP 12 is considered complete ONLY when ALL checklist items are verified, including ALL lock file updates. Pipeline cannot be marked as finished without complete lock propagation.

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

### "Audit report consistency check failed"
**Problem:** One or more consistency checks failed in STEP 12.

**Solution:**
- Review failed check(s) and identify inconsistencies
- Correct audit report wording only (no code changes allowed)
- Re-run consistency checks
- Document corrections in audit report
- Cannot proceed to Lock Propagation until all checks pass

### "Model recommendation not followed"
**Problem:** Wrong AI model used for step.

**Solution:** 
- Check [AI Models Usage Guide](ai_models_usage_guide_for_pipeline_tung.md)
- Use recommended model for optimal results
- Document if different model used with justification

---

## 📚 Reference Examples

Successfully completed pipeline runs:

**Reference Components for Complex Controls:**
- **Button** (Foundation) - `docs/reports/audit/BUTTON_BASELINE_REPORT.md`
  - Foundation layer reference for complex controls
  - Complete token compliance (BUTTON_TOKENS)
  - Foundation Enforcement (no className/style props)
- **Slider** (Extension) - `docs/reports/audit/SLIDER_BASELINE_REPORT.md`
  - Extension layer reference for complex controls
  - Token migration pattern (cva → tokenCVA)
  - Token hole fixing (SLIDER_TOKENS, all raw values replaced)
  - Complex multi-part component pattern (root, track, range, thumb, marks)
  - Type system alignment (`satisfies Record<Type, string>`)

📖 [Component Examples Library](../../reference/COMPONENT_EXAMPLES.md) - Complete reference examples including **Button** (Foundation) and **Slider** (Extension)

**Other Completed Pipeline Runs:**
- **Tooltip:** `docs/reports/audit/TOOLTIP_BASELINE_REPORT.md`
- **Tabs:** `docs/reports/audit/TABS_BASELINE_REPORT.md`

These reports demonstrate:
- Complete STEP 0-12 structure
- Proper FIX backlog usage
- Checkpoint compliance
- Lock propagation
- Model recommendations followed

---

## 📚 Related Documents

### Authority Navigation

- 📖 [AUTHORITY_NAVIGATION.md](../../architecture/AUTHORITY_NAVIGATION.md) - Complete Authority map and question → authority mapping table

### State Authorities (WHAT/WHEN/HOW)

- 📖 [STATE_MATRIX.md](../../architecture/STATE_MATRIX.md) - WHAT states exist
- 📖 [INTERACTION_AUTHORITY.md](../../architecture/INTERACTION_AUTHORITY.md) - WHEN states activate
- 📖 [STATE_AUTHORITY.md](../../architecture/STATE_AUTHORITY.md) - HOW states represented

### Token Authorities

- 📖 [SPACING_AUTHORITY.md](../../architecture/SPACING_AUTHORITY.md) - Spacing token scale
- 📖 [TYPOGRAPHY_AUTHORITY.md](../../architecture/TYPOGRAPHY_AUTHORITY.md) - Typography tokens
- 📖 [RADIUS_AUTHORITY.md](../../architecture/RADIUS_AUTHORITY.md) - Border radius tokens
- 📖 [MOTION_AUTHORITY.md](../../architecture/MOTION_AUTHORITY.md) - Motion/animation tokens
- 📖 [ELEVATION_AUTHORITY.md](../../architecture/ELEVATION_AUTHORITY.md) - Elevation tokens

### Size & Variant Authorities

- 📖 [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md) - Global size scale and variant naming dictionary
- 📖 [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md) - Size-to-token mapping contract

### Structural Authorities

- 📖 [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) - Layout structure and flow

### Accessibility & Interaction Authorities

- 📖 [A11Y_AUTHORITY.md](../../architecture/A11Y_AUTHORITY.md) - Accessibility rules (accessible names, ARIA contracts, semantic roles)
- 📖 [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md) - Focus navigation rules (trap, restore, roving tabindex, tab order)
- 📖 [INPUT_AUTHORITY.md](../../architecture/INPUT_AUTHORITY.md) - Input interaction rules (keyboard parity, Enter/Space semantics, state blocking)

### Type System & Code Quality Standards

- 📖 [TYPING_STANDARD.md](../../reference/TYPING_STANDARD.md) - Explicit union types requirement (no CVA-derived types in public API)
- 📖 [CVA_CANONICAL_STYLE.md](../../architecture/CVA_CANONICAL_STYLE.md) - Canonical CVA structure pattern

### Storybook Standards

- 📖 [STORYBOOK_STORIES_STANDARD.md](../../reference/STORYBOOK_STORIES_STANDARD.md) - Quality standard for all Storybook stories (title structure, naming, documentation, layout, argTypes)

### Lock Documents

- 📖 [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Foundation layer lock status
- 📖 [ARCHITECTURE_LOCK.md](../../architecture/ARCHITECTURE_LOCK.md) - Architectural decisions lock
- 📖 [EXTENSION_STATE.md](../../architecture/EXTENSION_STATE.md) - Extension layer tracking

### Process Documents

- 📖 [TUNG System Specification](../tung_system_specification.md) - Task Unified Next-Gen system
- 📖 [AI Models Usage Guide](ai_models_usage_guide_for_pipeline_tung.md) - Model recommendations per step

### Architecture Context

- 📖 [ARCHITECTURE_CONTEXT.md](../../ARCHITECTURE_CONTEXT.md) - Global architecture overview
- 📖 [ARCHITECTURE_RULES.md](../../architecture/ARCHITECTURE_RULES.md) - Architectural rules and constraints

---

## 📝 Version History

* **v1.1** (2025-12-28): Canon Compliance & Modern Standards Integration
  * **ADDITION:** Added INPUT_AUTHORITY integration in STEP 4 (keyboard parity, Enter/Space semantics, state blocking)
  * **ADDITION:** Added A11Y_AUTHORITY requirements evaluation in STEP 5 (accessible names, semantic roles, ARIA contracts)
  * **ADDITION:** Added FOCUS_AUTHORITY requirements evaluation in STEP 5 (focus trap, restore, roving tabindex, tab order)
  * **ADDITION:** Added loading state evaluation in STEP 5 (loading blocking behavior, aria-busy)
  * **ADDITION:** Added TYPING_STANDARD reference in STEP 6 (explicit union types, no CVA-derived types)
  * **ADDITION:** Added A11Y contract requirements in STEP 6 (accessible names, ARIA props, semantic roles)
  * **ADDITION:** Added Input contract requirements in STEP 6 (keyboard parity, Enter/Space semantics, state blocking)
  * **ADDITION:** Enhanced TYPING_STANDARD validation in STEP 7 (explicit union types, satisfies constraints)
  * **ADDITION:** Integrated STORYBOOK_STORIES_STANDARD in STEP 10 (title structure, canonical names, documentation, layout, argTypes)
  * **ADDITION:** Expanded STEP 11 with A11Y/Focus/Input Authority requirements (comprehensive accessibility validation)
  * **ADDITION:** Added Pipeline Progress Tracker template in STEP 0 (STEP 0-12 checklist with estimated times)
  * **ADDITION:** Standardized audit report section format (Outcome, Blocking, Notes, Changes, Artifacts, Deferred)
  * **ADDITION:** Added new Authority Contracts to Related Documents (A11Y_AUTHORITY, FOCUS_AUTHORITY, INPUT_AUTHORITY, TYPING_STANDARD, STORYBOOK_STORIES_STANDARD)
  * **RATIONALE:** Ensures pipeline compliance with all canonical Authority Contracts and modern business application quality standards
  * **RISK LEVEL:** LOW (additive changes, improves compliance and quality, no breaking changes to existing pipeline flow)

---

## **Closing Note**

This pipeline exists to **prevent accidental complexity** and **raise the baseline quality** of the system over time.

Skipping steps or rushing execution will only reintroduce the problems this document is designed to eliminate.

**Pipeline completion time:** 8-10 hours for typical component (updated from 6-8 hours to reflect expanded requirements).

