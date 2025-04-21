import path from "path"
import { loadSync } from "@grpc/proto-loader"

const PROTO_PATH = path.resolve(__dirname, "../protos/nexura.proto")

export const protoDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

