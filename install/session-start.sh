#!/bin/bash
# Ad-Hub session-start hook for a business repo on Claude Code on the web.
# Copy to <repo>/.claude/hooks/session-start.sh, chmod +x, and register it in
# <repo>/.claude/settings.json (see install/README.md). If the repo already has a
# session-start hook, add the Ad-Hub lines below to it instead of replacing it.
# Codex and Perplexity do not run hooks; there, AGENTS.md points agents at Ad-Hub.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# --- Ad-Hub skill pointers. Skipped quietly when the hub is not checked out. ---
ADHUB="${AD_HUB:-$CLAUDE_PROJECT_DIR/../ad-hub}"
if [ -f "$ADHUB/install/adhub-skills.mjs" ]; then
  node "$ADHUB/install/adhub-skills.mjs" --root "$CLAUDE_PROJECT_DIR"
else
  echo "Ad-Hub not found at $ADHUB; adhub- skill pointers left as committed."
fi
# --- end Ad-Hub ---
