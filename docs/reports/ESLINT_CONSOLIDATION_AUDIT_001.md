# ESLint Consolidation Audit — TUNG_ESLINT_CONSOLIDATION_AUDIT_001

**Date:** 2026-02-04  
**Status:** Completed  
**Layer:** Enforcement  
**Priority:** P0  
**Constraint:** NO_BEHAVIOR_CHANGES

---

## Objective

Навести порядок в ESLint-инфраструктуре: собрать все кастомные правила в одном месте, убрать дубли, перепроверить подключение, обеспечить единый entry-point без изменения логики правил.

---

## Inventory

### ESLint Config Files

- `eslint.config.mjs` — root entry-point (flat config)
- `eslint-rules/eslint.config.mjs` — lint конфиг для самих правил
- `allowDefaultProject.eslint` — служебный файл для TypeScript ESLint projectService

### Custom ESLint Rules (Canonical)

- `eslint-rules/*.ts`
- `eslint-rules/utils/*.ts`
- `eslint-rules/__tests__/*.ts`
- `eslint-rules/loader.mjs`
- `eslint-rules/index.ts`

### Подключения

- Root ESLint plugin loader: `eslint.config.mjs` → `./eslint-rules/loader.mjs`
- Lint rules script: `package.json` → `eslint --config eslint-rules/eslint.config.mjs`
- TypeScript includes: `tsconfig.json` → `eslint-rules/**/*`
- Vitest include: `vitest.config.ts` → `eslint-rules/**/*.{test,spec}.{ts,tsx}`
- Scripts & tests: импортируют утилиты и правила из `eslint-rules/...`

---

## Consolidation

### Canonical Target

- **`eslint-rules`** (единственный source of truth)

### Перемещено

- `packages/eslint-rules/` → `eslint-rules/`

### Удалено как дубликат

- Нет дубликатов. Единственное расположение — `eslint-rules/`.

---

## Config Normalization

- `eslint.config.mjs` остаётся единственной точкой входа.
- Все ссылки на прежний путь `packages/eslint-rules/` перенесены на `eslint-rules/`.

---

## Coverage Verification

### Требуемые пути

- `apps/web/**` — **не существует в репозитории**
- `apps/admin/**` — **не существует в репозитории**
- `packages/**` — покрывается root ESLint (включая `eslint-rules/**`, но исключено из основного lint через ignores)

### Фактический охват

- Root ESLint конфиг применяется к `**/*.{ts,tsx}` (за вычетом ignore-списка).
- `eslint-rules/**` исключён из основного lint (как и раньше), но имеет отдельный `lint:rules` pipeline.

---

## Acceptance Checklist

- [x] Все custom ESLint rules в одном месте (`eslint-rules`)
- [x] Нет дублирующихся правил в репозитории
- [x] Один entry-point (`eslint.config.mjs`)
- [x] ESLint покрывает весь проект (реальные директории)
- [x] Поведение линта не изменено
