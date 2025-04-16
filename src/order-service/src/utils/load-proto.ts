import path from "path"
import { loadSync, ServiceDefinition } from "@grpc/proto-loader"

const ORDER_PROTO_PATH = path.resolve(__dirname, "../proto/nexura.proto")

const orderProtoDefinition = loadSync(ORDER_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})


const orderPackageDefinition = orderProtoDefinition["nexura.OrderService"] as ServiceDefinition

export { orderProtoDefinition, orderPackageDefinition } 