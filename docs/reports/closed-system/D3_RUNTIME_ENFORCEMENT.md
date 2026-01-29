> ⚠️ **NON-CANONICAL DOCUMENT**
> 
> This document is **NOT** part of the canonical Closed System v2 documentation set.
> 
> **Status:** DEPRECATED / HISTORICAL CONTEXT ONLY  
> **Canonical Reference:** [CLOSED_SYSTEM_V2_CANON_INDEX.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md)
> 
> This document is provided for historical context only. For authoritative Closed System v2 documentation, refer to the canonical document set.

---

# Closed System v2 — D3: Runtime Enforcement

**Date:** 2026-01-26  
**Phase:** D3.2 — Runtime Enforcement  
**Status:** Complete  
**Purpose:** Анализ и валидация runtime enforcement для Closed System v2

---

## Purpose

Этот документ анализирует существующие runtime enforcement механизмы (runtime guards, tokenCVA валидация) и определяет, покрывают ли они все требования Closed System v2 согласно Phase C2 enforcement expectations.

---

## Enforcement Expectations (Phase C2)

**Source:** [CLOSED_SYSTEM_V2_PRINCIPLE_TO_MECHANISM_MAPPING.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_PRINCIPLE_TO_MECHANISM_MAPPING.md)

| Principle | Dominant Mechanism | Enforcement Expectation |
|-----------|-------------------|------------------------|
| Single Expression Surface | Expression Surface | mixed (compile-time + runtime) |
| Deterministic Rendering | Intent-Outcome Determinism | mixed (compile-time + runtime) |
| No Hidden Channels | Channel Explicitness | mixed (compile-time + governance) |
| Contract Completeness | Contract Coverage | governance-only |
| Governed Flexibility | Variation Governance | mixed (compile-time + runtime + governance) |
| Agent-Safe Documentation | Documentation Authority | governance-only |

---

## tokenCVA Runtime Validation

### Mechanism Overview

**File:** `src/FOUNDATION/lib/token-cva.ts`

**Purpose:** Token-based CVA wrapper с валидацией token usage в development mode

**Enforcement Levels:**
1. **ERROR:** Forbidden spacing utilities (must use semanticSpacing tokens)
2. **WARN:** Advisory dimension utilities (allowed until dimension token system exists)

### Validation Coverage

#### 1. Forbidden Spacing Utilities (ERROR)

**Patterns:**
- Raw color utilities: `bg-red-500`, `text-blue-600`, etc.
- Raw spacing utilities: `p-4`, `m-2`, `gap-3`, etc. (except p-0, m-0, fractional values)

**Coverage:**
- ✅ **Expression Surface:** Предотвращает обход token system через raw utilities
- ✅ **Governed Flexibility:** Обеспечивает вариативность в формальных границах (token-based only)
- ✅ **No Hidden Channels:** Предотвращает скрытые каналы влияния через raw utilities

**Assessment:** ✅ **COMPLIANT**

---

#### 2. Advisory Dimension Utilities (WARN)

**Patterns:**
- Raw dimension utilities: `w-[123px]`, `h-[calc(...)]` (arbitrary values)
- Allowed: viewport-relative values (vh, vw, %), relative units (rem, em)

**Coverage:**
- ✅ **Expression Surface:** Предупреждает об обходе token system
- ⚠️ **Governed Flexibility:** Advisory level (не блокирует, но предупреждает)

**Assessment:** ✅ **COMPLIANT** (advisory level acceptable)

---

### tokenCVA Validation Process

**Runtime Flow:**
1. Component использует `tokenCVA()` для создания variants
2. `tokenCVA()` валидирует все class values в development mode
3. Валидация проверяет base, variants, compoundVariants
4. ERROR/WARN сообщения выводятся в console

**Coverage:**
- ✅ Все компоненты, использующие `tokenCVA()`, получают runtime validation
- ✅ Валидация происходит при создании variants (не при каждом render)
- ✅ Production mode: валидация отключена для performance

**Assessment:** ✅ **COMPLIANT**

---

## Component Runtime Behavior

### Expression Surface Enforcement

**Mechanism:**
- Все компоненты используют только санкционированные props (D1, D2)
- Runtime реализация использует только props из публичного API
- Нет альтернативных способов выражения intent в runtime

**Coverage:**
- ✅ **Expression Surface:** Runtime использует только санкционированные props
- ✅ **No Hidden Channels:** Нет скрытых каналов влияния в runtime

**Assessment:** ✅ **COMPLIANT**

---

### Intent-Outcome Determinism Enforcement

**Mechanism:**
- Все variants используют token unions (детерминированное маппирование)
- `tokenCVA()` обеспечивает детерминированное маппирование intent → outcome
- Нет скрытых факторов, влияющих на outcome

**Coverage:**
- ✅ **Deterministic Rendering:** Один intent → один outcome через token unions
- ✅ **No Hidden Channels:** Нет скрытых факторов в runtime

