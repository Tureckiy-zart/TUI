# Storybook GitHub Pages Setup Guide

This document provides instructions for manually enabling GitHub Pages deployment for Storybook.

## Prerequisites

- GitHub repository: `Tureckiy-zart/tenerife-ui`
- GitHub Actions workflow: `.github/workflows/storybook-deploy.yml` (already created)
- Repository access: Admin or maintainer permissions required

## Manual Setup Steps

### Step 1: Enable GitHub Pages

1. Navigate to your repository on GitHub: `https://github.com/Tureckiy-zart/tenerife-ui`

2. Go to **Settings** → **Pages**

3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** (not "Deploy from a branch")
   - This will enable automatic deployment using the workflow file

4. Save the settings

### Step 2: Verify Workflow Permissions

The workflow file (`.github/workflows/storybook-deploy.yml`) already includes the required permissions:

```yaml
permissions:
  contents: write
  pages: write
  id-token: write
```

These permissions allow the workflow to:
- Write to repository contents (for git operations)
- Write to GitHub Pages
- Use OIDC tokens for authentication

### Step 3: Trigger First Deployment

After enabling GitHub Pages, you can trigger the first deployment in one of two ways:

**Option A: Automatic Deployment**
- Push any changes to the `main` branch
- The workflow will automatically build and deploy Storybook

**Option B: Manual Deployment**
- Go to **Actions** tab in GitHub
- Select the **"Deploy Storybook to GitHub Pages"** workflow
- Click **"Run workflow"** → Select branch `main` → Click **"Run workflow"**

### Step 4: Wait for Deployment

1. Go to **Actions** tab to monitor the workflow progress
2. The workflow typically takes 2-5 minutes to complete
3. Once completed, you'll see a green checkmark

### Step 5: Access Your Storybook

After successful deployment, your Storybook will be available at:

**URL**: `https://Tureckiy-zart.github.io/tenerife-ui/`

**Note**: It may take a few minutes after the workflow completes for the site to be accessible. GitHub Pages propagation can take up to 10 minutes.

## Workflow Explanation

### Trigger Events

The workflow triggers automatically on:
- **Push to `main` branch**: Every commit to main triggers a new deployment
- **Manual trigger**: You can manually run the workflow from the Actions tab

### Workflow Steps

1. **Checkout repository**: Downloads the latest code
2. **Set up Node.js**: Installs Node.js 18 with pnpm caching
3. **Install pnpm**: Sets up pnpm package manager
4. **Install dependencies**: Runs `pnpm install --frozen-lockfile`
5. **Build Storybook**: Runs `pnpm build-storybook` (outputs to `storybook-static/`)
6. **Setup Pages**: Configures GitHub Pages environment
7. **Upload artifact**: Uploads `storybook-static/` directory as Pages artifact
8. **Deploy to GitHub Pages**: Deploys the artifact to GitHub Pages

### Build Output

- **Source directory**: `storybook-static/` (default Storybook 8.x output)
- **Build script**: `pnpm build-storybook` (defined in `package.json`)

## Troubleshooting

### Workflow Fails to Run

**Issue**: Workflow doesn't appear in Actions tab

**Solution**:
- Verify `.github/workflows/storybook-deploy.yml` exists and is committed
- Check that file is in the `main` branch (not in a feature branch)

### Build Fails

**Issue**: Workflow fails at "Build Storybook" step

**Solution**:
- Check Storybook configuration is valid
- Verify all dependencies are in `package.json`
- Review workflow logs in Actions tab for specific error messages

### Deployment Fails

**Issue**: Deployment step fails with permission errors

**Solution**:
- Verify GitHub Pages is enabled (Settings → Pages → Source = GitHub Actions)
- Check repository permissions allow GitHub Actions to deploy Pages
- Ensure workflow permissions are set correctly (already configured in workflow file)

### Site Not Accessible

**Issue**: Site returns 404 after deployment completes

**Solution**:
- Wait 5-10 minutes for GitHub Pages propagation
- Verify the deployment succeeded in Actions tab
- Check Settings → Pages shows deployment status
- Verify the URL format: `https://<username>.github.io/<repository-name>/`

## Optional: Custom Domain Setup

If you want to use a custom domain (e.g., `storybook.tenerife.music`):

1. Create a `CNAME` file in the repository root (in the `main` branch):
   ```
   storybook.tenerife.music
   ```

2. Configure DNS records with your domain provider:
   - **Type**: `CNAME`
   - **Name**: `storybook` (or `@` for root domain)
   - **Value**: `Tureckiy-zart.github.io`

3. In GitHub Settings → Pages, add your custom domain

4. The next deployment will include the `CNAME` file and configure the custom domain

**Note**: The workflow will automatically include the `CNAME` file if it exists in the repository root.

## Expected Deployment URL

**Default GitHub Pages URL**: `https://Tureckiy-zart.github.io/tenerife-ui/`

This URL will be automatically updated on every successful deployment to the `main` branch.

## Verification Checklist

- [ ] GitHub Pages enabled in Settings → Pages → Source = GitHub Actions
- [ ] Workflow file exists at `.github/workflows/storybook-deploy.yml`
- [ ] First workflow run completed successfully
- [ ] Storybook accessible at `https://Tureckiy-zart.github.io/tenerife-ui/`
- [ ] Badge in README.md links to correct URL

## Next Steps

After successful setup:

1. Verify Storybook deployment works correctly
2. Review the deployment report: `docs/reports/STORYBOOK_DEPLOYMENT_COMPLETE.md`
3. Check local build validation: `docs/reports/STORYBOOK_DRY_RUN_REPORT.md`
4. Update PROJECT_PROGRESS.md with deployment status

## Support

For issues with GitHub Pages or GitHub Actions:
- GitHub Actions documentation: https://docs.github.com/en/actions
- GitHub Pages documentation: https://docs.github.com/en/pages
- Workflow file: `.github/workflows/storybook-deploy.yml`

