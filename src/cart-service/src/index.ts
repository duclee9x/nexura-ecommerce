import { startServer, gracefulShutdown } from '@nexura/common/utils';
import { CartService } from './services/cart';
import { CartServiceService } from '@nexura/common/protos';

// Start the server
const port = process.env.GRPC_PORT || '50054';

const services = [
    {
        service: CartServiceService,
        serviceHandler: CartService
    }
]

const server = startServer(services, port, "CART_SERVICE");

// Handle graceful shutdown
process.once('SIGTERM', () => gracefulShutdown('SIGTERM', server));
process.once('SIGINT', () => gracefulShutdown('SIGINT', server));