**Assessment:** ✅ **COMPLIANT**

---

### Variation Governance Enforcement

**Mechanism:**
- Все variants ограничены token unions (формальные границы)
- `tokenCVA()` валидирует token usage (предотвращает обход границ)
- Runtime использует только token-based values

**Coverage:**
- ✅ **Governed Flexibility:** Вариативность в формальных границах (token unions)
- ✅ **Expression Surface:** Token-based expression surface

**Assessment:** ✅ **COMPLIANT**

---

## Coverage Analysis

### Single Expression Surface → Expression Surface

**Enforcement Expectation:** mixed (compile-time + runtime)

**Runtime Coverage:**
- ✅ `tokenCVA()` валидирует token usage (предотвращает обход token system)
- ✅ Runtime использует только санкционированные props
- ✅ Нет альтернативных способов выражения intent в runtime

**Assessment:** ✅ **COMPLIANT** (runtime coverage complete)

---

### Deterministic Rendering → Intent-Outcome Determinism

**Enforcement Expectation:** mixed (compile-time + runtime)

**Runtime Coverage:**
- ✅ `tokenCVA()` обеспечивает детерминированное маппирование intent → outcome
- ✅ Все variants используют token unions (детерминированное маппирование)
- ✅ Нет скрытых факторов, влияющих на outcome

**Assessment:** ✅ **COMPLIANT** (runtime coverage complete)

---

### No Hidden Channels → Channel Explicitness

**Enforcement Expectation:** mixed (compile-time + governance)

**Runtime Coverage:**
- ✅ `tokenCVA()` предотвращает скрытые каналы через raw utilities
- ✅ Runtime использует только явные props (нет prop leakage)
- ⚠️ Полное покрытие требует governance enforcement (D3.3)

**Assessment:** ✅ **COMPLIANT** (runtime coverage complete, governance в D3.3)

---

### Governed Flexibility → Variation Governance

**Enforcement Expectation:** mixed (compile-time + runtime + governance)

**Runtime Coverage:**
- ✅ `tokenCVA()` валидирует token usage (предотвращает обход границ)
- ✅ Runtime использует только token-based values
- ✅ Вариативность ограничена формальными границами (token unions)
- ⚠️ Полное покрытие требует governance enforcement (D3.3)

**Assessment:** ✅ **COMPLIANT** (runtime coverage complete, governance в D3.3)

---

## Summary: Runtime Enforcement Coverage

### ✅ Fully Covered (4 mechanisms)

1. **Expression Surface** — tokenCVA + runtime props usage обеспечивают runtime enforcement
2. **Intent-Outcome Determinism** — tokenCVA обеспечивает детерминированное маппирование
3. **Channel Explicitness** — tokenCVA предотвращает скрытые каналы (governance в D3.3)
4. **Variation Governance** — tokenCVA валидирует token usage (governance в D3.3)

### ⚠️ Out of Scope (2 mechanisms)

1. **Contract Coverage** — governance-only (см. D3.3)
2. **Documentation Authority** — governance-only (см. D3.3)

---

## Existing Runtime Enforcement Status

### ✅ Active and Compliant

1. **tokenCVA validation** — Валидация token usage в development mode
   - ERROR level: Forbidden spacing utilities
   - WARN level: Advisory dimension utilities
   - Coverage: Все компоненты, использующие tokenCVA

2. **Runtime props usage** — Все компоненты используют только санкционированные props
   - Coverage: Все Foundation компоненты
   - Enforcement: TypeScript types + runtime implementation

### Assessment

**Status:** ✅ **NO NEW RUNTIME ENFORCEMENT REQUIRED**

Существующие runtime enforcement механизмы полностью покрывают требования Closed System v2 для runtime enforcement. Все механизмы, требующие runtime enforcement, уже покрыты существующими механизмами.

---

## Conclusion

### ✅ Runtime Enforcement Complete

**Status:** ✅ **NO CHANGES REQUIRED**

Все требования Closed System v2 для runtime enforcement уже покрыты существующими механизмами:

1. ✅ **tokenCVA:** Валидация token usage в development mode
2. ✅ **Runtime props usage:** Все компоненты используют только санкционированные props
3. ✅ **Deterministic mapping:** tokenCVA обеспечивает детерминированное маппирование

**No new runtime enforcement mechanisms required.**

---

## Next Steps

1. **D3.3:** Governance Enforcement (Documentation Authority, Contract Coverage)
2. **D3.4:** Enforcement Coverage Validation

---

## Related Documents

- [D3_COMPILE_TIME_ENFORCEMENT.md](./D3_COMPILE_TIME_ENFORCEMENT.md) — Compile-time enforcement
- [CLOSED_SYSTEM_V2_PRINCIPLE_TO_MECHANISM_MAPPING.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_PRINCIPLE_TO_MECHANISM_MAPPING.md) — Enforcement expectations
