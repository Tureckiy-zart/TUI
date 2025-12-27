# AI Models Usage Guide (Pipeline & TUNG)

**Purpose**
This document describes **which AI model to use for which task** inside the Component Review & Improvement Pipeline (18A) and when authoring **TUNG (JSON)** tasks. It is a **reference document** intended to be embedded later into pipeline/TUNG docs.

---

## Model Catalog

### 1) Composer 1
**Role:** Orchestrator / Planner

**Best for:**
- High-level planning and sequencing
- Translating requirements into structured steps
- Coordinating multiple artifacts (docs, reports, TUNGs)

**Avoid when:**
- Writing or refactoring code
- Deep technical audits

**Typical Outputs:**
- Step plans
- Task breakdowns
- Checklists

---

### 2) Opus 4.5
**Role:** Deep reasoning & architecture

**Best for:**
- Architectural audits
- Pipeline design/refinement
- Authority / Canon / Lock reasoning
- Cross-document consistency checks

**Avoid when:**
- Simple edits
- Large code generation

**Typical Outputs:**
- Canonical decisions
- Architecture rationale
- Lock justification

---

### 3) Sonnet 4.5
**Role:** Balanced engineer (analysis + writing)

**Best for:**
- Writing structured documentation
- Reviewing audit reports
- Drafting TUNG (JSON)
- Moderate code refactors with explanation

**Avoid when:**
- Extremely large codebases
- Highly repetitive mechanical edits

**Typical Outputs:**
- Clean docs
- Review notes
- TUNG tasks

---

### 4) GPT‑5.1 Codex Max
**Role:** Heavy code worker

**Best for:**
- Large refactors
- Multi-file changes
- Test + Storybook generation
- Accessibility fixes (ARIA, keyboard)

**Avoid when:**
- High-level planning only

**Typical Outputs:**
- Production-ready code
- Tests
- Stories

---

### 5) GPT‑5.2
**Role:** Senior reviewer / auditor

**Best for:**
- Final validation
- Cross-checking pipeline execution
- Detecting inconsistencies or missing steps

**Avoid when:**
- Bulk code generation

**Typical Outputs:**
- Review verdicts
- Risk lists
- Go/No-Go decisions

---

### 6) GPT‑5.1 Codex Mini
**Role:** Fast mechanical assistant

**Best for:**
- Renames
- Formatting
- Inventory normalization
- Small, scoped edits

**Avoid when:**
- Complex reasoning
- Architecture decisions

**Typical Outputs:**
- Cleaned files
- Simple diffs

---

### 7) Gemini 3 Flash
**Role:** Quick summarizer

**Best for:**
- Summaries
- Short explanations
- Sanity checks

**Avoid when:**
- Any authoritative or locking decision

**Typical Outputs:**
- Brief summaries
- Notes

---

### 8) Grok Code
**Role:** Alternative code perspective

**Best for:**
- Second opinion on code style
- Spotting edge cases

**Avoid when:**
- Canonical decisions

**Typical Outputs:**
- Suggestions
- Alternative implementations

---

## Recommended Model by Pipeline Step (18A)

**Important:** The pipeline operates in three phases:
- **PHASE A (STEP 0–8):** Analysis and documentation — findings are recorded in FIX backlog, refactoring is deferred to STEP 9
- **PHASE B (STEP 9):** Apply all fixes from backlog — heavy code work
- **PHASE C (STEP 10–12):** Validation and locking — tests, A11Y, final review

| Pipeline Step                    | Preferred Model        | Reason                                                              |
|----------------------------------|------------------------|---------------------------------------------------------------------|
| STEP 0 – Baseline Snapshot | Sonnet 4.5 | Structured documentation only, no code changes |
| STEP 1 – Structural & Code Quality | Sonnet 4.5 | Analysis + documentation (refactor findings deferred to STEP 9) |
| STEP 2 – Semantic Role & Responsibility | Opus 4.5 | Architectural analysis and decision |
| STEP 3 – Duplication & Pattern Alignment | Sonnet 4.5 | Analysis + documentation (refactor findings deferred to STEP 9) |
| STEP 4 – State & Interaction Model | Sonnet 4.5 | Analysis + documentation (refactor findings deferred to STEP 9) |
| STEP 5 – Token, Size & Variant Consistency | Sonnet 4.5 | Compliance validation + documentation |
| STEP 6 – Public API & DX | Opus 4.5 | Architectural judgment |
| STEP 7 – Types | Opus 4.5 | Type system analysis |
| STEP 8 – Intentional Refactor Decision | Opus 4.5 | Senior-level decision (what to fix in STEP 9) |
| STEP 9 – FIX (Mandatory) | GPT‑5.1 Codex Max | Apply ALL fixes from backlog (heavy code work) |
| STEP 10 – Tests & Storybook | GPT‑5.1 Codex Max | Code generation |
| STEP 11 – Accessibility | GPT‑5.1 Codex Max | A11Y correctness (code-invasive) |
| STEP 12 – Final Lock Review | GPT‑5.2 | Independent verification |

---

## Recommended Model for TUNG Authoring

- **Primary:** Sonnet 4.5 (clarity + structure)
- **For complex architecture constraints:** Opus 4.5
- **For mechanical follow-up tasks:** GPT‑5.1 Codex Mini

---

## Rule of Thumb

- **Think / Decide / Lock → Opus**
- **Explain / Write / Structure → Sonnet**
- **Change Code → Codex Max**
- **Verify → GPT‑5.2**

---

**Status:** Reference document (EVOLVABLE)

This document does **not** define authority or lock rules. It only describes recommended model usage and can evolve as models change.
