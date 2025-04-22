import { startServer, gracefulShutdown } from '@nexura/common/utils';
import { OrderServiceService } from '@nexura/grpc_gateway/protos';
import { orderService } from './services/order-service';

// Start the server
const port = process.env.GRPC_PORT || '50055';

const services = [
    {
        service: OrderServiceService,
        serviceHandler: orderService
    }
]

const server = startServer(services, port, "ORDER_SERVICE");

// Handle graceful shutdown
process.once('SIGTERM', () => gracefulShutdown('SIGTERM', server));
process.once('SIGINT', () => gracefulShutdown('SIGINT', server));


