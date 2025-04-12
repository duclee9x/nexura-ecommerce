import { ReflectionService } from "@grpc/reflection";
import { Server, ServerCredentials } from '@grpc/grpc-js'
import { userPackageDefinition, userProtoDefinition, addressPackageDefinition } from './utils/load-proto';
import { userService } from "./services/user/user";
import { addressService } from "./services/address/address";
import { HealthImplementation, ServingStatusMap } from 'grpc-health-check';

export function startServer(port: string): Server {
    const server = new Server();
    const statusMap: ServingStatusMap = {
        '': 'NOT_SERVING',
    };
    const healthImplementation = new HealthImplementation(statusMap);
    server.addService(userPackageDefinition, userService);
    server.addService(addressPackageDefinition, addressService);
    healthImplementation.addToServer(server);
    
    const userReflection = new ReflectionService(userProtoDefinition);
    healthImplementation.setStatus('', 'SERVING');
    userReflection.addToServer(server);

    server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error("Failed to bind server:", err);
            return;
        }
        console.log(`Server running on port ${port}`);
    });
    return server;
}
