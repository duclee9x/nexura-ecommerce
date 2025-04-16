import { ReflectionService } from "@grpc/reflection";
import { Server, ServerCredentials } from '@grpc/grpc-js'
import { orderService } from "./services/order-service";
import { orderProtoDefinition } from './utils/load-proto';
import { HealthServiceImpl} from "./services/health.service"
import { OrderServiceService, HealthServiceService } from "./proto/nexura";

export function startServer(port: string = "50055"): Server {
    const server = new Server();
    // Add services
    server.addService(OrderServiceService, orderService);
    server.addService(HealthServiceService, new HealthServiceImpl);

    const orderReflection = new ReflectionService(orderProtoDefinition);
    orderReflection.addToServer(server);

    server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error("Failed to bind server:", err);
            return;
        }
        console.log(`Server running on port ${port}`);
    });
    return server;

}
