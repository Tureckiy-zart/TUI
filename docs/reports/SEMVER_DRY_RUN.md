# Semantic Release Dry-Run Report

**Date**: 2025-11-22  
**Status**: ✅ Configuration Valid  
**semantic-release version**: 25.0.2

## Dry-Run Results

### Configuration Validation

All semantic-release plugins loaded successfully:

- ✅ **@semantic-release/changelog** - verifyConditions, prepare
- ✅ **@semantic-release/npm** - verifyConditions, prepare, publish, addChannel
- ✅ **@semantic-release/github** - verifyConditions, publish, addChannel, success, fail
- ✅ **@semantic-release/git** - verifyConditions, prepare
- ✅ **@semantic-release/commit-analyzer** - analyzeCommits
- ✅ **@semantic-release/release-notes-generator** - generateNotes

### Configuration File

- ✅ `release.config.cjs` loaded successfully
- ✅ Branch configuration: `main`
- ✅ All plugins configured correctly

### Dry-Run Command

```bash
npx semantic-release --dry-run
```

### Output Summary

```
[semantic-release] › ℹ  Running semantic-release version 25.0.2
[semantic-release] › ✔  Loaded plugin "verifyConditions" from "@semantic-release/changelog"
[semantic-release] › ✔  Loaded plugin "verifyConditions" from "@semantic-release/npm"
[semantic-release] › ✔  Loaded plugin "verifyConditions" from "@semantic-release/github"
[semantic-release] › ✔  Loaded plugin "verifyConditions" from "@semantic-release/git"
[semantic-release] › ✔  Loaded plugin "analyzeCommits" from "@semantic-release/commit-analyzer"
[semantic-release] › ✔  Loaded plugin "generateNotes" from "@semantic-release/release-notes-generator"
[semantic-release] › ✔  Loaded plugin "prepare" from "@semantic-release/changelog"
[semantic-release] › ✔  Loaded plugin "prepare" from "@semantic-release/npm"
[semantic-release] › ✔  Loaded plugin "prepare" from "@semantic-release/git"
[semantic-release] › ✔  Loaded plugin "publish" from "@semantic-release/npm"
[semantic-release] › ✔  Loaded plugin "publish" from "@semantic-release/github"
[semantic-release] › ✔  Loaded plugin "addChannel" from "@semantic-release/npm"
[semantic-release] › ✔  Loaded plugin "addChannel" from "@semantic-release/github"
[semantic-release] › ✔  Loaded plugin "success" from "@semantic-release/github"
[semantic-release] › ✔  Loaded plugin "fail" from "@semantic-release/github"
```

### Branch Configuration

- **Configured branch**: `main`
- **Note**: Dry-run will only publish when run on `main` branch
- **Current behavior**: No release will be created if run on other branches

### Plugin Verification

All required plugins are installed and configured:

1. **@semantic-release/commit-analyzer**
   - Analyzes commits to determine version bump
   - Preset: `conventionalcommits`

2. **@semantic-release/release-notes-generator**
   - Generates release notes from commits
   - Preset: `conventionalcommits`

3. **@semantic-release/changelog**
   - Updates CHANGELOG.md file
   - Output file: `CHANGELOG.md`

4. **@semantic-release/npm**
   - Publishes package to npm
   - Enabled: `npmPublish: true`

5. **@semantic-release/github**
   - Creates GitHub Releases
   - Assets: `storybook-static/**/*`

6. **@semantic-release/git**
   - Commits version changes
   - Assets: `CHANGELOG.md`, `package.json`
   - Message: `chore(release): ${nextRelease.version} [skip ci]`

## Configuration Files

### release.config.cjs

```javascript
module.exports = {
  branches: ["main"],
  plugins: [
    ["@semantic-release/commit-analyzer", { preset: "conventionalcommits" }],
    ["@semantic-release/release-notes-generator", { preset: "conventionalcommits" }],
    ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
    ["@semantic-release/npm", { npmPublish: true }],
    ["@semantic-release/github", { assets: ["storybook-static/**/*"] }],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
```

