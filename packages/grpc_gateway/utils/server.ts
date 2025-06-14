import { Server, ServerCredentials, type UntypedServiceImplementation } from "@grpc/grpc-js";
import { logger } from "@nexura/common";

import { 
  CartServiceService, 
  HealthServiceService, 
  ProductServiceService, 
  UserServiceService, 
  OrderServiceService, 
  OrchestratorServiceService, 
  ServiceName, 
  AddressServiceService,
  PaymentServiceService
} from "./generated/nexura";

import { HealthServiceImpl } from "./lib";

export function gracefulShutdown(signal: string, server: Server) {
  logger.info(`Received ${signal} signal. Shutting down gracefully...`);
  server.forceShutdown();
  process.kill(process.pid, signal);
}

type GrpcService = 
  | typeof CartServiceService
  | typeof UserServiceService
  | typeof ProductServiceService
  | typeof OrderServiceService
  | typeof OrchestratorServiceService
  | typeof AddressServiceService
  | typeof PaymentServiceService;

export interface ServiceDefinition {
  service:        GrpcService;
  serviceHandler: UntypedServiceImplementation;
}

export function startServer(
  services: ServiceDefinition[],
  port: string, 
  serviceName: keyof typeof ServiceName
): Server {
  const server = new Server();

  // Add services
  for (const { service, serviceHandler } of services) {
    server.addService(service, serviceHandler);
  }

  // Add health service
  server.addService(HealthServiceService, new HealthServiceImpl(serviceName));
  // server.addProtoService()
  // Add reflection service
  // const reflection = new ReflectionService(protoDefinition);
  // reflection.addToServer(server);

  // const descriptorPath = resolve('./generated/nexura_reflection_descriptor.pb');

  // addReflection(server, descriptorPath);
  server.bindAsync(
    `0.0.0.0:${port}`, 
    ServerCredentials.createInsecure(), 
    (err: Error | null, bindPort: number) => {
      if (err) {
        logger.error("Failed to bind server:", err);
        return;
      }
      logger.info(`Server running on port ${bindPort}`);
    }
  );

  return server;
}
