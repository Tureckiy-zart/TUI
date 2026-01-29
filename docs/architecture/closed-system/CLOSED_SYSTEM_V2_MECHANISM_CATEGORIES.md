# Closed System v2 — Mechanism Categories (Phase C1)

**Package:** `@tenerife.music/ui`  
**Layer:** Foundation / Architecture (Mechanisms Design)  
**Phase:** C1 — Mechanism Categories  
**Status:** Canonical draft (design-only)  
**Scope constraint:** No API, no props, no types, no enforcement, no implementation

---

## 1. Purpose & Scope (C1 only)

### Purpose

Phase C1 defines **mechanism categories** for Closed System v2: a minimal, non-overlapping set of conceptual buckets that describe *what types of mechanisms* are allowed to implement the principles and boundaries from Phase B, and which are forbidden. The document remains strictly at the conceptual level. It is the sole input for Phase C2 (Principle → Mechanism mapping).

### Scope

**In scope:**

- Mechanism categories (5–8): names, purpose, responsibility boundaries.
- Conceptual definitions: inputs/outputs of each category (no API, no field names).
- Responsibility boundaries between categories.
- Forbidden mechanisms and why they violate the model.
- Traceability: Category → covered principles/boundaries (Phase B) and covered risks (Phase A).
- **Impact Surfaces:** runtime, compile-time, docs-governance as *levels* of effect—not as specific tools.

**Out of scope:**

- API contracts, prop names, interface shapes, concrete fields.
- TypeScript types, conditional types, component maps.
- ESLint rules, runtime guards, warnings.
- Token System v2 design or specific tokens.
- Sanctioned Escapes (list or interfaces).
- Implementation plans, refactor steps.
- Lists of specific components and their allow/deny lists.

### Authority & Inputs

- **Phase A:** [CLOSED_SYSTEM_V2_CANONICAL_PROBLEM_DEFINITION.md](./CLOSED_SYSTEM_V2_CANONICAL_PROBLEM_DEFINITION.md) — problem, violation classes, risks, responsibility boundaries.
- **Phase B:** [CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md](./CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md) — principles, boundary model, sanctioned flexibility, governance constraints.

### Impact Surfaces (Levels of Effect)

Mechanisms may exert effect at one or more of the following **levels**. These are conceptual tiers, not concrete tools:

- **Runtime:** effect during execution (behavior, render, state). Mechanisms operating at this level influence what happens when the UI runs.
- **Compile-time:** effect during build or static analysis, before execution. Mechanisms at this level influence what is accepted or rejected prior to run.
- **Docs-governance:** effect through documentation, examples, and governance processes. This level is the authoritative surface for humans and AI; mechanisms here shape interpretation and allowed practice.

A mechanism category may apply at a single level or span multiple levels. Concrete tooling is not named or specified in C1.

---

## 2. Mechanism Category List (Index)

| #   | Category                       | One-line purpose                                                                |
| --- | ------------------------------ | ------------------------------------------------------------------------------- |
| 1   | **Expression Surface**         | Where and how UI intent is expressed; single sanctioned surface.                |
| 2   | **Intent-Outcome Determinism** | One intent → one visual/behavioral outcome; no ambiguity.                       |
| 3   | **Channel Explicitness**       | All channels influencing render and behavior are explicit.                      |
| 4   | **Contract Coverage**          | Contracts cover all allowed UI changes; no gaps.                                |
| 5   | **Variation Governance**       | Variation only within formally defined boundaries.                              |
| 6   | **Documentation Authority**    | Documentation and examples are the sole authoritative source.                   |
| 7   | **Boundary Enforcement**       | Public vs Internal, Foundation vs consumer; clear separation.                   |

---

## 3. Category Definitions

### 3.1 Expression Surface

**Purpose:** This category governs *where* and *how* UI intent may be expressed. It ensures a single, sanctioned architectural surface for expressing UI; all variation must pass through it. No bypass or parallel surface is allowed.

**Covered Risks (Phase A):** Raw Utilities; Bypass Expression (Phase B anti-pattern).

**Covered Principles / Boundaries (Phase B):** Single Expression Surface; Public Component API Surface (conceptual); MUST "all UI expression through sanctioned surface"; MUST NOT "raw utilities or contract bypass."

**Conceptual Inputs:**

- Consumer intent to change or express UI.
- Definition of what counts as the sanctioned surface (from model, not from this document’s mechanics).

**Conceptual Outputs:**

- A single, well-defined sanctioned surface for UI expression.
- Exclusion of any alternate or bypass surface.

**Allowed Operations:**

