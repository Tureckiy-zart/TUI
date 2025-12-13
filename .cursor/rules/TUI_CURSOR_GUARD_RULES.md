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
- Shared tokens ONLY for true shared design intent (FORM_TOKENS, TEXT_TOKENS, ICON_TOKENS, MOTION_TOKENS)
- Foundation tokens for basic utilities (spacing, typography, colors, radius, shadows, motion, opacity)
- DRY principle DOES NOT apply to tokens

## Refactor Rules
- One task = one component only
- NO side refactors, architectural changes, or token changes unless explicitly allowed

## Workflow Rules
- ALWAYS analyze before modifying, list affected files, describe expected outcome
- ALWAYS provide completion report with changed/unchanged files and verification steps

## Authority References
- Component status: `docs/architecture/TUI_EXTENSION_CANONICAL_STATE.md`
- Token system: `docs/architecture/TUI_TOKEN_SYSTEM.md`
- Audit reports: `docs/reports/TUI_TOKEN_SYSTEM_AUDIT.md`
