services=$(git diff --name-only origin/main...HEAD | grep '^src/' | cut -d '/' -f2 | uniq | cut -d '-' -f1 | tr '\n' ',' | sed 's/,$//')
if [ -z "$services" ]; then
    services="user,product,payment,order,cart,frontend,workflow"
fi
echo "services=$services"