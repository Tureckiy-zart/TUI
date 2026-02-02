# Release Process

**Last Updated:** 2025-02-01  
**Purpose:** Step-by-step guide for publishing releases with automated version canon enforcement

---

> ⚠️ **NO QUICK FIXES POLICY**
>
> There is no such thing as a "quick fix" in this repository.
>
> Any change that touches:
> - package.json version
> - CHANGELOG.md
> - npm publish
> - git tags
>
> MUST go through the automated release process.
>
> Manual edits or "temporary fixes" are forbidden,
> as they permanently corrupt version canon.

---

> 🔒 **CI-ONLY PUBLISH**
>
> **`npm publish` is forbidden locally.** Publication happens only in GitHub Actions CI.
> Local scripts are for preparation and validation only.

---

## Overview

This project uses a **CI-only release flow** that ensures npm publish (with provenance), git tags, and CHANGELOG are always synchronized. The system enforces Version Canon Rules by design, preventing version drift and manual errors.

**Key Principles:**
- npm registry is the single source of truth for published versions
- CHANGELOG explains releases, it does not define them
- git tags must exist for every npm-published version
- [Unreleased] is the only draft area
- **Publish is CI-only:** GitHub Actions performs `npm publish --provenance` on tag push

---

## Quick Start

```bash
# 1. Update package.json version manually
# Edit package.json: "version": "X.Y.Z"

# 2. Pre-release validation
pnpm release:check

# 3. Prepare CHANGELOG (move [Unreleased] to version section)
pnpm release:prepare

# 4. Commit and push
git add package.json CHANGELOG.md
git commit -m "chore: prepare release X.Y.Z"

# 5. Create and push tag (triggers CI publish)
git tag -a "vX.Y.Z" -m "Release vX.Y.Z"
git push origin main
git push origin vX.Y.Z
```

CI will then: validate, build, publish to npm (with provenance), and run post-release verification.

---

## Step-by-Step Release Checklist

### Step 1: Prepare [Unreleased] Section

Before releasing, ensure `CHANGELOG.md` has content under `[Unreleased]`:

```markdown
## [Unreleased]

### Added
- New feature description

### Fixed
- Bug fix description

### Changed
- Change description
```

**Requirements:**
- Use Keep a Changelog format (Added/Changed/Deprecated/Removed/Fixed/Security)
- Write in consumer-facing language (what changed for users, not how it was implemented)
- Remove all internal terminology (Authority, TUNG, Pipeline, etc.)
- For breaking changes, include migration guide links

