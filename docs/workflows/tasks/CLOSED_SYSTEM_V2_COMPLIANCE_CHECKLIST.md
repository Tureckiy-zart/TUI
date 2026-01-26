> ⚠️ **NON-CANONICAL DOCUMENT**
> 
> This document is **NOT** part of the canonical Closed System v2 documentation set.
> 
> **Status:** WORKFLOW DOCUMENT (NOT CANONICAL)  
> **Canonical Reference:** [CLOSED_SYSTEM_V2_CANON_INDEX.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md)
> 
> This is a workflow document for compliance checking. For authoritative Closed System v2 documentation, refer to the canonical document set.

---

# Closed System v2 Compliance Checklist

**Date:** 2026-01-26  
**Status:** Active  
**Purpose:** Governance checklist для обеспечения compliance с Closed System v2

---

## Purpose

Этот документ определяет обязательный checklist для обеспечения compliance с Closed System v2 при создании или рефакторинге Foundation компонентов. Все пункты должны быть проверены перед завершением работы над компонентом.

---

## Closed System v2 Principles

**Source:** [CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md)

1. **Single Expression Surface:** допустимые способы выражения UI должны быть едиными и предсказуемыми
2. **Deterministic Rendering:** один и тот же intent приводит к одному типу визуального и поведенческого результата
3. **No Hidden Channels:** любые каналы влияния на рендер и поведение должны быть явными
4. **Contract Completeness:** контракты компонентов и слоев должны покрывать все допустимые изменения UI
5. **Governed Flexibility:** вариативность разрешена только в пределах формально определенных границ
6. **Agent-Safe Documentation:** документация и примеры являются authoritative surface и не должны допускать двусмысленности

---

## Pre-Implementation Checklist

### Expression Surface Compliance

- [ ] **API спроектирован согласно Expression Surface mechanism**
  - [ ] Один intent → один prop (не множественные эквивалентные способы)
  - [ ] Все визуальные изменения через token unions
  - [ ] Все поведенческие изменения через явные props
  - [ ] Нет альтернативных каналов выражения intent

- [ ] **Foundation Enforcement compliance (для Foundation компонентов)**
  - [ ] `className` и `style` исключены через `Omit<React.*HTMLAttributes, "className" | "style">`
  - [ ] Нет prop leakage
  - [ ] Нет скрытых каналов влияния

---

### Type System Compliance

- [ ] **Channel Explicitness**
  - [ ] Типы явно перечисляют все допустимые каналы влияния
  - [ ] Типы исключают неявные каналы
  - [ ] Типы предотвращают prop leakage

- [ ] **Boundary Enforcement**
  - [ ] Типы четко разделяют Public vs Internal
  - [ ] Типы предотвращают утечку внутренних типов в публичный API
  - [ ] Типы исключают невалидные комбинации props

- [ ] **Explicit Union Types**
  - [ ] Все variant props используют explicit union types
  - [ ] Все size props используют explicit union types
  - [ ] Все color props используют explicit union types или conditional types

---

### Deterministic Rendering Compliance

- [ ] **Intent-Outcome Determinism**
  - [ ] Один intent → один outcome (детерминированное маппирование)
  - [ ] Нет скрытых факторов, влияющих на outcome
  - [ ] Все variants используют token unions (детерминированное маппирование)

---

### Governed Flexibility Compliance

- [ ] **Variation Governance**
  - [ ] Вариативность в формальных границах (token unions)
  - [ ] Нет вариативности вне границ
  - [ ] Semantics-preserving variation
  - [ ] State-safe variation
  - [ ] Composition-safe variation

---

## Documentation Checklist

### Documentation Authority

- [ ] **Component Documentation**
  - [ ] Документация отражает только санкционированные API
  - [ ] Документация однозначна и не допускает двусмысленности
  - [ ] Документация не демонстрирует обходы или неявные каналы
  - [ ] Все примеры используют только санкционированные API

- [ ] **Storybook Stories**
  - [ ] Stories демонстрируют только санкционированные паттерны
  - [ ] Stories не показывают обходы (className, style, deprecated props)
  - [ ] Stories демонстрируют matrix (variants × sizes) и states
  - [ ] Stories соответствуют принципам Single Expression Surface и Deterministic Rendering

- [ ] **Code Examples**
  - [ ] Примеры используют только санкционированные API
  - [ ] Примеры не демонстрируют обходы
  - [ ] Примеры однозначны

---

### Contract Coverage

- [ ] **Component Contracts**
  - [ ] Контракты покрывают все допустимые изменения UI
  - [ ] Контракты полные и явные
  - [ ] Нет зон неопределенности
  - [ ] Все props используют explicit union types

---

## Enforcement Checklist

### Compile-Time Enforcement

- [ ] **TypeScript**
  - [ ] Foundation Enforcement: `Omit<React.*HTMLAttributes, "className" | "style">`
  - [ ] Explicit union types для всех variant/size/color props
  - [ ] Type-tests проверяют отсутствие className/style

- [ ] **ESLint**
  - [ ] `no-foundation-classname-style` rule passes
  - [ ] `no-foundation-open-htmlattributes` rule passes
  - [ ] `no-raw-visual-props` rule passes (если применимо)
  - [ ] `no-raw-tailwind-colors` rule passes (если применимо)

---

### Runtime Enforcement

- [ ] **tokenCVA Validation**
  - [ ] Компонент использует `tokenCVA()` для создания variants
  - [ ] Все class values используют token-based utilities
  - [ ] Нет raw Tailwind color/spacing utilities

---

## Validation Checklist

### Expression Surface Validation

- [ ] Нет альтернативных поверхностей выражения intent
- [ ] Нет недокументированных escape hatches
- [ ] API поверхность прослеживается к принципам

---

### Type System Validation

- [ ] Нет type-level escape paths
- [ ] Типы enforce только declared intent surfaces
- [ ] Нет утечки внутренних типов в публичный API

---

### Runtime Behavior Validation

- [ ] Runtime поведение соответствует архитектурному intent
- [ ] Нет недокументированного поведения
- [ ] Все компоненты реализуют механизмы корректно

---

## Related Documents

- [CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md) — Phase B principles
- [CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md) — Mechanisms
- [CLOSED_SYSTEM_V2_PRINCIPLE_TO_MECHANISM_MAPPING.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_PRINCIPLE_TO_MECHANISM_MAPPING.md) — Principle-to-mechanism mapping
