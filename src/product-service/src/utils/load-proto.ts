import path from "path"
import { loadSync, ServiceDefinition } from "@grpc/proto-loader"

const PRODUCT_PROTO_PATH = path.resolve(__dirname, "../proto/nexura.proto")

const productProtoDefinition = loadSync(PRODUCT_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})


const productPackageDefinition = productProtoDefinition["nexuraTelemetry.ProductCatalogService"] as ServiceDefinition

export { productProtoDefinition, productPackageDefinition } 