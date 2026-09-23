#!/usr/bin/env bash
# Safe "get the team's latest work" without saving. Keeps your unsaved changes.
cd "$(dirname "$0")/.." || exit 1
if git pull --rebase --autostash -q; then
  echo "✅ Got the team's latest. Refresh your browser (if server/ files changed, restart the website too)."
else
  git rebase --abort 2>/dev/null
  echo "⚠️  Could not merge the team's latest. Your work is safe. Ask the Integrator; do NOT force anything."; exit 1
fi
