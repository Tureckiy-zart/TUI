# Framework Adapter Pattern

> **Canonical Extension Bridge**
>
> **Priority**: P0
> **Scope**: Extension Layer, Framework Integration

## Axioms

1.  **Foundation layer is framework-agnostic and immutable.**
2.  **Framework-specific APIs MUST NOT appear in Foundation components.**
3.  **Adapters MUST live in Extension layer only.**
4.  **Adapters MUST NOT modify or extend Foundation public APIs.**
5.  **Adapters MUST compose Foundation components, not replace them.**
6.  **Framework adapters are opt-in and explicit.**

## Context

### Problem
Framework runtimes (Next.js, Remix, Expo, etc.) expose platform-specific APIs that conflict with framework-agnostic Foundation components. For example, `Authoritative Link` renders a standard `<a>` tag, which causes full page reloads in Single Page Applications (SPAs).

### Risk
Direct usage of framework APIs inside Foundation breaks portability, lock guarantees, and architectural purity.

### Solution
Introduce explicit **Extension-layer adapters** that bridge framework behavior while preserving Foundation immutability.

## Adapter Contract

A **Framework Adapter** is an Extension-layer component or hook that composes a Foundation component with a framework-specific API.

| Responsibility | Component Layer | Examples |
| :--- | :--- | :--- |
| **Foundation** | Markup semantics, Visual styling (Tokens), Accessibility contracts, Public API surface | `Link`, `Image` |
| **Adapter** | Framework routing, Image optimization, Metadata handling, Hydration/SSR | `NextLinkAdapter`, `RemixLinkAdapter` |

## Implementation Rules

### Location
*   Adapters MUST be placed under `src/EXTENSIONS/<framework>/` (e.g., `src/EXTENSIONS/next/`).
*   Each framework has its own isolated adapter namespace.
*   Adapters MUST be tree-shakable.

### Naming
*   `<Framework><Component>Adapter` (e.g., `NextLinkAdapter`).
*   `<Framework>` prefixed hooks (e.g., `useNextRouter`).

### Composition
*   Adapters MUST wrap or compose Foundation components.
*   Adapters MUST NOT render alternative primitives defined from scratch.
*   Adapters MUST NOT duplicate token logic.

## Acceptance Criteria

1.  **Foundation Immutability**: Foundation components remain unchanged.
2.  **Correct Behavior**: Framework-specific behavior (SPA nav, optimization) works correctly.
3.  **Isolation**: No framework APIs leak into Foundation.
4.  **Explicitness**: Adapter usage is explicit (`NextLinkAdapter`, not implicit auto-swapping).
5.  **Portability**: Architecture remains portable and extensible to other runtimes.
