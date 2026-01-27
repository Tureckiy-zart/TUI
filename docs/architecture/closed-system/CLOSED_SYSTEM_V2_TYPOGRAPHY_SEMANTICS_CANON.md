# Closed System v2 — Typography Semantics Canon

**Package:** `@tenerife.music/ui`  
**Layer:** Foundation / Architecture  
**Phase:** J.1 — Typography Semantics  
**Status:** ✅ **CANONICAL**  
**Date Created:** 2026-01-27  
**Task ID:** TUI_CSV2_TYPOGRAPHY_SEMANTICS_CANON_022

---

## Purpose & Scope

This document formally defines the **semantic boundary of typography usage** in Closed System v2, clarifying when `Text.size` and `Text.tone` (or `typographyRole` + `color`) are allowed as semantic expression versus when they constitute presentational/layout misuse.

**This document eliminates agent ambiguity and prevents future architectural drift** by providing explicit rules for typography semantics.

### Scope

**In Scope:**
- Typography semantics for Text component
- Semantic vs presentational usage rules
- Explicit misuse patterns and anti-patterns
- Guidance for agents and consumers
- Canonical positioning within Closed System v2

**Out of Scope:**
- Code refactoring
- API changes
- Token changes
- ESLint rule implementation
- Retroactive fixes in consumer code

**Design Constraint:**
This is a **documentation-only canonical document**. No runtime code changes, no API modifications, no enforcement mechanisms. Focus is on clarifying semantic boundaries and preventing future misuse.

---

## Semantic Typography Definition

### Definition

**Semantic Typography** is typography that conveys meaning, content, or reading intent. It represents text that users read as primary or secondary content.

**Key Characteristics:**
- Conveys actual content meaning
- Serves reading intent (users read this text)
- Represents primary or secondary content
- Has semantic value beyond visual appearance

### Allowed Controls

Semantic typography may use:
- `size` prop: `xs`, `sm`, `md`, `lg`, `xl` (typography scale)
- `tone` prop: `default`, `muted` (deprecated, use `typographyRole` + `color` instead)
- `typographyRole` + `color` props: Role-based color system (preferred)

### Allowed Examples

**Body Text (Semantic):**
```tsx
<Text size="md">Article description</Text>
<Text size="sm">Product summary</Text>
<Text typographyRole="body" color="primary">Main content</Text>
```

**Reading Intent (Semantic):**
```tsx
<Text size="sm" typographyRole="body" color="secondary">Article summary</Text>
<Text size="md">User-generated content</Text>
<Text typographyRole="body" color="primary">Readable description</Text>
```

**Rationale:** These examples represent content that users read. The size and color choices reflect semantic hierarchy (primary vs secondary content), not visual compression or layout effects.

---

## Presentational Typography Definition (FORBIDDEN)

### Definition

**Presentational Typography** is typography used to achieve visual hierarchy, compression, or UI layout effects. It represents text styling applied for visual reasons rather than semantic meaning.

**Key Characteristics:**
- Used for visual hierarchy (making things smaller/muted for layout)
- Used for UI compression (fitting more information in less space)
- Used for visual de-emphasis without semantic meaning
- Represents metadata, labels, counters, or auxiliary information styled for layout reasons

### Status: FORBIDDEN

**Presentational typography is architecturally forbidden** in Closed System v2, even though TypeScript types may allow it. Using `Text.size` or `Text.tone` (or `typographyRole` + `color`) for presentational purposes is an **architectural violation**.

### Misuse Indicators

The following patterns indicate presentational typography misuse:

1. **Metadata Labels:**
   - Genre labels, category tags, type indicators
   - These are UI labels, not readable content

2. **Secondary UI Hints:**
   - Tooltips, helper text used for visual hierarchy
   - Status indicators styled for compression

3. **Counters:**
   - Follower counts, view counts, like counts
   - Numeric metadata, not readable content

