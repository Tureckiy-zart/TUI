# Semantic Release & NPM Validation Guide

This document provides instructions for validating npm package configuration and setting up required tokens for semantic-release automated publishing.

## NPM Scope Validation

### Package Information

- **Package Name**: `@tenerife.music/ui`
- **Package Scope**: `@tenerife.music`
- **Repository**: `https://github.com/Tureckiy-zart/tenerife-ui.git`
- **Current Version**: `0.0.0` (managed by semantic-release)

### Verify NPM Scope Access

1. **Check if package exists on npm**:

   ```bash
   npm info @tenerife.music/ui
   ```

   **Expected outcomes**:
   - If package exists: Returns package information
   - If package doesn't exist: Returns 404 error (acceptable for first release)

2. **Verify npm scope ownership**:
   - Go to https://www.npmjs.com/org/tenerife.music
   - Ensure you have access to publish packages under `@tenerife.music` scope
   - If organization doesn't exist, you may need to create it or use a different scope

3. **Verify package name matches scope**:
   - Package name in `package.json`: `@tenerife.music/ui`
   - Ensure scope `@tenerife.music` is owned by you/your organization
   - If not owned, you won't be able to publish

### Scope Issues and Solutions

**Issue**: Cannot publish to scope `@tenerife.music`

**Solutions**:

1. Create npm organization at https://www.npmjs.com/org/create
2. Use personal scope (e.g., `@tureckiy-zart/ui`)
3. Publish as unscoped package (e.g., `tenerife-ui`)

**Note**: Changing package scope requires updating:

- `package.json` name field
- Import paths in documentation
- Package installation instructions

## NPM Token Setup

### Step 1: Create NPM Automation Token

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Replace `YOUR_USERNAME` with your npm username

2. Click **"Create New Token"** or **"Generate New Token"**

3. Select token type:
   - **Automation Token** (recommended for CI/CD)
     - Grants access to publish packages
     - Does not expire automatically
     - Cannot be used for 2FA-protected operations

   - **Granular Access Token** (alternative)
     - More fine-grained permissions
     - Can set expiration
     - Requires npm CLI 9.5.0+

4. Configure token permissions:
   - **Type**: Automation
   - **Packages**: Select `@tenerife.music/ui` or "All packages"
   - **Permissions**: Read and Publish

5. Click **"Generate Token"**

