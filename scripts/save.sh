#!/usr/bin/env bash
# Safe "save my work": commits ONLY your files, syncs with the team, pushes. Usage: ./scripts/save.sh "what I did"
cd "$(dirname "$0")/.." || exit 1
ROLE=$(cat .role 2>/dev/null) || { echo "❌ No role yet. Run: ./scripts/setup.sh"; exit 1; }
MSG="${1:-update from $ROLE}"
OWNED=$(node scripts/owned.js "$ROLE" 2>/tmp/notmine)
if [ -s /tmp/notmine ]; then
  echo "🛑 You changed files that are not yours, so nothing was saved:"; sed 's/^/     /' /tmp/notmine
  echo "   Undo them with:  git restore <file>   (or delete the file if it is new)"
  echo "   Or ask the owner / Integrator to make that change. Then run save again."; exit 1
fi
[ -z "$OWNED" ] && { echo "Nothing to save. (You have no changes.)"; exit 0; }
echo "$OWNED" | while read -r f; do git add -A -- "$f"; done
git commit -q -m "[$ROLE] $MSG" -m "Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>" || exit 1
if ! git pull --rebase -q; then
  git rebase --abort 2>/dev/null
  echo "⚠️  Could not merge with the team's latest. Your work is safe (committed locally). Ask the Integrator for help; do NOT force anything."; exit 1
fi
git push -q && echo "✅ Saved and shared: $MSG" || { echo "⚠️  Push failed. Your work is safe locally. Try again in a minute, or ask the Integrator."; exit 1; }
