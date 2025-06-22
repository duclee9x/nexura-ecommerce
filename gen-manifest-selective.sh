#!/bin/bash

# Usage:
#   ./gen-manifest-selective.sh --version v1.2.3 --apps cart,user --infra istio-base,loki
#   ./gen-manifest-selective.sh --version v1.2.3                # all apps and infra
#   ./gen-manifest-selective.sh --infra loki                    # only loki infra
#   ./gen-manifest-selective.sh --apps cart                     # only cart app (with version)

set -e

APPS_ALL=(common order payment cart product user workflow frontend)
INFRA_ALL=(external-secrets cert-manager istio-base istiod istio-gateway dapr tempo grafana loki prometheus k8s-monitoring)

APPS=()
INFRA=()
VERSION=""
ARGS_CONTAINED_INFRA="false"

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --apps)
      if [[ -n "$2" && "$2" != --* ]]; then
        IFS=',' read -ra APPS <<< "$2"
        shift 2
      else
        APPS=()
        shift 1
      fi
      ;;
    --apps=*)
      val="${1#*=}"
      if [[ -n "$val" ]]; then
        IFS=',' read -ra APPS <<< "$val"
      else
        APPS=()
      fi
      shift 1
      ;;
    --infra)
      ARGS_CONTAINED_INFRA="true"
      if [[ -n "$2" && "$2" != --* ]]; then
        IFS=',' read -ra INFRA <<< "$2"
        shift 2
      else
        INFRA=()
        shift 1
      fi
      ;;
    --infra=*)
      ARGS_CONTAINED_INFRA="true"
      val="${1#*=}"
      if [[ -n "$val" ]]; then
        IFS=',' read -ra INFRA <<< "$val"
      else
        INFRA=()
      fi
      shift 1
      ;;
    --version)
      VERSION="$2"
      shift 2
      ;;
    --version=*)
      VERSION="${1#*=}"
      shift 1
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# If --infra was provided with no value, set to all infra
if [[ "${#INFRA[@]}" -eq 0 && "${ARGS_CONTAINED_INFRA}" == "true" ]]; then
  INFRA=("${INFRA_ALL[@]}")
fi

