

# get-ip:
#     docker ps --filter name=kindccm* --format json | jq .Ports 

require:
    kubectl apply -f provision/vault-token.yaml

kind-lb:
    cloud-provider-kind -enable-lb-port-mapping

[working-directory: 'provision/vault-server']
vault-server:
    ./generate-creds.sh
    vault server -config=vault-server.hcl

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
    helm upgrade --install prometheus deployments/helm-charts/kube-prometheus-stack/ -f deployments/helm-charts/helm-values/prometheus.yaml -n monitoring --create-namespace
    helm upgrade --install k8s-monitoring deployments/helm-charts/k8s-monitoring/ -f deployments/helm-charts/helm-values/monitoring.yaml -n monitoring --create-namespace 
unprovision:
    kind delete clusters kind
provision:
    kind create cluster --config provision/kind.yaml

install-argo:
    kubectl create namespace argocd
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
    
argo-pass:
    kubectl get secret argocd-initial-admin-secret -n argocd -o yaml | yq .data.password | base64 -d
    @echo 
argo: argo-pass
    @echo "Argocd URL: http://localhost:8080"
    kubectl port-forward svc/argocd-server -n argocd 8080:80