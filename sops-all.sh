#!/bin/bash

# Usage:
#   ./sops-all.sh encrypt   → Encrypt all matching files in-place
#   ./sops-all.sh decrypt   → Decrypt all matching files to sops.values.yaml

set -e

ACTION=$1
TARGET_DIR=${2:-.}  # default to current directory if not provided

if [[ "$ACTION" != "encrypt" && "$ACTION" != "decrypt" ]]; then
  echo "Usage: $0 [encrypt|decrypt] [path]"
  exit 1
fi

# File pattern to match
MATCH_PATTERN='.*\.secret\.yaml$'

# Find files matching pattern
FILES=$(find "$TARGET_DIR" -type f | grep -E "$MATCH_PATTERN")

if [[ -z "$FILES" ]]; then
  echo "No matching files found in $TARGET_DIR."
  exit 0
fi

for file in $FILES; do
  case "$ACTION" in
    encrypt)
      echo "🔐 Encrypting $file..."
      sops -e -i "$file"
      ;;
    decrypt)
      out_dir=$(dirname "$file")
      out_file="${out_dir}/sops.values.yaml"
      echo "🔓 Decrypting $file → $out_file"
      sops -d "$file" > "$out_file"
      ;;
  esac
done

echo "✅ Done."
