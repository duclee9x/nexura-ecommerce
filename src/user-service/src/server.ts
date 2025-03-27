import { ReflectionService } from "@grpc/reflection";
import { Server, ServerCredentials } from '@grpc/grpc-js'
import { userProtoDefinition, userPackageDefinition } from './utils/load-proto';
import { userService } from "./services/user";
import { HealthImplementation, ServingStatusMap } from 'grpc-health-check';


export function startServer(port: string): Server {
    const server = new Server();
    const statusMap: ServingStatusMap = {
        '': 'NOT_SERVING',
      };
    const healthImplementation = new HealthImplementation(statusMap);
    server.addService(userPackageDefinition, userService);
    healthImplementation.addToServer(server);

    healthImplementation.setStatus('', 'SERVING');
    // userReflection.addToServer(server);

    server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error("Failed to bind server:", err);
            return;
        }
        console.log(`Server running on port ${port}`);
    });
    return server;
}
