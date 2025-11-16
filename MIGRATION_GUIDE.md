# Migration Guide: Moving to Standalone Repository

This guide explains how to move the UI library from staging folder to a new standalone Git repository.

## Prerequisites

- New empty Git repository created (GitHub, GitLab, etc.)
- Repository URL (e.g., `https://github.com/tenerife-music/tenerife-ui.git`)

## Step-by-Step Migration

### Step 1: Prepare Files for Migration

Files to **EXCLUDE** (already in `.gitignore`):
- `node_modules/` - Dependencies (will be reinstalled)
- `dist/` - Build artifacts (will be regenerated)
- `storybook-static/` - Storybook build (will be regenerated)
- `.pnpm-store/` - pnpm cache
- `coverage/` - Test coverage reports
- `*.log` - Log files

Files to **INCLUDE**:
- All source code (`src/`)
- Configuration files (`package.json`, `tsconfig.json`, `vite.config.ts`, etc.)
- Documentation (`README.md`, `CHANGELOG.md`, `LICENSE`)
- Storybook config (`.storybook/`)
- Test files (`*.test.ts`, `*.test.tsx`)
- Stories (`*.stories.tsx`)
- `.gitignore`

### Step 2: Copy Files to New Repository

#### Option A: Using Git (Recommended)

```bash
# 1. Clone your new empty repository
cd /path/to/your/workspace
git clone <your-repo-url> tenerife-ui
cd tenerife-ui

# 2. Copy all files from staging (excluding node_modules, dist, etc.)
# From the monorepo root:
cd /Users/stefand/Desktop/Projects/tenerife_music_v_2.0
rsync -av --exclude='node_modules' \
          --exclude='dist' \
          --exclude='storybook-static' \
          --exclude='coverage' \
          --exclude='.pnpm-store' \
          --exclude='*.log' \
          .staging/tenerife-ui/ /path/to/tenerife-ui/

# Or use cp with exclusions:
cd .staging/tenerife-ui
find . -type f \
  ! -path '*/node_modules/*' \
  ! -path '*/dist/*' \
  ! -path '*/storybook-static/*' \
  ! -path '*/coverage/*' \
  ! -path '*/.pnpm-store/*' \
  ! -name '*.log' \
  -exec cp --parents {} /path/to/tenerife-ui/ \;
```

#### Option B: Manual Copy (Simpler)

```bash
# 1. Clone your new empty repository
cd /path/to/your/workspace
git clone <your-repo-url> tenerife-ui
cd tenerife-ui

# 2. Copy files manually (from monorepo root)
cd /Users/stefand/Desktop/Projects/tenerife_music_v_2.0/.staging/tenerife-ui

# Copy all files except build artifacts
cp -r src/ /path/to/tenerife-ui/
cp -r .storybook/ /path/to/tenerife-ui/
cp -r stories/ /path/to/tenerife-ui/
cp package.json /path/to/tenerife-ui/
cp tsconfig.json /path/to/tenerife-ui/
cp tsconfig.test.json /path/to/tenerife-ui/
cp vite.config.ts /path/to/tenerife-ui/
cp tailwind.config.ts /path/to/tenerife-ui/
cp jest.config.cjs /path/to/tenerife-ui/
cp jest.setup.js /path/to/tenerife-ui/
cp eslint.config.mjs /path/to/tenerife-ui/
cp components.json /path/to/tenerife-ui/
cp .gitignore /path/to/tenerife-ui/
cp README.md /path/to/tenerife-ui/
cp CHANGELOG.md /path/to/tenerife-ui/
cp LICENSE /path/to/tenerife-ui/
```

### Step 3: Initialize Git and Create First Commit

```bash
cd /path/to/tenerife-ui

# Check what will be committed
git status

# Add all files
git add .

# Create initial commit
git commit -m "feat: initial release of @tenerife.music/ui v0.0.1

- 74 React components extracted from Tenerife.Music monorepo
- Full TypeScript support
- Storybook documentation
- Jest test infrastructure
- Tailwind CSS integration
- shadcn/ui based primitives"

# Verify commit
git log --oneline
```

### Step 4: Connect to Remote and Push

```bash
# Verify remote is set (should already be set from clone)
git remote -v

# If remote is not set, add it:
# git remote add origin <your-repo-url>

# Push to remote
git push -u origin main

# Or if your default branch is 'master':
# git push -u origin master
```

### Step 5: Install Dependencies and Verify

```bash
cd /path/to/tenerife-ui

# Install dependencies
pnpm install

# Build the package
pnpm build

# Run tests
pnpm test

# Build Storybook
pnpm build-storybook

# Type check
pnpm typecheck

# Lint
pnpm lint
```

### Step 6: Create Initial Release Tag

```bash
# Tag the initial release
git tag -a v0.0.1 -m "Release version 0.0.1"

# Push tags
git push origin v0.0.1
```

## Verification Checklist

After migration, verify:

- [ ] All source files copied (`src/` directory)
- [ ] Configuration files present (`package.json`, `tsconfig.json`, etc.)
- [ ] `.gitignore` is in place
- [ ] `node_modules` is NOT in repository (check `.gitignore`)
- [ ] `dist` is NOT in repository (check `.gitignore`)
- [ ] Git repository initialized
- [ ] Initial commit created
- [ ] Remote repository connected
- [ ] Code pushed to remote
- [ ] Dependencies install successfully
- [ ] Build works (`pnpm build`)
- [ ] Tests pass (`pnpm test`)
- [ ] Storybook builds (`pnpm build-storybook`)

## Troubleshooting

### If files are too large

If you accidentally included `node_modules` or `dist`:

```bash
# Remove from git cache
git rm -r --cached node_modules dist storybook-static

# Commit the removal
git commit -m "chore: remove build artifacts from repository"

# Push
git push
```

### If remote is not set

```bash
# Add remote
git remote add origin <your-repo-url>

# Verify
git remote -v

# Push
git push -u origin main
```

### If you need to change default branch

```bash
# Rename branch
git branch -M main

# Push with new branch name
git push -u origin main
```

## Next Steps

After successful migration:

1. Set up GitHub Actions for CI/CD (see Step 7 in main guide)
2. Configure npm publishing (see Step 6 in main guide)
3. Update monorepo to use external package (see Step 8 in main guide)

