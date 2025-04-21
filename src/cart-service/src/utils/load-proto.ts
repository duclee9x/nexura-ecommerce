import path from "path"
import { loadSync } from "@grpc/proto-loader"
import type { ServiceDefinition } from "@grpc/proto-loader"

const CART_PROTO_PATH = path.resolve(__dirname, "../proto/nexura.proto")

const cartProtoDefinition = loadSync(CART_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})


const cartPackageDefinition = cartProtoDefinition["nexuraTelemetry.CartService"] as ServiceDefinition

export { cartProtoDefinition, cartPackageDefinition } 