- Restrict expression to one sanctioned surface.
- Reject or exclude expression that bypasses that surface.
- Clarify what belongs inside vs outside the surface.

**Forbidden Operations:**

- Allow multiple equivalent surfaces for the same intent.
- Tolerate bypass of the sanctioned surface.
- Introduce or legitimise raw utilities or low-level overrides that circumvent the surface.

---

### 3.2 Intent-Outcome Determinism

**Purpose:** This category ensures that a given intent maps to exactly one kind of visual and behavioral outcome. There must be no hidden paths that produce different results for the same intent.

**Covered Risks (Phase A):** Rendering Ambiguity.

**Covered Principles / Boundaries (Phase B):** Deterministic Rendering; Governance "examples must match Single Expression Surface and Deterministic Rendering"; SHOULD "limit ways to express one intent to a single path."

**Conceptual Inputs:**

- Expressed intents (from the Expression Surface).
- Rules that define the intent–outcome mapping.

**Conceptual Outputs:**

- A deterministic mapping: one intent → one outcome type.
- Absence of ambiguous or multiple equivalent paths for the same intent.

**Allowed Operations:**

- Enforce a single path from intent to outcome.
- Eliminate or forbid alternative paths that produce different results for the same intent.
- Reduce ambiguity in how intent is realised.

**Forbidden Operations:**

- Allow multiple equivalent ways to express the same intent with different outcomes.
- Introduce or permit hidden factors that change the outcome for the same intent.
- Create situational or contextual branches that break determinism without being part of the model.

---

### 3.3 Channel Explicitness

**Purpose:** This category ensures that every channel that can influence render or behavior is explicit in the architectural model. No hidden or implicit channels are permitted.

**Covered Risks (Phase A):** Prop Leakage; Implicit Override (Phase B anti-pattern); Implicit Escape Hatches (source of errors).

**Covered Principles / Boundaries (Phase B):** No Hidden Channels; Boundary Model (Public vs Internal); MUST NOT "prop leakage expanding public surface"; SHOULD "prevent new hidden influence channels."

**Conceptual Inputs:**

- Enumeration of allowed influence channels (from Contract Coverage and model).
- Definitions of Public vs Internal surfaces.

**Conceptual Outputs:**

- A closed, explicit set of influence channels.
- No implicit or undocumented channels.

**Allowed Operations:**

- Document and formalise every influence channel.
- Reject or remove channels that are implicit or undocumented.
- Align channel set with Contract Coverage and Variation Governance.

**Forbidden Operations:**

- Introduce or allow implicit channels of influence.
- Permit leakage of influence via undocumented or unbounded means.
- Create channels that are not described in the architectural surface.

---

### 3.4 Contract Coverage

**Purpose:** This category ensures that contracts for components and layers cover *all* allowed UI changes. There must be no gaps or zones of uncertainty that enable ad-hoc behaviour.

**Covered Risks (Phase A):** Incomplete Contracts (source of errors).

**Covered Principles / Boundaries (Phase B):** Contract Completeness; MUST "contracts fully describe allowed UI changes."

**Conceptual Inputs:**

- Allowed UI changes (from principles and sanctioned flexibility).
- Boundaries of what is in vs out of scope for each contract.

**Conceptual Outputs:**

- Complete contract coverage for allowed UI changes.
- No undefined or ambiguous regions in the contract space.

**Allowed Operations:**

- Extend or refine contracts until they cover all allowed changes.
- Close gaps where behaviour is unspecified.
- Make contract boundaries explicit.

**Forbidden Operations:**

- Leave allowed changes outside contract coverage.
- Allow contracts to be partial or optional in a way that enables bypass.
- Introduce mechanisms that rely on unspecified or ambiguous contract regions.

---

### 3.5 Variation Governance

**Purpose:** This category governs *how much* variation is allowed and *within what boundaries*. Variation is permitted only within formally defined limits: semantics-preserving, state-safe, and composition-safe.

**Covered Risks (Phase A):** (Indirectly: variation beyond boundaries fuels drift and ambiguity.)

**Covered Principles / Boundaries (Phase B):** Governed Flexibility; Sanctioned Flexibility Model (semantics-preserving, state-safe, composition-safe variation); MUST "variation consistent with Deterministic Rendering and Governed Flexibility."

**Conceptual Inputs:**

- Formal variation boundaries (from model).
- Definitions of semantics-preserving, state-safe, composition-safe.

**Conceptual Outputs:**

- Clear boundaries within which variation is allowed.
- Exclusion of variation that violates those boundaries.

