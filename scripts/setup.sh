#!/usr/bin/env bash
# One-time setup: checks your tools and saves your role. Usage: ./scripts/setup.sh [role]
cd "$(dirname "$0")/.." || exit 1
ok() { echo "  ✅ $1"; }; no() { echo "  ❌ $1"; MISSING=1; }
echo "Checking your tools..."
command -v node >/dev/null && ok "Node $(node -v)" || no "Node.js missing: install from https://nodejs.org (LTS), then re-run"
command -v git  >/dev/null && ok "git" || no "git missing: install from https://git-scm.com, then re-run"
command -v claude >/dev/null && ok "Claude Code" || echo "  ⚠️  'claude' not found in this terminal (fine if you use the Claude desktop app)"
if command -v gh >/dev/null; then
  gh auth status >/dev/null 2>&1 && ok "GitHub login" || echo "  ⚠️  Not logged in to GitHub yet. Run: gh auth login   (needed to save your work)"
else echo "  ⚠️  GitHub CLI missing: install from https://cli.github.com, then run: gh auth login"; fi
[ -n "$MISSING" ] && exit 1
git config pull.rebase true
ROLE="$1"
if [ -z "$ROLE" ]; then
  echo; echo "Pick your role:"; node -e "for (const [k,v] of Object.entries(require('./ownership.json'))) console.log('   ' + k.padEnd(11) + v.label)"
  read -r -p "Type your role (e.g. spark): " ROLE
fi
node -e "if(!require('./ownership.json')['$ROLE']){console.error('❌ Unknown role');process.exit(1)}" || exit 1
echo "$ROLE" > .role
echo; echo "✅ You are: $ROLE"
echo "Next: 1) read tasks/$ROLE.md   2) run: node server/index.js   3) open http://localhost:3000   4) start Claude Code in this folder"
