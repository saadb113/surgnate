#!/bin/sh
set -e

# The image ships with the current product/message data and any already-
# uploaded images baked in under src/data and ./uploads. When DATA_DIR /
# UPLOAD_DIR point at a mounted volume (production), seed that volume from
# the baked-in copies on first boot only — cp -n never overwrites files that
# already exist, so admin edits made after the first deploy are preserved
# across restarts and redeploys.

SEED_DATA_DIR="/app/src/data"
SEED_UPLOAD_DIR="/app/uploads"

if [ -n "$DATA_DIR" ] && [ "$DATA_DIR" != "$SEED_DATA_DIR" ]; then
  mkdir -p "$DATA_DIR"
  cp -n "$SEED_DATA_DIR"/*.json "$DATA_DIR"/ 2>/dev/null || true
fi

if [ -n "$UPLOAD_DIR" ] && [ "$UPLOAD_DIR" != "$SEED_UPLOAD_DIR" ]; then
  mkdir -p "$UPLOAD_DIR"
  cp -n "$SEED_UPLOAD_DIR"/* "$UPLOAD_DIR"/ 2>/dev/null || true
fi

exec node src/index.js
