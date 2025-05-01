import { gracefulShutdown, startServer, type ServiceDefinition } from '@nexura/common/utils';
import { PaymentServiceService } from '@nexura/grpc_gateway/protos';
import { paymentService } from '../services/payment.service';

// Start the server
const port = process.env.PAYMENT_SERVICE_PORT || '50057';

const services = [
    {
        service: PaymentServiceService,
        serviceHandler: paymentService
    }
]

const server = startServer(services, port, 'PAYMENT_SERVICE');

// Handle graceful shutdown
process.once('SIGTERM', () => gracefulShutdown('SIGTERM', server));
process.once('SIGINT', () => gracefulShutdown('SIGINT', server));


