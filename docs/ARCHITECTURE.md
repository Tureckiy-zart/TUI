# Architecture

**Status:** ✅ **STABLE**  
**Purpose:** Primary architectural entrypoint for TenerifeUI  
**Audience:** Developers, maintainers, AI agents, reviewers

---

## 1. What This Architecture Is

TenerifeUI is a **system-first UI architecture** built for long-living React applications. It provides a token-driven design infrastructure that enforces consistency through architectural constraints rather than documentation or conventions.

This system solves the problem of design entropy at scale by establishing immutable foundations, canonical component contracts, and strict token-driven APIs. It is designed for teams who value architectural discipline over flexibility and prefer constraints that prevent drift.

**This is not a beginner-friendly UI library.** It is intentionally strict, intentionally constrained, and intentionally opinionated. The architecture itself is the product.

---

## 1.1. Current Development Mode

**Status:** ✅ **FEATURE DEVELOPMENT MODE**  
**Date:**  

The project operates in **Feature Development Mode**. Architecture is locked and stable. All work focuses on implementing product features, improving UX, and extending existing components within canonical layers.

**Working principles:**
- Architecture is a constraint, not a topic — treat it as immutable
- Features first — focus on user-facing behavior and developer ergonomics
- Prefer extension over creation — reuse existing components before inventing new ones
- Work within existing layers — PRIMITIVES, COMPOSITION, PATTERNS, DOMAIN

**If architectural changes are required:** Stop, propose unlock, do nothing else.

---

## 2. Core Architectural Principle

**The source of truth is the code in `src/`.  
If something does not exist there, it does not exist.**

This principle exists to prevent architectural drift. Documentation, Storybook stories, historical patterns, and file existence are not authoritative. Only the code in `src/` defines what the system actually provides.

If a component is not exported from `src/index.ts` and not listed in canonical state documents, it is not part of the system—regardless of whether files exist or stories are written.

---

## 3. The Layered Model (Overview)

TenerifeUI uses a five-layer architecture that separates concerns by purpose and mutability.

### FOUNDATION

**Purpose:** Immutable infrastructure layer providing canonical behavior and token definitions.

**What belongs:** Design tokens, theme system, utility libraries, and exactly five locked components (Modal, Tabs, Select, ContextMenu, Toast). All Foundation components delegate behavior to Radix UI and expose token-driven visual APIs. **Foundation Enforcement** (className/style exclusion) is **LOCKED / APPLIED** — Foundation components are visually closed by design.

**What does NOT belong:** Extension components, domain logic, business patterns, or any component that is not explicitly locked as Foundation.

**Status:** ✅ **LOCKED** — Foundation is immutable and closed for modifications. **Foundation Enforcement** is **FINAL / APPLIED** (see [FOUNDATION_CONTRACT.md](./architecture/FOUNDATION_CONTRACT.md)).

### PRIMITIVES

**Purpose:** Atomic UI components with no orchestration logic.

**What belongs:** Button, Input, Textarea, Checkbox, Radio, Switch, Badge, Alert, Heading, Text, Icon, and similar atomic components. These are self-contained, token-driven, and compose into higher-level patterns.

**What does NOT belong:** Layout composition, overlay infrastructure, orchestration logic, or components that manage complex state or interactions.

**Status:** ✅ **CANONICAL** — Primitives may evolve but must remain atomic.

### COMPOSITION

**Purpose:** Layout, overlays, and interaction orchestration.

**What belongs:** Layout components (Stack, Grid, Flex, Container, Card), all overlay components (Popover, Modal, Dialog, ContextMenu, Toast, Tooltip), navigation components (Tabs, Breadcrumbs, Pagination), and control components (Select).

**What does NOT belong:** Business logic, domain-specific patterns, or product-specific implementations.

**Status:** ✅ **CANONICAL** — Composition layer is the single source of truth for overlays and layout.

### PATTERNS

**Purpose:** Business and UI patterns that compose primitives and composition components.

**What belongs:** Card patterns (CardBase), form patterns, list patterns (DataList, Timeline), table patterns, state patterns (EmptyState, LoadingState), and menu patterns that compose overlays.

**What does NOT belong:** Overlay primitives (overlays live in COMPOSITION only), infrastructure components, or domain-specific product components.

**Status:** ✅ **CANONICAL** — Patterns may evolve but must not define overlay infrastructure.

### DOMAIN

**Purpose:** App-specific sections and product components.

**What belongs:** Domain-specific components like admin panels, auth forms, notification centers, section builders, and product-specific cards (EventCard, VenueCard, etc.).

**What does NOT belong:** Generic UI primitives, reusable patterns, or components that should be part of the public API.

**Status:** ✅ **CANONICAL** — Domain layer is for product-specific implementations only.

---

## 4. Canonical Decisions (Non-Negotiable)

These are not preferences. These are decisions.

**Overlays live in COMPOSITION only.** All overlay components (Popover, Modal, Dialog, ContextMenu, Toast, Tooltip) must be in `src/COMPOSITION/overlays/`. PATTERNS may compose overlays but cannot define overlay primitives.

**Tokens are governed by Authority Contracts.** All token domains, ownership rules, and semantic classifications are defined in Foundation Authority Contracts. Tokens cannot exist without active components. Foundation tokens must correspond to locked Foundation components.

