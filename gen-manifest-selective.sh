#!/bin/bash

# Usage:
#   ./gen-manifest-selective.sh --version v1.2.3 --apps cart,user --infra istio-base,loki
#   ./gen-manifest-selective.sh --version v1.2.3                # all apps and infra
#   ./gen-manifest-selective.sh --infra loki                    # only loki infra
#   ./gen-manifest-selective.sh --apps cart                     # only cart app (with version)

set -e

APPS_ALL=(common order payment cart product user workflow frontend)
INFRA_ALL=(external-secrets cert-manager istio-base istiod istio-gateway dapr tempo loki prometheus k8s-monitoring)

APPS=()
INFRA=()
VERSION=""

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
      if [[ -n "$2" && "$2" != --* ]]; then
        IFS=',' read -ra INFRA <<< "$2"
        shift 2
      else
        INFRA=()
        shift 1
      fi
      ;;
    --infra=*)
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

# If neither APPS nor INFRA provided, use all
if [ ${#APPS[@]} -eq 0 ] && [ ${#INFRA[@]} -eq 0 ]; then
  APPS=("${APPS_ALL[@]}")
  INFRA=("${INFRA_ALL[@]}")
fi

# Run infra templates (no version)
for infra in "${INFRA[@]}"; do
  case $infra in
    external-secrets)
      helm template external-secrets deployments/helm-charts/external-secrets/ -n external-secrets --create-namespace -o yaml > ../manifest/infra/dev/external-secrets/manifest.yaml
      ;;
    cert-manager)
      helm template cert-manager deployments/helm-charts/cert-manager/ -f deployments/helm-charts/helm-values/cert-manager.yaml -n cert-manager --create-namespace -o yaml > ../manifest/infra/dev/cert-manager/manifest.yaml
      ;;
    istio-base)
      helm template istio-base deployments/helm-charts/istio-base/ -f deployments/helm-charts/helm-values/istio.yaml -n api-gateway --create-namespace -o yaml > ../manifest/infra/dev/istio/base.yaml
      ;;
    istiod)
      helm template istiod deployments/helm-charts/istiod/ -f deployments/helm-charts/helm-values/istio.yaml -n api-gateway --create-namespace -o yaml > ../manifest/infra/dev/istio/istiod.yaml
      ;;
    istio-gateway)
      helm template istio-gateway deployments/helm-charts/istio-gateway/ -f deployments/helm-charts/helm-values/istio.yaml -n api-gateway --create-namespace -o yaml > ../manifest/infra/dev/istio/gateway.yaml
      ;;
    dapr)
      helm template dapr deployments/helm-charts/dapr/ -f deployments/helm-charts/helm-values/dapr.yaml -n dapr --create-namespace --create-namespace -o yaml > ../manifest/infra/dev/dapr/manifest.yaml
      ;;
    tempo)
      helm template tempo deployments/helm-charts/tempo/ -f deployments/helm-charts/helm-values/tempo.yaml -n monitoring --create-namespace -o yaml > ../manifest/infra/dev/monitoring/tempo.yaml
      ;;
    loki)
      helm template loki deployments/helm-charts/loki/ -f deployments/helm-charts/helm-values/loki.yaml -n monitoring --create-namespace -o yaml > ../manifest/infra/dev/monitoring/loki.yaml
      ;;
    kube-prometheus-stack)
      helm template kube-prometheus-stack deployments/helm-charts/kube-prometheus-stack/ -f deployments/helm-charts/helm-values/prometheus.yaml -n monitoring --create-namespace -o yaml > ../manifest/infra/dev/monitoring/prometheus.yaml
      ;;
    k8s-monitoring)
      helm template k8s-monitoring deployments/helm-charts/k8s-monitoring/ -f deployments/helm-charts/helm-values/monitoring.yaml -n monitoring --create-namespace -o yaml > ../manifest/infra/dev/monitoring/k8s-monitoring.yaml
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
        helm template common deployments/helm-charts/apps/common --set image.tag=$VERSION -o yaml > ../manifest/apps/dev/common/manifest.yaml
        ;;
      order)
        helm template order deployments/helm-charts/apps/order --set image.tag=$VERSION -o yaml > ../manifest/apps/dev/order/manifest.yaml
        ;;
      payment)
        helm template payment deployments/helm-charts/apps/payment --set image.tag=$VERSION -o yaml > ../manifest/apps/dev/payment/manifest.yaml
        ;;
      cart)
        helm template cart deployments/helm-charts/apps/cart --set image.tag=$VERSION -o yaml > ../manifest/apps/dev/cart/manifest.yaml
        ;;
      product)
        helm template product deployments/helm-charts/apps/product --set image.tag=$VERSION -o yaml > ../manifest/apps/dev/product/manifest.yaml
        ;;
      user)
        helm template user deployments/helm-charts/apps/user --set image.tag=$VERSION -o yaml > ../manifest/apps/dev/user/manifest.yaml
        ;;
      workflow)
        helm template workflow deployments/helm-charts/apps/workflow --set image.tag=$VERSION -o yaml > ../manifest/apps/dev/workflow/manifest.yaml
        ;;
      frontend)
        helm template frontend deployments/helm-charts/apps/frontend --set image.tag=$VERSION -o yaml > ../manifest/apps/dev/frontend/manifest.yaml
        ;;
      *)
        echo "Unknown app: $app"
        ;;
    esac
  done
fi
