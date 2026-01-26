> ⚠️ **NON-CANONICAL DOCUMENT**
> 
> This document is **NOT** part of the canonical Closed System v2 documentation set.
> 
> **Status:** DEPRECATED / HISTORICAL CONTEXT ONLY  
> **Canonical Reference:** [CLOSED_SYSTEM_V2_CANON_INDEX.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md)
> 
> This document is provided for historical context only. For authoritative Closed System v2 documentation, refer to the canonical document set.

---

# Closed System v2 — D3: Compile-Time Enforcement

**Date:** 2026-01-26  
**Phase:** D3.1 — Compile-Time Enforcement  
**Status:** Complete  
**Purpose:** Анализ и валидация compile-time enforcement для Closed System v2

---

## Purpose

Этот документ анализирует существующие compile-time enforcement механизмы (TypeScript + ESLint) и определяет, покрывают ли они все требования Closed System v2 согласно Phase C2 enforcement expectations.

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

## TypeScript Compile-Time Enforcement

### Foundation Enforcement (D2)

**Status:** ✅ **IMPLEMENTED**

**Mechanism:**
- Все Foundation компоненты используют `Omit<React.*HTMLAttributes, "className" | "style">`
- TypeScript исключает `className` и `style` из публичного API на уровне типов
- Type-tests проверяют отсутствие `className` и `style` в props

**Coverage:**
- ✅ **No Hidden Channels:** Предотвращает prop leakage (className/style)
- ✅ **Boundary Enforcement:** Четкое разделение Public vs Internal
- ✅ **Expression Surface:** Исключает альтернативные каналы (className/style)

**Assessment:** ✅ **COMPLIANT**

---

### Explicit Union Types (D2)

**Status:** ✅ **IMPLEMENTED**

**Mechanism:**
- Все variant props используют explicit union types (ButtonVariant, InputSize, etc.)
- Все size props используют explicit union types
- Все color props используют explicit union types или conditional types

**Coverage:**
- ✅ **Expression Surface:** Один intent → один prop (explicit union types)
- ✅ **Deterministic Rendering:** Один intent → один outcome (type-level enforcement)
- ✅ **Governed Flexibility:** Вариативность в формальных границах (token unions)
- ✅ **Channel Explicitness:** Все каналы явны в типах

**Assessment:** ✅ **COMPLIANT**

---

### Conditional Types for Role-Based Enforcement

**Status:** ✅ **IMPLEMENTED**

**Mechanism:**
- Text component использует conditional types (`AllowedTextForRole<R>`)
- Обеспечивает type-level safety для Typography Color Policy

**Coverage:**
- ✅ **Governed Flexibility:** Role-based enforcement через conditional types
- ✅ **Channel Explicitness:** Явное перечисление допустимых каналов

**Assessment:** ✅ **COMPLIANT**

---

## ESLint Compile-Time Enforcement

### Foundation Enforcement Rules

#### 1. no-foundation-classname-style

**File:** `eslint-rules/no-foundation-classname-style.ts`

**Purpose:** Запрещает передачу `className`/`style` в Foundation компоненты из consumer кода

**Coverage:**
- ✅ **No Hidden Channels:** Предотвращает prop leakage (className/style)
- ✅ **Expression Surface:** Исключает альтернативные каналы (className/style)
- ✅ **Boundary Enforcement:** Защищает Foundation/consumer boundary

**Status:** ✅ **ACTIVE**

**Assessment:** ✅ **COMPLIANT**

---

#### 2. no-foundation-open-htmlattributes

**File:** `eslint-rules/no-foundation-open-htmlattributes.ts`

**Purpose:** Требует использования `Omit<React.*HTMLAttributes, "className" | "style">` вместо прямого расширения

**Coverage:**
- ✅ **No Hidden Channels:** Предотвращает prop leakage через прямое расширение
- ✅ **Boundary Enforcement:** Обеспечивает правильное разделение Public vs Internal
- ✅ **Expression Surface:** Исключает альтернативные каналы

**Status:** ✅ **ACTIVE**

