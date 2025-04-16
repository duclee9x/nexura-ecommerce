import { ReflectionService } from "@grpc/reflection";
import { Server, ServerCredentials } from '@grpc/grpc-js'
import { productProtoDefinition } from './utils/load-proto';
import { productService } from "./services/product.service";
import { HealthServiceImpl} from "./services/health.service"
import { ProductCatalogServiceService, HealthServiceService } from "./proto/nexura";

export function startServer(port: string): Server {
    const server = new Server();

    // Add services
    server.addService(ProductCatalogServiceService, productService);
    server.addService(HealthServiceService, new HealthServiceImpl)

    const productReflection = new ReflectionService(productProtoDefinition);
    productReflection.addToServer(server);

    server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error("Failed to bind server:", err);
            return;
        }
        console.log(`Server running on port ${port}`);
    });
    return server;

}
