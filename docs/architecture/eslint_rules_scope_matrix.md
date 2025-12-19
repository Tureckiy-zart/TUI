# ESLint Rules — Scope & Authority Matrix

> Canonical document defining **where each ESLint rule applies**, **where it must NOT apply**, and **what architectural problem it solves**.

This document exists to prevent rule overreach, accidental regressions, and loss of trust in the linting system.

---

## Core Principle

> **Foundation rules protect public contracts.**  
> **Product rules protect consistency.**  
> **No rule is allowed to act outside its declared scope.**

If a rule does not know *where it applies*, it will eventually break valid code.

---

## Rule 1 — `no-foundation-classname-style`

### Purpose
Prevent consumer-controlled styling of **Foundation components** by forbidding `className` and `style` in their public API.

### MUST Apply
| Context | Reason |
|------|-------|
| Consumer / Product code | Disallow `<Button className />` usage |
| Feature components | Layout must not control Foundation visuals |
| Any JSX importing Foundation from public UI entry | Enforce contract |

### MUST NOT Apply
| Context | Reason |
|------|-------|
| UI library internal source | Internal `className` is implementation detail |
| Foundation component implementation | Styling logic lives here |
| Storybook (`*.stories.tsx`) | Demonstration, not contract |
| Extension / Composition layer | `className` allowed |

### Autofix Policy
- ❌ Autofix MUST NOT run inside UI library source
- ⚠️ Autofix MAY be enabled for consumer code only
- ✅ Reporting errors is always allowed

---

## Rule 2 — `no-foundation-open-htmlattributes`

### Purpose
Prevent leaking open-ended APIs into Foundation components by forbidding direct extension of `React.*HTMLAttributes`.

### MUST Apply
| Context | Reason |
|------|-------|
| UI library source | Prevent architectural regressions |
| Foundation components only | Scope is explicit |

### MUST NOT Apply
| Context | Reason |
|------|-------|
| Consumer / Product code | Types are irrelevant here |
| Extension components | Not Foundation |

### Status
✅ Canonical and final. No autofix by design.

---

## Rule 3 — `no-raw-tailwind-colors`

### Purpose
Enforce token-driven color usage instead of raw Tailwind utility colors.

### MUST Apply
| Context | Reason |
|------|-------|
| UI library (Foundation + Extension) | Design-system consistency |

### MAY Apply (Optional)
| Context | Condition |
|------|----------|
| Product UI | If strict visual discipline is desired |

### MUST NOT Apply
| Context | Reason |
|------|-------|
| Experiments / prototypes | Speed over purity |
| Demo / spikes | Non-final code |

---

## Rule 4 — `no-raw-visual-props`

### Purpose
Prevent inline visual APIs (`color="red"`, `padding="4"`) in favor of tokens and variants.

### MUST Apply
| Context | Reason |
|------|-------|
| UI library | Architectural consistency |
| Foundation components | Strict enforcement |

### SHOULD Apply
| Context | Reason |
|------|-------|
| Extension components | Encouraged, not mandatory |

### MUST NOT Apply
| Context | Reason |
|------|-------|
| Product / Business UI | Flexibility allowed |

---

## Summary Matrix

| Rule | Foundation | UI Library | Extension | Product |
|----|------------|-----------|-----------|---------|
| no-foundation-classname-style | 🚫 API | 🚫* | ❌ | ❌ |
| no-foundation-open-htmlattributes | ✅ | ❌ | ❌ | ❌ |
| no-raw-tailwind-colors | ✅ | ✅ | ⚠️ | ❌ |
| no-raw-visual-props | ✅ | ✅ | ⚠️ | ❌ |

> 🚫* — applies only to consumer usage, never to internal implementation

---

## Architectural Authority

This document is authoritative under:
- FOUNDATION_CONTRACT
- FOUNDATION_ENFORCEMENT_FINAL_LOCK
- UI architecture governance rules

Any ESLint rule that contradicts this matrix must be considered **misconfigured**.

**ESLint Setup & Governance:** For complete ESLint governance rules, autofix policy, and architectural enforcement principles, see [ESLINT_SETUP.md](./ESLINT_SETUP.md).

---

## Final Note

Linting exists to **protect architecture**, not to fight developers.

If a rule causes confusion, the rule is wrong — not the code.

---

## Related Documents

- [ESLINT_SETUP.md](./ESLINT_SETUP.md) - ESLint setup and governance (architectural enforcement)
- [FOUNDATION_CONTRACT.md](./FOUNDATION_CONTRACT.md) - Foundation component contract (FINAL/APPLIED)
- [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) - Foundation layer lock (Foundation Enforcement section)

