# CI Canonical State

**Дата:** 2025-01-19  
**Статус:** Canonical  
**Область:** CI/CD, GitHub Actions

---

## Статус

CI приведен в **canonical состояние** с осознанной архитектурой, явным разделением blocking/informational checks и зафиксированным жизненным циклом Node.js версий.

---

## Архитектурные решения

### 1. Node.js Matrix Strategy

**Конфигурация:**
- **Node.js 18.x** — [Legacy, non-blocking] до EOL (апрель 2025)
- **Node.js 20.x** — [BLOCKING] — единственный обязательный runtime

**Реализация:**
- Matrix strategy в `.github/workflows/ci.yml`
- `continue-on-error: ${{ matrix.node-version == '18.x' }}` на уровне job
- Canonical naming с явными маркерами

**План миграции:**
- После EOL Node.js 18.x (апрель 2025) → удаление из matrix
- После LTS Node.js 22.x (апрель 2025) → рассмотрение добавления

**Документация:**
- `docs/architecture/CI_NODE_MATRIX_DECISION.md` — архитектурное решение
- `docs/tasks/TUNG_CI_NODE_18_EOL_REMOVAL.md` — задача на удаление после EOL

---

### 2. Canonical Naming Convention

Все CI checks используют единый формат с явными маркерами:

| Маркер | Назначение | Пример |
|--------|------------|--------|
| `[BLOCKING]` | Обязательная проверка, блокирует PR | `Quality Checks (Node 20.x) [BLOCKING]` |
| `[Legacy]` | Устаревшая версия, non-blocking | `Quality Checks (Node 18.x) [Legacy]` |
| `[Informational]` | Информационная проверка, не блокирует PR | `Chromatic Visual Tests [Informational]` |
| `[Main Only]` | Выполняется только на main branch | `Publish to npm (semantic-release) [Main Only]` |

**Принцип:** По названию check должно быть ясно его назначение и blocking-статус без знания внутренней реализации.

---

### 3. Blocking vs Informational Checks

#### Blocking Checks (обязательные)

Блокируют merge PR при ошибках:

1. **Quality Checks (Node 20.x) [BLOCKING]**
   - Lint, format, typecheck на Node.js 20.x
   - Единственный обязательный runtime для quality checks

2. **Build Package [BLOCKING]**
   - Сборка библиотеки
   - Зависит от quality checks

3. **Quality Checks (Node 22.x) [BLOCKING]**
   - Quality pipeline на Node.js 22.x
   - Отдельный workflow для feature branches

**Принцип:** Минимальный набор стабильных проверок, гарантирующих качество кода.

#### Informational Checks (информационные)

Не блокируют merge, но предоставляют важную информацию:

1. **Quality Checks (Node 18.x) [Legacy]**
   - Мониторинг совместимости до EOL
   - `continue-on-error: true`

2. **Storybook Build [Informational]**
   - Проверка сборки документации
   - Не критично для merge

3. **Chromatic Visual Tests [Informational]**
   - Визуальные регрессионные тесты
   - `continue-on-error: true`

**Принцип:** Позволяют мониторить дополнительные аспекты без блокировки разработки.

---

## Workflow Files

### `.github/workflows/ci.yml` — Full CI/CD

**Jobs:**
- `quality` — matrix strategy [18.x (Legacy), 20.x (BLOCKING)]
- `build` — [BLOCKING]
- `storybook` — [Informational]
- `release` — [Main Only]

**Triggers:** push/PR to `main`

### `.github/workflows/quality.yml` — Quality Checks

**Jobs:**
- `quality` — [BLOCKING] на Node.js 22.x

**Triggers:** push/PR to `main`, `develop`, `feature/**`

### `.github/workflows/chromatic.yml` — Visual Tests

**Jobs:**
- `chromatic` — [Informational]

**Triggers:** push/PR to `main`, `develop`

---

## Критерии Canonical State

✅ **Node.js matrix:**
- [x] Убрана версия 22.x из matrix (не LTS)
- [x] Node.js 18.x помечен как non-blocking
- [x] Node.js 20.x является единственным blocking runtime
- [x] `continue-on-error` настроен на уровне job

✅ **Canonical naming:**
- [x] Все checks имеют явные маркеры [BLOCKING], [Legacy], [Informational]
- [x] Названия читаемы без знания внутренней реализации
- [x] Версия Node.js явно указана в названии

✅ **Blocking/informational разделение:**
- [x] Blocking checks минимальны и стабильны
- [x] Informational checks не блокируют merge
- [x] Разделение зафиксировано в документации

✅ **Жизненный цикл:**
- [x] Создана TUNG-задача на удаление Node.js 18.x после EOL
- [x] План миграции зафиксирован
- [x] Документация обновлена

---

## Связанные документы

- `docs/architecture/CI_NODE_MATRIX_DECISION.md` — архитектурное решение по Node.js matrix
- `docs/tasks/TUNG_CI_NODE_18_EOL_REMOVAL.md` — задача на удаление Node.js 18.x
- `docs/CI-CD_OVERVIEW.md` — обзор CI/CD pipeline
- `.github/workflows/ci.yml` — основной CI workflow

---

**Статус:** ✅ Canonical — CI приведен в canonical состояние  
**Дата фиксации:** 2025-01-19

