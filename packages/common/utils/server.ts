import { Server, ServerCredentials, type UntypedServiceImplementation } from "@grpc/grpc-js";
import { logger } from "./logger";
import { 
    CartServiceService, 
    HealthServiceService, 
    ProductCatalogServiceService, 
    UserServiceService, 
    OrderServiceService, 
    OrchestratorServiceService, 
    ServiceName, 
    AddressServiceService,
    PaymentServiceService
} from "@nexura/grpc_gateway/protos";
import { ReflectionService } from "@grpc/reflection";
import { protoDefinition,HealthServiceImpl } from "@nexura/grpc_gateway/protos/lib";

export async function gracefulShutdown(signal: string, server: Server) {
    logger.info(`Received ${signal} signal. Shutting down gracefully...`);
    server.forceShutdown();
    process.kill(process.pid, signal);
}

type GrpcService = 
    | typeof CartServiceService
    | typeof UserServiceService
    | typeof ProductCatalogServiceService
    | typeof OrderServiceService
    | typeof OrchestratorServiceService
    | typeof AddressServiceService
    | typeof PaymentServiceService;

export interface ServiceDefinition {
    service: GrpcService;
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

    // Add reflection service
    const reflection = new ReflectionService(protoDefinition);
    reflection.addToServer(server);

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

// Example usage (commented out until handlers are implemented)
/*
const services: ServiceDefinition[] = [
    {
        service: UserServiceService,
        serviceHandler: UserService
    },
    {
        service: AddressServiceService,
        serviceHandler: AddressService
    }
];

startServer(services, "50054", "USER_SERVICE");
*/