**Allowed Operations:**

- Enforce variation within defined boundaries.
- Reject variation that changes semantics, introduces hidden state, or breaks composition responsibilities.
- Align with Contract Coverage and Channel Explicitness.

**Forbidden Operations:**

- Allow variation beyond formally defined boundaries.
- Permit semantics-changing, state-unsafe, or composition-unsafe variation.
- Create mechanisms that extend flexibility without updating the model.

---

### 3.6 Documentation Authority

**Purpose:** This category establishes documentation and examples as the *sole authoritative surface* for humans and AI. Docs must be unambiguous and must not demonstrate or encourage bypasses or hidden channels.

**Covered Risks (Phase A):** Agent-Confusion; Documentation Ambiguity; Documentation Mismatch (Phase B anti-pattern).

**Covered Principles / Boundaries (Phase B):** Agent-Safe Documentation; Governance Constraints (docs & examples); MUST "documentation unambiguous and architecturally safe"; MUST NOT "demonstrate bypasses"; Failure-Mode "any agent-confusing example must be removed or replaced."

**Conceptual Inputs:**

- Sanctioned surfaces and rules (from other categories).
- Governance constraints on examples and wording.

**Conceptual Outputs:**

- Documentation that accurately reflects the model.
- Examples that never demonstrate bypasses or hidden channels.
- Unambiguous guidance for both humans and AI.

**Allowed Operations:**

- Ensure docs and examples match the model.
- Remove or replace ambiguous or misleading content.
- Treat documentation as authoritative and enforce consistency with it.

**Forbidden Operations:**

- Show or endorse bypasses or implicit channels in examples.
- Allow documentation to contradict the model or create multiple valid interpretations.
- Introduce mechanisms that create a gap between docs and allowed behaviour.

---

### 3.7 Boundary Enforcement

**Purpose:** This category enforces the split between Public and Internal, and between Foundation and consumer. Public defines intent; Internal implements it and does not extend it. Foundation owns structure, semantics, and composition; certain decisions are never delegated to the consumer.

**Covered Risks (Phase A):** Polymorphism Drift.

**Covered Principles / Boundaries (Phase B):** Boundary Rule (Public defines intent, Internal implements, does not extend); Component Responsibility Boundaries; "never delegate" (render structure, implicit styling, internal rendering, polymorphic drift); MUST NOT "polymorphism that changes component semantics."

**Conceptual Inputs:**

- Definitions of Public vs Internal surfaces.
- Definitions of Foundation vs consumer responsibilities.

**Conceptual Outputs:**

- A clear, enforced separation between Public and Internal.
- A clear, enforced partition of responsibility between Foundation and consumer.
- No delegation of forbidden decisions to the consumer.

**Allowed Operations:**

- Enforce Public/Internal and Foundation/consumer boundaries.
- Reject mechanisms that blur these boundaries or delegate forbidden decisions.
- Prevent polymorphic or structural drift that breaks the model.

**Forbidden Operations:**

- Blur the Public/Internal boundary or allow Internal to extend intent.
- Delegate render-structure, implicit styling, or internal-rendering decisions to the consumer.
- Allow polymorphism or structural flexibility that changes semantics or breaks contracts.

---

## 4. Inter-Category Contracts (Conceptual)

The following rules describe how categories relate. All flows are conceptual; no API or data structures are implied.

**IC-1. Expression Surface → Intent-Outcome Determinism**  
Expression Surface produces *expressed intents*. Intent-Outcome Determinism consumes those intents and guarantees a single outcome type per intent. No category may create alternate intent sources that bypass Expression Surface.

**IC-2. Contract Coverage → Channel Explicitness and Variation Governance**  
Contract Coverage defines *what is covered* by contracts. Channel Explicitness uses this to define the allowed set of influence channels. Variation Governance uses it to define allowed variation boundaries. Neither Channel Explicitness nor Variation Governance may introduce channels or variation outside Contract Coverage.

**IC-3. Documentation Authority reflects all others**  
Documentation Authority consumes the outputs of all other categories. It must reflect sanctioned surfaces, deterministic intent–outcome mapping, explicit channels, contract coverage, variation boundaries, and Public/Internal and Foundation/consumer separation. It may not describe or exemplify anything that contradicts those.

**IC-4. No new channels without Channel Explicitness and Contract Coverage**  
No category may introduce or legitimise an influence channel that is not explicit in Channel Explicitness and not covered by Contract Coverage. Violations imply hidden channels and break No Hidden Channels.

