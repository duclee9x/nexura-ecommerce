import { AddressServiceService, UserServiceService } from '@nexura/common/protos';
import { gracefulShutdown, startServer } from '@nexura/common/utils';
import { addressService } from "./services/address/address";
import { userService } from './services/user/user';

// Start the server
const port = process.env.GRPC_PORT || '50051';

const services = [
    {
        service: UserServiceService,
        serviceHandler: userService
    },
    {
        service: AddressServiceService,
        serviceHandler: addressService
    }
]

const server = startServer(services, port, "USER_SERVICE");

// Handle graceful shutdown
process.once('SIGTERM', () => gracefulShutdown('SIGTERM', server));
process.once('SIGINT', () => gracefulShutdown('SIGINT', server));


