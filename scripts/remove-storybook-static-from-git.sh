#!/bin/bash
# Script to remove storybook-static/ from Git tracking
# Files will remain on disk but won't be tracked by Git

echo "🗑️  Removing storybook-static/ from Git index..."
git rm -r --cached storybook-static/ 2>/dev/null || echo "⚠️  storybook-static/ not found in Git index (may already be removed)"

echo "✅ Done! storybook-static/ is now ignored by Git"
echo ""
echo "📝 Next steps:"
echo "   1. Review changes: git status"
echo "   2. Commit: git commit -m 'chore: remove storybook-static from Git tracking'"
echo "   3. Push: git push"
