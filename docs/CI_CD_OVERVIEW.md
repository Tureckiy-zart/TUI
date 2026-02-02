# 🚀 Tenerife.UI — CI/CD Overview (2025 Edition)

This document describes the **complete CI/CD pipeline structure** for the Tenerife.UI library. It defines the role of each workflow, execution order, triggers, responsibilities, and architecture. This document is the reference standard and must always remain up to date.

---

# 📁 1. General CI/CD Structure

The library uses **2 workflows** as single source of truth:

1. **Full CI/CD** — complete pipeline for main branch (quality, build, storybook, semantic-release, npm publish via OIDC).
2. **Chromatic Visual Tests** — visual regression testing for components (informational).

Publish uses **OIDC Trusted Publisher** only. No token-based auth.

---

# 🟨 2. Full CI/CD Pipeline

**File:** `.github/workflows/ci.yml`

**Triggers:**

- push: `main`
- pull_request → `main`

### 🔍 What it does:

**Job: quality** (matrix strategy)
- 🔄 Matrix testing: Node.js 18.x [Legacy, non-blocking], 20.x [BLOCKING]
- 🧹 Lint — `pnpm lint`
- 🎨 Prettier check — `pnpm format:check`
- 🔍 TypeScript typecheck — `pnpm typecheck`
- **Blocking status:** Node.js 20.x блокирует PR, Node.js 18.x — informational (до EOL в апреле 2025)

**Job: build** (depends on quality) [BLOCKING]
- 🏗 Build library — `pnpm build`
- **Blocking status:** Обязательная проверка, блокирует PR при ошибках

**Job: storybook** (depends on build) [Informational]
- 📚 Build Storybook — `pnpm build-storybook`
- 📤 Upload Storybook artifact
- **Blocking status:** Информационная проверка, не блокирует PR

**Job: release** (depends on quality + build, main branch only)
- 📦 Semantic Release — `npx semantic-release` (prepares version, changelog, git tag, GitHub Release; npm publish disabled)
- 🚀 Publish to npm (OIDC) — `npm publish --provenance --access public` (OIDC Trusted Publisher)

### 🎯 Purpose:

Provide **complete CI/CD cycle for main branch**: quality checks, build, Storybook, and automatic publication via OIDC when release commits are present.

### 📝 Note:

This is the main pipeline for the main branch. Publish uses OIDC Trusted Publisher. Ensure GitHub environment `npm-release` has `id-token: write` permission.

---

# 🟣 3. Chromatic Visual Tests Pipeline

**File:** `.github/workflows/chromatic.yml`

**Triggers:**

- pull_request → `main`, `develop`
- push: `main`

### 🔍 What it does:

- 📸 Visual regression testing for components
- 🔍 Compare Storybook changes with baseline version
- ✅ Check for visual changes in components

### 🎯 Purpose:

Detect **unintended visual changes** in components before merging to main or develop.

### 📝 Note:

Uses Chromatic for visual testing. Requires `CHROMATIC_PROJECT_TOKEN` in GitHub Secrets.

---

# 🧩 4. Local CI for Developers

**File:** `scripts/ci-local.sh`

**Run manually:**

```
pnpm ci:local
```

### 🔍 What it does:

1. 🧹 Clean — `pnpm clean`
2. 📦 Install dependencies — `pnpm install --frozen-lockfile`
3. 🔍 Lint check — `pnpm lint:check`
4. 💅 Format check — `pnpm format:check`
5. 🔷 Typecheck — `pnpm typecheck`
6. 🏗 Build library — `pnpm build`
7. 📚 Build Storybook — `pnpm build-storybook`

### 🎯 Purpose:

Have **100% identical CI** as in GitHub Actions, but locally. Allows checking all stages before push.

---

# 🛠 5. Husky Hooks

**Purpose:** prevent low-quality code from entering the repository.

### `.husky/pre-commit`

- runs `lint-staged`
- auto-fix only changed files

### `.husky/pre-push`

- runs minimal CI subset before push:
  - 📘 TypeScript typecheck — `pnpm typecheck`
  - 💅 Prettier format check — `pnpm format:check`
  - 🔍 ESLint strict check — `pnpm lint:strict` (no warnings allowed)
  - 🏗 Build library — `pnpm build`
  - 🧪 Unit tests — `pnpm test`

### `.husky/commit-msg`

- validates conventional commits (commitlint)

---

# 🧱 6. General Pipeline Architecture

```
           ┌──────────────────────┐
           │   Developer push     │
           └─────────┬────────────┘
                     │
        ┌────────────▼──────────────┐
        │      FULL CI/CD PIPELINE  │
        │  (main / PR to main)      │
        │  quality (matrix)         │
        │  → build                  │
        │  → storybook              │
        │  → release (main only)    │
        │    • semantic-release     │
        │    • npm publish (OIDC)   │
        └────────────┬──────────────┘
                     │
         ┌───────────▼──────────────┐
         │  CHROMATIC VISUAL TESTS  │
         │  (PR to main/develop)    │
         │  [Informational]         │
         └──────────────────────────┘
```

---

# 🔒 7. Blocking vs Informational Checks

CI checks явно разделены на **blocking** (блокирующие PR) и **informational** (информационные, не блокирующие).

## Blocking Checks (обязательные)

Эти проверки **блокируют merge PR** при ошибках:

- ✅ **Quality Checks (Node 20.x) [BLOCKING]** — lint, format, typecheck на Node.js 20.x
- ✅ **Build Package [BLOCKING]** — сборка библиотеки
- ✅ **Quality Checks (Node 22.x) [BLOCKING]** — quality pipeline на Node.js 22.x

**Принцип:** Минимальный набор стабильных проверок, которые гарантируют качество кода.

## Informational Checks (информационные)

Эти проверки **не блокируют merge**, но предоставляют важную информацию:

- ℹ️ **Quality Checks (Node 18.x) [Legacy]** — мониторинг совместимости до EOL (апрель 2025)
- ℹ️ **Storybook Build [Informational]** — проверка сборки документации
- ℹ️ **Chromatic Visual Tests [Informational]** — визуальные регрессионные тесты

**Принцип:** Позволяют мониторить дополнительные аспекты без блокировки разработки.

## Naming Convention

Все CI checks используют canonical naming с явными маркерами:

- `[BLOCKING]` — обязательная проверка
- `[Legacy]` — устаревшая версия (до удаления)
- `[Informational]` — информационная проверка
- `[Main Only]` — выполняется только на main branch

**Примеры:**
- `Quality Checks (Node 20.x) [BLOCKING]`
- `Quality Checks (Node 18.x) [Legacy]`
- `Chromatic Visual Tests [Informational]`

---

# 🏁 8. Summary

The library uses 2 workflows:

| Workflow       | Purpose           | Automatic     | Executes                                    | Blocking Status |
| -------------- | ----------------- | ------------- | ------------------------------------------- | --------------- |
| **Full CI/CD** | Complete pipeline | ✔ (main/PR)   | quality (matrix), build, storybook, release  | ✅ Blocking     |
| **Chromatic**  | Visual tests      | ✔ (PR/main)   | visual regression tests                     | ℹ️ Informational |

**Publish:** OIDC Trusted Publisher only. Environment `npm-release` with `id-token: write`.

This ensures:

- stability
- predictability
- OIDC-based npm publication (no long-lived tokens)
- development convenience

---

Done. If needed, I can create a visual diagram in SVG/ASCII, or add a "Troubleshooting CI/CD" section. Should we expand?
