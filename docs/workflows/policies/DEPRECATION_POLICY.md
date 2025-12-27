# Deprecation Policy

**Date Created:** 2025-12-25  
**Status:** ✅ **ACTIVE**  
**Purpose:** Define procedure for deprecating documents, components, APIs, or features

---

## Policy Statement

Deprecated items must be clearly marked with deprecation notices, include pointers to canonical sources, and be kept for historical reference. Cross-references must be updated to point to canonical sources.

---

## Deprecation Procedure

### Step 1: Add Deprecation Notice

**Requirement:** Add deprecation notice at top of document/item:

- ✅ Clear deprecation marker (e.g., 🕰️ **OUTDATED**)
- ✅ Date of deprecation
- ✅ Reason for deprecation
- ✅ Pointer to canonical source

**Format:**
```markdown
> 🕰️ **OUTDATED**: This document is superseded by [CANONICAL_DOC.md](./CANONICAL_DOC.md).
> 
> **Canonical Source:** [CANONICAL_DOC.md](./CANONICAL_DOC.md) - Description
> 
> This document is kept for historical reference only. All new work should reference the canonical document.
```

### Step 2: Include Exact Pointer Text

**Requirement:** Include exact pointer text to canonical source:

- ✅ Exact path to canonical source
- ✅ Clear description of canonical source
- ✅ Instructions for finding replacement

**Example:**
```markdown
**Canonical Source:** `docs/workflows/foundation/FOUNDATION_STEP_PIPELINE.md` - 18A Component Review & Improvement Pipeline (Refined)
```

### Step 3: Keep for Historical Reference

**Requirement:** Keep deprecated items for historical reference:

- ✅ Do NOT delete deprecated documents
- ✅ Keep deprecated items accessible
- ✅ Mark as deprecated but preserve content
- ✅ Allow historical context to remain

**Forbidden:**
- ❌ Deleting deprecated documents
- ❌ Removing deprecated content entirely
- ❌ Hiding deprecated items without notice

### Step 4: Update Cross-References

**Requirement:** Update any cross-references to point to canonical source:

- ✅ Find all references to deprecated item
- ✅ Update references to point to canonical source
- ✅ Update documentation links
- ✅ Update code comments if applicable

**Forbidden:**
- ❌ Leaving broken references
- ❌ Not updating documentation links
- ❌ Not updating code comments

---

## Deprecation Types

### Document Deprecation

**When:** Document is superseded by newer version or canonical source

**Procedure:**
1. Add deprecation notice at top
2. Include pointer to canonical source
3. Keep document for historical reference
4. Update all cross-references

**Example:**
- `old_FOUNDATION_STEP_PIPELINE.md` → `FOUNDATION_STEP_PIPELINE.md`

### API Deprecation

**When:** API is replaced by newer version or alternative

**Procedure:**
1. Mark API as deprecated in code/docs
2. Provide migration guide
3. Define deprecation timeline
4. Update all references

**Example:**
- Deprecated prop → New prop with migration guide

### Component Deprecation

**When:** Component is replaced by newer version or alternative

**Procedure:**
1. Mark component as deprecated
2. Provide migration guide
3. Define deprecation timeline
4. Update all references

**Example:**
- Legacy component → Canonical component with migration path

---

## Deprecation Notice Format

### Standard Format

```markdown
🧾 **ARCHIVED / DEPRECATED**  
**Canonical entrypoint:** [CANONICAL_PATH](./CANONICAL_PATH)  
**Reason:** [Reason for deprecation]  
**Date:** [YYYY-MM-DD]

---

[Original content preserved below]
```

### Alternative Format

```markdown
> 🕰️ **OUTDATED**: This [document/component/API] is superseded by [CANONICAL_NAME](./CANONICAL_PATH).
> 
> **Canonical Source:** [CANONICAL_PATH](./CANONICAL_PATH) - [Description]
> 
> This [item] is kept for historical reference only. All new work should reference the canonical [item].
```

---

## Examples

### Document Deprecation Example

**Deprecated Document:** `docs/workflows/foundation/old_FOUNDATION_STEP_PIPELINE.md`

**Deprecation Notice:**
```markdown
> 🕰️ **OUTDATED**: This document is superseded by [FOUNDATION_STEP_PIPELINE.md](./FOUNDATION_STEP_PIPELINE.md).
> 
> **Canonical Source:** [FOUNDATION_STEP_PIPELINE.md](./FOUNDATION_STEP_PIPELINE.md) - 18A Component Review & Improvement Pipeline (Refined)
> 
> This document is kept for historical reference only. All new work should reference the canonical pipeline document.
```

### API Deprecation Example

**Deprecated API:** `Text.variant` prop

**Deprecation Notice:**
```markdown
> 🕰️ **DEPRECATED**: The `variant` prop is deprecated. Use `muted` prop for muted text, or use semantic components for other semantic colors.
> 
> **Migration:** See [Migration Guide](../migrations/MIGRATION_V2_DEPRECATED_API_REMOVAL.md) for details.
> 
> **Removal Date:** v2.0.0
```

---

## Related Documents

- [NO_DUPLICATION_POLICY.md](./NO_DUPLICATION_POLICY.md) - No duplication policy
- [BREAKING_CHANGE_POLICY.md](./BREAKING_CHANGE_POLICY.md) - Breaking change policy
- [DOCUMENTATION_CANON_LOCK.md](../../architecture/DOCUMENTATION_CANON_LOCK.md) - Documentation structure rules

