#!/bin/bash

set -euo pipefail

# === Default flags ===
apps_flag_set=false
services=""
version=""

# === Parse args (order-independent) ===
while [[ $# -gt 0 ]]; do
  case "$1" in
    --apps=*)
      apps_flag_set=true
      services="${1#*=}"
      shift
      ;;
    --apps)
      apps_flag_set=true
      shift
      if [[ $# -gt 0 && "$1" != --* ]]; then
        services="$1"
        shift
      fi
      ;;
    --version=*)
      version="${1#*=}"
      shift
      ;;
    --version)
      shift
      version="$1"
      shift
      ;;
    *)
      echo "⚠️ Unknown argument: $1"
      shift
      ;;
  esac
done

# === App service map ===
declare -A apps=(
  [common]="helm/apps/common -f helm/apps/common/values.yaml,helm/apps/common/sops.values.yaml"
  [cart]="helm/apps/cart"
  [frontend]="helm/apps/frontend"
  [order]="helm/apps/order"
  [product]="helm/apps/product"
  [payment]="helm/apps/payment"
  [user]="helm/apps/user"
  [workflow]="helm/apps/workflow"
)

# === Ensure output folders exist ===
mkdir -p ../manifest/apps/dev/{common,cart,frontend,order,product,payment,user,workflow}

# === Render one app ===
template_app() {
  local name=$1
  local path_and_flags=$2
  local out_path="../manifest/apps/dev/$name/manifest.yaml"

  echo "Rendering app: $name"
  if [[ "$name" == "common" ]]; then
    echo "Running command: helm template dev $path_and_flags > $out_path"
    eval "helm template dev $path_and_flags > $out_path"
  else
    echo "Running command: helm template dev $path_and_flags --set image.tag=$version > $out_path"
    eval "helm template dev $path_and_flags --set image.tag=$version > $out_path"
  fi
}

# === Main rendering logic ===
ran_anything=false

echo "[Image version]: $version"

# Validate version
if [[ -z "$version" ]]; then
  echo "❌ Error: --version <value> is required"
  exit 1
fi

if $apps_flag_set; then
  if [[ -n "$services" ]]; then
    IFS=',' read -ra requested <<< "$services"
    for svc in "${requested[@]}"; do
      svc_trimmed=$(echo "$svc" | xargs)
      if [[ -n "${apps[$svc_trimmed]:-}" ]]; then
        template_app "$svc_trimmed" "${apps[$svc_trimmed]}"
        ran_anything=true
      else
        echo "⚠️  Warning: Unknown service '$svc_trimmed', skipping."
      fi
    done
  else
    echo "⚠️  --apps was defined but no services specified. Skipping rendering."
  fi
else
  # No --apps → render all
  for name in "${!apps[@]}"; do
    template_app "$name" "${apps[$name]}"
    ran_anything=true
  done
fi

# If nothing ran, show help
if ! $ran_anything; then
  echo "❌ Nothing to render. Usage:"
  echo "  $0 --version <tag> [--apps=cart,user,...]"
  echo "Examples:"
  echo "  $0 --version v1.2.3                          # all apps"
  echo "  $0 --version v1.2.3 --apps cart,user         # only cart + user"
  echo "  $0 --version v1.2.3 --apps=cart,user         # also valid"
  exit 1
fi
