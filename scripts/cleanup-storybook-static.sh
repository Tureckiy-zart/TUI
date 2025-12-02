#!/bin/bash
# Script to remove storybook-static/ from Git tracking and commit changes

set -e

echo "🧹 Cleaning up storybook-static/ from Git..."

# Remove from Git index (files stay on disk)
echo "📦 Removing storybook-static/ from Git index..."
git rm -r --cached storybook-static/ 2>/dev/null || {
  echo "⚠️  storybook-static/ not found in Git index (may already be removed or empty)"
}

# Add .gitignore changes
echo "📝 Staging .gitignore changes..."
git add .gitignore

# Check if there are any changes to commit
if git diff --cached --quiet; then
  echo "ℹ️  No changes to commit (storybook-static/ may not be tracked)"
else
  echo "✅ Changes staged successfully"
  echo ""
  echo "📋 Staged changes:"
  git diff --cached --name-only
  echo ""
  echo "💡 To commit these changes, run:"
  echo "   git commit -m 'chore: add storybook-static to gitignore and remove from tracking'"
fi

echo ""
echo "✅ Cleanup script completed!"