4. **Auxiliary Information:**
   - Timestamps, status indicators used for compression
   - Information styled smaller/muted for layout reasons

5. **Visual De-emphasis Without Semantic Meaning:**
   - Making text smaller/muted to fit layout
   - Using size/tone to create visual hierarchy without content meaning

### Forbidden Examples

**Metadata Labels (FORBIDDEN):**
```tsx
// ❌ FORBIDDEN: Metadata label, not readable content
<Text size="xs" typographyRole="meta" color="muted">Genres</Text>
<Text size="sm" typographyRole="meta" color="muted">Category</Text>
```

**Counters (FORBIDDEN):**
```tsx
// ❌ FORBIDDEN: Counter, not readable content
<Text size="sm" typographyRole="meta" color="muted">Followers</Text>
<Text size="xs" typographyRole="meta" color="muted">1.2K views</Text>
```

**Auxiliary Information (FORBIDDEN):**
```tsx
// ❌ FORBIDDEN: Timestamp styled for compression
<Text size="xs" typographyRole="meta" color="muted">2 hours ago</Text>
```

**Rationale:** These examples use typography for visual compression and layout effects, not for semantic content meaning. They represent UI metadata, not readable content.

---

## Allowed Usage Patterns

### Pattern 1: Body Text Content

**Allowed:**
```tsx
<Text size="md">Article description</Text>
<Text size="sm">Product summary</Text>
<Text typographyRole="body" color="primary">Main content</Text>
```

**Rationale:** Body text represents readable content. Size choices reflect semantic hierarchy (primary vs secondary content), not visual compression.

### Pattern 2: Secondary Content

**Allowed:**
```tsx
<Text size="sm" typographyRole="body" color="secondary">Article summary</Text>
<Text size="md" typographyRole="body" color="secondary">Supporting text</Text>
```

**Rationale:** Secondary content is still readable content. Using `color="secondary"` reflects semantic emphasis (less prominent but still readable), not visual de-emphasis.

### Pattern 3: Semantic Hierarchy

**Allowed:**
```tsx
<Text size="lg">Primary heading</Text>
<Text size="md">Body text</Text>
<Text size="sm">Supporting text</Text>
```

**Rationale:** Size choices reflect semantic hierarchy (importance of content), not visual compression or layout effects.

---

## Forbidden Usage Patterns

### Pattern 1: Metadata Labels

**Forbidden:**
```tsx
// ❌ FORBIDDEN: Metadata label, not readable content
<Text size="xs" typographyRole="meta" color="muted">Genres</Text>
<Text size="sm" typographyRole="meta" color="muted">Category</Text>
<Text size="xs" typographyRole="meta" color="muted">Tags</Text>
```

**Rationale:** Metadata labels are UI elements, not readable content. They should not use Text component with size/tone for visual compression.

**Canonical Replacement:** Use appropriate UI components for metadata labels (Badge, Label, etc.) or semantic HTML elements with appropriate styling.

### Pattern 2: Counters

**Forbidden:**
```tsx
// ❌ FORBIDDEN: Counter, not readable content
<Text size="sm" typographyRole="meta" color="muted">Followers</Text>
<Text size="xs" typographyRole="meta" color="muted">1.2K views</Text>
<Text size="sm" typographyRole="meta" color="muted">Likes</Text>
```

**Rationale:** Counters are numeric metadata, not readable content. They should not use Text component with size/tone for visual compression.

**Canonical Replacement:** Use appropriate UI components for counters or semantic HTML elements with appropriate styling.

### Pattern 3: Auxiliary Information

**Forbidden:**
```tsx
// ❌ FORBIDDEN: Timestamp styled for compression
<Text size="xs" typographyRole="meta" color="muted">2 hours ago</Text>
<Text size="sm" typographyRole="meta" color="muted">Status: Active</Text>
```

**Rationale:** Auxiliary information styled smaller/muted for layout reasons is presentational typography, not semantic typography.

**Canonical Replacement:** Use appropriate UI components for timestamps/status or semantic HTML elements with appropriate styling.

