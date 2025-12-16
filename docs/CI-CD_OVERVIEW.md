# 🚀 Tenerife.UI — CI/CD Overview (2025 Edition)

This document describes the **complete CI/CD pipeline structure** for the Tenerife.UI library. It defines the role of each workflow, execution order, triggers, responsibilities, and architecture. This document is the reference standard and must always remain up to date.

---

# 📁 1. General CI/CD Structure

The library uses **6 independent pipelines**, each responsible for its own area:

1. **Quality Checks** — code quality checks, testing, and accessibility (lint, tests, a11y).
2. **Full CI/CD** — complete pipeline for main branch (quality, build, storybook, release).
3. **Chromatic Visual Tests** — visual regression testing for components.
4. **Release (manual)** — manual semantic-release → npm publish.
5. **Storybook Deploy** — Storybook publication to GitHub Pages.
6. **Test NPM Token** — debugging tool for NPM_TOKEN verification.

These pipelines work independently and should NOT be combined.

---

# 🟦 2. Quality Checks Pipeline

**File:** `.github/workflows/quality.yml`

**Triggers:**

- push: `main`, `develop`, `feature/**`
- pull_request → `main`, `develop`

### 🔍 What it does:

- 🧹 Lint (ESLint) — via `scripts/lint-ci.sh` and `pnpm lint:check`
- 🧪 Unit tests — `pnpm test`
- ♿ Accessibility tests — `pnpm ci:a11y`
- 📤 Upload lint artifacts (lint-report.md, prettier logs)

### 🎯 Purpose:

Ensure that code **passes linting, tests, and accessibility checks** on all development branches.

### 📝 Note:

Quality does not build the library or deploy Storybook — it only checks code quality. For full verification, use `ci.yml` on the main branch.

---

# 🟨 3. Full CI/CD Pipeline

**File:** `.github/workflows/ci.yml`

**Triggers:**

- push: `main`
- pull_request → `main`

### 🔍 What it does:

**Job: quality**
- 🧹 Lint — `pnpm lint`
- 🎨 Prettier check — `pnpm format:check`
- 🔍 TypeScript typecheck — `pnpm typecheck`
- 🔄 Matrix testing: Node.js 18.x, 20.x, 22.x

**Job: build** (depends on quality)
- 🏗 Build library — `pnpm build`

**Job: storybook** (depends on build)
- 📚 Build Storybook — `pnpm build-storybook`
- 📤 Upload Storybook artifact

**Job: release** (depends on quality + build, main branch only)
- 📦 Semantic Release — `npx semantic-release`
- 🚀 Automatic npm publication (if there are new commits for release)

### 🎯 Purpose:

Provide **complete CI/CD cycle for main branch**: quality checks, build, testing on different Node.js versions, Storybook build, and automatic publication when release commits are present.

### 📝 Note:

This is the main pipeline for the main branch. The release job runs automatically only if semantic-release determines there are commits for release.

---

# 🟣 4. Chromatic Visual Tests Pipeline

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

# 🟩 5. Release Pipeline (manual semantic-release)

**File:** `.github/workflows/release.yml`

**Triggers:**

- ❗️ _Manual only_ via "Run Workflow" (`workflow_dispatch`).

### 🔍 What it does:

- Installs PNPM and Node.js 22
- Runs accessibility suite — `pnpm ci:a11y`
- Configures NPM token
- Runs `semantic-release` (npm publish + git tag + GitHub Release)

### 🎯 Purpose:

Allow manual library version releases **without manually changing version in package.json**.

### 🔥 semantic-release automatically:

- determines new version from commit messages
- generates changelog
- creates GitHub Release
- publishes to npm

### 📝 Note:

Alternative to automatic release in `ci.yml`. Used for manual control of the release process.

---

# 🟪 6. Storybook Deploy Pipeline

**File:** `.github/workflows/storybook-deploy.yml`

**Triggers:**

- push → `main`
- manually (`workflow_dispatch`)

### 🔍 What it does:

- builds Storybook (`storybook-static`)
- uploads artifact
- publishes to GitHub Pages via Pages API

### 🎯 Purpose:

Maintain a **live online version of Storybook** as documentation for designers and developers.

### 🌐 Deployment URL:

- generated via GitHub Pages environment.

---

# 🟧 7. Test NPM Token (Manual Diagnostics)

**File:** `.github/workflows/test-npm-token.yml`

**Triggers:**

- manually (`workflow_dispatch`)
- automatically on push to `main` (only if the workflow file itself is changed)

### 🔍 What it does:

- checks for `NPM_TOKEN` in GitHub Secrets
- verifies token format (must start with `npm_`)
- performs dry-run publish (does not publish real package)
- checks package existence on npm
- runs `semantic-release --dry-run`

### 🎯 Purpose:

**Verify NPM token functionality** to avoid release failures.

### 📝 Note:

This workflow is NOT part of the main CI — it's a developer tool for diagnosing npm token issues.

---

# 🧩 8. Local CI for Developers

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

# 🛠 9. Husky Hooks

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

# 🧱 10. General Pipeline Architecture

```
           ┌──────────────────────┐
           │   Developer push     │
           └─────────┬────────────┘
                     │
        ┌────────────▼──────────────┐
        │     QUALITY PIPELINE      │
        │  (main/develop/feature)   │
        │  lint / test / a11y       │
        └────────────┬──────────────┘
                     │
         (main only) ▼
        ┌────────────────────────────┐
        │      FULL CI/CD PIPELINE   │
        │  quality (matrix)          │
        │  → build                   │
        │  → storybook               │
        │  → release (auto if needed)│
        └────────────┬───────────────┘
                     │
         ┌───────────▼─────────────┐
         │ STORYBOOK DEPLOY PIPELINE│
         │   deploy to GitHub Pages │
         └──────────────────────────┘

         ┌──────────────────────────┐
         │  CHROMATIC VISUAL TESTS   │
         │  (PR to main/develop)     │
         └──────────────────────────┘

Manual: RELEASE, TEST-NPM-TOKEN
```

---

# 🏁 11. Summary

The library's CI/CD systems are separated by purpose:

| Workflow             | Purpose              | Automatic | Executes                     |
| -------------------- | -------------------- | --------- | ---------------------------- |
| **Quality**          | Quality checks       | ✔         | lint, tests, a11y            |
| **Full CI/CD**       | Full pipeline        | ✔ (main)  | quality, build, storybook, release |
| **Chromatic**        | Visual tests         | ✔ (PR/main) | visual regression tests    |
| **Release**          | npm publication      | ❌ (manual) | semantic-release           |
| **Storybook Deploy** | Online documentation | ✔ (main)  | GitHub Pages                 |
| **Test NPM Token**   | Token diagnostics    | ❌ (manual) | dry-run publish            |

This ensures:

- stability
- predictability
- security of npm publications
- development convenience
- professional CI/CD level

---

Done. If needed, I can create a visual diagram in SVG/ASCII, or add a "Troubleshooting CI/CD" section. Should we expand?
