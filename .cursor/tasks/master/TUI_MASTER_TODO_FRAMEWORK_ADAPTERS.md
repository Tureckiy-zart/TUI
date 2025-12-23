# Framework Adapter Layer — Master Plan

> **ID:** TUI_MASTER_TODO_FRAMEWORK_ADAPTERS
> **Priority:** P2
> **Status:** ACTIVE
> **Scope:** Extension Layer, Framework Integration

## Intent
Define and register a planned set of framework-specific adapters to integrate TenerifeUI with runtime-specific APIs (Next.js, Remix, etc.) without violating Foundation immutability.

## Axioms
1.  **Foundation components are FINAL LOCKED and MUST NOT be modified.**
2.  **Framework-specific logic MUST live in Extension layer only.**
3.  **No adapter may be implemented without explicit task derived from this Master Task.**
4.  **Adapters are opt-in and MUST NOT be implicit.**

## Scope Definition
### In Scope
*   Planning and registering adapter candidates.
*   Defining adapter responsibilities and boundaries.
*   Documenting when adapters are required vs forbidden.

### Out of Scope
*   Implementing adapters (except where explicitly tasked).
*   Adding framework dependencies (unless part of adapter implementation).
*   Changing Foundation APIs.

## Planned Adapters

| ID | Name | Status | Purpose | Foundation Component |
| :--- | :--- | :--- | :--- | :--- |
| **NEXT_LINK_ADAPTER** | `NextLinkAdapter` | **IMPLEMENTED** | Enable SPA navigation in Next.js using `next/link`. | `Link` |
| **NEXT_IMAGE_ADAPTER** | `NextImageAdapter` | **PLANNED** | Bridge TenerifeUI Image component with `next/image`. | `Image` |
| **NEXT_METADATA_ADAPTER** | `NextMetadataAdapter` | **OPTIONAL** | Integrate SEO/metadata with Next.js Router. | `Meta` (future) |
| **NEXT_ROUTER_ADAPTER** | `NextRouterAdapter` | **CONDITIONAL** | Provide route-aware UI logic. | None |
| **NEXT_THEME_ADAPTER** | `NextThemeAdapter` | **FUTURE** | Bridge SSR-aware theming (cookies, headers). | `ThemeProvider` |

## Adapter Rules

### Mandatory
*   Every adapter MUST have its own concrete TUNG before implementation.
*   Every adapter MUST follow the [Framework Adapter Pattern](../../../docs/architecture/FRAMEWORK_ADAPTER_PATTERN.md).
*   Every adapter MUST be documented before usage.

### Forbidden
*   Ad-hoc framework-specific hacks in product code.
*   Direct usage of framework APIs inside Foundation.
*   Silent or implicit behavior changes via adapters.

## Implementation Details
Adapters are located in `src/EXTENSIONS/<framework>/`.

*   **Next.js**: `src/EXTENSIONS/next/`
