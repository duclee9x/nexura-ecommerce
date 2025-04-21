import type { UntypedServiceImplementation } from "@grpc/grpc-js"
import { createSagaOrder } from "./orchestrator/create-saga-order"

export const orchestratorService: UntypedServiceImplementation = {
  createSagaOrder
}
