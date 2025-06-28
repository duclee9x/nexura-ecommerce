
require:
    kubectl apply -f provision/vault-token.yaml

lb:
    cloud-provider-kind -enable-lb-port-mapping

up:
    kubectl apply -f provision/argo

[working-directory: 'provision/vault-server']
vault:
    ./generate-creds.sh
    vault server -config=vault-server.hcl

dns:
    python provision/update-public-ip/main.py

helm-app:
    helm upgrade --install common deployments/helm-charts/apps/common
    helm upgrade --install order deployments/helm-charts/apps/order
    helm upgrade --install payment deployments/helm-charts/apps/payment
    helm upgrade --install cart deployments/helm-charts/apps/cart
    helm upgrade --install product deployments/helm-charts/apps/product
    helm upgrade --install user deployments/helm-charts/apps/user
    helm upgrade --install workflow deployments/helm-charts/apps/workflow
    helm upgrade --install frontend deployments/helm-charts/apps/frontend

helm-infra:
    helm upgrade --install external-secrets deployments/helm-charts/external-secrets/ -n external-secrets --create-namespace
    helm upgrade --install cert-manager deployments/helm-charts/cert-manager/ -f deployments/helm-charts/helm-values/cert-manager.yaml -n cert-manager --create-namespace
    helm upgrade --install istio-base deployments/helm-charts/istio-base/ -f deployments/helm-charts/helm-values/istio.yaml -n api-gateway --create-namespace
    helm upgrade --install istiod deployments/helm-charts/istiod/ -f deployments/helm-charts/helm-values/istio.yaml -n api-gateway --create-namespace
    helm upgrade --install istio-gateway deployments/helm-charts/istio-gateway/ -f deployments/helm-charts/helm-values/istio.yaml -n api-gateway --create-namespace
    helm upgrade --install dapr deployments/helm-charts/dapr/ -f deployments/helm-charts/helm-values/dapr.yaml -n dapr --create-namespace --create-namespace
    helm upgrade --install tempo deployments/helm-charts/tempo/ -f deployments/helm-charts/helm-values/tempo.yaml -n monitoring --create-namespace
    helm upgrade --install loki deployments/helm-charts/loki/ -f deployments/helm-charts/helm-values/loki.yaml -n monitoring --create-namespace 
    helm upgrade --install prometheus deployments/helm-charts/prometheus/ -f deployments/helm-charts/helm-values/prometheus.yaml -n monitoring --create-namespace
    helm upgrade --install k8s-monitoring deployments/helm-charts/k8s-monitoring/ -f deployments/helm-charts/helm-values/monitoring.yaml -n monitoring --create-namespace 
unkind:
    kind delete clusters kind
kind:
    kind create cluster --config provision/kind.yaml

install-argo:
    kubectl apply -f provision/vault-token.yaml
    helm repo add argo https://argoproj.github.io/argo-helm
    helm repo update
    helm upgrade --install argocd argo/argo-cd -n argocd --create-namespace -f provision/argo-values.yaml 
    
argo-pass:
    kubectl get secret argocd-initial-admin-secret -n argocd -o yaml | yq .data.password | base64 -d
    @echo 
argo: argo-pass
    @echo "Argocd URL: http://localhost:8080"
    kubectl port-forward svc/argocd-server -n argocd 8080:80