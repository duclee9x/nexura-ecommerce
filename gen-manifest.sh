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
  [common]="helm/apps/common"
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
  echo "Running command: helm template dev $path_and_flags --set image.tag=$version > $out_path"
  eval "helm template dev $path_and_flags --set image.tag=$version > $out_path"
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
    echo "Running command: helm template dev "${apps[common]}" > ../manifest/apps/dev/common/manifest.yaml"
    eval "helm template dev "${apps[common]}" > ../manifest/apps/dev/common/manifest.yaml"

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

---

helm template external-secrets deployments/helm-charts/external-secrets/ -n external-secrets --create-namespace -o yaml > ../manifest/infra/dev/external-secrets/manifest.yaml
helm template cert-manager deployments/helm-charts/cert-manager/ -f deployments/helm-charts/helm-values/cert-manager.yaml -n cert-manager --create-namespace -o yaml > ../manifest/infra/dev/cert-manager/manifest.yaml
helm template istio-base deployments/helm-charts/istio-base/ -f deployments/helm-charts/helm-values/istio.yaml -n api-gateway --create-namespace -o yaml > ../manifest/infra/dev/istio/base.yaml
helm template istiod deployments/helm-charts/istiod/ -f deployments/helm-charts/helm-values/istio.yaml -n api-gateway --create-namespace -o yaml > ../manifest/infra/dev/istio/istiod.yaml
helm template istio-gateway deployments/helm-charts/istio-gateway/ -f deployments/helm-charts/helm-values/istio.yaml -n api-gateway --create-namespace -o yaml > ../manifest/infra/dev/istio/gateway.yaml
helm template dapr deployments/helm-charts/dapr/ -f deployments/helm-charts/helm-values/dapr.yaml -n dapr --create-namespace --create-namespace -o yaml > ../manifest/infra/dev/dapr/manifest.yaml
helm template tempo deployments/helm-charts/tempo/ -f deployments/helm-charts/helm-values/tempo.yaml -n monitoring --create-namespace -o yaml > ../manifest/infra/dev/monitoring/tempo.yaml
helm template loki deployments/helm-charts/loki/ -f deployments/helm-charts/helm-values/loki.yaml -n monitoring --create-namespace -o yaml > ../manifest/infra/dev/monitoring/loki.yaml
helm template prometheus deployments/helm-charts/kube-prometheus-stack/ -f deployments/helm-charts/helm-values/prometheus.yaml -n monitoring --create-namespace -o yaml > ../manifest/infra/dev/monitoring/prometheus.yaml
helm template k8s-monitoring deployments/helm-charts/k8s-monitoring/ -f deployments/helm-charts/helm-values/monitoring.yaml -n monitoring --create-namespace -o yaml > ../manifest/infra/dev/monitoring/k8s-monitoring.yaml

helm template common deployments/helm-charts/apps/common  --set image.tag=$version -o yaml > ../manifest/apps/dev/common/manifest.yaml
helm template order deployments/helm-charts/apps/order --set image.tag=$version -o yaml > ../manifest/apps/dev/order/manifest.yaml
helm template payment deployments/helm-charts/apps/payment --set image.tag=$version -o yaml > ../manifest/apps/dev/payment/manifest.yaml
helm template cart deployments/helm-charts/apps/cart --set image.tag=$version -o yaml > ../manifest/apps/dev/cart/manifest.yaml
helm template product deployments/helm-charts/apps/product --set image.tag=$version -o yaml > ../manifest/apps/dev/product/manifest.yaml
helm template user deployments/helm-charts/apps/user --set image.tag=$version -o yaml > ../manifest/apps/dev/user/manifest.yaml
helm template workflow deployments/helm-charts/apps/workflow --set image.tag=$version -o yaml > ../manifest/apps/dev/workflow/manifest.yaml
helm template frontend deployments/helm-charts/apps/frontend --set image.tag=$version -o yaml > ../manifest/apps/dev/frontend/manifest.yaml