**IC-5. No shared ownership of "single expression surface"**  
Responsibility for the single sanctioned expression surface belongs to Expression Surface only. Other categories must not duplicate or redefine it; they may consume or constrain it, but not create competing surfaces.

---

## 5. Forbidden Mechanism Patterns

The following **conceptual** patterns are forbidden. They lead to hidden channels, agent-confusion, or violation of Phase B principles. No specific technology or syntax is implied.

1. **Multiple equivalent ways to express the same intent**  
   Mechanisms that allow several interchangeable ways to express one intent violate Intent-Outcome Determinism and Single Expression Surface. They create ambiguity and undermine a single sanctioned path.

2. **Invisible or implicit influence channels**  
   Mechanisms that create or rely on influence channels not explicit in the model violate No Hidden Channels and Channel Explicitness. Prop leakage, implicit overrides, and implicit escape hatches fall into this pattern.

3. **Variation beyond formal boundaries**  
   Mechanisms that allow variation outside semantics-preserving, state-safe, and composition-safe boundaries violate Variation Governance and Governed Flexibility. They enable drift and contract erosion.

4. **Documentation–behaviour mismatch or bypass-promoting examples**  
   Mechanisms that create a gap between documentation and allowed behaviour, or that use examples to show bypasses or hidden channels, violate Documentation Authority and Agent-Safe Documentation. They fuel Agent-Confusion.

5. **Blurring Public/Internal or delegating forbidden decisions**  
   Mechanisms that blur the Public/Internal boundary, let Internal extend intent, or delegate render-structure, implicit styling, or internal-rendering decisions to the consumer violate Boundary Enforcement and the Boundary Rule. They enable Polymorphism Drift and contract blurring.

6. **Overlapping or duplicated category responsibility**  
   Mechanisms that duplicate responsibility across categories or create ambiguity about "who owns what" cause agent-confusion and contract blurring. Each category has a distinct role; overlap undermines the model.

---

## 6. Non-Goals (C1)

The following are **explicitly out of scope** for Phase C1 and deferred as stated:

**Deferred to Phase C2:**

- Principle → Mechanism mapping (traceability).
- Assigning concrete mechanisms to categories.
- Any "gate" or gating decisions that depend on that mapping.

**Deferred to Phase C3 (if applicable):**

- Further refinement of gates or gating logic, if the workflow treats them separately from C2.

**Deferred to Phase D:**

- API contracts, prop names, interface shapes, concrete fields.
- TypeScript types, conditional types, component maps.
- Enforcement tooling.
- Implementation, refactors, runtime changes.
- Token System v2 design or specific tokens.
- Sanctioned Escapes (design, list, or interfaces).
- Lists of specific components and their allow/deny lists.

---

## 7. C1 Output Contract (Readiness for C2)

Phase C2 (Principle → Mechanism mapping) may start only when the following are satisfied:

**Required artifact:**

- This document, [CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md](./CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md), accepted as the canonical Phase C1 deliverable.

**Required content in the document:**

- **Purpose & Scope (C1 only):** role of C1, in/out of scope, references to Phase A and Phase B as inputs.
- **Impact Surfaces:** runtime, compile-time, docs-governance defined as levels (not tools).
- **Mechanism Category List (index):** full list of 5–8 categories with one-line purpose each.
- **Category Definitions:** for each category, Purpose; Covered Risks (Phase A); Covered Principles/Boundaries (Phase B); Conceptual Inputs; Conceptual Outputs; Allowed Operations; Forbidden Operations.
- **Inter-Category Contracts:** conceptual rules for what may flow between categories and what is forbidden.
- **Forbidden Mechanism Patterns:** conceptual anti-patterns addressing hidden channels and agent-confusion.
- **Non-Goals (C1):** explicit deferrals to C2, C3, and Phase D.
- **C1 Output Contract:** this section, stating artifacts required for C2 readiness.

**Definition of Done for C1:**

- This document is approved as the canonical Phase C1 output.
- Transition to **TUI_CSV2_PHASE_C2_PRINCIPLE_TO_MECHANISM_MAPPING_005** is permitted.

---

## Exit Criteria for Phase C1

- A minimal, non-overlapping set of 5–8 mechanism categories is defined.
- Each category has a clear purpose, covered risks, covered principles/boundaries, conceptual inputs/outputs, and allowed/forbidden operations.
- Inter-category contracts are explicit and conceptual.
- Forbidden mechanism patterns are listed and tied to hidden channels and agent-confusion.
- Non-Goals and C1 Output Contract are documented.
- The document contains no API, props, types, enforcement tooling, or implementation detail.
- The document is the sole authorised input for Phase C2.