**See:** [How to Prepare Unreleased Section](#how-to-prepare-unreleased-section) below

### Step 2: Update package.json Version

Manually update the version in `package.json`:

```json
{
  "version": "2.0.5"
}
```

**Version Guidelines:**
- Follow Semantic Versioning (semver.org)
- `MAJOR` for breaking changes
- `MINOR` for new features (backward compatible)
- `PATCH` for bug fixes (backward compatible)

### Step 3: Run Local Release Preparation

```bash
# Pre-release validation (fail fast on errors)
pnpm release:check

# Prepare CHANGELOG (move [Unreleased] to version section)
pnpm release:prepare
```

### Step 4: Commit, Tag, and Push

```bash
git add package.json CHANGELOG.md
git commit -m "chore: prepare release X.Y.Z"

# Create tag
git tag -a "vX.Y.Z" -m "Release vX.Y.Z"

# Push branch and tag (tag push triggers CI publish)
git push origin main
git push origin vX.Y.Z
```

### Step 5: CI Publishes and Verifies

GitHub Actions (triggered by tag push) will:
1. ✅ Validate package (`pnpm validate`)
2. ✅ Build package
3. ✅ Publish to npm with provenance (`npm publish --provenance`)
4. ✅ Run post-release verification (`release-verify.js`)

Post-release verification checks:
- Version exists in npm registry
- Git tag exists locally and remotely
- CHANGELOG date matches npm publish date (when applicable)
- CHANGELOG ordering is correct
- [Unreleased] section is empty

If verification fails, see [Troubleshooting](#troubleshooting) below.

---

## Individual Scripts

Local scripts for preparation and validation:

```bash
# Pre-release validation (run before preparing release)
pnpm release:check

# Prepare CHANGELOG (move [Unreleased] to version section)
pnpm release:prepare

# Post-release verification (runs in CI after publish; can be run locally for debugging)
pnpm release:verify
```

**Note:** `release:verify` is intended for CI (runs automatically after `npm publish` in GitHub Actions). Locally it is optional and mainly useful for debugging.

---

## What to Do If release-check Fails

### Error: Version Already Published

**Message:** `Version X.Y.Z is already published to npm`

**Solution:**
1. Check npm registry: `npm view @tenerife.music/ui versions --json`
2. Update `package.json` to a new version
3. Run `pnpm release:check` again

### Error: CHANGELOG Missing Version Section or [Unreleased] Content

**Message:** `CHANGELOG.md must contain either: 1. A section for version X.Y.Z, OR 2. Content under [Unreleased] section`

**Solution:**
1. Add content to `[Unreleased]` section in CHANGELOG.md
2. Or create version section manually: `## [X.Y.Z]`
3. Run `pnpm release:check` again

### Error: CHANGELOG Contains Versions Not Published to npm

**Message:** `CHANGELOG contains versions not published to npm: X.Y.Z`

**Solution:**
1. Remove orphan versions from CHANGELOG.md
2. Or publish missing versions to npm (if they should exist)
3. Run `pnpm release:check` again

### Error: Git Tag Already Exists

**Message:** `Git tag vX.Y.Z already exists`

**Solution:**
```bash
# Delete local tag
git tag -d vX.Y.Z

# Delete remote tag (if pushed)
git push origin --delete vX.Y.Z

# Then create and push tag again to trigger CI
git tag -a "vX.Y.Z" -m "Release vX.Y.Z"
git push origin vX.Y.Z
```

---

## Emergency Rollback

### Unpublish from npm (Within 72 Hours)

**⚠️ Warning:** Only unpublish if absolutely necessary and within 72 hours of publish.

```bash
# Unpublish specific version
npm unpublish @tenerife.music/ui@X.Y.Z

# Or unpublish entire package (use with extreme caution)
npm unpublish @tenerife.music/ui --force
```

**After unpublishing:**
1. Remove version section from CHANGELOG.md
2. Delete git tag: `git tag -d vX.Y.Z && git push origin --delete vX.Y.Z`
3. Update package.json to previous version

### Delete Git Tags

```bash
# Delete local tag
git tag -d vX.Y.Z

# Delete remote tag
git push origin --delete vX.Y.Z
```

### Revert CHANGELOG Changes

If release failed after CHANGELOG was modified:

```bash
# Check what changed
git diff CHANGELOG.md

# Revert changes
git checkout CHANGELOG.md

# Or restore from backup (if you created one)
cp CHANGELOG.legacy.md CHANGELOG.md
```

---

## How to Prepare Unreleased Section

### Format Requirements

Follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format:

```markdown
## [Unreleased]

### Added
- New features for users

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security fixes
```

### What Goes in Each Section

**Added:**
- New components, utilities, or features
- New exports or APIs
- New token exports
- New Storybook stories or documentation

**Changed:**
- API improvements (non-breaking)
- Performance improvements
- Internal refactors that affect behavior (describe outcome, not implementation)

**Deprecated:**
- Features that will be removed in a future version
- Include migration path or replacement

**Removed:**
- Features removed in this version
- Include migration guide link if applicable

**Fixed:**
- Bug fixes
- Accessibility improvements
- TypeScript errors fixed
- Test fixes

**Security:**
- Security vulnerabilities fixed

### Breaking Changes

For breaking changes, add a dedicated section:

```markdown
### Breaking Changes

- **Component API Change**: Description of what changed
  - Migration: `old API` → `new API`
  - See [Migration Guide](./docs/migrations/COMPONENT_MIGRATION.md) for details
```

**Rules:**
- Keep breaking change descriptions concise
- Include migration examples
- Link to detailed migration guide (don't duplicate full guide in changelog)

### Language Guidelines

**✅ Good (Consumer-Facing):**
- "Added IconButton component for icon-only buttons"
- "Fixed missing exports for Popover and Tooltip"
- "Improved contrast in PriceRangeSlider for better accessibility"

**❌ Bad (Internal Terminology):**
- "Foundation lock sweep finalized"
- "Authority compliance achieved"
- "Pipeline 18A completed"

**Focus on:**
- What changed for users
- How it affects their code
- What they need to do (if anything)

---

## Version Canon Rules Reference

This release process enforces the Version Canon Rules defined in `CHANGELOG.md`:

1. **Canonical Source**: npm registry is the single source of truth
2. **Changelog Requirements**: Only versions published to npm may appear in CHANGELOG with dates
3. **Version Format**: Follows Semantic Versioning
4. **Date Format**: ISO 8601 (YYYY-MM-DD), matches npm publish date
5. **Unreleased Section**: Use `[Unreleased]` for future changes not yet published
6. **Internal Versions**: Versions not published to npm should not appear in public CHANGELOG
7. **No Retroactive Changes**: Published entries must not be modified retroactively
8. **Chronological Order**: Versions ordered newest → oldest, matching npm publish order

**Full rules:** See `CHANGELOG.md` → "Version Canon Rules" section

---

## Troubleshooting

### CI Fails at Build or Validate Step

**Check:**
- All tests pass locally: `pnpm test`
- TypeScript compiles: `pnpm typecheck`
- Build succeeds: `pnpm build`
- Validation passes: `pnpm validate`

**Fix:** Resolve build/test errors locally, commit fixes, then re-push the tag or delete and recreate it

### CI Fails at npm Publish

**Check:**
- OIDC Trusted Publisher is configured for the package on npmjs.com
- GitHub environment `npm-release` exists and has `id-token: write` permission
- Workflow job has `permissions: id-token: write`

**Fix:**
- Configure Trusted Publisher in npm package settings (Organization/User → Package → Trusted Publishers)
- Ensure GitHub environment `npm-release` is set up with required permissions
- Re-run the failed workflow or push to main again

### CHANGELOG Date Doesn't Match npm Date

**Check:**
- Wait a few seconds after CI publish (npm API may have slight delay)
- Verify npm date: `npm view @tenerife.music/ui@X.Y.Z time --json`

**Fix:**
- Manually update CHANGELOG date to match npm publish date
- Commit and push the change

### Git Tag Push Fails

**Check:**
- You have push permissions
- Remote is configured: `git remote -v`

**Fix:**
```bash
# Push tag manually
git push origin vX.Y.Z

# Verify tag exists remotely
git ls-remote --tags origin vX.Y.Z
```

Note: Tag push triggers the CI release workflow. Without tag push, no publish occurs.

---

## Related Documentation

- **Version Canon Table:** `docs/reports/changelog/VERSION_CANON_TABLE.md`
- **Git Tag Sync Plan:** `docs/reports/changelog/GIT_TAG_SYNC_PLAN.md`
- **CHANGELOG Version Canon Rules:** `CHANGELOG.md` → "Version Canon Rules" section
- **Migration Guides:** `docs/migrations/`

---

## Support

If you encounter issues not covered in this guide:

1. Check error messages carefully (they explain what's wrong)
2. Review Version Canon Rules in CHANGELOG.md
3. Verify npm registry state: `npm view @tenerife.music/ui versions --json`
4. Check git tags: `git tag --list`
5. Review CHANGELOG.md structure