**Assessment:** ✅ **COMPLIANT**

---

### Token Enforcement Rules

#### 3. no-raw-visual-props

**File:** `eslint-rules/no-raw-visual-props.ts`

**Purpose:** Запрещает raw string/number типы для visual props, требует token union types

**Coverage:**
- ✅ **Expression Surface:** Обеспечивает token-based expression surface
- ✅ **Governed Flexibility:** Обеспечивает вариативность в формальных границах (token unions)
- ✅ **Channel Explicitness:** Явное перечисление допустимых каналов через token unions

**Status:** ✅ **ACTIVE**

**Assessment:** ✅ **COMPLIANT**

---

#### 4. no-raw-tailwind-colors

**File:** `eslint-rules/no-raw-tailwind-colors.ts`

**Purpose:** Запрещает использование raw Tailwind color utilities, требует token-based colors

**Coverage:**
- ✅ **Expression Surface:** Обеспечивает token-based expression surface
- ✅ **Governed Flexibility:** Обеспечивает вариативность в формальных границах
- ✅ **No Hidden Channels:** Предотвращает обход token system через raw colors

**Status:** ✅ **ACTIVE**

**Assessment:** ✅ **COMPLIANT**

---

#### 5. no-raw-font-size-scale, no-raw-line-height-scale, no-raw-motion-scale, no-raw-shadow-elevation-scale

**Purpose:** Запрещают использование raw scale values, требуют token-based values

**Coverage:**
- ✅ **Expression Surface:** Обеспечивает token-based expression surface
- ✅ **Governed Flexibility:** Обеспечивает вариативность в формальных границах
- ✅ **No Hidden Channels:** Предотвращает обход token system

**Status:** ✅ **ACTIVE**

**Assessment:** ✅ **COMPLIANT**

---

## Coverage Analysis

### Single Expression Surface → Expression Surface

**Enforcement Expectation:** mixed (compile-time + runtime)

**Compile-Time Coverage:**
- ✅ TypeScript: Explicit union types обеспечивают единственный способ выражения intent
- ✅ ESLint: `no-raw-visual-props` предотвращает raw values
- ✅ ESLint: `no-raw-tailwind-colors` предотвращает обход token system
- ✅ ESLint: `no-foundation-classname-style` предотвращает альтернативные каналы

**Assessment:** ✅ **COMPLIANT** (compile-time coverage complete)

---

### Deterministic Rendering → Intent-Outcome Determinism

**Enforcement Expectation:** mixed (compile-time + runtime)

**Compile-Time Coverage:**
- ✅ TypeScript: Explicit union types обеспечивают детерминированное маппирование intent → outcome
- ✅ TypeScript: Conditional types обеспечивают role-based enforcement
- ✅ ESLint: Token enforcement правила предотвращают недетерминированное поведение

**Assessment:** ✅ **COMPLIANT** (compile-time coverage complete)

---

### No Hidden Channels → Channel Explicitness

**Enforcement Expectation:** mixed (compile-time + governance)

**Compile-Time Coverage:**
- ✅ TypeScript: `Omit<React.*HTMLAttributes, "className" | "style">` предотвращает prop leakage
- ✅ ESLint: `no-foundation-classname-style` предотвращает prop leakage из consumer кода
- ✅ ESLint: `no-foundation-open-htmlattributes` предотвращает прямое расширение HTMLAttributes
- ✅ TypeScript: Explicit union types явно перечисляют все допустимые каналы

**Assessment:** ✅ **COMPLIANT** (compile-time coverage complete)

---

### Contract Completeness → Contract Coverage

**Enforcement Expectation:** governance-only

**Compile-Time Coverage:**
- ⚠️ Contract completeness не может быть обеспечена через compile-time enforcement
- ⚠️ Требуется governance enforcement (D3.3)

**Assessment:** ⚠️ **OUT OF SCOPE** (governance-only, см. D3.3)

---

### Governed Flexibility → Variation Governance

**Enforcement Expectation:** mixed (compile-time + runtime + governance)

