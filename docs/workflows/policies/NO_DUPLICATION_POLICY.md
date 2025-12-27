# No Duplication Policy

**Date Created:** 2025-12-22  
**Date Moved:** 2025-12-25  
**Status:** ✅ **CANONICAL**  
**Purpose:** Prevent duplication of rules and content across documentation

---

## Policy Statement

All future documentation must reference existing authorities instead of restating rules. When a rule is defined in a canonical Authority document, other documents must use cross-references rather than duplicating the rule text. This policy ensures single-source-of-truth maintenance, reduces contradiction risk, and simplifies updates when rules evolve. Documents may summarize rules for context, but must include explicit references to canonical sources using the format: "See [CANONICAL_DOC.md](./CANONICAL_DOC.md) 'Section Name' for complete rules." Documents that restate rules without references are considered violations and should be updated to add cross-references or remove duplicate content.

---

## Policy Details

### When to Reference vs Restate

**✅ DO:**

- Reference canonical source with section name
- Summarize rule briefly for context, then reference
- Use format: "See [CANONICAL_DOC.md](./CANONICAL_DOC.md) 'Section Name' for complete rules"
- Include rule in Related Documents section

**❌ DON'T:**

- Restate complete rule text without reference
- Create new rule definitions that conflict with existing authorities
- Duplicate rule text in multiple documents
- Create "summary" documents that become alternate sources of truth

### Acceptable Duplication Patterns

**✅ Acceptable:**

1. **Reference with Summary** - Brief summary for context, then explicit reference
2. **Example-Based Restatement** - Restating rule through examples (with reference)
3. **Integration Sections** - Documents that show how multiple authorities work together

**❌ Unacceptable:**

1. **Full Rule Restatement** - Copying complete rule text without reference
2. **Alternate Formulations** - Restating same rule in different words without reference
3. **Hidden Duplication** - Restating rules in different sections without acknowledgment

---

## Enforcement

### For New Documents

- Review checklist: Does this document restate any rules from Authority documents?
- If yes: Add explicit cross-reference or remove duplicate content

### For Existing Documents

- Audit identified documents needing cross-references (see Cross-Link Checklist)
- Update documents to add references or remove duplicates

---

## Related Documents

- [DOCUMENTATION_CANON_LOCK.md](../../architecture/DOCUMENTATION_CANON_LOCK.md) - Documentation structure rules
- [AUTHORITY_NAVIGATION.md](../../architecture/AUTHORITY_NAVIGATION.md) - Authority Contracts reference