6. **Copy the token immediately** (it won't be shown again):
   ```
   npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Step 2: Add NPM Token to GitHub Secrets

1. Go to your GitHub repository:
   - `https://github.com/Tureckiy-zart/tenerife-ui`

2. Navigate to **Settings** → **Secrets and variables** → **Actions**

3. Click **"New repository secret"**

4. Configure the secret:
   - **Name**: `NPM_TOKEN`
   - **Value**: Paste your npm automation token
   - **Note**: Token starts with `npm_`

5. Click **"Add secret"**

6. Verify secret exists:
   - Should see `NPM_TOKEN` in the secrets list
   - Status should be "Active"

### Step 3: Verify Token Configuration

**Local Verification** (optional):

```bash
# Test npm authentication
npm whoami

# Test package access
npm access ls-packages @tenerife.music
```

**GitHub Actions Verification**:

1. Push a commit to `main` branch
2. Check Actions tab for release workflow
3. Verify workflow uses `NPM_TOKEN` from secrets
4. Check workflow logs for npm authentication success

### Token Security

**Best Practices**:

- Use **Automation tokens** for CI/CD (not personal tokens)
- Store tokens in GitHub Secrets (never in code)
- Rotate tokens periodically
- Use least-privilege access
- Monitor token usage

**Token Types**:

- **Automation**: For CI/CD pipelines (recommended)
- **Granular Access**: Fine-grained permissions (requires npm CLI 9.5.0+)
- **Classic**: Legacy token type (not recommended)

## GitHub Token Setup

### Built-in GITHUB_TOKEN

The workflow uses the built-in `GITHUB_TOKEN` which is automatically provided by GitHub Actions.

**No setup required** - The token is available in all workflows as `secrets.GITHUB_TOKEN`.

**Permissions**:

- Create GitHub Releases
- Create git tags
- Push to repository
- Create releases

**Limitations**:

- Automatically created per workflow run
- Limited to repository scope
- Expires when workflow completes

### Verify GitHub Token

The token is automatically available in workflows. No manual setup needed.

To verify it's being used:

1. Check workflow logs for "Creating release" messages
2. Verify GitHub Releases are created
3. Check git tags are created

## Release Workflow Configuration

### Required Secrets

The `.github/workflows/release.yml` workflow requires:

1. **NPM_TOKEN** (manual setup required):
   - Source: npmjs.com automation token
   - Purpose: Publish package to npm
   - Status: Must be added manually

2. **GITHUB_TOKEN** (automatic):
   - Source: Automatically provided by GitHub Actions
   - Purpose: Create releases, tags
   - Status: Automatically available

### Workflow Environment Variables

The workflow sets these environment variables:

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Both tokens are required for the release workflow to function.

## Validation Checklist

Before first release, verify:

- [ ] Package name matches npm scope (`@tenerife.music/ui`)
- [ ] npm organization/scope exists and is accessible
- [ ] NPM_TOKEN created (automation token type)
- [ ] NPM_TOKEN added to GitHub Secrets
- [ ] Secret name is exactly `NPM_TOKEN`
- [ ] GITHUB_TOKEN is available (automatic)
- [ ] Release workflow file exists (`.github/workflows/release.yml`)
- [ ] semantic-release config exists (`release.config.cjs`)
- [ ] package.json has `publishConfig.access: "public"`
- [ ] package.json version is `0.0.0` (will be managed by semantic-release)

## Troubleshooting

### Issue: npm publish fails with "Unauthorized"

**Cause**: Invalid or missing NPM_TOKEN

**Solutions**:

1. Verify token exists in GitHub Secrets
2. Check token hasn't expired
3. Verify token has publish permissions
4. Ensure token is for correct npm account/org

### Issue: Cannot publish to scope

**Cause**: Scope ownership or permissions issue

**Solutions**:

1. Verify you own/control `@tenerife.music` scope
2. Check npm organization membership
3. Verify package name matches scope
4. Consider using personal scope or unscoped name

### Issue: GitHub Release fails

**Cause**: GITHUB_TOKEN permissions

**Solutions**:

1. Verify repository has Actions enabled
2. Check workflow permissions in repository settings
3. Ensure workflow has `contents: write` permission
4. Verify repository isn't archived or private without access

### Issue: Workflow doesn't trigger releases

**Cause**: No conventional commits or semantic-release configuration

**Solutions**:

1. Verify commits follow conventional commit format
2. Check `release.config.cjs` exists and is valid
3. Verify semantic-release can detect changes
4. Check workflow logs for errors

## Testing Setup

### Test npm Token Locally

```bash
# Set token temporarily
export NPM_TOKEN=your_token_here

# Test npm whoami (should show your username)
npm whoami --registry=https://registry.npmjs.org/

# Test package access
npm access ls-packages @tenerife.music
```

### Test GitHub Token

The GITHUB_TOKEN is automatically available in workflows. No local testing needed.

### Dry-Run Release

See `docs/reports/SEMVER_DRY_RUN.md` for dry-run instructions.

## Next Steps

After validating npm scope and setting up tokens:

1. Verify all checklist items are complete
2. Run semantic-release dry-run (see `SEMVER_DRY_RUN.md`)
3. Make a conventional commit (e.g., `feat: add new feature`)
4. Push to `main` branch
5. Monitor release workflow in Actions tab
6. Verify package published to npm
7. Verify GitHub Release created
8. Verify CHANGELOG.md updated

## Additional Resources

- npm Token Documentation: https://docs.npmjs.com/about-access-tokens
- GitHub Actions Secrets: https://docs.github.com/en/actions/security-guides/encrypted-secrets
- Semantic Release Documentation: https://semantic-release.gitbook.io/
- Conventional Commits: https://www.conventionalcommits.org/
