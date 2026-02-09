# Radix Provider Exceptions

## 1. Purpose of this document
This document fixes the canonical rule for Radix-based components that rely on Provider context and clarifies which components require Provider at runtime.

## 2. Tooltip as the only Provider-required component
Tooltip is the only component in the library that depends on a Provider context to avoid a runtime crash. The library resolves this with a safe-by-default Tooltip Root (internal Provider by default) and an escape hatch for shared provider scope.

## 3. Provider Requirement Table

| Component | Provider required | Runtime crash without Provider | Code change needed |
|-----------|-------------------|-------------------------------|-------------------|
| Tooltip | Yes | Yes | Yes (implemented) |
| Popover | No | No | No |
| Menu | No | No | No |
| ContextMenu | No | No | No |
| Dialog/Modal | No | No | No |
| Tabs | No | No | No |
| Select | No | No | No |

## 4. Why auto-Provider is NOT applied elsewhere
Auto-Provider is not applied for other components because they do not require it for runtime safety. Their DX risks relate to composition or usage patterns, not missing Provider context. The library does not add Provider logic where it is not required.

## 5. Explicit non-goals
- No code changes beyond the existing Tooltip safe-by-default solution.
- No Provider logic added to other components.
- No enforcement or warnings.
- No API changes.
