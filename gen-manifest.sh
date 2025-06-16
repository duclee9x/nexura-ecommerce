#!/bin/bash

set -euo pipefail

# === Default flags ===
generate_infra=false
apps_flag_set=false
services=""
version=""

# === Parse args ===
while [[ $# -gt 0 ]]; do
  case "$1" in
    --infra)
      generate_infra=true
      shift
      ;;
    --apps)
      apps_flag_set=true
      shift
      ;;
    --version)
      version="$2"
      shift 2
      ;;
    *)
      services="$1"
      shift
      ;;
  esac
done

# === Check version for apps ===
if [[ -z "$version" ]]; then
  echo "❌ Error: --version <value> is required when rendering apps"
  exit 1
fi

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
mkdir -p ../manifest/infra/dev/{metallb,istio,cert-manager,dapr}

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

# === Render infra components ===
template_infra() {
  echo "Adding Helm repos..."
  helm repo add dapr https://dapr.github.io/helm-charts
  helm repo add cert-manager https://charts.jetstack.io
  helm repo add istio https://istio-release.storage.googleapis.com/charts
  helm repo add metallb https://metallb.github.io/metallb
  helm repo update

  echo "Rendering infra templates..."

  helm template metallb metallb/metallb \
    --create-namespace --namespace metallb --version 0.15.2 \
    > ../manifest/infra/dev/metallb/manifest.yaml

  helm dependency build helm/infra/cert-manager/
  helm template cert-manager-resource helm/infra/cert-manager --namespace cert-manager \
    -f helm/infra/cert-manager/values.yaml,helm/infra/cert-manager/sops.values.yaml \
    > ../manifest/infra/dev/cert-manager/manifest.yaml

  wget -qO ../manifest/infra/dev/istio/crd.yaml https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.3.0/standard-install.yaml
  helm template istio-base istio/base -n istio --create-namespace \
    > ../manifest/infra/dev/istio/base.yaml
  helm template istiod istio/istiod --namespace istio-system --set profile=ambient \
    > ../manifest/infra/dev/istio/istiod.yaml
  helm template ztunnel istio/ztunnel -n istio-system \
    > ../manifest/infra/dev/istio/ztunnel.yaml

  helm template dapr dapr/dapr --version=1.15 --namespace dapr --create-namespace \
    > ../manifest/infra/dev/dapr/manifest.yaml
}

# === Main rendering logic ===
ran_anything=false

echo "[Image version]: $version"
# Handle app rendering
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
    echo "⚠️  --apps was defined but no services specified. Skipping app rendering."
  fi
else
  # No --apps flag → render all apps
  for name in "${!apps[@]}"; do
    template_app "$name" "${apps[$name]}"
  done
  ran_anything=true
fi
echo "[Check]: $(ls ../manifest)"
# Handle infra rendering
if $generate_infra; then
  template_infra
  ran_anything=true
fi

# If nothing ran, show help
if ! $ran_anything; then
  echo "❌ Nothing to render. Usage:"
  echo "  $0 --version <tag> [--apps] [--infra] [cart,user,...]"
  echo "Examples:"
  echo "  $0 --version v1.2.3                        # all apps"
  echo "  $0 --version v1.2.3 --infra               # all apps + infra"
  echo "  $0 --version v1.2.3 --apps cart,user      # only cart + user"
  echo "  $0 --version v1.2.3 --apps                # no apps rendered (warn)"
  exit 1
fi
