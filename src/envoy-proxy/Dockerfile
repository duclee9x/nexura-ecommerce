FROM envoyproxy/envoy:v1.33-latest
RUN apt-get update && apt-get install -y gettext-base && apt-get clean && rm -rf /var/lib/apt/lists/*

USER envoy
WORKDIR /home/envoy
COPY ./src/envoy-proxy/envoy-template.yaml envoy-template.yaml

ENTRYPOINT ["/bin/sh", "-c", "envsubst < envoy-template.yaml > envoy.yaml && envoy -c envoy.yaml;"]