**Status**: ✅ Valid configuration

## Package Configuration

### package.json Settings

- ✅ Version: `0.0.0` (managed by semantic-release)
- ✅ Name: `@tenerife.music/ui`
- ✅ publishConfig.access: `public`
- ✅ Private: `false`

## Commit Convention

### Required Commit Format

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Commit Types

- `feat`: New feature (triggers minor version bump)
- `fix`: Bug fix (triggers patch version bump)
- `perf`: Performance improvement (triggers patch version bump)
- `refactor`: Code refactoring (no version bump)
- `docs`: Documentation changes (no version bump)
- `style`: Code style changes (no version bump)
- `test`: Test additions/changes (no version bump)
- `chore`: Build/tooling changes (no version bump)
- `BREAKING CHANGE`: Breaking change (triggers major version bump)

### Examples

**Minor version bump**:

```
feat: add new Button component
```

**Patch version bump**:

```
fix: resolve modal z-index issue
```

**Major version bump**:

```
feat: redesign API

BREAKING CHANGE: Button props API changed
```

**No version bump**:

```
docs: update README
chore: update dependencies
```

## Release Process

### Automatic Release Triggers

Releases are automatically created when:

1. Conventional commit is pushed to `main` branch
2. Commit message indicates version change needed
3. No existing release exists for that version
4. GitHub Actions workflow runs successfully

### Release Workflow

1. **Analyze commits** - Determine version bump type
2. **Generate notes** - Create release notes from commits
3. **Update changelog** - Add entry to CHANGELOG.md
4. **Bump version** - Update package.json version
5. **Publish to npm** - Publish package to npm registry
6. **Create GitHub Release** - Create release with notes and assets
7. **Commit changes** - Commit version updates to git
8. **Create git tag** - Tag release in git

## Testing Recommendations

### Before First Release

1. ✅ Verify all plugins loaded (completed)
2. ⚠️ Test with actual conventional commit
3. ⚠️ Verify NPM_TOKEN is set in GitHub Secrets
4. ⚠️ Verify npm scope access
5. ⚠️ Test release workflow manually

### Manual Testing

1. Create a test conventional commit:

   ```bash
   git commit -m "feat: test release trigger"
   ```

2. Push to `main` branch (or merge PR)

3. Monitor GitHub Actions workflow

4. Verify:
   - Release created on GitHub
   - Package published to npm
   - CHANGELOG.md updated
   - package.json version updated
   - Git tag created

## Known Limitations

### Dry-Run Limitations

- Dry-run doesn't actually publish to npm
- Dry-run doesn't create GitHub Releases
- Dry-run doesn't commit changes
- Dry-run doesn't create git tags
- Dry-run only validates configuration

### Branch Restrictions

- Releases only trigger on `main` branch
- Other branches will be skipped automatically
- Feature branches won't trigger releases

## Next Steps

1. ✅ Configuration validated (completed)
2. ⚠️ Set up NPM_TOKEN in GitHub Secrets (see `SEMVER_NPM_VALIDATION.md`)
3. ⚠️ Verify npm scope access
4. ⚠️ Make first conventional commit
5. ⚠️ Push to `main` branch
6. ⚠️ Monitor first release workflow

## Troubleshooting

### Issue: No release created

**Possible causes**:

- No conventional commits found
- Already released version exists
- Not on `main` branch
- Workflow didn't run

**Solutions**:

- Verify commit messages follow conventional format
- Check semantic-release logs in GitHub Actions
- Ensure workflow runs on `main` branch

### Issue: Release fails

**Possible causes**:

- Missing NPM_TOKEN
- npm publish fails
- GitHub Release fails

**Solutions**:

- Verify NPM_TOKEN exists in GitHub Secrets
- Check npm scope permissions
- Review workflow logs for specific errors

## Additional Resources

- Semantic Release Docs: https://semantic-release.gitbook.io/
- Conventional Commits: https://www.conventionalcommits.org/
- npm Publishing: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
- GitHub Actions: https://docs.github.com/en/actions
