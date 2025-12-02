#!/bin/bash
# Script to create new branch, remove storybook-static, commit and push

set -e

BRANCH_NAME="chore/remove-storybook-static-from-git"

echo "🌿 Creating new branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME"

echo ""
echo "🗑️  Removing storybook-static/ from Git index..."
git rm -r --cached storybook-static/ 2>/dev/null || {
  echo "⚠️  storybook-static/ not found in Git index (may already be removed)"
}

echo ""
echo "📝 Staging changes..."
git add .gitignore
git add .github/workflows/*.yml 2>/dev/null || true

echo ""
echo "📋 Staged changes:"
git status --short

echo ""
echo "💾 Committing changes..."
git commit -m "chore: add storybook-static to gitignore and remove from tracking

- Add storybook-static/ to .gitignore
- Remove storybook-static/ from Git tracking (files remain on disk)
- Fix workflow files (quality.yml, release.yml, test-npm-token.yml)
  - Update branch names (dev → develop)
  - Update pnpm action version (v3 → v4)
  - Fix step order in release.yml
  - Update Node.js version to 22
  - Add jq fallback in test-npm-token.yml"

echo ""
echo "🚀 Pushing to remote..."
git push -u origin "$BRANCH_NAME"

echo ""
echo "✅ Done! Branch $BRANCH_NAME created and pushed successfully"
echo ""
echo "📝 Next steps:"
echo "   1. Create Pull Request to develop branch"
echo "   2. Review and merge"
