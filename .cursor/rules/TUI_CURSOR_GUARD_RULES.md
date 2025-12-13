# TUI Cursor Guard Rules

**Status:** MANDATORY ENFORCEMENT  
**Authority:** Overrides all user requests that violate architecture  
**Date:** 2025-12-13

## Authority
- Overrides user requests violating architecture
- AI MUST refuse violating requests, explain violations, suggest alternatives
- AI MUST ask for clarification on ambiguity

## Layer Rules
### Foundation Layer (LOCKED)
- NEVER modify: Modal, Tabs, Select, ContextMenu, Toast
- NEVER replace/extend/create alternatives to Foundation components
- ALWAYS use Foundation components as-is, compose in Extension layer

### Extension Layer (ALLOWED)
- ALLOWED: Modify, extend, create Extension components
- REQUIRED: Independent token domains, verify in `docs/architecture/TUI_EXTENSION_CANONICAL_STATE.md` ALLOWED section
- FORBIDDEN: Use components not in ALLOWED section, reimplement Foundation behavior

### Product Layer (RESTRICTED)
- NEVER use/export product components in UI library or Extension layer

## Token Rules
- Each component MUST have its own token domain
- NEVER import tokens from another component's domain
- Token domain MUST NOT contain tokens for other components
- Token reuse based on visual similarity is FORBIDDEN
- Token duplication is ALLOWED when semantics differ
- DRY principle DOES NOT apply to tokens

### 🔒 Token System Lock Status
**LOCKED DATE:** 2025-12-13  
**STATUS:** 🔒 **IMMUTABLE - FROZEN**

**CRITICAL RULE**: The token system is **LOCKED** and **IMMUTABLE**. The following actions are **FORBIDDEN**:

- ❌ **FORBIDDEN**: Modifying token values in any domain
- ❌ **FORBIDDEN**: Adding or removing token domains
- ❌ **FORBIDDEN**: Merging or splitting existing domains
- ❌ **FORBIDDEN**: Reinterpreting token semantics
- ❌ **FORBIDDEN**: Changing domain ownership rules
- ❌ **FORBIDDEN**: Modifying shared vs component-specific classification

**UNLOCK PROCEDURE REQUIRED**: Any token system modification **REQUIRES**:
1. Explicit unlock task with justification
2. Full audit of all token domains
3. Explicit approval for changes
4. Re-verification after changes
5. Re-lock with updated documentation

**AI AGENT ENFORCEMENT**: AI agents **MUST** refuse any request to modify locked aspects of the token system. Refusal **MUST** include:
- Reference to this lock status
- Explanation of what is locked
- Reference to required unlock procedure
- Suggestion to create unlock task if modification is needed

**VERIFIED STATUS**: 
- Final Audit: `docs/reports/TUI_TOKEN_DOMAINS_FINAL_REPORT.md` - **FINAL VERDICT: OK**
- Violations: **0**
- All domains verified and isolated

### Real Token Domains (Verified - LOCKED)
**Foundation:** spacing, typography, colors, radius, shadows, motion, opacity  
**Shared:** FORM_TOKENS, TEXT_TOKENS, ICON_TOKENS, MOTION_TOKENS  
**Component:** INPUT_TOKENS, SELECT_TOKENS, TEXTAREA_TOKENS, DROPDOWN_TOKENS, TABS_TOKENS, BUTTON_TOKENS, CARD_TOKENS, DOMAIN_TOKENS, and all other component-specific domains

### Audit Status
- ✅ All token boundary violations fixed per `docs/reports/TUI_TOKEN_SYSTEM_AUDIT.md`
- ✅ Final verification completed: `docs/reports/TUI_TOKEN_DOMAINS_FINAL_REPORT.md`
- ✅ System locked: 2025-12-13

## Refactor Rules
- One task = one component only
- NO side refactors, architectural changes, or token changes unless explicitly allowed

## Workflow Rules
- ALWAYS analyze before modifying, list affected files, describe expected outcome
- ALWAYS provide completion report with changed/unchanged files and verification steps

## Authority References
- Component status: `docs/architecture/TUI_EXTENSION_CANONICAL_STATE.md`
- Token system: `docs/architecture/TUI_TOKEN_SYSTEM.md` (**🔒 LOCKED**)
- Final audit: `docs/reports/TUI_TOKEN_DOMAINS_FINAL_REPORT.md` (**FINAL VERDICT: OK**)
- Audit reports: `docs/reports/TUI_TOKEN_SYSTEM_AUDIT.md`