### Pattern 4: Visual Compression

**Forbidden:**
```tsx
// ❌ FORBIDDEN: Using size to compress UI
<Text size="xs">Fitting more text in less space</Text>
<Text size="sm" tone="muted">Visual de-emphasis for layout</Text>
```

**Rationale:** Using size/tone to compress UI or create visual hierarchy without semantic meaning is presentational typography.

**Canonical Replacement:** Use appropriate layout components (Stack, Row, Grid) for spacing and layout, not typography for compression.

---

## Anti-Patterns and Misuse Indicators

### Anti-Pattern 1: Typography as Layout

**Misuse:** Using `Text.size` or `Text.tone` to achieve layout effects (compression, spacing, visual hierarchy).

**Indicators:**
- Text is smaller/muted to fit more information in less space
- Text styling is chosen for visual reasons, not content meaning
- Text represents UI metadata, not readable content

**Example:**
```tsx
// ❌ FORBIDDEN: Typography used for layout compression
<Text size="xs" typographyRole="meta" color="muted">Genres</Text>
```

### Anti-Pattern 2: Metadata as Typography

**Misuse:** Using Text component with size/tone for metadata labels, counters, or auxiliary information.

**Indicators:**
- Text represents metadata (genres, categories, tags)
- Text represents counters (followers, views, likes)
- Text represents auxiliary information (timestamps, status indicators)

**Example:**
```tsx
// ❌ FORBIDDEN: Metadata styled as typography
<Text size="sm" typographyRole="meta" color="muted">Followers</Text>
```

### Anti-Pattern 3: Visual De-emphasis Without Semantic Meaning

**Misuse:** Using `Text.tone="muted"` or `color="muted"` to create visual hierarchy without semantic meaning.

**Indicators:**
- Text is muted for visual reasons, not content meaning
- Text represents UI hints styled for compression
- Text styling is chosen for layout, not readability

**Example:**
```tsx
// ❌ FORBIDDEN: Visual de-emphasis without semantic meaning
<Text size="xs" typographyRole="meta" color="muted">Category</Text>
```

### Anti-Pattern 4: Size Compression for Layout

**Misuse:** Using `Text.size="xs"` or `Text.size="sm"` to compress UI elements or fit more information.

**Indicators:**
- Text is smaller to fit layout constraints
- Text size is chosen for visual compression, not content hierarchy
- Text represents UI elements, not readable content

**Example:**
```tsx
// ❌ FORBIDDEN: Size compression for layout
<Text size="xs">Fitting more text in less space</Text>
```

---

## Agent Guidance

### Decision Rules

**Rule 1: Is this content that users read?**
- ✅ **YES** → Semantic typography (ALLOWED)
- ❌ **NO** → Presentational typography (FORBIDDEN)

**Rule 2: Is this for visual hierarchy/layout?**
- ✅ **YES** → Presentational typography (FORBIDDEN)
- ❌ **NO** → Semantic typography (ALLOWED)

**Rule 3: Is this metadata, counter, or auxiliary information?**
- ✅ **YES** → Presentational typography (FORBIDDEN)
- ❌ **NO** → Semantic typography (ALLOWED)

### Decision Tree

```
Is this content that users read?
├─ YES → Is this for visual hierarchy/layout?
│  ├─ YES → FORBIDDEN (Presentational)
│  └─ NO → ALLOWED (Semantic)
└─ NO → FORBIDDEN (Presentational)
```

### Common Mistakes

**Mistake 1: Using Text for metadata labels**
```tsx
// ❌ WRONG: Metadata label
<Text size="xs" typographyRole="meta" color="muted">Genres</Text>

// ✅ CORRECT: Use appropriate UI component
<Badge variant="outline">Genres</Badge>
```

**Mistake 2: Using Text for counters**
```tsx
// ❌ WRONG: Counter
<Text size="sm" typographyRole="meta" color="muted">Followers</Text>

// ✅ CORRECT: Use appropriate UI component or semantic HTML
<span className="text-sm text-muted">Followers</span>
```