**Compile-Time Coverage:**
- ✅ TypeScript: Explicit union types ограничивают вариативность формальными границами
- ✅ TypeScript: Conditional types обеспечивают role-based enforcement
- ✅ ESLint: `no-raw-visual-props` предотвращает вариативность вне границ
- ✅ ESLint: Token enforcement правила предотвращают обход token system

**Assessment:** ✅ **COMPLIANT** (compile-time coverage complete)

---

### Agent-Safe Documentation → Documentation Authority

**Enforcement Expectation:** governance-only

**Compile-Time Coverage:**
- ⚠️ Documentation authority не может быть обеспечена через compile-time enforcement
- ⚠️ Требуется governance enforcement (D3.3)

**Assessment:** ⚠️ **OUT OF SCOPE** (governance-only, см. D3.3)

---

## Summary: Compile-Time Enforcement Coverage

### ✅ Fully Covered (4 mechanisms)

1. **Expression Surface** — TypeScript + ESLint правила обеспечивают compile-time enforcement
2. **Intent-Outcome Determinism** — TypeScript explicit union types обеспечивают compile-time enforcement
3. **Channel Explicitness** — TypeScript + ESLint правила обеспечивают compile-time enforcement
4. **Variation Governance** — TypeScript + ESLint правила обеспечивают compile-time enforcement

### ⚠️ Out of Scope (2 mechanisms)

1. **Contract Coverage** — governance-only (см. D3.3)
2. **Documentation Authority** — governance-only (см. D3.3)

---

## Existing ESLint Rules Status

### ✅ Active and Compliant

1. `no-foundation-classname-style` — Foundation Enforcement
2. `no-foundation-open-htmlattributes` — Foundation Enforcement
3. `no-raw-visual-props` — Token Enforcement
4. `no-raw-tailwind-colors` — Token Enforcement
5. `no-raw-font-size-scale` — Token Enforcement
6. `no-raw-line-height-scale` — Token Enforcement
7. `no-raw-motion-scale` — Token Enforcement
8. `no-raw-shadow-elevation-scale` — Token Enforcement

### Assessment

**Status:** ✅ **NO NEW RULES REQUIRED**

Существующие ESLint правила полностью покрывают требования Closed System v2 для compile-time enforcement. Все механизмы, требующие compile-time enforcement, уже покрыты существующими правилами.

---

## TypeScript Enforcement Status

### ✅ Fully Implemented

1. **Foundation Enforcement** — `Omit<React.*HTMLAttributes, "className" | "style">` для всех Foundation компонентов
2. **Explicit Union Types** — Все variant/size/color props используют explicit union types
3. **Conditional Types** — Role-based enforcement через conditional types (Text component)
4. **Type-Tests** — Проверка отсутствия className/style для Foundation компонентов

### Assessment

**Status:** ✅ **COMPLIANT**

TypeScript обеспечивает полное compile-time enforcement для всех механизмов Closed System v2, требующих compile-time enforcement.

---

## Conclusion

### ✅ Compile-Time Enforcement Complete

**Status:** ✅ **NO CHANGES REQUIRED**

Все требования Closed System v2 для compile-time enforcement уже покрыты существующими механизмами:

1. ✅ **TypeScript:** Foundation Enforcement, explicit union types, conditional types
2. ✅ **ESLint:** Foundation Enforcement rules, Token Enforcement rules
3. ✅ **Type-Tests:** Проверка отсутствия className/style

**No new compile-time enforcement mechanisms required.**

---

## Next Steps

1. **D3.2:** Runtime Enforcement (runtime guards, tokenCVA валидация)
2. **D3.3:** Governance Enforcement (Documentation Authority, Contract Coverage)
3. **D3.4:** Enforcement Coverage Validation

---

## Related Documents

- [D2_TYPE_VALIDATION.md](./D2_TYPE_VALIDATION.md) — Type System validation
- [CLOSED_SYSTEM_V2_PRINCIPLE_TO_MECHANISM_MAPPING.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_PRINCIPLE_TO_MECHANISM_MAPPING.md) — Enforcement expectations