**Dropdown is removed.** Dropdown components and tokens were removed (MIGRATION_12C). Use Select or ContextMenu instead. Reintroducing Dropdown is forbidden.

**Canonical toast hooks are `useLocalToast` and `useGlobalToast`.** Legacy `useToast` exports are deprecated. New code must use canonical hooks.

**Single source of overlay truth.** All overlays must be imported from `src/COMPOSITION/overlays/` canonical locations. Duplicate implementations or non-canonical paths are forbidden.

**Foundation is locked.** The five Foundation components (Modal, Tabs, Select, ContextMenu, Toast) are immutable. They cannot be modified, extended, or replaced without explicit unlock procedure.

---

## 5. What To Do When Adding Something New

**Check the layer hierarchy first.** Start with PRIMITIVES for atomic components, COMPOSITION for layout/overlays, PATTERNS for business patterns, DOMAIN for product-specific code. FOUNDATION is closed.

**Verify it does not exist.** Check `docs/architecture/TUI_EXTENSION_CANONICAL_STATE.md` for allowed components. Check `src/index.ts` for exports. If it exists but is not listed as ALLOWED, it is RESTRICTED.

**Ensure token compliance.** All visual props must use token union types. Raw strings, numbers, or CSS values are forbidden. Each component must have its own token domain.

**Verify canonical compliance.** Check `docs/architecture/CANONICAL_LOCK.md` for forbidden regressions. Ensure you are not reintroducing removed concepts or violating layer boundaries.

**Use Foundation components internally.** If your component is modal-like, tab-like, or select-like, compose the appropriate Foundation component. Do not reimplement Foundation behavior.

---

## 6. What NOT To Do

**Do not add tokens without components.** Foundation tokens must correspond to active components. Orphaned tokens are forbidden.

**Do not reintroduce removed concepts.** Dropdown, legacy Card in PRIMITIVES, and legacy useToast exports are explicitly forbidden. Check `docs/architecture/CANONICAL_LOCK.md` before adding anything.

**Do not add overlay infrastructure to PATTERNS.** Overlays live in COMPOSITION only. PATTERNS may compose overlays but cannot define overlay primitives.

**Do not create parallel implementations.** If a canonical component exists, use it. Do not create alternatives, duplicates, or "improved" versions of locked components.

**Do not bypass Foundation components.** Extensions must compose Foundation components internally. Using Radix primitives directly instead of Foundation components is forbidden.

**Do not modify Foundation components.** Foundation is locked and immutable. If you need different behavior, create an Extension that composes Foundation.

**Do not use components not listed as ALLOWED.** File existence does not grant permission. Only components explicitly listed in canonical state documents are allowed.

---

## 7. Canonical Documents (Where the Real Truth Lives)

**`docs/INTERNAL_CANONICAL_CONTEXT.md`** — Single source of truth for architecture, design philosophy, constraints, and development rules. This document overrides all other architectural documentation.

**`docs/architecture/CANONICAL_LOCK.md`** — Authoritative source for canonical architecture state and forbidden regressions. Defines what is locked, what is allowed, and what is explicitly forbidden.

**`docs/architecture/TUI_EXTENSION_CANONICAL_STATE.md`** — Defines which components are ALLOWED, RESTRICTED, or LOCKED. This document overrides file existence, Storybook stories, and historical usage.

**`docs/architecture/TUI_CURSOR_GUARD_RULES.md`** — Mandatory guard rules for AI/Cursor work. Defines enforcement rules, token system rules, and workflow requirements.

**`docs/architecture/FINAL_FOUNDATION_LOCK.md`** — Authoritative source for Foundation lock status. Defines the five locked Foundation components and their immutability rules.

**`docs/architecture/AUTHORITY_MAP.md`** — Navigation map for Authority Contracts. Lists all Authority Contracts and their domains (Interaction, State, Layout, Token, Spacing, Radius, Typography, Motion, Elevation).

---

## 8. Unlocking the Architecture (Explicit Process)

Changes are possible, but they require an explicit unlock.

**Foundation unlock:** Foundation components and Authority Contracts are immutable. Changes require explicit unlock procedure: justification, full audit, approval, implementation, and re-lock. See `docs/architecture/FINAL_FOUNDATION_LOCK.md` for unlock protocol.

**Canonical architecture unlock:** Architectural changes that violate `docs/architecture/CANONICAL_LOCK.md` require explicit unlock: unlock request, full audit, approval, implementation, and re-lock. See `docs/architecture/CANONICAL_LOCK.md` for unlock protocol.

**Undocumented changes are violations.** If a change is not documented in canonical documents or requires unlock but is not approved, it is considered an architectural violation and must be reverted.

**Extension layer is open.** Extensions (PRIMITIVES, COMPOSITION, PATTERNS, DOMAIN) may evolve without unlock, but must respect layer boundaries, token compliance, and canonical rules.

---

## Document Status

**Status:** ✅ **STABLE**  
**Version:** 1.0  
**Date Created:**  

This document is the primary architectural entrypoint. It is designed to remain stable over time. For detailed rules, constraints, and implementation guidance, refer to the canonical documents listed in Section 7.

---

**End of Architecture Document**