**Mistake 3: Using Text for visual compression**
```tsx
// ❌ WRONG: Visual compression
<Text size="xs">Fitting more text</Text>

// ✅ CORRECT: Use layout components for spacing
<Stack spacing="xs">
  <Text size="md">Content</Text>
</Stack>
```

### Reference Authority

**This document is canonical and authoritative.** Agents must:
- Reference this document for typography semantics decisions
- Not infer missing rules
- Not extend Closed System v2 implicitly
- Treat this document as final authority

**No inference allowed:** If a pattern is not explicitly allowed in this document, it is forbidden. Do not assume patterns are allowed based on TypeScript types or runtime behavior.

---

## Architectural Violation Status

### Violation Definition

Using `Text.size` or `Text.tone` (or `typographyRole` + `color`) for presentational purposes is an **architectural violation**, even if:
- TypeScript types allow it
- Runtime code accepts it
- No ESLint rule prevents it

**Violation Status:** Architectural violation (not a type error, not a runtime error, but an architectural violation).

### Enforcement

**Current Status:** Documentation-only (no enforcement mechanisms).

**Future Enforcement (Explicitly Deferred):**
- Phase J.2 — Optional ESLint advisory rule (warn-only)
- Phase K — Gradual consumer migration (if desired)

**Rationale:** Enforcement is explicitly deferred to prevent premature refactors and agent confusion. This document freezes typography semantics at the documentation level.

---

## Relationship to Closed System v2 Principles

### Single Expression Surface

Typography intent must be expressed through semantic typography only. Presentational typography violates Single Expression Surface by using typography for layout effects.

### Deterministic Rendering

Semantic typography ensures deterministic rendering: same content intent → same typography result. Presentational typography introduces non-deterministic visual effects.

### No Hidden Channels

Typography semantics must be explicit. Using typography for layout effects creates hidden channels that bypass layout components.

### Contract Completeness

This document completes the typography contract by explicitly defining semantic boundaries. Presentational typography is excluded from the contract.

---

## Related Documents

### Closed System v2 Documents

- [CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md](./CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md) — Closed System v2 principles
- [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](./CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md) — Layout Semantics Canon (Phase H)
- [CLOSED_SYSTEM_V2_CANON_INDEX.md](./CLOSED_SYSTEM_V2_CANON_INDEX.md) — Canonical documentation index

### Typography Documents

- [TYPOGRAPHY_AUTHORITY.md](../TYPOGRAPHY_AUTHORITY.md) — Typography Authority Contract (LOCKED)
- [TYPOGRAPHY_CONTRACT.md](../TYPOGRAPHY_CONTRACT.md) — Typography Foundation Contract
- [TYPOGRAPHY_COLOR_POLICY_v1.md](../typography/TYPOGRAPHY_COLOR_POLICY_v1.md) — Typography Color Policy v1 (CANON)

### Phase I Findings

- [CLOSED_SYSTEM_V2_PHASE_I_VIOLATION_MAPPING.md](../../reports/CLOSED_SYSTEM_V2_PHASE_I_VIOLATION_MAPPING.md) — Consumer violation patterns

---

## Final Statement

**This document formally defines typography semantics boundaries in Closed System v2.**

**After canonicalization:**
- ✅ Typography semantics are explicitly defined
- ✅ Semantic vs presentational boundaries are clear
- ✅ Misuse patterns are documented
- ✅ Agent guidance is unambiguous
- ✅ No unresolved ambiguity around Text.size / Text.tone usage

**Canonical Status:** ✅ **CANONICAL**

**This document is the authoritative source of truth for typography semantics in Closed System v2.**

---

**Last Updated:** 2026-01-27  
**Canonical Document Version:** 1.0  
**Task ID:** TUI_CSV2_TYPOGRAPHY_SEMANTICS_CANON_022