# If neither APPS nor INFRA provided, use all
if [ ${#APPS[@]} -eq 0 ] && [ ${#INFRA[@]} -eq 0 ]; then
  APPS=("${APPS_ALL[@]}")
  INFRA=("${INFRA_ALL[@]}")
fi

# Run infra templates (no version)
for infra in "${INFRA[@]}"; do
  case $infra in
    external-secrets)
      mkdir -p ../manifest/infra/dev/external-secrets
      helm template external-secrets deployments/helm-charts/external-secrets/ --include-crds -n external-secrets --create-namespace > ../manifest/infra/dev/external-secrets/manifest.yaml
      ;;
    cert-manager)
      mkdir -p ../manifest/infra/dev/cert-manager
      helm template cert-manager deployments/helm-charts/cert-manager/ -f deployments/helm-charts/helm-values/cert-manager.yaml --include-crds -n cert-manager --create-namespace > ../manifest/infra/dev/cert-manager/manifest.yaml
      ;;
    istio-base)
      mkdir -p ../manifest/infra/dev/istio
      helm template istio-base deployments/helm-charts/istio-base/ -f deployments/helm-charts/helm-values/istio.yaml --include-crds -n api-gateway --create-namespace > ../manifest/infra/dev/istio/base.yaml
      ;;
    istiod)
      mkdir -p ../manifest/infra/dev/istio
      helm template istiod deployments/helm-charts/istiod/ -f deployments/helm-charts/helm-values/istio.yaml --include-crds -n api-gateway --create-namespace > ../manifest/infra/dev/istio/istiod.yaml
      ;;
    istio-gateway)
      mkdir -p ../manifest/infra/dev/istio
      helm template istio-gateway deployments/helm-charts/istio-gateway/ -f deployments/helm-charts/helm-values/istio.yaml --include-crds -n api-gateway --create-namespace > ../manifest/infra/dev/istio/gateway.yaml
      ;;
    dapr)
      mkdir -p ../manifest/infra/dev/dapr
      helm template dapr deployments/helm-charts/dapr/ -f deployments/helm-charts/helm-values/dapr.yaml --include-crds -n dapr --create-namespace > ../manifest/infra/dev/dapr/manifest.yaml
      ;;
    tempo)
      mkdir -p ../manifest/infra/dev/monitoring
      helm template tempo deployments/helm-charts/tempo/ -f deployments/helm-charts/helm-values/tempo.yaml --include-crds -n monitoring --create-namespace > ../manifest/infra/dev/monitoring/tempo.yaml
      ;;
    loki)
      mkdir -p ../manifest/infra/dev/monitoring
      helm template loki deployments/helm-charts/loki/ -f deployments/helm-charts/helm-values/loki.yaml --include-crds -n monitoring --create-namespace > ../manifest/infra/dev/monitoring/loki.yaml
      ;;
    prometheus)
      mkdir -p ../manifest/infra/dev/monitoring
      helm template prometheus deployments/helm-charts/prometheus/ -f deployments/helm-charts/helm-values/prometheus.yaml --include-crds -n monitoring --create-namespace > ../manifest/infra/dev/monitoring/prometheus.yaml
      ;;
    grafana)
      mkdir -p ../manifest/infra/dev/monitoring
      helm template grafana deployments/helm-charts/grafana/ -f deployments/helm-charts/helm-values/grafana.yaml --include-crds -n monitoring --create-namespace > ../manifest/infra/dev/monitoring/grafana.yaml
      ;;
    k8s-monitoring)
      mkdir -p ../manifest/infra/dev/monitoring
      helm template k8s-monitoring deployments/helm-charts/k8s-monitoring/ -f deployments/helm-charts/helm-values/monitoring.yaml --include-crds -n monitoring --create-namespace > ../manifest/infra/dev/monitoring/k8s-monitoring.yaml
      ;;
    *)
      echo "Unknown infra: $infra"
      ;;
  esac
done

# Run app templates (require version)
if [ ${#APPS[@]} -gt 0 ]; then
  if [ -z "$VERSION" ]; then
    echo "Error: --version is required for apps."
    exit 1
  fi
  for app in "${APPS[@]}"; do
    case $app in
      common)
        mkdir -p ../manifest/apps/dev/common
        helm template common deployments/helm-charts/apps/common --set image.tag=$VERSION > ../manifest/apps/dev/common/manifest.yaml
        ;;
      order)
        mkdir -p ../manifest/apps/dev/order
        helm template order deployments/helm-charts/apps/order --set image.tag=$VERSION > ../manifest/apps/dev/order/manifest.yaml
        ;;
      payment)
        mkdir -p ../manifest/apps/dev/payment
        helm template payment deployments/helm-charts/apps/payment --set image.tag=$VERSION > ../manifest/apps/dev/payment/manifest.yaml
        ;;
      cart)
        mkdir -p ../manifest/apps/dev/cart
        helm template cart deployments/helm-charts/apps/cart --set image.tag=$VERSION > ../manifest/apps/dev/cart/manifest.yaml
        ;;
      product)
        mkdir -p ../manifest/apps/dev/product
        helm template product deployments/helm-charts/apps/product --set image.tag=$VERSION > ../manifest/apps/dev/product/manifest.yaml
        ;;
      user)
        mkdir -p ../manifest/apps/dev/user
        helm template user deployments/helm-charts/apps/user --set image.tag=$VERSION > ../manifest/apps/dev/user/manifest.yaml
        ;;
      workflow)
        mkdir -p ../manifest/apps/dev/workflow
        helm template workflow deployments/helm-charts/apps/workflow --set image.tag=$VERSION > ../manifest/apps/dev/workflow/manifest.yaml
        ;;
      frontend)
        mkdir -p ../manifest/apps/dev/frontend
        helm template frontend deployments/helm-charts/apps/frontend --set image.tag=$VERSION > ../manifest/apps/dev/frontend/manifest.yaml
        ;;
      *)
        echo "Unknown app: $app"
        ;;
    esac
  done
fi
